import type { Quiz } from '@/content/types'

export const ch07Quiz: Quiz = {
  id: 'quiz-ch-07-database-at-scale',
  title: 'Quiz: Database at Scale',
  passingScore: 8,
  questions: [
    {
      id: 'q-07-01',
      order: 1,
      prompt: 'Apa fungsi utama read replica?',
      options: [
        'Meningkatkan kapasitas tulis primary',
        'Melayani query baca untuk mengurangi beban primary',
        'Menggantikan backup',
        'Menyimpan log transaksi',
      ],
      correctOptionIndex: 1,
      explanation:
        'Read replica menyinkronkan data dari primary dan melayani query baca sehingga primary dapat fokus pada tulis.',
    },
    {
      id: 'q-07-02',
      order: 2,
      prompt: 'Apa risiko utama saat membaca dari replica?',
      options: [
        'Data selalu salah',
        'Replication lag menyebabkan data sedikit tertinggal',
        'Tidak bisa membaca sama sekali',
        'Primary akan terhapus',
      ],
      correctOptionIndex: 1,
      explanation:
        'Replica menerima perubahan secara asynchronous sehingga bisa ada lag antara primary dan replica.',
    },
    {
      id: 'q-07-03',
      order: 3,
      prompt: 'Sharding adalah teknik?',
      options: [
        'Menambah indeks pada tabel besar',
        'Membagi data horizontal ke beberapa database berdasarkan shard key',
        'Membuat salinan readonly dari primary',
        'Menyimpan semua data dalam satu partisi',
      ],
      correctOptionIndex: 1,
      explanation:
        'Sharding membagi data ke beberapa shard sehingga beban dan storage didistribusikan.',
    },
    {
      id: 'q-07-04',
      order: 4,
      prompt: 'Partitioning berbeda dari sharding karena?',
      options: [
        'Partitioning membagi data di banyak instance, sharding tidak',
        'Partitioning membagi tabel dalam satu instance; sharding membagi ke instance terpisah',
        'Partitioning hanya untuk NoSQL',
        'Sharding selalu lebih cepat dari partitioning',
      ],
      correctOptionIndex: 1,
      explanation:
        'Partitioning memecah tabel dalam satu database, sedangkan sharding mendistribusikan data ke database independen.',
    },
    {
      id: 'q-07-05',
      order: 5,
      prompt: 'Dalam CQRS, read model digunakan untuk?',
      options: [
        'Menulis data utama',
        'Mengoptimalkan query baca dengan struktur yang sesuai kebutuhan',
        'Menggantikan transaksi ACID',
        'Menyimpan event sourcing log',
      ],
      correctOptionIndex: 1,
      explanation:
        'Read model diproyeksikan untuk query dan bisa denormalized agar pembacaan cepat.',
    },
    {
      id: 'q-07-06',
      order: 6,
      prompt: 'Kelemahan utama 2PC adalah?',
      options: [
        'Tidak mendukung rollback',
        'Blocking dan bergantung pada coordinator; latency tinggi',
        'Hanya berfungsi untuk satu database',
        'Tidak mendukung replikasi',
      ],
      correctOptionIndex: 1,
      explanation:
        'Two-phase commit memerlukan koordinasi semua participant dan bisa blocking jika coordinator gagal.',
    },
    {
      id: 'q-07-07',
      order: 7,
      prompt: 'NewSQL seperti CockroachDB menggabungkan?',
      options: [
        'Model dokumen dan graph',
        'Skalabilitas NoSQL dengan konsistensi dan interface SQL',
        'Cache dan message broker',
        'API gateway dan service mesh',
      ],
      correctOptionIndex: 1,
      explanation:
        'NewSQL memberikan transaksi SQL dan skalabilitas horizontal melalui distributed consensus dan sharding otomatis.',
    },
    {
      id: 'q-07-08',
      order: 8,
      prompt: 'Consistent hashing berguna untuk?',
      options: [
        'Mengurangi jumlah replika',
        'Meminimalkan data yang dipindahkan saat shard ditambah atau dihapus',
        'Mempercepat query JOIN',
        'Menghapus kebutuhan partition pruning'],
      correctOptionIndex: 1,
      explanation:
        'Consistent hashing memetakan key ke ring sehingga perubahan membership shard hanya mempengaruhi sedikit key.',
    },
  ],
}
