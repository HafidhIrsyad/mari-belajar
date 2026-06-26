# Thatch — Sample Chapter Content: "Cara Kerja Komputer — Dari Bit sampai Program Berjalan"

> Dokumen ini berisi naskah konten lengkap untuk chapter sample Milestone 1. Format ditulis agar bisa langsung disalin ke modul konten TypeScript (markdown string + code blocks). Di akhir dokumen disertakan representasi modul TypeScript.

---

## Metadata Chapter

| Field | Value |
|-------|-------|
| Chapter ID | `ch-01-how-computers-work` |
| Course ID | `cs-fundamentals` |
| Title | **Cara Kerja Komputer — Dari Bit sampai Program Berjalan** |
| Order | 1 |
| Estimated Reading Time | 12-15 menit |

---

## Tujuan Pembelajaran

Setelah menyelesaikan chapter ini, learner akan mampu:

1. Menjelaskan apa itu bit, byte, dan mengapa komputer menggunakan sistem biner.
2. Membaca dan mengonversi bilangan biner ke desimal dan sebaliknya.
3. Memahami bagaimana data (angka, teks) direpresentasikan di dalam memori.
4. Menjelaskan perbedaan compiler, interpreter, dan transpiler.
5. Memahami siklus kerja CPU (fetch-decode-execute) secara konseptual.
6. Mengenal layout memori dan konsep pointer secara umum.

---

## Bagian 1 — Basic: Dari Listrik ke Bit

### Apa itu Komputer?

Komputer pada dasarnya adalah mesin yang memproses informasi. Informasi tersebut bisa berupa angka, teks, gambar, suara, atau perintah. Semua informasi itu pada akhirnya harus diubah ke bentuk yang bisa dipahami oleh mesin: **bit**.

### Bit dan Byte

**Bit** adalah unit terkecil informasi di komputer. Bit hanya memiliki dua kemungkinan nilai: `0` atau `1`. Anggap saja bit seperti saklar lampu — lampu bisa mati (`0`) atau menyala (`1`).

Karena satu bit terlalu kecil untuk merepresentasikan data yang bermakna, komputer mengelompokkan bit menjadi **byte**. Satu byte terdiri dari **8 bit**.

```text
1 byte = 8 bit
Contoh: 01000001
```

Dengan 8 bit, kita bisa merepresentasikan 2^8 = 256 kemungkinan nilai berbeda. Itulah mengapa byte menjadi standar untuk menyimpan satu karakter ASCII, seperti huruf `A`.

### Sistem Biner

Manusia biasa menghitung dengan sistem **desimal** (basis 10) menggunakan angka 0 sampai 9. Komputer menggunakan sistem **biner** (basis 2) karena komponen elektroniknya paling mudah bekerja dalam dua keadaan: ada tegangan atau tidak ada tegangan.

Setiap posisi bit dalam biner memiliki nilai yang merupakan pangkat dari 2:

```text
Posisi (dari kanan):  7   6   5   4   3   2   1   0
Nilai pangkat 2:    128  64  32  16   8   4   2   1
Bit:                  0   1   0   0   0   0   0   1
```

Byte `01000001` dihitung sebagai:

```text
0×128 + 1×64 + 0×32 + 0×16 + 0×8 + 0×4 + 0×2 + 1×1 = 65
```

Nilai 65 dalam ASCII adalah huruf `A`. Jadi, byte `01000001` bisa berarti angka 65, atau huruf `A`, tergantung bagaimana program membacanya.

### Contoh Kode 1 — JavaScript: Mengonversi Desimal ke Biner

Di JavaScript, kita bisa memanfaatkan method `.toString(2)` untuk mengubah angka desimal menjadi string biner.

```javascript
// Mengonversi desimal ke biner
const decimal = 65;
const binary = decimal.toString(2).padStart(8, "0");

console.log(binary); // "01000001"

// Operasi bitwise AND untuk memeriksa bit tertentu
const mask = 0b00001000; // bit ke-3 (nilai 8)
const hasBit = (decimal & mask) !== 0;

console.log(hasBit); // false, karena 65 tidak memiliki bit ke-3
```

> **Catatan bisnis:** Contoh ini menunjukkan bagaimana programmer membaca data biner tanpa harus menghitung manual. Code block ini ditampilkan pada halaman lesson dalam komponen code viewer.

---

## Bagian 2 — Intermediate: Bagaimana Data Direpresentasikan

### Representasi Angka

Komputer menyimpan angka sebagai byte-byte di memori. Angka bulat positif kecil bisa disimpan dalam 1 byte, tetapi angka besar membutuhkan lebih banyak byte, misalnya 2 byte (16 bit), 4 byte (32 bit), atau 8 byte (64 bit).

Selain biner, programmer sering menggunakan **heksadesimal** (basis 16) karena lebih ringkas. Setiap digit heksadesimal mewakili 4 bit, sehingga 1 byte bisa ditulis dengan 2 digit heksadesimal.

```text
Desimal 255 = Biner 11111111 = Heksadesimal 0xFF
```

### Representasi Teks

Teks direpresentasikan sebagai rangkaian kode angka. **ASCII** adalah standar lama yang menggunakan 1 byte per karakter dan hanya mencakup 128 karakter (huruf Inggris, angka, simbol). Untuk bahasa lain seperti Indonesia, Jepang, atau emoji, komputer menggunakan **Unicode**, yang bisa membutuhkan beberapa byte per karakter.

### Endianness

Ketika angka besar disimpan di memori, komputer harus memutuskan: byte paling berarti (*most significant byte*) disimpan di alamat memori paling awal atau paling akhir? Perbedaan ini disebut **endianness**.

- **Big-endian**: byte paling berarti disimpan di alamat terendah.
- **Little-endian**: byte paling berarti disimpan di alamat tertinggi.

Endianness biasanya tidak perlu dipikirkan programmer aplikasi, tetapi penting saat berkomunikasi antar sistem atau membaca file biner.

### Compiler, Interpreter, dan Transpiler

Sebelum program bisa berjalan, kode yang ditulis programmer harus diubah menjadi instruksi mesin. Ada beberapa cara:

- **Compiler**: menerjemahkan seluruh kode sumber menjadi file biner/executable sebelum dijalankan. Contoh: Go, C, Rust.
- **Interpreter**: membaca dan menjalankan kode baris per baris saat program berjalan. Contoh: JavaScript di browser.
- **Transpiler**: menerjemahkan kode dari satu bahasa tingkat tinggi ke bahasa tingkat tinggi lain. Contoh: TypeScript → JavaScript.

### Contoh Kode 2 — TypeScript: Konverter Basis Bilangan Type-Safe

TypeScript menambahkan tipe data pada JavaScript, sehingga kita bisa memastikan fungsi hanya menerima input yang valid.

```typescript
type Base = 2 | 8 | 10 | 16;

function convertNumber(
  value: number,
  targetBase: Base,
  padTo: number = 8
): string {
  if (value < 0 || !Number.isInteger(value)) {
    throw new Error("Hanya mendukung bilangan bulat positif");
  }

  const digits = value.toString(targetBase);

  if (targetBase === 2 || targetBase === 8 || targetBase === 16) {
    return digits.padStart(padTo, "0").toUpperCase();
  }

  return digits;
}

console.log(convertNumber(65, 2));   // "01000001"
console.log(convertNumber(255, 16)); // "000000FF"
console.log(convertNumber(77, 8));   // "00000115"
```

> **Catatan bisnis:** Contoh ini memperlihatkan pemanfaatan tipe untuk validasi basis bilangan. Code block TypeScript ditampilkan setelah penjelasan transpiler agar learner memahami hubungan TS → JS.

---

## Bagian 3 — Advanced: Dari Instruksi sampai Program Berjalan

### Siklus Fetch-Decode-Execute

CPU adalah "otak" komputer yang mengeksekusi instruksi. Proses eksekusi instruksi mengikuti siklus sederhana:

1. **Fetch**: CPU mengambil instruksi dari memori berdasarkan alamat yang ditunjukkan oleh *program counter*.
2. **Decode**: CPU menerjemahkan instruksi menjadi operasi yang harus dilakukan.
3. **Execute**: CPU menjalankan operasi tersebut, misalnya penjumlahan, perbandingan, atau pembacaan memori.
4. **Store**: Hasil operasi disimpan kembali ke register atau memori.

Siklus ini berlangsung sangat cepat — miliaran kali per detik pada prosesor modern.

### Layout Memori

Ketika program berjalan, sistem operasi memberinya area memori yang umumnya dibagi menjadi beberapa bagian:

- **Code segment**: menyimpan instruksi program itu sendiri.
- **Data segment**: menyimpan variabel global dan static.
- **Stack**: menyimpan variabel lokal dan informasi pemanggilan fungsi. Tumbuh dan menyusut secara otomatis.
- **Heap**: menyimpan data yang dialokasikan secara dinamis, seperti objek besar.

Memahami layout memori membantu programmer memahami mengapa variabel lokal hilang setelah fungsi selesai, dan mengapa data heap harus dikelola dengan hati-hati.

### Pointer dan Alamat Memori

**Pointer** adalah variabel yang menyimpan **alamat memori** dari data lain, bukan nilai data itu sendiri. Bayangkan pointer seperti label alamat rumah: label itu menunjuk ke rumah, bukan rumah itu sendiri.

Pointer sangat penting di bahasa seperti C, C++, dan Go. Pointer memungkinkan program berbagi data besar tanpa harus menyalinnya berulang kali, tetapi juga memerlukan kehati-hatian agar tidak mengakses memori yang sudah tidak valid.

### Pengantar Assembly

**Assembly** adalah bahasa pemrograman tingkat rendah yang sangat dekat dengan instruksi mesin. Setiap instruksi assembly biasanya berkorespondensi satu-ke-satu dengan instruksi CPU. Programmer jarang menulis assembly langsung, tetapi memahami konsepnya membantu saat membaca *crash dump* atau mengoptimalkan kode performa kritis.

### Contoh Kode 3 — Go: Bit Manipulation dan Representasi Data

Go adalah bahasa yang dikompilasi dan memiliki dukungan kuat untuk manipulasi bit serta format bilangan. Contoh berikut menunjukkan cara menampilkan representasi biner, heksadesimal, dan melakukan bit shift.

```go
package main

import "fmt"

func main() {
	var value uint8 = 65

	// Representasi berbagai basis
	fmt.Printf("Desimal: %d\n", value)
	fmt.Printf("Biner:   %08b\n", value)
	fmt.Printf("Oktal:   %03o\n", value)
	fmt.Printf("Heks:    %02X\n", value)

	// Bit shift ke kiri dan ke kanan
	shiftedLeft := value << 1  // 65 * 2 = 130
	shiftedRight := value >> 1 // 65 / 2 = 32

	fmt.Printf("Shift kiri:  %08b = %d\n", shiftedLeft, shiftedLeft)
	fmt.Printf("Shift kanan: %08b = %d\n", shiftedRight, shiftedRight)

	// Bitwise OR untuk menyalakan bit ke-2 (nilai 4)
	var mask uint8 = 0b00000100
	result := value | mask
	fmt.Printf("OR dengan mask: %08b = %d\n", result, result)
}
```

Output yang diharapkan:

```text
Desimal: 65
Biner:   01000001
Oktal:   101
Heks:    41
Shift kiri:  10000010 = 130
Shift kanan: 00100000 = 32
OR dengan mask: 01000101 = 69
```

> **Catatan bisnis:** Contoh Go menunjukkan bahasa yang dikompilasi dan dekat dengan representasi mesin. Cocok ditampilkan setelah penjelasan compiler dan layout memori.

---

## Ringkasan Chapter

- Komputer bekerja dengan bit (`0` dan `1`); 8 bit membentuk 1 byte.
- Sistem biner adalah cara komputer merepresentasikan angka; heksadesimal digunakan programmer untuk membacanya dengan lebih ringkas.
- Data seperti angka dan teks disimpan sebagai byte di memori; interpretasinya bergantung pada tipe datanya.
- Compiler, interpreter, dan transpiler adalah cara berbeda untuk menerjemahkan kode menjadi instruksi yang bisa dijalankan.
- CPU menjalankan program melalui siklus fetch-decode-execute berulang kali.
- Memori program dibagi menjadi code segment, data segment, stack, dan heap.
- Pointer menyimpan alamat memori, bukan nilai langsung.

---

## Quiz

> Setiap soal memiliki 4 opsi dan 1 jawaban benar. Index jawaban benar dimulai dari 0.

### Soal 1
**Berapa jumlah bit dalam 1 byte?**

- 0: 4
- 1: 8
- 2: 16
- 3: 32

**Jawaban benar:** 1

---

### Soal 2
**Bilangan biner `1010` sama dengan berapa dalam desimal?**

- 0: 8
- 1: 9
- 2: 10
- 3: 11

**Jawaban benar:** 2

---

### Soal 3
**Karakter `A` dalam standar ASCII direpresentasikan sebagai angka desimal:**

- 0: 64
- 1: 65
- 2: 66
- 3: 97

**Jawaban benar:** 1

---

### Soal 4
**Apa fungsi utama CPU dalam menjalankan program?**

- 0: Menyimpan data secara permanen
- 1: Mengeksekusi instruksi melalui siklus fetch-decode-execute
- 2: Mengatur tampilan ke layar
- 3: Menghubungkan komputer ke internet

**Jawaban benar:** 1

---

### Soal 5
**Bilangan desimal 255 direpresentasikan dalam heksadesimal sebagai:**

- 0: FF
- 1: EE
- 2: 100
- 3: 99

**Jawaban benar:** 0

---

### Soal 6
**Proses mengubah kode TypeScript menjadi kode JavaScript disebut:**

- 0: Compiling
- 1: Interpreting
- 2: Transpiling
- 3: Linking

**Jawaban benar:** 2

---

### Soal 7
**Pada big-endian, byte paling signifikan disimpan di:**

- 0: Alamat memori terendah
- 1: Alamat memori tertinggi
- 2: Bagian tengah memori
- 3: Posisi acak

**Jawaban benar:** 0

---

### Soal 8
**Pointer pada dasarnya menyimpan:**

- 0: Nilai langsung dari sebuah variabel
- 1: Alamat memori tempat data berada
- 2: Tipe data dari sebuah variabel
- 3: Panjang string

**Jawaban benar:** 1

---

## Representasi Modul TypeScript (Ready to Copy)

Berikut adalah representasi modul konten yang bisa disalin langsung ke file TypeScript oleh tim implementasi. Semua konten materi, kode, dan quiz sudah termasuk di dalamnya.

```typescript
export const ch01HowComputersWork = {
  id: "ch-01-how-computers-work",
  courseId: "cs-fundamentals",
  title: "Cara Kerja Komputer — Dari Bit sampai Program Berjalan",
  order: 1,
  estimatedMinutes: 14,
  learningObjectives: [
    "Menjelaskan apa itu bit, byte, dan mengapa komputer menggunakan sistem biner.",
    "Membaca dan mengonversi bilangan biner ke desimal dan sebaliknya.",
    "Memahami bagaimana data (angka, teks) direpresentasikan di dalam memori.",
    "Menjelaskan perbedaan compiler, interpreter, dan transpiler.",
    "Memahami siklus kerja CPU (fetch-decode-execute) secara konseptual.",
    "Mengenal layout memori dan konsep pointer secara umum.",
  ],
  sections: [
    {
      level: "basic",
      title: "Dari Listrik ke Bit",
      content: `## Apa itu Komputer?

Komputer pada dasarnya adalah mesin yang memproses informasi. Semua informasi pada akhirnya harus diubah ke bentuk yang bisa dipahami oleh mesin: **bit**.

## Bit dan Byte

**Bit** adalah unit terkecil informasi di komputer. Bit hanya memiliki dua kemungkinan nilai: \`0\` atau \`1\`.

Karena satu bit terlalu kecil, komputer mengelompokkan bit menjadi **byte**. Satu byte terdiri dari **8 bit**.

\`\`\`text
1 byte = 8 bit
Contoh: 01000001
\`\`\`

Dengan 8 bit, kita bisa merepresentasikan 2^8 = 256 kemungkinan nilai berbeda.

## Sistem Biner

Manusia menggunakan sistem **desimal** (basis 10). Komputer menggunakan sistem **biner** (basis 2).

Setiap posisi bit dalam biner memiliki nilai yang merupakan pangkat dari 2:

\`\`\`text
Posisi (dari kanan):  7   6   5   4   3   2   1   0
Nilai pangkat 2:    128  64  32  16   8   4   2   1
Bit:                  0   1   0   0   0   0   0   1
\`\`\`

Byte \`01000001\` dihitung sebagai 65, yang dalam ASCII adalah huruf \`A\`.
`,
    },
    {
      level: "intermediate",
      title: "Bagaimana Data Direpresentasikan",
      content: `## Representasi Angka

Komputer menyimpan angka sebagai byte-byte di memori. Selain biner, programmer sering menggunakan **heksadesimal** (basis 16).

\`\`\`text
Desimal 255 = Biner 11111111 = Heksadesimal 0xFF
\`\`\`

## Representasi Teks

Teks direpresentasikan sebagai rangkaian kode angka. **ASCII** menggunakan 1 byte per karakter. Untuk karakter internasional dan emoji, komputer menggunakan **Unicode**.

## Endianness

**Endianness** menentukan urutan penyimpanan byte di memori:

- **Big-endian**: byte paling berarti di alamat terendah.
- **Little-endian**: byte paling berarti di alamat tertinggi.

## Compiler, Interpreter, dan Transpiler

- **Compiler**: menerjemahkan seluruh kode ke biner sebelum dijalankan (Go, C).
- **Interpreter**: menjalankan kode baris per baris (JavaScript di browser).
- **Transpiler**: menerjemahkan kode tingkat tinggi ke kode tingkat tinggi lain (TypeScript → JavaScript).
`,
    },
    {
      level: "advanced",
      title: "Dari Instruksi sampai Program Berjalan",
      content: `## Siklus Fetch-Decode-Execute

CPU mengeksekusi instruksi mengikuti siklus:

1. **Fetch**: mengambil instruksi dari memori.
2. **Decode**: menerjemahkan instruksi.
3. **Execute**: menjalankan operasi.
4. **Store**: menyimpan hasil.

## Layout Memori

- **Code segment**: instruksi program.
- **Data segment**: variabel global dan static.
- **Stack**: variabel lokal dan pemanggilan fungsi.
- **Heap**: data yang dialokasikan dinamis.

## Pointer dan Alamat Memori

**Pointer** menyimpan **alamat memori** dari data lain, bukan nilai langsung.

## Pengantar Assembly

**Assembly** adalah bahasa tingkat rendah yang berkorespondensi langsung dengan instruksi CPU.
`,
    },
  ],
  codeExamples: [
    {
      language: "javascript",
      title: "Konversi Desimal ke Biner",
      code: `// Mengonversi desimal ke biner
const decimal = 65;
const binary = decimal.toString(2).padStart(8, "0");

console.log(binary); // "01000001"

// Operasi bitwise AND untuk memeriksa bit tertentu
const mask = 0b00001000; // bit ke-3 (nilai 8)
const hasBit = (decimal & mask) !== 0;

console.log(hasBit); // false`,
    },
    {
      language: "typescript",
      title: "Konverter Basis Bilangan Type-Safe",
      code: `type Base = 2 | 8 | 10 | 16;

function convertNumber(
  value: number,
  targetBase: Base,
  padTo: number = 8
): string {
  if (value < 0 || !Number.isInteger(value)) {
    throw new Error("Hanya mendukung bilangan bulat positif");
  }

  const digits = value.toString(targetBase);

  if (targetBase === 2 || targetBase === 8 || targetBase === 16) {
    return digits.padStart(padTo, "0").toUpperCase();
  }

  return digits;
}

console.log(convertNumber(65, 2));   // "01000001"
console.log(convertNumber(255, 16)); // "000000FF"
console.log(convertNumber(77, 8));   // "00000115"`,
    },
    {
      language: "go",
      title: "Bit Manipulation dan Representasi Data",
      code: `package main

import "fmt"

func main() {
\tvar value uint8 = 65

\t// Representasi berbagai basis
\tfmt.Printf("Desimal: %d\\n", value)
\tfmt.Printf("Biner:   %08b\\n", value)
\tfmt.Printf("Oktal:   %03o\\n", value)
\tfmt.Printf("Heks:    %02X\\n", value)

\t// Bit shift ke kiri dan ke kanan
\tshiftedLeft := value << 1
\tshiftedRight := value >> 1

\tfmt.Printf("Shift kiri:  %08b = %d\\n", shiftedLeft, shiftedLeft)
\tfmt.Printf("Shift kanan: %08b = %d\\n", shiftedRight, shiftedRight)

\t// Bitwise OR untuk menyalakan bit ke-2 (nilai 4)
\tvar mask uint8 = 0b00000100
\tresult := value | mask
\tfmt.Printf("OR dengan mask: %08b = %d\\n", result, result)
}`,
    },
  ],
  summary: [
    "Komputer bekerja dengan bit (0 dan 1); 8 bit membentuk 1 byte.",
    "Sistem biner adalah cara komputer merepresentasikan angka; heksadesimal membacanya lebih ringkas.",
    "Data seperti angka dan teks disimpan sebagai byte di memori.",
    "Compiler, interpreter, dan transpiler menerjemahkan kode dengan cara berbeda.",
    "CPU menjalankan program melalui siklus fetch-decode-execute.",
    "Memori program dibagi menjadi code segment, data segment, stack, dan heap.",
    "Pointer menyimpan alamat memori, bukan nilai langsung.",
  ],
  quiz: {
    title: "Quiz: Cara Kerja Komputer",
    minimumScore: 1.0,
    questions: [
      {
        text: "Berapa jumlah bit dalam 1 byte?",
        options: ["4", "8", "16", "32"],
        correctIndex: 1,
      },
      {
        text: "Bilangan biner 1010 sama dengan berapa dalam desimal?",
        options: ["8", "9", "10", "11"],
        correctIndex: 2,
      },
      {
        text: "Karakter 'A' dalam standar ASCII direpresentasikan sebagai angka desimal:",
        options: ["64", "65", "66", "97"],
        correctIndex: 1,
      },
      {
        text: "Apa fungsi utama CPU dalam menjalankan program?",
        options: [
          "Menyimpan data secara permanen",
          "Mengeksekusi instruksi melalui siklus fetch-decode-execute",
          "Mengatur tampilan ke layar",
          "Menghubungkan komputer ke internet",
        ],
        correctIndex: 1,
      },
      {
        text: "Bilangan desimal 255 direpresentasikan dalam heksadesimal sebagai:",
        options: ["FF", "EE", "100", "99"],
        correctIndex: 0,
      },
      {
        text: "Proses mengubah kode TypeScript menjadi kode JavaScript disebut:",
        options: ["Compiling", "Interpreting", "Transpiling", "Linking"],
        correctIndex: 2,
      },
      {
        text: "Pada big-endian, byte paling signifikan disimpan di:",
        options: [
          "Alamat memori terendah",
          "Alamat memori tertinggi",
          "Bagian tengah memori",
          "Posisi acak",
        ],
        correctIndex: 0,
      },
      {
        text: "Pointer pada dasarnya menyimpan:",
        options: [
          "Nilai langsung dari sebuah variabel",
          "Alamat memori tempat data berada",
          "Tipe data dari sebuah variabel",
          "Panjang string",
        ],
        correctIndex: 1,
      },
    ],
  },
};
```
