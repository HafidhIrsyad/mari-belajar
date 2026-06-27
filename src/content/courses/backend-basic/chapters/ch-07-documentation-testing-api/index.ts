import type { Chapter } from '@/content/types'
import { ch07Lesson } from './lesson'
import { ch07Quiz } from './quiz'
import { ch07References } from './references'

export const ch07DocumentationTestingApi: Chapter = {
  id: 'ch-07-documentation-testing-api',
  slug: 'ch-07-documentation-testing-api',
  order: 7,
  title: 'Documentation & Testing API',
  summary:
    'Mendokumentasikan API dengan OpenAPI/Swagger, melakukan pengujian manual dengan curl/Postman, menulis unit test endpoint, dan memahami contract testing serta versioning di dokumentasi.',
  estimatedMinutes: 35,
  learningObjectives: [
    'Membuat dokumentasi API menggunakan Swagger/OpenAPI UI.',
    'Menguji endpoint secara manual dengan curl dan Postman.',
    'Menulis unit test endpoint dengan supertest atau httptest.',
    'Memahami contract testing dan versioning di dokumentasi.',
    'Menyertakan contoh dan skema yang konsisten di dokumentasi.',
  ],
  summaryPoints: [
    'Dokumentasi API yang baik mengurangi silo antara tim backend dan frontend.',
    'OpenAPI memungkinkan deskripsi endpoint, skema, dan contoh secara machine-readable.',
    'Unit test endpoint memastikan handler berfungsi tanpa perlu menjalankan server penuh.',
    'Contract testing memverifikasi kesesuaian antara producer dan consumer.',
    'Contoh dan skema yang akurat meningkatkan kepercayaan developer terhadap dokumentasi.',
  ],
  references: ch07References,
  lesson: ch07Lesson,
  quiz: ch07Quiz,
}
