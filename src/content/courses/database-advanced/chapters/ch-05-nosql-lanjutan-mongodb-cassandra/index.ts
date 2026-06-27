import type { Chapter } from '@/content/types'
import { ch05Lesson } from './lesson'
import { ch05Quiz } from './quiz'
import { ch05References } from './references'

export const ch05NosqlLanjutanMongodbCassandra: Chapter = {
  id: "ch-05-nosql-lanjutan-mongodb-cassandra",
  slug: "ch-05-nosql-lanjutan-mongodb-cassandra",
  order: 5,
  title: "NoSQL Lanjutan: MongoDB & Cassandra",
  summary: "Mendalami MongoDB aggregation pipeline, indexing lanjutan, Cassandra data modeling, serta konsep replica set, write concern, dan tunable consistency.",
  estimatedMinutes: 60,
  learningObjectives: [
    "Menulis query MQL dan aggregation pipeline di MongoDB.",
    "Memahami Cassandra data modeling berbasis query pattern.",
    "Mengoptimalkan index di MongoDB untuk workload read/write.",
    "Menjelaskan peran replica set dan write concern.",
    "Mengkonfigurasi consistency level di Cassandra.",
  ],
  summaryPoints: [
    "MongoDB aggregation pipeline memproses data secara staged seperti Unix pipeline.",
    "Cassandra data modeling didesain berdasarkan query pattern, bukan normalisasi.",
    "Compound index dan covered query meningkatkan performa MongoDB.",
    "Write concern menentukan durability dan replication acknowledgment.",
    "Tunable consistency di Cassandra memungkinkan trade-off C/A per query.",
  ],
  references: ch05References,
  lesson: ch05Lesson,
  quiz: ch05Quiz,
}
