import type { Lesson } from '@/content/types'

export const ch03Lesson: Lesson = {
  id: 'lesson-ch-03-control-flow',
  estimatedMinutes: 25,
  sections: [
    {
      id: 'sec-03-basic-control',
      type: 'markdown',
      level: 'basic',
      title: 'If/Else dan Switch',
      content: `## If dan Else

Struktur if di Go mirip bahasa C-family, tetapi kondisi tidak perlu diapit tanda kurung.

\`\`\`go
if x > 0 {
    fmt.Println("positif")
} else if x == 0 {
    fmt.Println("nol")
} else {
    fmt.Println("negatif")
}
\`\`\`

Go juga mengizinkan statement pendek sebelum kondisi, biasanya digunakan untuk inisialisasi variabel lokal:

\`\`\`go
if err := doSomething(); err != nil {
    fmt.Println("error:", err)
}
\`\`\`

## Switch

Switch di Go lebih fleksibel dan tidak memerlukan \`break\` di akhir case karena setiap case berhenti secara implisit.

\`\`\`go
switch hari {
case "senin", "selasa", "rabu", "kamis", "jumat":
    fmt.Println("hari kerja")
case "sabtu", "minggu":
    fmt.Println("akhir pekan")
default:
    fmt.Println("tidak dikenal")
}
\`\`\`

Untuk fallthrough, gunakan keyword \`fallthrough\` secara eksplisit.`,
    },
    {
      id: 'sec-03-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-03-js',
        filename: 'control-flow.js',
        language: 'javascript',
        title: 'JavaScript: If/Else dan Switch',
        code: `const score = 85;

if (score >= 90) {
  console.log("A");
} else if (score >= 80) {
  console.log("B");
} else {
  console.log("C");
}

const day = "monday";
switch (day) {
  case "monday":
  case "tuesday":
    console.log("work day");
    break; // JavaScript memerlukan break
  default:
    console.log("other");
}`,
        explanation:
          'JavaScript memerlukan break di switch untuk mencegah fallthrough. Go secara default tidak fallthrough sehingga break tidak diperlukan.',
      },
    },
    {
      id: 'sec-03-intermediate-loops',
      type: 'markdown',
      level: 'intermediate',
      title: 'For Loop, Range, dan Labeled Statements',
      content: `## For Loop

\`for\` adalah satu-satunya kata kunci perulangan di Go. Ada tiga bentuk umum:

\`\`\`go
// C-style for
for i := 0; i < 10; i++ {
    fmt.Println(i)
}

// condition-only for (seperti while)
n := 0
for n < 10 {
    n++
}

// infinite loop
for {
    // loop forever
}
\`\`\`

## Range

\`range\` digunakan untuk mengiterasi slice, array, map, string, dan channel.

\`\`\`go
for i, v := range []int{10, 20, 30} {
    fmt.Println(i, v)
}
\`\`\`

Jika hanya membutuhkan nilai, gunakan blank identifier \`_\` untuk mengabaikan indeks.

## Break dan Continue dengan Label

Label memungkinkan \`break\` atau \`continue\` keluar dari loop bersarang:

\`\`\`go
outer:
for i := 0; i < 3; i++ {
    for j := 0; j < 3; j++ {
        if i == 1 && j == 1 {
            break outer
        }
    }
}
\`\`\`

## Defer

\`defer\` menunda eksekusi fungsi sampai fungsi yang memuat defer selesai. Defer dieksekusi dalam urutan LIFO.

\`\`\`go
func main() {
    defer fmt.Println("pertama didefer, terakhir dieksekusi")
    fmt.Println("diekseskusi langsung")
}
\`\`\`

Defer sering digunakan untuk menutup file, melepaskan kunci, atau membersihkan resource.`,
    },
    {
      id: 'sec-03-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-03-ts',
        filename: 'control-flow.ts',
        language: 'typescript',
        title: 'TypeScript: For-Of dan Try/Catch',
        code: `const scores = [80, 90, 100];

for (const score of scores) {
  console.log(score);
}

scores.forEach((score) => console.log(score));

try {
  throw new Error("something went wrong");
} catch (e) {
  console.error(e);
} finally {
  console.log("cleanup");
}`,
        explanation:
          'TypeScript/JavaScript memiliki for-of, for-in, forEach, dan try/catch/finally. Go menggunakan for dan range, serta defer untuk cleanup. Go tidak memiliki exception seperti JavaScript.',
      },
    },
    {
      id: 'sec-03-advanced-defer',
      type: 'markdown',
      level: 'advanced',
      title: 'Defer Internals, Panic, dan Recover',
      content: `## Defer Stack

Setiap kali \`defer\` dipanggil, Go menyimpan informasi deferred call dalam stack yang terkait dengan frame fungsi saat ini. Saat fungsi selesai, stack tersebut dieksekusi dari atas ke bawah (LIFO).

Argumen fungsi yang di-defer dievaluasi pada saat defer didaftarkan, bukan saat dieksekusi:

\`\`\`go
func main() {
    i := 0
    defer fmt.Println(i) // mencetak 0, bukan 1
    i++
}
\`\`\`

## Panic dan Recover

\`panic\` menghentikan eksekusi normal dan mulai melakukan stack unwinding. Jika ada deferred function yang memanggil \`recover\`, panic bisa ditangkap dan eksekusi normal dapat dilanjutkan.

\`\`\`go
func main() {
    defer func() {
        if r := recover(); r != nil {
            fmt.Println("recovered:", r)
        }
    }()
    panic("something bad happened")
}
\`\`\`

Panic/recover bukan pengganti error handling normal. Gunakan \`error\` untuk kondisi yang bisa diperkirakan, dan panic untuk bug fatal yang seharusnya tidak pernah terjadi.

## Perbandingan dengan JavaScript

JavaScript menggunakan try/catch/finally untuk exception handling, yang sering digunakan untuk alur kontrol umum. Go lebih eksplisit: error dikembalikan sebagai nilai, panic untuk kondisi fatal, dan recover hanya dari deferred function.`,
    },
    {
      id: 'sec-03-go-example',
      type: 'code-example',
      codeExample: {
        id: 'code-03-go',
        filename: 'control_flow.go',
        language: 'go',
        title: 'Go: For, Switch, Defer, Panic, dan Recover',
        code: `package main

import "fmt"

func main() {
	// for dengan range
	angka := []int{10, 20, 30}
	for i, v := range angka {
		fmt.Printf("index=%d value=%d\\n", i, v)
	}

	// switch tanpa break implisit
	score := 85
	switch {
	case score >= 90:
		fmt.Println("A")
	case score >= 80:
		fmt.Println("B")
	default:
		fmt.Println("C")
	}

	// defer LIFO
	defer fmt.Println("defer pertama")
	defer fmt.Println("defer kedua")

	// panic dan recover
	defer func() {
		if r := recover(); r != nil {
			fmt.Println("recovered:", r)
		}
	}()
	panic("demo panic")
}`,
        explanation:
          'Program ini menunjukkan range loop, switch tanpa break, urutan eksekusi defer LIFO, serta kombinasi panic dan recover.',
      },
    },
    {
      id: 'sec-03-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Ringkasan:** Go memiliki if/else, switch, dan for sebagai struktur kontrol utama. Switch tidak memerlukan break. Range memudahkan iterasi koleksi. Defer menunda eksekusi hingga fungsi selesai dalam urutan LIFO. Panic dan recover menyediakan mekanisme exception-like, tetapi error handling normal tetap menggunakan nilai error.',
    },
  ],
}
