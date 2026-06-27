import type { Chapter } from '@/content/types'
import { ch04Lesson } from './lesson'
import { ch04Quiz } from './quiz'
import { ch04References } from './references'

export const ch04DistributedTransactions: Chapter = {
  id: "ch-04-distributed-transactions",
  slug: "ch-04-distributed-transactions",
  order: 4,
  title: "Distributed Transactions",
  summary: "Mempelajari distributed transactions melalui two-phase commit, saga pattern, outbox pattern, serta perbedaan choreography dan orchestration untuk menjaga konsistensi di sistem terdistribusi.",
  estimatedMinutes: 60,
  learningObjectives: [
    "Menjelaskan cara kerja two-phase commit (2PC) dan kelemahannya.",
    "Merancang saga dengan kompensasi untuk transaksi panjang.",
    "Membedakan choreography dan orchestration.",
    "Mengimplementasikan outbox pattern untuk reliable messaging.",
    "Memahami peran idempotency key dalam distributed transactions.",
  ],
  summaryPoints: [
    "2PC menjamin atomicity tetapi rentan terhadap blocking saat coordinator gagal.",
    "Saga memecah transaksi panjang menjadi langkah-langkah lokal dengan kompensasi.",
    "Choreography lebih longgar tetapi lebih sulit di-trace; orchestration lebih terpusat.",
    "Outbox pattern menjaga konsistensi antara database write dan event publication.",
    "Idempotency key mencegah efek ganda saat request diulang.",
  ],
  references: ch04References,
  lesson: ch04Lesson,
  quiz: ch04Quiz,
}
