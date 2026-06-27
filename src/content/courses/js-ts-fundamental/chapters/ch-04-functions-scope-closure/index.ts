import type { Chapter } from '@/content/types'
import { ch04Lesson } from './lesson'
import { ch04Quiz } from './quiz'
import { ch04References } from './references'

export const ch04FunctionsScopeClosure: Chapter = {
  id: 'ch-04-functions-scope-closure',
  slug: 'ch-04-functions-scope-closure',
  order: 4,
  title: 'Fungsi, Scope, dan Closure',
  summary:
    'Mempelajari function declaration, expression, dan arrow function, parameter serta return value, scope global/function/block, hoisting, closure, higher-order function, callback, dan IIFE.',
  estimatedMinutes: 15,
  learningObjectives: [
    'Memahami perbedaan function declaration, function expression, dan arrow function.',
    'Menggunakan parameter, return value, dan default parameter secara efektif.',
    'Menjelaskan scope global, function, dan block serta dampaknya terhadap akses variabel.',
    'Memahami konsep hoisting dan perilakunya pada deklarasi fungsi serta variabel.',
    'Mengenal closure dan cara kerjanya dalam JavaScript.',
    'Mengenal higher-order function, callback, dan IIFE sebagai pola fungsi lanjutan.',
  ],
  summaryPoints: [
    'Fungsi bisa dideklarasikan dengan declaration, expression, atau arrow function.',
    'Parameter dan return value membuat fungsi fleksibel dan reusable.',
    'Scope menentukan di mana variabel dan fungsi bisa diakses.',
    'Hoisting mengangkat deklarasi fungsi dan variabel var ke atas scope-nya.',
    'Closure memungkinkan fungsi mengingat lingkungan tempat ia dideklarasikan.',
    'Higher-order function, callback, dan IIFE membuat kode lebih modular dan ekspresif.',
  ],
  references: ch04References,
  lesson: ch04Lesson,
  quiz: ch04Quiz,
}
