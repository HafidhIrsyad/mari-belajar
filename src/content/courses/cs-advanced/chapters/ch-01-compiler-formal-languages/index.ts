import type { Chapter } from '@/content/types'
import { ch01Lesson } from './lesson'
import { ch01Quiz } from './quiz'
import { ch01References } from './references'

export const ch01CompilerFormalLanguages: Chapter = {
  id: 'ch-01-compiler-formal-languages',
  slug: 'ch-01-compiler-formal-languages',
  order: 1,
  title: 'Compiler & Formal Languages',
  summary:
    'Memahami pipeline kompilasi dari source code hingga executable, peran lexer dan parser, hierarki Chomsky, Abstract Syntax Tree, analisis semantik, serta konsep parsing LL dan LR.',
  estimatedMinutes: 55,
  learningObjectives: [
    'Menjelaskan tahapan pipeline kompilasi: lexical analysis, parsing, semantic analysis, optimization, dan code generation.',
    'Membedakan token, grammar, dan AST serta peran masing-masing dalam compiler.',
    'Mengklasifikasikan bahasa formal menurut hierarki Chomsky (Type 0–3).',
    'Mengimplementasikan parser recursive descent sederhana untuk ekspresi aritmetika.',
    'Membedakan parsing top-down (LL) dan bottom-up (LR) serta kapan masing-masing dipakai.',
  ],
  summaryPoints: [
    'Compiler menerjemahkan source code ke target (bytecode, machine code, atau IR) melalui serangkaian fase terstruktur.',
    'Lexer/tokenizer mengubah karakter mentah menjadi stream token; parser membangun struktur hierarkis dari token.',
    'AST merepresentasikan struktur program tanpa detail sintaks permukaan seperti tanda kurung atau titik koma.',
    'Analisis semantik memvalidasi makna program: tipe, scope, deklarasi, dan aturan bahasa.',
    'Hierarki Chomsky mengklasifikasikan kekuatan grammar; bahasa pemrograman umumnya context-free (Type 2).',
  ],
  references: ch01References,
  lesson: ch01Lesson,
  quiz: ch01Quiz,
}
