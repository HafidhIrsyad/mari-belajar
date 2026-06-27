import type { Reference } from '@/content/types'

export const ch01References: Reference[] = [
  {
    id: 'ref-01-01',
    title: 'PostgreSQL Docs — High Availability, Load Balancing, and Replication',
    url: 'https://www.postgresql.org/docs/current/high-availability.html',
    description: 'Dokumentasi resmi PostgreSQL tentang streaming replication, failover, dan high availability.',
    type: 'documentation',
  },
  {
    id: 'ref-01-02',
    title: 'MySQL Docs — Replication',
    url: 'https://dev.mysql.com/doc/refman/8.0/en/replication.html',
    description: 'Panduan lengkap replikasi MySQL termasuk semi-synchronous dan group replication.',
    type: 'documentation',
  },
  {
    id: 'ref-01-03',
    title: 'Patroni Documentation',
    url: 'https://patroni.readthedocs.io/en/latest/',
    description: 'Template untuk HA PostgreSQL dengan automatic failover menggunakan DCS.',
    type: 'documentation',
  },
  {
    id: 'ref-01-04',
    title: 'Debezium — Logical Decoding and CDC',
    url: 'https://debezium.io/documentation/reference/stable/connectors/postgresql.html',
    description: 'Artikel teknis tentang logical decoding, replication slot, dan change data capture.',
    type: 'article',
  },
  {
    id: 'ref-01-05',
    title: 'MongoDB University — Replication',
    url: 'https://learn.mongodb.com/',
    description: 'Kursus interaktif gratis tentang replica set dan failover di MongoDB.',
    type: 'interactive',
  },
]
