import type { Chapter } from '@/content/types'
import { ch01Lesson } from './lesson'
import { ch01Quiz } from './quiz'
import { ch01References } from './references'

export const ch01AdvancedAlgorithms: Chapter = {
  id: 'ch-01-advanced-algorithms',
  slug: 'ch-01-advanced-algorithms',
  order: 1,
  title: 'Algoritma Lanjutan',
  summary:
    'Memperdalam divide & conquer, sorting lanjutan (merge, quick, heap), dynamic programming (knapsack, LCS), serta perbandingan strategi greedy versus solusi optimal.',
  estimatedMinutes: 50,
  learningObjectives: [
    'Menerapkan pola divide & conquer untuk memecah masalah menjadi submasalah yang lebih kecil.',
    'Mengimplementasikan merge sort, quick sort, dan heap sort serta menganalisis kompleksitasnya.',
    'Menyelesaikan masalah knapsack dan LCS dengan dynamic programming.',
    'Membedakan kapan strategi greedy cukup dan kapan diperlukan solusi optimal.',
    'Menganalisis trade-off waktu dan ruang pada algoritma lanjutan.',
  ],
  summaryPoints: [
    'Divide & conquer memecah masalah, menyelesaikan submasalah, lalu menggabungkan hasilnya.',
    'Merge sort dan heap sort menjamin O(n log n) di worst case; quick sort rata-rata cepat tetapi worst case O(n²).',
    'Dynamic programming menyimpan sub-solusi untuk menghindari perhitungan berulang pada masalah overlapping.',
    'Greedy memilih langkah lokal terbaik; tidak selalu menghasilkan solusi global optimal.',
    'Pemilihan algoritma bergantung pada ukuran input, constraint memori, dan kebutuhan stabilitas sort.',
  ],
  references: ch01References,
  lesson: ch01Lesson,
  quiz: ch01Quiz,
}
