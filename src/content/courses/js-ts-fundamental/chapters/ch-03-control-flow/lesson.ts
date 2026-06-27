import type { Lesson } from '@/content/types'

export const ch03Lesson: Lesson = {
  id: 'lesson-ch-03-control-flow',
  estimatedMinutes: 15,
  sections: [
    {
      id: 'sec-03-basic-control-flow',
      type: 'markdown',
      level: 'basic',
      title: 'Percabangan dan Perulangan Dasar',
      content: `## Percabangan dengan if/else if/else

Program seringkali harus mengambil keputusan berdasarkan kondisi tertentu. Struktur **if/else if/else** memungkinkan kita menjalankan blok kode yang berbeda tergantung pada hasil evaluasi kondisi.

\`\`\`javascript
const score = 75;

if (score >= 80) {
  console.log("Nilai A");
} else if (score >= 60) {
  console.log("Nilai B");
} else {
  console.log("Nilai C");
}
\`\`\`

Setiap kondisi dievaluasi secara berurutan dari atas ke bawah. Begitu satu kondisi terpenuhi, blok kode yang bersangkutan dijalankan dan blok lainnya dilewati.

## Percabangan dengan switch

**switch** digunakan saat kita ingin membandingkan satu nilai dengan banyak kemungkinan. switch sering lebih mudah dibaca dibandingkan rantai if/else yang panjang.

\`\`\`javascript
const day = "Senin";

switch (day) {
  case "Senin":
    console.log("Awal minggu");
    break;
  case "Jumat":
    console.log("Jumat berkah");
    break;
  case "Sabtu":
  case "Minggu":
    console.log("Akhir pekan");
    break;
  default:
    console.log("Hari biasa");
}
\`\`\`

Keyword \`break\` penting di setiap \`case\` agar eksekusi tidak "terusan" ke case berikutnya (*fall-through*). Jika dua case memiliki perlakuan sama, seperti Sabtu dan Minggu, kita bisa menuliskannya berturut-turut.

## Perulangan: for, while, dan do...while

**for** biasanya dipakai saat jumlah iterasi sudah diketahui:

\`\`\`javascript
for (let i = 0; i < 5; i++) {
  console.log(i); // 0, 1, 2, 3, 4
}
\`\`\`

**while** memeriksa kondisi terlebih dahulu sebelum menjalankan bloknya. Cocok untuk iterasi yang bergantung pada kondisi dinamis:

\`\`\`javascript
let count = 0;
while (count < 3) {
  console.log(count);
  count++;
}
\`\`\`

**do...while** mirip while, tetapi blok kode dijalankan setidaknya sekali karena pemeriksaan kondisi dilakukan di akhir:

\`\`\`javascript
let n = 0;
do {
  console.log(n);
  n++;
} while (n < 0); // tetap mencetak 0 sekali
\`\`\``,
    },
    {
      id: 'sec-03-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-03-js',
        filename: 'control-flow.js',
        language: 'javascript',
        title: 'JavaScript: Percabangan dan Loop',
        code: `// Fungsi menentukan kategori usia
function categorizeAge(age) {
  if (age < 13) return "Anak-anak";
  if (age < 20) return "Remaja";
  if (age < 60) return "Dewasa";
  return "Lansia";
}

console.log(categorizeAge(25)); // "Dewasa"

// Menghitung faktorial dengan for
function factorial(n) {
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

console.log(factorial(5)); // 120

// Mencetak bilangan genap dengan while
let num = 1;
while (num <= 10) {
  if (num % 2 === 0) {
    console.log(num);
  }
  num++;
}

// switch untuk menu sederhana
const choice = "tambah";
switch (choice) {
  case "tambah":
    console.log("Operasi penjumlahan");
    break;
  case "kurang":
    console.log("Operasi pengurangan");
    break;
  default:
    console.log("Pilihan tidak dikenal");
}`,
        explanation:
          'Percabangan if/else if/else dan switch mengatur alur program berdasarkan kondisi. Loop for, while, dan do...while memungkinkan kode dijalankan berulang kali dengan pola yang berbeda-beda.',
      },
    },
    {
      id: 'sec-03-intermediate-iteration',
      type: 'markdown',
      level: 'intermediate',
      title: 'Iterasi Array, Break, Continue, dan Truthy/Falsy',
      content: `## Iterasi Array dengan for...of dan forEach

Saat bekerja dengan array, JavaScript menyediakan cara iterasi yang lebih ringkas dibandingkan for biasa.

**for...of** langsung memberikan nilai setiap elemen:

\`\`\`javascript
const fruits = ["apel", "jeruk", "mangga"];
for (const fruit of fruits) {
  console.log(fruit);
}
\`\`\`

**forEach** memanggil fungsi callback untuk setiap elemen array:

\`\`\`javascript
const numbers = [1, 2, 3, 4];
numbers.forEach((num, index) => {
  console.log(\`Index \${index}: \${num}\`);
});
\`\`\`

Perlu diingat, \`forEach\` tidak bisa dihentikan dengan \`break\`. Jika memerlukan penghentian lebih awal, gunakan for atau for...of.

## Break dan Continue

**break** menghentikan seluruh loop secara paksa:

\`\`\`javascript
for (let i = 0; i < 10; i++) {
  if (i === 5) break;
  console.log(i); // 0, 1, 2, 3, 4
}
\`\`\`

**continue** melewati iterasi saat ini dan lanjut ke iterasi berikutnya:

\`\`\`javascript
for (let i = 0; i < 5; i++) {
  if (i === 2) continue;
  console.log(i); // 0, 1, 3, 4
}
\`\`\`

## Truthy dan Falsy

Dalam kondisi JavaScript, nilai selain boolean tetap dievaluasi menjadi \`true\` (truthy) atau \`false\` (falsy). Nilai falsy meliputi:

- \`false\`
- \`0\`
- \`""\` (string kosong)
- \`null\`
- \`undefined\`
- \`NaN\`

Semua nilai lain dianggap truthy, termasuk string non-kosong, angka selain nol, array kosong \`[]\`, dan objek kosong \`{}\`.

\`\`\`javascript
const name = "";
if (!name) {
  console.log("Nama masih kosong");
}

const items = [];
if (items) {
  console.log("Array kosong tetap truthy");
}
\`\`\``,
    },
    {
      id: 'sec-03-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-03-ts',
        filename: 'typed-control-flow.ts',
        language: 'typescript',
        title: 'TypeScript: Control Flow dengan Type Narrowing',
        code: `type UserStatus = "active" | "inactive" | "banned";

interface User {
  id: number;
  name: string;
  status: UserStatus;
  bannedReason?: string;
}

function describeUser(user: User): string {
  // Guard clause untuk nilai yang tidak valid
  if (!user.name || user.name.trim() === "") {
    return "Pengguna tidak memiliki nama";
  }

  switch (user.status) {
    case "active":
      return \`\${user.name} sedang aktif\`;
    case "inactive":
      return \`\${user.name} sedang tidak aktif\`;
    case "banned":
      return \`\${user.name} diblokir karena \${user.bannedReason ?? "alasan tidak diketahui"}\`;
    default:
      // Type narrowing memastikan semua kasus ter-cover
      return ((_: never) => _)(user.status);
  }
}

const users: User[] = [
  { id: 1, name: "Andi", status: "active" },
  { id: 2, name: "Budi", status: "banned", bannedReason: "spam" },
  { id: 3, name: "", status: "inactive" },
];

for (const user of users) {
  console.log(describeUser(user));
}`,
        explanation:
          'Type narrowing memungkinkan TypeScript menyempitkan tipe berdasarkan kondisi. Guard clause menangani kasus khusus di awal fungsi, sementara switch dengan exhaustive check memastikan semua nilai union tertangani.',
      },
    },
    {
      id: 'sec-03-advanced-patterns',
      type: 'markdown',
      level: 'advanced',
      title: 'Early Return dan Guard Clause',
      content: `## Mengapa Hindari Nesting yang Dalam?

Kode dengan banyak \`if\` bersarang (*deep nesting*) sulit dibaca dan dipelihara. Setiap tingkat nesting menambah beban kognitif saat membaca logika.

\`\`\`javascript
// Kode dengan nesting dalam
function processOrder(order) {
  if (order) {
    if (order.items.length > 0) {
      if (order.isPaid) {
        return "Pesanan diproses";
      } else {
        return "Menunggu pembayaran";
      }
    } else {
      return "Keranjang kosong";
    }
  } else {
    return "Pesanan tidak valid";
  }
}
\`\`\`

## Early Return Pattern

**Early return** mengatasi masalah nesting dengan menangani kasus-kasus khusus terlebih dahulu, lalu baru menjalankan logika utama di akhir fungsi.

\`\`\`javascript
function processOrder(order) {
  if (!order) return "Pesanan tidak valid";
  if (order.items.length === 0) return "Keranjang kosong";
  if (!order.isPaid) return "Menunggu pembayaran";

  return "Pesanan diproses";
}
\`\`\`

Dengan early return, setiap kondisi berdiri sendiri dan logika utama menjadi jelas.

## Guard Clause

**Guard clause** adalah pola khusus dari early return yang menolak input atau kondisi tidak valid di awal fungsi sebelum masuk ke logika bisnis.

\`\`\`javascript
function calculateDiscount(price, coupon) {
  if (typeof price !== "number" || price <= 0) {
    throw new Error("Harga harus berupa angka positif");
  }
  if (!coupon || coupon.expired) {
    return price;
  }

  return price * (1 - coupon.discount);
}
\`\`\`

Guard clause sering dipakai untuk validasi parameter, pengecekan izin, atau penanganan nilai kosong. Pola ini membuat asumsi fungsi lebih eksplisit dan mengurangi kemungkinan bug akibat kondisi tak terduga.`,
    },
    {
      id: 'sec-03-go-example',
      type: 'code-example',
      codeExample: {
        id: 'code-03-go',
        filename: 'main.go',
        language: 'go',
        title: 'Go: if, switch, dan for',
        code: `package main

import "fmt"

func main() {
	score := 75

	// if dengan statement singkat
	if grade := calculateGrade(score); grade == "B" {
		fmt.Println("Bagus!")
	}

	// switch tanpa expression seperti if/else
	day := "Sabtu"
	switch day {
	case "Senin", "Selasa", "Rabu", "Kamis", "Jumat":
		fmt.Println("Hari kerja")
	case "Sabtu", "Minggu":
		fmt.Println("Akhir pekan")
	default:
		fmt.Println("Hari tidak dikenal")
	}

	// for sebagai while
	count := 0
	for count < 3 {
		fmt.Println(count)
		count++
	}

	// for klasik
	for i := 0; i < 5; i++ {
		fmt.Print(i, " ")
	}
	fmt.Println()

	// break dan continue
	for i := 0; i < 10; i++ {
		if i == 2 {
			continue
		}
		if i == 5 {
			break
		}
		fmt.Print(i, " ")
	}
	// Output: 0 1 3 4
}

func calculateGrade(score int) string {
	if score >= 80 {
		return "A"
	} else if score >= 60 {
		return "B"
	}
	return "C"
}`,
        explanation:
          'Go tidak memiliki while atau do...while; semua perulangan menggunakan for. if di Go bisa disertai statement singkat sebelum kondisi. switch di Go secara default tidak fall-through, sehingga break jarang diperlukan.',
      },
    },
    {
      id: 'sec-03-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Ringkasan:** Control flow mengatur jalannya program melalui percabangan (if/else, switch) dan perulangan (for, while, do...while). Iterasi array lebih mudah dengan for...of dan forEach, sedangkan break dan continue mengontrol alur loop. Truthy/falsy memengaruhi evaluasi kondisi, dan pola early return serta guard clause membantu menulis kode yang lebih datar, bersih, dan mudah dipelihara.',
    },
  ],
}
