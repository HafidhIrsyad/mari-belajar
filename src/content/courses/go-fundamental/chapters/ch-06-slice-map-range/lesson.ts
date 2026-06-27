import type { Lesson } from '@/content/types'

export const ch06Lesson: Lesson = {
  id: 'lesson-ch-06-slice-map-range',
  estimatedMinutes: 35,
  sections: [
    {
      id: 'sec-06-basic-collections',
      type: 'markdown',
      level: 'basic',
      title: 'Array, Slice, dan Map',
      content: `## Array

Array di Go memiliki ukuran tetap dan merupakan bagian dari tipe. Array adalah value type, artinya assignment dan passing array menyebabkan copy seluruh elemen.

\`\`\`go
var arr [3]int = [3]int{1, 2, 3}
\`\`\`

## Slice

Slice adalah struktur dinamis yang mereferensi bagian dari array. Slice lebih sering digunakan daripada array karena fleksibel.

\`\`\`go
nums := []int{1, 2, 3}
nums = append(nums, 4)
\`\`\`

Slice memiliki panjang (length) dan kapasitas (capacity). Panjang adalah jumlah elemen yang terlihat, sedangkan kapasitas adalah jumlah elemen yang tersedia di backing array.

## Map

Map adalah tipe data key-value yang tidak terurut. Key harus memiliki tipe yang comparable.

\`\`\`go
scores := map[string]int{
    "Budi": 85,
    "Ani":  90,
}
fmt.Println(scores["Budi"])
\`\`\`

Saat mengakses key yang tidak ada, map mengembalikan zero value dari tipe value. Untuk membedakan key tidak ada dengan key yang memang bernilai nol, gunakan two-value lookup:

\`\`\`go
score, ok := scores["TidakAda"]
\`\`\``,
    },
    {
      id: 'sec-06-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-06-js',
        filename: 'collections.js',
        language: 'javascript',
        title: 'JavaScript: Array dan Object',
        code: `const nums = [1, 2, 3];
nums.push(4); // mutate array
console.log(nums);

const scores = {
  Budi: 85,
  Ani: 90
};
console.log(scores.Budi);

// Map
const mapScores = new Map();
mapScores.set("Budi", 85);
console.log(mapScores.has("Budi"));`,
        explanation:
          'JavaScript array bersifat dinamis dan object/map menyediakan key-value lookup. Go memisahkan array (fixed-size) dan slice (dynamic view), serta memiliki built-in map.',
      },
    },
    {
      id: 'sec-06-intermediate-operations',
      type: 'markdown',
      level: 'intermediate',
      title: 'Slicing, Append, Copy, dan Range',
      content: `## Slicing

Slicing membuat slice baru dari slice/array yang sudah ada, seringkali berbagi backing array.

\`\`\`go
nums := []int{1, 2, 3, 4, 5}
part := nums[1:3] // [2, 3], berbagi backing array dengan nums
\`\`\`

## Append

\`append\` menambahkan elemen ke slice. Jika kapasitas mencukupi, elemen ditulis ke backing array yang sama. Jika tidak, Go mengalokasikan backing array baru.

\`\`\`go
a := make([]int, 0, 2)
a = append(a, 1)
a = append(a, 2)
a = append(a, 3) // backing array baru kemungkinan dialokasikan
\`\`\`

## Copy

\`copy\` menyalin elemen dari source ke destination dan mengembalikan jumlah elemen yang disalin. Gunakan copy untuk membuat slice independen.

\`\`\`go
src := []int{1, 2, 3}
dst := make([]int, len(src))
copy(dst, src)
\`\`\`

## Range

\`range\` mengiterasi slice, array, map, string, dan channel. Untuk slice/array, range mengembalikan indeks dan salinan value. Untuk map, range mengembalikan key dan value.

\`\`\`go
for k, v := range m {
    fmt.Println(k, v)
}
\`\`\`

Perlu diperhatikan bahwa range pada map tidak menjamin urutan.`,
    },
    {
      id: 'sec-06-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-06-ts',
        filename: 'collections.ts',
        language: 'typescript',
        title: 'TypeScript: Array dan Map Typed',
        code: `const nums: number[] = [1, 2, 3];
nums.push(4);

const scores: Map<string, number> = new Map();
scores.set("Budi", 85);

// spread membuat shallow copy
const copyNums = [...nums];

// object record
const record: Record<string, number> = { Budi: 85 };`,
        explanation:
          'TypeScript memiliki array dan Map generik. Go menggunakan slice dengan append/copy untuk koleksi dinamis, dan map dengan lookup dua nilai untuk memeriksa keberadaan key.',
      },
    },
    {
      id: 'sec-06-advanced-internals',
      type: 'markdown',
      level: 'advanced',
      title: 'Slice Header, Backing Array, dan Map Hash Table',
      content: `## Slice Header

Secara internal, slice direpresentasikan sebagai struct dengan tiga field:

\`\`\`c
struct SliceHeader {
    void* Data;
    int   Len;
    int   Cap;
}
\`\`\`

Karena slice menyimpan pointer ke backing array, assignment slice tidak menyalin elemen, melainkan menyalin header. Ini berarti modifikasi pada satu slice bisa terlihat di slice lain jika masih berbagi backing array.

## Append dan Reallocation

Ketika \`append\` membutuhkan kapasitas lebih besar, Go mengalokasikan array baru dengan kapasitas yang lebih besar (biasanya 2x untuk slice kecil, kemudian pertumbuhan lebih lambat). Elemen lama disalin, pointer slice diperbarui, dan slice asli yang tidak cukup kapasitas tidak terpengaruh.

## Map Internals

Map di Go diimplementasikan sebagai hash table dengan array bucket. Setiap bucket bisa menampung beberapa entry (biasanya 8). Jika bucket penuh, Go menambahkan overflow bucket. Hash dari key menentukan bucket mana yang digunakan.

Map tidak boleh diubah ukurannya saat sedang diiterasi, tetapi menghapus atau menambahkan entry saat iterasi secara teknis diizinkan dengan perilaku yang ditentukan.

## Range Semantics

Saat ranging over slice, value yang dikembalikan adalah salinan elemen, bukan pointer ke elemen asli. Jika Anda ingin memodifikasi elemen asli, gunakan indeks:

\`\`\`go
for i := range nums {
    nums[i] *= 2
}
\`\`\`

Range over map membuat salinan key dan value serta tidak menjamin urutan. Urutan iterasi map bahkan sengaja dirandomized di beberapa versi Go untuk mencegah kode bergantung pada urutan.`,
    },
    {
      id: 'sec-06-go-example',
      type: 'code-example',
      codeExample: {
        id: 'code-06-go',
        filename: 'slice_map.go',
        language: 'go',
        title: 'Go: Slice, Map, dan Range',
        code: `package main

import "fmt"

func main() {
	// slice header dan backing array
	original := []int{1, 2, 3, 4, 5}
	view := original[1:3]
	view[0] = 99
	fmt.Println("original:", original) // [1 99 3 4 5]

	// append menyebabkan reallocation
	a := make([]int, 0, 2)
	a = append(a, 1, 2)
	b := append(a, 3)
	a = append(a, 4)
	fmt.Println("a:", a)
	fmt.Println("b:", b)

	// copy untuk slice independen
	independent := make([]int, len(original))
	copy(independent, original)
	independent[0] = 0
	fmt.Println("original setelah copy:", original)

	// map dan two-value lookup
	scores := map[string]int{"Budi": 85, "Ani": 90}
	if score, ok := scores["Budi"]; ok {
		fmt.Println("Budi:", score)
	}

	// range mengiterasi map
	for name, score := range scores {
		fmt.Println(name, score)
	}
}`,
        explanation:
          'Program ini mendemonstrasikan sharing backing array antar slice, perilaku append, copy untuk independensi, two-value lookup map, dan range map.',
      },
    },
    {
      id: 'sec-06-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Ringkasan:** Slice adalah view ke backing array dengan header berisi pointer, length, dan capacity. append bisa menyebabkan realokasi. copy membuat slice independen. Map adalah hash table dengan bucket dan lookup O(1) rata-rata. Range pada map tidak menjamin urutan, dan range pada slice memberikan salinan value.',
    },
  ],
}
