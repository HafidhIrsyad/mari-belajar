# Mari Belajar

**Mari Belajar** is a browser-based learning platform for software engineering, written in **Bahasa Indonesia**. It delivers structured courses across computer science fundamentals and popular engineering tracks, with chapter-level quizzes, interactive visualizations, and local progress tracking — no account required.

---

## Table of contents

- [Overview](#overview)
- [Features](#features)
- [Curriculum](#curriculum)
- [How learning works](#how-learning-works)
- [Tech stack](#tech-stack)
- [Architecture](#architecture)
- [Project structure](#project-structure)
- [Content model](#content-model)
- [Authoring course content](#authoring-course-content)
- [Interactive visualizations](#interactive-visualizations)
- [Routing](#routing)
- [Progress & persistence](#progress--persistence)
- [Getting started](#getting-started)
- [Available scripts](#available-scripts)
- [Testing](#testing)
- [Linting](#linting)
- [Deployment (Cloudflare Pages)](#deployment-cloudflare-pages)
- [Build optimization](#build-optimization)

---

## Overview

Mari Belajar targets learners who want a guided path from computer science basics to production-oriented skills. All lesson prose, quiz prompts, and UI copy are in **Indonesian**, while code examples use common industry languages (JavaScript, TypeScript, Go, SQL, HTML/CSS, YAML, Bash).

The app is a **static single-page application (SPA)** built with React and Vite. Course content ships as typed TypeScript modules and is loaded on demand so initial page loads stay fast even as the catalog grows.

---

## Features

| Feature | Description |
|---------|-------------|
| **7 learning tracks** | Computer Science, JavaScript/TypeScript, Go, Frontend, Backend, Database, DevOps |
| **21 courses** | Three difficulty levels per track: basic/fundamental, intermediate, advanced |
| **Structured lessons** | Markdown sections, callouts, lists, and inline code examples grouped by difficulty level |
| **Chapter quizzes** | Multiple-choice questions with explanations; passing unlocks the next chapter |
| **References** | Curated external links (articles, docs, videos, books) per chapter |
| **Interactive visualizations** | Sorting algorithms, graph traversal, OS process states, memory layout, TCP handshake |
| **Syntax highlighting** | Code blocks rendered with `react-syntax-highlighter` |
| **Progress tracking** | Quiz scores and completed chapters stored in `localStorage` via Zustand |
| **Dark / light theme** | System-aware theme with manual toggle |
| **Responsive layout** | Mobile-friendly navigation with collapsible chapter sidebar |
| **Code splitting** | Each course bundle is a separate chunk for faster first paint |

---

## Curriculum

Courses are grouped into tracks and ordered from foundational to advanced topics.

### Computer Science

| Slug | Title |
|------|-------|
| `cs-fundamentals` | Computer Science / Informatics Fundamentals |
| `cs-intermediate` | Intermediate Computer Science |
| `cs-advanced` | Advanced Computer Science |

### JavaScript / TypeScript

| Slug | Title |
|------|-------|
| `js-ts-fundamental` | JavaScript & TypeScript Fundamentals |
| `js-ts-intermediate` | Intermediate JavaScript & TypeScript |
| `js-ts-advanced` | Advanced JavaScript & TypeScript |

### Go

| Slug | Title |
|------|-------|
| `go-fundamental` | Go Fundamentals |
| `go-intermediate` | Intermediate Go |
| `go-advanced` | Advanced Go |

### Frontend

| Slug | Title |
|------|-------|
| `frontend-basic` | Frontend Basics |
| `frontend-intermediate` | Intermediate Frontend |
| `frontend-advanced` | Advanced Frontend |

### Backend

| Slug | Title |
|------|-------|
| `backend-basic` | Backend Basics |
| `backend-intermediate` | Intermediate Backend |
| `backend-advanced` | Advanced Backend |

### Database

| Slug | Title |
|------|-------|
| `database-basic` | Database Basics |
| `database-intermediate` | Intermediate Database |
| `database-advanced` | Advanced Database |

### DevOps

| Slug | Title |
|------|-------|
| `devops-basic` | DevOps Basics |
| `devops-intermediate` | Intermediate DevOps |
| `devops-advanced` | Advanced DevOps |

Each course typically contains **8 chapters**. Chapter metadata, lessons, quizzes, and references live under `src/content/courses/<slug>/`.

---

## How learning works

1. **Browse tracks** on the home page or open the full course list at `/courses`.
2. **Open a course** to see its chapter outline and estimated duration.
3. **Read a lesson** — content is rendered from typed lesson sections (markdown, code, callouts, visualizations).
4. **Take the chapter quiz** at the bottom of the lesson page.
5. **Pass the quiz** to mark the chapter complete and unlock the next chapter in sequence.
6. **Progress persists** in the browser; clearing site data resets progress.

Chapter access is **sequential**: a chapter stays locked until the previous chapter's quiz is passed.

---

## Tech stack

| Layer | Technology |
|-------|------------|
| UI framework | [React 18](https://react.dev/) |
| Language | [TypeScript 5](https://www.typescriptlang.org/) |
| Build tool | [Vite 6](https://vite.dev/) |
| Routing | [React Router 6](https://reactrouter.com/) |
| Styling | [Tailwind CSS 3](https://tailwindcss.com/) |
| UI primitives | [Radix UI](https://www.radix-ui.com/) |
| Icons | [Lucide React](https://lucide.dev/) |
| Markdown | [react-markdown](https://github.com/remarkjs/react-markdown) + [remark-gfm](https://github.com/remarkjs/remark-gfm) |
| State | [Zustand 4](https://github.com/pmndrs/zustand) + [Immer](https://immerjs.github.io/immer/) |
| Testing | [Vitest 3](https://vitest.dev/) + [Testing Library](https://testing-library.com/) + [jsdom](https://github.com/jsdom/jsdom) |
| Linting | [Oxlint](https://oxc.rs/docs/guide/usage/linter.html) |
| Package manager | [pnpm](https://pnpm.io/) |

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│  React SPA (Vite)                                       │
│  ┌─────────────┐  ┌──────────────┐  ┌─────────────────┐ │
│  │ Pages       │  │ Components   │  │ Zustand store   │ │
│  │ Home        │  │ Layout       │  │ progress (LS)   │ │
│  │ CourseList  │  │ Lesson/Quiz  │  └─────────────────┘ │
│  │ CourseDetail│  │ Visualization│                       │
│  │ LessonPage  │  └──────────────┘                       │
│  └─────────────┘                                        │
│         │ dynamic import()                              │
│         ▼                                               │
│  ┌─────────────────────────────────────────────────────┐│
│  │ src/content/courses/<slug>/  (TypeScript modules) ││
│  └─────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────┘
```

- **Catalog metadata** (`courseMetas`, `courseTracks`) is statically imported for fast listing pages.
- **Full course payloads** (chapters, lessons, quizzes) are **lazy-loaded** per course slug via dynamic `import()` in `src/content/index.ts`.
- **Production bundles** split vendor libraries and each course into separate Rollup chunks (see [Build optimization](#build-optimization)).

---

## Project structure

```
mari-belajar/
├── public/
│   └── _redirects          # SPA fallback for static hosts (/* → / 200)
├── scripts/                # Content generation & validation utilities
├── src/
│   ├── App.tsx             # Root router and lazy page loading
│   ├── components/
│   │   ├── common/         # Shared UI (loading fallbacks)
│   │   ├── course/         # Course cards, track cards, course list
│   │   ├── layout/         # App shell, nav, footer, sidebar
│   │   ├── lesson/         # Markdown, code blocks, breadcrumbs
│   │   ├── progress/       # Progress badges and indicators
│   │   ├── quiz/           # Quiz panel and options
│   │   ├── ui/             # Reusable Radix/Tailwind primitives
│   │   └── visualization/  # Interactive lesson diagrams
│   ├── content/
│   │   ├── course-catalog.ts   # Track definitions and course registry
│   │   ├── index.ts            # Lazy loaders and navigation helpers
│   │   ├── types.ts            # Content & progress TypeScript types
│   │   └── courses/
│   │       └── <course-slug>/
│   │           ├── meta.ts         # Course metadata (no chapters)
│   │           ├── index.ts        # Full course export
│   │           └── chapters/
│   │               └── <chapter-slug>/
│   │                   ├── index.ts       # Chapter assembly
│   │                   ├── lesson.ts      # Lesson sections
│   │                   ├── quiz.ts        # Quiz questions
│   │                   └── references.ts  # External links
│   ├── lib/                # Shared helpers (quiz evaluation, lesson prep)
│   ├── pages/              # Route-level page components
│   ├── stores/
│   │   └── progressStore.ts
│   └── test/
│       └── e2e/            # Integration smoke tests
├── vite.config.ts          # Aliases, manual chunk splitting
├── vitest.config.ts
├── tsconfig.json           # Project references (app + node)
└── package.json
```

---

## Content model

All content types are defined in `src/content/types.ts`.

### Course

```ts
interface Course {
  id: string
  slug: string
  title: string
  description: string
  chapters: Chapter[]
  estimatedHours?: number
  tags?: string[]
}
```

### Chapter

Each chapter includes metadata, a lesson, a quiz, and optional references:

```ts
interface Chapter {
  id: string
  slug: string
  order: number
  title: string
  summary: string
  learningObjectives?: string[]
  summaryPoints?: string[]
  lesson: Lesson
  quiz: Quiz
  references?: Reference[]
}
```

### Lesson sections

Lessons are arrays of typed sections:

| Section type | Purpose |
|--------------|---------|
| `markdown` | Prose with GFM support (tables, lists, emphasis) |
| `code-example` | Syntax-highlighted code with optional filename and explanation |
| `callout` | Info, warning, or tip boxes |
| `list` | Bullet lists |
| `visualization` | Embedded interactive diagram |

Markdown sections carry a `level` field: `basic`, `intermediate`, or `advanced`.

### Quiz

```ts
interface Quiz {
  questions: Question[]   // multiple choice
  passingScore: number    // minimum correct answers to pass
}
```

---

## Authoring course content

To add or edit content:

1. **Create or update course metadata** in `src/content/courses/<slug>/meta.ts`.
2. **Add chapter modules** under `chapters/<chapter-slug>/` with `lesson.ts`, `quiz.ts`, and `references.ts`.
3. **Export the chapter** from `chapters/<chapter-slug>/index.ts`.
4. **Register the chapter** in the course's `index.ts` and `chapters/index.ts`.
5. **Register the course** in `src/content/course-catalog.ts` and `src/content/index.ts` loaders.
6. **Add a manual chunk** entry in `vite.config.ts` if you introduce a new course slug (keeps bundle splitting predictable).

Run validation and type checks before committing:

```bash
pnpm validate-content   # structural checks on course content
pnpm typecheck
pnpm test
```

> **Note:** Lesson and quiz copy should remain in **Bahasa Indonesia** to match the platform's audience.

---

## Interactive visualizations

Lessons can embed visualizations via the `visualization` section type. Supported components (`VisualizationComponentId`):

| ID | Component | Topic |
|----|-----------|-------|
| `sort` | `SortVisualizer` | Sorting algorithms (bubble, merge) |
| `graph-bfs` | `GraphTraversalVisualizer` | Breadth-first search |
| `graph-dfs` | `GraphTraversalVisualizer` | Depth-first search |
| `process-state` | `ProcessStateDiagram` | OS process lifecycle |
| `memory-layout` | `MemoryLayoutDiagram` | Program memory segments |
| `tcp-handshake` | `TcpHandshakeDiagram` | TCP three-way handshake |

Visualizations respect `prefers-reduced-motion` for accessibility.

---

## Routing

| Path | Page | Description |
|------|------|-------------|
| `/` | Home | Hero, track overview, quick stats |
| `/courses` | Course list | All courses grouped by track |
| `/courses/:courseId` | Course detail | Chapter list with lock/completion state |
| `/courses/:courseId/:chapterId` | Lesson | Lesson content + quiz |
| `*` | Not found | 404 page |

`public/_redirects` maps all paths to `index.html` with HTTP 200 so client-side routing works on static hosts like Cloudflare Pages.

---

## Progress & persistence

Progress is managed by `src/stores/progressStore.ts` using Zustand's `persist` middleware.

| Stored data | Key | Description |
|-------------|-----|-------------|
| Completed chapter IDs | per course | Chapters passed via quiz |
| Quiz attempts | per course | Score, answers, timestamp, pass/fail |
| Schema version | global | Enables future migrations |

Storage key: `mari-belajar-progress` in `localStorage`.

---

## Getting started

### Prerequisites

- **Node.js** 20+ recommended (Vite 6 requires Node ≥ 18.20)
- **pnpm** 9+

### Install and run

```bash
git clone <repository-url>
cd mari-belajar
pnpm install
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173).

### Production preview locally

```bash
pnpm build
pnpm preview
```

---

## Available scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start Vite dev server with HMR |
| `pnpm build` | Run TypeScript project build, then Vite production build → `dist/` |
| `pnpm preview` | Serve the production build locally |
| `pnpm test` | Run Vitest test suite once |
| `pnpm test:watch` | Run Vitest in watch mode |
| `pnpm lint` | Lint `src/` with Oxlint |
| `pnpm typecheck` | Type-check without emitting files |
| `pnpm validate-content` | Validate course content structure and language rules |

---

## Testing

Tests live in `src/test/` and use Vitest with jsdom.

```bash
pnpm test
```

The E2E-style integration suite (`src/test/e2e/mari-belajar-m1.e2e.test.tsx`) covers:

- Homepage → course list → chapter navigation
- Lesson and quiz rendering
- Quiz pass/fail flows and chapter unlock behavior
- Direct deep-link navigation to lesson routes
- Smoke tests across multiple courses and chapters

Tests reset the progress store before each scenario to avoid cross-test pollution.

---

## Linting

```bash
pnpm lint
```

Configuration: `.oxlintrc.json` (Oxlint).

For stricter, type-aware rules in production workflows, consider enabling Oxlint's TypeScript plugin — see the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules).

---

## Deployment (Cloudflare Pages)

This project uses **Vite 6**. Cloudflare Wrangler 4 requires Vite ≥ 6.0.0 for automatic framework configuration.

### Option A — Cloudflare Pages dashboard (recommended for static SPA)

| Setting | Value |
|---------|-------|
| **Framework preset** | None (or Vite if available) |
| **Build command** | `pnpm run build` |
| **Build output directory** | `dist` |
| **Node.js version** | `20` (or newer) |
| **Package manager** | pnpm |

Ensure `public/_redirects` is included in the build output so SPA routes resolve correctly:

```
/* /index.html 200
```

(Current file uses `/* / 200`, which also works on Cloudflare Pages.)

### Option B — Wrangler CLI

```bash
pnpm run build
npx wrangler deploy
```

Wrangler auto-detects the Vite framework when `vite` ≥ 6 is present in `devDependencies`.

### Troubleshooting

| Error | Fix |
|-------|-----|
| `Vite version ... cannot be automatically configured` | Upgrade to Vite 6+ (`pnpm add -D vite@^6`) |
| 404 on direct URL refresh | Add or verify `public/_redirects` SPA fallback |
| Build fails on Node 18 | Use Node 20+ in Pages build settings |

---

## Build optimization

`vite.config.ts` configures **manual Rollup chunks** to keep initial bundles small:

- **Vendor chunks** — `react`, `react-router-dom`, Radix UI, syntax highlighter
- **Per-course chunks** — one async chunk per course slug (e.g. `course-cs-fundamentals`)

This means users only download content for the course they open, not the entire catalog.

Typical production output includes ~30+ JS chunks; the main entry stays under ~25 kB gzip while individual course chunks range from ~25–40 kB gzip depending on content size.

---

## License

Private project — see repository owner for usage terms.
