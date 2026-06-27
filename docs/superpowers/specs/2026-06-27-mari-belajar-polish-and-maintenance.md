# Mari Belajar — Polish & Maintenance Milestone

## Goal

Memperkuat fondasi teknis platform sebelum menambah course baru (Milestone 3 dan seterusnya). Fokus pada performance, maintainability, test coverage, dan menghilangkan technical debt yang sudah teridentifikasi setelah Milestone 2.

## Motivasi

Setelah Phase 1 selesai dengan 8 chapter penuh, muncul beberapa issue:

1. **Build chunk size >500 kB** — seluruh konten course di-bundle menjadi satu file JS. Ukuran akan terus membesar seiring penambahan course.
2. **React Router v7 future flags warning** — konfigurasi saat ini memunculkan warning yang bisa menjadi breaking change saat upgrade.
3. **E2E test hanya mencakup ch-01** — chapter baru Phase 1 tidak memiliki smoke test otomatis.
4. **Content engine rentan terhadap syntax error manual** — contoh: brace penutup ekstra di ch-04 yang lolos dari `tsc` tapi gagal di `oxlint`.

## Scope

### 1. Code Splitting & Performance

**Tujuan:** Turunkan ukuran initial JS bundle dan muat konten course secara lazy.

- Implementasikan **dynamic import per course** di `src/content/index.ts` sehingga setiap course menjadi chunk terpisah.
- Page `CourseDetailPage` dan `LessonPage` diubah menjadi lazy-loaded component (`React.lazy`) dengan fallback UI.
- Konfigurasi `vite.config.ts` dengan `rollupOptions.output.manualChunks` untuk memisahkan vendor besar (`react`, `react-router-dom`, `react-syntax-highlighter`) dari app code.
- Target: initial JS bundle utama turun di bawah 300 kB gzip (saat ini ~185 kB gzip untuk bundle utama, tapi total app ~525 kB raw).

### 2. React Router Future Flags

**Tujuan:** Hilangkan warning dan amankan routing untuk v7.

- Tambahkan `future` flags pada `BrowserRouter`:
  - `v7_startTransition: true`
  - `v7_relativeSplatPath: true`
- Pastikan direct access `/courses/:courseId/:chapterId` tetap berfungsi setelah perubahan.

### 3. E2E Test Coverage Phase 1

**Tujuan:** Setiap chapter Phase 1 memiliki smoke test minimal.

- Refactor `src/test/e2e/mari-belajar-m1.e2e.test.tsx` untuk menambah test parameterized:
  - Setiap chapter dapat di-render melalui direct navigation.
  - Setiap chapter menampilkan konten lesson dan quiz.
- Pertahankan 5 test eksisting (tidak boleh rusak).
- Target: semua 8 chapter Phase 1 tercover smoke test.

### 4. Content Engine Hardening

**Tujuan:** Mengurangi risiko syntax error saat menulis konten chapter baru.

- Tambahkan script Node.js sederhana (`scripts/validate-content.ts`) yang:
  - Memastikan setiap chapter memiliki `index.ts`, `lesson.ts`, `quiz.ts`, `references.ts`.
  - Memvalidasi jumlah pertanyaan quiz = 8.
  - Memvalidasi jumlah referensi = 5.
  - Memvalidasi `passingScore === questions.length`.
  - Memvalidasi tidak ada brace/template literal yang tidak seimbang.
- Integrasikan script ke dalam `pnpm run lint` atau sebagai step tersendiri.

### 5. UX Polish (Pilihan, jika waktu cukup)

- Tambahkan `Suspense` fallback yang lebih baik saat lazy loading.
- Perbaiki heading/accessibility di chapter cards dan lesson page.
- Tambahkan `aria-label` pada tombol navigasi quiz.

## Non-Goals

- Tidak menambah course baru.
- Tidak mengubah desain visual secara signifikan.
- Tidak mengubah business logic quiz (pass threshold tetap 100%).
- Tidak melakukan deployment Cloudflare Pages.

## Acceptance Criteria

- `pnpm run lint -- --max-warnings=0` lolos.
- `pnpm run typecheck` lolos.
- `pnpm run test` lolos (semua E2E test, termasuk yang baru).
- `pnpm run build` lolos dan tidak ada warning chunk size >500 kB.
- Direct access `/courses/cs-fundamentals/ch-08-security-fundamentals` berfungsi.
- Network tab menunjukkan course content di-load sebagai chunk terpisah saat mengunjungi course detail atau lesson page.
- `pnpm run validate-content` (atau nama yang disepakati) lolos tanpa error.

## Out of Scope

- Deployment ke Cloudflare Pages.
- Penambahan course baru (JS/TS Fundamental, Go, dsb.).
- Perubahan besar pada UI/UX di luar polish minor.
