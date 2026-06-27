import type { Chapter } from '@/content/types'
import { ch01Lesson } from './lesson'
import { ch01Quiz } from './quiz'
import { ch01References } from './references'

export const ch01AdvancedTypeSystem: Chapter = {
  id: 'ch-01-advanced-type-system',
  slug: 'ch-01-advanced-type-system',
  order: 1,
  title: 'Advanced Type System',
  summary:
    'Menguasai type-level programming di TypeScript: generics, recursive types, branded types, template literal types, conditional types, infer extraction, dan mesin state sederhana di level tipe.',
  estimatedMinutes: 45,
  learningObjectives: [
    'Menggunakan generics, constraints, dan default type parameters secara tepat.',
    'Membaca dan menulis recursive types serta template literal types.',
    'Memahami branded types untuk nominal typing di TypeScript.',
    'Menerapkan conditional types, distributive conditional types, dan infer extraction.',
    'Membangun type-level parser/state machine untuk validasi struktur data statis.',
  ],
  summaryPoints: [
    'Generics membuat tipe dapat diparameterisasi tanpa kehilangan informasi tipe.',
    'Template literal types memungkinkan validasi string di level tipe.',
    'Branded types mensimulasikan nominal typing di atas structural typing TS.',
    'Conditional types bekerja seperti ternary untuk tipe dan dapat didistribusikan atas union.',
    '`infer` memungkinkan ekstraksi tipe dari dalam generic, misalnya return type atau parameter type.',
  ],
  references: ch01References,
  lesson: ch01Lesson,
  quiz: ch01Quiz,
}
