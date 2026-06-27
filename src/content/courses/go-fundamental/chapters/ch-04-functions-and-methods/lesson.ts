import type { Lesson } from '@/content/types'

export const ch04Lesson: Lesson = {
  id: 'lesson-ch-04-functions-and-methods',
  estimatedMinutes: 30,
  sections: [
    {
      id: 'sec-04-basic-functions',
      type: 'markdown',
      level: 'basic',
      title: 'Fungsi di Go',
      content: `## Deklarasi Fungsi

Fungsi di Go dideklarasikan dengan keyword \`func\`:

\`\`\`go
func tambah(a int, b int) int {
    return a + b
}
\`\`\`

Jika parameter bertipe sama, tipe bisa ditulis sekali di akhir:

\`\`\`go
func tambah(a, b int) int {
    return a + b
}
\`\`\`

## Multiple Return Values

Salah satu fitur khas Go adalah kemampuan mengembalikan banyak nilai sekaligus. Pola ini sangat umum untuk mengembalikan hasil bersama error:

\`\`\`go
func bagi(a, b float64) (float64, error) {
    if b == 0 {
        return 0, errors.New("pembagian dengan nol")
    }
    return a / b, nil
}
\`\`\`

## Named Return Values

Go mengizinkan memberi nama pada return values. Dengan named return, \`return\` tanpa argumen akan mengembalikan nilai terakhir dari variabel tersebut.

\`\`\`go
func rectangle(width, height int) (area, perimeter int) {
    area = width * height
    perimeter = 2 * (width + height)
    return
}
\`\`\`

Meskipun memudahkan, named return sebaiknya digunakan dengan hati-hati agar tidak mengurangi readability.`,
    },
    {
      id: 'sec-04-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-04-js',
        filename: 'functions.js',
        language: 'javascript',
        title: 'JavaScript: Fungsi dan Arrow Function',
        code: `function tambah(a, b) {
  return a + b;
}

const kali = (a, b) => a * b;

// JavaScript hanya bisa return satu nilai; multiple values disimulasikan dengan objek/array
function bagi(a, b) {
  if (b === 0) return { result: null, error: "division by zero" };
  return { result: a / b, error: null };
}`,
        explanation:
          'JavaScript tidak memiliki multiple return values secara native. Go mengembalikan beberapa nilai secara langsung, biasanya (result, error).',
      },
    },
    {
      id: 'sec-04-intermediate-variadic',
      type: 'markdown',
      level: 'intermediate',
      title: 'Variadic, First-Class Function, dan Closure',
      content: `## Variadic Function

Variadic function menerima sejumlah argumen yang sama tipe. Parameter variadic ditandai dengan tiga titik \`...\`.

\`\`\`go
func jumlah(angka ...int) int {
    total := 0
    for _, n := range angka {
        total += n
    }
    return total
}
\`\`\`

Di dalam fungsi, parameter variadic bertipe slice.

## First-Class Function

Function di Go adalah first-class citizen. Artinya fungsi bisa disimpan di variabel, dikirim sebagai argumen, dan dikembalikan dari fungsi lain.

\`\`\`go
func apply(a, b int, op func(int, int) int) int {
    return op(a, b)
}
\`\`\`

## Closure

Closure adalah fungsi yang menangkap variabel dari scope sekitarnya. Di Go, closure sering digunakan untuk factory function atau callback.

\`\`\`go
func counter() func() int {
    i := 0
    return func() int {
        i++
        return i
    }
}
\`\`\`

Closure menangkap pointer ke variabel lokal, bukan salinannya. Hati-hati saat menggunakan closure di dalam loop.`,
    },
    {
      id: 'sec-04-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-04-ts',
        filename: 'functions.ts',
        language: 'typescript',
        title: 'TypeScript: Fungsi sebagai Tipe',
        code: `type Operation = (a: number, b: number) => number;

const apply = (a: number, b: number, op: Operation): number => op(a, b);

const tambah: Operation = (a, b) => a + b;
console.log(apply(2, 3, tambah));

// closure
function counter() {
  let i = 0;
  return () => ++i;
}

const next = counter();
console.log(next()); // 1
console.log(next()); // 2`,
        explanation:
          'TypeScript mendukung function type dan closure seperti Go. Bedanya, Go mengembalikan multiple values secara native dan tidak memerlukan tipe fungsi terpisah untuk argumen.',
      },
    },
    {
      id: 'sec-04-advanced-methods',
      type: 'markdown',
      level: 'advanced',
      title: 'Method Receiver, Pointer vs Value, dan Dispatch',
      content: `## Method Receiver

Method adalah fungsi yang memiliki receiver. Receiver bisa berupa value atau pointer dari sebuah tipe.

\`\`\`go
type User struct {
    Name string
    Age  int
}

func (u User) GetName() string {
    return u.Name
}

func (u *User) HaveBirthday() {
    u.Age++
}
\`\`\`

## Pointer vs Value Receiver

- **Value receiver**: bekerja pada salinan objek. Method tidak mengubah state asli. Cocok untuk objek kecil dan operasi read-only.
- **Pointer receiver**: bekerja pada objek asli. Method bisa mengubah state. Menghindari copy objek besar dan memungkinkan nil receiver handling.

Jika method satu saja butuh pointer receiver, biasanya konsisten gunakan pointer receiver untuk semua method pada tipe tersebut.

## Method Set dan Interface

Method set dari tipe \`T\` hanya berisi method dengan value receiver. Method set dari \`*T\` berisi method dengan value receiver dan pointer receiver. Ini berpengaruh pada interface satisfaction: variabel bertipe \`T\` tidak bisa memenuhi interface yang membutuhkan method pointer receiver.

## Function Call Overhead

Go menggunakan calling convention yang efisien. Function call di Go relatif ringan, tetapi passing struct besar by value menyebabkan copy. Pointer receiver mengurangi copy tetapi menambah indireksi dan risiko alias.`,
    },
    {
      id: 'sec-04-go-example',
      type: 'code-example',
      codeExample: {
        id: 'code-04-go',
        filename: 'functions.go',
        language: 'go',
        title: 'Go: Fungsi, Method, dan Closure',
        code: `package main

import (
	"errors"
	"fmt"
)

// multiple return values
func bagi(a, b float64) (float64, error) {
	if b == 0 {
		return 0, errors.New("pembagian dengan nol")
	}
	return a / b, nil
}

// variadic
func jumlah(angka ...int) int {
	total := 0
	for _, n := range angka {
		total += n
	}
	return total
}

// method receiver
type User struct {
	Name string
	Age  int
}

func (u User) Greet() string {
	return fmt.Sprintf("Halo, %s!", u.Name)
}

func (u *User) HaveBirthday() {
	u.Age++
}

func main() {
	result, err := bagi(10, 0)
	if err != nil {
		fmt.Println("error:", err)
	} else {
		fmt.Println("hasil:", result)
	}

	fmt.Println("jumlah:", jumlah(1, 2, 3, 4))

	user := User{Name: "Budi", Age: 25}
	fmt.Println(user.Greet())
	user.HaveBirthday()
	fmt.Println("umur:", user.Age)
}`,
        explanation:
          'Program ini mendemonstrasikan multiple return values, error handling, variadic function, value receiver, dan pointer receiver pada struct.',
      },
    },
    {
      id: 'sec-04-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Ringkasan:** Go mendukung multiple return values, named returns, variadic functions, first-class functions, dan closures. Method memiliki receiver yang bisa berupa value atau pointer. Pointer receiver mengubah state asli dan berpengaruh pada method set suatu tipe.',
    },
  ],
}
