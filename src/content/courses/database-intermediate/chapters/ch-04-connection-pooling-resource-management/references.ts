import type { Reference } from '@/content/types'

export const ch04References: Reference[] = [
  {
    id: 'ref-04-01',
    title: 'PostgreSQL Docs — Connection Settings',
    url: 'https://www.postgresql.org/docs/current/runtime-config-connection.html',
    description: 'Dokumentasi parameter koneksi PostgreSQL.',
    type: 'documentation',
  },
  {
    id: 'ref-04-02',
    title: 'PgBouncer Documentation',
    url: 'https://www.pgbouncer.org/config.html',
    description: 'Dokumentasi konfigurasi dan mode pooling PgBouncer.',
    type: 'documentation',
  },
  {
    id: 'ref-04-03',
    title: 'HikariCP — About Pool Sizing',
    url: 'https://github.com/brettwooldridge/HikariCP/wiki/About-Pool-Sizing',
    description: 'Artikel klasik tentang menghitung ukuran pool JDBC.',
    type: 'article',
  },
  {
    id: 'ref-04-04',
    title: 'Craig Kerstiens — PgBouncer Best Practices',
    url: 'https://www.craigkerstiens.com/2021/07/20/pgbouncer-best-practices/',
    description: 'Praktik terbaik menggunakan PgBouncer.',
    type: 'article',
  },
  {
    id: 'ref-04-05',
    title: 'Go database/sql Documentation',
    url: 'https://go.dev/doc/database/manage-connections',
    description: 'Panduan resmi mengelola koneksi database di Go.',
    type: 'documentation',
  },
]
