import type { Chapter } from '@/content/types'
import { ch08Lesson } from './lesson'
import { ch08Quiz } from './quiz'
import { ch08References } from './references'

export const ch08DatabaseDesignProject: Chapter = {
  id: 'ch-08-database-design-project',
  slug: 'ch-08-database-design-project',
  order: 8,
  title: 'Database Design Project',
  summary:
    'Menerapkan seluruh pengetahuan pada proyek desain database end-to-end: requirement gathering, ERD, normalisasi, DDL, index planning, seed data, dan strategi migrasi.',
  estimatedMinutes: 60,
  learningObjectives: [
    'Mengumpulkan kebutuhan bisnis dan menerjemahkannya ke entitas dan relasi.',
    'Membuat ERD untuk sistem LMS atau order system.',
    'Menulis DDL lengkap dengan constraint dan index.',
    'Menyusun seed data realistis dan query pelaporan.',
    'Merencanakan strategi migrasi dan performa awal.',
  ],
  summaryPoints: [
    'Desain database dimulai dari pemahaman kebutuhan bisnis, bukan langsung menulis SQL.',
    'ERD menjadi blueprint yang dapat dievaluasi bersama stakeholder.',
    'Normalisasi mengurangi redundansi; index dipilih berdasarkan query pattern.',
    'Seed data membantu menguji constraint dan query sebelum aplikasi dihubungkan.',
    'Strategi migrasi harus aman, reversible, dan terdokumentasi.',
  ],
  references: ch08References,
  lesson: ch08Lesson,
  quiz: ch08Quiz,
}
