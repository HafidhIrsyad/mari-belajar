import type { Chapter } from '@/content/types'
import { ch07Lesson } from './lesson'
import { ch07Quiz } from './quiz'
import { ch07References } from './references'

export const ch07DatabaseAtScale: Chapter = {
  id: 'ch-07-database-at-scale',
  slug: 'ch-07-database-at-scale',
  order: 7,
  title: 'Database at Scale',
  summary:
    'Mempelajari read replicas, connection pooling, sharding, partitioning, CQRS read model, distributed transactions 2PC, saga, serta NewSQL/CockroachDB untuk database skala besar.',
  estimatedMinutes: 55,
  learningObjectives: [
    'Menggunakan read replicas untuk offload query baca.',
    'Mengkonfigurasi connection pool agar efisien di skala besar.',
    'Memahami strategi sharding dan partitioning.',
    'Menerapkan CQRS read model untuk workload baca berat.',
    'Mengenali distributed transactions dan peran saga pattern.',
  ],
  summaryPoints: [
    'Read replicas menurunkan beban primary dengan melayani query baca.',
    'Connection pool yang tepat mencegah exhaustion koneksi database.',
    'Sharding membagi data horizontally berdasarkan shard key.',
    'Partitioning membagi tabel besar menjadi bagian yang lebih kecil dan mudah dikelola.',
    'Distributed transactions memerlukan koordinasi; saga memberikan alternatif tanpa 2PC.',
  ],
  references: ch07References,
  lesson: ch07Lesson,
  quiz: ch07Quiz,
}
