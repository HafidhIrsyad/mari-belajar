import type { Chapter } from '@/content/types'
import { ch04Lesson } from './lesson'
import { ch04Quiz } from './quiz'
import { ch04References } from './references'

export const ch04ComputabilityComplexity: Chapter = {
  id: 'ch-04-computability-complexity',
  slug: 'ch-04-computability-complexity',
  order: 4,
  title: 'Computability & Complexity',
  summary:
    'Memahami mesin Turing, decidability, halting problem, kelas kompleksitas P vs NP, masalah NP-complete, serta pendekatan approximation algorithms.',
  estimatedMinutes: 55,
  learningObjectives: [
    'Menguraikan komponen mesin Turing dan konsep computability.',
    'Membedakan masalah decidable dan undecidable dengan contoh halting problem.',
    'Menjelaskan kelas P, NP, dan hubungan P vs NP.',
    'Mengidentifikasi masalah NP-complete dan teknik reduksi.',
    'Memahami approximation algorithms sebagai solusi praktis untuk masalah NP-hard.',
  ],
  summaryPoints: [
    'Mesin Turing adalah model komputasi universal — segala algoritma dapat dimodelkan sebagai TM.',
    'Halting problem undecidable — tidak ada algoritma umum yang menentukan apakah program arbitrary akan halt.',
    'P = masalah solvable polinomial; NP = masalah verifiable polinomial; P vs NP adalah open problem.',
    'NP-complete adalah masalah NP terkeras — jika satu NP-complete solvable polinomial, maka P = NP.',
    'Approximation algorithms memberikan solusi near-optimal dengan jaminan rasio untuk masalah NP-hard.',
  ],
  references: ch04References,
  lesson: ch04Lesson,
  quiz: ch04Quiz,
}
