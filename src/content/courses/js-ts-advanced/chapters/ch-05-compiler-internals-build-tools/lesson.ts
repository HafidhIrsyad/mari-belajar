import type { Lesson } from '@/content/types'

export const ch05Lesson: Lesson = {
  id: 'lesson-ch-05-compiler-internals-build-tools',
  estimatedMinutes: 45,
  sections: [
    {
      id: 'sec-05-basic-compiler',
      type: 'markdown',
      level: 'basic',
      title: 'Transpilasi, AST, dan Peran Babel/SWC',
      content: `## Transpilasi vs Kompilasi

Dalam ekosistem JavaScript, **transpilasi** biasanya berarti mengubah kode modern (ESNext, TypeScript, JSX) menjadi JavaScript yang dapat dijalankan di target runtime. **Kompilasi** yang sebenarnya menghasilkan machine code, seperti yang dilakukan V8 saat runtime.

## Abstract Syntax Tree (AST)

AST adalah representasi hierarkis dari kode sumber. Setiap node merepresentasikan elemen sintaksis seperti function, variable declaration, binary expression, atau call expression.

\`\`\`javascript
// kode sumber
const x = 1 + 2;

// AST (sederhana)
{
  type: 'VariableDeclaration',
  declarations: [{
    id: { type: 'Identifier', name: 'x' },
    init: {
      type: 'BinaryExpression',
      operator: '+',
      left: { type: 'Literal', value: 1 },
      right: { type: 'Literal', value: 2 }
    }
  }]
}
\`\`\`

## Babel dan SWC

- **Babel**: transpiler berbasis JavaScript yang dapat diperluas dengan plugin. Fleksibel tetapi relatif lambat.
- **SWC**: transpiler berbasis Rust yang jauh lebih cepat. Mendukung plugin dalam bahasa Rust/Wasm.

Keduanya bekerja dengan mengubah AST dari bentuk asli ke bentuk target.`,
    },
    {
      id: 'sec-05-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-05-js',
        filename: 'babel-plugin.js',
        language: 'javascript',
        title: 'JavaScript: Plugin Babel Sederhana',
        code: `module.exports = function consoleRemovePlugin() {
  return {
    name: 'console-remove',
    visitor: {
      CallExpression(path) {
        const { node } = path;
        if (
          node.callee.type === 'MemberExpression' &&
          node.callee.object.name === 'console'
        ) {
          path.remove();
        }
      },
    },
  };
};

// Input:
// console.log('debug');
// const result = compute();

// Output setelah plugin:
// const result = compute();`,
        explanation:
          'Plugin Babel mengunjungi node CallExpression dan menghapus panggilan ke method console. Transformasi ini berguna untuk build production yang ingin menghilangkan log debug.',
      },
    },
    {
      id: 'sec-05-intermediate-tsconfig',
      type: 'markdown',
      level: 'intermediate',
      title: 'tsconfig.json, Declaration Emit, dan Source Maps',
      content: `## Konfigurasi Penting

Beberapa flag tsconfig yang berdampak besar pada output:

- **target**: versi ECMAScript target, misalnya ES2022.
- **module**: format output, misalnya ESNext, CommonJS, atau NodeNext.
- **moduleResolution**: strategi resolve import, Node atau NodeNext.
- **declaration**: menghasilkan file <code>.d.ts</code>.
- **declarationMap**: membuat source map untuk declaration.
- **sourceMap**: memetakan output JS ke TS asli untuk debugging.
- **strict**: mengaktifkan semua pemeriksaan ketat.

## Source Maps

Source map adalah file JSON yang memetakan posisi karakter di output ke posisi di kode sumber. Browser dan debugger menggunakannya untuk menampilkan breakpoint dan stack trace dalam TypeScript, bukan JavaScript hasil kompilasi.

## Declaration Emit

Library TypeScript yang dipublikasikan ke npm biasanya menyertakan file <code>.d.ts</code> agar konsumen yang menggunakan TypeScript dapat melakukan type checking tanpa membaca implementasi.

\`\`\`json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "declaration": true,
    "sourceMap": true,
    "strict": true
  }
}
\`\`\``,
    },
    {
      id: 'sec-05-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-05-ts',
        filename: 'ts-transformer.ts',
        language: 'typescript',
        title: 'TypeScript: Custom Transformer dengan Compiler API',
        code: `import * as ts from 'typescript';

function createDebugLabelTransformer(): ts.TransformerFactory<ts.SourceFile> {
  return (context) => {
    const visit: ts.Visitor = (node) => {
      if (
        ts.isCallExpression(node) &&
        ts.isIdentifier(node.expression) &&
        node.expression.text === 'debug'
      ) {
        const fileName = node.getSourceFile().fileName;
        const line = node.getSourceFile().getLineAndCharacterOfPosition(
          node.getStart()
        ).line + 1;
        return ts.factory.updateCallExpression(
          node,
          node.expression,
          node.typeArguments,
          [
            ...node.arguments,
            ts.factory.createStringLiteral(\`\${fileName}:\${line}\`),
          ]
        );
      }
      return ts.visitEachChild(node, visit, context);
    };
    return (sourceFile) => ts.visitNode(sourceFile, visit) as ts.SourceFile;
  };
}

// Penggunaan dengan tsc programmatic:
// const program = ts.createProgram(['input.ts'], options);
// program.emit(undefined, undefined, undefined, false, {
//   before: [createDebugLabelTransformer()],
// });

console.log('Transformer siap digunakan');`,
        explanation:
          'Transformer TypeScript mengunjungi node CallExpression dan menambahkan argumen berisi nama file dan nomor baris pada panggilan debug. Ini memungkinkan transformasi otomatis saat kompilasi.',
      },
    },
    {
      id: 'sec-05-advanced-build',
      type: 'markdown',
      level: 'advanced',
      title: 'Custom ESLint Rule, SWC Plugin, dan Monorepo Build Graph',
      content: `## Custom ESLint Rule

ESLint bekerja dengan AST untuk mendeteksi pola yang diinginkan atau dilarang. Custom rule mengembalikan object visitor yang mirip dengan Babel.

\`\`\`javascript
module.exports = {
  create(context) {
    return {
      CallExpression(node) {
        if (
          node.callee.name === 'eval'
        ) {
          context.report({
            node,
            message: 'eval is dangerous and should be avoided.',
          });
        }
      },
    };
  },
};
\`\`\`

## SWC Plugin

SWC menggunakan AST biner berbasis Rust. Plugin SWC dapat ditulis dalam Rust dan dikompilasi ke Wasm. Keunggulannya adalah performa: SWC bisa 10-20x lebih cepat dari Babel pada proyek besar.

## Monorepo Build Graph

Di monorepo, banyak package saling bergantung. Build graph menentukan urutan kompilasi. Tools seperti Nx, Turborepo, dan pnpm --filter menggunakan graph ini untuk:

- Hanya membangun package yang berubah.
- Menjalankan task secara paralel jika tidak ada dependensi antar task.
- Menyimpan cache hasil build untuk digunakan kembali.

## Module Resolution

TypeScript dan bundler modern mendukung path alias. Penting untuk memastikan alias di tsconfig, bundler, dan test runner sinkron agar import tidak gagal di satu toolchain tetapi berhasil di toolchain lain.`,
    },
    {
      id: 'sec-05-go-example',
      type: 'code-example',
      codeExample: {
        id: 'code-05-go',
        filename: 'build_tags.go',
        language: 'go',
        title: 'Go: Build Tags dan go generate',
        code: `//go:build !production

package main

import "fmt"

func init() {
\tfmt.Println("DEBUG build: logging verbose diaktifkan")
}

// File terpisah dengan tag //go:build production dapat menyediakan
// implementasi yang berbeda untuk mode production.

// go generate dapat menjalankan tool custom saat build:
// //go:generate go run ./cmd/genversion
// Perintah di atas dijalankan dengan: go generate ./...`,
        explanation:
          'Go menggunakan build tags untuk kompilasi bersyarat, mirip conditional compilation. go generate menjalankan tool sebelum build untuk menghasilkan kode, schema, atau versi.',
      },
    },
    {
      id: 'sec-05-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Info:** Pilih toolchain berdasarkan kebutuhan proyek. Babel sangat fleksibel untuk transformasi eksperimental, SWC unggul dalam performa, dan TypeScript Compiler API berguna untuk introspeksi tipe. Di Go, build tags dan go generate adalah cara idiomatic untuk conditional compilation dan code generation.',
    },
  ],
}
