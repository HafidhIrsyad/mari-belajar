import type { Lesson } from '@/content/types'

export const ch03Lesson: Lesson = {
  id: 'lesson-ch-03-reflection',
  estimatedMinutes: 45,
  sections: [
    {
      id: 'sec-go-adv-03-basic',
      type: 'markdown',
      level: 'basic',
      title: 'reflect.Type dan reflect.Value',
      content: `## Reflection di Go

Package \`reflect\` menyediakan kemampuan untuk memeriksa tipe dan nilai saat runtime. Reflection berguna untuk:
- Serialisasi dan deserialisasi (misalnya JSON, XML, database mapper).
- Dependency injection.
- Framework yang membaca metadata dari struct.

## Type dan Value

- \`reflect.TypeOf(x)\` mengembalikan \`reflect.Type\`, yaitu deskripsi tipe dari \`x\`.
- \`reflect.ValueOf(x)\` mengembalikan \`reflect.Value\`, yaitu wrapper yang membungkus nilai \`x\`.

Untuk mengubah \`reflect.Value\` kembali ke tipe konkret, gunakan \`.Interface()\` atau \`.Int()\`, \`.String()\`, dll. Ingat: method \`Interface()\` mengembalikan \`interface{}\`, yang mungkin memerlukan type assertion.

## Kind vs Type

- **Kind** adalah kategori tipe primitif: \`reflect.Struct\`, \`reflect.Slice\`, \`reflect.Int\`, dll.
- **Type** bisa bernama, seperti \`time.Time\` yang kind-nya \`reflect.Struct\`.

Memahami perbedaan ini penting agar tidak bingung saat memeriksa tipe custom.`,
    },
    {
      id: 'sec-go-adv-03-js',
      type: 'code-example',
      codeExample: {
        id: 'code-go-adv-03-js',
        filename: 'reflect-metadata.js',
        language: 'javascript',
        title: 'JavaScript: Metadata dari Object Literal',
        code: `function describeObject(obj) {
  for (const key of Object.keys(obj)) {
    const value = obj[key];
    console.log(key, typeof value, Array.isArray(value) ? 'array' : '');
  }
}

const user = {
  id: 1,
  name: 'Budi',
  tags: ['admin', 'editor'],
};

describeObject(user);`,
        explanation:
          'JavaScript mendukung introspeksi objek melalui Object.keys dan typeof. Ini setara dasar reflection, meskipun tidak sekuat reflect package di Go.',
      },
    },
    {
      id: 'sec-go-adv-03-intermediate',
      type: 'markdown',
      level: 'intermediate',
      title: 'Struct Tags, Dynamic Call, dan Pitfalls',
      content: `## Struct Tags

Struct tag adalah metadata string yang melekat pada field struct. Tag dibaca dengan \`reflect.Type.Field(i).Tag\` dan di-parse dengan \`tag.Lookup("json")\`.

\`\`\`go
type User struct {
    Name string \`json:"name" db:"full_name"\`
}
\`\`\`

Package \`encoding/json\` menggunakan struct tag untuk mapping nama field. Anda juga bisa membuat mapper database atau validator sendiri berdasarkan tag.

## Dynamic Method Call

\`reflect.Value\` memiliki method \`Call\` untuk memanggil fungsi atau method secara dinamis:

\`\`\`go
v := reflect.ValueOf(math.Abs)
args := []reflect.Value{reflect.ValueOf(-3.14)}
result := v.Call(args)
\`\`\`

Dynamic method call berguna untuk framework tapi rentan terhadap error runtime jika argumen tidak cocok.

## Pitfalls Reflection

- **Overhead**: reflection lebih lambat dari akses langsung.
- **Type safety**: kesalahan baru terdeteksi saat runtime.
- **Maintainability**: kode reflection sulit dibaca dan di-debug.
- **Unexported fields**: tidak bisa diakses tanpa trik yang tidak aman.`,
    },
    {
      id: 'sec-go-adv-03-ts',
      type: 'code-example',
      codeExample: {
        id: 'code-go-adv-03-ts',
        filename: 'decorator-metadata.ts',
        language: 'typescript',
        title: 'TypeScript: Decorator Metadata',
        code: `import 'reflect-metadata';

const Required = () =>
  Reflect.metadata('validation:required', true);

class User {
  @Required()
  name: string = '';

  @Required()
  email: string = '';
}

function validate(instance: object) {
  const required = Reflect.getMetadataKeys(instance.constructor.prototype)
    .filter((k) => k === 'validation:required');
  console.log('metadata keys:', required);
}

validate(new User());`,
        explanation:
          'TypeScript dengan reflect-metadata menyimpan metadata pada prototype, mirip dengan struct tags di Go. Perbedaannya, Go membaca tag dari definisi struct saat runtime, sedangkan TS decorators menyimpan metadata terpisah.',
      },
    },
    {
      id: 'sec-go-adv-03-advanced',
      type: 'markdown',
      level: 'advanced',
      title: 'go generate dan AST-based Code Generation',
      content: `## go generate

\`go generate\` adalah perintah yang menjalankan directive dalam komentar sumber kode:

\`\`\`go
//go:generate go run ./cmd/gen.go
\`\`\`

Directive ini dieksekusi saat developer menjalankan \`go generate ./...\`. \`go generate\` tidak berjalan saat \`go build\`, sehingga file yang dihasilkan harus dikomit ke repository.

## AST Parser

Package \`go/ast\`, \`go/parser\`, dan \`go/token\` memungkinkan kita memparse kode Go menjadi abstract syntax tree. Dari AST, kita bisa:
- Membaca definisi struct dan field.
- Menganalisis method receiver.
- Menghasilkan file baru seperti mock, validator, atau boilerplate CRUD.

## Code Generation vs Reflection

| Aspek | Reflection | Code Generation |
|-------|------------|-----------------|
| Waktu evaluasi | Runtime | Build time |
| Performa | Lebih lambat | Sama dengan kode manual |
| Type safety | Lebih lemah | Penuh |
| Maintainability | Sulit | File generated bisa diperiksa |

Untuk produksi, preferensi umum: hindari reflection jika code generation bisa melakukan hal yang sama.`,
    },
    {
      id: 'sec-go-adv-03-go',
      type: 'code-example',
      codeExample: {
        id: 'code-go-adv-03-go',
        filename: 'reflect_validate.go',
        language: 'go',
        title: 'Go: Struct Tag Reader dan Validator Sederhana',
        code: `package main

import (
\t"fmt"
\t"reflect"
\t"strings"
)

type User struct {
\tName  string \`validate:"required" json:"name"\`
\tEmail string \`validate:"required,email" json:"email"\`
\tAge   int    \`validate:"min=18" json:"age"\`
}

func validateStruct(v any) []string {
\tvar errs []string
\trv := reflect.ValueOf(v)
\tif rv.Kind() == reflect.Ptr {
\t\trv = rv.Elem()
\t}
\trt := rv.Type()
\n\tfor i := 0; i < rt.NumField(); i++ {
\t\tfield := rt.Field(i)
\t\tvalue := rv.Field(i)
\t\ttag := field.Tag.Get("validate")
\t\tfor _, rule := range strings.Split(tag, ",") {
\t\t\tswitch rule {
\t\t\tcase "required":
\t\t\t\tif value.IsZero() {
\t\t\t\t\terrs = append(errs, fmt.Sprintf("%s is required", field.Name))
\t\t\t\t}
\t\t\tdefault:
\t\t\t\tif strings.HasPrefix(rule, "min=") {
\t\t\t\t\tvar min int
\t\t\t\t\tfmt.Sscanf(rule, "min=%d", &min)
\t\t\t\t\tif value.Kind() == reflect.Int && int(value.Int()) < min {
\t\t\t\t\t\terrs = append(errs, fmt.Sprintf("%s must be >= %d", field.Name, min))
\t\t\t\t\t}
\t\t\t\t}
\t\t\t}
\t\t}
\t}
\treturn errs
}

func main() {
\tu := User{Name: "", Email: "budi", Age: 16}
\terrs := validateStruct(&u)
\tfor _, e := range errs {
\t\tfmt.Println("validation error:", e)
\t}
}`,
        explanation:
          'Validator ini membaca struct tag "validate" menggunakan reflect.Type dan reflect.Value. Pattern ini sama dengan yang digunakan encoding/json dan validator library populer. Perhatikan bahwa reflection dijalankan saat runtime dan lebih lambat dibanding generated validator.',
      },
    },
    {
      id: 'sec-go-adv-03-callout',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Kesalahan umum:** menggunakan reflection untuk logika yang bisa diselesaikan dengan interface atau generics; lupa menangani pointer saat reflect.ValueOf menerima pointer; atau mengabaikan overhead reflection di hot path. Preferensi: gunakan `go generate` + `go/ast` untuk boilerplate, dan reflection hanya untuk interoperability yang tidak bisa dihindari. Tools: `go vet`, `stringer` (go generate tool resmi), `mockgen`, dan `go/ast` untuk custom generator.',
    },
  ],
}
