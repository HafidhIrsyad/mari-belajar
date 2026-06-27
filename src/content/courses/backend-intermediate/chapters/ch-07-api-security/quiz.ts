import type { Quiz } from '@/content/types'

export const ch07Quiz: Quiz = {
  id: 'quiz-ch-07-api-security',
  title: 'Quiz: API Security',
  passingScore: 8,
  questions: [
    {
      id: 'q-07-01',
      order: 1,
      prompt: 'Mengapa HTTPS penting untuk API?',
      options: [
        'Agar response lebih cepat',
        'Untuk mengenkripsi data in transit dan mencegah MITM',
        'Agar tidak perlu validasi input',
        'Untuk menggantikan database',
      ],
      correctOptionIndex: 1,
      explanation:
        'HTTPS menggunakan TLS untuk mengenkripsi komunikasi antara client dan server, melindungi data dari sniffing dan manipulasi.',
    },
    {
      id: 'q-07-02',
      order: 2,
      prompt: 'Cara utama mencegah SQL injection adalah?',
      options: [
        'Menggunakan regex pada input',
        'Menggunakan parameterized query atau prepared statement',
        'Menghapus karakter kutip dari input',
        'Menggunakan HTTP POST saja',
      ],
      correctOptionIndex: 1,
      explanation:
        'Parameterized query memisahkan data dari perintah SQL, sehingga input tidak dapat mengubah struktur query.',
    },
    {
      id: 'q-07-03',
      order: 3,
      prompt: 'Apa fungsi header Content-Security-Policy?',
      options: [
        'Mengontrol sumber resource yang boleh dimuat halaman web',
        'Mengatur CORS origin',
        'Mengenkripsi body request',
        'Menyimpan token autentikasi',
      ],
      correctOptionIndex: 0,
      explanation:
        'CSP membatasi dari mana script, style, dan resource lain boleh dimuat, membantu mencegah XSS.',
    },
    {
      id: 'q-07-04',
      order: 4,
      prompt: 'Rate limiting berbasis token bucket memungkinkan?',
      options: [
        'Jumlah request tanpa batas',
        'Burst singkat dengan batas rata-rata jangka panjang',
        'Menghapus semua request yang gagal',
        'Mengganti kebutuhan autentikasi',
      ],
      correctOptionIndex: 1,
      explanation:
        'Token bucket mengizinkan burst selama masih ada token, tetapi refill berkala membatasi rata-rata request.',
    },
    {
      id: 'q-07-05',
      order: 5,
      prompt: 'BOLA dalam OWASP API Security Top 10 berarti?',
      options: [
        'Broken Object Level Authorization',
        'Backend Object Link Architecture',
        'Basic OAuth Login Attack',
        'Browser Origin Leak Attack',
      ],
      correctOptionIndex: 0,
      explanation:
        'BOLA adalah kegagalan memeriksa izin pada level object, misalnya user A dapat membaca data user B.',
    },
    {
      id: 'q-07-06',
      order: 6,
      prompt: 'Mass assignment dapat dicegah dengan?',
      options: [
        'Mengizinkan semua field dari client',
        'Whitelisting field yang boleh diupdate dan validasi input',
        'Menonaktifkan HTTPS',
        'Menyimpan password di cookie',
      ],
      correctOptionIndex: 1,
      explanation:
        'Dengan whitelist field, attacker tidak dapat mengirim field terlarang seperti role atau isAdmin untuk diupdate.',
    },
    {
      id: 'q-07-07',
      order: 7,
      prompt: 'SSRF adalah serangan yang memaksa server untuk?',
      options: [
        'Menyimpan file besar',
        'Mengirim request ke tujuan yang tidak diinginkan, termasuk internal network',
        'Menghapus database',
        'Mengungkapkan source code ke client',
      ],
      correctOptionIndex: 1,
      explanation:
        'Server Side Request Forgery (SSRF) memanfaatkan server untuk mengakses resource internal atau eksternal yang seharusnya tidak dapat dijangkau attacker.',
    },
    {
      id: 'q-07-08',
      order: 8,
      prompt: 'Praktik terbaik untuk menyimpan secret adalah?',
      options: [
        'Menyimpan di source code agar mudah diakses',
        'Menggunakan secret manager atau environment variable dengan akses terbatas',
        'Membagikan secret melalui chat tim',
        'Menyertakan secret di response API',
      ],
      correctOptionIndex: 1,
      explanation:
        'Secret harus disimpan di tempat yang aman seperti secret manager dengan rotasi berkala, bukan di source code atau chat.',
    },
  ],
}
