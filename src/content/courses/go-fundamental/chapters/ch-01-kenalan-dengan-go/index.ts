import type { Chapter } from '@/content/types'
import { ch01Lesson } from './lesson'
import { ch01Quiz } from './quiz'
import { ch01References } from './references'

export const ch01KenalanDenganGo: Chapter = {
  id: 'ch-01-kenalan-dengan-go',
  slug: 'ch-01-kenalan-dengan-go',
  order: 1,
  title: 'Kenalan dengan Go',
  summary:
    'Mengenal Go sebagai bahasa sistem modern, sejarahnya, filosofi simplicity, cara instalasi, struktur program, serta perbedaan Go dengan JavaScript/TypeScript dari sudut pandang runtime dan kompilasi.',
  estimatedMinutes: 20,
  learningObjectives: [
    'Menjelaskan sejarah dan filosofi desain Go.',
    'Memasang Go toolchain dan menjalankan program pertama.',
    'Memahami struktur dasar file Go: package, import, dan func main.',
    'Membedakan kompilasi statis Go dengan interpretasi/JIT di JavaScript.',
    'Mengenal go.mod sebagai manifest module Go.',
    'Memahami peran garbage collector dan scheduler Go secara garis besar.',
  ],
  summaryPoints: [
    'Go dibuat di Google oleh Robert Griesemer, Rob Pike, dan Ken Thompson dengan fokus simplicity, concurrency, dan performa kompilasi.',
    'Program Go dikompilasi menjadi binary native statis yang cepat dan ringan.',
    'Setiap program Go dimulai dari package main dengan fungsi main.',
    'go.mod mendeklarasikan nama module dan versi Go minimum.',
    'Garbage collector Go bersifat concurrent dan non-generational.',
    'Go scheduler (M:N) memetakan goroutine ke thread OS secara efisien.',
    'Go tidak memiliki class, inheritance, maupun exception seperti JavaScript/TypeScript.',
  ],
  references: ch01References,
  lesson: ch01Lesson,
  quiz: ch01Quiz,
}
