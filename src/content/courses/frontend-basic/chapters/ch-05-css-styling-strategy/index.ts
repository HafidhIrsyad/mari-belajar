import type { Chapter } from '@/content/types'
import { ch05Lesson } from './lesson'
import { ch05Quiz } from './quiz'
import { ch05References } from './references'

export const ch05CssStylingStrategy: Chapter = {
  id: 'ch-05-css-styling-strategy',
  slug: 'ch-05-css-styling-strategy',
  order: 5,
  title: 'CSS Styling Strategy',
  summary:
    'Memahami selectors, specificity, cascade, inheritance, serta memilih strategi styling yang scalable seperti BEM, utility-first, dan design tokens.',
  estimatedMinutes: 23,
  learningObjectives: [
    'Menjelaskan cara kerja specificity dan cascade.',
    'Menggunakan custom properties untuk theming yang konsisten.',
    'Menerapkan metodologi BEM dan memahami trade-off utility-first CSS.',
    'Merancang design tokens untuk sistem desain yang skalabel.',
    'Mengimplementasikan dark mode dengan prefers-color-scheme.',
  ],
  summaryPoints: [
    'Specificity menentukan selector mana yang menang saat terjadi konflik.',
    'Custom properties memudahkan theming dan pemeliharaan nilai berulang.',
    'BEM memberikan namespace yang jelas pada komponen.',
    'Utility-first meningkatkan kecepatan development tetapi memerlukan disiplin.',
    'Design tokens menjadikan warna, spacing, dan tipografi dapat diprogram.',
  ],
  references: ch05References,
  lesson: ch05Lesson,
  quiz: ch05Quiz,
}
