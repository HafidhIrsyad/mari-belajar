import type { Chapter } from '@/content/types'
import { ch04Lesson } from './lesson'
import { ch04Quiz } from './quiz'
import { ch04References } from './references'

export const ch04MicroFrontendsPengantar: Chapter = {
  id: 'ch-04-micro-frontends-pengantar',
  slug: 'ch-04-micro-frontends-pengantar',
  order: 4,
  title: 'Micro-Frontends (Pengantar)',
  summary:
    'Pengenalan arsitektur micro-frontends, trade-offs integrasi, Module Federation, shared dependencies, routing, dan deployment independence dengan analogi service boundary.',
  estimatedMinutes: 40,
  learningObjectives: [
    'Menjelaskan definisi, motivasi, dan trade-offs micro-frontends.',
    'Membandingkan integrasi runtime (Module Federation) dan build-time.',
    'Memahami shared dependencies dan konsekuensi duplikasi library.',
    'Merancang routing dan isolasi state antar micro-frontend.',
    'Menyadari kapan monolith lebih baik daripada micro-frontends.',
  ],
  summaryPoints: [
    'Micro-frontends memecah frontend besar menjadi unit yang dapat dikembangkan dan di-deploy secara independen.',
    'Module Federation memungkinkan aplikasi memuat remote module saat runtime.',
    'Shared dependencies membutuhkan kesepakatan versi agar tidak terjadi duplikasi atau konflik.',
    'Routing dan state harus diisolasi untuk menghindari coupling tersembunyi.',
    'Micro-frontends menambah kompleksitas; gunakan hanya ketika tim dan skala membutuhkannya.',
  ],
  references: ch04References,
  lesson: ch04Lesson,
  quiz: ch04Quiz,
}
