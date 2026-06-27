import type { Lesson } from '@/content/types'

export const ch08Lesson: Lesson = {
  id: 'lesson-ch-08-testing-and-tooling-dasar',
  estimatedMinutes: 35,
  sections: [
    {
      id: 'sec-08-basic-testing',
      type: 'markdown',
      level: 'basic',
      title: 'Testing di Go',
      content: `## File Test

File test di Go menggunakan suffix \`_test.go\`. File ini dikompilasi bersama package saat menjalankan \`go test\`, tetapi tidak masuk ke binary produksi.

\`\`\`go
package kata

import "testing"

func TestTambah(t *testing.T) {
    got := Tambah(2, 3)
    want := 5
    if got != want {
        t.Errorf("Tambah(2,3) = %d; want %d", got, want)
    }
}
\`\`\`

## t.Error vs t.Fatal

- \`t.Error\`: mencatat kegagalan tetapi test berlanjut.
- \`t.Fatal\`: mencatat kegagalan dan menghentikan test saat itu juga.

Gunakan \`t.Fatal\` jika kegagalan berarti tidak ada gunanya melanjutkan test.

## Helper Function

Fungsi helper dalam test sebaiknya dipanggil dengan \`t.Helper()\` agar laporan error menunjuk ke baris pemanggil, bukan ke helper.

\`\`\`go
func assertEqual(t *testing.T, got, want int) {
    t.Helper()
    if got != want {
        t.Errorf("got %d, want %d", got, want)
    }
}
\`\`\``,
    },
    {
      id: 'sec-08-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-08-js',
        filename: 'test.test.js',
        language: 'javascript',
        title: 'JavaScript: Unit Test dengan Jest',
        code: `function tambah(a, b) {
  return a + b;
}

test("tambah 2 + 3 sama dengan 5", () => {
  expect(tambah(2, 3)).toBe(5);
});

test.each([
  [2, 3, 5],
  [0, 0, 0],
  [-1, 1, 0],
])("tambah(%i, %i) = %i", (a, b, expected) => {
  expect(tambah(a, b)).toBe(expected);
});`,
        explanation:
          'Jest menyediakan matcher seperti toBe dan test.each. Go menggunakan package testing bawaan dengan pola table-driven yang ditulis secara manual.',
      },
    },
    {
      id: 'sec-08-intermediate-table',
      type: 'markdown',
      level: 'intermediate',
      title: 'Table-Driven Tests dan Benchmark',
      content: `## Table-Driven Test

Table-driven test adalah idiom yang sangat umum di Go. Semua kasus uji didefinisikan dalam slice struct, lalu diiterasi dalam satu fungsi test.

\`\`\`go
func TestTambah(t *testing.T) {
    tests := []struct {
        a, b, want int
    }{
        {2, 3, 5},
        {0, 0, 0},
        {-1, 1, 0},
    }

    for _, tt := range tests {
        got := Tambah(tt.a, tt.b)
        if got != tt.want {
            t.Errorf("Tambah(%d,%d) = %d; want %d", tt.a, tt.b, got, tt.want)
        }
    }
}
\`\`\`

Pola ini memudahkan penambahan kasus baru tanpa menulis fungsi test baru.

## Benchmark

Benchmark di Go menggunakan \`testing.B\` dan dijalankan dengan \`go test -bench=.\`.

\`\`\`go
func BenchmarkTambah(b *testing.B) {
    for i := 0; i < b.N; i++ {
        Tambah(2, 3)
    }
}
\`\`\`

Hasil benchmark menunjukkan jumlah operasi per detik, waktu per operasi, dan alokasi memori per operasi.

## Subtests

Subtests memungkinkan pengelompokan kasus uji dan eksekusi paralel:

\`\`\`go
func TestTambah(t *testing.T) {
    tests := map[string]struct{...}{...}
    for name, tc := range tests {
        t.Run(name, func(t *testing.T) {
            got := Tambah(tc.a, tc.b)
            if got != tc.want { ... }
        })
    }
}
\`\`\``,
    },
    {
      id: 'sec-08-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-08-ts',
        filename: 'test.test.ts',
        language: 'typescript',
        title: 'TypeScript: Test dengan Vitest',
        code: `import { describe, it, expect } from "vitest";

function tambah(a: number, b: number): number {
  return a + b;
}

describe("tambah", () => {
  it("menjumlahkan dua angka", () => {
    expect(tambah(2, 3)).toBe(5);
  });

  it.each([
    [2, 3, 5],
    [0, 0, 0],
  ])("tambah(%i, %i) = %i", (a, b, expected) => {
    expect(tambah(a, b)).toBe(expected);
  });
});`,
        explanation:
          'Vitest dan Jest menyediakan API describe/it/expect. Go menggunakan testing.T dan assert manual, namun memiliki idiom table-driven test yang sangat kuat.',
      },
    },
    {
      id: 'sec-08-advanced-tooling',
      type: 'markdown',
      level: 'advanced',
      title: 'go vet, Race Detector, dan pprof',
      content: `## go vet

\`go vet\` adalah tool static analysis bawaan yang menemukan bug umum seperti:

- Format string yang salah.
- Goroutine yang mungkin mengakses variabel loop.
- Assignment yang tidak pernah digunakan.
- Struktur tag yang tidak valid.

\`\`\`text
go vet ./...
\`\`\`

## Race Detector

Data race terjadi ketika dua goroutine mengakses variabel yang sama dan minimal satu di antaranya menulis, tanpa sinkronisasi. Race detector membantu menemukan kondisi ini:

\`\`\`text
go test -race ./...
\`\`\`

Race detector memperlambat eksekusi, tetapi sangat berharga untuk menemukan bug konkuren yang sulit direproduksi.

## Profiling dengan pprof

Package \`net/http/pprof\` dan \`runtime/pprof\` menyediakan profiling CPU dan memori. Hasil profiling bisa dianalisis dengan tool \`go tool pprof\`.

\`\`\`go
import _ "net/http/pprof"
\`\`\`

Setelah diaktifkan, endpoint \`/debug/pprof/\` menyediakan:

- \`/debug/pprof/profile\`: CPU profile.
- \`/debug/pprof/heap\`: memory heap profile.
- \`/debug/pprof/goroutine\`: goroutine stack traces.

## Code Coverage

Go menyediakan code coverage dengan mudah:

\`\`\`text
go test -cover ./...
go test -coverprofile=coverage.out ./...
go tool cover -html=coverage.out
\`\`\`

## go fmt dan goimports

\`go fmt\` memastikan kode mematuhi gaya penulisan standar. \`goimports\` adalah tool tambahan yang juga mengatur import secara otomatis, menghapus import tidak terpakai, dan menambahkan import yang diperlukan.`,
    },
    {
      id: 'sec-08-go-example',
      type: 'code-example',
      codeExample: {
        id: 'code-08-go',
        filename: 'kata_test.go',
        language: 'go',
        title: 'Go: Table-Driven Test dan Benchmark',
        code: `package kata

import "testing"

func Tambah(a, b int) int {
	return a + b
}

func TestTambah(t *testing.T) {
	tests := []struct {
		name string
		a    int
		b    int
		want int
	}{
		{"positif", 2, 3, 5},
		{"nol", 0, 0, 0},
		{"negatif", -1, 1, 0},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := Tambah(tt.a, tt.b)
			if got != tt.want {
				t.Errorf("Tambah(%d,%d) = %d; want %d", tt.a, tt.b, got, tt.want)
			}
		})
	}
}

func BenchmarkTambah(b *testing.B) {
	for i := 0; i < b.N; i++ {
		Tambah(2, 3)
	}
}`,
        explanation:
          'File _test.go berisi table-driven test dengan subtests dan benchmark. go test menjalankan test, sementara go test -bench=. menjalankan benchmark.',
      },
    },
    {
      id: 'sec-08-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Ringkasan:** Go memiliki testing framework bawaan. File _test.go menggunakan testing.T untuk unit test dan testing.B untuk benchmark. Table-driven test adalah idiom utama. go vet, race detector, pprof, dan code coverage adalah tooling penting untuk menjaga kualitas dan performa kode Go.',
    },
  ],
}
