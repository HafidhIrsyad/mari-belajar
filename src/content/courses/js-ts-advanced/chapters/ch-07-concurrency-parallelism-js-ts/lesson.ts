import type { Lesson } from '@/content/types'

export const ch07Lesson: Lesson = {
  id: 'lesson-ch-07-concurrency-parallelism-js-ts',
  estimatedMinutes: 50,
  sections: [
    {
      id: 'sec-07-basic-concurrency',
      type: 'markdown',
      level: 'basic',
      title: 'Single-Threaded Event Loop dan Cooperative Multitasking',
      content: `## Concurrency vs Parallelism

- **Concurrency**: kemampuan menangani banyak task dalam waktu yang sama dengan bergantian (interleaving).
- **Parallelism**: menjalankan task secara bersamaan pada core CPU yang berbeda.

JavaScript pada umumnya **concurrent** melalui event loop, tetapi tidak **parallel** kecuali menggunakan Web Workers atau worker_threads.

## Cooperative Multitasking

Async/await memungkinkan fungsi menyerahkan kontrol kembali ke event loop pada titik <code>await</code>. Hal ini mencegah satu operasi panjang memblokir thread utama.

\`\`\`javascript
async function fetchData() {
  const response = await fetch('/api/data'); // yield ke event loop
  const data = await response.json();         // yield lagi
  return data;
}
\`\`\`

## Promise Combinators

\`\`\`javascript
const [a, b] = await Promise.all([fetchA(), fetchB()]);
const winner = await Promise.race([fetchA(), timeout(5000)]);
\`\`\`

<code>Promise.all</code> gagal cepat jika salah satu promise rejected. <code>Promise.allSettled</code> berguna jika kita ingin menunggu semua hasil tanpa peduli status.`,
    },
    {
      id: 'sec-07-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-07-js',
        filename: 'pooled-fetch.js',
        language: 'javascript',
        title: 'JavaScript: Fetch Paralel dengan Batasan Concurrency',
        code: `async function fetchWithConcurrency(urls, limit, signal) {
  const results = new Array(urls.length);
  let index = 0;

  async function worker() {
    while (index < urls.length) {
      if (signal?.aborted) throw new Error('Cancelled');
      const currentIndex = index++;
      const response = await fetch(urls[currentIndex], { signal });
      results[currentIndex] = await response.text();
    }
  }

  const workers = [];
  for (let i = 0; i < Math.min(limit, urls.length); i++) {
    workers.push(worker());
  }

  await Promise.all(workers);
  return results;
}

const urls = Array.from({ length: 20 }, (_, i) => \`/item/\${i}\`);
const controller = new AbortController();

fetchWithConcurrency(urls, 4, controller.signal)
  .then((data) => console.log('Loaded', data.length))
  .catch((err) => console.error(err.message));

// Batalkan setelah 2 detik jika perlu
// setTimeout(() => controller.abort(), 2000);`,
        explanation:
          'Pool worker membatasi jumlah fetch yang berjalan bersamaan. AbortController memungkinkan pembatalan semua fetch yang sedang berlangsung.',
      },
    },
    {
      id: 'sec-07-intermediate-workers',
      type: 'markdown',
      level: 'intermediate',
      title: 'Web Workers, Transferables, dan Atomics',
      content: `## Web Workers

Web Workers menjalankan script di thread terpisah. Mereka tidak memiliki akses ke DOM tetapi dapat berkomunikasi dengan main thread melalui \`postMessage\`.

\`\`\`javascript
const worker = new Worker('worker.js');
worker.postMessage({ n: 42 });
worker.onmessage = (event) => console.log(event.data);
\`\`\`

## Transferables

Saat mengirim objek seperti ArrayBuffer melalui \`postMessage\`, objek dapat di-"transfer" sehingga ownership berpindah ke worker. ArrayBuffer tidak lagi valid di pengirim.

\`\`\`javascript
const buffer = new ArrayBuffer(1024);
worker.postMessage({ buffer }, [buffer]);
// buffer di main thread sekarang detached
\`\`\`

## SharedArrayBuffer dan Atomics

\`SharedArrayBuffer\` memungkinkan memori dibagi antar thread tanpa copy. \`Atomics\` menyediakan operasi read-modify-write yang thread-safe, seperti \`Atomics.add\`, \`Atomics.load\`, \`Atomics.store\`, \`Atomics.wait\`, dan \`Atomics.notify\`.

\`\`\`javascript
const shared = new SharedArrayBuffer(4);
const view = new Int32Array(shared);
Atomics.add(view, 0, 1);
\`\`\``,
    },
    {
      id: 'sec-07-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-07-ts',
        filename: 'typed-concurrency.ts',
        language: 'typescript',
        title: 'TypeScript: Helper Concurrency dengan Tipe Aman',
        code: `type Task<T> = () => Promise<T>;

async function runWithConcurrency<T>(
  tasks: Task<T>[],
  limit: number,
  signal?: AbortSignal
): Promise<T[]> {
  const results: T[] = new Array(tasks.length);
  let index = 0;

  async function worker(): Promise<void> {
    while (index < tasks.length) {
      if (signal?.aborted) throw new Error('Cancelled');
      const currentIndex = index++;
      results[currentIndex] = await tasks[currentIndex]();
    }
  }

  const workers = Array.from({ length: Math.min(limit, tasks.length) }, worker);
  await Promise.all(workers);
  return results;
}

async function fetchUser(id: number): Promise<{ id: number; name: string }> {
  const res = await fetch(\`/users/\${id}\`);
  return res.json();
}

const userTasks = [1, 2, 3, 4, 5].map((id) => () => fetchUser(id));

runWithConcurrency(userTasks, 2)
  .then((users) => console.log(users))
  .catch((err) => console.error(err.message));`,
        explanation:
          'Generic helper </code>runWithConcurrency<code> menjaga tipe hasil task. Dengan parameter tasks sebagai closure, kita bisa membatalkan atau membatasi concurrency tanpa kehilangan type safety.',
      },
    },
    {
      id: 'sec-07-advanced-concurrency',
      type: 'markdown',
      level: 'advanced',
      title: 'Backpressure, Node.js worker_threads, dan Model Concurrency',
      content: `## Backpressure di Streams

Backpressure terjadi ketika producer menghasilkan data lebih cepat daripada consumer memprosesnya. Streams API modern menyediakan mekanisme backpressure melalui ReadableStream dan TransformStream dengan controller.

\`\`\`javascript
const writable = new WritableStream({
  write(chunk) {
    // proses chunk; stream akan menunda jika kita mengembalikan promise
    return slowWrite(chunk);
  },
});
\`\`\`

## Node.js worker_threads

Di Node.js, \`worker_threads\` memungkinkan pembuatan thread tambahan. Berbeda dengan cluster, worker_threads berbagi memori melalui SharedArrayBuffer dan MessagePort.

\`\`\`javascript
const { Worker, isMainThread, parentPort } = require('worker_threads');
\`\`\`

## Atomics.wait dan Atomics.notify

\`Atomics.wait\` membuat thread tidur sampai \`Atomics.notify\` dipicu pada indeks tertentu. Ini berguna untuk implementasi lock sederhana atau condition variable.

## CSP vs Actor Model

- **CSP (Communicating Sequential Processes)**: komunikasi antar goroutine/channel tanpa memori bersama. Go menganut model ini.
- **Actor Model**: setiap aktor memiliki state privat dan berkomunikasi lewat pesan. JavaScript dengan Web Workers mendekati model ini melalui message passing.

Pemilihan model bergantung pada kebutuhan shared state dan kemudahan reasoning.`,
    },
    {
      id: 'sec-07-go-example',
      type: 'code-example',
      codeExample: {
        id: 'code-07-go',
        filename: 'worker_pool.go',
        language: 'go',
        title: 'Go: Worker Pool dengan Channel',
        code: `package main

import (
\t"fmt"
\t"sync"
)

func worker(id int, jobs <-chan int, results chan<- int, wg *sync.WaitGroup) {
\tdefer wg.Done()
\tfor j := range jobs {
\t\tresults <- j * 2
\t\tfmt.Printf("worker %d processed job %d\\n", id, j)
\t}
}

func main() {
\tjobs := make(chan int, 100)
\tresults := make(chan int, 100)
\tvar wg sync.WaitGroup

\tfor w := 1; w <= 3; w++ {
\t\twg.Add(1)
\t\tgo worker(w, jobs, results, &wg)
\t}

\tfor j := 1; j <= 9; j++ {
\t\tjobs <- j
\t}
\tclose(jobs)

\tgo func() {
\t\twg.Wait()
\t\tclose(results)
\t}()

\tfor r := range results {
\t\tfmt.Println("result:", r)
\t}
}`,
        explanation:
          'Worker pool di Go menggunakan goroutine dan channel. Jobs dikirim ke channel, worker mengambil dan memproses, lalu mengirim hasil ke channel results. Channel menyediakan backpressure dan sinkronisasi secara idiomatic.',
      },
    },
    {
      id: 'sec-07-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Info:** Gunakan concurrency JavaScript untuk I/O-bound work; untuk CPU-bound work, pertimbangkan Web Workers atau worker_threads. Selalu tangani backpressure pada streams dan sediakan mekanisme cancellation dengan AbortController. Model CSP Go dengan channel sering lebih mudah dirasionalkan dibandingkan shared memory dengan lock.',
    },
  ],
}
