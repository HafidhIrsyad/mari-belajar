import type { Chapter } from '@/content/types'
import { ch02Lesson } from './lesson'
import { ch02Quiz } from './quiz'
import { ch02References } from './references'

export const ch02SqlCrudDdl: Chapter = {
  id: 'ch-02-sql-crud-ddl',
  slug: 'ch-02-sql-crud-ddl',
  order: 2,
  title: 'SQL CRUD & DDL',
  summary:
    'Menguasai perintah SQL untuk memanipulasi data (CRUD) dan mendefinisikan struktur table, constraint, tipe data, serta CTE untuk query yang lebih terstruktur.',
  estimatedMinutes: 45,
  learningObjectives: [
    'Menulis perintah SELECT, INSERT, UPDATE, dan DELETE dengan benar.',
    'Membuat dan mengubah struktur table menggunakan CREATE TABLE, ALTER, dan DROP.',
    'Menerapkan constraint NOT NULL, UNIQUE, CHECK, DEFAULT, dan FOREIGN KEY.',
    'Memilih tipe data yang sesuai untuk performa dan integritas.',
    'Menggunakan Common Table Expressions (CTE) untuk query modular.',
  ],
  summaryPoints: [
    'CRUD mencakup empat operasi dasar: Create (INSERT), Read (SELECT), Update (UPDATE), Delete (DELETE).',
    'DDL (Data Definition Language) mengatur struktur table, column, constraint, dan index.',
    'Constraint menjaga kualitas data di level database, bukan hanya aplikasi.',
    'CTE membuat query kompleks lebih mudah dibaca dan dipelihara.',
    'Tipe data yang tepat menghemat penyimpanan dan mempercepat pemrosesan.',
  ],
  references: ch02References,
  lesson: ch02Lesson,
  quiz: ch02Quiz,
}
