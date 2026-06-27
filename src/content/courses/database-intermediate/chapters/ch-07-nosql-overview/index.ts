import type { Chapter } from '@/content/types'
import { ch07Lesson } from './lesson'
import { ch07Quiz } from './quiz'
import { ch07References } from './references'

export const ch07NosqlOverview: Chapter = {
  id: "ch-07-nosql-overview",
  slug: "ch-07-nosql-overview",
  order: 7,
  title: "NoSQL Overview",
  summary: "Mengenal kategori NoSQL, trade-off CAP/BASE, model data key-value, document, wide-column, dan graph, serta internal storage seperti LSM-tree.",
  estimatedMinutes: 55,
  learningObjectives: ["Membedakan kategori NoSQL dan use case masing-masing.","Menjelaskan CAP theorem dan trade-off consistency vs availability.","Memahami BASE semantics.","Mengenal LSM-tree dan wide-column storage.","Memilih database yang sesuai untuk kebutuhan aplikasi."],
  summaryPoints: ["NoSQL mencakup key-value, document, wide-column, dan graph databases.","CAP theorem: Consistency, Availability, Partition Tolerance — pilih dua sesuai kebutuhan.","BASE menawarkan eventual consistency untuk skala tinggi.","LSM-tree mengoptimalkan write throughput melalui sequential writes.","Sharding dan replication adalah kunci horizontal scaling di NoSQL."],
  references: ch07References,
  lesson: ch07Lesson,
  quiz: ch07Quiz,
}
