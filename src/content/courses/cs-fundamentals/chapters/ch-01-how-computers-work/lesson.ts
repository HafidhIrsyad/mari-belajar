import type { Lesson } from '@/content/types'

export const ch01Lesson: Lesson = {
  id: 'lesson-ch-01-how-computers-work',
  estimatedMinutes: 14,
  sections: [
    {
      id: 'sec-01-basic-intro',
      type: 'markdown',
      level: 'basic',
      title: 'Dari Listrik ke Bit',
      content: `## Apa itu Komputer?

Komputer pada dasarnya adalah mesin yang memproses informasi. Informasi tersebut bisa berupa angka, teks, gambar, suara, atau perintah. Semua informasi itu pada akhirnya harus diubah ke bentuk yang bisa dipahami oleh mesin: **bit**.

## Bit dan Byte

**Bit** adalah unit terkecil informasi di komputer. Bit hanya memiliki dua kemungkinan nilai: \`0\` atau \`1\`. Anggap saja bit seperti saklar lampu — lampu bisa mati (\`0\`) atau menyala (\`1\`).

Karena satu bit terlalu kecil untuk merepresentasikan data yang bermakna, komputer mengelompokkan bit menjadi **byte**. Satu byte terdiri dari **8 bit**.

\`\`\`text
1 byte = 8 bit
Contoh: 01000001
\`\`\`

Dengan 8 bit, kita bisa merepresentasikan 2^8 = 256 kemungkinan nilai berbeda. Itulah mengapa byte menjadi standar untuk menyimpan satu karakter ASCII, seperti huruf \`A\`.

## Sistem Biner

Manusia biasa menghitung dengan sistem **desimal** (basis 10) menggunakan angka 0 sampai 9. Komputer menggunakan sistem **biner** (basis 2) karena komponen elektroniknya paling mudah bekerja dalam dua keadaan: ada tegangan atau tidak ada tegangan.

Setiap posisi bit dalam biner memiliki nilai yang merupakan pangkat dari 2:

\`\`\`text
Posisi (dari kanan):  7   6   5   4   3   2   1   0
Nilai pangkat 2:    128  64  32  16   8   4   2   1
Bit:                  0   1   0   0   0   0   0   1
\`\`\`

Byte \`01000001\` dihitung sebagai:

\`\`\`text
0×128 + 1×64 + 0×32 + 0×16 + 0×8 + 0×4 + 0×2 + 1×1 = 65
\`\`\`

Nilai 65 dalam ASCII adalah huruf \`A\`. Jadi, byte \`01000001\` bisa berarti angka 65, atau huruf \`A\`, tergantung bagaimana program membacanya.`,
    },
    {
      id: 'sec-01-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-01-js',
        filename: 'decimal-to-binary.js',
        language: 'javascript',
        title: 'JavaScript: Mengonversi Desimal ke Biner',
        code: `// Mengonversi desimal ke biner
const decimal = 65;
const binary = decimal.toString(2).padStart(8, "0");

console.log(binary); // "01000001"

// Operasi bitwise AND untuk memeriksa bit tertentu
const mask = 0b00001000; // bit ke-3 (nilai 8)
const hasBit = (decimal & mask) !== 0;

console.log(hasBit); // false, karena 65 tidak memiliki bit ke-3`,
        explanation:
          'Method `.toString(2)` mengubah angka desimal menjadi string biner, sedangkan `padStart(8, "0")` memastikan hasilnya selalu 8 digit.',
      },
    },
    {
      id: 'sec-01-intermediate',
      type: 'markdown',
      level: 'intermediate',
      title: 'Bagaimana Data Direpresentasikan',
      content: `## Representasi Angka

Komputer menyimpan angka sebagai byte-byte di memori. Angka bulat positif kecil bisa disimpan dalam 1 byte, tetapi angka besar membutuhkan lebih banyak byte, misalnya 2 byte (16 bit), 4 byte (32 bit), atau 8 byte (64 bit).

Selain biner, programmer sering menggunakan **heksadesimal** (basis 16) karena lebih ringkas. Setiap digit heksadesimal mewakili 4 bit, sehingga 1 byte bisa ditulis dengan 2 digit heksadesimal.

\`\`\`text
Desimal 255 = Biner 11111111 = Heksadesimal 0xFF
\`\`\`

## Representasi Teks

Teks direpresentasikan sebagai rangkaian kode angka. **ASCII** adalah standar lama yang menggunakan 1 byte per karakter dan hanya mencakup 128 karakter (huruf Inggris, angka, simbol). Untuk bahasa lain seperti Indonesia, Jepang, atau emoji, komputer menggunakan **Unicode**, yang bisa membutuhkan beberapa byte per karakter.

## Endianness

Ketika angka besar disimpan di memori, komputer harus memutuskan: byte paling berarti (*most significant byte*) disimpan di alamat memori paling awal atau paling akhir? Perbedaan ini disebut **endianness**.

- **Big-endian**: byte paling berarti disimpan di alamat terendah.
- **Little-endian**: byte paling berarti disimpan di alamat tertinggi.

Endianness biasanya tidak perlu dipikirkan programmer aplikasi, tetapi penting saat berkomunikasi antar sistem atau membaca file biner.

## Compiler, Interpreter, dan Transpiler

Sebelum program bisa berjalan, kode yang ditulis programmer harus diubah menjadi instruksi mesin. Ada beberapa cara:

- **Compiler**: menerjemahkan seluruh kode sumber menjadi file biner/executable sebelum dijalankan. Contoh: Go, C, Rust.
- **Interpreter**: membaca dan menjalankan kode baris per baris saat program berjalan. Contoh: JavaScript di browser.
- **Transpiler**: menerjemahkan kode dari satu bahasa tingkat tinggi ke bahasa tingkat tinggi lain. Contoh: TypeScript → JavaScript.`,
    },
    {
      id: 'sec-01-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-01-ts',
        filename: 'base-converter.ts',
        language: 'typescript',
        title: 'TypeScript: Konverter Basis Bilangan Type-Safe',
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
        explanation:
          'Tipe `Base` membatasi input hanya ke basis yang valid, sehingga kesalahan penggunaan fungsi bisa tertangkap saat compile time.',
      },
    },
    {
      id: 'sec-01-advanced',
      type: 'markdown',
      level: 'advanced',
      title: 'Dari Instruksi sampai Program Berjalan',
      content: `## Siklus Fetch-Decode-Execute

CPU adalah "otak" komputer yang mengeksekusi instruksi. Proses eksekusi instruksi mengikuti siklus sederhana:

1. **Fetch**: CPU mengambil instruksi dari memori berdasarkan alamat yang ditunjukkan oleh *program counter*.
2. **Decode**: CPU menerjemahkan instruksi menjadi operasi yang harus dilakukan.
3. **Execute**: CPU menjalankan operasi tersebut, misalnya penjumlahan, perbandingan, atau pembacaan memori.
4. **Store**: Hasil operasi disimpan kembali ke register atau memori.

Siklus ini berlangsung sangat cepat — miliaran kali per detik pada prosesor modern.

## Layout Memori

Ketika program berjalan, sistem operasi memberinya area memori yang umumnya dibagi menjadi beberapa bagian:

- **Code segment**: menyimpan instruksi program itu sendiri.
- **Data segment**: menyimpan variabel global dan static.
- **Stack**: menyimpan variabel lokal dan informasi pemanggilan fungsi. Tumbuh dan menyusut secara otomatis.
- **Heap**: menyimpan data yang dialokasikan secara dinamis, seperti objek besar.

Memahami layout memori membantu programmer memahami mengapa variabel lokal hilang setelah fungsi selesai, dan mengapa data heap harus dikelola dengan hati-hati.

## Pointer dan Alamat Memori

**Pointer** adalah variabel yang menyimpan **alamat memori** dari data lain, bukan nilai data itu sendiri. Bayangkan pointer seperti label alamat rumah: label itu menunjuk ke rumah, bukan rumah itu sendiri.

Pointer sangat penting di bahasa seperti C, C++, dan Go. Pointer memungkinkan program berbagi data besar tanpa harus menyalinnya berulang kali, tetapi juga memerlukan kehati-hatian agar tidak mengakses memori yang sudah tidak valid.

## Pengantar Assembly

**Assembly** adalah bahasa pemrograman tingkat rendah yang sangat dekat dengan instruksi mesin. Setiap instruksi assembly biasanya berkorespondensi satu-ke-satu dengan instruksi CPU. Programmer jarang menulis assembly langsung, tetapi memahami konsepnya membantu saat membaca *crash dump* atau mengoptimalkan kode performa kritis.`,
    },
    {
      id: 'sec-01-go-example',
      type: 'code-example',
      codeExample: {
        id: 'code-01-go',
        filename: 'main.go',
        language: 'go',
        title: 'Go: Bit Manipulation dan Representasi Data',
        code: `package main

import "fmt"

func main() {
	var value uint8 = 65

	// Representasi berbagai basis
	fmt.Printf("Desimal: %d\\n", value)
	fmt.Printf("Biner:   %08b\\n", value)
	fmt.Printf("Oktal:   %03o\\n", value)
	fmt.Printf("Heks:    %02X\\n", value)

	// Bit shift ke kiri dan ke kanan
	shiftedLeft := value << 1  // 65 * 2 = 130
	shiftedRight := value >> 1 // 65 / 2 = 32

	fmt.Printf("Shift kiri:  %08b = %d\\n", shiftedLeft, shiftedLeft)
	fmt.Printf("Shift kanan: %08b = %d\\n", shiftedRight, shiftedRight)

	// Bitwise OR untuk menyalakan bit ke-2 (nilai 4)
	var mask uint8 = 0b00000100
	result := value | mask
	fmt.Printf("OR dengan mask: %08b = %d\\n", result, result)
}`,
        explanation:
          'Go adalah bahasa yang dikompilasi dan memiliki dukungan kuat untuk manipulasi bit serta format bilangan. Format `%08b` mencetak biner dengan padding 8 digit.',
      },
    },
    {
      id: 'sec-01-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Ringkasan:** Komputer bekerja dengan bit (0 dan 1); 8 bit membentuk 1 byte. Sistem biner adalah cara komputer merepresentasikan angka; heksadesimal digunakan programmer untuk membacanya dengan lebih ringkas. Data seperti angka dan teks disimpan sebagai byte di memori; interpretasinya bergantung pada tipe datanya.',
    },
  ],
}
