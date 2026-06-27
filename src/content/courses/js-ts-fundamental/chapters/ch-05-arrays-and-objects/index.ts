import type { Chapter } from '@/content/types'
import { ch05Lesson } from './lesson'
import { ch05Quiz } from './quiz'
import { ch05References } from './references'

export const ch05ArraysAndObjects: Chapter = {
  id: 'ch-05-arrays-and-objects',
  slug: 'ch-05-arrays-and-objects',
  order: 5,
  title: 'Array dan Object',
  summary:
    'Mengolah data dengan array methods, object literal, destructuring, spread operator, immutability, serta perbandingan slice dan struct di Go.',
  estimatedMinutes: 15,
  learningObjectives: [
    'Membuat dan memanipulasi array dengan method dasar seperti push, pop, shift, dan unshift.',
    'Membuat object literal serta mengakses property dengan dot dan bracket notation.',
    'Menggunakan method array map, filter, reduce, find, dan includes.',
    'Menerapkan object destructuring, spread operator, dan rest operator.',
    'Memahami immutability, shallow copy, dan deep copy pada array serta object.',
    'Mengenal Record dan mapped types di TypeScript serta slice dan struct di Go.',
  ],
  summaryPoints: [
    'Array menyimpan kumpulan data berurutan dan diakses dengan indeks mulai dari 0.',
    'Object menyimpan data sebagai pasangan key-value dan bisa memiliki method.',
    'Method map, filter, dan reduce menghasilkan array baru tanpa mengubah array asli.',
    'Destructuring, spread, dan rest operator membuat manipulasi data lebih ringkas.',
    'Shallow copy menyalin referensi object bersarang, sedangkan deep copy menyalin seluruh struktur.',
    'TypeScript menyediakan Record dan mapped types untuk memodelkan object yang konsisten.',
    'Go menggunakan slice untuk array dinamis dan struct untuk mengelompokkan field terkait.',
  ],
  references: ch05References,
  lesson: ch05Lesson,
  quiz: ch05Quiz,
}
