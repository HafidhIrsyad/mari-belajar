import type { Chapter } from '@/content/types'
import { ch01Lesson } from './lesson'
import { ch01Quiz } from './quiz'
import { ch01References } from './references'

export const ch01ConcurrencyPatterns: Chapter = {
  id: 'ch-01-concurrency-patterns',
  slug: 'ch-01-concurrency-patterns',
  order: 1,
  title: 'Concurrency Patterns',
  summary:
    'Menguasai pola concurrency lanjutan di Go: pipeline, worker pool, fan-out/fan-in, errgroup, semaphore, structured concurrency, dan backpressure untuk membangun sistem yang aman dari goroutine leak.',
  estimatedMinutes: 45,
  learningObjectives: [
    'Membangun pipeline dan worker pool yang bounded dan cancelable.',
    'Menggunakan errgroup dan semaphore untuk mengelola concurrency.',
    'Menerapkan structured concurrency agar lifecycle goroutine terkontrol.',
    'Mencegah goroutine leak dengan context cancellation dan proper channel closing.',
    'Menerapkan backpressure untuk melindungi downstream dari overload.',
  ],
  summaryPoints: [
    'Pipeline memisahkan tahap pemrosesan data melalui channel yang terhubung.',
    'Worker pool membatasi jumlah goroutine aktif agar resource tidak dibanjiri.',
    'errgroup mengelompokkan goroutine dan mengumpulkan error pertama yang terjadi.',
    'Semaphore membatasi jumlah goroutine yang berjalan bersamaan.',
    'Structured concurrency memastikan setiap goroutine memiliki parent yang bertanggung jawab menunggu dan membersihkannya.',
    'Backpressure mengontrol laju produksi data agar tidak melebihi kapasitas konsumen.',
  ],
  references: ch01References,
  lesson: ch01Lesson,
  quiz: ch01Quiz,
}
