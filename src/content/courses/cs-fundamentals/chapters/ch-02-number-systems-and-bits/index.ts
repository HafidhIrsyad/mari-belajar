import type { Chapter } from '@/content/types'
import { ch02Lesson } from './lesson'
import { ch02Quiz } from './quiz'
import { ch02References } from './references'

export const ch02NumberSystemsAndBits: Chapter = {
  id: 'ch-02-number-systems-and-bits',
  slug: 'ch-02-number-systems-and-bits',
  order: 2,
  title: 'Sistem Bilangan dan Operasi Bit',
  summary:
    'Mempelajari desimal, biner, oktal, heksadesimal, konversi antar basis, operasi bitwise, bit shift, bit mask, two\'s complement, IEEE 754, serta overflow dan underflow.',
  estimatedMinutes: 18,
  learningObjectives: [
    'Memahami perbedaan desimal, biner, oktal, dan heksadesimal.',
    'Mengonversi bilangan antar sistem bilangan.',
    'Menjelaskan mengapa heksadesimal sering dipakai programmer.',
    'Menguasai operasi bitwise AND, OR, XOR, dan NOT.',
    'Memahami penggunaan bit shift dan bit mask untuk flag.',
    'Memahami two\'s complement untuk bilangan negatif.',
    'Mengenal IEEE 754 sebagai representasi bilangan pecahan.',
    'Memahami konsep overflow dan underflow.',
  ],
  summaryPoints: [
    'Komputer bekerja dengan biner; heksadesimal membuatnya lebih ringkas.',
    'Bitwise AND, OR, XOR, dan NOT memanipulasi bit secara langsung.',
    'Bit shift mengalikan atau membagi dengan pangkat dua.',
    'Bit mask memungkinkan banyak flag disimpan dalam satu bilangan bulat.',
    'Two\'s complement merepresentasikan bilangan negatif.',
    'IEEE 754 menangani bilangan pecahan, tetapi tidak semua desimal presisi sempurna.',
    'Overflow dan underflow muncul saat nilai keluar dari rentang tipe data.',
  ],
  references: ch02References,
  lesson: ch02Lesson,
  quiz: ch02Quiz,
}
