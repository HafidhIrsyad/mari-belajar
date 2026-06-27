import type { Quiz } from '@/content/types'

export const ch03Quiz: Quiz = {
  id: 'quiz-ch-03-routing-controllers',
  title: 'Quiz: Routing & Controllers',
  passingScore: 8,
  questions: [
    {
      id: 'q-03-01',
      order: 1,
      prompt: 'Apa perbedaan path parameter dan query parameter?',
      options: [
        'Path parameter opsional, query parameter wajib',
        'Path parameter bagian dari URL, query parameter setelah tanda tanya',
        'Keduanya sama, hanya penamaan berbeda',
        'Query parameter hanya bisa dipakai di metode POST',
      ],
      correctOptionIndex: 1,
      explanation:
        'Path parameter seperti /users/42 adalah bagian dari route, sedangkan query parameter seperti ?page=2 dilewatkan setelah tanda tanya.',
    },
    {
      id: 'q-03-02',
      order: 2,
      prompt: 'Fungsi utama controller dalam arsitektur backend adalah?',
      options: [
        'Mengelola koneksi database langsung',
        'Menjadi penengah antara request HTTP dan logika bisnis/service',
        'Menyimpan secret key aplikasi',
        'Menjalankan migrasi schema database',
      ],
      correctOptionIndex: 1,
      explanation:
        'Controller menerima request, memanggil service, lalu membentuk response. Ia memisahkan transport layer dari domain logic.',
    },
    {
      id: 'q-03-03',
      order: 3,
      prompt: 'Apa tujuan middleware grouping?',
      options: [
        'Menambah jumlah route secara otomatis',
        'Menerapkan middleware tertentu pada sekelompok route tanpa mengulang kode',
        'Mengganti bahasa pemrograman di tengah aplikasi',
        'Menghapus semua route yang tidak aktif',
      ],
      correctOptionIndex: 1,
      explanation:
        'Dengan grouping, middleware seperti auth atau logger dapat dipasang pada prefix tertentu, misalnya /api/v1/admin.',
    },
    {
      id: 'q-03-04',
      order: 4,
      prompt: 'Manakah contoh route parameter yang valid untuk /users/:id/orders/:orderId?',
      options: [
        '/users?id=1/orders',
        '/users/1/orders/99',
        '/users/orders/1/99',
        '/users/1?orderId=99',
      ],
      correctOptionIndex: 1,
      explanation:
        'Segmen :id dan :orderId diisi secara berurutan, menghasilkan /users/1/orders/99.',
    },
    {
      id: 'q-03-05',
      order: 5,
      prompt: 'Dependency injection membantu testing karena?',
      options: [
        'Test menjadi lebih cepat tanpa setup',
        'Dependency asli dapat diganti dengan mock saat unit test',
        'Server tidak perlu dijalankan saat test',
        'Semua kode otomatis terdokumentasi',
      ],
      correctOptionIndex: 1,
      explanation:
        'Dengan DI, class menerima dependency dari luar sehingga kita dapat menyuntikkan stub atau mock untuk isolasi unit test.',
    },
    {
      id: 'q-03-06',
      order: 6,
      prompt: 'Header Accept pada request digunakan untuk?',
      options: [
        'Mengirim kredensial login',
        'Memberitahu server format response yang diinginkan client',
        'Menyimpan session ID',
        'Mengaktifkan kompresi gzip',
      ],
      correctOptionIndex: 1,
      explanation:
        'Accept menyatakan media type yang dapat diterima client, misalnya application/json atau text/html.',
    },
    {
      id: 'q-03-07',
      order: 7,
      prompt: 'CORS preflight request umumnya menggunakan metode?',
      options: ['GET', 'POST', 'OPTIONS', 'PUT'],
      correctOptionIndex: 2,
      explanation:
        'Browser mengirim OPTIONS preflight untuk memeriksa izin server sebelum request non-simple seperti PUT dengan custom header.',
    },
    {
      id: 'q-03-08',
      order: 8,
      prompt: 'Apa risiko utama jika CORS dikonfigurasi dengan origin wildcard (*) dan credentials true?',
      options: [
        'Browser akan menolak kombinasi tersebut karena tidak aman',
        'Response menjadi lebih cepat',
        'Server tidak dapat membaca header',
        'Tidak ada risiko karena wildcard sudah default aman',
      ],
      correctOptionIndex: 0,
      explanation:
        'Browser melarang Access-Control-Allow-Origin: * bersama withCredentials karena membuka celah CSRF. Origin harus dispesifikasi eksplisit.',
    },
  ],
}
