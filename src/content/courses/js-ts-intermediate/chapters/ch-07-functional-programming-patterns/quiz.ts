import type { Quiz } from '@/content/types'

export const ch07Quiz: Quiz = {
  id: 'quiz-ch-07-functional-programming-patterns',
  title: 'Quiz: Functional Programming Patterns',
  passingScore: 8,
  questions: [
    {
      id: 'q-07-01',
      order: 1,
      prompt: 'Apa karakteristik pure function?',
      options: [
        'Selalu membaca state global',
        'Deterministik dan tanpa side effect',
        'Selalu melakukan I/O',
        'Mengubah argumen yang diterima',
      ],
      correctOptionIndex: 1,
      explanation:
        'Pure function selalu menghasilkan output sama untuk input sama dan tidak menyebabkan side effect.',
    },
    {
      id: 'q-07-02',
      order: 2,
      prompt: 'Higher-order function adalah fungsi yang?',
      options: [
        'Hanya menerima number',
        'Menerima atau mengembalikan fungsi',
        'Selalu mengembalikan object',
        'Hanya berjalan asynchronous',
      ],
      correctOptionIndex: 1,
      explanation:
        'Higher-order function menerima fungsi sebagai argumen atau mengembalikan fungsi, seperti map, filter, dan reduce.',
    },
    {
      id: 'q-07-03',
      order: 3,
      prompt: 'Manakah yang merupakan contoh immutability?',
      options: [
        'numbers.push(4)',
        'const doubled = numbers.map((n) => n * 2)',
        'obj.x = 5',
        'array[0] = 99',
      ],
      correctOptionIndex: 1,
      explanation:
        'map mengembalikan array baru tanpa mengubah array asli, sehingga immutability terjaga.',
    },
    {
      id: 'q-07-04',
      order: 4,
      prompt: 'Apa hasil dari currying function add(5)(3) jika add = a => b => a + b?',
      options: [
        '8',
        '15',
        '53',
        'undefined',
      ],
      correctOptionIndex: 0,
      explanation:
        'add(5) mengembalikan fungsi b => 5 + b, kemudian dipanggil dengan 3 menghasilkan 8.',
    },
    {
      id: 'q-07-05',
      order: 5,
      prompt: 'Apa peran closure pada factory function?',
      options: [
        'Menghapus fungsi setelah dipanggil',
        'Mengingat lingkungan scope saat fungsi dibuat',
        'Mengubah tipe argumen',
        'Membuat fungsi asynchronous',
      ],
      correctOptionIndex: 1,
      explanation:
        'Closure memungkinkan fungsi mengakses variabel dari scope tempat ia dideklarasikan meskipun scope induk telah selesai.',
    },
    {
      id: 'q-07-06',
      order: 6,
      prompt: 'Manakah yang paling mendeskripsikan functor?',
      options: [
        'Fungsi dengan efek samping',
        'Struktur data dengan method map',
        'Fungsi yang tidak pernah mengembalikan nilai',
        'Struktur data immutable saja',
      ],
      correctOptionIndex: 1,
      explanation:
        'Functor adalah struktur data yang bisa dipetakan dengan fungsi melalui method map, seperti Array.',
    },
    {
      id: 'q-07-07',
      order: 7,
      prompt: 'Apa yang dimaksud dengan lazy evaluation?',
      options: [
        'Menjalankan semua komputasi di awal',
        'Menunda komputasi sampai nilai benar-benar dibutuhkan',
        'Mengabaikan error',
        'Menggunakan banyak thread',
      ],
      correctOptionIndex: 1,
      explanation:
        'Lazy evaluation hanya menjalankan komputasi ketika hasilnya diperlukan, seperti pada generator function.',
    },
    {
      id: 'q-07-08',
      order: 8,
      prompt: 'Promise dapat dianggap sebagai monad karena?',
      options: [
        'Berjalan di thread terpisah',
        'Memiliki then untuk chaining dan resolve untuk wrapping nilai',
        'Selalu synchronous',
        'Tidak bisa mengembalikan error',
      ],
      correctOptionIndex: 1,
      explanation:
        'Promise memiliki unit/return (Promise.resolve) dan bind/chain (then), sehingga memenuhi konsep monad secara praktis.',
    },
  ],
}
