import type { Quiz } from '@/content/types'

export const ch02Quiz: Quiz = {
  id: 'quiz-ch-02-server-side-rendering-ssg',
  title: 'Quiz: Server-Side Rendering & SSG',
  passingScore: 8,
  questions: [
    {
      id: 'q-02-01',
      order: 1,
      prompt: 'Apa kelemahan utama Client-Side Rendering (CSR)?',
      options: [
        'Tidak mendukung navigasi client',
        'First paint lambat karena menunggu JavaScript dieksekusi',
        'Tidak bisa menggunakan React hooks',
        'Server menjadi bottleneck',
      ],
      correctOptionIndex: 1,
      explanation:
        'CSR mengharuskan browser mengunduh dan mengeksekusi JavaScript sebelum konten muncul, yang sering memperlambat first paint.',
    },
    {
      id: 'q-02-02',
      order: 2,
      prompt: 'Apa tujuan utama hydrasi?',
      options: [
        'Mengubah HTML statis menjadi aplikasi interaktif dengan event listener dan state',
        'Mengompresi ukuran bundle JavaScript',
        'Menghasilkan HTML di server untuk setiap request',
        'Menghapus kebutuhan akan DOM',
      ],
      correctOptionIndex: 0,
      explanation:
        'Hydrasi adalah proses memberi hidup HTML statis dari server sehingga komponen menjadi interaktif di client.',
    },
    {
      id: 'q-02-03',
      order: 3,
      prompt: 'Karakteristik apa yang benar tentang React Server Components?',
      options: [
        'Dapat menggunakan useState dan useEffect',
        'Dapat mengakses database server langsung dan tidak dihydrasi',
        'Selalu menghasilkan bundle JavaScript client',
        'Hanya dapat digunakan di Next.js Pages Router',
      ],
      correctOptionIndex: 1,
      explanation:
        'Server Components berjalan di server, dapat mengakses resource server, dan tidak memerlukan hydrasi sehingga tidak menambah bundle client.',
    },
    {
      id: 'q-02-04',
      order: 4,
      prompt: 'Di manakah Client Component ditandai di Next.js App Router?',
      options: [
        'Dengan ekstensi .server.tsx',
        'Dengan directive "use client" di bagian atas file',
        'Dengan mengekspor metadata object',
        'Dengan nama fungsi yang diawali Client',
      ],
      correctOptionIndex: 1,
      explanation:
        'Directive "use client" memberitahu Next.js bahwa komponen tersebut harus di-bundle dan dihydrasi di client.',
    },
    {
      id: 'q-02-05',
      order: 5,
      prompt: 'Apa keuntungan streaming SSR?',
      options: [
        'Mengurangi kebutuhan akan CSS',
        'Browser dapat merender bagian halaman sebelum seluruh data siap',
        'Menghilangkan kebutuhan untuk server sama sekali',
        'Memastikan semua komponen tidak dihydrasi',
      ],
      correctOptionIndex: 1,
      explanation:
        'Streaming SSR memungkinkan progressive rendering, di mana shell statis ditampilkan lebih dulu dan bagian dinamis disusul.',
    },
    {
      id: 'q-02-06',
      order: 6,
      prompt: 'Apa yang dimaksud dengan Partial Prerendering (PPR)?',
      options: [
        'Hanya merender 50% konten halaman',
        'Kombinasi shell statis dari build time dengan bagian dinamis yang distream',
        'Teknik untuk menghapus semua JavaScript client',
        'Metode caching untuk aset statis saja',
      ],
      correctOptionIndex: 1,
      explanation:
        'PPR memprerender shell statis dan mengganti bagian dinamis dengan streaming, menggabungkan manfaat SSG dan SSR.',
    },
    {
      id: 'q-02-07',
      order: 7,
      prompt: 'Mengapa edge runtime memiliki cold start yang sangat cepat?',
      options: [
        'Karena berjalan di browser pengguna',
        'Karena dieksekusi di CDN edge nodes dengan lingkungan ringan dan isolasi request',
        'Karena tidak perlu parsing JavaScript',
        'Karena selalu menggunakan database lokal',
      ],
      correctOptionIndex: 1,
      explanation:
        'Edge runtime didesain untuk startup cepat dan dieksekusi di dekat pengguna pada CDN edge nodes dengan keterbatasan API yang sengaja minimal.',
    },
    {
      id: 'q-02-08',
      order: 8,
      prompt: 'Kapan sebaiknya menggunakan SSG dibandingkan SSR?',
      options: [
        'Konten sangat personal per pengguna dan berubah setiap request',
        'Konten relatif stabil dan dapat dibuat saat build time',
        'Aplikasi memerlukan akses langsung ke cookie di setiap request',
        'Data selalu bergantung pada query parameter runtime',
      ],
      correctOptionIndex: 1,
      explanation:
        'SSG cocok untuk konten yang stabil karena HTML dapat disajikan dari CDN dengan performa tertinggi.',
    },
  ],
}
