import type { Quiz } from '@/content/types'

export const ch07Quiz: Quiz = {
  id: 'quiz-ch-07-cli-system',
  title: 'Quiz: CLI & System Programming',
  passingScore: 8,
  questions: [
    {
      id: 'q-07-01',
      order: 1,
      prompt: 'Package bawaan Go apa yang digunakan untuk parsing flag CLI?',
      options: [
        'os',
        'flag',
        'cobra',
        'signal',
      ],
      correctOptionIndex: 1,
      explanation:
        'Package flag adalah package bawaan Go untuk parsing command-line flags.',
    },
    {
      id: 'q-07-02',
      order: 2,
      prompt: 'Mengapa konfigurasi disarankan disimpan di environment variables menurut 12-factor app?',
      options: [
        'Agar lebih aman dari database',
        'Agar konfigurasi terpisah dari kode dan mudah diubah antar environment',
        'Agar tidak perlu parsing',
        'Agar binary lebih kecil',
      ],
      correctOptionIndex: 1,
      explanation:
        '12-factor app menyarankan konfigurasi di environment variables agar terpisah dari kode dan tidak memerlukan rebuild.',
    },
    {
      id: 'q-07-03',
      order: 3,
      prompt: 'Sinyal OS apa yang biasa dikirim dengan menekan Ctrl+C?',
      options: [
        'SIGTERM',
        'SIGINT',
        'SIGHUP',
        'SIGKILL',
      ],
      correctOptionIndex: 1,
      explanation:
        'Ctrl+C secara default mengirim sinyal SIGINT ke proses.',
    },
    {
      id: 'q-07-04',
      order: 4,
      prompt: 'Apa fungsi utama graceful shutdown?',
      options: [
        'Mematikan proses secepat mungkin',
        'Menunggu request aktif selesai dan membersihkan resource sebelum keluar',
        'Merestart server secara otomatis',
        'Menolak semua request baru',
      ],
      correctOptionIndex: 1,
      explanation:
        'Graceful shutdown memastikan request yang sedang berjalan selesai diproses dan resource dibersihkan sebelum proses berhenti.',
    },
    {
      id: 'q-07-05',
      order: 5,
      prompt: 'Method apa pada http.Server yang digunakan untuk graceful shutdown?',
      options: [
        'Close',
        'Shutdown',
        'Stop',
        'Terminate',
      ],
      correctOptionIndex: 1,
      explanation:
        'http.Server.Shutdown menerima context dan menunggu koneksi aktif selesai sebelum menutup server.',
    },
    {
      id: 'q-07-06',
      order: 6,
      prompt: 'Library apa yang populer untuk membangun CLI dengan subcommand di Go?',
      options: [
        'flag',
        'cobra',
        'sync',
        'context',
      ],
      correctOptionIndex: 1,
      explanation:
        'Cobra adalah library populer untuk CLI Go dengan dukungan subcommand, flags, dan generated help.',
    },
    {
      id: 'q-07-07',
      order: 7,
      prompt: 'Sinyal OS apa yang sering digunakan untuk trigger reload konfigurasi?',
      options: [
        'SIGINT',
        'SIGHUP',
        'SIGKILL',
        'SIGSTOP',
      ],
      correctOptionIndex: 1,
      explanation:
        'SIGHUP secara konvensional digunakan untuk memberitahu daemon agar me-reload konfigurasinya.',
    },
    {
      id: 'q-07-08',
      order: 8,
      prompt: 'Apa yang dimaksud dengan file watcher?',
      options: [
        'Program yang menghapus file secara otomatis',
        'Program yang memantau perubahan file atau direktori',
        'Program yang mengompresi file',
        'Program yang mengenkripsi file',
      ],
      correctOptionIndex: 1,
      explanation:
        'File watcher memantau perubahan pada file atau direktori, biasanya untuk hot reload atau trigger build.',
    },
  ],
}
