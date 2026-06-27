import type { Reference } from '@/content/types'

export const ch06References: Reference[] = [
  {
    id: 'ref-06-01',
    title: 'Go Slices',
    url: 'https://go.dev/tour/moretypes/7',
    description:
      'Bagian A Tour of Go yang menjelaskan slice, length, capacity, dan slicing.',
    type: 'interactive',
  },
  {
    id: 'ref-06-02',
    title: 'Go Maps',
    url: 'https://go.dev/tour/moretypes/19',
    description:
      'Bagian A Tour of Go tentang map, literal, dan two-value lookup.',
    type: 'interactive',
  },
  {
    id: 'ref-06-03',
    title: 'Go Slices: usage and internals',
    url: 'https://go.dev/blog/slices-intro',
    description:
      'Artikel resmi Go yang menjelaskan slice header, backing array, append, dan copy secara mendalam.',
    type: 'article',
  },
  {
    id: 'ref-06-04',
    title: 'Go by Example: Maps',
    url: 'https://gobyexample.com/maps',
    description:
      'Contoh praktis penggunaan map di Go termasuk set, get, dan delete.',
    type: 'article',
  },
  {
    id: 'ref-06-05',
    title: 'Inside Go Map Internals',
    url: 'https://www.youtube.com/results?search_query=go+map+internals',
    description:
      'Video yang membahas implementasi hash table dan bucket pada map di Go.',
    type: 'video',
  },
]
