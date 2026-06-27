import type { Chapter } from '@/content/types'
import { ch04Lesson } from './lesson'
import { ch04Quiz } from './quiz'
import { ch04References } from './references'

export const ch04Normalisasi: Chapter = {
  id: 'ch-04-normalisasi',
  slug: 'ch-04-normalisasi',
  order: 4,
  title: 'Normalisasi',
  summary:
    'Memahami bentuk normal 1NF hingga BCNF, functional dependency, anomali data, serta kapan denormalisasi menjadi pilihan yang masuk akal.',
  estimatedMinutes: 45,
  learningObjectives: [
    'Menjelaskan tujuan normalisasi dan anomali yang dicegahnya.',
    'Menerapkan 1NF, 2NF, dan 3NF pada skema sederhana.',
    'Mengidentifikasi functional dependency dan determinant.',
    'Memahami BCNF dan kapan suatu skema perlu dipecah lebih lanjut.',
    'Menjelaskan trade-off denormalisasi untuk performa baca.',
  ],
  summaryPoints: [
    'Normalisasi mengurangi redundansi dan mencegah anomali insert, update, delete.',
    '1NF menuntut atomic value dan tidak ada group berulang.',
    '2NF menghilangkan partial dependency terhadap composite key.',
    '3NF menghilangkan transitive dependency terhadap PK.',
    'BCNF adalah versi ketat dari 3NF; denormalisasi sengaja dilakukan untuk performa tertentu.',
  ],
  references: ch04References,
  lesson: ch04Lesson,
  quiz: ch04Quiz,
}
