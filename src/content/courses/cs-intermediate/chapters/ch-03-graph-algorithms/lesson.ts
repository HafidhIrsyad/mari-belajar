import type { Lesson } from '@/content/types'

export const ch03Lesson: Lesson = {
  id: 'lesson-ch-03-graph-algorithms',
  estimatedMinutes: 50,
  sections: [
    {
      id: 'sec-03-basic-representation',
      type: 'markdown',
      level: 'basic',
      title: 'Representasi Graf dan Traversal Dasar',
      content: `## Apa itu Graf?

**Graf** G = (V, E) terdiri dari himpunan **vertex** (simpul) V dan **edge** (sisi) E yang menghubungkan pasangan vertex. Graf dapat **berarah** (directed) atau **tak berarah** (undirected), serta **berbobot** (weighted) atau tidak.

## Representasi Graf

### Adjacency Matrix

Matrix V × V di mana cell [i][j] = 1 (atau bobot) jika ada edge dari i ke j.

| Kelebihan | Kekurangan |
|-----------|------------|
| Cek edge O(1) | Ruang O(V²) |
| Sederhana | Boros untuk graf sparse |

### Adjacency List

Setiap vertex menyimpan daftar tetangga (dan bobot jika ada).

| Kelebihan | Kekurangan |
|-----------|------------|
| Ruang O(V + E) | Cek edge O(degree) |
| Efisien untuk sparse | Sedikit lebih kompleks |

## Breadth-First Search (BFS)

BFS mengeksplorasi graf **per level** menggunakan queue:

1. Mulai dari source, tandai visited, masukkan ke queue.
2. Dequeue vertex, kunjungi semua tetangga yang belum visited.
3. Ulangi hingga queue kosong.

Pada graf **unweighted**, BFS menemukan **shortest path** dalam jumlah edge.

## Depth-First Search (DFS)

DFS mengeksplorasi **sedalam mungkin** sebelum backtrack, menggunakan stack (rekursif atau eksplisit):

1. Kunjungi vertex, tandai visited.
2. Rekursif ke tetangga yang belum visited.
3. Backtrack saat tidak ada tetangga baru.

DFS berguna untuk deteksi siklus, topological sort, dan komponen terhubung.`,
    },
    {
      id: 'sec-03-go-basic',
      type: 'code-example',
      codeExample: {
        id: 'code-03-go-basic',
        filename: 'bfs.go',
        language: 'go',
        title: 'Go: BFS dengan Adjacency List',
        code: `package main

import "fmt"

func bfs(graph map[string][]string, start string) []string {
	visited := map[string]bool{start: true}
	queue := []string{start}
	order := []string{}

	for len(queue) > 0 {
		node := queue[0]
		queue = queue[1:]
		order = append(order, node)

		for _, neighbor := range graph[node] {
			if !visited[neighbor] {
				visited[neighbor] = true
				queue = append(queue, neighbor)
			}
		}
	}
	return order
}

func main() {
	graph := map[string][]string{
		"A": {"B", "C"},
		"B": {"A", "D", "E"},
		"C": {"A", "F"},
		"D": {"B"},
		"E": {"B", "F"},
		"F": {"C", "E"},
	}
	fmt.Println(bfs(graph, "A")) // [A B C D E F]
}`,
        explanation:
          'BFS menggunakan queue untuk memproses node per level. Map visited mencegah kunjungan ulang. Urutan kunjungan bergantung pada urutan tetangga.',
      },
    },
    {
      id: 'sec-03-intermediate-dijkstra-topo',
      type: 'markdown',
      level: 'intermediate',
      title: 'Dijkstra, Topological Sort, dan Deteksi Siklus',
      content: `## Algoritma Dijkstra

Dijkstra menemukan **shortest path** dari source ke semua vertex pada graf berbobot **non-negatif**.

Alur:
1. Inisialisasi jarak: dist[source] = 0, lainnya ∞.
2. Priority queue berisi (jarak, vertex).
3. Extract vertex dengan jarak minimum, relax semua edge tetangga.
4. Ulangi hingga queue kosong.

| Implementasi | Kompleksitas |
|--------------|--------------|
| Array linear | O(V²) |
| Binary heap | O((V + E) log V) |
| Fibonacci heap | O(E + V log V) |

**Relax**: jika dist[u] + w(u,v) < dist[v], update dist[v].

## Topological Sort

Mengurutkan vertex DAG sehingga untuk setiap edge u → v, u muncul sebelum v.

### Kahn Algorithm (BFS-based)

1. Hitung in-degree setiap vertex.
2. Masukkan vertex dengan in-degree 0 ke queue.
3. Dequeue, kurangi in-degree tetangga, masukkan yang menjadi 0.
4. Jika jumlah vertex terproses < V, ada siklus.

### DFS-based

Selesaikan DFS, tambahkan vertex ke hasil saat **selesai** diproses (post-order). Balik hasil.

## Deteksi Siklus

### Graf Berarah (Directed)

DFS tiga warna:
- **White**: belum dikunjungi.
- **Gray**: sedang diproses (di recursion stack).
- **Black**: selesai.

Back edge ke node **gray** = siklus.

### Graf Tak Berarah (Undirected)

DFS: jika menemukan tetangga yang bukan parent dan sudah visited → siklus.
Atau gunakan **union-find**: jika union menemukan node sudah di himpunan sama → siklus.`,
    },
    {
      id: 'sec-03-viz-bfs',
      type: 'visualization',
      visualization: {
        id: 'viz-03-bfs',
        component: 'graph-bfs',
        title: 'Visualisasi BFS',
        props: { startNode: 'A' },
      },
    },
    {
      id: 'sec-03-go-intermediate',
      type: 'code-example',
      codeExample: {
        id: 'code-03-go-intermediate',
        filename: 'dijkstra.go',
        language: 'go',
        title: 'Go: Dijkstra dengan Priority Queue',
        code: `package main

import (
	"fmt"
	"math"
)

type edge struct {
	to     string
	weight int
}

func dijkstra(graph map[string][]edge, start string) map[string]int {
	dist := make(map[string]int)
	visited := make(map[string]bool)
	for node := range graph {
		dist[node] = math.MaxInt32
	}
	dist[start] = 0

	pq := [][2]int{{0, 0}} // [distance, index into nodes slice]
	nodes := []string{start}
	nodeIndex := map[string]int{start: 0}

	for len(pq) > 0 {
		// Extract minimum (simple linear scan)
		best := 0
		for i := 1; i < len(pq); i++ {
			if pq[i][0] < pq[best][0] {
				best = i
			}
		}
		d, idx := pq[best][0], pq[best][1]
		pq = append(pq[:best], pq[best+1:]...)
		u := nodes[idx]
		if visited[u] {
			continue
		}
		visited[u] = true

		for _, e := range graph[u] {
			v := e.to
			if _, ok := nodeIndex[v]; !ok {
				nodeIndex[v] = len(nodes)
				nodes = append(nodes, v)
			}
			alt := d + e.weight
			if alt < dist[v] {
				dist[v] = alt
				pq = append(pq, [2]int{alt, nodeIndex[v]})
			}
		}
	}
	return dist
}

func main() {
	graph := map[string][]edge{
		"A": {{to: "B", weight: 4}, {to: "C", weight: 2}},
		"B": {{to: "D", weight: 3}},
		"C": {{to: "B", weight: 1}, {to: "D", weight: 5}},
		"D": {},
	}
	fmt.Println(dijkstra(graph, "A")) // A:0 B:3 C:2 D:6
}`,
        explanation:
          'Dijkstra relax edge dari vertex dengan jarak minimum. Priority queue memastikan vertex diproses dalam urutan jarak terpendek. Implementasi ini menggunakan scan linear sederhana; production code sebaiknya memakai container/heap.',
      },
    },
    {
      id: 'sec-03-advanced-cycle-apps',
      type: 'markdown',
      level: 'advanced',
      title: 'Aplikasi Graf dan Optimasi Traversal',
      content: `## Shortest Path vs Minimum Spanning Tree

| Masalah | Algoritma | Output |
|---------|-----------|--------|
| Shortest path (satu source) | Dijkstra, Bellman-Ford | Jarak minimum ke semua node |
| Shortest path (semua pair) | Floyd-Warshall | Matrix jarak V × V |
| MST | Kruskal, Prim | Tree menghubungkan semua vertex dengan bobot minimum |

## Bellman-Ford untuk Bobot Negatif

Ketika graf memiliki bobot negatif, gunakan Bellman-Ford: relax semua edge V-1 kali. Iterasi ke-V yang masih mengubah jarak menandakan siklus negatif.

## Strongly Connected Components (SCC)

Pada graf berarah, SCC adalah subset vertex di mana setiap vertex dapat mencapai vertex lain dalam subset. Algoritma **Kosaraju** atau **Tarjan** menggunakan DFS.

## Optimasi Praktis

- Gunakan **adjacency list** untuk graf sparse (jaringan sosial, web graph).
- Gunakan **adjacency matrix** untuk graf dense atau ketika cek edge sangat sering.
- Untuk BFS/DFS pada graf besar, pertimbangkan **iterative deepening** atau **bidirectional BFS**.
- Pada Dijkstra, **early termination** cukup jika hanya butuh jarak ke satu target.

## Kompleksitas Ringkasan

| Algoritma | Waktu | Ruang |
|-----------|-------|-------|
| BFS/DFS | O(V + E) | O(V) |
| Dijkstra (heap) | O((V + E) log V) | O(V + E) |
| Topological sort | O(V + E) | O(V) |
| Cycle detection | O(V + E) | O(V) |
| Floyd-Warshall | O(V³) | O(V²) |`,
    },
    {
      id: 'sec-03-go-advanced',
      type: 'code-example',
      codeExample: {
        id: 'code-03-go-advanced',
        filename: 'topological_sort.go',
        language: 'go',
        title: 'Go: Topological Sort (Kahn Algorithm)',
        code: `package main

import "fmt"

func topologicalSort(graph map[string][]string) ([]string, bool) {
	inDegree := make(map[string]int)
	for node := range graph {
		if _, ok := inDegree[node]; !ok {
			inDegree[node] = 0
		}
		for _, neighbor := range graph[node] {
			inDegree[neighbor]++
		}
	}

	queue := []string{}
	for node, deg := range inDegree {
		if deg == 0 {
			queue = append(queue, node)
		}
	}

	order := []string{}
	for len(queue) > 0 {
		node := queue[0]
		queue = queue[1:]
		order = append(order, node)

		for _, neighbor := range graph[node] {
			inDegree[neighbor]--
			if inDegree[neighbor] == 0 {
				queue = append(queue, neighbor)
			}
		}
	}

	if len(order) != len(inDegree) {
		return nil, false // ada siklus
	}
	return order, true
}

func main() {
	graph := map[string][]string{
		"A": {"B", "C"},
		"B": {"D"},
		"C": {"D"},
		"D": {},
	}
	order, ok := topologicalSort(graph)
	fmt.Println(order, ok) // [A B C D] atau [A C B D], true
}`,
        explanation:
          'Kahn algorithm memproses node dengan in-degree 0 terlebih dahulu. Jika tidak semua node terproses, graf memiliki siklus dan topological sort tidak mungkin.',
      },
    },
    {
      id: 'sec-03-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Kesimpulan:** Graf adalah struktur fundamental untuk memodelkan hubungan. Pilih representasi sesuai kepadatan graf, gunakan BFS untuk shortest path unweighted, Dijkstra untuk weighted non-negatif, topological sort untuk dependensi, dan DFS untuk deteksi siklus. Pahami kompleksitas setiap algoritma sebelum menerapkannya pada skala besar.',
    },
  ],
}
