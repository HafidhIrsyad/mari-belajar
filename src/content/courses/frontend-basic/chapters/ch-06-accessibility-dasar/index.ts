import type { Chapter } from '@/content/types'
import { ch06Lesson } from './lesson'
import { ch06Quiz } from './quiz'
import { ch06References } from './references'

export const ch06AccessibilityDasar: Chapter = {
  id: 'ch-06-accessibility-dasar',
  slug: 'ch-06-accessibility-dasar',
  order: 6,
  title: 'Accessibility Dasar',
  summary:
    'Memahami prinsip WCAG, navigasi keyboard, alt text, ARIA labels, kontras warna, serta cara mengaudit aksesibilitas halaman web.',
  estimatedMinutes: 21,
  learningObjectives: [
    'Menjelaskan empat prinsip WCAG: Perceivable, Operable, Understandable, Robust.',
    'Menyusun navigasi keyboard yang logis dengan tabindex dan focus indicator.',
    'Menulis alt text yang bermakna dan mengelola fokus pada komponen interaktif.',
    'Menggunakan ARIA labels dan live regions dengan tepat.',
    'Mengaudit aksesibilitas dengan Lighthouse, axe, dan DevTools Accessibility pane.',
  ],
  summaryPoints: [
    'Aksesibilitas bermanfaat bagi semua pengguna, termasuk yang menggunakan screen reader atau keyboard.',
    'HTML semantik mengurangi kebutuhan ARIA yang rumit.',
    'Alt text harus menjelaskan fungsi gambar, bukan dekorasi.',
    'Fokus yang terlihat dan urutan tab yang logis adalah kunci navigasi keyboard.',
    'Audit otomatis membantu menemukan masalah, tetapi pengujian manual dengan keyboard dan screen reader tetap penting.',
  ],
  references: ch06References,
  lesson: ch06Lesson,
  quiz: ch06Quiz,
}
