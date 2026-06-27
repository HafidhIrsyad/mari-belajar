import type { Chapter } from '@/content/types'
import { ch02Lesson } from './lesson'
import { ch02Quiz } from './quiz'
import { ch02References } from './references'

export const ch02Generics: Chapter = {
  id: 'ch-02-generics',
  slug: 'ch-02-generics',
  order: 2,
  title: 'Generics di Go',
  summary:
    'Memahami type parameters, constraints, type sets, generic functions & types, serta implikasi performa generics di Go 1.18+.',
  estimatedMinutes: 40,
  learningObjectives: [
    'Menjelaskan type parameter dan type constraint di Go.',
    'Menggunakan constraints bawaan seperti any dan comparable.',
    'Membuat custom constraint dengan type sets.',
    'Membangun struktur data generic seperti stack dan map reduce.',
    'Memahami trade-off performa generics dibanding interface{} dan code generation.',
  ],
  summaryPoints: [
    'Generics memungkinkan fungsi dan tipe bekerja dengan berbagai tipe tanpa kehilangan type safety.',
    'Type parameter ditulis dalam kurung siku [T Constraint].',
    'comparable adalah constraint untuk tipe yang mendukung operator == dan !=.',
    'Type sets mendefinisikan kumpulan tipe yang diizinkan dalam constraint.',
    'Generic data structures seperti stack dan cache bisa dibuat tanpa interface{}.',
    'Go mengompilasi generics dengan monomorphization terbatas melalui GC-shape stenciling.',
  ],
  references: ch02References,
  lesson: ch02Lesson,
  quiz: ch02Quiz,
}
