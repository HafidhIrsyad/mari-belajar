import type { Chapter } from '@/content/types'
import { ch05Lesson } from './lesson'
import { ch05Quiz } from './quiz'
import { ch05References } from './references'

export const ch05ModulesBundlerTooling: Chapter = {
  id: 'ch-05-modules-bundler-tooling',
  slug: 'ch-05-modules-bundler-tooling',
  order: 5,
  title: 'Modules, Bundler & Tooling',
  summary:
    'Memahami ES modules, dynamic import, tree shaking, module resolution, bundler modern, dan perbandingan dengan sistem package Go.',
  estimatedMinutes: 35,
  learningObjectives: [
    'Menggunakan import/export dan script type="module".',
    'Memahami perbedaan ESM dan CJS serta interoperability.',
    'Menerapkan dynamic import untuk code splitting.',
    'Menjelaskan tree shaking dan performance budget.',
    'Mengkonfigurasi path alias di tsconfig dan Vite.',
    'Memahami algoritma module resolution dan circular dependencies.',
  ],
  summaryPoints: [
    'ES modules menggunakan import/export dan bersifat static, memungkinkan tree shaking.',
    'CommonJS (CJS) menggunakan require/module.exports dan bersifat dynamic.',
    'Dynamic import memuat module secara lazy untuk mengurangi bundle awal.',
    'Tree shaking menghapus kode yang tidak digunakan saat bundling.',
    'Module resolution menentukan file mana yang dipilih saat import path ditemukan.',
    'Circular dependencies dapat menyebabkan perilaku tak terduga dan harus dihindari.',
  ],
  references: ch05References,
  lesson: ch05Lesson,
  quiz: ch05Quiz,
}
