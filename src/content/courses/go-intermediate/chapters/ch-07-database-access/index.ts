import type { Chapter } from '@/content/types'
import { ch07Lesson } from './lesson'
import { ch07Quiz } from './quiz'
import { ch07References } from './references'

export const ch07DatabaseAccess: Chapter = {
  id: 'ch-07-database-access',
  slug: 'ch-07-database-access',
  order: 7,
  title: 'Database Access dasar (database/sql)',
  summary:
    'Mengakses database relational dengan database/sql: koneksi pool, query, prepared statement, transaksi, repository pattern, serta pemahaman internals connection pool.',
  estimatedMinutes: 45,
  learningObjectives: [
    'Membuka koneksi database dengan sql.Open dan driver yang sesuai.',
    'Menggunakan Query, QueryRow, dan Exec untuk operasi CRUD.',
    'Mengelola transaksi dengan Begin, Commit, dan Rollback.',
    'Memahami konfigurasi connection pool (SetMaxOpenConns, SetMaxIdleConns).',
    'Menerapkan repository pattern untuk isolasi akses data.',
    'Memahami cara database/sql mengelola connection pool di balik layar.',
  ],
  summaryPoints: [
    'database/sql menyediakan abstraction umum untuk database relational di Go.',
    'sql.DB adalah connection pool, bukan satu koneksi.',
    'Query mengembalikan Rows, QueryRow mengembalikan satu baris, dan Exec untuk perintah yang tidak mengembalikan baris.',
    'Transaksi menggunakan sql.Tx yang menjamin atomicitas operasi.',
    'Connection pool dapat dikonfigurasi untuk membatasi koneksi terbuka dan idle.',
    'Repository pattern memisahkan logika akses data dari logika bisnis.',
  ],
  references: ch07References,
  lesson: ch07Lesson,
  quiz: ch07Quiz,
}
