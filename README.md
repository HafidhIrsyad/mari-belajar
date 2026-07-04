# Mari Belajar

Platform pembelajaran software engineering berbahasa Indonesia. Pelajari fondasi ilmu komputer, JavaScript/TypeScript, Go, frontend, backend, database, dan DevOps lewat materi terstruktur, kuis per bab, dan pelacakan progres di browser.

## Fitur

- **7 learning track** — Computer Science, JavaScript/TypeScript, Go, Frontend, Backend, Database, DevOps
- **21 kursus** — masing-masing track punya level basic, intermediate, dan advanced
- **Materi interaktif** — lesson markdown, code block dengan syntax highlighting, visualisasi, dan referensi
- **Kuis per bab** — jawab benar untuk membuka bab berikutnya
- **Progres lokal** — disimpan di browser via Zustand (tanpa akun)

## Tech stack

- [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite 6](https://vite.dev/) + [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react)
- [React Router 6](https://reactrouter.com/)
- [Tailwind CSS 3](https://tailwindcss.com/) + [Radix UI](https://www.radix-ui.com/)
- [Vitest 3](https://vitest.dev/) + [Testing Library](https://testing-library.com/)
- [Oxlint](https://oxc.rs/docs/guide/usage/linter.html)

## Prasyarat

- **Node.js** 20 atau lebih baru (Vite 6 membutuhkan Node ≥ 18.20, disarankan 20+)
- **pnpm** 9+

## Memulai

```bash
pnpm install
pnpm dev
```

Buka [http://localhost:5173](http://localhost:5173).

## Scripts

| Perintah | Deskripsi |
|----------|-----------|
| `pnpm dev` | Dev server dengan HMR |
| `pnpm build` | Typecheck + production build ke `dist/` |
| `pnpm preview` | Preview build production secara lokal |
| `pnpm test` | Jalankan test (Vitest) |
| `pnpm test:watch` | Test dalam mode watch |
| `pnpm lint` | Lint kode sumber dengan Oxlint |
| `pnpm typecheck` | Typecheck tanpa emit |
| `pnpm validate-content` | Validasi struktur dan aturan konten kursus |

## Struktur proyek

```
src/
├── components/       # UI, layout, lesson, visualization
├── content/
│   ├── course-catalog.ts
│   └── courses/      # Satu folder per kursus (meta, chapters, lesson, quiz)
├── pages/            # Route pages
├── stores/           # Zustand (progress, dll.)
└── test/             # Unit & E2E tests
```

Konten kursus didefinisikan sebagai modul TypeScript di `src/content/courses/<slug>/`. Setiap bab berisi `lesson.ts`, `quiz.ts`, dan `references.ts`.

## Testing

```bash
pnpm test
```

Test mencakup smoke E2E untuk navigasi kursus, render lesson/quiz, dan alur unlock bab.

## Deploy ke Cloudflare Pages

Proyek ini memakai **Vite 6** — versi yang dibutuhkan Wrangler 4 untuk auto-konfigurasi framework.

**Build settings (Pages dashboard):**

| Setting | Value |
|---------|-------|
| Build command | `pnpm run build` |
| Output directory | `dist` |
| Node.js version | 20 atau lebih baru |

Jika deploy lewat Wrangler CLI:

```bash
pnpm run build
npx wrangler deploy
```

Untuk situs statis murni, cukup set build command dan output directory di dashboard Pages — Wrangler CLI tidak wajib.

## Linting

Lint dengan Oxlint:

```bash
pnpm lint
```

Konfigurasi ada di `.oxlintrc.json`.
