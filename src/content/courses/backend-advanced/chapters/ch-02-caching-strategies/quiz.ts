import type { Quiz } from '@/content/types'

export const ch02Quiz: Quiz = {
  id: 'quiz-ch-02-caching-strategies',
  title: 'Quiz: Caching Strategies',
  passingScore: 8,
  questions: [
    {
      id: 'q-02-01',
      order: 1,
      prompt: 'Apa yang terjadi pada cache hit?',
      options: [
        'Data diambil dari database',
        'Data ditemukan di cache dan dikembalikan langsung',
        'Cache dihapus secara otomatis',
        'TTL direset ke nilai awal',
      ],
      correctOptionIndex: 1,
      explanation:
        'Cache hit berarti data tersedia di cache sehingga tidak perlu mengakses sumber data yang lebih lambat.',
    },
    {
      id: 'q-02-02',
      order: 2,
      prompt: 'Pola mana yang membuat aplikasi mengelola cache secara eksplisit dengan lazy loading?',
      options: ['Write-through', 'Write-behind', 'Cache-aside', 'Cache-invalidation'],
      correctOptionIndex: 2,
      explanation:
        'Cache-aside membiarkan aplikasi mengecek cache terlebih dahulu; jika miss, mengisi cache dari database.',
    },
    {
      id: 'q-02-03',
      order: 3,
      prompt: 'Dalam write-through, apa yang terjadi saat menulis data?',
      options: [
        'Data hanya ditulis ke cache dan ditunda ke database',
        'Data ditulis ke cache dan database secara bersamaan',
        'Data hanya ditulis ke database',
        'Cache dihapus setelah penulisan',
      ],
      correctOptionIndex: 1,
      explanation:
        'Write-through menulis ke cache dan database sekaligus sehingga read selalu mendapat data terbaru.',
    },
    {
      id: 'q-02-04',
      order: 4,
      prompt: 'Masalah apa yang disebabkan oleh banyak request bersamaan saat cache entry populer expired?',
      options: [
        'Cache hit ratio meningkat',
        'Cache stampede atau thundering herd',
        'Eviction policy berubah otomatis',
        'TTL menjadi tak terbatas',
      ],
      correctOptionIndex: 1,
      explanation:
        'Cache stampede terjadi ketika banyak request menghitung ulang nilai yang sama karena cache expired bersamaan.',
    },
    {
      id: 'q-02-05',
      order: 5,
      prompt: 'Eviction policy mana yang membuang item yang paling lama tidak diakses?',
      options: ['FIFO', 'LFU', 'LRU', 'Random'],
      correctOptionIndex: 2,
      explanation:
        'LRU (Least Recently Used) membuang item yang tidak diakses dalam waktu terlama.',
    },
    {
      id: 'q-02-06',
      order: 6,
      prompt: 'Teknik mana yang dapat mencegah cache stampede dengan meregenerate sebelum TTL habis?',
      options: [
        'Write-behind',
        'Probabilistic early expiration',
        'Full table scan',
        'Strong consistency',
      ],
      correctOptionIndex: 1,
      explanation:
        'Probabilistic early expiration memberi peluang pada request untuk memperbarui cache sedikit sebelum TTL habis.',
    },
    {
      id: 'q-02-07',
      order: 7,
      prompt: 'Mengapa setelah update data cache sering dihapus, bukan di-update?',
      options: [
        'Menghapus cache lebih cepat dan aman agar request berikutnya membaca nilai terbaru',
        'Update cache lebih mahal dari menghapus database',
        'Cache tidak mendukung operasi update',
        'Agar TTL menjadi lebih panjang',
      ],
      correctOptionIndex: 0,
      explanation:
        'Menghapus cache setelah update menghindari race condition dan memastikan pembacaan berikutnya mengambil data terbaru.',
    },
    {
      id: 'q-02-08',
      order: 8,
      prompt: 'Header HTTP mana yang digunakan CDN untuk mengontrol durasi cache asset?',
      options: ['Authorization', 'Cache-Control', 'Content-Type', 'User-Agent'],
      correctOptionIndex: 1,
      explanation:
        'Cache-Control menentukan directive seperti max-age, no-cache, dan no-store untuk caching di browser dan CDN.',
    },
  ],
}
