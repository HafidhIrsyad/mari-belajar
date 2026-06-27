import type { Chapter } from '@/content/types'
import { ch02Lesson } from './lesson'
import { ch02Quiz } from './quiz'
import { ch02References } from './references'

export const ch02ExplainExecutionPlans: Chapter = {
  id: "ch-02-explain-execution-plans",
  slug: "ch-02-explain-execution-plans",
  order: 2,
  title: "EXPLAIN & Execution Plans",
  summary: "Membaca dan menganalisis execution plan dari EXPLAIN, memahami node-node utama, perbandingan estimated vs actual rows, serta buffer hits.",
  estimatedMinutes: 55,
  learningObjectives: ["Membaca output EXPLAIN dan EXPLAIN ANALYZE.","Memahami node Seq Scan, Index Scan, Index Only Scan, Nested Loop, Hash Join, Merge Join.","Mengartikan cost, rows, width, buffers shared hit/read.","Mendeteksi misestimation dan hot spot.","Menggunakan EXPLAIN FORMAT JSON dan visualizer."],
  summaryPoints: ["EXPLAIN menunjukkan plan; EXPLAIN ANALYZE mengeksekusi dan mengukur waktu nyata.","Cost terdiri dari startup cost dan total cost.","Actual rows jauh berbeda dari estimated rows mengindikasikan statistik usang.","Buffers shared hit/read menggambarkan seberapa banyak data berasal dari cache atau disk.","Format JSON memudahkan parsing plan secara otomatis."],
  references: ch02References,
  lesson: ch02Lesson,
  quiz: ch02Quiz,
}
