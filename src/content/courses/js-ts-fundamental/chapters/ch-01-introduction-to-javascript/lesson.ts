import type { Lesson } from '@/content/types'

export const ch01Lesson: Lesson = {
  id: 'lesson-ch-01-introduction-to-javascript',
  estimatedMinutes: 15,
  sections: [
    {
      id: 'sec-01-basic-intro',
      type: 'markdown',
      level: 'basic',
      title: 'Apa itu JavaScript?',
      content: `## Mengenal JavaScript

JavaScript adalah bahasa pemrograman yang awalnya dibuat untuk membuat halaman web menjadi interaktif. Saat ini, JavaScript telah berkembang menjadi salah satu bahasa paling populer di dunia dan bisa digunakan di berbagai tempat: browser, server (melalui Node.js), aplikasi mobile, game, bahkan perangkat IoT.

Mengapa mempelajari JavaScript?

- **Universal**: hampir semua website modern menggunakan JavaScript.
- **Mudah memulai**: kamu hanya perlu browser untuk menulis dan menjalankan kode pertama.
- **Ekosistem besar**: tersedia banyak library, framework, dan komunitas aktif.
- **Jembatan ke TypeScript**: TypeScript dibangun di atas JavaScript, sehingga memahami JavaScript terlebih dahulu sangat penting.

## Statement, Expression, dan Comment

Kode JavaScript tersusun dari **statement** dan **expression**.

- **Statement** adalah instruksi lengkap yang melakukan sesuatu. Contoh: deklarasi variabel atau pemanggilan fungsi.
- **Expression** adalah bagian kode yang menghasilkan nilai. Contoh: \`1 + 2\` atau \`"Halo"\`.

\`\`\`javascript
// statement
let nama = "Budi";

// expression
let sapaan = "Halo, " + nama;
\`\`\`

**Komentar** digunakan untuk memberi catatan pada kode. JavaScript mendukung dua jenis komentar:

- Komentar satu baris: \`// ini komentar\`
- Komentar beberapa baris: \`/* ini komentar */\`

## Cara Menjalankan JavaScript

Ada tiga cara paling umum untuk menjalankan kode JavaScript:

1. **Browser console**: buka DevTools (biasanya tombol F12), pilih tab Console, lalu ketik kode.
2. **File .js**: tulis kode di file seperti \`hello.js\`, lalu jalankan dengan Node.js melalui terminal.
3. **Node.js REPL**: ketik \`node\` di terminal untuk masuk ke mode interaktif.

\`\`\`text
node hello.js
\`\`\`

Dengan lingkungan yang tepat, kamu bisa langsung bereksperimen dan melihat hasil kode secara instan.`,
    },
    {
      id: 'sec-01-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-01-js',
        filename: 'hello-world.js',
        language: 'javascript',
        title: 'JavaScript: Hello World dan Console Methods',
        code: `// Menampilkan pesan ke console
console.log("Hello, World!");

// Menampilkan informasi
console.info("Aplikasi berhasil dimulai");

// Menampilkan peringatan
console.warn("Ini adalah peringatan");

// Menampilkan kesalahan
console.error("Terjadi kesalahan saat memproses data");

// Menampilkan data dalam bentuk tabel
const users = [
  { name: "Budi", age: 25 },
  { name: "Ani", age: 22 }
];
console.table(users);

// Menghitung durasi eksekusi
console.time("proses");
for (let i = 0; i < 1000; i++) {}
console.timeEnd("proses");`,
        explanation:
          'console.log adalah method paling sering digunakan untuk debugging. Selain log, terdapat info, warn, error, table, dan time/timeEnd yang membantu memahami perilaku aplikasi saat development.',
      },
    },
    {
      id: 'sec-01-intermediate-debugging',
      type: 'markdown',
      level: 'intermediate',
      title: 'Debugging Dasar, Strict Mode, dan REPL',
      content: `## Debugging dengan Console

Debugging adalah proses mencari dan memperbaiki kesalahan dalam kode. Salah satu teknik paling sederhana adalah menggunakan \`console.log\` untuk melihat nilai variabel pada titik tertentu.

\`\`\`javascript
let total = 0;
for (let i = 1; i <= 3; i++) {
  total = total + i;
  console.log("i:", i, "total:", total);
}
\`\`\`

Meskipun sederhana, teknik ini sangat berguna untuk memahami alur program.

## Strict Mode

Strict mode adalah cara untuk menjalankan JavaScript dalam mode ketat. Dengan menambahkan \`'use strict'\` di awal file atau fungsi, JavaScript akan menolak beberapa perilaku lama yang bisa menyebabkan bug.

Keuntungan strict mode:

- Mencegah penggunaan variabel tanpa deklarasi.
- Melarang penulisan properti pada objek yang tidak bisa ditulis.
- Membuat beberapa kesalahan yang sebelumnya diam menjadi error.

\`\`\`javascript
"use strict";

x = 10; // ReferenceError: x is not defined
\`\`\`

## REPL dan Runner Sederhana

**REPL** (Read-Eval-Print Loop) memungkinkan kamu mengetik kode JavaScript satu baris pada satu waktu dan langsung melihat hasilnya. Node.js menyediakan REPL dengan mengetik \`node\` di terminal.

\`\`\`text
$ node
> 2 + 3
5
> "Halo".toUpperCase()
'HALO'
\`\`\`

Untuk proyek yang lebih besar, biasanya kode disimpan dalam file \`.js\` dan dijalankan dengan \`node nama-file.js\`. Pola ini disebut **runner sederhana** dan menjadi fondasi sebelum menggunakan tooling yang lebih canggih.`,
    },
    {
      id: 'sec-01-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-01-ts',
        filename: 'hello.ts',
        language: 'typescript',
        title: 'TypeScript: Compiler Pertama dengan tsc',
        code: `// Simpan file ini sebagai hello.ts
function sapa(nama: string): string {
  return \`Halo, \${nama}!\`;
}

console.log(sapa("Budi"));

// Compile ke JavaScript
// tsc hello.ts

// Jalankan hasil compile
// node hello.js`,
        explanation:
          'TypeScript menambahkan type annotation pada JavaScript. Perintah tsc mengubah file .ts menjadi .js agar bisa dijalankan oleh Node.js atau browser.',
      },
    },
    {
      id: 'sec-01-advanced-ecosystem',
      type: 'markdown',
      level: 'advanced',
      title: 'Ekosistem JavaScript: Engine, Runtime, dan Package Manager',
      content: `## Engine JavaScript

**Engine** adalah program yang menjalankan kode JavaScript. Engine mengubah kode JavaScript menjadi instruksi mesin. Contoh engine yang terkenal:

- **V8**: digunakan oleh Google Chrome dan Node.js.
- **SpiderMonkey**: digunakan oleh Firefox.
- **JavaScriptCore**: digunakan oleh Safari.

Engine bertanggung jawab atas parsing, compiling, dan eksekusi kode.

## Runtime JavaScript

**Runtime** adalah lingkungan di mana kode JavaScript berjalan. Runtime menyediakan API tambahan di luar fitur bahasa itu sendiri.

- **Browser runtime**: menyediakan DOM, BOM, fetch, localStorage, dan event handling.
- **Node.js runtime**: menyediakan file system, HTTP server, path, dan modul sistem operasi.

## Package Manager

Package manager adalah alat untuk mengelola library pihak ketiga. Di ekosistem JavaScript, package manager populer meliputi:

- **npm**: package manager bawaan Node.js.
- **yarn**: alternatif dari Facebook dengan fitur workspace.
- **pnpm**: package manager yang hemat ruang disk dengan hard link.

Package manager membantu menginstal, memperbarui, dan menghapus dependensi dengan mudah.

## Browser JavaScript vs Node.js

Meskipun keduanya menjalankan JavaScript, terdapat perbedaan utama:

| Aspek | Browser | Node.js |
|-------|---------|---------|
| Tujuan utama | Interaksi pengguna dan DOM | Server, scripting, dan tooling |
| API utama | DOM, BOM, fetch | fs, http, path, os |
| Akses file | Dibatasi oleh keamanan | Bisa membaca dan menulis file |
| Lingkungan | Berjalan di tab browser | Berjalan sebagai proses di server |

Memahami perbedaan ini penting agar kamu menulis kode yang sesuai dengan lingkungan target.`,
    },
    {
      id: 'sec-01-go-example',
      type: 'code-example',
      codeExample: {
        id: 'code-01-go',
        filename: 'main.go',
        language: 'go',
        title: 'Go: Perbandingan Program Hello World',
        code: `package main

import "fmt"

func main() {
	fmt.Println("Hello, World!")
}`,
        explanation:
          'Program Go membutuhkan package main dan fungsi main sebagai titik masuk. Berbeda dengan JavaScript yang bisa langsung menjalankan statement, Go harus dikompilasi terlebih dahulu sebelum dijalankan.',
      },
    },
    {
      id: 'sec-01-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Ringkasan:** JavaScript adalah bahasa pemrograman universal yang bisa berjalan di browser dan server. Kamu dapat menjalankannya melalui browser console, file .js, atau Node.js. Statement dan expression membentuk kode, sementara console methods dan strict mode membantu debugging. Ekosistem JavaScript terdiri dari engine, runtime, dan package manager, dengan perbedaan signifikan antara browser JavaScript dan Node.js.',
    },
  ],
}
