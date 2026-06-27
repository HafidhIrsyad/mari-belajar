import type { Quiz } from '@/content/types'

export const ch03Quiz: Quiz = {
  id: 'quiz-ch-03-sync-package',
  title: 'Quiz: sync Package',
  passingScore: 8,
  questions: [
    {
      id: 'q-03-01',
      order: 1,
      prompt: 'Method apa yang dipanggil oleh goroutine saat pekerjaannya selesai pada WaitGroup?',
      options: [
        'End()',
        'Done()',
        'Finish()',
        'Complete()',
      ],
      correctOptionIndex: 1,
      explanation:
        'Done() mengurangi counter WaitGroup. Biasanya dipanggil dengan defer di awal goroutine.',
    },
    {
      id: 'q-03-02',
      order: 2,
      prompt: 'Primitif sync apa yang memungkinkan banyak reader bersamaan tetapi hanya satu writer?',
      options: [
        'sync.Mutex',
        'sync.RWMutex',
        'sync.Once',
        'sync.Pool',
      ],
      correctOptionIndex: 1,
      explanation:
        'sync.RWMutex memiliki RLock untuk reader dan Lock untuk writer. Banyak reader dapat memegang RLock bersamaan.',
    },
    {
      id: 'q-03-03',
      order: 3,
      prompt: 'Kapan sebaiknya menggunakan sync.Once?',
      options: [
        'Untuk mengunci setiap operasi',
        'Untuk inisialisasi yang harus dilakukan tepat satu kali',
        'Untuk membaca data dari channel',
        'Untuk menunggu goroutine selesai',
      ],
      correctOptionIndex: 1,
      explanation:
        'sync.Once menjamin fungsi hanya dieksekusi satu kali meskipun dipanggil dari banyak goroutine.',
    },
    {
      id: 'q-03-04',
      order: 4,
      prompt: 'Apa tujuan utama sync.Pool?',
      options: [
        'Menyimpan data persisten',
        'Mengelola object yang dapat digunakan kembali untuk mengurangi alokasi',
        'Menggantikan map secara umum',
        'Menyediakan pool goroutine tetap',
      ],
      correctOptionIndex: 1,
      explanation:
        'sync.Pool menyimpan object untuk reuse, mengurangi alokasi memori dan beban garbage collector.',
    },
    {
      id: 'q-03-05',
      order: 5,
      prompt: 'Package apa yang menyediakan operasi atomic seperti AddInt64?',
      options: [
        'sync/atomic',
        'sync/ops',
        'atomic/sync',
        'runtime/atomic',
      ],
      correctOptionIndex: 0,
      explanation:
        'Package sync/atomic menyediakan operasi atomic untuk integer dan pointer tanpa lock penuh.',
    },
    {
      id: 'q-03-06',
      order: 6,
      prompt: 'Apa yang terjadi jika mutex tidak pernah di-Unlock setelah Lock?',
      options: [
        'Program panic',
        'Goroutine lain yang butuh lock akan blok selamanya (deadlock potensial)',
        'Nilai yang dilindungi otomatis terhapus',
        'Mutex otomatis unlock setelah 1 detik',
      ],
      correctOptionIndex: 1,
      explanation:
        'Lupa Unlock menyebabkan goroutine lain tidak pernah bisa mendapatkan lock, yang dapat menyebabkan deadlock.',
    },
    {
      id: 'q-03-07',
      order: 7,
      prompt: 'Bagaimana cara menghindari deadlock saat mengunci dua mutex?',
      options: [
        'Selalu mengunci dalam urutan yang konsisten',
        'Mengunci secara acak',
        'Hanya mengunci satu mutex sepanjang program',
        'Tidak pernah menggunakan mutex',
      ],
      correctOptionIndex: 0,
      explanation:
        'Dengan urutan penguncian yang konsisten antar goroutine, kondisi circular wait dapat dihindari.',
    },
    {
      id: 'q-03-08',
      order: 8,
      prompt: 'Package mana yang menggabungkan WaitGroup dengan propagasi error dan cancellation?',
      options: [
        'sync/errgroup',
        'golang.org/x/sync/errgroup',
        'go/sync/errgroup',
        'sync/group',
      ],
      correctOptionIndex: 1,
      explanation:
        'golang.org/x/sync/errgroup menyediakan Group yang menunggu goroutine sekaligus mengumpulkan error pertama dan membatalkan context.',
    },
  ],
}
