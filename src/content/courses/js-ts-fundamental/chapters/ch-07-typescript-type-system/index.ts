import type { Chapter } from '@/content/types'
import { ch07Lesson } from './lesson'
import { ch07Quiz } from './quiz'
import { ch07References } from './references'

export const ch07TypescriptTypeSystem: Chapter = {
  id: 'ch-07-typescript-type-system',
  slug: 'ch-07-typescript-type-system',
  order: 7,
  title: 'TypeScript Type System',
  summary:
    'Mempelajari type annotation, type inference, tipe khusus any/unknown/never, interface dan type alias, union serta intersection types, generics, type narrowing, dan type guards di TypeScript.',
  estimatedMinutes: 16,
  learningObjectives: [
    'Memahami perbedaan type annotation dan type inference di TypeScript.',
    'Menjelaskan perbedaan penggunaan any, unknown, dan never.',
    'Membuat interface dan type alias dengan optional properties.',
    'Menggunakan union types dan intersection types untuk memodelkan data.',
    'Memahami konsep generics untuk membuat kode yang fleksibel dan tetap type-safe.',
    'Menerapkan type narrowing dan type guards untuk menangani union types.',
  ],
  summaryPoints: [
    'TypeScript menambahkan sistem tipe statis di atas JavaScript untuk menangkap kesalahan saat compile time.',
    'Type annotation eksplisit memberi kejelasan, sedangkan type inference menghemat penulisan tipe.',
    'any melepaskan pemeriksaan tipe, unknown memaksa pengecekan sebelum penggunaan, dan never merepresentasikan nilai yang tidak mungkin.',
    'Interface dan type alias sama-sama mendeskripsikan bentuk objek, dengan karakteristik ekstensi yang sedikit berbeda.',
    'Union types memungkinkan nilai dari beberapa tipe, intersection types menggabungkan beberapa tipe sekaligus.',
    'Generics memungkinkan fungsi atau kelas bekerja untuk berbagai tipe tanpa kehilangan informasi tipe.',
    'Type narrowing mempersempit tipe union melalui pengecekan runtime, seperti typeof, instanceof, atau custom type guard.',
  ],
  references: ch07References,
  lesson: ch07Lesson,
  quiz: ch07Quiz,
}
