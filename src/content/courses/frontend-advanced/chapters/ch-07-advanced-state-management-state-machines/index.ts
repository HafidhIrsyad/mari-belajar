import type { Chapter } from '@/content/types'
import { ch07Lesson } from './lesson'
import { ch07Quiz } from './quiz'
import { ch07References } from './references'

export const ch07AdvancedStateManagementStateMachines: Chapter = {
  id: 'ch-07-advanced-state-management-state-machines',
  slug: 'ch-07-advanced-state-management-state-machines',
  order: 7,
  title: 'Advanced State Management & State Machines',
  summary:
    'Mendalami state management frontend melalui normalization, optimistic updates, selectors, persistence, state machines dan statecharts, undo/redo architecture, serta sinkronisasi lintas tab dan worker.',
  estimatedMinutes: 50,
  learningObjectives: [
    'Menormalisasi state untuk menghindari duplikasi dan inconsistency.',
    'Mengimplementasikan optimistic updates dengan rollback.',
    'Membuat selectors dan memoization untuk performa.',
    'Memodelkan UI flow dengan state machines dan statecharts.',
    'Merancang undo/redo architecture dan sinkronisasi lintas tab.',
  ],
  summaryPoints: [
    'State normalization menyimpan data sebagai map berdasarkan ID, bukan nested arrays.',
    'Optimistic updates meningkatkan perceived performance tetapi memerlukan strategi rollback.',
    'Selectors memoized mencegah re-render yang tidak perlu.',
    'State machines membuat state transitions eksplisit dan mudah diuji.',
    'Undo/redo dapat diimplementasikan dengan command pattern atau state snapshot.',
  ],
  references: ch07References,
  lesson: ch07Lesson,
  quiz: ch07Quiz,
}
