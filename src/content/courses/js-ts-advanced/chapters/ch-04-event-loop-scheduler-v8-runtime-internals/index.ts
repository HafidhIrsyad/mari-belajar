import type { Chapter } from '@/content/types'
import { ch04Lesson } from './lesson'
import { ch04Quiz } from './quiz'
import { ch04References } from './references'

export const ch04EventLoopSchedulerV8RuntimeInternals: Chapter = {
  id: 'ch-04-event-loop-scheduler-v8-runtime-internals',
  slug: 'ch-04-event-loop-scheduler-v8-runtime-internals',
  order: 4,
  title: 'Event Loop, Scheduler & V8 Runtime Internals',
  summary:
    'Deep dive ke arsitektur V8, hidden classes, inline caches, optimasi/deoptimasi TurboFan, serta event loop dan scheduling di browser dan Node.js.',
  estimatedMinutes: 50,
  learningObjectives: [
    'Memahami pipeline V8 dari AST, bytecode Ignition, hingga machine code TurboFan.',
    'Menjelaskan konsep hidden classes, shape transitions, dan inline caches.',
    'Membedakan fast mode, dictionary mode, Smi, dan heap numbers.',
    'Menganalisis event loop phases di libuv dan perbedaan browser vs Node.js.',
    'Menggunakan queueMicrotask, process.nextTick, dan scheduler API dengan tepat.',
  ],
  summaryPoints: [
    'V8 memulai dengan parsing ke AST, lalu bytecode Ignition, dan akhirnya machine code TurboFan.',
    'Hidden classes membuat property access cepat selama shape objek stabil.',
    'Inline caches mempercepat property access berdasarkan shape yang sering ditemui.',
    'Event loop Node.js memiliki phases: timers, pending callbacks, idle/prepare, poll, check, close callbacks.',
    '`process.nextTick` dan `queueMicrotask` berjalan sebelum fase event loop berikutnya.',
  ],
  references: ch04References,
  lesson: ch04Lesson,
  quiz: ch04Quiz,
}
