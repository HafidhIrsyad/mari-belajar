import type { Chapter } from '@/content/types'
import { ch03Lesson } from './lesson'
import { ch03Quiz } from './quiz'
import { ch03References } from './references'

export const ch03MetaprogrammingReflection: Chapter = {
  id: 'ch-03-metaprogramming-reflection',
  slug: 'ch-03-metaprogramming-reflection',
  order: 3,
  title: 'Metaprogramming & Reflection',
  summary:
    'Memahami metaprogramming di JavaScript/TypeScript: property descriptors, Proxy/Reflect, symbol, decorator metadata, AST manipulation, serta perbandingan dengan reflection di Go.',
  estimatedMinutes: 45,
  learningObjectives: [
    'Menggunakan Object.defineProperty, descriptors, getters, dan setters.',
    'Menerapkan Proxy traps dan Reflect API untuk validasi serta logging.',
    'Memahami well-known symbols dan pengaruhnya terhadap runtime behavior.',
    'Menggunakan TypeScript decorators dan metadata reflection.',
    'Mengenal konsep code generation, custom transformers, dan AST manipulation.',
  ],
  summaryPoints: [
    'Property descriptors mengontrol apakah properti dapat di-write, di-enumerate, atau di-configure.',
    'Proxy dapat mencegat hampir semua operasi objek secara transparan.',
    'Reflect menyediakan API fungsional yang bersesuaian dengan operator object.',
    'Well-known symbols seperti Symbol.iterator dan Symbol.asyncIterator mengubah perilaku iterasi.',
    'AST manipulation memungkinkan transformasi kode secara otomatis saat build.',
  ],
  references: ch03References,
  lesson: ch03Lesson,
  quiz: ch03Quiz,
}
