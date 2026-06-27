import type { Quiz } from '@/content/types'

export const ch06Quiz: Quiz = {
  id: 'quiz-ch-06-middleware-cross-cutting',
  title: 'Quiz: Middleware & Cross-Cutting Concerns',
  passingScore: 8,
  questions: [
    {
      id: 'q-06-01',
      order: 1,
      prompt: 'Signature middleware Express yang benar adalah?',
      options: [
        'function(req, res)',
        'function(err, req, res, next)',
        'function(req, res, next)',
        'function(next)',
      ],
      correctOptionIndex: 2,
      explanation:
        'Middleware standar Express menerima req, res, dan next untuk melanjutkan ke middleware berikutnya.',
    },
    {
      id: 'q-06-02',
      order: 2,
      prompt: 'Apa fungsi next() di Express middleware?',
      options: [
        'Menghentikan server',
        'Melanjutkan eksekusi ke middleware atau handler berikutnya',
        'Mengembalikan response ke client',
        'Membuka koneksi database baru',
      ],
      correctOptionIndex: 1,
      explanation:
        'Memanggil next() memberi tahu framework untuk melanjutkan ke middleware/handler berikutnya dalam stack.',
    },
    {
      id: 'q-06-03',
      order: 3,
      prompt: 'Helmet.js umumnya digunakan untuk?',
      options: [
        'Parsing JSON body',
        'Menambah security header seperti CSP dan X-Frame-Options',
        'Mengelola file upload',
        'Menjalankan query database',
      ],
      correctOptionIndex: 1,
      explanation:
        'Helmet membantu mengatur HTTP security headers untuk mengurangi risiko XSS, clickjacking, dan serangan umum lainnya.',
    },
    {
      id: 'q-06-04',
      order: 4,
      prompt: 'Request ID paling berguna untuk?',
      options: [
        'Menggantikan password',
        'Mengidentifikasi dan melacak satu request melintasi log dan layanan',
        'Menyimpan data session',
        'Mengompres response',
      ],
      correctOptionIndex: 1,
      explanation:
        'Request ID yang sama disertakan di setiap log entry sehingga alur request dapat ditelusuri saat debugging.',
    },
    {
      id: 'q-06-05',
      order: 5,
      prompt: 'Rate limiting umumnya membatasi berdasarkan?',
      options: [
        'Ukuran response',
        'Jumlah request dari client dalam jangka waktu tertentu',
        'Jumlah karakter di header',
        'Versi browser',
      ],
      correctOptionIndex: 1,
      explanation:
        'Rate limiter membatasi berapa banyak request yang boleh dikirim client per detik/menit untuk mencegah abuse.',
    },
    {
      id: 'q-06-06',
      order: 6,
      prompt: 'Mengapa urutan middleware penting?',
      options: [
        'Urutan tidak penting karena semua middleware berjalan paralel',
        'Middleware dieksekusi berurutan saat request masuk dan terbalik saat response keluar',
        'Hanya middleware pertama yang dieksekusi',
        'Urutan hanya memengaruhi log',
      ],
      correctOptionIndex: 1,
      explanation:
        'Middleware stack berjalan secara berurutan; urutan menentukan kapan autentikasi, parsing, logging, dan error handling dieksekusi.',
    },
    {
      id: 'q-06-07',
      order: 7,
      prompt: 'Observability middleware biasanya mencakup?',
      options: [
        'Parsing HTML saja',
        'Logging, metrics, dan tracing',
        'Menghapus database',
        'Mengganti CSS response',
      ],
      correctOptionIndex: 1,
      explanation:
        'Observability middleware mengumpulkan data untuk memantau kesehatan dan kinerja aplikasi.',
    },
    {
      id: 'q-06-08',
      order: 8,
      prompt: 'Di NestJS, middleware autentikasi serupa dengan konsep?',
      options: ['Guard', 'Pipe', 'Interceptor', 'Filter'],
      correctOptionIndex: 0,
      explanation:
        'Guard di NestJS menentukan apakah request boleh dijalankan berdasarkan kondisi seperti autentikasi atau otorisasi.',
    },
  ],
}
