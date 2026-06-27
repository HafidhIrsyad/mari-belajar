import type { Chapter } from '@/content/types'
import { ch04Lesson } from './lesson'
import { ch04Quiz } from './quiz'
import { ch04References } from './references'

export const ch04FormsValidation: Chapter = {
  id: 'ch-04-forms-validation',
  slug: 'ch-04-forms-validation',
  order: 4,
  title: 'Forms & Validation',
  summary:
    'Membangun formulir HTML yang valid, aksesibel, dan dapat ditingkatkan secara progresif dengan client-side validation serta kesadaran akan pentingnya server-side validation.',
  estimatedMinutes: 24,
  learningObjectives: [
    'Menggunakan elemen form, input types, label, dan atribut validasi bawaan.',
    'Menerapkan Constraint Validation API untuk pesan error kustom.',
    'Menyusun form feedback yang aksesibel dengan aria-live dan aria-describedby.',
    'Memahami progressive enhancement dan mengapa server-side validation tetap wajib.',
    'Menggunakan FormData API untuk mengumpulkan dan mengirim data.',
  ],
  summaryPoints: [
    'Label yang terhubung dengan input melalui atribut for meningkatkan aksesibilitas.',
    'Atribut required, pattern, min, max, dan type membantu validasi bawaan browser.',
    'Constraint Validation API memungkinkan pesan error dan logika kustom.',
    'Form feedback harus diumumkan ke screen reader melalui aria-live.',
    'Validasi sisi klien bisa diakali, sehingga validasi sisi server selalu diperlukan.',
  ],
  references: ch04References,
  lesson: ch04Lesson,
  quiz: ch04Quiz,
}
