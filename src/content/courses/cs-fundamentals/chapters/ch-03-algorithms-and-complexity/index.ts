import type { Chapter } from '@/content/types'
import { ch03Lesson } from './lesson'
import { ch03Quiz } from './quiz'
import { ch03References } from './references'

export const ch03AlgorithmsAndComplexity: Chapter = {
  id: 'ch-03-algorithms-and-complexity',
  slug: 'ch-03-algorithms-and-complexity',
  order: 3,
  title: 'Algoritma dan Kompleksitas',
  summary:
    'Mempelajari definisi algoritma, pseudocode, flowchart, algoritma pencarian dan pengurutan, notasi Big-O, rekursi, serta teknik memoization untuk meningkatkan performa.',
  estimatedMinutes: 20,
  learningObjectives: [
    'Menjelaskan definisi algoritma, pseudocode, flowchart, serta konsep input/proses/output.',
    'Memahami cara kerja linear search dan binary search beserta kompleksitasnya.',
    'Memahami cara kerja bubble sort, selection sort, dan insertion sort.',
    'Menganalisis best case, average case, dan worst case dari algoritma sederhana.',
    'Mengenal notasi Big-O untuk mengukur pertumbuhan waktu dan ruang.',
    'Memahami konsep rekursi, base case, dan recursive case.',
    'Menjelaskan teknik memoization untuk menghindari perhitungan berulang.',
  ],
  summaryPoints: [
    'Algoritma adalah langkah terstruktur untuk menyelesaikan masalah.',
    'Linear search memeriksa elemen satu per satu dengan kompleksitas O(n).',
    'Binary search membagi data menjadi dua dengan kompleksitas O(log n), tetapi membutuhkan data terurut.',
    'Bubble sort, selection sort, dan insertion sort umumnya memiliki kompleksitas O(n²).',
    'Big-O mengukur laju pertumbuhan waktu atau ruang seiring bertambahnya ukuran input.',
    'Rekursi memecah masalah dengan fungsi yang memanggil dirinya sendiri dan memerlukan base case.',
    'Memoization menyimpan hasil perhitungan untuk menghindari perhitungan ulang.',
  ],
  references: ch03References,
  lesson: ch03Lesson,
  quiz: ch03Quiz,
}
