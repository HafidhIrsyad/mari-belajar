# Ace — Implementation Notes: Mari Belajar Milestone 1

## Summary

Implemented the full Milestone 1 codebase for **Mari Belajar**, a static React SPA for learning Computer Science / Informatics Fundamentals in Indonesian.

## Tech Stack

- React 18.3.1 + TypeScript 5.5.3
- Vite 5.4.21
- Tailwind CSS 3.4.19 + PostCSS
- shadcn/ui primitives (custom components using Radix UI)
- Zustand 4.5.4 + Immer 10.2.0 for progress state
- React Router DOM 6.30.4
- react-markdown + react-syntax-highlighter
- lucide-react icons
- pnpm package manager

## Project Structure

```
src/
  components/
    ui/              # shadcn/ui-style primitives (Button, Card, Badge, etc.)
    layout/          # AppShell, TopNavigation, Footer, ChapterSidebar
    course/          # CourseCard, CourseList
    lesson/          # LessonHeader, MarkdownContent, CodeBlock, PrevNextNav, BreadcrumbNav
    quiz/            # QuizPanel, QuizOption
    progress/        # ProgressIndicator, StatusBadge
    theme-provider.tsx, theme-toggle.tsx
  content/
    types.ts         # TypeScript content & progress types
    courses/
      cs-fundamentals/
        meta.ts
        index.ts
        chapters/
          index.ts
          ch-01-how-computers-work/ (full lesson + quiz)
          ch-02-... through ch-08-... (placeholders)
          placeholder.ts
  lib/
    utils.ts         # cn() helper
    progress.ts      # Pure progress helpers
    storage.ts       # localStorage adapter
  stores/
    progressStore.ts # Zustand store with persist middleware
  pages/
    HomePage.tsx
    CourseListPage.tsx
    CourseDetailPage.tsx
    LessonPage.tsx
    NotFoundPage.tsx
  App.tsx
  main.tsx
public/_redirects   # Cloudflare Pages SPA redirect
```

## Key Implementation Decisions

### Content Schema Adaptation

Jozu's schema uses `LessonSection` discriminated unions with `type: 'code-example'`. Thatch's sample chapter organizes prose by `level` (basic/intermediate/advanced) plus a separate `codeExamples` array.

Final adaptation:
- `LessonSection` supports `type: 'markdown'` with a `level` field for grouping by depth.
- `type: 'code-example'` sections hold JS/TS/Go snippets authored directly in the lesson sequence.
- This preserves all required content: prose, code examples, quiz, and gating.

### Quiz Gating

- `passingScore` is set to the total number of questions for every chapter (8 for Chapter 1, 3 for placeholders).
- `evaluateQuiz` returns `passed` only when `score >= passingScore`, enforcing the 100% gate.
- `isChapterUnlocked` derives unlock state from content + progress; Chapter 1 is always unlocked, Chapter N requires completion of Chapter N-1.

### State Management

- Zustand `persist` middleware persists only the `progress` slice to `localStorage` under key `mari-belajar-progress`.
- `activeQuiz` is intentionally not persisted; refreshing mid-quiz restarts it.
- Immer's `produce` keeps immutable updates readable.
- Storage adapter wraps localStorage in try/catch and handles `QuotaExceededError` gracefully.

### Routing

- `/` → HomePage
- `/courses` → CourseListPage
- `/courses/:courseId` → CourseDetailPage (added to satisfy card/chapter-list navigation)
- `/courses/:courseId/:chapterId` → LessonPage
- `/not-found` and `*` → NotFoundPage

### Cloudflare Pages

- `public/_redirects` contains `/* /index.html 200` so deep links load the SPA correctly.

## Build Verification

- `pnpm install` completed successfully.
- `pnpm run build` completed with no TypeScript or Vite errors.
- `pnpm run lint` (oxlint) passes with 0 warnings and 0 errors.
- `dist/` generated with `index.html`, assets, and `_redirects`.

## Notes

- A chunk-size warning is emitted because `react-syntax-highlighter` bundles all languages. This does not block the build and is acceptable for Milestone 1.
- shadcn/ui components were created manually rather than via CLI to keep the automated scaffold deterministic.
