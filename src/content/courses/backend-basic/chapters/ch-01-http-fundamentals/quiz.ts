import type { Quiz } from '@/content/types'

export const ch01Quiz: Quiz = {
  id: 'quiz-ch-01-http-fundamentals',
  title: 'Quiz: HTTP Fundamentals',
  passingScore: 8,
  questions: [
    {
      id: 'q-01-01',
      order: 1,
      prompt: 'Manakah metode HTTP yang bersifat idempotent namun tidak safe?',
      options: ['GET', 'POST', 'PUT', 'PATCH'],
      correctOptionIndex: 2,
      explanation:
        'PUT idempotent karena mengganti sumber daya secara utuh sehingga hasilnya konsisten jika diulang, tetapi tidak safe karena mengubah state.',
    },
    {
      id: 'q-01-02',
      order: 2,
      prompt: 'Apa kegunaan utama header Content-Type?',
      options: [
        'Menentukan panjang body request',
        'Menyatakan format media dari body seperti application/json',
        'Menyimpan token autentikasi',
        'Mengaktifkan kompresi response',
      ],
      correctOptionIndex: 1,
      explanation:
        'Content-Type memberitahu penerima format representasi resource di dalam body, misalnya application/json atau text/html.',
    },
    {
      id: 'q-01-03',
      order: 3,
      prompt: 'Status code 401 Unauthorized menandakan apa?',
      options: [
        'Client tidak memiliki izin mengakses resource meskipun sudah terautentikasi',
        'Client harus mengirim kredensial yang valid terlebih dahulu',
        'Resource yang diminta tidak ditemukan',
        'Server mengalami kesalahan internal',
      ],
      correctOptionIndex: 1,
      explanation:
        '401 menunjukkan bahwa autentikasi diperlukan dan belum berhasil atau tidak disertakan; berbeda dengan 403 yang berarti akses dilarang.',
    },
    {
      id: 'q-01-04',
      order: 4,
      prompt: 'Dalam three-way handshake TCP, urutan flag yang benar adalah?',
      options: ['SYN → SYN-ACK → ACK', 'ACK → SYN → SYN-ACK', 'SYN → ACK → FIN', 'FIN → ACK → SYN'],
      correctOptionIndex: 0,
      explanation:
        'Client mengirim SYN, server membalas SYN-ACK, dan client menyelesaikan dengan ACK untuk membangun koneksi TCP.',
    },
    {
      id: 'q-01-05',
      order: 5,
      prompt: 'TLS handshake pada TLS 1.3 mengurangi round-trip dibanding TLS 1.2 karena?',
      options: [
        'Menghilangkan enkripsi sepenuhnya',
        'Menggabungkan key exchange dengan autentikasi server dalam satu round-trip',
        'Menggunakan UDP alih-alih TCP',
        'Tidak memverifikasi sertifikat server',
      ],
      correctOptionIndex: 1,
      explanation:
        'TLS 1.3 menyederhanakan algoritma dan menggabungkan langkah sehingga handshake dapat selesai dalam 1-RTT atau bahkan 0-RTT untuk sesi berulang.',
    },
    {
      id: 'q-01-06',
      order: 6,
      prompt: 'Masalah head-of-line (HOL) blocking di HTTP/1.1 paling sering disebabkan oleh?',
      options: [
        'Header yang terlalu besar',
        'Pengiriman request berurutan dalam satu koneksi persistent tanpa multiplexing',
        'Penggunaan metode GET',
        'Kurangnya header Cache-Control',
      ],
      correctOptionIndex: 1,
      explanation:
        'HTTP/1.1 persistent connection mengirim request secara berurutan, sehingga request besar di depan dapat memblokir request di belakangnya.',
    },
    {
      id: 'q-01-07',
      order: 7,
      prompt: 'Apa keunggulan utama HTTP/2 multiplexing?',
      options: [
        'Mengurangi ukuran header secara otomatis',
        'Memungkinkan banyak stream request/response secara paralel dalam satu koneksi TCP',
        'Mengganti TCP dengan protokol QUIC',
        'Menonaktifkan TLS',
      ],
      correctOptionIndex: 1,
      explanation:
        'HTTP/2 membagi komunikasi menjadi frame-frame biner yang dapat diinterleave melalui banyak stream dalam satu koneksi TCP.',
    },
    {
      id: 'q-01-08',
      order: 8,
      prompt: 'HTTP/3 dibangun di atas transport layer apa?',
      options: ['TCP', 'UDP dengan QUIC', 'TLS saja', 'IP langsung'],
      correctOptionIndex: 1,
      explanation:
        'HTTP/3 menggunakan QUIC yang berjalan di atas UDP, memisahkan handshake transport dari TLS dan mengurangi latency saat reconnect.',
    },
  ],
}
