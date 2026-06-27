import type { Lesson } from '@/content/types'

export const ch07Lesson: Lesson = {
  id: 'lesson-ch-07-typescript-type-system',
  estimatedMinutes: 16,
  sections: [
    {
      id: 'sec-07-basic-intro',
      type: 'markdown',
      level: 'basic',
      title: 'Pengenalan TypeScript dan Tipe Dasar',
      content: `## Apa itu TypeScript?

**TypeScript** adalah superset JavaScript yang menambahkan sistem tipe statis. Kode TypeScript dikompilasi menjadi JavaScript biasa sehingga bisa berjalan di browser atau Node.js. Dengan TypeScript, banyak kesalahan tipe bisa tertangkap sebelum program dijalankan.

Manfaat utama TypeScript:

- **Type safety**: kesalahan penggunaan tipe terdeteksi saat compile time.
- **Autocompletion dan IntelliSense**: editor bisa memberi saran berdasarkan tipe.
- **Dokumentasi hidup**: tipe menjelaskan bentuk data secara eksplisit.
- **Refactoring lebih aman**: perubahan struktur data lebih mudah dilacak.

## Type Annotation vs Type Inference

**Type annotation** adalah cara menulis tipe secara eksplisit setelah nama variabel atau parameter.

\`\`\`typescript
let nama: string = "Budi";
let umur: number = 21;
let aktif: boolean = true;
\`\`\`

**Type inference** terjadi ketika TypeScript bisa menyimpulkan tipe dari nilai yang diberikan.

\`\`\`typescript
let nama = "Budi";     // TypeScript menyimpulkan tipe string
let umur = 21;         // TypeScript menyimpulkan tipe number
let aktif = true;      // TypeScript menyimpulkan tipe boolean
\`\`\`

Keduanya valid. Annotation memberi kejelasan ekstra, inference menghemat penulisan.

## Tipe Khusus: any, unknown, dan never

### any

Tipe \`any\` mematikan pemeriksaan tipe. Variabel bertipe \`any\` bisa diisi dan diakses seperti apa pun.

\`\`\`typescript
let data: any = 10;
data = "hello";      // diperbolehkan
data.toFixed(2);     // diperbolehkan, meskipun tidak aman
\`\`\`

Gunakan \`any\` sesedikit mungkin karena ia menghilangkan keuntungan TypeScript.

### unknown

Tipe \`unknown\` juga bisa menampung nilai apa pun, tetapi kita harus mempersempitnya dulu sebelum digunakan.

\`\`\`typescript
let input: unknown = "hello";

if (typeof input === "string") {
  console.log(input.toUpperCase()); // aman setelah pengecekan
}
\`\`\`

\`unknown\` lebih aman daripada \`any\` karena memaksa programmer melakukan pengecekan tipe.

### never

Tipe \`never\` merepresentasikan nilai yang tidak pernah terjadi. Biasanya muncul pada fungsi yang selalu melempar error atau loop tak berujung.

\`\`\`typescript
function error(message: string): never {
  throw new Error(message);
}
\`\`\`

\`never\` juga berguna untuk memastikan semua kasus dalam union type sudah ditangani.`,
    },
    {
      id: 'sec-07-js-runtime',
      type: 'code-example',
      codeExample: {
        id: 'code-07-js',
        filename: 'runtime-checks.js',
        language: 'javascript',
        title: 'JavaScript: Pengecekan Tipe di Runtime',
        code: `// JavaScript tidak memiliki type annotation.
// Pengecekan tipe dilakukan secara manual saat runtime.

function greet(person) {
  if (typeof person !== "object" || person === null) {
    throw new Error("person harus berupa object");
  }
  if (typeof person.name !== "string") {
    throw new Error("person.name harus berupa string");
  }
  if (typeof person.age !== "number") {
    throw new Error("person.age harus berupa number");
  }

  console.log(\`Halo, \${person.name}! Umurmu \${person.age}.\`);
}

greet({ name: "Budi", age: 21 }); // Halo, Budi! Umurmu 21.

// Tanpa pengecekan, kesalahan baru terlihat saat runtime.
// greet(null); // Error saat dijalankan

// Union-like behavior dengan typeof
function formatValue(value) {
  if (typeof value === "string") {
    return value.toUpperCase();
  }
  if (typeof value === "number") {
    return value.toFixed(2);
  }
  return String(value);
}

console.log(formatValue("hello")); // "HELLO"
console.log(formatValue(3.14159)); // "3.14"`,
        explanation:
          'JavaScript hanya bisa memeriksa tipe saat runtime dengan typeof atau instanceof. TypeScript memindahkan sebagian besar pemeriksaan ini ke compile time, sehingga kesalahan bisa ditemukan lebih awal.',
      },
    },
    {
      id: 'sec-07-intermediate-types',
      type: 'markdown',
      level: 'intermediate',
      title: 'Interface, Type Alias, Union, dan Intersection',
      content: `## Interface

**Interface** mendeskripsikan bentuk objek: property apa saja yang dimiliki beserta tipenya.

\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
}

const user: User = {
  id: 1,
  name: "Budi",
  email: "budi@example.com",
};
\`\`\`

Interface bisa di-extend untuk membuat tipe yang lebih spesifik.

\`\`\`typescript
interface Admin extends User {
  role: "admin";
  permissions: string[];
}
\`\`\`

## Type Alias

**Type alias** memberi nama pada tipe apa pun, termasuk union, tuple, atau tipe primitif.

\`\`\`typescript
type ID = string | number;
type Status = "active" | "inactive" | "pending";

type Point = {
  x: number;
  y: number;
};
\`\`\`

Interface dan type alias sering tumpang-tindih. Pilih interface untuk objek yang mungkin di-extend, dan type alias untuk union atau bentuk tipe yang lebih kompleks.

## Optional Properties

Tambahkan tanda tanya (\`?\`) setelah nama property untuk membuatnya opsional.

\`\`\`typescript
interface Product {
  name: string;
  price: number;
  description?: string; // opsional
}

const mouse: Product = { name: "Mouse", price: 150000 };
\`\`\`

## Union Types

**Union type** memungkinkan sebuah nilai memiliki salah satu dari beberapa tipe.

\`\`\`typescript
type StringOrNumber = string | number;

function printId(id: StringOrNumber) {
  console.log(\`ID: \${id}\`);
}
\`\`\`

Union sering digunakan bersama type narrowing untuk menangani masing-masing kasus.

## Intersection Types

**Intersection type** menggabungkan beberapa tipe menjadi satu. Nilai harus memenuhi semua tipe yang digabungkan.

\`\`\`typescript
type Named = { name: string };
type Aged = { age: number };

type Person = Named & Aged;

const budi: Person = { name: "Budi", age: 21 };
\`\`\`

## Array dan Object Types

Array ditulis dengan tipe elemen diikuti tanda kurung siku.

\`\`\`typescript
const scores: number[] = [85, 90, 78];
const names: Array<string> = ["Andi", "Budi", "Citra"];
\`\`\`

Object types bisa ditulis langsung atau melalui interface/type alias.

\`\`\`typescript
const user: { name: string; age: number } = { name: "Andi", age: 25 };
\`\`\``,
    },
    {
      id: 'sec-07-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-07-ts',
        filename: 'type-system.ts',
        language: 'typescript',
        title: 'TypeScript: Interface, Generic, dan Type Guard',
        code: `// Interface mendeskripsikan bentuk objek
interface Product {
  id: number;
  name: string;
  price: number;
  tags?: string[];
}

// Generic function untuk menyaring array berdasarkan predicate
function filterBy<T>(items: T[], predicate: (item: T) => boolean): T[] {
  return items.filter(predicate);
}

const products: Product[] = [
  { id: 1, name: "Mouse", price: 150000 },
  { id: 2, name: "Keyboard", price: 450000, tags: ["mechanical"] },
  { id: 3, name: "Monitor", price: 1200000 },
];

const expensive = filterBy(products, (p) => p.price > 300000);
console.log(expensive.map((p) => p.name)); // ["Keyboard", "Monitor"]

// Union type untuk hasil yang bisa berupa sukses atau error
type Result<T> =
  | { success: true; data: T }
  | { success: false; error: string };

function parseNumber(input: string): Result<number> {
  const value = Number(input);
  if (Number.isNaN(value)) {
    return { success: false, error: "Bukan angka" };
  }
  return { success: true, data: value };
}

const parsed = parseNumber("42");

// Type narrowing dengan discriminated union
if (parsed.success) {
  console.log(parsed.data.toFixed(2)); // parsed adalah { success: true; data: number }
} else {
  console.log(parsed.error); // parsed adalah { success: false; error: string }
}

// Custom type guard
function isProduct(value: unknown): value is Product {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "name" in value &&
    "price" in value
  );
}

const maybeProduct: unknown = { id: 4, name: "Webcam", price: 600000 };
if (isProduct(maybeProduct)) {
  console.log(maybeProduct.name); // TypeScript tahu ini Product
}`,
        explanation:
          'Interface mendeskripsikan bentuk objek, generic membuat fungsi bekerja untuk berbagai tipe, dan type guard mempersempit unknown atau union menjadi tipe yang lebih spesifik.',
      },
    },
    {
      id: 'sec-07-advanced-generics',
      type: 'markdown',
      level: 'advanced',
      title: 'Generics, Type Narrowing, dan Type Guards',
      content: `## Generics

**Generics** memungkinkan kita membuat komponen yang bekerja untuk berbagai tipe tanpa kehilangan informasi tipe. Generic dinyatakan dalam tanda kurung siku setelah nama fungsi, interface, atau kelas.

\`\`\`typescript
function identity<T>(value: T): T {
  return value;
}

const num = identity<number>(10);   // T adalah number
const str = identity("hello");       // T disimpulkan sebagai string
\`\`\`

Generics sangat berguna untuk struktur data seperti stack, queue, atau API response.

\`\`\`typescript
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}
\`\`\`

## Type Narrowing

**Type narrowing** adalah proses mempersempit tipe yang lebih luas menjadi tipe yang lebih spesifik berdasarkan pengecekan runtime. Cara umum:

- \`typeof\` untuk tipe primitif.
- \`instanceof\` untuk instance kelas.
- \`in\` untuk memeriksa keberadaan property.
- Discriminated union dengan property unik seperti \`kind\` atau \`type\`.

\`\`\`typescript
function process(value: string | number) {
  if (typeof value === "string") {
    // di sini value dianggap string
    console.log(value.toUpperCase());
  } else {
    // di sini value dianggap number
    console.log(value.toFixed(2));
  }
}
\`\`\`

## Type Guards

**Type guard** adalah fungsi atau ekspresi yang memberi tahu TypeScript bahwa nilai sudah memiliki tipe tertentu setelah pengecekan. Type guard custom mengembalikan \`value is Type\`.

\`\`\`typescript
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function print(value: unknown) {
  if (isString(value)) {
    console.log(value.length); // TypeScript tahu value adalah string
  }
}
\`\`\`

Type guard sangat berguna saat menerima data eksternal yang tipe awalnya \`unknown\` atau \`any\`, seperti hasil parsing JSON atau response API.

## Memilih Antara Interface dan Type Alias

- Gunakan **interface** jika tipe akan sering di-extend atau diimplementasikan oleh kelas.
- Gunakan **type alias** untuk union, intersection, atau tipe yang tidak perlu di-extend.

Dalam banyak kasus, keduanya bisa saling menggantikan. Konsistensi dalam satu proyek lebih penting daripada memilih yang "benar" secara mutlak.`,
    },
    {
      id: 'sec-07-go-example',
      type: 'code-example',
      codeExample: {
        id: 'code-07-go',
        filename: 'main.go',
        language: 'go',
        title: 'Go: Interface dan Type Assertion',
        code: `package main

import "fmt"

// Interface di Go mendeskripsikan kumpulan method
type Greeter interface {
	Greet() string
}

// Struct yang mengimplementasikan interface secara implisit
type Person struct {
	Name string
}

func (p Person) Greet() string {
	return fmt.Sprintf("Halo, nama saya %s", p.Name)
}

type Robot struct {
	Model string
}

func (r Robot) Greet() string {
	return fmt.Sprintf("Beep boop, saya %s", r.Model)
}

func sayHello(g Greeter) {
	fmt.Println(g.Greet())
}

func main() {
	entities := []Greeter{
		Person{Name: "Budi"},
		Robot{Model: "RX-78"},
	}

	for _, entity := range entities {
		sayHello(entity)

		// Type assertion untuk mengakses tipe konkret
		if person, ok := entity.(Person); ok {
			fmt.Printf("Ini adalah orang: %s\\n", person.Name)
		}
	}

	// Type switch untuk menangani banyak tipe
	var value interface{} = 42
	switch v := value.(type) {
	case int:
		fmt.Printf("Integer: %d\\n", v)
	case string:
		fmt.Printf("String: %s\\n", v)
	default:
		fmt.Printf("Tipe lain: %T\\n", v)
	}
}`,
        explanation:
          'Go menggunakan interface untuk polimorfisme. Berbeda dengan TypeScript yang berbasis structural typing pada compile time, Go memeriksa interface saat runtime. Type assertion dan type switch adalah cara Go mempersempit interface{} atau interface ke tipe konkret.',
      },
    },
    {
      id: 'sec-07-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Ringkasan:** TypeScript menambahkan sistem tipe statis yang membantu menangkap kesalahan lebih awal. Type annotation memberi kejelasan, inference menghemat penulisan, sementara any, unknown, dan never masing-masing punya peran dan risiko. Interface dan type alias mendeskripsikan objek, union dan intersection memodelkan hubungan antar tipe, generics membuat kode fleksibel tanpa kehilangan type safety, dan type narrowing serta type guards mempersempit tipe berdasarkan pengecekan runtime.',
    },
  ],
}
