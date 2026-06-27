import type { Chapter } from '@/content/types'
import { ch03Lesson } from './lesson'
import { ch03Quiz } from './quiz'
import { ch03References } from './references'

export const ch03RoutingControllers: Chapter = {
  id: 'ch-03-routing-controllers',
  slug: 'ch-03-routing-controllers',
  order: 3,
  title: 'Routing & Controllers',
  summary:
    'Mengelola route, path parameters, query parameters, dan pola controller dengan middleware grouping, dependency injection dasar, serta penanganan CORS dan content negotiation.',
  estimatedMinutes: 30,
  learningObjectives: [
    'Mendefinisikan route dan membaca path serta query parameters.',
    'Menerapkan pola controller agar logika bisnis terpisah dari transport layer.',
    'Mengelompokkan route berdasarkan middleware dan prefix.',
    'Memahami dasar dependency injection untuk menyusun service.',
    'Menangani CORS dan content negotiation secara tepat.',
  ],
  summaryPoints: [
    'Route menghubungkan URL dan metode HTTP ke handler.',
    'Controller memisahkan logika request/response dari logika bisnis.',
    'Middleware grouping memudahkan penerapan kebijakan pada sekelompok route.',
    'Dependency injection meningkatkan testability dengan mengganti dependency saat testing.',
    'CORS dan content negotiation melindungi client dan menyesuaikan format response.',
  ],
  references: ch03References,
  lesson: ch03Lesson,
  quiz: ch03Quiz,
}
