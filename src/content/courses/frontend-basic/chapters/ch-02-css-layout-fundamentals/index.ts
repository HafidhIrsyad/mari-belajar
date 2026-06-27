import type { Chapter } from '@/content/types'
import { ch02Lesson } from './lesson'
import { ch02Quiz } from './quiz'
import { ch02References } from './references'

export const ch02CssLayoutFundamentals: Chapter = {
  id: 'ch-02-css-layout-fundamentals',
  slug: 'ch-02-css-layout-fundamentals',
  order: 2,
  title: 'CSS Layout Fundamentals',
  summary:
    'Menguasai box model, display, positioning, stacking context, Flexbox, Grid, serta memahami render tree dan layout engine browser.',
  estimatedMinutes: 25,
  learningObjectives: [
    'Menjelaskan box model dan perbedaan content-box dengan border-box.',
    'Menggunakan display, position, dan z-index untuk menyusun layout.',
    'Memahami pembentukan CSSOM, render tree, dan pipeline style → layout → paint → composite.',
    'Membuat layout satu dimensi dengan Flexbox dan dua dimensi dengan Grid.',
    'Mengenal container queries, intrinsic sizing, forced synchronous layout, dan property contain.',
  ],
  summaryPoints: [
    'Box model terdiri dari content, padding, border, dan margin.',
    'box-sizing: border-box membuat ukuran elemen lebih mudah diprediksi.',
    'Render tree dibangun dari DOM dan CSSOM; node yang tidak terlihat dihilangkan.',
    'Flexbox cocok untuk layout satu dimensi, Grid untuk layout dua dimensi.',
    'Forced synchronous layout terjadi saat kita membaca layout setelah menulis style secara berulang.',
  ],
  references: ch02References,
  lesson: ch02Lesson,
  quiz: ch02Quiz,
}
