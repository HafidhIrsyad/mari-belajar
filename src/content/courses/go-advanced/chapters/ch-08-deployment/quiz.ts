import type { Quiz } from '@/content/types'

export const ch08Quiz: Quiz = {
  id: 'quiz-ch-08-deployment',
  title: 'Quiz: Deployment & Production Readiness',
  passingScore: 8,
  questions: [
    {
      id: 'q-08-01',
      order: 1,
      prompt: 'Apa keunggulan utama static binary Go untuk deployment?',
      options: [
        'Tidak memerlukan runtime terpisah',
        'Hanya berjalan di Windows',
        'Otomatis melakukan scaling',
        'Tidak bisa dijalankan di container',
      ],
      correctOptionIndex: 0,
      explanation:
        'Static binary Go berisi runtime dan dependency, sehingga tidak membutuhkan runtime terpisah untuk dijalankan.',
    },
    {
      id: 'q-08-02',
      order: 2,
      prompt: 'Flag apa yang digunakan untuk menonaktifkan CGO saat build?',
      options: [
        'GOOS=linux',
        'CGO_ENABLED=0',
        'GOARCH=amd64',
        '-ldflags="-s -w"',
      ],
      correctOptionIndex: 1,
      explanation:
        'CGO_ENABLED=0 memastikan binary tidak bergantung pada C library, sehingga bisa berjalan di image minimal.',
    },
    {
      id: 'q-08-03',
      order: 3,
      prompt: 'Apa tujuan menggunakan image distroless?',
      options: [
        'Menambah shell dan utilitas OS',
        'Mengurangi ukuran image dan attack surface',
        'Meningkatkan performa runtime',
        'Menggantikan kebutuhan reverse proxy',
      ],
      correctOptionIndex: 1,
      explanation:
        'Distroless image tidak memiliki shell atau utilitas OS, sehingga mengurangi ukuran image dan permukaan serangan.',
    },
    {
      id: 'q-08-04',
      order: 4,
      prompt: 'Endpoint mana yang umum digunakan untuk health check?',
      options: [
        '/metrics',
        '/healthz',
        '/admin',
        '/debug',
      ],
      correctOptionIndex: 1,
      explanation:
        '/healthz adalah endpoint konvensional untuk health check aplikasi.',
    },
    {
      id: 'q-08-05',
      order: 5,
      prompt: 'Apa tujuan readiness probe di Kubernetes?',
      options: [
        'Memutuskan apakah container harus di-restart',
        'Menentukan apakah container siap menerima traffic',
        'Mengukur penggunaan CPU',
        'Mengelola secret',
      ],
      correctOptionIndex: 1,
      explanation:
        'Readiness probe menentukan apakah container siap menerima traffic; jika gagal, traffic tidak dialirkan ke container.',
    },
    {
      id: 'q-08-06',
      order: 6,
      prompt: 'Apa tujuan instrumentasi OpenTelemetry?',
      options: [
        'Menggantikan compiler Go',
        'Mengumpulkan trace, metrics, dan log untuk observability',
        'Mengotomatisasi build Docker',
        'Menonaktifkan health check',
      ],
      correctOptionIndex: 1,
      explanation:
        'OpenTelemetry menyediakan standar untuk tracing, metrics, dan logging guna observability sistem.',
    },
    {
      id: 'q-08-07',
      order: 7,
      prompt: 'Apa manfaat feature flags dalam deployment?',
      options: [
        'Mengurangi ukuran binary',
        'Mengaktifkan/nonaktifkan fitur tanpa deploy ulang',
        'Meningkatkan kecepatan GC',
        'Menggantikan reverse proxy',
      ],
      correctOptionIndex: 1,
      explanation:
        'Feature flags memungkinkan fitur diaktifkan atau dinonaktifkan secara dinamis tanpa perlu deployment ulang.',
    },
    {
      id: 'q-08-08',
      order: 8,
      prompt: 'Apa konsep canary deployment?',
      options: [
        'Deploy ke semua server sekaligus',
        'Rilis versi baru ke subset traffic terlebih dahulu untuk memantau metric',
        'Tidak perlu monitoring setelah deploy',
        'Deploy hanya saat traffic nol',
      ],
      correctOptionIndex: 1,
      explanation:
        'Canary deployment merilis versi baru ke sebagian kecil traffic terlebih dahulu sebelum rollout penuh.',
    },
  ],
}
