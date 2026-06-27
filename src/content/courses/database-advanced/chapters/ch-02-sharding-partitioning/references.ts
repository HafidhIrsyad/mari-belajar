import type { Reference } from '@/content/types'

export const ch02References: Reference[] = [
  {
    id: 'ref-02-01',
    title: 'PostgreSQL Docs — Table Partitioning',
    url: 'https://www.postgresql.org/docs/current/ddl-partitioning.html',
    description: 'Dokumentasi resmi partitioning di PostgreSQL termasuk range, list, dan hash.',
    type: 'documentation',
  },
  {
    id: 'ref-02-02',
    title: 'Citus Documentation',
    url: 'https://docs.citusdata.com/',
    description: 'Dokumentasi Citus untuk distributed PostgreSQL dan sharding.',
    type: 'documentation',
  },
  {
    id: 'ref-02-03',
    title: 'Vitess Documentation',
    url: 'https://vitess.io/docs/',
    description: 'Panduan sharding MySQL menggunakan Vitess dari CNCF.',
    type: 'documentation',
  },
  {
    id: 'ref-02-04',
    title: 'System Design Primer — Sharding',
    url: 'https://github.com/donnemartin/system-design-primer#sharding',
    description: 'Artikel teknis tentang strategi sharding dan trade-off-nya.',
    type: 'article',
  },
  {
    id: 'ref-02-05',
    title: 'MongoDB University — Sharding',
    url: 'https://learn.mongodb.com/',
    description: 'Latihan interaktif tentang sharded cluster di MongoDB.',
    type: 'interactive',
  },
]
