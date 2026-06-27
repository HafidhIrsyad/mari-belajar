import type { Chapter } from '@/content/types'
import { ch05Lesson } from './lesson'
import { ch05Quiz } from './quiz'
import { ch05References } from './references'

export const ch05ScalabilityReliability: Chapter = {
  id: 'ch-05-scalability-reliability',
  slug: 'ch-05-scalability-reliability',
  order: 5,
  title: 'Scalability & Reliability',
  summary:
    'Mempelajari scaling horizontal/vertical, stateless service, load balancer, auto-scaling, circuit breaker, bulkhead, retry dengan backoff, dan pengantar chaos engineering.',
  estimatedMinutes: 50,
  learningObjectives: [
    'Membedakan scaling vertikal dan horizontal serta kapan masing-masing dipakai.',
    'Mendesain stateless service agar mudah direplikasi.',
    'Menerapkan retry dengan exponential backoff dan jitter.',
    'Memahami circuit breaker dan bulkhead untuk reliability.',
    'Mengenali konsep graceful degradation dan chaos engineering.',
  ],
  summaryPoints: [
    'Scalability adalah kemampuan sistem menangani beban yang bertambah dengan menambah resource.',
    'Horizontal scaling menambah instance; vertical scaling meningkatkan kapasitas satu mesin.',
    'Stateless service memudahkan replikasi karena setiap request independen.',
    'Circuit breaker mencegah cascade failure dengan membuka sirkuit saat downstream gagal.',
    'Retry dengan backoff dan jitter mengurangi beban pada recovery transient failure.',
  ],
  references: ch05References,
  lesson: ch05Lesson,
  quiz: ch05Quiz,
}
