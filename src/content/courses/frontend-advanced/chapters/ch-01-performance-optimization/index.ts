import type { Chapter } from '@/content/types'
import { ch01Lesson } from './lesson'
import { ch01Quiz } from './quiz'
import { ch01References } from './references'

export const ch01PerformanceOptimization: Chapter = {
  id: 'ch-01-performance-optimization',
  slug: 'ch-01-performance-optimization',
  order: 1,
  title: 'Performance Optimization',
  summary:
    'Mempelajari optimasi performa frontend dari code splitting dan lazy loading hingga Web Vitals, INP, critical CSS, streaming, prefetching, dan strategi caching di service worker.',
  estimatedMinutes: 45,
  learningObjectives: [
    'Menjelaskan perbedaan lab data dan RUM untuk mengukur performa.',
    'Mengimplementasikan code splitting, lazy loading, dan prefetching yang tepat sasaran.',
    'Menganalisis Core Web Vitals (LCP, INP, CLS) dan faktor yang memengaruhinya.',
    'Memahami critical CSS, streaming response, dan edge caching.',
    'Merancang service worker caching strategy untuk offline-first experience.',
  ],
  summaryPoints: [
    'Code splitting mengurangi JavaScript awal yang harus diunduh dan dieksekusi.',
    'INP mengukur responsivitas keseluruhan selama siklus hidup halaman.',
    'Critical CSS harus di-inline agar first paint tidak tertunda oleh render blocking.',
    'Streaming memungkinkan browser merender HTML secara bertahap tanpa menunggu seluruh respons.',
    'RUM memberikan data nyata dari pengguna; lab data memberikan baseline yang dapat direproduksi.',
  ],
  references: ch01References,
  lesson: ch01Lesson,
  quiz: ch01Quiz,
}
