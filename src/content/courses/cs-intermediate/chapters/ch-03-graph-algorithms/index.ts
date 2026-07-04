import type { Chapter } from '@/content/types'
import { ch03Lesson } from './lesson'
import { ch03Quiz } from './quiz'
import { ch03References } from './references'

export const ch03GraphAlgorithms: Chapter = {
  id: 'ch-03-graph-algorithms',
  slug: 'ch-03-graph-algorithms',
  order: 3,
  title: 'Algoritma Graf',
  summary:
    'Mempelajari representasi graf (adjacency list/matrix), traversal BFS dan DFS, algoritma Dijkstra, topological sort, serta deteksi siklus pada graf berarah dan tak berarah.',
  estimatedMinutes: 50,
  learningObjectives: [
    'Memilih antara adjacency list dan adjacency matrix berdasarkan kebutuhan.',
    'Mengimplementasikan BFS dan DFS untuk traversal dan pencarian.',
    'Menerapkan algoritma Dijkstra untuk shortest path pada graf berbobot non-negatif.',
    'Melakukan topological sort pada DAG dan mendeteksi siklus.',
    'Membedakan strategi deteksi siklus pada graf berarah versus tak berarah.',
  ],
  summaryPoints: [
    'Adjacency list efisien untuk graf sparse; matrix O(1) untuk cek edge tetapi O(V²) memori.',
    'BFS menemukan shortest path pada graf unweighted; DFS berguna untuk eksplorasi mendalam.',
    'Dijkstra memerlukan bobot non-negatif dan priority queue untuk efisiensi O((V+E) log V).',
    'Topological sort hanya valid pada DAG — keberadaan siklus membuatnya tidak mungkin.',
    'Deteksi siklus: DFS tiga-warna untuk directed, union-find atau DFS parent untuk undirected.',
  ],
  references: ch03References,
  lesson: ch03Lesson,
  quiz: ch03Quiz,
}
