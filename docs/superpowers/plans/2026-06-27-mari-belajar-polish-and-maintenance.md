# Mari Belajar — Polish & Maintenance: Implementation Plan

## Overview

Tujuan: memperkuat fondasi teknis sebelum menambah course baru. Pekerjaan mencakup code splitting, perbaikan React Router, penambahan E2E coverage, dan content validation.

## Implementation Steps

### Step 1: Code Splitting & Lazy Loading

**Files:**
- `vite.config.ts`
- `src/App.tsx`
- `src/content/index.ts`
- `src/pages/CourseDetailPage.tsx`
- `src/pages/LessonPage.tsx`
- `src/components/layout/app-shell.tsx` (jika perlu fallback wrapper)

**Actions:**
1. Update `vite.config.ts` dengan `build.rollupOptions.output.manualChunks`:
   - `vendor-react`: react, react-dom
   - `vendor-router`: react-router-dom
   - `vendor-syntax`: react-syntax-highlighter
   - `vendor-ui`: @radix-ui/*, lucide-react, class-variance-authority, clsx, tailwind-merge
2. Convert `src/App.tsx` routes to use `React.lazy` for `CourseDetailPage` and `LessonPage`.
3. Wrap lazy routes with `Suspense` and a shared fallback component.
4. Convert `src/content/index.ts` course registry from static import to dynamic import pattern:
   - Export `loadCourseBySlug(slug: string): Promise<Course | undefined>`.
   - Keep helper functions async-aware.
5. Update `CourseDetailPage` and `LessonPage` to handle async course loading with loading state.

### Step 2: React Router v7 Future Flags

**Files:**
- `src/App.tsx`
- `src/test/e2e/mari-belajar-m1.e2e.test.tsx`

**Actions:**
1. Add `future` prop to `BrowserRouter` in `src/App.tsx`.
2. Verify no routing regression in E2E tests.

### Step 3: E2E Smoke Tests for All Phase 1 Chapters

**Files:**
- `src/test/e2e/mari-belajar-m1.e2e.test.tsx`

**Actions:**
1. Import chapter list from content registry (atau hardcode daftar slug chapter Phase 1).
2. Add parameterized test that renders each chapter via direct route and asserts:
   - Chapter title muncul.
   - Lesson content muncul.
   - Quiz panel muncul.
3. Ensure existing 5 tests remain unchanged.

### Step 4: Content Validation Script

**Files:**
- `scripts/validate-content.ts` (new)
- `package.json` scripts

**Actions:**
1. Create `scripts/validate-content.ts` using Node.js ESM or tsx.
2. Walk `src/content/courses/*/` and validate each chapter directory:
   - Required files exist.
   - Quiz has exactly 8 questions.
   - `passingScore === questions.length`.
   - References has exactly 5 items.
   - Brace/backtick balance in `lesson.ts`, `quiz.ts`, `references.ts`.
3. Add `validate-content` script to `package.json`.
4. Integrate into lint pipeline or CI (untuk sekarang cukup script tersendiri).

### Step 5: UX Polish

**Files:**
- `src/components/common/loading-fallback.tsx` (new)
- `src/App.tsx`
- `src/pages/CourseDetailPage.tsx`
- `src/pages/LessonPage.tsx`

**Actions:**
1. Create a polished `LoadingFallback` component (spinner + skeleton text).
2. Use it as `Suspense` fallback.
3. Add minor a11y improvements:
   - `aria-label` on quiz navigation buttons.
   - `aria-current` on active chapter in sidebar (jika belum ada).

### Step 6: Verification

**Commands:**
- `pnpm run validate-content`
- `pnpm run lint -- --max-warnings=0`
- `pnpm run typecheck`
- `pnpm run test`
- `pnpm run build`

**Checks:**
- No chunk size warning.
- No React Router warnings in console.
- All E2E tests pass.
- Direct access to deep routes works.

## Dependencies

- Step 1 dan 2 bisa dikerjakan bersamaan karena keduanya menyentuh `src/App.tsx`.
- Step 3 bergantung pada struktur content registry hasil Step 1.
- Step 4 independen, bisa dikerjakan paralel.
- Step 5 bergantung pada Step 1 (fallback component).

## Risks & Mitigations

| Risk | Mitigation |
|---|---|
| Lazy loading membuat E2E test lebih kompleks | Gunakan `findBy` / `waitFor` yang sudah ada |
| Dynamic import course memerlukan refactor helper functions | Buat wrapper async dan update consumer secara bertahap |
| React Router future flags mengubah perilaku splat | Test direct access `/courses/cs-fundamentals/ch-08-security-fundamentals` |
| ManualChunks memecah terlalu banyak chunk | Monitor jumlah request dan total size di build output |

## Success Metrics

- Initial bundle JS < 300 kB gzip.
- Build tanpa warning chunk >500 kB.
- Semua E2E test lolos.
- Content validation script lolos.
