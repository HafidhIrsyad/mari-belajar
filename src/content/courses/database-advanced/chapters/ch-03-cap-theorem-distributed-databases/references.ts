import type { Reference } from '@/content/types'

export const ch03References: Reference[] = [
  {
    id: 'ref-03-01',
    title: 'MongoDB — CAP Theorem',
    url: 'https://www.mongodb.com/resources/basics/databases/cap-theorem',
    description: 'Penjelasan visual dan praktis tentang CAP theorem untuk database modern.',
    type: 'article',
  },
  {
    id: 'ref-03-02',
    title: 'The Raft Consensus Algorithm',
    url: 'https://raft.github.io/',
    description: 'Situs resmi Raft dengan animasi dan paper asli.',
    type: 'documentation',
  },
  {
    id: 'ref-03-03',
    title: 'CockroachDB — Architecture Overview',
    url: 'https://www.cockroachlabs.com/docs/stable/architecture/overview.html',
    description: 'Dokumentasi arsitektur distributed SQL dan consensus di CockroachDB.',
    type: 'documentation',
  },
  {
    id: 'ref-03-04',
    title: 'Martin Kleppmann — Designing Data-Intensive Applications',
    url: 'https://dataintensive.net/',
    description: 'Buku klasik tentang consistency, replication, dan distributed data.',
    type: 'book',
  },
  {
    id: 'ref-03-05',
    title: 'System Design Primer — CAP Theorem',
    url: 'https://github.com/donnemartin/system-design-primer#cap-theorem',
    description: 'Ringkasan CAP, PACELC, dan trade-off distributed systems.',
    type: 'article',
  },
]
