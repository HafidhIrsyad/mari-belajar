import type { Chapter } from '@/content/types'
import { ch05Lesson } from './lesson'
import { ch05Quiz } from './quiz'
import { ch05References } from './references'

export const ch05StructInterfaceEmbedding: Chapter = {
  id: 'ch-05-struct-interface-embedding',
  slug: 'ch-05-struct-interface-embedding',
  order: 5,
  title: 'Struct, Interface & Embedding',
  summary:
    'Mempelajari struct sebagai komposit data, tag, constructor, interface sebagai kontrak implisit, type assertion, type switch, embedding, dan polymorphism Go-style.',
  estimatedMinutes: 35,
  learningObjectives: [
    'Mendefinisikan struct dan mengakses field-nya.',
    'Membuat constructor dan method pada struct.',
    'Mendefinisikan interface dan mengimplementasikannya secara implisit.',
    'Menggunakan type assertion dan type switch.',
    'Memahami struct embedding dan interface embedding.',
    'Memahami polymorphism tanpa inheritance di Go.',
  ],
  summaryPoints: [
    'Struct adalah kumpulan field yang bisa memiliki tipe berbeda.',
    'Interface adalah kontrak method; implementasi tidak perlu dideklarasikan secara eksplisit.',
    'Go tidak memiliki class dan inheritance; composition digunakan melalui embedding.',
    'Type assertion mengakses tipe konkret dari nilai interface.',
    'Embedding struct menyediakan promoted fields dan methods.',
    'Empty interface interface{} atau any bisa menampung nilai apa pun.',
  ],
  references: ch05References,
  lesson: ch05Lesson,
  quiz: ch05Quiz,
}
