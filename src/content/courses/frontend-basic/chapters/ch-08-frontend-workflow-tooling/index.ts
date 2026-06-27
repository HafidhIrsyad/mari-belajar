import type { Chapter } from '@/content/types'
import { ch08Lesson } from './lesson'
import { ch08Quiz } from './quiz'
import { ch08References } from './references'

export const ch08FrontendWorkflowTooling: Chapter = {
  id: 'ch-08-frontend-workflow-tooling',
  slug: 'ch-08-frontend-workflow-tooling',
  order: 8,
  title: 'Frontend Workflow & Tooling',
  summary:
    'Mengenal ekosistem tooling frontend: editor, DevTools, formatter, linter, Vite, optimasi gambar, dan performance budget untuk pengembangan yang produktif.',
  estimatedMinutes: 20,
  learningObjectives: [
    'Mengkonfigurasi VS Code dan browser DevTools untuk pengembangan frontend.',
    'Menggunakan ESLint dan Prettier untuk menjaga kualitas dan konsistensi kode.',
    'Memahami peran npm scripts dan Git workflow dasar.',
    'Membangun static site dengan Vite dan mengoptimalkan gambar.',
    'Mengenal performance budget dan cara mengukur ukuran bundle.',
  ],
  summaryPoints: [
    'Tooling yang baik mengurangi bug dan mempercepat iterasi.',
    'ESLint menemukan masalah kode, Prettier memformat secara otomatis.',
    'Vite menyediakan dev server cepat dan build yang dioptimalkan.',
    'Optimasi gambar dapat mengurangi ukuran payload secara signifikan.',
    'Performance budget membatasi ukuran resource agar halaman tetap cepat.',
  ],
  references: ch08References,
  lesson: ch08Lesson,
  quiz: ch08Quiz,
}
