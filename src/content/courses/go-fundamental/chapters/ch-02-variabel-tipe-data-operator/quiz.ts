import type { Quiz } from '@/content/types'

export const ch02Quiz: Quiz = {
  id: 'quiz-ch-02-variabel-tipe-data-operator',
  title: 'Quiz: Variabel, Tipe Data & Operator',
  passingScore: 8,
  questions: [
    {
      id: 'q-02-01',
      order: 1,
      prompt: 'Deklarasi mana yang menggunakan short variable declaration?',
      options: [
        'umur := 25',
        'var umur int = 25',
        'const umur = 25',
        'umur = 25',
      ],
      correctOptionIndex: 0,
      explanation:
        'Operator := adalah short variable declaration yang mendeklarasikan dan menginisialisasi variabel sekaligus.',
    },
    {
      id: 'q-02-02',
      order: 2,
      prompt: 'Berapa zero value dari tipe string di Go?',
      options: [
        '""',
        'nil',
        '0',
        'false',
      ],
      correctOptionIndex: 0,
      explanation:
        'Zero value dari string adalah string kosong ("").',
    },
    {
      id: 'q-02-03',
      order: 3,
      prompt: 'Apa yang terjadi saat mengkonversi int ke float64 di Go?',
      options: [
        'Harus menggunakan konversi eksplisit seperti float64(x)',
        'Konversi dilakukan secara otomatis',
        'Tidak bisa dikonversi',
        'Akan menghasilkan compile warning',
      ],
      correctOptionIndex: 0,
      explanation:
        'Go tidak memiliki implicit coercion. Konversi antar tipe numerik harus dilakukan secara eksplisit.',
    },
    {
      id: 'q-02-04',
      order: 4,
      prompt: 'Tipe apa yang merepresentasikan Unicode code point di Go?',
      options: [
        'rune',
        'byte',
        'char',
        'unicode',
      ],
      correctOptionIndex: 0,
      explanation:
        'rune adalah alias untuk int32 yang merepresentasikan Unicode code point.',
    },
    {
      id: 'q-02-05',
      order: 5,
      prompt: 'Apa hasil dari len("Gō") jika ō adalah satu rune multi-byte?',
      options: [
        'Jumlah byte, bukan jumlah rune',
        'Selalu 2',
        'Selalu 3',
        'Error',
      ],
      correctOptionIndex: 0,
      explanation:
        'len pada string menghitung jumlah byte. Untuk karakter multi-byte UTF-8, hasilnya bisa lebih besar dari jumlah rune.',
    },
    {
      id: 'q-02-06',
      order: 6,
      prompt: 'Apa fungsi operator & pada variabel x di Go?',
      options: [
        'Mengambil alamat memori x',
        'Mendereferensi pointer x',
        'Melakukan bitwise AND',
        'Mengalokasikan memori di heap',
      ],
      correctOptionIndex: 0,
      explanation:
        'Operator & menghasilkan pointer ke variabel, yaitu alamat memori tempat variabel disimpan.',
    },
    {
      id: 'q-02-07',
      order: 7,
      prompt: 'Apa karakteristik pointer di Go?',
      options: [
        'Go memiliki pointer tetapi tidak mengizinkan pointer aritmatika',
        'Go tidak memiliki pointer',
        'Go mengizinkan pointer aritmatika seperti C',
        'Pointer selalu menunjuk ke heap',
      ],
      correctOptionIndex: 0,
      explanation:
        'Go memiliki pointer untuk efisiensi, tetapi tidak mengizinkan pointer aritmatika agar tetap aman.',
    },
    {
      id: 'q-02-08',
      order: 8,
      prompt: 'Bagaimana cara mengubah string "42" menjadi int di Go?',
      options: [
        'strconv.Atoi("42")',
        'int("42")',
        'Number("42")',
        'parseInt("42")',
      ],
      correctOptionIndex: 0,
      explanation:
        'strconv.Atoi digunakan untuk mengkonversi string menjadi integer di Go.',
    },
  ],
}
