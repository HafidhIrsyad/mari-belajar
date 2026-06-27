import type { Chapter } from '@/content/types'
import { ch05Lesson } from './lesson'
import { ch05Quiz } from './quiz'
import { ch05References } from './references'

export const ch05AdvancedTypeScriptDiFrontend: Chapter = {
  id: 'ch-05-advanced-typescript-di-frontend',
  slug: 'ch-05-advanced-typescript-di-frontend',
  order: 5,
  title: 'Advanced TypeScript di Frontend',
  summary:
    'Menguasai pola TypeScript lanjutan untuk React: generic components, polymorphic components dengan as prop, type-safe context, type-safe routing, API contracts, dan discriminated unions untuk UI state.',
  estimatedMinutes: 45,
  learningObjectives: [
    'Membangun generic React components dengan constraint yang tepat.',
    'Mengimplementasikan polymorphic components yang type-safe.',
    'Membuat type-safe context tanpa non-null assertion yang berbahaya.',
    'Menyusun type-safe routing dan API contracts.',
    'Menggunakan discriminated unions untuk merepresentasikan UI state yang kompleks.',
  ],
  summaryPoints: [
    'Generic components memungkinkan reuse logic dengan tetap menjaga type safety.',
    'Polymorphic components memerlukan perhatian khusus pada ref forwarding dan prop conflict.',
    'Type-safe context memastikan konsumen tidak mengakses nilai sebelum Provider siap.',
    'Discriminated unions membuat state UI lebih eksplisit dan mudah di-narrow.',
    'API contracts yang didefinisikan sebagai tipe membantu sinkronisasi frontend-backend.',
  ],
  references: ch05References,
  lesson: ch05Lesson,
  quiz: ch05Quiz,
}
