import type { Quiz } from '@/content/types'

export const ch05Quiz: Quiz = {
  id: 'quiz-ch-05-async-processing-background-jobs',
  title: 'Quiz: Async Processing & Background Jobs',
  passingScore: 8,
  questions: [
    {
      id: 'q-05-01',
      order: 1,
      prompt: 'Kapan sebaiknya menggunakan background job?',
      options: [
        'Untuk semua endpoint agar response selalu cepat',
        'Untuk pekerjaan lambat yang tidak perlu ditunggu user',
        'Untuk menggantikan semua query database',
        'Hanya untuk mengirim error log',
      ],
      correctOptionIndex: 1,
      explanation:
        'Background job cocok untuk pekerjaan tidak kritis untuk response, seperti mengirim email, memproses file, atau menghitung laporan.',
    },
    {
      id: 'q-05-02',
      order: 2,
      prompt: 'Apa fungsi retry dengan backoff exponential?',
      options: [
        'Menghapus job yang gagal',
        'Mengulang job dengan jeda yang semakin lama untuk mengurangi beban sistem',
        'Memastikan job hanya diproses sekali',
        'Menghentikan worker secara paksa',
      ],
      correctOptionIndex: 1,
      explanation:
        'Backoff exponential memberikan jeda yang semakin panjang antar percobaan sehingga sistem yang sedang bermasalah tidak langsung kembali dibanjiri.',
    },
    {
      id: 'q-05-03',
      order: 3,
      prompt: 'Mengapa worker harus idempoten?',
      options: [
        'Karena queue umumnya menjamin at-least-once delivery',
        'Karena job tidak pernah gagal',
        'Karena retry tidak diperbolehkan',
        'Karena worker selalu berjalan di satu instance',
      ],
      correctOptionIndex: 0,
      explanation:
        'Job mungkin diproses lebih dari sekali karena retry atau redelivery. Idempotency memastikan hasil akhir tetap benar.',
    },
    {
      id: 'q-05-04',
      order: 4,
      prompt: 'Apa tujuan dead letter queue?',
      options: [
        'Menyimpan job yang berhasil',
        'Menyimpan job yang gagal setelah maksimum retry untuk inspeksi manual',
        'Menghapus job yang belum diproses',
        'Menggandakan job ke worker lain',
      ],
      correctOptionIndex: 1,
      explanation:
        'Dead letter queue menyimpan job yang benar-benar gagal sehingga engineer dapat mendiagnosis dan memproses ulang jika diperlukan.',
    },
    {
      id: 'q-05-05',
      order: 5,
      prompt: 'Outbox pattern menyelesaikan masalah apa?',
      options: [
        'Dual-write antara database dan message broker',
        'Kurangnya koneksi Redis',
        'Race condition di browser',
        'Kehilangan session cookie',
      ],
      correctOptionIndex: 0,
      explanation:
        'Outbox pattern menulis perubahan data dan event dalam satu transaksi database, lalu relay mengirim event ke broker untuk menghindari dual-write.',
    },
    {
      id: 'q-05-06',
      order: 6,
      prompt: 'Semantik exactly-once pada praktiknya biasanya diimplementasikan sebagai?',
      options: [
        'At-most-once + retry tanpa batas',
        'At-least-once delivery + idempotency di aplikasi',
        'Tidak memproses pesan yang duplikat',
        'Menyimpan semua pesan di satu queue global',
      ],
      correctOptionIndex: 1,
      explanation:
        'Exactly-once sulit dicapai secara global; biasanya sistem menjamin at-least-once dan aplikasi menangani duplikat dengan idempotency.',
    },
    {
      id: 'q-05-07',
      order: 7,
      prompt: 'Dalam saga pattern, kompensasi digunakan untuk?',
      options: [
        'Mempercepat transaksi',
        'Membatalkan efek langkah sebelumnya jika satu langkah gagal',
        'Mengunci resource agar tidak berubah',
        'Menggandakan event ke semua service',
      ],
      correctOptionIndex: 1,
      explanation:
        'Kompensasi adalah operasi pembatalan yang dijalankan untuk mengembalikan sistem ke state konsisten saat saga gagal di tengah jalan.',
    },
    {
      id: 'q-05-08',
      order: 8,
      prompt: 'Mengapa graceful shutdown penting untuk worker?',
      options: [
        'Agar worker dapat memulai lebih cepat',
        'Agar pekerjaan yang sedang berjalan dapat diselesaikan sebelum proses berhenti',
        'Agar queue otomatis terhapus',
        'Agar tidak perlu menyimpan log',
      ],
      correctOptionIndex: 1,
      explanation:
        'Graceful shutdown memberi waktu pada worker untuk menyelesaikan job aktif sebelum ditutup, mengurangi kehilangan pekerjaan dan duplikasi.',
    },
  ],
}
