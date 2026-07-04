import type { Reference } from '@/content/types'

export const ch01References: Reference[] = [
  {
    id: 'ref-01-01',
    title: 'Crafting Interpreters — Parsing',
    url: 'https://craftinginterpreters.com/parsing-expressions.html',
    description:
      'Bab parsing dari buku gratis Robert Nystrom yang menjelaskan recursive descent parser dengan contoh praktis.',
    type: 'book',
  },
  {
    id: 'ref-01-02',
    title: 'Dragon Book — Compilers: Principles, Techniques, and Tools',
    url: 'https://en.wikipedia.org/wiki/Compilers:_Principles,_Techniques,_and_Tools',
    description:
      'Referensi klasik teori compiler yang mencakup lexical analysis, parsing LR/LL, dan code generation.',
    type: 'book',
  },
  {
    id: 'ref-01-03',
    title: 'Chomsky Hierarchy — Stanford Encyclopedia of Philosophy',
    url: 'https://plato.stanford.edu/entries/formal-language-theory/',
    description:
      'Penjelasan formal tentang teori bahasa formal dan klasifikasi Chomsky Type 0 hingga Type 3.',
    type: 'article',
  },
  {
    id: 'ref-01-04',
    title: 'ANTLR Documentation',
    url: 'https://www.antlr.org/',
    description:
      'Parser generator populer yang menghasilkan lexer dan parser dari grammar; contoh praktis LL(*) parsing.',
    type: 'documentation',
  },
  {
    id: 'ref-01-05',
    title: 'LLVM Language Reference Manual',
    url: 'https://llvm.org/docs/LangRef.html',
    description:
      'Dokumentasi Intermediate Representation (IR) LLVM yang digunakan banyak compiler modern setelah fase front-end.',
    type: 'documentation',
  },
]
