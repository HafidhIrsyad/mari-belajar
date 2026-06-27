import type { Chapter } from '@/content/types'
import { ch07Lesson } from './lesson'
import { ch07Quiz } from './quiz'
import { ch07References } from './references'

export const ch07StylingUILibraries: Chapter = {
  id: 'ch-07-styling-ui-libraries',
  slug: 'ch-07-styling-ui-libraries',
  order: 7,
  title: 'Styling & UI Libraries',
  summary:
    'Memahami strategi styling modern, CSS-in-JS, utility-first CSS dengan Tailwind, komposisi komponen, design tokens, dan arsitektur headless UI seperti Radix dan shadcn/ui.',
  estimatedMinutes: 35,
  learningObjectives: [
    'Membedakan CSS Modules, CSS-in-JS, dan utility-first CSS.',
    'Menggunakan Tailwind CSS untuk styling cepat dan konsisten.',
    'Memahami design tokens dan theming.',
    'Mengkomposisikan komponen UI dengan Radix primitives.',
    'Membangun komponen yang reusable menggunakan class-variance-authority.',
  ],
  summaryPoints: [
    'Utility-first CSS mengurangi kebutuhan menulis custom CSS dengan class utilitas yang komposabel.',
    'Design tokens menyediakan nilai konsisten untuk warna, spacing, dan typography.',
    'Headless UI memisahkan logika interaksi dari styling visual.',
    'Radix primitives menyediakan komponen aksesibel yang dapat dikustomisasi.',
    'CVA membantu mengelola variant komponen secara terstruktur.',
  ],
  references: ch07References,
  lesson: ch07Lesson,
  quiz: ch07Quiz,
}
