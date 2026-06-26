# Thatch — Phase 1 Curriculum Outline: Computer Science / Informatics Fundamentals

> Kurikulum Phase 1 menyusun fondasi ilmu komputer untuk platform **Mari Belajar**. Setiap chapter dirancang dengan kedalaman **basic → intermediate → advanced**, disertai contoh kode dalam **JavaScript (JS)**, **TypeScript (TS)**, dan **Go**.

---

## Ringkasan Phase 1

| Field | Value |
|-------|-------|
| Course ID | `cs-fundamentals` |
| Course Title | **Computer Science / Informatics Fundamentals** |
| Total Chapters | 8 |
| Target Learner | Pemula yang ingin memahami fondasi ilmu komputer sebelum belajar bahasa pemrograman secara mendalam |
| Prasyarat | Tidak ada |
| Bahasa contoh kode | JavaScript, TypeScript, Go |

---

## Chapter 1 — Cara Kerja Komputer

| Atribut | Value |
|---------|-------|
| Chapter ID | `ch-01-how-computers-work` |
| Title | **Cara Kerja Komputer — Dari Bit sampai Program Berjalan** |
| Status | **Sample chapter untuk Milestone 1** |

### Sub-topics

#### Basic
- Definisi komputer: input, proses, output, storage
- Apa itu bit dan byte
- Sistem bilangan biner (0 dan 1)
- Hubungan antara listrik, sinyal, dan bit

#### Intermediate
- Representasi data: integer, floating point, karakter, string
- Endianness (big-endian vs little-endian)
- ASCII dan Unicode
- Perbedaan compiler, interpreter, dan transpiler

#### Advanced
- Siklus fetch-decode-execute pada CPU
- Layout memori: code segment, stack, heap
- Konsep pointer dan alamat memori
- Pengantar assembly (apa itu dan peranannya)

### JS/TS/Go Examples
- **JS**: Konversi desimal ke biner dengan `.toString(2)` dan operasi bitwise AND/OR
- **TS**: Fungsi type-safe untuk konversi antar basis bilangan
- **Go**: Format bilangan biner, oktal, heksadesimal dengan `fmt.Printf` dan bitwise shift

---

## Chapter 2 — Sistem Bilangan dan Operasi Bit

| Atribut | Value |
|---------|-------|
| Chapter ID | `ch-02-number-systems-and-bits` |
| Title | **Sistem Bilangan dan Operasi Bit** |

### Sub-topics

#### Basic
- Desimal, biner, oktal, dan heksadesimal
- Konversi antar sistem bilangan
- Mengapa programmer perlu memahami heksadesimal

#### Intermediate
- Operasi bitwise: AND, OR, XOR, NOT
- Bit shift: left shift dan right shift
- Bit mask dan flag

#### Advanced
- Two's complement untuk bilangan negatif
- Representasi fixed-point dan floating-point (IEEE 754 — pengantar)
- Overflow dan underflow

### JS/TS/Go Examples
- **JS**: `parseInt("FF", 16)`, `.toString(16)`, manipulasi bit mask
- **TS**: Generic type untuk konversi basis dengan validasi input
- **Go**: Bit flags menggunakan `iota` dan konstanta bitmask

---

## Chapter 3 — Algoritma dan Kompleksitas

| Atribut | Value |
|---------|-------|
| Chapter ID | `ch-03-algorithms-and-complexity` |
| Title | **Algoritma dan Kompleksitas** |

### Sub-topics

#### Basic
- Definisi algoritma
- Pseudocode dan flowchart
- Input, proses, output dalam algoritma

#### Intermediate
- Algoritma pencarian: linear search dan binary search
- Algoritma pengurutan: bubble sort, insertion sort, selection sort
- Konsep best case, average case, worst case

#### Advanced
- Notasi Big-O
- Rekursi dan base case
- Memoization sebagai teknik optimasi

### JS/TS/Go Examples
- **JS**: Implementasi linear search dan bubble sort
- **TS**: Generic binary search dengan tipe `T`
- **Go**: Rekursi fibonacci + memoization dengan `map`

---

## Chapter 4 — Struktur Data Fundamental

| Atribut | Value |
|---------|-------|
| Chapter ID | `ch-04-fundamental-data-structures` |
| Title | **Struktur Data Fundamental** |

### Sub-topics

#### Basic
- Array dan linked list
- Stack (LIFO) dan queue (FIFO)
- Operasi dasar: push, pop, enqueue, dequeue

#### Intermediate
- Hash table: konsep hash dan collision
- Set dan Map
- Kapan menggunakan struktur data tertentu

#### Advanced
- Tree: binary tree dan binary search tree (pengantar)
- Graph: node, edge, directed/undirected (pengantar)
- Traversal DFS dan BFS (konsep)

### JS/TS/Go Examples
- **JS**: Implementasi stack dan queue dengan array
- **TS**: Generic stack class
- **Go**: Penggunaan `map` sebagai hash table dan `struct` untuk node linked list

---

## Chapter 5 — Sistem Operasi dan Manajemen Proses

| Atribut | Value |
|---------|-------|
| Chapter ID | `ch-05-os-and-process-management` |
| Title | **Sistem Operasi dan Manajemen Proses** |

### Sub-topics

#### Basic
- Peran sistem operasi: abstraction, resource management, isolation
- Program vs process
- Process ID (PID) dan state dasar

#### Intermediate
- Process lifecycle: new, ready, running, waiting, terminated
- Thread vs process
- Scheduling sederhana: FIFO, Round Robin (konsep)

#### Advanced
- Concurrency vs parallelism (outline)
- Inter-process communication (IPC) — pengantar
- Memory management: virtual memory, paging (outline)
- **Go concurrency** (goroutine, channel) hanya diperkenalkan secara ringkas; deep-dive ditunda ke milestone berikutnya

### JS/TS/Go Examples
- **JS**: Event loop sebagai model concurrency single-threaded
- **TS**: Simulasi task queue dengan Promise
- **Go**: Pengenalan `go` keyword dan `sync.WaitGroup` (ringkas, outline untuk deep-dive)

---

## Chapter 6 — Jaringan Komputer dan Protokol Internet

| Atribut | Value |
|---------|-------|
| Chapter ID | `ch-06-networking-and-internet-protocols` |
| Title | **Jaringan Komputer dan Protokol Internet** |

### Sub-topics

#### Basic
- Client-server model
- IP address dan DNS
- HTTP: request, response, method, status code

#### Intermediate
- TCP vs UDP
- Port dan socket (konsep)
- Packet dan routing (pengantar)

#### Advanced
- TLS/HTTPS dan enkripsi transport
- Caching dan CDN (konsep)
- REST API design principles (pengantar)

### JS/TS/Go Examples
- **JS**: `fetch()` untuk HTTP GET/POST
- **TS**: Typed fetch response dengan interface
- **Go**: HTTP server sederhana dengan `net/http`

---

## Chapter 7 — Basis Data dan SQL Dasar

| Atribut | Value |
|---------|-------|
| Chapter ID | `ch-07-databases-and-sql-basics` |
| Title | **Basis Data dan SQL Dasar** |

### Sub-topics

#### Basic
- DBMS dan peran basis data
- Tabel, baris, kolom, primary key, foreign key
- Tipe data umum: integer, text, boolean, datetime

#### Intermediate
- SQL CRUD: SELECT, INSERT, UPDATE, DELETE
- JOIN: INNER JOIN, LEFT JOIN
- Konsep index dan bagaimana index mempercepat query

#### Advanced
- Query optimization overview
- **EXPLAIN ANALYZE** diperkenalkan sebagai alat analisis query; deep-dive ditunda ke milestone berikutnya
- Transaksi dan ACID (pengantar)

### JS/TS/Go Examples
- **JS**: Query SQL string (tanpa DB connection) untuk memahami sintaks
- **TS**: Type definitions untuk tabel dan query result
- **Go**: Query sederhana dengan package `database/sql` dan `sql.NullString`

---

## Chapter 8 — Keamanan Informasi dan Praktik Terbaik

| Atribut | Value |
|---------|-------|
| Chapter ID | `ch-08-security-fundamentals` |
| Title | **Keamanan Informasi dan Praktik Terbaik** |

### Sub-topics

#### Basic
- CIA Triad: Confidentiality, Integrity, Availability
- Autentikasi dan otorisasi (pengantar)
- Social engineering awareness

#### Intermediate
- Hashing vs encryption
- HTTPS dan sertifikat TLS
- Input validation dan sanitization

#### Advanced
- OWASP Top 10 overview
- Secure coding practices
- Secret management (pengantar)

### JS/TS/Go Examples
- **JS**: `crypto.subtle.digest()` untuk hashing SHA-256
- **TS**: Type-safe flow password hashing (konsep)
- **Go**: Konsep hashing password dengan bcrypt (tanpa implementasi penuh)

---

## Pedoman Penulisan Konten per Chapter

Agar konsisten, setiap chapter hendaknya mengikuti struktur berikut:

1. **Tujuan Pembelajaran** — 3-4 bullet yang ingin dicapai learner.
2. **Basic** — Penjelasan intuitif tanpa asumsi teknis berat.
3. **Intermediate** — Penerapan konsep dengan contoh nyata dan representasi data.
4. **Advanced** — Hubungan konsep dengan arsitektur komputer, memori, atau optimasi.
5. **Contoh Kode** — Minimal 3 contoh: 1 JS, 1 TS, 1 Go, relevan dengan topik.
6. **Quiz** — 6-8 soal pilihan ganda (4 opsi, 1 jawaban benar), menguji pemahaman basic sampai advanced.
7. **Ringkasan** — Poin-poin kunci yang perlu diingat.

---

## Catatan untuk Milestone Berikutnya

- Topik **deep-dive Go concurrency** (goroutine, channel, select, pattern concurrency) akan dibahas penuh setelah learner menguasai fondasi di Phase 1.
- Topik **deep-dive EXPLAIN ANALYZE** dan optimasi query database akan dibahas penuh pada milestone yang mencakup database performance engineering.
- Phase 2 direncanakan akan membahas **JavaScript/TypeScript Fundamental**, sedangkan **Go Fundamental** dan topik lanjutan akan mengikuti setelahnya.
