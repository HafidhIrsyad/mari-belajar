import type { Lesson } from '@/content/types'

export const ch07Lesson: Lesson = {
  id: 'lesson-ch-07-functional-programming-patterns',
  estimatedMinutes: 40,
  sections: [
    {
      id: 'sec-07-basic-fp',
      type: 'markdown',
      level: 'basic',
      title: 'Pure Functions, Immutability, dan Higher-Order Functions',
      content: `## Pure Functions

Pure function memiliki dua karakteristik:

1. **Deterministik**: untuk input yang sama, output selalu sama.
2. **Tanpa side effect**: tidak mengubah state eksternal, tidak melakukan I/O, dan tidak mutasi argument.

\`\`\`javascript
// pure
function add(a, b) {
  return a + b;
}

// impure karena membaca state eksternal
let counter = 0;
function increment() {
  return ++counter;
}
\`\`\`

## Immutability

Immutability berarti data tidak diubah setelah dibuat. Alih-alih \`push\`, gunakan \`concat\` atau spread operator. Alih-alih \`obj.x = 5\`, buat object baru.

\`\`\`javascript
const numbers = [1, 2, 3];
const doubled = numbers.map((n) => n * 2); // [2, 4, 6]
// numbers tetap [1, 2, 3]
\`\`\`

## Higher-Order Functions

Higher-order function (HOF) adalah fungsi yang menerima fungsi sebagai argumen atau mengembalikan fungsi.

\`\`\`javascript
const doubled = numbers.map((n) => n * 2);
const adults = users.filter((u) => u.age >= 18);
const total = prices.reduce((sum, p) => sum + p, 0);
\`\`\`

\`map\`, \`filter\`, dan \`reduce\` adalah HOF bawaan yang sangat powerful untuk transformasi data.`,
    },
    {
      id: 'sec-07-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-07-js',
        filename: 'pipeline.js',
        language: 'javascript',
        title: 'JavaScript: Data Pipeline dengan map/filter/reduce',
        code: `const orders = [
  { id: 1, status: 'completed', amount: 120 },
  { id: 2, status: 'pending', amount: 80 },
  { id: 3, status: 'completed', amount: 200 },
  { id: 4, status: 'cancelled', amount: 50 },
];

const totalCompleted = orders
  .filter((order) => order.status === 'completed')
  .map((order) => order.amount)
  .reduce((sum, amount) => sum + amount, 0);

console.log(totalCompleted); // 320

// Higher-order function: membuat validator
function createMinValidator(min) {
  return (value) => value >= min;
}

const isAdult = createMinValidator(18);
console.log([15, 20, 30].filter(isAdult)); // [20, 30]`,
        explanation:
          'Pipeline filter-map-reduce membaca seperti kalimat bahasa Inggris: ambil order completed, ambil amount-nya, lalu jumlahkan. createMinValidator adalah HOF yang mengembalikan fungsi.',
      },
    },
    {
      id: 'sec-07-intermediate-fp',
      type: 'markdown',
      level: 'intermediate',
      title: 'Closures, Currying, Partial Application, dan Composition',
      content: `## Closures

Closure terjadi ketika fungsi mengingat scope tempat ia dideklarasikan, bahkan setelah scope tersebut selesai dieksekusi. Closure sering digunakan untuk encapsulation dan factory function.

\`\`\`javascript
function createCounter() {
  let count = 0;
  return {
    increment: () => ++count,
    decrement: () => --count,
    get: () => count,
  };
}
\`\`\`

## Currying

Currying mengubah fungsi dengan banyak argumen menjadi serangkaian fungsi dengan satu argumen.

\`\`\`javascript
const add = (a) => (b) => a + b;
const addFive = add(5);
console.log(addFive(3)); // 8
\`\`\`

## Partial Application

Partial application membuat fungsi baru dengan sebagian argumen sudah terisi.

\`\`\`javascript
function fetchAPI(baseURL, endpoint) {
  return fetch(baseURL + endpoint);
}
const fetchFromApi = (endpoint) => fetchAPI('https://api.example.com', endpoint);
\`\`\`

## Composition

Composition menyusun fungsi kecil menjadi fungsi besar. Output dari satu fungsi menjadi input fungsi berikutnya.

\`\`\`javascript
const compose = (...fns) => (x) => fns.reduceRight((v, f) => f(v), x);
const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);
\`\`\`

\`pipe\` lebih alami untuk pembacaan kiri-ke-kanan, mirip dengan pipeline UNIX.`,
    },
    {
      id: 'sec-07-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-07-ts',
        filename: 'fp.ts',
        language: 'typescript',
        title: 'TypeScript: Typed Pipe Helper',
        code: `type Fn<T, R> = (arg: T) => R;

function pipe<T>(value: T): T;
function pipe<T, A>(value: T, fn1: Fn<T, A>): A;
function pipe<T, A, B>(value: T, fn1: Fn<T, A>, fn2: Fn<A, B>): B;
function pipe<T, A, B, C>(
  value: T,
  fn1: Fn<T, A>,
  fn2: Fn<A, B>,
  fn3: Fn<B, C>
): C;
function pipe(value: unknown, ...fns: Fn<unknown, unknown>[]): unknown {
  return fns.reduce((acc, fn) => fn(acc), value);
}

const toUpper = (s: string) => s.toUpperCase();
const splitWords = (s: string) => s.split(' ');
const countWords = (words: string[]) => words.length;

const wordCount = pipe('hello world', toUpper, splitWords, countWords);
console.log(wordCount); // 2

// Curried dengan generic
function multiply(a: number) {
  return (b: number) => a * b;
}
const triple = multiply(3);
console.log([1, 2, 3].map(triple)); // [3, 6, 9]`,
        explanation:
          'Overloaded signatures dari pipe memastikan tipe berubah secara benar di setiap langkah pipeline. Currying menghasilkan fungsi spesifik seperti triple dari fungsi umum multiply.',
      },
    },
    {
      id: 'sec-07-advanced-fp',
      type: 'markdown',
      level: 'advanced',
      title: 'Functors, Monads, Lazy Evaluation, dan Transducers',
      content: `## Functor

Functor adalah struktur data yang memiliki method \`map\`. \`map\` menerapkan fungsi ke nilai di dalam struktur tanpa mengubah struktur itu sendiri. Array adalah functor paling umum di JavaScript.

\`\`\`javascript
const doubled = [1, 2, 3].map((x) => x * 2);
\`\`\`

## Monad

Monad adalah abstraction yang memungkinkan komposisi operasi yang membawa context, seperti \`Promise\` atau \`Array\`. Promise adalah monad karena memiliki \`then\` (chain/bind) dan \`Promise.resolve\` (unit/return).

\`\`\`javascript
Promise.resolve(5)
  .then((x) => x * 2)
  .then((x) => x + 1);
\`\`\`

Memahami monad membantu kita merancang API yang aman untuk operasi berantai yang mungkin gagal atau berjalan asynchronous.

## Lazy Evaluation

Lazy evaluation menunda komputasi sampai hasil benar-benar dibutuhkan. Generator function di JavaScript mendukung lazy sequences.

\`\`\`javascript
function* naturals() {
  let n = 1;
  while (true) {
    yield n++;
  }
}
\`\`\`

## Transducers

Transducers adalah composable transformation yang tidak bergantung pada struktur data. Mereka memisahkan logika transformasi (map, filter) dari container, sehingga pipeline yang sama bisa digunakan untuk array, stream, atau observable.

Pendekatan FP membuat kode lebih mudah diuji karena fungsi-fungsinya kecil, pure, dan terpisah.`,
    },
    {
      id: 'sec-07-go-example',
      type: 'code-example',
      codeExample: {
        id: 'code-07-go',
        filename: 'fp.go',
        language: 'go',
        title: 'Go: Higher-Order Functions dan Closures',
        code: `package main

import (
	"fmt"
	"strings"
)

func filter[T any](items []T, predicate func(T) bool) []T {
	var result []T
	for _, item := range items {
		if predicate(item) {
			result = append(result, item)
		}
	}
	return result
}

func mapStrings(items []string, transform func(string) string) []string {
	result := make([]string, len(items))
	for i, item := range items {
		result[i] = transform(item)
	}
	return result
}

func main() {
	words := []string{"hello", "world", "go"}

	longWords := filter(words, func(s string) bool {
		return len(s) > 2
	})

	upperWords := mapStrings(longWords, strings.ToUpper)
	fmt.Println(upperWords) // [HELLO WORLD]
}`,
        explanation:
          'Go 1.18+ generics memungkinkan filter generic, sedangkan map pada slice masih memerlukan tipe spesifik karena Go tidak memiliki generic map built-in. Closure digunakan untuk predicate.',
      },
    },
    {
      id: 'sec-07-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Kesimpulan:** Functional programming menekankan pure functions, immutability, dan composition. Gunakan map/filter/reduce untuk transformasi data, closure dan currying untuk reuse, dan pahami functor/monad untuk desain API berantai.',
    },
  ],
}
