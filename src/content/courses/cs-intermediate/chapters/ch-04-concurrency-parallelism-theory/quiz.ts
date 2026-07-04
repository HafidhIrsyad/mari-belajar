import type { Quiz } from '@/content/types'

export const ch04Quiz: Quiz = {
  id: 'quiz-ch-04-concurrency-parallelism-theory',
  title: 'Quiz: Teori Concurrency & Parallelism',
  passingScore: 8,
  questions: [
    {
      id: 'q-04-01',
      order: 1,
      prompt: 'Perbedaan utama process dan thread adalah?',
      options: [
        'Thread memiliki ruang alamat terpisah',
        'Process berbagi memori; thread memiliki ruang alamat sendiri',
        'Process memiliki ruang alamat terpisah; thread berbagi memori dalam satu process',
        'Tidak ada perbedaan',
      ],
      correctOptionIndex: 2,
      explanation:
        'Process adalah unit isolasi dengan ruang alamat sendiri. Thread dalam process yang sama berbagi heap dan ruang alamat, tetapi memiliki stack dan register sendiri.',
    },
    {
      id: 'q-04-02',
      order: 2,
      prompt: 'Race condition terjadi ketika?',
      options: [
        'Dua thread berjalan pada CPU berbeda',
        'Hasil program bergantung pada urutan eksekusi konkuren yang tidak deterministik',
        'Thread selesai sebelum thread lain dimulai',
        'Process menggunakan terlalu banyak memori',
      ],
      correctOptionIndex: 1,
      explanation:
        'Race condition muncul saat beberapa thread mengakses data bersama tanpa sinkronisasi, dan hasil akhir bergantung pada timing eksekusi.',
    },
    {
      id: 'q-04-03',
      order: 3,
      prompt: 'Fungsi utama mutex adalah?',
      options: [
        'Menjalankan thread secara paralel',
        'Melindungi critical section agar hanya satu thread yang mengakses pada satu waktu',
        'Mengalokasikan memori heap',
        'Menghentikan semua thread sekaligus',
      ],
      correctOptionIndex: 1,
      explanation:
        'Mutex (mutual exclusion lock) memastikan hanya satu thread yang memegang lock dan mengakses critical section pada satu waktu.',
    },
    {
      id: 'q-04-04',
      order: 4,
      prompt: 'Semaphore berbeda dari mutex karena?',
      options: [
        'Semaphore tidak bisa digunakan untuk sinkronisasi',
        'Semaphore mengizinkan lebih dari satu thread mengakses resource secara terbatas',
        'Semaphore hanya ada di JavaScript',
        'Semaphore selalu lebih lambat',
      ],
      correctOptionIndex: 1,
      explanation:
        'Mutex adalah binary semaphore (0 atau 1). Semaphore umum memiliki counter yang mengizinkan N thread mengakses resource bersamaan.',
    },
    {
      id: 'q-04-05',
      order: 5,
      prompt: 'Salah satu dari empat kondisi Coffman untuk deadlock adalah?',
      options: [
        'Preemption wajib',
        'Circular wait',
        'Single threading',
        'Garbage collection',
      ],
      correctOptionIndex: 1,
      explanation:
        'Empat kondisi Coffman: mutual exclusion, hold and wait, no preemption, dan circular wait. Semua harus terpenuhi agar deadlock terjadi.',
    },
    {
      id: 'q-04-06',
      order: 6,
      prompt: 'Relasi happens-before menjamin?',
      options: [
        'Thread berjalan lebih cepat',
        'Perubahan memori oleh satu operasi terlihat oleh operasi berikutnya',
        'Tidak ada race condition',
        'Deadlock tidak mungkin terjadi',
      ],
      correctOptionIndex: 1,
      explanation:
        'Happens-before mendefinisikan ordering parsial: jika A happens-before B, maka efek A terlihat oleh B. Tanpa relasi ini, reordering compiler/CPU dapat menyebabkan hasil tak terduga.',
    },
    {
      id: 'q-04-07',
      order: 7,
      prompt: 'Paradigma CSP (Communicating Sequential Processes) menekankan?',
      options: [
        'Shared mutable state antar thread',
        'Komunikasi melalui message passing, bukan berbagi memori',
        'Single-threaded execution',
        'Polling busy-wait',
      ],
      correctOptionIndex: 1,
      explanation:
        'CSP (Hoare) dan model serupa (seperti actor model) menghindari shared mutable state; proses berkomunikasi dengan mengirim dan menerima pesan melalui channel.',
    },
    {
      id: 'q-04-08',
      order: 8,
      prompt: 'Strategi mencegah deadlock dengan mematahkan kondisi circular wait adalah?',
      options: [
        'Menghapus semua mutex',
        'Total ordering pada resource — semua thread meminta lock dalam urutan yang sama',
        'Menambah jumlah thread',
        'Menggunakan global variable tanpa lock',
      ],
      correctOptionIndex: 1,
      explanation:
        'Dengan total ordering, tidak mungkin terbentuk lingkaran menunggu karena semua thread meminta resource dalam urutan konsisten, mematahkan circular wait.',
    },
  ],
}
