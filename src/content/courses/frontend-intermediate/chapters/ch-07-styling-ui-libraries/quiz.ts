import type { Quiz } from '@/content/types'

export const ch07Quiz: Quiz = {
  id: 'quiz-ch-07-styling-ui-libraries',
  title: 'Quiz: Styling & UI Libraries',
  passingScore: 8,
  questions: [
    {
      id: 'q-07-01',
      order: 1,
      prompt: 'Apa keuntungan utama CSS Modules?',
      options: [
        'Style bersifat global secara default',
        'Class name bersifat lokal per file sehingga menghindari konflik',
        'Tidak memerlukan file CSS terpisah',
        'Otomatis menghasilkan animasi',
      ],
      correctOptionIndex: 1,
      explanation:
        'CSS Modules mengubah class name menjadi unik berdasarkan file, sehingga mencegah tabrakan nama class antar komponen.',
    },
    {
      id: 'q-07-02',
      order: 2,
      prompt: 'Apa kelemahan umum CSS-in-JS?',
      options: [
        'Tidak mendukung pseudo-class',
        'Runtime overhead dan bundle size yang lebih besar',
        'Tidak bisa digunakan di React',
        'Harus menulis CSS dalam file terpisah',
      ],
      correctOptionIndex: 1,
      explanation:
        'CSS-in-JS sering memerlukan runtime untuk menghasilkan class name, yang dapat menambah bundle size dan memperlambat render.',
    },
    {
      id: 'q-07-03',
      order: 3,
      prompt: 'Apa yang dimaksud dengan utility-first CSS seperti Tailwind?',
      options: [
        'Setiap komponen memiliki satu class khusus',
        'Menggunakan class utilitas kecil yang dapat dikombinasikan langsung di markup',
        'Menulis CSS custom untuk setiap elemen',
        'Menggunakan inline style saja',
      ],
      correctOptionIndex: 1,
      explanation:
        'Utility-first CSS menyediakan class kecil seperti flex, p-4, dan bg-blue-500 yang digabungkan untuk membangun tampilan.',
    },
    {
      id: 'q-07-04',
      order: 4,
      prompt: 'Apa fungsi design tokens?',
      options: [
        'Menyimpan data form',
        'Menyediakan nilai desain konsisten seperti warna, spacing, dan radius',
        'Mengelola routing aplikasi',
        'Menggantikan komponen React',
      ],
      correctOptionIndex: 1,
      explanation:
        'Design tokens adalah variabel desain yang digunakan secara konsisten untuk menjaga keseragaman visual di seluruh aplikasi.',
    },
    {
      id: 'q-07-05',
      order: 5,
      prompt: 'Apa karakteristik headless UI?',
      options: [
        'Menyediakan styling bawaan yang tidak dapat diubah',
        'Menyediakan logika interaksi tanpa styling visual',
        'Hanya berisi komponen layout',
        'Tidak mendukung aksesibilitas',
      ],
      correctOptionIndex: 1,
      explanation:
        'Headless UI menangani perilaku dan aksesibilitas komponen, sementara tampilan visual sepenuhnya dikontrol developer.',
    },
    {
      id: 'q-07-06',
      order: 6,
      prompt: 'Library apakah yang menjadi fondasi interaksi untuk shadcn/ui?',
      options: ['Bootstrap', 'Radix Primitives', 'Material UI', 'Chakra UI'],
      correctOptionIndex: 1,
      explanation:
        'shadcn/ui menggunakan Radix Primitives untuk logika interaksi dan aksesibilitas, serta Tailwind CSS untuk styling.',
    },
    {
      id: 'q-07-07',
      order: 7,
      prompt: 'Apa keuntungan menggunakan class-variance-authority (CVA)?',
      options: [
        'Otomatis menghasilkan CSS Modules',
        'Mengelola kombinasi variant komponen secara terstruktur dengan tipe TypeScript',
        'Menghilangkan kebutuhan Tailwind',
        'Menggantikan React props',
      ],
      correctOptionIndex: 1,
      explanation:
        'CVA membantu mendefinisikan variant, default variant, dan compound variant secara terstruktur dengan tipe yang otomatis terinfer.',
    },
    {
      id: 'q-07-08',
      order: 8,
      prompt: 'Mengapa shadcn/ui dianggap unik dibanding library UI komponen pada umumnya?',
      options: [
        'Komponen di-install melalui npm dan tidak bisa dimodifikasi',
        'Kode komponen disalin langsung ke proyek sehingga sepenuhnya dimiliki developer',
        'Hanya mendukung dark mode',
        'Tidak menggunakan Tailwind',
      ],
      correctOptionIndex: 1,
      explanation:
        'shadcn/ui menyalin kode komponen ke codebase proyek, sehingga developer dapat mengubah dan menyesuaikannya tanpa ketergantungan pada package eksternal.',
    },
  ],
}
