import type { Lesson } from '@/content/types'

export const ch02Lesson: Lesson = {
  id: 'lesson-ch-02-number-systems-and-bits',
  estimatedMinutes: 18,
  sections: [
    {
      id: 'sec-02-basic-number-systems',
      type: 'markdown',
      level: 'basic',
      title: 'Sistem Bilangan yang Sering Digunakan Programmer',
      content: `## Desimal, Biner, Oktal, dan Heksadesimal

Sehari-hari kita menggunakan sistem **desimal** (basis 10) dengan angka 0 sampai 9. Komputer, bagaimanapun, hanya mengenal **biner** (basis 2): setiap digitnya hanya bisa bernilai \`0\` atau \`1\`.

Sistem **oktal** (basis 8) menggunakan angka 0 sampai 7. Meski jarang muncul di kode modern, oktal masih relevan di beberapa perizinan file Unix.

Sistem **heksadesimal** (basis 16) menggunakan angka 0–9 dan huruf A–F. Setiap digit heksadesimal mewakili tepat 4 bit, sehingga 1 byte (8 bit) cukup ditulis dengan 2 digit heksadesimal.

\`\`\`text
Desimal:    0 1 2 ... 9 10 11 12 ... 15 16
Biner:      0 1 10 11 ... 1111 10000
Oktal:      0 1 2 3 ... 17 20
Heksadesimal: 0 1 2 ... 9 A B C D E F 10
\`\`\`

## Mengonversi Antar Sistem Bilangan

Untuk mengubah bilangan dari basis lain ke desimal, kalikan setiap digit dengan pangkat basisnya, mulai dari kanan:

\`\`\`text
Biner 1011 = 1×2³ + 0×2² + 1×2¹ + 1×2⁰ = 8 + 0 + 2 + 1 = 11
Heksadesimal 0x2A = 2×16¹ + 10×16⁰ = 32 + 10 = 42
\`\`\`

Untuk mengubah desimal ke basis lain, bagi berulang kali dan ambil sisa pembagian dari bawah ke atas.

## Mengapa Programmer Perlu Heksadesimal?

- Lebih ringkas dari biner: \`0xFF\` vs \`11111111\`.
- Warna di CSS: \`#RRGGBB\` sebenarnya adalah tiga pasangan heksadesimal.
- Alamat memori dan UUID sering ditulis dalam heksadesimal.
- Protokol biner, checksum, dan nilai *magic number* lebih mudah dibaca pakai heksadesimal.

Membaca heksadesimal seperti membaca singkatan: lebih pendek, lebih cepat dipahami, tetapi tetap merepresentasikan data biner yang sama.`,
    },
    {
      id: 'sec-02-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-02-js',
        filename: 'number-systems.js',
        language: 'javascript',
        title: 'JavaScript: Konversi dan Bit Mask',
        code: `// Konversi dari string heksadesimal ke desimal
const decimal = parseInt("FF", 16);
console.log(decimal); // 255

// Konversi desimal ke string heksadesimal
const hex = (255).toString(16).toUpperCase();
console.log(hex); // "FF"

// Bit mask: periksa apakah bit ke-2 (nilai 4) aktif
const flags = 0b00001101; // 13
const mask = 0b00000100;  // bit ke-2

const isBitSet = (flags & mask) !== 0;
console.log(isBitSet); // false

// Menyalakan bit ke-1 (nilai 2)
const newFlags = flags | 0b00000010;
console.log(newFlags.toString(2).padStart(8, "0")); // "00001111"`,
        explanation:
          'Method parseInt menerima basis sebagai argumen kedua, sedangkan Number.prototype.toString menerima basis target. Operator bitwise AND (&) dan OR (|) memanipulasi bit secara langsung.',
      },
    },
    {
      id: 'sec-02-intermediate-bitwise',
      type: 'markdown',
      level: 'intermediate',
      title: 'Operasi Bitwise, Bit Shift, dan Bit Mask',
      content: `## Operasi Bitwise Dasar

Operasi bitwise bekerja pada setiap bit secara independen. Empat operator utama:

- **AND (&)**: hasil bit \`1\` hanya jika kedua bit bernilai \`1\`.
- **OR (|)**: hasil bit \`1\` jika salah satu bit bernilai \`1\`.
- **XOR (^)**: hasil bit \`1\` jika kedua bit berbeda.
- **NOT (~)**: membalik seluruh bit, mengubah \`0\` menjadi \`1\` dan sebaliknya.

\`\`\`text
  1100      1100      1100      ~1100
& 1010    | 1010    ^ 1010    -------
  ----      ----      ----      0011
  1000      1110      0110
\`\`\`

## Bit Shift Left dan Right

- **Left shift (<<)**: menggeser bit ke kiri, menambahkan \`0\` di kanan. Setiap geseran ke kiri sama dengan mengalikan dengan 2.
- **Right shift (>>)**: menggeser bit ke kanan, menghapus bit paling kanan. Setiap geseran ke kanan sama dengan membagi bulat dengan 2.

\`\`\`text
00001101 << 1 = 00011010  (13 * 2 = 26)
00001101 >> 1 = 00000110  (13 / 2 = 6)
\`\`\`

Gunakan right shift dengan hati-hati pada bilangan negatif karena bahasa pemrograman bisa memilih antara *arithmetic shift* (menjaga tanda) atau *logical shift* (mengisi dengan nol).

## Bit Mask dan Flag

**Bit mask** adalah pola bit yang digunakan untuk menyembunyikan atau menonaktifkan bit tertentu. Teknik ini sering dipakai untuk menyimpan banyak flag dalam satu bilangan bulat.

Misalnya, dalam satu byte kita bisa menyimpan 8 status berbeda:

\`\`\`text
bit 0 = 0b00000001 = 1   -> fitur A aktif
bit 1 = 0b00000010 = 2   -> fitur B aktif
bit 2 = 0b00000100 = 4   -> fitur C aktif
bit 3 = 0b00001000 = 8   -> fitur D aktif
\`\`\`

Keuntungannya hemat memori dan operasi bitwise sangat cepat di CPU.`,
    },
    {
      id: 'sec-02-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-02-ts',
        filename: 'base-converter.ts',
        language: 'typescript',
        title: 'TypeScript: Konverter Basis Generik dengan Validasi',
        code: `type NumericBase = 2 | 8 | 10 | 16;

type BasePrefix<B extends NumericBase> = B extends 2
  ? "0b"
  : B extends 8
    ? "0o"
    : B extends 16
      ? "0x"
      : "";

function convertBase<
  B extends NumericBase,
  P extends BasePrefix<B> = BasePrefix<B>
>(
  value: number,
  targetBase: B,
  options: { padTo?: number; withPrefix?: boolean } = {}
): string {
  const { padTo = 0, withPrefix = false } = options;

  if (!Number.isInteger(value) || value < 0) {
    throw new Error("Hanya mendukung bilangan bulat positif");
  }

  if (![2, 8, 10, 16].includes(targetBase)) {
    throw new Error("Basis harus 2, 8, 10, atau 16");
  }

  const digits = value.toString(targetBase).toUpperCase();
  const padded = padTo > 0 ? digits.padStart(padTo, "0") : digits;
  const prefix: P = (withPrefix ? "0" + (
    targetBase === 2 ? "b" :
    targetBase === 8 ? "o" :
    targetBase === 16 ? "x" : ""
  ) : "") as P;

  return prefix + padded;
}

console.log(convertBase(26, 16));              // "1A"
console.log(convertBase(26, 2, { padTo: 8 })); // "00011010"
console.log(convertBase(26, 16, { withPrefix: true })); // "0x1A"`,
        explanation:
          'Tipe generik NumericBase membatasi basis yang valid dan memastkan kesalahan pemanggilan fungsi tertangkap saat compile time. Validasi runtime menambah lapisan keamanan untuk input dinamis.',
      },
    },
    {
      id: 'sec-02-advanced-representation',
      type: 'markdown',
      level: 'advanced',
      title: 'Representasi Bilangan Negatif, Floating Point, dan Overflow',
      content: `## Two's Complement

Komputer menyimpan bilangan negatif dengan teknik **two's complement**. Cara kerjanya:

1. Tulis nilai positif dalam biner.
2. Balik semua bit (one's complement).
3. Tambahkan \`1\` pada hasilnya.

\`\`\`text
+5 dalam 8 bit:  00000101
Balik bit:       11111010
Tambah 1:        11111011  -> ini adalah -5
\`\`\`

Keuntungan two's complement: penjumlahan bilangan positif dan negatif bisa menggunakan sirkuit yang sama, dan hanya ada satu representasi untuk nol.

Dengan 8 bit, rentang nilai yang bisa direpresentasikan adalah \`-128\` sampai \`127\`. Dengan 32 bit, rentangnya menjadi \`-2.147.483.648\` sampai \`2.147.483.647\`.

## Pengantar IEEE 754

Bilangan pecahan seperti \`3.14\` atau \`0.1\` tidak bisa disimpan sebagai bilangan bulat. Standar **IEEE 754** membagi bit menjadi tiga bagian:

- **Sign bit**: menentukan positif atau negatif.
- **Exponent**: pangkat dari 2.
- **Mantissa (significand)**: digit signifikan dari bilangan tersebut.

Format \`float32\` menggunakan 32 bit, sedangkan \`float64\` (default di JavaScript dan TypeScript) menggunakan 64 bit.

> Penting: tidak semua bilangan desimal bisa direpresentasikan dengan tepat di biner. Itulah sebabnya \`0.1 + 0.2\` di JavaScript menghasilkan \`0.30000000000000004\`.

## Overflow dan Underflow

**Overflow** terjadi ketika hasil operasi melebihi nilai maksimum yang bisa ditampung tipe data. **Underflow** terjadi ketika nilai terlalu kecil mendekati nol sehingga dianggap nol.

\`\`\`text
8 bit unsigned maksimum = 255
255 + 1 = 0  (overflow, kembali ke awal)
\`\`\`

Programmer sistem, *game engine*, dan pengembang *embedded* sering menghadapi masalah ini. Memilih tipe data yang cukup besar dan memeriksa batas nilai sebelum operasi adalah langkah pencegahan yang baik.`,
    },
    {
      id: 'sec-02-go-example',
      type: 'code-example',
      codeExample: {
        id: 'code-02-go',
        filename: 'main.go',
        language: 'go',
        title: 'Go: Bit Flags dengan iota dan Bitmask',
        code: `package main

import "fmt"

type Permission uint8

const (
	Read Permission = 1 << iota  // 0b00000001 = 1
	Write                        // 0b00000010 = 2
	Execute                      // 0b00000100 = 4
)

func main() {
	// Gabungkan flag dengan OR
	var p Permission = Read | Write

	fmt.Printf("Permission bits: %08b\n", p)

	// Periksa flag dengan AND
	hasRead := p&Read != 0
	hasExecute := p&Execute != 0

	fmt.Printf("Can read: %v\n", hasRead)
	fmt.Printf("Can execute: %v\n", hasExecute)

	// Matikan flag Write dengan AND NOT
	p = p &^ Write
	fmt.Printf("After removing write: %08b\n", p)
}`,
        explanation:
          'iota di Go menghasilkan bilangan yang bertambah per konstanta. Ekspresi 1 << iota menghasilkan bitmask yang saling eksklusif. Operator &^ (AND NOT) adalah cara idiomatic Go untuk membersihkan bit tertentu.',
      },
    },
    {
      id: 'sec-02-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Ringkasan:** Komputer bekerja dengan biner, programmer sering menggunakan heksadesimal untuk keringkasan, dan operasi bitwise memungkinkan manipulasi flag serta data biner secara efisien. Two\'s complement menyimpan bilangan negatif, IEEE 754 merepresentasikan bilangan pecahan, sementara overflow/underflow mengingatkan kita untuk memilih tipe data dengan bijak.',
    },
  ],
}
