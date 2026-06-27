import type { Quiz } from '@/content/types'

export const ch05Quiz: Quiz = {
  id: 'quiz-ch-05-response-error-handling',
  title: 'Quiz: Response & Error Handling',
  passingScore: 8,
  questions: [
    {
      id: 'q-05-01',
      order: 1,
      prompt: 'Apa keuntungan format error yang konsisten di seluruh API?',
      options: [
        'Client harus menulis parser berbeda untuk setiap endpoint',
        'Client dapat menangani error secara generik dan andal',
        'Server tidak perlu mengembalikan status code',
        'Error menjadi lebih sulit dibaca manusia',
      ],
      correctOptionIndex: 1,
      explanation:
        'Format error seragam memungkinkan client membuat interceptor dan UI error handling yang reusable.',
    },
    {
      id: 'q-05-02',
      order: 2,
      prompt: 'RFC 7807 Problem Details merekomendasikan field wajib apa?',
      options: ['type', 'title', 'status', 'detail'],
      correctOptionIndex: 2,
      explanation:
        'Hanya status yang wajib dalam Problem Details; title, type, detail, dan instance direkomendasikan.',
    },
    {
      id: 'q-05-03',
      order: 3,
      prompt: 'Global exception filter di NestJS bertugas?',
      options: [
        'Menggantikan semua controller',
        'Menangkap exception dan mengubahnya menjadi response error standar',
        'Menghapus semua log error',
        'Mematikan server saat terjadi exception',
      ],
      correctOptionIndex: 1,
      explanation:
        'Exception filter menangkap exception yang tidak ditangani dan mengembalikan response JSON dengan format yang konsisten.',
    },
    {
      id: 'q-05-04',
      order: 4,
      prompt: 'Field instance pada Problem Details biasanya berisi?',
      options: [
        'Nama database',
        'URI yang mengidentifikasi kejadian error spesifik',
        'Password yang menyebabkan error',
        'Versi framework',
      ],
      correctOptionIndex: 1,
      explanation:
        'instance berisi identifier unik untuk kejadian error tersebut, membantu debugging tanpa mengekspos detail internal.',
    },
    {
      id: 'q-05-05',
      order: 5,
      prompt: 'Error 500 Internal Server Error sebaiknya mengandung informasi apa?',
      options: [
        'Stack trace lengkap ke client',
        'Pesan generik dan log detail di server',
        'Password dan secret key',
        'Query database asli',
      ],
      correctOptionIndex: 1,
      explanation:
        'Stack trace dan query sensitif hanya boleh masuk log server; client menerima pesan generik untuk alasan keamanan.',
    },
    {
      id: 'q-05-06',
      order: 6,
      prompt: 'Prinsip 12factor.net tentang logging menyatakan?',
      options: [
        'Aplikasi harus menulis log ke file lokal',
        'Aplikasi harus mengirim log sebagai stream event ke stdout/stderr',
        'Log tidak perlu dibuat sama sekali',
        'Log hanya boleh berisi error',
      ],
      correctOptionIndex: 1,
      explanation:
        'Aplikasi tidak mengelola file log; log ditulis ke stdout/stderr dan environment menangani agregasi serta rotasi.',
    },
    {
      id: 'q-05-07',
      order: 7,
      prompt: 'Retry hint paling umum disampaikan melalui?',
      options: [
        'Header Retry-After',
        'Header Content-Length',
        'Body HTML',
        'Cookie',
      ],
      correctOptionIndex: 0,
      explanation:
        'Retry-After memberi tahu client kapan boleh mencoba ulang, biasanya bersama status 429 atau 503.',
    },
    {
      id: 'q-05-08',
      order: 8,
      prompt: 'Error mana yang umumnya tidak retryable?',
      options: ['503 Service Unavailable', '429 Too Many Requests', '400 Bad Request', '502 Bad Gateway'],
      correctOptionIndex: 2,
      explanation:
        '400 Bad Request menandakan request client tidak valid; mengulang tanpa perubahan tidak akan berhasil.',
    },
  ],
}
