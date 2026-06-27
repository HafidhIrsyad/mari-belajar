import type { Chapter } from '@/content/types'
import { ch05Lesson } from './lesson'
import { ch05Quiz } from './quiz'
import { ch05References } from './references'

export const ch05ResponseErrorHandling: Chapter = {
  id: 'ch-05-response-error-handling',
  slug: 'ch-05-response-error-handling',
  order: 5,
  title: 'Response & Error Handling',
  summary:
    'Membangun response yang konsisten, menangani error secara terpusat, menerapkan RFC 7807 Problem Details, dan menyusun logging sesuai prinsip twelve-factor.',
  estimatedMinutes: 30,
  learningObjectives: [
    'Membentuk response JSON dengan status code dan format yang konsisten.',
    'Membuat global exception filter atau error handler.',
    'Menerapkan RFC 7807 Problem Details untuk error response.',
    'Memahami retry hints dan error classification.',
    'Menyusun logging terstruktur sesuai 12factor.net.',
  ],
  summaryPoints: [
    'Response yang konsisten mengurangi kompleksitas client.',
    'Error handler global mencegah duplikasi logika penanganan error.',
    'RFC 7807 memberikan standar format error dengan type, title, status, detail, dan instance.',
    'Logging haruslah stream event, bukan file yang dikelola aplikasi.',
    'Klasifikasi error retryable vs non-retryable membantu client memutuskan apakah akan mencoba ulang.',
  ],
  references: ch05References,
  lesson: ch05Lesson,
  quiz: ch05Quiz,
}
