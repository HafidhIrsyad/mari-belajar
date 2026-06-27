import type { Lesson } from '@/content/types'

export const ch02Lesson: Lesson = {
  id: 'lesson-ch-02-variabel-tipe-data-operator',
  estimatedMinutes: 25,
  sections: [
    {
      id: 'sec-02-basic-variables',
      type: 'markdown',
      level: 'basic',
      title: 'Variabel dan Tipe Data Dasar',
      content: `## Deklarasi Variabel

Di Go, variabel bisa dideklarasikan dengan beberapa cara:

\`\`\`go
var nama string = "Budi"
var umur int = 25
var aktif bool = true
\`\`\`

Jika tipe bisa ditentukan dari nilai, Go mengizinkan type inference:

\`\`\`go
var nama = "Budi" // tipe inferred: string
umur := 25        // tipe inferred: int
\`\`\`

Operator \`:=\` disebut short variable declaration dan hanya bisa digunakan di dalam fungsi. Di luar fungsi, setiap statement harus diawali dengan keyword.

## Zero Value

Setiap variabel di Go memiliki zero value jika tidak diinisialisasi:

- \`int\`, \`float64\`: \`0\`
- \`bool\`: \`false\`
- \`string\`: \`""\`
- \`pointer\`, \`slice\`, \`map\`, \`interface\`, \`channel\`: \`nil\`

## Tipe Data Primitif

Go memiliki banyak tipe numerik: \`int\`, \`int8\`, \`int16\`, \`int32\`, \`int64\`, \`uint\`, \`float32\`, \`float64\`, dan lainnya. Pilih tipe sesuai kebutuhan. Untuk umum, \`int\` dan \`float64\` sudah cukup.

Boolean hanya memiliki dua nilai: \`true\` dan \`false\`.

String adalah urutan byte yang merepresentasikan teks UTF-8. String di Go bersifat immutable.`,
    },
    {
      id: 'sec-02-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-02-js',
        filename: 'variables.js',
        language: 'javascript',
        title: 'JavaScript: Variabel Dinamis',
        code: `let name = "Budi";
name = 25; // JavaScript mengizinkan reassignment ke tipe berbeda

const pi = 3.14;
console.log(typeof name); // number

// Implicit coercion
console.log("5" - 2); // 3
console.log("5" + 2); // "52"`,
        explanation:
          'JavaScript bersifat dinamis dan memiliki implicit coercion. Go memaksa tipe statis dan semua konversi harus eksplisit.',
      },
    },
    {
      id: 'sec-02-intermediate-conversion',
      type: 'markdown',
      level: 'intermediate',
      title: 'Konversi Tipe, Rune, dan Pointer',
      content: `## Konversi Tipe Eksplisit

Go tidak mengenal implicit type coercion. Untuk mengubah tipe, gunakan sintaks konversi eksplisit:

\`\`\`go
var a int = 10
var b float64 = float64(a)
var s string = strconv.Itoa(a)
\`\`\`

Konversi string ke int memerlukan package \`strconv\`:

\`\`\`go
n, err := strconv.Atoi("42")
\`\`\`

## Rune dan Byte

\`rune\` adalah alias untuk \`int32\` yang merepresentasikan Unicode code point. \`byte\` adalah alias untuk \`uint8\` yang merepresentasikan satu byte.

\`\`\`go
for _, r := range "Go" {
    fmt.Printf("%c %v\\n", r, r)
}
\`\`\`

## Pointer

Pointer menyimpan alamat memori dari sebuah variabel. Operator \`&\` mengambil alamat, dan operator \`*\` mendereferensi pointer.

\`\`\`go
x := 10
p := &x
fmt.Println(*p) // 10
*p = 20
fmt.Println(x)  // 20
\`\`\`

Go memiliki pointer tetapi tidak mengizinkan pointer aritmatika, sehingga lebih aman daripada C/C++.`,
    },
    {
      id: 'sec-02-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-02-ts',
        filename: 'variables.ts',
        language: 'typescript',
        title: 'TypeScript: Tipe Statis',
        code: `let name: string = "Budi";
// name = 25; // Error: Type 'number' is not assignable to type 'string'

const umur: number = 25;
const jumlah: number = Number("42"); // konversi eksplisit

// TypeScript tidak memiliki pointer seperti Go
let obj = { value: 10 };
function ubah(o: { value: number }) {
  o.value = 20;
}
ubah(obj);
console.log(obj.value); // 20`,
        explanation:
          'TypeScript memiliki tipe statis seperti Go, tetapi berjalan di JavaScript runtime yang dinamis. TypeScript tidak memiliki pointer secara eksplisit.',
      },
    },
    {
      id: 'sec-02-advanced-internals',
      type: 'markdown',
      level: 'advanced',
      title: 'Representasi Memori String, Rune, dan Escape Analysis',
      content: `## Representasi String di Memori

String di Go direpresentasikan sebagai struct kecil yang berisi pointer ke data dan panjang:

\`\`\`c
struct {
    char* data;
    int   len;
}
\`\`\`

Karena string immutable, operasi seperti concatenation dalam loop menghasilkan alokasi baru setiap iterasi. Untuk membangun string besar, gunakan \`strings.Builder\`.

## Rune dan UTF-8

Go menggunakan UTF-8 sebagai encoding string default. Sebuah \`rune\` mewakili satu Unicode code point, yang bisa memakan 1 hingga 4 byte dalam UTF-8. Fungsi \`range\` pada string mengiterasi per rune, bukan per byte.

Perbedaan \`len(s)\` dan \`utf8.RuneCountInString(s)\` penting: \`len\` menghitung byte, sedangkan \`RuneCountInString\` menghitung karakter Unicode.

## Escape Analysis

Go compiler melakukan escape analysis untuk menentukan apakah variabel bisa dialokasikan di stack atau harus pindah ke heap. Variabel yang pointer-nya dikembalikan dari fungsi atau disimpan di luar scope fungsi biasanya escape ke heap.

\`\`\`go
func newInt() *int {
    n := 10
    return &n // n escape ke heap
}
\`\`\`

Escape analysis membantu Go mengelola memori secara otomatis tanpa memaksa developer memikirkan stack vs heap secara manual.`,
    },
    {
      id: 'sec-02-go-example',
      type: 'code-example',
      codeExample: {
        id: 'code-02-go',
        filename: 'variables.go',
        language: 'go',
        title: 'Go: Variabel, Konversi, Rune, dan Pointer',
        code: `package main

import (
	"fmt"
	"strconv"
	"unicode/utf8"
)

func main() {
	var nama string = "Budi"
	umur := 25
	aktif := true

	fmt.Println(nama, umur, aktif)

	// konversi eksplisit
	hasil, _ := strconv.Atoi("42")
	fmt.Println(hasil + 8)

	// string internals
	s := "Gō"
	fmt.Println("byte:", len(s))
	fmt.Println("rune:", utf8.RuneCountInString(s))

	// pointer
	x := 10
	p := &x
	*p = 20
	fmt.Println(x)
}`,
        explanation:
          'Program ini menunjukkan deklarasi variabel, konversi tipe dengan strconv, perbedaan byte dan rune, serta penggunaan pointer di Go.',
      },
    },
    {
      id: 'sec-02-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Ringkasan:** Go menggunakan tipe statis dengan deklarasi var, :=, dan const. Konversi tipe harus eksplisit. String immutable dengan encoding UTF-8; rune merepresentasikan Unicode code point. Pointer tersedia tetapi tanpa pointer aritmatika. Compiler melakukan escape analysis untuk menentukan alokasi stack atau heap.',
    },
  ],
}
