import type { Quiz } from '@/content/types'

export const ch03Quiz: Quiz = {
  id: 'quiz-ch-03-error-handling-debugging',
  title: 'Quiz: Error Handling & Debugging',
  passingScore: 8,
  questions: [
    {
      id: 'q-03-01',
      order: 1,
      prompt: 'Blok mana yang selalu dijalankan baik terjadi error maupun tidak?',
      options: [
        'try',
        'catch',
        'finally',
        'throw',
      ],
      correctOptionIndex: 2,
      explanation:
        'finally selalu dijalankan setelah try dan catch, bahkan jika try memiliki return statement.',
    },
    {
      id: 'q-03-02',
      order: 2,
      prompt: 'Properti apa pada Error object yang menunjukkan urutan pemanggilan fungsi saat error terjadi?',
      options: [
        'message',
        'name',
        'stack',
        'cause',
      ],
      correctOptionIndex: 2,
      explanation:
        'stack berisi stack trace yang menunjukkan urutan fungsi yang dipanggil hingga error terjadi.',
    },
    {
      id: 'q-03-03',
      order: 3,
      prompt: 'Bagaimana cara menyimpan error asli saat wrapping error baru?',
      options: [
        'Menggunakan error.stack = original',
        'Menggunakan { cause: originalError } pada constructor Error',
        'Menggunakan error.parent = original',
        'Tidak memungkinkan di JavaScript',
      ],
      correctOptionIndex: 1,
      explanation:
        'Opsi cause pada constructor Error mempertahankan referensi error asli sehingga root cause bisa dilacak.',
    },
    {
      id: 'q-03-04',
      order: 4,
      prompt: 'Apa keuntungan structured logging dibandingkan log teks bebas?',
      options: [
        'Lebih mudah dibaca manusia saja',
        'Bisa diparse dan dianalisis oleh tool observability',
        'Selalu lebih singkat',
        'Tidak memerlukan timestamp',
      ],
      correctOptionIndex: 1,
      explanation:
        'Structured logging dalam format seperti JSON memudahkan filtering, aggregasi, dan alerting otomatis.',
    },
    {
      id: 'q-03-05',
      order: 5,
      prompt: 'Apa fungsi type guard seperti isAppError(error) di TypeScript?',
      options: [
        'Menangkap error secara otomatis',
        'Mempersempit tipe unknown menjadi AppError setelah pengecekan',
        'Menghapus error dari memory',
        'Mengubah error menjadi string',
      ],
      correctOptionIndex: 1,
      explanation:
        'Type guard memastikan TypeScript mempersempit tipe setelah fungsi mengembalikan true, sehingga property spesifik bisa diakses.',
    },
    {
      id: 'q-03-06',
      order: 6,
      prompt: 'Panel DevTools mana yang cocok untuk menganalisis memory leak?',
      options: [
        'Console',
        'Network',
        'Memory',
        'Elements',
      ],
      correctOptionIndex: 2,
      explanation:
        'Panel Memory menyediakan heap snapshot untuk melihat objek yang bertahan dan mendeteksi kebocoran memori.',
    },
    {
      id: 'q-03-07',
      order: 7,
      prompt: 'Apa kegunaan async stack traces di V8?',
      options: [
        'Mempercepat eksekusi Promise',
        'Menyertakan frame asynchronous dalam stack trace error',
        'Menghilangkan error di dalam Promise',
        'Mengganti callback dengan async/await',
      ],
      correctOptionIndex: 1,
      explanation:
        'Async stack traces membantu melacak error yang melintasi batas synchronous/asynchronous sehingga pemanggil awal tetap terlihat.',
    },
    {
      id: 'q-03-08',
      order: 8,
      prompt: 'Mengapa disarankan menggunakan error codes daripada error.message langsung untuk user-facing text?',
      options: [
        'Karena message selalu kosong',
        'Karena codes lebih mudah diterjemahkan dan distabilkan',
        'Karena message tidak bisa dibaca',
        'Karena codes menghilangkan stack trace',
      ],
      correctOptionIndex: 1,
      explanation:
        'Error codes stabil memudahkan localisasi dan testing, sedangkan message teknis bisa berubah tanpa mengubah logika bisnis.',
    },
  ],
}
