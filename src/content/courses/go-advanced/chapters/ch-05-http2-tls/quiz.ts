import type { Quiz } from '@/content/types'

export const ch05Quiz: Quiz = {
  id: 'quiz-ch-05-http2-tls',
  title: 'Quiz: Advanced HTTP/2, TLS & Network Internals',
  passingScore: 8,
  questions: [
    {
      id: 'q-05-01',
      order: 1,
      prompt: 'Berapa RTT yang dibutuhkan TLS 1.3 untuk full handshake?',
      options: [
        '0-RTT',
        '1-RTT',
        '2-RTT',
        '3-RTT',
      ],
      correctOptionIndex: 1,
      explanation:
        'TLS 1.3 mempersingkat full handshake menjadi 1-RTT, dan mendukung 0-RTT untuk session resumption.',
    },
    {
      id: 'q-05-02',
      order: 2,
      prompt: 'Apa fungsi utama HTTP/2 multiplexing?',
      options: [
        'Mengompresi body request',
        'Mengirim banyak request/response dalam satu koneksi TCP secara parallel',
        'Mengganti TCP dengan UDP',
        'Menghapus header dari request',
      ],
      correctOptionIndex: 1,
      explanation:
        'Multiplexing HTTP/2 memungkinkan banyak stream dalam satu koneksi TCP, mengatasi head-of-line blocking HTTP/1.1.',
    },
    {
      id: 'q-05-03',
      order: 3,
      prompt: 'Apa singkatan dari HPACK?',
      options: [
        'HTTP Parallel Acknowledgement',
        'Header Compression for HTTP/2',
        'HTTP Packet Checksum',
        'High Performance Application Cache',
      ],
      correctOptionIndex: 1,
      explanation:
        'HPACK adalah Header Compression for HTTP/2 yang menggunakan static table, dynamic table, dan Huffman encoding.',
    },
    {
      id: 'q-05-04',
      order: 4,
      prompt: 'Apa peran ALPN dalam TLS handshake?',
      options: [
        'Mengenkripsi body request',
        'Negosiasi protokol aplikasi seperti h2 atau http/1.1',
        'Memvalidasi certificate chain',
        'Mengatur DNS resolution',
      ],
      correctOptionIndex: 1,
      explanation:
        'ALPN (Application-Layer Protocol Negotiation) digunakan untuk memilih protokol aplikasi selama TLS handshake.',
    },
    {
      id: 'q-05-05',
      order: 5,
      prompt: 'Di protokol transport apa HTTP/3 berjalan?',
      options: [
        'TCP',
        'UDP via QUIC',
        'SCTP',
        'WebSocket',
      ],
      correctOptionIndex: 1,
      explanation:
        'HTTP/3 berjalan di atas QUIC, yang dibangun di atas UDP.',
    },
    {
      id: 'q-05-06',
      order: 6,
      prompt: 'Field mana pada http.Transport yang mengatur jumlah idle connection per host?',
      options: [
        'MaxIdleConns',
        'MaxIdleConnsPerHost',
        'IdleConnTimeout',
        'TLSHandshakeTimeout',
      ],
      correctOptionIndex: 1,
      explanation:
        'MaxIdleConnsPerHost membatasi jumlah idle connection yang disimpan untuk setiap host.',
    },
    {
      id: 'q-05-07',
      order: 7,
      prompt: 'Apa risiko utama dari TLS 1.3 0-RTT?',
      options: [
        'Meningkatkan latency',
        'Potensi replay attack',
        'Menonaktifkan enkripsi',
        'Tidak kompatibel dengan HTTP/2',
      ],
      correctOptionIndex: 1,
      explanation:
        '0-RTT mengurangi latency tetapi data awal bisa direplay oleh attacker, sehingga tidak cocok untuk request yang mengubah state.',
    },
    {
      id: 'q-05-08',
      order: 8,
      prompt: 'Mengapa tidak disarankan membuat http.Client baru untuk setiap request?',
      options: [
        'Agar setiap request memiliki header berbeda',
        'Karena kehilangan connection pooling dan idle connection reuse',
        'Agar timeout selalu default',
        'Karena http.Client tidak thread-safe',
      ],
      correctOptionIndex: 1,
      explanation:
        'http.Client yang baru setiap request tidak bisa memanfaatkan connection pooling, menyebabkan pembuatan koneksi berulang dan performa buruk.',
    },
  ],
}
