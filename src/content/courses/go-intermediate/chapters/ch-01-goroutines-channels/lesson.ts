import type { Lesson } from '@/content/types'

export const ch01Lesson: Lesson = {
  id: 'lesson-ch-01-goroutines-channels',
  estimatedMinutes: 45,
  sections: [
    {
      id: 'sec-01-basic-goroutines-channels',
      type: 'markdown',
      level: 'basic',
      title: 'Goroutine dan Channel Dasar',
      content: `## Apa itu Goroutine?

Goroutine adalah fungsi atau method yang berjalan secara konkuren bersama goroutine lain dalam satu proses. Berbeda dengan thread OS yang membutuhkan stack besar dan switching mahal, goroutine dikelola oleh Go runtime dengan stack awal yang kecil (2 KiB) dan dapat tumbuh secara dinamis. Satu program Go bisa menjalankan ratusan ribu bahkan jutaan goroutine sekaligus.

Untuk menjalankan goroutine, cukup tambahkan kata kunci "go" di depan pemanggilan fungsi:

\`\`\`go
go doWork()
\`\`\`

## Channel sebagai Media Komunikasi

Go menganjurkan komunikasi antar goroutine melalui channel, bukan memori bersama. Channel bertipe "first-class value" dan dibuat dengan "make":

\`\`\`go
ch := make(chan int)
\`\`\`

Operator "<-" digunakan untuk mengirim dan menerima:

\`\`\`go
ch <- 42    // kirim 42 ke channel
v := <-ch   // terima nilai dari channel
\`\`\`

## Buffered vs Unbuffered Channel

- **Unbuffered channel**: "make(chan int)". Pengirim akan blok sampai ada penerima, dan penerima akan blok sampai ada pengirim. Cocok untuk sinkronisasi ketat.
- **Buffered channel**: "make(chan int, 3)". Pengirim hanya blok jika buffer sudah penuh. Penerima hanya blok jika buffer kosong. Cocok untuk pipeline atau antrian kerja.

Channel membuat program konkuren lebih mudah diprediksi karena data mengalir secara eksplisit.`,
    },
    {
      id: 'sec-01-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-01-js',
        filename: 'sequential-work.js',
        language: 'javascript',
        title: 'JavaScript: Eksekusi Sequential dengan Promise',
        code: `function fetchUser(id) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id, name: 'User ' + id }), 100);
  });
}

async function main() {
  const users = [];
  for (let i = 1; i <= 3; i++) {
    users.push(await fetchUser(i));
  }
  console.log(users);
}

main();`,
        explanation:
          'Di JavaScript, konkurensi berbasis event loop dan Promise. Kode di atas menjalankan fetch secara sequential. Untuk menjalankannya paralel, kita bisa menggunakan Promise.all.',
      },
    },
    {
      id: 'sec-01-intermediate-channel-patterns',
      type: 'markdown',
      level: 'intermediate',
      title: 'Arah Channel, Range, Close, dan Select',
      content: `## Arah Channel

Channel bisa memiliki arah:

- "chan T": bisa kirim dan terima.
- "chan<- T": hanya bisa kirim (send-only).
- "<-chan T": hanya bisa terima (receive-only).

Arah channel membantu menjaga kontrak fungsi agar tidak mengirim ke channel yang seharusnya hanya dibaca.

## Menutup Channel

Pengirim bisa menutup channel dengan "close(ch)". Penerima kemudian mendeteksi penutupan melalui bentuk kedua dari receive:

\`\`\`go
v, ok := <-ch
if !ok {
  // channel sudah ditutup dan tidak ada data lagi
}
\`\`\`

## Range over Channel

\`\`\`go
for v := range ch {
  fmt.Println(v)
}
\`\`\`

Loop di atas akan terus menerima sampai channel ditutup.

## Select

"select" memungkinkan menunggu beberapa operasi channel sekaligus. Jika lebih dari satu channel siap, Go memilih secara pseudo-random untuk menghindari starvation.

\`\`\`go
select {
case v := <-ch1:
  fmt.Println("dari ch1:", v)
case ch2 <- 42:
  fmt.Println("terkirim ke ch2")
case <-time.After(1 * time.Second):
  fmt.Println("timeout")
}
\`\`\`

Select juga bisa memiliki default case untuk operasi non-blocking.`,
    },
    {
      id: 'sec-01-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-01-ts',
        filename: 'typed-async-queue.ts',
        language: 'typescript',
        title: 'TypeScript: Typed Async Queue dengan Generic',
        code: `type SendOnly<T> = {
  send: (value: T) => Promise<void>;
};

type ReceiveOnly<T> = {
  receive: () => Promise<T | undefined>;
};

function createAsyncQueue<T>(capacity = 0): SendOnly<T> & ReceiveOnly<T> {
  const buffer: T[] = [];
  const waiters: Array<(value?: T) => void> = [];

  return {
    async send(value: T) {
      if (waiters.length > 0) {
        waiters.shift()!(value);
        return;
      }
      if (capacity > 0 && buffer.length >= capacity) {
        await new Promise<void>((resolve) => {
          const check = () => {
            if (buffer.length < capacity) {
              resolve();
            } else {
              setImmediate(check);
            }
          };
          check();
        });
      }
      buffer.push(value);
    },

    async receive() {
      if (buffer.length > 0) return buffer.shift();
      return new Promise<T | undefined>((resolve) => waiters.push(resolve));
    },
  };
}

async function main() {
  const queue = createAsyncQueue<string>(2);
  await queue.send('halo');
  console.log(await queue.receive());
}

main();`,
        explanation:
          'TypeScript tidak memiliki channel bawaan, tapi kita bisa mensimulasikan send-only/receive-only contract dan buffering dengan generic type. Konsep ini mirip dengan channel direction di Go.',
      },
    },
    {
      id: 'sec-01-advanced-scheduler-internals',
      type: 'markdown',
      level: 'advanced',
      title: 'Go Scheduler dan Channel Internals',
      content: `## Model GMP: Goroutine, Machine, Processor

Go runtime mengimplementasikan scheduler preemptif berbasis model GMP:

- **G (Goroutine)**: unit eksekusi ringan dengan stack kecil yang bisa tumbuh.
- **M (Machine)**: thread OS yang mengeksekusi kode Go.
- **P (Processor)**: sumber daya logis yang menyediakan antrian goroutine lokal dan memetakan G ke M. Jumlah P default sama dengan GOMAXPROCS.

Ketika goroutine memanggil "go f()", G baru dimasukkan ke antrian global atau antrian P lokal. M mencuri (work stealing) dari P lain jika antrian-nya kosong, memastikan beban tersebar. Scheduler memicu context switch pada titik-titik tertentu, seperti pemanggilan fungsi, pemeriksaan syscall, atau channel operation.

## Struktur hchannel

Channel di Go diimplementasikan sebagai struct "hchannel" di runtime. Komponen utamanya:

- **buf**: circular queue untuk buffered channel.
- **sendq dan recvq**: queue goroutine yang sedang menunggu untuk mengirim atau menerima.
- **lock**: mutex untuk melindungi operasi channel.

Ketika receiver belum siap pada unbuffered channel, sender dimasukkan ke sendq dan di-park. Receiver kemudian membangunkan sender. Mekanisme ini membuat unbuffered channel menjadi handshake yang efisien.

## Nil Channel

Channel yang nil ("var ch chan int") akan selalu menyebabkan operasi send/receive blok selamanya. Namun, dalam select, case dengan nil channel diabaikan. Trik ini sering dipakai untuk menonaktifkan case tertentu secara dinamis.

## Fan-out / Fan-in

Fan-out: satu goroutine mengirim tugas ke banyak worker goroutine.
Fan-in: banyak goroutine mengirim hasil ke satu goroutine pengumpul.

Pola ini memanfaatkan channel sebagai penghubung dan membuat pipeline konkuren yang mudah dikomposisikan.`,
    },
    {
      id: 'sec-01-go-example',
      type: 'code-example',
      codeExample: {
        id: 'code-01-go',
        filename: 'fanout_fanin.go',
        language: 'go',
        title: 'Go: Fan-out/Fan-in dengan Channel',
        code: `package main

import (
	"fmt"
	"sync"
	"time"
)

func producer(nums []int) <-chan int {
	out := make(chan int)
	go func() {
		defer close(out)
		for _, n := range nums {
			out <- n
			time.Sleep(50 * time.Millisecond)
		}
	}()
	return out
}

func worker(id int, in <-chan int, out chan<- int, wg *sync.WaitGroup) {
	defer wg.Done()
	for n := range in {
		out <- n * n
		fmt.Printf("worker %d processed %d\\n", id, n)
	}
}

func main() {
	nums := []int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
	src := producer(nums)

	results := make(chan int)
	var wg sync.WaitGroup

	for i := 1; i <= 3; i++ {
		wg.Add(1)
		go worker(i, src, results, &wg)
	}

	go func() {
		wg.Wait()
		close(results)
	}()

	var sum int
	for r := range results {
		sum += r
	}
	fmt.Println("sum of squares:", sum)
}`,
        explanation:
          'Program ini menunjukkan fan-out (3 worker membaca dari channel yang sama) dan fan-in (semua worker menulis ke channel results yang sama). sync.WaitGroup menunggu semua worker selesai sebelum results ditutup.',
      },
    },
    {
      id: 'sec-01-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Ringkasan:** Goroutine adalah unit konkuren ringan yang dikelola Go runtime. Channel menyediakan cara aman untuk berkomunikasi antar goroutine. Unbuffered channel menyinkronkan pengirim dan penerima, sementara buffered channel memungkinkan antrian terbatas. Select memudahkan multiplexing beberapa channel. Di balik layar, Go scheduler menggunakan model GMP dan channel diimplementasikan sebagai hchannel dengan queue goroutine. Jangan lupa: operasi pada nil channel akan blok selamanya.',
    },
  ],
}
