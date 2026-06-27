import type { Chapter } from '@/content/types'
import { ch02Lesson } from './lesson'
import { ch02Quiz } from './quiz'
import { ch02References } from './references'

export const ch02FetchApiHttpClient: Chapter = {
  id: 'ch-02-fetch-api-http-client',
  slug: 'ch-02-fetch-api-http-client',
  order: 2,
  title: 'Fetch API & HTTP Client',
  summary:
    'Membangun HTTP client yang robust dengan fetch, AbortController, retry/backoff, interceptor pattern, serta memahami lifecycle koneksi jaringan di browser.',
  estimatedMinutes: 40,
  learningObjectives: [
    'Menggunakan fetch dengan Promise chain dan async/await.',
    'Memahami perbedaan network error dan HTTP error.',
    'Mengimplementasikan AbortController untuk cancellation.',
    'Membuat typed HTTP wrapper dengan generics di TypeScript.',
    'Menjelaskan interceptor pattern dan konsep circuit breaker.',
    'Memahami dampak HTTP/2 multiplexing dan connection pooling.',
  ],
  summaryPoints: [
    'fetch mengembalikan Promise yang resolve saat respons HTTP diterima, meskipun statusnya error.',
    'AbortController memungkinkan pembatalan request secara cooperatif.',
    'Network error berbeda dengan HTTP error: network error terjadi sebelum respons diterima.',
    'Interceptor pattern memisahkan cross-cutting concerns seperti logging dan token refresh.',
    'HTTP/2 multiplexing memungkinkan banyak request berbagi satu koneksi TCP.',
    'Retry dengan exponential backoff harus diikuti cancellation agar tidak membanjiri server.',
  ],
  references: ch02References,
  lesson: ch02Lesson,
  quiz: ch02Quiz,
}
