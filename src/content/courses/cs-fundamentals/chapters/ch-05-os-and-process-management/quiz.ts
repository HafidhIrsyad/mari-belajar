import type { Quiz } from '@/content/types'

export const ch05Quiz: Quiz = {
  id: 'quiz-ch-05-os-and-process-management',
  title: 'Quiz: Sistem Operasi dan Manajemen Proses',
  passingScore: 8,
  questions: [
    {
      id: 'q-05-01',
      order: 1,
      prompt: 'Apa peran utama sistem operasi sebagai abstraksi?',
      options: [
        'Menyembunyikan kerumitan perangkat keras dari aplikasi',
        'Menghapus file yang tidak digunakan',
        'Mengompilasi kode sumber menjadi executable',
        'Mengenkripsi seluruh data di disk',
      ],
      correctOptionIndex: 0,
      explanation:
        'Abstraksi berarti sistem operasi menyediakan antarmuka sederhana sehingga aplikasi tidak perlu berurusan langsung dengan kerumitan perangkat keras.',
    },
    {
      id: 'q-05-02',
      order: 2,
      prompt: 'Perbedaan utama program dan proses adalah:',
      options: [
        'Program berjalan di CPU, proses tersimpan di disk',
        'Program adalah file statis, proses adalah program yang sedang dieksekusi',
        'Program memiliki PID, proses tidak memiliki PID',
        'Program hanya berisi data, proses hanya berisi instruksi',
      ],
      correctOptionIndex: 1,
      explanation:
        'Program adalah kumpulan instruksi yang tersimpan di disk, sedangkan proses adalah instansi program yang sedang berjalan dan memiliki state serta PID.',
    },
    {
      id: 'q-05-03',
      order: 3,
      prompt: 'State mana yang menunjukkan proses sedang menunggu giliran CPU?',
      options: ['New', 'Ready', 'Running', 'Waiting'],
      correctOptionIndex: 1,
      explanation:
        'State Ready berarti proses sudah siap dijalankan tetapi sedang menunggu scheduler memberikan giliran CPU.',
    },
    {
      id: 'q-05-04',
      order: 4,
      prompt: 'Dalam scheduling Round Robin, apa yang terjadi jika proses belum selesai saat time slice habis?',
      options: [
        'Proses dihentikan permanen',
        'Proses dipindahkan ke antrean ready dan menunggu giliran berikutnya',
        'Proses mendapatkan time slice tambahan secara otomatis',
        'Proses menunggu sampai semua proses lain terminated',
      ],
      correctOptionIndex: 1,
      explanation:
        'Round Robin memberikan time slice yang sama kepada setiap proses. Jika proses belum selesai, ia kembali ke antrean ready untuk mendapat giliran berikutnya.',
    },
    {
      id: 'q-05-05',
      order: 5,
      prompt: 'Mengapa thread lebih ringan dibanding proses?',
      options: [
        'Karena thread tidak membutuhkan CPU',
        'Karena thread dalam proses yang sama berbagi memori dan sumber daya',
        'Karena thread selalu berjalan lebih cepat dari proses',
        'Karena thread tidak memiliki stack sendiri',
      ],
      correctOptionIndex: 1,
      explanation:
        'Thread dalam satu proses berbagi ruang memori dan sumber daya, sehingga pembuatan serta pergantian antar thread lebih ringan dibanding proses yang terpisah.',
    },
    {
      id: 'q-05-06',
      order: 6,
      prompt: 'Apa karakteristik utama concurrency?',
      options: [
        'Banyak tugas benar-benar berjalan pada waktu yang bersamaan di banyak core',
        'Banyak tugas sedang berlangsung dalam periode waktu tertentu, tidak harus bersamaan',
        'Hanya satu tugas yang boleh berjalan dalam satu waktu',
        'Semua tugas harus menunggu I/O selesai sebelum dijalankan',
      ],
      correctOptionIndex: 1,
      explanation:
        'Concurrency berarti banyak tugas sedang diproses dalam periode tertentu melalui pergantian cepat, meskipun tidak semua benar-benar berjalan bersamaan.',
    },
    {
      id: 'q-05-07',
      order: 7,
      prompt: 'Mekanisme apa yang memungkinkan proses terisolasi saling bertukar data?',
      options: [
        'Inline caching',
        'Inter-Process Communication (IPC)',
        'Garbage collection',
        'Bit shifting',
      ],
      correctOptionIndex: 1,
      explanation:
        'IPC adalah mekanisme seperti pipes, message queues, shared memory, dan sockets yang memungkinkan proses terpisah saling bertukar informasi.',
    },
    {
      id: 'q-05-08',
      order: 8,
      prompt: 'Apa fungsi sync.WaitGroup pada contoh Go sebelumnya?',
      options: [
        'Menghentikan semua goroutine secara paksa',
        'Menunggu sampai semua goroutine yang diluncurkan selesai bekerja',
        'Menyimpan hasil perhitungan dari setiap goroutine',
        'Mengatur prioritas eksekusi antar goroutine',
      ],
      correctOptionIndex: 1,
      explanation:
        'sync.WaitGroup digunakan untuk menunggu sekelompok goroutine menyelesaikan pekerjaannya sebelum program melanjutkan atau berakhir.',
    },
  ],
}
