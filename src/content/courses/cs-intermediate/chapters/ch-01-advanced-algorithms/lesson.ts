import type { Lesson } from '@/content/types'

export const ch01Lesson: Lesson = {
  id: 'lesson-ch-01-advanced-algorithms',
  estimatedMinutes: 50,
  sections: [
    {
      id: 'sec-01-basic-divide-conquer',
      type: 'markdown',
      level: 'basic',
      title: 'Divide & Conquer dan Sorting Lanjutan',
      content: `## Divide & Conquer

**Divide & conquer** (bagi dan taklukkan) adalah paradigma algoritma yang memecah masalah besar menjadi submasalah lebih kecil dengan struktur serupa, menyelesaikan masing-masing, lalu menggabungkan hasilnya. Tiga langkah inti:

1. **Divide**: pecah masalah menjadi submasalah independen.
2. **Conquer**: selesaikan submasalah (biasanya rekursif hingga base case).
3. **Combine**: gabungkan solusi submasalah menjadi solusi masalah asli.

Contoh klasik: merge sort, quick sort, binary search, dan perkalian matriks Strassen.

## Merge Sort

Merge sort membagi array menjadi dua bagian, mengurutkan masing-masing secara rekursif, lalu **merge** dua bagian terurut menjadi satu.

| Aspek | Nilai |
|-------|-------|
| Best/Average/Worst time | O(n log n) |
| Space | O(n) untuk array tambahan |
| Stabil | Ya |

Alur merge: bandingkan elemen terdepan dari dua sub-array, ambil yang lebih kecil, ulangi hingga salah satu habis, lalu salin sisa.

## Quick Sort

Quick sort memilih **pivot**, mempartisi elemen lebih kecil ke kiri dan lebih besar ke kanan, lalu rekursif pada kedua partisi.

| Aspek | Nilai |
|-------|-------|
| Average time | O(n log n) |
| Worst time | O(n²) — pivot selalu min/max |
| Space | O(log n) stack rekursif |
| Stabil | Tidak (tergantung implementasi) |

Strategi pivot: elemen tengah, random, atau median-of-three untuk mengurangi kemungkinan worst case.

## Heap Sort

Heap sort membangun **binary max-heap** dari array, lalu berulang kali menukar root (maksimum) ke akhir dan menyusun ulang heap pada sisa elemen.

| Aspek | Nilai |
|-------|-------|
| Time | O(n log n) di semua kasus |
| Space | O(1) in-place |
| Stabil | Tidak |

Heap sort berguna ketika memori terbatas dan diperlukan jaminan O(n log n) tanpa overhead merge.`,
    },
    {
      id: 'sec-01-go-basic',
      type: 'code-example',
      codeExample: {
        id: 'code-01-go-basic',
        filename: 'merge_sort.go',
        language: 'go',
        title: 'Go: Merge Sort Divide & Conquer',
        code: `package main

import "fmt"

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
	fmt.Println(mergeSort(data)) // [3 9 10 27 38 43 82]
}`,
        explanation:
          'Merge sort membagi slice menjadi dua, mengurutkan rekursif, lalu menggabungkan dengan fungsi merge yang membandingkan dua pointer. Kompleksitas waktu O(n log n).',
      },
    },
    {
      id: 'sec-01-intermediate-dp-greedy',
      type: 'markdown',
      level: 'intermediate',
      title: 'Dynamic Programming dan Greedy vs Optimal',
      content: `## Dynamic Programming (DP)

**Dynamic programming** menyelesaikan masalah dengan memecahnya menjadi submasalah yang **overlapping** (tumpang tindih) dan memiliki **optimal substructure** (solusi optimal terdiri dari solusi optimal submasalah).

Dua pendekatan utama:

- **Memoization (top-down)**: rekursi + cache hasil submasalah.
- **Tabulation (bottom-up)**: isi tabel dari base case ke target secara iteratif.

## 0/1 Knapsack

Diberikan kapasitas W dan n item dengan berat w[i] dan nilai v[i], setiap item hanya bisa diambil 0 atau 1 kali. Tujuannya memaksimalkan total nilai tanpa melebihi W.

Definisi DP:

\`dp[i][w] = nilai maksimum menggunakan item 1..i dengan kapasitas w\`

Transisi:

- Tidak ambil item i: \`dp[i][w] = dp[i-1][w]\`
- Ambil item i (jika muat): \`dp[i][w] = dp[i-1][w - w[i]] + v[i]\`

Ambil maksimum dari kedua pilihan.

## Longest Common Subsequence (LCS)

LCS mencari subsequence terpanjang yang sama antara dua string (urutan karakter dipertahankan, tidak harus kontigu).

| i \\\\ j | ε | A | B | C |
|---------|---|---|---|---|
| ε | 0 | 0 | 0 | 0 |
| A | 0 | 1 | 1 | 1 |
| B | 0 | 1 | 2 | 2 |
| D | 0 | 1 | 2 | 2 |

Jika karakter sama: \`dp[i][j] = dp[i-1][j-1] + 1\`. Jika berbeda: \`dp[i][j] = max(dp[i-1][j], dp[i][j-1])\`.

## Greedy vs Optimal

**Greedy** memilih langkah terbaik secara lokal di setiap iterasi. Cepat dan sederhana, tetapi tidak selalu menghasilkan solusi global optimal.

| Masalah | Greedy cukup? | Alasan |
|---------|---------------|--------|
| Activity selection | Ya | Greedy by finish time optimal |
| Huffman coding | Ya | Substructure optimal terpenuhi |
| 0/1 Knapsack | Tidak | Kombinasi item mempengaruhi hasil global |
| Coin change (denominasi standar) | Kadang | Tergantung denominasi koin |

Ketika greedy gagal, gunakan DP atau algoritma eksak lainnya.`,
    },
    {
      id: 'sec-01-viz-sort',
      type: 'visualization',
      visualization: {
        id: 'viz-01-sort',
        component: 'sort',
        title: 'Visualisasi Bubble Sort',
        props: { values: [38, 27, 43, 3, 9, 82, 10], algorithm: 'bubble' },
      },
    },
    {
      id: 'sec-01-go-intermediate',
      type: 'code-example',
      codeExample: {
        id: 'code-01-go-intermediate',
        filename: 'knapsack.go',
        language: 'go',
        title: 'Go: 0/1 Knapsack dengan Tabulation',
        code: `package main

import "fmt"

func knapsack01(weights, values []int, capacity int) int {
	n := len(weights)
	dp := make([][]int, n+1)
	for i := range dp {
		dp[i] = make([]int, capacity+1)
	}

	for i := 1; i <= n; i++ {
		for w := 0; w <= capacity; w++ {
			skip := dp[i-1][w]
			take := -1 << 30
			if weights[i-1] <= w {
				take = dp[i-1][w-weights[i-1]] + values[i-1]
			}
			if take > skip {
				dp[i][w] = take
			} else {
				dp[i][w] = skip
			}
		}
	}
	return dp[n][capacity]
}

func main() {
	weights := []int{2, 3, 4, 5}
	values := []int{3, 4, 5, 6}
	fmt.Println(knapsack01(weights, values, 8)) // 10
}`,
        explanation:
          'Tabel dp[i][w] menyimpan nilai maksimum dengan i item pertama dan kapasitas w. Setiap sel memilih antara skip atau take item ke-i. Kompleksitas O(n × W).',
      },
    },
    {
      id: 'sec-01-advanced-analysis',
      type: 'markdown',
      level: 'advanced',
      title: 'Analisis Lanjutan dan Optimasi DP',
      content: `## Rekurens Merge Sort dan Master Theorem

Merge sort membagi array ukuran n menjadi dua bagian n/2, melakukan merge dalam O(n):

\`T(n) = 2T(n/2) + O(n) → O(n log n)\`

Master theorem membantu menganalisis rekurens divide & conquer secara sistematis.

## Optimasi Ruang pada Knapsack

Tabel knapsack 2D dapat dioptimasi menjadi 1D karena baris i hanya bergantung pada baris i-1:

\`\`\`text
for w from W down to 0:
    dp[w] = max(dp[w], dp[w - weight[i]] + value[i])
\`\`\`

Iterasi w dari besar ke kecil mencegah item digunakan lebih dari sekali dalam iterasi yang sama.

## Rekonstruksi LCS

Setelah tabel DP terisi, LCS dapat direkonstruksi dengan backtracking dari dp[m][n]:

- Jika karakter sama: tambahkan karakter, mundur ke dp[i-1][j-1].
- Jika berbeda: mundur ke sel dengan nilai lebih besar (dp[i-1][j] atau dp[i][j-1]).

## Quick Sort dalam Praktik

Meskipun worst case O(n²), quick sort sering lebih cepat dari merge sort pada data real karena:

- In-place dengan locality cache yang baik.
- Overhead merge yang lebih kecil.
- Randomized pivot membuat worst case sangat jarang.

Library sort modern (seperti di C++ std::sort) sering menggabungkan quick sort, heap sort, dan insertion sort (introsort).

## Kapan Memilih Algoritma Sort

| Kebutuhan | Pilihan |
|-----------|---------|
| Worst case O(n log n) terjamin | Merge sort / Heap sort |
| Performa praktis terbaik | Quick sort (randomized) |
| Stabilitas diperlukan | Merge sort |
| Memori sangat terbatas | Heap sort |
| Array kecil (n < 20) | Insertion sort |`,
    },
    {
      id: 'sec-01-go-advanced',
      type: 'code-example',
      codeExample: {
        id: 'code-01-go-advanced',
        filename: 'lcs.go',
        language: 'go',
        title: 'Go: Longest Common Subsequence',
        code: `package main

import "fmt"

func lcs(a, b string) int {
	m, n := len(a), len(b)
	dp := make([][]int, m+1)
	for i := range dp {
		dp[i] = make([]int, n+1)
	}

	for i := 1; i <= m; i++ {
		for j := 1; j <= n; j++ {
			if a[i-1] == b[j-1] {
				dp[i][j] = dp[i-1][j-1] + 1
			} else if dp[i-1][j] > dp[i][j-1] {
				dp[i][j] = dp[i-1][j]
			} else {
				dp[i][j] = dp[i][j-1]
			}
		}
	}
	return dp[m][n]
}

func main() {
	fmt.Println(lcs("ABCBDAB", "BDCABA")) // 4 (BCBA)
}`,
        explanation:
          'LCS menggunakan tabel 2D: jika karakter sama, panjang bertambah 1 dari diagonal; jika berbeda, ambil maksimum dari atas atau kiri. Kompleksitas O(m × n).',
      },
    },
    {
      id: 'sec-01-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Kesimpulan:** Divide & conquer, sorting O(n log n), dan dynamic programming adalah fondasi pemecahan masalah komputasi lanjutan. Pahami kapan greedy cukup dan kapan DP diperlukan. Untuk pengantar Big-O, bubble/selection/insertion sort, dan memoization dasar, tinjau kembali bab **Algoritma dan Kompleksitas** di kursus **cs-fundamentals** (`ch-03-algorithms-and-complexity`).',
    },
  ],
}
