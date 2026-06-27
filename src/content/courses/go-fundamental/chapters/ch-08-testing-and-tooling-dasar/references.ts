import type { Reference } from '@/content/types'

export const ch08References: Reference[] = [
  {
    id: 'ref-08-01',
    title: 'Testing in Go',
    url: 'https://go.dev/doc/tutorial/add-a-test',
    description:
      'Tutorial resmi Go untuk menulis unit test pertama menggunakan package testing.',
    type: 'interactive',
  },
  {
    id: 'ref-08-02',
    title: 'Go Test Documentation',
    url: 'https://pkg.go.dev/testing',
    description:
      'Dokumentasi package testing yang mencakup testing.T, testing.B, subtests, dan benchmark.',
    type: 'documentation',
  },
  {
    id: 'ref-08-03',
    title: 'Table-Driven Tests in Go',
    url: 'https://go.dev/wiki/TableDrivenTests',
    description:
      'Wiki resmi Go yang menjelaskan idiom table-driven tests secara detail.',
    type: 'article',
  },
  {
    id: 'ref-08-04',
    title: 'Data Race Detector',
    url: 'https://go.dev/doc/articles/race_detector',
    description:
      'Dokumentasi resmi tentang race detector, cara kerja, dan contoh penggunaannya.',
    type: 'documentation',
  },
  {
    id: 'ref-08-05',
    title: 'Profiling Go Programs',
    url: 'https://go.dev/blog/pprof',
    description:
      'Artikel resmi tentang penggunaan pprof untuk profiling CPU dan memory di Go.',
    type: 'article',
  },
]
