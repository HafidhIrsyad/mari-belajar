import type { Quiz } from '@/content/types'

export const ch07Quiz: Quiz = {
  id: 'quiz-ch-07-concurrency-parallelism-js-ts',
  title: 'Quiz: Concurrency & Parallelism in JS/TS',
  passingScore: 8,
  questions: [
    {
      id: 'q-07-01',
      order: 1,
      prompt: 'Apa perbedaan utama concurrency dan parallelism?',
      options: [
        'Concurrency berarti menjalankan task secara bersamaan di core berbeda',
        'Concurrency adalah bergantian menangani task; parallelism adalah menjalankan task secara bersamaan',
        'Concurrency hanya ada di Go; parallelism hanya ada di JavaScript',
        'Keduanya sinonim',
      ],
      correctOptionIndex: 1,
      explanation:
        'Concurrency menangani banyak task dengan interleaving, sedangkan parallelism menjalankan task secara simultan pada hardware terpisah.',
    },
    {
      id: 'q-07-02',
      order: 2,
      prompt: 'API browser apa yang memungkinkan eksekusi JavaScript di thread terpisah?',
      options: ['setTimeout', 'Web Worker', 'fetch', 'requestAnimationFrame'],
      correctOptionIndex: 1,
      explanation:
        'Web Worker menjalankan script di thread latar belakang, memungkinkan parallelism di browser.',
    },
    {
      id: 'q-07-03',
      order: 3,
      prompt: 'Mengapa ArrayBuffer yang ditransfer melalui postMessage tidak valid lagi di pengirim?',
      options: [
        'Karena worker menghapusnya secara otomatis',
        'Ownership memori dipindahkan untuk menghindari copy besar',
        'Karena postMessage hanya menerima string',
        'Karena ArrayBuffer tidak dapat dibagi',
      ],
      correctOptionIndex: 1,
      explanation:
        'Transferables memindahkan ownership ke penerima, sehingga tidak ada duplikasi memori dan pengirim tidak lagi boleh mengaksesnya.',
    },
    {
      id: 'q-07-04',
      order: 4,
      prompt: 'Apa fungsi Atomics pada SharedArrayBuffer?',
      options: [
        'Membuat salinan buffer untuk setiap thread',
        'Menyediakan operasi read-modify-write yang thread-safe',
        'Menghentikan semua worker',
        'Mengkonversi buffer menjadi JSON',
      ],
      correctOptionIndex: 1,
      explanation:
        'Atomics memastikan operasi pada shared memory tidak terinterupsi oleh thread lain.',
    },
    {
      id: 'q-07-05',
      order: 5,
      prompt: 'Masalah apa yang diatasi oleh mekanisme backpressure di streams?',
      options: [
        'Koneksi network yang terputus',
        'Producer yang membanjiri consumer dengan data',
        'Parsing JSON yang gagal',
        'Race condition pada DOM',
      ],
      correctOptionIndex: 1,
      explanation:
        'Backpressure memperlambat producer ketika consumer tidak mampu memproses data secepat data datang.',
    },
    {
      id: 'q-07-06',
      order: 6,
      prompt: 'Module Node.js apa yang digunakan untuk membuat thread tambahan?',
      options: ['cluster', 'worker_threads', 'child_process', 'os'],
      correctOptionIndex: 1,
      explanation:
        '`worker_threads` menyediakan API untuk membuat thread di dalam satu proses Node.js.',
    },
    {
      id: 'q-07-07',
      order: 7,
      prompt: 'Model concurrency apa yang menjadi dasar Go?',
      options: [
        'Actor Model',
        'Communicating Sequential Processes (CSP)',
        'Shared Memory dengan Mutex',
        'Event Loop Callbacks',
      ],
      correctOptionIndex: 1,
      explanation:
        'Go menganut CSP, di mana goroutine berkomunikasi melalui channel daripada berbagi memori secara langsung.',
    },
    {
      id: 'q-07-08',
      order: 8,
      prompt: 'Objek apa yang digunakan untuk membatalkan fetch atau operasi async di JavaScript?',
      options: [
        'Promise.reject',
        'AbortController',
        'clearTimeout',
        'EventEmitter',
      ],
      correctOptionIndex: 1,
      explanation:
        '`AbortController` menghasilkan signal yang dapat diteruskan ke fetch atau helper async untuk membatalkan operasi.',
    },
  ],
}
