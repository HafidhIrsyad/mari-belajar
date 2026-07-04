import type { Quiz } from '@/content/types'

export const ch01Quiz: Quiz = {
  id: 'quiz-ch-01-advanced-algorithms',
  title: 'Quiz: Algoritma Lanjutan',
  passingScore: 8,
  questions: [
    {
      id: 'q-01-01',
      order: 1,
      prompt: 'Apa langkah inti dari pola divide & conquer?',
      options: [
        'Menggabungkan semua data lalu memproses sekaligus',
        'Memecah masalah, menyelesaikan submasalah, lalu menggabungkan hasil',
        'Memilih elemen terkecil berulang kali',
        'Menyimpan hasil setiap langkah dalam hash table',
      ],
      correctOptionIndex: 1,
      explanation:
        'Divide & conquer terdiri dari tiga fase: divide (pecah), conquer (selesaikan submasalah), dan combine (gabungkan hasil submasalah).',
    },
    {
      id: 'q-01-02',
      order: 2,
      prompt: 'Algoritma sort mana yang menjamin kompleksitas O(n log n) di worst case?',
      options: ['Quick sort', 'Bubble sort', 'Merge sort', 'Selection sort'],
      correctOptionIndex: 2,
      explanation:
        'Merge sort selalu membagi array menjadi dua bagian setengah dan menggabungkannya, sehingga worst case tetap O(n log n). Quick sort worst case bisa O(n²) jika pivot tidak seimbang.',
    },
    {
      id: 'q-01-03',
      order: 3,
      prompt: 'Heap sort memanfaatkan struktur data apa sebagai fondasinya?',
      options: ['Stack', 'Queue', 'Binary heap', 'Linked list'],
      correctOptionIndex: 2,
      explanation:
        'Heap sort membangun max-heap (atau min-heap), lalu berulang kali mengekstrak elemen terbesar dan menyusun ulang heap.',
    },
    {
      id: 'q-01-04',
      order: 4,
      prompt: 'Kapan dynamic programming lebih tepat daripada rekursi biasa?',
      options: [
        'Ketika submasalah tidak pernah tumpang tindih',
        'Ketika masalah memiliki submasalah overlapping yang dihitung berulang',
        'Ketika input selalu terurut',
        'Ketika memori tidak terbatas dan kecepatan tidak penting',
      ],
      correctOptionIndex: 1,
      explanation:
        'DP efektif ketika masalah memiliki optimal substructure dan overlapping subproblems — sub-solusi yang sama dihitung berkali-kali dalam rekursi naif.',
    },
    {
      id: 'q-01-05',
      order: 5,
      prompt: 'Pada 0/1 knapsack, mengapa greedy berdasarkan rasio nilai/berat tidak selalu optimal?',
      options: [
        'Karena knapsack selalu penuh',
        'Karena setiap item hanya bisa diambil sekali dan kombinasi lokal terbaik bisa gagal secara global',
        'Karena berat item selalu sama',
        'Karena nilai item selalu negatif',
      ],
      correctOptionIndex: 1,
      explanation:
        'Greedy memilih item dengan rasio terbaik terlebih dahulu, tetapi kombinasi item dengan rasio lebih rendah bisa menghasilkan total nilai lebih besar — ini membutuhkan DP.',
    },
    {
      id: 'q-01-06',
      order: 6,
      prompt: 'Kompleksitas waktu Longest Common Subsequence (LCS) dengan DP tabulation untuk string panjang m dan n adalah?',
      options: ['O(m + n)', 'O(m × n)', 'O(m log n)', 'O(2^m)'],
      correctOptionIndex: 1,
      explanation:
        'Tabel DP berukuran (m+1) × (n+1) diisi dengan satu pass, menghasilkan kompleksitas O(m × n) waktu dan ruang.',
    },
    {
      id: 'q-01-07',
      order: 7,
      prompt: 'Quick sort pada average case memiliki kompleksitas?',
      options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'],
      correctOptionIndex: 1,
      explanation:
        'Dengan pivot yang membagi array secara relatif seimbang, quick sort rata-rata berjalan dalam O(n log n), meski worst case bisa O(n²).',
    },
    {
      id: 'q-01-08',
      order: 8,
      prompt: 'Perbedaan utama memoization (top-down) dan tabulation (bottom-up) adalah?',
      options: [
        'Memoization selalu lebih lambat',
        'Memoization menyimpan hasil saat dibutuhkan secara rekursif; tabulation mengisi tabel dari submasalah terkecil',
        'Tabulation tidak menggunakan array',
        'Memoization hanya untuk masalah graf',
      ],
      correctOptionIndex: 1,
      explanation:
        'Memoization adalah DP rekursif dengan cache; tabulation mengisi tabel iteratif dari base case ke target, sering menghindari overhead call stack.',
    },
  ],
}
