import type { Chapter } from '@/content/types'
import { ch02Lesson } from './lesson'
import { ch02Quiz } from './quiz'
import { ch02References } from './references'

export const ch02HooksLanjutan: Chapter = {
  id: 'ch-02-hooks-lanjutan',
  slug: 'ch-02-hooks-lanjutan',
  order: 2,
  title: 'Hooks Lanjutan',
  summary:
    'Mendalami useState, useEffect, useRef, useMemo, useCallback, useReducer, custom hooks, serta aturan hooks dan masalah closure stale state.',
  estimatedMinutes: 40,
  learningObjectives: [
    'Menjelaskan mekanisme internal useState dan array hooks.',
    'Menggunakan useEffect dengan dependency array yang benar.',
    'Memahami perbedaan useRef dan state yang ter-trigger render.',
    'Mengoptimalkan performa dengan useMemo dan useCallback.',
    'Membangun custom hooks yang reusable dan mengikuti aturan hooks.',
  ],
  summaryPoints: [
    'Hooks bergantung pada urutan pemanggilan, sehingga tidak boleh dipanggil di dalam kondisi atau loop.',
    'useEffect menangani efek samping; dependency array menentukan kapan efek dijalankan ulang.',
    'useRef menyimpan nilai mutable tanpa memicu re-render.',
    'useMemo dan useCallback menghindari pembuatan objek/fungsi baru yang tidak perlu.',
    'Custom hooks memungkinkan ekstraksi logika stateful yang dapat diuji ulang.',
  ],
  references: ch02References,
  lesson: ch02Lesson,
  quiz: ch02Quiz,
}
