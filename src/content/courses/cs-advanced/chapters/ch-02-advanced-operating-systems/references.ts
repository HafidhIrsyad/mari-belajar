import type { Reference } from '@/content/types'

export const ch02References: Reference[] = [
  {
    id: 'ref-02-01',
    title: 'Operating Systems: Three Easy Pieces',
    url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/',
    description:
      'Buku gratis yang membahas scheduling, virtual memory, dan filesystem secara mendalam dengan contoh praktis.',
    type: 'book',
  },
  {
    id: 'ref-02-02',
    title: 'Linux Kernel Documentation — Scheduler',
    url: 'https://docs.kernel.org/scheduler/index.html',
    description:
      'Dokumentasi resmi scheduler Linux termasuk Completely Fair Scheduler (CFS) dan runqueue.',
    type: 'documentation',
  },
  {
    id: 'ref-02-03',
    title: 'ext4 Filesystem — Kernel Documentation',
    url: 'https://docs.kernel.org/filesystems/ext4/index.html',
    description:
      'Penjelasan struktur ext4: inode, block group, dan journaling untuk konsistensi data.',
    type: 'documentation',
  },
  {
    id: 'ref-02-04',
    title: 'Virtual Memory and Page Replacement',
    url: 'https://www.cs.usfca.edu/~galles/visualization/Comparison.html',
    description:
      'Visualisasi interaktif algoritma page replacement termasuk LRU, FIFO, dan Optimal untuk pembelajaran.',
    type: 'interactive',
  },
  {
    id: 'ref-02-05',
    title: 'Copy-on-Write — Wikipedia',
    url: 'https://en.wikipedia.org/wiki/Copy-on-write',
    description:
      'Penjelasan teknik copy-on-write yang dipakai fork(), Docker layer, dan struktur data persistent.',
    type: 'article',
  },
]
