import type { Quiz } from '@/content/types'

export const ch04Quiz: Quiz = {
  id: 'quiz-ch-04-computability-complexity',
  title: 'Quiz: Computability & Complexity',
  passingScore: 8,
  questions: [
    {
      id: 'q-04-01',
      order: 1,
      prompt: 'Komponen utama mesin Turing meliputi?',
      options: [
        'GPU, RAM, dan SSD',
        'Tape (infinite), head (read/write), state register, dan transition function',
        'Hanya keyboard dan monitor',
        'Compiler dan linker',
      ],
      correctOptionIndex: 1,
      explanation:
        'Mesin Turing terdiri dari tape tak terbatas, head yang bergerak kiri/kanan, state register, dan fungsi transisi δ(state, symbol) → (newState, writeSymbol, direction).',
    },
    {
      id: 'q-04-02',
      order: 2,
      prompt: 'Halting problem dinyatakan undecidable karena?',
      options: [
        'Komputer terlalu lambat',
        'Tidak ada algoritma umum yang dapat menentukan apakah program arbitrary akan halt untuk semua input',
        'Hanya berlaku untuk bahasa assembly',
        'Sudah diselesaikan oleh Turing pada 1936',
      ],
      correctOptionIndex: 1,
      explanation:
        'Turing membuktikan dengan diagonalization: asumsikan ada HaltChecker, konstruksi program yang kontradiksi — tidak ada algoritma universal untuk halting problem.',
    },
    {
      id: 'q-04-03',
      order: 3,
      prompt: 'Kelas P didefinisikan sebagai masalah yang?',
      options: [
        'Tidak pernah dapat diselesaikan',
        'Dapat diselesaikan dalam waktu polinomial oleh deterministic Turing machine',
        'Hanya verifiable, tidak solvable',
        'Membutuhkan exponential time selalu',
      ],
      correctOptionIndex: 1,
      explanation:
        'P (Polynomial time) = masalah yang dapat diselesaikan dalam O(n^k) untuk konstanta k oleh deterministic TM. Contoh: sorting, shortest path (Dijkstra).',
    },
    {
      id: 'q-04-04',
      order: 4,
      prompt: 'Masalah NP dicirikan oleh?',
      options: [
        'Solusi dapat diverifikasi dalam waktu polinomial',
        'Solusi selalu unik',
        'Tidak ada solusi sama sekali',
        'Hanya untuk masalah sorting',
      ],
      correctOptionIndex: 0,
      explanation:
        'NP (Nondeterministic Polynomial): jika diberikan sertifikat (witness), solusi dapat diverifikasi dalam waktu polinomial. Contoh: SAT — diberikan assignment, verifikasi clause dalam polinomial.',
    },
    {
      id: 'q-04-05',
      order: 5,
      prompt: 'P vs NP adalah pertanyaan apakah?',
      options: [
        'Semua masalah verifiable juga solvable polinomial',
        'NP lebih kecil dari P',
        'Halting problem decidable',
        'Turing machine tidak universal',
      ],
      correctOptionIndex: 0,
      explanation:
        'P vs NP: apakah P = NP? Jika ya, setiap masalah yang solusinya verifiable polinomial juga solvable polinomial. Kepercayaan umum: P ≠ NP, tetapi belum terbukti.',
    },
    {
      id: 'q-04-06',
      order: 6,
      prompt: 'Masalah NP-complete adalah masalah yang?',
      options: [
        'Termudah di NP dan NP-hard — reduksi polinomial dari semua masalah NP',
        'Hanya sorting dan searching',
        'Selalu solvable dalam O(1)',
        'Tidak termasuk dalam NP',
      ],
      correctOptionIndex: 0,
      explanation:
        'NP-complete ∈ NP dan NP-hard: setiap masalah NP dapat direduksi polinomial ke NP-complete. Contoh: SAT, 3-SAT, Traveling Salesman (decision), Vertex Cover.',
    },
    {
      id: 'q-04-07',
      order: 7,
      prompt: 'Approximation algorithm untuk TSP (metric) memberikan?',
      options: [
        'Solusi optimal selalu',
        'Solusi dengan jaminan rasio terhadap optimal (mis. ≤ 1.5× optimal untuk Christofides)',
        'Tidak ada jaminan apapun',
        'Hanya untuk masalah P',
      ],
      correctOptionIndex: 1,
      explanation:
        'Approximation algorithm memberikan solusi dengan jaminan rasio aproksimasi. Christofides untuk metric TSP: ≤ 1.5× optimal. Greedy vertex cover: ≤ 2× optimal.',
    },
    {
      id: 'q-04-08',
      order: 8,
      prompt: 'Church-Turing thesis menyatakan?',
      options: [
        'Semua komputer harus 64-bit',
        'Segala fungsi yang dapat dihitung efektif dapat dihitung oleh mesin Turing',
        'P = NP sudah terbukti',
        'Halting problem decidable untuk program terbatas',
      ],
      correctOptionIndex: 1,
      explanation:
        'Church-Turing thesis: model komputasi efektif (Turing machine, lambda calculus, recursive functions) setara — mendefinisikan batas "computable".',
    },
  ],
}
