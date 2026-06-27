import type { Chapter } from '@/content/types'
import { ch08Lesson } from './lesson'
import { ch08Quiz } from './quiz'
import { ch08References } from './references'

export const ch08TestingBackend: Chapter = {
  id: 'ch-08-testing-backend',
  slug: 'ch-08-testing-backend',
  order: 8,
  title: 'Testing Backend',
  summary:
    'Mempelajari pengujian backend mulai dari unit test dengan mock repository, integration test dengan database, e2e test, contract testing, load testing, hingga mutation testing dan testcontainers.',
  estimatedMinutes: 50,
  learningObjectives: [
    'Menulis unit test untuk service dengan mock repository.',
    'Menguji endpoint HTTP dengan supertest dan httptest.',
    'Menyusun integration test dengan database test dan seeding.',
    'Memahami contract testing dan load testing.',
    'Menggunakan testcontainers untuk dependency eksternal dalam test.',
  ],
  summaryPoints: [
    'Unit test mengisolasi satu unit kode, biasanya dengan mock dependency.',
    'Integration test memverifikasi interaksi antara komponen nyata seperti service dan database.',
    'E2E test menguji alur lengkap dari endpoint sampai response.',
    'Contract testing memastikan konsumen dan provider sepakat tentang API contract.',
    'Testcontainers menyediakan database atau broker sungguhan untuk test tanpa memerlukan environment manual.',
  ],
  references: ch08References,
  lesson: ch08Lesson,
  quiz: ch08Quiz,
}
