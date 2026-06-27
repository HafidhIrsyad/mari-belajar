import type { Quiz } from '@/content/types'

export const ch05Quiz: Quiz = {
  id: 'quiz-ch-05-compiler-internals-build-tools',
  title: 'Quiz: Compiler Internals & Build Tools',
  passingScore: 8,
  questions: [
    {
      id: 'q-05-01',
      order: 1,
      prompt: 'Apa kepanjangan dari AST dalam konteks compiler?',
      options: [
        'Abstract Syntax Tree',
        'Advanced Source Transform',
        'Application Source Tree',
        'Automated Syntax Test',
      ],
      correctOptionIndex: 0,
      explanation:
        'AST adalah Abstract Syntax Tree, representasi hierarkis struktur kode sumber.',
    },
    {
      id: 'q-05-02',
      order: 2,
      prompt: 'Apa perbedaan utama transpilasi dan kompilasi dalam ekosistem JS?',
      options: [
        'Transpilasi menghasilkan machine code, kompilasi tidak',
        'Transpilasi mengubah kode tingkat tinggi ke kode tingkat tinggi lain',
        'Kompilasi selalu lebih lambat dari transpilasi',
        'Tidak ada perbedaan',
      ],
      correctOptionIndex: 1,
      explanation:
        'Transpilasi mengubah kode dari satu bahasa/versi tingkat tinggi ke bentuk lain, sedangkan kompilasi sering merujuk pada pembuatan machine code.',
    },
    {
      id: 'q-05-03',
      order: 3,
      prompt: 'Flag tsconfig manakah yang menghasilkan file .d.ts?',
      options: ['sourceMap', 'declaration', 'emitDecoratorMetadata', 'strict'],
      correctOptionIndex: 1,
      explanation:
        '`declaration: true` meminta TypeScript untuk menghasilkan file declaration (.d.ts).',
    },
    {
      id: 'q-05-04',
      order: 4,
      prompt: 'Apa fungsi source map?',
      options: [
        'Memperkecil ukuran bundle',
        'Memetakan output JS ke kode sumber untuk debugging',
        'Menghapus kode yang tidak terpakai',
        'Mengompilasi TypeScript ke WebAssembly',
      ],
      correctOptionIndex: 1,
      explanation:
        'Source map memungkinkan debugger menampilkan kode sumber asli meskipun yang dieksekusi adalah output hasil transpilasi.',
    },
    {
      id: 'q-05-05',
      order: 5,
      prompt: 'Tool manakah yang berbasis Rust dan dikenal sangat cepat untuk transpilasi?',
      options: ['Babel', 'SWC', 'Webpack', 'Rollup'],
      correctOptionIndex: 1,
      explanation:
        'SWC adalah transpiler berbasis Rust yang jauh lebih cepat daripada Babel pada proyek besar.',
    },
    {
      id: 'q-05-06',
      order: 6,
      prompt: 'Apa yang dilakukan custom ESLint rule?',
      options: [
        'Mengubah AST menjadi machine code',
        'Mendeteksi dan melaporkan pola kode berdasarkan AST',
        'Menjalankan test secara otomatis',
        'Mengompresi asset gambar',
      ],
      correctOptionIndex: 1,
      explanation:
        'ESLint rule mengunjungi AST untuk menemukan pola yang melanggar aturan dan melaporkannya.',
    },
    {
      id: 'q-05-07',
      order: 7,
      prompt: 'Apa kegunaan build graph di monorepo?',
      options: [
        'Menghapus semua node_modules',
        'Menentukan urutan kompilasi dan paralelisasi antar package',
        'Mengganti package manager',
        'Membuat file README otomatis',
      ],
      correctOptionIndex: 1,
      explanation:
        'Build graph mengetahui dependensi antar package sehingga dapat menentukan urutan build dan mana yang boleh berjalan paralel.',
    },
    {
      id: 'q-05-08',
      order: 8,
      prompt: 'Dalam Go, perintah apa yang menjalankan tool generation sebelum build?',
      options: ['go build', 'go generate', 'go run', 'go test'],
      correctOptionIndex: 1,
      explanation:
        '`go generate` menjalankan directive seperti `//go:generate` untuk menghasilkan kode atau file lain.',
    },
  ],
}
