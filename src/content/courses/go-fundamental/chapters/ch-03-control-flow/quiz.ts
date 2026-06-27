import type { Quiz } from '@/content/types'

export const ch03Quiz: Quiz = {
  id: 'quiz-ch-03-control-flow',
  title: 'Quiz: Control Flow',
  passingScore: 8,
  questions: [
    {
      id: 'q-03-01',
      order: 1,
      prompt: 'Kata kunci apa yang digunakan untuk perulangan di Go?',
      options: [
        'for',
        'while',
        'do-while',
        'foreach',
      ],
      correctOptionIndex: 0,
      explanation:
        'for adalah satu-satunya kata kunci perulangan di Go, meskipun dapat digunakan dalam berbagai bentuk.',
    },
    {
      id: 'q-03-02',
      order: 2,
      prompt: 'Apa perilaku default switch case di Go?',
      options: [
        'Setiap case berhenti secara implisit tanpa break',
        'Setiap case fallthrough ke case berikutnya',
        'Switch hanya menerima tipe integer',
        'Switch memerlukan break di setiap case',
      ],
      correctOptionIndex: 0,
      explanation:
        'Di Go, switch tidak fallthrough secara default. Setiap case berhenti setelah satu case cocok.',
    },
    {
      id: 'q-03-03',
      order: 3,
      prompt: 'Apa fungsi dari keyword defer?',
      options: [
        'Menunda eksekusi fungsi sampai fungsi induk selesai',
        'Melewatkan iterasi loop',
        'Menghentikan program',
        'Mengubah urutan eksekusi goroutine',
      ],
      correctOptionIndex: 0,
      explanation:
        'defer menunda eksekusi fungsi hingga fungsi yang memanggil defer selesai, sering digunakan untuk cleanup.',
    },
    {
      id: 'q-03-04',
      order: 4,
      prompt: 'Dalam urutan apa defer dieksekusi?',
      options: [
        'LIFO (Last In, First Out)',
        'FIFO (First In, First Out)',
        'Secara acak',
        'Berdasarkan prioritas',
      ],
      correctOptionIndex: 0,
      explanation:
        'Defer dieksekusi dalam urutan LIFO: defer yang didaftarkan terakhir dieksekusi pertama kali.',
    },
    {
      id: 'q-03-05',
      order: 5,
      prompt: 'Bagaimana cara menangkap panic di Go?',
      options: [
        'Dengan recover di dalam deferred function',
        'Dengan try/catch',
        'Dengan catch block',
        'Panic tidak bisa ditangkap',
      ],
      correctOptionIndex: 0,
      explanation:
        'recover hanya efektif jika dipanggil di dalam deferred function saat panic sedang melakukan stack unwinding.',
    },
    {
      id: 'q-03-06',
      order: 6,
      prompt: 'Apa output dari kode berikut?\nfor i := 0; i < 3; i++ { defer fmt.Print(i) }',
      options: [
        '210',
        '012',
        '222',
        '000',
      ],
      correctOptionIndex: 0,
      explanation:
        'Argumen defer dievaluasi saat pendaftaran. Defer dieksekusi LIFO, sehingga outputnya 210.',
    },
    {
      id: 'q-03-07',
      order: 7,
      prompt: 'Apa fungsi blank identifier _ dalam range loop?',
      options: [
        'Mengabaikan nilai yang tidak dibutuhkan',
        'Menandai variabel global',
        'Membuat variabel privat',
        'Menginisialisasi variabel kosong',
      ],
      correctOptionIndex: 0,
      explanation:
        'Blank identifier _ digunakan untuk mengabaikan nilai return yang tidak dibutuhkan, seperti indeks pada range.',
    },
    {
      id: 'q-03-08',
      order: 8,
      prompt: 'Bagaimana bentuk for yang setara dengan while di Go?',
      options: [
        'for condition { }',
        'while condition { }',
        'do { } while condition',
        'loop condition { }',
      ],
      correctOptionIndex: 0,
      explanation:
        'Go tidak memiliki while. Bentuk for dengan satu kondisi, for condition { }, setara dengan while.',
    },
  ],
}
