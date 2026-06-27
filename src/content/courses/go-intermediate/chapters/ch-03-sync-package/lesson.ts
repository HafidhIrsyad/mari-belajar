import type { Lesson } from '@/content/types'

export const ch03Lesson: Lesson = {
  id: 'lesson-ch-03-sync-package',
  estimatedMinutes: 40,
  sections: [
    {
      id: 'sec-03-basic-sync-primitives',
      type: 'markdown',
      level: 'basic',
      title: 'Primitif Sinkronisasi Dasar',
      content: `## sync.WaitGroup

"sync.WaitGroup" digunakan untuk menunggu sekelompok goroutine menyelesaikan pekerjaannya. Cara kerjanya:

1. Panggil "Add(n)" untuk menambah counter sebanyak n.
2. Setiap goroutine memanggil "Done()" saat selesai.
3. "Wait()" memblok sampai counter mencapai nol.

\`\`\`go
var wg sync.WaitGroup
for i := 0; i < 3; i++ {
  wg.Add(1)
  go func() {
    defer wg.Done()
    doWork()
  }()
}
wg.Wait()
\`\`\`

## sync.Mutex

Mutex (mutual exclusion) melindungi akses ke data bersama. Hanya satu goroutine yang boleh memegang lock pada satu waktu.

\`\`\`go
var mu sync.Mutex
var counter int

func increment() {
  mu.Lock()
  defer mu.Unlock()
  counter++
}
\`\`\`

## sync.RWMutex

RWMutex memisahkan lock untuk pembaca dan penulis. Banyak goroutine bisa membaca bersamaan, tapi hanya satu penulis yang boleh menulis, dan penulis tidak bisa berbagi dengan reader.

\`\`\`go
var rw sync.RWMutex
var data map[string]int

func read(key string) int {
  rw.RLock()
  defer rw.RUnlock()
  return data[key]
}
\`\`\``,
    },
    {
      id: 'sec-03-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-03-js',
        filename: 'race-counter.js',
        language: 'javascript',
        code: `let counter = 0;

async function incrementMany(times) {
  const promises = [];
  for (let i = 0; i < times; i++) {
    promises.push(
      new Promise((resolve) => {
        setTimeout(() => {
          const temp = counter;
          counter = temp + 1;
          resolve();
        }, 0);
      })
    );
  }
  await Promise.all(promises);
  return counter;
}

incrementMany(1000).then((result) => {
  console.log('Counter akhir:', result);
});`,
        title: 'JavaScript: Race Condition pada Counter',
        explanation:
          'JavaScript bersifat single-threaded, tapi callback asynchronous yang mengakses variabel bersama dapat menghasilkan hasil yang tidak terduga. Di Go, race condition lebih mudah terjadi karena banyak goroutine benar-benar berjalan paralel.',
      },
    },
    {
      id: 'sec-03-intermediate-sync-advanced',
      type: 'markdown',
      level: 'intermediate',
      title: 'Once, Map, Pool, dan Atomic',
      content: `## sync.Once

"sync.Once" menjamin inisialisasi hanya terjadi satu kali, meskipun dipanggil dari banyak goroutine.

\`\`\`go
var once sync.Once
var conn *Connection

func getConn() *Connection {
  once.Do(func() {
    conn = createConnection()
  })
  return conn
}
\`\`\`

## sync.Map

"sync.Map" adalah map bawaan yang aman untuk konkuren. Cocok untuk:

- Cache yang sering dibaca dan jarang ditulis.
- Skenario dengan banyak core dan banyak goroutine.

Namun, untuk kasus umum, map biasa yang dilindungi RWMutex seringkali lebih cepat dan lebih mudah dipahami.

## sync.Pool

"sync.Pool" menyimpan object yang dapat dipakai kembali, mengurangi beban garbage collector. Object di pool bisa dibersihkan kapan saja oleh runtime, jadi jangan mengandalkan pool sebagai storage persisten.

\`\`\`go
var bufferPool = sync.Pool{
  New: func() interface{} {
    return new(bytes.Buffer)
  },
}
\`\`\`

## Atomic

Package "sync/atomic" menyediakan operasi atomic untuk integer dan pointer. Operasi ini lebih ringan dibanding mutex untuk counter atau flag sederhana.

\`\`\`go
var hits int64
atomic.AddInt64(&hits, 1)
\`\`\``,
    },
    {
      id: 'sec-03-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-03-ts',
        filename: 'mutex-pattern.ts',
        language: 'typescript',
        title: 'TypeScript: Simulasi Mutex dengan Promise',
        code: `class Mutex {
  private locked = false;
  private waiters: Array<() => void> = [];

  async acquire(): Promise<() => void> {
    if (!this.locked) {
      this.locked = true;
      return () => this.release();
    }
    return new Promise<() => void>((resolve) => {
      this.waiters.push(() => resolve(() => this.release()));
    });
  }

  private release() {
    if (this.waiters.length > 0) {
      const next = this.waiters.shift()!;
      next();
    } else {
      this.locked = false;
    }
  }
}

const mutex = new Mutex();
let counter = 0;

async function safeIncrement() {
  const release = await mutex.acquire();
  try {
    counter++;
  } finally {
    release();
  }
}

async function main() {
  await Promise.all(Array.from({ length: 1000 }, safeIncrement));
  console.log('Counter:', counter);
}

main();`,
        explanation:
          'TypeScript single-threaded tidak membutuhkan mutex untuk memory safety, tapi pattern ini berguna untuk mengelola urutan akses resource asynchronous seperti file atau database.',
      },
    },
    {
      id: 'sec-03-advanced-deadlock-contention',
      type: 'markdown',
      level: 'advanced',
      title: 'Deadlock, Lock Ordering, dan Contention',
      content: `## Deadlock

Deadlock terjadi ketika dua atau lebih goroutine saling menunggu resource yang dimiliki oleh goroutine lain. Empat kondisi deadlock menurut Coffman:

1. Mutual exclusion.
2. Hold and wait.
3. No preemption.
4. Circular wait.

Di Go, deadlock juga bisa terjadi jika kita lupa memanggil Done() pada WaitGroup atau mengirim ke channel tanpa penerima.

## Lock Ordering

Cara paling efektif menghindari deadlock adalah dengan selalu mengunci mutex dalam urutan yang konsisten. Jika goroutine A mengunci mu1 lalu mu2, maka goroutine B juga harus mengunci mu1 lalu mu2, bukan sebaliknya.

## Contention

Contention terjadi ketika banyak goroutine berebut lock. Tingkat kontensi tinggi mengurangi skalabilitas. Strategi mengurangi contention:

- Gunakan RWMutex jika read jauh lebih sering dari write.
- Pecah data menjadi beberapa shard dengan mutex terpisah.
- Gunakan atomic untuk counter sederhana.
- Hindari memegang lock saat melakukan I/O.

## errgroup

Package "golang.org/x/sync/errgroup" menggabungkan WaitGroup dengan propagasi error. Jika salah satu goroutine mengembalikan error, context grup akan dibatalkan.

\`\`\`go
g, ctx := errgroup.WithContext(ctx)
for _, url := range urls {
  url := url
  g.Go(func() error {
    return fetch(ctx, url)
  })
}
if err := g.Wait(); err != nil {
  // handle error
}
\`\`\`

## Race Detector

Go menyediakan race detector dengan flag "-race". Race detector memperlambat program, tapi sangat berguna untuk mendeteksi akses memori bersama yang tidak dilindungi lock.`,
    },
    {
      id: 'sec-03-go-example',
      type: 'code-example',
      codeExample: {
        id: 'code-03-go',
        filename: 'safe_counter.go',
        language: 'go',
        title: 'Go: Counter Aman dengan Mutex dan WaitGroup',
        code: `package main

import (
	"fmt"
	"sync"
)

type Counter struct {
	mu    sync.Mutex
	value int
}

func (c *Counter) Inc() {
	c.mu.Lock()
	defer c.mu.Unlock()
	c.value++
}

func (c *Counter) Value() int {
	c.mu.Lock()
	defer c.mu.Unlock()
	return c.value
}

func main() {
	var wg sync.WaitGroup
	counter := &Counter{}

	for i := 0; i < 1000; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			counter.Inc()
		}()
	}

	wg.Wait()
	fmt.Println("counter:", counter.Value())
}`,
        explanation:
          'Mutex melindungi field value agar hanya satu goroutine yang dapat mengubahnya pada satu waktu. WaitGroup menunggu semua goroutine selesai sebelum hasil dicetak.',
      },
    },
    {
      id: 'sec-03-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Ringkasan:** Package sync menyediakan primitif untuk mengoordinasikan goroutine dan melindungi memori bersama. WaitGroup menunggu goroutine, Mutex/RWMutex mengontrol akses, Once menjamin inisialisasi tunggal, Map dan Pool menangani kasus khusus, dan atomic operations efisien untuk counter sederhana. Hindari deadlock dengan lock ordering konsisten dan kurangi contention dengan memilih primitif yang tepat. Jangan lupa gunakan race detector saat development.',
    },
  ],
}
