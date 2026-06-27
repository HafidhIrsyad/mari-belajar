import type { Lesson } from '@/content/types'

export const ch05Lesson: Lesson = {
  id: 'lesson-ch-05-arrays-and-objects',
  estimatedMinutes: 15,
  sections: [
    {
      id: 'sec-05-basic-arrays-objects',
      type: 'markdown',
      level: 'basic',
      title: 'Array dan Object Dasar',
      content: `## Array: Kumpulan Data Berurutan

Array menyimpan banyak nilai dalam satu variabel. Setiap nilai disebut elemen dan diakses menggunakan indeks yang dimulai dari 0.

\`\`\`text
const fruits = ["apel", "jeruk", "mangga"];
console.log(fruits[0]);   // "apel"
console.log(fruits.length); // 3
\`\`\`

## Membuat dan Mengubah Array

JavaScript menyediakan method bawaan untuk menambah atau menghapus elemen array:

- \`push(item)\` menambah elemen di akhir array.
- \`pop()\` menghapus elemen terakhir dan mengembalikannya.
- \`shift()\` menghapus elemen pertama dan mengembalikannya.
- \`unshift(item)\` menambah elemen di awal array.

\`\`\`text
const numbers = [];
numbers.push(10);       // [10]
numbers.push(20, 30);   // [10, 20, 30]
numbers.pop();          // [10, 20]
numbers.unshift(5);     // [5, 10, 20]
\`\`\`

## Object Literal

Object menyimpan data sebagai pasangan *key* dan *value*. Key berupa string (atau symbol) dan value bisa berupa tipe apa pun, termasuk fungsi.

\`\`\`text
const user = {
  name: "Budi",
  age: 25,
  isActive: true,
};

console.log(user.name);    // dot notation
console.log(user["age"]);  // bracket notation
\`\`\`

Object sering dipakai untuk mengelompokkan data yang berhubungan, seperti informasi pengguna, konfigurasi, atau data produk.`,
    },
    {
      id: 'sec-05-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-05-js',
        filename: 'arrays-and-objects.js',
        language: 'javascript',
        title: 'JavaScript: Manipulasi Array dan Object',
        code: `const cart = ["laptop", "mouse"];

cart.push("keyboard");
console.log(cart); // ["laptop", "mouse", "keyboard"]

const last = cart.pop();
console.log(last); // "keyboard"
console.log(cart); // ["laptop", "mouse"]

const user = {
  username: "dev_budi",
  email: "budi@example.com",
  greet() {
    return "Halo, " + this.username + "!";
  },
};

console.log(user.username);
console.log(user["email"]);
console.log(user.greet());`,
        explanation:
          'Array cart menunjukkan push dan pop, sedangkan object user menunjukkan dot notation, bracket notation, dan method pada object.',
      },
    },
    {
      id: 'sec-05-intermediate-methods',
      type: 'markdown',
      level: 'intermediate',
      title: 'Method Array, Destructuring, Spread, dan Rest',
      content: `## Method Array yang Sering Dipakai

Method bawaan array membuat manipulasi data lebih ekspresif:

- \`map(fn)\`: membuat array baru dengan hasil pemanggilan fungsi pada setiap elemen.
- \`filter(fn)\`: membuat array baru yang hanya berisi elemen yang lolos uji.
- \`reduce(fn, init)\`: menggabungkan seluruh elemen menjadi satu nilai.
- \`find(fn)\`: mengembalikan elemen pertama yang cocok.
- \`includes(value)\`: memeriksa apakah array memuat nilai tertentu.

## Destructuring Object

Destructuring memungkinkan kita mengekstrak beberapa property object ke variabel sekaligus.

\`\`\`text
const person = { firstName: "Andi", lastName: "Wijaya", age: 28 };
const { firstName, age } = person;
console.log(firstName); // "Andi"
console.log(age);       // 28
\`\`\`

## Spread dan Rest Operator

Operator \`...\` memiliki dua fungsi utama:

- **Spread**: menyebarkan elemen array atau property object.
- **Rest**: mengumpulkan sisa elemen atau parameter ke dalam array.

\`\`\`text
const a = [1, 2];
const b = [...a, 3, 4]; // [1, 2, 3, 4]

const obj1 = { x: 1 };
const obj2 = { ...obj1, y: 2 }; // { x: 1, y: 2 }

const [first, ...rest] = b;
console.log(first); // 1
console.log(rest);  // [2, 3, 4]
\`\`\``,
    },
    {
      id: 'sec-05-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-05-ts',
        filename: 'typed-array-and-object.ts',
        language: 'typescript',
        title: 'TypeScript: Typed Array dan Interface',
        code: `interface Product {
  id: number;
  name: string;
  price: number;
}

const products: Product[] = [
  { id: 1, name: "Pensil", price: 2000 },
  { id: 2, name: "Buku", price: 5000 },
  { id: 3, name: "Penghapus", price: 1500 },
];

const names = products.map((p) => p.name);
console.log(names); // ["Pensil", "Buku", "Penghapus"]

const affordable = products.filter((p) => p.price < 3000);
console.log(affordable);

const total = products.reduce((sum, p) => sum + p.price, 0);
console.log(total); // 8500

const book = products.find((p) => p.name === "Buku");
console.log(book);

const [first, ...rest] = products;
console.log(first.name);
console.log(rest.length);`,
        explanation:
          'Interface Product memastikan setiap object dalam array memiliki id, name, dan price dengan tipe yang sesuai. Method map, filter, reduce, dan find bekerja dengan aman berkat type checking.',
      },
    },
    {
      id: 'sec-05-advanced-immutability',
      type: 'markdown',
      level: 'advanced',
      title: 'Immutability, Shallow Copy, Deep Copy, dan Mapped Types',
      content: `## Immutability pada Array

Fungsi seperti \`map\`, \`filter\`, dan \`slice\` tidak mengubah array asli, melainkan mengembalikan array baru. Sifat ini disebut *immutability* dan membantu mencegah efek samping yang sulit dilacak.

\`\`\`text
const original = [1, 2, 3];
const doubled = original.map((n) => n * 2);

console.log(original); // [1, 2, 3]
console.log(doubled);  // [2, 4, 6]
\`\`\`

## Shallow Copy vs Deep Copy

- **Shallow copy** menyalin array/object paling luar. Perubahan pada object bersarang masih memengaruhi data asli.
- **Deep copy** menyalin seluruh struktur secara rekursif.

\`\`\`text
const a = { items: [1, 2] };
const shallow = { ...a };
shallow.items.push(3);
console.log(a.items); // [1, 2, 3] — ikut berubah

const deep = JSON.parse(JSON.stringify(a));
deep.items.push(4);
console.log(a.items); // [1, 2, 3]
\`\`\`

## Record dan Mapped Types di TypeScript

TypeScript menyediakan utility type \`Record<K, V>\` untuk object dengan key dan value seragam. Mapped types memungkinkan kita membuat tipe baru dari tipe yang sudah ada.

\`\`\`text
type Role = "admin" | "user" | "guest";

const permissions: Record<Role, string[]> = {
  admin: ["read", "write", "delete"],
  user: ["read", "write"],
  guest: ["read"],
};

type Optional<T> = { [K in keyof T]?: T[K] };
\`\`\``,
    },
    {
      id: 'sec-05-go-example',
      type: 'code-example',
      codeExample: {
        id: 'code-05-go',
        filename: 'main.go',
        language: 'go',
        title: 'Go: Slice dan Struct',
        code: `package main

import "fmt"

type Person struct {
  Name string
  Age  int
}

func main() {
  scores := []int{80, 90, 85}
  scores = append(scores, 95)
  fmt.Println(scores)

  // Slice baru dengan copy
  backup := make([]int, len(scores))
  copy(backup, scores)

  p := Person{Name: "Andi", Age: 22}
  fmt.Println(p.Name, p.Age)

  people := []Person{
    {Name: "Andi", Age: 22},
    {Name: "Budi", Age: 24},
  }
  fmt.Println(people)
}`,
        explanation:
          'Go menggunakan slice untuk array dinamis dan struct untuk mengelompokkan field. append menambah elemen, copy menyalin elemen ke slice lain, dan literal struct memudahkan pembuatan data.',
      },
    },
    {
      id: 'sec-05-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Ringkasan:** Array menyimpan data berurutan dan bisa dimanipulasi dengan method seperti push, pop, map, filter, dan reduce. Object menyimpan data sebagai pasangan key-value dan mendukung dot serta bracket notation. Destructuring, spread, dan rest operator membuat kode lebih ringkas. Immutability mencegah perubahan tak terduga, sementara shallow copy dan deep copy perlu dipahami saat bekerja dengan data bersarang. Di TypeScript, Record dan mapped types membantu memodelkan object yang konsisten, sedangkan Go menggunakan slice dan struct untuk kebutuhan serupa.',
    },
  ],
}
