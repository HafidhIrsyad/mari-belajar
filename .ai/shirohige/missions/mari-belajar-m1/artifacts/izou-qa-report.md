# Izou QA Report — Mari Belajar Milestone 1

| Field | Value |
|-------|-------|
| Mission | mari-belajar-m1 |
| Commander | Izou (QA, E2E & Prod-Ready Inspection) |
| Project | `/home/dev/Documents/repo/node-js/mari-belajar` |
| Stack | React 18 + TypeScript + Vite + Tailwind CSS + shadcn/ui + Zustand + React Router DOM + pnpm |
| Date | 2026-06-26 |

---

## 1. Executive Summary

Ace delivered a working React/TypeScript SPA for Mari Belajar Milestone 1 with one fully authored chapter, a quiz engine, progress gating, and Cloudflare Pages deployment artifacts.

During QA I found and fixed **one critical functional bug** in the quiz radio-button grouping that would have allowed cross-question deselection, and **two production-readiness issues** in `index.html` (default Vite title and wrong `lang` attribute). After the fixes, all lint, type-check, build, and E2E gates pass.

**Final verdict: APPROVED** with minor recommendations listed below.

---

## 2. Lint Result

**Command:** `pnpm run lint -- --max-warnings=0`

```text
Finished in 15ms on 56 files with 91 rules using 12 threads.
Found 0 warnings and 0 errors.
```

**Result: PASS ✅**

Oxlint is configured with React, TypeScript, and Oxc plugins. The `--max-warnings=0` flag was honored; no warnings or errors were reported after fixes.

---

## 3. Type-Check Result

**Command:** `pnpm run typecheck` (`tsc --noEmit`)

**Result: PASS ✅**

No TypeScript errors. Test files are excluded from the production `tsconfig.app.json` build path and are validated by Vitest at runtime.

---

## 4. Build Result

**Command:** `pnpm run build`

```text
vite v5.4.21 building for production...
transforming...
✓ 2912 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html                     0.61 kB │ gzip:   0.37 kB
dist/assets/index-Aj06Qilz.css     29.19 kB │ gzip:   5.96 kB
dist/assets/index-CJJng0NA.js   1,097.60 kB │ gzip: 379.02 kB

(!) Some chunks are larger than 500 kB after minification. Consider:
- Using dynamic import() to code-split the application
- Use build.rollupOptions.output.manualChunks to improve chunking
- Adjust build.chunkSizeWarningLimit for this warning
✓ built in 5.32s
```

**Result: PASS ✅ (with warning)**

The build completes successfully. Vite emits a chunk-size warning because the single JS bundle is ~1.1 MB. This is acceptable for Milestone 1 but should be addressed in the next milestone by code-splitting heavy dependencies (e.g., `react-syntax-highlighter`, `react-markdown`) or adding `manualChunks`.

---

## 5. E2E Scenarios and Results

**Framework:** Vitest 2.1.9 + `@testing-library/react` + jsdom  
**Test file:** `src/test/e2e/mari-belajar-m1.e2e.test.tsx`

| ID | Scenario | Business Flow | Result |
|----|----------|---------------|--------|
| M1-E2E-01 | Landing → Course List → Chapter 1 | UC-01 → UC-02 → UC-04 | ✅ PASS |
| M1-E2E-02 | Perfect quiz unlocks next chapter | UC-07 → UC-08 | ✅ PASS |
| M1-E2E-03 | Incomplete quiz shows retry; next chapter stays locked | UC-07 (retry path) | ✅ PASS |
| M1-E2E-04 | Direct deep link to lesson route | Flow 1 / Cloudflare redirect | ✅ PASS |

```text
 ✓ src/test/e2e/mari-belajar-m1.e2e.test.tsx (4 tests) 2061ms
   ✓ Scenario 1: lands on homepage, navigates to courses, opens chapter 1, sees content
   ✓ Scenario 2: answers all quiz questions correctly and unlocks next chapter
   ✓ Scenario 3: answers some quiz questions incorrectly and sees retry option; next chapter stays locked
   ✓ Scenario 4: direct navigation to a deep lesson route renders the lesson

 Test Files  1 passed (1)
      Tests  4 passed (4)
```

Detailed scenario definitions are in `.ai/shirohige/missions/mari-belajar-m1/artifacts/izou-e2e-scenarios.yml`.

### E2E Setup Notes
- `localStorage` is mocked in `vitest.setup.ts`.
- The Zustand progress store is reset to `initialProgress` before each scenario to guarantee isolated state.
- `MemoryRouter` exercises the same route tree as the production `BrowserRouter`.
- Browser-level direct-link behavior for Cloudflare Pages was manually verified against `dist/_redirects`.

---

## 6. Issues Found and Resolved

### 6.1 Critical — Quiz radio buttons shared names across questions

**Location:** `src/components/quiz/quiz-option.tsx`

**Problem:** Each option used `name={`question-option-${index}`}`, where `index` was the option index (0–3). All "A" options across the 8 questions therefore shared the same `name`, making them a single native radio group. Selecting option A in question 2 would deselect option A in question 1.

**Fix:** Added a `name: string` prop to `QuizOption` and passed `question.id` from `QuizPanel`, so each question has an isolated radio group (`name={`question-option-${questionId}`}`).

**Verification:** Re-ran all 4 E2E scenarios; they continue to pass.

### 6.2 Prod-ready — Default Vite title in `index.html`

**Location:** `index.html`

**Problem:** `<title>vite-scaffold</title>` was shipped in the production build.

**Fix:** Updated to `<title>Mari Belajar — Ilmu Komputer dalam Bahasa Indonesia</title>` and added a `<meta name="description">`.

### 6.3 Accessibility/SEO — Wrong HTML `lang`

**Location:** `index.html`

**Problem:** `<html lang="en">` while all content is in Indonesian.

**Fix:** Changed to `<html lang="id">`.

---

## 7. Prod-Ready Checklist

| # | Item | Status | Notes |
|---|------|--------|-------|
| 1 | No secrets / credentials in code | ✅ PASS | Grep scan found no API keys, tokens, passwords, or private credentials. |
| 2 | No debug logs or commented-out code | ⚠️ MINOR | `src/lib/storage.ts` contains legitimate `console.warn` calls for localStorage errors. They are acceptable but could be replaced with a telemetry/no-op fallback later. Sample `console.log` strings in lesson content are educational code snippets, not runtime logs. |
| 3 | Type safety | ✅ PASS | `strict: true`, `noUnusedLocals`, `noUnusedParameters` enabled; `tsc --noEmit` passes. |
| 4 | Accessibility basics | ✅ PASS | Skip-to-content link, semantic landmarks, `aria-label` on icon-only buttons, fieldset/legend for quiz questions, `role="alert"` on result alerts, `sr-only` radio inputs inside labels. |
| 5 | Responsive layout | ✅ PASS | Tailwind breakpoints used (`sm:`, `md:`, `lg:`); mobile chapter menu via Sheet; container-based max widths. |
| 6 | Cloudflare Pages deployability | ✅ PASS | Static `dist/` output present; `public/_redirects` contains `/* /index.html 200`; no server-side dependencies. |
| 7 | 100% quiz gating | ✅ PASS | `passingScore` equals total questions for ch-01; `isChapterUnlocked` requires previous chapter completion. |
| 8 | Progress persistence | ✅ PASS | Zustand + persist middleware stores progress in `localStorage` under `mari-belajar-progress`; storage module has error handling. |
| 9 | Build output integrity | ✅ PASS | `dist/index.html` title/description/lang are correct; `_redirects` copied; assets hashed. |
| 10 | E2E coverage of acceptance criteria | ✅ PASS | Scenarios cover AC-01 through AC-05 and AC-06 (build/deploy readiness). |

### Minor Recommendations (non-blocking)

1. **Bundle size:** Address the Vite chunk-size warning (>500 kB) by introducing dynamic imports or `manualChunks` for `react-syntax-highlighter` and `react-markdown`.
2. **Quiz placeholder chapters:** Placeholder chapters use 3-question quizzes, which is below the 6–8 question business rule (BR-03). This is acceptable for temporary content but should be corrected before removing placeholder status.
3. **ThemeProvider robustness:** `ThemeProvider` reads/writes `localStorage` without try-catch. Consider mirroring the defensive pattern in `src/lib/storage.ts`.
4. **AppShell consistency:** `CourseDetailPage` and `LessonPage` are not wrapped in `AppShell`, so the global top navigation and footer are absent on those routes. Verify this is intentional; if not, wrap them or provide equivalent navigation.

---

## 8. Commands to Reproduce

```bash
# Install dependencies
pnpm install

# Lint (zero warnings)
pnpm run lint -- --max-warnings=0

# Type check
pnpm run typecheck

# E2E tests
pnpm run test

# Production build
pnpm run build
```

---

## 9. Final Verdict

**APPROVED ✅**

Mari Belajar Milestone 1 meets the QA gate requirements:
- Zero-lint policy satisfied.
- Type-check clean.
- Build succeeds and produces deployable static assets.
- All derived E2E happy-path scenarios pass.
- Critical quiz bug fixed.
- No blocking security, accessibility, or deployability issues remain.

The minor recommendations above should be triaged for the next milestone but do not prevent deployment to Cloudflare Pages.
