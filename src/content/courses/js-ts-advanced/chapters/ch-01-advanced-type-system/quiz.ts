import type { Quiz } from '@/content/types'

export const ch01Quiz: Quiz = {
  id: 'quiz-ch-01-advanced-type-system',
  title: 'Quiz: Advanced Type System',
  passingScore: 8,
  questions: [
    {
      id: 'q-01-01',
      order: 1,
      prompt: 'Apa fungsi utama dari type constraint pada generic?',
      options: [
        'Membuat tipe menjadi opsional',
        'Membatasi type parameter agar memiliki properti atau shape tertentu',
        'Mengganti nama tipe menjadi string',
        'Menambahkan validasi runtime pada tipe',
      ],
      correctOptionIndex: 1,
      explanation:
        'Constraint seperti `T extends { length: number }` membatasi type parameter sehingga hanya tipe dengan properti `length` yang dapat digunakan.',
    },
    {
      id: 'q-01-02',
      order: 2,
      prompt: 'Mengapa branded types digunakan di TypeScript?',
      options: [
        'Agar tipe bersifat nominal meskipun TypeScript menggunakan structural typing',
        'Agar tipe otomatis terdaftar di registry runtime',
        'Agar generic dapat menerima lebih dari satu parameter',
        'Agar type checking berjalan lebih cepat',
      ],
      correctOptionIndex: 0,
      explanation:
        'Branded type menambahkan tag unik pada tipe primitif sehingga dua tipe dengan underlying type sama tidak bisa saling di-assign secara tidak sengaja.',
    },
    {
      id: 'q-01-03',
      order: 3,
      prompt: 'Bagaimana TypeScript mendistribusikan conditional type terhadap union?',
      options: [
        'T extends U ? X : Y didistribusikan ke setiap anggota union T',
        'Union dianggap sebagai satu tipe dan tidak didistribusikan',
        'Conditional type hanya bekerja untuk interface',
        'Distribusi hanya terjadi pada tipe array',
      ],
      correctOptionIndex: 0,
      explanation:
        'Ketika T berupa union, conditional type `T extends U ? X : Y` diterapkan pada setiap anggota union secara terpisah.',
    },
    {
      id: 'q-01-04',
      order: 4,
      prompt: 'Apa kegunaan kata kunci `infer` dalam conditional type?',
      options: [
        'Menambahkan constraint pada generic',
        'Mengekstrak tipe dari pattern yang cocok',
        'Membuat tipe menjadi recursive',
        'Menghapus tipe saat runtime',
      ],
      correctOptionIndex: 1,
      explanation:
        '`infer` digunakan untuk menangkap tipe dari dalam pattern, misalnya return type atau parameter type sebuah fungsi.',
    },
    {
      id: 'q-01-05',
      order: 5,
      prompt: 'Teknik manakah yang memungkinkan validasi format string di level tipe?',
      options: [
        'Conditional types',
        'Template literal types',
        'Mapped types',
        'Branded types',
      ],
      correctOptionIndex: 1,
      explanation:
        'Template literal types membangun string literal dari tipe lain, sehingga format string tertentu dapat divalidasi secara statis.',
    },
    {
      id: 'q-01-06',
      order: 6,
      prompt: 'Bagaimana cara menonaktifkan distributive conditional type pada union?',
      options: [
        'Menggunakan `as const`',
        'Membungkus tipe input dalam tuple: `[T] extends [U]`',
        'Menggunakan `infer` di kedua cabang',
        'Mengubah union menjadi enum',
      ],
      correctOptionIndex: 1,
      explanation:
        'Menulis `[T] extends [U] ? X : Y` mencegah TypeScript mendistribusikan conditional type ke anggota union.',
    },
    {
      id: 'q-01-07',
      order: 7,
      prompt: 'Apa keuntungan utama type-level parser seperti RouteParams?',
      options: [
        'Mengurangi ukuran bundle runtime',
        'Menangkap kesalahan parameter saat compile time',
        'Mempercepat eksekusi parsing di browser',
        'Menghilangkan kebutuhan akan regex',
      ],
      correctOptionIndex: 1,
      explanation:
        'Type-level parser memastikan nama dan jumlah parameter path sudah benar sebelum kode dijalankan.',
    },
    {
      id: 'q-01-08',
      order: 8,
      prompt: 'Apa dampak type-level programming terhadap runtime?',
      options: [
        'Menambahkan overhead validasi saat runtime',
        'Tidak ada dampak runtime karena tipe dihapus saat kompilasi',
        'Mengubah output JavaScript menjadi lebih besar',
        'Menyebabkan error yang hanya muncul di browser',
      ],
      correctOptionIndex: 1,
      explanation:
        'TypeScript menggunakan erasable types; semua tipe dihapus setelah kompilasi sehingga tidak ada overhead runtime.',
    },
  ],
}
