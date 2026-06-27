import type { Quiz } from '@/content/types'

export const ch01Quiz: Quiz = {
  id: 'quiz-ch-01-concurrency-patterns',
  title: 'Quiz: Concurrency Patterns',
  passingScore: 8,
  questions: [
    {
      id: 'q-01-01',
      order: 1,
      prompt: 'Apa keuntungan utama menggunakan worker pool dibanding membuat goroutine untuk setiap task?',
      options: [
        'Kode menjadi lebih pendek',
        'Mencegah eksplosi jumlah goroutine dan mengontrol penggunaan resource',
        'Tidak memerlukan channel sama sekali',
        'Otomatis menghilangkan race condition',
      ],
      correctOptionIndex: 1,
      explanation:
        'Worker pool membatasi jumlah goroutine aktif, sehingga mencegah eksplosi goroutine dan memudahkan pengaturan CPU serta memori.',
    },
    {
      id: 'q-01-02',
      order: 2,
      prompt: 'Apa fungsi utama package errgroup?',
      options: [
        'Mengimplementasikan mutex',
        'Mengelompokkan goroutine dan mengembalikan error pertama yang terjadi',
        'Menyediakan channel buffer tak terbatas',
        'Menggantikan sync.Pool',
      ],
      correctOptionIndex: 1,
      explanation:
        'errgroup digunakan untuk menjalankan goroutine terkait, menunggu semuanya selesai, dan mengembalikan error pertama serta membatalkan context.',
    },
    {
      id: 'q-01-03',
      order: 3,
      prompt: 'Bagaimana cara mencegah goroutine leak saat goroutine menunggu channel?',
      options: [
        'Dengan selalu menutup channel di penerima',
        'Dengan menyertakan case `<-ctx.Done()` pada select dan memastikan ada penerima',
        'Dengan menggunakan channel unbuffered untuk semua kasus',
        'Dengan menghindari penggunaan context',
      ],
      correctOptionIndex: 1,
      explanation:
        'Goroutine leak sering terjadi karena goroutine menunggu tanpa cara keluar. Menyertakan ctx.Done() pada select memberikan jal keluar saat context dibatalkan.',
    },
    {
      id: 'q-01-04',
      order: 4,
      prompt: 'Apa peran semaphore dalam concurrency Go?',
      options: [
        'Menggantikan fungsi channel sepenuhnya',
        'Membatasi jumlah goroutine yang boleh menjalankan bagian kode tertentu secara bersamaan',
        'Menyimpan data hasil goroutine',
        'Menghasilkan goroutine secara otomatis',
      ],
      correctOptionIndex: 1,
      explanation:
        'Semaphore membatasi jumlah akses konkuren ke suatu resource atau bagian kode, mirip dengan quota pada concurrent execution.',
    },
    {
      id: 'q-01-05',
      order: 5,
      prompt: 'Mengapa backpressure penting dalam sistem concurrent?',
      options: [
        'Agar producer selalu lebih cepat dari consumer',
        'Untuk mengontrol laju produksi data agar tidak melebihi kapasitas konsumen',
        'Untuk menghilangkan kebutuhan buffer',
        'Agar tidak perlu menggunakan context',
      ],
      correctOptionIndex: 1,
      explanation:
        'Backpressure mencegah producer membanjiri consumer, sehingga buffer tidak tumbuh tanpa batas dan menghindari OOM.',
    },
    {
      id: 'q-01-06',
      order: 6,
      prompt: 'Pada contoh errgroup, mengapa perlu menangkap loop variable dengan `i, url := i, url`?',
      options: [
        'Untuk meningkatkan performa iterasi',
        'Karena semua goroutine akan berbagi variabel loop yang sama jika tidak ditangkap',
        'Agar variabel loop tidak bisa dimodifikasi',
        'Karena errgroup tidak mendukung parameter',
      ],
      correctOptionIndex: 1,
      explanation:
        'Di Go versi sebelum 1.22, variabel loop digunakan kembali, sehingga goroutine yang menutup variabel loop akan melihat nilai terakhir jika tidak ditangkap.',
    },
    {
      id: 'q-01-07',
      order: 7,
      prompt: 'Apa yang terjadi jika select memiliki case pada channel nil?',
      options: [
        'Case tersebut diabaikan selamanya',
        'Case tersebut memblokir untuk case tersebut, efektif menonaktifkannya',
        'Program panic',
        'Channel nil secara otomatis diinisialisasi',
      ],
      correctOptionIndex: 1,
      explanation:
        'Select pada nil channel memblokir untuk case itu, sehingga case tersebut tidak akan terpilih dan bisa digunakan untuk menonaktifkan case dinamis.',
    },
    {
      id: 'q-01-08',
      order: 8,
      prompt: 'Dalam structured concurrency, siapa yang bertanggung jawab menunggu dan membersihkan goroutine child?',
      options: [
        'Goroutine child itu sendiri',
        'Garbage collector secara otomatis',
        'Parent scope yang membuat goroutine',
        'OS scheduler',
      ],
      correctOptionIndex: 2,
      explanation:
        'Dalam structured concurrency, parent scope bertanggung jawab menunggu semua child goroutine selesai dan membatalkan/membersihkannya jika diperlukan.',
    },
  ],
}
