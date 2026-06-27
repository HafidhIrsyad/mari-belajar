import type { Chapter } from '@/content/types'
import { ch06Lesson } from './lesson'
import { ch06Quiz } from './quiz'
import { ch06References } from './references'

export const ch06TransactionsAcid: Chapter = {
  id: 'ch-06-transactions-acid',
  slug: 'ch-06-transactions-acid',
  order: 6,
  title: 'Transactions & ACID',
  summary:
    'Memahami transaksi, sifat ACID, tingkat isolasi, anomali isolasi, deadlock, serta konsep MVCC yang memungkinkan konkurensi tinggi tanpa mengorbankan konsistensi.',
  estimatedMinutes: 55,
  learningObjectives: [
    'Menjelaskan empat sifat ACID: Atomicity, Consistency, Isolation, Durability.',
    'Membedakan tingkat isolasi READ UNCOMMITTED, READ COMMITTED, REPEATABLE READ, dan SERIALIZABLE.',
    'Mengidentifikasi dirty read, non-repeatable read, dan phantom read.',
    'Memahami deadlock dan strategi pencegahannya.',
    'Menjelaskan konsep MVCC sebagai dasar konkurensi modern.',
  ],
  summaryPoints: [
    'Transaksi mengelompokkan beberapa operasi menjadi satu unit kerja yang berhasil seluruhnya atau gagal seluruhnya.',
    'ACID menjamin atomicity, consistency, isolation, dan durability.',
    'Tingkat isolasi lebih tinggi memberikan konsistensi lebih kuat tetapi mengurangi konkurensi.',
    'MVCC membuat reader dan writer tidak saling memblokir secara berlebihan.',
    'Deadlock terjadi ketika dua transaksi saling menunggu lock; database biasanya membatalkan salah satu transaksi.',
  ],
  references: ch06References,
  lesson: ch06Lesson,
  quiz: ch06Quiz,
}
