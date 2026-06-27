import type { Chapter } from '@/content/types'
import { ch06Lesson } from './lesson'
import { ch06Quiz } from './quiz'
import { ch06References } from './references'

export const ch06MiddlewareCrossCutting: Chapter = {
  id: 'ch-06-middleware-cross-cutting',
  slug: 'ch-06-middleware-cross-cutting',
  order: 6,
  title: 'Middleware & Cross-Cutting Concerns',
  summary:
    'Menerapkan middleware untuk logging, keamanan header, CORS, autentikasi dasar, rate limiting, request ID, dan observability, serta memahami komposisi dan ordering middleware.',
  estimatedMinutes: 30,
  learningObjectives: [
    'Menjelaskan signature middleware dan cara kerjanya di request lifecycle.',
    'Menerapkan request logging, security headers, dan CORS.',
    'Membuat autentikasi middleware dasar dan rate limiting intro.',
    'Menggunakan request ID untuk tracing sederhana.',
    'Memahami middleware ordering dan komposisi untuk observability.',
  ],
  summaryPoints: [
    'Middleware adalah fungsi yang dieksekusi di antara request dan handler utama.',
    'Cross-cutting concerns seperti logging, keamanan, dan CORS sebaiknya diimplementasikan sebagai middleware.',
    'Request ID memungkinkan pelacakan alur request melalui log.',
    'Rate limiting melindungi server dari beban berlebih dan serangan brute force.',
    'Urutan middleware menentukan urutan eksekusi inbound dan outbound.',
  ],
  references: ch06References,
  lesson: ch06Lesson,
  quiz: ch06Quiz,
}
