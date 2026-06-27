import type { Lesson } from '@/content/types'

export const ch08Lesson: Lesson = {
  id: "lesson-ch-08-backup-recovery-monitoring",
  estimatedMinutes: 55,
  sections: [
    {
      id: "sec-08-$1",
      type: 'markdown',
      level: 'basic',
      title: "Pengantar Backup, Recovery & Monitoring",
      content: `## Jenis Backup

- **Logical backup**: \`pg_dump\`, \`mysqldump\`, \`mongodump\`. Menyimpan definisi skema dan data sebagai SQL/JSON. Portabel antar versi tetapi lambat untuk restore besar.
- **Physical backup**: \`pg_basebackup\`, filesystem snapshot, per-file copy. Menyimpan file data binary. Cepat untuk restore dan mendukung PITR.

## Point-in-Time Recovery (PITR)

PITR memungkinkan restore database ke waktu tertentu dengan kombinasi:

1. Base backup (physical).
2. WAL archive (semua perubahan setelah base backup).
3. Recovery target (timestamp, transaction ID, atau LSN).

Di PostgreSQL, konfigurasi \`archive_mode = on\` dan \`archive_command\` mengaktifkan WAL archiving.

## Retention Policy

Tentukan berapa lama backup disimpan berdasarkan:

- Kebutuhan compliance.
- Frekuensi backup.
- RTO (Recovery Time Objective) dan RPO (Recovery Point Objective).

Simpan backup di lokasi terpisah (offsite/object storage) untuk ketahanan bencana.`,
    },
    {
      id: "sec-08-$1",
      type: 'code-example',
      codeExample: {
        id: "code-08-js",
        filename: "backup-schedule.js",
        language: 'javascript',
        title: "JavaScript: Validator Retention Schedule",
        code: "function validateRetention(fullBackups, walRetentionDays, rpoHours) {\n  const errors = []\n  if (fullBackups.length === 0) {\n    errors.push(\"Setidaknya harus ada satu full backup\")\n  }\n  if (walRetentionDays < rpoHours / 24) {\n    errors.push(\"WAL retention harus mencakup RPO\")\n  }\n  const sorted = [...fullBackups].sort((a, b) => a - b)\n  let gap = 0\n  for (let i = 1; i < sorted.length; i++) {\n    gap = Math.max(gap, sorted[i] - sorted[i - 1])\n  }\n  if (gap > 7) {\n    errors.push(\"Jarak antar full backup tidak boleh lebih dari 7 hari\")\n  }\n  return errors\n}\n\nconsole.log(validateRetention([1, 4, 8], 3, 24))\n// Menyalahi jarak antar backup karena 8 - 4 = 4 hari <=7, lalu 1..4 =3 -> ok",
        explanation: "Validator sederhana membantu memastikan jadwal backup memenuhi kebijakan retensi dan RPO.",
      },
    },
    {
      id: "sec-08-$1",
      type: 'markdown',
      level: 'intermediate',
      title: "Konsep Menengah Backup, Recovery & Monitoring",
      content: `## Streaming Replication

PostgreSQL mendukung **streaming replication** dengan WAL sender di primary dan WAL receiver di standby. Standby dapat berupa:

- **Hot standby**: standby menerima query read-only.
- **Warm standby**: standby tidak menerima query.

Failover manual menggunakan \`pg_ctl promote\`; failover otomatis membutuhkan tool seperti Patroni, repmgr, atau pg_auto_failover.

## Replication Lag

Replication lag adalah keterlambatan standby mengejar primary. Penyebab:

- Network latency.
- Standby overload.
- Large transaction yang menghasilkan banyak WAL.

Monitoring: \`pg_stat_replication\` di primary dan \`pg_stat_wal_receiver\` di standby.

## Logical Replication

PostgreSQL 10+ mendukung logical replication untuk mereplikasi subset table ke subscriber. Berguna untuk:

- Migrasi antar versi.
- Consolidasi data ke data warehouse.
- Isolasi workload analytical.`,
    },
    {
      id: "sec-08-$1",
      type: 'code-example',
      codeExample: {
        id: "code-08-ts",
        filename: "monitoring-checks.ts",
        language: 'typescript',
        title: "TypeScript: Health Check Indikator Database",
        code: "interface DBMetric {\n  replicationLagBytes: number\n  sharedBufferHitRatio: number\n  activeConnections: number\n  maxConnections: number\n}\n\nfunction assessHealth(m: DBMetric): string[] {\n  const alerts: string[] = []\n  if (m.replicationLagBytes > 1_000_000_000) {\n    alerts.push(\"Replication lag > 1GB\")\n  }\n  if (m.sharedBufferHitRatio < 0.95) {\n    alerts.push(\"Buffer hit ratio rendah\")\n  }\n  const utilization = m.activeConnections / m.maxConnections\n  if (utilization > 0.8) {\n    alerts.push(\"Koneksi mendekati batas maksimum\")\n  }\n  return alerts\n}\n\nconsole.log(assessHealth({\n  replicationLagBytes: 500_000_000,\n  sharedBufferHitRatio: 0.94,\n  activeConnections: 85,\n  maxConnections: 100,\n}))",
        explanation: "Health check otomatis membantu mendeteksi replication lag, cache efficiency, dan connection exhaustion.",
      },
    },
    {
      id: "sec-08-$1",
      type: 'markdown',
      level: 'advanced',
      title: "Internal Lanjutan Backup, Recovery & Monitoring",
      content: `## pg_stat_statements dan Query Profiling

\`pg_stat_statements\` melacak query yang dieksekusi beserta:

- Total execution time.
- Mean dan stddev time.
- Jumlah calls.
- Rows returned.
- Shared buffers hit/read.

Gunakan untuk mengidentifikasi query yang paling banyak mengonsumsi waktu: \`total_exec_time × calls\`.

## Slow Query Log

\`log_min_duration_statement\` membuat PostgreSQL mencatat query yang melebihi threshold. Kombinasikan dengan \`auto_explain\` untuk mencatat plan query lambat.

## Checkpoint dan WAL Tuning

- **checkpoint_timeout**: seberapa sering checkpoint.
- **max_wal_size**: batas WAL sebelum checkpoint dipaksa.
- **checkpoint_completion_target**: memperlancar I/O checkpoint.

Checkpoint terlalu sering meningkatkan I/O; terlalu jarang memperpanjang recovery time.

## Barman dan WAL-G

- **Barman**: tool backup dan recovery management untuk PostgreSQL.
- **WAL-G**: utility untuk compressed, encrypted WAL archiving dan base backup ke cloud storage.

## Backup Verification

Backup yang tidak pernah di-restore tidak ada gunanya. Lakukan:

- Restore test berkala ke environment isolasi.
- Validasi checksum dan consistency.
- Latih runbook failover dan PITR.`,
    },
    {
      id: "sec-08-$1",
      type: 'code-example',
      codeExample: {
        id: "code-08-go",
        filename: "main.go",
        language: 'go',
        title: "Go: Membaca pg_stat_statements",
        code: "package main\n\nimport (\n\t\"database/sql\"\n\t\"fmt\"\n\t\"log\"\n\n\t_ \"github.com/lib/pq\"\n)\n\nfunc main() {\n\tdb, err := sql.Open(\"postgres\", \"postgres://user:pass@localhost/shop?sslmode=disable\")\n\tif err != nil {\n\t\tlog.Fatal(err)\n\t}\n\tdefer db.Close()\n\n\trows, err := db.Query(`\n\t\tSELECT query, calls, total_exec_time, mean_exec_time\n\t\tFROM pg_stat_statements\n\t\tORDER BY total_exec_time DESC\n\t\tLIMIT 5\n\t`)\n\tif err != nil {\n\t\tlog.Fatal(err)\n\t}\n\tdefer rows.Close()\n\n\tfor rows.Next() {\n\t\tvar query string\n\t\tvar calls int\n\t\tvar total, mean float64\n\t\tif err := rows.Scan(&query, &calls, &total, &mean); err != nil {\n\t\t\tlog.Fatal(err)\n\t\t}\n\t\tfmt.Printf(\"%.2f ms | calls=%d | %s\\n\", total, calls, query)\n\t}\n}",
        explanation: "pg_stat_statements memberikan visibilitas query paling boros waktu eksekusi untuk prioritas optimasi.",
      },
    },
    {
      id: "sec-08-$1",
      type: 'callout',
      calloutType: 'info',
      content: `Kesimpulan: Backup adalah asuransi, tetapi baru berguna jika restore diuji. Pantau lag, buffer hit ratio, dan query lambat. Rancang RTO/RPO dan otomasikan failover jika diperlukan.`,
    },
  ],
}
