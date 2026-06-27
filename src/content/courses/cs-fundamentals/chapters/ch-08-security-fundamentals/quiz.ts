import type { Quiz } from '@/content/types'

export const ch08Quiz: Quiz = {
  id: 'quiz-ch-08-security-fundamentals',
  title: 'Quiz: Keamanan Informasi dan Praktik Terbaik',
  passingScore: 8,
  questions: [
    {
      id: 'q-08-01',
      order: 1,
      prompt: 'Apa yang dimaksud dengan Confidentiality dalam CIA Triad?',
      options: [
        'Memastikan data hanya bisa diakses oleh pihak yang berwenang',
        'Memastikan data tidak diubah tanpa izin',
        'Memastikan sistem selalu tersedia',
        'Memastikan data tersimpan di banyak tempat',
      ],
      correctOptionIndex: 0,
      explanation:
        'Confidentiality berarti kerahasiaan: data hanya boleh diakses oleh pihak yang memiliki izin.',
    },
    {
      id: 'q-08-02',
      order: 2,
      prompt: 'Perbedaan utama autentikasi dan otorisasi adalah:',
      options: [
        'Autentikasi membuktikan identitas; otorisasi menentukan izin akses',
        'Autentikasi menentukan izin akses; otorisasi membuktikan identitas',
        'Keduanya adalah istilah yang sama',
        'Autentikasi hanya untuk password; otorisasi hanya untuk token',
      ],
      correctOptionIndex: 0,
      explanation:
        'Autentikasi menjawab "siapa kamu", sedangkan otorisasi menjawab "apa yang boleh kamu lakukan".',
    },
    {
      id: 'q-08-03',
      order: 3,
      prompt: 'Manakah yang merupakan contoh social engineering?',
      options: [
        'Phishing email yang meminta klik tautan mencurigakan',
        'Mengenkripsi data dengan AES-256',
        'Menginstal firewall di jaringan',
        'Memvalidasi input pengguna',
      ],
      correctOptionIndex: 0,
      explanation:
        'Phishing adalah manipulasi psikologis melalui pesan palsu agar korban membocorkan informasi.',
    },
    {
      id: 'q-08-04',
      order: 4,
      prompt: 'Hashing berbeda dari encryption karena:',
      options: [
        'Hashing bersifat one-way; encryption bisa dibalik',
        'Hashing lebih lambat dari encryption',
        'Hashing membutuhkan kunci publik dan privat',
        'Hashing hanya bisa dilakukan di server',
      ],
      correctOptionIndex: 0,
      explanation:
        'Hashing menghasilkan nilai tetap yang tidak bisa dikembalikan, sedangkan encryption bisa didekripsi dengan kunci.',
    },
    {
      id: 'q-08-05',
      order: 5,
      prompt: 'Fungsi utama sertifikat TLS pada HTTPS adalah:',
      options: [
        'Mengenkripsi data saat transit dan memverifikasi identitas server',
        'Mempercepat koneksi internet',
        'Menyimpan password pengguna',
        'Menggantikan kebutuhan input validation',
      ],
      correctOptionIndex: 0,
      explanation:
        'TLS menyediakan enkripsi dan autentikasi server sehingga komunikasi antara browser dan server aman.',
    },
    {
      id: 'q-08-06',
      order: 6,
      prompt: 'Input validation bertujuan untuk:',
      options: [
        'Memastikan data pengguna sesuai ekspektasi sebelum diproses',
        'Mengenkripsi password secara otomatis',
        'Menambah jumlah fitur aplikasi',
        'Menggantikan fungsi database',
      ],
      correctOptionIndex: 0,
      explanation:
        'Validasi input memeriksa format dan nilai data agar tidak menyebabkan bug atau celah keamanan.',
    },
    {
      id: 'q-08-07',
      order: 7,
      prompt: 'Serangan SQL Injection termasuk dalam kategori:',
      options: [
        'OWASP Top 10',
        'Protokol jaringan',
        'Sistem operasi',
        'Algoritma pengurutan',
      ],
      correctOptionIndex: 0,
      explanation:
        'SQL Injection masuk dalam daftar OWASP Top 10 sebagai risiko injeksi yang sering menyerang aplikasi web.',
    },
    {
      id: 'q-08-08',
      order: 8,
      prompt: 'Praktik secure coding yang baik meliputi:',
      options: [
        'Menggunakan library terbaru, validasi input, dan menyimpan secret dengan aman',
        'Menyimpan password dalam plaintext agar mudah diakses',
        'Menonaktifkan semua log untuk privasi',
        'Mengabaikan patch keamanan demi stabilitas',
      ],
      correctOptionIndex: 0,
      explanation:
        'Secure coding mencakup validasi input, pembaruan komponen, dan penyimpanan secret yang aman.',
    },
  ],
}
