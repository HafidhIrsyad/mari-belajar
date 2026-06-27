import type { Chapter } from '@/content/types'
import { ch03Lesson } from './lesson'
import { ch03Quiz } from './quiz'
import { ch03References } from './references'

export const ch03Authorization: Chapter = {
  id: 'ch-03-authorization',
  slug: 'ch-03-authorization',
  order: 3,
  title: 'Authorization',
  summary:
    'Mempelajari kontrol akses mulai dari RBAC, policy-based, ownership check, ABAC, permission matrix, hingga row-level security di PostgreSQL.',
  estimatedMinutes: 45,
  learningObjectives: [
    'Membedakan autentikasi dan authorization.',
    'Menerapkan RBAC dengan role dan permission.',
    'Melakukan ownership check sebelum mengubah resource.',
    'Memahami ABAC dengan atribut user, resource, action, dan environment.',
    'Menggunakan row-level security di database untuk membatasi data per tenant/user.',
  ],
  summaryPoints: [
    'Autentikasi menjawab siapa, authorization menjawab apa yang boleh dilakukan.',
    'RBAC menetapkan izin berdasarkan role, sederhana tetapi kurang fleksibel untuk aturan halus.',
    'Ownership check memastikan pengguna hanya dapat mengubah resource miliknya.',
    'ABAC mengevaluasi atribut secara dinamis sehingga kebijakan lebih ekspresif.',
    'Row-level security memindahkan sebagian kebijakan akses ke dalam database.',
  ],
  references: ch03References,
  lesson: ch03Lesson,
  quiz: ch03Quiz,
}
