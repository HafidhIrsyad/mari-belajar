import type { Chapter } from '@/content/types'
import { ch01Lesson } from './lesson'
import { ch01Quiz } from './quiz'
import { ch01References } from './references'

export const ch01HowComputersWork: Chapter = {
  id: 'ch-01-how-computers-work',
  slug: 'ch-01-how-computers-work',
  order: 1,
  title: 'Cara Kerja Komputer — Dari Bit sampai Program Berjalan',
  summary:
    'Memahami dasar-dasar komputer mulai dari bit dan byte, representasi data, compiler vs interpreter, hingga siklus CPU dan layout memori.',
  estimatedMinutes: 14,
  learningObjectives: [
    'Menjelaskan apa itu bit, byte, dan mengapa komputer menggunakan sistem biner.',
    'Membaca dan mengonversi bilangan biner ke desimal dan sebaliknya.',
    'Memahami bagaimana data (angka, teks) direpresentasikan di dalam memori.',
    'Menjelaskan perbedaan compiler, interpreter, dan transpiler.',
    'Memahami siklus kerja CPU (fetch-decode-execute) secara konseptual.',
    'Mengenal layout memori dan konsep pointer secara umum.',
  ],
  summaryPoints: [
    'Komputer bekerja dengan bit (0 dan 1); 8 bit membentuk 1 byte.',
    'Sistem biner adalah cara komputer merepresentasikan angka; heksadesimal membacanya lebih ringkas.',
    'Data seperti angka dan teks disimpan sebagai byte di memori.',
    'Compiler, interpreter, dan transpiler menerjemahkan kode dengan cara berbeda.',
    'CPU menjalankan program melalui siklus fetch-decode-execute.',
    'Memori program dibagi menjadi code segment, data segment, stack, dan heap.',
    'Pointer menyimpan alamat memori, bukan nilai langsung.',
  ],
  references: ch01References,
  lesson: ch01Lesson,
  quiz: ch01Quiz,
}
