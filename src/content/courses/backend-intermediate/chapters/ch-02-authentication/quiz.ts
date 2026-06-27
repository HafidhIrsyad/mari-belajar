import type { Quiz } from '@/content/types'

export const ch02Quiz: Quiz = {
  id: 'quiz-ch-02-authentication',
  title: 'Quiz: Authentication',
  passingScore: 8,
  questions: [
    {
      id: 'q-02-01',
      order: 1,
      prompt: 'Apa perbedaan utama session-based dan token-based authentication?',
      options: [
        'Session-based selalu lebih aman dari token-based',
        'Session state disimpan di server, sedangkan token stateful atau self-contained dibawa client',
        'Token-based tidak memerlukan cookie',
        'Session-based tidak memerlukan database',
      ],
      correctOptionIndex: 1,
      explanation:
        'Session-based menyimpan state di server (Redis/memory) dan client membawa session ID. Token-based seperti JWT dapat berisi klaim dan tidak memerlukan state server jika self-contained.',
    },
    {
      id: 'q-02-02',
      order: 2,
      prompt: 'Bagian manakah yang melindungi integritas JWT dari manipulasi?',
      options: ['Header', 'Payload', 'Signature', 'Typ field'],
      correctOptionIndex: 2,
      explanation:
        'Signature dihasilkan dari HMAC/RSA atas header dan payload. Jika isi berubah, signature tidak cocok saat verifikasi.',
    },
    {
      id: 'q-02-03',
      order: 3,
      prompt: 'Mengapa bcrypt lebih baik daripada SHA-256 untuk menyimpan password?',
      options: [
        'bcrypt menghasilkan output yang lebih pendek',
        'bcrypt dirancang lambat dan menggunakan salt unik',
        'bcrypt tidak memerlukan salt',
        'SHA-256 lebih aman karena merupakan hash kriptografis modern',
      ],
      correctOptionIndex: 1,
      explanation:
        'bcrypt adalah password hashing function yang sengaja lambat dan menggunakan salt unik, sehingga tahan terhadap brute-force dan rainbow table.',
    },
    {
      id: 'q-02-04',
      order: 4,
      prompt: 'Apa tujuan refresh token?',
      options: [
        'Menggantikan fungsi password saat registrasi',
        'Mendapatkan access token baru tanpa meminta password ulang',
        'Menyimpan role pengguna secara permanen',
        'Mengenkripsi database',
      ],
      correctOptionIndex: 1,
      explanation:
        'Refresh token berumur lebih panjang dan digunakan untuk menerbitkan access token baru setelah access token yang lama expired.',
    },
    {
      id: 'q-02-05',
      order: 5,
      prompt: 'PKCE dalam OAuth2 melindungi dari serangan apa?',
      options: [
        'SQL injection',
        'Interception dan penukaran authorization code oleh pihak lain',
        'Brute-force password',
        'Session fixation',
      ],
      correctOptionIndex: 1,
      explanation:
        'PKCE memastikan hanya client yang memiliki code verifier asli yang dapat menukar authorization code menjadi access token.',
    },
    {
      id: 'q-02-06',
      order: 6,
      prompt: 'Dalam JWT HS256, signature dihitung dari?',
      options: [
        'Secret key saja',
        'base64url(header) + "." + base64url(payload) di-hash dengan HMAC-SHA256',
        'Payload dienkripsi dengan secret key',
        'Header dan payload di-hash dengan SHA-256 tanpa secret',
      ],
      correctOptionIndex: 1,
      explanation:
        'Signature HS256 = HMAC-SHA256(base64url(header) + "." + base64url(payload), secret).',
    },
    {
      id: 'q-02-07',
      order: 7,
      prompt: 'Apa keunggulan passkeys dibanding password tradisional?',
      options: [
        'Passkeys dapat disimpan sebagai plain text',
        'Passkeys tahan phishing dan tidak ada secret yang dibagikan ke server',
        'Passkeys tidak memerlukan perangkat pengguna',
        'Passkeys selalu berbasis password yang sangat panjang',
      ],
      correctOptionIndex: 1,
      explanation:
        'Passkeys menggunakan kriptografi kunci publik di perangkat pengguna. Server hanya menyimpan public key, sehingga tidak ada password yang dapat dicuri atau dipishing.',
    },
    {
      id: 'q-02-08',
      order: 8,
      prompt: 'Mengapa refresh token sebaiknya dirotasi setiap kali digunakan?',
      options: [
        'Untuk mengurangi ukuran token',
        'Untuk membatasi window penyalahgunaan jika token dicuri',
        'Agar access token dapat diperpanjang tanpa batas',
        'Agar tidak perlu menyimpan hash refresh token',
      ],
      correctOptionIndex: 1,
      explanation:
        'Rotasi refresh token mengganti token lama dengan yang baru setiap kali digunakan, sehingga attacker yang mencuri token lama tidak bisa menggunakannya lagi.',
    },
  ],
}
