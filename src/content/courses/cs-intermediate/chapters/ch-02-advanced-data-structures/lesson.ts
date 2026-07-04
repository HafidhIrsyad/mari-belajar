import type { Lesson } from '@/content/types'

export const ch02Lesson: Lesson = {
  id: 'lesson-ch-02-advanced-data-structures',
  estimatedMinutes: 50,
  sections: [
    {
      id: 'sec-02-basic-heap-bst',
      type: 'markdown',
      level: 'basic',
      title: 'Heap, Priority Queue, dan Binary Search Tree',
      content: `## Binary Heap

**Binary heap** adalah pohon biner hampir lengkap yang memenuhi heap property:

- **Max-heap**: parent ≥ kedua child → root adalah elemen terbesar.
- **Min-heap**: parent ≤ kedua child → root adalah elemen terkecil.

Heap disimpan dalam array: untuk node di indeks i, left child di 2i+1, right child di 2i+2, parent di ⌊(i-1)/2⌋.

| Operasi | Kompleksitas |
|---------|--------------|
| Insert | O(log n) — sift-up |
| Extract max/min | O(log n) — sift-down |
| Peek | O(1) |
| Build heap | O(n) — heapify bottom-up |

## Priority Queue

**Priority queue** adalah abstraksi data di mana elemen dengan prioritas tertinggi (atau terendah) diekstrak terlebih dahulu. Implementasi umum menggunakan binary heap.

Kasus penggunaan: algoritma Dijkstra, scheduling tugas, event simulation, dan Huffman coding.

## Binary Search Tree (BST)

BST adalah pohon biner dengan invariant: untuk setiap node, semua nilai di subtree kiri < node, dan subtree kanan > node.

| Operasi | Average | Worst (tidak seimbang) |
|---------|---------|------------------------|
| Search | O(log n) | O(n) |
| Insert | O(log n) | O(n) |
| Delete | O(log n) | O(n) |

**Delete** memiliki tiga kasus:
1. Node leaf → hapus langsung.
2. Satu child → ganti dengan child.
3. Dua child → ganti dengan inorder successor (minimum di subtree kanan) atau predecessor.`,
    },
    {
      id: 'sec-02-go-basic',
      type: 'code-example',
      codeExample: {
        id: 'code-02-go-basic',
        filename: 'min_heap.go',
        language: 'go',
        title: 'Go: Min-Heap Sederhana',
        code: `package main

import "fmt"

type MinHeap struct {
	data []int
}

func (h *MinHeap) parent(i int) int  { return (i - 1) / 2 }
func (h *MinHeap) left(i int) int    { return 2*i + 1 }
func (h *MinHeap) right(i int) int   { return 2*i + 2 }

func (h *MinHeap) swap(i, j int) {
	h.data[i], h.data[j] = h.data[j], h.data[i]
}

func (h *MinHeap) Insert(val int) {
	h.data = append(h.data, val)
	h.siftUp(len(h.data) - 1)
}

func (h *MinHeap) siftUp(i int) {
	for i > 0 && h.data[i] < h.data[h.parent(i)] {
		h.swap(i, h.parent(i))
		i = h.parent(i)
	}
}

func (h *MinHeap) ExtractMin() (int, bool) {
	if len(h.data) == 0 {
		return 0, false
	}
	min := h.data[0]
	last := h.data[len(h.data)-1]
	h.data = h.data[:len(h.data)-1]
	if len(h.data) > 0 {
		h.data[0] = last
		h.siftDown(0)
	}
	return min, true
}

func (h *MinHeap) siftDown(i int) {
	n := len(h.data)
	for {
		smallest := i
		l, r := h.left(i), h.right(i)
		if l < n && h.data[l] < h.data[smallest] {
			smallest = l
		}
		if r < n && h.data[r] < h.data[smallest] {
			smallest = r
		}
		if smallest == i {
			break
		}
		h.swap(i, smallest)
		i = smallest
	}
}

func main() {
	heap := &MinHeap{}
	for _, v := range []int{5, 3, 8, 1, 9} {
		heap.Insert(v)
	}
	min, _ := heap.ExtractMin()
	fmt.Println(min) // 1
}`,
        explanation:
          'Min-heap menyimpan elemen terkecil di root. Insert menambah di akhir lalu sift-up; ExtractMin mengganti root dengan elemen terakhir lalu sift-down.',
      },
    },
    {
      id: 'sec-02-intermediate-avl-hash',
      type: 'markdown',
      level: 'intermediate',
      title: 'AVL Tree, Hash Collision, dan Trie',
      content: `## AVL Tree — Konsep Self-Balancing

**AVL tree** adalah BST self-balancing di mana selisih tinggi subtree kiri dan kanan (balance factor) setiap node tidak boleh lebih dari 1.

Saat insert atau delete membuat pohon tidak seimbang, dilakukan **rotasi**:

| Kasus | Kondisi | Rotasi |
|-------|---------|--------|
| LL | Insert di subtree kiri-kanan kiri | Single right |
| RR | Insert di subtree kanan-kanan kanan | Single left |
| LR | Insert di subtree kiri-kanan kanan | Left lalu right |
| RL | Insert di subtree kanan-kanan kiri | Right lalu left |

AVL menjamin O(log n) untuk search, insert, dan delete, tetapi overhead rotasi lebih besar dibanding red-black tree.

## Hash Collision

Hash function memetakan key ke indeks bucket. Ketika dua key berbeda menghasilkan indeks sama, terjadi **collision**.

### Chaining

Setiap bucket menyimpan linked list (atau dynamic array) dari semua entry dengan hash index sama.

- Pro: sederhana, tidak ada clustering.
- Kontra: overhead pointer, cache locality lebih buruk.

### Open Addressing

Semua elemen disimpan langsung di array; saat collision, cari slot berikutnya.

| Teknik | Cara probing |
|--------|--------------|
| Linear probing | h(k)+1, h(k)+2, ... |
| Quadratic probing | h(k)+1², h(k)+2², ... |
| Double hashing | h(k)+i·h₂(k) |

**Load factor** α = n/m (elemen / bucket). Saat α mendekati 1, performa menurun; rehashing diperlukan.

## Trie (Prefix Tree)

Trie menyimpan string sebagai jalur dari root ke leaf. Setiap edge dilabeli karakter; node dapat menandai akhir kata.

| Operasi | Kompleksitas |
|---------|--------------|
| Insert kata | O(L) — L panjang string |
| Search kata | O(L) |
| Search prefiks | O(L) |

Berguna untuk autocomplete, spell checker, dan IP routing (radix tree).`,
    },
    {
      id: 'sec-02-go-intermediate',
      type: 'code-example',
      codeExample: {
        id: 'code-02-go-intermediate',
        filename: 'bst.go',
        language: 'go',
        title: 'Go: BST Insert dan Search',
        code: `package main

import "fmt"

type TreeNode struct {
	val         int
	left, right *TreeNode
}

type BST struct {
	root *TreeNode
}

func (t *BST) Insert(val int) {
	t.root = t.insertNode(t.root, val)
}

func (t *BST) insertNode(node *TreeNode, val int) *TreeNode {
	if node == nil {
		return &TreeNode{val: val}
	}
	if val < node.val {
		node.left = t.insertNode(node.left, val)
	} else if val > node.val {
		node.right = t.insertNode(node.right, val)
	}
	return node
}

func (t *BST) Search(val int) bool {
	return t.searchNode(t.root, val)
}

func (t *BST) searchNode(node *TreeNode, val int) bool {
	if node == nil {
		return false
	}
	if val == node.val {
		return true
	}
	if val < node.val {
		return t.searchNode(node.left, val)
	}
	return t.searchNode(node.right, val)
}

func main() {
	bst := &BST{}
	for _, v := range []int{8, 3, 10, 1, 6} {
		bst.Insert(v)
	}
	fmt.Println(bst.Search(6))  // true
	fmt.Println(bst.Search(99)) // false
}`,
        explanation:
          'BST insert menempatkan nilai lebih kecil ke kiri dan lebih besar ke kanan. Search mengikuti invariant yang sama secara rekursif.',
      },
    },
    {
      id: 'sec-02-advanced-union-find',
      type: 'markdown',
      level: 'advanced',
      title: 'Union-Find dan Perbandingan Struktur Data',
      content: `## Union-Find (Disjoint Set)

**Union-find** mengelola koleksi himpunan disjoint (saling lepas) dengan dua operasi utama:

- **Find(x)**: cari representatif (root) himpunan yang memuat x.
- **Union(x, y)**: gabungkan himpunan yang memuat x dan y.

Implementasi naif menggunakan array parent[]:

\`\`\`text
parent[i] = i  // awalnya setiap elemen adalah root sendiri
\`\`\`

### Optimasi

1. **Union by rank**: gabungkan pohon lebih kecil ke akar pohon lebih besar.
2. **Path compression**: saat find, setiap node di jalur langsung menunjuk ke root.

Dengan kedua optimasi, operasi amortized mendekati **O(α(n))** — inverse Ackermann, praktis konstan.

## Aplikasi Union-Find

- Deteksi siklus pada graf undirected.
- Kruskal minimum spanning tree.
- Deteksi komponen terhubung.
- Percolation dan dynamic connectivity.

## Perbandingan Struktur Data Lanjutan

| Struktur | Kekuatan | Kelemahan |
|----------|----------|-----------|
| Heap | Extract min/max cepat | Tidak mendukung search arbitrary |
| BST | Ordered traversal | Degenerasi tanpa balancing |
| AVL/RB Tree | O(log n) terjamin | Kompleksitas implementasi |
| Hash Table | O(1) average lookup | Tidak ordered, collision handling |
| Trie | Prefiks search O(L) | Boros memori untuk sparse data |
| Union-Find | Gabung/cari set efisien | Tidak mendukung delete umum |

## Memilih Struktur yang Tepat

- Butuh elemen prioritas tertinggi berikutnya → **heap / priority queue**.
- Butuh pencarian ordered dan range query → **balanced BST**.
- Butuh lookup key-value cepat → **hash table** dengan strategi collision yang tepat.
- Butuh autocomplete / prefiks → **trie**.
- Butuh gabung/cari komponen graf → **union-find**.`,
    },
    {
      id: 'sec-02-go-advanced',
      type: 'code-example',
      codeExample: {
        id: 'code-02-go-advanced',
        filename: 'union_find.go',
        language: 'go',
        title: 'Go: Union-Find dengan Path Compression',
        code: `package main

import "fmt"

type UnionFind struct {
	parent []int
	rank   []int
}

func NewUnionFind(n int) *UnionFind {
	parent := make([]int, n)
	rank := make([]int, n)
	for i := range parent {
		parent[i] = i
	}
	return &UnionFind{parent: parent, rank: rank}
}

func (uf *UnionFind) Find(x int) int {
	if uf.parent[x] != x {
		uf.parent[x] = uf.Find(uf.parent[x]) // path compression
	}
	return uf.parent[x]
}

func (uf *UnionFind) Union(a, b int) {
	ra, rb := uf.Find(a), uf.Find(b)
	if ra == rb {
		return
	}
	if uf.rank[ra] < uf.rank[rb] {
		ra, rb = rb, ra
	}
	uf.parent[rb] = ra
	if uf.rank[ra] == uf.rank[rb] {
		uf.rank[ra]++
	}
}

func main() {
	uf := NewUnionFind(5)
	uf.Union(0, 1)
	uf.Union(2, 3)
	uf.Union(1, 2)
	fmt.Println(uf.Find(0) == uf.Find(3)) // true
}`,
        explanation:
          'Union by rank menggabungkan pohon lebih kecil ke akar pohon lebih besar. Path compression meratakan pohon saat find, membuat operasi berikutnya sangat cepat.',
      },
    },
    {
      id: 'sec-02-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Kesimpulan:** Struktur data lanjutan memperluas toolkit pemrograman di luar array dan linked list dasar. Heap untuk prioritas, BST/AVL untuk data terurut, hash table untuk lookup cepat, trie untuk string, dan union-find untuk konektivitas. Pilih struktur berdasarkan operasi dominan dan constraint memori.',
    },
  ],
}
