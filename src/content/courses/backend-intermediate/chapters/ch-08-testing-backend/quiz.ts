import type { Quiz } from '@/content/types'

export const ch08Quiz: Quiz = {
  id: 'quiz-ch-08-testing-backend',
  title: 'Quiz: Testing Backend',
  passingScore: 8,
  questions: [
    {
      id: 'q-08-01',
      order: 1,
      prompt: 'Apa tujuan unit test dengan mock repository?',
      options: [
        'Menguji performa database',
        'Mengisolasi service dari dependency eksternal seperti database',
        'Menguji alur lengkap dari client ke server',
        'Memastikan UI berfungsi dengan baik',
      ],
      correctOptionIndex: 1,
      explanation:
        'Mock repository menggantikan dependency nyata sehingga unit test cepat, deterministik, dan tidak terpengaruh kegagalan database.',
    },
    {
      id: 'q-08-02',
      order: 2,
      prompt: 'Library mana yang umum digunakan untuk menguji HTTP endpoint di Node.js tanpa server?',
      options: ['Jest', 'supertest', 'Pact', 'k6'],
      correctOptionIndex: 1,
      explanation:
        'supertest mengirim request ke aplikasi Express/NestJS langsung tanpa perlu membuka port server.',
    },
    {
      id: 'q-08-03',
      order: 3,
      prompt: 'Mengapa integration test penting untuk backend?',
      options: [
        'Karena lebih cepat dari unit test',
        'Karena menangkap bug interaksi dengan dependency nyata seperti database dan transaction',
        'Karena tidak memerlukan setup',
        'Karena hanya menguji fungsi pure',
      ],
      correctOptionIndex: 1,
      explanation:
        'Integration test memverifikasi bahwa kode bekerja dengan database, cache, atau broker sungguhan, menangkap bug yang unit test lewatkan.',
    },
    {
      id: 'q-08-04',
      order: 4,
      prompt: 'Praktik terbaik untuk state database dalam integration test adalah?',
      options: [
        'Membiarkan data hasil test tetap ada',
        'Membersihkan atau seed ulang data sebelum setiap test',
        'Menggunakan database production',
        'Menggunakan satu test yang bergantung pada hasil test lain',
      ],
      correctOptionIndex: 1,
      explanation:
        'Setiap test harus dimulai dari state bersih agar deterministik dan tidak bergantung pada urutan eksekusi.',
    },
    {
      id: 'q-08-05',
      order: 5,
      prompt: 'Apa yang diuji oleh contract testing?',
      options: [
        'Kecepatan response API',
        'Kesepakatan request/response antara konsumen dan provider API',
        'Jumlah baris kode yang tercover',
        'Kualitas kode sumber',
      ],
      correctOptionIndex: 1,
      explanation:
        'Contract testing memastikan konsumen dan provider sepakat tentang bentuk request dan response, sering menggunakan tools seperti Pact.',
    },
    {
      id: 'q-08-06',
      order: 6,
      prompt: 'Tools mana yang cocok untuk load testing?',
      options: ['Jest', 'supertest', 'k6', 'Pact'],
      correctOptionIndex: 2,
      explanation:
        'k6 adalah tools load testing yang mensimulasikan banyak virtual user dan mengukur performa sistem.',
    },
    {
      id: 'q-08-07',
      order: 7,
      prompt: 'Apa tujuan mutation testing?',
      options: [
        'Menguji aplikasi di berbagai browser',
        'Mengubah kode sedikit untuk mengukur seberapa baik test suite menangkap perubahan',
        'Menghasilkan data test otomatis',
        'Memeriksa kontrak API',
      ],
      correctOptionIndex: 1,
      explanation:
        'Mutation testing membuat mutant dari kode. Jika test tetap lulus setelah mutasi, test suite dianggap kurang efektif.',
    },
    {
      id: 'q-08-08',
      order: 8,
      prompt: 'Keuntungan menggunakan testcontainers dalam integration test adalah?',
      options: [
        'Test berjalan lebih cepat daripada unit test',
        'Dependency seperti database dapat disediakan sebagai container sungguhan tanpa setup manual',
        'Tidak perlu menulis assertion',
        'Hanya cocok untuk aplikasi Go',
      ],
      correctOptionIndex: 1,
      explanation:
        'Testcontainers meluncurkan container PostgreSQL, Redis, dan lainnya saat test, memberikan environment yang bersih dan mendekati production.',
    },
  ],
}
