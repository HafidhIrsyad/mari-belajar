import type { Chapter } from '@/content/types'
import { ch07Lesson } from './lesson'
import { ch07Quiz } from './quiz'
import { ch07References } from './references'

export const ch07FunctionalProgrammingPatterns: Chapter = {
  id: 'ch-07-functional-programming-patterns',
  slug: 'ch-07-functional-programming-patterns',
  order: 7,
  title: 'Functional Programming Patterns',
  summary:
    'Mempelajari pure functions, immutability, higher-order functions, closures, currying, composition, dan konsep functor/monad di JavaScript/TypeScript.',
  estimatedMinutes: 40,
  learningObjectives: [
    'Menjelaskan pure functions dan immutability.',
    'Menggunakan map, filter, dan reduce secara idiomatic.',
    'Memahami higher-order functions dan closures.',
    'Menerapkan currying, partial application, dan composition.',
    'Mengenal konsep functor dan monad secara praktis.',
    'Membandingkan pola FP di TypeScript dan Go.',
  ],
  summaryPoints: [
    'Pure function tidak menyebabkan side effect dan selalu menghasilkan output sama untuk input sama.',
    'Immutability menghindari perubahan state langsung dan mengurangi bug race condition.',
    'Higher-order functions menerima atau mengembalikan fungsi.',
    'Closure memungkinkan fungsi mengingat lingkungan tempat ia didefinisikan.',
    'Currying dan partial application membuat fungsi lebih reusable.',
    'Composition menyusun fungsi kecil menjadi pipeline yang ekspresif.',
  ],
  references: ch07References,
  lesson: ch07Lesson,
  quiz: ch07Quiz,
}
