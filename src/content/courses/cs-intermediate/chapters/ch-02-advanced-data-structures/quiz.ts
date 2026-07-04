import type { Quiz } from '@/content/types'

export const ch02Quiz: Quiz = {
  id: 'quiz-ch-02-advanced-data-structures',
  title: 'Quiz: Struktur Data Lanjutan',
  passingScore: 8,
  questions: [
    {
      id: 'q-02-01',
      order: 1,
      prompt: 'Pada max-heap, hubungan parent-child yang benar adalah?',
      options: [
        'Parent selalu lebih kecil dari child',
        'Parent selalu lebih besar atau sama dengan child',
        'Parent dan child selalu sama',
        'Tidak ada aturan khusus',
      ],
      correctOptionIndex: 1,
      explanation:
        'Max-heap mempertahankan invariant bahwa nilai parent ≥ nilai kedua child, sehingga root selalu elemen maksimum.',
    },
    {
      id: 'q-02-02',
      order: 2,
      prompt: 'Kompleksitas insert pada binary heap dengan n elemen adalah?',
      options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
      correctOptionIndex: 1,
      explanation:
        'Insert menambahkan elemen di akhir lalu melakukan sift-up (bubble up) sepanjang tinggi pohon, yaitu O(log n).',
    },
    {
      id: 'q-02-03',
      order: 3,
      prompt: 'BST yang tidak seimbang pada data terurut ascending akan berperilaku seperti?',
      options: ['Array', 'Linked list', 'Hash table', 'Stack'],
      correctOptionIndex: 1,
      explanation:
        'Insert data terurut ke BST tanpa balancing menghasilkan pohon linear (semua node ke kanan), setara linked list dengan O(n) per operasi.',
    },
    {
      id: 'q-02-04',
      order: 4,
      prompt: 'AVL tree menjaga keseimbangan dengan?',
      options: [
        'Menghapus node secara acak',
        'Rotasi saat balance factor melebihi 1',
        'Menggandakan jumlah node',
        'Menggunakan hash function',
      ],
      correctOptionIndex: 1,
      explanation:
        'AVL menghitung balance factor (selisih tinggi subtree kiri dan kanan). Jika |BF| > 1, dilakukan rotasi single atau double.',
    },
    {
      id: 'q-02-05',
      order: 5,
      prompt: 'Chaining pada hash table menangani collision dengan?',
      options: [
        'Mencari slot kosong berikutnya',
        'Menyimpan elemen bertabrakan dalam linked list di bucket yang sama',
        'Menghapus elemen yang bertabrakan',
        'Menggandakan ukuran hash function',
      ],
      correctOptionIndex: 1,
      explanation:
        'Chaining menyimpan semua elemen dengan hash index sama dalam struktur terpisah (biasanya linked list atau dynamic array) di bucket tersebut.',
    },
    {
      id: 'q-02-06',
      order: 6,
      prompt: 'Linear probing saat collision berarti?',
      options: [
        'Mencari bucket berikutnya yang kosong secara berurutan',
        'Menyimpan di linked list terpisah',
        'Menghapus elemen lama',
        'Menggunakan dua hash function',
      ],
      correctOptionIndex: 0,
      explanation:
        'Open addressing dengan linear probing mencari slot berikutnya (h(k)+1, h(k)+2, ...) hingga menemukan posisi kosong atau elemen yang dicari.',
    },
    {
      id: 'q-02-07',
      order: 7,
      prompt: 'Trie paling efisien untuk operasi apa?',
      options: [
        'Sort numerik',
        'Pencarian berdasarkan prefiks string',
        'Operasi stack LIFO',
        'Perhitungan hash kriptografis',
      ],
      correctOptionIndex: 1,
      explanation:
        'Trie menyimpan string sebagai jalur dari root; pencarian prefiks dan autocomplete menjadi natural karena setiap node merepresentasikan karakter.',
    },
    {
      id: 'q-02-08',
      order: 8,
      prompt: 'Optimasi union-find yang membuat operasi mendekati O(α(n)) adalah?',
      options: [
        'Menggunakan array 2D',
        'Path compression dan union by rank',
        'Menyimpan semua elemen dalam satu set',
        'Menghapus find operation',
      ],
      correctOptionIndex: 1,
      explanation:
        'Path compression meratakan pohon saat find; union by rank menggabungkan pohon lebih kecil ke akar pohon lebih besar. Kombinasi keduanya sangat efisien.',
    },
  ],
}
