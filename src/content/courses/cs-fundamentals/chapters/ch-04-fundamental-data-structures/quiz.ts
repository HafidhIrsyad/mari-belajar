import type { Quiz } from '@/content/types'

export const ch04Quiz: Quiz = {
  id: 'quiz-ch-04-fundamental-data-structures',
  title: 'Quiz: Struktur Data Fundamental',
  passingScore: 8,
  questions: [
    {
      id: 'q-04-01',
      order: 1,
      prompt: 'Struktur data manakah yang menyimpan elemen dalam blok memori berurutan dan diakses dengan indeks?',
      options: ['Linked list', 'Array', 'Stack', 'Graph'],
      correctOptionIndex: 1,
      explanation:
        'Array menyimpan elemen dalam blok memori yang berurutan, sehingga setiap elemen bisa diakses langsung menggunakan indeks.',
    },
    {
      id: 'q-04-02',
      order: 2,
      prompt: 'Dalam linked list, setiap node umumnya berisi:',
      options: [
        'Hanya data',
        'Data dan referensi ke node berikutnya',
        'Data dan ukuran array',
        'Key dan value saja',
      ],
      correctOptionIndex: 1,
      explanation:
        'Setiap node dalam linked list menyimpan data serta referensi atau pointer ke node berikutnya, membentuk rantai.',
    },
    {
      id: 'q-04-03',
      order: 3,
      prompt: 'Prinsip LIFO (Last In, First Out) digunakan oleh struktur data:',
      options: ['Queue', 'Stack', 'Array', 'Graph'],
      correctOptionIndex: 1,
      explanation:
        'Stack mengikuti prinsip LIFO: elemen terakhir yang masuk akan menjadi elemen pertama yang keluar.',
    },
    {
      id: 'q-04-04',
      order: 4,
      prompt: 'Operasi apa yang digunakan untuk menambahkan elemen ke belakang queue?',
      options: ['push', 'pop', 'enqueue', 'dequeue'],
      correctOptionIndex: 2,
      explanation:
        'Enqueue adalah operasi untuk menambahkan elemen ke belakang queue, sedangkan dequeue mengeluarkan elemen dari depan.',
    },
    {
      id: 'q-04-05',
      order: 5,
      prompt: 'Apa yang dimaksud dengan collision pada hash table?',
      options: [
        'Dua key menghasilkan nilai value yang sama',
        'Dua key berbeda menghasilkan indeks yang sama',
        'Hash table penuh dan tidak bisa menambah data',
        'Data dihapus secara tidak sengaja',
      ],
      correctOptionIndex: 1,
      explanation:
        'Collision terjadi ketika fungsi hash mengubah dua key berbeda menjadi indeks yang sama di array internal.',
    },
    {
      id: 'q-04-06',
      order: 6,
      prompt: 'Struktur data manakah yang paling cocok untuk menyimpan kumpulan nilai unik tanpa duplikat?',
      options: ['Map', 'Array', 'Set', 'Queue'],
      correctOptionIndex: 2,
      explanation:
        'Set dirancang khusus untuk menyimpan nilai unik. Setiap nilai hanya boleh muncul sekali dalam Set.',
    },
    {
      id: 'q-04-07',
      order: 7,
      prompt: 'Pada binary search tree (BST) yang valid, bagaimana hubungan nilai node kiri dan node induk?',
      options: [
        'Nilai node kiri selalu lebih besar',
        'Nilai node kiri selalu lebih kecil',
        'Nilai node kiri selalu sama',
        'Tidak ada aturan khusus',
      ],
      correctOptionIndex: 1,
      explanation:
        'Dalam BST, semua nilai di subtree kiri lebih kecil dari nilai node induk, dan semua nilai di subtree kanan lebih besar.',
    },
    {
      id: 'q-04-08',
      order: 8,
      prompt: 'Algoritma traversal graph manakah yang menjelajah node per level, dimulai dari node awal?',
      options: [
        'Depth-First Search (DFS)',
        'Breadth-First Search (BFS)',
        'Binary search',
        'Bubble sort',
      ],
      correctOptionIndex: 1,
      explanation:
        'BFS menjelajah graph berdasarkan kedalaman, mengunjungi semua tetangga terdekat terlebih dahulu sebelum ke level berikutnya.',
    },
  ],
}
