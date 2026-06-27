import type { Lesson } from '@/content/types'

export const ch07Lesson: Lesson = {
  id: 'lesson-ch-07-error-handling-and-modules',
  estimatedMinutes: 35,
  sections: [
    {
      id: 'sec-07-basic-error',
      type: 'markdown',
      level: 'basic',
      title: 'Error sebagai Nilai',
      content: `## Error Interface

Di Go, error bukan exception melainkan nilai biasa yang dikembalikan dari fungsi. Interface error didefinisikan sebagai:

\`\`\`go
type error interface {
    Error() string
}
\`\`\`

Setiap tipe yang memiliki method \`Error() string\` dapat digunakan sebagai error.

## Membuat Error

Cara paling sederhana membuat error:

\`\`\`go
err := errors.New("terjadi kesalahan")
\`\`\`

Untuk error dengan format:

\`\`\`go
err := fmt.Errorf("gagal membuka file %s", filename)
\`\`\`

Konvensi di Go adalah mengembalikan \`(result, error)\` dan memeriksa error segera setelah pemanggilan fungsi:

\`\`\`go
f, err := os.Open("data.txt")
if err != nil {
    return err
}
defer f.Close()
\`\`\`

## Sentinel Error

Sentinel error adalah error yang dideklarasikan sebagai variabel global dan digunakan sebagai penanda kondisi khusus.

\`\`\`go
var ErrNotFound = errors.New("tidak ditemukan")
\`\`\``,
    },
    {
      id: 'sec-07-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-07-js',
        filename: 'error-handling.js',
        language: 'javascript',
        title: 'JavaScript: Try/Catch dan Error Object',
        code: `function readFile(path) {
  if (!path) throw new Error("path is required");
  return "content";
}

try {
  const data = readFile("data.txt");
  console.log(data);
} catch (err) {
  console.error("gagal:", err.message);
} finally {
  console.log("cleanup");
}`,
        explanation:
          'JavaScript menggunakan exception dengan try/catch. Go menggunakan error sebagai return value yang harus diperiksa secara eksplisit.',
      },
    },
    {
      id: 'sec-07-intermediate-wrapping',
      type: 'markdown',
      level: 'intermediate',
      title: 'Error Wrapping, Is, dan As',
      content: `## Error Wrapping

Error wrapping memungkinkan kita menambahkan konteks ke error asli tanpa kehilangan informasi. Gunakan \`%w\` verb pada \`fmt.Errorf\`:

\`\`\`go
if err != nil {
    return fmt.Errorf("gagal membaca konfigurasi: %w", err)
}
\`\`\`

Dengan wrapping, error asli tetap bisa diperiksa menggunakan \`errors.Is\` atau \`errors.As\`.

## errors.Is

\`errors.Is\` memeriksa apakah error atau error di dalam chain-nya sama dengan target:

\`\`\`go
if errors.Is(err, ErrNotFound) {
    // handle not found
}
\`\`\`

## errors.As

\`errors.As\` memeriksa apakah ada error dalam chain yang cocok dengan tipe tertentu:

\`\`\`go
var notFound *NotFoundError
if errors.As(err, &notFound) {
    fmt.Println("resource:", notFound.Resource)
}
\`\`\`

## Custom Error

Membuat custom error memungkinkan kita menyertakan informasi tambahan:

\`\`\`go
type NotFoundError struct {
    Resource string
    ID       string
}

func (e *NotFoundError) Error() string {
    return fmt.Sprintf("%s dengan id %s tidak ditemukan", e.Resource, e.ID)
}
\`\`\``,
    },
    {
      id: 'sec-07-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-07-ts',
        filename: 'error-handling.ts',
        language: 'typescript',
        title: 'TypeScript: Error Handling dan Result Type',
        code: `function divide(a: number, b: number): { result: number | null; error: string | null } {
  if (b === 0) return { result: null, error: "division by zero" };
  return { result: a / b, error: null };
}

const { result, error } = divide(10, 0);
if (error) {
  console.error(error);
} else {
  console.log(result);
}

class NotFoundError extends Error {
  constructor(public resource: string, public id: string) {
    super(\`\${resource} with id \${id} not found\`);
  }
}`,
        explanation:
          'TypeScript tetap berjalan di JavaScript runtime exception. Pola Go yang mengembalikan (result, error) bisa disimulasikan dengan object, tetapi Go mengintegrasikannya sebagai konvensi bahasa.',
      },
    },
    {
      id: 'sec-07-advanced-modules',
      type: 'markdown',
      level: 'advanced',
      title: 'Modules, MVS, dan Dependency Management',
      content: `## Go Modules

Go modules adalah sistem dependency management resmi sejak Go 1.11. Module didefinisikan oleh file \`go.mod\`:

\`\`\`text
module github.com/user/project

go 1.22

require (
    github.com/some/lib v1.2.3
)
\`\`\`

## go.sum

File \`go.sum\` berisi checksum kriptografi dari setiap dependency. File ini memastikan bahwa dependency yang diunduh sama persis dengan yang pernah diresolusi sebelumnya.

## Minimal Version Selection (MVS)

Berbeda dengan npm/yarn/pnpm yang menggunakan constraint resolution, Go menggunakan Minimal Version Selection. Jika beberapa package membutuhkan versi berbeda dari library yang sama, Go memilih versi minimum yang memenuhi semua requirement.

Contoh: jika modul A membutuhkan \`lib v1.2.0\` dan modul B membutuhkan \`lib v1.3.0\`, MVS memilih \`v1.3.0\` karena itu versi paling rendah yang memenuhi keduanya.

## Semantic Versioning

Go mengikuti semantic versioning. Versi mayor \`v1\`, \`v2\`, dan seterusnya memiliki module path yang berbeda. Package dengan major version >= 2 harus menyertakan versi di import path, misalnya \`github.com/lib/v2\`.

## go.work

\`go.work\` memungkinkan multiple module dikelola dalam satu workspace. Berguna saat mengembangkan beberapa modul terkait secara bersamaan tanpa perlu publish ke remote repository.

\`\`\`text
go 1.22

use (
    ./app
    ./lib
)
\`\`\`

## Proxy dan SumDB

Go secara default mengunduh module melalui proxy seperti \`proxy.golang.org\` dan memverifikasi checksum melalui \`sum.golang.org\`. Ini meningkatkan reproducibility dan keamanan.`,
    },
    {
      id: 'sec-07-go-example',
      type: 'code-example',
      codeExample: {
        id: 'code-07-go',
        filename: 'errors.go',
        language: 'go',
        title: 'Go: Error Handling dan Wrapping',
        code: `package main

import (
	"errors"
	"fmt"
)

var ErrNotFound = errors.New("tidak ditemukan")

type NotFoundError struct {
	Resource string
	ID       string
}

func (e *NotFoundError) Error() string {
	return fmt.Sprintf("%s dengan id %s tidak ditemukan", e.Resource, e.ID)
}

func findUser(id string) (*User, error) {
	return nil, fmt.Errorf("findUser gagal: %w", &NotFoundError{Resource: "user", ID: id})
}

type User struct{}

func main() {
	_, err := findUser("42")
	if err != nil {
		fmt.Println(err)

		var nfe *NotFoundError
		if errors.As(err, &nfe) {
			fmt.Printf("resource=%s id=%s\\n", nfe.Resource, nfe.ID)
		}
	}
}`,
        explanation:
          'Program ini menunjukkan custom error, error wrapping dengan %w, dan penggunaan errors.As untuk mengekstrak tipe error spesifik dari chain.',
      },
    },
    {
      id: 'sec-07-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Ringkasan:** Go mengembalikan error sebagai nilai, bukan exception. errors.New dan fmt.Errorf digunakan untuk membuat error. Wrapping dengan %w mempertahankan chain error. errors.Is dan errors.As digunakan untuk pemeriksaan error. Go modules mengelola dependensi dengan go.mod dan go.sum, menggunakan Minimal Version Selection untuk menentukan versi dependency.',
    },
  ],
}
