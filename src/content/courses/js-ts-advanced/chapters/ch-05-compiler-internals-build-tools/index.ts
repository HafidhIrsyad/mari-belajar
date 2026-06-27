import type { Chapter } from '@/content/types'
import { ch05Lesson } from './lesson'
import { ch05Quiz } from './quiz'
import { ch05References } from './references'

export const ch05CompilerInternalsBuildTools: Chapter = {
  id: 'ch-05-compiler-internals-build-tools',
  slug: 'ch-05-compiler-internals-build-tools',
  order: 5,
  title: 'Compiler Internals & Build Tools',
  summary:
    'Memahami transpilasi, AST, Babel/SWC, konfigurasi TypeScript, source maps, custom transformer, ESLint rule, dan perbandingan dengan build tags serta go generate di Go.',
  estimatedMinutes: 45,
  learningObjectives: [
    'Menjelaskan perbedaan transpilasi dan kompilasi serta peran AST.',
    'Mengkonfigurasi tsconfig.json untuk declaration emit, source maps, dan module resolution.',
    'Membuat plugin Babel sederhana untuk transformasi AST.',
    'Menggunakan TypeScript Compiler API untuk custom transformer.',
    'Mengenal custom ESLint rule, SWC plugin, dan build graph pada monorepo.',
  ],
  summaryPoints: [
    'AST adalah representasi tree dari kode sumber yang digunakan compiler dan linter.',
    'Transpilasi mengubah kode dari satu bahasa tingkat tinggi ke bahasa tingkat tinggi lain, biasanya ESNext ke ES yang didukung browser.',
    'tsconfig.json mengontrol strictness, module output, declaration emit, dan source maps.',
    'Custom transformer memungkinkan transformasi kode otomatis saat build.',
    'Build graph di monorepo membantu menentukan urutan kompilasi dan invalidasi cache.',
  ],
  references: ch05References,
  lesson: ch05Lesson,
  quiz: ch05Quiz,
}
