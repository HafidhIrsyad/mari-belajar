import type { Chapter } from '@/content/types'
import { ch06Lesson } from './lesson'
import { ch06Quiz } from './quiz'
import { ch06References } from './references'

export const ch06AlgorithmicPerformanceAnalysis: Chapter = {
  id: 'ch-06-algorithmic-performance-analysis',
  slug: 'ch-06-algorithmic-performance-analysis',
  order: 6,
  title: 'Analisis Performa Algoritmik',
  summary:
    'Mempelajari analisis amortized, hukum Amdahl, master theorem, algoritma cache-oblivious, dan model external memory untuk memahami performa di berbagai skala hardware.',
  estimatedMinutes: 50,
  learningObjectives: [
    'Menjelaskan analisis amortized dan perbedaannya dengan worst-case analysis.',
    'Menerapkan hukum Amdahl untuk mengevaluasi batas speedup paralelisasi.',
    'Menggunakan master theorem untuk menyelesaikan rekurens divide-and-conquer.',
    'Memahami prinsip cache-oblivious algorithms dan locality of reference.',
    'Menganalisis algoritma dalam model external memory (I/O model).',
  ],
  summaryPoints: [
    'Analisis amortized meratakan biaya operasi mahal ke banyak operasi murah (contoh: dynamic array doubling).',
    'Hukum Amdahl: speedup maksimum terbatas oleh fraksi sequential yang tidak dapat diparalelkan.',
    'Master theorem menyelesaikan T(n) = aT(n/b) + f(n) untuk algoritma divide-and-conquer.',
    'Cache-oblivious algorithms optimal di semua level cache tanpa mengetahui parameter hardware.',
    'External memory model menghitung I/O complexity berdasarkan jumlah block transfer, bukan operasi CPU.',
  ],
  references: ch06References,
  lesson: ch06Lesson,
  quiz: ch06Quiz,
}
