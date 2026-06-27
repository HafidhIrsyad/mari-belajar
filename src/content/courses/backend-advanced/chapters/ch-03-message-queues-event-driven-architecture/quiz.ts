import type { Quiz } from '@/content/types'

export const ch03Quiz: Quiz = {
  id: 'quiz-ch-03-message-queues-event-driven-architecture',
  title: 'Quiz: Message Queues & Event-Driven Architecture',
  passingScore: 8,
  questions: [
    {
      id: 'q-03-01',
      order: 1,
      prompt: 'Apa fungsi utama message queue dalam arsitektur terdistribusi?',
      options: [
        'Menggantikan database utama',
        'Mendesakpling producer dan consumer serta meratakan lonjakan beban',
        'Menyimpan session pengguna',
        'Menjamin exactly-once delivery tanpa idempotency',
      ],
      correctOptionIndex: 1,
      explanation:
        'Queue memisahkan waktu dan lokasi pemrosesan sehingga sistem lebih resilient terhadap lonjakan traffic.',
    },
    {
      id: 'q-03-02',
      order: 2,
      prompt: 'Dalam model pub/sub, satu pesan ke topik akan?',
      options: [
        'Diterima oleh tepat satu consumer',
        'Diterima oleh semua subscriber yang berlangganan topik',
        'Disimpan hanya selama consumer online',
        'Otomatis dihapus setelah publish',
      ],
      correctOptionIndex: 1,
      explanation:
        'Pub/sub mengirim salinan pesan ke setiap subscriber, berbeda dengan queue yang biasanya hanya satu consumer.',
    },
    {
      id: 'q-03-03',
      order: 3,
      prompt: 'Delivery guarantee mana yang memungkinkan pesan sama diproses lebih dari sekali?',
      options: ['At-most-once', 'At-least-once', 'Exactly-once', 'None-once'],
      correctOptionIndex: 1,
      explanation:
        'At-least-once menjamin pesan sampai tetapi bisa duplikat; oleh karena itu consumer harus idempoten.',
    },
    {
      id: 'q-03-04',
      order: 4,
      prompt: 'Apa tujuan idempotency pada consumer?',
      options: [
        'Meningkatkan throughput pesan',
        'Memastikasi pemrosesan berulang menghasilkan state yang sama',
        'Menghapus pesan dari queue lebih cepat',
        'Mengganti kebutuhan retry',
      ],
      correctOptionIndex: 1,
      explanation:
        'Idempoten mencegah kerusakan data akibat duplikasi pesan pada sistem at-least-once.',
    },
    {
      id: 'q-03-05',
      order: 5,
      prompt: 'Pola apa yang memisahkan model baca dan tulis?',
      options: ['Event sourcing', 'Outbox', 'CQRS', 'Saga'],
      correctOptionIndex: 2,
      explanation:
        'CQRS (Command Query Responsibility Segregation) memisahkan model dan optimalisasi untuk command dan query.',
    },
    {
      id: 'q-03-06',
      order: 6,
      prompt: 'Pola mana yang menyimpan state sebagai urutan event immutable?',
      options: ['CQRS', 'Saga', 'Event sourcing', 'Outbox'],
      correctOptionIndex: 2,
      explanation:
        'Event sourcing menyimpan state sebagai log event yang dapat di-replay untuk rebuild state.',
    },
    {
      id: 'q-03-07',
      order: 7,
      prompt: 'Outbox pattern digunakan untuk?',
      options: [
        'Menyimpan cache hasil query',
        'Menjamin atomisitas antara database update dan publish event',
        'Menggantikan message broker',
        'Meningkatkan throughput HTTP',
      ],
      correctOptionIndex: 1,
      explanation:
        'Outbox menyimpan pesan dalam tabel database yang sama dengan business data, lalu relay mengirimkannya ke broker.',
    },
    {
      id: 'q-03-08',
      order: 8,
      prompt: 'Dalam saga pattern, apa yang dilakukan jika satu langkah gagal?',
      options: [
        'Langkah berikutnya tetap dijalankan',
        'Compensating transaction mengeksekusi untuk membatalkan langkah sebelumnya',
        'Seluruh saga diulang dari awal',
        'Database di-lock selamanya',
      ],
      correctOptionIndex: 1,
      explanation:
        'Saga mengelola long-running transaction dengan compensating action jika terjadi kegagalan di salah satu langkah.',
    },
  ],
}
