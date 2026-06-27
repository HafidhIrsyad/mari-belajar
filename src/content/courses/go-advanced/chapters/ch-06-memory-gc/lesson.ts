import type { Lesson } from '@/content/types'

export const ch06Lesson: Lesson = {
  id: 'lesson-ch-06-memory-gc',
  estimatedMinutes: 45,
  sections: [
    {
      id: 'sec-go-adv-06-basic',
      type: 'markdown',
      level: 'basic',
      title: 'Stack vs Heap dan Escape Analysis',
      content: `## Stack vs Heap

Di Go, variabel bisa dialokasikan di **stack** atau **heap**:
- **Stack**: alokasi cepat, otomatis dibersihkan saat fungsi selesai. Cocok untuk variabel lokal berumur pendek.
- **Heap**: digunakan untuk data yang harus bertahan setelah fungsi selesai. Dikelola oleh garbage collector.

## Escape Analysis

**Escape analysis** adalah proses compiler menentukan apakah variabel bisa tinggal di stack atau harus "escape" ke heap. Variabel escape ke heap jika:
- Dikembalikan sebagai pointer dari fungsi.
- Disimpan di variabel global.
- Dikirim ke channel atau goroutine yang berumur lebih panjang.
- Ukuran terlalu besar untuk stack.

Kita bisa melihat hasil escape analysis dengan:

\`\`\`text
go build -gcflags="-m"
\`\`\``,
    },
    {
      id: 'sec-go-adv-06-js',
      type: 'code-example',
      codeExample: {
        id: 'code-go-adv-06-js',
        filename: 'closure-leak.js',
        language: 'javascript',
        title: 'JavaScript: Memory Leak karena Closure dan Timer',
        code: `const cache = new Map();

function trackUser(id) {
  const largeData = new Array(1_000_000).fill(id);
  cache.set(id, largeData);
}

setInterval(() => {
  trackUser(Date.now());
}, 1000);

// Data di cache tidak pernah dibersihkan -> memory leak.`,
        explanation:
          'Di JavaScript, menyimpan data di Map atau closure tanpa batas bisa menyebabkan memory leak. Go memiliki masalah serupa jika menyimpan pointer di slice/map global tanpa batas.',
      },
    },
    {
      id: 'sec-go-adv-06-intermediate',
      type: 'markdown',
      level: 'intermediate',
      title: 'pprof Heap Profile dan Memory Leak Detection',
      content: `## pprof Heap Profile

Go menyediakan package \`runtime/pprof\` dan \`net/http/pprof\` untuk profiling memori. Heap profile menunjukkan:
- **alloc_objects/alloc_space**: total alokasi sejak program dimulai.
- **inuse_objects/inuse_space**: objek yang masih ada di heap saat ini.

Untuk mengaktifkan profiling via HTTP:

\`\`\`go
import _ "net/http/pprof"
\`\`\`

Kemudian buka \`http://localhost:6060/debug/pprof/heap\`.

## Membaca Heap Profile

Gunakan \`go tool pprof\`:

\`\`\`text
go tool pprof http://localhost:6060/debug/pprof/heap
go tool pprof -png heap.out > heap.png
\`\`\`

Perhatikan fungsi dengan inuse_space tinggi yang tidak turun seiring waktu; itu indikasi memory leak.

## Pola Memory Leak di Go

- Subscriptions/goroutine yang tidak pernah berhenti.
- Cache/map global yang terus bertambah.
- Channel yang tidak pernah ditutup sehingga goroutine menunggu.
- Pointer yang disimpan di slice backing array setelah slice di-shrink.`,
    },
    {
      id: 'sec-go-adv-06-ts',
      type: 'code-example',
      codeExample: {
        id: 'code-go-adv-06-ts',
        filename: 'weakref-cache.ts',
        language: 'typescript',
        title: 'TypeScript: WeakRef untuk Cache yang Bisa Dibersihkan',
        code: `class WeakCache<K extends object, V> {
  private store = new WeakMap<K, V>();

  set(key: K, value: V) {
    this.store.set(key, value);
  }

  get(key: K): V | undefined {
    return this.store.get(key);
  }
}

class User {
  constructor(public id: number) {}
}

const cache = new WeakCache<User, string>();
{
  const user = new User(1);
  cache.set(user, 'Budi');
  console.log(cache.get(user));
}
// Setelah user tidak lagi direferensi, entry cache bisa dibersihkan GC.`,
        explanation:
          'WeakMap/WeakRef memungkinkan key yang tidak lagi direferensi dibersihkan oleh GC. Di Go, pattern serupa bisa dicapai dengan object pooling atau dengan memastikan tidak ada referensi tak terbatas.',
      },
    },
    {
      id: 'sec-go-adv-06-advanced',
      type: 'markdown',
      level: 'advanced',
      title: 'GC Pacing, GOGC, GOMEMLIMIT, dan Arena',
      content: `## GC Pacing

Go menggunakan **concurrent mark-and-sweep** GC. **GC pacing** menentukan kapan GC berikutnya dijalankan berdasarkan rasio antara live heap dan heap yang baru dialokasikan.

## GOGC

\`GOGC\` mengontrol target rasio ini:
- \`GOGC=100\` (default): GC berjalan ketika heap baru tumbuh 100% dari live heap.
- \`GOGC=off\`: GC dinonaktifkan (jarang digunakan, berisiko OOM).
- \`GOGC=50\`: GC lebih sering, penggunaan CPU lebih tinggi, latency lebih rendah.
- \`GOGC=200\`: GC lebih jarang, penggunaan memori lebih tinggi.

## GOMEMLIMIT

\`GOMEMLIMIT\` (Go 1.19+) menetapkan batas memori total yang bisa digunakan Go runtime. Jika memori mendekati batas, GC akan lebih agresif untuk mencegah OOM.

\`\`\`text
GOMEMLIMIT=1GiB
\`\`\`

Ini sangat berguna untuk container dengan batas memori yang ketat.

## sync.Pool

\`sync.Pool\` adalah object pool thread-safe yang menyimpan objek untuk reuse. Objek di pool bisa dibersihkan kapan saja oleh GC, sehingga tidak cocok untuk cache yang harus persisten.

## Arena (Experimental)

Go 1.20+ memperkenalkan \`arena.Arena\` sebagai eksperimental feature. Arena memungkinkan alokasi sekelompok objek dan dibebaskan sekaligus, mengurangi overhead GC untuk workload spesifik. Namun, fitur ini masih eksperimental dan berisiko memory safety jika tidak hati-hati.`,
    },
    {
      id: 'sec-go-adv-06-go',
      type: 'code-example',
      codeExample: {
        id: 'code-go-adv-06-go',
        filename: 'object_pool.go',
        language: 'go',
        title: 'Go: sync.Pool dan Escape Analysis',
        code: `package main

import (
\t"bytes"
\t"fmt"
\t"sync"
)

var bufferPool = sync.Pool{
\tNew: func() any {
\t\treturn new(bytes.Buffer)
\t},
}

func processData(data []byte) []byte {
\tbuf := bufferPool.Get().(*bytes.Buffer)
\tbuf.Reset()
\tdefer bufferPool.Put(buf)
\n\tbuf.Write(data)
\tbuf.WriteString("-processed")
\treturn append([]byte(nil), buf.Bytes()...)
}

func main() {
\tfor i := 0; i < 5; i++ {
\t\tout := processData([]byte(fmt.Sprintf("payload-%d", i)))
\t\tfmt.Println(string(out))
\t}
}`,
        explanation:
          'sync.Pool digunakan untuk mengreuse bytes.Buffer, mengurangi alokasi memori berulang. Reset dan Put memastikan buffer dikembalikan ke pool dalam keadaan bersih.',
      },
    },
    {
      id: 'sec-go-adv-06-callout',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Kesalahan umum:** menganggap sync.Pool sebagai cache permanen (GC bisa menghapus isinya); mengabaikan escape analysis sehingga variabel yang seharusnya di stack malah di heap; atau tidak mengatur GOMEMLIMIT di container. Selalu profil dengan `go test -benchmem`, `go tool pprof`, dan periksa escape analysis dengan `go build -gcflags="-m"`. Untuk container, set GOMEMLIMIT sedikit di bawah batas memory container.',
    },
  ],
}
