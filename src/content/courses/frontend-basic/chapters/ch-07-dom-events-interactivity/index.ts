import type { Chapter } from '@/content/types'
import { ch07Lesson } from './lesson'
import { ch07Quiz } from './quiz'
import { ch07References } from './references'

export const ch07DomEventsInteractivity: Chapter = {
  id: 'ch-07-dom-events-interactivity',
  slug: 'ch-07-dom-events-interactivity',
  order: 7,
  title: 'DOM Events & Interactivity',
  summary:
    'Mengenal event listener, event object, event delegation, passive listeners, custom events, dan interaksi yang ramah aksesibilitas.',
  estimatedMinutes: 22,
  learningObjectives: [
    'Menambahkan dan menghapus event listener pada elemen DOM.',
    'Memahami event object dan properti penting seperti target, currentTarget, dan preventDefault.',
    'Menerapkan event delegation untuk menangani banyak elemen dinamis.',
    'Menggunakan passive listeners dan custom events dengan tepat.',
    'Merancang interaksi yang menghormati preferensi reduced motion dan navigasi keyboard.',
  ],
  summaryPoints: [
    'Event listener menghubungkan aksi pengguna dengan kode JavaScript.',
    'Event object membawa informasi tentang event dan elemen yang memicunya.',
    'Event delegation mengurangi jumlah listener dengan memanfaatkan bubbling.',
    'Passive listeners meningkatkan performa scroll dengan memberi tahu browser bahwa kita tidak akan memanggil preventDefault.',
    'Custom events memungkinkan komponen berkomunikasi secara longgar.',
  ],
  references: ch07References,
  lesson: ch07Lesson,
  quiz: ch07Quiz,
}
