import type { Chapter } from '@/content/types'
import { ch03Lesson } from './lesson'
import { ch03Quiz } from './quiz'
import { ch03References } from './references'

export const ch03CapTheoremDistributedDatabases: Chapter = {
  id: "ch-03-cap-theorem-distributed-databases",
  slug: "ch-03-cap-theorem-distributed-databases",
  order: 3,
  title: "CAP Theorem & Distributed Databases",
  summary: "Memahami CAP theorem, perbedaan sistem CP dan AP, PACELC, serta mekanisme konsensus seperti Raft dan Paxos yang digunakan distributed database modern.",
  estimatedMinutes: 60,
  learningObjectives: [
    "Menjelaskan Consistency, Availability, dan Partition Tolerance dalam CAP theorem.",
    "Membedakan sistem CP dan AP serta contoh database masing-masing.",
    "Memahami PACELC sebagai perluasan CAP.",
    "Menjelaskan konsep quorum dan majority.",
    "Menguraikan cara kerja Raft consensus secara high-level.",
  ],
  summaryPoints: [
    "CAP theorem menyatakan bahwa saat network partition, sistem harus memilih consistency atau availability.",
    "CP systems mengorbankan availability demi konsistensi; AP systems mengorbankan konsistensi demi availability.",
    "PACELC memperluas CAP dengan trade-off latency vs consistency saat tidak ada partition.",
    "Quorum (majority) digunakan untuk memastikan keputusan toleran terhadap node failure.",
    "Raft dan Paxos adalah algoritma consensus untuk mencapai kesepakatan di distributed system.",
  ],
  references: ch03References,
  lesson: ch03Lesson,
  quiz: ch03Quiz,
}
