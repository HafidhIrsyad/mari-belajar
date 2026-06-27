import type { Reference } from '@/content/types'

export const ch08References: Reference[] = [
  {
    id: 'ref-08-01',
    title: 'MDN — Event Loop',
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop',
    description:
      'Dokumentasi resmi MDN tentang event loop, task queue, dan microtask queue.',
    type: 'documentation',
  },
  {
    id: 'ref-08-02',
    title: 'web.dev — How browsers work',
    url: 'https://web.dev/articles/howbrowserswork',
    description:
      'Artikel mendalam tentang rendering engine, DOM, CSSOM, dan render tree.',
    type: 'article',
  },
  {
    id: 'ref-08-03',
    title: 'Jake Archibald — Tasks, microtasks, queues',
    url: 'https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/',
    description:
      'Artikel interaktif dengan visualisasi urutan task dan microtasks di event loop.',
    type: 'interactive',
  },
  {
    id: 'ref-08-04',
    title: 'Browser Rendering Performance',
    url: 'https://www.youtube.com/results?search_query=browser+rendering+performance',
    description:
      'Video yang menjelaskan render pipeline, layerization, dan compositor thread.',
    type: 'video',
  },
  {
    id: 'ref-08-05',
    title: 'High Performance Browser Networking',
    url: 'https://hpbn.co/',
    description:
      'Buku online gratis tentang performa jaringan dan browser runtime secara komprehensif.',
    type: 'book',
  },
]
