import type { Chapter } from '@/content/types'
import { ch08Lesson } from './lesson'
import { ch08Quiz } from './quiz'
import { ch08References } from './references'

export const ch08BrowserRuntimeRenderingInternals: Chapter = {
  id: 'ch-08-browser-runtime-rendering-internals',
  slug: 'ch-08-browser-runtime-rendering-internals',
  order: 8,
  title: 'Browser Runtime & Rendering Internals',
  summary:
    'Memahami call stack, heap, event loop, task queue, microtask queue, rendering pipeline, V8/Blink integration, dan scheduler API.',
  estimatedMinutes: 45,
  learningObjectives: [
    'Menjelaskan call stack, heap, dan event loop.',
    'Membedakan task queue dan microtask queue.',
    'Memahami render steps: style, layout, paint, composite.',
    'Menganalisis browser process architecture dan thread.',
    'Menggunakan requestAnimationFrame dan menghindari forced synchronous layout.',
    'Mengenal V8 + Blink integration, layerization, dan scheduler API.',
  ],
  summaryPoints: [
    'JavaScript berjalan single-threaded di main thread browser.',
    'Event loop memproses task queue, lalu microtask queue, lalu render jika diperlukan.',
    'Microtask dijalankan sebelum render berikutnya, sedangkan task bisa tertunda.',
    'Rendering pipeline terdiri dari style, layout, paint, dan composite.',
    'Forced synchronous layout terjadi saat membaca layout setelah menulis style.',
    'Layerization dan compositor thread memungkinkan animasi lancar di luar main thread.',
  ],
  references: ch08References,
  lesson: ch08Lesson,
  quiz: ch08Quiz,
}
