import type { Chapter } from '@/content/types'
import { ch06Lesson } from './lesson'
import { ch06Quiz } from './quiz'
import { ch06References } from './references'

export const ch06FormsValidationDiReact: Chapter = {
  id: 'ch-06-forms-validation-di-react',
  slug: 'ch-06-forms-validation-di-react',
  order: 6,
  title: 'Forms & Validation di React',
  summary:
    'Menguasai form controlled dan uncontrolled, React Hook Form, integrasi schema validation dengan Zod, serta memahami resolver internals dan performa.',
  estimatedMinutes: 40,
  learningObjectives: [
    'Membedakan controlled dan uncontrolled inputs.',
    'Menggunakan React Hook Form untuk mengurangi re-render.',
    'Mendefinisikan schema validasi dengan Zod.',
    'Memahami cara resolver menghubungkan RHF dengan library validasi.',
    'Mengelola form dinamis seperti field arrays.',
  ],
  summaryPoints: [
    'Controlled input nilainya dikelola React; uncontrolled input dikelola DOM.',
    'React Hook Form mengurangi re-render dengan ref uncontrolled dan validasi efisien.',
    'Zod menyediakan schema validation dengan TypeScript inference.',
    'Resolver menerjemahkan hasil validasi Zod ke format yang dipahami RHF.',
    'Field arrays memungkinkan form dengan jumlah field yang dinamis.',
  ],
  references: ch06References,
  lesson: ch06Lesson,
  quiz: ch06Quiz,
}
