import type { Lesson } from '@/content/types'

export const ch06Lesson: Lesson = {
  id: 'lesson-ch-06-algorithmic-performance-analysis',
  estimatedMinutes: 50,
  sections: [
    {
      id: 'sec-06-basic-amortized',
      type: 'markdown',
      level: 'basic',
      title: 'Analisis Amortized',
      content: `## Worst Case vs Amortized

**Worst-case analysis** mengukur biaya operasi tunggal dalam skenario terburuk. **Amortized analysis** meratakan biaya operasi mahal ke seluruh rangkaian operasi, memberikan batas rata-rata per operasi.

Contoh klasik: **dynamic array** (vector) yang menggandakan kapasitas saat penuh.

\`\`\`text
Operasi push biasa: O(1)
Operasi resize (copy n elemen): O(n) — jarang terjadi

Amortized cost per push: O(1)
\`\`\`

## Tiga Metode Analisis Amortized

1. **Aggregate method**: total biaya n operasi dibagi n.
   - n push ke dynamic array: total copy = n + n/2 + n/4 + ... < 2n → amortized O(1).

2. **Accounting method**: setiap operasi "menabung" kredit untuk operasi mahal mendatang.
   - Push menabung 1 kredit; resize memakai kredit yang terkumpul.

3. **Potential method**: mendefinisikan fungsi potensial Φ pada struktur data.
   - Amortized cost = actual cost + ΔΦ.

## Contoh Lain: Union-Find dengan Path Compression

Operasi find dan union pada disjoint-set dengan path compression dan union by rank memiliki **amortized cost hampir O(1)** per operasi, meskipun worst-case tunggal bisa O(log n).

Amortized analysis penting karena struktur data real-world sering memiliki operasi jarang mahal yang diratakan oleh operasi rutin murah.`,
    },
    {
      id: 'sec-06-go-basic',
      type: 'code-example',
      codeExample: {
        id: 'code-06-go-basic',
        filename: 'dynamic_array.go',
        language: 'go',
        title: 'Go: Dynamic Array dengan Amortized O(1) Push',
        code: `package main

import "fmt"

type DynamicArray struct {
	data     []int
	size     int
	capacity int
}

func NewDynamicArray() *DynamicArray {
	return &DynamicArray{
		data:     make([]int, 1),
		capacity: 1,
	}
}

func (a *DynamicArray) Push(value int) {
	if a.size == a.capacity {
		a.resize(a.capacity * 2)
	}
	a.data[a.size] = value
	a.size++
}

func (a *DynamicArray) resize(newCapacity int) {
	newData := make([]int, newCapacity)
	copy(newData, a.data[:a.size])
	a.data = newData
	a.capacity = newCapacity
}

func main() {
	arr := NewDynamicArray()
	for i := 0; i < 1000; i++ {
		arr.Push(i)
	}
	fmt.Printf("size=%d capacity=%d\\n", arr.size, arr.capacity)
	// n push: total copy < 2n → amortized O(1) per push
}`,
        explanation:
          'Resize O(n) terjadi jarang (setiap 2^k elemen). Aggregate analysis menunjukkan total copy < 2n untuk n push, sehingga amortized O(1).',
      },
    },
    {
      id: 'sec-06-intermediate-amdahl-master',
      type: 'markdown',
      level: 'intermediate',
      title: 'Hukum Amdahl dan Master Theorem',
      content: `## Hukum Amdahl

**Hukum Amdahl** (1967) menetapkan batas teoretis **speedup** paralelisasi:

\`\`\`text
Speedup = 1 / ((1 - P) + P/S)

P = fraksi program yang dapat diparalelkan
S = speedup bagian paralel (jumlah prosesor)
\`\`\`

Contoh: program dengan 90% paralel (P = 0.9), 100 prosesor (S = 100):

\`\`\`text
Speedup = 1 / (0.1 + 0.9/100) = 1 / 0.109 ≈ 9.17×
\`\`\`

Meskipun 100 prosesor, speedup hanya ~9× karena 10% kode **sequential** menjadi bottleneck. Pelajaran: optimasi sequential dan mengurangi serial fraction sering lebih efektif daripada menambah core.

## Master Theorem

Master theorem menyelesaikan rekurens divide-and-conquer:

\`\`\`text
T(n) = a · T(n/b) + f(n)

a ≥ 1: jumlah submasalah
b > 1: faktor pembagian
f(n): biaya divide + combine
\`\`\`

Tiga kasus:

1. **f(n) = O(n^(log_b a - ε))** → T(n) = Θ(n^(log_b a))
   - Submasalah dominan. Contoh: merge sort → T(n) = 2T(n/2) + O(n) → Θ(n log n).

2. **f(n) = Θ(n^(log_b a) · log^k n)** → T(n) = Θ(n^(log_b a) · log^(k+1) n)
   - Seimbang. Contoh: T(n) = 2T(n/2) + O(n log n).

3. **f(n) = Ω(n^(log_b a + ε))** dan regularity → T(n) = Θ(f(n))
   - Combine dominan. Contoh: T(n) = 2T(n/2) + O(n²) → Θ(n²).

### Contoh: Merge Sort

\`\`\`text
T(n) = 2T(n/2) + O(n)
a=2, b=2, log_b(a) = 1, f(n) = O(n) = Θ(n^1)
Kasus 2 → T(n) = Θ(n log n)
\`\`\`

Master theorem memberikan shortcut tanpa expansion tree penuh.`,
    },
    {
      id: 'sec-06-visualization',
      type: 'visualization',
      visualization: {
        id: 'viz-06-sort-growth',
        component: 'sort',
        title: 'Perbandingan Pertumbuhan O(n log n)',
      },
    },
    {
      id: 'sec-06-go-intermediate',
      type: 'code-example',
      codeExample: {
        id: 'code-06-go-intermediate',
        filename: 'merge_sort.go',
        language: 'go',
        title: 'Go: Merge Sort — Penerapan Master Theorem',
        code: `package main

import "fmt"

// T(n) = 2T(n/2) + O(n) → Kasus 2 Master Theorem → Θ(n log n)
func mergeSort(arr []int) []int {
	if len(arr) <= 1 {
		return arr
	}
	mid := len(arr) / 2
	left := mergeSort(arr[:mid])
	right := mergeSort(arr[mid:])
	return merge(left, right)
}

func merge(left, right []int) []int {
	result := make([]int, 0, len(left)+len(right))
	i, j := 0, 0
	for i < len(left) && j < len(right) {
		if left[i] <= right[j] {
			result = append(result, left[i])
			i++
		} else {
			result = append(result, right[j])
			j++
		}
	}
	result = append(result, left[i:]...)
	result = append(result, right[j:]...)
	return result
}

func main() {
	data := []int{38, 27, 43, 3, 9, 82, 10}
	fmt.Println(mergeSort(data))
}`,
        explanation:
          'Merge sort: a=2, b=2, f(n)=O(n), log_b(a)=1 → Kasus 2 Master Theorem menghasilkan T(n)=Θ(n log n). Rekurens divide-and-conquer klasik untuk analisis performa.',
      },
    },
    {
      id: 'sec-06-advanced-cache-external',
      type: 'markdown',
      level: 'advanced',
      title: 'Cache-Oblivious Algorithms dan External Memory Model',
      content: `## Hierarki Memori dan Locality

Prosesor modern jauh lebih cepat dari RAM, dan RAM jauh lebih cepat dari disk. **Memory hierarchy**: register → L1 → L2 → L3 cache → RAM → SSD/HDD.

**Prinsip locality**:
- **Temporal locality**: akses ulang data yang baru digunakan.
- **Spatial locality**: akses data berdekatan (cache line).

Algoritma yang cache-friendly (contoh: merge sort, blocked matrix multiply) jauh lebih cepat dalam praktik meskipun kompleksitas Big-O sama.

## Cache-Oblivious Algorithms

**Cache-oblivious algorithm** optimal di **semua level cache** tanpa mengetahui ukuran cache (B) atau panjang cache line (L). Algoritma ini dirancang agar secara implisit memaksimalkan locality.

Contoh: **cache-oblivious matrix multiplication** menggunakan rekursi divide-and-conquer pada matriks sehingga submasalah muat di cache terlepas dari parameter hardware.

Keuntungan:
- Satu implementasi optimal di berbagai mesin.
- Tidak perlu tuning parameter cache per platform.

## External Memory Model (I/O Model)

Ketika data tidak muat di RAM, **external memory model** (Aggarwal-Vitter) menjadi relevan:

\`\`\`text
Parameter:
  N = jumlah elemen
  M = ukuran memori internal (RAM)
  B = ukuran block transfer (page size)

Satu I/O operation = transfer satu block B elemen antara disk dan RAM.
Biaya diukur dalam jumlah I/O, bukan operasi CPU.
\`\`\`

### Lower Bound Sorting

Sorting N elemen dalam external memory membutuhkan minimal:

\`\`\`text
Ω((N/B) · log_{M/B}(N/B)) I/O operations
\`\`\`

Algoritma **external merge sort** mencapai batas ini: sort run seukuran M, lalu multi-way merge dengan buffer M/B.

### Perbandingan Model

| Model | Metrik | Contoh |
|-------|--------|--------|
| RAM | Operasi CPU, O(n log n) comparisons | Quick sort in-memory |
| Cache-aware | Cache misses | Blocked matrix multiply |
| Cache-oblivious | Optimal di semua cache | Recursive matrix multiply |
| External memory | I/O operations | External merge sort |

Memahami model yang tepat mencegah optimasi prematur: algoritma O(n log n) in-memory bisa sangat lambat jika data di disk karena I/O dominan.`,
    },
    {
      id: 'sec-06-go-advanced',
      type: 'code-example',
      codeExample: {
        id: 'code-06-go-advanced',
        filename: 'blocked_multiply.go',
        language: 'go',
        title: 'Go: Blocked Matrix Multiply — Cache-Friendly',
        code: `package main

import "fmt"

const blockSize = 32

func blockedMultiply(a, b, c [][]int, n int) {
	for i0 := 0; i0 < n; i0 += blockSize {
		for j0 := 0; j0 < n; j0 += blockSize {
			for k0 := 0; k0 < n; k0 += blockSize {
				for i := i0; i < i0+blockSize && i < n; i++ {
					for j := j0; j < j0+blockSize && j < n; j++ {
						sum := c[i][j]
						for k := k0; k < k0+blockSize && k < n; k++ {
							sum += a[i][k] * b[k][j]
						}
						c[i][j] = sum
					}
				}
			}
		}
	}
}

func main() {
	n := 64
	a := makeMatrix(n, 1)
	b := makeMatrix(n, 1)
	c := makeMatrix(n, 0)
	blockedMultiply(a, b, c, n)
	fmt.Printf("c[0][0]=%d (blocked %dx%d)\\n", c[0][0], blockSize, blockSize)
}

func makeMatrix(n, val int) [][]int {
	m := make([][]int, n)
	for i := range m {
		m[i] = make([]int, n)
		for j := range m[i] {
			m[i][j] = val
		}
	}
	return m
}`,
        explanation:
          'Blocked (tiled) matrix multiply memaksimalkan spatial locality — sub-blok muat di cache L1/L2. Prinsip yang sama mendasari cache-oblivious algorithms tanpa tuning parameter per platform.',
      },
    },
    {
      id: 'sec-06-cross-link',
      type: 'callout',
      calloutType: 'tip',
      content:
        '**Pengukuran Empiris:** Teori analisis performa melengkapi praktik benchmarking. Pelajari pengukuran waktu dan memori di [Go Intermediate — Benchmarking & Profiling](/courses/go-intermediate/ch-08-benchmarking-profiling), yang membahas testing.B, pprof, dan optimasi berbasis data profil.',
    },
    {
      id: 'sec-06-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Kesimpulan:** Analisis performa algoritmik melampaui Big-O sederhana. Amortized analysis untuk struktur data dinamis, Amdahl untuk batas paralelisasi, master theorem untuk rekurens, cache-oblivious untuk locality, dan external memory model untuk data skala besar. Pilih model analisis sesuai constraint hardware yang relevan.',
    },
  ],
}
