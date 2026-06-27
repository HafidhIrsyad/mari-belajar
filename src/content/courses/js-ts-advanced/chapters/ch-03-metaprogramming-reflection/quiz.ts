import type { Quiz } from '@/content/types'

export const ch03Quiz: Quiz = {
  id: 'quiz-ch-03-metaprogramming-reflection',
  title: 'Quiz: Metaprogramming & Reflection',
  passingScore: 8,
  questions: [
    {
      id: 'q-03-01',
      order: 1,
      prompt: 'Apa yang dikontrol oleh property descriptor `writable`?',
      options: [
        'Apakah properti dapat dihapus',
        'Apakah nilai properti dapat diubah',
        'Apakah properti muncul di Object.keys',
        'Apakah properti dapat dijadikan getter',
      ],
      correctOptionIndex: 1,
      explanation:
        '`writable: false` mencegah nilai properti diubah setelah didefinisikan.',
    },
    {
      id: 'q-03-02',
      order: 2,
      prompt: 'Trap Proxy manakah yang mencegat operasi `delete` pada properti?',
      options: ['get', 'set', 'deleteProperty', 'ownKeys'],
      correctOptionIndex: 2,
      explanation:
        'Trap `deleteProperty` dipicu saat operator `delete` digunakan pada properti proxy.',
    },
    {
      id: 'q-03-03',
      order: 3,
      prompt: 'Apa fungsi utama Reflect API?',
      options: [
        'Menyediakan operator matematika baru',
        'Menyediakan versi fungsional dari operator object untuk digunakan di dalam trap',
        'Menggantikan Proxy sepenuhnya',
        'Menambahkan method baru ke Array.prototype',
      ],
      correctOptionIndex: 1,
      explanation:
        'Reflect menyediakan fungsi seperti `Reflect.set` dan `Reflect.get` yang sesuai dengan operator object, sehingga mudah digunakan di dalam Proxy trap.',
    },
    {
      id: 'q-03-04',
      order: 4,
      prompt: 'Symbol manakah yang mengubah perilaku iterasi objek dengan for...of?',
      options: [
        'Symbol.toPrimitive',
        'Symbol.iterator',
        'Symbol.toStringTag',
        'Symbol.hasInstance',
      ],
      correctOptionIndex: 1,
      explanation:
        '`Symbol.iterator` mendefinisikan default iterator untuk objek, yang digunakan oleh `for...of`.',
    },
    {
      id: 'q-03-05',
      order: 5,
      prompt: 'Apa yang biasanya disimpan menggunakan decorator metadata di TypeScript?',
      options: [
        'State runtime aplikasi',
        'Informasi tambahan tentang class/property untuk digunakan oleh framework atau validator',
        'Nilai variabel global',
        'Cache hasil komputasi',
      ],
      correctOptionIndex: 1,
      explanation:
        'Decorator metadata menyimpan informasi seperti nama kolom, tipe, atau aturan validasi agar dapat dibaca saat runtime.',
    },
    {
      id: 'q-03-06',
      order: 6,
      prompt: 'Apa keuntungan utama custom transformer TypeScript?',
      options: [
        'Mengurangi jumlah file sumber',
        'Mengubah AST saat kompilasi untuk menghasilkan kode yang diinginkan',
        'Menonaktifkan type checking',
        'Menambahkan runtime type guard otomatis',
      ],
      correctOptionIndex: 1,
      explanation:
        'Custom transformer bekerja pada level AST untuk mengubah kode selama proses kompilasi.',
    },
    {
      id: 'q-03-07',
      order: 7,
      prompt: 'Dalam Go, apa yang dapat dibaca dari struct tag menggunakan reflect?',
      options: [
        'Hanya nama field',
        'Metadata string seperti json, validate, db',
        'Nilai variabel global',
        'Pointer ke method',
      ],
      correctOptionIndex: 1,
      explanation:
        'Struct tag di Go adalah string metadata yang dapat diambil dengan `reflect.StructTag.Get`.',
    },
    {
      id: 'q-03-08',
      order: 8,
      prompt: 'Mengapa metaprogramming harus digunakan dengan hati-hati?',
      options: [
        'Karena selalu menambahkan overhead memori besar',
        'Karena dapat menyulitkan debugging dan menurunkan performa jika disalahgunakan',
        'Karena tidak didukung oleh browser modern',
        'Karena melarang penggunaan class',
      ],
      correctOptionIndex: 1,
      explanation:
        'Metaprogramming memang kuat, tetapi logika yang terlalu ajaib bisa sulit di-debug dan memperlambat runtime.',
    },
  ],
}
