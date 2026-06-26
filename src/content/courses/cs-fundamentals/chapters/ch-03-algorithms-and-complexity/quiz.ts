import type { Quiz } from '@/content/types'

export const ch03Quiz: Quiz = {
  id: 'quiz-ch-03-algorithms-and-complexity',
  title: 'Quiz: Algoritma dan Kompleksitas',
  passingScore: 8,
  questions: [
    {
      id: 'q-03-01',
      order: 1,
      prompt: 'Apa definisi paling tepat dari algoritma?',
      options: [
        'Bahasa pemrograman tertentu yang digunakan komputer',
        'Serangkaian langkah terstruktur dan terbatas untuk menyelesaikan masalah',
        'Perangkat keras yang memproses data',
        'Tipe data yang menyimpan banyak nilai',
      ],
      correctOptionIndex: 1,
      explanation:
        'Algoritma adalah serangkaian langkah terstruktur, logis, dan terbatas untuk menyelesaikan suatu masalah, tanpa terikat pada bahasa pemrograman tertentu.',
    },
    {
      id: 'q-03-02',
      order: 2,
      prompt: 'Berapa kompleksitas waktu worst case dari linear search pada array dengan n elemen?',
      options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
      correctOptionIndex: 2,
      explanation:
        'Linear search memeriksa setiap elemen satu per satu. Pada worst case, target ada di akhir atau tidak ditemukan, sehingga memerlukan O(n) pemeriksaan.',
    },
    {
      id: 'q-03-03',
      order: 3,
      prompt: 'Syarat utama agar binary search dapat digunakan adalah:',
      options: [
        'Data harus disimpan dalam linked list',
        'Data harus sudah terurut',
        'Jumlah elemen harus genap',
        'Semua elemen harus berupa bilangan bulat',
      ],
      correctOptionIndex: 1,
      explanation:
        'Binary search bekerja dengan membagi data menjadi dua bagian berulang kali, sehingga data harus sudah terurut agar bisa memutuskan arah pencarian.',
    },
    {
      id: 'q-03-04',
      order: 4,
      prompt: 'Algoritma pengurutan manakah yang membandingkan dan menukar elemen bersebelahan secara berulang?',
      options: ['Selection sort', 'Insertion sort', 'Bubble sort', 'Merge sort'],
      correctOptionIndex: 2,
      explanation:
        'Bubble sort membandingkan dua elemen bersebelahan dan menukarnya jika urutannya salah, lalu mengulangi proses hingga seluruh array terurut.',
    },
    {
      id: 'q-03-05',
      order: 5,
      prompt: 'Notasi Big-O pada dasarnya mengukur:',
      options: [
        'Jumlah baris kode dalam sebuah program',
        'Waktu eksekusi dalam detik pada komputer tertentu',
        'Laju pertumbuhan waktu atau ruang seiring bertambahnya ukuran input',
        'Besar memori yang tersedia di perangkat keras',
      ],
      correctOptionIndex: 2,
      explanation:
        'Big-O menggambarkan seberapa cepat kebutuhan waktu atau ruang algoritma tumbuh ketika ukuran input meningkat, bukan waktu absolut.',
    },
    {
      id: 'q-03-06',
      order: 6,
      prompt: 'Apa fungsi dari base case dalam sebuah fungsi rekursif?',
      options: [
        'Memanggil fungsi itu sendiri dengan input yang lebih besar',
        'Menyimpan hasil perhitungan agar tidak dihitung ulang',
        'Memberikan kondisi berhenti agar rekursi tidak terus berlanjut',
        'Mengurutkan data secara otomatis',
      ],
      correctOptionIndex: 2,
      explanation:
        'Base case adalah kondisi di mana fungsi rekursif berhenti memanggil dirinya sendiri. Tanpa base case, rekursi akan berjalan tanpa batas.',
    },
    {
      id: 'q-03-07',
      order: 7,
      prompt: 'Tujuan utama teknik memoization adalah:',
      options: [
        'Mengurangi jumlah variabel dalam program',
        'Menghindari perhitungan yang sama berulang kali',
        'Mengubah algoritma iteratif menjadi rekursif',
        'Menyembunyikan data dari pengguna',
      ],
      correctOptionIndex: 1,
      explanation:
        'Memoization menyimpan hasil perhitungan yang sudah dilakukan sehingga saat dibutuhkan lagi bisa langsung digunakan, bukan dihitung ulang.',
    },
    {
      id: 'q-03-08',
      order: 8,
      prompt: 'Manakah pasangan algoritma dan kompleksitas worst case yang benar?',
      options: [
        'Bubble sort: O(n log n)',
        'Binary search: O(n)',
        'Selection sort: O(n²)',
        'Linear search: O(log n)',
      ],
      correctOptionIndex: 2,
      explanation:
        'Selection sort memiliki kompleksitas worst case O(n²). Bubble sort worst case O(n²), binary search O(log n), dan linear search O(n).',
    },
  ],
}
