# Mari Belajar — UI/UX Design Specification

## 1. Overview

**Project:** Mari Belajar  
**Scope:** Milestone 1 UI/UX redesign  
**Direction:** Warm Editorial / Buku Catatan Digital  
**Primary Typeface:** Plus Jakarta Sans  
**Goal:** Replace the generic shadcn/ui SaaS aesthetic with a warm, editorial, human learning experience optimized for long-form reading in Bahasa Indonesia.

---

## 2. Design Philosophy

### Why Warm Editorial?
The original UI suffered from the common "AI-generated" look: default Inter font, indigo/teal gradient hero, gray muted backgrounds, rounded cards with shadows, and excessive `font-extrabold` + `tracking-tight`. This redesign aims for:

- **Readability first**: Typography is the hero, not decoration.
- **Human warmth**: Cream backgrounds, organic spacing, and approachable colors reduce learning fatigue.
- **Editorial structure**: Clear hierarchy, generous whitespace, and left-aligned compositions feel like a quality textbook or learning journal.
- **Distinctiveness**: Avoid default shadcn patterns (gradients, heavy shadows, center-everything, Inter).

### Anti-Patterns to Avoid
- No gradient backgrounds.
- No drop shadows on cards (use subtle borders instead).
- No `font-extrabold` / 800 weights.
- No center-aligned hero text.
- No pure white `#FFFFFF` page background.
- No overly rounded corners (keep radius at 8px / `0.5rem`).

---

## 3. Color Palette

### Light Mode

| Token | HSL | Hex | Usage |
|---|---|---|---|
| `background` | `45 33% 97%` | `#FAF8F3` | Page background |
| `foreground` | `220 25% 18%` | `#242A36` | Primary text |
| `muted` | `45 20% 92%` | `#F2EEE4` | Muted backgrounds, inline code |
| `muted-foreground` | `220 12% 42%` | `#5E6572` | Secondary text, captions |
| `card` | `0 0% 100% / 0.65` | `rgba(255,255,255,0.65)` | Card surfaces on cream |
| `card-foreground` | `220 25% 18%` | `#242A36` | Text on cards |
| `popover` | `0 0% 100%` | `#FFFFFF` | Dropdowns, sheets |
| `primary` | `168 60% 34%` | `#228C73` | CTA, links, active states |
| `primary-foreground` | `0 0% 100%` | `#FFFFFF` | Text on primary |
| `secondary` | `38 72% 50%` | `#D9951B` | Accent, badges, completion |
| `secondary-foreground` | `220 25% 18%` | `#242A36` | Text on secondary |
| `border` | `45 15% 85%` | `#E2DCD0` | Borders, dividers |
| `ring` | `168 60% 34%` | `#228C73` | Focus rings |
| `success` | `158 55% 38%` | `#2D9E6E` | Correct answers, completed |
| `warning` | `38 80% 52%` | `#EBAC27` | Locked, retry |
| `destructive` | `0 65% 55%` | `#D9534F` | Wrong answers, errors |
| `code-bg` | `220 25% 18%` | `#1E293B` | Code block background |
| `code-fg` | `210 20% 92%` | `#E2E8F0` | Code block text |

### Dark Mode

| Token | HSL | Hex |
|---|---|---|
| `background` | `220 18% 10%` | `#151920` |
| `foreground` | `45 20% 92%` | `#F2EEE4` |
| `muted` | `220 15% 18%` | `#222934` |
| `muted-foreground` | `220 10% 60%` | `#8B92A0` |
| `card` | `220 15% 14%` | `#1E242C` |
| `primary` | `168 55% 50%` | `#3CC0A0` |
| `secondary` | `38 75% 60%` | `#EBB84A` |
| `border` | `220 12% 25%` | `#333A45` |

### Color Proportion (60/30/10)
- **60%** cream background + dark foreground
- **30%** white/off-white card surfaces
- **10%** primary teal + secondary amber accents

---

## 4. Typography System

### Typeface
- **Primary:** `Plus Jakarta Sans` (weights: 400, 500, 600, 700)
- **Monospace:** `JetBrains Mono` or `Fira Code` (for code blocks and inline code)
- **Fallback stack:** `'Plus Jakarta Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`

### Why Plus Jakarta Sans?
Designed by Gumpita Rahayu (Tokotype), originally commissioned for the +Jakarta City of Collaboration identity. It is:
- Geometric-humanist with subtle warmth
- High x-height and open counters → excellent screen readability
- Distinctive enough to avoid generic SaaS feel
- Free on Google Fonts, efficient file size

### Modular Scale (Major Third, ratio 1.25)

| Token | Desktop Size | Mobile Size | Line Height | Weight | Letter Spacing | Usage |
|---|---|---|---|---|---|---|
| `display` | `clamp(2.5rem, 5vw, 3.25rem)` | 32–40px | 1.1 | 700 | -0.01em | Homepage hero |
| `h1` | `clamp(2rem, 4vw, 2.5rem)` | 28px | 1.15 | 700 | -0.005em | Page title |
| `h2` | `clamp(1.5rem, 3vw, 1.75rem)` | 22px | 1.2 | 600 | -0.005em | Section heading |
| `h3` | `1.25rem` | 20px | 1.3 | 600 | 0 | Chapter sub-heading |
| `h4` | `1.125rem` | 18px | 1.35 | 600 | 0 | Card title |
| `body-large` | `1.125rem` | 18px | 1.7 | 400 | 0 | Hero description |
| `body` | `1.0625rem` | 17px | 1.7 | 400 | 0 | Lesson prose |
| `body-small` | `0.9375rem` | 15px | 1.6 | 400 | 0 | Captions, secondary |
| `label` | `0.875rem` | 14px | 1.5 | 500 | 0.01em | Buttons, nav, badges |

### Weight Rules
- **400 Regular:** Body text, descriptions.
- **500 Medium:** UI labels, navigation, captions, badges.
- **600 SemiBold:** Subheadings, card titles, question prompts.
- **700 Bold:** Page titles, hero headings.
- **Do not use** 300 (light) or 800 (extra-bold).

### Line Height Principles
- Body text: **1.7** (generous for long reading).
- Headings: **1.1–1.35** (tighter, cohesive as a unit).
- Captions/labels: **1.5–1.6**.

### Measure (Line Length)
- Lesson prose: **max-width `65ch`** (~45–75 characters).
- Hero description: **max-width `55ch`**.
- Section header: **max-width `50ch`**.

---

## 5. Layout & Spacing System

### Spacing Scale (4pt base)
Use semantic tokens, not pixel-named tokens.

```css
--space-1: 0.25rem;  /* 4px  */
--space-2: 0.5rem;   /* 8px  */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-5: 1.5rem;   /* 24px */
--space-6: 2rem;     /* 32px */
--space-7: 3rem;     /* 48px */
--space-8: 4rem;     /* 64px */
--space-9: 6rem;     /* 96px */
```

### Layout Rules
1. **Left-aligned heroes**: Hero text is left-aligned within a max-width container, horizontally centered as a block. Avoids generic centered-SaaS look.
2. **Vary spacing for hierarchy**: Large gaps between major sections, tighter gaps within components.
3. **Reading column**: Lesson content constrained to `65ch` for optimal measure.
4. **Sidebar**: Fixed `280px` on desktop, hidden on mobile (Sheet/drawer).
5. **Break the grid intentionally**: Pull quotes, callouts, and code blocks can extend slightly beyond the text column for visual interest.
6. **Use `gap` instead of margins** for sibling spacing.
7. **Responsive grid for cards**: `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))`.

### Page Layouts

#### Homepage
- Nav: sticky, full-width, `1rem` vertical padding.
- Hero: `6rem` top padding, `4rem` bottom, left-aligned text block.
- Value section: `4rem` vertical padding, left-aligned section header.
- Course preview card: below value cards with `4rem` separation.
- Footer: minimal, centered, small text.

#### Lesson Page
- Layout: sidebar (280px) + main content (flex-1).
- Main padding: `3rem` top/bottom, `2rem` horizontal on mobile.
- Content wrapper: `max-width: 65ch`, centered within main.
- Breadcrumb: small text, primary color for links.
- Lesson header: title + badges + meta, bottom border.
- Prose: H2, H3, paragraphs, lists, callouts, code blocks.
- Quiz section: top border separator, `3rem` top margin.
- Further Reading section: below quiz, top border separator.

#### Course List Page
- Container max-width `80rem`.
- Page header left-aligned.
- Course cards in single column or responsive grid.

---

## 6. Component Styling

### Card
```css
background: var(--card);
border: 1px solid var(--border);
border-radius: 0.5rem; /* 8px */
padding: 2rem;
box-shadow: none;
transition: transform 0.2s, border-color 0.2s;
```
On hover: `border-color: #D0C8B8; transform: translateY(-2px);`

### Button Primary
```css
background: var(--primary);
color: var(--primary-foreground);
border: 1.5px solid var(--primary);
border-radius: 0.5rem;
padding: 0.8125rem 1.625rem;
font-weight: 600;
font-size: 0.9375rem;
```
On hover: `background: #1B7360; border-color: #1B7360;`

### Button Secondary
```css
background: transparent;
color: var(--primary);
border: 1.5px solid var(--primary);
```
On hover: `background: rgba(34, 140, 115, 0.06);`

### Badge
```css
padding: 0.25rem 0.75rem;
border-radius: 9999px;
font-size: 0.75rem;
font-weight: 600;
```
- Basic: teal background, teal text
- Intermediate: amber background, amber text
- Advanced: dark subtle background, dark text

### Code Block
- Background: `#1E293B`
- Text: `#E2E8F0`
- Font: JetBrains Mono, 0.875rem, line-height 1.7
- Padding: 1.25rem
- Border radius: 0.5rem
- Header: language label + copy button
- Kept dark in both light and dark mode for consistency.

### Inline Code
```css
font-family: 'JetBrains Mono', monospace;
font-size: 0.875rem;
background: var(--muted);
padding: 0.125rem 0.375rem;
border-radius: 0.25rem;
color: var(--foreground);
```

### Callout
```css
background: rgba(34, 140, 115, 0.06);
border-left: 3px solid var(--primary);
border-radius: 0 0.5rem 0.5rem 0;
padding: 1.25rem;
```

### Quiz Option Card
```css
display: flex;
gap: 0.75rem;
padding: 1rem;
border: 1px solid var(--border);
border-radius: 0.5rem;
background: var(--card);
cursor: pointer;
```
Selected state: border turns primary, radio filled.
Correct state: border + background success.
Incorrect state: border + background destructive.

### Further Reading Card
```css
border: 1px solid var(--border);
border-radius: 0.5rem;
padding: 1.5rem;
background: var(--card);
```
Contains:
- Section title "Referensi Belajar Lebih Lanjut"
- List of links (title + short description + source type tag)
- External link indicator icon

---

## 7. Page-Specific Design

### Homepage
- Sticky nav with logo, links, theme toggle.
- Left-aligned hero with label pill, large heading, description, two CTAs.
- Section "Tiga tingkat kedalaman" with 3 value cards.
- Course preview card with CTA.
- Minimal footer.

### Course List Page
- Page title left-aligned.
- One card per course showing title, description, chapter count, estimated hours.
- Progress indicator on each card (if progress exists).

### Course Detail Page
- Course header with title, description, overall progress bar.
- Chapter list with status icons (locked, unlocked, completed).
- Clear sequential gating visual.

### Lesson Page
- Sidebar with chapter navigation.
- Breadcrumb.
- Lesson header with title, difficulty badges, read time.
- Prose content with Basic/Intermediate/Advanced sections.
- Code examples (JS, TS, Go).
- Callouts for key insights.
- Quiz panel (>5 questions, 4 options each).
- Further Reading section with curated external/internal resources.
- Prev/Next navigation.

---

## 8. Further Reading / References Section

### Placement
At the bottom of every lesson, after the quiz panel and before the Prev/Next navigation.

### Content Structure (per chapter)
```ts
interface Reference {
  title: string;
  url: string;
  description: string;
  type: 'article' | 'video' | 'book' | 'documentation' | 'interactive';
}
```

### UI
- Section title: "Referensi Belajar Lebih Lanjut" (H2).
- Intro text: "Bacaan dan sumber tambahan untuk memperdalam pemahamanmu."
- List of reference cards or simple link list.
- Each item shows:
  - Title (link, opens in new tab)
  - Short description
  - Type badge (Artikel, Video, Buku, Dokumentasi, Interaktif)
  - External link icon

### Examples for Chapter 1
1. **How Boolean Logic Works** — Computer Hope (article)
2. **Binary Numbers Explained** — Khan Academy (video)
3. **The Elements of Computing Systems** — Noam Nisan & Shimon Schocken (book)
4. **Inside the Machine** — Jon Stokes (book)
5. **Go by Example: Channels** — gobyexample.com (documentation)

---

## 9. Dark Mode

- Toggle in nav.
- Persist preference in localStorage.
- Default to system preference.
- Code blocks remain dark in both modes.
- All colors shift to dark palette; maintain contrast ratios.

---

## 10. Accessibility

- Minimum contrast 4.5:1 for body text.
- Minimum contrast 3:1 for large text/UI components.
- Focus ring: `2px solid var(--ring)` with `2px` offset.
- Touch targets minimum 44×44px.
- Semantic HTML: `<nav>`, `<main>`, `<article>`, `<aside>`, `<section>`.
- Quiz options use real radio inputs for screen readers.
- `prefers-reduced-motion` respected.
- `prefers-color-scheme` honored for default theme.

---

## 11. Implementation Notes

### Files to Modify
- `tailwind.config.js` — update font family, colors, spacing tokens.
- `src/index.css` — update CSS variables, prose utilities.
- `index.html` — load Plus Jakarta Sans and JetBrains Mono from Google Fonts.
- `src/components/ui/*` — adjust shadcn component defaults.
- `src/pages/*` — refactor page layouts and typography.
- `src/components/lesson/*` — update MarkdownContent, CodeBlock, add ReferenceList.
- `src/content/types.ts` — add `Reference` type to lesson/chapter.
- `src/content/courses/cs-fundamentals/chapters/ch-01-how-computers-work/*` — add references data.

### Fonts Loading Strategy
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```
Use `font-display: swap`.

### Verification Checklist
- [ ] All pages use Plus Jakarta Sans.
- [ ] No `font-extrabold` / 800 weights remain.
- [ ] Body text is 17px with line-height 1.7.
- [ ] Lesson content max-width is 65ch.
- [ ] Cards use flat borders, no shadows.
- [ ] Homepage hero is left-aligned.
- [ ] Color contrast passes WCAG AA.
- [ ] Further Reading section appears on sample chapter.
- [ ] Build passes with `pnpm run build`.

---

## 12. Mockups

Static HTML mockups are available at:

```
.ai/shirohige/missions/mari-belajar-m1/design-mocks/
├── warm-editorial-homepage.html
├── warm-editorial-homepage.png
├── warm-editorial-lesson.html
└── warm-editorial-lesson.png
```

---

*Approved direction: Warm Editorial (Option A) with Further Reading section.*
