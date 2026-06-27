import type { Quiz } from '@/content/types'

export const ch06Quiz: Quiz = {
  id: 'quiz-ch-06-accessibility-dasar',
  title: 'Quiz: Accessibility Dasar',
  passingScore: 8,
  questions: [
    {
      id: 'q-06-01',
      order: 1,
      prompt: 'Apa singkatan dari empat prinsip WCAG?',
      options: ['POUR', 'SOLID', 'DRY', 'KISS'],
      correctOptionIndex: 0,
      explanation:
        'POUR adalah singkatan dari Perceivable, Operable, Understandable, dan Robust.',
    },
    {
      id: 'q-06-02',
      order: 2,
      prompt: 'Alt text pada gambar dekoratif sebaiknya?',
      options: [
        'Berisi deskripsi detail gambar',
        'Kosong, yaitu alt=""',
        'Berisi kata "gambar"',
        'Dihapus sama sekali',
      ],
      correctOptionIndex: 1,
      explanation:
        'Gambar dekoratif sebaiknya menggunakan alt="" agar screen reader melewatinya dan tidak mengganggu pengguna.',
    },
    {
      id: 'q-06-03',
      order: 3,
      prompt: 'Atribut ARIA apa yang menghubungkan input dengan pesan error?',
      options: ['aria-label', 'aria-describedby', 'aria-hidden', 'aria-expanded'],
      correctOptionIndex: 1,
      explanation:
        'aria-describedby menghubungkan elemen dengan deskripsi tambahan, seperti petunjuk atau pesan error.',
    },
    {
      id: 'q-06-04',
      order: 4,
      prompt: 'Rasio kontras minimum untuk teks normal menurut WCAG AA adalah?',
      options: ['2:1', '3:1', '4.5:1', '7:1'],
      correctOptionIndex: 2,
      explanation:
        'WCAG AA mensyaratkan rasio kontras minimum 4.5:1 untuk teks normal.',
    },
    {
      id: 'q-06-05',
      order: 5,
      prompt: 'Tujuan utama focus trap pada modal adalah?',
      options: [
        'Mencegah modal ditutup secara tidak sengaja',
        'Memastikan fokus keyboard tetap di dalam modal sampai pengguna menutupnya',
        'Menonaktifkan tombol Escape',
        'Memindahkan fokus ke footer halaman',
      ],
      correctOptionIndex: 1,
      explanation:
        'Focus trap menjaga agar keyboard tidak keluar dari modal, sehingga pengguna screen reader tidak kehilangan konteks.',
    },
    {
      id: 'q-06-06',
      order: 6,
      prompt: 'Kapan sebaiknya kita menggunakan ARIA?',
      options: [
        'Untuk setiap elemen HTML agar lebih modern',
        'Hanya ketika HTML semantik tidak dapat menyampaikan makna yang dibutuhkan',
        'Untuk menggantikan CSS sepenuhnya',
        'Untuk menyembunyikan semua elemen dari screen reader',
      ],
      correctOptionIndex: 1,
      explanation:
        'Prinsipnya adalah jangan gunakan ARIA jika HTML semantik sudah cukup. ARIA digunakan untuk kasus di mana HTML tidak memiliki elemen yang sesuai.',
    },
    {
      id: 'q-06-07',
      order: 7,
      prompt: 'Media query apa yang menghormati preferensi pengguna untuk mengurangi animasi?',
      options: [
        '@media (prefers-color-scheme: dark)',
        '@media (prefers-reduced-motion: reduce)',
        '@media (min-width: 768px)',
        '@media (orientation: portrait)',
      ],
      correctOptionIndex: 1,
      explanation:
        'prefers-reduced-motion: reduce memungkinkan kita menonaktifkan atau mengurangi animasi bagi pengguna yang membutuhkannya.',
    },
    {
      id: 'q-06-08',
      order: 8,
      prompt: 'Manakah alat audit aksesibilitas yang tersedia di Chrome DevTools?',
      options: ['Lighthouse', 'Jest', 'Webpack', 'Prettier'],
      correctOptionIndex: 0,
      explanation:
        'Lighthouse menyediakan audit aksesibilitas di Chrome DevTools, meskipun hasilnya perlu dilengkapi dengan pengujian manual.',
    },
  ],
}
