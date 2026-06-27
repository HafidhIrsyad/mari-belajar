import type { Lesson } from '@/content/types'

export const ch05Lesson: Lesson = {
  id: 'lesson-ch-05-os-and-process-management',
  estimatedMinutes: 16,
  sections: [
    {
      id: 'sec-05-basic-os',
      type: 'markdown',
      level: 'basic',
      title: 'Peran Sistem Operasi dan Konsep Proses',
      content: `## Apa itu Sistem Operasi?

**Sistem operasi (OS)** adalah perangkat lunak yang menjadi jembatan antara aplikasi dan perangkat keras. Tanpa OS, setiap program harus mengendalikan keyboard, layar, disk, dan jaringan secara manual.

Tiga peran utama OS:

1. **Abstraksi**: OS menyembunyikan kerumitan perangkat keras dengan antarmuka yang lebih sederhana, seperti file, folder, dan jendela aplikasi.
2. **Pengelolaan sumber daya**: OS menentukan proses mana yang boleh menggunakan CPU, memori, disk, dan jaringan pada suatu waktu.
3. **Isolasi**: OS memisahkan proses satu sama lain sehingga kesalahan di satu aplikasi tidak mudah merusak aplikasi lain.

## Program vs Proses

Perbedaan mendasar:

- **Program** adalah file yang berisi instruksi, biasanya tersimpan di disk. Contoh: berkas \`.exe\`, \`.js\`, atau \`.go\`.
- **Proses** adalah program yang sedang dijalankan. Setiap proses memiliki memori, register CPU, dan state sendiri.

Bayangkan resep masakan adalah program, sedangkan memasak di dapur sesuai resep adalah proses.

## Process ID (PID)

Setiap proses yang berjalan di OS mendapatkan identitas unik yang disebut **Process ID (PID)**. PID memungkinkan OS dan pengguna untuk:

- Melihat proses yang sedang aktif.
- Menghentikan proses tertentu.
- Memantau penggunaan sumber daya.

## State Dasar Proses

Secara sederhana, sebuah proses bisa berada dalam salah satu kondisi:

- **New**: proses baru dibuat.
- **Ready**: proses menunggu giliran CPU.
- **Running**: proses sedang dieksekusi CPU.
- **Waiting**: proses menunggu kejadian luar, seperti pembacaan disk atau input pengguna.
- **Terminated**: proses selesai atau dihentikan.`,
    },
    {
      id: 'sec-05-js-event-loop',
      type: 'code-example',
      codeExample: {
        id: 'code-05-js',
        filename: 'event-loop.js',
        language: 'javascript',
        title: 'JavaScript: Event Loop sebagai Model Concurrency Single-Threaded',
        code: `console.log("A: mulai");

// Callback ini masuk ke task queue dan dieksekusi nanti
setTimeout(() => {
  console.log("C: timeout selesai");
}, 0);

// Promise callback masuk ke microtask queue, diprioritaskan sebelum task queue
Promise.resolve().then(() => {
  console.log("B: promise selesai");
});

console.log("D: akhir sinkron");

// Urutan output:
// A: mulai
// D: akhir sinkron
// B: promise selesai
// C: timeout selesai`,
        explanation:
          'JavaScript berjalan single-threaded, tetapi event loop memungkinkan tugas asynchronous ditangguhkan dan dijalankan setelah kode sinkron selesai. Microtask queue diproses sebelum task queue biasa.',
      },
    },
    {
      id: 'sec-05-intermediate-lifecycle',
      type: 'markdown',
      level: 'intermediate',
      title: 'Lifecycle Proses, Thread, dan Scheduling',
      content: `## Lifecycle Proses

Sebuah proses mengalami serangkaian transisi dari lahir hingga selesai:

\`\`\`text
new -> ready -> running -> waiting -> terminated
\`\`\`

Penjelasan singkat:

- **New**: OS sedang mempersiapkan proses, misalnya dengan memuat program ke memori.
- **Ready**: proses sudah siap dijalankan tetapi sedang menunggu giliran CPU.
- **Running**: proses sedang dieksekusi oleh CPU.
- **Waiting**: proses berhenti sementara karena menunggu I/O atau kejadian lain.
- **Terminated**: proses selesai dieksekusi dan sumber dayanya dibersihkan.

## Thread vs Process

**Thread** adalah unit eksekusi terkecil di dalam sebuah proses. Satu proses bisa memiliki satu atau banyak thread.

| Aspek | Process | Thread |
|-------|---------|--------|
| Memori | Setiap proses memiliki ruang memori sendiri | Thread dalam proses yang sama berbagi memori |
| Isolasi | Proses terisolasi satu sama lain | Thread tidak terisolasi, kesalahan satu thread bisa memengaruhi proses |
| Overhead | Membuat proses lebih berat | Membuat thread lebih ringan |
| Komunikasi | Butuh mekanisme IPC | Bisa berbagi data langsung melalui memori bersama |

## Scheduling Sederhana

CPU biasanya lebih sedikit daripada proses yang ingin berjalan. Oleh karena itu, OS menggunakan **scheduler** untuk memutuskan urutan eksekusi.

### FIFO (First In, First Out)

Proses dijalankan sesuai urutan kedatangan. Sederhana dan adil, tetapi proses yang membutuhkan waktu lama bisa membuat proses lain menunggu lama.

### Round Robin

Setiap proses mendapatkan **time slice** atau kuota waktu yang sama, misalnya 10 ms. Jika proses belum selesai, ia kembali ke antrean ready dan menunggu giliran berikutnya. Round Robin memberikan respons yang lebih merata dibanding FIFO.`,
    },
    {
      id: 'sec-05-ts-task-queue',
      type: 'code-example',
      codeExample: {
        id: 'code-05-ts',
        filename: 'task-queue.ts',
        language: 'typescript',
        title: 'TypeScript: Simulasi Task Queue dengan Promise',
        code: `type Task = {
  name: string;
  durationMs: number;
};

function runTaskQueue(tasks: Task[]): Promise<string[]> {
  return Promise.all(
    tasks.map(
      (task) =>
        new Promise<string>((resolve) => {
          setTimeout(() => {
            resolve(\`\${task.name} selesai dalam \${task.durationMs}ms\`);
          }, task.durationMs);
        })
    )
  );
}

const tasks: Task[] = [
  { name: "Backup database", durationMs: 300 },
  { name: "Kirim email", durationMs: 100 },
  { name: "Generate laporan", durationMs: 200 },
];

runTaskQueue(tasks).then((results) => {
  console.log("Semua tugas selesai:");
  console.log(results);
});`,
        explanation:
          'Promise.all menjalankan banyak tugas secara concurrent dalam satu thread. Meskipun tugas dimulai bersamaan, event loop menangani penyelesaiannya satu per satu sesuai urutan waktu.',
      },
    },
    {
      id: 'sec-05-advanced-concurrency',
      type: 'markdown',
      level: 'advanced',
      title: 'Concurrency, Parallelism, IPC, dan Virtual Memory',
      content: `## Concurrency vs Parallelism

Dua konsep yang sering tertukar:

- **Concurrency** berarti banyak tugas sedang berlangsung dalam periode waktu tertentu, tetapi tidak harus benar-benar bersamaan. Seperti seorang koki yang bergantian mengaduk sup dan memotong sayur.
- **Parallelism** berarti banyak tugas benar-benar dieksekusi pada waktu yang bersamaan, biasanya dengan banyak CPU core. Seperti beberapa koki yang masing-masing mengerjakan hidangan berbeda secara bersamaan.

JavaScript di browser dan Node.js umumnya concurrent melalui event loop, bukan parallel. Go dan beberapa bahasa lain mendukung parallelism melalui thread atau goroutine.

## Inter-Process Communication (IPC)

Karena proses terisolasi, mereka tidak bisa berbagi memori secara langsung. **IPC** adalah mekanisme agar proses bisa bertukar informasi:

- **Pipes**: saluran satu arah untuk mengirim data antar proses.
- **Message queues**: antrean pesan yang bisa dibaca oleh proses lain.
- **Shared memory**: sebagian kecil memori yang sengaja dibagikan antar proses.
- **Sockets**: komunikasi antar proses yang bisa berjalan di mesin yang berbeda.

## Virtual Memory dan Paging (Pengantar)

**Virtual memory** memungkinkan setiap proses merasa memiliki memori yang besar dan terpisah, meskipun secara fisik RAM terbatas. OS memetakan alamat virtual ke alamat fisik menggunakan struktur data yang disebut **page table**.

**Paging** membagi memori menjadi blok-blok berukuran tetap yang disebut *page*. Jika page yang dibutuhkan tidak ada di RAM, OS akan memuatnya dari disk melalui mekanisme *page fault*.

> Catatan: topik goroutine, channel, dan concurrency di Go hanya diperkenalkan secara ringkas di Phase 1. Deep-dive akan dibahas pada milestone berikutnya.`,
    },
    {
      id: 'sec-05-go-goroutine',
      type: 'code-example',
      codeExample: {
        id: 'code-05-go',
        filename: 'main.go',
        language: 'go',
        title: 'Go: Pengenalan Goroutine dan sync.WaitGroup',
        code: `package main

import (
	"fmt"
	"sync"
	"time"
)

func worker(id int, wg *sync.WaitGroup) {
	defer wg.Done()
	fmt.Printf("Worker %d mulai\\n", id)
	time.Sleep(100 * time.Millisecond)
	fmt.Printf("Worker %d selesai\\n", id)
}

func main() {
	var wg sync.WaitGroup

	for i := 1; i <= 3; i++ {
		wg.Add(1)
		go worker(i, &wg)
	}

	fmt.Println("Menunggu semua goroutine selesai...")
	wg.Wait()
	fmt.Println("Semua worker selesai")
}`,
        explanation:
          'Keyword go meluncurkan fungsi sebagai goroutine yang berjalan secara concurrent. sync.WaitGroup menunggu semua goroutine selesai sebelum program berakhir. Ini hanya pengenalan ringkas untuk fondasi Phase 1.',
      },
    },
    {
      id: 'sec-05-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Ringkasan:** Sistem operasi menyediakan abstraksi, pengelolaan sumber daya, dan isolasi antar proses. Program adalah file statis, sedangkan proses adalah instansi program yang sedang berjalan dengan PID dan state. Thread memungkinkan concurrent execution dalam satu proses. Lifecycle proses meliputi new, ready, running, waiting, dan terminated. Scheduling FIFO dan Round Robin menentukan urutan proses mendapatkan CPU. Concurrency berarti banyak tugas sedang berlangsung, parallelism berarti banyak tugas benar-benar berjalan bersamaan, dan IPC serta virtual memory menjadi fondasi untuk sistem yang lebih kompleks.',
    },
  ],
}
