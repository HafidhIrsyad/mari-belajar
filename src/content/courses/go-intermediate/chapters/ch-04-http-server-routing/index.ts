import type { Chapter } from '@/content/types'
import { ch04Lesson } from './lesson'
import { ch04Quiz } from './quiz'
import { ch04References } from './references'

export const ch04HttpServerRouting: Chapter = {
  id: 'ch-04-http-server-routing',
  slug: 'ch-04-http-server-routing',
  order: 4,
  title: 'HTTP Server & Routing',
  summary:
    'Membangun HTTP server dengan net/http, memahami handler dan ServeMux, middleware chaining, graceful shutdown, serta konfigurasi server yang production-ready.',
  estimatedMinutes: 45,
  learningObjectives: [
    'Membuat HTTP server dasar dengan http.HandleFunc dan http.ListenAndServe.',
    'Mengimplementasikan custom http.Handler dan http.HandlerFunc.',
    'Memahami cara kerja ServeMux dan routing multiplexer.',
    'Menyusun middleware chain dengan pattern func(http.Handler) http.Handler.',
    'Menerapkan graceful shutdown dengan signal handling.',
    'Mengonfigurasi timeout dan parameter server untuk lingkungan production.',
  ],
  summaryPoints: [
    'net/http adalah package standar Go untuk membangun HTTP server dan client.',
    'http.Handler adalah interface dengan method ServeHTTP(ResponseWriter, *Request).',
    'ServeMux adalah router bawaan yang memetakan path ke handler.',
    'Middleware di Go umumnya berbentuk higher-order function: func(http.Handler) http.Handler.',
    'Graceful shutdown memastikan request yang sedang berjalan selesai sebelum server berhenti.',
    'http.Server memiliki konfigurasi ReadTimeout, WriteTimeout, IdleTimeout, dan MaxHeaderBytes.',
  ],
  references: ch04References,
  lesson: ch04Lesson,
  quiz: ch04Quiz,
}
