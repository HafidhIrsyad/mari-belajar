import type { Quiz } from '@/content/types'

export const ch01Quiz: Quiz = {
  id: 'quiz-ch-01-goroutines-channels',
  title: 'Quiz: Goroutines & Channels',
  passingScore: 8,
  questions: [
    {
      id: 'q-01-01',
      order: 1,
      prompt: 'Bagaimana cara menjalankan fungsi sebagai goroutine di Go?',
      options: [
        'go doWork()',
        'async doWork()',
        'spawn doWork()',
        'run doWork()',
      ],
      correctOptionIndex: 0,
      explanation:
        'Kata kunci go di depan pemanggilan fungsi akan menjalankannya sebagai goroutine yang dikelola Go runtime.',
    },
    {
      id: 'q-01-02',
      order: 2,
      prompt: 'Apa perilaku unbuffered channel saat pengirim mengirim nilai tanpa penerima?',
      options: [
        'Pengirim akan blok sampai penerima siap',
        'Nilai akan disimpan tanpa batas',
        'Program akan panic',
        'Pengirim melanjutkan eksekusi langsung',
      ],
      correctOptionIndex: 0,
      explanation:
        'Unbuffered channel memerlukan kedua belah pihak siap bersamaan. Pengirim akan diblok sampai ada goroutine yang menerima.',
    },
    {
      id: 'q-01-03',
      order: 3,
      prompt: 'Manakah tipe channel yang hanya bisa menerima nilai?',
      options: [
        'chan<- int',
        '<-chan int',
        'chan int',
        'receive chan int',
      ],
      correctOptionIndex: 1,
      explanation:
        '<-chan int adalah receive-only channel. chan<- int adalah send-only, dan chan int bisa kedua arah.',
    },
    {
      id: 'q-01-04',
      order: 4,
      prompt: 'Apa fungsi select dalam konteks channel?',
      options: [
        'Switch case untuk tipe data',
        'Memilih operasi channel yang siap dieksekusi',
        'Menghentikan semua goroutine',
        'Membuat channel baru',
      ],
      correctOptionIndex: 1,
      explanation:
        'select memungkinkan goroutine menunggu beberapa operasi channel. Case yang siap pertama kali akan dieksekusi.',
    },
    {
      id: 'q-01-05',
      order: 5,
      prompt: 'Apa yang terjadi jika kita menerima dari channel yang nil?',
      options: [
        'Menerima nilai default',
        'Operasi akan blok selamanya',
        'Program panic',
        'Channel otomatis dibuat',
      ],
      correctOptionIndex: 1,
      explanation:
        'Operasi send atau receive pada nil channel akan memblok goroutine selamanya. Dalam select, case dengan nil channel diabaikan.',
    },
    {
      id: 'q-01-06',
      order: 6,
      prompt: 'Dalam model scheduler Go (GMP), apa arti P?',
      options: [
        'Physical core',
        'Process',
        'Logical processor',
        'Program counter',
      ],
      correctOptionIndex: 2,
      explanation:
        'P adalah logical processor yang menyediakan antrian goroutine lokal dan sumber daya eksekusi. Jumlahnya default sama dengan GOMAXPROCS.',
    },
    {
      id: 'q-01-07',
      order: 7,
      prompt: 'Komponen apa di hchannel yang menyimpan goroutine yang menunggu mengirim?',
      options: [
        'recvq',
        'sendq',
        'buf',
        'waitq',
      ],
      correctOptionIndex: 1,
      explanation:
        'sendq adalah antrian goroutine yang sedang menunggu untuk mengirim. recvq adalah antrian goroutine yang menunggu untuk menerima.',
    },
    {
      id: 'q-01-08',
      order: 8,
      prompt: 'Mengapa goroutine lebih ringan dari thread OS?',
      options: [
        'Karena goroutine berjalan di hardware khusus',
        'Stack awal kecil dan dikelola oleh Go runtime, bukan kernel',
        'Goroutine tidak memerlukan stack',
        'Thread OS tidak pernah memakai memori',
      ],
      correctOptionIndex: 1,
      explanation:
        'Goroutine memiliki stack awal sekitar 2 KiB yang dapat tumbuh, dan switching-nya tidak melibatkan kernel sepenuhnya sehingga lebih ringan.',
    },
  ],
}
