import type { Lesson } from '@/content/types'

export const ch06Lesson: Lesson = {
  id: 'lesson-ch-06-memory-model-garbage-collection-js',
  estimatedMinutes: 45,
  sections: [
    {
      id: 'sec-06-basic-memory',
      type: 'markdown',
      level: 'basic',
      title: 'Stack vs Heap dan Memory Layout di V8',
      content: `## Stack

Stack menyimpan data dengan lifetime terikat pada frame fungsi: primitive lokal, parameter, dan return address. Alokasi dan dealokasi stack sangat cepat karena hanya memindahkan pointer.

\`\`\`javascript
function add(a, b) {
  const result = a + b; // result ada di stack frame add
  return result;
}
add(2, 3);
\`\`\`

## Heap

Heap menyimpan objek, closure, dan data yang lifetime-nya tidak terikat pada satu pemanggilan. Semua objek JavaScript dialokasikan di heap.

\`\`\`javascript
function createUser() {
  return { name: 'Budi' }; // objek dialokasikan di heap
}
\`\`\`

## Value vs Reference

Primitive (string, number, boolean, null, undefined, symbol, bigint) disalin by value. Objek disalin by reference.

## Memory Layout Objek di V8

Objek V8 terdiri dari header, pointer ke hidden class (map), dan payload properti. Properti yang ditambahkan dengan urutan yang sama memiliki offset yang sama, sehingga aksesnya cepat. Jika properti dihapus atau ditambahkan dengan urutan tidak konsisten, objek beralih ke dictionary mode.`,
    },
    {
      id: 'sec-06-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-06-js',
        filename: 'closure-cycle.js',
        language: 'javascript',
        title: 'JavaScript: Closure Cycle yang Menyebabkan Memory Leak',
        code: `function createLeakPair() {
  const a = {};
  const b = {};

  // Siklus referensi: a -> b -> a
  a.ref = b;
  b.ref = a;

  return function getA() {
    return a;
  };
}

const leaks = [];
for (let i = 0; i < 100000; i++) {
  leaks.push(createLeakPair());
}

// Jika closure disimpan dan tidak pernah dibersihkan,
// objek a dan b tidak bisa dikoleksi GC meskipun tidak lagi dibutuhkan.

// Solusi: batalkan referensi saat tidak diperlukan.
leaks.length = 0;

console.log('Siklus referensi telah dihapus.');`,
        explanation:
          'Siklus referensi antara objek yang masih dapat dijangkau dari closure mencegah garbage collector membebaskan memori. Memutuskan referensi atau menghapus closure membantu GC.',
      },
    },
    {
      id: 'sec-06-intermediate-gc',
      type: 'markdown',
      level: 'intermediate',
      title: 'Generational Garbage Collection dan Orinoco',
      content: `## Generational Hypothesis

Mayoritas objek mati muda. V8 memanfaatkan ini dengan membagi heap menjadi:

- **New Space**: objek baru. Kecil, sering dikumpulkan dengan algoritma **Scavenge** yang cepat.
- **Old Space**: objek yang bertahan beberapa kali Scavenge dipromosikan ke Old Space. Dikumpulkan dengan **Mark-and-Sweep** yang lebih lambat tetapi jarang.

## Scavenge

Scavenge adalah algoritma copy-collection. Objek hidup di New Space disalin ke To-space, lalu From-space dibersihkan sekaligus. Proses ini cepat karena New Space kecil.

## Mark-and-Sweep

Pada Old Space, GC melakukan:

1. **Mark**: traversal dari root (global object, stack, dll.) menandai objek yang masih dapat dijangkau.
2. **Sweep**: objek yang tidak tertandai dikembalikan ke free list.

## Orinoco

Orinoco adalah project GC V8 modern yang memperkenalkan:

- **Parallel Marking**: beberapa thread worker menandai objek secara paralel.
- **Incremental and Concurrent GC**: GC bekerja secara bertahap/concurrent untuk mengurangi jank.
- **Write Barriers**: melacak perubahan referensi selama concurrent marking agar tidak kehilangan objek hidup.

## WeakMap dan WeakSet

Key dari WeakMap/WeakSet harus berupa objek dan tidak mencegah GC. Ketika key tidak lagi direferensi di tempat lain, entry di WeakMap dapat dihapus oleh GC.`,
    },
    {
      id: 'sec-06-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-06-ts',
        filename: 'weak-cache.ts',
        language: 'typescript',
        title: 'TypeScript: Cache dengan WeakRef dan FinalizationRegistry',
        code: `class WeakObjectCache<T extends object, V> {
  private cache = new WeakMap<T, WeakRef<V>>();
  private finalizer = new FinalizationRegistry<V>((key) => {
    console.log(\`Cleaned up value for \${String(key)}\`);
  });

  set(key: T, value: V): void {
    this.cache.set(key, new WeakRef(value));
    this.finalizer.register(value, 'cached-value');
  }

  get(key: T): V | undefined {
    const ref = this.cache.get(key);
    return ref ? ref.deref() : undefined;
  }
}

interface User {
  id: number;
}

const userCache = new WeakObjectCache<User, string>();

function processUser(user: User) {
  const cached = userCache.get(user);
  if (cached) return cached;
  const result = \`processed-\${user.id}\`;
  userCache.set(user, result);
  return result;
}

let user: User | null = { id: 1 };
console.log(processUser(user));
user = null;
// Setelah user tidak lagi direferensi, entry cache dapat dibersihkan GC.`,
        explanation:
          'WeakMap tidak mencegah key-nya dikoleksi GC. WeakRef memungkinkan kita memegang referensi lemah ke value, dan FinalizationRegistry menjalankan callback saat objek dikoleksi.',
      },
    },
    {
      id: 'sec-06-advanced-memory',
      type: 'markdown',
      level: 'advanced',
      title: 'Memory Leak Root-Cause Analysis dan Heap Profiling',
      content: `## Pola Memory Leak Umum

1. **Global variables**: lupa deklarasi <code>var</code>/<code>let</code>/<code>const</code> menyebabkan property global.
2. **Timers dan callbacks**: setInterval atau listener yang tidak di-clear.
3. **Detached DOM nodes**: elemen DOM yang dihapus dari tree tetapi masih direferensi JavaScript.
4. **Closure over large objects**: closure menyimpan referensi ke objek besar yang seharusnya tidak diperlukan.
5. **Cache tanpa batas**: cache yang terus bertambah tanpa eviction policy.

## Heap Snapshot

Chrome DevTools Memory panel menyediakan heap snapshot. Dengan snapshot, kita dapat:

- Melihat objek yang paling banyak memakan memori.
- Menemukan retainers yang menjaga objek tetap hidup.
- Membandingkan snapshot sebelum dan sesudah operasi untuk mendeteksi leak.

## Detached DOM Tree

Ketika elemen DOM dihapus tetapi masih direferensi oleh JavaScript, elemen tersebut menjadi detached. Snapshot akan menunjukkan objek detached dengan retainer dari kode aplikasi.

## Best Practices

- Gunakan WeakMap/WeakSet untuk metadata sementara.
- Bersihkan timer, listener, dan subscription saat komponen dihancurkan.
- Hindari menyimpan data besar di closure jika tidak perlu.
- Tetapkan batas ukuran cache dan gunakan LRU eviction.
- Profile memori secara berkala, terutama setelah perubahan fitur besar.`,
    },
    {
      id: 'sec-06-go-example',
      type: 'code-example',
      codeExample: {
        id: 'code-06-go',
        filename: 'gc_pressure.go',
        language: 'go',
        title: 'Go: Benchmark Tekanan GC dengan Alokasi Berulang',
        code: `package main

import (
\t"fmt"
\t"runtime"
\t"time"
)

func allocateBuffers(n int) [][]byte {
\tbuffers := make([][]byte, 0, n)
\tfor i := 0; i < n; i++ {
\t\tbuffers = append(buffers, make([]byte, 1024))
\t}
\treturn buffers
}

func main() {
\tvar m1, m2 runtime.MemStats
\truntime.GC()
\truntime.ReadMemStats(&m1)

\tstart := time.Now()
\tfor i := 0; i < 1000; i++ {
\t\tbuffers := allocateBuffers(1000)
\t\t_ = buffers
\t}
\telapsed := time.Since(start)

\truntime.GC()
\truntime.ReadMemStats(&m2)

\tfmt.Printf("elapsed: %v\\n", elapsed)
\tfmt.Printf("GC cycles: %d\\n", m2.NumGC-m1.NumGC)
\tfmt.Printf("Heap alloc: %d KB\\n", m2.HeapAlloc/1024)
}

// Di Go, kita dapat membaca MemStats dan memaksa GC untuk mengukur pressure.
// Di JavaScript, pengukuran serupa dilakukan dengan DevTools atau --expose-gc.`,
        explanation:
          'Go menyediakan runtime.MemStats untuk observasi alokasi dan GC. Memaksa GC sebelum dan sesudah benchmark membantu mengukur tekanan memori. JavaScript memiliki tooling serupa di DevTools dan flag Node.js khusus.',
      },
    },
    {
      id: 'sec-06-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Info:** Garbage collection tidak menggantikan manajemen memori yang disengaja. Gunakan WeakMap/WeakRef untuk metadata, bersihkan subscription/timer, dan lakukan heap profiling secara rutin. Di V8, hindari dictionary mode dan pertahankan shape objek untuk mengurangi overhead memori.',
    },
  ],
}
