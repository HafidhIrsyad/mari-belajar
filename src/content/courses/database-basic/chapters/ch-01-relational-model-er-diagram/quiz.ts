import type { Quiz } from '@/content/types'

export const ch01Quiz: Quiz = {
  id: 'quiz-ch-01-relational-model-er-diagram',
  title: 'Quiz: Relational Model & ER Diagram',
  passingScore: 8,
  questions: [
    {
      id: 'q-01-01',
      order: 1,
      prompt: 'Apa yang dimaksud dengan tuple dalam model relasional?',
      options: ['Sebuah column pada table', 'Sebuah row pada table', 'Sebuah database', 'Sebuah index'],
      correctOptionIndex: 1,
      explanation:
        'Tuple adalah istilah formal untuk satu baris (row) dalam sebuah relasi atau table.',
    },
    {
      id: 'q-01-02',
      order: 2,
      prompt: 'Fungsi utama foreign key adalah?',
      options: [
        'Mempercepat query dengan index',
        'Menjaga hubungan dan integritas referensial antar table',
        'Menyimpan nilai default untuk column',
        'Mengenkripsi data sensitif',
      ],
      correctOptionIndex: 1,
      explanation:
        'Foreign key merujuk ke primary key di table lain sehingga database dapat menegakkan integritas referensial.',
    },
    {
      id: 'q-01-03',
      order: 3,
      prompt: 'Dalam notasi Crow\'s Foot, simbol kaki burung menandakan?',
      options: ['Satu', 'Banyak', 'Opsional', 'Wajib'],
      correctOptionIndex: 1,
      explanation:
        'Simbol kaki burung (crow\'s foot) pada ujung garis relasi menandakan sisi "banyak" dari hubungan.',
    },
    {
      id: 'q-01-04',
      order: 4,
      prompt: 'Relasi many-to-many di database relasional biasanya diimplementasikan dengan?',
      options: [
        'Menambahkan FK langsung ke kedua table',
        'Junction table atau associative table',
        'Menyatukan kedua entitas dalam satu table',
        'Menggunakan view',
      ],
      correctOptionIndex: 1,
      explanation:
        'Junction table memecah relasi M:N menjadi dua relasi 1:N yang lebih mudah dijamin integritasnya.',
    },
    {
      id: 'q-01-05',
      order: 5,
      prompt: 'Manakah contoh natural key yang umum?',
      options: ['Auto-increment ID', 'UUID v4', 'Nomor ISBN pada buku', 'Sequence bigserial'],
      correctOptionIndex: 2,
      explanation:
        'ISBN adalah kode yang memang mengidentifikasi buku di dunia nyata, sehingga termasuk natural key.',
    },
    {
      id: 'q-01-06',
      order: 6,
      prompt: 'Kelebihan utama surrogate key dibanding natural key adalah?',
      options: [
        'Lebih bermakna bagi bisnis',
        'Tidak berubah sehingga referensi FK tetap stabil',
        'Selalu lebih kecil dari natural key',
        'Tidak memerlukan unique constraint',
      ],
      correctOptionIndex: 1,
      explanation:
        'Surrogate key dibuat sistem dan tidak terpengaruh perubahan atribut bisnis, sehingga referensi FK tidak perlu di-update.',
    },
    {
      id: 'q-01-07',
      order: 7,
      prompt: 'Weak entity adalah entitas yang?',
      options: [
        'Tidak memiliki relationship',
        'Tidak memiliki atribut',
        'Memerlukan key dari entitas induk untuk diidentifikasi secara unik',
        'Selalu merupakan junction table',
      ],
      correctOptionIndex: 2,
      explanation:
        'Weak entity tidak memiliki identitas unik sendiri dan bergantung pada partial key serta PK entitas kuat.',
    },
    {
      id: 'q-01-08',
      order: 8,
      prompt: 'Dalam relasi one-to-one antara User dan Profile, mana desain yang paling tepat?',
      options: [
        'Menyimpan semua atribut di table User saja',
        'Menyimpan profile di table terpisah dengan PK yang sama dengan User',
        'Membuat composite key antara userId dan profileId',
        'Membuat junction table UserProfile',
      ],
      correctOptionIndex: 1,
      explanation:
        'One-to-one yang dipisah sering memakai PK table anak yang sama dengan PK table induk untuk menjaga one-to-one dan mempermudah JOIN.',
    },
  ],
}
