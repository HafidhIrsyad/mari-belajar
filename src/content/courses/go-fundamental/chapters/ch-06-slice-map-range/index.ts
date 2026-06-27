import type { Chapter } from '@/content/types'
import { ch06Lesson } from './lesson'
import { ch06Quiz } from './quiz'
import { ch06References } from './references'

export const ch06SliceMapRange: Chapter = {
  id: 'ch-06-slice-map-range',
  slug: 'ch-06-slice-map-range',
  order: 6,
  title: 'Slice, Map & Range',
  summary:
    'Memahami slice header, backing array, append, copy, map internals, hash table, range behavior, dan best practices mengelola koleksi di Go.',
  estimatedMinutes: 35,
  learningObjectives: [
    'Membedakan array dan slice di Go.',
    'Memahami slice header dan hubungannya dengan backing array.',
    'Menggunakan append, copy, dan slicing dengan benar.',
    'Menggunakan map untuk key-value storage.',
    'Memahami behavior range pada slice, map, dan string.',
    'Menghindari bug umum terkait slice alias dan map iteration order.',
  ],
  summaryPoints: [
    'Array memiliki ukuran tetap dan merupakan value type.',
    'Slice adalah view ke backing array, direpresentasikan oleh pointer, length, dan capacity.',
    'append bisa mereuse backing array atau mengalokasikan array baru saat capacity penuh.',
    'copy menyalin elemen antar slice tanpa sharing backing array.',
    'Map di Go diimplementasikan sebagai hash table dengan bucket.',
    'Range pada map tidak menjamin urutan deterministik.',
    'String range mengiterasi per rune, bukan per byte.',
  ],
  references: ch06References,
  lesson: ch06Lesson,
  quiz: ch06Quiz,
}
