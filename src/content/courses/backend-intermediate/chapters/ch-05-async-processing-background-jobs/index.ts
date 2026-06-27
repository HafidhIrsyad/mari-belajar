import type { Chapter } from '@/content/types'
import { ch05Lesson } from './lesson'
import { ch05Quiz } from './quiz'
import { ch05References } from './references'

export const ch05AsyncProcessingBackgroundJobs: Chapter = {
  id: 'ch-05-async-processing-background-jobs',
  slug: 'ch-05-async-processing-background-jobs',
  order: 5,
  title: 'Async Processing & Background Jobs',
  summary:
    'Mempelajari pemrosesan asynchronous mulai dari cron dan job queue, BullMQ/Redis, retry dan dead letter, hingga outbox pattern, idempotency, dan saga.',
  estimatedMinutes: 45,
  learningObjectives: [
    'Membedakan pemrosesan sinkron dan asynchronous serta kapan menggunakan background job.',
    'Mengimplementasikan cron job dan worker dengan graceful shutdown.',
    'Menggunakan BullMQ/Redis untuk job queue, retry, dan dead letter.',
    'Memahami semantik at-least-once, at-most-once, dan exactly-once.',
    'Menerapkan outbox pattern dan idempotent workers untuk reliability.',
  ],
  summaryPoints: [
    'Background job cocok untuk pekerjaan lambat, tidak kritis untuk response, atau perlu dijadwalkan.',
    'Job queue memisahkan produksi dan konsumsi pekerjaan sehingga worker dapat diskalakan.',
    'Retry dengan backoff menangani kegagalan sementara, sementara dead letter queue menyimpan job yang benar-benar gagal.',
    'Idempotency memastikasi job yang diproses lebih dari sekali tidak merusak state.',
    'Outbox pattern menjaga konsistensi antara database dan message broker.',
  ],
  references: ch05References,
  lesson: ch05Lesson,
  quiz: ch05Quiz,
}
