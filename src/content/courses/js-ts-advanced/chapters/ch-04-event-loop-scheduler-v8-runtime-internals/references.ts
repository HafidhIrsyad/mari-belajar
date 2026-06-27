import type { Reference } from '@/content/types'

export const ch04References: Reference[] = [
  {
    id: 'ref-04-01',
    title: 'V8 Docs — How V8 works',
    url: 'https://v8.dev/docs/how-v8-works',
    description:
      'Dokumentasi resmi V8 yang menjelaskan arsitektur interpreter, compiler, dan optimasi.',
    type: 'documentation',
  },
  {
    id: 'ref-04-02',
    title: 'V8 Blog — Ignition + TurboFan',
    url: 'https://v8.dev/blog/ignition-interpreter',
    description:
      'Artikel resmi V8 tentang Ignition interpreter dan integrasinya dengan TurboFan compiler.',
    type: 'article',
  },
  {
    id: 'ref-04-03',
    title: 'V8 Blog — Fast properties',
    url: 'https://v8.dev/blog/fast-properties',
    description:
      'Penjelasan mendalam mengenai hidden classes, fast properties, dan dictionary mode di V8.',
    type: 'article',
  },
  {
    id: 'ref-04-04',
    title: 'libuv Design Overview',
    url: 'https://docs.libuv.org/en/v1.x/design.html',
    description:
      'Dokumentasi arsitektur libuv yang digunakan Node.js untuk event loop dan asynchronous I/O.',
    type: 'documentation',
  },
  {
    id: 'ref-04-05',
    title: 'Node.js Docs — Event Loop',
    url: 'https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick',
    description:
      'Panduan resmi Node.js tentang event loop, timers, dan perbedaan nextTick dengan setImmediate.',
    type: 'documentation',
  },
]
