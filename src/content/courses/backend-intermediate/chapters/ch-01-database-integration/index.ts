import type { Chapter } from '@/content/types'
import { ch01Lesson } from './lesson'
import { ch01Quiz } from './quiz'
import { ch01References } from './references'

export const ch01DatabaseIntegration: Chapter = {
  id: 'ch-01-database-integration',
  slug: 'ch-01-database-integration',
  order: 1,
  title: 'Database Integration',
  summary:
    'Memahami pola integrasi database mulai dari ORM, query builder, dan raw SQL hingga repository pattern, transaksi, migrasi, connection pooling, serta optimasi query.',
  estimatedMinutes: 45,
  learningObjectives: [
    'Membedakan ORM, query builder, dan raw SQL serta kapan memakai masing-masing.',
    'Menerapkan repository pattern untuk memisahkan logika akses data dari bisnis.',
    'Menjalankan transaksi ACID dan menyusun migrasi schema yang aman.',
    'Mengkonfigurasi connection pool agar aplikasi tidak kehabisan koneksi database.',
    'Mengenali anti-pattern N+1 query dan dasar optimasi dengan indeks.',
  ],
  summaryPoints: [
    'ORM mempercepat CRUD tetapi bisa menyembunyikan query yang tidak efisien.',
    'Repository pattern membuat kode bisnis tidak bergantung pada library database tertentu.',
    'Transaksi menjamin atomicity, consistency, isolation, dan durability (ACID).',
    'Connection pool menyimpan koneksi siap pakai sehingga mengurangi overhead pembukaan koneksi.',
    'Gunakan EXPLAIN dan indeks secukupnya untuk menghindari full table scan.',
  ],
  references: ch01References,
  lesson: ch01Lesson,
  quiz: ch01Quiz,
}
