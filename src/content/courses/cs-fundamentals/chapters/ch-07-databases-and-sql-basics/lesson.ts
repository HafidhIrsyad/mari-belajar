import type { Lesson } from '@/content/types'

export const ch07Lesson: Lesson = {
  id: 'lesson-ch-07-databases-and-sql-basics',
  estimatedMinutes: 16,
  sections: [
    {
      id: 'sec-07-basic-intro',
      type: 'markdown',
      level: 'basic',
      title: 'DBMS, Tabel, dan Tipe Data Dasar',
      content: `## DBMS dan Peran Basis Data

**Database Management System (DBMS)** adalah perangkat lunak yang mengelola data secara terstruktur. DBMS bertanggung jawab menyimpan, mengambil, memperbarui, dan menghapus data dengan cara yang aman dan efisien. Contoh DBMS populer: PostgreSQL, MySQL, SQLite, dan MongoDB (NoSQL).

**Basis data relasional** menyimpan data dalam bentuk tabel yang saling terhubung. Setiap tabel merepresentasikan satu entitas, misalnya \`pengguna\`, \`pesanan\`, atau \`produk\`.

## Tabel, Baris, dan Kolom

Bayangkan tabel seperti spreadsheet:

- **Kolom (column / field)**: atribut yang dimiliki setiap entitas, misalnya \`nama\`, \`email\`, \`tanggal_lahir\`.
- **Baris (row / record)**: satu kesatuan data, misalnya data lengkap satu pengguna.
- **Sel**: perpotongan baris dan kolom.

\`\`\`text
| id | nama      | email              | aktif |
|----|-----------|--------------------|-------|
| 1  | Andi      | andi@email.com     | true  |
| 2  | Budi      | budi@email.com     | false |
\`\`\`

## Primary Key dan Foreign Key

- **Primary key (PK)** adalah kolom atau kombinasi kolom yang mengidentifikasi setiap baris secara unik. Biasanya berupa ID auto-increment seperti \`id\`.
- **Foreign key (FK)** adalah kolom yang merujuk ke primary key di tabel lain untuk membangun relasi antar tabel.

Misalnya, tabel \`pesanan\` memiliki kolom \`pengguna_id\` yang merujuk ke \`id\` di tabel \`pengguna\`.

## Tipe Data Umum

Beberapa tipe data yang sering ditemui:

- **INTEGER**: bilangan bulat, cocok untuk ID dan jumlah.
- **TEXT / VARCHAR**: teks, cocok untuk nama, alamat, atau email.
- **BOOLEAN**: nilai \`true\` atau \`false\`.
- **DATETIME / TIMESTAMP**: tanggal dan waktu, misalnya \`2024-06-27 14:30:00\`.
- **DECIMAL / NUMERIC**: angka dengan presisi tetap, cocok untuk uang.

Memilih tipe data yang tepat menghemat penyimpanan dan mempercepat query.`,
    },
    {
      id: 'sec-07-go-basic',
      type: 'code-example',
      codeExample: {
        id: 'code-07-go-basic',
        filename: 'sql-queries.go',
        language: 'go',
        title: 'Go: String Query SQL',
        code: `package main

import "fmt"

func main() {
	// Contoh string query SQL untuk memahami sintaks
	// (tanpa koneksi database sungguhan)

	createUsersTable := \`
CREATE TABLE pengguna (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nama TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  aktif BOOLEAN DEFAULT 1
);
\`

	insertUser := \`
INSERT INTO pengguna (nama, email, aktif)
VALUES ('Andi', 'andi@email.com', 1);
\`

	selectActiveUsers := \`
SELECT id, nama, email
FROM pengguna
WHERE aktif = 1
ORDER BY nama ASC;
\`

	updateEmail := \`
UPDATE pengguna
SET email = 'baru@email.com'
WHERE id = 1;
\`

	deleteUser := \`
DELETE FROM pengguna
WHERE id = 1;
\`

	fmt.Println(createUsersTable)
	fmt.Println(selectActiveUsers)
}`,
        explanation:
          'Raw string literal Go (backtick) digunakan untuk menulis query SQL agar mudah dibaca. Di aplikasi nyata, gunakan parameterized query untuk mencegah SQL injection.',
      },
    },
    {
      id: 'sec-07-intermediate-crud',
      type: 'markdown',
      level: 'intermediate',
      title: 'SQL CRUD, JOIN, dan Index',
      content: `## SQL CRUD

Empat operasi dasar dalam basis data sering disebut **CRUD**:

- **CREATE** → \`INSERT\`: menambahkan data baru.
- **READ** → \`SELECT\`: membaca data.
- **UPDATE** → \`UPDATE\`: memperbarui data yang sudah ada.
- **DELETE** → \`DELETE\`: menghapus data.

Perintah \`SELECT\` paling sering digunakan dan bisa dikombinasikan dengan:

- \`WHERE\`: menyaring baris berdasarkan kondisi.
- \`ORDER BY\`: mengurutkan hasil.
- \`LIMIT\`: membatasi jumlah baris yang dikembalikan.

\`\`\`text
SELECT nama, email FROM pengguna WHERE aktif = 1 ORDER BY nama LIMIT 10;
\`\`\`

## JOIN: INNER JOIN dan LEFT JOIN

Saat data tersebar di beberapa tabel, kita menggabungkannya dengan \`JOIN\`.

### INNER JOIN

Mengembalikan hanya baris yang memiliki kecocokan di kedua tabel.

\`\`\`text
SELECT p.nama, ps.total
FROM pengguna p
INNER JOIN pesanan ps ON p.id = ps.pengguna_id;
\`\`\`

### LEFT JOIN

Mengembalikan semua baris dari tabel kiri, bahkan jika tidak ada kecocokan di tabel kanan.

\`\`\`text
SELECT p.nama, COALESCE(SUM(ps.total), 0) AS total_belanja
FROM pengguna p
LEFT JOIN pesanan ps ON p.id = ps.pengguna_id
GROUP BY p.id, p.nama;
\`\`\`

## Index dan Performa Query

**Index** adalah struktur tambahan yang mempercepat pencarian data, mirip dengan indeks di belakang buku.

- Tanpa index, database harus memeriksa setiap baris (*full table scan*).
- Dengan index, database bisa langsung menuju baris yang relevan.

Contoh membuat index:

\`\`\`text
CREATE INDEX idx_pengguna_email ON pengguna(email);
\`\`\`

Kelemahan index: menulis data menjadi sedikit lebih lambat karena index juga harus diperbarui. Oleh karena itu, jangan membuat index di setiap kolom.`,
    },
    {
      id: 'sec-07-go-intermediate',
      type: 'code-example',
      codeExample: {
        id: 'code-07-go-intermediate',
        filename: 'table-types.go',
        language: 'go',
        title: 'Go: Definisi Struct untuk Tabel dan Query Result',
        code: `package main

import (
	"fmt"
	"strings"
	"time"
)

// Definisi struct untuk tabel pengguna dan pesanan

type Pengguna struct {
	ID        int
	Nama      string
	Email     string
	Aktif     bool
	CreatedAt time.Time
}

type Pesanan struct {
	ID         int
	PenggunaID int
	Total      float64
	Status     string // "pending", "dibayar", "dikirim"
	CreatedAt  time.Time
}

// Struct untuk hasil query JOIN
type PenggunaDenganTotalBelanja struct {
	Nama         string
	TotalBelanja *float64 // pointer untuk menangani NULL
}

// Fungsi type-safe untuk membangun query SELECT sederhana
func buildSelectQuery(table string, columns []string) string {
	return fmt.Sprintf("SELECT %s FROM %s", strings.Join(columns, ", "), table)
}

func main() {
	queryPengguna := buildSelectQuery("pengguna", []string{"id", "nama", "email"})
	fmt.Println(queryPengguna)
	// Output: SELECT id, nama, email FROM pengguna
}`,
        explanation:
          'Struct Go membantu menjaga konsistensi antara skema database dan kode aplikasi. Fungsi buildSelectQuery memastikan hanya kolom yang didefinisikan yang bisa dipilih.',
      },
    },
    {
      id: 'sec-07-advanced-optimization',
      type: 'markdown',
      level: 'advanced',
      title: 'Query Optimization, EXPLAIN ANALYZE, dan ACID',
      content: `## Query Optimization Overview

Query yang lambat bisa memperlambat seluruh aplikasi. Beberapa praktik dasar optimasi:

1. Pilih hanya kolom yang benar-benar dibutuhkan, hindari \`SELECT *\`.
2. Gunakan \`WHERE\` yang bisa memanfaatkan index.
3. Hindari fungsi pada kolom di kondisi \`WHERE\`, karena bisa membatalkan penggunaan index.
4. Batasi hasil dengan \`LIMIT\` jika hanya butuh sebagian data.

## Pengantar EXPLAIN ANALYZE

\`EXPLAIN ANALYZE\` adalah alat bantu database untuk melihat rencana eksekusi query. Dengan perintah ini kita bisa melihat apakah database menggunakan index atau melakukan full table scan.

> Deep-dive tentang EXPLAIN ANALYZE dan optimasi query akan dibahas pada milestone berikutnya.

## Transaksi dan ACID

**Transaksi** adalah satu kesatuan pekerjaan yang harus berhasil seluruhnya atau gagal seluruhnya.

Contoh transaksi sederhana:

\`\`\`text
BEGIN;
UPDATE rekening SET saldo = saldo - 100 WHERE id = 1;
UPDATE rekening SET saldo = saldo + 100 WHERE id = 2;
COMMIT;
\`\`\`

Jika salah satu perintah gagal, kita bisa menjalankan \`ROLLBACK\` agar tidak ada perubahan yang tersimpan.

Empat sifat transaksi yang andal disebut **ACID**:

- **Atomicity**: seluruh operasi dalam transaksi berhasil atau tidak sama sekali.
- **Consistency**: data tetap valid sesuai aturan setelah transaksi.
- **Isolation**: transaksi yang berjalan bersamaan tidak saling mengganggu.
- **Durability**: hasil transaksi yang berhasil tersimpan meski sistem crash.`,
    },
    {
      id: 'sec-07-go-advanced',
      type: 'code-example',
      codeExample: {
        id: 'code-07-go-advanced',
        filename: 'database-sql.go',
        language: 'go',
        title: 'Go: Query Sederhana dengan database/sql',
        code: `package main

import (
	"database/sql"
	"fmt"

	_ "github.com/mattn/go-sqlite3"
)

type Pengguna struct {
	ID    int64
	Nama  string
	Email sql.NullString
	Aktif bool
}

func main() {
	db, err := sql.Open("sqlite3", ":memory:")
	if err != nil {
		panic(err)
	}
	defer db.Close()

	_, err = db.Exec(\`
		CREATE TABLE pengguna (
			id INTEGER PRIMARY KEY,
			nama TEXT,
			email TEXT,
			aktif INTEGER
		);
	\`)
	if err != nil {
		panic(err)
	}

	_, err = db.Exec(\`
		INSERT INTO pengguna (id, nama, email, aktif)
		VALUES (?, ?, ?, ?);
	\`, 1, "Andi", "andi@email.com", 1)
	if err != nil {
		panic(err)
	}

	row := db.QueryRow(\`
		SELECT id, nama, email, aktif
		FROM pengguna
		WHERE id = ?;
	\`, 1)

	var p Pengguna
	err = row.Scan(&p.ID, &p.Nama, &p.Email, &p.Aktif)
	if err != nil {
		panic(err)
	}

	fmt.Printf("Pengguna: %+v\\n", p)
	fmt.Printf("Email valid: %v\\n", p.Email.Valid)
}`,
        explanation:
          'Package database/sql di Go menyediakan antarmuka umum untuk berbagai database driver. sql.NullString digunakan untuk menangani kolom yang bisa bernilai NULL secara aman.',
      },
    },
    {
      id: 'sec-07-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Ringkasan:** DBMS mengelola data dalam tabel yang terdiri dari baris dan kolom. Primary key mengidentifikasi unik setiap baris, sedangkan foreign key membangun relasi antar tabel. SQL CRUD (SELECT, INSERT, UPDATE, DELETE) adalah fondasi manipulasi data. JOIN menggabungkan data dari beberapa tabel, dan index mempercepat pencarian dengan biaya sedikit lebih lambat saat menulis. Query optimization, EXPLAIN ANALYZE, serta transaksi ACID menjadi dasar untuk bekerja dengan basis data secara profesional.',
    },
  ],
}
