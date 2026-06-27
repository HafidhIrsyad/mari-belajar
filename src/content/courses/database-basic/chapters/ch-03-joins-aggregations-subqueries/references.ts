import type { Reference } from '@/content/types'

export const ch03References: Reference[] = [
  {
    id: 'ref-03-01',
    title: 'SQLBolt — Advanced SQL',
    url: 'https://sqlbolt.com/lesson/select_queries_with_joins',
    description: 'Latihan interaktif tentang JOIN dan query lanjutan.',
    type: 'interactive',
  },
  {
    id: 'ref-03-02',
    title: 'PostgreSQL Docs — Window Functions',
    url: 'https://www.postgresql.org/docs/current/tutorial-window.html',
    description: 'Dokumentasi resmi window functions di PostgreSQL.',
    type: 'documentation',
  },
  {
    id: 'ref-03-03',
    title: 'Mode Analytics — SQL Tutorial',
    url: 'https://mode.com/sql-tutorial/',
    description: 'Tutorial SQL praktis untuk analisis data termasuk subquery dan window functions.',
    type: 'interactive',
  },
  {
    id: 'ref-03-04',
    title: 'Use The Index, Luke',
    url: 'https://use-the-index-luke.com/',
    description: 'Panduan indexing SQL yang menjelaskan bagaimana query dieksekusi di bawah hood.',
    type: 'book',
  },
  {
    id: 'ref-03-05',
    title: 'Go sqlx Docs',
    url: 'https://jmoiron.github.io/sqlx/',
    description: 'Dokumentasi sqlx untuk query SQL yang lebih ergonomis di Go.',
    type: 'documentation',
  },
]
