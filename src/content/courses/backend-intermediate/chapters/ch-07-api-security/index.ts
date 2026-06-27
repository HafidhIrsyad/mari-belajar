import type { Chapter } from '@/content/types'
import { ch07Lesson } from './lesson'
import { ch07Quiz } from './quiz'
import { ch07References } from './references'

export const ch07ApiSecurity: Chapter = {
  id: 'ch-07-api-security',
  slug: 'ch-07-api-security',
  order: 7,
  title: 'API Security',
  summary:
    'Mempelajari keamanan API mulai dari HTTPS, CORS, security headers, SQL injection, XSS, CSRF, rate limiting, hingga OWASP API Security Top 10 dan secrets management.',
  estimatedMinutes: 45,
  learningObjectives: [
    'Menerapkan HTTPS, CORS, dan security headers secara tepat.',
    'Menghindari SQL injection, XSS, dan CSRF.',
    'Menerapkan rate limiting untuk mencegah abuse.',
    'Mengenali risiko OWASP API Security Top 10 seperti BOLA dan mass assignment.',
    'Mengelola secret dan melakukan dependency scanning.',
  ],
  summaryPoints: [
    'HTTPS mengenkripsi data in transit dan mencegah MITM.',
    'Security headers seperti CSP dan HSTS mengurangi serangan client-side.',
    'Parameterized query mencegah SQL injection.',
    'Rate limiting membatasi jumlah request untuk mencegah brute-force dan DoS.',
    'OWASP API Security Top 10 memberikan daftar risiko utama yang harus diatasi API modern.',
  ],
  references: ch07References,
  lesson: ch07Lesson,
  quiz: ch07Quiz,
}
