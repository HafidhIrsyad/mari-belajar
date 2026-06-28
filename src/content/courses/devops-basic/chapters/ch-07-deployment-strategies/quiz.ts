import type { Quiz } from '@/content/types'

export const ch07Quiz: Quiz = {
  id: 'quiz-ch-07-deployment-strategies',
  title: 'Quiz: Deployment Strategies',
  passingScore: 8,
  questions: [
    {
      id: 'q-07-01',
      order: 1,
      prompt: 'Strategi deployment mana yang memiliki downtime karena menghentikan versi lama sepenuhnya?',
      options: ['Rolling', 'Blue-green', 'Recreate', 'Canary'],
      correctOptionIndex: 2,
      explanation:
        'Recreate deployment menghentikan versi lama sebelum menjalankan versi baru, sehingga terjadi downtime.',
    },
    {
      id: 'q-07-02',
      order: 2,
      prompt: 'Keuntungan utama blue-green deployment adalah?',
      options: [
        'Menggunakan resource paling sedikit',
        'Rollback hampir instan karena environment lama masih tersedia',
        'Tidak memerlukan health check',
        'Otomatis melakukan A/B testing',
      ],
      correctOptionIndex: 1,
      explanation:
        'Blue-green menyediakan dua environment; switch traffic dapat dibalik dengan cepat jika terjadi masalah.',
    },
    {
      id: 'q-07-03',
      order: 3,
      prompt: 'Tujuan utama canary deployment adalah?',
      options: [
        'Menghapus versi lama segera setelah deploy',
        'Membatasi dampak kegagalan dengan mengarahkan traffic kecil ke versi baru',
        'Mengurangi jumlah instance yang berjalan',
        'Menghindari penggunaan load balancer',
      ],
      correctOptionIndex: 1,
      explanation:
        'Canary membatasi blast radius dengan menguji versi baru pada sebagian kecil traffic sebelum rollout penuh.',
    },
    {
      id: 'q-07-04',
      order: 4,
      prompt: 'Perbedaan feature flag dan canary deployment adalah?',
      options: [
        'Feature flag di level infrastruktur; canary di level aplikasi',
        'Feature flag mengontrol eksekusi kode di aplikasi; canary mengontrol versi yang menerima traffic',
        'Keduanya sama; hanya istilah berbeda',
        'Canary hanya untuk database; feature flag hanya untuk UI',
      ],
      correctOptionIndex: 1,
      explanation:
        'Feature flag beroperasi di dalam aplikasi; canary beroperasi di infrastruktur/network layer.',
    },
    {
      id: 'q-07-05',
      order: 5,
      prompt: 'Apa itu Automated Canary Analysis (ACA)?',
      options: [
        'Proses manual review versi baru oleh tim QA',
        'Penggunaan metrik dan statistical test untuk otomatis menilai kesehatan versi baru',
        'Alat untuk menghapus feature flag yang tidak terpakai',
        'Teknik untuk mengompresi container image sebelum deploy',
      ],
      correctOptionIndex: 1,
      explanation:
        'ACA membandingkan metrik canary dengan baseline dan secara otomatis memutuskan untuk melanjutkan atau rollback.',
    },
    {
      id: 'q-07-06',
      order: 6,
      prompt: 'Mengapa readiness probe penting sebelum instance menerima traffic?',
      options: [
        'Untuk mengurangi ukuran container image',
        'Untuk memastikan instance siap melayani request sebelum traffic dialihkan',
        'Untuk menghapus log lama secara otomatis',
        'Untuk mengganti versi aplikasi saat runtime',
      ],
      correctOptionIndex: 1,
      explanation:
        'Readiness probe mencegah traffic dialihkan ke instance yang belum selesai inisialisasi.',
    },
    {
      id: 'q-07-07',
      order: 7,
      prompt: 'Praktik aman untuk deployment yang melibatkan perubahan skema database adalah?',
      options: [
        'Menjalankan migration destruktif bersamaan dengan rilis aplikasi',
        'Membuat migration backward compatible dan menggunakan expand-contract pattern',
        'Selalu menghapus tabel lama segera setelah migration',
        'Mengabaikan rollback karena database dapat dipulihkan dari backup',
      ],
      correctOptionIndex: 1,
      explanation:
        'Backward compatible migration memungkinkan rollback aplikasi tanpa merusak data atau skema.',
    },
    {
      id: 'q-07-08',
      order: 8,
      prompt: 'Progressive delivery menggabungkan elemen berikut kecuali?',
      options: [
        'Canary deployment',
        'Feature flags',
        'Automated rollback berdasarkan metrik',
        'Manual deployment window fixed schedule',
      ],
      correctOptionIndex: 3,
      explanation:
        'Progressive delivery menggabungkan canary, feature flags, dan automated rollback; deployment window fixed schedule bukan komponen utamanya.',
    },
  ],
}
