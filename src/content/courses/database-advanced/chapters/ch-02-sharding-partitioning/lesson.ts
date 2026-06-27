import type { Lesson } from '@/content/types'

export const ch02Lesson: Lesson = {
  id: "lesson-ch-02-sharding-partitioning",
  estimatedMinutes: 60,
  sections: [
    {
      id: "sec-02-01",
      type: 'markdown',
      level: 'basic',
      title: "Partitioning vs Sharding",
      content: `## Mengapa Membagi Data?

Ketika table tumbuh sangat besar, query menjadi lambat karena:

- Index tree semakin dalam.
- Vacuum, backup, dan maintenance membutuhkan waktu lebih lama.
- Lock contention meningkat.

Solusinya adalah membagi data menjadi bagian lebih kecil.

## Partitioning

**Partitioning** membagi satu logical table menjadi beberapa physical segment di dalam satu node database. Setiap partisi memiliki struktur kolom yang sama.

Manfaat:
- **Partition pruning**: query hanya membaca partisi yang relevan.
- Maintenance lebih mudah: drop partisi lama lebih cepat dari DELETE.
- Index per partisi lebih kecil.

## Sharding

**Sharding** membagi data ke beberapa node/server independen. Setiap shard adalah database lengkap yang menyimpan subset data. Sharding memungkinkan horizontal scaling.

Perbedaan utama:

| Aspek | Partitioning | Sharding |
|-------|-------------|----------|
| Scope | Satu node | Banyak node |
| Transaction | Tetap ACID lokal | Cross-shard lebih kompleks |
| Skalabilitas | Vertikal + sedikit horizontal | Horizontal |
| Query planner | Satu optimizer | Memerlukan router/coordinator |

## Sharding Key

**Sharding key** adalah kolom yang menentukan data masuk ke shard mana. Contoh: \`user_id\`, \`tenant_id\`, \`order_date\`.

Sharding key yang baik:
- High cardinality (banyak nilai unik).
- Akses sering melalui key tersebut.
- Distribusi merata antar shard.
- Menghindari hot shard.`,
    },
    {
      id: "sec-02-02",
      type: 'code-example',
      codeExample: {
        id: "code-02-js",
        filename: "shard-router.js",
        language: 'javascript',
        title: "JavaScript: Simulasi Router Sharding Berdasarkan Hash",
        code: "function getShardId(key, shardCount) {\n  let hash = 0\n  for (const ch of key) {\n    hash = (hash << 5) - hash + ch.charCodeAt(0)\n    hash |= 0\n  }\n  return Math.abs(hash) % shardCount\n}\n\nconst shardCount = 4\nconst keys = ['user-42', 'user-7', 'user-99', 'user-123', 'user-5']\n\nfor (const key of keys) {\n  console.log(key, '-> shard', getShardId(key, shardCount))\n}\n\n// Distribusi bisa diukur dengan histogram\nconst histogram = new Array(shardCount).fill(0)\nfor (const key of keys) {\n  histogram[getShardId(key, shardCount)]++\n}\nconsole.log('histogram:', histogram)",
        explanation: "Router sederhana menggunakan hash dari sharding key untuk memutuskan shard. Hash yang baik mendistribusikan key secara merata.",
      },
    },
    {
      id: "sec-02-03",
      type: 'markdown',
      level: 'intermediate',
      title: "Strategi Partitioning & Cross-Shard Query",
      content: `## Range Partitioning

Data dibagi berdasarkan rentang nilai, paling umum untuk kolom waktu:

\`\`\`
sales_2024_q1, sales_2024_q2, sales_2024_q3, sales_2024_q4
\`\`\`

Keunggulan: partition pruning sangat efektif untuk query dengan rentang waktu.
Kelemahan: hot spot jika data baru selalu masuk ke partisi terakhir.

## Hash Partitioning

Database menghash nilai key dan memetakannya ke partisi. Distribusi lebih merata, tetapi partition pruning hanya bekerja untuk equality predicate.

## List Partitioning

Data dibagi berdasarkan daftar nilai eksplisit, misalnya berdasarkan region:

\`\`\`
region = 'APAC' -> partisi asia
region = 'EMEA' -> partisi europe
\`\`\`

## Consistent Hashing

Consistent hashing meminimalkan jumlah key yang perlu dipindahkan saat jumlah shard berubah. Digunakan oleh Cassandra, DynamoDB, dan Redis Cluster.

## Cross-Shard Join

Join antar shard memerlukan **scatter-gather**: query dikirim ke banyak shard, hasilnya digabungkan di coordinator. Ini mahal dalam hal latency dan memori.

## Cross-Shard Transaction

Transaksi yang menyentuh banyak shard memerlukan protokol seperti two-phase commit (2PC) atau saga. Ini menambah kompleksitas dan latency.

## Global Tables

Dalam arsitektur sharded, **global tables** menyimpan data referensi yang relatif kecil dan jarang berubah di semua shard. Ini menghindari cross-shard join untuk lookup data master.`,
    },
    {
      id: "sec-02-04",
      type: 'code-example',
      codeExample: {
        id: "code-02-ts",
        filename: "typed-shard-router.ts",
        language: 'typescript',
        title: "TypeScript: Typed Shard Router dengan Range dan Hash",
        code: "type ShardStrategy = 'hash' | 'range'\n\ntype ShardConfig = {\n  strategy: ShardStrategy\n  shardCount: number\n  rangeBoundaries?: number[] // untuk range strategy\n}\n\nclass ShardRouter {\n  constructor(private config: ShardConfig) {}\n\n  route(key: string | number): number {\n    if (this.config.strategy === 'hash') {\n      return this.hash(String(key), this.config.shardCount)\n    }\n\n    if (this.config.strategy === 'range') {\n      const num = typeof key === 'number' ? key : Number.parseInt(key, 10)\n      const boundaries = this.config.rangeBoundaries ?? []\n      for (let i = 0; i < boundaries.length; i++) {\n        if (num < boundaries[i]) return i\n      }\n      return boundaries.length\n    }\n\n    throw new Error('Unsupported strategy')\n  }\n\n  private hash(key: string, shardCount: number): number {\n    let h = 0\n    for (const ch of key) {\n      h = (h << 5) - h + ch.charCodeAt(0)\n      h |= 0\n    }\n    return Math.abs(h) % shardCount\n  }\n}\n\nconst hashRouter = new ShardRouter({ strategy: 'hash', shardCount: 8 })\nconsole.log(hashRouter.route('user-99'))\n\nconst rangeRouter = new ShardRouter({\n  strategy: 'range',\n  shardCount: 4,\n  rangeBoundaries: [1000, 2000, 3000],\n})\nconsole.log(rangeRouter.route(1500))",
        explanation: "Router ini mendukung hash untuk distribusi merata maupun range untuk data seperti ID atau timestamp.",
      },
    },
    {
      id: "sec-02-05",
      type: 'markdown',
      level: 'advanced',
      title: "Rebalancing, Hot Shard & Distributed SQL",
      content: `## Rebalancing

Seiring waktu, distribusi data bisa menjadi tidak merata karena:

- Perubahan pola akses (misalnya event viral).
- Penambahan atau pengurangan shard.
- Sharding key yang kurang baik.

**Rebalancing** memindahkan data antar shard untuk mengembalikan keseimbangan. Proses ini harus:

- Berlangsung tanpa downtime.
- Menjaga konsistensi (biasanya dengan double-write).
- Memperbarui routing table secara atomik.

## Hot Shard

**Hot shard** terjadi ketika satu shard menerima beban jauh lebih tinggi dari lainnya. Penyebab umum:

- Sharding key berdasarkan kategori dengan distribusi tidak merata.
- Akses terpusat pada satu tenant atau produk populer.
- Range partitioning tanpa rotasi.

Solusi:
- Gunakan hash prefix pada sharding key.
- Split hot shard menjadi sub-shard.
- Gunakan cache untuk mengurangi beban read.

## Citus & Vitess

- **Citus**: extension PostgreSQL untuk sharding dan distributed query.
- **Vitess**: middleware sharding untuk MySQL yang digunakan oleh YouTube.

Keduanya menyediakan coordinator yang menerjemahkan query ke shard yang relevan.

## Distributed SQL

CockroachDB, TiDB, YugabyteDB, dan Google Spanner menyatukan SQL semantics dengan arsitektur distributed. Mereka menggunakan consensus protocol (Raft/Paxos) untuk replikasi antar node dan menangani sharding secara transparan.

## Partitioning Under The Hood

Di PostgreSQL, setiap partisi adalah table terpisah dengan file di disk. Planner melakukan **partition pruning** saat planning atau execution. Constraint exclusion memungkinkan planner membuang partisi yang tidak memenuhi predicate.`,
    },
    {
      id: "sec-02-06",
      type: 'code-example',
      codeExample: {
        id: "code-02-go",
        filename: "shard_manager.go",
        language: 'go',
        title: "Go: Shard Manager dengan Consistent Hashing Sederhana",
        code: "package main\n\nimport (\n\t\"fmt\"\n\t\"hash/fnv\"\n\t\"sort\"\n)\n\ntype ConsistentHash struct {\n\tnodes map[uint32]string\n\tkeys  []uint32\n}\n\nfunc NewConsistentHash(nodeNames []string) *ConsistentHash {\n\tch := &ConsistentHash{nodes: make(map[uint32]string)}\n\tfor _, name := range nodeNames {\n\t\th := fnv.New32a()\n\t\th.Write([]byte(name))\n\t\tkey := h.Sum32()\n\t\tch.nodes[key] = name\n\t\tch.keys = append(ch.keys, key)\n\t}\n\tsort.Slice(ch.keys, func(i, j int) bool { return ch.keys[i] < ch.keys[j] })\n\treturn ch\n}\n\nfunc (ch *ConsistentHash) GetNode(input string) string {\n\th := fnv.New32a()\n\th.Write([]byte(input))\n\thash := h.Sum32()\n\n\tfor _, key := range ch.keys {\n\t\tif hash <= key {\n\t\t\treturn ch.nodes[key]\n\t\t}\n\t}\n\treturn ch.nodes[ch.keys[0]]\n}\n\nfunc main() {\n\tch := NewConsistentHash([]string{\"shard-a\", \"shard-b\", \"shard-c\"})\n\tfor _, key := range []string{\"user-1\", \"user-2\", \"user-3\"} {\n\t\tfmt.Printf(\"%s -> %s\\n\", key, ch.GetNode(key))\n\t}\n}",
        explanation: "Consistent hashing mengurangi jumlah key yang harus dipindahkan saat node ditambahkan atau dihapus, karena hanya sebagian ring yang terpengaruh.",
      },
    },
    {
      id: "sec-02-07",
      type: 'callout',
      calloutType: 'info',
      content: `Kesimpulan: Mulailah dengan partitioning di satu node sebelum beralih ke sharding. Sharding menyelesaikan masalah skala tetapi menambah kompleksitas operasional dan query. Selalu pilih sharding key dengan distribusi merata dan pantau hot shard secara proaktif.

Tools 2026: Citus untuk PostgreSQL, Vitess untuk MySQL, MongoDB sharded cluster, CockroachDB/TiDB untuk distributed SQL.`,
    },
  ],
}
