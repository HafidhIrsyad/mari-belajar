# Thatch — Business Flow Spec: Mari Belajar Milestone 1

> Dokumen ini menjelaskan alur bisnis (business flow) untuk LMS **Mari Belajar** pada Milestone 1. Semua penjelasan berada di level bisnis/pengguna, bukan level teknis implementasi.

---

## 1. Actor List

| Actor | Nama | Deskripsi |
|-------|------|-----------|
| A1 | **Student / Learner** | Pengguna utama yang belajar mandiri. Belum memerlukan autentikasi pada Milestone 1. Progress disimpan secara lokal di perangkat yang sama. |

> Milestone 1 tidak mencakup admin, instruktur, atau sistem autentikasi. Semua konten bersifat publik dan read-only kecuali progress belajar milik learner.

---

## 2. User Stories / Use Cases

### UC-01: Melihat Halaman Landing
Sebagai **learner**, saya ingin melihat halaman utama yang menjelaskan apa itu Mari Belajar, agar saya tertarik untuk mulai belajar.

### UC-02: Melihat Daftar Course
Sebagai **learner**, saya ingin melihat daftar course yang tersedia, agar saya bisa memilih topik yang ingin dipelajari.

### UC-03: Melihat Daftar Chapter dalam Course
Sebagai **learner**, saya ingin melihat chapter-chapter dalam sebuah course beserta status kuncinya, agar saya tahu progress saya.

### UC-04: Membuka Chapter
Sebagai **learner**, saya ingin membuka chapter yang belum terkunci, agar saya bisa membaca materi pelajarannya.

### UC-05: Membaca Materi Chapter
Sebagai **learner**, saya ingin membaca penjelasan chapter dengan struktur basic → intermediate → advanced, agar saya memahami topik dari dasar hingga mendalam.

### UC-06: Melihat Contoh Kode
Sebagai **learner**, saya ingin melihat contoh kode dalam berbagai bahasa (JS, TS, Go) di dalam materi, agar saya memahami bagaimana konsep diimplementasikan.

### UC-07: Mengerjakan Quiz
Sebagai **learner**, saya ingin mengerjakan quiz di akhir chapter, agar saya bisa menguji pemahaman saya.

### UC-08: Membuka Chapter Berikutnya
Sebagai **learner**, saya ingin chapter berikutnya terbuka setelah saya menjawab semua soal quiz dengan benar, agar saya dipastikan menguasai materi sebelum lanjut.

### UC-09: Melihat Progress Belajar
Sebagai **learner**, saya ingin melihat indikator progress (chapter mana yang selesai, terkunci, atau sedang dibuka), agar saya termotivasi untuk melanjutkan.

---

## 3. Step-by-Step Business Flow

### Flow 1: Landing → Browse Course → Buka Chapter

```text
1. Learner membuka aplikasi Mari Belajar.
2. Sistem menampilkan halaman landing dengan value proposition dan CTA "Mulai Belajar".
3. Learner memilih untuk melihat daftar course.
4. Sistem menampilkan daftar course (Milestone 1: hanya "Computer Science / Informatics Fundamentals").
5. Learner memilih course.
6. Sistem menampilkan daftar chapter dengan status:
   - 🔓 Terbuka (bisa diklik)
   - 🔒 Terkunci (tidak bisa diklik)
   - ✅ Selesai (quiz sudah lulus 100%)
7. Learner memilih chapter pertama (atau chapter terakhir yang terbuka).
8. Sistem menampilkan halaman chapter dengan materi bacaan dan contoh kode.
```

### Flow 2: Membaca Materi Chapter

```text
1. Learner berada di halaman chapter.
2. Sistem menampilkan konten chapter dengan urutan:
   a. Basic — konsep paling mendasar
   b. Intermediate — penerapan dan representasi data
   c. Advanced — siklus CPU, layout memori, dan assembly
3. Learner membaca setiap bagian secara berurutan.
4. Sistem menampilkan contoh kode JS, TS, dan Go di bagian yang relevan.
5. Learner menggulir hingga akhir materi.
6. Sistem menampilkan tombol "Kerjakan Quiz".
```

### Flow 3: Mengerjakan Quiz → Unlock Chapter Berikutnya

```text
1. Learner menekan tombol "Kerjakan Quiz".
2. Sistem menampilkan quiz dengan 6-8 soal pilihan ganda, masing-masing 4 opsi.
3. Learner memilih jawaban untuk setiap soal.
4. Learner menekan tombol "Periksa Jawaban".
5. Sistem mengevaluasi jawaban:
   - Jika semua jawaban benar (100%):
     a. Sistem menandai chapter sebagai selesai.
     b. Sistem membuka kunci chapter berikutnya.
     c. Sistem menampilkan pesan sukses dan tombol "Lanjut ke Chapter Berikutnya".
   - Jika ada jawaban salah:
     a. Sistem menampilkan soal mana yang salah.
     b. Sistem menampilkan tombol "Ulangi Quiz".
     c. Chapter berikutnya tetap terkunci.
6. Jika learner lulus, learner bisa memilih:
   - Lanjut ke chapter berikutnya, atau
   - Kembali ke daftar chapter.
```

### Flow 4: Melihat Progress

```text
1. Learner berada di halaman daftar chapter atau halaman chapter.
2. Sistem menampilkan indikator progress, misalnya:
   - Progress bar: "2 dari 8 chapter selesai"
   - Ikon status di setiap card chapter
3. Learner melihat progress tersebut.
```

---

## 4. Business Rules

| ID | Rule |
|----|------|
| BR-01 | Semua chapter pertama dalam sebuah course terbuka secara default. |
| BR-02 | Chapter berikutnya hanya terbuka jika learner telah lulus quiz chapter sebelumnya dengan **100% benar**. |
| BR-03 | Quiz memiliki minimal **6 soal** dan maksimal **8 soal** per chapter pada Milestone 1. |
| BR-04 | Setiap soal quiz memiliki **4 opsi jawaban**, dengan **1 jawaban benar**. |
| BR-05 | Learner boleh mengulang quiz berkali-kali hingga mencapai 100%. |
| BR-06 | Progress learner disimpan secara lokal di perangkat yang sama (Milestone 1). |
| BR-07 | Konten chapter bersifat publik dan read-only; hanya status progress yang ditulis. |

---

## 5. Acceptance Criteria — Milestone 1

### AC-01: Landing & Course List
- [ ] Halaman landing menampilkan judul, deskripsi singkat, dan CTA ke daftar course.
- [ ] Daftar course menampilkan setidaknya 1 course: "Computer Science / Informatics Fundamentals".
- [ ] Learner bisa navigasi dari landing ke course list dan ke daftar chapter.

### AC-02: Chapter List & Locking
- [ ] Daftar chapter menampilkan 8 chapter sesuai kurikulum Phase 1.
- [ ] Chapter 1 ditampilkan sebagai terbuka.
- [ ] Chapter 2-8 ditampilkan sebagai terkunci sebelum quiz chapter sebelumnya lulus.
- [ ] Indikator progress menunjukkan chapter mana yang selesai, terbuka, atau terkunci.

### AC-03: Chapter Content
- [ ] Chapter "Cara Kerja Komputer — Dari Bit sampai Program Berjalan" tersedia dan bisa dibuka.
- [ ] Konten chapter terstruktur menjadi 3 bagian: Basic, Intermediate, Advanced.
- [ ] Materi berisi penjelasan detail dalam Bahasa Indonesia.
- [ ] Materi berisi minimal 3 contoh kode: 1 JavaScript, 1 TypeScript, 1 Go.
- [ ] Contoh kode berkaitan dengan bit manipulation, number conversion, atau data representation.

### AC-04: Quiz Engine
- [ ] Chapter memiliki quiz dengan 6-8 soal pilihan ganda.
- [ ] Setiap soal memiliki 4 opsi dan 1 jawaban benar.
- [ ] Learner bisa memilih jawaban dan men-submit quiz.
- [ ] Sistem menampilkan hasil: benar/salah per soal dan total skor.

### AC-05: Unlock Gate
- [ ] Jika skor quiz = 100%, chapter ditandai selesai dan chapter berikutnya terbuka.
- [ ] Jika skor quiz < 100%, chapter berikutnya tetap terkunci dan learner bisa mengulang.
- [ ] Progress yang tersimpan memicu perubahan status unlock pada daftar chapter.

### AC-06: Build & Deploy Readiness
- [ ] Proyek bisa di-install dengan `pnpm install`.
- [ ] Proyek bisa di-build dengan `pnpm run build` tanpa error.
- [ ] Build output siap di-deploy ke Cloudflare Pages.
- [ ] Tidak ada secret atau credential yang terekspos di kode.

---

## 6. Out of Scope (Milestone 1)

| No | Item | Alasan |
|----|------|--------|
| 1 | Autentikasi & user account | Fokus ke konten dan engine learning |
| 2 | Backend / database server | Konten statis modul TypeScript, progress lokal |
| 3 | Pembayaran / subscription | Model bisnis belum didefinisikan |
| 4 | Forum / diskusi | Fitur komunitas di luar scope |
| 5 | Deep-dive Go concurrency | Hanya di-outline di kurikulum; deep-dive di milestone berikutnya |
| 6 | Deep-dive EXPLAIN ANALYZE | Hanya di-outline di kurikulum; deep-dive di milestone berikutnya |

---

## 7. Notes for Implementation Team

- Vista akan menyediakan wireframe dan design system untuk semua halaman di atas.
- Jozu akan menyediakan schema tipe data untuk Course, Chapter, Lesson, Quiz, Question, dan UserProgress.
- Ace mengimplementasikan sample chapter **persis** sesuai dengan isi `thatch-sample-chapter-content.md`.
- Izou memverifikasi bahwa alur bisnis di atas berjalan sesuai acceptance criteria.
