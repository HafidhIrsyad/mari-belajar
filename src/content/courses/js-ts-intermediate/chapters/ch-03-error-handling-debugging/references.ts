import type { Reference } from '@/content/types'

export const ch03References: Reference[] = [
  {
    id: 'ref-03-01',
    title: 'MDN — Exception handling',
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling#exception_handling',
    description:
      'Dokumentasi resmi MDN tentang try/catch/finally dan exception handling di JavaScript.',
    type: 'documentation',
  },
  {
    id: 'ref-03-02',
    title: 'V8 Blog — Async stack traces',
    url: 'https://v8.dev/docs/stack-trace-api',
    description:
      'Penjelasan teknis dari tim V8 tentang bagaimana async stack traces bekerja.',
    type: 'article',
  },
  {
    id: 'ref-03-03',
    title: 'JavaScript Debugging with Chrome DevTools',
    url: 'https://www.youtube.com/results?search_query=chrome+devtools+javascript+debugging',
    description:
      'Video tutorial debugging JavaScript menggunakan breakpoints dan memory profiler.',
    type: 'video',
  },
  {
    id: 'ref-03-04',
    title: 'Go Blog — Error handling and Go',
    url: 'https://go.dev/blog/error-handling-and-go',
    description:
      'Buku/artikel resmi Go tentang filosofi error handling dan wrapping dengan fmt.Errorf.',
    type: 'book',
  },
  {
    id: 'ref-03-05',
    title: 'TypeScript Handbook — Narrowing',
    url: 'https://www.typescriptlang.org/docs/handbook/2/narrowing.html',
    description:
      'Tutorial interaktif tentang type narrowing, instanceof, dan type guards di TypeScript.',
    type: 'interactive',
  },
]
