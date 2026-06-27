import type { Quiz } from '@/content/types'

export const ch07Quiz: Quiz = {
  id: 'quiz-ch-07-documentation-testing-api',
  title: 'Quiz: Documentation & Testing API',
  passingScore: 8,
  questions: [
    {
      id: 'q-07-01',
      order: 1,
      prompt: 'Format spesifikasi yang umum digunakan untuk mendokumentasikan REST API adalah?',
      options: ['OpenAPI', 'SQL', 'Markdown murni tanpa struktur', 'CSS'],
      correctOptionIndex: 0,
      explanation:
        'OpenAPI (sebelumnya Swagger) adalah standar untuk mendeskripsikan endpoint, skema, dan response API.',
    },
    {
      id: 'q-07-02',
      order: 2,
      prompt: 'Swagger UI berguna untuk?',
      options: [
        'Menjalankan query database',
        'Menyediakan antarmuka interaktif untuk menjelajahi dan menguji API',
        'Mengompilasi kode TypeScript',
        'Mengganti unit test',
      ],
      correctOptionIndex: 1,
      explanation:
        'Swagger UI membaca spesifikasi OpenAPI dan menampilkan UI interaktif untuk mencoba endpoint langsung.',
    },
    {
      id: 'q-07-03',
      order: 3,
      prompt: 'Library supertest pada ekosistem Node.js digunakan untuk?',
      options: [
        'Menghasilkan PDF laporan',
        'Testing HTTP endpoint tanpa perlu bind ke port jaringan',
        'Mengompres gambar',
        'Mengelola dependency',
      ],
      correctOptionIndex: 1,
      explanation:
        'supertest memungkinkan kita membuat request ke app Express dan memeriksa response dalam test.',
    },
    {
      id: 'q-07-04',
      order: 4,
      prompt: 'Contract testing bertujuan untuk?',
      options: [
        'Menguji kecepatan jaringan',
        'Memverifikasi bahwa producer dan consumer sepakat terhadap bentuk request/response',
        'Menggantikan deployment otomatis',
        'Menghapus kebutuhan dokumentasi',
      ],
      correctOptionIndex: 1,
      explanation:
        'Contract test memastikan API producer menghasilkan response yang sesuai dengan ekspektasi consumer.',
    },
    {
      id: 'q-07-05',
      order: 5,
      prompt: 'Dokumentasi OpenAPI sebaiknya mencakup?',
      options: [
        'Hanya judul API',
        'Endpoint, metode, parameter, skema, status code, dan contoh',
        'Password database',
        'Source code lengkap aplikasi',
      ],
      correctOptionIndex: 1,
      explanation:
        'Dokumentasi yang lengkap mencakup endpoint, metode, parameter, skema, status code, dan contoh request/response.',
    },
    {
      id: 'q-07-06',
      order: 6,
      prompt: 'Pengujian manual dengan curl berguna untuk?',
      options: [
        'Mengganti semua automated test',
        'Verifikasi cepat saat development atau debugging',
        'Menghasilkan kode otomatis',
        'Menyimpan secret key',
      ],
      correctOptionIndex: 1,
      explanation:
        'curl adalah alat command-line untuk mengirim request HTTP dan berguna untuk verifikasi cepat.',
    },
    {
      id: 'q-07-07',
      order: 7,
      prompt: 'API versioning dalam dokumentasi penting karena?',
      options: [
        'Agar client tidak bingung saat kontrak berubah',
        'Agar server lebih cepat',
        'Agar tidak perlu menulis test',
        'Agar database lebih kecil',
      ],
      correctOptionIndex: 0,
      explanation:
        'Versi yang jelas di dokumentasi membantu client memahami kontrak mana yang berlaku dan kapan harus bermigrasi.',
    },
    {
      id: 'q-07-08',
      order: 8,
      prompt: 'httptest di Go digunakan untuk?',
      options: [
        'Membuat HTTP request dalam unit test tanpa menjalankan server nyata',
        'Mendesain antarmuka web',
        'Mengelola environment variable',
        'Mengompilasi binary',
      ],
      correctOptionIndex: 0,
      explanation:
        'Package httptest menyediakan ResponseRecorder dan server uji untuk menguji handler HTTP.',
    },
  ],
}
