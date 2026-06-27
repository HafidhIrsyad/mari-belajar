import type { Chapter } from '@/content/types'
import { ch06Lesson } from './lesson'
import { ch06Quiz } from './quiz'
import { ch06References } from './references'

export const ch06MemoryModelGarbageCollectionJs: Chapter = {
  id: 'ch-06-memory-model-garbage-collection-js',
  slug: 'ch-06-memory-model-garbage-collection-js',
  order: 6,
  title: 'Memory Model & Garbage Collection in JavaScript',
  summary:
    'Memahami stack vs heap, representasi objek di V8, generational garbage collection, Orinoco, WeakMap/WeakRef/FinalizationRegistry, serta teknik analisis memory leak.',
  estimatedMinutes: 45,
  learningObjectives: [
    'Membedakan stack, heap, value types, dan reference types di JavaScript.',
    'Menjelaskan layout objek di V8 dan perbedaan fast mode dengan dictionary mode.',
    'Memahami generational GC: New Space, Old Space, Scavenge, Mark-and-Sweep, dan Orinoco.',
    'Menggunakan WeakMap, WeakSet, WeakRef, dan FinalizationRegistry dengan tepat.',
    'Mendiagnosis memory leak dengan heap snapshot dan DevTools memory profiler.',
  ],
  summaryPoints: [
    'Primitive disimpan di stack atau inline; objek disimpan di heap dengan referensi.',
    'V8 menggunakan hidden class untuk layout objek yang stabil dan dictionary mode untuk objek dinamis.',
    'Generational GC memisahkan objek muda (New Space) dan tua (Old Space) untuk optimasi koleksi.',
    'WeakMap/WeakSet tidak mencegah GC key-nya, cocok untuk cache atau metadata.',
    'Memory leak umum: closure cycles, detached DOM, timers/listeners yang tidak dibersihkan, global cache.',
  ],
  references: ch06References,
  lesson: ch06Lesson,
  quiz: ch06Quiz,
}
