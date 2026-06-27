import type { Reference } from '@/content/types'

export const ch07References: Reference[] = [
  {
    id: 'ref-07-01',
    title: 'PostgreSQL Docs — High Availability',
    url: 'https://www.postgresql.org/docs/current/high-availability.html',
    description:
      'Dokumentasi PostgreSQL tentang streaming replication, failover, dan high availability.',
    type: 'documentation',
  },
  {
    id: 'ref-07-02',
    title: 'Martin Fowler — CQRS',
    url: 'https://martinfowler.com/bliki/CQRS.html',
    description:
      'Penjelasan CQRS dan kapan memisahkan model baca dan tulis.',
    type: 'article',
  },
  {
    id: 'ref-07-03',
    title: 'CockroachDB Docs',
    url: 'https://www.cockroachlabs.com/docs/',
    description:
      'Dokumentasi CockroachDB, database SQL terdistribusi dengan konsistensi kuat.',
    type: 'documentation',
  },
  {
    id: 'ref-07-04',
    title: 'Vitess Docs',
    url: 'https://vitess.io/docs/',
    description:
      'Sistem sharding untuk MySQL yang digunakan oleh YouTube dan lainnya.',
    type: 'documentation',
  },
  {
    id: 'ref-07-05',
    title: 'System Design Primer — Database',
    url: 'https://github.com/donnemartin/system-design-primer#database',
    description:
      'Ringkasan pola database skala besar termasuk sharding, replication, dan SQL vs NoSQL.',
    type: 'documentation',
  },
]
