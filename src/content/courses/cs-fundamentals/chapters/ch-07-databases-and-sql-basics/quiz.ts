import type { Quiz } from '@/content/types'

export const ch07Quiz: Quiz = {
  id: 'quiz-ch-07-databases-and-sql-basics',
  title: 'Quiz: Basis Data dan SQL Dasar',
  passingScore: 8,
  questions: [
    {
      id: 'q-07-01',
      order: 1,
      prompt: 'Apa fungsi utama DBMS?',
      options: [
        'Mengelola data secara terstruktur dan aman',
        'Membuat tampilan website',
        'Menjalankan kode JavaScript',
        'Mengatur jaringan komputer',
      ],
      correctOptionIndex: 0,
      explanation:
        'DBMS (Database Management System) bertugas mengelola data secara terstruktur, aman, dan efisien, termasuk menyimpan, mengambil, memperbarui, dan menghapus data.',
    },
    {
      id: 'q-07-02',
      order: 2,
      prompt: 'Manakah dari berikut yang merupakan primary key?',
      options: [
        'Kolom yang bisa berisi nilai null',
        'Kolom yang mengidentifikasi setiap baris secara unik',
        'Kolom yang menyimpan teks panjang',
        'Kolom yang menghubungkan ke tabel lain',
      ],
      correctOptionIndex: 1,
      explanation:
        'Primary key adalah kolom atau kombinasi kolom yang mengidentifikasi setiap baris dalam tabel secara unik.',
    },
    {
      id: 'q-07-03',
      order: 3,
      prompt: 'Perintah SQL mana yang digunakan untuk membaca data?',
      options: ['INSERT', 'UPDATE', 'SELECT', 'DELETE'],
      correctOptionIndex: 2,
      explanation:
        'Perintah SELECT digunakan untuk membaca atau mengambil data dari tabel.',
    },
    {
      id: 'q-07-04',
      order: 4,
      prompt: 'Apa perbedaan utama antara INNER JOIN dan LEFT JOIN?',
      options: [
        'INNER JOIN selalu lebih cepat daripada LEFT JOIN',
        'LEFT JOIN hanya mengembalikan baris yang cocok di kedua tabel',
        'INNER JOIN hanya mengembalikan baris yang cocok di kedua tabel, LEFT JOIN mengembalikan semua baris tabel kiri',
        'Tidak ada perbedaan antara keduanya',
      ],
      correctOptionIndex: 2,
      explanation:
        'INNER JOIN mengembalikan hanya baris yang memiliki kecocokan di kedua tabel, sedangkan LEFT JOIN mengembalikan semua baris dari tabel kiri meskipun tidak cocok di tabel kanan.',
    },
    {
      id: 'q-07-05',
      order: 5,
      prompt: 'Apa tujuan utama index pada database?',
      options: [
        'Menambah kapasitas penyimpanan',
        'Mempercepat operasi tulis',
        'Mempercepat pencarian data',
        'Menghapus data secara otomatis',
      ],
      correctOptionIndex: 2,
      explanation:
        'Index dibuat untuk mempercepat pencarian data, meskipun operasi tulis menjadi sedikit lebih lambat karena index juga perlu diperbarui.',
    },
    {
      id: 'q-07-06',
      order: 6,
      prompt: 'Perintah SQL mana yang digunakan untuk mengubah data yang sudah ada?',
      options: ['ALTER', 'UPDATE', 'MODIFY', 'CHANGE'],
      correctOptionIndex: 1,
      explanation:
        'Perintah UPDATE digunakan untuk memperbarui nilai data yang sudah ada dalam tabel.',
    },
    {
      id: 'q-07-07',
      order: 7,
      prompt: 'Dalam sifat ACID pada transaksi, apa arti Atomicity?',
      options: [
        'Seluruh operasi dalam transaksi berhasil atau seluruhnya gagal',
        'Data selalu diisolasi dari pengguna lain',
        'Data tetap konsisten sesuai aturan setelah transaksi',
        'Hasil transaksi tahan terhadap kegagalan sistem',
      ],
      correctOptionIndex: 0,
      explanation:
        'Atomicity menjamin bahwa seluruh operasi dalam satu transaksi dieksekusi seluruhnya atau dibatalkan seluruhnya, sehingga tidak ada kondisi setengah jadi.',
    },
    {
      id: 'q-07-08',
      order: 8,
      prompt: 'Mengapa sebaiknya menghindari penggunaan SELECT * dalam query produksi?',
      options: [
        'Karena tidak valid secara sintaks SQL',
        'Karena bisa mengambil kolom yang tidak diperlukan dan memperlambat query',
        'Karena SELECT * hanya boleh digunakan di database NoSQL',
        'Karena SELECT * akan menghapus data yang tidak dipilih',
      ],
      correctOptionIndex: 1,
      explanation:
        'SELECT * mengambil semua kolom, termasuk yang mungkin tidak dibutuhkan. Hal ini membuang bandwidth, memperlambat query, dan mengurangi kemungkinan penggunaan index covering.',
    },
  ],
}
