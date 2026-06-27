import type { Quiz } from '@/content/types'

export const ch08Quiz: Quiz = {
  id: 'quiz-ch-08-frontend-workflow-tooling',
  title: 'Quiz: Frontend Workflow & Tooling',
  passingScore: 8,
  questions: [
    {
      id: 'q-08-01',
      order: 1,
      prompt: 'Apa peran utama ESLint dalam proyek frontend?',
      options: [
        'Memformat kode secara otomatis',
        'Menganalisis kode untuk menemukan potensi bug dan pelanggaran aturan',
        'Mengompilasi TypeScript ke JavaScript',
        'Mengoptimalkan gambar',
      ],
      correctOptionIndex: 1,
      explanation:
        'ESLint adalah linter yang memeriksa kode untuk menemukan masalah kualitas, potensi bug, dan pelanggaran konvensi.',
    },
    {
      id: 'q-08-02',
      order: 2,
      prompt: 'Tool mana yang paling umum digunakan untuk memformat kode secara konsisten?',
      options: ['ESLint', 'Prettier', 'Webpack', 'Jest'],
      correctOptionIndex: 1,
      explanation:
        'Prettier adalah code formatter yang menstandarkan gaya penulisan seperti indentasi, kutip, dan panjang baris.',
    },
    {
      id: 'q-08-03',
      order: 3,
      prompt: 'Fitur Vite apa yang memungkinkan modul diperbarui tanpa memuat ulang seluruh halaman?',
      options: ['Code splitting', 'Hot Module Replacement', 'Tree shaking', 'Lazy loading'],
      correctOptionIndex: 1,
      explanation:
        'Hot Module Replacement (HMR) memperbarui modul yang berubah di browser tanpa full reload, sehingga state UI terjaga.',
    },
    {
      id: 'q-08-04',
      order: 4,
      prompt: 'Apa manfaat tree shaking saat production build?',
      options: [
        'Menambahkan semua library ke bundle agar tidak ada yang hilang',
        'Menghapus kode yang tidak digunakan dari bundle akhir',
        'Memecah kode menjadi banyak file kecil tanpa batasan',
        'Mengubah semua gambar menjadi SVG',
      ],
      correctOptionIndex: 1,
      explanation:
        'Tree shaking menganalisis dependensi dan menghapus ekspor yang tidak pernah diimpor, mengurangi ukuran bundle.',
    },
    {
      id: 'q-08-05',
      order: 5,
      prompt: 'Atribut HTML apa yang digunakan untuk menunda pemuatan gambar di luar viewport?',
      options: ['srcset', 'loading="lazy"', 'decoding="async"', 'crossorigin'],
      correctOptionIndex: 1,
      explanation:
        'loading="lazy" memberi tahu browser untuk memuat gambar hanya saat mendekati viewport, menghemat bandwidth.',
    },
    {
      id: 'q-08-06',
      order: 6,
      prompt: 'Performance budget bertujuan untuk?',
      options: [
        'Membatasi jumlah developer dalam tim',
        'Menetapkan batasan metrik performa seperti ukuran bundle atau waktu muat',
        'Meningkatkan harga hosting',
        'Menghapus semua aset gambar',
      ],
      correctOptionIndex: 1,
      explanation:
        'Performance budget adalah batasan yang disepakati tim untuk menjaga performa halaman tetap baik.',
    },
    {
      id: 'q-08-07',
      order: 7,
      prompt: 'Dalam Git workflow, praktik terbaik sebelum merge fitur adalah?',
      options: [
        'Push langsung ke main tanpa review',
        'Membuat pull request dan memastikan CI lulus',
        'Menghapus semua commit sebelumnya',
        'Mengganti nama branch secara acak',
      ],
      correctOptionIndex: 1,
      explanation:
        'Pull request memungkinkan review kode dan menjalankan CI, sehingga kualitas kode terjaga sebelum masuk ke branch utama.',
    },
    {
      id: 'q-08-08',
      order: 8,
      prompt: 'Panel DevTools mana yang paling tepat untuk mengaudit performa, aksesibilitas, dan SEO?',
      options: ['Console', 'Elements', 'Lighthouse', 'Sources'],
      correctOptionIndex: 2,
      explanation:
        'Lighthouse adalah panel di Chrome DevTools yang menyediakan audit performa, aksesibilitas, best practices, dan SEO.',
    },
  ],
}
