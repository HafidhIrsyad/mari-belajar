import type { Chapter } from '@/content/types'
import { ch08Lesson } from './lesson'
import { ch08Quiz } from './quiz'
import { ch08References } from './references'

export const ch08TestingFrontend: Chapter = {
  id: 'ch-08-testing-frontend',
  slug: 'ch-08-testing-frontend',
  order: 8,
  title: 'Testing Frontend',
  summary:
    'Menerapkan testing pyramid di frontend: unit test dengan Vitest, component test dengan React Testing Library, mock, user events, dan prinsip testing yang berorientasi pada pengguna.',
  estimatedMinutes: 45,
  learningObjectives: [
    'Memahami testing pyramid dan kapan menggunakan unit, integration, dan E2E test.',
    'Menulis unit test untuk fungsi utilitas dengan Vitest.',
    'Menguji komponen React dengan React Testing Library.',
    'Menggunakan query aksesibel dan user-event untuk mensimulasikan interaksi.',
    'Memahami pentingnya menguji perilaku, bukan implementasi.',
  ],
  summaryPoints: [
    'Testing pyramid menyarankan banyak unit test, beberapa integration test, dan sedikit E2E test.',
    'Vitest adalah test runner cepat dengan API mirip Jest.',
    'React Testing Library mendorong pengujian dari sudut pandang pengguna.',
    'Query aksesibel seperti getByRole lebih baik daripada getByTestId.',
    'Mock berguna untuk mengisolasi unit dari dependency eksternal.',
  ],
  references: ch08References,
  lesson: ch08Lesson,
  quiz: ch08Quiz,
}
