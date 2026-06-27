import type { Chapter } from '@/content/types'
import { ch03Lesson } from './lesson'
import { ch03Quiz } from './quiz'
import { ch03References } from './references'

export const ch03ResponsiveDesign: Chapter = {
  id: 'ch-03-responsive-design',
  slug: 'ch-03-responsive-design',
  order: 3,
  title: 'Responsive Design',
  summary:
    'Merancang halaman yang nyata di berbagai ukuran layar menggunakan viewport, media queries, fluid typography, responsive images, dan container queries.',
  estimatedMinutes: 22,
  learningObjectives: [
    'Menggunakan viewport meta tag dan media queries secara efektif.',
    'Memilih strategi mobile-first versus desktop-first.',
    'Menerapkan fluid typography dengan clamp() dan unit relatif.',
    'Menyajikan gambar responsif melalui srcset, sizes, dan picture.',
    'Memahami kapan menggunakan media queries versus container queries.',
  ],
  summaryPoints: [
    'Viewport meta tag mengontrol lebar dan zoom halaman di perangkat mobile.',
    'Mobile-first menulis style dasar untuk layar kecil lalu menambahkan breakpoint ke atas.',
    'clamp() membatasi ukuran antara nilai minimum, preferensi, dan maksimum.',
    'Responsive images mengurangi unduhan data dengan menyediakan sumber gambar sesuai ukuran layar.',
    'Container queries membuat komponen responsif terhadap ruangnya sendiri.',
  ],
  references: ch03References,
  lesson: ch03Lesson,
  quiz: ch03Quiz,
}
