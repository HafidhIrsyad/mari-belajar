import type { Lesson } from '@/content/types'

export const ch02VariablesTypesOperatorsLesson: Lesson = {
  id: 'lesson-ch-02-variables-types-operators',
  estimatedMinutes: 15,
  sections: [
    {
      id: 'sec-02-variables-basic',
      type: 'markdown',
      level: 'basic',
      title: 'Variabel dan Tipe Data Primitive',
      content: `## Mendeklarasikan Variabel: let, const, dan var

JavaScript menyediakan tiga cara mendeklarasikan variabel:

- \`const\` untuk variabel yang nilainya tidak bisa diubah setelah dideklarasikan.
- \`let\` untuk variabel yang nilainya boleh diubah.
- \`var\` untuk variabel dengan function scope; umumnya tidak disarankan di kode modern.

Aturan praktis: gunakan \`const\` secara default, pilih \`let\` jika memang perlu mengubah nilai, dan hindari \`var\`.

\`\`\`javascript
const PI = 3.14;
let count = 0;
count = count + 1;
// var name = "deprecated"; // hindari
\`\`\`

## Tipe Data Primitive

JavaScript memiliki tujuh tipe data primitive:

- \`string\`: teks, seperti \`"Halo"\`.
- \`number\`: bilangan bulat dan pecahan, seperti \`42\` atau \`3.14\`.
- \`boolean\`: \`true\` atau \`false\`.
- \`null\`: representasi nilai yang sengaja dikosongkan.
- \`undefined\`: variabel yang belum diberi nilai.
- \`symbol\`: identifier unik, jarang dipakai pemula.
- \`bigint\`: bilangan bulat besar, ditandai dengan sufiks \`n\`.

\`\`\`javascript
const message = "Halo";
const age = 25;
const isActive = true;
const empty = null;
let notAssigned; // undefined
const uniqueId = Symbol("id");
const hugeNumber = 9007199254740993n;
\`\`\`

## Type Coercion dan Truthy/Falsy

Type coercion adalah konversi tipe otomatis saat operasi melibatkan dua tipe berbeda. Contoh paling umum:

\`\`\`javascript
console.log("5" + 3);  // "53" (string)
console.log("5" - 3);  // 2 (number)
console.log(5 == "5"); // true karena coercion
\`\`\`

Karena coercion bisa membuat kode sulit diprediksi, disarankan menggunakan operator ketat \`===\` dan \`!==\`.

Setiap nilai di JavaScript bisa dianggap **truthy** atau **falsy** saat dievaluasi dalam kondisi. Nilai falsy meliputi: \`false\`, \`0\`, \`""\`, \`null\`, \`undefined\`, \`NaN\`, dan \`0n\`. Sisanya truthy.`,
    },
    {
      id: 'sec-02-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-02-js',
        filename: 'variables.js',
        language: 'javascript',
        title: 'JavaScript: Variabel dan Operator',
        code: `// Deklarasi variabel
const userName = "Budi";
let score = 0;
score += 10;

// Operator aritmatika
const total = (score * 2) + 5;

// Operator perbandingan
const isHighScore = total >= 25;

// Operator logika
const hasName = userName.length > 0;
const canProceed = isHighScore && hasName;

// String concatenation
const greeting = "Halo, " + userName + "! Skor kamu: " + total;

console.log(greeting);
console.log(canProceed);`,
        explanation:
          'Contoh menunjukkan deklarasi const dan let, operator aritmatika, perbandingan, logika, serta penyusunan string dinamis.',
      },
    },
    {
      id: 'sec-02-operators',
      type: 'markdown',
      level: 'intermediate',
      title: 'Operator dan Template Literal',
      content: `## Operator Aritmatika, Perbandingan, Logika, dan Assignment

JavaScript mendukung operator-operator umum:

- Aritmatika: \`+\`, \`-\`, \`*\`, \`/\`, \`%\` (modulo), \`**\` (pangkat).
- Perbandingan: \`==\`, \`!=\`, \`===\`, \`!==\`, \`<\`, \`>\`, \`<=\`, \`>=\`.
- Logika: \`&&\` (AND), \`||\` (OR), \`!\` (NOT).
- Assignment: \`=\`, \`+=\`, \`-=\`, \`*=\`, \`/=\`, \`%=\`.

Rekomendasi: selalu gunakan \`===\` dan \`!==\` untuk menghindari kejutan type coercion.

\`\`\`javascript
const a = 10;
const b = 3;

console.log(a % b);      // 1
console.log(a ** b);     // 1000
console.log(a === "10"); // false
console.log(a == "10");  // true
\`\`\`

## Template Literal

Template literal menggunakan backtick dan memungkinkan:

- Interpolasi variabel dengan \`\${ekspresi}\`.
- String multiline tanpa escape karakter newline.
- Ekspresi di dalam placeholder.

\`\`\`javascript
const name = "Dewi";
const lines = \`
  Nama: \${name}
  Status: aktif
\`;
console.log(lines);
\`\`\`

## Type Annotation Dasar di TypeScript

Di TypeScript kita bisa menuliskan tipe setelah nama variabel:

\`\`\`typescript
const name: string = "Andi";
let age: number = 20;
let isAdmin: boolean = true;
\`\`\`

Annotation ini bersifat opsional karena TypeScript sering bisa menebak tipe dari nilai inisialisasi.`,
    },
    {
      id: 'sec-02-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-02-ts',
        filename: 'types.ts',
        language: 'typescript',
        title: 'TypeScript: Annotation, Inference, dan Union',
        code: `// Type annotation eksplisit
const productName: string = "Kopi";
let price: number = 15000;
let inStock: boolean = true;

// Type inference dari inisialisasi
let quantity = 5; // TypeScript menyimpulkan number
// quantity = "lima"; // Error: Type 'string' is not assignable to 'number'

// Union type dasar
type Status = "pending" | "success" | "error";

let paymentStatus: Status = "pending";
paymentStatus = "success";
// paymentStatus = "failed"; // Error: tidak ada dalam union

function formatPrice(value: number): string {
  return "Rp " + value.toLocaleString("id-ID");
}

console.log(formatPrice(price * quantity));`,
        explanation:
          'TypeScript menambahkan keamanan tipe melalui annotation eksplisit, inference otomatis, dan union type yang membatasi nilai yang valid.',
      },
    },
    {
      id: 'sec-02-advanced-immutability',
      type: 'markdown',
      level: 'advanced',
      title: 'Immutability, Type Inference, dan Union Types',
      content: `## Immutability Primitive vs Reference

Tipe primitive (\`string\`, \`number\`, \`boolean\`, dll.) bersifat **immutable**: nilai tidak bisa diubah setelah dibuat. Operasi seperti \`toUpperCase()\` menghasilkan string baru, bukan mengubah string lama.

\`\`\`javascript
const word = "halo";
const upper = word.toUpperCase();
console.log(word);  // "halo"
console.log(upper); // "HALO"
\`\`\`

Tipe reference seperti object dan array menyimpan alamat memori, sehingga variabel bisa merujuk ke data yang sama:

\`\`\`javascript
const user = { name: "Rina" };
const alias = user;
alias.name = "Rina Putri";
console.log(user.name); // "Rina Putri"
\`\`\`

## Type Inference di TypeScript

TypeScript menyimpulkan tipe dari nilai yang diberikan. Inference mengurangi boilerplate tanpa mengorbankan keamanan.

\`\`\`typescript
let count = 0;             // number
let message = "Hi";        // string
const numbers = [1, 2, 3]; // number[]
\`\`\`

Inference juga bekerja pada return type fungsi, meskipun annotation eksplisit lebih disarankan untuk API publik.

## Union Types Dasar

Union type memperbolehkan sebuah variabel memiliki lebih dari satu kemungkinan tipe:

\`\`\`typescript
type Id = string | number;

let userId: Id = "abc123";
userId = 42;
\`\`\`

Union sering dipakai untuk status, response, atau parameter yang bisa menerima beberapa bentuk nilai. Gunakan narrowing untuk menangani masing-masing tipe dengan aman.`,
    },
    {
      id: 'sec-02-go-example',
      type: 'code-example',
      codeExample: {
        id: 'code-02-go',
        filename: 'main.go',
        language: 'go',
        title: 'Go: Deklarasi Variabel dengan var dan :=',
        code: `package main

import "fmt"

func main() {
\t// Deklarasi eksplisit dengan var
\tvar name string = "Budi"
\tvar age int = 25

\t// Type inference dengan var
\tvar country = "Indonesia"

\t// Short variable declaration :=
\tcity := "Jakarta"
\tisActive := true

\t// Multiple declaration
\tvar (
\t\tscore   = 100
\t\tlevel   = 5
\t\tplaying = true
\t)

\tfmt.Printf("Nama: %s, Umur: %d\\n", name, age)
\tfmt.Println(country, city, isActive, score, level, playing)
}`,
        explanation:
          'Go menyediakan var dengan atau tanpa tipe eksplisit, serta := untuk deklarasi singkat di dalam fungsi. Go bersifat statically typed sehingga tipe ditentukan saat compile time.',
      },
    },
    {
      id: 'sec-02-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Ringkasan:** Gunakan const secara default dan let jika perlu reassign. Pahami tipe data primitive dan perilaku truthy/falsy. Gunakan operator ketat (===) untuk menghindari type coercion. Manfaatkan template literal untuk string dinamis. Di TypeScript, type annotation dan inference membantu menangkap kesalahan lebih awal, sementara union type memberikan fleksibilitas dengan tetap aman. Pahami perbedaan immutability primitive dan reference agar tidak terjebak bug saat membagikan data.',
    },
  ],
}
