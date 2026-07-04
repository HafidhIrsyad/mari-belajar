import type { Chapter } from '@/content/types'
import { ch02Lesson } from './lesson'
import { ch02Quiz } from './quiz'
import { ch02References } from './references'

export const ch02AdvancedDataStructures: Chapter = {
  id: 'ch-02-advanced-data-structures',
  slug: 'ch-02-advanced-data-structures',
  order: 2,
  title: 'Struktur Data Lanjutan',
  summary:
    'Mempelajari heap dan priority queue, operasi BST, konsep AVL tree, penanganan hash collision, trie, serta union-find untuk mengelola himpunan disjoint.',
  estimatedMinutes: 50,
  learningObjectives: [
    'Mengimplementasikan min-heap/max-heap dan priority queue.',
    'Melakukan operasi insert, search, dan delete pada binary search tree.',
    'Memahami konsep self-balancing AVL tree dan rotasi dasar.',
    'Membedakan chaining dan open addressing untuk resolusi hash collision.',
    'Menggunakan trie untuk pencarian string dan union-find untuk komponen terhubung.',
  ],
  summaryPoints: [
    'Binary heap memungkinkan insert dan extract-min/max dalam O(log n).',
    'BST efisien jika seimbang; AVL menjaga keseimbangan dengan rotasi saat insert/delete.',
    'Hash collision ditangani dengan chaining (linked list) atau open addressing (probing).',
    'Trie mengorganisir string berdasarkan prefiks, berguna untuk autocomplete.',
    'Union-find dengan path compression dan union by rank mendekati O(α(n)) amortized.',
  ],
  references: ch02References,
  lesson: ch02Lesson,
  quiz: ch02Quiz,
}
