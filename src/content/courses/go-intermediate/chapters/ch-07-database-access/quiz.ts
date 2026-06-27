import type { Quiz } from '@/content/types'

export const ch07Quiz: Quiz = {
  id: 'quiz-ch-07-database-access',
  title: 'Quiz: Database Access dasar (database/sql)',
  passingScore: 8,
  questions: [
    {
      id: 'q-07-01',
      order: 1,
      prompt: 'Apa yang sebenarnya direpresentasikan oleh tipe sql.DB?',
      options: [
        'Satu koneksi database',
        'Sebuah connection pool',
        'Sebuah query builder',
        'Sebuah ORM',
      ],
      correctOptionIndex: 1,
      explanation:
        'sql.DB adalah connection pool yang mengelola banyak koneksi secara otomatis.',
    },
    {
      id: 'q-07-02',
      order: 2,
      prompt: 'Method mana yang digunakan untuk perintah INSERT, UPDATE, atau DELETE?',
      options: [
        'Query',
        'QueryRow',
        'Exec',
        'Fetch',
      ],
      correctOptionIndex: 2,
      explanation:
        'Exec digunakan untuk perintah SQL yang tidak mengembalikan baris, seperti INSERT, UPDATE, dan DELETE.',
    },
    {
      id: 'q-07-03',
      order: 3,
      prompt: 'Mengapa penting menutup Rows setelah Query?',
      options: [
        'Agar query berhasil',
        'Mengembalikan koneksi ke pool dan mencegah kebocoran koneksi',
        'Agar hasil query tersimpan',
        'Tidak penting',
      ],
      correctOptionIndex: 1,
      explanation:
        'Menutup Rows mengembalikan koneksi yang dipinjam ke pool sehingga bisa digunakan kembali.',
    },
    {
      id: 'q-07-04',
      order: 4,
      prompt: 'Fungsi apa yang memulai sebuah transaksi?',
      options: [
        'db.Transaction()',
        'db.Begin()',
        'db.StartTx()',
        'db.OpenTx()',
      ],
      correctOptionIndex: 1,
      explanation:
        'db.Begin() memulai transaksi baru dan mengembalikan *sql.Tx.',
    },
    {
      id: 'q-07-05',
      order: 5,
      prompt: 'Apa kegunaan defer tx.Rollback()?',
      options: [
        'Selalu membatalkan transaksi',
        'Membatalkan transaksi jika belum commit, misalnya karena error',
        'Menutup koneksi database',
        'Melakukan commit otomatis',
      ],
      correctOptionIndex: 1,
      explanation:
        'Setelah Commit, Rollback menjadi no-op. Defer Rollback memastikan transaksi dibatalkan jika terjadi error sebelum commit.',
    },
    {
      id: 'q-07-06',
      order: 6,
      prompt: 'Konfigurasi pool mana yang membatasi jumlah koneksi terbuka ke database?',
      options: [
        'SetMaxIdleConns',
        'SetConnMaxLifetime',
        'SetMaxOpenConns',
        'SetConnMaxIdleTime',
      ],
      correctOptionIndex: 2,
      explanation:
        'SetMaxOpenConns menentukan jumlah maksimum koneksi yang boleh terbuka bersamaan.',
    },
    {
      id: 'q-07-07',
      order: 7,
      prompt: 'Mengapa menggunakan method QueryContext daripada Query?',
      options: [
        'Lebih cepat',
        'Mendukung pembatalan operasi jika context dibatalkan',
        'Tidak memerlukan parameter',
        'Otomatis menggunakan transaksi',
      ],
      correctOptionIndex: 1,
      explanation:
        'Versi Context-aware memungkinkan query dibatalkan saat timeout atau shutdown, mencegah query menggantung.',
    },
    {
      id: 'q-07-08',
      order: 8,
      prompt: 'Manfaat utama repository pattern dalam akses database?',
      options: [
        'Meningkatkan performa query secara otomatis',
        'Memisahkan logika akses data dari logika bisnis dan memudahkan testing',
        'Menghilangkan kebutuhan akan SQL',
        'Otomatis membuka koneksi database',
      ],
      correctOptionIndex: 1,
      explanation:
        'Repository pattern mendefinisikan interface akses data, memungkinkan pergantian implementasi dan penggunaan mock saat testing.',
    },
  ],
}
