import type { Chapter } from '@/content/types'
import { ch07Lesson } from './lesson'
import { ch07Quiz } from './quiz'
import { ch07References } from './references'

export const ch07DatabasesAndSqlBasics: Chapter = {
  id: 'ch-07-databases-and-sql-basics',
  slug: 'ch-07-databases-and-sql-basics',
  order: 7,
  title: 'Basis Data dan SQL Dasar',
  summary:
    'Mempelajari DBMS, tabel, baris, kolom, primary key, foreign key, tipe data umum, SQL CRUD, JOIN, index, query optimization, EXPLAIN ANALYZE, serta transaksi dan ACID.',
  estimatedMinutes: 16,
  learningObjectives: [
    'Memahami peran DBMS dan komponen dasar tabel seperti baris, kolom, primary key, dan foreign key.',
    'Mengenal tipe data umum: integer, text, boolean, dan datetime.',
    'Menguasai perintah SQL CRUD: SELECT, INSERT, UPDATE, dan DELETE.',
    'Memahami penggunaan INNER JOIN dan LEFT JOIN untuk menggabungkan tabel.',
    'Mengenal konsep index dan bagaimana index mempercepat query.',
    'Memahami pengantar query optimization, EXPLAIN ANALYZE, transaksi, dan ACID.',
  ],
  summaryPoints: [
    'DBMS mengelola data secara terstruktur dan andal.',
    'Tabel terdiri dari baris dan kolom; primary key mengidentifikasi unik setiap baris.',
    'Foreign key menghubungkan data antar tabel.',
    'SQL CRUD mencakup SELECT, INSERT, UPDATE, dan DELETE.',
    'JOIN menggabungkan data dari dua tabel berdasarkan kolom terkait.',
    'Index mempercepat pencarian tetapi memperlambat penulisan data.',
    'Transaksi yang baik memenuhi sifat ACID: Atomicity, Consistency, Isolation, Durability.',
  ],
  references: ch07References,
  lesson: ch07Lesson,
  quiz: ch07Quiz,
}
