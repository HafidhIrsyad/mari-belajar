import type { Quiz } from '@/content/types'

export const ch05Quiz: Quiz = {
  id: 'quiz-ch-05-scalability-reliability',
  title: 'Quiz: Scalability & Reliability',
  passingScore: 8,
  questions: [
    {
      id: 'q-05-01',
      order: 1,
      prompt: 'Apa keuntungan horizontal scaling dibanding vertical scaling?',
      options: [
        'Lebih sederhana dan tidak memerlukan load balancer',
        'Hampir tidak terbatas dan lebih fault-tolerant',
        'Tidak memerlukan jaringan',
        'Selalu lebih murah untuk beban kecil',
      ],
      correctOptionIndex: 1,
      explanation:
        'Horizontal scaling menambah instance sehingga kapasitas dapat bertambah hampir tanpa batas dan kegagalan satu node tidak mematikan sistem.',
    },
    {
      id: 'q-05-02',
      order: 2,
      prompt: 'Mengapa stateless service lebih mudah direplikasi?',
      options: [
        'Karena tidak memerlukan database',
        'Karena state disimpan di memory lokal',
        'Karena setiap request independen dan dapat ditangani instance mana pun',
        'Karena tidak memerlukan health check',
      ],
      correctOptionIndex: 2,
      explanation:
        'Stateless service menyimpan state di shared storage sehingga request dapat dipindahkan antar instance tanpa kehilangan context.',
    },
    {
      id: 'q-05-03',
      order: 3,
      prompt: 'Apa fungsi jitter dalam retry?',
      options: [
        'Mempercepat retry',
        'Menyebarkan waktu retry untuk menghindari thundering herd',
        'Menambah jumlah retry tanpa batas',
        'Mengganti circuit breaker',
      ],
      correctOptionIndex: 1,
      explanation:
        'Jitter menambah variasi acak pada delay sehingga banyak client tidak retry secara bersamaan.',
    },
    {
      id: 'q-05-04',
      order: 4,
      prompt: 'Pada circuit breaker, state apa yang mengizinkan beberapa request melewati untuk menguji recovery?',
      options: ['Closed', 'Open', 'Half-open', 'Disabled'],
      correctOptionIndex: 2,
      explanation:
        'State half-open mengizinkan sejumlah kecil request setelah timeout untuk menguji apakah downstream sudah pulih.',
    },
    {
      id: 'q-05-05',
      order: 5,
      prompt: 'Pola apa yang mengisolasi resource agar kegagalan satu komponen tidak menenggelamkan seluruh sistem?',
      options: ['Retry', 'Circuit breaker', 'Bulkhead', 'Auto-scaling'],
      correctOptionIndex: 2,
      explanation:
        'Bulkhead membatasi resource per komponen sehingga kegagalan tidak merembet ke seluruh aplikasi.',
    },
    {
      id: 'q-05-06',
      order: 6,
      prompt: 'Graceful degradation berarti?',
      options: [
        'Sistem selalu memberikan response lengkap meski downstream gagal',
        'Sistem tetap berfungsi dengan kemampuan yang dikurangi saat ada kegagalan',
        'Sistem langsung menolak semua request',
        'Sistem menambah instance secara otomatis',
      ],
      correctOptionIndex: 1,
      explanation:
        'Graceful degradation memastikan fitur kritis tetap tersedia meski fitur non-kritikal tidak dapat dijalankan.',
    },
    {
      id: 'q-05-07',
      order: 7,
      prompt: 'Chaos engineering bertujuan untuk?',
      options: [
        'Menghapus semua log error',
        'Memverifikasi resiliensi sistem dengan memicu kegagalan terkontrol',
        'Meningkatkan throughput secara manual',
        'Mengganti semua dependency dengan mock',
      ],
      correctOptionIndex: 1,
      explanation:
        'Chaos engineering menguji apakah sistem tetap berfungsi saat kegagalan sengaja dibangkitkan di lingkungan terkontrol.',
    },
    {
      id: 'q-05-08',
      order: 8,
      prompt: 'Retry storm dapat terjadi ketika?',
      options: [
        'Terlalu banyak client melakukan retry secara bersamaan setelah downstream mulai pulih',
        'Tidak ada request yang masuk',
        'Circuit breaker selalu terbuka',
        'Auto-scaling menonaktifkan instance',
      ],
      correctOptionIndex: 0,
      explanation:
        'Retry yang terkoordinasi buruk dapat membanjiri downstream yang baru pulih dan memicu lonjakan beban kedua.',
    },
  ],
}
