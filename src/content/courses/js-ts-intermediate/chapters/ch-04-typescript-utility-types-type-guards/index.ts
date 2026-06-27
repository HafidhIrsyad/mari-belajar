import type { Chapter } from '@/content/types'
import { ch04Lesson } from './lesson'
import { ch04Quiz } from './quiz'
import { ch04References } from './references'

export const ch04TypescriptUtilityTypesTypeGuards: Chapter = {
  id: 'ch-04-typescript-utility-types-type-guards',
  slug: 'ch-04-typescript-utility-types-type-guards',
  order: 4,
  title: 'TypeScript Utility Types & Type Guards',
  summary:
    'Menguasai utility types bawaan TypeScript, type guards, mapped types, conditional types, infer, dan template literal types untuk membangun API layer yang type-safe.',
  estimatedMinutes: 45,
  learningObjectives: [
    'Menggunakan Partial, Required, Readonly, Record, Pick, dan Omit.',
    'Memanfaatkan ReturnType, Parameters, Exclude, Extract, dan NonNullable.',
    'Menulis type guards dengan typeof, instanceof, dan in operator.',
    'Membangun mapped types dan conditional types.',
    'Menggunakan infer untuk ekstraksi tipe dari generic.',
    'Membuat API client layer yang type-safe dengan utility types.',
  ],
  summaryPoints: [
    'Utility types memungkinkan transformasi tipe tanpa mendefinisikan ulang struktur.',
    'Type guards mempersempit union type ke tipe spesifik saat runtime.',
    'Mapped types membuat tipe baru dengan mengubah property dari tipe lain.',
    'Conditional types memilih tipe berdasarkan kondisi seperti ternary.',
    'infer digunakan untuk menarik tipe dari parameter generic.',
    'Template literal types memungkinkan pembatasan string secara type-level.',
  ],
  references: ch04References,
  lesson: ch04Lesson,
  quiz: ch04Quiz,
}
