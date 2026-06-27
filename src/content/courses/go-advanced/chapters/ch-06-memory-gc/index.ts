import type { Chapter } from '@/content/types'
import { ch06Lesson } from './lesson'
import { ch06Quiz } from './quiz'
import { ch06References } from './references'

export const ch06MemoryGc: Chapter = {
  id: 'ch-06-memory-gc',
  slug: 'ch-06-memory-gc',
  order: 6,
  title: 'Memory Management & GC Tuning',
  summary:
    'Memahami stack vs heap, escape analysis, pprof heap profile, sync.Pool, GC pacing, GOGC, GOMEMLIMIT, dan arena experimental di Go.',
  estimatedMinutes: 45,
  learningObjectives: [
    'Membedakan alokasi stack dan heap serta memahami escape analysis.',
    'Membaca heap profile dari pprof.',
    'Mendeteksi dan mencegah memory leak di Go.',
    'Menggunakan sync.Pool untuk object reuse.',
    'Mengkonfigurasi GOGC dan GOMEMLIMIT untuk workload tertentu.',
  ],
  summaryPoints: [
    'Stack digunakan untuk data berumur pendek, heap untuk data yang escape dari fungsi.',
    'Escape analysis menentukan apakah variabel dialokasikan di stack atau heap.',
    'pprof heap profile menunjukkan object allocation dan in-use memory.',
    'sync.Pool menyediakan object pooling untuk mengurangi alokasi berulang.',
    'GOGC mengontrol trade-off antara penggunaan memori dan frekuensi GC.',
    'GOMEMLIMIT membatasi memori total yang bisa digunakan Go runtime.',
  ],
  references: ch06References,
  lesson: ch06Lesson,
  quiz: ch06Quiz,
}
