import type { Chapter } from '@/content/types'
import { ch05Lesson } from './lesson'
import { ch05Quiz } from './quiz'
import { ch05References } from './references'

export const ch05MiddlewareLoggingRecovery: Chapter = {
  id: 'ch-05-middleware-logging-recovery',
  slug: 'ch-05-middleware-logging-recovery',
  order: 5,
  title: 'Middleware, Logging & Recovery',
  summary:
    'Menyusun middleware logging dengan log/slog, menambahkan request ID, menangani panic secara aman, dan memahami dasar observability dengan correlation ID serta tracing.',
  estimatedMinutes: 40,
  learningObjectives: [
    'Menulis middleware logging yang mencatat method, path, status, dan durasi.',
    'Menggunakan log/slog untuk structured logging.',
    'Menambahkan request ID dan correlation ID ke log.',
    'Membuat panic recovery middleware yang mengembalikan response 500.',
    'Memahami pentingnya observability hooks untuk metrics dan traces.',
    'Menyusun middleware chain yang bersih dan dapat diuji.',
  ],
  summaryPoints: [
    'Middleware di Go adalah fungsi yang membungkus http.Handler.',
    'log/slog menyediakan structured logging dengan level dan key-value pairs.',
    'Request ID membantu melacak satu request melintasi banyak log entry.',
    'Panic recovery middleware menangkap panic dan mencegah server crash.',
    'Correlation ID memungkinkan pelacakan request antar service.',
    'Observability meliputi logging, metrics, dan traces untuk memahami perilaku sistem.',
  ],
  references: ch05References,
  lesson: ch05Lesson,
  quiz: ch05Quiz,
}
