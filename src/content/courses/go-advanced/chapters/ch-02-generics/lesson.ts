import type { Lesson } from '@/content/types'

export const ch02Lesson: Lesson = {
  id: 'lesson-ch-02-generics',
  estimatedMinutes: 40,
  sections: [
    {
      id: 'sec-go-adv-02-basic',
      type: 'markdown',
      level: 'basic',
      title: 'Type Parameters dan Constraints',
      content: `## Mengapa Generics?

Sebelum Go 1.18, kode yang bekerja dengan berbagai tipe sering menggunakan interface kosong (\`interface{}\`) atau \`any\`. Pendekatan ini kehilangan type safety dan mengharuskan type assertion manual.

Generics memungkinkan kita menulis fungsi atau tipe yang dapat bekerja dengan berbagai tipe konkret tanpa kehilangan informasi tipe saat compile.

## Type Parameters

Type parameter ditulis dalam kurung siku setelah nama fungsi atau tipe:

\`\`\`go
func Min[T int | float64](a, b T) T {
    if a < b {
        return a
    }
    return b
}
\`\`\`

## Constraints

**Constraint** membatasi tipe apa saja yang bisa digunakan sebagai type parameter. Go menyediakan beberapa constraints bawaan di package \`constraints\` (golang.org/x/exp/constraints) dan \`cmp\` (Go 1.21+).

- \`any\`: semua tipe.
- \`comparable\`: tipe yang bisa dibandingkan dengan \`==\` dan \`!=\`.
- \`~int\`: tipe yang underlying-nya \`int\` (termasuk tipe baru yang didefinisikan dari int).`,
    },
    {
      id: 'sec-go-adv-02-js',
      type: 'code-example',
      codeExample: {
        id: 'code-go-adv-02-js',
        filename: 'generic-filter.js',
        language: 'javascript',
        title: 'JavaScript: Filter Generic dengan Array Method',
        code: `function filter(array, predicate) {
  return array.filter(predicate);
}

const numbers = [1, 2, 3, 4, 5];
const evens = filter(numbers, (n) => n % 2 === 0);
console.log(evens); // [2, 4]

const words = ['go', 'generics', 'typescript'];
const long = filter(words, (w) => w.length > 4);
console.log(long); // ['generics', 'typescript']`,
        explanation:
          'JavaScript bersifat dynamically typed, sehingga fungsi filter bekerja untuk tipe apa pun tanpa deklarasi tipe eksplisit. Type checking baru terjadi saat runtime.',
      },
    },
    {
      id: 'sec-go-adv-02-intermediate',
      type: 'markdown',
      level: 'intermediate',
      title: 'Custom Constraints dan Type Sets',
      content: `## Type Sets

Type set adalah himpunan tipe yang diizinkan untuk sebuah type parameter. Type set bisa berupa:
- Tipe konkret (\`int | float64\`).
- Tipe yang underlying-nya sama (\`~int\`).
- Interface yang hanya berisi method (constraint klasik).
- Union dan approximation dalam satu interface.

\`\`\`go
type Number interface {
    ~int | ~int64 | ~float64
}
\`\`\`

Tanda \`~\` berarti tipe yang didefinisikan dengan underlying type tersebut juga diizinkan, misalnya \`type UserID int\` memenuhi \`~int\`.

## Generic Types

Selain fungsi, struct dan interface juga bisa memiliki type parameter:

\`\`\`go
type Stack[T any] struct {
    items []T
}

func (s *Stack[T]) Push(v T) {
    s.items = append(s.items, v)
}
\`\`\`

## Type Inference

Go sering bisa menyimpulkan type parameter dari argumen pemanggilan fungsi, sehingga kita tidak perlu menuliskannya secara eksplisit:

\`\`\`go
m := Min(3, 5) // T diinfer sebagai int
\`\`\``,
    },
    {
      id: 'sec-go-adv-02-ts',
      type: 'code-example',
      codeExample: {
        id: 'code-go-adv-02-ts',
        filename: 'generic-helpers.ts',
        language: 'typescript',
        title: 'TypeScript: Generic Filter dan Map dengan Constraints',
        code: `function filter<T>(array: T[], predicate: (item: T) => boolean): T[] {
  return array.filter(predicate);
}

function map<T, U>(array: T[], mapper: (item: T) => U): U[] {
  return array.map(mapper);
}

interface HasID {
  id: number;
}

function findById<T extends HasID>(items: T[], id: number): T | undefined {
  return items.find((item) => item.id === id);
}

const users = [
  { id: 1, name: 'Budi' },
  { id: 2, name: 'Ani' },
];

console.log(findById(users, 2)?.name); // Ani`,
        explanation:
          'TypeScript generics memungkinkan constraint extends untuk membatasi tipe. Type inference menjaga type safety saat compile time, mirip dengan Go generics tetapi dengan fitur type system yang lebih ekspresif.',
      },
    },
    {
      id: 'sec-go-adv-02-advanced',
      type: 'markdown',
      level: 'advanced',
      title: 'Internals Generics dan Performa',
      content: `## Monomorphization dan GC-Shape Stenciling

Go tidak melakukan monomorphization penuh seperti C++ template yang menghasilkan satu kode mesin per kombinasi tipe. Sebaliknya, Go menggunakan **GC-shape stenciling**: kode di-stencil berdasarkan bentuk tipe dari sudut pandang garbage collector.

Implikasinya:
- Tipe dengan bentuk GC yang sama (misalnya semua pointer) bisa berbagi satu implementasi.
- Tipe value seperti \`int\` dan \`float64\` mungkin mendapatkan implementasi terpisah.
- Kompilasi lebih cepat dan ukuran binary lebih kecil dibanding monomorphization penuh.

## Kapan Menggunakan Generics?

Gunakan generics ketika:
- Logika sama untuk banyak tipe dan Anda ingin type safety.
- Menulis struktur data seperti stack, queue, cache, atau map reduce.
- Menghindari \`interface{}\` dan type assertion yang berulang.

Hindari generics ketika:
- Hanya satu atau dua tipe yang dipakai; duplikasi sederhana lebih mudah dibaca.
- Logika bergantung pada banyak method berbeda per tipe; interface mungkin lebih cocok.

## comparable vs any

\`comparable\` adalah constraint spesial Go yang hanya bisa digunakan dalam type parameter. Tipe yang mengandung slice, map, atau function tidak comparable. Gunakan \`comparable\` untuk key map atau operasi equality.`,
    },
    {
      id: 'sec-go-adv-02-go',
      type: 'code-example',
      codeExample: {
        id: 'code-go-adv-02-go',
        filename: 'generic_stack.go',
        language: 'go',
        title: 'Go: Stack Generic dan Map Reduce',
        code: `package main

import (
\t"fmt"
\t"golang.org/x/exp/constraints"
)

// Stack generic dengan type parameter T.
type Stack[T any] struct {
\titems []T
}

func (s *Stack[T]) Push(v T) {
\ts.items = append(s.items, v)
}

func (s *Stack[T]) Pop() (T, bool) {
\tvar zero T
\tif len(s.items) == 0 {
\t\treturn zero, false
\t}
\tlast := len(s.items) - 1
\tv := s.items[last]
\ts.items = s.items[:last]
\treturn v, true
}

// Number constraint dari x/exp/constraints.
type Number interface {
\tconstraints.Integer | constraints.Float
}

func Sum[T Number](values []T) T {
\tvar total T
\tfor _, v := range values {
\t\ttotal += v
\t}
\treturn total
}

func Map[T, U any](input []T, mapper func(T) U) []U {
\tout := make([]U, len(input))
\tfor i, v := range input {
\t\tout[i] = mapper(v)
\t}
\treturn out
}

func main() {
\tints := Stack[int]{}
\tints.Push(10)
\tints.Push(20)
\tif v, ok := ints.Pop(); ok {
\t\tfmt.Println("popped:", v)
\t}

\tfmt.Println("sum:", Sum([]int{1, 2, 3, 4}))
\tfmt.Println("doubled:", Map([]int{1, 2, 3}, func(n int) int { return n * 2 }))
}`,
        explanation:
          'Stack[T any] adalah struktur data generic sederhana. Number adalah custom constraint yang menggunakan constraints bawaan. Map[T, U any] menunjukkan multiple type parameters. Pattern ini menghindari interface{} dan type assertion.',
      },
    },
    {
      id: 'sec-go-adv-02-callout',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Kesalahan umum:** menggunakan `any` sebagai constraint padahal membutuhkan operator seperti `<` atau `==`; lupa tanda `~` sehingga tipe baru dengan underlying type ditolak; atau over-engineering dengan generics padahal interface lebih sederhana. Go 1.21+ menyediakan package `cmp` untuk constraints ordered. Tools: `go vet`, dan bandingkan ukuran binary serta benchmark untuk memutuskan antara generics, interface{}, atau code generation.',
    },
  ],
}
