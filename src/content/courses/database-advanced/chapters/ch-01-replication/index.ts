import type { Chapter } from '@/content/types'
import { ch01Lesson } from './lesson'
import { ch01Quiz } from './quiz'
import { ch01References } from './references'

export const ch01Replication: Chapter = {
  id: "ch-01-replication",
  slug: "ch-01-replication",
  order: 1,
  title: "Replication",
  summary: "Memahami mekanisme replication dari master-slave sederhana hingga logical replication, multi-master, dan teknik penanganan replication lag serta failover.",
  estimatedMinutes: 60,
  learningObjectives: [
    "Menjelaskan perbedaan streaming replication dan logical replication.",
    "Memahami trade-off synchronous versus asynchronous replication.",
    "Mengukur dan mengatasi replication lag.",
    "Merancang failover dan konflik resolution pada multi-master.",
    "Menjelaskan peran WAL (Write-Ahead Log) dalam physical replication.",
  ],
  summaryPoints: [
    "Physical replication mengirimkan byte-level WAL dari primary ke standby.",
    "Asynchronous replication cepat tetapi berisiko kehilangan data saat failover.",
    "Synchronous replication menjamin durability di quorum standby tertentu.",
    "Logical replication mereplikasi perubahan row level dan memungkinkan partial replication.",
    "Multi-master memerlukan strategi konflik resolution karena write dapat terjadi di banyak node.",
  ],
  references: ch01References,
  lesson: ch01Lesson,
  quiz: ch01Quiz,
}
