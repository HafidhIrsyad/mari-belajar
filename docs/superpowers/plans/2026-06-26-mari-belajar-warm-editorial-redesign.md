# Mari Belajar — Warm Editorial UI Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the Mari Belajar Milestone 1 UI to the approved Warm Editorial direction using Plus Jakarta Sans, warm cream palette, editorial left-aligned layouts, and a Further Reading section at the end of each chapter.

**Architecture:** Update global theme tokens (colors, fonts, spacing), refactor page layouts and components to use the new design system, add a `Reference` content type and `ReferenceList` component, and verify with build/lint/tests.

**Tech Stack:** React 18, TypeScript, Vite, Tailwind CSS 3, shadcn/ui, Zustand, React Router DOM, pnpm.

## Global Constraints

- Primary typeface: **Plus Jakarta Sans** (weights 400, 500, 600, 700).
- Monospace typeface: **JetBrains Mono** (weights 400, 500).
- Body text: **17px (`1.0625rem`)** with **line-height 1.7**.
- Lesson content measure: **max-width `65ch`**.
- Page background: **cream `#FAF8F3`**; no pure white backgrounds.
- Cards: flat with **1px border**, **8px radius**, **no shadow**.
- No `font-extrabold` / 800 weights.
- No gradient backgrounds.
- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96 px.
- All changes must pass: `pnpm run lint`, `pnpm run typecheck`, `pnpm run test`, `pnpm run build`.

---

## File Map

| File | Responsibility |
|---|---|
| `index.html` | Load Plus Jakarta Sans and JetBrains Mono fonts |
| `tailwind.config.js` | Font family, color tokens, border radius |
| `src/index.css` | CSS variables, prose utilities, base styles |
| `src/components/ui/button.tsx` | Primary/secondary button styles |
| `src/components/ui/card.tsx` | Card flat style |
| `src/components/ui/badge.tsx` | Badge variants (basic/intermediate/advanced) |
| `src/components/layout/top-navigation.tsx` | Nav with logo, links, theme toggle |
| `src/components/layout/footer.tsx` | Minimal footer |
| `src/components/layout/chapter-sidebar.tsx` | Chapter list sidebar |
| `src/pages/HomePage.tsx` | Left-aligned editorial homepage |
| `src/pages/CourseListPage.tsx` | Course list layout |
| `src/pages/CourseDetailPage.tsx` | Course detail layout |
| `src/pages/LessonPage.tsx` | Lesson layout with references |
| `src/components/lesson/lesson-header.tsx` | Title, badges, meta |
| `src/components/lesson/breadcrumb-nav.tsx` | Breadcrumb styling |
| `src/components/lesson/markdown-content.tsx` | Prose rendering |
| `src/components/lesson/code-block.tsx` | Code block dark style |
| `src/components/lesson/prev-next-nav.tsx` | Prev/next navigation |
| `src/components/lesson/reference-list.tsx` | NEW: Further Reading list |
| `src/components/quiz/quiz-panel.tsx` | Quiz panel styling |
| `src/components/quiz/quiz-option.tsx` | Quiz option card styling |
| `src/components/progress/status-badge.tsx` | Status badge styling |
| `src/components/progress/progress-indicator.tsx` | Progress bar styling |
| `src/content/types.ts` | Add `Reference` type |
| `src/content/courses/cs-fundamentals/chapters/ch-01-how-computers-work/index.ts` | Wire references |
| `src/content/courses/cs-fundamentals/chapters/ch-01-how-computers-work/references.ts` | NEW: references data |
| `src/test/e2e/mari-belajar-m1.e2e.test.tsx` | Update tests for new UI text/structure |

---

## Task 1: Load New Fonts and Update Tailwind Config

**Files:**
- Modify: `index.html`
- Modify: `tailwind.config.js`

**Interfaces:**
- Produces: `fontFamily.sans` = `'Plus Jakarta Sans', ...`, `fontFamily.mono` = `'JetBrains Mono', ...`

- [ ] **Step 1: Add Google Fonts to `index.html`**

Replace the existing `<link rel="icon" ...>` block in the `<head>` with:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
  rel="stylesheet"
/>
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
```

- [ ] **Step 2: Update font families in `tailwind.config.js`**

Change:

```js
fontFamily: {
  sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
  mono: ['"JetBrains Mono"', '"Fira Code"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'monospace'],
},
```

To:

```js
fontFamily: {
  sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
  mono: ['"JetBrains Mono"', '"Fira Code"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'monospace'],
},
```

- [ ] **Step 3: Verify fonts load**

Run: `pnpm run dev` (or inspect `index.html` manually)
Expected: No 404 for Google Fonts CSS.

- [ ] **Step 4: Commit**

```bash
git add index.html tailwind.config.js
git commit -m "feat: load Plus Jakarta Sans and JetBrains Mono fonts"
```

---

## Task 2: Update CSS Variables and Base Styles

**Files:**
- Modify: `src/index.css`

**Interfaces:**
- Produces: warm cream color tokens, prose utility classes

- [ ] **Step 1: Replace `:root` color variables**

Update the `:root` block to:

```css
:root {
  --background: 45 33% 97%;
  --foreground: 220 25% 18%;
  --card: 0 0% 100%;
  --card-foreground: 220 25% 18%;
  --popover: 0 0% 100%;
  --popover-foreground: 220 25% 18%;
  --primary: 168 60% 34%;
  --primary-foreground: 0 0% 100%;
  --secondary: 38 72% 50%;
  --secondary-foreground: 220 25% 18%;
  --muted: 45 20% 92%;
  --muted-foreground: 220 12% 42%;
  --accent: 45 25% 94%;
  --accent-foreground: 220 25% 18%;
  --destructive: 0 65% 55%;
  --destructive-foreground: 0 0% 100%;
  --border: 45 15% 85%;
  --input: 45 15% 85%;
  --ring: 168 60% 34%;
  --radius: 0.5rem;

  --success: 158 55% 38%;
  --success-foreground: 0 0% 100%;
  --warning: 38 80% 52%;
  --warning-foreground: 220 25% 18%;

  --code-bg: 220 25% 18%;
  --code-fg: 210 20% 92%;
  --code-border: 220 20% 25%;
}
```

- [ ] **Step 2: Update `.dark` color variables**

Update the `.dark` block to:

```css
.dark {
  --background: 220 18% 10%;
  --foreground: 45 20% 92%;
  --card: 220 15% 14%;
  --card-foreground: 45 20% 92%;
  --popover: 220 15% 14%;
  --popover-foreground: 45 20% 92%;
  --primary: 168 55% 50%;
  --primary-foreground: 220 25% 18%;
  --secondary: 38 75% 60%;
  --secondary-foreground: 220 25% 18%;
  --muted: 220 15% 18%;
  --muted-foreground: 220 10% 60%;
  --accent: 220 15% 20%;
  --accent-foreground: 45 20% 92%;
  --destructive: 0 62% 55%;
  --destructive-foreground: 0 0% 100%;
  --border: 220 12% 25%;
  --input: 220 12% 25%;
  --ring: 168 55% 50%;

  --success: 158 60% 45%;
  --success-foreground: 220 25% 18%;
  --warning: 45 85% 55%;
  --warning-foreground: 220 25% 18%;

  --code-bg: 220 25% 14%;
  --code-fg: 210 20% 92%;
  --code-border: 220 20% 22%;
}
```

- [ ] **Step 3: Update body base styles**

Ensure the body rule uses the new font stack:

```css
body {
  @apply bg-background text-foreground antialiased;
  font-family: theme('fontFamily.sans');
  font-feature-settings: "rlig" 1, "calt" 1;
  font-size: 1.0625rem;
  line-height: 1.7;
}
```

- [ ] **Step 4: Update prose utilities**

Replace `.prose-lesson` utilities with:

```css
@layer utilities {
  .prose-lesson {
    @apply text-foreground;
  }

  .prose-lesson h2 {
    @apply mt-12 mb-4 text-2xl font-semibold text-foreground;
    line-height: 1.2;
  }

  .prose-lesson h3 {
    @apply mt-8 mb-3 text-xl font-semibold text-foreground;
    line-height: 1.3;
  }

  .prose-lesson p {
    @apply mb-5;
    line-height: 1.7;
  }

  .prose-lesson ul {
    @apply mb-5 list-disc space-y-2 pl-6;
  }

  .prose-lesson ol {
    @apply mb-5 list-decimal space-y-2 pl-6;
  }

  .prose-lesson li {
    line-height: 1.7;
  }

  .prose-lesson code {
    @apply rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground;
  }

  .prose-lesson pre {
    @apply mb-5 overflow-x-auto rounded-lg;
  }

  .prose-lesson strong {
    @apply font-semibold text-foreground;
  }

  .prose-lesson hr {
    @apply my-8 border-border;
  }
}
```

- [ ] **Step 5: Run checks**

Run:
```bash
pnpm run lint -- --max-warnings=0
pnpm run typecheck
pnpm run build
```

Expected: All pass.

- [ ] **Step 6: Commit**

```bash
git add src/index.css
git commit -m "feat: update warm editorial color tokens and prose styles"
```

---

## Task 3: Update Core UI Components

**Files:**
- Modify: `src/components/ui/button.tsx`
- Modify: `src/components/ui/card.tsx`
- Modify: `src/components/ui/badge.tsx`

**Interfaces:**
- Produces: flat card, warm primary button, badge variants

- [ ] **Step 1: Update Button component**

In `src/components/ui/button.tsx`, change the `variant` styles:

```ts
variant: {
  default: 'bg-primary text-primary-foreground hover:bg-primary/90 border border-primary',
  destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
  outline: 'border border-primary bg-transparent text-primary hover:bg-primary/5',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  ghost: 'hover:bg-accent hover:text-accent-foreground',
  link: 'text-primary underline-offset-4 hover:underline',
},
```

Change `size` to:

```ts
size: {
  default: 'h-11 px-6 py-2 text-[0.9375rem]',
  sm: 'h-9 px-4 text-sm',
  lg: 'h-12 px-8 text-[0.9375rem]',
  icon: 'h-10 w-10',
},
```

- [ ] **Step 2: Update Card component**

In `src/components/ui/card.tsx`, ensure `Card` uses flat style:

```tsx
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'rounded-lg border border-border bg-card/65 text-card-foreground',
      className
    )}
    {...props}
  />
))
```

- [ ] **Step 3: Update Badge component**

In `src/components/ui/badge.tsx`, add variants:

```ts
variant: {
  default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
  secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
  destructive: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
  outline: 'text-foreground',
  basic: 'border-transparent bg-primary/10 text-primary hover:bg-primary/20',
  intermediate: 'border-transparent bg-secondary/15 text-[#9A6A10] hover:bg-secondary/25',
  advanced: 'border-transparent bg-accent text-accent-foreground hover:bg-accent/80',
},
```

- [ ] **Step 4: Run checks**

```bash
pnpm run lint -- --max-warnings=0
pnpm run typecheck
```

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/button.tsx src/components/ui/card.tsx src/components/ui/badge.tsx
git commit -m "feat: restyle button, card, and badge for warm editorial"
```

---

## Task 4: Refactor Layout Components

**Files:**
- Modify: `src/components/layout/top-navigation.tsx`
- Modify: `src/components/layout/footer.tsx`
- Modify: `src/components/layout/app-shell.tsx`
- Modify: `src/components/layout/chapter-sidebar.tsx`

**Interfaces:**
- Consumes: theme provider
- Produces: sticky nav, minimal footer, editorial sidebar

- [ ] **Step 1: Rewrite TopNavigation**

Replace `src/components/layout/top-navigation.tsx` with:

```tsx
import { Link } from 'react-router-dom'
import { BookOpen, Menu, Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/components/theme-provider'

export function TopNavigation() {
  const { theme, setTheme } = useTheme()

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-6 lg:px-16">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary tracking-tight">
          Mari Belajar
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            to="/courses"
            className="flex items-center gap-2 text-[0.9375rem] font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <BookOpen className="h-4 w-4" />
            Course
          </Link>
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </nav>

        <button className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground md:hidden">
          <Menu className="h-4 w-4" />
        </button>
      </div>
    </header>
  )
}
```

- [ ] **Step 2: Rewrite Footer**

Replace `src/components/layout/footer.tsx` with:

```tsx
export function Footer() {
  return (
    <footer className="border-t border-border py-8 text-center">
      <p className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} Mari Belajar. Dibuat untuk pelajar Indonesia.
      </p>
    </footer>
  )
}
```

- [ ] **Step 3: Update AppShell**

Ensure `src/components/layout/app-shell.tsx` uses the updated TopNavigation and Footer:

```tsx
import { TopNavigation } from './top-navigation'
import { Footer } from './footer'

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <TopNavigation />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
```

- [ ] **Step 4: Update ChapterSidebar**

Restyle `src/components/layout/chapter-sidebar.tsx`:

- Use warm muted background for active item.
- Use `font-medium` for locked items.
- Ensure minimum touch target 44px.

Key class changes:

```tsx
<li
  className={cn(
    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-[0.9375rem] transition-colors',
    isActive
      ? 'bg-primary/10 font-semibold text-primary'
      : isCompleted
        ? 'text-foreground'
        : 'text-muted-foreground',
    !isUnlocked && 'opacity-60',
    !isActive && 'hover:bg-muted'
  )}
>
```

- [ ] **Step 5: Run checks**

```bash
pnpm run lint -- --max-warnings=0
pnpm run typecheck
```

- [ ] **Step 6: Commit**

```bash
git add src/components/layout/
git commit -m "feat: refactor layout components for warm editorial"
```

---

## Task 5: Refactor Homepage

**Files:**
- Modify: `src/pages/HomePage.tsx`

**Interfaces:**
- Consumes: course content
- Produces: left-aligned editorial homepage

- [ ] **Step 1: Rewrite HomePage**

Replace `src/pages/HomePage.tsx` with a left-aligned hero, value cards, and course preview card per the design spec. Keep the existing data hooks (courses, firstCourse, firstChapter).

Key structure:

```tsx
<section className="px-6 py-20 lg:px-16 lg:py-24">
  <div className="max-w-[55ch]">
    <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
      ✦ Platform pembelajaran Indonesia
    </span>
    <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-foreground lg:text-5xl">
      Belajar ilmu komputer dari dasar, secara bertahap.
    </h1>
    <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
      Fondasi computer science dalam Bahasa Indonesia. Dari bit hingga arsitektur sistem, dengan contoh kode JavaScript, TypeScript, dan Go.
    </p>
    <div className="mt-8 flex flex-wrap gap-4">
      <Button asChild size="lg">
        <Link to="/courses">Mulai Belajar</Link>
      </Button>
      <Button asChild size="lg" variant="outline">
        <Link to={`/courses/${firstCourse.slug}/${firstChapter.slug}`}>Langsung ke Bab 1</Link>
      </Button>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Update ValueCard component**

Ensure value cards use flat card style with icon badge:

```tsx
function ValueCard({ icon: Icon, title, description }) {
  return (
    <Card className="transition-colors hover:border-[#D0C8B8]">
      <CardHeader>
        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-[0.9375rem] leading-relaxed text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}
```

- [ ] **Step 3: Run checks**

```bash
pnpm run lint -- --max-warnings=0
pnpm run typecheck
```

- [ ] **Step 4: Commit**

```bash
git add src/pages/HomePage.tsx
git commit -m "feat: redesign homepage with warm editorial layout"
```

---

## Task 6: Refactor Course List and Course Detail Pages

**Files:**
- Modify: `src/pages/CourseListPage.tsx`
- Modify: `src/pages/CourseDetailPage.tsx`

**Interfaces:**
- Consumes: courses data, progress store
- Produces: left-aligned course list and detail pages

- [ ] **Step 1: Update CourseListPage**

Left-align header, use flat cards, update typography:

```tsx
<div className="px-6 py-12 lg:px-16 lg:py-20">
  <div className="max-w-[50ch]">
    <h1 className="flex items-center gap-3 text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
      <BookOpen className="h-8 w-8 text-primary" />
      Daftar Course
    </h1>
    <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
      Pilih course untuk memulai perjalanan belajar. Progress disimpan secara lokal di perangkat ini.
    </p>
  </div>
  <div className="mt-10 max-w-3xl">
    <CourseList courses={courses} progress={progress} />
  </div>
</div>
```

- [ ] **Step 2: Update CourseCard component**

In `src/components/course/course-card.tsx`, use flat card and new typography:

```tsx
<Card className="flex flex-col transition-colors hover:border-[#D0C8B8] sm:flex-row sm:items-center sm:justify-between">
  <CardHeader className="pb-4 sm:pb-0">
    <CardTitle className="text-xl font-semibold">{course.title}</CardTitle>
    <CardDescription className="mt-2 text-[0.9375rem] leading-relaxed">
      {course.description}
    </CardDescription>
  </CardHeader>
  <CardContent className="pt-0 sm:pt-6">
    <Button asChild>
      <Link to={`/courses/${course.slug}`}>Lihat Course</Link>
    </Button>
  </CardContent>
</Card>
```

- [ ] **Step 3: Update CourseDetailPage**

Left-align header, show course title, description, progress bar, and chapter list:

```tsx
<div className="px-6 py-12 lg:px-16 lg:py-20">
  <div className="max-w-3xl">
    <h1 className="text-3xl font-bold tracking-tight text-foreground lg:text-4xl">{course.title}</h1>
    <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{course.description}</p>
    {/* Chapter list */}
  </div>
</div>
```

- [ ] **Step 4: Run checks**

```bash
pnpm run lint -- --max-warnings=0
pnpm run typecheck
```

- [ ] **Step 5: Commit**

```bash
git add src/pages/CourseListPage.tsx src/pages/CourseDetailPage.tsx src/components/course/
git commit -m "feat: redesign course list and detail pages"
```

---

## Task 7: Refactor Lesson Page Components

**Files:**
- Modify: `src/pages/LessonPage.tsx`
- Modify: `src/components/lesson/lesson-header.tsx`
- Modify: `src/components/lesson/breadcrumb-nav.tsx`
- Modify: `src/components/lesson/markdown-content.tsx`
- Modify: `src/components/lesson/code-block.tsx`
- Modify: `src/components/lesson/prev-next-nav.tsx`

**Interfaces:**
- Consumes: chapter content, progress store
- Produces: editorial lesson layout with warm styling

- [ ] **Step 1: Update LessonPage layout**

Ensure main content wrapper has `max-w-[65ch]` and uses new spacing:

```tsx
<main className="flex-1 px-6 py-10 lg:px-16 lg:py-14">
  <div className="mx-auto max-w-[65ch]">
    <BreadcrumbNav course={course} chapter={chapter} />
    <LessonHeader chapter={chapter} courseTitle={course.title} />
    <article className="prose-lesson">
      {/* sections */}
    </article>
    <QuizPanel courseId={course.id} chapter={chapter} />
    <ReferenceList references={chapter.references ?? []} />
    <PrevNextNav course={course} currentChapter={chapter} progress={progress} />
  </div>
</main>
```

- [ ] **Step 2: Update LessonHeader**

Style title, badges, and meta:

```tsx
<header className="mb-8 border-b border-border pb-8">
  <h1 className="text-3xl font-bold leading-[1.15] tracking-tight text-foreground lg:text-4xl">
    {chapter.title}
  </h1>
  <div className="mt-4 flex flex-wrap items-center gap-3 text-[0.9375rem] text-muted-foreground">
    <Badge variant="basic">Basic</Badge>
    <Badge variant="intermediate">Intermediate</Badge>
    <Badge variant="advanced">Advanced</Badge>
    <span>• 14 menit baca</span>
  </div>
</header>
```

- [ ] **Step 3: Update BreadcrumbNav**

Use primary color for links, muted for separators:

```tsx
<nav className="mb-6 text-sm font-medium text-muted-foreground">
  <Link to="/" className="text-primary hover:underline">Beranda</Link>
  <span className="mx-2">/</span>
  <Link to="/courses" className="text-primary hover:underline">Course</Link>
  <span className="mx-2">/</span>
  <Link to={`/courses/${course.slug}`} className="text-primary hover:underline">{course.title}</Link>
  <span className="mx-2">/</span>
  <span>{chapter.title}</span>
</nav>
```

- [ ] **Step 4: Update CodeBlock**

Use dark slate background, JetBrains Mono, rounded corners:

```tsx
<div className="my-6 overflow-hidden rounded-lg bg-[#1E293B] text-[#E2E8F0]">
  <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">{language}</span>
    <button className="text-xs font-medium text-slate-400 hover:text-slate-200">Copy</button>
  </div>
  <pre className="overflow-x-auto p-5 font-mono text-sm leading-relaxed">
    <code>{code}</code>
  </pre>
</div>
```

- [ ] **Step 5: Update MarkdownContent**

Ensure prose uses the new color tokens. If using `react-markdown` with custom components, map `p`, `ul`, `ol`, `strong`, `code` to appropriate classes.

- [ ] **Step 6: Update PrevNextNav**

Use outline buttons, show lock state for next chapter when locked:

```tsx
<div className="mt-12 flex items-center justify-between border-t border-border pt-8">
  <Button variant="outline" asChild>
    <Link to={prevPath}>← Bab Sebelumnya</Link>
  </Button>
  {isNextUnlocked ? (
    <Button asChild>
      <Link to={nextPath}>Bab Selanjutnya →</Link>
    </Button>
  ) : (
    <Button variant="outline" disabled>
      <Lock className="mr-2 h-4 w-4" />
      Terkunci
    </Button>
  )}
</div>
```

- [ ] **Step 7: Run checks**

```bash
pnpm run lint -- --max-warnings=0
pnpm run typecheck
```

- [ ] **Step 8: Commit**

```bash
git add src/pages/LessonPage.tsx src/components/lesson/
git commit -m "feat: redesign lesson page and components"
```

---

## Task 8: Refactor Quiz Components

**Files:**
- Modify: `src/components/quiz/quiz-panel.tsx`
- Modify: `src/components/quiz/quiz-option.tsx`

**Interfaces:**
- Consumes: chapter quiz data, progress store actions
- Produces: styled quiz panel with card options

- [ ] **Step 1: Update QuizOption**

Style option as a flat card with radio indicator:

```tsx
<label
  className={cn(
    'flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors',
    isSelected
      ? 'border-primary bg-primary/5'
      : 'border-border bg-card/65 hover:border-primary/50 hover:bg-primary/[0.03]',
    showResult && isCorrect && 'border-success bg-success/10',
    showResult && isSelected && !isCorrect && 'border-destructive bg-destructive/10'
  )}
>
  <span
    className={cn(
      'mt-0.5 h-5 w-5 flex-shrink-0 rounded-full border-2',
      isSelected ? 'border-primary bg-primary shadow-[inset_0_0_0_4px_var(--background)]' : 'border-border'
    )}
  />
  <span className="text-[0.9375rem] leading-relaxed text-foreground">{option}</span>
</label>
```

- [ ] **Step 2: Update QuizPanel**

Use new typography and button styles. Ensure feedback messages use warm colors.

- [ ] **Step 3: Run checks**

```bash
pnpm run lint -- --max-warnings=0
pnpm run typecheck
```

- [ ] **Step 4: Commit**

```bash
git add src/components/quiz/
git commit -m "feat: redesign quiz components with card-style options"
```

---

## Task 9: Add Further Reading / References Feature

**Files:**
- Modify: `src/content/types.ts`
- Create: `src/components/lesson/reference-list.tsx`
- Create: `src/content/courses/cs-fundamentals/chapters/ch-01-how-computers-work/references.ts`
- Modify: `src/content/courses/cs-fundamentals/chapters/ch-01-how-computers-work/index.ts`
- Modify: `src/content/courses/cs-fundamentals/chapters/ch-01-how-computers-work/lesson.ts` (if references live on chapter)

**Interfaces:**
- Produces: `Reference` type, `ReferenceList` component

- [ ] **Step 1: Add Reference type**

In `src/content/types.ts`, add:

```ts
export type ReferenceType = 'article' | 'video' | 'book' | 'documentation' | 'interactive'

export interface Reference {
  id: string
  title: string
  url: string
  description: string
  type: ReferenceType
}
```

Add `references?: Reference[]` to the `Chapter` interface.

- [ ] **Step 2: Create references data**

Create `src/content/courses/cs-fundamentals/chapters/ch-01-how-computers-work/references.ts`:

```ts
import type { Reference } from '@/content/types'

export const ch01References: Reference[] = [
  {
    id: 'ref-01',
    title: 'How Boolean Logic Works',
    url: 'https://www.computerhope.com/jargon/b/boolean.htm',
    description: 'Penjelasan intuitif tentang logika boolean dan bagaimana komputer memproses true/false.',
    type: 'article',
  },
  {
    id: 'ref-02',
    title: 'Binary Numbers Explained',
    url: 'https://www.khanacademy.org/math/algebra-home/alg-intro-to-algebra/algebra-alternate-number-bases/v/number-systems-introduction',
    description: 'Video pembelajaran sistem bilangan dari Khan Academy.',
    type: 'video',
  },
  {
    id: 'ref-03',
    title: 'The Elements of Computing Systems',
    url: 'https://www.nand2tetris.org/',
    description: 'Buku klasik yang membangun komputer dari NAND gate hingga sistem operasi.',
    type: 'book',
  },
  {
    id: 'ref-04',
    title: 'Inside the Machine',
    url: 'https://www.amazon.com/Inside-Machine-Introduction-Microprocessors-Architecture/dp/1593276680',
    description: 'Jon Stokes menjelaskan arsitektur mikroprosesor dengan bahasa yang mudah dipahami.',
    type: 'book',
  },
  {
    id: 'ref-05',
    title: 'Go by Example: Channels',
    url: 'https://gobyexample.com/channels',
    description: 'Dokumentasi interaktif fitur concurrency di Go.',
    type: 'documentation',
  },
]
```

- [ ] **Step 3: Wire references into chapter**

In `src/content/courses/cs-fundamentals/chapters/ch-01-how-computers-work/index.ts`, import and assign:

```ts
import { ch01References } from './references'

export const ch01HowComputersWork: Chapter = {
  // ... existing fields
  references: ch01References,
}
```

- [ ] **Step 4: Create ReferenceList component**

Create `src/components/lesson/reference-list.tsx`:

```tsx
import { ExternalLink } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Reference, ReferenceType } from '@/content/types'

const typeLabels: Record<ReferenceType, string> = {
  article: 'Artikel',
  video: 'Video',
  book: 'Buku',
  documentation: 'Dokumentasi',
  interactive: 'Interaktif',
}

export function ReferenceList({ references }: { references: Reference[] }) {
  if (!references || references.length === 0) return null

  return (
    <section className="mt-14 border-t border-border pt-10">
      <h2 className="text-2xl font-semibold tracking-tight text-foreground">
        Referensi Belajar Lebih Lanjut
      </h2>
      <p className="mt-3 text-muted-foreground">
        Bacaan dan sumber tambahan untuk memperdalam pemahamanmu.
      </p>

      <div className="mt-6 grid gap-4">
        {references.map((ref) => (
          <Card key={ref.id} className="transition-colors hover:border-[#D0C8B8]">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-4">
                <CardTitle className="text-lg font-semibold leading-snug">
                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-foreground hover:text-primary"
                  >
                    {ref.title}
                    <ExternalLink className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                  </a>
                </CardTitle>
                <Badge variant="outline" className="flex-shrink-0 text-xs">
                  {typeLabels[ref.type]}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-[0.9375rem] leading-relaxed text-muted-foreground">
                {ref.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Add ReferenceList to LessonPage**

Import and render `<ReferenceList references={chapter.references ?? []} />` after `<QuizPanel />`.

- [ ] **Step 6: Run checks**

```bash
pnpm run lint -- --max-warnings=0
pnpm run typecheck
```

- [ ] **Step 7: Commit**

```bash
git add src/content/types.ts src/components/lesson/reference-list.tsx src/content/courses/cs-fundamentals/chapters/ch-01-how-computers-work/ src/pages/LessonPage.tsx
git commit -m "feat: add further reading references section to chapters"
```

---

## Task 10: Update Progress Components

**Files:**
- Modify: `src/components/progress/status-badge.tsx`
- Modify: `src/components/progress/progress-indicator.tsx`

**Interfaces:**
- Produces: warm-styled progress badges and bar

- [ ] **Step 1: Update StatusBadge**

Use warm colors:

```tsx
const variants = {
  locked: 'bg-muted text-muted-foreground',
  unlocked: 'bg-primary/10 text-primary',
  completed: 'bg-success/10 text-success',
}
```

- [ ] **Step 2: Update ProgressIndicator**

Use primary color for fill:

```tsx
<div className="h-2 w-full overflow-hidden rounded-full bg-muted">
  <div
    className="h-full rounded-full bg-primary transition-all"
    style={{ width: `${percentage}%` }}
  />
</div>
```

- [ ] **Step 3: Run checks**

```bash
pnpm run lint -- --max-warnings=0
pnpm run typecheck
```

- [ ] **Step 4: Commit**

```bash
git add src/components/progress/
git commit -m "feat: update progress components for warm editorial"
```

---

## Task 11: Update E2E Tests

**Files:**
- Modify: `src/test/e2e/mari-belajar-m1.e2e.test.tsx`

**Interfaces:**
- Ensures: redesigned UI still passes all scenarios

- [ ] **Step 1: Update test selectors if needed**

If any text changed (e.g., button labels, headings), update test queries to match the new copy.

- [ ] **Step 2: Add references test**

Add a new test or assertion that the Further Reading section renders on the sample chapter:

```tsx
it('shows further reading references on the sample chapter', async () => {
  // navigate to chapter 1
  // expect screen to show "Referensi Belajar Lebih Lanjut"
  // expect at least one reference card
})
```

- [ ] **Step 3: Run tests**

```bash
pnpm run test
```

Expected: All tests pass.

- [ ] **Step 4: Commit**

```bash
git add src/test/e2e/mari-belajar-m1.e2e.test.tsx
git commit -m "test: update e2e tests for redesigned ui and references"
```

---

## Task 12: Final Verification

**Files:** All changed files.

- [ ] **Step 1: Run full verification suite**

```bash
pnpm run lint -- --max-warnings=0
pnpm run typecheck
pnpm run test
pnpm run build
```

Expected:
- Lint: 0 warnings, 0 errors
- Type check: clean
- Tests: all pass
- Build: `dist/` generated successfully

- [ ] **Step 2: Manual spot-check**

Open `dist/index.html` or run `pnpm run preview` and verify:
- Fonts are Plus Jakarta Sans.
- Background is cream.
- Homepage hero is left-aligned.
- Lesson content width is comfortable (~65ch).
- Code blocks are dark.
- Further Reading section appears on chapter 1.
- Quiz gating still works.

- [ ] **Step 3: Final commit**

```bash
git add .
git commit -m "feat: complete warm editorial ui redesign with references"
```

---

## Self-Review Checklist

- [x] **Spec coverage:** All sections of the design spec (colors, typography, layout, components, references, dark mode, accessibility) map to specific tasks.
- [x] **Placeholder scan:** No TBD, TODO, or vague steps.
- [x] **Type consistency:** `Reference` type added to `Chapter` and used by `ReferenceList`. Component names consistent across tasks.
- [x] **Verification:** Each task ends with lint/typecheck; final task runs full suite.
