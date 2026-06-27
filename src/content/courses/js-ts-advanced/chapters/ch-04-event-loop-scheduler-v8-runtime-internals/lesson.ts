import type { Lesson } from '@/content/types'

export const ch04Lesson: Lesson = {
  id: 'lesson-ch-04-event-loop-scheduler-v8-runtime-internals',
  estimatedMinutes: 50,
  sections: [
    {
      id: 'sec-04-basic-v8',
      type: 'markdown',
      level: 'basic',
      title: 'Arsitektur V8: AST, Bytecode, dan Machine Code',
      content: `## Dari Kode Sumber ke Eksekusi

V8 adalah mesin JavaScript yang digunakan Chrome dan Node.js. Proses eksekusi kode melalui beberapa tahap:

1. **Parsing**: kode sumber diubah menjadi **AST** (Abstract Syntax Tree).
2. **Ignition interpreter**: AST dikompilasi menjadi bytecode yang lebih ringkas dan dieksekusi.
3. **TurboFan compiler**: fungsi yang sering dipanggil dikompilasi menjadi machine code yang dioptimalkan.
4. **Deoptimization**: jika asumsi optimasi tidak lagi valid, V8 kembali ke bytecode.

\`\`\`javascript
function add(a, b) {
  return a + b;
}

for (let i = 0; i < 100000; i++) {
  add(i, i); // TurboFan akhirnya mengoptimalkan add untuk integer.
}
\`\`\`

## Call Stack dan Heap

- **Call stack**: menyimpan frame fungsi yang sedang dieksekusi, bersifat LIFO.
- **Heap**: menyimpan objek, closure, dan data yang lifetime-nya tidak terikat pada satu pemanggilan fungsi.

Stack overflow terjadi ketika rekursi terlalu dalam atau ada circular call.`,
    },
    {
      id: 'sec-04-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-04-js',
        filename: 'shape-deopt.js',
        language: 'javascript',
        title: 'JavaScript: Hidden Class dan Deoptimasi Shape',
        code: `// V8 membuat hidden class berdasarkan urutan penambahan properti.
// Objek yang dibuat dengan urutan berbeda memiliki shape berbeda.

function createUserMonomorphic(name, age) {
  const user = {};
  user.name = name;
  user.age = age;
  return user;
}

function createUserPolymorphic(name, age, role) {
  const user = {};
  if (role) {
    user.role = role; // menambahkan properti di tengah jalan
  }
  user.name = name;
  user.age = age;
  return user;
}

function sumAges(users) {
  let total = 0;
  for (const user of users) {
    total += user.age;
  }
  return total;
}

const mono = [];
for (let i = 0; i < 100000; i++) {
  mono.push(createUserMonomorphic('user' + i, i));
}

const poly = [];
for (let i = 0; i < 100000; i++) {
  if (i % 2 === 0) {
    poly.push(createUserPolymorphic('user' + i, i, 'admin'));
  } else {
    poly.push(createUserPolymorphic('user' + i, i));
  }
}

console.time('monomorphic');
sumAges(mono);
console.timeEnd('monomorphic');

console.time('polymorphic');
sumAges(poly);
console.timeEnd('polymorphic');`,
        explanation:
          'Akses properti pada objek dengan shape yang konsisten (monomorphic) lebih cepat karena inline cache dapat langsung mengembalikan offset properti. Shape yang bervariasi memaksa V8 melakukan pencarian yang lebih lambat.',
      },
    },
    {
      id: 'sec-04-intermediate-v8',
      type: 'markdown',
      level: 'intermediate',
      title: 'Hidden Classes, Inline Caches, dan Number Representation',
      content: `## Hidden Classes dan Shape Transitions

V8 memberi setiap objek dengan urutan properti yang sama sebuah **hidden class** (atau map). Hidden class menyimpan metadata tentang offset setiap properti. Ketika properti baru ditambahkan, V8 membuat transisi ke hidden class baru.

\`\`\`javascript
const a = {};
a.x = 1; // hidden class A -> hidden class B
a.y = 2; // hidden class B -> hidden class C

const b = {};
b.x = 1; // bisa berbagi hidden class B jika urutan sama
b.y = 2;
\`\`\`

## Inline Caches (ICs)

Inline cache adalah mekanisme yang menyimpan hasil pencarian properti di instruksi bytecode. Tingkat polimorfisme IC:

- **monomorphic**: hanya satu shape yang pernah dilihat, paling cepat.
- **polymorphic**: beberapa shape, V8 menggunakan small jump table.
- **megamorphic**: terlalu banyak shape, V8 menyerah meng-cache dan melakukan lookup lambat.

## Smi vs Heap Number

V8 menyimpan bilangan kecil sebagai **Smi** (small integer) yang disematkan dalam pointer. Bilangan lebih besar atau non-integer menjadi **HeapNumber** yang dialokasikan di heap. Operasi yang mengubah Smi menjadi HeapNumber dapat memicu alokasi memori.`,
    },
    {
      id: 'sec-04-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-04-ts',
        filename: 'monomorphic-benchmark.ts',
        language: 'typescript',
        title: 'TypeScript: Benchmark Akses Properti dengan Tipe Stabil',
        code: `type AdminUser = {
  kind: 'admin';
  name: string;
  age: number;
};

type GuestUser = {
  kind: 'guest';
  name: string;
  age: number;
};

type User = AdminUser | GuestUser;

function createAdmin(name: string, age: number): AdminUser {
  return { kind: 'admin', name, age };
}

function createGuest(name: string, age: number): GuestUser {
  return { kind: 'guest', name, age };
}

function sumAges(users: User[]): number {
  let total = 0;
  for (const user of users) {
    total += user.age; // meskipunion, shape { kind, name, age } stabil
  }
  return total;
}

const admins: AdminUser[] = [];
const guests: GuestUser[] = [];

for (let i = 0; i < 500_000; i++) {
  admins.push(createAdmin('a' + i, i));
  guests.push(createGuest('g' + i, i));
}

console.time('admins');
sumAges(admins);
console.timeEnd('admins');

console.time('guests');
sumAges(guests);
console.timeEnd('guests');

// Meskipun terpisah, setiap array memiliki shape yang stabil,
// sehingga inline cache dapat bekerja optimal.`,
        explanation:
          'Dengan menjaga shape objek tetap stabil dan mengelompokkan objek berdasarkan bentuknya, kita membantu V8 mempertahankan monomorphic inline cache.',
      },
    },
    {
      id: 'sec-04-advanced-eventloop',
      type: 'markdown',
      level: 'advanced',
      title: 'Event Loop, libuv, dan Scheduling',
      content: `## Event Loop di Browser

Browser memiliki event loop yang mengelola:

- **Task queue**: macrotasks seperti setTimeout, setInterval, I/O events.
- **Microtask queue**: Promise callbacks, queueMicrotask, MutationObserver.
- **Render queue**: requestAnimationFrame, style/layout/paint.

Setelah satu macrotask selesai, browser mengosongkan seluruh microtask queue sebelum melanjutkan ke macrotask atau render berikutnya.

## Event Loop di Node.js (libuv)

Node.js menggunakan libuv. Fase event loop:

1. **Timers**: mengeksekusi callback setTimeout dan setInterval yang sudah jatuh tempo.
2. **Pending callbacks**: callback I/O yang tertunda dari fase sebelumnya.
3. **Idle/prepare**: internal libuv.
4. **Poll**: menunggu I/O events dan mengeksekusi callback-nya.
5. **Check**: mengeksekusi callback setImmediate.
6. **Close callbacks**: callback close event seperti socket.on('close').

## process.nextTick vs queueMicrotask vs setImmediate

- <code>process.nextTick</code>: berjalan sebelum fase event loop berikutnya, di luar event loop proper. Penggunaan berlebihan dapat menyebabkan starvation.
- <code>queueMicrotask</code>: menambahkan ke microtask queue, dieksekusi setelah call stack kosong.
- <code>setImmediate</code>: berjalan pada fase check setelah poll.

## Scheduler API

Di browser modern, <code>scheduler.postTask</code> dan <code>scheduler.yield</code> memungkinkan pengembang memberi hint prioritas tugas (user-blocking, user-visible, background).

\`\`\`javascript
scheduler.postTask(() => console.log('background work'), { priority: 'background' });
\`\`\`

Penggunaan yang tepat membantu mencegah long task yang memblokir interaksi pengguna.`,
    },
    {
      id: 'sec-04-go-example',
      type: 'code-example',
      codeExample: {
        id: 'code-04-go',
        filename: 'interface_dispatch.go',
        language: 'go',
        title: 'Go: Perbandingan Interface Dispatch dengan V8 IC',
        code: `package main

import (
\t"fmt"
\t"time"
)

type Greeter interface {
\tGreet() string
}

type English struct{}

func (English) Greet() string { return "hello" }

type Indonesian struct{}

func (Indonesian) Greet() string { return "halo" }

func sumGreetings(greeters []Greeter) string {
\tvar result string
\tfor _, g := range greeters {
\t\tresult += g.Greet()
\t}
\treturn result
}

func main() {
\tg := make([]Greeter, 1_000_000)
\tfor i := range g {
\t\tif i%2 == 0 {
\t\t\tg[i] = English{}
\t\t} else {
\t\t\tg[i] = Indonesian{}
\t\t}
\t}

\tstart := time.Now()
\tsumGreetings(g)
\tfmt.Println("elapsed:", time.Since(start))
}

// Go menggunakan itable untuk interface dispatch.
// Campuran tipe konkret memaksa indirect call, mirip dengan polymorphic IC di V8.`,
        explanation:
          'Go menyimpan pointer ke itable di dalam interface value. Jika slice berisi banyak tipe konkret berbeda, dispatch menjadi tidak langsung dan lebih lambat dibandingkan monomorphic call.',
      },
    },
    {
      id: 'sec-04-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Info:** V8 mengoptimalkan kode yang stabil dan konsisten. Pertahankan shape objek, hindari penambahan properti secara dinamis di hot path, dan kelompokkan objek berdasarkan bentuknya. Di event loop, prioritaskan microtask dengan bijak dan manfaatkan Scheduler API untuk memecah long task.',
    },
  ],
}
