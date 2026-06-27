import type { Quiz } from '@/content/types'

export const ch06Quiz: Quiz = {
  id: 'quiz-ch-06-asynchronous-javascript',
  title: 'Quiz: Asynchronous JavaScript',
  passingScore: 8,
  questions: [
    {
      id: 'q-06-01',
      order: 1,
      prompt: 'Mengapa pemrograman asynchronous penting di JavaScript?',
      options: [
        'Agar operasi lambat tidak memblokir eksekusi kode lain',
        'Agar JavaScript bisa berjalan di banyak thread secara otomatis',
        'Agar variabel dapat diubah nilainya secara asynchronous',
        'Agar fungsi selalu mengembalikan nilai boolean',
      ],
      correctOptionIndex: 0,
      explanation:
        'JavaScript single-threaded. Asynchronous memungkinkan operasi seperti jaringan atau timer berjalan di latar belakang tanpa memblokir thread utama.',
    },
    {
      id: 'q-06-02',
      order: 2,
      prompt: 'Apa yang dimaksud dengan callback hell?',
      options: [
        'Kondisi saat banyak callback bersarang terlalu dalam sehingga kode sulit dibaca',
        'Error yang muncul saat callback tidak dipanggil',
        'Keadaan ketika setInterval berjalan tanpa henti',
        'Promise yang ditolak secara berantai',
      ],
      correctOptionIndex: 0,
      explanation:
        'Callback hell terjadi ketika callback diletakkan di dalam callback secara berulang, menyebabkan kode bersarang dan sulit dipelihara.',
    },
    {
      id: 'q-06-03',
      order: 3,
      prompt: 'Method mana yang digunakan untuk menangani kegagalan pada Promise?',
      options: ['.then()', '.catch()', '.finally()', '.resolve()'],
      correctOptionIndex: 1,
      explanation:
        'Method .catch() dipanggil ketika Promise berada di state rejected atau terjadi error di dalam rantai then.',
    },
    {
      id: 'q-06-04',
      order: 4,
      prompt: 'Apa hasil dari Promise.all([p1, p2]) jika salah satu Promise gagal?',
      options: [
        'Hasil berhasil tetap dikembalikan tanpa Promise yang gagal',
        'Promise.all langsung rejected dengan error dari Promise yang gagal',
        'Promise.all mengabaikan error dan melanjutkan ke then',
        'Promise.all menunggu semua Promise selesai meskipun ada yang gagal',
      ],
      correctOptionIndex: 1,
      explanation:
        'Promise.all menunggu semua Promise selesai, tetapi jika salah satu rejected, hasil keseluruhan langsung rejected dengan error tersebut.',
    },
    {
      id: 'q-06-05',
      order: 5,
      prompt: 'Fungsi yang dideklarasikan dengan kata kunci async selalu mengembalikan:',
      options: [
        'Sebuah nilai string',
        'Sebuah object biasa',
        'Sebuah Promise',
        'Sebuah callback',
      ],
      correctOptionIndex: 2,
      explanation:
        'Fungsi async selalu mengembalikan Promise, meskipun di dalamnya kita mengembalikan nilai biasa.',
    },
    {
      id: 'q-06-06',
      order: 6,
      prompt: 'Di manakah penanganan error yang paling idiomatik untuk async/await?',
      options: [
        'Menggunakan .catch() setelah setiap await',
        'Menggunakan try/catch di sekitar kode yang mungkin gagal',
        'Mengabaikan error karena async/await tidak bisa gagal',
        'Menggunakan callback sebagai argumen kedua await',
      ],
      correctOptionIndex: 1,
      explanation:
        'Dengan async/await, error ditangkap secara alami menggunakan blok try/catch seperti pada kode synchronous.',
    },
    {
      id: 'q-06-07',
      order: 7,
      prompt: 'Dalam event loop, tugas Promise.then umumnya berada di:',
      options: [
        'Call stack',
        'Task queue (macrotask)',
        'Microtask queue',
        'Global execution context',
      ],
      correctOptionIndex: 2,
      explanation:
        'Callback Promise.then dan catch masuk ke microtask queue, yang diproses sebelum task queue macrotask seperti setTimeout.',
    },
    {
      id: 'q-06-08',
      order: 8,
      prompt: 'Apa fungsi utama channel di Go saat dibandingkan dengan Promise di JavaScript?',
      options: [
        'Channel menyimpan nilai tetap yang tidak bisa diubah',
        'Channel digunakan untuk komunikasi antar goroutine secara aman',
        'Channel menggantikan fungsi main di Go',
        'Channel hanya berjalan di single thread seperti JavaScript',
      ],
      correctOptionIndex: 1,
      explanation:
        'Di Go, channel adalah mekanisme komunikasi antar goroutine. Konsep ini berbeda dengan Promise yang merepresentasikan nilai masa depan di JavaScript.',
    },
  ],
}
