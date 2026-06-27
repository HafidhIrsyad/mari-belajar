# Mari Belajar — Milestone 2: Complete Phase 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the placeholder chapters 2–8 in the `cs-fundamentals` course with complete lesson content, quizzes, and references so the entire Phase 1 course is playable end-to-end.

**Architecture:** Each chapter is a self-contained TypeScript module under `src/content/courses/cs-fundamentals/chapters/<chapter-dir>/`. The chapter exports a single `Chapter` object from `index.ts`, composed from `lesson.ts`, `quiz.ts`, and `references.ts`. Existing course wiring in `src/content/courses/cs-fundamentals/index.ts` already imports these exports by name; each task must preserve its export name.

**Tech Stack:** React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui, react-syntax-highlighter, Zustand, React Router DOM, pnpm.

## Global Constraints

- All lesson content is in Bahasa Indonesia.
- Each chapter lesson has basic → intermediate → advanced sections plus JS/TS/Go code examples.
- Each quiz has exactly 8 questions, `passingScore: 8`, 4 options per question, with explanations.
- Each chapter has exactly 5 references with types: article, video, book, documentation, interactive (mix).
- No secrets, copyrighted text, or login-required URLs.
- All changes must pass: `pnpm run lint -- --max-warnings=0`, `pnpm run typecheck`, `pnpm run test`, `pnpm run build`.

## File Map

| File | Responsibility |
|---|---|
| `src/content/courses/cs-fundamentals/chapters/ch-02-number-systems-and-bits/index.ts` | Chapter metadata + wiring |
| `src/content/courses/cs-fundamentals/chapters/ch-02-number-systems-and-bits/lesson.ts` | Lesson sections + code examples |
| `src/content/courses/cs-fundamentals/chapters/ch-02-number-systems-and-bits/quiz.ts` | 8 quiz questions |
| `src/content/courses/cs-fundamentals/chapters/ch-02-number-systems-and-bits/references.ts` | 5 further-reading references |
| `src/content/courses/cs-fundamentals/chapters/ch-03-*` through `ch-08-*` | Same pattern as ch-02 |
| `src/content/types.ts` | Existing `Lesson`, `Quiz`, `Reference`, `Chapter`, `CodeExample` types |

---

## Task 1: Implement Chapter 2 — Sistem Bilangan dan Operasi Bit

**Files:**
- Modify: `src/content/courses/cs-fundamentals/chapters/ch-02-number-systems-and-bits/index.ts`
- Create: `src/content/courses/cs-fundamentals/chapters/ch-02-number-systems-and-bits/lesson.ts`
- Create: `src/content/courses/cs-fundamentals/chapters/ch-02-number-systems-and-bits/quiz.ts`
- Create: `src/content/courses/cs-fundamentals/chapters/ch-02-number-systems-and-bits/references.ts`

**Interfaces:**
- Produces: `ch02NumberSystemsAndBits: Chapter`

- [ ] **Step 1: Write `lesson.ts`**

Create `lesson.ts` with a `Lesson` object containing:
- Basic markdown section: desimal, biner, oktal, heksadesimal, konversi antar sistem bilangan, mengapa programmer perlu heksadesimal.
- Intermediate markdown section: operasi bitwise AND, OR, XOR, NOT; bit shift left/right; bit mask dan flag.
- Advanced markdown section: two's complement, IEEE 754 intro, overflow/underflow.
- Code examples:
  - JS: `parseInt("FF", 16)`, `.toString(16)`, bit mask manipulation.
  - TS: generic type for base conversion with input validation.
  - Go: bit flags using `iota` and bitmask constants.

- [ ] **Step 2: Write `quiz.ts`**

Create `quiz.ts` with exactly 8 questions covering basic/intermediate/advanced topics. Example question:
```ts
{
  id: 'q-02-01',
  order: 1,
  prompt: 'Berapa nilai desimal dari heksadesimal `0x1A`?',
  options: ['16', '26', '32', '42'],
  correctOptionIndex: 1,
  explanation: '0x1A = 1×16 + 10 = 26 dalam desimal.',
}
```

- [ ] **Step 3: Write `references.ts`**

Create `references.ts` with 5 references (mix of article/video/book/documentation/interactive). Example:
```ts
{
  id: 'ref-02-01',
  title: 'Binary and Hexadecimal Number Systems',
  url: 'https://www.khanacademy.org/math/algebra-home/alg-intro-to-algebra/algebra-alternate-number-bases/v/number-systems-introduction',
  description: 'Video penjelasan sistem bilangan biner dan heksadesimal.',
  type: 'video',
}
```

- [ ] **Step 4: Update `index.ts`**

Replace the placeholder `createPlaceholderChapter` call with a full `Chapter` object that imports `ch02Lesson`, `ch02Quiz`, `ch02References`. Preserve the export name `ch02NumberSystemsAndBits`.

- [ ] **Step 5: Run checks**

```bash
pnpm run lint -- --max-warnings=0
pnpm run typecheck
pnpm run test
```

Expected: All pass.

- [ ] **Step 6: Commit**

```bash
git add src/content/courses/cs-fundamentals/chapters/ch-02-number-systems-and-bits/
git commit -m "feat(content): add chapter 2 - number systems and bits"
```

---

## Task 2: Implement Chapter 3 — Algoritma dan Kompleksitas

**Files:**
- Modify: `src/content/courses/cs-fundamentals/chapters/ch-03-algorithms-and-complexity/index.ts`
- Create: `src/content/courses/cs-fundamentals/chapters/ch-03-algorithms-and-complexity/lesson.ts`
- Create: `src/content/courses/cs-fundamentals/chapters/ch-03-algorithms-and-complexity/quiz.ts`
- Create: `src/content/courses/cs-fundamentals/chapters/ch-03-algorithms-and-complexity/references.ts`

**Interfaces:**
- Produces: `ch03AlgorithmsAndComplexity: Chapter`

- [ ] **Step 1: Write `lesson.ts`**

Create `lesson.ts` with:
- Basic: definisi algoritma, pseudocode, flowchart, input/proses/output.
- Intermediate: linear search, binary search, bubble/insertion/selection sort, best/average/worst case.
- Advanced: Big-O notation, recursion, base case, memoization.
- Code examples:
  - JS: linear search and bubble sort implementations.
  - TS: generic binary search with type `T`.
  - Go: recursive fibonacci + memoization with `map`.

- [ ] **Step 2: Write `quiz.ts`**

8 questions covering definitions, search/sort algorithms, Big-O, recursion, memoization.

- [ ] **Step 3: Write `references.ts`**

5 references about algorithms and complexity analysis.

- [ ] **Step 4: Update `index.ts`**

Replace placeholder with full `Chapter` object. Preserve export name `ch03AlgorithmsAndComplexity`.

- [ ] **Step 5: Run checks**

```bash
pnpm run lint -- --max-warnings=0
pnpm run typecheck
pnpm run test
```

- [ ] **Step 6: Commit**

```bash
git add src/content/courses/cs-fundamentals/chapters/ch-03-algorithms-and-complexity/
git commit -m "feat(content): add chapter 3 - algorithms and complexity"
```

---

## Task 3: Implement Chapter 4 — Struktur Data Fundamental

**Files:**
- Modify: `src/content/courses/cs-fundamentals/chapters/ch-04-fundamental-data-structures/index.ts`
- Create: `src/content/courses/cs-fundamentals/chapters/ch-04-fundamental-data-structures/lesson.ts`
- Create: `src/content/courses/cs-fundamentals/chapters/ch-04-fundamental-data-structures/quiz.ts`
- Create: `src/content/courses/cs-fundamentals/chapters/ch-04-fundamental-data-structures/references.ts`

**Interfaces:**
- Produces: `ch04FundamentalDataStructures: Chapter`

- [ ] **Step 1: Write `lesson.ts`**

Create `lesson.ts` with:
- Basic: array, linked list, stack (LIFO), queue (FIFO), push/pop/enqueue/dequeue.
- Intermediate: hash table concept and collision, Set and Map, when to use which structure.
- Advanced: binary tree, binary search tree, graph basics, DFS/BFS concepts.
- Code examples:
  - JS: stack and queue with array.
  - TS: generic stack class.
  - Go: `map` as hash table and `struct` for linked-list node.

- [ ] **Step 2: Write `quiz.ts`**

8 questions covering arrays, linked lists, stacks, queues, hash tables, trees, graphs.

- [ ] **Step 3: Write `references.ts`**

5 references about data structures.

- [ ] **Step 4: Update `index.ts`**

Replace placeholder with full `Chapter` object. Preserve export name `ch04FundamentalDataStructures`.

- [ ] **Step 5: Run checks and commit**

```bash
pnpm run lint -- --max-warnings=0
pnpm run typecheck
pnpm run test
```

```bash
git add src/content/courses/cs-fundamentals/chapters/ch-04-fundamental-data-structures/
git commit -m "feat(content): add chapter 4 - fundamental data structures"
```

---

## Task 4: Implement Chapter 5 — Sistem Operasi dan Manajemen Proses

**Files:**
- Modify: `src/content/courses/cs-fundamentals/chapters/ch-05-os-and-process-management/index.ts`
- Create: `src/content/courses/cs-fundamentals/chapters/ch-05-os-and-process-management/lesson.ts`
- Create: `src/content/courses/cs-fundamentals/chapters/ch-05-os-and-process-management/quiz.ts`
- Create: `src/content/courses/cs-fundamentals/chapters/ch-05-os-and-process-management/references.ts`

**Interfaces:**
- Produces: `ch05OsAndProcessManagement: Chapter`

- [ ] **Step 1: Write `lesson.ts`**

Create `lesson.ts` with:
- Basic: OS roles, program vs process, PID, basic process states.
- Intermediate: process lifecycle, thread vs process, FIFO and Round-Robin scheduling concepts.
- Advanced: concurrency vs parallelism, IPC intro, virtual memory/paging outline, brief Go concurrency (goroutine, `sync.WaitGroup`).
- Code examples:
  - JS: event loop as single-threaded concurrency model.
  - TS: task queue simulation with Promise.
  - Go: `go` keyword and `sync.WaitGroup` intro.

- [ ] **Step 2: Write `quiz.ts`**

8 questions covering OS roles, process lifecycle, threads, scheduling, concurrency concepts.

- [ ] **Step 3: Write `references.ts`**

5 references about operating systems and concurrency.

- [ ] **Step 4: Update `index.ts`**

Replace placeholder with full `Chapter` object. Preserve export name `ch05OsAndProcessManagement`.

- [ ] **Step 5: Run checks and commit**

```bash
pnpm run lint -- --max-warnings=0
pnpm run typecheck
pnpm run test
```

```bash
git add src/content/courses/cs-fundamentals/chapters/ch-05-os-and-process-management/
git commit -m "feat(content): add chapter 5 - os and process management"
```

---

## Task 5: Implement Chapter 6 — Jaringan Komputer dan Protokol Internet

**Files:**
- Modify: `src/content/courses/cs-fundamentals/chapters/ch-06-networking-and-internet-protocols/index.ts`
- Create: `src/content/courses/cs-fundamentals/chapters/ch-06-networking-and-internet-protocols/lesson.ts`
- Create: `src/content/courses/cs-fundamentals/chapters/ch-06-networking-and-internet-protocols/quiz.ts`
- Create: `src/content/courses/cs-fundamentals/chapters/ch-06-networking-and-internet-protocols/references.ts`

**Interfaces:**
- Produces: `ch06NetworkingAndInternetProtocols: Chapter`

- [ ] **Step 1: Write `lesson.ts`**

Create `lesson.ts` with:
- Basic: client-server model, IP address, DNS, HTTP request/response/method/status code.
- Intermediate: TCP vs UDP, ports and sockets, packets and routing intro.
- Advanced: TLS/HTTPS, transport encryption, caching/CDN, REST API design principles.
- Code examples:
  - JS: `fetch()` for HTTP GET/POST.
  - TS: typed fetch response with interface.
  - Go: simple HTTP server with `net/http`.

- [ ] **Step 2: Write `quiz.ts`**

8 questions covering HTTP, TCP/UDP, DNS, TLS/HTTPS, REST.

- [ ] **Step 3: Write `references.ts`**

5 references about networking and internet protocols.

- [ ] **Step 4: Update `index.ts`**

Replace placeholder with full `Chapter` object. Preserve export name `ch06NetworkingAndInternetProtocols`.

- [ ] **Step 5: Run checks and commit**

```bash
pnpm run lint -- --max-warnings=0
pnpm run typecheck
pnpm run test
```

```bash
git add src/content/courses/cs-fundamentals/chapters/ch-06-networking-and-internet-protocols/
git commit -m "feat(content): add chapter 6 - networking and internet protocols"
```

---

## Task 6: Implement Chapter 7 — Basis Data dan SQL Dasar

**Files:**
- Modify: `src/content/courses/cs-fundamentals/chapters/ch-07-databases-and-sql-basics/index.ts`
- Create: `src/content/courses/cs-fundamentals/chapters/ch-07-databases-and-sql-basics/lesson.ts`
- Create: `src/content/courses/cs-fundamentals/chapters/ch-07-databases-and-sql-basics/quiz.ts`
- Create: `src/content/courses/cs-fundamentals/chapters/ch-07-databases-and-sql-basics/references.ts`

**Interfaces:**
- Produces: `ch07DatabasesAndSqlBasics: Chapter`

- [ ] **Step 1: Write `lesson.ts`**

Create `lesson.ts` with:
- Basic: DBMS, tables/rows/columns, primary/foreign keys, common data types.
- Intermediate: SQL CRUD (SELECT, INSERT, UPDATE, DELETE), INNER/LEFT JOIN, index concept.
- Advanced: query optimization overview, `EXPLAIN ANALYZE` as analysis tool, transactions and ACID intro.
- Code examples:
  - JS: SQL query strings without DB connection.
  - TS: type definitions for tables and query results.
  - Go: simple query with `database/sql` and `sql.NullString`.

- [ ] **Step 2: Write `quiz.ts`**

8 questions covering SQL basics, JOINs, indexes, transactions, ACID.

- [ ] **Step 3: Write `references.ts`**

5 references about databases and SQL.

- [ ] **Step 4: Update `index.ts`**

Replace placeholder with full `Chapter` object. Preserve export name `ch07DatabasesAndSqlBasics`.

- [ ] **Step 5: Run checks and commit**

```bash
pnpm run lint -- --max-warnings=0
pnpm run typecheck
pnpm run test
```

```bash
git add src/content/courses/cs-fundamentals/chapters/ch-07-databases-and-sql-basics/
git commit -m "feat(content): add chapter 7 - databases and sql basics"
```

---

## Task 7: Implement Chapter 8 — Keamanan Informasi dan Praktik Terbaik

**Files:**
- Modify: `src/content/courses/cs-fundamentals/chapters/ch-08-security-fundamentals/index.ts`
- Create: `src/content/courses/cs-fundamentals/chapters/ch-08-security-fundamentals/lesson.ts`
- Create: `src/content/courses/cs-fundamentals/chapters/ch-08-security-fundamentals/quiz.ts`
- Create: `src/content/courses/cs-fundamentals/chapters/ch-08-security-fundamentals/references.ts`

**Interfaces:**
- Produces: `ch08SecurityFundamentals: Chapter`

- [ ] **Step 1: Write `lesson.ts`**

Create `lesson.ts` with:
- Basic: CIA Triad, authentication/authorization intro, social engineering awareness.
- Intermediate: hashing vs encryption, HTTPS/TLS certificates, input validation/sanitization.
- Advanced: OWASP Top 10 overview, secure coding practices, secret management intro.
- Code examples:
  - JS: `crypto.subtle.digest()` for SHA-256 hashing.
  - TS: type-safe password hashing flow (concept).
  - Go: password hashing concept with bcrypt (no full implementation).

- [ ] **Step 2: Write `quiz.ts`**

8 questions covering CIA Triad, hashing/encryption, HTTPS, input validation, OWASP, secrets.

- [ ] **Step 3: Write `references.ts`**

5 references about security fundamentals.

- [ ] **Step 4: Update `index.ts`**

Replace placeholder with full `Chapter` object. Preserve export name `ch08SecurityFundamentals`.

- [ ] **Step 5: Run checks and commit**

```bash
pnpm run lint -- --max-warnings=0
pnpm run typecheck
pnpm run test
```

```bash
git add src/content/courses/cs-fundamentals/chapters/ch-08-security-fundamentals/
git commit -m "feat(content): add chapter 8 - security fundamentals"
```

---

## Task 8: Final Verification

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
- Tests: 5/5 pass
- Build: `dist/` generated successfully

- [ ] **Step 2: Manual spot-check**

Run `pnpm run preview` and verify:
- Course detail page lists all 8 chapters with summaries.
- Each chapter displays lesson content, code blocks with syntax highlighting, and quiz.
- Quiz requires 8/8 correct to unlock next chapter.
- Direct access `/courses/cs-fundamentals/ch-08-security-fundamentals` works.

- [ ] **Step 3: Final commit**

```bash
git add .
git commit -m "feat(content): complete phase 1 chapters 2-8"
```

---

## Self-Review Checklist

- [x] **Spec coverage:** All 7 placeholder chapters map to a task; final verification covers acceptance criteria.
- [x] **Placeholder scan:** No TBD/TODO; each task lists exact files and structure.
- [x] **Type consistency:** Export names match existing course wiring; `Chapter` type shape preserved.
