import type { Quiz } from '@/content/types'

export const ch04Quiz: Quiz = {
  id: 'quiz-ch-04-micro-frontends-pengantar',
  title: 'Quiz: Micro-Frontends (Pengantar)',
  passingScore: 8,
  questions: [
    {
      id: 'q-04-01',
      order: 1,
      prompt: 'Apa motivasi utama penggunaan micro-frontends?',
      options: [
        'Mengurangi jumlah komponen UI',
        'Memungkinkan tim yang berbeda mengembangkan dan deploy fitur secara independen',
        'Menghapus kebutuhan untuk JavaScript framework',
        'Meningkatkan keamanan secara otomatis',
      ],
      correctOptionIndex: 1,
      explanation:
        'Micro-frontends memungkinkan autonomous teams dengan independent deployability untuk aplikasi frontend besar.',
    },
    {
      id: 'q-04-02',
      order: 2,
      prompt: 'Apa peran host dalam Module Federation?',
      options: [
        'Menyediakan remote module untuk aplikasi lain',
        'Aplikasi utama yang mengonsumsi remote modules',
        'Menyimpan database bersama',
        'Mengelola CSS global',
      ],
      correctOptionIndex: 1,
      explanation:
        'Host adalah aplikasi shell yang memuat dan menampilkan modul yang diekspos oleh remote aplikasi.',
    },
    {
      id: 'q-04-03',
      order: 3,
      prompt: 'Mengapa shared dependencies penting dalam Module Federation?',
      options: [
        'Untuk memastikan setiap remote memiliki salinan React sendiri',
        'Untuk menghindari duplikasi library umum seperti React dan React DOM',
        'Untuk meningkatkan ukuran bundle secara keseluruhan',
        'Untuk menghapus kebutuhan akan npm install',
      ],
      correctOptionIndex: 1,
      explanation:
        'Shared dependencies memastikan library seperti React hanya dimuat sekali meskipun digunakan oleh beberapa remote.',
    },
    {
      id: 'q-04-04',
      order: 4,
      prompt: 'Kekurangan utama build-time integration dibandingkan runtime integration adalah?',
      options: [
        'Tidak dapat menggunakan TypeScript',
        'Deploy remote memerlukan redeploy host',
        'Tidak mendukung code splitting',
        'Selalu menghasilkan bundle yang lebih besar',
      ],
      correctOptionIndex: 1,
      explanation:
        'Pada build-time integration, host perlu di-rebuild dan di-deploy ulang untuk mengambil versi terbaru remote.',
    },
    {
      id: 'q-04-05',
      order: 5,
      prompt: 'Praktik terbaik untuk state antar micro-frontend adalah?',
      options: [
        'Membagikan state global melalui window object tanpa batasan',
        'Mengisolasi state per micro-frontend dan berkomunikasi melalui contract yang jelas',
        'Menyimpan semua state di local storage saja',
        'Membiarkan setiap micro-frontend langsung mengubah DOM milik lainnya',
      ],
      correctOptionIndex: 1,
      explanation:
        'Isolasi state dan komunikasi melalui contract yang jelas mencegah coupling tersembunyi antar micro-frontend.',
    },
    {
      id: 'q-04-06',
      order: 6,
      prompt: 'Apa yang dimaksud dengan app shell routing?',
      options: [
        'Setiap micro-frontend memiliki domain tersendiri',
        'Shell menangani top-level route dan memuat micro-frontend yang sesuai',
        'Routing hanya dilakukan di server backend',
        'Tidak ada routing sama sekali',
      ],
      correctOptionIndex: 1,
      explanation:
        'App shell routing menyediakan navigasi tingkat atas dan bertanggung jawab memuat micro-frontend berdasarkan route.',
    },
    {
      id: 'q-04-07',
      order: 7,
      prompt: 'Kapan sebaiknya AVOID menggunakan micro-frontends?',
      options: [
        'Ada banyak tim yang berkontribusi pada satu produk',
        'Aplikasi masih kecil dengan sedikit tim dan build time masih cepat',
        'Diperlukan migrasi bertahap dari stack lama',
        'Build time monolith sudah sangat lambat',
      ],
      correctOptionIndex: 1,
      explanation:
        'Micro-frontends menambah kompleksitas signifikan dan tidak sepadan untuk aplikasi kecil dengan tim sedikit.',
    },
    {
      id: 'q-04-08',
      order: 8,
      prompt: 'Mengapa contract test penting dalam arsitektur micro-frontend?',
      options: [
        'Untuk menggantikan unit test sepenuhnya',
        'Untuk memastikan host dan remote tetap kompatibel saat berkembang secara independen',
        'Untuk mengurangi kebutuhan dokumentasi',
        'Untuk menghapus kebutuhan shared dependencies',
      ],
      correctOptionIndex: 1,
      explanation:
        'Contract test mendeteksi breaking change antara host dan remote tanpa harus mengintegrasikan seluruh aplikasi.',
    },
  ],
}
