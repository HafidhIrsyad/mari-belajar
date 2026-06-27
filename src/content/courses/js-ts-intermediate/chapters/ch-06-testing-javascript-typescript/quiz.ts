import type { Quiz } from '@/content/types'

export const ch06Quiz: Quiz = {
  id: 'quiz-ch-06-testing-javascript-typescript',
  title: 'Quiz: Testing JavaScript & TypeScript',
  passingScore: 8,
  questions: [
    {
      id: 'q-06-01',
      order: 1,
      prompt: 'Urutan pola arrange-act-assert adalah?',
      options: [
        'Assert, arrange, act',
        'Arrange, act, assert',
        'Act, arrange, assert',
        'Arrange, assert, act',
      ],
      correctOptionIndex: 1,
      explanation:
        'Arrange-Act-Assert artinya siapkan data, jalankan aksi, lalu periksa hasil.',
    },
    {
      id: 'q-06-02',
      order: 2,
      prompt: 'Fungsi vi.fn() di Vitest digunakan untuk?',
      options: [
        'Membuat mock module',
        'Membuat spy function',
        'Menjalankan test secara paralel',
        'Mengukur coverage',
      ],
      correctOptionIndex: 1,
      explanation:
        'vi.fn() membuat spy function yang bisa dipanggil dan diperiksa pemanggilannya.',
    },
    {
      id: 'q-06-03',
      order: 3,
      prompt: 'Bagaimana cara menangani assertion pada kode asynchronous?',
      options: [
        'Mengabaikan Promise',
        'Menggunakan async/await di dalam test',
        'Menggunakan setTimeout di test',
        'Tidak bisa diuji',
      ],
      correctOptionIndex: 1,
      explanation:
        'Test async harus menunggu Promise selesai, biasanya dengan async/await.',
    },
    {
      id: 'q-06-04',
      order: 4,
      prompt: 'Prinsip utama React Testing Library adalah?',
      options: [
        'Menguji implementasi internal component',
        'Menguji component dari perspektif pengguna',
        'Menguji semua props secara manual',
        'Menggunakan selector CSS untuk semua query',
      ],
      correctOptionIndex: 1,
      explanation:
        'Testing Library mendorong query berbasis role dan teks yang mencerminkan cara pengguna berinteraksi.',
    },
    {
      id: 'q-06-05',
      order: 5,
      prompt: 'Dalam TDD cycle, langkah pertama adalah?',
      options: [
        'Refactor implementasi',
        'Menulis test yang gagal',
        'Menulis implementasi lengkap',
        'Menjalankan coverage report',
      ],
      correctOptionIndex: 1,
      explanation:
        'TDD dimulai dengan menulis test yang gagal (red), lalu implementasi minimal (green), dan refactor.',
    },
    {
      id: 'q-06-06',
      order: 6,
      prompt: 'Apa keuntungan property-based testing?',
      options: [
        'Test selalu lebih cepat',
        'Menemukan edge case dengan banyak input acak',
        'Tidak memerlukan assertion',
        'Hanya berlaku untuk UI test',
      ],
      correctOptionIndex: 1,
      explanation:
        'Property-based testing menghasilkan input acak untuk memeriksa invariant, sering menemukan kasus yang tidak terpikir.',
    },
    {
      id: 'q-06-07',
      order: 7,
      prompt: 'Jenis test apa yang paling banyak seharusnya ada menurut test pyramid?',
      options: [
        'E2E tests',
        'Integration tests',
        'Unit tests',
        'Visual regression tests',
      ],
      correctOptionIndex: 2,
      explanation:
        'Test pyramid menyarankan banyak unit test, lebih sedikit integration test, dan sangat sedikit E2E test.',
    },
    {
      id: 'q-06-08',
      order: 8,
      prompt: 'Apa tujuan coverage thresholds?',
      options: [
        'Memastikan test selalu berjalan dalam waktu tertentu',
        'Mencegah penurunan persentase kode yang teruji',
        'Menghapus test yang lambat',
        'Memastikan tidak ada bug sama sekali',
      ],
      correctOptionIndex: 1,
      explanation:
        'Coverage thresholds memastikan coverage tidak turun di bawah batas yang ditentukan, biasanya di CI.',
    },
  ],
}
