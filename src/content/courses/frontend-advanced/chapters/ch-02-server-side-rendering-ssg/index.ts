import type { Chapter } from '@/content/types'
import { ch02Lesson } from './lesson'
import { ch02Quiz } from './quiz'
import { ch02References } from './references'

export const ch02ServerSideRenderingSsg: Chapter = {
  id: 'ch-02-server-side-rendering-ssg',
  slug: 'ch-02-server-side-rendering-ssg',
  order: 2,
  title: 'Server-Side Rendering & SSG',
  summary:
    'Memahami perbedaan CSR, SSR, dan SSG, lalu mendalami React Server Components, streaming SSR, partial prerendering, serta edge runtime di ekosistem modern.',
  estimatedMinutes: 45,
  learningObjectives: [
    'Membandingkan trade-off CSR, SSR, SSG, dan ISR.',
    'Menjelaskan konsep hydrasi dan mengapa hydrasi yang berlebihan memperlambat startup.',
    'Memahami React Server Components dan batasannya dibanding Client Components.',
    'Menguraikan partial prerendering dan streaming SSR.',
    'Memahami peran edge runtime dalam arsitektur frontend modern.',
  ],
  summaryPoints: [
    'CSR mengutamakan interaktivitas setelah bundle siap; SSR dan SSG mengutamakan first paint dan SEO.',
    'Hydrasi adalah proses memberi hidup HTML statis dengan event listener dan state di client.',
    'React Server Components tidak dihydrasi; mereka berjalan sepenuhnya di server.',
    'Streaming SSR memungkinkan progressive rendering dengan Suspense boundaries.',
    'Partial prerendering menggabungkan shell statis dengan bagian dinamis yang distream.',
  ],
  references: ch02References,
  lesson: ch02Lesson,
  quiz: ch02Quiz,
}
