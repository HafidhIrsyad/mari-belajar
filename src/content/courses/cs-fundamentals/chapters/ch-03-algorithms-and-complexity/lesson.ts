import type { Lesson } from '@/content/types'

export const ch03Lesson: Lesson = {
  id: 'lesson-ch-03-algorithms-and-complexity',
  estimatedMinutes: 20,
  sections: [
    {
      id: 'sec-03-basic-intro',
      type: 'markdown',
      level: 'basic',
      title: 'Apa itu Algoritma?',
      content: `## Definisi Algoritma

**Algoritma** adalah serangkaian langkah-langkah terstruktur, logis, dan terbatas untuk menyelesaikan suatu masalah. Bayangkan resep masakan: setiap langkah harus jelas, berurutan, dan bisa diikuti agar hidangan berhasil dibuat.

Di dunia pemrograman, algoritma mengubah masalah menjadi serangkaian instruksi yang dapat dijalankan komputer. Contoh sederhana:

\`\`\`text
1. Terima daftar angka (input)
2. Cari angka terbesar
3. Tampilkan angka terbesar (output)
\`\`\`

## Pseudocode

**Pseudocode** adalah cara menulis algoritma menggunakan bahasa yang mirip kode tetapi tidak terikat aturan bahasa pemrograman tertentu. Tujuannya agar manusia mudah memahami logika sebelum diimplementasikan.

\`\`\`text
function cariTerbesar(daftar):
    maksimal = daftar[0]
    for setiap angka in daftar:
        if angka > maksimal:
            maksimal = angka
    return maksimal
\`\`\`

## Flowchart

**Flowchart** adalah representasi visual algoritma menggunakan simbol-simbol standar:

- **Oval**: titik awal atau akhir.
- **Persegi panjang**: proses atau operasi.
- **Belah ketupat**: keputusan (percabangan).
- **Panah**: arah alur.

Flowchart membantu tim berdiskusi tentang alur logika tanpa harus membaca kode.

## Input, Proses, dan Output

Setiap algoritma pada dasarnya memiliki tiga komponen:

1. **Input**: data yang diberikan ke algoritma.
2. **Proses**: langkah-langkah yang dilakukan terhadap input.
3. **Output**: hasil akhir yang dikembalikan.

Misalnya, algoritma menghitung luas persegi panjang:

- Input: panjang dan lebar.
- Proses: panjang × lebar.
- Output: luas.`,
    },
    {
      id: 'sec-03-js-linear-search',
      type: 'code-example',
      codeExample: {
        id: 'code-03-js-linear',
        filename: 'linear-search.js',
        language: 'javascript',
        title: 'JavaScript: Pencarian Linear',
        code: `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i; // ditemukan pada indeks ke-i
    }
  }
  return -1; // tidak ditemukan
}

const numbers = [12, 5, 8, 21, 7, 15];
console.log(linearSearch(numbers, 21)); // 3
console.log(linearSearch(numbers, 99)); // -1`,
        explanation:
          'Pencarian linear memeriksa setiap elemen satu per satu dari awal sampai akhir. Sederhana, tetapi menjadi lambat saat data sangat besar.',
      },
    },
    {
      id: 'sec-03-intermediate',
      type: 'markdown',
      level: 'intermediate',
      title: 'Algoritma Pencarian dan Pengurutan',
      content: `## Linear Search

**Linear search** (atau *sequential search*) memeriksa setiap elemen secara berurutan hingga target ditemukan atau data habis. Algoritma ini tidak memerlukan data terurut.

- **Best case**: target ada di elemen pertama → O(1).
- **Average case**: target berada di tengah-tengah → O(n).
- **Worst case**: target tidak ada atau di elemen terakhir → O(n).

## Binary Search

**Binary search** bekerja dengan cara membagi data menjadi dua bagian berulang kali. Algoritma ini jauh lebih cepat daripada linear search, tetapi **hanya bisa digunakan jika data sudah terurut**.

Langkahnya:

1. Lihat elemen di tengah.
2. Jika sama dengan target, selesai.
3. Jika target lebih kecil, cari di bagian kiri.
4. Jika target lebih besar, cari di bagian kanan.
5. Ulangi sampai ditemukan atau tidak ada lagi bagian yang bisa dicari.

Kompleksitas waktunya adalah O(log n) karena setiap langkah memotong jumlah elemen menjadi setengahnya.

## Algoritma Pengurutan Dasar

Tiga algoritma pengurutan yang sering dipelajari pemula:

### Bubble Sort

Bubble sort membandingkan dua elemen bersebelahan dan menukarnya jika urutannya salah. Proses ini berulang sampai tidak ada lagi pertukaran.

- Best case: data sudah terurut → O(n).
- Average dan worst case → O(n^2).

### Selection Sort

Selection sort mencari elemen terkecil di sisa array, lalu menukarnya dengan posisi yang sedang diisi.

- Semua kasus → O(n^2).

### Insertion Sort

Insertion sort membangun bagian terurut secara bertahap dengan menyisipkan elemen berikutnya ke posisi yang tepat.

- Best case: data sudah terurut → O(n).
- Average dan worst case → O(n^2).

## Memilih Algoritma

Tidak ada algoritma terbaik untuk semua situasi. Pilihlah berdasarkan:

- Apakah data sudah terurut?
- Berapa besar ukuran data?
- Apakah memori terbatas?
- Apakah urutan elemen yang sama perlu dipertahankan (*stability*)?`,
    },
    {
      id: 'sec-03-js-bubble-sort',
      type: 'code-example',
      codeExample: {
        id: 'code-03-js-bubble',
        filename: 'bubble-sort.js',
        language: 'javascript',
        title: 'JavaScript: Bubble Sort',
        code: `function bubbleSort(arr) {
  const result = [...arr];

  for (let i = 0; i < result.length; i++) {
    for (let j = 0; j < result.length - i - 1; j++) {
      if (result[j] > result[j + 1]) {
        // Tukar elemen yang bersebelahan
        [result[j], result[j + 1]] = [result[j + 1], result[j]];
      }
    }
  }

  return result;
}

const unsorted = [64, 25, 12, 22, 11];
console.log(bubbleSort(unsorted)); // [11, 12, 22, 25, 64]`,
        explanation:
          'Bubble sort bekerja dengan menyusuri array berulang kali dan menukar elemen yang tidak berurutan. Mudah dipahami, tetapi tidak efisien untuk data besar.',
      },
    },
    {
      id: 'sec-03-ts-binary-search',
      type: 'code-example',
      codeExample: {
        id: 'code-03-ts-binary',
        filename: 'binary-search.ts',
        language: 'typescript',
        title: 'TypeScript: Binary Search Generik',
        code: `function binarySearch<T>(
  arr: T[],
  target: T,
  compare: (a: T, b: T) => number
): number {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const comparison = compare(arr[mid], target);

    if (comparison === 0) {
      return mid; // ditemukan
    } else if (comparison < 0) {
      left = mid + 1; // cari di kanan
    } else {
      right = mid - 1; // cari di kiri
    }
  }

  return -1; // tidak ditemukan
}

const scores = [10, 25, 37, 42, 58, 71, 89];
const index = binarySearch(scores, 42, (a, b) => a - b);
console.log(index); // 3

const words = ['apel', 'jeruk', 'mangga', 'pisang'];
const wordIndex = binarySearch(words, 'mangga', (a, b) => a.localeCompare(b));
console.log(wordIndex); // 2`,
        explanation:
          'Fungsi generik menerima tipe T dan fungsi pembanding, sehingga bisa digunakan untuk angka, string, atau tipe data lain yang memiliki urutan.',
      },
    },
    {
      id: 'sec-03-advanced',
      type: 'markdown',
      level: 'advanced',
      title: 'Kompleksitas, Rekursi, dan Memoization',
      content: `## Notasi Big-O

**Big-O notation** menggambarkan seberapa cepat waktu atau ruang yang dibutuhkan algoritma tumbuh seiring bertambahnya ukuran input n. Big-O tidak memberikan waktu dalam detik, melainkan **tingkat pertumbuhan** (growth rate).

Beberapa notasi umum:

| Notasi | Nama | Karakteristik |
|--------|------|---------------|
| O(1) | Konstant | waktu tetap, tidak tergantung ukuran input |
| O(log n) | Logaritmik | sangat cepat, seringkali membagi data menjadi dua |
| O(n) | Linear | waktu sebanding dengan jumlah elemen |
| O(n log n) | Linearitmik | umum pada pengurutan efisien seperti merge sort |
| O(n^2) | Kuadratik | umum pada pengurutan sederhana seperti bubble sort |
| O(2^n) | Eksponensial | sangat lambat, sering muncul pada rekursi brute force |

Semakin rendah laju pertumbuhannya, semakin baik algoritma tersebut untuk data besar.

## Rekursi

**Rekursi** adalah teknik pemrograman di mana fungsi memanggil dirinya sendiri untuk menyelesaikan sub-masalah yang lebih kecil.

Setiap fungsi rekursif harus memiliki:

1. **Base case**: kondisi berhenti agar tidak terjadi pemanggilan tanpa akhir.
2. **Recursive case**: langkah yang memecah masalah dan memanggil fungsi itu sendiri.

Contoh klasik: faktorial.

\`\`\`text
faktorial(n):
    if n == 0: return 1        // base case
    return n * faktorial(n-1)  // recursive case
\`\`\`

## Memoization

**Memoization** adalah teknik menyimpan hasil perhitungan yang sudah dilakukan agar tidak dihitung ulang. Teknik ini sangat berguna untuk algoritma rekursif yang banyak melakukan perhitungan berulang, seperti Fibonacci.

Tanpa memoization, kompleksitas Fibonacci rekursif adalah O(2^n). Dengan memoization, kompleksitasnya turun menjadi O(n).`,
    },
    {
      id: 'sec-03-go-fibonacci',
      type: 'code-example',
      codeExample: {
        id: 'code-03-go-fib',
        filename: 'main.go',
        language: 'go',
        title: 'Go: Fibonacci Rekursif dengan Memoization',
        code: `package main

import "fmt"

func fib(n int, memo map[int]uint64) uint64 {
	if n <= 1 {
		return uint64(n) // base case
	}

	if value, ok := memo[n]; ok {
		return value // gunakan hasil yang sudah dihitung
	}

	memo[n] = fib(n-1, memo) + fib(n-2, memo)
	return memo[n]
}

func main() {
	memo := make(map[int]uint64)
	fmt.Println(fib(10, memo)) // 55
	fmt.Println(fib(40, memo)) // 102334155
}`,
        explanation:
          'Map memo menyimpan hasil Fibonacci yang sudah dihitung, sehingga setiap nilai n hanya dihitung sekali. Base case mencegah rekursi tanpa batas.',
      },
    },
    {
      id: 'sec-03-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Ringkasan:** Algoritma adalah langkah terstruktur untuk menyelesaikan masalah. Linear search bekerja pada data apa pun dengan kompleksitas O(n), sedangkan binary search jauh lebih cepat (O(log n)) tetapi membutuhkan data terurut. Bubble sort, selection sort, dan insertion sort sederhana tetapi umumnya O(n²). Big-O mengukur pertumbuhan waktu/ruang, rekursi memecah masalah melalui pemanggilan diri sendiri, dan memoization menghindari perhitungan ulang untuk meningkatkan performa.',
    },
  ],
}
