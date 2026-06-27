import type { Lesson } from '@/content/types'

export const ch08Lesson: Lesson = {
  id: 'lesson-ch-08-modules-tooling-best-practices',
  estimatedMinutes: 15,
  sections: [
    {
      id: 'sec-08-basic-modules',
      type: 'markdown',
      level: 'basic',
      title: 'ES Modules, package.json, dan npm Script',
      content: `## Memisahkan Kode dengan ES Modules

JavaScript modern menggunakan **ES Modules** untuk membagi program menjadi file-file kecil yang lebih mudah dikelola. Setiap file bisa mengekspor nilai, fungsi, atau kelas, lalu file lain mengimpornya.

Ada dua bentuk utama export:

- **Named export**: mengekspor beberapa anggota dengan nama tertentu. Diimpor menggunakan kurung kurawal.
- **Default export**: mengekspor satu nilai utama dari file. Diimpor tanpa kurung kurawal.

\`\`\`text
// utils.js (named export)
export function add(a, b) { return a + b; }

// app.js
import { add } from "./utils.js";
console.log(add(2, 3)); // 5
\`\`\`

## package.json sebagai Kartu Identitas Proyek

File \`package.json\` berisi metadata proyek, daftar dependensi, dan skrip yang bisa dijalankan. Contoh isi penting:

- \`name\` dan \`version\`: nama serta versi proyek.
- \`dependencies\`: pustaka yang dibutuhkan saat aplikasi berjalan.
- \`devDependencies\`: pustaka yang hanya dibutuhkan saat development, seperti TypeScript compiler dan linter.
- \`scripts\`: perintah pintasan seperti \`dev\`, \`build\`, dan \`test\`.

## node_modules

Ketika menjalankan \`npm install\` atau \`pnpm install\`, pustaka yang tercatat di \`package.json\` akan diunduh ke folder \`node_modules\`. Folder ini berisi kode sumber pihak ketiga dan biasanya tidak perlu diedit atau diunggah ke repositori.

## Menjalankan Script

Gunakan perintah berikut untuk menjalankan skrip yang terdefinisi di \`package.json\`:

\`\`\`text
pnpm run dev
npm run build
\`\`\`

Perintah \`pnpm run <nama-script>\` (atau \`npm run <nama-script>\`) memanggil nilai yang ada di bagian \`scripts\`, misalnya \`"dev": "vite"\`.`,
    },
    {
      id: 'sec-08-js-modules',
      type: 'code-example',
      codeExample: {
        id: 'code-08-js',
        filename: 'modules.js',
        language: 'javascript',
        title: 'JavaScript: Import dan Export ES Modules',
        code: `// math.js
export function add(a, b) {
  return a + b;
}

export function multiply(a, b) {
  return a * b;
}

export default function greet(name) {
  return "Halo, " + name + "!";
}

// main.js
import greet, { add, multiply } from "./math.js";

console.log(greet("Andi"));       // "Halo, Andi!"
console.log(add(2, 3));           // 5
console.log(multiply(4, 5));      // 20`,
        explanation:
          'Named export memungkinkan beberapa fungsi diekspor sekaligus dan diimpor dengan kurung kurawal. Default export hanya satu per file dan diimpor tanpa kurung kurawal.',
      },
    },
    {
      id: 'sec-08-intermediate-tooling',
      type: 'markdown',
      level: 'intermediate',
      title: 'TypeScript Config, Linting, Formatting, dan Environment Variables',
      content: `## Mengenal tsconfig.json

File \`tsconfig.json\` mengatur bagaimana TypeScript compiler (\`tsc\`) menerjemahkan kode TypeScript menjadi JavaScript. Beberapa opsi penting:

- \`target\`: versi ECMAScript target, misalnya \`ES2022\`.
- \`module\`: sistem modul, biasanya \`ESNext\` untuk proyek modern.
- \`strict\`: mengaktifkan semua pemeriksaan tipe ketat; sangat disarankan untuk menangkap bug lebih awal.
- \`outDir\`: folder hasil kompilasi.
- \`include\` dan \`exclude\`: menentukan file atau folder yang diproses oleh compiler.

## Linter dan Formatter

Dua alat penting menjaga kualitas kode:

- **Linter** (misalnya ESLint atau Oxlint) memeriksa kode untuk menemukan potensi bug, pola berbahaya, dan pelanggaran gaya.
- **Formatter** (misalnya Prettier atau \`dprint\`) merapikan tampilan kode seperti indentasi, titik koma, dan panjang baris.

Keduanya berbeda: linter bertanya "apakah kode ini benar dan aman?", formatter bertanya "apakah kode ini rapi dan konsisten?".

## Environment Variables

Environment variables adalah nilai konfigurasi yang disediakan oleh sistem atau file \`.env\`. Contoh penggunaan:

\`\`\`text
PORT=3000
API_BASE_URL=https://api.example.com
\`\`\`

Di Node.js nilai tersebut bisa dibaca lewat \`process.env.PORT\`. Pastikan untuk **tidak menyimpan secret** seperti password atau token API langsung di kode. Gunakan variabel lingkungan dan jaga file \`.env\` agar tidak terunggah ke publik.`,
    },
    {
      id: 'sec-08-ts-config',
      type: 'code-example',
      codeExample: {
        id: 'code-08-ts',
        filename: 'tsconfig.json',
        language: 'text',
        title: 'TypeScript: Konfigurasi tsconfig.json dan Modul Bertipe',
        code: `{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "./dist"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts"]
}

// greet.ts
export function greet(name: string): string {
  return "Halo, " + name;
}

// main.ts
import { greet } from "./greet.js";

console.log(greet("Budi")); // "Halo, Budi"`,
        explanation:
          'Opsi strict memastikan TypeScript memeriksa tipe seketat mungkin, sementara include/exclude mengontrol cakupan file yang dikompilasi. Import file TS di ES Modules sering tetap menggunakan ekstensi .js karena hasil kompilasi yang direferensikan.',
      },
    },
    {
      id: 'sec-08-advanced-best-practices',
      type: 'markdown',
      level: 'advanced',
      title: 'Error Handling, Gaya Kode, dan Sumber Belajar Lanjutan',
      content: `## Penanganan Error yang Baik

Aplikasi yang andal tidak hanya berjalan saat semuanya lancar, tetapi juga bersikap baik saat terjadi kesalahan. Beberapa prinsipnya:

- Gunakan \`try...catch\` pada kode yang bisa gagal, terutama operasi asinkron dengan \`await\`.
- Jangan diam-diam menelan error dengan blok \`catch\` kosong; setidaknya catat atau laporkan masalahnya.
- Buat pesan error yang jelas agar debugging lebih cepat.
- Gunakan \`Promise.catch()\` atau \`try/catch\` untuk menangani kegagalan \`fetch\` atau pembacaan file.

## Menulis Kode yang Mudah Dibaca

Kode dibaca lebih sering daripada ditulis. Beberapa kebiasaan yang membantu:

- Beri nama variabel dan fungsi yang menjelaskan maksudnya, misalnya \`calculateTotalPrice\` lebih baik daripada \`calc\`.
- Satu fungsi sebaiknya hanya mengerjakan satu tugas.
- Manfaatkan early return dan guard clause untuk mengurangi nesting.
- Tambahkan komentar untuk menjelaskan "mengapa", bukan "apa" yang sudah jelas dari kodenya.

## Sumber Belajar Berikutnya

Setelah menguasai fundamental, kamu bisa melanjutkan ke:

- Frontend dengan framework seperti React, Vue, atau Svelte.
- Backend dan API dengan Node.js serta ekosistemnya.
- Pengujian otomatis menggunakan Vitest, Jest, atau Playwright.
- Ekosistem Go untuk membandingkan model concurrency dan tooling-nya.

Teruslah membaca dokumentasi resmi, membuat proyek kecil, dan berkontribusi ke basis kode nyata.`,
    },
    {
      id: 'sec-08-go-modules',
      type: 'code-example',
      codeExample: {
        id: 'code-08-go',
        filename: 'main.go',
        language: 'go',
        title: 'Go: Package dan Import',
        code: `package main

import (
	"fmt"

	"belajar/calculator"
)

func main() {
	sum := calculator.Add(2, 3)
	product := calculator.Multiply(4, 5)

	fmt.Println("Jumlah:", sum)      // 5
	fmt.Println("Perkalian:", product) // 20
}

// calculator/calculator.go
package calculator

func Add(a, b int) int {
	return a + b
}

func Multiply(a, b int) int {
	return a * b
}`,
        explanation:
          'Go menggunakan folder sebagai package dan nama package harus konsisten di dalam satu direktori. Fungsi yang diawali huruf kapital diekspor secara otomatis, sementara huruf kecil bersifat private untuk package yang sama.',
      },
    },
    {
      id: 'sec-08-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Ringkasan:** ES Modules membuat kode JavaScript/TypeScript lebih terorganisir melalui import dan export. package.json dan npm/pnpm script mengelola dependensi serta perintah proyek. tsconfig.json mengatur compiler TypeScript, linter membantu menemukan masalah, dan formatter menjaga konsistensi tampilan. Environment variables menyimpan konfigurasi tanpa memasukkan secret ke kode. Terakhir, penanganan error yang baik dan gaya penulisan yang jelas akan sangat membantu saat proyek semakin besar.',
    },
  ],
}
