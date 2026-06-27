import type { Chapter } from '@/content/types'
import { ch03Lesson } from './lesson'
import { ch03Quiz } from './quiz'
import { ch03References } from './references'

export const ch03StateManagement: Chapter = {
  id: 'ch-03-state-management',
  slug: 'ch-03-state-management',
  order: 3,
  title: 'State Management',
  summary:
    'Memahami strategi state management mulai dari lifting state, Context API, prop drilling, hingga library eksternal seperti Zustand dan prinsip Flux/Redux.',
  estimatedMinutes: 45,
  learningObjectives: [
    'Memisahkan state lokal, state global, dan server state.',
    'Menggunakan Context API untuk dependency injection tanpa prop drilling.',
    'Menjelaskan kapan perlu library state management eksternal.',
    'Memahami arsitektur store, actions, reducers, dan selectors.',
    'Menganalisis internal Zustand dan konsep atomic stores.',
  ],
  summaryPoints: [
    'State lokal cukup dengan useState/useReducer; state global baru dipertimbangkan saat prop drilling menyakitkan.',
    'Context API menyediakan cara untuk melewatkan value tanpa props di setiap level.',
    'Zustand menggunakan store berbasis closures dan subscription untuk update yang selektif.',
    'Flux/Redux memisahkan actions, reducers, dan selectors untuk prediktabilitas.',
    'Atomic stores memecah state menjadi unit independen yang dapat dipakai bersama.',
  ],
  references: ch03References,
  lesson: ch03Lesson,
  quiz: ch03Quiz,
}
