import type { Quiz } from '@/content/types'

export const ch01Quiz: Quiz = {
  id: 'quiz-ch-01-react-fundamentals-review',
  title: 'Quiz: React Fundamentals Review',
  passingScore: 8,
  questions: [
    {
      id: 'q-01-01',
      order: 1,
      prompt: 'Apa hasil kompilasi dari JSX seperti <div className="app">Halo</div>?',
      options: [
        'HTML string',
        'React.createElement("div", { className: "app" }, "Halo")',
        'DOM node langsung',
        'Objek window.app',
      ],
      correctOptionIndex: 1,
      explanation:
        'JSX dikompilasi menjadi pemanggilan React.createElement yang menghasilkan React element berupa objek JavaScript.',
    },
    {
      id: 'q-01-02',
      order: 2,
      prompt: 'Mengapa props bersifat read-only di dalam komponen React?',
      options: [
        'Karena props disimpan di localStorage',
        'Agar komponen bersifat pure dan prediktabil',
        'Karena React tidak mendukung objek mutable',
        'Agar event handler tidak bisa di-pass',
      ],
      correctOptionIndex: 1,
      explanation:
        'Props yang read-only mendorong komponen untuk bersifat pure: output hanya bergantung pada props, sehingga debugging dan testing lebih mudah.',
    },
    {
      id: 'q-01-03',
      order: 3,
      prompt: 'Apa fungsi utama virtual DOM di React?',
      options: [
        'Menggantikan browser DOM sepenuhnya',
        'Memberikan representasi ringan UI untuk perbandingan sebelum commit',
        'Menyimpan state komponen secara persisten',
        'Mengeksekusi efek samping secara otomatis',
      ],
      correctOptionIndex: 1,
      explanation:
        'Virtual DOM memungkinkan React membandingkan snapshot UI sebelum dan sesudah render untuk menentukan mutasi DOM minimal.',
    },
    {
      id: 'q-01-04',
      order: 4,
      prompt: 'Apa yang terjadi jika dua elemen React memiliki tipe berbeda pada posisi yang sama?',
      options: [
        'React hanya memperbarui atribut yang berbeda',
        'React menghancurkan subtree lama dan membuat subtree baru',
        'React mengabaikan perbedaan tersebut',
        'React mempertahankan subtree lama tanpa perubahan',
      ],
      correctOptionIndex: 1,
      explanation:
        'Jika tipe berbeda, React menganggap struktur sepenuhnya berbeda dan me-mount ulang subtree di bawah elemen tersebut.',
    },
    {
      id: 'q-01-05',
      order: 5,
      prompt: 'Mengapa penggunaan indeks array sebagai key tidak disarankan untuk daftar yang dapat diurutkan ulang?',
      options: [
        'Karena indeks tidak unik',
        'Karena key dari indeks dapat membuat React salah mengasosiasikan state antar item',
        'Karena React tidak menerima angka sebagai key',
        'Karena indeks array terlalu lambat',
      ],
      correctOptionIndex: 1,
      explanation:
        'Jika urutan item berubah, indeks tetap sama sehingga React salah mengasosiasikan fiber lama dengan item baru dan dapat menyebabkan bug state.',
    },
    {
      id: 'q-01-06',
      order: 6,
      prompt: 'Apa keunggulan utama Fiber architecture dibandingkan stack-based reconciler?',
      options: [
        'Fiber lebih cepat dalam semua skenario',
        'Fiber memungkinkan render dijeda, dilanjutkan, dan diprioritaskan',
        'Fiber menghilangkan kebutuhan virtual DOM',
        'Fiber hanya bekerja pada class component',
      ],
      correctOptionIndex: 1,
      explanation:
        'Fiber memecah pekerjaan render menjadi unit-unit kecil yang dapat dijeda dan diprioritaskan, mendukung fitur seperti concurrent rendering.',
    },
    {
      id: 'q-01-07',
      order: 7,
      prompt: 'Fase mana di React yang boleh diinterupsi dan bersifat side-effect-free?',
      options: ['Commit phase', 'Render phase', 'Layout phase', 'Cleanup phase'],
      correctOptionIndex: 1,
      explanation:
        'Render phase bersifat pure dan dapat dijeda. Commit phase bersifat synchronous dan menjalankan efek samping.',
    },
    {
      id: 'q-01-08',
      order: 8,
      prompt: 'Apa peran field alternate pada fiber node?',
      options: [
        'Menyimpan referensi ke DOM node nyata',
        'Menghubungkan fiber pada tree current dengan work-in-progress',
        'Menyimpan daftar event listener',
        'Menunjuk sibling berikutnya dalam tree',
      ],
      correctOptionIndex: 1,
      explanation:
        'Field alternate menghubungkan fiber di tree current dengan pasangannya di tree work-in-progress, memungkinkan React meng reuse state dan efek.',
    },
  ],
}
