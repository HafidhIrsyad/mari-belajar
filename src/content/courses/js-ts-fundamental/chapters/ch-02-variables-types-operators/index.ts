import type { Chapter } from '@/content/types'
import { ch02VariablesTypesOperatorsLesson } from './lesson'
import { ch02VariablesTypesOperatorsQuiz } from './quiz'
import { ch02VariablesTypesOperatorsReferences } from './references'

export const ch02VariablesTypesOperators: Chapter = {
  id: 'ch-02-variables-types-operators',
  slug: 'ch-02-variables-types-operators',
  order: 2,
  title: 'Variabel, Tipe Data, dan Operator',
  summary:
    'Mempelajari deklarasi variabel dengan let, const, dan var, tipe data primitive, type coercion, truthy/falsy, operator aritmatika, perbandingan, logika, template literal, serta dasar type annotation dan type inference di TypeScript.',
  estimatedMinutes: 15,
  learningObjectives: [
    'Memahami perbedaan let, const, dan var serta kapan menggunakannya.',
    'Mengenal tipe data primitive di JavaScript: string, number, boolean, null, undefined, symbol, dan bigint.',
    'Menjelaskan type coercion dan membedakan nilai truthy dengan falsy.',
    'Menguasai operator aritmatika, perbandingan, logika, dan assignment.',
    'Menggunakan template literal untuk menyusun string dinamis.',
    'Memahami type annotation dasar dan type inference di TypeScript.',
  ],
  summaryPoints: [
    'Gunakan const secara default; pilih let jika nilai akan diubah; hindari var karena perilaku function scope dan hoisting.',
    'Tipe primitive menyimpan nilai langsung, sedangkan object menyimpan referensi ke memori.',
    'Operator perbandingan ketat (=== dan !==) lebih aman daripada operator longgar (== dan !=).',
    'Template literal memudahkan interpolasi variabel dan pembuatan string multiline.',
    'TypeScript menambahkan type annotation opsional yang membantu menangkap kesalahan saat compile time.',
    'Type inference memungkinkan TypeScript menebak tipe dari nilai inisialisasi.',
    'Union type memperbolehkan sebuah variabel memiliki salah satu dari beberapa tipe yang ditentukan.',
  ],
  references: ch02VariablesTypesOperatorsReferences,
  lesson: ch02VariablesTypesOperatorsLesson,
  quiz: ch02VariablesTypesOperatorsQuiz,
}
