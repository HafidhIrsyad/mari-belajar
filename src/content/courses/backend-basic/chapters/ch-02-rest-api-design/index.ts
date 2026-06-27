import type { Chapter } from '@/content/types'
import { ch02Lesson } from './lesson'
import { ch02Quiz } from './quiz'
import { ch02References } from './references'

export const ch02RestApiDesign: Chapter = {
  id: 'ch-02-rest-api-design',
  slug: 'ch-02-rest-api-design',
  order: 2,
  title: 'REST API Design',
  summary:
    'Merancang REST API yang konsisten dengan pemikiran resource-first, CRUD mapping, pagination, versioning, HATEOAS, idempotency keys, dan spesifikasi OpenAPI.',
  estimatedMinutes: 30,
  learningObjectives: [
    'Memodelkan endpoint REST berbasis noun/resources, bukan verb/actions.',
    'Memetakan operasi CRUD ke metode HTTP dengan benar.',
    'Merancang pagination, filtering, dan sorting yang dapat diprediksi.',
    'Memahami kontrak API melalui OpenAPI dan JSON:API.',
    'Menerapkan idempotency keys untuk operasi kritis.',
  ],
  summaryPoints: [
    'REST memperlakukan URL sebagai resource, bukan aksi.',
    'CRUD dipetakan ke POST, GET, PUT/PATCH, dan DELETE.',
    'Pagination mencegah response besar dan meningkatkan stabilitas.',
    'OpenAPI memungkinkan dokumentasi dan validasi kontrak API.',
    'Idempotency keys melindungi operasi dari duplikasi akibat retry.',
  ],
  references: ch02References,
  lesson: ch02Lesson,
  quiz: ch02Quiz,
}
