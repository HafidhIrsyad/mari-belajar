import type { Quiz } from '@/content/types'

export const ch06Quiz: Quiz = {
  id: 'quiz-ch-06-network-protocols-theory',
  title: 'Quiz: Teori Protokol Jaringan',
  passingScore: 8,
  questions: [
    {
      id: 'q-06-01',
      order: 1,
      prompt: 'Lapisan OSI mana yang menangani routing antar jaringan?',
      options: ['Data Link (L2)', 'Network (L3)', 'Transport (L4)', 'Application (L7)'],
      correctOptionIndex: 1,
      explanation:
        'Lapisan Network (L3) — protokol IP — bertanggung jawab mengalamatkan dan routing paket antar jaringan berbeda.',
    },
    {
      id: 'q-06-02',
      order: 2,
      prompt: 'Urutan three-way handshake TCP yang benar adalah?',
      options: ['ACK → SYN → SYN-ACK', 'SYN → SYN-ACK → ACK', 'SYN → ACK → FIN', 'SYN-ACK → SYN → ACK'],
      correctOptionIndex: 1,
      explanation:
        'Client mengirim SYN, server merespons SYN-ACK, client mengirim ACK — baru koneksi established.',
    },
    {
      id: 'q-06-03',
      order: 3,
      prompt: 'Perbedaan utama flow control dan congestion control?',
      options: [
        'Flow control melindungi penerima; congestion control melindungi jaringan',
        'Keduanya identik',
        'Flow control hanya untuk UDP',
        'Congestion control hanya untuk DNS',
      ],
      correctOptionIndex: 0,
      explanation:
        'Receive window (flow control) mencegah pengirim membanjiri buffer penerima. Congestion window menyesuaikan rate berdasarkan kondisi jaringan.',
    },
    {
      id: 'q-06-04',
      order: 4,
      prompt: 'Router memilih rute dengan?',
      options: [
        'Shortest hostname match',
        'Longest prefix match pada routing table',
        'Random selection',
        'Alphabetical order interface',
      ],
      correctOptionIndex: 1,
      explanation:
        'Longest prefix match: dari entri routing yang cocok dengan destination IP, pilih prefix terpanjang (paling spesifik).',
    },
    {
      id: 'q-06-05',
      order: 5,
      prompt: 'Fungsi utama NAT adalah?',
      options: [
        'Mengenkripsi paket TCP',
        'Menerjemahkan alamat IP/port private ke public agar dapat di-route di internet',
        'Menggantikan DNS',
        'Mempercepat HTTP/2 multiplexing',
      ],
      correctOptionIndex: 1,
      explanation:
        'NAT memetakan banyak perangkat LAN dengan IP private ke satu atau beberapa IP public, dengan port mapping untuk koneksi balik.',
    },
    {
      id: 'q-06-06',
      order: 6,
      prompt: 'Dalam rantai DNS, siapa yang mengembalikan A record untuk api.example.com?',
      options: [
        'Root nameserver langsung',
        'Authoritative nameserver untuk example.com',
        'Browser cache saja',
        'Router default gateway',
      ],
      correctOptionIndex: 1,
      explanation:
        'Recursive resolver menelusuri root → TLD → authoritative NS. Authoritative server untuk zone example.com yang menyimpan dan mengembalikan record A.',
    },
    {
      id: 'q-06-07',
      order: 7,
      prompt: 'TCP slow start bertujuan untuk?',
      options: [
        'Menghapus handshake',
        'Meningkatkan congestion window secara eksponensial hingga mendeteksi kapasitas jaringan',
        'Mematikan flow control',
        'Mengganti IP dengan hostname',
      ],
      correctOptionIndex: 1,
      explanation:
        'Slow start: cwnd dimulai kecil dan digandakan setiap RTT sampai threshold atau packet loss — menemukan bandwidth available secara aman.',
    },
    {
      id: 'q-06-08',
      order: 8,
      prompt: 'Protokol transport mana yang connectionless dan tidak guaranteed delivery?',
      options: ['TCP', 'UDP', 'TLS', 'HTTP'],
      correctOptionIndex: 1,
      explanation:
        'UDP tidak membangun koneksi dan tidak menjamin delivery atau ordering — cocok untuk use case latency-sensitive dengan toleransi loss.',
    },
  ],
}
