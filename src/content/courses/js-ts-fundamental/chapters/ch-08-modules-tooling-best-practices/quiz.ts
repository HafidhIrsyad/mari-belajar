import type { Quiz } from '@/content/types'

export const ch08Quiz: Quiz = {
  id: 'quiz-ch-08-modules-tooling-best-practices',
  title: 'Quiz: Modules, Tooling, dan Best Practices',
  passingScore: 8,
  questions: [
    {
      id: 'q-08-01',
      order: 1,
      prompt: 'Manakah cara mengimpor named export yang benar di ES Modules?',
      options: [
        'import { add } from "./math.js";',
        'import add from "./math.js";',
        'const add = require("./math.js");',
        'import "./math.js";',
      ],
      correctOptionIndex: 0,
      explanation:
        'Named export diimpor menggunakan kurung kurawal dengan nama yang sama saat diekspor, misalnya import { add } from "./math.js".',
    },
    {
      id: 'q-08-02',
      order: 2,
      prompt: 'Perintah apa yang digunakan untuk menjalankan script dev yang terdefinisi di package.json?',
      options: [
        'pnpm run dev',
        'pnpm start dev',
        'pnpm exec dev',
        'pnpm script dev',
      ],
      correctOptionIndex: 0,
      explanation:
        'Perintah pnpm run <nama-script> (atau npm run <nama-script>) menjalankan skrip yang ada di bagian scripts pada package.json.',
    },
    {
      id: 'q-08-03',
      order: 3,
      prompt: 'Apa fungsi utama direktori node_modules?',
      options: [
        'Menyimpan dependensi yang sudah diinstal',
        'Menyimpan kode sumber aplikasi utama',
        'Menyimpan konfigurasi TypeScript',
        'Menyimpan file dokumentasi proyek',
      ],
      correctOptionIndex: 0,
      explanation:
        'Folder node_modules berisi pustaka-pustaka yang tercatat di package.json dan diunduh saat menjalankan npm install atau pnpm install.',
    },
    {
      id: 'q-08-04',
      order: 4,
      prompt: 'Apa kegunaan opsi compilerOptions.strict dalam tsconfig.json?',
      options: [
        'Mengaktifkan semua pemeriksaan ketat tipe',
        'Menonaktifkan pemeriksaan tipe agar lebih cepat',
        'Mengubah target kompilasi ke versi terbaru secara otomatis',
        'Menentukan folder output hasil build',
      ],
      correctOptionIndex: 0,
      explanation:
        'Opsi strict mengaktifkan serangkaian pemeriksaan ketat tipe di TypeScript sehingga banyak bug bisa tertangkap saat compile time.',
    },
    {
      id: 'q-08-05',
      order: 5,
      prompt: 'Apa perbedaan utama antara linter dan formatter?',
      options: [
        'Linter menemukan bug dan gaya bermasalah, formatter merapikan tampilan kode',
        'Formatter menemukan bug, linter merapikan tampilan kode',
        'Keduanya sama-sama menjalankan unit test',
        'Keduanya menggantikan compiler TypeScript',
      ],
      correctOptionIndex: 0,
      explanation:
        'Linter fokus pada kualitas dan keamanan kode, sementara formatter fokus pada tata letak dan gaya penulisan agar konsisten.',
    },
    {
      id: 'q-08-06',
      order: 6,
      prompt: 'Mengapa kode tidak boleh menyimpan secret seperti token API secara langsung?',
      options: [
        'Agar tidak bocor ke publik dan bisa dikelola secara terpisah',
        'Karena secret memperlambat proses kompilasi',
        'Karena JavaScript tidak mendukung variabel secret',
        'Agar ukuran file package.json lebih kecil',
      ],
      correctOptionIndex: 0,
      explanation:
        'Secret yang tertulis di kode berisiko terlihat publik jika kode dishare. Sebaiknya gunakan environment variables dan lindungi file .env.',
    },
    {
      id: 'q-08-07',
      order: 7,
      prompt: 'Praktik terbaik saat menangani error pada operasi asinkron adalah...',
      options: [
        'Menggunakan try/catch pada await atau .catch() pada Promise',
        'Mengabaikan error agar program tetap berjalan',
        'Menggunakan console.log saja tanpa melempar atau menangkap error',
        'Menyimpan semua pesan error ke variabel global',
      ],
      correctOptionIndex: 0,
      explanation:
        'Error pada kode asinkron sebaiknya ditangkap dengan try/catch saat menggunakan await, atau dengan .catch() saat menggunakan Promise.',
    },
    {
      id: 'q-08-08',
      order: 8,
      prompt: 'Manakah yang termasuk prinsip readable code?',
      options: [
        'Nama variabel jelas dan fungsi fokus pada satu tugas',
        'Menulis seluruh logika dalam satu fungsi agar mudah ditemukan',
        'Menggunakan singkatan agar file terlihat lebih pendek',
        'Menghindari komentar sepenuhnya karena kode sudah cukup jelas',
      ],
      correctOptionIndex: 0,
      explanation:
        'Kode yang mudah dibaca menggunakan nama yang bermakna, fungsi pendek dengan satu tanggung jawab, dan komentar untuk menjelaskan hal yang tidak jelas dari kode.',
    },
  ],
}
