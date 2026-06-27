import type { Quiz } from '@/content/types'

export const ch04Quiz: Quiz = {
  id: 'quiz-ch-04-rate-limiting-throttling',
  title: 'Quiz: Rate Limiting & Throttling',
  passingScore: 8,
  questions: [
    {
      id: 'q-04-01',
      order: 1,
      prompt: 'Apa perbedaan utama rate limiting dan throttling?',
      options: [
        'Rate limiting mempercepat request, throttling memperlambat',
        'Rate limiting menolak request melebihi batas; throttling memperlambat pemrosesan',
        'Throttling selalu menolak request, rate limiting tidak pernah menolak',
        'Keduanya identik',
      ],
      correctOptionIndex: 1,
      explanation:
        'Rate limiting menetapkan batas keras; throttling mengatur kecepatan agar sistem tidak kewalahan.',
    },
    {
      id: 'q-04-02',
      order: 2,
      prompt: 'Kelemahan utama fixed window adalah?',
      options: [
        'Tidak bisa dibatasi',
        'Burst request bisa terjadi di tepi window',
        'Membutuhkan Redis',
        'Tidak mendukung tiered limits',
      ],
      correctOptionIndex: 1,
      explanation:
        'Di akhir satu window dan awal window berikutnya, jumlah request bisa dua kali lipat dalam waktu singkat.',
    },
    {
      id: 'q-04-03',
      order: 3,
      prompt: 'Dalam token bucket, apa yang menentukan burst maksimum?',
      options: ['Rate pengisian', 'Kapasitas ember', 'Lebar window', 'Jumlah instance'],
      correctOptionIndex: 1,
      explanation:
        'Kapasitas ember menentukan jumlah token maksimum yang dapat dikonsumsi sekaligus, yaitu burst.',
    },
    {
      id: 'q-04-04',
      order: 4,
      prompt: 'Mengapa distributed rate limiter membutuhkan storage terpusat?',
      options: [
        'Agar lebih cepat dari in-memory',
        'Supaya semua instance berbagi counter yang sama',
        'Agar tidak perlu timeout',
        'Agar client tidak perlu autentikasi',
      ],
      correctOptionIndex: 1,
      explanation:
        'Tanpa storage terpusat, setiap instance memiliki batas sendiri sehingga total limit bisa dilanggar.',
    },
    {
      id: 'q-04-05',
      order: 5,
      prompt: 'Algoritma mana yang paling merata menghindari burst di tepi window?',
      options: ['Fixed window', 'Token bucket', 'Sliding window', 'Leaky bucket'],
      correctOptionIndex: 2,
      explanation:
        'Sliding window menghitung request dalam interval waktu yang terus bergerak sehingga distribusi lebih merata.',
    },
    {
      id: 'q-04-06',
      order: 6,
      prompt: 'Di Redis, operasi apa yang membantu memastikan atomicity pada rate limiter?',
      options: ['GET', 'SET', 'INCR', 'Lua script / EVAL'],
      correctOptionIndex: 3,
      explanation:
        'Lua script menjalankan beberapa perintah Redis secara atomik, mencegah race condition saat memeriksa dan menambah counter.',
    },
    {
      id: 'q-04-07',
      order: 7,
      prompt: 'Status HTTP apa yang biasanya dikembalikan saat rate limit terlampaui?',
      options: ['200 OK', '400 Bad Request', '429 Too Many Requests', '500 Internal Server Error'],
      correctOptionIndex: 2,
      explanation:
        'Status 429 Too Many Requests memberi tahu client bahwa batas request telah terlampaui.',
    },
    {
      id: 'q-04-08',
      order: 8,
      prompt: 'Adaptive throttling menyesuaikan batas berdasarkan?',
      options: [
        'Waktu dalam sehari',
        'Kondisi kesehatan downstream atau error rate',
        'Jumlah baris kode',
        'Ukuran payload setiap request',
      ],
      correctOptionIndex: 1,
      explanation:
        'Adaptive throttling menurunkan atau menaikkan batas sesuai kondisi sistem downstream.',
    },
  ],
}
