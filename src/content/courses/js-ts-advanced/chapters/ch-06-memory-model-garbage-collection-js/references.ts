import type { Reference } from '@/content/types'

export const ch06References: Reference[] = [
  {
    id: 'ref-06-01',
    title: 'V8 Blog — Trash talk',
    url: 'https://v8.dev/blog/trash-talk',
    description:
      'Penjelasan V8 mengenai garbage collection, generational heap, dan perbedaan Scavenge dengan Mark-and-Sweep.',
    type: 'article',
  },
  {
    id: 'ref-06-02',
    title: 'V8 Blog — Orinoco',
    url: 'https://v8.dev/blog/orinoco-parallel-scavenger',
    description:
      'Artikel resmi V8 tentang Orinoco, parallel scavenger, dan concurrent marking.',
    type: 'article',
  },
  {
    id: 'ref-06-03',
    title: 'MDN — Memory Management',
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_management',
    description:
      'Dokumentasi MDN mengenai lifecycle memori, garbage collection, dan WeakMap/WeakSet.',
    type: 'documentation',
  },
  {
    id: 'ref-06-04',
    title: 'Chrome DevTools — Memory',
    url: 'https://developer.chrome.com/docs/devtools/memory',
    description:
      'Panduan menggunakan Chrome DevTools Memory panel untuk heap snapshot dan profiling.',
    type: 'documentation',
  },
  {
    id: 'ref-06-05',
    title: 'JavaScript.info — WeakMap and WeakSet',
    url: 'https://javascript.info/weakmap-weakset',
    description:
      'Tutorial interaktif tentang WeakMap, WeakSet, dan kasus penggunaan praktisnya.',
    type: 'interactive',
  },
]
