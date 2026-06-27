import type { Chapter } from '@/content/types'
import { ch06Lesson } from './lesson'
import { ch06Quiz } from './quiz'
import { ch06References } from './references'

export const ch06AccessibilityLanjutan: Chapter = {
  id: 'ch-06-accessibility-lanjutan',
  slug: 'ch-06-accessibility-lanjutan',
  order: 6,
  title: 'Accessibility Lanjutan',
  summary:
    'Mendalami aksesibilitas frontend melalui focus management, ARIA live regions, komponen kompleks, focus trap, automation testing, WCAG 2.2 compliance, dan inclusive design.',
  estimatedMinutes: 40,
  learningObjectives: [
    'Menerapkan focus management dan skip links yang efektif.',
    'Menggunakan ARIA live regions untuk announcements dinamis.',
    'Membangun komponen kompleks seperti combobox, dialog, dan tabs dengan pola aksesibilitas yang benar.',
    'Mengimplementasikan focus trap dan restore focus.',
    'Mengotomatisasi accessibility testing dan memahami prinsip inclusive design.',
  ],
  summaryPoints: [
    'Focus management adalah fondasi navigasi keyboard yang baik.',
    'ARIA live regions memberi tahu screen reader tentang perubahan dinamis.',
    'Komponen kompleks memerlukan roles, states, dan keyboard behavior yang tepat.',
    'Focus trap menjaga keyboard di dalam modal terbuka; restore focus mengembalikan fokus saat modal ditutup.',
    'Automated a11y testing dengan axe melengkapi manual testing, tidak menggantikannya.',
  ],
  references: ch06References,
  lesson: ch06Lesson,
  quiz: ch06Quiz,
}
