import type { Reference } from '@/content/types'

export const ch02References: Reference[] = [
  {
    id: 'ref-02-01',
    title: 'Go Variables and Constants',
    url: 'https://go.dev/tour/basics/8',
    description:
      'Bagian A Tour of Go yang menjelaskan variabel, konstanta, dan zero value.',
    type: 'interactive',
  },
  {
    id: 'ref-02-02',
    title: 'Go Data Types',
    url: 'https://go.dev/ref/spec#Types',
    description:
      'Spesifikasi resmi Go tentang tipe data, termasuk numerik, string, boolean, rune, dan byte.',
    type: 'documentation',
  },
  {
    id: 'ref-02-03',
    title: 'Strings, bytes, runes and characters in Go',
    url: 'https://go.dev/blog/strings',
    description:
      'Artikel resmi Go yang menjelaskan representasi string, UTF-8, rune, dan iterasi string.',
    type: 'article',
  },
  {
    id: 'ref-02-04',
    title: 'Go Slice Internals',
    url: 'https://go.dev/blog/slices-intro',
    description:
      'Artikel tentang representasi internal slice di Go yang relevan untuk memahami header slice.',
    type: 'article',
  },
  {
    id: 'ref-02-05',
    title: 'Go Pointer Basics Video',
    url: 'https://www.youtube.com/results?search_query=go+pointers+explained',
    description:
      'Video yang menjelaskan cara kerja pointer di Go dan perbedaannya dengan C.',
    type: 'video',
  },
]
