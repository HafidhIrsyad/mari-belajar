import type { Chapter } from '@/content/types'
import { ch02Lesson } from './lesson'
import { ch02Quiz } from './quiz'
import { ch02References } from './references'

export const ch02CachingStrategies: Chapter = {
  id: 'ch-02-caching-strategies',
  slug: 'ch-02-caching-strategies',
  order: 2,
  title: 'Caching Strategies',
  summary:
    'Mempelajari pola caching dari in-memory cache, cache-aside, write-through, write-behind, invalidasi, stampede prevention, hingga CDN caching untuk performa dan skalabilitas.',
  estimatedMinutes: 50,
  learningObjectives: [
    'Menjelaskan cache hit, cache miss, TTL, dan eviction policy.',
    'Menerapkan pola cache-aside, write-through, dan write-behind.',
    'Mengatasi cache stampede dan thundering herd.',
    'Memahami trade-off konsistensi cache dengan database.',
    'Menggunakan Redis dan CDN sebagai lapisan cache.',
  ],
  summaryPoints: [
    'Cache menyimpan salinan data yang sering diakses untuk mengurangi beban downstream dan latency.',
    'Cache-aside membiarkan aplikasi mengelola cache; write-through menulis ke cache dan database bersamaan.',
    'TTL membatasi usia data; eviction policy seperti LRU memutuskan data mana yang dibuang saat cache penuh.',
    'Cache stampede terjadi ketika banyak request bersamaan melewati cache yang baru expired.',
    'CDN men-cache asset statis di edge location dekat pengguna.',
  ],
  references: ch02References,
  lesson: ch02Lesson,
  quiz: ch02Quiz,
}
