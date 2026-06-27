import type { Chapter } from '@/content/types'
import { ch03Lesson } from './lesson'
import { ch03Quiz } from './quiz'
import { ch03References } from './references'

export const ch03ControlFlow: Chapter = {
  id: 'ch-03-control-flow',
  slug: 'ch-03-control-flow',
  order: 3,
  title: 'Control Flow',
  summary:
    'Mempelajari percabangan dengan if/else dan switch, berbagai jenis loop, iterasi array, break dan continue, truthy/falsy, serta pola early return dan guard clause.',
  estimatedMinutes: 15,
  learningObjectives: [
    'Memahami percabangan dengan if/else if/else dan switch.',
    'Menggunakan berbagai jenis loop: for, while, do...while, for...of, dan forEach.',
    'Memahami penggunaan break dan continue dalam loop.',
    'Mengenal truthy/falsy dan penerapannya dalam kondisi.',
    'Menerapkan early return pattern dan guard clause untuk kode yang lebih bersih.',
  ],
  summaryPoints: [
    'if/else if/else menangani percabangan berdasarkan kondisi boolean.',
    'switch cocok untuk membandingkan satu nilai dengan banyak kemungkinan.',
    'for, while, dan do...while adalah loop dasar yang dapat dipilih sesuai kebutuhan.',
    'for...of dan forEach menyederhanakan iterasi array.',
    'break menghentikan loop, sedangkan continue melewati iterasi saat ini.',
    'Truthy/falsy menentukan bagaimana nilai non-boolean dievaluasi dalam kondisi.',
    'Early return dan guard clause mengurangi nesting dan meningkatkan keterbacaan.',
  ],
  references: ch03References,
  lesson: ch03Lesson,
  quiz: ch03Quiz,
}
