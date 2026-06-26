# Sakazuki Plan — Mari Belajar Milestone 1

```yaml
mission: "Mari Belajar Milestone 1 — Scaffold & Core Engine"
domain: "lms"
tech_stack: "React 18 + TypeScript + Vite + Tailwind CSS + shadcn/ui + Zustand + React Router DOM + pnpm + Cloudflare Pages"
commanders:
  - name: "Marco"
    capability: ["planning", "dependency_resolution"]
    task: "Create the Sakazuki Plan and define project structure, tooling choices, and milestone boundaries. (Handled by Shirohige directly; skipped as separate agent.)"
    outputs: [".ai/shirohige/missions/mari-belajar-m1/plan.md"]
    depends_on: []
  - name: "Vista"
    capability: ["ui_research", "wireframe"]
    task: |
      Design the UI/UX foundation for the Mari Belajar website.
      Define design tokens, color scheme, typography, spacing, component architecture, and page layouts.
      Produce wireframes or structured descriptions for: homepage, course list page, lesson page, quiz component, and progress indicators.
      Ensure the design supports reading-heavy content (lessons) and interactive quiz flows.
      Specify how shadcn/ui components will be used and what custom components need to be built.
    outputs:
      - ".ai/shirohige/missions/mari-belajar-m1/artifacts/vista-ui-spec.md" (primary, per commander file)
      - ".ai/shirohige/missions/mari-belajar-m1/artifacts/vista-design-system.md" (additional)
    depends_on: []
  - name: "Jozu"
    capability: ["backend_design", "schema"]
    task: |
      Design the content engine and state management architecture.
      Define TypeScript types/interfaces for: Course, Chapter, Lesson, Quiz, Question, UserProgress.
      Design the Zustand store structure for progress tracking and quiz state.
      Define how content modules (TypeScript files) will be organized and loaded.
      Specify localStorage persistence strategy and hydration pattern.
      Design the quiz gating logic (100% correct to unlock next chapter).
    outputs:
      - ".ai/shirohige/missions/mari-belajar-m1/artifacts/jozu-schema.md" (primary, per commander file)
      - ".ai/shirohige/missions/mari-belajar-m1/artifacts/jozu-state-management.md" (additional)
    depends_on: []
  - name: "Thatch"
    capability: ["documentation", "business_flow"]
    task: |
      Document the business flow and curriculum plan for Mari Belajar.
      Produce the detailed content outline for Phase 1 (Computer Science / Informatics Fundamentals) with basic→intermediate→advanced depth.
      Write the full content script for the sample chapter: "Cara Kerja Komputer — Dari Bit sampai Program Berjalan".
      Include JS/TS/Go code examples, explanation structure, and a draft of 6-8 quiz questions with correct answers.
      Note where web research is needed (e.g., EXPLAIN ANALYZE in later chapters; not needed for Milestone 1 sample).
    outputs:
      - ".ai/shirohige/missions/mari-belajar-m1/artifacts/thatch-business-flow.md" (primary, per commander file)
      - ".ai/shirohige/missions/mari-belajar-m1/artifacts/thatch-curriculum-phase1.md" (additional)
      - ".ai/shirohige/missions/mari-belajar-m1/artifacts/thatch-sample-chapter-content.md" (additional)
    depends_on: []
  - name: "Ace"
    capability: ["scaffold", "implementation"]
    task: |
      Implement the full Milestone 1 codebase based on outputs from Vista, Jozu, and Thatch.
      Scaffold the React + Vite project with pnpm, Tailwind CSS, shadcn/ui, Zustand, and React Router DOM.
      Implement all pages and components: homepage, course list, lesson page, quiz engine, progress tracker.
      Implement the content engine using TypeScript modules.
      Implement the sample chapter content exactly as specified by Thatch.
      Configure Cloudflare Pages SPA redirect (`public/_redirects`).
      Ensure the build passes (`pnpm install` and `pnpm run build`).
    outputs:
      - "Full source code in working directory"
      - ".ai/shirohige/missions/mari-belajar-m1/artifacts/ace-implementation-notes.md"
    depends_on: ["Vista", "Jozu", "Thatch"]
  - name: "Izou"
    capability: ["qa", "e2e", "lint", "prod_ready_inspection"]
    task: |
      Verify the Milestone 1 deliverables.
      Run `pnpm install`, `pnpm run build`, and inspect the `dist/` output.
      Check that the deployment artifact is ready for Cloudflare Pages.
      Verify routing works including direct access to deep routes.
      Verify the sample lesson renders correctly, code examples display, quiz has >5 questions, and 100% pass gating works.
      Check for TypeScript errors, lint issues, and exposed secrets.
      Produce a QA report.
    outputs:
      - ".ai/shirohige/missions/mari-belajar-m1/artifacts/izou-qa-report.md"
    depends_on: ["Ace"]
  - name: "Kingdew"
    capability: ["bug_finding", "root_cause_analysis"]
    task: |
      Investigate any failures reported by Izou or unclear bugs during implementation.
      Reproduce the issue, identify root cause, and recommend the responsible commander to fix.
    outputs:
      - ".ai/shirohige/missions/mari-belajar-m1/artifacts/kingdew-bugfix-report.md"
    depends_on: []
```

## Phase Breakdown

### Phase 1 — Design & Architecture (Parallel)
- Vista: UI/UX design system + wireframes
- Jozu: Content schema + state management design
- Thatch: Curriculum docs + sample chapter content

### Phase 2 — Implementation (Sequential after Phase 1)
- Ace: Scaffold and implement the full project using Phase 1 artifacts

### Phase 3 — Quality Gate (Sequential after Ace)
- Izou: Build verification, functional verification, lint/type checks
- Kingdew: Triggered only if issues are unclear

## Constraints
- Package manager: `pnpm` only. No npm/yarn.
- Runtime: Node.js default; Bun-compatible scripts allowed.
- Deployment: Cloudflare Pages.
- No secrets exposed in code.
- Scope: Milestone 1 only (scaffold + 1 sample chapter).
