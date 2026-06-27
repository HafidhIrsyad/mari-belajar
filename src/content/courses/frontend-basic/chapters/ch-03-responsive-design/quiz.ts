import type { Quiz } from '@/content/types'

export const ch03Quiz: Quiz = {
  id: 'quiz-ch-03-responsive-design',
  title: 'Quiz: Responsive Design',
  passingScore: 8,
  questions: [
    {
      id: 'q-03-01',
      order: 1,
      prompt: 'Apa fungsi utama viewport meta tag?',
      options: [
        'Mengubah warna latar belakang di mobile',
        'Mengatur lebar halaman agar sesuai dengan lebar layar perangkat',
        'Menonaktifkan zoom pada halaman',
        'Memuat stylesheet khusus mobile',
      ],
      correctOptionIndex: 1,
      explanation:
        'Viewport meta tag memberi tahu browser untuk menggunakan lebar device sebagai lebar viewport, sehingga halaman tidak diskala seperti desktop.',
    },
    {
      id: 'q-03-02',
      order: 2,
      prompt: 'Dalam pendekatan mobile-first, breakpoint ditulis menggunakan?',
      options: ['max-width', 'min-width', 'min-height', 'orientation'],
      correctOptionIndex: 1,
      explanation:
        'Mobile-first menulis style dasar untuk layar kecil, lalu menambahkan perubahan untuk layar lebih besar dengan min-width.',
    },
    {
      id: 'q-03-03',
      order: 3,
      prompt: 'Fungsi CSS apa yang membatasi nilai antara minimum, preferensi, dan maksimum?',
      options: ['min()', 'max()', 'clamp()', 'calc()'],
      correctOptionIndex: 2,
      explanation:
        'clamp(min, preferred, max) memastikan nilai tidak kurang dari minimum dan tidak lebih dari maksimum, dengan nilai preferensi di tengahnya.',
    },
    {
      id: 'q-03-04',
      order: 4,
      prompt: 'Atribut HTML apa yang menyediakan beberapa sumber gambar dengan lebar berbeda?',
      options: ['src', 'srcset', 'alt', 'sizes'],
      correctOptionIndex: 1,
      explanation:
        'srcset berisi daftar gambar dengan deskriptor lebar, sehingga browser dapat memilih gambar paling sesuai.',
    },
    {
      id: 'q-03-05',
      order: 5,
      prompt: 'Kapan sebaiknya menggunakan container query alih-alih media query?',
      options: [
        'Saat ingin menyesuaikan layout berdasarkan lebar viewport',
        'Saat komponen perlu merespons ruang yang tersedia di containernya',
        'Saat ingin mengubah tema warna halaman',
        'Saat ingin mendeteksi orientasi perangkat',
      ],
      correctOptionIndex: 1,
      explanation:
        'Container query bereaksi terhadap ukuran container induk, membuat komponen reusable tidak bergantung pada viewport.',
    },
    {
      id: 'q-03-06',
      order: 6,
      prompt: 'API JavaScript apa yang setara dengan media query di CSS?',
      options: ['ResizeObserver', 'window.matchMedia', 'IntersectionObserver', 'MutationObserver'],
      correctOptionIndex: 1,
      explanation:
        'window.matchMedia mengembalikan MediaQueryList yang bisa didengarkan perubahannya, mirip dengan @media di CSS.',
    },
    {
      id: 'q-03-07',
      order: 7,
      prompt: 'Manakah yang termasuk unit relatif untuk fluid typography?',
      options: ['px', 'rem', 'vw', 'pt'],
      correctOptionIndex: 2,
      explanation:
        'vw adalah unit relatif terhadap lebar viewport, sering digunakan dalam clamp() untuk tipografi yang fleksibel.',
    },
    {
      id: 'q-03-08',
      order: 8,
      prompt: 'Strategi breakpoint yang paling disarankan adalah?',
      options: [
        'Membuat breakpoint untuk setiap model perangkat',
        'Menambahkan breakpoint berdasarkan perubahan layout yang dibutuhkan konten',
        'Selalu menggunakan tepat tiga breakpoint: 320px, 768px, 1024px',
        'Hanya menggunakan breakpoint untuk desktop',
      ],
      correctOptionIndex: 1,
      explanation:
        'Breakpoint sebaiknya didasarkan pada kebutuhan konten, bukan daftar device tertentu, agar desain tetap fleksibel.',
    },
  ],
}
