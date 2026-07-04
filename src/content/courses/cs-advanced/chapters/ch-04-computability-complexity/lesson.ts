import type { Lesson } from '@/content/types'

export const ch04Lesson: Lesson = {
  id: 'lesson-ch-04-computability-complexity',
  estimatedMinutes: 55,
  sections: [
    {
      id: 'sec-04-basic-turing',
      type: 'markdown',
      level: 'basic',
      title: 'Mesin Turing dan Computability',
      content: `## Mesin Turing

**Mesin Turing** (Alan Turing, 1936) adalah model matematis komputasi yang terdiri dari:

- **Tape**: pita tak terbatas dibagi sel, masing-masing berisi simbol dari alphabet Γ.
- **Head**: membaca/menulis simbol di sel saat ini, bergerak kiri (L) atau kanan (R).
- **State register**: menyimpan state saat ini dari himpunan state Q.
- **Transition function δ**: δ(q, a) → (q', b, D) — dari state q dan simbol a, pindah ke q', tulis b, gerak D.

\`\`\`text
Tape:  ... | 0 | 1 | 1 | 0 | 1 | ...
              ↑
            Head (state q)
\`\`\`

Mesin Turing **universal** — Church-Turing thesis menyatakan segala algoritma yang dapat dihitung efektif dapat dimodelkan sebagai TM. Komputer modern (dengan memori terbatas) adalah approximasi TM.

## Decidability

Masalah **decidable** jika ada algoritma (TM) yang selalu halt dan memberikan jawaban ya/tidak.

Contoh decidable:

- Apakah string palindrome?
- Apakah graf terhubung?
- Apakah angka prima?

Masalah **undecidable** jika tidak ada algoritma semacam itu.

## Halting Problem

**Halting problem**: diberikan program P dan input x, apakah P halt (selesai) pada x?

Alan Turing membuktikan halting problem **undecidable** dengan diagonalization:

1. Asumsikan ada HaltChecker(P, x) yang selalu halt dan jawab ya/tidak.
2. Konstruksi program Diagonal(P): jika HaltChecker(P,P) = ya, loop forever; else halt.
3. Jalankan Diagonal(Diagonal): kontradiksi — HaltChecker(Diagonal, Diagonal) tidak konsisten.

Implikasi: tidak ada debugger universal yang dapat menentukan apakah program arbitrary akan selesai. Static analysis dan type system membatasi subset program yang dapat dianalisis.`,
    },
    {
      id: 'sec-04-go-basic',
      type: 'code-example',
      codeExample: {
        id: 'code-04-go-basic',
        filename: 'halting_intuition.go',
        language: 'go',
        title: 'Go: Intuisi Halting — Loop Tak Terbatas',
        code: `package main

import "fmt"

func mayHalt(n int) bool {
	for n > 1 {
		if n%2 == 0 {
			n = n / 2
		} else {
			n = 3*n + 1
		}
	}
	return true
}

func infiniteLoop() {
	for {
		// tidak pernah halt
	}
}

func main() {
	fmt.Println("mayHalt(6):", mayHalt(6))
	_ = infiniteLoop
	// Tidak ada fungsi universal haltChecker(program) yang
	// selalu benar untuk semua program — halting problem undecidable
}`,
        explanation:
          'Collatz conjecture (3n+1) belum terbukti halt untuk semua n — ilustrasi bahwa menentukan halt bahkan untuk program sederhana bisa sulit. infiniteLoop jelas tidak halt, tetapi analisis umum tidak ada algoritmanya.',
      },
    },
    {
      id: 'sec-04-intermediate-p-np',
      type: 'markdown',
      level: 'intermediate',
      title: 'P, NP, dan P vs NP',
      content: `## Kelas Kompleksitas

**Time complexity** mengukur pertumbuhan waktu eksekusi algoritma terhadap ukuran input n.

| Notasi | Nama | Contoh |
|--------|------|--------|
| O(1) | Constant | Hash table lookup |
| O(log n) | Logarithmic | Binary search |
| O(n) | Linear | Linear search |
| O(n log n) | Linearithmic | Merge sort |
| O(n²) | Quadratic | Nested loop |
| O(2ⁿ) | Exponential | Brute force subset |

## Kelas P

**P** = masalah yang dapat **diselesaikan** dalam waktu polinomial O(n^k) oleh deterministic Turing machine.

Contoh: sorting, shortest path (Dijkstra), minimum spanning tree, linear programming (weakly).

## Kelas NP

**NP** = masalah yang **solusinya dapat diverifikasi** dalam waktu polinomial. Equivalently: dapat diselesaikan oleh nondeterministic TM polinomial.

Contoh:

- **SAT**: diberikan assignment variabel boolean, verifikasi apakah formula terpenuhi — O(n) per clause.
- **Traveling Salesman (decision)**: diberikan tour, verifikasi panjang ≤ k — O(n).
- **Subset Sum**: diberikan subset, verifikasi jumlah = target — O(n).

## P vs NP

Pertanyaan terbuka: **Apakah P = NP?**

- Jika P = NP: setiap masalah verifiable polinomial juga solvable polinomial — implikasi besar untuk kriptografi, optimasi, AI.
- Kepercayaan mayoritas: **P ≠ NP** — ada masalah NP yang intrinsically sulit.
- Salah satu Millennium Prize Problems ($1 juta) — belum terbukti.

**NP-complete**: masalah ∈ NP dan NP-hard (setiap masalah NP reducible polinomial ke sini). Jika satu NP-complete solvable polinomial, maka P = NP.

Contoh NP-complete: 3-SAT, Clique, Vertex Cover, Hamiltonian Path, Knapsack (decision).`,
    },
    {
      id: 'sec-04-go-intermediate',
      type: 'code-example',
      codeExample: {
        id: 'code-04-go-intermediate',
        filename: 'vertex_cover.go',
        language: 'go',
        title: 'Go: Greedy 2-Approximation Vertex Cover',
        code: `package main

import "fmt"

type Edge [2]int

func greedyVertexCover(edges []Edge) map[int]bool {
	cover := make(map[int]bool)
	remaining := append([]Edge(nil), edges...)

	for len(remaining) > 0 {
		u, v := remaining[len(remaining)-1][0], remaining[len(remaining)-1][1]
		remaining = remaining[:len(remaining)-1]
		cover[u] = true
		cover[v] = true

		filtered := remaining[:0]
		for _, e := range remaining {
			if !cover[e[0]] && !cover[e[1]] {
				filtered = append(filtered, e)
			}
		}
		remaining = filtered
	}
	return cover
}

func main() {
	edges := []Edge{{0, 1}, {1, 2}, {2, 3}, {0, 3}}
	cover := greedyVertexCover(edges)
	fmt.Print("Vertex cover (2-approx): ")
	for v := range cover {
		fmt.Printf("%d ", v)
	}
	fmt.Println()
}`,
        explanation:
          'Vertex Cover adalah NP-complete. Greedy algorithm ini memberikan solusi ≤ 2× optimal — contoh approximation algorithm praktis ketika exact solution exponential.',
      },
    },
    {
      id: 'sec-04-advanced-np-complete-approx',
      type: 'markdown',
      level: 'advanced',
      title: 'NP-Complete, Reduksi, dan Approximation Algorithms',
      content: `## Polynomial-Time Reduction

**Reduksi** A → B: jika B solvable polinomial, maka A juga solvable polinomial. Untuk membuktikan B NP-hard, reduksi dari known NP-complete (mis. 3-SAT) ke B.

Contoh: 3-SAT → Independent Set → Vertex Cover → Hamiltonian Cycle. Rantai reduksi menunjukkan keluarga masalah equivalently hard.

## Cook-Levin Theorem

**SAT** (Boolean satisfiability) adalah NP-complete pertama (Cook, 1971; Levin independen). Setiap masalah NP dapat direduksi polinomial ke SAT — fondasi teori NP-completeness.

## NP-Hard vs NP-Complete

- **NP-hard**: setidaknya sekeras masalah NP terkeras; tidak harus ∈ NP (bisa optimization, bukan decision).
- **NP-complete**: ∈ NP dan NP-hard.

Traveling Salesman (optimization) NP-hard; TSP decision NP-complete.

## Approximation Algorithms

Ketika exact solution exponential, **approximation algorithm** memberikan solusi dengan **jaminan rasio**:

| Algoritma | Masalah | Rasio |
|-----------|---------|-------|
| Greedy Vertex Cover | Vertex Cover | ≤ 2× optimal |
| Christofides | Metric TSP | ≤ 1.5× optimal |
| FPTAS | Knapsack | (1-ε)× optimal |
| Set Cover greedy | Set Cover | O(log n)× optimal |

**PTAS** (Polynomial-Time Approximation Scheme): untuk setiap ε > 0, ada (1+ε)-approximation polinomial. **FPTAS** fully PTAS — polinomial juga dalam 1/ε.

## Implikasi Praktis

- **Kriptografi**: keamanan RSA, AES bergantung pada asumsi faktorisasi/discrete log sulit (believed outside P).
- **Scheduling, routing, packing**: masalah NP-hard — gunakan heuristik, approximation, atau solver untuk instance kecil.
- **SAT solvers**: meski SAT NP-complete, modern SAT solvers (CDCL) sangat efektif untuk instance praktis — backbone verifikasi hardware, planning.

P vs NP tetap open, tetapi decades research memberikan alat: reduksi, approximation, parameterized complexity, dan heuristik praktis.`,
    },
    {
      id: 'sec-04-go-advanced',
      type: 'code-example',
      codeExample: {
        id: 'code-04-go-advanced',
        filename: 'main.go',
        language: 'go',
        title: 'Go: Polinomial vs Eksponensial — Fibonacci DP',
        code: `package main

import "fmt"

func fibRecursive(n int) int {
	if n <= 1 {
		return n
	}
	return fibRecursive(n-1) + fibRecursive(n-2)
}

func fibDP(n int) int {
	if n <= 1 {
		return n
	}
	dp := make([]int, n+1)
	dp[0], dp[1] = 0, 1
	for i := 2; i <= n; i++ {
		dp[i] = dp[i-1] + dp[i-2]
	}
	return dp[n]
}

func main() {
	n := 30
	fmt.Printf("Fib(%d) recursive (eksponensial): %d\\n", n, fibRecursive(n))
	fmt.Printf("Fib(%d) DP (polinomial O(n)): %d\\n", n, fibDP(n))
}`,
        explanation:
          'Fibonacci naive recursive O(2^n) vs DP O(n) — ilustrasi perbedaan exponential dan polynomial. Kelas P fokus pada polinomial; NP-complete masalah tidak diketahui solvable polinomial.',
      },
    },
    {
      id: 'sec-04-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Kesimpulan:** Mesin Turing memodelkan komputasi universal. Halting problem undecidable — tidak ada algoritma universal untuk menentukan halt. P = solvable polinomial; NP = verifiable polinomial; P vs NP open. NP-complete adalah masalah NP terkeras; reduksi polinomial membuktikan NP-hardness. Approximation algorithms memberikan solusi praktis dengan jaminan rasio untuk masalah NP-hard. Pemahaman teori ini membimbing pilihan algoritma dan ekspektasi realistis di engineering.',
    },
  ],
}
