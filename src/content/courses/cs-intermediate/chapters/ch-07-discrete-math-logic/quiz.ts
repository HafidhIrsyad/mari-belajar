import type { Quiz } from '@/content/types'

export const ch07Quiz: Quiz = {
  id: 'quiz-ch-07-discrete-math-logic',
  title: 'Quiz: Matematika Diskrit dan Logika',
  passingScore: 8,
  questions: [
    {
      id: 'q-07-01',
      order: 1,
      prompt: 'Kapan P → Q bernilai false?',
      options: [
        'P false, Q false',
        'P false, Q true',
        'P true, Q false',
        'P true, Q true',
      ],
      correctOptionIndex: 2,
      explanation:
        'Implikasi false hanya jika antecedent (P) true dan consequent (Q) false. Semua kombinasi lain menghasilkan true.',
    },
    {
      id: 'q-07-02',
      order: 2,
      prompt: 'Kontrapositif dari P → Q adalah?',
      options: ['Q → P', '¬P → ¬Q', '¬Q → ¬P', 'P ↔ Q'],
      correctOptionIndex: 2,
      explanation:
        'Kontrapositif ¬Q → ¬P logika setara dengan P → Q — sering dipakai karena lebih mudah dibuktikan.',
    },
    {
      id: 'q-07-03',
      order: 3,
      prompt: 'Langkah induksi matematika yang benar?',
      options: [
        'Asumsikan P(k+1), buktikan P(k)',
        'Buktikan base case dan inductive step dari P(k) ke P(k+1)',
        'Hanya buktikan satu contoh n',
        'Buktikan P(n) untuk n genap saja',
      ],
      correctOptionIndex: 1,
      explanation:
        'Induksi standar: base case P(n₀), lalu asumsikan P(k) dan turunkan P(k+1) untuk semua k ≥ n₀.',
    },
    {
      id: 'q-07-04',
      order: 4,
      prompt: 'Rekurens merge sort T(n) = 2T(n/2) + O(n) diselesaikan menjadi?',
      options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(2ⁿ)'],
      correctOptionIndex: 1,
      explanation:
        'Master Theorem case 2: a=2, b=2, f(n)=Θ(n), log_b(a)=1 → T(n)=Θ(n log n).',
    },
    {
      id: 'q-07-05',
      order: 5,
      prompt: 'C(5,2) — kombinasi 2 dari 5 — sama dengan?',
      options: ['10', '20', '120', '5'],
      correctOptionIndex: 0,
      explanation:
        'C(5,2) = 5!/(2!×3!) = 120/12 = 10.',
    },
    {
      id: 'q-07-06',
      order: 6,
      prompt: 'Birthday problem relevan untuk algoritma karena?',
      options: [
        'Menjelaskan collision hash terjadi lebih cepat dari intuisi',
        'Membuktikan semua hash function broken',
        'Menghitung fibonacci',
        'Menggantikan induksi',
      ],
      correctOptionIndex: 0,
      explanation:
        'Dengan n bucket dan k insert random, probabilitas collision meningkat lebih cepat dari yang diperkirakan — analog birthday paradox.',
    },
    {
      id: 'q-07-07',
      order: 7,
      prompt: 'Loop invariant digunakan untuk?',
      options: [
        'Mempercepat loop di CPU',
        'Membuktikan correctness algoritma iteratif',
        'Mengganti truth table',
        'Menghitung permutasi',
      ],
      correctOptionIndex: 1,
      explanation:
        'Invariant adalah kondisi yang true sebelum/sesudah setiap iterasi; induksi pada iterasi membuktikan algoritma benar saat loop selesai.',
    },
    {
      id: 'q-07-08',
      order: 8,
      prompt: 'Fibonacci naive T(n)=T(n-1)+T(n-2) tanpa memo memiliki kompleksitas?',
      options: ['O(n)', 'O(n log n)', 'O(2ⁿ) eksponensial', 'O(1)'],
      correctOptionIndex: 2,
      explanation:
        'Tanpa memoization, pohon rekursi Fibonacci bercabang dua setiap level → eksponensial O(φⁿ) ≈ O(2ⁿ).',
    },
  ],
}
