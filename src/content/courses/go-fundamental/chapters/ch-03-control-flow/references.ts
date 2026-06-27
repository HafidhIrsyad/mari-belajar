import type { Reference } from '@/content/types'

export const ch03References: Reference[] = [
  {
    id: 'ref-03-01',
    title: 'Go Control Flow Statements',
    url: 'https://go.dev/tour/flowcontrol',
    description:
      'Bagian A Tour of Go yang menjelaskan if, for, switch, defer, panic, dan recover.',
    type: 'interactive',
  },
  {
    id: 'ref-03-02',
    title: 'Defer, Panic, and Recover',
    url: 'https://go.dev/blog/defer-panic-and-recover',
    description:
      'Artikel resmi Go yang menjelaskan cara kerja defer, panic, dan recover secara mendalam.',
    type: 'article',
  },
  {
    id: 'ref-03-03',
    title: 'Go Statements Specification',
    url: 'https://go.dev/ref/spec#Statements',
    description:
      'Spesifikasi resmi Go tentang statements termasuk for, if, switch, dan defer.',
    type: 'documentation',
  },
  {
    id: 'ref-04-04',
    title: 'Go by Example: Loops',
    url: 'https://gobyexample.com/for',
    description:
      'Contoh praktis penggunaan for dan range di Go dengan penjelasan singkat.',
    type: 'article',
  },
  {
    id: 'ref-03-05',
    title: 'Understanding Go Defer',
    url: 'https://www.youtube.com/results?search_query=go+defer+internals',
    description:
      'Video yang menjelaskan mekanisme internal defer dan urutan eksekusinya.',
    type: 'video',
  },
]
