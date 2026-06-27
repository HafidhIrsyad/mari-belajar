import type { Chapter } from '@/content/types'
import { ch07Lesson } from './lesson'
import { ch07Quiz } from './quiz'
import { ch07References } from './references'

export const ch07DataWarehouseOlap: Chapter = {
  id: "ch-07-data-warehouse-olap",
  slug: "ch-07-data-warehouse-olap",
  order: 7,
  title: "Data Warehouse & OLAP (Pengantar)",
  summary: "Mengenal perbedaan OLTP dan OLAP, star/snowflake schema, ETL/ELT, columnar storage, serta konsep data warehouse modern, data lake, dan data mesh.",
  estimatedMinutes: 60,
  learningObjectives: [
    "Membedakan karakteristik OLTP dan OLAP.",
    "Merancang star schema dan snowflake schema.",
    "Memahami proses ETL/ELT dan perannya di data pipeline.",
    "Menjelaskan keunggulan columnar storage untuk analytical query.",
    "Mengenal data lake, data warehouse modern, dan data mesh.",
  ],
  summaryPoints: [
    "OLTP dioptimalkan untuk transaksi cepat dan banyak concurrency; OLAP untuk analytical query pada data historis.",
    "Star schema memiliki fact table di pusat dan dimension tables di sekelilingnya.",
    "ETL mentransformasi data sebelum loading; ELT memuat data mentah lalu transformasi di warehouse.",
    "Columnar storage meningkatkan kompresi dan kecepatan aggregasi.",
    "Data mesh mendorong domain-driven ownership atas data analytical.",
  ],
  references: ch07References,
  lesson: ch07Lesson,
  quiz: ch07Quiz,
}
