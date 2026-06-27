import type { Chapter } from '@/content/types'
import { ch05Lesson } from './lesson'
import { ch05Quiz } from './quiz'
import { ch05References } from './references'

export const ch05DataFetchingServerState: Chapter = {
  id: 'ch-05-data-fetching-server-state',
  slug: 'ch-05-data-fetching-server-state',
  order: 5,
  title: 'Data Fetching & Server State',
  summary:
    'Memahami pola fetching dengan useEffect, memanfaatkan TanStack Query untuk cache, background refetch, mutation, optimistic update, dan prinsip server state.',
  estimatedMinutes: 45,
  learningObjectives: [
    'Mengambil data dengan fetch di useEffect secara benar dan aman race condition.',
    'Membedakan client state dan server state.',
    'Menggunakan TanStack Query untuk query dan mutation.',
    'Merancang cache key yang efektif.',
    'Memahami mekanisme cache dan garbage collection di TanStack Query.',
  ],
  summaryPoints: [
    'Server state berasal dari backend dan memerlukan caching, invalidasi, dan sinkronisasi.',
    'useEffect dengan fetch harus menangani cleanup, error, dan race condition.',
    'TanStack Query mengelola cache berdasarkan query key.',
    'Mutation diikuti invalidate atau setQueryData untuk memperbarui cache.',
    'Optimistic update memperbarui UI sebelum server merespons.',
  ],
  references: ch05References,
  lesson: ch05Lesson,
  quiz: ch05Quiz,
}
