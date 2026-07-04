import type { Lesson } from '@/content/types'

export const ch05Lesson: Lesson = {
  id: 'lesson-ch-05-computer-architecture',
  estimatedMinutes: 50,
  sections: [
    {
      id: 'sec-05-basic-architecture',
      type: 'markdown',
      level: 'basic',
      title: 'Pipeline CPU dan Hierarki Cache',
      content: `## Dari Instruksi ke Eksekusi

CPU modern tidak mengeksekusi satu instruksi sampai selesai sebelum mengambil instruksi berikutnya. Sebaliknya, CPU menggunakan **pipeline** — analoginya seperti lini perakitan pabrik di mana setiap stasiun mengerjakan tahap berbeda secara paralel.

Tahap klasik pipeline lima stasiun:

1. **Fetch**: mengambil instruksi dari memori/instruction cache.
2. **Decode**: menerjemahkan opcode dan operand.
3. **Execute**: menjalankan operasi aritmetika/logika di ALU.
4. **Memory**: mengakses data di cache/RAM jika instruksi membutuhkan load/store.
5. **Write-back**: menulis hasil ke register.

Dengan pipeline ideal, throughput mendekati **satu instruksi per siklus clock** meskipun setiap instruksi individual membutuhkan beberapa siklus.

## Hazard Pipeline

Pipeline tidak selalu mulus. Ada tiga jenis **hazard**:

- **Structural hazard**: dua instruksi butuh resource yang sama (misalnya satu port memory).
- **Data hazard**: instruksi berikutnya butuh hasil instruksi sebelumnya yang belum selesai. Forwarding/bypassing mengatasi sebagian besar kasus ini.
- **Control hazard**: instruksi berikutnya belum diketahui karena menunggu hasil branch. Di sinilah **branch prediction** berperan.

## Hierarki Cache: L1, L2, L3

Akses RAM jauh lebih lambat daripada register CPU. Cache adalah memori kecil dan cepat yang menyimpan salinan data yang baru-baru ini diakses.

| Level | Ukuran tipikal | Latency | Dibagi antar core? |
|-------|----------------|---------|-------------------|
| L1 data | 32–64 KB | ~4 siklus | Tidak (per core) |
| L2 | 256 KB – 1 MB | ~12 siklus | Biasanya per core |
| L3 | 8–64 MB | ~40 siklus | Ya (shared) |

**L1** terbagi menjadi **L1 instruction cache (I-cache)** dan **L1 data cache (D-cache)**. **L2** dan **L3** menampung data yang tidak muat di L1.

## Locality: Temporal dan Spatial

Cache efektif karena program menunjukkan **locality**:

- **Temporal locality**: jika suatu lokasi memori diakses, kemungkinan besar akan diakses lagi dalam waktu dekat. Contoh: variabel loop counter.
- **Spatial locality**: jika suatu lokasi diakses, lokasi berdekatan kemungkinan ikut diakses. Contoh: iterasi array berurutan.

Desain struktur data yang cache-friendly — array of structs vs struct of arrays, sequential scan vs random access — dapat mempercepat program berkali lipat tanpa mengubah algoritma.`,
    },
    {
      id: 'sec-05-go-basic',
      type: 'code-example',
      codeExample: {
        id: 'code-05-go-basic',
        filename: 'cache_locality.go',
        language: 'go',
        title: 'Go: Mengukur Dampak Spatial Locality pada Array',
        code: `package main

import (
	"fmt"
	"time"
)

const size = 10_000_000

func sumSequential(arr []float64) float64 {
	var total float64
	for i := range arr {
		total += arr[i]
	}
	return total
}

func sumStrided(arr []float64, stride int) float64 {
	var total float64
	for i := 0; i < len(arr); i += stride {
		total += arr[i]
	}
	return total
}

func main() {
	matrix := make([]float64, size)
	for i := range matrix {
		matrix[i] = float64(i) * 0.001
	}

	start := time.Now()
	sumSequential(matrix)
	fmt.Println("sequential scan:", time.Since(start))

	start = time.Now()
	sumStrided(matrix, 64)
	fmt.Println("strided scan (stride=64):", time.Since(start))

	// Scan berurutan memanfaatkan spatial locality — cache line (64 byte)
	// dimuat sekali untuk banyak elemen berturut-turut.
	// Akses strided besar mem-bypass cache line dan memicu miss lebih sering.
}`,
        explanation:
          'Iterasi berurutan pada slice memanfaatkan cache line CPU (biasanya 64 byte). Akses dengan stride besar mengurangi spatial locality sehingga lebih banyak cache miss terjadi.',
      },
    },
    {
      id: 'sec-05-intermediate-vm',
      type: 'markdown',
      level: 'intermediate',
      title: 'Branch Prediction, Virtual Memory, dan Paging',
      content: `## Branch Prediction

Instruksi \`if\`, \`while\`, dan \`goto\` mengubah alur eksekusi. Pipeline harus menebak cabang mana yang akan diambil agar tidak idle.

CPU modern menggunakan **branch predictor** berbasis history (misalnya 2-bit saturating counter per entry). Jika prediksi benar, pipeline tetap penuh. Jika **misprediction** terjadi:

1. Instruksi yang salah di-fetch dibuang (pipeline flush).
2. Penalty bisa 10–20 siklus atau lebih tergantung depth pipeline.

Implikasi untuk programmer:

- Loop dengan pola predictable (selalu iterasi N kali) lebih cepat daripada branch random.
- Bit manipulation dan branchless code kadang lebih cepat di hot path.
- Sorting data sebelum processing dapat mengurangi branch misprediction.

## Virtual Memory

Setiap proses melihat ruang alamat **virtual** yang kontigu dan besar (misalnya 48-bit di x86-64), meskipun RAM fisik terbatas. OS dan hardware MMU (Memory Management Unit) menerjemahkan alamat virtual ke **physical frame**.

Keuntungan virtual memory:

- **Isolasi**: proses A tidak bisa mengakses memori proses B.
- **Overcommit**: total virtual memory semua proses bisa melebihi RAM; halaman jarang dipakai di-swap ke disk.
- **Lazy allocation**: heap bisa "dialokasikan" tanpa langsung menyentuh setiap page frame.

## Paging

Memori virtual dibagi menjadi **pages** (tipikal 4 KB). RAM fisik dibagi menjadi **frames** dengan ukuran sama. **Page table** menyimpan mapping page → frame untuk setiap proses.

Alamat virtual 64-bit (disederhanakan):

\`\`\`text
[ Virtual Page Number (VPN) | Page Offset ]
         ↓ lookup page table
[ Physical Frame Number (PFN) | Page Offset ]
\`\`\`

**Page offset** tidak berubah saat translasi — hanya VPN yang di-map ke PFN.

## TLB (Translation Lookaside Buffer)

Page table disimpan di RAM. Setiap load/store membutuhkan translasi alamat. Tanpa optimasi, setiap akses memori membutuhkan *dua* akses memori (table walk + data).

**TLB** adalah cache hardware kecil yang menyimpan entri VPN → PFN terbaru. TLB hit menyelesaikan translasi dalam ~1 siklus; TLB miss memicu **page table walk** yang jauh lebih mahal.

## Page Fault

**Page fault** terjadi ketika CPU mengakses page yang:

1. **Belum di-map** (demand paging — OS baru mengalokasikan frame saat pertama kali diakses).
2. **Di-swap ke disk** — OS harus membaca page dari swap/partition.
3. **Melanggar permission** (write ke read-only page) — OS mengirim signal SIGSEGV.

Major page fault (disk I/O) bisa memakan **microseconds hingga milliseconds** — jauh lebih mahal daripada cache miss.`,
    },
    {
      id: 'sec-05-go-intermediate',
      type: 'code-example',
      codeExample: {
        id: 'code-05-go-intermediate',
        filename: 'page_table.go',
        language: 'go',
        title: 'Go: Simulasi Page Table dan TLB',
        code: `package main

import "fmt"

const pageSize = 4096

type PageTableEntry struct {
	frameNumber int
	present     bool
	writable    bool
}

type SimpleMMU struct {
	pageTable map[int]PageTableEntry
	tlb       map[int]int
	tlbHits   int
	tlbMisses int
}

func NewSimpleMMU() *SimpleMMU {
	return &SimpleMMU{
		pageTable: make(map[int]PageTableEntry),
		tlb:       make(map[int]int),
	}
}

func (m *SimpleMMU) MapPage(virtualPage, frame int, writable bool) {
	m.pageTable[virtualPage] = PageTableEntry{
		frameNumber: frame,
		present:     true,
		writable:    writable,
	}
}

func (m *SimpleMMU) Translate(virtualAddress int) (int, error) {
	vpn := virtualAddress / pageSize
	offset := virtualAddress % pageSize

	if cachedFrame, ok := m.tlb[vpn]; ok {
		m.tlbHits++
		return cachedFrame*pageSize + offset, nil
	}

	m.tlbMisses++
	entry, ok := m.pageTable[vpn]
	if !ok || !entry.present {
		return 0, fmt.Errorf("page fault: VPN %d not present", vpn)
	}

	m.tlb[vpn] = entry.frameNumber
	return entry.frameNumber*pageSize + offset, nil
}

func (m *SimpleMMU) GetStats() (hits, misses int, hitRate float64) {
	total := m.tlbHits + m.tlbMisses
	if total == 0 {
		return m.tlbHits, m.tlbMisses, 0
	}
	return m.tlbHits, m.tlbMisses, float64(m.tlbHits) / float64(total)
}

func main() {
	mmu := NewSimpleMMU()
	mmu.MapPage(0, 10, true)
	mmu.MapPage(1, 25, true)

	fmt.Println(mmu.Translate(0x100)) // offset 0x100 di page 0
	fmt.Println(mmu.Translate(0x100)) // TLB hit
	fmt.Println(mmu.GetStats())
}`,
        explanation:
          'Simulasi sederhana menunjukkan bahwa TLB meng-cache hasil translasi VPN→PFN. Akses berulang ke page yang sama menghindari page table walk. Page fault dikembalikan sebagai error jika entri tidak present.',
      },
    },
    {
      id: 'sec-05-advanced-performance',
      type: 'markdown',
      level: 'advanced',
      title: 'Superscalar, Prefetching, dan Implikasi Performa',
      content: `## Superscalar dan Out-of-Order Execution

CPU modern tidak hanya pipelined — mereka **superscalar**, artinya dapat mengeksekusi beberapa instruksi per siklus jika tidak ada dependency. **Out-of-order execution** memungkinkan CPU menjalankan instruksi independen lebih dulu meskipun urutan program berbeda, selama **retirement** tetap in-order untuk menjaga semantik program.

Reorder buffer (ROB) dan reservation station adalah komponen internal yang mengkoordinasikan eksekusi spekulatif ini.

## Hardware Prefetching

Selain cache reaktif, CPU modern memiliki **prefetcher** yang mendeteksi pola akses (sequential, stride) dan memuat cache line berikutnya sebelum program memintanya. Prefetcher efektif untuk scan array linear tetapi bisa counter-productive untuk akses random.

## NUMA (Non-Uniform Memory Access)

Pada server multi-socket, setiap CPU socket memiliki RAM lokal. Akses ke RAM socket lain lebih lambat. Allocator dan thread pinning yang NUMA-aware dapat mengurangi latency memori signifikan.

## Mengukur di Dunia Nyata

Tools seperti \`perf stat\` (Linux), Intel VTune, atau Go \`pprof\` membantu mengidentifikasi:

- **Cache misses** (L1/L2/L3) per instruksi.
- **Branch mispredictions** per 1000 instruksi.
- **Page faults** major vs minor.

Rule of thumb untuk hot path:

1. Minimalkan working set agar muat di cache level terdekat.
2. Prefer sequential memory access.
3. Kurangi branch unpredictable di inner loop.
4. Hindari false sharing — dua thread menulis ke variabel berbeda dalam cache line yang sama.

## Hubungan dengan Layout Memori Proses

Virtual address space setiap proses terbagi menjadi region: **code/text** (read-only, executable), **data** (global/static), **heap** (alokasi dinamis, tumbuh ke atas), dan **stack** (frame fungsi, tumbuh ke bawah). MMU menerjemahkan setiap region ini melalui page table yang sama.`,
    },
    {
      id: 'sec-05-viz-memory-layout',
      type: 'visualization',
      visualization: {
        id: 'viz-05-memory-layout',
        component: 'memory-layout',
        title: 'Layout Memori Proses',
      },
    },
    {
      id: 'sec-05-go-advanced',
      type: 'code-example',
      codeExample: {
        id: 'code-05-go-advanced',
        filename: 'page_fault.go',
        language: 'go',
        title: 'Go: Alokasi Besar dan Page Fault Demand Paging',
        code: `package main

import (
	"fmt"
	"runtime"
	"time"
)

func main() {
	// Alokasi 512 MB — virtual memory reserved, physical frames
	// baru dialokasikan saat halaman pertama kali ditulis (demand paging).
	size := 512 * 1024 * 1024
	data := make([]byte, size)

	runtime.GC()
	time.Sleep(100 * time.Millisecond)

	start := time.Now()
	// Touch setiap page (4096 byte) untuk memicu page fault
	for i := 0; i < size; i += 4096 {
		data[i] = 1
	}
	elapsed := time.Since(start)

	fmt.Printf("Touched %d pages in %v\\n", size/4096, elapsed)
	fmt.Printf("First touch memicu page fault; OS mengalokasikan frame fisik.\\n")
}`,
        explanation:
          'make([]byte, n) di Go meng-reserve virtual address space. Page frame fisik baru dialokasikan OS saat program pertama kali menulis ke setiap page (minor page fault). Touching setiap 4096 byte memaksa alokasi semua frame.',
      },
    },
    {
      id: 'sec-05-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Kesimpulan:** Performa program ditentukan tidak hanya algoritma Big-O, tetapi juga bagaimana data mengalir melalui pipeline CPU, cache, TLB, dan page table. Desain cache-friendly dan pemahaman virtual memory membantu menjelaskan mengapa program "sama" bisa berbeda 10× dalam kecepatan. Pelajari juga chapter OS di cs-fundamentals untuk konteks process isolation.',
    },
  ],
}
