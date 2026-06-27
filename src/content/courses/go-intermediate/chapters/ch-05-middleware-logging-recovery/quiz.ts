import type { Quiz } from '@/content/types'

export const ch05Quiz: Quiz = {
  id: 'quiz-ch-05-middleware-logging-recovery',
  title: 'Quiz: Middleware, Logging & Recovery',
  passingScore: 8,
  questions: [
    {
      id: 'q-05-01',
      order: 1,
      prompt: 'Package standar Go untuk structured logging adalah?',
      options: [
        'logrus',
        'log/slog',
        'zap',
        'log/log',
      ],
      correctOptionIndex: 1,
      explanation:
        'log/slog adalah package standar Go sejak Go 1.21 untuk structured logging.',
    },
    {
      id: 'q-05-02',
      order: 2,
      prompt: 'Mengapa perlu membungkus http.ResponseWriter di middleware logging?',
      options: [
        'Agar request lebih cepat',
        'Untuk menangkap status code yang ditulis handler',
        'Agar bisa mengubah method request',
        'Untuk menghapus header response',
      ],
      correctOptionIndex: 1,
      explanation:
        'http.ResponseWriter tidak mengekspose status code yang sudah ditulis, sehingga perlu wrapper untuk merekamnya.',
    },
    {
      id: 'q-05-03',
      order: 3,
      prompt: 'Di mana sebaiknya recovery middleware ditempatkan dalam chain?',
      options: [
        'Paling dalam, dekat handler',
        'Paling luar agar menangkap panic dari middleware lain',
        'Tidak perlu recovery middleware',
        'Di tengah chain',
      ],
      correctOptionIndex: 1,
      explanation:
        'Recovery middleware paling luar dapat menangkap panic yang berasal dari middleware lain dan handler.',
    },
    {
      id: 'q-05-04',
      order: 4,
      prompt: 'Fungsi bawaan Go apa yang digunakan untuk menangkap panic?',
      options: [
        'catch()',
        'recover()',
        'rescue()',
        'trap()',
      ],
      correctOptionIndex: 1,
      explanation:
        'recover() dipanggil di dalam deferred function untuk menangkap panic dan mencegah program crash.',
    },
    {
      id: 'q-05-05',
      order: 5,
      prompt: 'Apa perbedaan request ID dan correlation ID?',
      options: [
        'Keduanya sama',
        'Request ID lokal per service, correlation ID melintasi banyak service',
        'Correlation ID hanya untuk logging error',
        'Request ID dibuat oleh client, correlation ID oleh server',
      ],
      correctOptionIndex: 1,
      explanation:
        'Request ID mengidentifikasi request di satu service, sedangkan correlation ID tetap sama sepanjang alur antar service.',
    },
    {
      id: 'q-05-06',
      order: 6,
      prompt: 'Mengapa log sampling berguna di sistem dengan traffic tinggi?',
      options: [
        'Agar semua request tercatat',
        'Mengurangi volume log dan biaya penyimpanan',
        'Meningkatkan keamanan',
        'Agar log selalu lengkap',
      ],
      correctOptionIndex: 1,
      explanation:
        'Log sampling mencatat subset request sehingga mengurangi volume log dan biaya observability tanpa kehilangan visibilitas sepenuhnya.',
    },
    {
      id: 'q-05-07',
      order: 7,
      prompt: 'Jenis data apa yang sebaiknya tidak dicatat dalam log?',
      options: [
        'Method HTTP',
        'Path URL',
        'Password atau token akses',
        'Status code response',
      ],
      correctOptionIndex: 2,
      explanation:
        'Data sensitif seperti password, token, atau informasi pribadi tidak boleh dicatat dalam log.',
    },
    {
      id: 'q-05-08',
      order: 8,
      prompt: 'Standar observability apa yang umum digunakan untuk tracing di Go?',
      options: [
        'OpenAPI',
        'OpenTelemetry',
        'OpenSSL',
        'OpenSSH',
      ],
      correctOptionIndex: 1,
      explanation:
        'OpenTelemetry adalah standar observability yang menyediakan API dan SDK untuk tracing, metrics, dan logging.',
    },
  ],
}
