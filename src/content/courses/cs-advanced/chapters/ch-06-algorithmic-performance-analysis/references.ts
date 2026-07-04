import type { Reference } from '@/content/types'

export const ch06References: Reference[] = [
  {
    id: 'ref-06-01',
    title: 'CLRS — Introduction to Algorithms (4th ed.)',
    url: 'https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/',
    description:
      'Buku referensi standar yang membahas analisis kompleksitas, amortized analysis, dan master theorem secara mendalam.',
    type: 'book',
  },
  {
    id: 'ref-06-02',
    title: 'Amdahl\'s Law — Wikipedia',
    url: 'https://en.wikipedia.org/wiki/Amdahl%27s_law',
    description:
      'Penjelasan hukum Amdahl tentang batas teoretis speedup paralelisasi berdasarkan fraksi sequential.',
    type: 'article',
  },
  {
    id: 'ref-06-03',
    title: 'Frigo, Leiserson, Prokop & Ramachandran — Cache-Oblivious Algorithms',
    url: 'https://www.cs.duke.edu/~reif/cacheoblivious/cacheoblivious.pdf',
    description:
      'Paper seminal tentang algoritma cache-oblivious dan analisis kompleksitas I/O optimal.',
    type: 'article',
  },
  {
    id: 'ref-06-04',
    title: 'Aggarwal & Vitter — The I/O Complexity of Sorting',
    url: 'https://www.cs.umd.edu/~samir/498/vitter-io-complexity.pdf',
    description:
      'Paper klasik yang memperkenalkan external memory model dan batas lower bound sorting Θ((n/B) log_{M/B}(n/B)).',
    type: 'article',
  },
  {
    id: 'ref-06-05',
    title: 'Go Blog — Profiling Go Programs',
    url: 'https://go.dev/blog/pprof',
    description:
      'Panduan praktis profiling performa program Go, melengkapi teori analisis algoritmik dengan pengukuran empiris.',
    type: 'documentation',
  },
]
