import type { Reference } from '@/content/types'

export const ch01References: Reference[] = [
  {
    id: 'ref-01-01',
    title: 'A Tour of Go — Concurrency',
    url: 'https://go.dev/tour/concurrency/1',
    description:
      'Tutorial resmi Go untuk memahami goroutine, channel, dan select secara interaktif.',
    type: 'interactive',
  },
  {
    id: 'ref-01-02',
    title: 'Go by Example — Goroutines',
    url: 'https://gobyexample.com/goroutines',
    description:
      'Koleksi contoh kode pendek yang menjelaskan cara kerja goroutine dan channel.',
    type: 'documentation',
  },
  {
    id: 'ref-01-03',
    title: 'Go Blog — Share Memory By Communicating',
    url: 'https://go.dev/blog/codelab-share',
    description:
      'Artikel resmi Go tentang filosofi komunikasi antar goroutine melalui channel.',
    type: 'article',
  },
  {
    id: 'ref-01-04',
    title: 'Go’s Work-Stealing Scheduler',
    url: 'https://www.ardanlabs.com/blog/2018/08/scheduling-in-go-part2.html',
    description:
      'Penjelasan mendalam tentang model GMP, work stealing, dan perilaku scheduler Go.',
    type: 'article',
  },
  {
    id: 'ref-01-05',
    title: 'Visualizing Concurrency in Go',
    url: 'https://www.youtube.com/results?search_query=goroutine+channel+go+concurrency',
    description:
      'Video-visualisasi pola concurrency di Go untuk memperkuat pemahaman konsep.',
    type: 'video',
  },
]
