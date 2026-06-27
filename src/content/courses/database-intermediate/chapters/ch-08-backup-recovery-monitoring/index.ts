import type { Chapter } from '@/content/types'
import { ch08Lesson } from './lesson'
import { ch08Quiz } from './quiz'
import { ch08References } from './references'

export const ch08BackupRecoveryMonitoring: Chapter = {
  id: "ch-08-backup-recovery-monitoring",
  slug: "ch-08-backup-recovery-monitoring",
  order: 8,
  title: "Backup, Recovery & Monitoring",
  summary: "Mempelajari strategi backup fisik dan logis, point-in-time recovery, replication, serta monitoring dengan pg_stat_statements dan slow query log.",
  estimatedMinutes: 55,
  learningObjectives: ["Membedakan logical backup dan physical backup.","Melakukan point-in-time recovery dengan WAL archiving.","Mengkonfigurasi replication dan failover.","Memantau performa dengan pg_stat_statements dan sistem catalog.","Menyusun strategi backup, retention, dan alerting."],
  summaryPoints: ["Logical backup (pg_dump) portabel; physical backup (pg_basebackup) cepat untuk PITR.","WAL archiving memungkinkan recovery ke titik waktu tertentu.","Streaming replication menyediakan hot standby untuk failover.","pg_stat_statements mengidentifikasi query paling banyak mengonsumsi resource.","Backup tidak cukup tanpa restore test secara berkala."],
  references: ch08References,
  lesson: ch08Lesson,
  quiz: ch08Quiz,
}
