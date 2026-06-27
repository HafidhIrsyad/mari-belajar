import type { Lesson } from '@/content/types'

export const ch04Lesson: Lesson = {
  id: 'lesson-ch-04-fundamental-data-structures',
  estimatedMinutes: 22,
  sections: [
    {
      id: 'sec-04-basic-intro',
      type: 'markdown',
      level: 'basic',
      title: 'Array, Linked List, Stack, dan Queue',
      content: `## Mengapa Struktur Data Penting?

**Struktur data** adalah cara menyimpan dan mengorganisasi data di komputer agar bisa digunakan secara efisien. Struktur data yang tepat membuat program lebih cepat, lebih mudah dipahami, dan lebih mudah dikelola.

Pemilihan struktur data bergantung pada apa yang ingin dilakukan: apakah data sering dicari, sering ditambah di awal, atau harus diproses dalam urutan tertentu?

## Array

**Array** adalah struktur data paling dasar: sekumpulan elemen yang disimpan dalam blok memori yang berurutan. Setiap elemen bisa diakses langsung menggunakan indeks, biasanya mulai dari 0.

\`\`\`text
Indeks:    0   1   2   3   4
Nilai:    [10, 20, 30, 40, 50]
\`\`\`

Kelebihan array:
- Akses elemen berdasarkan indeks sangat cepat: O(1).
- Struktur sederhana dan mudah dipahami.

Keterbatasan array:
- Ukuran array statis (di banyak bahasa) sulit diubah setelah dibuat.
- Menyisipkan atau menghapus elemen di tengah array memerlukan pergeseran elemen lain: O(n).

## Linked List

**Linked list** menyimpan elemen sebagai node-node yang saling terhubung melalui pointer atau referensi. Setiap node berisi data dan alamat node berikutnya. Tidak seperti array, elemen tidak harus berada di memori yang berurutan.

\`\`\`text
[10 | *] -> [20 | *] -> [30 | null]
\`\`\`

Kelebihan linked list:
- Menambah atau menghapus elemen di awal sangat cepat: O(1), asalkan sudah memiliki referensi ke node tersebut.
- Ukuran bisa tumbuh secara dinamis.

Keterbatasan linked list:
- Akses elemen berdasarkan indeks harus dilakukan secara berurutan: O(n).
- Memerlukan memori tambahan untuk menyimpan referensi antar node.

## Stack: LIFO

**Stack** (tumpukan) adalah struktur data yang mengikuti prinsip **LIFO** (*Last In, First Out*): elemen terakhir yang masuk akan menjadi elemen pertama yang keluar.

Bayangkan tumpukan piring: piring terakhir yang diletakkan di atas adalah piring pertama yang diambil.

Operasi utama stack:
- **push**: menambahkan elemen ke atas stack.
- **pop**: mengeluarkan elemen dari atas stack.
- **peek** (atau top): melihat elemen teratas tanpa mengeluarkannya.

## Queue: FIFO

**Queue** (antrean) mengikuti prinsip **FIFO** (*First In, First Out*): elemen pertama yang masuk akan menjadi elemen pertama yang keluar.

Bayangkan antrean di loket: orang yang datang pertama dilayani pertama.

Operasi utama queue:
- **enqueue**: menambahkan elemen ke belakang antrean.
- **dequeue**: mengeluarkan elemen dari depan antrean.
- **front**: melihat elemen paling depan tanpa mengeluarkannya.`,
    },
    {
      id: 'sec-04-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-04-js',
        filename: 'stack-and-queue.js',
        language: 'javascript',
        title: 'JavaScript: Stack dan Queue Menggunakan Array',
        code: `// Stack: LIFO (Last In, First Out)
const stack = [];

stack.push("A");
stack.push("B");
stack.push("C");

console.log(stack.pop()); // "C"
console.log(stack.pop()); // "B"
console.log(stack);       // ["A"]

// Queue: FIFO (First In, First Out)
const queue = [];

queue.push("pertama");
queue.push("kedua");
queue.push("ketiga");

console.log(queue.shift()); // "pertama"
console.log(queue.shift()); // "kedua"
console.log(queue);         // ["ketiga"]

// Fungsi pembantu untuk memeriksa tumpukan kosong
function isEmpty(collection) {
  return collection.length === 0;
}

console.log(isEmpty(stack)); // false, masih ada "A"`,
        explanation:
          'Array JavaScript bisa berfungsi sebagai stack dengan push/pop, dan sebagai queue dengan push untuk enqueue dan shift untuk dequeue. Method shift mengeluarkan elemen pertama array.',
      },
    },
    {
      id: 'sec-04-intermediate',
      type: 'markdown',
      level: 'intermediate',
      title: 'Hash Table, Set, dan Map',
      content: `## Hash Table

**Hash table** adalah struktur data yang menyimpan pasangan *key-value*. Hash table menggunakan **fungsi hash** untuk mengubah key menjadi indeks di dalam array internal, sehingga pencarian, penambahan, dan penghapusan bisa dilakukan sangat cepat: rata-rata O(1).

\`\`\`text
key = "nama"
hash("nama") -> indeks 3
array[3] = "Budi"
\`\`\`

### Collision

Terkadang dua key berbeda menghasilkan indeks yang sama. Keadaan ini disebut **collision** (tabrakan). Ada beberapa cara menanganinya:

- **Chaining**: setiap indeks menyimpan linked list atau array dari elemen-elemen yang bertabrakan.
- **Open addressing**: jika indeks sudah terisi, cari indeks kosong berikutnya dengan pola tertentu.

Collision adalah normal, tetapi fungsi hash yang baik akan meminimalkan frekuensinya.

## Set

**Set** adalah struktur data yang menyimpan kumpulan nilai unik. Set tidak mengizinkan duplikat, sehingga cocok untuk kasus seperti menghapus duplikat dari daftar atau memeriksa keanggotaan.

Operasi umum pada Set:
- **add**: menambahkan nilai.
- **has**: memeriksa apakah nilai ada.
- **delete**: menghapus nilai.

## Map

**Map** adalah struktur data yang menyimpan pasangan *key-value* dengan key yang bisa berupa tipe data apa pun, tidak terbatas pada string seperti objek biasa. Map menjaga urutan penyisipan dan memudahkan iterasi.

Operasi umum pada Map:
- **set(key, value)**: menyimpan pasangan key-value.
- **get(key)**: mengambil nilai berdasarkan key.
- **has(key)**: memeriksa keberadaan key.
- **delete(key)**: menghapus pasangan berdasarkan key.

## Memilih Struktur Data yang Tepat

Tidak ada struktur data terbaik untuk semua situasi. Berikut panduan singkat:

| Kebutuhan | Struktur Data yang Cocok |
|-----------|--------------------------|
| Akses cepat berdasarkan indeks | Array |
| Penambahan/penghapusan cepat di awal | Linked list |
| Proses terbalik (undo, ekspresi) | Stack |
| Antrean berdasarkan urutan kedatangan | Queue |
| Pencarian cepat berdasarkan key | Hash table / Map |
| Menyimpan nilai unik | Set |
| Data hierarkis | Tree |
| Hubungan antar entitas | Graph |`,
    },
    {
      id: 'sec-04-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-04-ts',
        filename: 'generic-stack.ts',
        language: 'typescript',
        title: 'TypeScript: Kelas Stack Generik',
        code: `class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items.at(-1);
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }
}

// Menggunakan stack untuk angka
const numberStack = new Stack<number>();
numberStack.push(10);
numberStack.push(20);
console.log(numberStack.pop()); // 20
console.log(numberStack.peek()); // 10

// Menggunakan stack untuk string
const history = new Stack<string>();
history.push("/home");
history.push("/home/docs");
console.log(history.pop()); // "/home/docs"`,
        explanation:
          'Kelas generik Stack<T> memungkinkan stack digunakan untuk berbagai tipe data. Method peek melihat elemen teratas tanpa menghapusnya, sedangkan pop mengeluarkan elemen teratas.',
      },
    },
    {
      id: 'sec-04-advanced',
      type: 'markdown',
      level: 'advanced',
      title: 'Tree, Binary Search Tree, dan Graph',
      content: `## Binary Tree

**Binary tree** adalah struktur data hierarkis di mana setiap node memiliki paling banyak dua anak: anak kiri dan anak kanan. Node paling atas disebut **root** (akar).

Contoh binary tree sederhana:

- Root bernilai 10.
- Anak kiri root bernilai 5, yang memiliki anak kiri 3 dan anak kanan 7.
- Anak kanan root bernilai 20, yang memiliki anak kiri 15 dan anak kanan 30.

Tree sering digunakan untuk merepresentasikan data hierarkis, seperti struktur file sistem, DOM HTML, atau pohon keputusan.

## Binary Search Tree (BST)

**Binary search tree** adalah binary tree dengan aturan khusus:

- Semua nilai di subtree kiri lebih kecil dari nilai node.
- Semua nilai di subtree kanan lebih besar dari nilai node.

Contoh BST:

- Root bernilai 20.
- Subtree kiri berisi 10, 5, dan 15 (semua lebih kecil dari 20).
- Subtree kanan berisi 30, 25, dan 35 (semua lebih besar dari 20).

Aturan ini membuat pencarian, penambahan, dan penghapusan rata-rata berjalan dalam O(log n) jika tree seimbang.

> Penting: jika data dimasukkan secara terurut ke BST biasa, tree bisa menjadi tidak seimbang dan berperilaku seperti linked list (O(n)). Struktur seperti AVL tree atau Red-Black tree dirancang untuk menjaga keseimbangan secara otomatis.

## Graph

**Graph** adalah struktur data yang terdiri dari **node** (atau *vertex*) dan **edge** (sisi) yang menghubungkan node-node tersebut. Graph digunakan untuk memodelkan hubungan antar entitas, seperti jaringan sosial, peta jalan, atau jaringan komputer.

Graph bisa:
- **Terarah** (*directed*): edge memiliki arah, seperti A → B.
- **Tidak terarah** (*undirected*): edge dua arah, seperti A — B.
- **Berbobot** (*weighted*): setiap edge memiliki nilai, seperti jarak atau biaya.

## DFS dan BFS

Dua algoritma utama untuk menjelajah graph dan tree:

### Depth-First Search (DFS)

**DFS** menjelajah sedalam mungkin sebelum kembali ke cabang lain. DFS cocok untuk:
- Mendeteksi siklus.
- Menyelesaikan puzzle atau labirin.
- Melakukan traversal tree secara preorder, inorder, atau postorder.

DFS bisa diimplementasikan dengan **rekursi** atau **stack**.

### Breadth-First Search (BFS)

**BFS** menjelajah node berdasarkan kedalaman, satu level pada satu waktu. BFS dimulai dari node awal, lalu mengunjungi semua tetangga terlebih dahulu sebelum ke level berikutnya. BFS cocok untuk:
- Menemukan jalur terpendek dalam graph tidak berbobot.
- Menyebar informasi ke semua node dalam level tertentu.

BFS biasanya diimplementasikan dengan **queue**.`,
    },
    {
      id: 'sec-04-go-example',
      type: 'code-example',
      codeExample: {
        id: 'code-04-go',
        filename: 'main.go',
        language: 'go',
        title: 'Go: Map sebagai Hash Table dan Struct Node Linked List',
        code: `package main

import "fmt"

type Node struct {
	value int
	next  *Node
}

func main() {
	// Map di Go adalah implementasi hash table bawaan
	scores := map[string]int{
		"Andi": 85,
		"Budi": 90,
		"Citra": 78,
	}

	// Akses O(1) rata-rata
	fmt.Println("Skor Andi:", scores["Andi"])

	// Menambahkan pasangan baru
	scores["Dewi"] = 92

	// Memeriksa keberadaan key
	if score, ok := scores["Budi"]; ok {
		fmt.Printf("Budi ditemukan dengan skor %d\n", score)
	}

	// Linked list sederhana: 10 -> 20 -> 30
	head := &Node{value: 10}
	head.next = &Node{value: 20}
	head.next.next = &Node{value: 30}

	// Traversal linked list
	current := head
	for current != nil {
		fmt.Printf("%d ", current.value)
		current = current.next
	}
	// Output: 10 20 30
}`,
        explanation:
          'Map bawaan Go adalah hash table dengan kompleksitas rata-rata O(1) untuk akses, penambahan, dan pengecekan key. Struct Node dengan pointer *Node membentuk linked list secara manual.',
      },
    },
    {
      id: 'sec-04-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Ringkasan:** Array menyimpan data berurutan di memori dengan akses indeks cepat. Linked list menyimpan data sebagai node yang saling terhubung. Stack bekerja LIFO, sedangkan queue bekerja FIFO. Hash table dan Map menyimpan pasangan key-value dengan pencarian cepat, sementara Set menyimpan nilai unik. Tree cocok untuk data hierarkis, BST mempercepat pencarian dengan aturan urutan, dan graph memodelkan hubungan antar entitas. DFS menjelajah sedalam-dalamnya, BFS menjelajah per level.',
    },
  ],
}
