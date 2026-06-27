import type { Quiz } from '@/content/types'

export const ch08Quiz: Quiz = {
  id: 'quiz-ch-08-deployment-environment-basics',
  title: 'Quiz: Deployment & Environment Basics',
  passingScore: 8,
  questions: [
    {
      id: 'q-08-01',
      order: 1,
      prompt: 'Mengapa secret seperti API key tidak boleh disimpan di source code?',
      options: [
        'Agar kode lebih pendek',
        'Karena source code dapat diakses banyak pihak dan version control tidak dirancang untuk menyimpan secret',
        'Agar file lebih kecil',
        'Karena secret tidak diperlukan saat runtime',
      ],
      correctOptionIndex: 1,
      explanation:
        'Secret harus disimpan di environment variable atau secret manager, bukan di repository kode yang dapat dibaca orang lain.',
    },
    {
      id: 'q-08-02',
      order: 2,
      prompt: 'Prinsip 12factor.net tentang config menyatakan bahwa?',
      options: [
        'Konfigurasi harus hard-code di aplikasi',
        'Konfigurasi harus disimpan di environment',
        'Konfigurasi tidak penting',
        'Konfigurasi hanya boleh di file .env di repository',
      ],
      correctOptionIndex: 1,
      explanation:
        'Twelve-factor app memisahkan konfigurasi dari kode dan menyimpannya di environment agar satu build dapat digunakan di banyak environment.',
    },
    {
      id: 'q-08-03',
      order: 3,
      prompt: 'Apa fungsi HEALTHCHECK di Dockerfile?',
      options: [
        'Mempercepat build image',
        'Memberi tahu Docker cara memeriksa apakah container masih berjalan dengan baik',
        'Mengompres image',
        'Menghapus log otomatis',
      ],
      correctOptionIndex: 1,
      explanation:
        'HEALTHCHECK menjalankan perintah secara berkala untuk menentukan status container.',
    },
    {
      id: 'q-08-04',
      order: 4,
      prompt: 'Graceful shutdown penting agar?',
      options: [
        'Server restart lebih cepat',
        'Request yang sedang diproses dapat diselesaikan sebelum server ditutup',
        'Tidak perlu logging',
        'Container lebih kecil',
      ],
      correctOptionIndex: 1,
      explanation:
        'Graceful shutdown memberi waktu kepada request aktif untuk selesai dan menutup koneksi secara teratur sebelum proses berakhir.',
    },
    {
      id: 'q-08-05',
      order: 5,
      prompt: 'Reverse proxy seperti nginx atau caddy umumnya menangani?',
      options: [
        'Menulis kode aplikasi',
        'TLS termination, load balancing, dan serving static file',
        'Mengganti database',
        'Menghapus unit test',
      ],
      correctOptionIndex: 1,
      explanation:
        'Reverse proxy berada di depan aplikasi untuk menangani TLS, distribusi lalu lintas, dan caching static asset.',
    },
    {
      id: 'q-08-06',
      order: 6,
      prompt: 'Process manager seperti PM2 berguna untuk?',
      options: [
        'Mengedit kode secara otomatis',
        'Menjaga agar aplikasi Node.js tetap berjalan, restart saat crash, dan mengelola cluster',
        'Mengganti Docker',
        'Menghapus environment variables',
      ],
      correctOptionIndex: 1,
      explanation:
        'PM2 mengelola lifecycle proses Node.js, termasuk restart otomatis dan clustering.',
    },
    {
      id: 'q-08-07',
      order: 7,
      prompt: 'Health check endpoint sebaiknya memeriksa?',
      options: [
        'Hanya mengembalikan string "ok" tanpa pemeriksaan',
        'Ketergantungan kritis seperti koneksi database jika aplikasi bergantung padanya',
        'Hanya file static',
        'CSS yang digunakan frontend',
      ],
      correctOptionIndex: 1,
      explanation:
        'Health check yang bermakna memverifikasi dependensi penting agar orchestrator tidak mengirim lalu lintas ke instance yang tidak sehat.',
    },
    {
      id: 'q-08-08',
      order: 8,
      prompt: 'SSL/TLS termination dilakukan oleh reverse proxy agar?',
      options: [
        'Aplikasi backend tidak perlu menangani handshake TLS dan dapat fokus pada logika bisnis',
        'Database lebih cepat',
        'Tidak perlu sertifikat',
        'Client tidak perlu HTTPS',
      ],
      correctOptionIndex: 0,
      explanation:
        'Reverse proxy menangani enkripsi/dekripsi TLS sehingga aplikasi backend berkomunikasi dalam plain HTTP di jaringan internal.',
    },
  ],
}
