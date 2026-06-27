import type { Reference } from '@/content/types'

export const ch01References: Reference[] = [
  {
    id: 'ref-01-01',
    title: 'Go Documentation',
    url: 'https://go.dev/doc/',
    description:
      'Dokumentasi resmi Go yang mencakup tutorial, referensi bahasa, dan dokumentasi standard library.',
    type: 'documentation',
  },
  {
    id: 'ref-01-02',
    title: 'A Tour of Go',
    url: 'https://go.dev/tour/',
    description:
      'Tutorial interaktif resmi untuk mempelajari sintaks dan fitur utama Go secara praktis.',
    type: 'interactive',
  },
  {
    id: 'ref-01-03',
    title: 'Go at Google: Language Design in the Service of Software Engineering',
    url: 'https://go.dev/talks/2012/splash.article',
    description:
      'Artikel tentang filosofi desain Go dan mengapa bahasa ini dibuat untuk software engineering skala besar.',
    type: 'article',
  },
  {
    id: 'ref-01-04',
    title: 'Go Memory Model',
    url: 'https://go.dev/ref/mem',
    description:
      'Dokumentasi resmi yang menjelaskan model memori Go, goroutine, dan channel.',
    type: 'documentation',
  },
  {
    id: 'ref-01-05',
    title: 'Visualizing Go Runtime Scheduler',
    url: 'https://www.youtube.com/results?search_query=go+scheduler+goroutine',
    description:
      'Video yang menjelaskan cara kerja scheduler Go, goroutine, dan mapping ke thread OS.',
    type: 'video',
  },
]
