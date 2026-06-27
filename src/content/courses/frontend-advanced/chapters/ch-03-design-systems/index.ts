import type { Chapter } from '@/content/types'
import { ch03Lesson } from './lesson'
import { ch03Quiz } from './quiz'
import { ch03References } from './references'

export const ch03DesignSystems: Chapter = {
  id: 'ch-03-design-systems',
  slug: 'ch-03-design-systems',
  order: 3,
  title: 'Design Systems',
  summary:
    'Membangun design system yang skalabel melalui design tokens, compound components, headless UI, dan accessibility-first patterns, serta memahami versioning dan breaking changes.',
  estimatedMinutes: 40,
  learningObjectives: [
    'Menjelaskan peran design tokens dalam konsistensi visual lintas platform.',
    'Merancang compound components yang fleksibel dan dapat dikomposisi.',
    'Memahami konsep headless UI dan controlled/uncontrolled patterns.',
    'Menerapkan accessibility-first patterns pada komponen kompleks.',
    'Mengelola versioning, breaking changes, dan komunikasi upgrade design system.',
  ],
  summaryPoints: [
    'Design tokens adalah variabel desain atomik seperti warna, spacing, dan tipografi.',
    'Compound components memisahkan concerns internal tanpa mengorbankan API publik.',
    'Headless UI menyediakan logika tanpa styling, memungkinkan desain bebas.',
    'Controlled/uncontrolled patterns memberikan fleksibilitas kepada konsumen komponen.',
    'Design system memerlukan versioning semantik dan panduan migrasi yang jelas.',
  ],
  references: ch03References,
  lesson: ch03Lesson,
  quiz: ch03Quiz,
}
