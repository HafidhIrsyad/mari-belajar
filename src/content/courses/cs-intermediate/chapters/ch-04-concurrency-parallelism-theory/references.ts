import type { Reference } from '@/content/types'

export const ch04References: Reference[] = [
  {
    id: 'ref-04-01',
    title: 'Operating Systems: Three Easy Pieces — Concurrency',
    url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/threads-intro.pdf',
    description:
      'Buku open source tentang thread, locking, dan masalah concurrency tingkat OS.',
    type: 'book',
  },
  {
    id: 'ref-04-02',
    title: 'Java Memory Model Specification',
    url: 'https://docs.oracle.com/javase/specs/jls/se17/html/jls-17.html',
    description:
      'Spesifikasi formal happens-before dan visibility rules pada Java Memory Model.',
    type: 'documentation',
  },
  {
    id: 'ref-04-03',
    title: 'Coffman Conditions — Deadlock',
    url: 'https://en.wikipedia.org/wiki/Deadlock',
    description:
      'Artikel tentang deadlock dan empat kondisi Coffman yang harus terpenuhi bersamaan.',
    type: 'article',
  },
  {
    id: 'ref-04-04',
    title: 'Communicating Sequential Processes (CSP)',
    url: 'https://www.cs.ox.ac.uk/people/michael.benedikt/Home/CSP.pdf',
    description:
      'Paper asli Tony Hoare tentang CSP — paradigma concurrency berbasis message passing.',
    type: 'article',
  },
  {
    id: 'ref-04-05',
    title: 'pthreads Man Pages',
    url: 'https://man7.org/linux/man-pages/man7/pthreads.7.html',
    description:
      'Dokumentasi POSIX threads mencakup mutex, condition variable, dan semaphore.',
    type: 'documentation',
  },
]
