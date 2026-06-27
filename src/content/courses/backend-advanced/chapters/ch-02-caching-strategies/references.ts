import type { Reference } from '@/content/types'

export const ch02References: Reference[] = [
  {
    id: 'ref-02-01',
    title: 'Redis Docs',
    url: 'https://redis.io/docs/latest/',
    description:
      'Dokumentasi resmi Redis mencakup perintah cache, TTL, eviction, dan persistence.',
    type: 'documentation',
  },
  {
    id: 'ref-02-02',
    title: 'MDN — HTTP Caching',
    url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching',
    description:
      'Penjelasan mendalam tentang header cache, validasi, dan perilaku browser serta CDN.',
    type: 'documentation',
  },
  {
    id: 'ref-02-03',
    title: 'web.dev — HTTP cache',
    url: 'https://web.dev/articles/http-cache',
    description:
      'Panduan praktis mengoptimalkan HTTP caching untuk asset statis dan dinamis.',
    type: 'article',
  },
  {
    id: 'ref-02-04',
    title: 'Go Redis Client',
    url: 'https://github.com/redis/go-redis',
    description:
      'Client Redis untuk Go yang mendukung cluster, sentinel, dan operasi cache modern.',
    type: 'documentation',
  },
  {
    id: 'ref-02-05',
    title: 'Martin Fowler — Patterns of Enterprise Application Architecture',
    url: 'https://martinfowler.com/eaaCatalog/',
    description:
      'Katalog pola termasuk cache pattern seperti cache-aside dan write-through.',
    type: 'book',
  },
]
