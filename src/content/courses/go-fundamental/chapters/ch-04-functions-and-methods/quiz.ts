import type { Quiz } from '@/content/types'

export const ch04Quiz: Quiz = {
  id: 'quiz-ch-04-functions-and-methods',
  title: 'Quiz: Functions & Methods',
  passingScore: 8,
  questions: [
    {
      id: 'q-04-01',
      order: 1,
      prompt: 'Bagaimana cara mendeklarasikan fungsi di Go?',
      options: [
        'func nama(param int) int',
        'function nama(param: int): int',
        'def nama(param int) int',
        'const nama = (param int) => int',
      ],
      correctOptionIndex: 0,
      explanation:
        'Fungsi di Go dideklarasikan dengan keyword func, diikuti nama, parameter, dan tipe return.',
    },
    {
      id: 'q-04-02',
      order: 2,
      prompt: 'Apa kegunaan multiple return values di Go?',
      options: [
        'Mengembalikan hasil sekaligus error atau informasi tambahan',
        'Mengembalikan array secara otomatis',
        'Meningkatkan ukuran stack',
        'Menggantikan struct',
      ],
      correctOptionIndex: 0,
      explanation:
        'Multiple return values sangat umum di Go untuk mengembalikan (result, error).',
    },
    {
      id: 'q-04-03',
      order: 3,
      prompt: 'Apa yang dimaksud dengan variadic parameter?',
      options: [
        'Parameter yang menerima sejumlah argumen sama tipe',
        'Parameter yang tidak menerima argumen',
        'Parameter yang hanya menerima slice',
        'Parameter yang selalu bernilai nol',
      ],
      correctOptionIndex: 0,
      explanation:
        'Variadic parameter menggunakan ...type dan menerima nol atau lebih argumen yang sama tipe.',
    },
    {
      id: 'q-04-04',
      order: 4,
      prompt: 'Apa perbedaan value receiver dan pointer receiver?',
      options: [
        'Value receiver bekerja pada salinan, pointer receiver pada objek asli',
        'Value receiver hanya untuk string, pointer receiver untuk struct',
        'Pointer receiver lebih lambat dari value receiver dalam semua kasus',
        'Value receiver bisa mengubah state objek asli',
      ],
      correctOptionIndex: 0,
      explanation:
        'Value receiver membuat salinan objek, sehingga perubahan tidak mempengaruhi aslinya. Pointer receiver mengakses objek asli.',
    },
    {
      id: 'q-04-05',
      order: 5,
      prompt: 'Mengapa method dengan pointer receiver bisa mengubah state?',
      options: [
        'Karena receiver berisi alamat memori objek asli',
        'Karena pointer receiver selalu menyalin objek',
        'Karena Go menyimpan variabel global secara otomatis',
        'Karena method dieksekusi secara paralel',
      ],
      correctOptionIndex: 0,
      explanation:
        'Pointer receiver memiliki alamat memori objek asli, sehingga modifikasi pada field langsung berpengaruh pada objek tersebut.',
    },
    {
      id: 'q-04-06',
      order: 6,
      prompt: 'Apa itu closure di Go?',
      options: [
        'Fungsi yang menangkap variabel dari scope sekitarnya',
        'Fungsi yang tidak memiliki return value',
        'Fungsi yang hanya bisa dipanggil sekali',
        'Fungsi yang selalu menghasilkan error',
      ],
      correctOptionIndex: 0,
      explanation:
        'Closure adalah fungsi yang mereferensi variabel di luar body-nya, sehingga variabel tetap hidup setelah fungsi luar selesai.',
    },
    {
      id: 'q-04-07',
      order: 7,
      prompt: 'Bagaimana method set dari tipe T dibandingkan dengan *T?',
      options: [
        '*T memiliki semua method T ditambah method pointer receiver',
        'T dan *T memiliki method set yang sama',
        'T memiliki lebih banyak method daripada *T',
        'Method set hanya berlaku untuk interface',
      ],
      correctOptionIndex: 0,
      explanation:
        'Method set T berisi value receiver methods. Method set *T berisi value dan pointer receiver methods.',
    },
    {
      id: 'q-04-08',
      order: 8,
      prompt: 'Apa keuntungan pointer receiver untuk struct besar?',
      options: [
        'Menghindari copy seluruh struct ke stack',
        'Membuat struct immutable',
        'Meningkatkan keamanan tipe',
        'Mengizinkan multiple inheritance',
      ],
      correctOptionIndex: 0,
      explanation:
        'Pointer receiver menghindari copy besar struct, sehingga lebih efisien memori dan waktu.',
    },
  ],
}
