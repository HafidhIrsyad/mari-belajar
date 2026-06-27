import type { Quiz } from '@/content/types'

export const ch01Quiz: Quiz = {
  id: 'quiz-ch-01-introduction-to-javascript',
  title: 'Quiz: Pengenalan JavaScript dan Lingkungan Development',
  passingScore: 8,
  questions: [
    {
      id: 'q-01-01',
      order: 1,
      prompt: 'Apa fungsi utama console.log dalam JavaScript?',
      options: [
        'Menampilkan pesan atau nilai ke console',
        'Menghapus data dari memori',
        'Menghentikan eksekusi program',
        'Mengompilasi kode JavaScript',
      ],
      correctOptionIndex: 0,
      explanation:
        'console.log digunakan untuk menampilkan pesan, nilai variabel, atau informasi lain ke console saat development atau debugging.',
    },
    {
      id: 'q-01-02',
      order: 2,
      prompt: 'Perintah apa yang digunakan untuk mengaktifkan strict mode di JavaScript?',
      options: [
        '"use strict";',
        '"enable strict";',
        '"strict mode";',
        '"mode strict";',
      ],
      correctOptionIndex: 0,
      explanation: 'Strict mode diaktifkan dengan menulis "use strict"; di awal file atau di dalam fungsi.',
    },
    {
      id: 'q-01-03',
      order: 3,
      prompt: 'Manakah dari berikut yang merupakan contoh expression?',
      options: [
        'let x = 10;',
        'if (x > 5) {}',
        '5 + 3',
        'console.log("Halo");',
      ],
      correctOptionIndex: 2,
      explanation:
        'Expression adalah bagian kode yang menghasilkan nilai, seperti 5 + 3 yang menghasilkan 8. Statement adalah instruksi lengkap.',
    },
    {
      id: 'q-01-04',
      order: 4,
      prompt: 'Apa singkatan dari REPL dalam konteks Node.js?',
      options: [
        'Read-Eval-Print Loop',
        'Run-Execute-Print Loop',
        'Read-Execute-Process Loop',
        'Render-Eval-Print Loop',
      ],
      correctOptionIndex: 0,
      explanation:
        'REPL adalah Read-Eval-Print Loop, lingkungan interaktif yang membaca input, mengevaluasinya, mencetak hasil, dan mengulangi proses.',
    },
    {
      id: 'q-01-05',
      order: 5,
      prompt: 'Engine JavaScript apa yang digunakan oleh Google Chrome dan Node.js?',
      options: [
        'SpiderMonkey',
        'JavaScriptCore',
        'V8',
        'Chakra',
      ],
      correctOptionIndex: 2,
      explanation:
        'V8 adalah engine JavaScript yang dikembangkan Google dan digunakan oleh Google Chrome serta Node.js.',
    },
    {
      id: 'q-01-06',
      order: 6,
      prompt: 'Di mana kode JavaScript bisa dijalankan tanpa memerlukan instalasi tambahan?',
      options: [
        'Browser console',
        'Hanya di server cloud',
        'Hanya dengan Node.js',
        'Hanya dengan IDE berbayar',
      ],
      correctOptionIndex: 0,
      explanation:
        'Hampir semua browser modern memiliki console di DevTools yang bisa langsung menjalankan kode JavaScript tanpa instalasi tambahan.',
    },
    {
      id: 'q-01-07',
      order: 7,
      prompt: 'Apa perbedaan utama antara JavaScript di browser dan Node.js?',
      options: [
        'Browser fokus pada DOM dan event, Node.js fokus pada server dan file system',
        'Browser tidak bisa menjalankan JavaScript',
        'Node.js hanya berjalan di Windows',
        'Browser JavaScript selalu lebih cepat dari Node.js',
      ],
      correctOptionIndex: 0,
      explanation:
        'Browser menyediakan API seperti DOM dan event untuk interaksi pengguna, sedangkan Node.js menyediakan API server, file system, dan networking.',
    },
    {
      id: 'q-01-08',
      order: 8,
      prompt: 'Manakah yang termasuk package manager di ekosistem JavaScript?',
      options: [
        'npm',
        'Docker',
        'Kubernetes',
        'Apache',
      ],
      correctOptionIndex: 0,
      explanation:
        'npm adalah package manager bawaan Node.js yang digunakan untuk mengelola library dan dependensi dalam proyek JavaScript.',
    },
  ],
}
