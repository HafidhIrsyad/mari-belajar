import type { Quiz } from '@/content/types'

export const ch08Quiz: Quiz = {
  id: 'quiz-ch-08-runtime-security-supply-chain-hardening',
  title: 'Quiz: Runtime Security & Supply Chain Hardening',
  passingScore: 8,
  questions: [
    {
      id: 'q-08-01',
      order: 1,
      prompt: 'Serangan apa yang mengubah Object.prototype melalui input tidak valid?',
      options: [
        'XSS',
        'Prototype Pollution',
        'CSRF',
        'SQL Injection',
      ],
      correctOptionIndex: 1,
      explanation:
        'Prototype pollution memanfaatkan key seperti `__proto__` untuk mengubah Object.prototype dan memengaruhi objek lain.',
    },
    {
      id: 'q-08-02',
      order: 2,
      prompt: 'Fungsi JavaScript manakah yang paling berisiko jika menerima input pengguna?',
      options: ['JSON.parse', 'eval', 'Array.isArray', 'Object.keys'],
      correctOptionIndex: 1,
      explanation:
        '`eval` mengeksekusi string sebagai kode, sehingga input pengguna dapat dieksekusi secara arbitrer.',
    },
    {
      id: 'q-08-03',
      order: 3,
      prompt: 'Mengapa Object.create(null) membantu mencegah prototype pollution?',
      options: [
        'Karena objek tersebut tidak dapat dimodifikasi',
        'Karena objek tersebut tidak memiliki prototype yang bisa dipolusi',
        'Karena objek tersebut otomatis di-hash',
        'Karena objek tersebut hanya menerima string key',
      ],
      correctOptionIndex: 1,
      explanation:
        'Object.create(null) membuat objek tanpa prototype, sehingga tidak mewarisi Object.prototype dan tidak rentan terhadap pollution-nya.',
    },
    {
      id: 'q-08-04',
      order: 4,
      prompt: 'Apa singkatan dari ReDoS?',
      options: [
        'Recursive Denial of Service',
        'Regular Expression Denial of Service',
        'Runtime Error Denial of Service',
        'Request Denial of Service',
      ],
      correctOptionIndex: 1,
      explanation:
        'ReDoS adalah Regular Expression Denial of Service, yaitu serangan yang memanfaatkan regex dengan backtracking eksponensial.',
    },
    {
      id: 'q-08-05',
      order: 5,
      prompt: 'Apa tujuan atribut integrity pada tag script eksternal?',
      options: [
        'Mengatur cache browser',
        'Memverifikasi file tidak dimodifikasi dengan hash kriptografis',
        'Mengizinkan CORS',
        'Mengenkripsi komunikasi network',
      ],
      correctOptionIndex: 1,
      explanation:
        'Atribut integrity (SRI) memastikan resource eksternal cocok dengan hash yang diharapkan sebelum dieksekusi.',
    },
    {
      id: 'q-08-06',
      order: 6,
      prompt: 'Mengapa lockfile seperti pnpm-lock.yaml penting untuk keamanan supply chain?',
      options: [
        'Karena mengurangi ukuran kode sumber',
        'Karena mencatat hash integrity dan versi exact setiap dependency',
        'Karena menggantikan kebutuhan test',
        'Karena menyembunyikan dependency dari attacker',
      ],
      correctOptionIndex: 1,
      explanation:
        'Lockfile mencatat versi exact dan hash integrity sehingga instalasi di environment lain identik dengan yang telah direview.',
    },
    {
      id: 'q-08-07',
      order: 7,
      prompt: 'Apa kegunaan Node.js Permission Model?',
      options: [
        'Meningkatkan kecepatan startup',
        'Membatasi akses file system, child process, dan worker threads',
        'Mengenkripsi semua file',
        'Menghapus semua dependency',
      ],
      correctOptionIndex: 1,
      explanation:
        'Node.js Permission Model membatasi kemampuan runtime sesuai kebutuhan minimal aplikasi.',
    },
    {
      id: 'q-08-08',
      order: 8,
      prompt: 'Apa itu SBOM dalam konteks keamanan perangkat lunak?',
      options: [
        'Single Binary Object Model',
        'Software Bill of Materials',
        'Secure Build Operation Manual',
        'Source Base Object Mapper',
      ],
      correctOptionIndex: 1,
      explanation:
        'SBOM adalah daftar komponen perangkat lunak yang digunakan, membantu audit dan respons insiden supply chain.',
    },
  ],
}
