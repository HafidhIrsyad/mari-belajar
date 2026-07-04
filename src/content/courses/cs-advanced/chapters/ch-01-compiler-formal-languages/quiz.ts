import type { Quiz } from '@/content/types'

export const ch01Quiz: Quiz = {
  id: 'quiz-ch-01-compiler-formal-languages',
  title: 'Quiz: Compiler & Formal Languages',
  passingScore: 8,
  questions: [
    {
      id: 'q-01-01',
      order: 1,
      prompt: 'Fase pertama dalam pipeline compiler yang mengubah karakter mentah menjadi token disebut?',
      options: ['Code generation', 'Lexical analysis', 'Semantic analysis', 'Optimization'],
      correctOptionIndex: 1,
      explanation:
        'Lexical analysis (tokenization) membaca stream karakter dan mengelompokkannya menjadi token seperti identifier, literal, dan operator.',
    },
    {
      id: 'q-01-02',
      order: 2,
      prompt: 'Dalam hierarki Chomsky, grammar bahasa pemrograman umum (if-else, ekspresi bersarang) termasuk tipe?',
      options: ['Type 3 — Regular', 'Type 2 — Context-Free', 'Type 1 — Context-Sensitive', 'Type 0 — Unrestricted'],
      correctOptionIndex: 1,
      explanation:
        'Kebanyakan sintaks bahasa pemrograman dapat dijelaskan dengan context-free grammar (Type 2), misalnya ekspresi bersarang dan blok kode.',
    },
    {
      id: 'q-01-03',
      order: 3,
      prompt: 'Apa peran utama Abstract Syntax Tree (AST)?',
      options: [
        'Menyimpan bytecode siap eksekusi',
        'Merepresentasikan struktur program tanpa detail sintaks permukaan',
        'Menggantikan seluruh proses code generation',
        'Menyimpan hasil optimasi register allocation',
      ],
      correctOptionIndex: 1,
      explanation:
        'AST menangkap struktur semantik program (node ekspresi, statement, deklarasi) tanpa noise sintaks seperti tanda kurung atau koma.',
    },
    {
      id: 'q-01-04',
      order: 4,
      prompt: 'Parser recursive descent bekerja dengan strategi?',
      options: [
        'Bottom-up dengan stack shift-reduce',
        'Top-down: setiap non-terminal menjadi fungsi yang memanggil fungsi lain',
        'Membaca bytecode dan merekonstruksi source',
        'Mengoptimasi loop sebelum parsing',
      ],
      correctOptionIndex: 1,
      explanation:
        'Recursive descent adalah parser top-down: setiap rule grammar direpresentasikan sebagai fungsi yang secara rekursif mem-parse bagian input.',
    },
    {
      id: 'q-01-05',
      order: 5,
      prompt: 'Analisis semantik pada compiler bertanggung jawab untuk?',
      options: [
        'Menghapus whitespace dan komentar',
        'Memvalidasi tipe, scope, dan aturan makna program',
        'Menerjemahkan AST ke assembly',
        'Menghasilkan token dari karakter',
      ],
      correctOptionIndex: 1,
      explanation:
        'Semantic analysis memastikan program bermakna: variabel dideklarasikan, tipe cocok, fungsi dipanggil dengan argumen benar, dan aturan bahasa dipatuhi.',
    },
    {
      id: 'q-01-06',
      order: 6,
      prompt: 'Perbedaan utama parsing LL dan LR adalah?',
      options: [
        'LL bottom-up, LR top-down',
        'LL top-down (Left-to-right, Leftmost derivation), LR bottom-up (Left-to-right, Rightmost derivation)',
        'LL hanya untuk regex, LR hanya untuk bytecode',
        'LL dan LR identik, hanya berbeda nama',
      ],
      correctOptionIndex: 1,
      explanation:
        'LL parser bekerja top-down dengan derivasi leftmost; LR parser bottom-up dengan derivasi rightmost, umumnya lebih kuat untuk grammar kompleks.',
    },
    {
      id: 'q-01-07',
      order: 7,
      prompt: 'Intermediate Representation (IR) dalam compiler digunakan untuk?',
      options: [
        'Menyimpan password developer',
        'Representasi program antara front-end dan back-end agar optimasi dan target code generation modular',
        'Menggantikan lexer sepenuhnya',
        'Hanya dipakai oleh interpreter, bukan compiler',
      ],
      correctOptionIndex: 1,
      explanation:
        'IR memisahkan front-end (parsing, semantik) dari back-end (optimasi, code gen), sehingga satu front-end bisa menarget banyak platform.',
    },
    {
      id: 'q-01-08',
      order: 8,
      prompt: 'Bahasa regular (Type 3 Chomsky) paling cocok untuk?',
      options: [
        'Parser ekspresi aritmetika bersarang',
        'Lexer/tokenizer yang mengenali identifier, angka, dan keyword',
        'Analisis tipe dependen pada konteks',
        'Optimasi register allocation',
      ],
      correctOptionIndex: 1,
      explanation:
        'Bahasa regular cukup untuk pola token sederhana (identifier, literal, operator). Ekspresi bersarang membutuhkan context-free grammar.',
    },
  ],
}
