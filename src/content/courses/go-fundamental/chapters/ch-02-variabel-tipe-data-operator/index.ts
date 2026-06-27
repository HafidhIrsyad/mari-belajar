import type { Chapter } from '@/content/types'
import { ch02Lesson } from './lesson'
import { ch02Quiz } from './quiz'
import { ch02References } from './references'

export const ch02VariabelTipeDataOperator: Chapter = {
  id: 'ch-02-variabel-tipe-data-operator',
  slug: 'ch-02-variabel-tipe-data-operator',
  order: 2,
  title: 'Variabel, Tipe Data & Operator',
  summary:
    'Memahami deklarasi variabel, zero value, tipe data primitif, konversi tipe, string, rune, pointer, dan operator di Go, serta perbedaannya dengan JavaScript/TypeScript.',
  estimatedMinutes: 25,
  learningObjectives: [
    'Mendeklarasikan variabel dengan var, :=, dan const.',
    'Memahami zero value dan type inference di Go.',
    'Menggunakan tipe numerik, string, boolean, rune, dan byte.',
    'Melakukan konversi tipe secara eksplisit.',
    'Memahami konsep pointer dan address-of operator.',
    'Menggunakan operator aritmatika, perbandingan, logika, dan bitwise.',
  ],
  summaryPoints: [
    'Go memaksa variabel harus dipakai dan tipe harus jelas, baik secara eksplisit maupun inferred.',
    'Zero value adalah nilai default untuk setiap tipe: 0, false, "", nil.',
    'Konversi tipe di Go harus eksplisit; tidak ada implicit coercion seperti JavaScript.',
    'String di Go immutable dan merepresentasikan byte sequence UTF-8.',
    'Rune adalah alias untuk int32 yang merepresentasikan Unicode code point.',
    'Pointer menyimpan alamat memori; Go memiliki pointer tetapi tidak pointer aritmatika.',
    'Operator di Go mirip C: aritmatika, perbandingan, logika, bitwise, dan assignment.',
  ],
  references: ch02References,
  lesson: ch02Lesson,
  quiz: ch02Quiz,
}
