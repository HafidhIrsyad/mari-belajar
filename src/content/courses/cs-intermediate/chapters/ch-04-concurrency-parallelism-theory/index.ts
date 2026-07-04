import type { Chapter } from '@/content/types'
import { ch04Lesson } from './lesson'
import { ch04Quiz } from './quiz'
import { ch04References } from './references'

export const ch04ConcurrencyParallelismTheory: Chapter = {
  id: 'ch-04-concurrency-parallelism-theory',
  slug: 'ch-04-concurrency-parallelism-theory',
  order: 4,
  title: 'Teori Concurrency & Parallelism',
  summary:
    'Memahami teori concurrency tingkat OS: perbedaan process dan thread, race condition, mutex, semaphore, deadlock (kondisi Coffman), memory model, happens-before, serta paradigma CSP versus shared-memory.',
  estimatedMinutes: 50,
  learningObjectives: [
    'Membedakan process dan thread beserta implikasi isolasi memori dan overhead.',
    'Mengidentifikasi race condition dan menerapkan mutex untuk melindungi critical section.',
    'Memahami semaphore untuk mengontrol akses dan signaling antar thread.',
    'Menganalisis deadlock menggunakan empat kondisi Coffman.',
    'Membedakan memory model, relasi happens-before, dan paradigma CSP vs shared-memory.',
  ],
  summaryPoints: [
    'Process memiliki ruang alamat terpisah; thread berbagi memori dalam satu process.',
    'Race condition terjadi saat akses konkuren ke data bersama tanpa sinkronisasi.',
    'Mutex melindungi critical section; semaphore mengontrol jumlah akses simultan.',
    'Deadlock memerlukan empat kondisi Coffman sekaligus: mutual exclusion, hold and wait, no preemption, circular wait.',
    'Happens-before menjamin visibilitas perubahan memori; CSP mengkomunikasikan lewat message passing, bukan shared state.',
  ],
  references: ch04References,
  lesson: ch04Lesson,
  quiz: ch04Quiz,
}
