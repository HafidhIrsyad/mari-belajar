import type { Lesson } from '@/content/types'

export const ch02Lesson: Lesson = {
  id: 'lesson-ch-02-advanced-operating-systems',
  estimatedMinutes: 55,
  sections: [
    {
      id: 'sec-02-basic-kernel-userspace',
      type: 'markdown',
      level: 'basic',
      title: 'Kernel vs User Space dan Scheduling Dasar',
      content: `## Arsitektur OS: Kernel dan User Space

Sistem operasi modern membagi eksekusi menjadi dua ruang:

- **Kernel space (ring 0)**: kode privileged yang mengontrol CPU, memori, perangkat keras, dan interrupt. Crash di sini bisa merusak seluruh sistem (kernel panic).
- **User space (ring 3)**: aplikasi biasa (browser, editor, server) berjalan terisolasi. Crash aplikasi tidak merusak kernel atau aplikasi lain.

Aplikasi user space **tidak boleh** langsung mengakses hardware. Semua operasi sensitif — baca file, alokasi memori, kirim paket jaringan — melalui **system call** ke kernel.

\`\`\`text
Aplikasi User Space
        ↓ system call (read, write, mmap, fork, ...)
Kernel Space
        ↓ driver / hardware abstraction
Perangkat Keras (CPU, RAM, Disk, NIC)
\`\`\`

## Process Control Block (PCB)

Setiap proses di OS direpresentasikan oleh **PCB** yang menyimpan:

- Process ID (PID), state (new/ready/running/waiting/terminated)
- Program counter, register CPU, stack pointer
- Informasi scheduling (prioritas, vruntime)
- Pointer ke page table (virtual memory)

## Scheduling: FCFS dan Round Robin

**CPU scheduling** menentukan proses mana yang dieksekusi saat CPU idle.

### FCFS (First-Come First-Served)

Proses dijalankan sesuai urutan kedatangan. Non-preemptive: proses yang sudah dapat CPU berjalan sampai selesai atau blocking I/O.

- **Keuntungan**: sederhana, adil secara FIFO.
- **Kelemahan**: convoy effect — proses panjang memblokir proses pendek; tidak responsif untuk interaktif.

### Round Robin (RR)

Setiap proses mendapat **time quantum** (mis. 10 ms). Jika belum selesai, di-preempt dan kembali ke antrean ready.

- **Keuntungan**: responsif, fair untuk workload interaktif.
- **Kelemahan**: overhead context switch jika quantum terlalu kecil; turnaround time buruk jika quantum terlalu besar.`,
    },
    {
      id: 'sec-02-go-basic',
      type: 'code-example',
      codeExample: {
        id: 'code-02-go-basic',
        filename: 'round_robin.go',
        language: 'go',
        title: 'Go: Simulasi Round Robin Scheduling',
        code: `package main

import "fmt"

type Process struct {
	PID       string
	Burst     int
	Remaining int
}

type TimelineEntry struct {
	PID   string
	Start int
	End   int
}

func roundRobin(processes []Process, quantum int) []TimelineEntry {
	queue := make([]Process, len(processes))
	copy(queue, processes)
	for i := range queue {
		queue[i].Remaining = queue[i].Burst
	}

	var timeline []TimelineEntry
	time := 0

	for len(queue) > 0 {
		current := queue[0]
		queue = queue[1:]

		runTime := quantum
		if current.Remaining < quantum {
			runTime = current.Remaining
		}

		timeline = append(timeline, TimelineEntry{
			PID: current.PID, Start: time, End: time + runTime,
		})
		time += runTime
		current.Remaining -= runTime

		if current.Remaining > 0 {
			queue = append(queue, current)
		}
	}
	return timeline
}

func main() {
	processes := []Process{
		{PID: "P1", Burst: 24},
		{PID: "P2", Burst: 3},
		{PID: "P3", Burst: 3},
	}
	for _, e := range roundRobin(processes, 4) {
		fmt.Printf("%s: %d-%d\\n", e.PID, e.Start, e.End)
	}
}`,
        explanation:
          'Simulasi Round Robin dengan quantum 4 ms. Proses P2 dan P3 (burst pendek) tidak menunggu P1 selesai total — ilustrasi fairness dibanding FCFS.',
      },
    },
    {
      id: 'sec-02-intermediate-context-cfs',
      type: 'markdown',
      level: 'intermediate',
      title: 'Context Switch, CFS, dan Virtual Memory',
      content: `## Context Switch

Saat scheduler memilih proses lain, OS melakukan **context switch**:

1. Simpan state proses lama (register, PC, stack) ke PCB-nya.
2. Pilih proses baru dari antrean ready.
3. Muat state proses baru ke CPU.
4. Flush atau invalidate **TLB** (Translation Lookaside Buffer) karena page table berbeda.

**Overhead context switch** berasal dari:

- Penyimpanan/pemulihan register
- Cache pollution — data cache proses lama tidak relevan untuk proses baru
- TLB miss setelah switch

Scheduler modern (CFS) mengurangi switch yang tidak perlu dengan time slice adaptif dan prioritas dinamis.

## Completely Fair Scheduler (CFS)

Linux CFS (sejak kernel 2.6.23) menggantikan O(1) scheduler untuk workload umum. Konsep inti:

- Setiap proses punya **vruntime** (virtual runtime) — berapa banyak CPU "waktu" yang sudah dikonsumsi, dinormalisasi dengan berat/niceness.
- Proses dengan vruntime **terkecil** dipilih berikutnya.
- Proses I/O-bound mendapat boost karena sering blocking — vruntime tidak naik saat waiting.

CFS menggunakan **red-black tree** untuk antrean runnable process — O(log n) insert/delete.

## Virtual Memory dan Page Fault

**Virtual memory** memberikan setiap proses ilusi memori kontigu dan terisolasi. OS memetakan alamat virtual ke frame fisik via **page table**.

Saat proses mengakses page yang tidak ada di RAM:

1. **Page fault** — CPU trap ke kernel.
2. OS cari page di disk (swap) atau alokasi baru.
3. Muat page ke frame, update page table.
4. Resume eksekusi proses.

Jika RAM penuh, OS harus **evict** page — inilah peran algoritma page replacement.`,
    },
    {
      id: 'sec-02-visualization',
      type: 'visualization',
      visualization: {
        id: 'viz-02-process-state',
        component: 'process-state',
        title: 'Diagram Transisi State Proses',
      },
    },
    {
      id: 'sec-02-go-intermediate',
      type: 'code-example',
      codeExample: {
        id: 'code-02-go-intermediate',
        filename: 'lru_cache.go',
        language: 'go',
        title: 'Go: LRU Cache — Analogi Page Replacement',
        code: `package main

import "fmt"

type LRUCache struct {
	capacity int
	order    []string
	data     map[string]int
}

func NewLRUCache(capacity int) *LRUCache {
	return &LRUCache{
		capacity: capacity,
		order:    make([]string, 0),
		data:     make(map[string]int),
	}
}

func (c *LRUCache) touch(key string) {
	for i, k := range c.order {
		if k == key {
			c.order = append(c.order[:i], c.order[i+1:]...)
			break
		}
	}
	c.order = append(c.order, key)
}

func (c *LRUCache) Get(key string) (int, bool) {
	val, ok := c.data[key]
	if !ok {
		return 0, false
	}
	c.touch(key)
	return val, true
}

func (c *LRUCache) Put(key string, value int) {
	if _, ok := c.data[key]; ok {
		c.data[key] = value
		c.touch(key)
		return
	}
	if len(c.data) >= c.capacity {
		oldest := c.order[0]
		c.order = c.order[1:]
		delete(c.data, oldest)
		fmt.Printf("evict %s\\n", oldest)
	}
	c.data[key] = value
	c.touch(key)
}

func main() {
	lru := NewLRUCache(3)
	lru.Put("page-A", 1)
	lru.Put("page-B", 2)
	lru.Put("page-C", 3)
	lru.Get("page-A")
	lru.Put("page-D", 4) // evict page-B
}`,
        explanation:
          'LRU cache membuang entry yang paling lama tidak diakses — analogi langsung dengan algoritma page replacement LRU di OS. Slice order melacak urutan akses terbaru.',
      },
    },
    {
      id: 'sec-02-advanced-cow-inode',
      type: 'markdown',
      level: 'advanced',
      title: 'Page Replacement, Copy-on-Write, Inode, dan Journaling',
      content: `## Algoritma Page Replacement

Saat RAM penuh dan page fault terjadi, OS harus memilih **victim page** untuk di-evict ke disk.

| Algoritma | Ide | Kelemahan |
|-----------|-----|-----------|
| **FIFO** | Evict page yang paling lama masuk | Belady anomaly |
| **LRU** | Evict page paling lama tidak diakses | Implementasi mahal (hardware counter) |
| **Clock (Second Chance)** | Circular list + reference bit — aproksimasi LRU | Tidak sempurna, tapi efisien |
| **Optimal** | Evict page yang paling lama akan diakses lagi | Tidak implementable (butuh future knowledge) |

### Clock Algorithm

Page disusun dalam circular list dengan **reference bit**. Pointer "clock hand" berputar:

- Jika reference bit = 1, set ke 0 dan lanjut.
- Jika reference bit = 0, evict page tersebut.

Ini memberikan "second chance" untuk page yang baru diakses — aproksimasi LRU tanpa counter per page.

## Copy-on-Write (COW)

**fork()** di Unix membuat proses child sebagai salinan parent. Menyalin seluruh memori parent mahal. **COW** menunda duplikasi:

1. Parent dan child share page fisik yang sama, marked read-only.
2. Saat salah satu menulis, page fault → OS alokasi frame baru, copy page, update page table.
3. Hanya page yang benar-benar ditulis yang diduplikasi.

COW dipakai juga di Docker (layer filesystem), Git (persistent data structures), dan database MVCC.

## Inode dan Filesystem

**Inode** (index node) adalah struktur metadata file di filesystem Unix-like (ext4, xfs):

- Owner, permission, timestamp
- Pointer ke data blocks (direct, indirect, double indirect)
- Ukuran file, jumlah link

Nama file disimpan di **directory entry** yang memetakan nama → inode number. Hard link = beberapa nama → inode sama. Soft link (symlink) = file terpisah berisi path.

## Journaling

Filesystem crash-safe menggunakan **journaling**:

1. Tulis operasi ke **journal** (log transaksi) di disk.
2. Commit journal.
3. Terapkan perubahan ke struktur filesystem utama.

Setelah power failure, OS **replay** journal untuk memulihkan konsistensi. ext4 mendukung mode ordered (data write setelah metadata commit), writeback, dan journal.

Trade-off: journaling menambah write amplification tetapi mencegah korupsi metadata.`,
    },
    {
      id: 'sec-02-go-advanced',
      type: 'code-example',
      codeExample: {
        id: 'code-02-go-advanced',
        filename: 'main.go',
        language: 'go',
        title: 'Go: Ilustrasi Copy-on-Write dengan Slice',
        code: `package main

import "fmt"

func main() {
	original := []int{1, 2, 3, 4, 5}
	shared := original

	fmt.Println("Sebelum write:", shared)

	shared[2] = 99

	fmt.Println("Setelah write ke shared[2]:", shared)
	fmt.Println("Original terpengaruh:", original)
	fmt.Println("Di OS nyata, fork() + COW mencegah parent terpengaruh sampai write")
}`,
        explanation:
          'Go slice berbagi underlying array — analogi konseptual COW. Di fork() Unix, parent dan child share page read-only; write memicu page fault dan copy fisik terpisah.',
      },
    },
    {
      id: 'sec-02-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Kesimpulan:** Kernel dan user space terpisah demi keamanan dan stabilitas. Scheduling FCFS sederhana tetapi rentan convoy effect; Round Robin adil dengan time quantum; CFS Linux menggunakan vruntime untuk fairness. Context switch mahal — minimalkan switch yang tidak perlu. Page replacement LRU evict page paling lama idle; clock algorithm aproksimasi efisien. COW menunda duplikasi memori; inode dan journaling menjaga konsistensi filesystem.',
    },
  ],
}
