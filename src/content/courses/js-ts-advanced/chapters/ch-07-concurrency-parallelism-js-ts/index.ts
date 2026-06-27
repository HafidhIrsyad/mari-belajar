import type { Chapter } from '@/content/types'
import { ch07Lesson } from './lesson'
import { ch07Quiz } from './quiz'
import { ch07References } from './references'

export const ch07ConcurrencyParallelismJsTs: Chapter = {
  id: 'ch-07-concurrency-parallelism-js-ts',
  slug: 'ch-07-concurrency-parallelism-js-ts',
  order: 7,
  title: 'Concurrency & Parallelism in JS/TS',
  summary:
    'Mempelajari concurrency di JavaScript/TypeScript: event loop, Promise, Web Workers, SharedArrayBuffer, Atomics, streams backpressure, Node.js worker_threads, serta perbandingan dengan goroutine worker pool di Go.',
  estimatedMinutes: 50,
  learningObjectives: [
    'Memahami perbedaan concurrency dan parallelism di JavaScript.',
    'Menggunakan Promise.all, race, dan cancellation dengan AbortController.',
    'Menerapkan Web Workers dan memanfaatkan transferables serta Atomics.',
    'Mengelola backpressure pada Streams API.',
    'Mengenal Node.js worker_threads, Atomics.wait/notify, dan CSP vs actor model.',
  ],
  summaryPoints: [
    'JavaScript single-threaded, tetapi concurrency dicapai melalui event loop dan non-blocking I/O.',
    'Parallelism memerlukan thread terpisah: Web Workers di browser dan worker_threads di Node.js.',
    'SharedArrayBuffer memungkinkan memori dibagi antar thread; Atomics menyediakan operasi thread-safe.',
    'Backpressure mencegah producer membanjiri consumer dengan data.',
    'AbortController memberikan mekanisme cancellation yang terstandarisasi.',
  ],
  references: ch07References,
  lesson: ch07Lesson,
  quiz: ch07Quiz,
}
