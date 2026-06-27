import type { Quiz } from '@/content/types'

export const ch04Quiz: Quiz = {
  id: 'quiz-ch-04-forms-validation',
  title: 'Quiz: Forms & Validation',
  passingScore: 8,
  questions: [
    {
      id: 'q-04-01',
      order: 1,
      prompt: 'Mengapa setiap input sebaiknya memiliki label yang terhubung?',
      options: [
        'Agar CSS lebih mudah ditulis',
        'Agar screen reader dapat mengenali nama dan fungsi input',
        'Agar form dapat dikirim secara otomatis',
        'Agar browser mengabaikan validasi bawaan',
      ],
      correctOptionIndex: 1,
      explanation:
        'Label yang terhubung dengan input melalui for/id memberikan nama yang dapat dibaca oleh screen reader dan memperluas area klik.',
    },
    {
      id: 'q-04-02',
      order: 2,
      prompt: 'Atribut HTML5 apa yang memastikan field tidak boleh kosong?',
      options: ['pattern', 'required', 'minlength', 'novalidate'],
      correctOptionIndex: 1,
      explanation:
        'Atribut required membuat field wajib diisi sebelum form dapat disubmit.',
    },
    {
      id: 'q-04-03',
      order: 3,
      prompt: 'Method Constraint Validation API mana yang memeriksa seluruh form?',
      options: ['setCustomValidity', 'checkValidity', 'reportValidity', 'willValidate'],
      correctOptionIndex: 1,
      explanation:
        'checkValidity() mengembalikan boolean yang menandakan apakah semua kontrol dalam form memenuhi aturan validasi.',
    },
    {
      id: 'q-04-04',
      order: 4,
      prompt: 'Atribut ARIA apa yang menghubungkan input dengan pesan error?',
      options: ['aria-label', 'aria-describedby', 'aria-hidden', 'aria-expanded'],
      correctOptionIndex: 1,
      explanation:
        'aria-describedby menghubungkan elemen input dengan elemen lain yang memberikan deskripsi tambahan, seperti petunjuk atau pesan error.',
    },
    {
      id: 'q-04-05',
      order: 5,
      prompt: 'Mengapa server-side validation tetap diperlukan meskipun ada validasi klien?',
      options: [
        'Agar tampilan form lebih menarik',
        'Karena validasi klien bisa dimatikan atau diakali',
        'Agar server tidak perlu membaca database',
        'Karena browser selalu mengabaikan validasi HTML5',
      ],
      correctOptionIndex: 1,
      explanation:
        'Data dari klien tidak dapat dipercaya sepenuhnya. Server harus selalu memvalidasi ulang untuk keamanan dan konsistensi.',
    },
    {
      id: 'q-04-06',
      order: 6,
      prompt: 'API JavaScript apa yang membaca semua kontrol dalam form berdasarkan atribut name?',
      options: ['URLSearchParams', 'FormData', 'JSON.parse', 'localStorage'],
      correctOptionIndex: 1,
      explanation:
        'FormData API membaca nilai dari semua kontrol form secara otomatis berdasarkan atribut name masing-masing.',
    },
    {
      id: 'q-04-07',
      order: 7,
      prompt: 'Dalam React, atribut htmlFor pada label setara dengan?',
      options: ['for di HTML', 'id di input', 'name di form', 'type di input'],
      correctOptionIndex: 0,
      explanation:
        'Di JSX, kata kunci for dipesan untuk perulangan, sehingga React menggunakan htmlFor untuk menghubungkan label dengan input.',
    },
    {
      id: 'q-04-08',
      order: 8,
      prompt: 'Pesan error yang baik sebaiknya?',
      options: [
        'Hanya menampilkan ikon merah tanpa teks',
        'Menjelaskan apa yang salah dan cara memperbaikinya',
        'Disebutkan sekali di bagian bawah halaman tanpa detail',
        'Ditampilkan dalam bahasa mesin seperti kode error numerik',
      ],
      correctOptionIndex: 1,
      explanation:
        'Pesan error yang efektif menjelaskan masalah dan memberikan arahan perbaikan, lalu dihubungkan dengan field yang relevan.',
    },
  ],
}
