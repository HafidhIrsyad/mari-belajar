import type { Chapter } from '@/content/types'
import { ch01Lesson } from './lesson'
import { ch01Quiz } from './quiz'
import { ch01References } from './references'

export const ch01GitWorkflow: Chapter = {
  id: 'ch-01-git-workflow',
  slug: 'ch-01-git-workflow',
  order: 1,
  title: 'Git Workflow',
  summary:
    'Memahami alur kerja Git dari tingkat penggunaan sehari-hari hingga internalitas object database, branching strategy, merge/rebase, dan strategi kolaborasi tim.',
  estimatedMinutes: 40,
  learningObjectives: [
    'Menjelaskan tiga area kerja Git: working directory, staging area (index), dan repository.',
    'Membedakan perintah dasar Git dan kapan menggunakannya.',
    'Merancang branching model yang sesuai untuk kolaborasi tim.',
    'Memahami perbedaan merge, rebase, fast-forward, dan interactive rebase.',
    'Menjelaskan internalitas Git: blob, tree, commit object, ref, dan packfile.',
  ],
  summaryPoints: [
    'Git menyimpan snapshot perubahan sebagai directed acyclic graph (DAG) dari commit object.',
    'Working directory, staging area, dan repository adalah tiga area utama dalam siklus commit.',
    'Branch di Git hanyalah pointer bergerak ke commit; HEAD menunjukkan posisi aktif.',
    'Merge menggabungkan history; rebase menulis ulang history agar terlihat linear.',
    'Git menggunakan content-addressable storage berbasis SHA-1 untuk setiap object.',
  ],
  references: ch01References,
  lesson: ch01Lesson,
  quiz: ch01Quiz,
}
