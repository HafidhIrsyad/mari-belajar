# Mari Belajar — M3 JavaScript/TypeScript Fundamental: Implementation Plan

## Overview

Implement course kedua `js-ts-fundamental` dengan 8 chapter lengkap, mengikuti pola yang sudah ada dari Phase 1.

## Steps

### Step 1: Course Scaffolding

**Files:**
- `src/content/courses/js-ts-fundamental/meta.ts`
- `src/content/courses/js-ts-fundamental/index.ts`
- `src/content/courses/js-ts-fundamental/chapters/index.ts`
- `src/content/index.ts`

**Actions:**
1. Create `js-ts-fundamental/` course directory.
2. Create `meta.ts` with course metadata (id, slug, title, description, estimatedHours, tags, chaptersCount, firstChapterSlug).
3. Create placeholder chapter directories with `index.ts` placeholders.
4. Create course `index.ts` that imports chapters (initially placeholders).
5. Update `src/content/index.ts` course registry and metadata array to include the new course.

### Step 2: Chapter Implementation (Parallel)

**Files per chapter:**
- `src/content/courses/js-ts-fundamental/chapters/<slug>/index.ts`
- `src/content/courses/js-ts-fundamental/chapters/<slug>/lesson.ts`
- `src/content/courses/js-ts-fundamental/chapters/<slug>/quiz.ts`
- `src/content/courses/js-ts-fundamental/chapters/<slug>/references.ts`

**Chapters:**
1. `ch-01-introduction-to-javascript`
2. `ch-02-variables-types-operators`
3. `ch-03-control-flow`
4. `ch-04-functions-scope-closure`
5. `ch-05-arrays-and-objects`
6. `ch-06-asynchronous-javascript`
7. `ch-07-typescript-type-system`
8. `ch-08-modules-tooling-best-practices`

**Actions per chapter:**
1. Replace placeholder `index.ts` with full metadata.
2. Write `lesson.ts` with section order: basic markdown → JS code-example → intermediate markdown → TS code-example → advanced markdown → Go code-example → info callout.
3. Write `quiz.ts` with 8 questions, passingScore 8, 4 options each, explanations in Bahasa Indonesia.
4. Write `references.ts` with 5 mixed-type references.
5. Verify with `pnpm exec oxlint` on the chapter directory.

### Step 3: Update E2E Smoke Tests

**Files:**
- `src/test/e2e/mari-belajar-m1.e2e.test.tsx`

**Actions:**
1. Add new course to parameterized smoke tests.
2. Add test verifying homepage/course list shows the new course.

### Step 4: Verification

**Commands:**
- `pnpm run validate-content`
- `pnpm run lint -- --max-warnings=0`
- `pnpm run typecheck`
- `pnpm run test`
- `pnpm run build`

**Checks:**
- All 8 chapters validate.
- No lint/type errors.
- All tests pass.
- Build succeeds without chunk size warning.
- Direct access to `/courses/js-ts-fundamental/ch-01-introduction-to-javascript` works.

## Dependencies

- Step 1 must complete before Step 2.
- Step 2 chapters are independent and can run in parallel.
- Step 3 depends on Step 1 and 2.
- Step 4 final.

## Risks & Mitigations

| Risk | Mitigation |
|---|---|
| Dynamic import course not loaded correctly | Test direct access route |
| New course breaks existing tests | Keep existing test assertions intact |
| Large chunk size | Content split per course via Vite manualChunks already configured |
| Chapter content too similar | Vary examples per topic |
