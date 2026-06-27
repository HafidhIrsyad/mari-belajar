import type { Reference } from '@/content/types'

export const ch02References: Reference[] = [
  {
    id: 'ref-02-01',
    title: 'React Docs — Hooks API Reference',
    url: 'https://react.dev/reference/react',
    description:
      'Dokumentasi resmi untuk semua built-in hooks beserta aturan penggunaannya.',
    type: 'documentation',
  },
  {
    id: 'ref-02-02',
    title: 'A Complete Guide to useEffect',
    url: 'https://overreacted.io/a-complete-guide-to-useeffect/',
    description:
      'Artikel mendalam dari Dan Abramov tentang mental model useEffect, closures, dan dependency array.',
    type: 'article',
  },
  {
    id: 'ref-02-03',
    title: 'React Hooks: Memoization',
    url: 'https://www.youtube.com/watch?v=vpE9I7GdA3c',
    description:
      'Video yang menjelaskan kapan dan mengapa menggunakan useMemo dan useCallback.',
    type: 'video',
  },
  {
    id: 'ref-02-04',
    title: 'useHooks.com',
    url: 'https://usehooks.com/',
    description:
      'Koleksi custom hooks siap pakai dengan penjelasan dan contoh kode.',
    type: 'interactive',
  },
  {
    id: 'ref-02-05',
    title: 'How React Hooks Work Internally',
    url: 'https://www.netlify.com/blog/2019/03/11/deep-dive-how-do-react-hooks-really-work/',
    description:
      'Artikel teknis yang menjelaskan bagaimana React menyimpan hook state secara internal.',
    type: 'article',
  },
]
