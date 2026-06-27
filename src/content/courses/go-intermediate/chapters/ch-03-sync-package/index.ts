import type { Chapter } from '@/content/types'
import { ch03Lesson } from './lesson'
import { ch03Quiz } from './quiz'
import { ch03References } from './references'

export const ch03SyncPackage: Chapter = {
  id: 'ch-03-sync-package',
  slug: 'ch-03-sync-package',
  order: 3,
  title: 'sync Package',
  summary:
    'Mengendalikan akses memori bersama dan koordinasi goroutine melalui WaitGroup, Mutex, RWMutex, Once, Map, Pool, serta atomic operations dan errgroup.',
  estimatedMinutes: 40,
  learningObjectives: [
    'Menggunakan sync.WaitGroup untuk menunggu goroutine selesai.',
    'Melindungi data bersama dengan sync.Mutex dan sync.RWMutex.',
    'Menerapkan sync.Once untuk inisialisasi satu kali.',
    'Memahami kapan menggunakan sync.Map dan sync.Pool.',
    'Menggunakan atomic untuk counter sederhana tanpa lock.',
    'Menghindari deadlock melalui lock ordering dan menyusun kode yang bebas race.',
  ],
  summaryPoints: [
    'sync.WaitGroup menunggu kumpulan goroutine menyelesaikan pekerjaannya.',
    'sync.Mutex memberikan eksklusi saling mengunci untuk akses memori bersama.',
    'sync.RWMutex memungkinkan banyak reader atau satu writer.',
    'sync.Once menjamin blok kode dijalankan tepat satu kali.',
    'sync.Map adalah map konkuren yang aman tanpa lock eksternal, cocok untuk kasus tertentu.',
    'sync.Pool digunakan untuk mengelola pool object yang dapat digunakan kembali, mengurangi alokasi.',
    'Atomic operations cepat untuk counter dan flag sederhana tanpa lock penuh.',
  ],
  references: ch03References,
  lesson: ch03Lesson,
  quiz: ch03Quiz,
}
