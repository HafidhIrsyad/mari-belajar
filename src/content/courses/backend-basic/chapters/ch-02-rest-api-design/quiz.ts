import type { Quiz } from '@/content/types'

export const ch02Quiz: Quiz = {
  id: 'quiz-ch-02-rest-api-design',
  title: 'Quiz: REST API Design',
  passingScore: 8,
  questions: [
    {
      id: 'q-02-01',
      order: 1,
      prompt: 'Endpoint manakah yang paling sesuai dengan prinsip REST resource-first?',
      options: ['POST /createUser', 'GET /getUsers', 'GET /users', 'POST /users/new'],
      correctOptionIndex: 2,
      explanation:
        'REST menggunakan noun di URL; GET /users merepresentasikan koleksi user dan mengambil daftarnya.',
    },
    {
      id: 'q-02-02',
      order: 2,
      prompt: 'Metode HTTP apa yang tepat untuk mengganti seluruh resource?',
      options: ['PATCH', 'POST', 'PUT', 'DELETE'],
      correctOptionIndex: 2,
      explanation:
        'PUT digunakan untuk full replacement resource. PATCH untuk partial update, POST untuk create, DELETE untuk remove.',
    },
    {
      id: 'q-02-03',
      order: 3,
      prompt: 'Strategi versioning API mana yang paling tidak mengganggu client lama?',
      options: [
        'Menghapus endpoint lama segera setelah versi baru rilis',
        'Menggunakan path versioning seperti /v1/users dan /v2/users',
        'Mengubah status code default',
        'Menghapus header Content-Type',
      ],
      correctOptionIndex: 1,
      explanation:
        'Path versioning membuat kontrak versi terlihat eksplisit di URL sehingga client dapat tetap mengakses /v1 sambil beralih ke /v2.',
    },
    {
      id: 'q-02-04',
      order: 4,
      prompt: 'Parameter query mana yang umum digunakan untuk pagination?',
      options: ['action=next', 'page dan limit', 'cmd=paginate', 'order=desc'],
      correctOptionIndex: 1,
      explanation:
        'page dan limit adalah konvensi paling umum untuk offset-based pagination, meski cursor-based lebih disukai untuk dataset besar.',
    },
    {
      id: 'q-02-05',
      order: 5,
      prompt: 'Apa tujuan utama HATEOAS dalam response REST?',
      options: [
        'Menyembunyikan URL endpoint dari client',
        'Menyediakan link navigasi ke state dan aksi yang tersedia',
        'Menggantikan kebutuhan autentikasi',
        'Mempercepat serialisasi JSON',
      ],
      correctOptionIndex: 1,
      explanation:
        'HATEOAS menyertakan link relasi sehingga client dapat menavigasi aplikasi tanpa hard-code URL.',
    },
    {
      id: 'q-02-06',
      order: 6,
      prompt: 'Mengapa idempotency key penting untuk request POST pembayaran?',
      options: [
        'Agar request lebih cepat',
        'Mencegah duplikasi transaksi saat client melakukan retry',
        'Mengganti kebutuhan header Accept',
        'Agar server tidak perlu validasi',
      ],
      correctOptionIndex: 1,
      explanation:
        'Idempotency key memungkinkan server mengenali request ulang dan mengembalikan hasil yang sama tanpa mengeksekusi ulang side effect.',
    },
    {
      id: 'q-02-07',
      order: 7,
      prompt: 'Dokumen OpenAPI umumnya ditulis dalam format apa?',
      options: ['XML', 'YAML atau JSON', 'Markdown', 'HTML'],
      correctOptionIndex: 1,
      explanation:
        'Spesifikasi OpenAPI mendukung format YAML dan JSON untuk mendeskripsikan endpoint, skema, dan operasi API.',
    },
    {
      id: 'q-02-08',
      order: 8,
      prompt: 'Response 201 Created biasanya disertai dengan?',
      options: [
        'Header Location menunjuk ke resource baru',
        'Body kosong tanpa metadata',
        'Status text Bad Request',
        'Header Authorization baru',
      ],
      correctOptionIndex: 0,
      explanation:
        '201 Created mengindikasikan resource berhasil dibuat; header Location sering disertakan untuk menunjuk URL resource baru.',
    },
  ],
}
