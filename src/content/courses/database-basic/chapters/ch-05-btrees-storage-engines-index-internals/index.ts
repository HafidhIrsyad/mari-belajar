import type { Chapter } from '@/content/types'
import { ch05Lesson } from './lesson'
import { ch05Quiz } from './quiz'
import { ch05References } from './references'

export const ch05BtreesStorageEnginesIndexInternals: Chapter = {
  id: 'ch-05-btrees-storage-engines-index-internals',
  slug: 'ch-05-btrees-storage-engines-index-internals',
  order: 5,
  title: 'B-Trees, Storage Engines & Index Internals',
  summary:
    'Memahami struktur B+ tree, layout page, perbedaan clustered vs non-clustered index, buffer pool, covering index, serta perbandingan storage engine dan peran WAL.',
  estimatedMinutes: 55,
  learningObjectives: [
    'Menjelaskan struktur B+ tree, node, leaf, dan cara pencarian key.',
    'Membedakan clustered index dan non-clustered index.',
    'Memahami buffer pool, page cache, dan mekanisme page split.',
    'Merancang composite index dengan memperhatikan column ordering.',
    'Menjelaskan perbedaan storage engine InnoDB, PostgreSQL heapam, dan SQLite B-tree serta peran WAL.',
  ],
  summaryPoints: [
    'B+ tree menyimpan data terurut di leaf node dan pointer di internal node, memungkinkan pencarian O(log n).',
    'Clustered index menentukan urutan fisik penyimpanan row; non-clustered index berisi pointer ke row.',
    'Buffer pool menyimpan page yang sering diakses di memori untuk mengurangi I/O disk.',
    'Composite index hanya efektif jika predicate menggunakan prefix kolom dari kiri.',
    'WAL menjamin durabilitas dengan menulis perubahan ke log sebelum memodifikasi page data.',
  ],
  references: ch05References,
  lesson: ch05Lesson,
  quiz: ch05Quiz,
}
