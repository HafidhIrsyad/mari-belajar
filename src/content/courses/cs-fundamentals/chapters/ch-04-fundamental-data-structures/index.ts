import type { Chapter } from '@/content/types'
import { ch04Lesson } from './lesson'
import { ch04Quiz } from './quiz'
import { ch04References } from './references'

export const ch04FundamentalDataStructures: Chapter = {
  id: 'ch-04-fundamental-data-structures',
  slug: 'ch-04-fundamental-data-structures',
  order: 4,
  title: 'Struktur Data Fundamental',
  summary:
    'Mempelajari array, linked list, stack, queue, hash table, Set, Map, binary tree, binary search tree, graph, serta konsep DFS dan BFS.',
  estimatedMinutes: 22,
  learningObjectives: [
    'Memahami perbedaan array dan linked list serta kelebihan masing-masing.',
    'Menjelaskan prinsip kerja stack (LIFO) dan queue (FIFO).',
    'Mengenal konsep hash table, fungsi hash, dan collision.',
    'Memahami perbedaan Set dan Map serta kapan menggunakannya.',
    'Memahami struktur tree, binary search tree, dan graph.',
    'Menjelaskan konsep DFS dan BFS secara konseptual.',
  ],
  summaryPoints: [
    'Array menyimpan data berurutan di memori dengan akses indeks O(1).',
    'Linked list menyimpan data sebagai node yang saling terhubung melalui referensi.',
    'Stack bekerja dengan prinsip LIFO; queue bekerja dengan prinsip FIFO.',
    'Hash table menyimpan pasangan key-value dengan pencarian rata-rata O(1).',
    'Set menyimpan nilai unik; Map menyimpan pasangan key-value dengan urutan penyisipan.',
    'Binary search tree mempercepat pencarian dengan aturan urutan pada node.',
    'Graph memodelkan hubungan antar entitas melalui node dan edge.',
    'DFS menjelajah sedalam mungkin; BFS menjelajah per level.',
  ],
  references: ch04References,
  lesson: ch04Lesson,
  quiz: ch04Quiz,
}
