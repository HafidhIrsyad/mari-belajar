import type { Lesson } from '@/content/types'

export const ch07Lesson: Lesson = {
  id: 'lesson-ch-07-discrete-math-logic',
  estimatedMinutes: 48,
  sections: [
    {
      id: 'sec-07-basic-logic',
      type: 'markdown',
      level: 'basic',
      title: 'Proposisi, Truth Table, dan Implikasi',
      content: `## Proposisi

**Proposisi** adalah pernyataan yang memiliki nilai kebenaran tunggal: **true (T)** atau **false (F)**. Contoh proposisi:

- "2 + 2 = 4" → T
- "Jakarta adalah ibu kota Indonesia" → T
- "Semua bilangan genap > 100" → F

Bukan proposisi: "Berapa cuaca hari ini?" (pertanyaan), "x + 1 = 5" (tergantung x).

## Operator Logika

| Operator | Simbol | Arti |
|----------|--------|------|
| NOT | ¬P | negasi |
| AND | P ∧ Q | keduanya true |
| OR | P ∨ Q | minimal satu true |
| IMPLIES | P → Q | jika P maka Q |
| IFF | P ↔ Q | P dan Q sama nilai |

## Truth Table Implikasi

**P → Q** false **hanya** ketika P true dan Q false. Ini sering membingungkan pemula karena "implikasi" sehari-hari menyiratkan kausalitas, padahal secara logika hanya tentang nilai kebenaran.

| P | Q | P → Q |
|---|---|-------|
| T | T | T |
| T | F | F |
| F | T | T |
| F | F | T |

**Kontrapositif**: P → Q setara dengan ¬Q → ¬P. Bukti sering lebih mudah dengan kontrapositif.

## Quantifier (Pengantar)

- **∀** (for all): "untuk setiap x, ..."
- **∃** (exists): "ada x sedemikian sehingga ..."

Contoh: "Untuk setiap bilangan genap n, n² genap" dapat ditulis ∀n (Even(n) → Even(n²)).`,
    },
    {
      id: 'sec-07-go-basic',
      type: 'code-example',
      codeExample: {
        id: 'code-07-go-basic',
        filename: 'truth_table.go',
        language: 'go',
        title: 'Go: Generator Truth Table untuk Implikasi',
        code: `package main

import "fmt"

func implies(p, q bool) bool {
	return !p || q
}

func iff(p, q bool) bool {
	return p == q
}

func generateTruthTable(binaryOp func(bool, bool) bool, label string) {
	fmt.Printf("\n=== %s ===\n", label)
	fmt.Println("P | Q | Result")
	fmt.Println("--+---+-------")
	for _, p := range []bool{false, true} {
		for _, q := range []bool{false, true} {
			result := binaryOp(p, q)
			pStr, qStr, rStr := "F", "F", "F"
			if p {
				pStr = "T"
			}
			if q {
				qStr = "T"
			}
			if result {
				rStr = "T"
			}
			fmt.Printf("%s | %s | %s\n", pStr, qStr, rStr)
		}
	}
}

func contrapositive(p, q bool) bool {
	return implies(!q, !p)
}

func main() {
	generateTruthTable(implies, "P → Q (implies)")
	generateTruthTable(iff, "P ↔ Q (iff)")

	fmt.Println("\nKontrapositif setara:", implies(true, false) == contrapositive(true, false))
}`,
        explanation:
          'Implikasi P → Q diimplementasikan sebagai !P || Q — setara dengan definisi truth table. Kontrapositif ¬Q → ¬P memiliki kolom result identik.',
      },
    },
    {
      id: 'sec-07-intermediate-induction',
      type: 'markdown',
      level: 'intermediate',
      title: 'Induksi Matematika dan Relasi Rekurens',
      content: `## Induksi Matematika

Induksi digunakan untuk membuktikan pernyataan P(n) untuk semua n ≥ n₀:

1. **Base case**: buktikan P(n₀) benar.
2. **Inductive step**: asumsikan P(k) benar (hipotesis induksi), buktikan P(k+1) benar.

Contoh klasik: buktikan 1 + 2 + ... + n = n(n+1)/2.

- Base: n=1 → 1 = 1(2)/2 = 1 ✓
- Inductive: asumsikan 1+...+k = k(k+1)/2. Tambah (k+1):
  k(k+1)/2 + (k+1) = (k+1)(k/2 + 1) = (k+1)(k+2)/2 ✓

## Strong Induction

Kadang P(k+1) membutuhkan bukan hanya P(k) tetapi semua P(j) untuk j < k+1. **Strong induction** mengasumsikan P(n₀), P(n₀+1), ..., P(k) semua benar.

Contoh: setiap bilangan ≥ 2 dapat difaktorkan menjadi prima (Fundamental Theorem of Arithmetic).

## Relasi Rekurens

Algoritma divide-and-conquer sering memiliki kompleksitas rekursif:

- **Merge sort**: T(n) = 2T(n/2) + O(n) → O(n log n)
- **Binary search**: T(n) = T(n/2) + O(1) → O(log n)
- **Naive Fibonacci**: T(n) = T(n-1) + T(n-2) → O(φⁿ)

**Master Theorem** (untuk T(n) = aT(n/b) + f(n)):

- Jika f(n) = O(n^(log_b(a) - ε)) → T(n) = Θ(n^(log_b(a)))
- Jika f(n) = Θ(n^(log_b(a))) → T(n) = Θ(n^(log_b(a)) log n)
- Jika f(n) = Ω(n^(log_b(a) + ε)) → T(n) = Θ(f(n))

Untuk merge sort: a=2, b=2, f(n)=n → log₂2=1 → case 2 → Θ(n log n).

## Loop Invariant

Induksi sering muncul sebagai **loop invariant** dalam pembuktian correctness algoritma: kondisi yang true sebelum dan sesudah setiap iterasi, dan membantu membuktikan terminasi dan correctness.`,
    },
    {
      id: 'sec-07-go-intermediate',
      type: 'code-example',
      codeExample: {
        id: 'code-07-go-intermediate',
        filename: 'merge_sort.go',
        language: 'go',
        title: 'Go: Merge Sort dan Analisis Rekurens',
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

func merge(a, b []int) []int {
	result := make([]int, 0, len(a)+len(b))
	i, j := 0, 0
	for i < len(a) && j < len(b) {
		if a[i] <= b[j] {
			result = append(result, a[i])
			i++
		} else {
			result = append(result, b[j])
			j++
		}
	}
	result = append(result, a[i:]...)
	result = append(result, b[j:]...)
	return result
}

func main() {
	// T(n) = 2T(n/2) + O(n) → O(n log n)
	// Induksi: jika mergeSort benar untuk n/2, merge menghasilkan slice terurut
	fmt.Println(mergeSort([]int{38, 27, 43, 3, 9, 82, 10}))
}`,
        explanation:
          'Merge sort membagi slice menjadi dua, rekursif sort, lalu merge — pola aT(n/b)+f(n) dengan a=2, b=2, f(n)=n. Master Theorem memberikan Θ(n log n).',
      },
    },
    {
      id: 'sec-07-advanced-counting',
      type: 'markdown',
      level: 'advanced',
      title: 'Counting, Probability, dan Aplikasi Algoritma',
      content: `## Aturan Dasar Counting

- **Rule of product**: jika ada m cara untuk A dan n cara untuk B, ada m×n cara untuk pasangan (A,B).
- **Permutasi**: urutan n objek dari n = n! cara.
- **Kombinasi**: memilih k dari n tanpa urutan = C(n,k) = n! / (k!(n-k)!).

Contoh: berapa banyak subset dari {1,2,3,4,5}? C(5,0)+...+C(5,5) = 2⁵ = 32.

## Probability untuk Algoritma

**Expected value** sering lebih informatif daripada worst case:

- **QuickSort** dengan pivot random: expected O(n log n), worst O(n²).
- **Hash table** dengan hash uniform: expected O(1) lookup, worst O(n) jika semua collision.
- **Birthday problem**: dengan ~23 orang, probabilitas collision ulang tahun > 50%. Analog: hash collision jauh lebih mungkin dari intuisi.

## Probabilistic Analysis

Monte Carlo dan Las Vegas algorithm menggunakan randomness:

- **Monte Carlo**: selalu cepat, jawaban bisa salah dengan probabilitas kecil.
- **Las Vegas**: jawaban selalu benar, runtime random.

Bloom filter: struktur probabilistic — "definitely not in set" atau "probably in set".

## Logika dalam Verifikasi Program

Hoare triple {P} S {Q}: jika precondition P true sebelum S, postcondition Q true setelah S (jika S terminates).

Contoh: loop invariant untuk linear search — "jika key ada di arr[0..i-1], belum ditemukan". Induksi membuktikan invariant dipertahankan setiap iterasi.

## Hubungan dengan Kompleksitas

Big-O adalah upper bound asymptotic. Induksi dan rekurens memberikan **bukti formal** bahwa bound tersebut tight. Counting membantu analisis average case dan space complexity (jumlah node tree, jumlah state automata).`,
    },
    {
      id: 'sec-07-go-advanced',
      type: 'code-example',
      codeExample: {
        id: 'code-07-go-advanced',
        filename: 'induction.go',
        language: 'go',
        title: 'Go: Verifikasi Rumus Induksi dan Fibonacci Memoization',
        code: `package main

import "fmt"

// Buktikan via program: sum(1..n) = n*(n+1)/2
func sumFormula(n int) int {
	return n * (n + 1) / 2
}

func sumLoop(n int) int {
	total := 0
	for i := 1; i <= n; i++ {
		total += i
	}
	return total
}

// Fibonacci rekursif O(2^n) vs memoized O(n)
func fibNaive(n int) int {
	if n <= 1 {
		return n
	}
	return fibNaive(n-1) + fibNaive(n-2)
}

func fibMemo(n int, memo map[int]int) int {
	if v, ok := memo[n]; ok {
		return v
	}
	if n <= 1 {
		return n
	}
	memo[n] = fibMemo(n-1, memo) + fibMemo(n-2, memo)
	return memo[n]
}

func main() {
	for n := 1; n <= 100; n++ {
		if sumFormula(n) != sumLoop(n) {
			fmt.Println("Mismatch at n=", n)
			return
		}
	}
	fmt.Println("Induction formula verified for n=1..100")

	fmt.Println("fib(10) naive:", fibNaive(10))
	fmt.Println("fib(50) memo:", fibMemo(50, make(map[int]int)))
}`,
        explanation:
          'Verifikasi numerik rumus induksi memperkuat bukti formal. Fibonacci naive menunjukkan rekurens eksponensial; memoization mengubah T(n)=T(n-1)+T(n-2)+O(1) menjadi O(n) dengan induksi pada subproblem.',
      },
    },
    {
      id: 'sec-07-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Kesimpulan:** Logika dan matematika diskrit bukan teori terpisah — mereka adalah bahasa untuk membuktikan algoritma benar dan menganalisis kompleksitasnya. Induksi, rekurens, dan counting muncul berulang di cs-intermediate chapter algoritma lanjut dan cs-advanced. Kuasai truth table dan implikasi sebelum mendalami proof techniques.',
    },
  ],
}
