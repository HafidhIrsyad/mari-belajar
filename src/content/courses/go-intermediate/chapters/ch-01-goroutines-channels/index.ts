import type { Chapter } from '@/content/types'
import { ch01Lesson } from './lesson'
import { ch01Quiz } from './quiz'
import { ch01References } from './references'

export const ch01GoroutinesChannels: Chapter = {
  id: 'ch-01-goroutines-channels',
  slug: 'ch-01-goroutines-channels',
  order: 1,
  title: 'Goroutines & Channels',
  summary:
    'Memahami concurrency di Go melalui goroutine dan channel: dari cara membuat goroutine, mengirim dan menerima data lewat channel, hingga pola fan-out/fan-in dan internals scheduler Go.',
  estimatedMinutes: 45,
  learningObjectives: [
    'Menjelaskan perbedaan goroutine dengan thread OS dan mengapa goroutine ringan.',
    'Membuat dan menjalankan goroutine dengan kata kunci go.',
    'Menggunakan channel untuk komunikasi antar goroutine.',
    'Membedakan buffered channel dan unbuffered channel serta perilaku blocking-nya.',
    'Menerapkan select untuk multiplexing channel.',
    'Memahami konsep dasar Go scheduler (GMP) dan struktur hchannel.',
  ],
  summaryPoints: [
    'Goroutine adalah fungsi yang berjalan secara konkuren, dikelola oleh Go runtime, bukan thread OS langsung.',
    'Channel adalah mekanisme komunikasi antar goroutine dengan operator <- untuk kirim dan terima.',
    'Unbuffered channel membutuhkan pengirim dan penerima siap bersamaan; buffered channel memungkinkan pengiriman tanpa penerima langsung hingga buffer penuh.',
    'select memilih salah satu operasi channel yang siap, mirip switch untuk channel.',
    'Go scheduler memetakan goroutine (G) ke thread OS (M) melalui logical processor (P) menggunakan model GMP.',
    'Channel diimplementasikan sebagai hchannel dengan circular queue dan queue goroutine untuk sender/receiver.',
  ],
  references: ch01References,
  lesson: ch01Lesson,
  quiz: ch01Quiz,
}
