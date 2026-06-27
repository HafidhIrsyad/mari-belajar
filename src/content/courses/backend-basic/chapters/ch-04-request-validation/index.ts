import type { Chapter } from '@/content/types'
import { ch04Lesson } from './lesson'
import { ch04Quiz } from './quiz'
import { ch04References } from './references'

export const ch04RequestValidation: Chapter = {
  id: 'ch-04-request-validation',
  slug: 'ch-04-request-validation',
  order: 4,
  title: 'Request Validation',
  summary:
    'Melindungi API dari input tidak valid melalui validasi manual, schema-based validation, error formatting, custom validators, dan validation pipes.',
  estimatedMinutes: 30,
  learningObjectives: [
    'Memvalidasi input secara manual dan memahami kapan cukup serta kapan perlu schema library.',
    'Menggunakan Zod, Joi, atau Yup untuk schema validation.',
    'Memformat error agar actionable bagi client.',
    'Membuat custom validator untuk aturan bisnis spesifik.',
    'Menerapkan validation pipe di framework seperti NestJS.',
  ],
  summaryPoints: [
    'Validasi input adalah garis pertahanan pertama terhadap data corrupt dan serangan injeksi.',
    'Schema library memberikan validasi deklaratif yang dapat digunakan di frontend dan backend.',
    'Error message harus spesifik dan menyebutkan field serta constraint yang gagal.',
    'Custom validator menangani aturan lintas field yang tidak tercakup library bawaan.',
    'Validation pipe mengintegrasikan validasi ke dalam siklus request framework.',
  ],
  references: ch04References,
  lesson: ch04Lesson,
  quiz: ch04Quiz,
}
