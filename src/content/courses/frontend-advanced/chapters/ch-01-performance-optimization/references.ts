import type { Reference } from '@/content/types'

export const ch01References: Reference[] = [
  {
    id: 'ref-01-01',
    title: 'web.dev — Core Web Vitals',
    url: 'https://web.dev/articles/vitals',
    description:
      'Dokumentasi resmi Google tentang LCP, INP, CLS, dan cara mengukurnya.',
    type: 'documentation',
  },
  {
    id: 'ref-01-02',
    title: 'web.dev — Optimize INP',
    url: 'https://web.dev/articles/optimize-inp',
    description:
      'Panduan praktis mengoptimalkan Interaction to Next Paint dengan fragmentasi tugas dan optimasi event handler.',
    type: 'documentation',
  },
  {
    id: 'ref-01-03',
    title: 'web.dev — Code splitting',
    url: 'https://web.dev/articles/reduce-javascript-payloads-with-code-splitting',
    description:
      'Penjelasan mendalam tentang teknik code splitting dan kapan menggunakannya.',
    type: 'article',
  },
  {
    id: 'ref-01-04',
    title: 'React Docs — Lazy',
    url: 'https://react.dev/reference/react/lazy',
    description:
      'Dokumentasi React tentang React.lazy dan Suspense untuk lazy loading komponen.',
    type: 'documentation',
  },
  {
    id: 'ref-01-05',
    title: 'web.dev — Lazy loading images',
    url: 'https://web.dev/articles/lazy-loading-images',
    description:
      'Panduan mengimplementasikan lazy loading native pada elemen gambar dan iframe.',
    type: 'article',
  },
]
