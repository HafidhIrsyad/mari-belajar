import type { Chapter } from '@/content/types'
import { ch08Lesson } from './lesson'
import { ch08Quiz } from './quiz'
import { ch08References } from './references'

export const ch08ModulesToolingBestPractices: Chapter = {
  id: 'ch-08-modules-tooling-best-practices',
  slug: 'ch-08-modules-tooling-best-practices',
  order: 8,
  title: 'Modules, Tooling, dan Best Practices',
  summary:
    'Mempelajari ES Modules dengan import/export, penggunaan package.json dan npm/pnpm script, konfigurasi TypeScript, linter dan formatter, pengelolaan environment variables, serta praktik terbaik penanganan error dan penulisan kode yang mudah dibaca.',
  estimatedMinutes: 15,
  learningObjectives: [
    'Memahami cara kerja import dan export pada ES Modules di JavaScript/TypeScript.',
    'Menjelaskan peran package.json, npm/pnpm script, dan node_modules dalam proyek.',
    'Mengonfigurasi TypeScript dasar melalui tsconfig.json.',
    'Membedakan fungsi linter dan formatter serta memahami manfaatnya.',
    'Menerapkan penanganan error dan gaya penulisan kode yang baik.',
    'Mengenal sumber daya lanjutan untuk terus belajar JavaScript/TypeScript.',
  ],
  summaryPoints: [
    'ES Modules memisahkan kode menjadi file-file kecil melalui import dan export.',
    'package.json menyimpan metadata proyek, daftar dependensi, dan definisi script.',
    'npm/pnpm script menjalankan perintah umum seperti dev, build, dan test.',
    'tsconfig.json mengatur compiler TypeScript, termasuk target dan mode strict.',
    'Linter membantu menemukan potensi bug/gaya, formatter merapikan tampilan kode.',
    'Environment variables sebaiknya disimpan di luar kode dan tidak mengandung secret langsung.',
    'Kode yang baik memiliki nama jelas, fungsi fokus, dan penanganan error yang tepat.',
  ],
  references: ch08References,
  lesson: ch08Lesson,
  quiz: ch08Quiz,
}
