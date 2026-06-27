import type { Quiz } from '@/content/types'

export const ch03Quiz: Quiz = {
  id: 'quiz-ch-03-control-flow',
  title: 'Quiz: Control Flow',
  passingScore: 8,
  questions: [
    {
      id: 'q-03-01',
      order: 1,
      prompt: 'Manakah pernyataan yang benar tentang evaluasi if/else if/else?',
      options: [
        'Semua kondisi dievaluasi meskipun satu sudah terpenuhi',
        'Kondisi dievaluasi berurutan dan berhenti setelah satu kondisi terpenuhi',
        'Else if wajib ada setiap if',
        'Else harus selalu diikuti oleh kondisi baru',
      ],
      correctOptionIndex: 1,
      explanation:
        'Pada struktur if/else if/else, JavaScript mengevaluasi kondisi dari atas ke bawah dan berhenti pada blok pertama yang kondisinya benar.',
    },
    {
      id: 'q-03-02',
      order: 2,
      prompt: 'Apa fungsi keyword `break` di dalam switch?',
      options: [
        'Mengulang evaluasi case yang sama',
        'Menghentikan eksekusi case agar tidak jatuh ke case berikutnya',
        'Menandakan case default',
        'Membuka blok case baru',
      ],
      correctOptionIndex: 1,
      explanation:
        'Keyword break menghentikan eksekusi switch. Tanpa break, eksekusi akan fall-through ke case berikutnya hingga ditemukan break atau switch berakhir.',
    },
    {
      id: 'q-03-03',
      order: 3,
      prompt: 'Loop manakah yang dijamin menjalankan bloknya setidaknya satu kali?',
      options: ['for', 'while', 'do...while', 'for...of'],
      correctOptionIndex: 2,
      explanation:
        'do...while memeriksa kondisi setelah blok kode dijalankan, sehingga bloknya selalu dieksekusi minimal sekali.',
    },
    {
      id: 'q-03-04',
      order: 4,
      prompt: 'Manakah dari nilai berikut yang dianggap falsy di JavaScript?',
      options: ['"0"', '[]', 'undefined', '{}'],
      correctOptionIndex: 2,
      explanation:
        'undefined adalah nilai falsy. String "0", array kosong [], dan objek kosong {} dianggap truthy meskipun terlihat "kosong".',
    },
    {
      id: 'q-03-05',
      order: 5,
      prompt: 'Apa perbedaan utama `break` dan `continue` dalam loop?',
      options: [
        'break melewati iterasi saat ini, continue menghentikan seluruh loop',
        'break menghentikan seluruh loop, continue melewati iterasi saat ini',
        'Keduanya menghentikan seluruh loop',
        'Keduanya hanya berlaku di dalam switch',
      ],
      correctOptionIndex: 1,
      explanation:
        'break menghentikan seluruh loop dan keluar dari iterasi. continue menghentikan iterasi saat ini dan lanjut ke iterasi berikutnya.',
    },
    {
      id: 'q-03-06',
      order: 6,
      prompt: 'Mengapa `forEach` kurang tepat digunakan saat ingin menghentikan iterasi lebih awal?',
      options: [
        'forEach selalu menghasilkan error jika dihentikan',
        'forEach tidak mendukung break atau continue',
        'forEach hanya bisa digunakan pada array kosong',
        'forEach lebih lambat dari for biasa',
      ],
      correctOptionIndex: 1,
      explanation:
        'Method forEach tidak menyediakan cara untuk menghentikan iterasi lebih awal seperti break atau continue. Gunakan for atau for...of jika diperlukan penghentian.',
    },
    {
      id: 'q-03-07',
      order: 7,
      prompt: 'Apa tujuan utama dari guard clause?',
      options: [
        'Menambahkan banyak percabangan bersarang di tengah fungsi',
        'Menangani kasus tidak valid di awal fungsi sebelum logika utama',
        'Mengganti semua loop menjadi rekursi',
        'Menghapus semua return statement dari fungsi',
      ],
      correctOptionIndex: 1,
      explanation:
        'Guard clause adalah teknik early return yang menangani kondisi tidak valid di awal fungsi, sehingga logika utama menjadi lebih datar dan mudah dibaca.',
    },
    {
      id: 'q-03-08',
      order: 8,
      prompt: 'Bagaimana Go menangani perulangan yang dalam JavaScript menggunakan while?',
      options: [
        'Go memiliki keyword while yang terpisah',
        'Go menggunakan for dengan kondisi saja, tanpa inisialisasi dan post-statement',
        'Go tidak mendukung perulangan kondisional',
        'Go hanya mendukung for dengan tiga bagian lengkap',
      ],
      correctOptionIndex: 1,
      explanation:
        'Go hanya memiliki keyword for. Untuk meniru while, kita menulis for dengan hanya kondisi, misalnya `for count < 3 { ... }`.',
    },
  ],
}
