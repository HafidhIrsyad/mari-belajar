# Vista Design System Reference — Mari Belajar

A concise, implementation-ready design token reference for the Mari Belajar Milestone 1 frontend.

---

## 1. Design Principles

1. **Clarity first** — Content (lessons and code) is the hero.
2. **Progressive disclosure** — Hide advanced details until the learner is ready.
3. **Accessible by default** — WCAG 2.1 AA contrast ratios, keyboard navigable, motion respectful.
4. **Light & dark parity** — Both modes are first-class, not an afterthought.

---

## 2. Color Palette

Use CSS variables mapped to Tailwind colors. Values below are semantic recommendations; map them to `hsl()` in the shadcn/ui theme file.

### Brand

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--primary` | `hsl(230 75% 55%)` | `hsl(217 91% 68%)` | Primary buttons, active nav, links |
| `--primary-foreground` | `hsl(0 0% 100%)` | `hsl(222 47% 11%)` | Text on primary |
| `--secondary` | `hsl(170 70% 40%)` | `hsl(168 65% 45%)` | Accent, completion, success highlights |
| `--accent` | `hsl(262 60% 55%)` | `hsl(263 70% 70%)` | Callouts, quiz active option |

### Neutrals

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--background` | `hsl(0 0% 100%)` | `hsl(222 47% 11%)` | Page background |
| `--foreground` | `hsl(222 47% 11%)` | `hsl(210 40% 98%)` | Primary text |
| `--card` | `hsl(0 0% 100%)` | `hsl(222 47% 14%)` | Card surfaces |
| `--card-foreground` | `hsl(222 47% 11%)` | `hsl(210 40% 98%)` | Text on cards |
| `--muted` | `hsl(210 40% 96%)` | `hsl(217 33% 17%)` | Muted backgrounds, code inline |
| `--muted-foreground` | `hsl(215 16% 47%)` | `hsl(215 20% 65%)` | Secondary text, captions |
| `--border` | `hsl(214 32% 91%)` | `hsl(217 33% 25%)` | Dividers, borders |
| `--ring` | `hsl(230 75% 55%)` | `hsl(217 91% 68%)` | Focus rings |

### Feedback

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--success` | `hsl(142 76% 36%)` | `hsl(142 71% 45%)` | Correct answer, completed chapter |
| `--warning` | `hsl(38 92% 50%)` | `hsl(45 93% 55%)` | Locked, retry, caution |
| `--destructive` | `hsl(0 84% 60%)` | `hsl(0 62% 55%)` | Incorrect answer, errors |

### Code blocks

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--code-bg` | `hsl(220 13% 18%)` | `hsl(220 13% 14%)` | Code block background |
| `--code-fg` | `hsl(220 14% 96%)` | `hsl(220 14% 96%)` | Code text |
| `--code-border` | `hsl(220 13% 28%)` | `hsl(220 13% 24%)` | Code block border |

---

## 3. Typography

| Element | Font | Weight | Size | Line Height |
|---------|------|--------|------|-------------|
| H1 (Hero) | Sans (UI) | 800 | `2.25rem` / `36px` | 1.1 |
| H2 | Sans | 700 | `1.875rem` / `30px` | 1.2 |
| H3 | Sans | 600 | `1.5rem` / `24px` | 1.3 |
| H4 | Sans | 600 | `1.25rem` / `20px` | 1.4 |
| Body | Sans | 400 | `1rem` / `16px` | 1.75 |
| Body small | Sans | 400 | `0.875rem` / `14px` | 1.6 |
| Caption | Sans | 500 | `0.75rem` / `12px` | 1.5 |
| Code | Mono | 400 | `0.875rem` / `14px` | 1.6 |
| Code block | Mono | 400 | `0.8125rem` / `13px` | 1.7 |

### Font stack recommendation

- **Sans**: `Inter`, `system-ui`, `-apple-system`, `BlinkMacSystemFont`, `"Segoe UI"`, `Roboto`, sans-serif.
- **Mono**: `"JetBrains Mono"`, `"Fira Code"`, `ui-monospace`, `SFMono-Regular`, `Menlo`, `Monaco`, monospace.

Load via Google Fonts or self-host only if added later. For Milestone 1, system fonts are acceptable.

---

## 4. Spacing Scale

Base unit: `4px`. Use Tailwind spacing tokens:

| Token | Value | Usage |
|-------|-------|-------|
| `space-1` | `0.25rem` / `4px` | Tight gaps |
| `space-2` | `0.5rem` / `8px` | Inline spacing |
| `space-3` | `0.75rem` / `12px` | Component internal padding |
| `space-4` | `1rem` / `16px` | Card padding, section gaps |
| `space-6` | `1.5rem` / `24px` | Major section gaps |
| `space-8` | `2rem` / `32px` | Page section padding |
| `space-12` | `3rem` / `48px` | Hero / large section spacing |
| `space-16` | `4rem` / `64px` | Page-level vertical rhythm |

### Layout

- **Max content width**: `80rem` / `1280px` (`max-w-7xl`).
- **Content reading width**: `48rem` / `768px` (`max-w-3xl`) for lesson prose.
- **Sidebar width**: `280px` fixed on desktop.
- **Page horizontal padding**: `1rem` mobile, `1.5rem` tablet, `2rem` desktop.

---

## 5. Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `rounded-sm` | `0.25rem` / `4px` | Tags, badges |
| `rounded-md` | `0.375rem` / `6px` | Inputs, small buttons |
| `rounded-lg` | `0.5rem` / `8px` | Cards, panels |
| `rounded-xl` | `0.75rem` / `12px` | Large cards, hero containers |
| `rounded-full` | `9999px` | Pills, avatars, progress bar caps |

---

## 6. Elevation / Shadows

Use Tailwind shadow utilities mapped to overlays.

| Token | Value | Usage |
|-------|-------|-------|
| `shadow-sm` | subtle | Cards in light mode |
| `shadow-md` | medium | Floating elements, dropdowns |
| `shadow-lg` | large | Mobile sheet, modal-like panels |
| `ring-2 ring-primary` | focus | Focus-visible states |

---

## 7. Icons

Use **Lucide React** exclusively.

| Meaning | Icon name |
|---------|-----------|
| Home | `Home` |
| Courses / book | `BookOpen` |
| Locked | `Lock` |
| Unlocked / play | `PlayCircle` |
| Completed | `CircleCheck` |
| Check | `Check` |
| Close / wrong | `X` |
| Copy code | `Copy` / `Check` (after copy) |
| Menu | `Menu` |
| Sun (light mode) | `Sun` |
| Moon (dark mode) | `Moon` |
| Monitor (system) | `Monitor` |
| Chevron left/right | `ChevronLeft` / `ChevronRight` |
| Trophy / success | `Trophy` |
| Rotate retry | `RotateCcw` |

---

## 8. Component-Specific Styles

### Course card

- Background: `card`.
- Border: `1px solid border`.
- Hover: `shadow-md`, translate-y `-2px`.
- Locked state: opacity `0.6`, remove hover lift.

### Chapter sidebar item

- Height: `44px` minimum for touch.
- Left border `3px` as active indicator.
- Icons sized `18px`.
- Locked item uses muted text and `Lock` icon.

### Code block

- Background: `code-bg`, color: `code-fg`.
- Padding: `1rem`.
- Border radius: `rounded-lg`.
- Top bar with language label + copy button.
- Horizontal scroll on overflow; no text wrapping.

### Quiz option card

- Default: bordered card, transparent background.
- Hover/focus: `ring-2 ring-primary`.
- Selected: `bg-primary/10 border-primary`.
- Correct after submit: `border-success bg-success/10`.
- Incorrect after submit: `border-destructive bg-destructive/10`.

### Progress bar

- Height: `8px`.
- Track: `muted`.
- Fill: gradient from `primary` to `secondary`.
- Rounded full.

---

## 9. Accessibility

- Minimum contrast ratio: `4.5:1` for normal text, `3:1` for large text/UI components.
- Focus-visible rings on all interactive elements.
- Use semantic HTML: `<main>`, `<nav>`, `<article>`, `<aside>`, `<section>`.
- Quiz options are `<label>` + `<input type="radio">` under the hood for screen-reader compatibility.
- Announce quiz results via an `aria-live="polite"` region.
- Respect `prefers-reduced-motion` for transitions and progress animations.

---

## 10. Dark Mode Strategy

- Implement via Tailwind `darkMode: "class"` on the root `<html>` element.
- Store user preference in `localStorage`; default to system preference.
- Avoid color inversion of code blocks; keep code surfaces dark in both modes for readability.
