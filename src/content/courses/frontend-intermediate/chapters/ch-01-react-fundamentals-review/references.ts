import type { Reference } from '@/content/types'

export const ch01References: Reference[] = [
  {
    id: 'ref-01-01',
    title: 'React Docs — Thinking in React',
    url: 'https://react.dev/learn/thinking-in-react',
    description:
      'Dokumentasi resmi React tentang cara berpikir dalam komponen, props, dan state.',
    type: 'documentation',
  },
  {
    id: 'ref-01-02',
    title: 'React Docs — Reconciliation',
    url: 'https://react.dev/learn/preserving-and-resetting-state',
    description:
      'Penjelasan mendalam tentang bagaimana React mempertahankan atau me-reset state selama reconciliation.',
    type: 'documentation',
  },
  {
    id: 'ref-01-03',
    title: 'A Cartoon Intro to Fiber',
    url: 'https://www.youtube.com/watch?v=ZCuYPiUIONs',
    description:
      'Video dari React Conf yang menjelaskan Fiber architecture dengan visualisasi yang mudah dipahami.',
    type: 'video',
  },
  {
    id: 'ref-01-04',
    title: 'Build your own React',
    url: 'https://pomb.us/build-your-own-react/',
    description:
      'Tutorial interaktif untuk membangun reconciler dan hooks sederhana dari nol.',
    type: 'interactive',
  },
  {
    id: 'ref-01-05',
    title: 'React Fiber Architecture',
    url: 'https://github.com/acdlite/react-fiber-architecture',
    description:
      'README dari Andrew Clark yang menjelaskan tujuan dan karakteristik React Fiber.',
    type: 'article',
  },
]
