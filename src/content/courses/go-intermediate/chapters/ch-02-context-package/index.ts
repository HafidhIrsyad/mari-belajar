import type { Chapter } from '@/content/types'
import { ch02Lesson } from './lesson'
import { ch02Quiz } from './quiz'
import { ch02References } from './references'

export const ch02ContextPackage: Chapter = {
  id: 'ch-02-context-package',
  slug: 'ch-02-context-package',
  order: 2,
  title: 'Context Package',
  summary:
    'Mengelola sinyal pembatalan, deadline, dan nilai request-scoped dengan context. Dari context.Background hingga cancellation tree dan best practices penggunaannya.',
  estimatedMinutes: 40,
  learningObjectives: [
    'Membuat context root dengan Background atau TODO.',
    'Menerapkan WithCancel, WithTimeout, dan WithDeadline untuk pembatalan.',
    'Mendeteksi pembatalan melalui ctx.Done dan ctx.Err.',
    'Memahami propagasi context dalam tree call.',
    'Mengetahui kapan dan bagaimana menggunakan WithValue dengan benar.',
    'Memahami struktur internal context dan trade-off-nya.',
  ],
  summaryPoints: [
    'context digunakan untuk membawa deadline, sinyal pembatalan, dan nilai request-scoped antar API boundary.',
    'context.Background adalah root default; context.TODO digunakan sebagai placeholder saat belum jelas context apa yang dipakai.',
    'WithCancel menghasilkan context dan fungsi cancel untuk membatalkan goroutine turunan.',
    'WithTimeout dan WithDeadline memberikan batas waktu pada operasi.',
    'Context membentuk tree: membatalkan parent akan membatalkan semua child.',
    'WithValue sebaiknya hanya untuk data request-scoped seperti request ID atau claims, bukan dependency biasa.',
  ],
  references: ch02References,
  lesson: ch02Lesson,
  quiz: ch02Quiz,
}
