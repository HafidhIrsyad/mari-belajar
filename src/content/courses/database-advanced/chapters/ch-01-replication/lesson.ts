import type { Lesson } from '@/content/types'

export const ch01Lesson: Lesson = {
  id: "lesson-ch-01-replication",
  estimatedMinutes: 60,
  sections: [
    {
      id: "sec-01-01",
      type: 'markdown',
      level: 'basic',
      title: "Konsep Dasar Replication",
      content: `## Mengapa Replication Diperlukan

Replication adalah proses menyalin dan memelihara data yang sama di lebih dari satu node database. Tujuan utamanya:

- **High availability**: jika primary gagal, standby dapat mengambil alih.
- **Read scaling**: query read dapat didistribusikan ke replica.
- **Disaster recovery**: data tersedia di lokasi berbeda.
- **Backup offload**: backup dapat diambil dari standby tanpa membebani primary.

## Master-Slave Replication

Dalam pola paling umum, satu node menjadi **primary** (master) yang menerima write, dan satu atau lebih **standby** (slave/replica) menerima stream perubahan.

## Streaming Replication di PostgreSQL

PostgreSQL mengirimkan WAL (Write-Ahead Log) secara real-time dari primary ke standby:

1. Primary menulis perubahan ke WAL lokal.
2. WAL records dikirim melalui koneksi TCP ke standby.
3. Standby menerapkan WAL records ke data file-nya.

Mode defaultnya adalah **asynchronous streaming replication**: primary tidak menunggu acknowledgment dari standby sebelum commit.

## WAL Shipping vs Streaming

- **WAL shipping**: file WAL dikopi secara berkala (archive_command) ke standby.
- **Streaming replication**: WAL dikirim langsung melalui protokol streaming, lebih cepat dan lebih sedikit lag.`,
    },
    {
      id: "sec-01-02",
      type: 'code-example',
      codeExample: {
        id: "code-01-js",
        filename: "replica-router.js",
        language: 'javascript',
        title: "JavaScript: Simulasi Router Read Replica",
        code: "class ReplicaPool {\n  constructor(replicas) {\n    this.replicas = replicas // [{ name, lagMs, healthy }]\n    this.index = 0\n  }\n\n  pickReplica(maxLagMs = 1000) {\n    const eligible = this.replicas.filter(\n      (r) => r.healthy && r.lagMs <= maxLagMs\n    )\n    if (eligible.length === 0) return null\n    const replica = eligible[this.index % eligible.length]\n    this.index++\n    return replica\n  }\n}\n\nconst pool = new ReplicaPool([\n  { name: 'replica-1', lagMs: 50, healthy: true },\n  { name: 'replica-2', lagMs: 1200, healthy: true },\n  { name: 'replica-3', lagMs: 80, healthy: false },\n])\n\nconsole.log(pool.pickReplica(1000)) // replica-1\nconsole.log(pool.pickReplica(1000)) // replica-2 dilewati karena lag tinggi, kembali ke replica-1",
        explanation: "Router sederhana memilih replica yang sehat dan lag-nya di bawah threshold. Ini adalah konsep dasar read replica routing di aplikasi.",
      },
    },
    {
      id: "sec-01-03",
      type: 'markdown',
      level: 'intermediate',
      title: "Synchronous vs Asynchronous & Failover",
      content: `## Synchronous Replication

Dalam mode synchronous, primary menunggu konfirmasi dari standby sebelum mengembalikan commit ke client. PostgreSQL menggunakan parameter \`synchronous_commit\` dan \`synchronous_standby_names\`.

Keuntungan:
- **Zero data loss** untuk standby yang tercakup.
- Konsistensi yang lebih kuat.

Kerugian:
- Latency commit meningkat karena menunggu round-trip ke standby.
- Jika standby lambat atau mati, primary bisa terhambat.

## Replication Lag

**Lag** adalah keterlambatan antara transaksi commit di primary dan penerapan di standby. Penyebab umum:
- Query panjang atau lock di standby (hot standby).
- Keterbatasan bandwidth jaringan.
- Beban write primary yang terlalu tinggi.

Cara memonitor:
- PostgreSQL: \`pg_stat_replication\` dan \`pg_stat_wal_receiver\`.
- MySQL: \`Seconds_Behind_Master\`.
- MongoDB: \`rs.printSecondaryReplicationInfo()\`.

## Failover

Failover adalah proses mempromosikan standby menjadi primary. Terdapat dua pendekatan:

- **Manual failover**: DBA memutuskan dan menjalankan promote.
- **Automatic failover**: tools seperti Patroni, repmgr, atau Orchestrator memantau dan melakukan promote otomatis.

Failover dapat menyebabkan **split-brain** jika primary lama belum benar-benar mati. Oleh karena itu, diperlukan mekanisme fencing seperti STONITH.

## Semi-Synchronous Replication

MySQL menyediakan semi-synchronous replication: primary menunggu acknowledgment dari setidaknya satu standby, tetapi tidak semua. Ini merupakan kompromi antara durability dan latency.`,
    },
    {
      id: "sec-01-04",
      type: 'code-example',
      codeExample: {
        id: "code-01-ts",
        filename: "replica-pool.ts",
        language: 'typescript',
        title: "TypeScript: Typed Replica Pool dengan Lag Monitoring",
        code: "type Replica = {\n  id: string\n  host: string\n  lagMs: number\n  healthy: boolean\n  isSync: boolean\n}\n\ntype QueryKind = 'read' | 'write' | 'critical'\n\nclass TypedReplicaPool {\n  constructor(private replicas: Replica[]) {}\n\n  pick(kind: QueryKind, maxLagMs = 500): Replica | null {\n    if (kind === 'write' || kind === 'critical') {\n      const syncReplicas = this.replicas.filter((r) => r.healthy && r.isSync)\n      return syncReplicas[0] ?? null\n    }\n    const eligible = this.replicas.filter(\n      (r) => r.healthy && !r.isSync && r.lagMs <= maxLagMs\n    )\n    if (eligible.length === 0) return null\n    return eligible.reduce((a, b) => (a.lagMs <= b.lagMs ? a : b))\n  }\n}\n\nconst pool = new TypedReplicaPool([\n  { id: 'primary', host: 'db-primary', lagMs: 0, healthy: true, isSync: true },\n  { id: 'async-1', host: 'db-replica-1', lagMs: 120, healthy: true, isSync: false },\n  { id: 'async-2', host: 'db-replica-2', lagMs: 40, healthy: true, isSync: false },\n])\n\nconsole.log(pool.pick('write')?.id) // primary\nconsole.log(pool.pick('read')?.id) // async-2",
        explanation: "Pool ini memisahkan query write/critical yang harus ke primary/sync replica dengan query read yang bisa dialihkan ke async replica berdasarkan lag terendah.",
      },
    },
    {
      id: "sec-01-05",
      type: 'markdown',
      level: 'advanced',
      title: "Logical Replication, Multi-Master & Conflict Resolution",
      content: `## Logical Replication

Berbeda dengan physical replication yang menyalin byte WAL, **logical replication** menyalin perubahan pada level row. Keuntungannya:

- **Partial replication**: hanya tabel atau row tertentu yang direplikasi.
- **Cross-version replication**: primary dan subscriber bisa berbeda versi PostgreSQL.
- **Replikasi ke target berbeda**: misalnya ke data warehouse.

Di PostgreSQL, logical replication menggunakan **publication** di sisi publisher dan **subscription** di sisi subscriber.

## Replication Slot

**Replication slot** memastikan primary tidak menghapus WAL sebelum standby mengonsumsinya. Ada dua jenis:

- **Physical slot**: untuk streaming replication.
- **Logical slot**: untuk logical decoding, misalnya Debezium.

Hati-hati: slot yang tidak dikonsumsi dapat menyebabkan WAL menumpuk dan disk penuh.

## Multi-Master Replication

Multi-master memungkinkan write di beberapa node secara bersamaan. Ini menarik untuk availability dan locality, tetapi menimbulkan konflik.

Contoh tools:
- PostgreSQL: BDR (Bi-Directional Replication).
- MySQL: Group Replication, Galera Cluster.
- CockroachDB/TiDB: consensus-based multi-region.

## Conflict Resolution

Ketika dua node menulis row yang sama, diperlukan strategi resolusi:

- **Last-write-wins (LWW)**: timestamp atau vector clock menentukan pemenang.
- **Application-level merge**: aplikasi memutuskan cara menggabungkan perubahan.
- **Operational transform**: umum di collaborative editing.
- **Paxos/Raft**: consensus protocol yang menghindari konflik dengan memilih leader untuk setiap operasi.

## Replication Lag Under The Hood

Dalam streaming replication, standby menerapkan WAL secara berurutan. Jika satu query di standby memegang lock lama, replay bisa tertahan. Hot standby feedback dapat membantu primary menghindari cleanup row version yang masih dibaca standby.`,
    },
    {
      id: "sec-01-06",
      type: 'code-example',
      codeExample: {
        id: "code-01-go",
        filename: "replica_router.go",
        language: 'go',
        title: "Go: Replica Routing dengan Health Check",
        code: "package main\n\nimport (\n\t\"context\"\n\t\"database/sql\"\n\t\"fmt\"\n\t\"time\"\n\n\t_ \"github.com/lib/pq\"\n)\n\ntype Replica struct {\n\tDSN     string\n\tLag     time.Duration\n\tHealthy bool\n\tDB      *sql.DB\n}\n\nfunc (r *Replica) CheckHealth(ctx context.Context) error {\n\tctx, cancel := context.WithTimeout(ctx, 2*time.Second)\n\tdefer cancel()\n\treturn r.DB.PingContext(ctx)\n}\n\nfunc (r *Replica) MeasureLag(ctx context.Context) (time.Duration, error) {\n\tvar lagSeconds float64\n\t// Contoh untuk PostgreSQL standby\n\tquery := `SELECT EXTRACT(EPOCH FROM (now() - pg_last_xact_replay_timestamp()))`\n\terr := r.DB.QueryRowContext(ctx, query).Scan(&lagSeconds)\n\tif err != nil {\n\t\treturn 0, err\n\t}\n\treturn time.Duration(lagSeconds * float64(time.Second)), nil\n}\n\nfunc PickReadReplica(replicas []Replica, maxLag time.Duration) (*Replica, error) {\n\tfor i := range replicas {\n\t\tctx := context.Background()\n\t\tif err := replicas[i].CheckHealth(ctx); err != nil {\n\t\t\treplicas[i].Healthy = false\n\t\t\tcontinue\n\t\t}\n\t\tlag, err := replicas[i].MeasureLag(ctx)\n\t\tif err != nil {\n\t\t\tcontinue\n\t\t}\n\t\treplicas[i].Lag = lag\n\t\tif lag <= maxLag {\n\t\t\treturn &replicas[i], nil\n\t\t}\n\t}\n\treturn nil, fmt.Errorf(\"no healthy replica within lag threshold\")\n}",
        explanation: "Implementasi Go ini menunjukkan bagaimana aplikasi dapat memeriksa kesehatan dan lag sebelum mengirim query read ke sebuah replica.",
      },
    },
    {
      id: "sec-01-07",
      type: 'callout',
      calloutType: 'info',
      content: `Kesimpulan: Pilih asynchronous replication untuk throughput tinggi dan toleransi latency, tetapi gunakan synchronous replication untuk transaksi kritis yang memerlukan zero data loss. Selalu pantau replication lag dan siapkan failover procedure yang teruji.

Tools populer 2026: Patroni, repmgr, pg_auto_failover, Debezium untuk CDC, dan BDR untuk multi-master PostgreSQL.`,
    },
  ],
}
