import type { Quiz } from '@/content/types'

export const ch05Quiz: Quiz = {
  id: 'quiz-ch-05-css-styling-strategy',
  title: 'Quiz: CSS Styling Strategy',
  passingScore: 8,
  questions: [
    {
      id: 'q-05-01',
      order: 1,
      prompt: 'Dalam specificity, manakah yang paling spesifik?',
      options: ['Class selector', 'ID selector', 'Element selector', 'Universal selector'],
      correctOptionIndex: 1,
      explanation:
        'ID selector memiliki specificity 0-1-0, lebih tinggi dari class (0-0-1) dan element (0-0-0-1).',
    },
    {
      id: 'q-05-02',
      order: 2,
      prompt: 'Apa fungsi custom properties (CSS variables)?',
      options: [
        'Menambahkan animasi otomatis',
        'Menyimpan nilai yang dapat digunakan ulang dan diubah secara dinamis',
        'Mengubah urutan cascade',
        'Menghapus specificity selector',
      ],
      correctOptionIndex: 1,
      explanation:
        'Custom properties seperti --color-primary menyimpan nilai yang bisa digunakan di banyak selector dan diubah lewat JavaScript atau media query.',
    },
    {
      id: 'q-05-03',
      order: 3,
      prompt: 'Dalam BEM, .button__icon mewakili?',
      options: ['Block', 'Element', 'Modifier', 'Pseudo-class'],
      correctOptionIndex: 1,
      explanation:
        'Dua garis bawah memisahkan block dan element, sehingga .button__icon adalah element dari block button.',
    },
    {
      id: 'q-05-04',
      order: 4,
      prompt: 'Manakah keuntungan utama CSS Modules?',
      options: [
        'Class menjadi lokal per file sehingga tidak konflik antar komponen',
        'Semua style dihapus saat production build',
        'Tidak memerlukan bundler',
        'Otomatis menambahkan animasi ke semua elemen',
      ],
      correctOptionIndex: 0,
      explanation:
        'CSS Modules mengubah nama class menjadi unik per file, mencegah kebocoran styling antar komponen.',
    },
    {
      id: 'q-05-05',
      order: 5,
      prompt: 'Contoh paling populer dari utility-first CSS adalah?',
      options: ['Bootstrap', 'Tailwind CSS', 'Bulma', 'Semantic UI'],
      correctOptionIndex: 1,
      explanation:
        'Tailwind CSS adalah framework utility-first yang menyediakan class kecil untuk satu properti CSS.',
    },
    {
      id: 'q-05-06',
      order: 6,
      prompt: 'Media query apa yang digunakan untuk mengikuti preferensi dark mode sistem?',
      options: [
        '@media (prefers-reduced-motion)',
        '@media (prefers-color-scheme: dark)',
        '@media (min-width: 768px)',
        '@media (orientation: landscape)',
      ],
      correctOptionIndex: 1,
      explanation:
        'prefers-color-scheme: dark memungkinkan CSS menyesuaikan tema berdasarkan pengaturan sistem operasi pengguna.',
    },
    {
      id: 'q-05-07',
      order: 7,
      prompt: 'Apa itu design tokens?',
      options: [
        'Class CSS yang sangat spesifik',
        'Variabel desain terkecil yang menjadi sumber kebenaran tunggal antar platform',
        'Alat untuk menghapus unused CSS',
        'Library animasi CSS',
      ],
      correctOptionIndex: 1,
      explanation:
        'Design tokens merepresentasikan warna, spacing, tipografi, dan nilai desain lain yang dapat dibagikan ke berbagai platform.',
    },
    {
      id: 'q-05-08',
      order: 8,
      prompt: 'Praktik terbaik untuk menghindari specificity war adalah?',
      options: [
        'Selalu gunakan !important',
        'Gunakan selector ID sebanyak mungkin',
        'Hindari !important dan pertahankan selector serendah mungkin',
        'Timpa style dengan inline style di setiap elemen',
      ],
      correctOptionIndex: 2,
      explanation:
        '!important dan selector ID meningkatkan specificity secara drastis. Sebaiknya gunakan metodologi konsisten dan selector yang tidak terlalu spesifik.',
    },
  ],
}
