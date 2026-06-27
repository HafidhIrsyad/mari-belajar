import type { Quiz } from '@/content/types'

export const ch07Quiz: Quiz = {
  id: 'quiz-ch-07-error-handling-and-modules',
  title: 'Quiz: Error Handling & Modules',
  passingScore: 8,
  questions: [
    {
      id: 'q-07-01',
      order: 1,
      prompt: 'Apa definisi interface error di Go?',
      options: [
        'type error interface { Error() string }',
        'type error struct { Message string }',
        'interface error { Code int }',
        'type error string',
      ],
      correctOptionIndex: 0,
      explanation:
        'Interface error hanya memerlukan satu method Error() yang mengembalikan string.',
    },
    {
      id: 'q-07-02',
      order: 2,
      prompt: 'Bagaimana cara membuat error sederhana di Go?',
      options: [
        'errors.New("pesan")',
        'new Error("pesan")',
        'throw new Error("pesan")',
        'Error.create("pesan")',
      ],
      correctOptionIndex: 0,
      explanation:
        'errors.New membuat error dari string. Fungsi ini berasal dari package errors.',
    },
    {
      id: 'q-07-03',
      order: 3,
      prompt: 'Verb mana yang digunakan untuk wrapping error di fmt.Errorf?',
      options: [
        '%w',
        '%v',
        '%s',
        '%e',
      ],
      correctOptionIndex: 0,
      explanation:
        '%w digunakan untuk wrapping error sehingga errors.Is dan errors.As masih bisa mengikuti chain error.',
    },
    {
      id: 'q-07-04',
      order: 4,
      prompt: 'Apa fungsi errors.Is?',
      options: [
        'Memeriksa apakah error sama dengan target di dalam chain',
        'Mengkonversi error ke string',
        'Membuat error baru',
        'Mengecek apakah error tidak nil',
      ],
      correctOptionIndex: 0,
      explanation:
        'errors.Is memeriksa kesamaan error, termasuk error yang dibungkus dalam chain.',
    },
    {
      id: 'q-07-05',
      order: 5,
      prompt: 'Apa fungsi errors.As?',
      options: [
        'Mengekstrak error dengan tipe spesifik dari chain',
        'Membuat error menjadi string',
        'Membandingkan dua error',
        'Menghapus wrapping dari error',
      ],
      correctOptionIndex: 0,
      explanation:
        'errors.As digunakan untuk memeriksa apakah ada error dalam chain yang cocok dengan tipe target.',
    },
    {
      id: 'q-07-06',
      order: 6,
      prompt: 'Apa file yang berisi checksum dependency di Go?',
      options: [
        'go.sum',
        'go.lock',
        'go.mod',
        'package-lock.json',
      ],
      correctOptionIndex: 0,
      explanation:
        'go.sum berisi checksum kriptografi dependency untuk memastikan integritas dan reproducibility.',
    },
    {
      id: 'q-07-07',
      order: 7,
      prompt: 'Apa itu Minimal Version Selection (MVS) di Go?',
      options: [
        'Memilih versi dependency paling rendah yang memenuhi semua requirement',
        'Memilih versi dependency paling tinggi yang tersedia',
        'Menolak dependency yang memiliki versi berbeda',
        'Mengabaikan versi dependency',
      ],
      correctOptionIndex: 0,
      explanation:
        'MVS memilih versi minimum yang memenuhi semua constraint, berbeda dengan resolusi dependency tradisional.',
    },
    {
      id: 'q-07-08',
      order: 8,
      prompt: 'Apa kegunaan go.work?',
      options: [
        'Mengelola multiple module dalam satu workspace',
        'Mengompilasi aplikasi web',
        'Mengelola test coverage',
        'Menyimpan konfigurasi linter',
      ],
      correctOptionIndex: 0,
      explanation:
        'go.work digunakan untuk mengembangkan beberapa modul terkait dalam satu workspace tanpa publish.',
    },
  ],
}
