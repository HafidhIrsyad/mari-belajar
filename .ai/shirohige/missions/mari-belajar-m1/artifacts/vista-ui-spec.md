# Vista UI Spec — Mari Belajar Milestone 1

## 1. Mission Context

Mari Belajar is a learning management system (LMS) for software engineering. Milestone 1 delivers the scaffold and one sample chapter. The UI must support:

- Reading-heavy lesson content (markdown prose, code examples).
- Interactive quizzes with strict gating (100% correct to unlock the next chapter).
- Clear progress signaling for locked / unlocked / completed chapters.
- Static SPA deployment on Cloudflare Pages (client-side routing only).

Tech stack: React 18 + TypeScript + Vite + Tailwind CSS + shadcn/ui + Zustand + React Router DOM.

---

## 2. Pages / Screens

| # | Page | Route | Purpose |
|---|------|-------|---------|
| 1 | **Homepage** | `/` | Welcome visitors, communicate value proposition, preview course catalog, drive user to start learning. |
| 2 | **Course List Page** | `/courses` | Show all learning paths / modules. Surface completion summary per course. Entry point for a chapter. |
| 3 | **Lesson Page** | `/courses/:courseId/:chapterId` | Display a single chapter: breadcrumb, progress, lesson content, code examples, and quiz at bottom. |
| 4 | **Not Found Page** | `*` | Friendly 404 fallback for unknown deep links. |

No dedicated `/quiz` route — the quiz is embedded inside the Lesson Page, because gating is chapter-scoped and the quiz is the terminal action of a lesson.

---

## 3. Key Components per Page

### 3.1 Homepage (`/`)

| Component | Responsibility |
|-----------|----------------|
| `HeroSection` | Large headline + subheadline, primary CTA to `/courses`, secondary CTA to continue last lesson (if progress exists). |
| `ValueProposition` | 3 short cards explaining how the platform teaches: Basic → Intermediate → Advanced, code examples, and mastery quizzing. |
| `CoursePreview` | Compact list of upcoming phases with icons, short descriptions, and a disabled/locked visual for future milestones. |
| `Footer` | Links, attribution, theme toggle. |

### 3.2 Course List Page (`/courses`)

| Component | Responsibility |
|-----------|----------------|
| `CourseCard` | Card per course/phase. Shows title, description, total chapters, completed chapters, and CTA state (Start / Continue / Locked). |
| `CourseList` | Responsive grid wrapper around `CourseCard`. |
| `ProgressSummary` | Mini progress ring/bar per course using stored progress. |

### 3.3 Lesson Page (`/courses/:courseId/:chapterId`)

| Component | Responsibility |
|-----------|----------------|
| `LessonShell` | Layout wrapper with sidebar + main content area. Handles responsive collapse. |
| `LessonHeader` | Chapter title, course title, estimated read time, difficulty tag (Basic / Intermediate / Advanced). |
| `BreadcrumbNav` | `Home / Courses / {Course} / {Chapter}`. Uses React Router links. |
| `ProgressIndicator` | Visual bar showing progress within the current course (completed chapters vs total). |
| `MarkdownContent` | Renders markdown prose. Delegates code blocks to `CodeBlock`. |
| `CodeBlock` | Syntax-highlighted JS / TS / Go code examples with language label and copy-to-clipboard. |
| `QuizPanel` | Self-contained quiz flow: questions list, feedback per answer, submit, score display, unlock CTA. |
| `PrevNextNav` | Footer navigation: previous chapter, next chapter (locked until 100% quiz score), back to course. |
| `ChapterSidebar` | List of chapters in current course with lock/unlock/completed icons; current chapter highlighted. |

### 3.4 Global / Shared Components

| Component | Responsibility |
|-----------|----------------|
| `AppShell` | Persistent layout: top navigation, main scroll region, skip-to-content. |
| `TopNavigation` | Logo, nav links (Home, Courses), theme toggle, mobile menu trigger. |
| `MobileMenu` | Sheet/drawer menu for small screens. Mirrors desktop links. |
| `ThemeToggle` | Switch between light / dark / system mode. |
| `StatusBadge` | Reusable locked / unlocked / completed badge. |
| `EmptyState` | Friendly placeholder when data is missing. |

---

## 4. User Flow

```
┌─────────────┐      ┌───────────────┐      ┌─────────────────────────────┐
│  Homepage   │─────▶│  Course List  │─────▶│   Lesson Page (chapter N)   │
│     /       │      │    /courses   │      │ /courses/:courseId/:chapId  │
└─────────────┘      └───────────────┘      └─────────────────────────────┘
       │                                              │
       │ Resume last lesson                           │ Read content
       └──────────────────────────────────────────────┘
                                                      │
                                                      ▼
                                            ┌───────────────────┐
                                            │    Quiz Panel     │
                                            │  answer → submit  │
                                            └───────────────────┘
                                                      │
                                    ┌─────────────────┴─────────────────┐
                                    │                                   │
                                    ▼                                   ▼
                            ┌───────────────┐                  ┌───────────────┐
                            │  Score < 100% │                  │  Score = 100% │
                            │ Show review   │                  │ Mark complete │
                            │ Retry allowed │                  │ Unlock next   │
                            └───────────────┘                  └───────────────┘
                                                                    │
                                                                    ▼
                                                           ┌────────────────┐
                                                           │ Next lesson or │
                                                           │ course summary │
                                                           └────────────────┘
```

### Flow notes

- From Homepage, primary CTA goes to Course List.
- From Course List, only the first unlocked chapter is clickable; locked chapters are visually disabled.
- On Lesson Page, the chapter content is scroll-readable; the quiz sits at the bottom.
- Quiz can be retried until 100% is achieved.
- On 100% score, the chapter is marked completed and the next chapter unlocks in both the sidebar and `PrevNextNav`.
- If no next chapter exists, show a course-completion CTA.
- All routes are client-side; deep links (e.g., shared lesson URL) must load correctly via Cloudflare Pages `_redirects`.

---

## 5. Design System Recommendations

See companion file `vista-design-system.md` for token values. High-level direction:

- **Personality**: Clean, focused, trustworthy. Education-first, not entertainment.
- **Color**: Primary indigo/teal gradient to suggest learning and growth. Neutrals are warm gray. Success green for completion, amber for locked/next, red for errors.
- **Typography**: Readable sans-serif for UI and body; monospaced font for code blocks.
- **Mode**: Light default with full dark-mode support via CSS variables / Tailwind `dark:` classes.
- **Density**: Medium density; generous line-height and paragraph spacing for long reading.
- **Motion**: Subtle transitions only; respect `prefers-reduced-motion`.

---

## 6. shadcn/ui Usage

Use shadcn/ui primitives as the foundation. Do not override base tokens unless the design system says so.

| shadcn Component | Where It Is Used |
|------------------|------------------|
| `Button` | CTAs, quiz submit, next/previous navigation, retry. |
| `Card` | Course cards, value proposition cards, quiz summary card. |
| `Badge` | Difficulty tags, locked/unlocked/completed states. |
| `Progress` | Course progress bar, lesson progress bar. |
| `Separator` | Between sections, sidebar dividers. |
| `ScrollArea` | Chapter sidebar on desktop. |
| `Sheet` | Mobile navigation menu. |
| `Tooltip` | Icon-only buttons (copy code, lock reason). |
| `Alert` | Quiz failure / success messages. |
| `Skeleton` | Loading placeholders for content. |
| `DropdownMenu` | Theme toggle menu (light / dark / system). |

### Custom components to build

| Custom Component | Why Custom |
|------------------|------------|
| `MarkdownContent` | Needs markdown parsing + custom code renderer. |
| `CodeBlock` | Needs syntax highlighting (Prism / Shiki), language label, copy button. |
| `QuizPanel` | Domain-specific state machine: answer selection, per-question feedback, scoring, gating. |
| `ChapterSidebar` | Needs progress-aware lock/unlock/completed icons. |
| `BreadcrumbNav` | Router-aware and course/chapter label aware. |
| `PrevNextNav` | Quiz-gate aware. |
| `ProgressSummary` | Combines multiple progress values into a ring or stacked bar. |

---

## 7. Responsive Considerations

### Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px – 1024px
- **Desktop**: > 1024px

### Layout behavior

| Element | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| Top nav | Hamburger menu + logo only | Logo + links, collapsed menu optional | Full horizontal links + theme toggle |
| Homepage | Single column, stacked sections | 2-column value prop grid | 3-column value prop grid |
| Course list | 1-column cards | 2-column grid | 3-column grid |
| Lesson page | Sidebar becomes top sheet/dropdown or hidden; main content full-width | Collapsible sidebar toggle | Fixed left sidebar (280px), main content scrolls |
| Code blocks | Horizontal scroll, smaller font | Horizontal scroll | Full width with copy button visible |
| Quiz | Vertical stack of questions | Same as mobile | Same as mobile; avoid multi-column forms for accessibility |

### Touch / accessibility

- Minimum tap target: 44 × 44 px.
- Quiz options use large radio-card style for easy touch selection.
- Sidebar uses sticky positioning on desktop; becomes a drill-down on mobile.
- Focus rings always visible and high-contrast.
- `prefers-reduced-motion`: disable transitions and auto-scroll.

---

## 8. Navigation Structure

### Header (persistent)

- Left: Logo + brand name "Mari Belajar" (links to `/`).
- Center / right:
  - Nav link: Courses (`/courses`).
  - Optional: Continue learning (shows only if local progress exists).
  - Theme toggle.
- Mobile: Hamburger opens a Sheet containing the same links.

### Sidebar (lesson page only, desktop)

- Course title.
- Chapter list with status icon per item:
  - `CircleCheck` = completed.
  - `PlayCircle` = current / unlocked.
  - `Lock` = locked.
- Current chapter highlighted.
- Collapsible on tablet; hidden on mobile (replaced by top chapter dropdown or Sheet).

### Footer (global)

- Minimal: copyright, GitHub/source link placeholder, theme toggle duplicate.
- Kept short so lesson pages remain focused.

---

## 9. State-Driven UI Notes

- **Locked chapter**: Card / sidebar item shows lock icon, muted color, no link (or link that shows a tooltip explaining the unlock condition).
- **Unlocked chapter**: Active color, clickable, shows "Start" or "Continue" label.
- **Completed chapter**: Checkmark icon, success color, shows "Review" label.
- **Quiz state**: Before submit, feedback per option is hidden. After submit, correct/incorrect icons appear per option and an explanatory message is shown. Retry button resets only the quiz state, not progress.
- **100% gate**: Next-chapter button in `PrevNextNav` and sidebar remain disabled until the current quiz is passed with a perfect score.

---

## 10. Asset Guardrails

- No custom illustrations or photographs are required for Milestone 1.
- Use Lucide icons (bundled with shadcn/ui) for all iconography.
- If future milestones add imagery, placeholders must be clearly marked as out of scope.
