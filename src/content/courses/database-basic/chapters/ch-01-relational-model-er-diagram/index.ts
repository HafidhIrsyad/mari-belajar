import type { Chapter } from '@/content/types'
import { ch01Lesson } from './lesson'
import { ch01Quiz } from './quiz'
import { ch01References } from './references'

export const ch01RelationalModelErDiagram: Chapter = {
  id: 'ch-01-relational-model-er-diagram',
  slug: 'ch-01-relational-model-er-diagram',
  order: 1,
  title: 'Relational Model & ER Diagram',
  summary:
    'Memahami fondasi model relasional: table, row, column, key, serta merancang skema melalui Entity-Relationship Diagram dengan notasi Crow\'s Foot, cardinality, dan pilihan surrogate vs natural key.',
  estimatedMinutes: 40,
  learningObjectives: [
    'Menjelaskan komponen dasar model relasional: relation, tuple, attribute, domain, dan key.',
    'Membedakan primary key, foreign key, candidate key, dan composite key.',
    'Membaca dan membuat ER Diagram dengan notasi Crow\'s Foot.',
    'Menentukan cardinality (one-to-one, one-to-many, many-to-many) antar entitas.',
    'Memilih antara surrogate key dan natural key berdasarkan konteks domain.',
  ],
  summaryPoints: [
    'Model relasional menyimpan data dalam bentuk table (relation) yang terdiri dari row (tuple) dan column (attribute).',
    'Primary key secara unik mengidentifikasi setiap row; foreign key menjaga relasi antar table.',
    'ER Diagram memvisualisasikan entitas, atribut, dan hubungan antar entitas sebelum kode SQL ditulis.',
    'Cardinality menentukan bagaimana record di satu entitas berhubungan dengan record di entitas lain.',
    'Surrogate key stabil dan tidak bermakna bisnis; natural key berasal dari data bisnis namun bisa berubah.',
  ],
  references: ch01References,
  lesson: ch01Lesson,
  quiz: ch01Quiz,
}
