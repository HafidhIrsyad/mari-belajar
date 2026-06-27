import type { Reference } from '@/content/types'

export const ch01References: Reference[] = [
  {
    id: 'ref-01-01',
    title: 'Martin Fowler — Microservices',
    url: 'https://martinfowler.com/articles/microservices.html',
    description:
      'Definisi dan karakteristik microservices oleh Martin Fowler, termasuk trade-off dibanding monolith.',
    type: 'article',
  },
  {
    id: 'ref-01-02',
    title: 'Designing Data-Intensive Applications (DDIA) Notes',
    url: 'https://github.com/iggredible/DDIA-Notes',
    description:
      'Catatan komunitas untuk buku DDIA karya Martin Kleppmann yang membahas distributed systems secara mendalam.',
    type: 'book',
  },
  {
    id: 'ref-01-03',
    title: 'AWS — CAP Theorem',
    url: 'https://aws.amazon.com/what-is/cap-theorem/',
    description:
      'Penjelasan AWS tentang consistency, availability, partition tolerance, dan contoh sistem CP vs AP.',
    type: 'documentation',
  },
  {
    id: 'ref-01-04',
    title: 'Go by Example — HTTP Server',
    url: 'https://gobyexample.com/http-servers',
    description:
      'Contoh dasar HTTP server di Go yang dapat diperluas menjadi reverse proxy dan gateway.',
    type: 'interactive',
  },
  {
    id: 'ref-01-05',
    title: 'System Design Primer',
    url: 'https://github.com/donnemartin/system-design-primer',
    description:
      'Repositori open source dengan pola dan latihan desain sistem terdistribusi untuk engineer.',
    type: 'documentation',
  },
]
