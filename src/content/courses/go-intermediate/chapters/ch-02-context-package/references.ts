import type { Reference } from '@/content/types'

export const ch02References: Reference[] = [
  {
    id: 'ref-02-01',
    title: 'Go Docs — context',
    url: 'https://pkg.go.dev/context',
    description:
      'Dokumentasi resmi package context dengan daftar fungsi, method, dan contoh penggunaan.',
    type: 'documentation',
  },
  {
    id: 'ref-02-02',
    title: 'Go Blog — Context',
    url: 'https://go.dev/blog/context',
    description:
      'Artikel asal-usul context dan bagaimana Google menggunakan context di server Go.',
    type: 'article',
  },
  {
    id: 'ref-02-03',
    title: 'Go by Example — Context',
    url: 'https://gobyexample.com/context',
    description:
      'Contoh praktis penggunaan context.WithTimeout dan cancellation propagation.',
    type: 'interactive',
  },
  {
    id: 'ref-02-04',
    title: 'MDN — AbortController',
    url: 'https://developer.mozilla.org/en-US/docs/Web/API/AbortController',
    description:
      'Dokumentasi AbortController di JavaScript yang memiliki konsep mirip context.WithCancel.',
    type: 'documentation',
  },
  {
    id: 'ref-02-05',
    title: 'Context and Cancellation in Go',
    url: 'https://www.youtube.com/results?search_query=go+context+cancellation',
    description:
      'Video penjelasan visual tentang cancellation tree dan best practices context di Go.',
    type: 'video',
  },
]
