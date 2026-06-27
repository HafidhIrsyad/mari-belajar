import type { Chapter } from '@/content/types'
import { ch03Lesson } from './lesson'
import { ch03Quiz } from './quiz'
import { ch03References } from './references'

export const ch03Reflection: Chapter = {
  id: 'ch-03-reflection',
  slug: 'ch-03-reflection',
  order: 3,
  title: 'Reflection & Code Generation',
  summary:
    'Memahami reflect package, struct tags, dynamic method call, serta `go generate` dan AST parser untuk menghasilkan kode boilerplate secara otomatis.',
  estimatedMinutes: 45,
  learningObjectives: [
    'Menggunakan reflect.Type dan reflect.Value untuk introspeksi tipe.',
    'Membedakan kind dan type dalam reflection.',
    'Membaca dan memanfaatkan struct tags.',
    'Mengetahui kapan reflection tepat dan kapan harus dihindari.',
    'Menulis generator sederhana dengan `go generate` dan `go/ast`.',
  ],
  summaryPoints: [
    'Reflection memungkinkan introspeksi tipe dan nilai saat runtime.',
    'reflect.Type mendeskripsikan tipe, reflect.Value membungkus nilai.',
    'Kind adalah kategori tipe dasar, sedangkan Type bisa bersifat bernama.',
    'Struct tags menyimpan metadata yang bisa dibaca via reflection.',
    'Reflection memiliki overhead dan mengorbankan type safety.',
    'go generate mengaitkan perintah generate dengan sumber kode.',
    'go/ast memungkinkan parsing kode Go untuk code generation.',
  ],
  references: ch03References,
  lesson: ch03Lesson,
  quiz: ch03Quiz,
}
