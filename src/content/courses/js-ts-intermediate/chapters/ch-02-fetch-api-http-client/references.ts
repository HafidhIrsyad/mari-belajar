import type { Reference } from '@/content/types'

export const ch02References: Reference[] = [
  {
    id: 'ref-02-01',
    title: 'MDN — Using Fetch',
    url: 'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch',
    description:
      'Dokumentasi resmi MDN tentang penggunaan fetch API di browser.',
    type: 'documentation',
  },
  {
    id: 'ref-02-02',
    title: 'web.dev — Inside browser networking',
    url: 'https://developer.chrome.com/blog/inside-browser-part2',
    description:
      'Artikel mendalam tentang cara browser menangani koneksi jaringan, DNS, TCP, dan HTTP/2.',
    type: 'article',
  },
  {
    id: 'ref-02-03',
    title: 'Fetch API JavaScript Tutorial',
    url: 'https://www.youtube.com/results?search_query=fetch+api+javascript+tutorial',
    description:
      'Video tutorial yang menjelaskan fetch, async/await, dan error handling secara praktis.',
    type: 'video',
  },
  {
    id: 'ref-02-04',
    title: 'HTTP/2 in Action',
    url: 'https://freecontent.manning.com/animation-http-1-1-vs-http-2-vs-http-2-with-push/',
    description:
      'Buku dan animasi gratis yang menjelaskan perbedaan HTTP/1.1 dan HTTP/2 secara visual.',
    type: 'book',
  },
  {
    id: 'ref-02-05',
    title: 'Go by Example — HTTP Client',
    url: 'https://gobyexample.com/http-clients',
    description:
      'Contoh interaktif penggunaan net/http client di Go dengan context dan timeout.',
    type: 'interactive',
  },
]
