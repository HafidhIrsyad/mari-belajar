import type { Chapter } from '@/content/types'
import { ch03Lesson } from './lesson'
import { ch03Quiz } from './quiz'
import { ch03References } from './references'

export const ch03IndexingLanjutan: Chapter = {
  id: "ch-03-indexing-lanjutan",
  slug: "ch-03-indexing-lanjutan",
  order: 3,
  title: "Indexing Lanjutan",
  summary: "Mendalami partial index, expression index, covering index, serta indeks khusus seperti GIN, GiST, BRIN, dan strategi pemeliharaan index.",
  estimatedMinutes: 60,
  learningObjectives: ["Merancang partial index dan expression index.","Memahami covering index dan index-only scan.","Menjelaskan perbedaan GIN, GiST, SP-GiST, BRIN, dan B-tree.","Mengoptimalkan full-text search dan pencarian similarity.","Mengetahui biaya tulis dan pemeliharaan index."],
  summaryPoints: ["Partial index mengurangi ukuran index dengan hanya mengindeks subset data.","Expression index mempercepat query dengan fungsi atau ekspresi pada kolom.","Covering index menghindari akses heap melalui index-only scan.","GIN cocok untuk array, JSONB, dan full-text search; GiST untuk geometri dan range.","BRIN ringan untuk data yang berkorelasi kuat dengan urutan fisik."],
  references: ch03References,
  lesson: ch03Lesson,
  quiz: ch03Quiz,
}
