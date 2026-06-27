import type { Quiz } from '@/content/types'

export const ch06Quiz: Quiz = {
  id: 'quiz-ch-06-networking-and-internet-protocols',
  title: 'Quiz: Jaringan Komputer dan Protokol Internet',
  passingScore: 8,
  questions: [
    {
      id: 'q-06-01',
      order: 1,
      prompt: 'Dalam model client-server, peran utama server adalah:',
      options: [
        'Meminta data dari perangkat lain',
        'Menyediakan data atau layanan sebagai respons terhadap permintaan client',
        'Menerjemahkan nama domain menjadi IP address',
        'Menyimpan cache browser di perangkat pengguna',
      ],
      correctOptionIndex: 1,
      explanation:
        'Server adalah komputer yang menyediakan data atau layanan. Client mengirim permintaan, lalu server memberikan respons.',
    },
    {
      id: 'q-06-02',
      order: 2,
      prompt: 'Apa fungsi utama DNS?',
      options: [
        'Mengenkripsi data antara client dan server',
        'Menerjemahkan nama domain menjadi IP address',
        'Memastikan packet data sampai dengan urutan yang benar',
        'Menentukan port yang digunakan oleh aplikasi',
      ],
      correctOptionIndex: 1,
      explanation:
        'DNS (Domain Name System) menerjemahkan nama domain yang mudah diingat, seperti google.com, menjadi IP address agar data dapat dikirim ke tujuan.',
    },
    {
      id: 'q-06-03',
      order: 3,
      prompt: 'HTTP method manakah yang umum digunakan untuk membaca data dari server?',
      options: ['GET', 'POST', 'PUT', 'DELETE'],
      correctOptionIndex: 0,
      explanation:
        'Method GET digunakan untuk mengambil atau membaca data dari server sesuai URL yang diminta.',
    },
    {
      id: 'q-06-04',
      order: 4,
      prompt: 'Status code HTTP 404 berarti:',
      options: [
        'Server error',
        'Request berhasil diproses',
        'Resource tidak ditemukan',
        'Akses ditolak karena tidak terautentikasi',
      ],
      correctOptionIndex: 2,
      explanation:
        'Status code 404 Not Found menandakan bahwa resource yang diminta oleh client tidak dapat ditemukan di server.',
    },
    {
      id: 'q-06-05',
      order: 5,
      prompt: 'Perbedaan utama antara TCP dan UDP adalah:',
      options: [
        'TCP lebih cepat daripada UDP',
        'UDP menjamin urutan dan keberhasilan pengiriman data',
        'TCP menjamin pengiriman data berurutan, sedangkan UDP lebih cepat tetapi tidak menjamin',
        'UDP hanya digunakan untuk DNS, sementara TCP untuk semua layanan lain',
      ],
      correctOptionIndex: 2,
      explanation:
        'TCP melakukan handshake dan retransmisi sehingga data sampai berurutan dan terjamin. UDP lebih ringan dan cepat, tetapi tidak menjamin pengiriman.',
    },
    {
      id: 'q-06-06',
      order: 6,
      prompt: 'Mengapa port penting dalam komunikasi jaringan?',
      options: [
        'Port mengidentifikasi perangkat secara unik di internet',
        'Port membedakan layanan atau proses yang berbeda di satu perangkat',
        'Port menentukan apakah data dienkripsi atau tidak',
        'Port digunakan untuk mengubah nama domain menjadi IP address',
      ],
      correctOptionIndex: 1,
      explanation:
        'Port adalah nomor yang membedakan layanan, seperti HTTP di port 80 dan HTTPS di port 443, sehingga satu perangkat bisa menjalankan banyak layanan sekaligus.',
    },
    {
      id: 'q-06-07',
      order: 7,
      prompt: 'Apa manfaat utama menggunakan HTTPS dibandingkan HTTP?',
      options: [
        'HTTPS selalu lebih cepat daripada HTTP',
        'HTTPS mengenkripsi data saat transit antara client dan server',
        'HTTPS menghilangkan kebutuhan akan DNS',
        'HTTPS membuat URL menjadi lebih pendek',
      ],
      correctOptionIndex: 1,
      explanation:
        'HTTPS menggunakan TLS untuk mengenkripsi data, sehingga pihak ketiga yang menyadap jaringan tidak dapat membaca isi komunikasi.',
    },
    {
      id: 'q-06-08',
      order: 8,
      prompt: 'Dalam desain REST API, prinsip yang benar adalah:',
      options: [
        'URL harus menyatakan aksi, seperti /getUser?id=123',
        'Setiap request harus menyimpan status client di server',
        'URL merepresentasikan resource dan HTTP method menyatakan operasi',
        'Response harus selalu dalam format XML',
      ],
      correctOptionIndex: 2,
      explanation:
        'REST API bersifat resource-oriented, di mana URL seperti /users/123 merepresentasikan resource, sedangkan method GET/POST/PUT/DELETE menyatakan operasi.',
    },
  ],
}
