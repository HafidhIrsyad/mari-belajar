import type { Lesson } from '@/content/types'

export const ch01Lesson: Lesson = {
  id: 'lesson-ch-01-kenalan-dengan-go',
  estimatedMinutes: 20,
  sections: [
    {
      id: 'sec-01-basic-intro',
      type: 'markdown',
      level: 'basic',
      title: 'Apa itu Go?',
      content: `## Mengenal Go

Go, atau sering disebut Golang, adalah bahasa pemrograman open source yang dikembangkan di Google. Bahasa ini dirancang untuk membangun perangkat lunak yang andal, efisien, dan mudah dirawat, terutama pada skala besar.

Go pertama kali dirilis secara publik pada tahun 2009. Tiga tokoh utama di balik Go adalah Robert Griesemer, Rob Pike, dan Ken Thompson.

Mengapa banyak developer mempelajari Go?

- **Kompilasi cepat**: Go dikompilasi ke binary native dalam hitungan detik, bahkan untuk proyek besar.
- **Binary statis**: Hasil kompilasi biasanya satu file executable yang bisa langsung dijalankan tanpa runtime tambahan.
- **Concurrency built-in**: Goroutine dan channel membuat pemrograman konkuren jauh lebih ringan dibanding thread OS.
- **Syntax sederhana**: Go sengaja memiliki sedikit fitur sehingga mudah dibaca dan dipelajari.
- **Tooling kuat**: Formatter, tester, dan dependency manager sudah built-in.

## Instalasi dan Program Pertama

Setelah menginstal Go dari https://go.dev/dl/, cek versi dengan perintah:

\`\`\`text
go version
\`\`\`

Buat folder proyek dan inisialisasi module:

\`\`\`text
go mod init hello
\`\`\`

Perintah ini membuat file \`go.mod\` yang berisi nama module dan versi Go yang digunakan.

Program Go paling sederhana terdiri dari package \`main\`, import \`fmt\`, dan fungsi \`main\`. Fungsi \`main\` adalah titik masuk eksekusi program.`,
    },
    {
      id: 'sec-01-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-01-js',
        filename: 'hello.js',
        language: 'javascript',
        title: 'JavaScript: Program Pertama',
        code: `// JavaScript tidak memerlukan fungsi main
console.log("Hello, World!");

// Bisa langsung menjalankan statement di level atas
const name = "Budi";
console.log(\`Halo, \${name}!\`);`,
        explanation:
          'JavaScript berjalan tanpa titik masuk eksplisit. Statement di level atas langsung dieksekusi saat file dimuat.',
      },
    },
    {
      id: 'sec-01-intermediate-toolchain',
      type: 'markdown',
      level: 'intermediate',
      title: 'Toolchain Go dan Perintah Umum',
      content: `## Perintah Dasar Go

Beberapa perintah yang akan sering digunakan saat bekerja dengan Go:

- \`go run main.go\`: mengkompilasi dan menjalankan file sementara tanpa menghasilkan binary permanen.
- \`go build\`: mengkompilasi kode menjadi binary executable.
- \`go fmt\`: memformat kode sesuai standar Go.
- \`go test\`: menjalankan unit test.
- \`go mod tidy\`: membersihkan dan mengisi dependensi di \`go.mod\` serta \`go.sum\`.

## Package dan Import

Setiap file Go dimulai dengan deklarasi package. Package \`main\` adalah package khusus yang menghasilkan executable. Package lain, seperti \`fmt\`, \`os\`, dan \`net/http\`, adalah library standar.

\`\`\`go
package main

import (
    "fmt"
    "os"
)
\`\`\`

Go tidak mengizinkan import yang tidak digunakan. Jika ada import yang tidak dipakai, kompilasi akan gagal. Ini adalah salah satu cara Go menjaga kebersihan kode.

## go.mod dan go.sum

File \`go.mod\` berisi informasi module: nama module, versi Go, dan dependensi. File \`go.sum\` berisi checksum kriptografi dari dependensi untuk memastikan integritas.`,
    },
    {
      id: 'sec-01-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-01-ts',
        filename: 'package.json',
        language: 'typescript',
        title: 'TypeScript: Manifest Proyek',
        code: `{
  "name": "hello-ts",
  "version": "1.0.0",
  "dependencies": {},
  "devDependencies": {
    "typescript": "^5.0.0"
  }
}`,
        explanation:
          'Di TypeScript, package.json dan tsconfig.json menjadi manifest proyek. Di Go, peran serupa dipegang oleh go.mod, tetapi Go mengelola dependensi sekaligus versi bahasa dalam satu file.',
      },
    },
    {
      id: 'sec-01-advanced-runtime',
      type: 'markdown',
      level: 'advanced',
      title: 'Go Runtime: Scheduler dan Garbage Collector',
      content: `## Go Runtime

Go bukan bahasa yang sepenuhnya mendekati hardware seperti C, tetapi juga bukan bahasa dengan VM seperti Java. Go mengkompilasi kode ke native machine code, tetapi menyertakan runtime kecil di dalam binary hasil kompilasi.

Runtime Go bertanggung jawab atas:

- **Memory management**: alokasi heap, stack, dan garbage collection.
- **Goroutine scheduling**: M:N scheduling dari goroutine ke thread OS.
- **Channel dan select**: komunikasi antar goroutine.
- **Reflection dan panic/recover**: fitur introspeksi dan pemulihan error.

## Scheduler Go

Go menggunakan scheduler yang disebut M:N, di mana banyak goroutine (G) dipetakan ke sejumlah thread OS (M) melalui logical processor (P).

- \`G\`: goroutine, unit eksekusi ringan.
- \`M\`: thread OS.
- \`P\`: logical processor yang menyediakan run queue.

Secara default, jumlah \`P\` sama dengan jumlah CPU core. Scheduler bekerja secara cooperative dan preemptive. Goroutine bisa mengalami preemption saat memanggil fungsi atau saat pemeriksaan periodic.

## Garbage Collector

Garbage collector (GC) Go bersifat **concurrent**, **tri-color mark-and-sweep**, dan **non-generational**. Artinya:

- GC berjalan bersamaan dengan goroutine aplikasi.
- Memori ditandai sebagai white, grey, atau black selama fase marking.
- Tidak ada generasi young/old seperti di JVM.
- Latensi GC menjadi fokus utama, dengan target stop-the-world yang sangat singkat.

Di JavaScript, garbage collection terjadi di engine (V8) melalui Orinoco yang juga concurrent, tetapi model memori dan lifecycle objek sangat berbeda karena JS dinamis.`,
    },
    {
      id: 'sec-01-go-example',
      type: 'code-example',
      codeExample: {
        id: 'code-01-go',
        filename: 'main.go',
        language: 'go',
        title: 'Go: Program Pertama dan Struktur File',
        code: `package main

import "fmt"

func main() {
	fmt.Println("Hello, World!")
	fmt.Println("Selamat datang di Go Fundamental.")
}`,
        explanation:
          'Program Go membutuhkan package main dan func main. Fungsi fmt.Println menulis ke stdout. Go memaksa formatting standar, dan setiap import harus digunakan.',
      },
    },
    {
      id: 'sec-01-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Ringkasan:** Go adalah bahasa sistem modern yang dikompilasi ke binary native dengan runtime kecil. Program dimulai dari package main dan fungsi main. Toolchain seperti go run, go build, go fmt, dan go mod sudah built-in. Runtime Go mengelola scheduler M:N dan garbage collector concurrent.',
    },
  ],
}
