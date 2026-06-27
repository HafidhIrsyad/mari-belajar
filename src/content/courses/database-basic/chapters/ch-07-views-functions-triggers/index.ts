import type { Chapter } from '@/content/types'
import { ch07Lesson } from './lesson'
import { ch07Quiz } from './quiz'
import { ch07References } from './references'

export const ch07ViewsFunctionsTriggers: Chapter = {
  id: 'ch-07-views-functions-triggers',
  slug: 'ch-07-views-functions-triggers',
  order: 7,
  title: 'Views, Functions & Triggers',
  summary:
    'Menguasai view untuk menyederhanakan query, stored function/procedure untuk logika di database, serta trigger untuk audit dan otomasi, dengan memahami trade-off maintainability dan performa.',
  estimatedMinutes: 45,
  learningObjectives: [
    'Membuat dan menggunakan view serta materialized view.',
    'Menulis stored function untuk komputasi yang sering dipakai.',
    'Mengimplementasikan trigger untuk audit trail dan validasi.',
    'Memahami perbedaan stored function dan stored procedure.',
    'Mengevaluasi dampak performa dan maintainability dari logika di database.',
  ],
  summaryPoints: [
    'View adalah query tersimpan yang berperilaku seperti virtual table.',
    'Materialized view menyimpan hasil query secara fisik dan dapat di-refresh.',
    'Stored function mengembalikan nilai dan dapat dipanggil dalam query.',
    'Trigger mengeksekusi logika otomatis saat terjadi INSERT, UPDATE, atau DELETE.',
    'Logika di database memudahkan konsistensi tetapi bisa menyulitkan testing dan versioning.',
  ],
  references: ch07References,
  lesson: ch07Lesson,
  quiz: ch07Quiz,
}
