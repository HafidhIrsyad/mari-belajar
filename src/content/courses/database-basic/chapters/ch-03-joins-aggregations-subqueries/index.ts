import type { Chapter } from '@/content/types'
import { ch03Lesson } from './lesson'
import { ch03Quiz } from './quiz'
import { ch03References } from './references'

export const ch03JoinsAggregationsSubqueries: Chapter = {
  id: 'ch-03-joins-aggregations-subqueries',
  slug: 'ch-03-joins-aggregations-subqueries',
  order: 3,
  title: 'Joins, Aggregations & Subqueries',
  summary:
    'Menguasai teknik menggabungkan table dengan JOIN, merangkum data dengan aggregasi, serta menulis subquery dan window function untuk analisis yang lebih kuat.',
  estimatedMinutes: 50,
  learningObjectives: [
    'Membedakan INNER JOIN, LEFT JOIN, RIGHT JOIN, dan FULL OUTER JOIN.',
    'Menggunakan GROUP BY, HAVING, dan fungsi aggregasi COUNT, SUM, AVG, MIN, MAX.',
    'Menulis subquery dan correlated subquery untuk filter dinamis.',
    'Menggunakan window functions ROW_NUMBER, RANK, LAG, dan LEAD.',
    'Memahami perbedaan CTE recursive dan non-recursive.',
  ],
  summaryPoints: [
    'JOIN menggabungkan table berdasarkan kondisi relasi, biasanya kesamaan key.',
    'Aggregasi merangkum banyak row menjadi satu nilai; GROUP BY mengelompokkan sebelum aggregasi.',
    'HAVING memfilter hasil aggregasi, sedangkan WHERE memfilter row sebelum aggregasi.',
    'Subquery dapat berdiri sendiri atau berkorelasi dengan query luar.',
    'Window functions menghitung nilai berdasarkan partisi row tanpa mengurangi jumlah baris hasil.',
  ],
  references: ch03References,
  lesson: ch03Lesson,
  quiz: ch03Quiz,
}
