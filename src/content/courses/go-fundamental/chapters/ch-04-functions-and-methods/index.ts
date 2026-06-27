import type { Chapter } from '@/content/types'
import { ch04Lesson } from './lesson'
import { ch04Quiz } from './quiz'
import { ch04References } from './references'

export const ch04FunctionsAndMethods: Chapter = {
  id: 'ch-04-functions-and-methods',
  slug: 'ch-04-functions-and-methods',
  order: 4,
  title: 'Functions & Methods',
  summary:
    'Memahami fungsi, multiple return values, named return values, variadic function, first-class function, closure, method receiver, pointer vs value receiver, dan fungsi sebagai interface kecil di Go.',
  estimatedMinutes: 30,
  learningObjectives: [
    'Mendeklarasikan fungsi dengan parameter dan return value.',
    'Menggunakan multiple return values dan named return values.',
    'Membuat variadic function.',
    'Memahami first-class function dan closure di Go.',
    'Membuat method dengan value receiver dan pointer receiver.',
    'Memilih antara value receiver dan pointer receiver berdasarkan kebutuhan.',
  ],
  summaryPoints: [
    'Fungsi di Go bisa mengembalikan banyak nilai sekaligus.',
    'Named return values memungkinkan return tanpa menyebutkan variabel.',
    'Variadic function menerima sejumlah argumen yang sama tipe menggunakan ....',
    'Function adalah first-class citizen; bisa disimpan di variabel, dikirim sebagai argumen, dan dikembalikan.',
    'Method adalah fungsi yang memiliki receiver, biasanya untuk tipe struct.',
    'Pointer receiver mengubah state asli dan menghindari copy besar.',
    'Value receiver bekerja pada salinan objek dan aman untuk immutable operation.',
  ],
  references: ch04References,
  lesson: ch04Lesson,
  quiz: ch04Quiz,
}
