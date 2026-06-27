import type { Quiz } from '@/content/types'

export const ch05Quiz: Quiz = {
  id: 'quiz-ch-05-modules-bundler-tooling',
  title: 'Quiz: Modules, Bundler & Tooling',
  passingScore: 8,
  questions: [
    {
      id: 'q-05-01',
      order: 1,
      prompt: 'Keyword apa yang digunakan untuk mengekspor fitur dari ES module?',
      options: [
        'module.exports',
        'export',
        'require',
        'provide',
      ],
      correctOptionIndex: 1,
      explanation:
        'ES module menggunakan export untuk mengekspor named atau default export.',
    },
    {
      id: 'q-05-02',
      order: 2,
      prompt: 'Sistem module mana yang menggunakan require/module.exports?',
      options: [
        'ESM',
        'AMD',
        'CommonJS',
        'UMD',
      ],
      correctOptionIndex: 2,
      explanation:
        'CommonJS (CJS) menggunakan require untuk mengimpor dan module.exports untuk mengekspor.',
    },
    {
      id: 'q-05-03',
      order: 3,
      prompt: 'Apa fungsi utama tree shaking?',
      options: [
        'Menambah semua kode dependency ke bundle',
        'Menghapus kode yang tidak digunakan dari bundle',
        'Menggabungkan semua module menjadi satu file besar',
        'Menjalankan test otomatis saat build',
      ],
      correctOptionIndex: 1,
      explanation:
        'Tree shaking menganalisis static import untuk menghapus dead code sehingga bundle lebih kecil.',
    },
    {
      id: 'q-05-04',
      order: 4,
      prompt: 'Sintaks apa yang digunakan untuk memuat module secara lazy?',
      options: [
        'import x from "./x"',
        'const x = require("./x")',
        'const x = await import("./x")',
        'loadModule("./x")',
      ],
      correctOptionIndex: 2,
      explanation:
        'Dynamic import mengembalikan Promise dan memuat module secara on-demand.',
    },
    {
      id: 'q-05-05',
      order: 5,
      prompt: 'File konfigurasi apa yang biasanya digunakan untuk path alias seperti @/*?',
      options: [
        '.babelrc',
        'package.json',
        'tsconfig.json',
        '.eslintrc',
      ],
      correctOptionIndex: 2,
      explanation:
        'compilerOptions.paths di tsconfig.json mendefinisikan alias yang diterjemahkan ke folder tertentu.',
    },
    {
      id: 'q-05-06',
      order: 6,
      prompt: 'Apa masalah utama dari circular dependencies?',
      options: [
        'Bundle menjadi terlalu kecil',
        'Module mungkin menerima partial export atau undefined saat runtime',
        'Browser tidak mendukung ESM',
        'TypeScript otomatis menghapus circular import',
      ],
      correctOptionIndex: 1,
      explanation:
        'Circular dependencies bisa menyebabkan salah satu module dievaluasi sebelum export-nya siap, menghasilkan nilai undefined.',
    },
    {
      id: 'q-05-07',
      order: 7,
      prompt: 'Bundler mana yang menggunakan native ESM saat development?',
      options: [
        'Webpack',
        'Vite',
        'Parcel',
        'Browserify',
      ],
      correctOptionIndex: 1,
      explanation:
        'Vite memanfaatkan native ESM di browser selama development untuk cold start yang cepat.',
    },
    {
      id: 'q-05-08',
      order: 8,
      prompt: 'Bagaimana Go menentukan apakah identifier bisa diakses dari package lain?',
      options: [
        'Menggunakan keyword public/private',
        'Identifier yang diawali huruf kapital diekspor',
        'Menggunakan atribut @export',
        'Semua identifier selalu public',
      ],
      correctOptionIndex: 1,
      explanation:
        'Di Go, identifier yang diawali huruf kapital diekspor dan bisa diakses dari package lain.',
    },
  ],
}
