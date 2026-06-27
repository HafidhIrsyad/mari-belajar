import type { Quiz } from '@/content/types'

export const ch04Quiz: Quiz = {
  id: 'quiz-ch-04-logging-monitoring-observability',
  title: 'Quiz: Logging, Monitoring & Observability',
  passingScore: 8,
  questions: [
    {
      id: 'q-04-01',
      order: 1,
      prompt: 'Apa keuntungan structured logging dibanding log bebas?',
      options: [
        'Ukuran file lebih kecil',
        'Lebih mudah di-parse, di-query, dan dikorelasikan',
        'Tidak memerlukan timestamp',
        'Otomatis menghapus log lama',
      ],
      correctOptionIndex: 1,
      explanation:
        'Structured logging dalam format seperti JSON memiliki field standar sehingga mudah dianalisis dengan log aggregator dan query.',
    },
    {
      id: 'q-04-02',
      order: 2,
      prompt: 'Apa fungsi correlation ID?',
      options: [
        'Menggantikan password',
        'Mengidentifikasi dan mengelompokkan log serta span dari satu request lintas service',
        'Menyimpan metrics Prometheus',
        'Mengatur log level',
      ],
      correctOptionIndex: 1,
      explanation:
        'Correlation ID yang sama dibawa antar service sehingga seluruh jejak satu request dapat dikumpulkan.',
    },
    {
      id: 'q-04-03',
      order: 3,
      prompt: 'Tipe metric mana yang cocok untuk menghitung jumlah request total?',
      options: ['Gauge', 'Histogram', 'Counter', 'Summary'],
      correctOptionIndex: 2,
      explanation:
        'Counter hanya bertambah, sehingga cocok untuk menghitung total request, error, atau event.',
    },
    {
      id: 'q-04-04',
      order: 4,
      prompt: 'Perbedaan liveness dan readiness probe adalah?',
      options: [
        'Keduanya sama, hanya nama berbeda',
        'Liveness menentukan apakah pod perlu di-restart, readiness menentukan apakah pod siap menerima traffic',
        'Readiness menentukan restart, liveness menentukan traffic',
        'Liveness hanya untuk database, readiness hanya untuk aplikasi',
      ],
      correctOptionIndex: 1,
      explanation:
        'Liveness mendeteksi deadlock/crash sehingga pod di-restart, sedangkan readiness menentukan apakah pod boleh masuk ke load balancer.',
    },
    {
      id: 'q-04-05',
      order: 5,
      prompt: 'Dalam distributed tracing, apa yang dimaksud dengan span?',
      options: [
        'Seluruh request end-to-end',
        'Satu unit kerja dalam sebuah trace, seperti query database atau panggilan HTTP',
        'Header HTTP untuk autentikasi',
        'Kumpulan semua log dari satu service',
      ],
      correctOptionIndex: 1,
      explanation:
        'Span merepresentasikan satu operasi dengan waktu mulai dan durasi, sementara trace adalah kumpulan span dari satu request.',
    },
    {
      id: 'q-04-06',
      order: 6,
      prompt: 'Header standar W3C untuk propagasi trace context adalah?',
      options: ['Authorization', 'traceparent', 'X-Correlation-ID', 'Content-Type'],
      correctOptionIndex: 1,
      explanation:
        'traceparent membawa trace ID, parent span ID, dan flags sehingga downstream service dapat melanjutkan trace yang sama.',
    },
    {
      id: 'q-04-07',
      order: 7,
      prompt: 'Apa yang dimaksud dengan error budget?',
      options: [
        'Jumlah uang yang disediakan untuk infrastruktur',
        'Margin kegagalan yang masih dapat diterima sebelum SLO dilanggar',
        'Jumlah log error yang disimpan',
        'Batas jumlah alert per hari',
      ],
      correctOptionIndex: 1,
      explanation:
        'Error budget adalah selisih antara 100% dan target SLO; membantu menentukan kapan tim harus memperlambat fitur baru untuk stabilitas.',
    },
    {
      id: 'q-04-08',
      order: 8,
      prompt: 'Mengapa alerting sebaiknya didasarkan pada SLO/error budget, bukan setiap anomali?',
      options: [
        'Untuk mengurangi alert fatigue dan fokus pada masalah yang benar-benar memengaruhi keandalan',
        'Karena setiap anomali tidak penting',
        'Untuk menghindari monitoring sama sekali',
        'Karena SLO tidak perlu diukur',
      ],
      correctOptionIndex: 0,
      explanation:
        'Alert yang terlalu banyak menyebabkan alert fatigue. Dengan berbasis SLO, tim hanya bereaksi saat keandalan pengguna benar-benar terancam.',
    },
  ],
}
