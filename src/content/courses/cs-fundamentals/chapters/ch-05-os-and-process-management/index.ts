import type { Chapter } from '@/content/types'
import { ch05Lesson } from './lesson'
import { ch05Quiz } from './quiz'
import { ch05References } from './references'

export const ch05OsAndProcessManagement: Chapter = {
  id: 'ch-05-os-and-process-management',
  slug: 'ch-05-os-and-process-management',
  order: 5,
  title: 'Sistem Operasi dan Manajemen Proses',
  summary:
    'Mempelajari peran sistem operasi sebagai abstraksi dan pengelola sumber daya, perbedaan program dan proses, lifecycle proses, thread, scheduling sederhana, serta pengantar concurrency dan parallelism.',
  estimatedMinutes: 16,
  learningObjectives: [
    'Menjelaskan peran sistem operasi: abstraksi, pengelolaan sumber daya, dan isolasi.',
    'Memahami perbedaan program, proses, dan thread serta konsep Process ID (PID).',
    'Menjelaskan lifecycle proses: new, ready, running, waiting, dan terminated.',
    'Mengenal konsep scheduling sederhana seperti FIFO dan Round Robin.',
    'Memahami perbedaan concurrency dan parallelism serta pengantar komunikasi antar proses.',
  ],
  summaryPoints: [
    'Sistem operasi menyembunyikan kerumitan perangkat keras melalui abstraksi dan mengelola sumber daya secara adil.',
    'Program adalah file statis; proses adalah program yang sedang dieksekusi dengan state dan PID.',
    'Thread adalah unit eksekusi dalam proses; proses menyediakan isolasi, thread berbagi memori.',
    'Lifecycle proses bergerak dari new ke ready, running, waiting, dan akhirnya terminated.',
    'Scheduling FIFO melayani proses sesuai urutan kedatangan, Round Robin memberi setiap proses giliran berbatas waktu.',
    'Concurrency adalah banyak tugas yang sedang berlangsung; parallelism adalah banyak tugas yang benar-benar berjalan bersamaan.',
  ],
  references: ch05References,
  lesson: ch05Lesson,
  quiz: ch05Quiz,
}
