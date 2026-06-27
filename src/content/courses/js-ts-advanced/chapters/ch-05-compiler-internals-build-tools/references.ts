import type { Reference } from '@/content/types'

export const ch05References: Reference[] = [
  {
    id: 'ref-05-01',
    title: 'TypeScript Compiler Options',
    url: 'https://www.typescriptlang.org/tsconfig/',
    description:
      'Referensi lengkap semua opsi tsconfig dan dampaknya pada output serta type checking.',
    type: 'documentation',
  },
  {
    id: 'ref-05-02',
    title: 'Babel Plugin Handbook',
    url: 'https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/plugin-handbook.md',
    description:
      'Panduan praktis membuat plugin Babel dengan visitor pattern dan manipulasi AST.',
    type: 'book',
  },
  {
    id: 'ref-05-03',
    title: 'SWC Docs',
    url: 'https://swc.rs/docs/getting-started',
    description:
      'Dokumentasi SWC, transpiler berbasis Rust dengan dukungan plugin dan konfigurasi.',
    type: 'documentation',
  },
  {
    id: 'ref-05-04',
    title: 'Go Docs — Build Constraints',
    url: 'https://pkg.go.dev/go/build',
    description:
      'Dokumentasi build constraints di Go, termasuk build tags dan file suffix.',
    type: 'documentation',
  },
  {
    id: 'ref-05-05',
    title: 'AST Explorer',
    url: 'https://astexplorer.net/',
    description:
      'Alat interaktif untuk menjelajahi AST dari berbagai parser seperti Babel, TypeScript, dan SWC.',
    type: 'interactive',
  },
]
