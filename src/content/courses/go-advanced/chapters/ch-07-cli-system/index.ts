import type { Chapter } from '@/content/types'
import { ch07Lesson } from './lesson'
import { ch07Quiz } from './quiz'
import { ch07References } from './references'

export const ch07CliSystem: Chapter = {
  id: 'ch-07-cli-system',
  slug: 'ch-07-cli-system',
  order: 7,
  title: 'CLI & System Programming',
  summary:
    'Membangun CLI dengan flag, cobra, environment variables, signal handling, graceful shutdown, dan file watcher di Go.',
  estimatedMinutes: 40,
  learningObjectives: [
    'Membuat CLI dengan package flag dan cobra.',
    'Mengelola konfigurasi melalui environment variables.',
    'Menangani sinyal OS untuk graceful shutdown.',
    'Membangun file watcher sederhana.',
    'Memahami prinsip 12-factor config untuk aplikasi CLI dan server.',
  ],
  summaryPoints: [
    'Package flag menyediakan parsing argumen CLI dasar.',
    'Cobra menawarkan subcommand, flag persisten, dan generated help.',
    'Konfigurasi sebaiknya diambil dari environment variables (12-factor).',
    'Signal handling memungkinkan graceful shutdown saat menerima SIGINT/SIGTERM.',
    'File watcher bisa dibangun dengan fsnotify untuk reload konfigurasi.',
    'Graceful shutdown menunggu request aktif selesai sebelum keluar.',
  ],
  references: ch07References,
  lesson: ch07Lesson,
  quiz: ch07Quiz,
}
