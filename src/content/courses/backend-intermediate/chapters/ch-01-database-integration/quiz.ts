import type { Quiz } from '@/content/types'

export const ch01Quiz: Quiz = {
  id: 'quiz-ch-01-database-integration',
  title: 'Quiz: Database Integration',
  passingScore: 8,
  questions: [
    {
      id: 'q-01-01',
      order: 1,
      prompt: 'Apa keuntungan utama menggunakan repository pattern?',
      options: [
        'Menghilangkan kebutuhan akan database',
        'Memisahkan logika akses data dari logika bisnis',
        'Membuat query SQL berjalan lebih cepat secara otomatis',
        'Mencegah semua jenis race condition',
      ],
      correctOptionIndex: 1,
      explanation:
        'Repository pattern membuat domain layer bergantung pada kontrak, bukan implementasi library database tertentu, sehingga lebih mudah diuji dan diganti.',
    },
    {
      id: 'q-01-02',
      order: 2,
      prompt: 'Mengapa parameterized query lebih aman daripada string concatenation?',
      options: [
        'Karena database tidak perlu melakukan parsing',
        'Karena nilai input dipisahkan dari query plan sehingga mencegah SQL injection',
        'Karena parameterized query selalu lebih cepat',
        'Karena tidak memerlukan koneksi pool',
      ],
      correctOptionIndex: 1,
      explanation:
        'Parameter dikirim terpisah dari SQL teks, sehingga database memperlakukannya sebagai nilai bukan sebagai bagian query, yang mencegah SQL injection.',
    },
    {
      id: 'q-01-03',
      order: 3,
      prompt: 'Apa yang terjadi jika transaksi gagal di tengah jalan dan tidak di-rollback?',
      options: [
        'Database otomatis menghapus semua tabel',
        'Beberapa perubahan bisa tertinggal dalam state setengah jadi',
        'Koneksi pool akan bertambah besar',
        'Query selanjutnya dijalankan lebih cepat',
      ],
      correctOptionIndex: 1,
      explanation:
        'Tanpa rollback, query yang sudah berhasil di dalam transaksi akan tetap diterapkan sebagian, melanggar atomicity dan bisa merusak konsistensi data.',
    },
    {
      id: 'q-01-04',
      order: 4,
      prompt: 'Level isolasi mana yang memberikan jaminan tertinggi terhadap interferensi antar transaksi?',
      options: ['Read Uncommitted', 'Read Committed', 'Repeatable Read', 'Serializable'],
      correctOptionIndex: 3,
      explanation:
        'Serializable memastikan hasil eksekusi konkuren setara dengan eksekusi serial, tetapi biasanya memiliki overhead locking atau validasi paling besar.',
    },
    {
      id: 'q-01-05',
      order: 5,
      prompt: 'Apa fungsi utama connection pool?',
      options: [
        'Menyimpan hasil query di memory',
        'Menyediakan koneksi database yang sudah dibuka agar dapat dipakai ulang',
        'Mengompresi data sebelum dikirim ke database',
        'Menggantikan peran transaction manager',
      ],
      correctOptionIndex: 1,
      explanation:
        'Connection pool mengurangi overhead pembukaan dan penutupan koneksi TCP dengan menyimpan koneksi siap pakai.',
    },
    {
      id: 'q-01-06',
      order: 6,
      prompt: 'Anti-pattern N+1 query terjadi ketika?',
      options: [
        'Satu query mengembalikan N kolom',
        'Satu query induk diikuti N query tambahan untuk data terkait',
        'N aplikasi membuka satu koneksi bersama',
        'Satu transaksi berisi N rollback',
      ],
      correctOptionIndex: 1,
      explanation:
        'N+1 query muncul saat kita mengambil daftar entitas lalu mengambil relasi masing-masing secara individual, menyebabkan lonjakan query.',
    },
    {
      id: 'q-01-07',
      order: 7,
      prompt: 'Mengapa prepared statement dapat meningkatkan performa?',
      options: [
        'Karena query dienkripsi sebelum dikirim',
        'Karena query plan dapat digunakan kembali untuk parameter berbeda',
        'Karena tidak memerlukan network round-trip',
        'Karena otomatis menambahkan indeks',
      ],
      correctOptionIndex: 1,
      explanation:
        'Database dapat menyimpan parsed query plan sehingga eksekusi berikutnya dengan parameter berbeda tidak perlu melalui parsing dan planning ulang.',
    },
    {
      id: 'q-01-08',
      order: 8,
      prompt: 'Dalam arsitektur database per service, integrasi antar service sebaiknya dilakukan dengan?',
      options: [
        'Query langsung ke tabel database service lain',
        'API atau event bus',
        'Shared foreign key antar database',
        'Menyalin seluruh schema ke setiap service',
      ],
      correctOptionIndex: 1,
      explanation:
        'Setiap service memiliki database sendiri untuk menjaga autonomy; integrasi dilakukan melalui API atau event, bukan akses langsung ke database lain.',
    },
  ],
}
