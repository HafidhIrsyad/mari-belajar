# Mari Belajar — Milestone 2: Complete Phase 1 (CS Fundamentals ch-02–ch-08)

## Goal

Complete the **Computer Science / Informatics Fundamentals** course by replacing the placeholder chapters 2–8 with full lesson content, quizzes, and further-reading references. The course must remain playable end-to-end: each chapter unlocks only after the previous chapter's quiz is passed with 100%.

## Scope

| Chapter | ID | Title |
|---|---|---|
| 2 | `ch-02-number-systems-and-bits` | Sistem Bilangan dan Operasi Bit |
| 3 | `ch-03-algorithms-and-complexity` | Algoritma dan Kompleksitas |
| 4 | `ch-04-fundamental-data-structures` | Struktur Data Fundamental |
| 5 | `ch-05-os-and-process-management` | Sistem Operasi dan Manajemen Proses |
| 6 | `ch-06-networking-and-internet-protocols` | Jaringan Komputer dan Protokol Internet |
| 7 | `ch-07-databases-and-sql-basics` | Basis Data dan SQL Dasar |
| 8 | `ch-08-security-fundamentals` | Keamanan Informasi dan Praktik Terbaik |

## Structure per Chapter

Each chapter must follow the established pattern from `ch-01-how-computers-work`:

```
src/content/courses/cs-fundamentals/chapters/<chapter-dir>/
├── index.ts       # Chapter metadata + wiring
├── lesson.ts      # Lesson sections (markdown + code examples)
├── quiz.ts        # 8 multiple-choice questions, passingScore 8
└── references.ts  # 5 further-reading references
```

### Chapter Metadata (`index.ts`)

- `id`, `slug`, `order`, `title`, `summary`
- `estimatedMinutes`: 12–18 minutes
- `learningObjectives`: 4–6 bullets
- `summaryPoints`: 5–7 bullets
- `references`, `lesson`, `quiz`

### Lesson Content (`lesson.ts`)

Each lesson contains:
1. **Basic section** (markdown) — intuitive explanation, no heavy assumptions.
2. **Intermediate section** (markdown) — concrete application and data representation.
3. **Advanced section** (markdown) — connection to architecture, memory, or optimization.
4. **Three code examples**:
   - `javascript` example
   - `typescript` example
   - `go` example

Code examples must be relevant to the topic and include a short `explanation`. Use the existing `CodeExample` type.

### Quiz (`quiz.ts`)

- Exactly **8 questions**.
- `passingScore: 8` (100% to unlock next chapter).
- Each question has 4 options and 1 correct answer.
- Include an `explanation` for every question.
- Cover basic, intermediate, and advanced concepts.

### References (`references.ts`)

- Exactly **5 references**.
- Mix of `article`, `video`, `book`, `documentation`, `interactive`.
- All URLs must be publicly accessible (no affiliate or login-required links).

## Content Source

Use the existing Phase 1 curriculum outline at:
`.ai/shirohige/missions/mari-belajar-m1/artifacts/thatch-curriculum-phase1.md`

Expand each bullet into full narrative text. Do not copy the outline verbatim.

## Global Constraints (still apply)

- Lessons use the `prose-lesson` style.
- Code blocks render with syntax highlighting (JS/TS/Go).
- No secrets or copyrighted text.
- All content in Bahasa Indonesia.

## Acceptance Criteria

- All 7 chapters have complete `index.ts`, `lesson.ts`, `quiz.ts`, and `references.ts`.
- `src/content/courses/cs-fundamentals/chapters/index.ts` wires all chapters correctly.
- `pnpm run lint -- --max-warnings=0` passes.
- `pnpm run typecheck` passes.
- `pnpm run test` passes (5/5 E2E tests).
- `pnpm run build` succeeds and produces `dist/`.
- Direct access to `/courses/cs-fundamentals/ch-08-security-fundamentals` works.
- Quiz progression still requires 8/8 correct to unlock the next chapter.

## Out of Scope

- New UI components or design changes.
- New courses (Phase 2 onwards).
- Backend or deployment changes.
