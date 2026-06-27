import type { Chapter } from '@/content/types'
import { ch06Lesson } from './lesson'
import { ch06Quiz } from './quiz'
import { ch06References } from './references'

export const ch06TestingJavascriptTypescript: Chapter = {
  id: 'ch-06-testing-javascript-typescript',
  slug: 'ch-06-testing-javascript-typescript',
  order: 6,
  title: 'Testing JavaScript & TypeScript',
  summary:
    'Mempelajari unit testing, mocking, spies, testing async, testing React, TDD cycle, property-based testing, dan test pyramid.',
  estimatedMinutes: 40,
  learningObjectives: [
    'Menulis unit test dengan runner Vitest/Jest menggunakan arrange-act-assert.',
    'Memahami mocking modules dan spies.',
    'Menguji kode asynchronous dengan async/await.',
    'Menggunakan Testing Library untuk menguji React component.',
    'Menerapkan TDD cycle dan coverage thresholds.',
    'Memahami test pyramid dan trade-off antar jenis test.',
  ],
  summaryPoints: [
    'Unit test mengisolasi fungsi kecil untuk memverifikasi perilaku.',
    'Arrange-Act-Assert adalah pola umum menulis test yang mudah dibaca.',
    'Mock dan spy mengganti dependency untuk mengontrol input dan mengamati output.',
    'Async test harus menunggu Promise selesai sebelum assertion.',
    'Testing Library mendorong pengujian dari perspektif pengguna.',
    'TDD menggabungkan test, implementasi, dan refactor dalam siklus pendek.',
  ],
  references: ch06References,
  lesson: ch06Lesson,
  quiz: ch06Quiz,
}
