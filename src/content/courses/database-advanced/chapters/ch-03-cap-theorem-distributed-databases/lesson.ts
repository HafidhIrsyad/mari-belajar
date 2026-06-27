import type { Lesson } from '@/content/types'

export const ch03Lesson: Lesson = {
  id: "lesson-ch-03-cap-theorem-distributed-databases",
  estimatedMinutes: 60,
  sections: [
    {
      id: "sec-03-01",
      type: 'markdown',
      level: 'basic',
      title: "CAP Theorem",
      content: `## Tiga Sifat Distributed System

CAP theorem (Brewer, 2000; dibuktikan oleh Gilbert & Lynch, 2002) menyatakan bahwa sistem terdistribusi dengan replikasi data hanya dapat menjamin dua dari tiga sifat berikut secara bersamaan:

- **Consistency (C)**: setiap read menerima data hasil write terakhir atau error.
- **Availability (A)**: setiap request menerima respons (tanpa error), meskipun tidak menjamin data terbaru.
- **Partition Tolerance (P)**: sistem tetap beroperasi meskipun jaringan antar node terputus.

Karena network failure tidak dapat dihindari dalam sistem terdistribusi, **partition tolerance adalah mandatory**. Oleh karena itu, pilihannya menjadi **CP atau AP** saat partition terjadi.

## CP vs AP

- **CP (Consistency + Partition Tolerance)**: saat partition, sistem menolak write/read untuk menjaga konsistensi. Contoh: CockroachDB, HBase, ZooKeeper.
- **AP (Availability + Partition Tolerance)**: saat partition, sistem terus melayani request tetapi bisa mengembalikan data usang. Contoh: Cassandra, DynamoDB, Couchbase.

## Contoh Sederhana

Bayangkan dua node menyimpan saldo rekening:

- Partition terjadi.
- Node A menerima penarikan saldo.
- Node B tidak tahu ada penarikan.

Jika sistem CP, Node B akan menolak read sampai partition sembuh. Jika sistem AP, Node B tetap memberikan saldo lama.

## Eventual Consistency

Sistem AP biasanya menawarkan **eventual consistency**: jika tidak ada write baru, semua replica akhirnya akan konvergen ke nilai yang sama.`,
    },
    {
      id: "sec-03-02",
      type: 'code-example',
      codeExample: {
        id: "code-03-js",
        filename: "cap-simulation.js",
        language: 'javascript',
        title: "JavaScript: Simulasi CP vs AP saat Partition",
        code: "class DistributedStore {\n  constructor(mode) {\n    this.mode = mode // 'CP' atau 'AP'\n    this.nodes = { A: 100, B: 100 }\n    this.partitioned = false\n  }\n\n  write(node, value) {\n    if (this.partitioned && this.mode === 'CP') {\n      throw new Error('Partitioned: write ditolak untuk menjaga consistency')\n    }\n    this.nodes[node] = value\n    return { ok: true, node, value }\n  }\n\n  read(node) {\n    if (this.partitioned && this.mode === 'CP' && node === 'B') {\n      throw new Error('Partitioned: read ditolak')\n    }\n    return { value: this.nodes[node], stale: this.partitioned }\n  }\n\n  partition() { this.partitioned = true }\n  heal() { this.partitioned = false }\n}\n\nconst cp = new DistributedStore('CP')\ncp.partition()\nconsole.log(cp.write('A', 90)) // error\n\nconst ap = new DistributedStore('AP')\nap.partition()\nconsole.log(ap.write('A', 90)) // ok\nconsole.log(ap.read('B')) // nilai lama, stale = true",
        explanation: "Simulasi ini menunjukkan bagaimana sistem CP menolak operasi saat partition, sedangkan AP tetap melayani dengan data yang mungkin usang.",
      },
    },
    {
      id: "sec-03-03",
      type: 'markdown',
      level: 'intermediate',
      title: "PACELC, Quorum & Consistency Levels",
      content: `## PACELC

PACELC (Abadi, 2010) memperluas CAP dengan trade-off tambahan:

> **If there is a Partition, choose Availability or Consistency; Else, choose Latency or Consistency.**

Artinya, bahkan tanpa partition, sistem harus memilih antara latency rendah atau consistency kuat.

Contoh:
- **DynamoDB / Cassandra**: tanpa partition, write dengan consistency level QUORUM lebih lambat tetapi lebih konsisten daripada ONE.
- **Spanner**: TrueTime memberikan consistency kuat dengan latency yang relatif tinggi.

## Quorum

**Quorum** adalah jumlah node minimal yang harus setuju sebelum operasi dianggap berhasil. Untuk sistem dengan N node:

- Write quorum (W) + Read quorum (R) > N menjamin read-after-write consistency.
- W = R = (N/2) + 1 disebut **strict quorum** atau majority.

Contoh N=3:
- W=2, R=2 -> W+R=4 > 3, strong consistency.
- W=1, R=1 -> W+R=2 <= 3, eventual consistency (lebih cepat).

## Consistency Levels di Cassandra

- **ONE**: read/write dari satu node terdekat, cepat, eventual consistency.
- **QUORUM**: majority node, strong consistency.
- **ALL**: semua node, consistency terkuat tetapi availability terendah.

## Linearizability

**Linearizability** adalah guarantee consistency terkuat: setiap operasi tampak terjadi secara atomik pada satu titik waktu, dan semua node melihat urutan operasi yang sama. Ini lebih kuat dari sequential consistency. Spanner dan etcd menawarkan linearizability.`,
    },
    {
      id: "sec-03-04",
      type: 'code-example',
      codeExample: {
        id: "code-03-ts",
        filename: "quorum-config.ts",
        language: 'typescript',
        title: "TypeScript: Quorum Calculator",
        code: "type ConsistencyLevel = 'ONE' | 'QUORUM' | 'ALL'\n\nclass QuorumConfig {\n  constructor(private nodeCount: number) {}\n\n  requiredNodes(level: ConsistencyLevel): number {\n    switch (level) {\n      case 'ONE':\n        return 1\n      case 'QUORUM':\n        return Math.floor(this.nodeCount / 2) + 1\n      case 'ALL':\n        return this.nodeCount\n      default:\n        throw new Error('Unknown consistency level')\n    }\n  }\n\n  isStronglyConsistent(writeLevel: ConsistencyLevel, readLevel: ConsistencyLevel): boolean {\n    return (\n      this.requiredNodes(writeLevel) + this.requiredNodes(readLevel) > this.nodeCount\n    )\n  }\n}\n\nconst config = new QuorumConfig(5)\nconsole.log('QUORUM nodes:', config.requiredNodes('QUORUM')) // 3\nconsole.log('ONE + ONE strongly consistent?', config.isStronglyConsistent('ONE', 'ONE')) // false\nconsole.log('QUORUM + QUORUM strongly consistent?', config.isStronglyConsistent('QUORUM', 'QUORUM')) // true",
        explanation: "Kalkulator ini menunjukkan hubungan antara write quorum, read quorum, dan strong consistency pada distributed storage.",
      },
    },
    {
      id: "sec-03-05",
      type: 'markdown',
      level: 'advanced',
      title: "Raft, Paxos & Distributed Databases",
      content: `## Consensus Problem

Consensus adalah kesepakatan bersama di antara node-node distributed system tentang satu nilai atau urutan operasi. Solusi consensus harus memenuhi:

- **Safety**: hanya satu nilai yang dapat diputuskan.
- **Liveness**: jika majority node tersedia dan jaringan stabil, sistem mencapai keputusan.

## Paxos

Paxos adalah algoritma consensus klasik. Meskipun terkenal sulit dipahami dan diimplementasikan, banyak sistem menggunakannya seperti Google Chubby dan ZooKeeper (menggunakan ZAB, varian Paxos).

## Raft

Raft dirancang untuk lebih mudah dipahami daripada Paxos. Konsep utamanya:

- **Leader election**: satu node menjadi leader, lainnya menjadi follower.
- **Log replication**: leader menerima write, menyebarkan log entries ke follower.
- **Safety**: leader baru harus memiliki log yang paling up-to-date sebelum menjabat.

Raft memastikan semua node yang committed memiliki log yang sama.

## Distributed Databases Modern

- **CockroachDB**: menggunakan multi-raft, setiap range memiliki raft group sendiri.
- **TiDB**: TiKV menggunakan Raft untuk replicated state machine.
- **etcd**: key-value store yang menjadi backbone Kubernetes, menggunakan Raft.

## CAP dan Database Nyata

Tidak semua database murni CP atau AP. Banyak yang bisa dikonfigurasi:

- MongoDB: default CP dengan majority write concern, tetapi bisa AP jika write concern = 1.
- PostgreSQL synchronous replication: CP.
- Cassandra: AP secara default, tetapi bisa CP dengan QUORUM.

## Network Partitions Under The Hood

Network partition dapat terjadi di berbagai lapisan: switch failure, packet loss, DNS split-brain, atau bahkan GC pause yang panjang sehingga node dianggap mati. Sistem harus memiliki timeout, heartbeat, dan failure detector yang baik.`,
    },
    {
      id: "sec-03-06",
      type: 'code-example',
      codeExample: {
        id: "code-03-go",
        filename: "raft_vote.go",
        language: 'go',
        title: "Go: Simulasi Leader Election Raft-like",
        code: "package main\n\nimport (\n\t\"fmt\"\n\t\"math/rand\"\n\t\"time\"\n)\n\ntype Node struct {\n\tID       string\n\tTerm     int\n\tIsLeader bool\n}\n\nfunc (n *Node) RequestVote(peers []Node) bool {\n\tvotes := 1 // vote untuk diri sendiri\n\tfor _, peer := range peers {\n\t\t// Simulasi peer setuju jika term lebih tinggi atau sama\n\t\tif n.Term >= peer.Term {\n\t\t\tvotes++\n\t\t}\n\t}\n\treturn votes > len(peers)/2\n}\n\nfunc main() {\n\trand.Seed(time.Now().UnixNano())\n\n\tnodes := []Node{\n\t\t{ID: \"A\", Term: 2},\n\t\t{ID: \"B\", Term: 1},\n\t\t{ID: \"C\", Term: 1},\n\t}\n\n\tcandidate := nodes[0]\n\tif candidate.RequestVote(nodes[1:]) {\n\t\tfmt.Printf(\"Node %s menang pemilihan leader pada term %d\\n\", candidate.ID, candidate.Term)\n\t} else {\n\t\tfmt.Println(\"Tidak ada yang memperoleh majority\")\n\t}\n}",
        explanation: "Simulasi sederhana ini menunjukkan prinsip leader election Raft: candidate harus mendapatkan majority vote untuk menjadi leader.",
      },
    },
    {
      id: "sec-03-07",
      type: 'callout',
      calloutType: 'info',
      content: `Kesimpulan: Pahami kebutuhan bisnis sebelum memilih CP atau AP. Transaksi finansial biasanya memerlukan strong consistency (CP/majority), sedangkan feed sosial atau analytics bisa toleran terhadap eventual consistency (AP).

Tools 2026: etcd untuk consensus key-value, CockroachDB/TiDB untuk distributed SQL, Cassandra/DynamoDB untuk AP scalable.`,
    },
  ],
}
