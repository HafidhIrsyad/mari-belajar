import type { Quiz } from '@/content/types'

export const ch02Quiz: Quiz = {
  id: 'quiz-ch-02-css-layout-fundamentals',
  title: 'Quiz: CSS Layout Fundamentals',
  passingScore: 8,
  questions: [
    {
      id: 'q-02-01',
      order: 1,
      prompt: 'Dengan box-sizing: border-box, properti width mencakup?',
      options: [
        'Hanya content',
        'Content, padding, dan border',
        'Content dan margin',
        'Hanya padding',
      ],
      correctOptionIndex: 1,
      explanation:
        'border-box membuat width dan height mencakup content, padding, dan border, sehingga total ukuran lebih mudah diprediksi.',
    },
    {
      id: 'q-02-02',
      order: 2,
      prompt: 'Properti CSS apa yang paling tepat untuk layout satu dimensi?',
      options: ['Grid', 'Flexbox', 'Float', 'Position'],
      correctOptionIndex: 1,
      explanation:
        'Flexbox dirancang khusus untuk distribusi ruang dan penyelarasan sepanjang satu sumbu, baik horizontal maupun vertikal.',
    },
    {
      id: 'q-02-03',
      order: 3,
      prompt: 'Urutan pipeline rendering browser yang benar adalah?',
      options: [
        'Style → Layout → Paint → Composite',
        'Layout → Style → Paint → Composite',
        'Paint → Layout → Style → Composite',
        'Composite → Paint → Layout → Style',
      ],
      correctOptionIndex: 0,
      explanation:
        'Browser menghitung style, kemudian layout, lalu paint, dan terakhir composite untuk menghasilkan frame.',
    },
    {
      id: 'q-02-04',
      order: 4,
      prompt: 'Apa efek dari display: none pada render tree?',
      options: [
        'Elemen masuk render tree tetapi tidak terlihat',
        'Elemen dihapus dari render tree',
        'Elemen memicu composite layer baru',
        'Elemen tetap mengambil ruang kosong',
      ],
      correctOptionIndex: 1,
      explanation:
        'display: none menghilangkan elemen dari render tree, sehingga elemen tidak mengambil ruang sama sekali.',
    },
    {
      id: 'q-02-05',
      order: 5,
      prompt: 'Perubahan pada properti mana yang umumnya hanya memicu composite?',
      options: ['width', 'height', 'transform', 'top'],
      correctOptionIndex: 2,
      explanation:
        'transform dan opacity biasanya dipromosikan ke compositor layer, sehingga tidak memerlukan layout atau paint ulang.',
    },
    {
      id: 'q-02-06',
      order: 6,
      prompt: 'Apa itu forced synchronous layout?',
      options: [
        'Layout yang dipaksa berjalan di thread compositor',
        'Membaca properti layout setelah menulis style, memaksa browser menghitung layout terlebih dahulu',
        'Menggunakan position: fixed untuk mengunci elemen',
        'Menonaktifkan animasi dengan will-change: none',
      ],
      correctOptionIndex: 1,
      explanation:
        'Forced synchronous layout terjadi ketika JavaScript membaca nilai layout seperti offsetWidth setelah memodifikasi style, yang memaksa browser menyelesaikan layout sebelumnya.',
    },
    {
      id: 'q-02-07',
      order: 7,
      prompt: 'Fitur CSS apa yang memungkinkan komponen merespons ukuran containernya, bukan viewport?',
      options: ['Media queries', 'Container queries', 'Pseudo-classes', 'Keyframe animations'],
      correctOptionIndex: 1,
      explanation:
        'Container queries memungkinkan styling berdasarkan ukuran elemen induk, sehingga komponen menjadi lebih reusable.',
    },
    {
      id: 'q-02-08',
      order: 8,
      prompt: 'Properti contain: strict memberitahu browser bahwa?',
      options: [
        'Elemen harus selalu berada di tengah viewport',
        'Elemen bersifat isolasi layout, paint, dan size dari sisa dokumen',
        'Elemen akan dihapus dari render tree',
        'Elemen harus menggunakan flexbox',
      ],
      correctOptionIndex: 1,
      explanation:
        'contain: strict menggabungkan contain layout, paint, dan size, yang membatasi dampak perubahan elemen agar tidak merembet ke luar.',
    },
  ],
}
