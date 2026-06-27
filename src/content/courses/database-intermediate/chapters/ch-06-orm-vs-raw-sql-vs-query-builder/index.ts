import type { Chapter } from '@/content/types'
import { ch06Lesson } from './lesson'
import { ch06Quiz } from './quiz'
import { ch06References } from './references'

export const ch06OrmVsRawSqlVsQueryBuilder: Chapter = {
  id: "ch-06-orm-vs-raw-sql-vs-query-builder",
  slug: "ch-06-orm-vs-raw-sql-vs-query-builder",
  order: 6,
  title: "ORM vs Raw SQL vs Query Builder",
  summary: "Membandingkan ORM, raw SQL, dan query builder; memahami trade-off produktivitas versus kontrol, serta cara menghindari N+1 dan ineffisiensi query.",
  estimatedMinutes: 55,
  learningObjectives: ["Membandingkan kelebihan dan kekurangan ORM, raw SQL, dan query builder.","Mengidentifikasi dan memperbaiki masalah N+1.","Memahami lazy loading, eager loading, dan batch loading.","Menjelaskan unit of work dan identity map pada ORM.","Menentukan kapan turun ke raw SQL."],
  summaryPoints: ["ORM meningkatkan produktivitas dan konsistensi model, tetapi dapat menyembunyikan query buruk.","Raw SQL memberikan kontrol penuh tetapi membutuhkan lebih banyak maintenance.","Query builder menyeimbangkan kedua dunia dengan API terstruktur.","N+1 terjadi saat iterasi object memicu query tambahan untuk relasi.","Pahami lifecycle ORM agar query yang dihasilkan tidak mengejutkan."],
  references: ch06References,
  lesson: ch06Lesson,
  quiz: ch06Quiz,
}
