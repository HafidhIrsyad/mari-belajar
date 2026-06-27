import type { Reference } from '@/content/types'

export const ch06References: Reference[] = [
  {
    id: 'ref-06-01',
    title: 'PostgreSQL Docs — Transaction Isolation',
    url: 'https://www.postgresql.org/docs/current/transaction-iso.html',
    description: 'Dokumentasi resmi PostgreSQL tentang tingkat isolasi dan anomali.',
    type: 'documentation',
  },
  {
    id: 'ref-06-02',
    title: 'MDN — Transactions',
    url: 'https://developer.mozilla.org/en-US/docs/Web/API/IDBTransaction',
    description: 'Konsep transaksi pada IndexedDB yang dapat dibandingkan dengan database relasional.',
    type: 'documentation',
  },
  {
    id: 'ref-06-03',
    title: 'MySQL Docs — Transactions',
    url: 'https://dev.mysql.com/doc/refman/8.0/en/commit.html',
    description: 'Dokumentasi transaksi di MySQL InnoDB termasuk locking dan isolation levels.',
    type: 'documentation',
  },
  {
    id: 'ref-06-04',
    title: 'Go by Example — SQL Transactions',
    url: 'https://gobyexample.com/sql-transactions',
    description: 'Contoh penggunaan transaksi sql.Tx di Go.',
    type: 'article',
  },
  {
    id: 'ref-06-05',
    title: 'Designing Data-Intensive Applications',
    url: 'https://dataintensive.net/',
    description: 'Buku Martin Kleppmann tentang transaksi, konsistensi, dan distributed data.',
    type: 'book',
  },
]
