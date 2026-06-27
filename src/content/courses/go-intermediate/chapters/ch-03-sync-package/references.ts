import type { Reference } from '@/content/types'

export const ch03References: Reference[] = [
  {
    id: 'ref-03-01',
    title: 'Go by Example — WaitGroups',
    url: 'https://gobyexample.com/waitgroups',
    description:
      'Penjelasan praktis penggunaan sync.WaitGroup untuk menunggu goroutine.',
    type: 'documentation',
  },
  {
    id: 'ref-03-02',
    title: 'Go by Example — Mutexes',
    url: 'https://gobyexample.com/mutexes',
    description:
      'Contoh penggunaan sync.Mutex untuk melindungi data bersama dari race condition.',
    type: 'interactive',
  },
  {
    id: 'ref-03-03',
    title: 'Go by Example — Atomic Counters',
    url: 'https://gobyexample.com/atomic-counters',
    description:
      'Tutorial operasi atomic untuk counter sederhana tanpa mutex.',
    type: 'interactive',
  },
  {
    id: 'ref-03-04',
    title: 'Go Docs — Race Detector',
    url: 'https://go.dev/doc/articles/race_detector',
    description:
      'Dokumentasi resmi tentang cara menggunakan race detector di Go.',
    type: 'documentation',
  },
  {
    id: 'ref-03-05',
    title: 'Concurrency in Go: Tools and Techniques for Developers',
    url: 'https://www.oreilly.com/library/view/concurrency-in-go/9781491941294/',
    description:
      'Buku referensi mendalam tentang concurrency pattern, sync primitives, dan best practices di Go.',
    type: 'book',
  },
]
