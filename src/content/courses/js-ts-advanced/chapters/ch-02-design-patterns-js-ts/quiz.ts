import type { Quiz } from '@/content/types'

export const ch02Quiz: Quiz = {
  id: 'quiz-ch-02-design-patterns-js-ts',
  title: 'Quiz: Design Patterns in JS/TS',
  passingScore: 8,
  questions: [
    {
      id: 'q-02-01',
      order: 1,
      prompt: 'Pola manakah yang memastikan hanya ada satu instance dari sebuah kelas?',
      options: ['Factory', 'Singleton', 'Observer', 'Strategy'],
      correctOptionIndex: 1,
      explanation:
        'Singleton membatasi pembuatan instance menjadi satu objek dan menyediakan akses global ke objek tersebut.',
    },
    {
      id: 'q-02-02',
      order: 2,
      prompt: 'Apa tujuan utama Factory pattern?',
      options: [
        'Mengamankan state dari modifikasi eksternal',
        'Memisahkan logika pembuatan objek dari kode pengguna',
        'Mengontrol akses ke objek lain',
        'Menyimpan riwayat perubahan state',
      ],
      correctOptionIndex: 1,
      explanation:
        'Factory menyembunyikan detail pembuatan objek sehingga klien hanya perlu mengetahui tipe abstrak yang diinginkan.',
    },
    {
      id: 'q-02-03',
      order: 3,
      prompt: 'Pola Observer paling cocok untuk skenario apa?',
      options: [
        'Pertukaran algoritma saat runtime',
        'Notifikasi one-to-many saat state berubah',
        'Pembuatan objek berdasarkan tipe dinamis',
        'Pembatasan akses ke resource berbagi',
      ],
      correctOptionIndex: 1,
      explanation:
        'Observer memungkinkan banyak subscriber menerima notifikasi ketika publisher mengalami perubahan.',
    },
    {
      id: 'q-02-04',
      order: 4,
      prompt: 'Manakah yang merupakan contoh Dependency Injection?',
      options: [
        'Kelas membuat dependensinya sendiri dengan `new`',
        'Dependensi diberikan ke konstruktor dari luar',
        'Menggunakan global variable untuk menyimpan service',
        'Mengcopy kode dependensi ke dalam modul',
      ],
      correctOptionIndex: 1,
      explanation:
        'Dependency Injection berarti dependensi disuntikkan ke modul dari luar, biasanya lewat konstruktor.',
    },
    {
      id: 'q-02-05',
      order: 5,
      prompt: 'Dalam Circuit Breaker, state apa yang menolak permintaan tanpa memanggil layanan?',
      options: ['Closed', 'Half-Open', 'Open', 'Locked'],
      correctOptionIndex: 2,
      explanation:
        'State Open langsung mengembalikan kegagalan tanpa membebani layanan yang sudah bermasalah.',
    },
    {
      id: 'q-02-06',
      order: 6,
      prompt: 'Apa keuntungan utama Ports & Adapters?',
      options: [
        'Domain logic dapat diganti dengan mudah',
        'Teknologi eksternal dapat diganti tanpa mengubah domain logic',
        'Semua kode berjalan dalam satu proses',
        'Tidak memerlukan interface',
      ],
      correctOptionIndex: 1,
      explanation:
        'Ports & Adapters memisahkan domain logic dari teknologi eksternal melalui interface, sehingga adapternya mudah diganti.',
    },
    {
      id: 'q-02-07',
      order: 7,
      prompt: 'Apa karakteristik utama Event Sourcing?',
      options: [
        'Menyimpan state akhir saja',
        'Menyimpan perubahan state sebagai urutan event',
        'Menggunakan cache untuk semua query',
        'Mengganti database relasional dengan key-value store',
      ],
      correctOptionIndex: 1,
      explanation:
        'Event Sourcing menyimpan setiap perubahan sebagai event, sehingga state dapat direkonstruksi dari urutan event tersebut.',
    },
    {
      id: 'q-02-08',
      order: 8,
      prompt: 'Pola manakah yang paling cocok untuk menukar algoritma sorting saat runtime?',
      options: ['Observer', 'Mediator', 'Strategy', 'Decorator'],
      correctOptionIndex: 2,
      explanation:
        'Strategy mengenkapsulasi berbagai algoritma sehingga dapat dipilih dan ditukar saat runtime.',
    },
  ],
}
