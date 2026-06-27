import type { Chapter } from '@/content/types'
import { ch02Lesson } from './lesson'
import { ch02Quiz } from './quiz'
import { ch02References } from './references'

export const ch02DesignPatternsJsTs: Chapter = {
  id: 'ch-02-design-patterns-js-ts',
  slug: 'ch-02-design-patterns-js-ts',
  order: 2,
  title: 'Design Patterns in JS/TS',
  summary:
    'Mempelajari pola desain klasik dan modern dalam JavaScript/TypeScript: creational, structural, behavioral, hingga dependency injection, circuit breaker, dan ports & adapters.',
  estimatedMinutes: 45,
  learningObjectives: [
    'Menerapkan Singleton, Factory, Observer, dan Strategy dalam JS/TS.',
    'Memahami kegunaan Module, Decorator, Proxy, dan Mediator.',
    'Merancang Dependency Injection container sederhana yang type-safe.',
    'Mengimplementasikan Circuit Breaker untuk meningkatkan resiliensi.',
    'Mengenal Ports & Adapters dan Event Sourcing sebagai pola arsitektural.',
  ],
  summaryPoints: [
    'Design patterns adalah solusi teruji untuk masalah desain yang sering muncul.',
    'Singleton memastikan hanya satu instance; Factory memisahkan pembuatan objek dari penggunaannya.',
    'Observer memungkinkan komunikasi one-to-many lewat subscription.',
    'Dependency Injection membuat kode lebih mudah diuji karena dependensi disuntikkan, bukan dibuat di dalam modul.',
    'Circuit Breaker mencegah cascading failure dengan membuka sirkuit saat error rate tinggi.',
  ],
  references: ch02References,
  lesson: ch02Lesson,
  quiz: ch02Quiz,
}
