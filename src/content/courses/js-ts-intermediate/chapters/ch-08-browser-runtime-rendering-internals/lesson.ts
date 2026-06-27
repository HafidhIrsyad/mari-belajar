import type { Lesson } from '@/content/types'

export const ch08Lesson: Lesson = {
  id: 'lesson-ch-08-browser-runtime-rendering-internals',
  estimatedMinutes: 45,
  sections: [
    {
      id: 'sec-08-basic-runtime',
      type: 'markdown',
      level: 'basic',
      title: 'Call Stack, Heap, dan Event Loop',
      content: `## Call Stack

Call stack adalah struktur data LIFO (Last In First Out) yang melacak fungsi mana yang sedang berjalan. Setiap kali fungsi dipanggil, browser menambahkan frame ke stack. Ketika fungsi selesai, frame di-pop.

\`\`\`javascript
function a() { b(); }
function b() { c(); }
function c() { console.trace('stack'); }
a();
\`\`\`

## Heap

Heap adalah area memori untuk menyimpan objek dan data yang tidak terikat pada urutan eksekusi. Variabel di stack bisa mereferensi objek di heap.

## Event Loop

Event loop adalah mekanisme yang memungkinkan JavaScript, yang single-threaded, menangani operasi asynchronous. Loop ini:

1. Menjalankan call stack hingga kosong.
2. Mengambil satu task dari task queue (macrotask).
3. Menjalankan semua microtask dari microtask queue.
4. Mengulangi.

## Task Queue vs Microtask Queue

- **Task queue (macrotask)**: \`setTimeout\`, \`setInterval\`, \`setImmediate\` (Node.js), I/O events.
- **Microtask queue**: \`Promise.then\`, \`queueMicrotask\`, \`MutationObserver\`.

Microtask selalu dijalankan sebelum render berikutnya dan di antara task. Ini berarti microtask bisa menyebabkan starvation jika terus-menerus di enqueue.`,
    },
    {
      id: 'sec-08-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-08-js',
        filename: 'eventloop.js',
        language: 'javascript',
        title: 'JavaScript: Urutan Eksekusi Task dan Microtask',
        code: `console.log('script start');

setTimeout(() => {
  console.log('timeout 1');
}, 0);

Promise.resolve().then(() => {
  console.log('promise 1');
});

queueMicrotask(() => {
  console.log('microtask 1');
});

Promise.resolve().then(() => {
  console.log('promise 2');
});

console.log('script end');

// Output:
// script start
// script end
// promise 1
// microtask 1
// promise 2
// timeout 1`,
        explanation:
          'Synchronous code berjalan dulu. Kemudian semua microtask (promise dan queueMicrotask) dijalankan sebelum task macrotask (setTimeout) diproses.',
      },
    },
    {
      id: 'sec-08-intermediate-runtime',
      type: 'markdown',
      level: 'intermediate',
      title: 'Browser Process Architecture dan Render Steps',
      content: `## Browser Process Architecture

Browser modern membagi kerja ke beberapa proses dan thread:

- **Browser process**: mengelola tab, address bar, dan UI chrome.
- **Renderer process**: menjalankan JavaScript, layout, dan paint untuk satu tab.
- **Compositor thread**: menangani scrolling, layer composition, dan beberapa input events tanpa memblokir main thread.
- **GPU process**: menggambar layer ke layar.

## Render Steps

Setelah DOM atau style berubah, browser menjalankan:

1. **Style**: menghitung computed style.
2. **Layout (Reflow)**: menghitung geometri elemen.
3. **Paint**: mengisi piksel layer.
4. **Composite**: menggabungkan layer.

\`requestAnimationFrame\` (rAF) dipicu sebelum paint. Cocok untuk animasi karena bekerja selaras dengan refresh rate layar.

## Forced Synchronous Layout

Terjadi ketika kita membaca properti layout seperti \`offsetHeight\` setelah menulis style. Browser harus menghitung layout lebih awal dari jadwalnya, menyebabkan jank.

\`\`\`javascript
// buruk: read-write-read-write loop
for (const el of elements) {
  el.style.width = '100px';
  console.log(el.offsetHeight); // forced reflow
}
\`\`\`

Solusi: batch reads lalu writes, atau gunakan \`requestAnimationFrame\`.`,
    },
    {
      id: 'sec-08-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-08-ts',
        filename: 'scheduler.ts',
        language: 'typescript',
        title: 'TypeScript: Scheduling Microtasks dan Animation Frame',
        code: `function scheduleMicrotask(fn: () => void): void {
  queueMicrotask(fn);
}

function scheduleAnimationFrame(fn: (time: number) => void): number {
  return requestAnimationFrame(fn);
}

// Prioritaskan update UI penting di frame berikutnya
function updateProgress(percent: number): void {
  scheduleAnimationFrame(() => {
    const bar = document.getElementById('progress');
    if (!bar) return;
    bar.style.transform = \`scaleX(\${percent / 100})\`;
  });
}

// Lakukan pekerjaan berat secara bertahung agar tidak memblokir event loop
function chunkedWork<T>(items: T[], chunkSize: number, process: (item: T) => void): void {
  let index = 0;

  function next(): void {
    const end = Math.min(index + chunkSize, items.length);
    for (; index < end; index++) {
      process(items[index]);
    }
    if (index < items.length) {
      setTimeout(next, 0); // yield ke event loop
    }
  }

  next();
}`,
        explanation:
          'requestAnimationFrame menyinkronkan update visual dengan refresh layar. setTimeout(next, 0) memberi kesempatan event loop menangani input antar chunk, mencegah long task.',
      },
    },
    {
      id: 'sec-08-advanced-runtime',
      type: 'markdown',
      level: 'advanced',
      title: 'V8 + Blink, Layerization, Observer Scheduling, dan scheduler API',
      content: `## V8 + Blink Integration

V8 adalah engine JavaScript yang berjalan di dalam renderer process. V8 dan Blink (rendering engine Chromium) berkomunikasi melalui binding seperti V8 bindings. DOM node yang dibuat dari HTML dipasangkan dengan wrapper object di V8 sehingga JavaScript bisa mengaksesnya.

Ketika JavaScript mengubah style, V8 memberitahu Blink untuk menandai element sebagai dirty. Browser kemudian menjadwalkan render steps pada frame berikutnya.

## Layerization dan Compositor Tiles

Browser membagi halaman menjadi layer. Elemen dengan \`transform\`, \`opacity\`, atau \`will-change\` sering dipromosikan ke layer terpisah. Compositor thread menggabungkan layer menjadi tiles dan menggambar ke layar menggunakan GPU. Ini memungkinkan animasi 60 FPS tanpa menyentuh main thread.

## IntersectionObserver dan ResizeObserver

Observer-observer ini tidak berjalan synchronous saat DOM berubah. Mereka dikirimkan ke compositor atau main thread pada waktu yang tepat, biasanya setelah layout/paint, sehingga lebih efisien daripada polling.

## Input Event Coalescing

Browser bisa menggabungkan (coalesce) event seperti mousemove atau scroll untuk mengurangi frekuensi callback jika main thread sibuk. Event yang terlambat tetap terkirim, tetapi beberapa event perantara bisa dilewati.

## scheduler.postTask API

Scheduler API modern memungkinkan kita menjadwalkan task dengan prioritas:

\`\`\`javascript
scheduler.postTask(() => console.log('background work'), { priority: 'background' });
\`\`\`

Pilihan prioritas membantu browser mengelola main thread, memberikan jalan bagi user interaction tetap responsif.`,
    },
    {
      id: 'sec-08-go-example',
      type: 'code-example',
      codeExample: {
        id: 'code-08-go',
        filename: 'scheduler.go',
        language: 'go',
        title: 'Go: Goroutine dan Scheduler Analogy',
        code: `package main

import (
	"fmt"
	"time"
)

// Di browser, event loop menjalankan satu task pada satu waktu.
// Di Go, scheduler runtime Go multiplexes goroutine ke thread OS.

func worker(id int, jobs <-chan int, results chan<- int) {
	for j := range jobs {
		time.Sleep(10 * time.Millisecond) // simulasi kerja
		results <- j * 2
		fmt.Printf("worker %d processed job %d\\n", id, j)
	}
}

func main() {
	jobs := make(chan int, 5)
	results := make(chan int, 5)

	for w := 1; w <= 2; w++ {
		go worker(w, jobs, results)
	}

	for j := 1; j <= 5; j++ {
		jobs <- j
	}
	close(jobs)

	for a := 1; a <= 5; a++ {
		<-results
	}
}`,
        explanation:
          'Go scheduler menjalankan banyak goroutine secara concurrent pada thread OS yang jumlahnya terbatas. Mirip event loop, scheduler bekerja cooperatively tetapi mendukung true concurrency dengan beberapa thread.',
      },
    },
    {
      id: 'sec-08-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Kesimpulan:** Browser runtime adalah hasil integrasi V8, Blink, dan berbagai thread. Event loop mengatur task dan microtask, sementara rendering pipeline mengubah DOM menjadi piksel. Pahami layerization, rAF, dan scheduler API untuk membangun aplikasi yang responsif dan lancar.',
    },
  ],
}
