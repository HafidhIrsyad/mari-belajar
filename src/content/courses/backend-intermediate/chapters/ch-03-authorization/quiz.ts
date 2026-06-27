import type { Quiz } from '@/content/types'

export const ch03Quiz: Quiz = {
  id: 'quiz-ch-03-authorization',
  title: 'Quiz: Authorization',
  passingScore: 8,
  questions: [
    {
      id: 'q-03-01',
      order: 1,
      prompt: 'Apa perbedaan autentikasi dan authorization?',
      options: [
        'Keduanya sama, hanya istilah berbeda',
        'Autentikasi memastikan siapa pengguna, authorization memutuskan apa yang boleh dilakukan',
        'Autentikasi memutuskan izin, authorization memverifikasi identitas',
        'Authorization selalu dilakukan sebelum autentikasi',
      ],
      correctOptionIndex: 1,
      explanation:
        'Autentikasi menjawab siapa, sedangkan authorization menjawab apa yang boleh dilakukan oleh pengguna yang sudah terautentikasi.',
    },
    {
      id: 'q-03-02',
      order: 2,
      prompt: 'Dalam RBAC, izin diberikan berdasarkan?',
      options: ['Atribut spesifik resource', 'Role yang dimiliki pengguna', 'Waktu akses', 'Alamat IP pengguna'],
      correctOptionIndex: 1,
      explanation:
        'RBAC memberikan izin berdasarkan role. Setiap role memiliki kumpulan permission yang kemudian dimiliki oleh user.',
    },
    {
      id: 'q-03-03',
      order: 3,
      prompt: 'Apa tujuan ownership check?',
      options: [
        'Memastikan pengguna hanya mengakses resource miliknya kecuali memiliki role khusus',
        'Menggantikan autentikasi',
        'Memeriksa apakah token sudah expired',
        'Mengatur CORS header',
      ],
      correctOptionIndex: 0,
      explanation:
        'Ownership check membandingkan ownerId resource dengan id pengguna saat ini, biasanya dengan pengecualian untuk admin.',
    },
    {
      id: 'q-03-04',
      order: 4,
      prompt: 'ABAC mengevaluasi kebijakan berdasarkan?',
      options: [
        'Hanya role pengguna',
        'Atribut subject, resource, action, dan environment',
        'Hanya waktu akses',
        'Hanya department pengguna',
      ],
      correctOptionIndex: 1,
      explanation:
        'ABAC memungkinkan aturan yang lebih ekspresif dengan mengevaluasi berbagai atribut seperti role, status resource, dan konteks environment.',
    },
    {
      id: 'q-03-05',
      order: 5,
      prompt: 'Apa keuntungan Row-Level Security (RLS) di PostgreSQL?',
      options: [
        'Mempercepat query tanpa indeks',
        'Kebijakan akses di tingkat baris dipaksa oleh database',
        'Menggantikan kebutuhan primary key',
        'Menonaktifkan transaksi',
      ],
      correctOptionIndex: 1,
      explanation:
        'RLS menambah lapangan pertahanan karena aturan akses di database, sehingga aplikasi dengan bug pun tidak dapat membaca baris yang dilarang.',
    },
    {
      id: 'q-03-06',
      order: 6,
      prompt: 'Policy-based authorization memisahkan aturan akses dari?',
      options: [
        'Database',
        'Kode aplikasi',
        'HTTP request',
        'Session store',
      ],
      correctOptionIndex: 1,
      explanation:
        'Dengan policy-based authorization, aturan ditulis terpisah sehingga dapat diubah tanpa memodifikasi kode aplikasi.',
    },
    {
      id: 'q-03-07',
      order: 7,
      prompt: 'ReBAC memberikan izin berdasarkan?',
      options: [
        'Hanya role statis',
        'Relasi antar entitas seperti owner, editor, atau parent folder',
        'Atribut environment semata',
        'Daftar IP yang diizinkan',
      ],
      correctOptionIndex: 1,
      explanation:
        'ReBAC memanfaatkan graf relasi antar entitas, misalnya pengguna boleh mengedit dokumen karena menjadi editor folder induknya.',
    },
    {
      id: 'q-03-08',
      order: 8,
      prompt: 'Mengapa decorator metadata seperti @Roles di NestJS berguna?',
      options: [
        'Karena menghilangkan kebutuhan guard',
        'Karena memungkinkan definisi izin di dekat route handler yang bersangkutan',
        'Karena otomatis mengenkripsi password',
        'Karena menggantikan JWT',
      ],
      correctOptionIndex: 1,
      explanation:
        'Metadata @Roles membuat aturan RBAC dekat dengan kode handler, sehingga guard dapat membacanya secara reflektif saat request masuk.',
    },
  ],
}
