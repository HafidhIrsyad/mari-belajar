import type { Quiz } from '@/content/types'

export const ch03Quiz: Quiz = {
  id: 'quiz-ch-03-state-management',
  title: 'Quiz: State Management',
  passingScore: 8,
  questions: [
    {
      id: 'q-03-01',
      order: 1,
      prompt: 'Kapan lifting state up menjadi solusi yang tepat?',
      options: [
        'Ketika state hanya digunakan oleh satu komponen',
        'Ketika dua komponen sibling perlu berbagi state yang sama',
        'Ketika state berasal dari server',
        'Ketika ingin menghindari penggunaan props sama sekali',
      ],
      correctOptionIndex: 1,
      explanation:
        'Lifting state up memindahkan state ke parent terdekat yang memiliki kedua komponen yang perlu berbagi data.',
    },
    {
      id: 'q-03-02',
      order: 2,
      prompt: 'Apa masalah utama dari prop drilling?',
      options: [
        'Props tidak dapat berisi objek',
        'Data harus melewati banyak komponen perantara yang tidak membutuhkannya',
        'Komponen tidak bisa memiliki state sendiri',
        'Render menjadi synchronous',
      ],
      correctOptionIndex: 1,
      explanation:
        'Prop drilling membuat komponen perantara harus meneruskan props hanya untuk komponen di bawahnya, yang mengurangi maintainability.',
    },
    {
      id: 'q-03-03',
      order: 3,
      prompt: 'Apa fungsi utama Context API di React?',
      options: [
        'Menggantikan useState sepenuhnya',
        'Menyediakan cara melewatkan value ke subtree tanpa prop drilling',
        'Menyimpan cache data dari server',
        'Mengoptimalkan performa render secara otomatis',
      ],
      correctOptionIndex: 1,
      explanation:
        'Context API seperti dependency injection: value disediakan oleh Provider dan dapat diakses oleh consumer di subtree mana pun.',
    },
    {
      id: 'q-03-04',
      order: 4,
      prompt: 'Prinsip apa yang membuat Redux memiliki state yang prediktabil?',
      options: [
        'State dapat diubah langsung oleh komponen',
        'Perubahan state hanya melalui action dan pure reducer',
        'Setiap komponen memiliki store sendiri',
        'Reducer boleh memiliki side effect',
      ],
      correctOptionIndex: 1,
      explanation:
        'Dengan action dan pure reducer, output state selalu dapat diprediksi dari input state dan action.',
    },
    {
      id: 'q-03-05',
      order: 5,
      prompt: 'Apa keuntungan menggunakan selector pada state management?',
      options: [
        'Selector membuat state menjadi mutable',
        'Selector memisahkan derived state dan mencegah komputasi berulang',
        'Selector menghilangkan kebutuhan reducer',
        'Selector otomatis mengupdate server',
      ],
      correctOptionIndex: 1,
      explanation:
        'Selector mengekstrak atau menghitung derived state sehingga komponen tidak perlu mengetahui struktur internal store.',
    },
    {
      id: 'q-03-06',
      order: 6,
      prompt: 'Bagaimana Zustand umumnya menyimpan state?',
      options: [
        'Di dalam React Context Provider',
        'Di store eksternal berbasis closure yang persist antar render',
        'Di localStorage secara otomatis',
        'Di dalam setiap komponen secara terpisah',
      ],
      correctOptionIndex: 1,
      explanation:
        'Zustand membuat store sekali di luar komponen menggunakan closure, lalu komponen berlangganan melalui selector.',
    },
    {
      id: 'q-03-07',
      order: 7,
      prompt: 'Apa keunggulan atomic stores seperti Jotai?',
      options: [
        'Semua state harus disimpan dalam satu objek besar',
        'Update hanya memengaruhi komponen yang subscribe ke atom tertentu',
        'Tidak memerlukan hooks',
        'Otomatis terintegrasi dengan Redux',
      ],
      correctOptionIndex: 1,
      explanation:
        'Atomic stores memecah state menjadi unit kecil. Komponen hanya re-render jika atom yang mereka gunakan berubah.',
    },
    {
      id: 'q-03-08',
      order: 8,
      prompt: 'Mengapa server state sebaiknya ditangani oleh library khusus seperti TanStack Query?',
      options: [
        'Karena useState tidak bisa menyimpan objek',
        'Karena server state membutuhkan caching, invalidasi, sinkronisasi, dan penanganan error yang kompleks',
        'Karena Context API dilarang untuk data dari server',
        'Karena reducer tidak bisa menerima Promise',
      ],
      correctOptionIndex: 1,
      explanation:
        'Server state memiliki karakteristik unik seperti caching, stale-while-revalidate, retry, dan background refetch yang lebih baik ditangani oleh library khusus.',
    },
  ],
}
