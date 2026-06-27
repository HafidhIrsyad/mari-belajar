import type { Quiz } from '@/content/types'

export const ch08Quiz: Quiz = {
  id: 'quiz-ch-08-security-lanjutan-compliance',
  title: 'Quiz: Security Lanjutan & Compliance',
  passingScore: 8,
  questions: [
    {
      id: 'q-08-01',
      order: 1,
      prompt: 'Apa risiko utama Broken Object Level Authorization (BOLA)?',
      options: [
        'Token tidak pernah expired',
        'User dapat mengakses data milik user lain karena tidak ada pengecekan kepemilikan',
        'Password disimpan sebagai plain text',
        'Server tidak memiliki firewall',
      ],
      correctOptionIndex: 1,
      explanation:
        'BOLA terjadi ketika aplikasi tidak memverifikasi bahwa user berhak mengakses object tertentu.',
    },
    {
      id: 'q-08-02',
      order: 2,
      prompt: 'Apa fungsi OAuth2 scope?',
      options: [
        'Menyimpan password user',
        'Membatasi hak akses token pada resource tertentu',
        'Mengenkripsi seluruh database',
        'Menggantikan audit log',
      ],
      correctOptionIndex: 1,
      explanation:
        'Scope menentukan apa saja yang boleh dilakukan token, misalnya read atau write pada resource tertentu.',
    },
    {
      id: 'q-08-03',
      order: 3,
      prompt: 'Audit log sebaiknya tidak mencakup?',
      options: [
        'Identitas actor',
        'Waktu akses',
        'Password atau token sensitif',
        'Resource yang diakses',
      ],
      correctOptionIndex: 2,
      explanation:
        'Audit log tidak boleh menyimpan secret karena log itu sendiri bisa dibaca dan menjadi sumber kebocoran.',
    },
    {
      id: 'q-08-04',
      order: 4,
      prompt: 'Prinsip dasar zero trust adalah?',
      options: [
        'Semua internal network dipercaya',
        'Never trust, always verify',
        'Hanya admin yang perlu diautentikasi',
        'Firewall saja cukup untuk keamanan',
      ],
      correctOptionIndex: 1,
      explanation:
        'Zero trust mengasumsikan tidak ada zona aman dan setiap akses harus diverifikasi.',
    },
    {
      id: 'q-08-05',
      order: 5,
      prompt: 'Apa perbedaan TLS dan mTLS?',
      options: [
        'TLS lebih lambat dari mTLS',
        'mTLS mengotentikasi kedua belah pihak, TLS biasanya hanya server',
        'TLS hanya untuk HTTP, mTLS untuk semua protokol',
        'Tidak ada perbedaan',
      ],
      correctOptionIndex: 1,
      explanation:
        'mTLS menambahkan otentikasi client sehingga server juga memverifikasi identitas client.',
    },
    {
      id: 'q-08-06',
      order: 6,
      prompt: 'Enkripsi at rest melindungi data?',
        options: [
        'Saat dikirim melalui jaringan',
        'Saat disimpan di disk atau database',
        'Saat diproses di memory',
        'Saat di-cache di browser',
      ],
      correctOptionIndex: 1,
      explanation:
        'Enkripsi at rest melindungi data yang tersimpan di media penyimpanan fisik.',
    },
    {
      id: 'q-08-07',
      order: 7,
      prompt: 'Prinsip GDPR mana yang menyatakan data hanya boleh dikumpulkan seperlunya?',
      options: [
        'Right to erasure',
        'Data minimization',
        'Data portability',
        'Accountability',
      ],
      correctOptionIndex: 1,
      explanation:
        'Data minimization mengharuskan pengumpulan data terbatas pada apa yang diperlukan untuk tujuan yang dinyatakan.',
    },
    {
      id: 'q-08-08',
      order: 8,
      prompt: 'Mengapa secret scanning penting di CI/CD?',
      options: [
        'Untuk menghapus semua credential',
        'Untuk mendeteksi credential yang tertinggal di repository sebelum dideploy',
        'Untuk mengganti semua password secara otomatis',
        'Untuk mematikan audit log',
      ],
      correctOptionIndex: 1,
      explanation:
        'Secret scanning membantu menemukan credential yang tidak sengaja di-commit sebelum menjadi celaha di production.',
    },
  ],
}
