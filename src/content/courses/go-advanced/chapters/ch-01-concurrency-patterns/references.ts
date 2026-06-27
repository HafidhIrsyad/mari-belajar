import type { Reference } from '@/content/types'

export const ch01References: Reference[] = [
  {
    id: 'ref-01-01',
    title: 'Go Blog — Pipelines and cancellation',
    url: 'https://go.dev/blog/pipelines',
    description:
      'Artikel resmi Go tentang pola pipeline, cancellation, dan fan-out/fan-in dengan channel.',
    type: 'article',
  },
  {
    id: 'ref-01-02',
    title: 'Go by Example — Worker Pools',
    url: 'https://gobyexample.com/worker-pools',
    description:
      'Contoh interaktif worker pool di Go yang menunjukkan pembatasan concurrency.',
    type: 'interactive',
  },
  {
    id: 'ref-01-03',
    title: 'golang.org/x/sync/errgroup',
    url: 'https://pkg.go.dev/golang.org/x/sync/errgroup',
    description:
      'Dokumentasi package errgroup untuk menjalankan goroutine terkait dan menangani error secara kolektif.',
    type: 'documentation',
  },
  {
    id: 'ref-01-04',
    title: 'Toolsaku — Structured Concurrency Patterns',
    url: 'https://www.toolsku.com/en/blog/go-coroutine-structured-concurrency-2026/',
    description:
      'Pembahasan praktis structured concurrency dan pencegahan goroutine leak di Go.',
    type: 'article',
  },
  {
    id: 'ref-01-05',
    title: 'golang.org/x/sync/semaphore',
    url: 'https://pkg.go.dev/golang.org/x/sync/semaphore',
    description:
      'Dokumentasi package semaphore untuk membatasi jumlah akses konkuren ke resource.',
    type: 'documentation',
  },
]
