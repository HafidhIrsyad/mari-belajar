import type { Lesson } from '@/content/types'

export const ch01Lesson: Lesson = {
  id: 'lesson-ch-01-concurrency-patterns',
  estimatedMinutes: 45,
  sections: [
    {
      id: 'sec-go-adv-01-basic',
      type: 'markdown',
      level: 'basic',
      title: 'Pipeline, Worker Pool, dan Fan-out/Fan-in',
      content: `## Pipeline

**Pipeline** adalah pola untuk memproses data melalui serangkaian tahap (stage). Setiap tahap menerima data dari channel sebelumnya, melakukan transformasi, dan mengirim hasil ke channel berikutnya. Pola ini membuat kode lebih modular dan mudah diuji.

Konsep dasar:
- Setiap stage adalah fungsi yang menerima dan mengembalikan channel.
- Data mengalir dari stage ke stage secara concurrent.
- Stage bisa dibatalkan melalui context cancellation.

## Worker Pool

**Worker pool** membatasi jumlah goroutine yang aktif secara bersamaan. Alih-alih membuat goroutine untuk setiap task, kita membuat sejumlah worker tetap yang mengambil task dari job queue.

Keuntungan:
- Mencegah eksplosi goroutine saat beban tinggi.
- Memudahkan pengaturan resource seperti CPU dan memori.
- Membantu menerapkan backpressure secara eksplisit.

## Fan-out/Fan-in

**Fan-out** membagi pekerjaan ke beberapa worker. **Fan-in** menggabungkan hasil dari banyak worker kembali ke satu channel. Pola ini sering digunakan untuk parallel processing dengan batasan concurrency.

\`\`\`text
[Producer] --jobs--> [Worker A] --results-->
              |----> [Worker B] --results---> [Collector]
              |----> [Worker C] --results-->
\`\`\``,
    },
    {
      id: 'sec-go-adv-01-js',
      type: 'code-example',
      codeExample: {
        id: 'code-go-adv-01-js',
        filename: 'bounded-concurrency.mjs',
        language: 'javascript',
        title: 'JavaScript: Promise.all Terbatas dengan AbortController',
        code: `import pLimit from 'p-limit';

const limit = pLimit(3);
const controller = new AbortController();

async function fetchUser(id, signal) {
  const res = await fetch(\`https://api.example.com/users/\${id}\`, { signal });
  if (!res.ok) throw new Error(\`failed \${id}\`);
  return res.json();
}

const ids = Array.from({ length: 20 }, (_, i) => i + 1);

const tasks = ids.map((id) =>
  limit(() => fetchUser(id, controller.signal))
);

// Jika salah satu gagal, batalkan semua.
Promise.all(tasks).catch((err) => {
  console.error(err.message);
  controller.abort();
});`,
        explanation:
          'p-limit membatasi jumlah promise yang berjalan bersamaan. AbortController digunakan untuk membatalkan task lain saat terjadi kegagalan, mirip dengan cancellation di Go context.',
      },
    },
    {
      id: 'sec-go-adv-01-intermediate',
      type: 'markdown',
      level: 'intermediate',
      title: 'errgroup dan Semaphore',
      content: `## errgroup

Package \`golang.org/x/sync/errgroup\` mengelompokkan goroutine yang saling terkait. Errgroup menunggu semua goroutine selesai dan mengembalikan error pertama yang terjadi. Errgroup juga mendukung context, sehingga cancellation dapat dipropagasikan ke semua goroutine anggota.

Pola umum:
1. Buat \`errgroup.WithContext(ctx)\`.
2. Panggil \`g.Go(func() error { ... })\` untuk setiap task.
3. Tunggu dengan \`g.Wait()\` dan tangani error.

## Semaphore

Package \`golang.org/x/sync/semaphore\` menyediakan semaphore weighted. Semaphore membatasi jumlah goroutine yang boleh masuk ke critical section atau menjalankan resource-bound task.

Perbedaan dengan worker pool:
- Worker pool memiliki goroutine tetap yang terus-meneru menunggu job.
- Semaphore membiarkan goroutine baru dibuat, tetapi memblokir saat kuota penuh.

## Bounded Concurrency

Kombinasi errgroup + semaphore memungkinkan kita menjalankan banyak task secara parallel dengan batasan konkuren dan penanganan error terpusat.`,
    },
    {
      id: 'sec-go-adv-01-ts',
      type: 'code-example',
      codeExample: {
        id: 'code-go-adv-01-ts',
        filename: 'bounded-queue.ts',
        language: 'typescript',
        title: 'TypeScript: Generic Bounded Queue dengan AbortSignal',
        code: `type Task<T> = (signal: AbortSignal) => Promise<T>;

class BoundedQueue<T> {
  private running = 0;
  private readonly queue: Array<{
    task: Task<T>;
    resolve: (value: T) => void;
    reject: (reason: unknown) => void;
  }> = [];

  constructor(private readonly limit: number) {}

  run(task: Task<T>, signal?: AbortSignal): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push({ task, resolve, reject });
      signal?.addEventListener('abort', () => reject(new Error('cancelled')));
      this.pump();
    });
  }

  private pump() {
    if (this.running >= this.limit || this.queue.length === 0) return;
    const { task, resolve, reject } = this.queue.shift()!;
    this.running++;
    const controller = new AbortController();
    task(controller.signal)
      .then(resolve, reject)
      .finally(() => {
        this.running--;
        this.pump();
      });
  }
}

export async function fetchAll<T>(
  tasks: Task<T>[],
  limit: number
): Promise<T[]> {
  const queue = new BoundedQueue<T>(limit);
  const controller = new AbortController();
  return Promise.all(
    tasks.map((t) =>
      queue.run(t, controller.signal).catch((err) => {
        controller.abort();
        throw err;
      })
    )
  );
}`,
        explanation:
          'BoundedQueue mengontrol jumlah task yang aktif. Jika satu task gagal, AbortController membatalkan task yang masih dalam antrean atau sedang berjalan.',
      },
    },
    {
      id: 'sec-go-adv-01-advanced',
      type: 'markdown',
      level: 'advanced',
      title: 'Structured Concurrency dan Goroutine Leak Prevention',
      content: `## Structured Concurrency

**Structured concurrency** adalah prinsip bahwa setiap goroutine harus memiliki lifetime yang terikat pada scope pembuatnya. Ketika parent scope selesai atau dibatalkan, semua child goroutine harus dihentikan dan dibersihkan.

Di Go, kita menerapkannya dengan:
- \`context.Context\` untuk cancellation dan deadline.
- \`errgroup\` atau \`sync.WaitGroup\` untuk menunggu semua goroutine.
- Channel yang ditutup secara eksplisit saat tidak lagi dibutuhkan.

## Goroutine Leak

Goroutine leak terjadi ketika goroutine tetap berjalan setelah seharusnya selesai. Penyebab umum:
- Mengirim ke channel tanpa penerima yang akan datang.
- Tidak membatalkan goroutine saat context dibatalkan.
- \`select\` tanpa \`ctx.Done()\` case.

Cara mencegah:
- Selalu sertakan \`case <-ctx.Done():\` dalam \`select\` jika goroutine berumur panjang.
- Gunakan buffered channel hanya jika benar-benar diperlukan.
- Pastikan channel ditutup oleh pengirim, bukan penerima.

## Backpressure

**Backpressure** mengontrol laju produksi data agar tidak melebihi kapasitas konsumen. Tanpa backpressure, buffer akan membesar tanpa batas dan menyebabkan OOM.

Teknik backpressure di Go:
- Gunakan channel berukuran terbatas (buffered dengan size kecil).
- Blokir producer saat buffer penuh.
- Gunakan semaphore untuk membatasi task aktif.
- Terapkan rate limiter seperti token bucket.

## Select dan Nil Channel

\`select\` pada nil channel akan memblokir selamanya untuk case tersebut. Pola ini bisa dimanfaatkan untuk menonaktifkan case secara dinamis dengan mengatur channel ke \`nil\`.`,
    },
    {
      id: 'sec-go-adv-01-go',
      type: 'code-example',
      codeExample: {
        id: 'code-go-adv-01-go',
        filename: 'structured_downloader.go',
        language: 'go',
        title: 'Go: Structured Downloader dengan errgroup + Semaphore',
        code: `package main

import (
\t"context"
\t"fmt"
\t"io"
\t"net/http"
\t"time"

\t"golang.org/x/sync/errgroup"
\t"golang.org/x/sync/semaphore"
)

func download(ctx context.Context, url string) ([]byte, error) {
\treq, err := http.NewRequestWithContext(ctx, http.MethodGet, url, nil)
\tif err != nil {
\t\treturn nil, err
\t}
\tresp, err := http.DefaultClient.Do(req)
\tif err != nil {
\t\treturn nil, err
\t}
\tdefer resp.Body.Close()
\treturn io.ReadAll(resp.Body)
}

func downloadAll(ctx context.Context, urls []string, maxConcurrent int64) ([][]byte, error) {
\tg, ctx := errgroup.WithContext(ctx)
\tsem := semaphore.NewWeighted(maxConcurrent)
\tresults := make([][]byte, len(urls))

\tfor i, url := range urls {
\t\t// Capture loop variables untuk goroutine.
\t\ti, url := i, url
\t\tg.Go(func() error {
\t\t\tif err := sem.Acquire(ctx, 1); err != nil {
\t\t\t\treturn err
\t\t\t}
\t\t\tdefer sem.Release(1)

\t\t\tdata, err := download(ctx, url)
\t\t\tif err != nil {
\t\t\t\treturn fmt.Errorf("download %s: %w", url, err)
\t\t\t}
\t\t\tresults[i] = data
\t\t\treturn nil
\t\t})
\t}

\tif err := g.Wait(); err != nil {
\t\treturn nil, err
\t}
\treturn results, nil
}

func main() {
\tctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
\tdefer cancel()

\turls := []string{
\t\t"https://example.com/a",
\t\t"https://example.com/b",
\t\t"https://example.com/c",
\t}

\tresults, err := downloadAll(ctx, urls, 2)
\tif err != nil {
\t\tfmt.Println("error:", err)
\t\treturn
\t}
\tfor i, r := range results {
\t\tfmt.Printf("url %d: %d bytes\\n", i, len(r))
\t}
}`,
        explanation:
          'errgroup mengelola lifecycle goroutine: jika satu download gagal, context dibatalkan dan goroutine lain segera keluar. semaphore membatasi concurrent download menjadi maxConcurrent. Pattern ini mencegah goroutine leak dan memberikan backpressure alami.',
      },
    },
    {
      id: 'sec-go-adv-01-callout',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Kesalahan umum:** lupa menangkap loop variable sebelum goroutine (Go < 1.22), mengirim ke unbuffered channel tanpa penerima, atau tidak menyertakan case `<-ctx.Done()` pada select panjang. Selalu gunakan errgroup/WaitGroup untuk menunggu goroutine, dan pastikan channel ditutup oleh pengirim. Tools: `go vet`, race detector (`go test -race`), dan pprof goroutine profile untuk mendeteksi leak.',
    },
  ],
}
