import type { Chapter } from '@/content/types'
import { ch01Lesson } from './lesson'
import { ch01Quiz } from './quiz'
import { ch01References } from './references'

export const ch01ReactFundamentalsReview: Chapter = {
  id: 'ch-01-react-fundamentals-review',
  slug: 'ch-01-react-fundamentals-review',
  order: 1,
  title: 'React Fundamentals Review',
  summary:
    'Mereview fondasi React dari JSX, komponen, props, dan state hingga virtual DOM, reconciler, diffing algorithm, dan fiber architecture.',
  estimatedMinutes: 35,
  learningObjectives: [
    'Menjelaskan perbedaan JSX dan hasil kompilasi React.createElement.',
    'Membangun komponen fungsional dengan props dan event handling.',
    'Memahami virtual DOM sebagai representasi ringan dari UI.',
    'Menjelaskan reconciliation, diffing, dan pentingnya key.',
    'Menguraikan arsitektur Fiber dan bagaimana React menjadwalkan pembaruan.',
  ],
  summaryPoints: [
    'JSX adalah syntactic sugar untuk pemanggilan fungsi React.createElement.',
    'Komponen React mengembalikan elemen, bukan DOM node langsung.',
    'Virtual DOM memungkinkan perbandingan snapshot UI sebelum dan sesudah perubahan.',
    'Key yang stabil membantu reconciler mengidentifikasi elemen yang sama di daftar.',
    'Fiber memungkinkan React memecah pekerjaan render menjadi unit-unit yang dapat dijeda.',
  ],
  references: ch01References,
  lesson: ch01Lesson,
  quiz: ch01Quiz,
}
