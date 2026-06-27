import type { Quiz } from '@/content/types'

export const ch08Quiz: Quiz = {
  id: 'quiz-ch-08-frontend-architecture-tooling-lanjutan',
  title: 'Quiz: Frontend Architecture & Tooling Lanjutan',
  passingScore: 8,
  questions: [
    {
      id: 'q-08-01',
      order: 1,
      prompt: 'Apa keuntungan utama monorepo untuk frontend?',
      options: [
        'Setiap package harus di repository terpisah',
        'Code sharing, atomic changes, dan unified tooling lintas package',
        'Tidak memerlukan version control',
        'Build selalu lebih cepat tanpa caching',
      ],
      correctOptionIndex: 1,
      explanation:
        'Monorepo memudahkan berbagi kode, melakukan perubahan atomik lintas package, dan menyelaraskan tooling dalam satu repository.',
    },
    {
      id: 'q-08-02',
      order: 2,
      prompt: 'Keunggulan pnpm workspaces dibandingkan npm workspaces adalah?',
      options: [
        'Tidak mendukung workspaces',
        'Content-addressable store dan strict dependency graph',
        'Hanya dapat digunakan untuk single package',
        'Tidak memiliki lock file',
      ],
      correctOptionIndex: 1,
      explanation:
        'pnpm menggunakan content-addressable store untuk menghemat disk space dan mencegah phantom dependencies melalui strict node_modules structure.',
    },
    {
      id: 'q-08-03',
      order: 3,
      prompt: 'Apa fungsi utama Turborepo?',
      options: [
        'Menggantikan package manager',
        'Build system dengan task pipeline, local caching, dan remote caching',
        'Menyediakan UI components',
        'Menangani deployment ke cloud secara otomatis',
      ],
      correctOptionIndex: 1,
      explanation:
        'Turborepo mengelola task pipeline dan caching untuk mempercepat build di monorepo.',
    },
    {
      id: 'q-08-04',
      order: 4,
      prompt: 'Apa tujuan changesets di monorepo?',
      options: [
        'Menghapus semua changelog',
        'Mengelola versi dan changelog antar package secara terstruktur',
        'Menggantikan unit test',
        'Mempercepat install dependencies',
      ],
      correctOptionIndex: 1,
      explanation:
        'Changesets membantu melacak perubahan, bump versi, dan generate changelog untuk package yang terpengaruh.',
    },
    {
      id: 'q-08-05',
      order: 5,
      prompt: 'Di CI, mengapa type check sebaiknya dijalankan sebelum build?',
      options: [
        'Karena type check tidak pernah gagal',
        'Untuk menangkap error tipe lebih awal sebelum proses build yang lebih mahal',
        'Karena build tidak memeriksa tipe',
        'Untuk menghasilkan bundle yang lebih besar',
      ],
      correctOptionIndex: 1,
      explanation:
        'Menjalankan type check lebih awal membantu menangkap error dengan cepat dan menghemat waktu build jika ada kesalahan tipe.',
    },
    {
      id: 'q-08-06',
      order: 6,
      prompt: 'Apa yang dapat dideteksi oleh module graph analysis?',
      options: [
        'Jumlah pengguna aplikasi',
        'Circular dependencies dan import yang tidak perlu',
        'Warna tema aplikasi',
        'Kecepatan koneksi pengguna',
      ],
      correctOptionIndex: 1,
      explanation:
        'Analisis module graph membantu mengidentifikasi circular dependencies, import berlebihan, dan struktur dependensi yang tidak ideal.',
    },
    {
      id: 'q-08-07',
      order: 7,
      prompt: 'Apa tujuan performance budget?',
      options: [
        'Meningkatkan ukuran bundle tanpa batas',
        'Mencegah regresi ukuran atau metrik performa di CI',
        'Mengurangi jumlah test yang dijalankan',
        'Menghapus kebutuhan akan bundle analyzer',
      ],
      correctOptionIndex: 1,
      explanation:
        'Performance budget menetapkan batasan yang tidak boleh dilanggar, membantu menjaga performa aplikasi dari waktu ke waktu.',
    },
    {
      id: 'q-08-08',
      order: 8,
      prompt: 'Tools mana yang cocok untuk visualisasi bundle Vite/Rollup?',
      options: [
        'webpack-bundle-analyzer',
        'rollup-plugin-visualizer',
        '@next/bundle-analyzer',
        'dependency-cruiser',
      ],
      correctOptionIndex: 1,
      explanation:
        'rollup-plugin-visualizer dirancang untuk Rollup dan Vite, sedangkan webpack-bundle-analyzer untuk webpack dan @next/bundle-analyzer untuk Next.js.',
    },
  ],
}
