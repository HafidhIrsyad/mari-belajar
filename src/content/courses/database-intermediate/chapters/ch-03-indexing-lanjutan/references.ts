import type { Reference } from '@/content/types'

export const ch03References: Reference[] = [
  {
    id: 'ref-03-01',
    title: 'PostgreSQL Docs — Index Types',
    url: 'https://www.postgresql.org/docs/current/indexes-types.html',
    description: 'Dokumentasi B-tree, Hash, GiST, SP-GiST, GIN, dan BRIN.',
    type: 'documentation',
  },
  {
    id: 'ref-03-02',
    title: 'PostgreSQL Wiki — Index Maintenance',
    url: 'https://wiki.postgresql.org/wiki/Index_Maintenance',
    description: 'Panduan memelihara dan mendeteksi bloat index.',
    type: 'article',
  },
  {
    id: 'ref-03-03',
    title: 'Bruce Momjian — PostgreSQL Indexing',
    url: 'https://momjian.us/main/writings/pgsql/Indexing.pdf',
    description: 'Slide presentasi mendalam tentang indexing PostgreSQL.',
    type: 'book',
  },
  {
    id: 'ref-03-04',
    title: 'Crunchy Data — Indexing JSONB with GIN',
    url: 'https://www.crunchydata.com/blog/pg-gin-index-on-jsonb',
    description: 'Artikel praktis penggunaan GIN untuk JSONB.',
    type: 'article',
  },
  {
    id: 'ref-03-05',
    title: 'Postgres.tv — Indexing Deep Dive',
    url: 'https://www.youtube.com/postgrestv',
    description: 'Koleksi video PostgreSQL termasuk topik index lanjutan.',
    type: 'video',
  },
]
