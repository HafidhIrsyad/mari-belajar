import type { Lesson } from '@/content/types'

export const ch05Lesson: Lesson = {
  id: 'lesson-ch-05-struct-interface-embedding',
  estimatedMinutes: 35,
  sections: [
    {
      id: 'sec-05-basic-struct',
      type: 'markdown',
      level: 'basic',
      title: 'Struct di Go',
      content: `## Struct

Struct adalah tipe data komposit yang mengelompokkan field-field terkait. Struct di Go mirip record atau object sederhana di bahasa lain, tetapi tidak memiliki inheritance.

\`\`\`go
type User struct {
    Name string
    Age  int
    Email string
}

func main() {
    u := User{Name: "Budi", Age: 25}
    fmt.Println(u.Name)
}
\`\`\`

## Struct Tags

Field struct bisa diberi tag, yaitu metadata string yang biasanya digunakan untuk serialization seperti JSON.

\`\`\`go
type Product struct {
    ID    int     \`json:"id"\`
    Name  string  \`json:"name"\`
    Price float64 \`json:"price"\`
}
\`\`\`

## Constructor

Go tidak memiliki constructor bawaan seperti OOP. Pola umum adalah membuat factory function yang mengembalikan pointer ke struct.

\`\`\`go
func NewUser(name string, age int) *User {
    return &User{Name: name, Age: age}
}
\`\`\`

## Anonymous Struct

Go juga mendukung anonymous struct untuk kebutuhan sementara:

\`\`\`go
p := struct {
    X int
    Y int
}{X: 10, Y: 20}
\`\`\``,
    },
    {
      id: 'sec-05-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-05-js',
        filename: 'objects.js',
        language: 'javascript',
        title: 'JavaScript: Object dan Class',
        code: `const user = {
  name: "Budi",
  age: 25,
  greet() {
    return \`Halo, \${this.name}\`;
  }
};

class Admin extends User {
  constructor(name, role) {
    super(name);
    this.role = role;
  }
}

// JavaScript mendukung inheritance melalui class extends`,
        explanation:
          'JavaScript memiliki object literal dan class inheritance. Go tidak memiliki class; composition melalui struct dan embedding menggantikan inheritance.',
      },
    },
    {
      id: 'sec-05-intermediate-interface',
      type: 'markdown',
      level: 'intermediate',
      title: 'Interface, Type Assertion, dan Type Switch',
      content: `## Interface

Interface di Go adalah kumpulan method signatures. Tipe mengimplementasikan interface secara implisit jika memiliki semua method yang diminta.

\`\`\`go
type Greeter interface {
    Greet() string
}

type User struct {
    Name string
}

func (u User) Greet() string {
    return "Halo, " + u.Name
}
\`\`\`

\`User\` secara otomatis memenuhi \`Greeter\` tanpa perlu keyword \`implements\`.

## Empty Interface

\`interface{}\` atau \`any\` (sejak Go 1.18) bisa menampung nilai dengan tipe apa pun. Banyak digunakan untuk tipe data generik sebelum generics hadir.

\`\`\`go
func printAny(v any) {
    fmt.Println(v)
}
\`\`\`

## Type Assertion

Type assertion mengakses nilai konkret di balik nilai interface.

\`\`\`go
var i any = "hello"
s := i.(string) // panic jika bukan string
s, ok := i.(string) // aman, ok menandakan keberhasilan
\`\`\`

## Type Switch

Type switch digunakan untuk menangani beberapa kemungkinan tipe:

\`\`\`go
switch v := i.(type) {
case string:
    fmt.Println("string:", v)
case int:
    fmt.Println("int:", v)
default:
    fmt.Println("unknown")
}
\`\`\``,
    },
    {
      id: 'sec-05-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-05-ts',
        filename: 'interfaces.ts',
        language: 'typescript',
        title: 'TypeScript: Interface Explicit',
        code: `interface Greeter {
  greet(): string;
}

class User implements Greeter {
  constructor(private name: string) {}
  greet() {
    return \`Halo, \${this.name}\`;
  }
}

function sayHello(g: Greeter) {
  console.log(g.greet());
}

const user: Greeter = new User("Budi");
sayHello(user);`,
        explanation:
          'TypeScript membutuhkan implements secara eksplisit. Go menggunakan structural typing: tipe memenuhi interface jika memiliki method yang diminta.',
      },
    },
    {
      id: 'sec-05-advanced-embedding',
      type: 'markdown',
      level: 'advanced',
      title: 'Embedding, Interface Internals, dan Polymorphism',
      content: `## Struct Embedding

Struct embedding memungkinkan satu struct disematkan ke struct lain. Field dan method dari struct yang disematkan menjadi promoted dan bisa diakses langsung.

\`\`\`go
type Person struct {
    Name string
}

func (p Person) SayHi() string {
    return "Hi, " + p.Name
}

type Employee struct {
    Person
    ID int
}

// Employee memiliki field Name dan method SayHi secara langsung
\`\`\`

Embedding berbeda dengan inheritance: tidak ada hubungan hierarkis. \`Employee\` bukanlah \`Person\`; \`Employee\` hanya memiliki \`Person\` sebagai field.

## Interface Internals

Nilai interface di Go terdiri dari dua komponen:

- **Type pointer**: menunjuk ke tipe konkret dari nilai.
- **Data pointer**: menunjuk ke nilai aktual.

Jika nilai interface berisi \`nil\` pointer, interface itu sendiri tidak \`nil\`. Ini adalah gotcha umum di Go.

\`\`\`go
var p *User = nil
var i any = p
fmt.Println(i == nil) // false
\`\`\`

## Polymorphism

Polymorphism di Go dicapai melalui interface. Fungsi yang menerima interface bisa bekerja dengan berbagai tipe konkret yang memenuhi interface tersebut. Ini memungkinkan desain yang fleksibel tanpa inheritance.

## Interface Segregation

Go mendorong interface kecil. Standar library penuh dengan interface kecil seperti \`io.Reader\`, \`io.Writer\`, dan \`fmt.Stringer\`. Interface kecil memudahkan implementasi dan reuse.`,
    },
    {
      id: 'sec-05-go-example',
      type: 'code-example',
      codeExample: {
        id: 'code-05-go',
        filename: 'struct_interface.go',
        language: 'go',
        title: 'Go: Struct, Interface, dan Embedding',
        code: `package main

import "fmt"

// interface kecil
type Greeter interface {
	Greet() string
}

type User struct {
	Name string
}

func (u User) Greet() string {
	return "Halo, " + u.Name
}

type Admin struct {
	User
	Role string
}

func greetAll(g Greeter) {
	fmt.Println(g.Greet())
}

func main() {
	u := User{Name: "Budi"}
	greetAll(u)

	a := Admin{User: User{Name: "Ani"}, Role: "superadmin"}
	fmt.Println(a.Name) // promoted field
	greetAll(a)         // Admin memenuhi Greeter lewat promoted method

	// type assertion
	var i any = "belajar Go"
	if s, ok := i.(string); ok {
		fmt.Println("string:", s)
	}
}`,
        explanation:
          'Program ini menunjukkan interface dengan structural typing, struct embedding yang mempromosikan field dan method, type assertion, serta polymorphism berbasis interface.',
      },
    },
    {
      id: 'sec-05-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Ringkasan:** Struct mengelompokkan field dengan tipe berbeda. Interface adalah kontrak method yang dipenuhi secara implisit. Embedding menyediakan composition alih-alih inheritance. Type assertion dan type switch digunakan untuk bekerja dengan nilai interface. Polymorphism di Go dicapai melalui interface kecil.',
    },
  ],
}
