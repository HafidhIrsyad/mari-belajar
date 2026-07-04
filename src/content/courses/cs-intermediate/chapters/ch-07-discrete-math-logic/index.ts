import type { Chapter } from '@/content/types'
import { ch07Lesson } from './lesson'
import { ch07Quiz } from './quiz'
import { ch07References } from './references'

export const ch07DiscreteMathLogic: Chapter = {
  id: 'ch-07-discrete-math-logic',
  slug: 'ch-07-discrete-math-logic',
  order: 7,
  title: 'Matematika Diskrit dan Logika',
  summary:
    'Menguasai proposisi, truth table, implikasi, induksi matematika, relasi rekurens, serta dasar counting dan probability yang langsung dipakai dalam analisis algoritma.',
  estimatedMinutes: 48,
  learningObjectives: [
    'Menyusun truth table untuk proposisi majemuk dan mengevaluasi implikasi logika.',
    'Membuktikan pernyataan dengan induksi matematika pada base case dan inductive step.',
    'Menyusun dan menyelesaikan relasi rekurens untuk algoritma divide-and-conquer.',
    'Menghitung permutasi, kombinasi, dan probabilitas sederhana untuk analisis kompleksitas.',
    'Mengaitkan logika dan counting dengan invariant loop dan correctness proof.',
  ],
  summaryPoints: [
    'Proposisi adalah pernyataan bernilai true/false; operator ∧, ∨, ¬, → membentuk pernyataan majemuk.',
    'Implikasi P → Q false hanya jika P true dan Q false — penting untuk kontrapositif dalam proof.',
    'Induksi matematika: buktikan base case, lalu asumsikan P(k) dan turunkan P(k+1).',
    'Rekurens T(n) = aT(n/b) + f(n) sering diselesaikan dengan Master Theorem atau induksi.',
    'Counting dan probability membantu estimasi collision hash, birthday problem, dan expected runtime.',
  ],
  references: ch07References,
  lesson: ch07Lesson,
  quiz: ch07Quiz,
}
