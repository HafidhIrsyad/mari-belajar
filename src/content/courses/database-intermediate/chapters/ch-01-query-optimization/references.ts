import type { Reference } from '@/content/types'

export const ch01References: Reference[] = [
  {
    id: 'ref-01-01',
    title: 'PostgreSQL Docs — Planner / Optimizer',
    url: 'https://www.postgresql.org/docs/current/planner-optimizer.html',
    description: 'Dokumentasi resmi cara kerja planner dan cost model PostgreSQL.',
    type: 'documentation',
  },
  {
    id: 'ref-01-02',
    title: 'Use The Index, Luke — SQL Indexing',
    url: 'https://use-the-index-luke.com/',
    description: 'Buku online tentang indexing dan performa query SQL.',
    type: 'book',
  },
  {
    id: 'ref-01-03',
    title: 'Brent Ozar — How to Think Like the SQL Server Engine',
    url: 'https://www.brentozar.com/archive/2019/05/how-to-think-like-the-sql-server-engine/',
    description: 'Seri artikel video tentang internal query optimizer.',
    type: 'video',
  },
  {
    id: 'ref-01-04',
    title: 'PostgreSQL Wiki — Query Planning',
    url: 'https://wiki.postgresql.org/wiki/Query_Planning',
    description: 'Wiki komunitas mengenai teknik query planning.',
    type: 'article',
  },
  {
    id: 'ref-01-05',
    title: 'PG Exercises',
    url: 'https://pgexercises.com/',
    description: 'Latihan interaktif SQL termasuk analisis plan.',
    type: 'interactive',
  },
]
