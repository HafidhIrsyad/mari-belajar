import type { Quiz } from '@/content/types'

export const ch03Quiz: Quiz = {
  id: 'quiz-ch-03-design-systems',
  title: 'Quiz: Design Systems',
  passingScore: 8,
  questions: [
    {
      id: 'q-03-01',
      order: 1,
      prompt: 'Apa fungsi utama design tokens?',
      options: [
        'Menyimpan logika bisnis aplikasi',
        'Menyediakan nilai desain atomik yang konsisten lintas platform',
        'Menggantikan seluruh komponen UI',
        'Menghasilkan bundle JavaScript yang lebih kecil',
      ],
      correctOptionIndex: 1,
      explanation:
        'Design tokens menyimpan nilai desain seperti warna dan spacing dalam format yang dapat dikonsumsi berbagai platform.',
    },
    {
      id: 'q-03-02',
      order: 2,
      prompt: 'Keuntungan utama compound components adalah?',
      options: [
        'Mengurangi jumlah file dalam proyek',
        'API yang ekspresif dan fleksibel dengan logika internal terenkapsulasi',
        'Tidak memerlukan React context',
        'Selalu lebih cepat daripada komponen tunggal',
      ],
      correctOptionIndex: 1,
      explanation:
        'Compound components menyediakan API yang mudah dibaca sementara state dan komunikasi internal disembunyikan.',
    },
    {
      id: 'q-03-03',
      order: 3,
      prompt: 'Apa yang dimaksud dengan headless UI?',
      options: [
        'Komponen tanpa styling bawaan yang menyediakan logika dan aksesibilitas',
        'Komponen yang hanya berisi HTML tanpa JavaScript',
        'UI yang disembunyikan dari pengguna',
        'Framework CSS-only tanpa interaksi',
      ],
      correctOptionIndex: 0,
      explanation:
        'Headless UI menyediakan behavior, state, dan aksesibilitas tanpa memaksakan styling, sehingga desain dapat disesuaikan sepenuhnya.',
    },
    {
      id: 'q-03-04',
      order: 4,
      prompt: 'Kapan sebaiknya menggunakan controlled component?',
      options: [
        'Saat komponen tidak memerlukan interaksi pengguna',
        'Saat parent perlu mengelola state untuk integrasi form atau logika bisnis',
        'Saat styling komponen sangat kompleks',
        'Saat komponen hanya digunakan satu kali',
      ],
      correctOptionIndex: 1,
      explanation:
        'Controlled component memungkinkan parent mengontrol state melalui props, penting untuk form handling dan integrasi logika bisnis.',
    },
    {
      id: 'q-03-05',
      order: 5,
      prompt: 'Mengapa aksesibilitas harus dipertimbangkan sejak awal desain komponen?',
      options: [
        'Karena hanya diperlukan untuk aplikasi pemerintah',
        'Karena menambahkan aksesibilitas setelahnya lebih mahal dan rentan bug',
        'Karena aksesibilitas hanya berlaku untuk screen reader',
        'Karena komponen tanpa aksesibilitas tidak dapat di-render',
      ],
      correctOptionIndex: 1,
      explanation:
        'Aksesibilitas yang dibangun sejak awal lebih terintegrasi dan andal dibandingkan ditambahkan sebagai afterthought.',
    },
    {
      id: 'q-03-06',
      order: 6,
      prompt: 'Praktik terbaik apa untuk menghindari proliferasi props di komponen design system?',
      options: [
        'Menggunakan children dan className untuk komposisi',
        'Membuat prop untuk setiap kemungkinan styling',
        'Menghapus semua props dan hardcode styling',
        'Memisahkan setiap varian menjadi komponen terpisah',
      ],
      correctOptionIndex: 0,
      explanation:
        'Menerima children dan className memungkinkan konsumen menyesuaikan komponen tanpa meminta penambahan prop baru.',
    },
    {
      id: 'q-03-07',
      order: 7,
      prompt: 'Apa tujuan semantic versioning dalam design system?',
      options: [
        'Menyembunyikan perubahan dari pengguna',
        'Mengkomunikasikan jenis dan dampak perubahan API',
        'Menjamin semua komponen kompatibel secara otomatis',
        'Menggantikan kebutuhan akan dokumentasi',
      ],
      correctOptionIndex: 1,
      explanation:
        'Semantic versioning (major.minor.patch) membantu konsumen memahami apakah suatu update mengandung perbaikan bug, fitur baru, atau breaking change.',
    },
    {
      id: 'q-03-08',
      order: 8,
      prompt: 'Headless UI library seperti Radix UI umumnya menangani aspek apa?',
      options: [
        'Hanya visual styling default',
        'Logika state, keyboard navigation, dan ARIA attributes',
        'Deployment dan CI/CD',
        'Database schema dan API endpoint',
      ],
      correctOptionIndex: 1,
      explanation:
        'Library headless berfokus pada behavior, state management, dan accessibility, bukan visual styling.',
    },
  ],
}
