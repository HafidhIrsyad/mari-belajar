import type { Reference } from '@/content/types'

export const ch08References: Reference[] = [
  {
    id: 'ref-08-01',
    title: 'PostgreSQL Docs — Backup and Restore',
    url: 'https://www.postgresql.org/docs/current/backup.html',
    description: 'Dokumentasi backup, restore, dan PITR PostgreSQL.',
    type: 'documentation',
  },
  {
    id: 'ref-08-02',
    title: 'PostgreSQL Docs — pg_stat_statements',
    url: 'https://www.postgresql.org/docs/current/pgstatstatements.html',
    description: 'Dokumentasi ekstensi statistik query.',
    type: 'documentation',
  },
  {
    id: 'ref-08-03',
    title: 'WAL-G GitHub',
    url: 'https://github.com/wal-g/wal-g',
    description: 'Tool backup PostgreSQL ke cloud storage.',
    type: 'documentation',
  },
  {
    id: 'ref-08-04',
    title: '2ndQuadrant — Barman',
    url: 'https://www.enterprisedb.com/products/barman',
    description: 'Backup and Recovery Manager untuk PostgreSQL.',
    type: 'article',
  },
  {
    id: 'ref-08-05',
    title: 'PostgreSQLTV — Backup & Monitoring',
    url: 'https://www.youtube.com/postgrestv',
    description: 'Video praktik backup dan monitoring PostgreSQL.',
    type: 'video',
  },
]
