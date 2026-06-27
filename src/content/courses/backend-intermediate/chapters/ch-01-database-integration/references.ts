import type { Reference } from '@/content/types'

export const ch01References: Reference[] = [
  {
    id: 'ref-01-01',
    title: 'Prisma Docs',
    url: 'https://www.prisma.io/docs',
    description:
      'Dokumentasi resmi Prisma, ORM modern untuk Node.js dan TypeScript dengan fitur migrasi dan type-safe query.',
    type: 'documentation',
  },
  {
    id: 'ref-01-02',
    title: 'Martin Fowler — Repository Pattern',
    url: 'https://martinfowler.com/eaaCatalog/repository.html',
    description:
      'Penjelasan singkat pola repository untuk mediasi antara domain layer dan data mapping layer.',
    type: 'article',
  },
  {
    id: 'ref-01-03',
    title: 'PostgreSQL Docs — Tutorial',
    url: 'https://www.postgresql.org/docs/current/tutorial.html',
    description:
      'Tutorial resmi PostgreSQL yang mencakup SQL dasar, transaksi, dan fitur lanjutan.',
    type: 'documentation',
  },
  {
    id: 'ref-01-04',
    title: 'Go sqlx Docs',
    url: 'https://jmoiron.github.io/sqlx/',
    description:
      'Dokumentasi library sqlx untuk Go yang memperluas database/sql dengan struct scanning.',
    type: 'documentation',
  },
  {
    id: 'ref-01-05',
    title: 'Use The Index, Luke',
    url: 'https://use-the-index-luke.com/',
    description:
      'Buku web gratis tentang indeks database dan optimasi query SQL untuk developer aplikasi.',
    type: 'book',
  },
]
