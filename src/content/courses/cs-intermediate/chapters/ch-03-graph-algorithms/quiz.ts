import type { Quiz } from '@/content/types'

export const ch03Quiz: Quiz = {
  id: 'quiz-ch-03-graph-algorithms',
  title: 'Quiz: Algoritma Graf',
  passingScore: 8,
  questions: [
    {
      id: 'q-03-01',
      order: 1,
      prompt: 'Adjacency matrix untuk graf dengan V vertex membutuhkan ruang?',
      options: ['O(V)', 'O(E)', 'O(V²)', 'O(V + E)'],
      correctOptionIndex: 2,
      explanation:
        'Adjacency matrix berukuran V × V, sehingga membutuhkan O(V²) ruang terlepas dari jumlah edge.',
    },
    {
      id: 'q-03-02',
      order: 2,
      prompt: 'Adjacency list lebih efisien untuk graf yang?',
      options: ['Dense (banyak edge)', 'Sparse (sedikit edge)', 'Tanpa edge', 'Berbobot negatif saja'],
      correctOptionIndex: 1,
      explanation:
        'Adjacency list hanya menyimpan edge yang ada, sehingga ruang O(V + E) — ideal untuk graf sparse.',
    },
    {
      id: 'q-03-03',
      order: 3,
      prompt: 'BFS pada graf unweighted menemukan?',
      options: [
        'Path terpanjang',
        'Shortest path dalam jumlah edge',
        'Minimum spanning tree',
        'Semua siklus',
      ],
      correctOptionIndex: 1,
      explanation:
        'BFS mengeksplorasi per level, sehingga pertama kali mencapai node target melalui jalur dengan edge paling sedikit.',
    },
    {
      id: 'q-03-04',
      order: 4,
      prompt: 'DFS menggunakan struktur data utama?',
      options: ['Queue', 'Stack (eksplisit atau call stack)', 'Heap', 'Hash table'],
      correctOptionIndex: 1,
      explanation:
        'DFS mengeksplorasi sedalam mungkin sebelum backtrack, secara natural menggunakan stack — baik call stack rekursif maupun stack eksplisit.',
    },
    {
      id: 'q-03-05',
      order: 5,
      prompt: 'Dijkstra tidak dapat digunakan langsung ketika graf memiliki?',
      options: [
        'Edge berbobot positif',
        'Edge berbobot negatif',
        'Banyak vertex',
        'Graf tak berarah',
      ],
      correctOptionIndex: 1,
      explanation:
        'Bobot negatif dapat menyebabkan Dijkstra memilih jalur suboptimal secara greedy. Gunakan Bellman-Ford untuk bobot negatif.',
    },
    {
      id: 'q-03-06',
      order: 6,
      prompt: 'Topological sort hanya dapat dilakukan pada?',
      options: [
        'Graf tak berarah',
        'DAG (Directed Acyclic Graph)',
        'Graf dengan siklus',
        'Graf lengkap saja',
      ],
      correctOptionIndex: 1,
      explanation:
        'Topological sort memerlukan urutan linear di mana setiap edge u→v, u muncul sebelum v. Siklus membuat urutan ini tidak mungkin.',
    },
    {
      id: 'q-03-07',
      order: 7,
      prompt: 'Kahn algorithm untuk topological sort menggunakan?',
      options: [
        'DFS rekursif',
        'BFS dengan queue node yang in-degree-nya 0',
        'Union-find',
        'Binary search',
      ],
      correctOptionIndex: 1,
      explanation:
        'Kahn algorithm memproses node dengan in-degree 0, mengurangi in-degree tetangga, dan mengulangi — mirip BFS berdasarkan in-degree.',
    },
    {
      id: 'q-03-08',
      order: 8,
      prompt: 'Deteksi siklus pada graf berarah umumnya menggunakan?',
      options: [
        'BFS dengan queue',
        'DFS dengan tiga warna (white/gray/black)',
        'Dijkstra',
        'Merge sort',
      ],
      correctOptionIndex: 1,
      explanation:
        'DFS tiga-warna: gray menandakan node sedang diproses. Back edge ke node gray menandakan siklus pada graf berarah.',
    },
  ],
}
