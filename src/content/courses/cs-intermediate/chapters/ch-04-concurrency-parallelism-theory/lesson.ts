import type { Lesson } from '@/content/types'

export const ch04Lesson: Lesson = {
  id: 'lesson-ch-04-concurrency-parallelism-theory',
  estimatedMinutes: 50,
  sections: [
    {
      id: 'sec-04-basic-process-thread',
      type: 'markdown',
      level: 'basic',
      title: 'Process vs Thread dan Race Condition',
      content: `## Process

**Process** adalah instance program yang sedang berjalan. Setiap process memiliki:

- Ruang alamat virtual sendiri (kode, heap, stack).
- File descriptor, environment variable, dan resource OS lainnya.
- Process ID (PID) unik.

Process **terisolasi** satu sama lain — satu process tidak dapat langsung mengakses memori process lain tanpa mekanisme IPC (inter-process communication).

## Thread

**Thread** adalah unit eksekusi dalam satu process. Thread dalam process yang sama **berbagi**:

- Heap dan ruang alamat global.
- File descriptor dan resource process.

Setiap thread memiliki **stack sendiri** dan register CPU.

| Aspek | Process | Thread |
|-------|---------|--------|
| Isolasi memori | Penuh | Berbagi heap |
| Overhead pembuatan | Tinggi (fork/exec) | Rendah |
| Komunikasi | IPC (pipe, socket, shared memory) | Variabel bersama (perlu sinkronisasi) |
| Crash | Satu process tidak mempengaruhi lain | Satu thread crash bisa membawa process |

## Concurrency vs Parallelism

- **Concurrency**: mengelola banyak tugas yang berjalan "bersamaan" — bisa pada satu core dengan context switching.
- **Parallelism**: benar-benar menjalankan tugas secara simultan pada banyak core/CPU.

## Race Condition

**Race condition** terjadi ketika dua atau lebih thread mengakses data bersama secara konkuren, setidaknya satu menulis, dan tidak ada mekanisme sinkronisasi. Hasil akhir **bergantung pada timing** — tidak deterministik.

Contoh klasik: counter++ yang sebenarnya terdiri dari read-modify-write tiga langkah. Dua thread dapat membaca nilai sama, menambah, dan menulis — kehilangan satu increment.`,
    },
    {
      id: 'sec-04-go-basic',
      type: 'code-example',
      codeExample: {
        id: 'code-04-go-basic',
        filename: 'race_condition.go',
        language: 'go',
        title: 'Go: Race Condition pada Counter',
        code: `package main

import (
	"fmt"
	"sync"
)

func main() {
	// Race condition: increment konkuren tanpa sinkronisasi
	var counter int
	var wg sync.WaitGroup

	for i := 0; i < 1000; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			current := counter // read
			// goroutine lain bisa membaca nilai sama di sini
			counter = current + 1 // write
		}()
	}
	wg.Wait()
	fmt.Println("Unsafe counter:", counter) // < 1000, tidak deterministik
	fmt.Println("Race condition: hasil tidak deterministik tanpa sinkronisasi")
}`,
        explanation:
          'Operasi read-modify-write pada counter bukan atomic. Tanpa mutex atau atomic operation, goroutine dapat kehilangan update satu sama lain. Jalankan dengan go run -race untuk mendeteksi data race.',
      },
    },
    {
      id: 'sec-04-intermediate-sync',
      type: 'markdown',
      level: 'intermediate',
      title: 'Mutex, Semaphore, dan Deadlock',
      content: `## Mutex (Mutual Exclusion Lock)

**Mutex** memastikan hanya satu thread yang memegang lock pada satu waktu. Thread lain yang ingin masuk critical section harus menunggu hingga lock dilepas.

Operasi dasar:
- **lock()** / acquire: ambil lock, block jika sudah dipegang.
- **unlock()** / release: lepaskan lock.

Critical section adalah bagian kode yang mengakses shared resource.

## Semaphore

**Semaphore** adalah counter yang mengontrol berapa banyak thread yang boleh mengakses resource bersamaan.

- **Binary semaphore** (0/1): setara mutex.
- **Counting semaphore** (N): mengizinkan hingga N thread simultan.

Kegunaan:
- **Resource pool**: batasi koneksi database aktif.
- **Signaling**: producer memberi sinyal ke consumer (misalnya buffer penuh/kosong).

## Deadlock

**Deadlock** terjadi ketika sekumpulan thread saling menunggu resource yang dipegang thread lain, sehingga tidak ada yang bisa maju.

### Empat Kondisi Coffman

Semua kondisi berikut harus terpenuhi **bersamaan**:

| # | Kondisi | Arti |
|---|---------|------|
| 1 | Mutual exclusion | Resource tidak dapat dibagi |
| 2 | Hold and wait | Thread memegang resource sambil menunggu resource lain |
| 3 | No preemption | Resource tidak bisa diambil paksa |
| 4 | Circular wait | Rantai melingkar menunggu |

### Strategi Pencegahan

- **Mutual exclusion**: gunakan resource yang dapat dibagi jika memungkinkan.
- **Hold and wait**: minta semua resource sekaligus sebelum mulai.
- **No preemption**: ambil resource paksa jika thread tidak selesai dalam waktu tertentu.
- **Circular wait**: **total ordering** — semua thread meminta lock dalam urutan yang sama.

### Strategi Penanganan

- **Detection & recovery**: deteksi siklus wait-for graph, kill atau rollback thread.
- **Ostrich algorithm**: abaikan (tidak disarankan untuk sistem kritis).
- **Avoidance**: Banker's algorithm — alokasi aman berdasarkan state.`,
    },
    {
      id: 'sec-04-viz-process',
      type: 'visualization',
      visualization: {
        id: 'viz-04-process',
        component: 'process-state',
        title: 'Visualisasi State Process',
        props: {},
      },
    },
    {
      id: 'sec-04-go-intermediate',
      type: 'code-example',
      codeExample: {
        id: 'code-04-go-intermediate',
        filename: 'atomic_counter.go',
        language: 'go',
        title: 'Go: Happens-Before dengan Atomic',
        code: `package main

import (
	"fmt"
	"sync"
	"sync/atomic"
)

type SyncCounter struct {
	value int64
}

func (c *SyncCounter) Increment() int64 {
	return atomic.AddInt64(&c.value, 1)
}

func (c *SyncCounter) Get() int64 {
	return atomic.LoadInt64(&c.value)
}

func main() {
	var wg sync.WaitGroup
	counter := &SyncCounter{}

	for i := 0; i < 1000; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			counter.Increment()
		}()
	}
	wg.Wait()
	fmt.Println("Atomic counter:", counter.Get()) // selalu 1000

	// atomic.AddInt64 memiliki semantics happens-before:
	// semua operasi sebelumnya terlihat setelah operasi atomic selesai.
}`,
        explanation:
          'sync/atomic memberikan operasi thread-safe dengan memory ordering guarantees. Ini adalah contoh happens-before di Go — increment atomic terlihat oleh semua goroutine setelah selesai.',
      },
    },
    {
      id: 'sec-04-advanced-csp',
      type: 'markdown',
      level: 'advanced',
      title: 'Memory Model, Happens-Before, dan CSP vs Shared-Memory',
      content: `## Memory Model

**Memory model** mendefinisikan aturan kapan perubahan memori oleh satu thread terlihat oleh thread lain. Tanpa aturan formal, compiler dan CPU dapat **reorder** instruksi untuk optimasi.

Masalah yang muncul:
- **Visibility**: thread A menulis, thread B tidak melihat perubahan.
- **Ordering**: operasi tampak terjadi dalam urutan berbeda dari yang ditulis kode.

## Happens-Before

Relasi **happens-before** (Lamport) mendefinisikan ordering parsial antar operasi:

- Jika operasi A happens-before B, maka efek A terlihat oleh B.
- Tanpa relasi happens-before, tidak ada jaminan visibility.

Sumber happens-before umum:
- Unlock mutex happens-before lock berikutnya pada mutex yang sama.
- Write ke volatile/atomic happens-before read berikutnya.
- Thread start happens-before operasi pertama thread baru.
- Operasi terakhir thread happens-before join return.

## Shared-Memory vs Message Passing

### Shared-Memory Model

Thread berbagi variabel global. Sinkronisasi melalui mutex, semaphore, condition variable.

- **Pro**: efisien untuk data besar yang sering diakses.
- **Kontra**: race condition, deadlock, debugging sulit.

### CSP (Communicating Sequential Processes)

Proses independen berkomunikasi melalui **channel** (message passing). Tidak ada shared mutable state.

- **Pro**: lebih mudah reasoning, menghindari data race pada shared state.
- **Kontra**: overhead copy pesan, desain protokol komunikasi.

Go mengadopsi CSP melalui goroutine dan channel. Erlang menggunakan actor model (message passing antar process terisolasi).

## Perbandingan Paradigma

| Aspek | Shared-Memory | CSP / Message Passing |
|-------|---------------|----------------------|
| Komunikasi | Variabel bersama + lock | Kirim/terima pesan |
| Data race | Risiko tinggi | Rendah (tidak share state) |
| Contoh | pthreads, Java synchronized | Go channels, Erlang actors |
| Debugging | Sulit (Heisenbug) | Lebih terstruktur |

## Prinsip Praktis

1. **Minimalkan shared mutable state** — prefer immutability.
2. **Gunakan lock ordering konsisten** untuk mencegah deadlock.
3. **Pilih abstraksi tingkat tinggi** (channel, async queue) ketika memungkinkan.
4. **Uji dengan race detector** (Go -race, ThreadSanitizer) saat development.`,
    },
    {
      id: 'sec-04-go-advanced',
      type: 'code-example',
      codeExample: {
        id: 'code-04-go-advanced',
        filename: 'mutex.go',
        language: 'go',
        title: 'Go: Mutex Melindungi Critical Section',
        code: `package main

import (
	"fmt"
	"sync"
)

type SafeCounter struct {
	mu    sync.Mutex
	value int
}

func (c *SafeCounter) Inc() {
	c.mu.Lock()
	defer c.mu.Unlock()
	c.value++
}

func (c *SafeCounter) Value() int {
	c.mu.Lock()
	defer c.mu.Unlock()
	return c.value
}

func main() {
	var wg sync.WaitGroup
	counter := &SafeCounter{}

	for i := 0; i < 1000; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			counter.Inc()
		}()
	}

	wg.Wait()
	fmt.Println("counter:", counter.Value()) // selalu 1000
}`,
        explanation:
          'sync.Mutex melindungi field value agar hanya satu goroutine yang mengubahnya pada satu waktu. defer Unlock memastikan lock dilepas meski terjadi panic.',
      },
    },
    {
      id: 'sec-04-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Kesimpulan:** Teori concurrency OS-level melengkapi pemahaman praktis di bahasa pemrograman. Bab ini fokus pada konsep fundamental — process, thread, race condition, mutex, semaphore, deadlock, dan memory model. Untuk implementasi praktis concurrency di ekosistem spesifik, lanjutkan ke **go-intermediate** (`ch-01-goroutines-channels`, `ch-03-sync-package`) dan **js-ts-advanced** (`ch-07-concurrency-parallelism-js-ts`) — kursus tersebut membahas goroutine/channel, Web Workers, dan worker_threads tanpa mengulang teori OS di sini.',
    },
  ],
}
