import type { Chapter } from '@/content/types'
import { ch04Lesson } from './lesson'
import { ch04Quiz } from './quiz'
import { ch04References } from './references'

export const ch04RateLimitingThrottling: Chapter = {
  id: 'ch-04-rate-limiting-throttling',
  slug: 'ch-04-rate-limiting-throttling',
  order: 4,
  title: 'Rate Limiting & Throttling',
  summary:
    'Mempelajari algoritma rate limiting fixed window, token bucket, sliding window, serta implementasi Redis-backed dan distributed rate limiter untuk melindungi layanan.',
  estimatedMinutes: 45,
  learningObjectives: [
    'Membedakan rate limiting dan throttling.',
    'Menerapkan fixed window dan token bucket.',
    'Memahami sliding window dan distributed rate limiting.',
    'Menggunakan Redis sebagai backing store rate limiter.',
    'Merancang tiered limits dan adaptive throttling.',
  ],
  summaryPoints: [
    'Rate limiting membatasi jumlah request dalam periode tertentu untuk melindungi resource.',
    'Fixed window mudah diimplementasikan tetapi rawan burst di batas window.',
    'Token bucket mengizinkan burst terkontrol selama masih ada token.',
    'Sliding window memberikan distribusi lebih merata tetapi membutuhkan lebih banyak state.',
    'Distributed rate limiter memerlukan storage terpusat seperti Redis agar limit berlaku di semua instance.',
  ],
  references: ch04References,
  lesson: ch04Lesson,
  quiz: ch04Quiz,
}
