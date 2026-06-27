import type { Lesson } from '@/content/types'

export const ch04Lesson: Lesson = {
  id: 'lesson-ch-04-functions-scope-closure',
  estimatedMinutes: 15,
  sections: [
    {
      id: 'sec-04-basic-functions',
      type: 'markdown',
      level: 'basic',
      title: 'Fungsi di JavaScript',
      content: `## Fungsi sebagai Blok Kode Reusable

**Fungsi** adalah blok kode yang dirancang untuk melakukan tugas tertentu dan bisa dipanggil berulang kali. Di JavaScript, fungsi adalah *first-class citizen*: bisa disimpan dalam variabel, dipassing sebagai argumen, dan dikembalikan dari fungsi lain.

## Function Declaration

Cara paling klasik mendefinisikan fungsi:

\`\`\`javascript
function greet(name) {
  return \`Halo, \${name}!\`;
}
\`\`\`

Function declaration memiliki karakteristik **hoisting**: fungsi bisa dipanggil sebelum baris deklarasinya ditulis.

## Function Expression

Fungsi juga bisa disimpan ke dalam variabel:

\`\`\`javascript
const sayHello = function(name) {
  return \`Halo, \${name}!\`;
};
\`\`\`

Function expression tidak dihoisting secara penuh, sehingga variabel harus sudah dideklarasikan sebelum dipanggil.

## Arrow Function

Arrow function memberikan sintaks yang lebih ringkas:

\`\`\`javascript
const greet = (name) => \`Halo, \${name}!\`;
\`\`\`

Jika hanya memiliki satu parameter, tanda kurung bisa dihilangkan. Jika hanya satu ekspresi, kurung kurawal dan \`return\` bisa dihilangkan karena hasilnya otomatis dikembalikan.

## Parameter dan Return Value

Parameter adalah input yang diterima fungsi, sedangkan return value adalah output yang dikembalikan.

\`\`\`javascript
function add(a, b) {
  return a + b;
}

console.log(add(3, 5)); // 8
\`\`\`

Fungsi tanpa \`return\` akan mengembalikan \`undefined\`.

## Default Parameter

Default parameter memungkinkan kita memberi nilai awal jika argumen tidak disediakan:

\`\`\`javascript
function greet(name = "Pengguna") {
  return \`Halo, \${name}!\`;
}

console.log(greet());       // "Halo, Pengguna!"
console.log(greet("Andi")); // "Halo, Andi!"
\`\`\`

Default parameter sangat berguna untuk menghindari pengecekan manual terhadap \`undefined\`.`,
    },
    {
      id: 'sec-04-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-04-js',
        filename: 'arrow-and-closure.js',
        language: 'javascript',
        title: 'JavaScript: Arrow Function dan Closure',
        code: `// Arrow function dengan satu parameter
const square = x => x * x;
console.log(square(5)); // 25

// Arrow function dengan beberapa parameter
const sum = (a, b) => a + b;
console.log(sum(3, 7)); // 10

// Closure: fungsi dalam fungsi yang mengingat lingkungannya
function createCounter() {
  let count = 0;

  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count,
  };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.getCount());  // 2
console.log(counter.decrement()); // 1`,
        explanation:
          'Arrow function mempersingkat sintaks fungsi. Closure terbentuk ketika fungsi dalam mengakses variabel dari fungsi luarnya, meskipun fungsi luar sudah selesai dieksekusi.',
      },
    },
    {
      id: 'sec-04-intermediate-scope',
      type: 'markdown',
      level: 'intermediate',
      title: 'Scope, Hoisting, dan Closure',
      content: `## Scope: Global, Function, dan Block

**Scope** menentukan di mana variabel dan fungsi bisa diakses dalam kode.

### Global Scope

Variabel yang dideklarasikan di luar fungsi atau block berada di global scope dan bisa diakses dari mana saja.

\`\`\`javascript
const appName = "BelajarJS";

function showAppName() {
  console.log(appName); // bisa mengakses variabel global
}
\`\`\`

Di browser, global scope biasanya melekat pada objek \`window\`. Di Node.js, global scope berbeda tergantung module system.

### Function Scope

Variabel yang dideklarasikan di dalam fungsi hanya bisa diakses di dalam fungsi tersebut.

\`\`\`javascript
function secret() {
  const password = "rahasia";
  console.log(password);
}

secret(); // "rahasia"
// console.log(password); // ReferenceError!
\`\`\`

### Block Scope

Dengan \`let\` dan \`const\`, variabel terikat pada block yang dibatasi kurung kurawal \`{}\`.

\`\`\`javascript
if (true) {
  const blockScoped = "hanya di sini";
  console.log(blockScoped);
}
// console.log(blockScoped); // ReferenceError!
\`\`\`

Variabel yang dideklarasikan dengan \`var\` tidak memiliki block scope, melainkan function scope.

## Hoisting

**Hoisting** adalah perilaku JavaScript yang mengangkat deklarasi variabel dan fungsi ke atas scope-nya sebelum kode dieksekusi.

Function declaration dihoisting secara utuh:

\`\`\`javascript
sayHi(); // "Hi!"

function sayHi() {
  console.log("Hi!");
}
\`\`\`

Variabel dengan \`var\` dihoisting tetapi hanya deklarasinya, nilainya tetap \`undefined\` sampai baris assignment tercapai:

\`\`\`javascript
console.log(message); // undefined
var message = "Halo";
\`\`\`

Untuk \`let\` dan \`const\`, deklarasi juga diangkat tetapi tidak diinisialisasi, sehingga mengaksesnya sebelum deklarasi menyebabkan ReferenceError.

## Closure

**Closure** terjadi ketika fungsi dalam mengingat scope fungsi luarnya bahkan setelah fungsi luar selesai dieksekusi.

\`\`\`javascript
function makeMultiplier(factor) {
  return function(number) {
    return number * factor;
  };
}

const triple = makeMultiplier(3);
console.log(triple(5)); // 15
\`\`\`

Closure berguna untuk membuat private state, factory function, dan event handler yang mengingat konfigurasi tertentu.`,
    },
    {
      id: 'sec-04-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-04-ts',
        filename: 'typed-functions.ts',
        language: 'typescript',
        title: 'TypeScript: Typed Functions dan Generics Dasar',
        code: `// Tipe eksplisit untuk parameter dan return value
function add(a: number, b: number): number {
  return a + b;
}

// Arrow function dengan tipe
const multiply = (x: number, y: number): number => x * y;

// Default parameter dengan tipe
function greet(name: string = "Pengguna"): string {
  return \`Halo, \${name}!\`;
}

// Tipe fungsi sebagai tipe data
type Operation = (a: number, b: number) => number;

const subtract: Operation = (a, b) => a - b;

// Generic function dasar
function identity<T>(value: T): T {
  return value;
}

console.log(identity<number>(42));   // 42
console.log(identity<string>("Halo")); // "Halo"

// Generic dengan constraint
function logLength<T extends { length: number }>(item: T): void {
  console.log(item.length);
}

logLength("Hello"); // 5
logLength([1, 2, 3]); // 3`,
        explanation:
          'TypeScript memungkinkan anotasi tipe pada parameter dan return value, tipe fungsi kustom, serta generic function untuk membuat kode yang fleksibel namun tetap type-safe.',
      },
    },
    {
      id: 'sec-04-advanced-patterns',
      type: 'markdown',
      level: 'advanced',
      title: 'Higher-Order Function, Callback, dan IIFE',
      content: `## Higher-Order Function

**Higher-order function** adalah fungsi yang menerima fungsi lain sebagai argumen atau mengembalikan fungsi lain.

Contoh paling umum adalah method array seperti \`map\`, \`filter\`, dan \`reduce\`:

\`\`\`javascript
const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map(n => n * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

const evens = numbers.filter(n => n % 2 === 0);
console.log(evens); // [2, 4]
\`\`\`

Kita juga bisa membuat higher-order function sendiri:

\`\`\`javascript
function withLogging(fn) {
  return function(...args) {
    console.log("Memanggil dengan argumen:", args);
    return fn(...args);
  };
}

const loggedAdd = withLogging(add);
console.log(loggedAdd(2, 3)); // 5
\`\`\`

## Callback Function

**Callback** adalah fungsi yang dipassing ke fungsi lain dan dieksekusi di kemudian waktu. Callback sangat umum di JavaScript, terutama untuk event handling dan asynchronous programming.

\`\`\`javascript
function fetchData(callback) {
  setTimeout(() => {
    callback("data siap");
  }, 1000);
}

fetchData(message => {
  console.log(message); // "data siap" setelah 1 detik
});
\`\`\`

Penting untuk memahami callback agar bisa memahami Promise dan async/await di bab selanjutnya.

## IIFE (Immediately Invoked Function Expression)

**IIFE** adalah fungsi yang langsung dipanggil setelah didefinisikan. Pola ini sering dipakai untuk membuat private scope dan menghindari polusi global scope.

\`\`\`javascript
const app = (function() {
  const secret = "rahasia";

  return {
    getSecret: function() {
      return secret;
    }
  };
})();

console.log(app.getSecret()); // "rahasia"
\`\`\`

Meskipun IIFE kurang populer di era module ES, memahami konsepnya membantu memahami closure dan encapsulation.`,
    },
    {
      id: 'sec-04-go-example',
      type: 'code-example',
      codeExample: {
        id: 'code-04-go',
        filename: 'main.go',
        language: 'go',
        title: 'Go: Function dan Multiple Return Values',
        code: `package main

import "fmt"

// Function sederhana dengan parameter dan return value
func add(a int, b int) int {
	return a + b
}

// Named return value
func rectangle(width, height int) (area int) {
	area = width * height
	return
}

// Multiple return values
func divide(a, b float64) (float64, error) {
	if b == 0 {
		return 0, fmt.Errorf("tidak bisa membagi dengan nol")
	}
	return a / b, nil
}

// Higher-order function: menerima fungsi sebagai parameter
func apply(a, b int, operation func(int, int) int) int {
	return operation(a, b)
}

func main() {
	fmt.Println(add(3, 5)) // 8

	fmt.Println(rectangle(4, 5)) // 20

	result, err := divide(10, 2)
	if err != nil {
		fmt.Println("Error:", err)
	} else {
		fmt.Println("Hasil:", result) // 5
	}

	// Closure di Go
	multiplier := func(factor int) func(int) int {
		return func(number int) int {
			return number * factor
		}
	}

	triple := multiplier(3)
	fmt.Println(triple(5)) // 15

	fmt.Println(apply(6, 7, add)) // 13
}`,
        explanation:
          'Go mendukung multiple return values, named return, first-class function, dan closure. Error handling dilakukan secara eksplisit dengan mengembalikan error sebagai return value kedua.',
      },
    },
    {
      id: 'sec-04-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Ringkasan:** Fungsi di JavaScript bisa dideklarasikan dengan declaration, expression, atau arrow function. Scope menentukan aksesibilitas variabel: global, function, dan block. Hoisting mengangkat deklarasi sebelum eksekusi, sementara closure memungkinkan fungsi mengingat lingkungannya. Higher-order function, callback, dan IIFE adalah pola lanjutan yang membuat kode lebih modular. Go menawarkan function dengan multiple return values dan error handling yang eksplisit.',
    },
  ],
}
