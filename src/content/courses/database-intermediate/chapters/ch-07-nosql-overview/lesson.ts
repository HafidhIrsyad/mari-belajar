import type { Lesson } from '@/content/types'

export const ch07Lesson: Lesson = {
  id: "lesson-ch-07-nosql-overview",
  estimatedMinutes: 55,
  sections: [
    {
      id: "sec-07-$1",
      type: 'markdown',
      level: 'basic',
      title: "Pengantar NoSQL Overview",
      content: `## Kategori NoSQL

1. **Key-Value**: Redis, DynamoDB, Riak. Cocok untuk cache, session, dan lookup cepat.
2. **Document**: MongoDB, Couchbase, Firestore. Data disimpan sebagai dokumen JSON/BSON dengan skema fleksibel.
3. **Wide-Column**: Cassandra, HBase, Bigtable. Table dengan kolom dinamis per row, optimal untuk time-series dan write-heavy.
4. **Graph**: Neo4j, Amazon Neptune. Optimized untuk relasi dan traversal graph.

## Kapan NoSQL?

- Volume data sangat besar dan perlu horizontal scaling.
- Skema sering berubah atau tidak terstruktur.
- Kebutuhan latensi sangat rendah untuk key-value.
- Pola akses spesifik seperti graph traversal atau time-series.

## Trade-off

NoSQL sering mengorbankan:

- Transaksi multi-row/ACID yang kuat (meski semakin banyak yang mendukung).
- Kemampuan join kompleks.
- Konsistensi kuat default (eventual consistency).`,
    },
    {
      id: "sec-07-$1",
      type: 'code-example',
      codeExample: {
        id: "code-07-js",
        filename: "nosql-sim.js",
        language: 'javascript',
        title: "JavaScript: Simulasi Key-Value dan Document Store",
        code: "const kvStore = new Map()\n\nfunction setKey(key, value) {\n  kvStore.set(key, JSON.stringify(value))\n}\n\nfunction getKey(key) {\n  const raw = kvStore.get(key)\n  return raw ? JSON.parse(raw) : undefined\n}\n\nconst documentStore = new Map()\n\nfunction insertDocument(collection, doc) {\n  if (!documentStore.has(collection)) documentStore.set(collection, [])\n  documentStore.get(collection).push(doc)\n}\n\nfunction findDocuments(collection, predicate) {\n  return (documentStore.get(collection) || []).filter(predicate)\n}\n\nsetKey(\"session:123\", { userId: 1, cart: [1, 2] })\ninsertDocument(\"users\", { id: 1, name: \"Andi\", tags: [\"premium\"] })\n\nconsole.log(getKey(\"session:123\"))\nconsole.log(findDocuments(\"users\", (u) => u.tags.includes(\"premium\")))",
        explanation: "Simulasi ini menunjukkan perbedaan key-value (lookup langsung) dan document store (query koleksi).",
      },
    },
    {
      id: "sec-07-$1",
      type: 'markdown',
      level: 'intermediate',
      title: "Konsep Menengah NoSQL Overview",
      content: `## CAP Theorem

CAP theorem menyatakan sistem terdistribusi tidak dapat secara bersamaan menjamin ketiga hal:

- **Consistency**: setiap read menerima write terbaru atau error.
- **Availability**: setiap request mendapat response non-error.
- **Partition Tolerance**: sistem tetap beroperasi meski jaringan terpartisi.

Karena partition tolerance tidak dapat dihindari di sistem terdistribusi, pilih antara CP (Consistency + Partition Tolerance) atau AP (Availability + Partition Tolerance).

Contoh:

- **CP**: HBase, MongoDB dengan write concern majority.
- **AP**: Cassandra, DynamoDB dengan eventual consistency.

## BASE

BASE adalah alternatif dari ACID untuk sistem terdistribusi:

- **Basically Available**: sistem selalu merespons.
- **Soft state**: state dapat berubah tanpa input eksternal karena replication.
- **Eventual consistency**: jika tidak ada update baru, data akhirnya konsisten di semua node.

## Sharding dan Replication

- **Sharding**: membagi data ke beberapa node berdasarkan key.
- **Replication**: menyimpan salinan data di node lain untuk availability.
- **Quorum**: jumlah node yang harus setuju untuk read/write.`,
    },
    {
      id: "sec-07-$1",
      type: 'code-example',
      codeExample: {
        id: "code-07-ts",
        filename: "cap-tradeoff.ts",
        language: 'typescript',
        title: "TypeScript: Memodelkan Trade-off CAP",
        code: "type ConsistencyModel = \"strong\" | \"eventual\" | \"causal\"\n\ninterface DatabaseProfile {\n  name: string\n  category: \"key-value\" | \"document\" | \"wide-column\" | \"graph\"\n  defaultConsistency: ConsistencyModel\n  partitionBehavior: \"CP\" | \"AP\" | \"configurable\"\n}\n\nfunction chooseDatabase(requirement: {\n  needsJoin: boolean\n  writeThroughput: \"high\" | \"low\"\n  consistency: ConsistencyModel\n}): string {\n  if (requirement.needsJoin) return \"graph database (Neo4j / Neptune)\"\n  if (requirement.writeThroughput === \"high\" && requirement.consistency === \"eventual\") {\n    return \"wide-column database (Cassandra)\"\n  }\n  if (requirement.consistency === \"strong\") return \"relational atau CP NoSQL\"\n  return \"document database (MongoDB / Couchbase)\"\n}\n\nconsole.log(chooseDatabase({ needsJoin: true, writeThroughput: \"low\", consistency: \"strong\" }))",
        explanation: "Model ini membantu memilih kategori database berdasarkan kebutuhan join, throughput, dan konsistensi.",
      },
    },
    {
      id: "sec-07-$1",
      type: 'markdown',
      level: 'advanced',
      title: "Internal Lanjutan NoSQL Overview",
      content: `## LSM-Tree Storage

Banyak database write-optimized seperti Cassandra dan RocksDB menggunakan **Log-Structured Merge Tree** (LSM-tree):

1. Write masuk ke **memtable** di memori dan **WAL** di disk.
2. Ketika memtable penuh, data di-flush ke disk sebagai **SSTable** yang immutable dan terurut.
3. Read dapat memeriksa memtable dan beberapa SSTable.
4. **Compaction** secara berkala menggabungkan SSTable untuk menghapus data usang dan mengurangi read amplification.

Trade-off:

- Write amplification rendah (sequential writes).
- Read amplification lebih tinggi daripada B-tree karena banyak SSTable.
- Compaction dapat menyebabkan write latency spike.

## Wide-Column Internals

Cassandra menyimpan data berdasarkan partition key dan clustering key:

- **Partition key**: menentukan node mana yang menyimpan row.
- **Clustering key**: mengurutkan row dalam satu partition.
- Query yang tidak menyertakan partition key menyebabkan **coordinator-wide scan** yang mahal.

## Conflict Resolution

Di sistem eventual consistency, konflik dapat terjadi saat node divergen. Mekanisme:

- **Vector clocks**: melacak urutan event antar node.
- **CRDTs (Conflict-free Replicated Data Types)**: struktur data yang merge otomatis.
- **Last-Write-Wins (LWW)**: sederhana tetapi dapat kehilangan update.`,
    },
    {
      id: "sec-07-$1",
      type: 'code-example',
      codeExample: {
        id: "code-07-go",
        filename: "main.go",
        language: 'go',
        title: "Go: Redis Key-Value dan Pub/Sub",
        code: "package main\n\nimport (\n\t\"context\"\n\t\"fmt\"\n\t\"log\"\n\n\t\"github.com/redis/go-redis/v9\"\n)\n\nfunc main() {\n\trdb := redis.NewClient(&redis.Options{Addr: \"localhost:6379\"})\n\tctx := context.Background()\n\n\tif err := rdb.Set(ctx, \"session:123\", \"active\", 0).Err(); err != nil {\n\t\tlog.Fatal(err)\n\t}\n\n\tval, err := rdb.Get(ctx, \"session:123\").Result()\n\tif err != nil {\n\t\tlog.Fatal(err)\n\t}\n\n\tfmt.Println(\"session:\", val)\n}",
        explanation: "Redis adalah key-value store yang populer untuk cache dan session dengan latensi sangat rendah.",
      },
    },
    {
      id: "sec-07-$1",
      type: 'callout',
      calloutType: 'info',
      content: `Kesimpulan: NoSQL bukan pengganti SQL, melainkan pilihan untuk kebutuhan spesifik. Pahami CAP/BASE, model data, dan storage internals seperti LSM-tree sebelum memilih.`,
    },
  ],
}
