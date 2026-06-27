import type { Chapter } from '@/content/types'
import { ch01Lesson } from './lesson'
import { ch01Quiz } from './quiz'
import { ch01References } from './references'

export const ch01QueryOptimization: Chapter = {
  id: "ch-01-query-optimization",
  slug: "ch-01-query-optimization",
  order: 1,
  title: "Query Optimization",
  summary: "Memahami bagaimana database optimizer memilih execution plan berbasis statistik, selectivity, dan cost model; serta tektek menulis query yang sargable dan efisien.",
  estimatedMinutes: 55,
  learningObjectives: ["Menjelaskan perbedaan rule-based dan cost-based optimizer.","Menghitung selectivity dan cardinality dari predicate.","Mengidentifikasi query yang tidak sargable dan merubahnya menjadi sargable.","Memahami predicate pushdown dan join selectivity.","Menggunakan statistics dan histogram untuk membantu optimizer."],
  summaryPoints: ["Cost-based optimizer memilih plan dengan estimasi biaya I/O, CPU, dan memori terendah.","Selectivity rendah mendukung penggunaan index; selectivity tinggi cenderung sequential scan.","Query sargable menghindari fungsi pada kolom di sisi kiri predicate.","Predicate pushdown memindahkan filter sedekat mungkin dengan sumber data.","Statistik yang tidak akurat menyebabkan misestimation dan plan buruk."],
  references: ch01References,
  lesson: ch01Lesson,
  quiz: ch01Quiz,
}
