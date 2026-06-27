import type { Reference } from '@/content/types'

export const ch06References: Reference[] = [
  {
    id: 'ref-06-01',
    title: 'Go Docs — The Go Memory Model',
    url: 'https://go.dev/ref/mem',
    description:
      'Dokumentasi resmi tentang model memori Go dan aturan visibilitas antar goroutine.',
    type: 'documentation',
  },
  {
    id: 'ref-06-02',
    title: 'Go Blog — Go GC: Latency Problem Solved',
    url: 'https://go.dev/blog/ismmkeynote',
    description:
      'Presentasi keynote tentang garbage collector Go dan latency.',
    type: 'article',
  },
  {
    id: 'ref-06-03',
    title: 'Go Docs — runtime: GOGC/GOMEMLIMIT',
    url: 'https://pkg.go.dev/runtime',
    description:
      'Dokumentasi package runtime yang menjelaskan variabel lingkungan GOGC dan GOMEMLIMIT.',
    type: 'documentation',
  },
  {
    id: 'ref-06-04',
    title: 'Go Blog — Profiling Go Programs',
    url: 'https://go.dev/blog/pprof',
    description:
      'Panduan menggunakan pprof untuk profiling CPU dan memori program Go.',
    type: 'article',
  },
  {
    id: 'ref-06-05',
    title: 'MDN — WeakRef',
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakRef',
    description:
      'Referensi WeakRef JavaScript untuk perbandingan dengan object pooling di Go.',
    type: 'documentation',
  },
]
