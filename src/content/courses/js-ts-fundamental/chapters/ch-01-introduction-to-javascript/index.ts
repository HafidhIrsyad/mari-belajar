import type { Chapter } from '@/content/types'
import { ch01Lesson } from './lesson'
import { ch01Quiz } from './quiz'
import { ch01References } from './references'

export const ch01IntroductionToJavascript: Chapter = {
  id: 'ch-01-introduction-to-javascript',
  slug: 'ch-01-introduction-to-javascript',
  order: 1,
  title: 'Pengenalan JavaScript dan Lingkungan Development',
  summary:
    'Mengenal JavaScript sebagai bahasa pemrograman, cara menjalankannya di browser dan Node.js, serta memahami ekosistem dasar seperti engine, runtime, dan package manager.',
  estimatedMinutes: 15,
  learningObjectives: [
    'Menjelaskan apa itu JavaScript dan alasan mempelajarinya.',
    'Menjalankan kode JavaScript melalui browser console, Node.js, dan file .js.',
    'Membedakan statement, expression, dan komentar dalam kode JavaScript.',
    'Menggunakan console.log, console.error, dan strict mode untuk debugging dasar.',
    'Memahami perbedaan antara engine, runtime, dan package manager di ekosistem JavaScript.',
    'Membandingkan cara kerja JavaScript di browser dengan Node.js.',
  ],
  summaryPoints: [
    'JavaScript adalah bahasa pemrograman yang berjalan di browser, server, dan banyak perangkat lain.',
    'Kode JavaScript bisa dijalankan melalui browser console, file .js, atau Node.js.',
    'Statement adalah instruksi lengkap, sedangkan expression menghasilkan nilai.',
    'console.log dan console.error membantu menampilkan informasi dan kesalahan saat development.',
    'Strict mode mencegah perilaku lama JavaScript dan meningkatkan keamanan kode.',
    'Ekosistem JavaScript terdiri dari engine, runtime, dan package manager yang saling berkaitan.',
    'JavaScript di browser fokus pada DOM dan event, sedangkan Node.js fokus pada file system dan server.',
  ],
  references: ch01References,
  lesson: ch01Lesson,
  quiz: ch01Quiz,
}
