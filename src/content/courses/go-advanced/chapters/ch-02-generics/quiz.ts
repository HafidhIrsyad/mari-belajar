import type { Quiz } from '@/content/types'

export const ch02Quiz: Quiz = {
  id: 'quiz-ch-02-generics',
  title: 'Quiz: Generics di Go',
  passingScore: 8,
  questions: [
    {
      id: 'q-02-01',
      order: 1,
      prompt: 'Bagaimana cara menulis type parameter pada fungsi Go?',
      options: [
        'func Min<T>(a, b T) T',
        'func Min[T any](a, b T) T',
        'func Min(a, b T)<T> T',
        'func Min<T any>(a, b any) any',
      ],
      correctOptionIndex: 1,
      explanation:
        'Type parameter di Go ditulis dalam kurung siku setelah nama fungsi, contohnya func Min[T any](a, b T) T.',
    },
    {
      id: 'q-02-02',
      order: 2,
      prompt: 'Apa arti constraint `comparable` di Go?',
      options: [
        'Semua tipe yang bisa diurutkan',
        'Tipe yang mendukung operator == dan !=',
        'Tipe yang memiliki method String()',
        'Tipe yang bisa dikonversi ke string',
      ],
      correctOptionIndex: 1,
      explanation:
        'comparable adalah constraint khusus untuk tipe yang bisa dibandingkan dengan operator == dan !=, cocok untuk key map.',
    },
    {
      id: 'q-02-03',
      order: 3,
      prompt: 'Apa fungsi tanda `~` dalam type set?',
      options: [
        'Menandakan tipe pointer',
        'Mengizinkan tipe dengan underlying type yang sama',
        'Menandakan tipe interface',
        'Menghapus batasan tipe',
      ],
      correctOptionIndex: 1,
      explanation:
        'Tanda ~ memperbolehkan tipe yang didefinisikan dengan underlying type tertentu, misalnya type UserID int memenuhi ~int.',
    },
    {
      id: 'q-02-04',
      order: 4,
      prompt: 'Mengapa Go menggunakan GC-shape stenciling untuk generics?',
      options: [
        'Agar monomorphization penuh seperti C++',
        'Untuk mengurangi ukuran binary dan waktu kompilasi dibanding monomorphization penuh',
        'Agar semua tipe selalu memiliki implementasi terpisah',
        'Untuk menghilangkan type safety',
      ],
      correctOptionIndex: 1,
      explanation:
        'GC-shape stenciling mengelompokkan tipe berdasarkan bentuk dari sudut pandang GC, sehingga mengurangi duplikasi kode mesin dan mempercepat kompilasi.',
    },
    {
      id: 'q-02-05',
      order: 5,
      prompt: 'Apa keuntungan utama generics dibanding penggunaan interface{}?',
      options: [
        'Generics selalu lebih cepat di runtime',
        'Generics mempertahankan type safety tanpa type assertion manual',
        'Generics tidak memerlukan compile',
        'Generics hanya bekerja untuk struct',
      ],
      correctOptionIndex: 1,
      explanation:
        'Generics memungkinkan kode yang type-safe tanpa perlu type assertion seperti pada interface{}.',
    },
    {
      id: 'q-02-06',
      order: 6,
      prompt: 'Manakah yang BUKAN termasuk custom constraint yang valid?',
      options: [
        'type Number interface { ~int | ~float64 }',
        'type Ordered interface { ~int | ~string | ~float64 }',
        'type AnyMap interface { map[string]int }',
        'type Stringer interface { String() string }',
      ],
      correctOptionIndex: 2,
      explanation:
        'Constraint tidak bisa berupa tipe map langsung karena map tidak bisa menjadi elemen type set untuk type parameter dalam hal ini; map juga tidak comparable kecuali value-nya comparable.',
    },
    {
      id: 'q-02-07',
      order: 7,
      prompt: 'Kapan sebaiknya TIDAK menggunakan generics?',
      options: [
        'Saat logika sama untuk banyak tipe',
        'Saat menulis struktur data reusable',
        'Saat hanya satu atau dua tipe yang dipakai dan duplikasi lebih mudah dibaca',
        'Saat ingin menghindari interface{}',
      ],
      correctOptionIndex: 2,
      explanation:
        'Generics sebaiknya tidak dipaksakan jika hanya ada satu atau dua tipe; duplikasi sederhana bisa lebih mudah dipahami.',
    },
    {
      id: 'q-02-08',
      order: 8,
      prompt: 'Apa hasil dari `m := Min(3, 5)` jika `func Min[T int | float64](a, b T) T`?',
      options: [
        'Error karena T tidak disebutkan',
        'T diinfer sebagai int',
        'T diinfer sebagai float64',
        'T diinfer sebagai any',
      ],
      correctOptionIndex: 1,
      explanation:
        'Go dapat menyimpulkan type parameter dari argumen; karena 3 dan 5 adalah int, T diinfer sebagai int.',
    },
  ],
}
