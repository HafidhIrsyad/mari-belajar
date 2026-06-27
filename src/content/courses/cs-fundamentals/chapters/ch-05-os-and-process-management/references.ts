import type { Reference } from '@/content/types'

export const ch05References: Reference[] = [
  {
    id: 'ref-05-01',
    title: 'Operating Systems: Three Easy Pieces',
    url: 'http://pages.cs.wisc.edu/~remzi/OSTEP/',
    description:
      'Buku teks gratis yang menjelaskan sistem operasi, proses, thread, scheduling, dan memori secara komprehensif.',
    type: 'book',
  },
  {
    id: 'ref-05-02',
    title: 'MDN: Concurrency model and the event loop',
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop',
    description:
      'Dokumentasi MDN tentang model concurrency JavaScript berbasis event loop, task queue, dan microtask queue.',
    type: 'documentation',
  },
  {
    id: 'ref-05-03',
    title: 'Go by Example: Goroutines',
    url: 'https://gobyexample.com/goroutines',
    description:
      'Artikel interaktif yang memperkenalkan goroutine dan sync.WaitGroup di Go untuk concurrency ringkas.',
    type: 'article',
  },
  {
    id: 'ref-05-04',
    title: 'Process State and Lifecycle',
    url: 'https://www.youtube.com/results?search_query=process+state+lifecycle+operating+system',
    description:
      'Kumpulan video penjelasan visual tentang lifecycle proses dan state diagram pada sistem operasi.',
    type: 'video',
  },
  {
    id: 'ref-05-05',
    title: 'CPU Scheduling Visualization',
    url: 'https://www.cs.usfca.edu/~galles/visualization/Comparison.html',
    description:
      'Alat interaktif untuk memvisualisasikan dan membandingkan algoritma scheduling seperti FIFO dan Round Robin.',
    type: 'interactive',
  },
]
