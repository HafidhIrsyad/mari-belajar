import type { Lesson } from '@/content/types'

export const ch08Lesson: Lesson = {
  id: 'lesson-ch-08-frontend-architecture-tooling-lanjutan',
  estimatedMinutes: 40,
  sections: [
    {
      id: 'sec-08-basic',
      type: 'markdown',
      level: 'basic',
      title: 'Monorepo dan pnpm Workspaces',
      content: `## Apa itu Monorepo?

Monorepo adalah praktik menyimpan banyak project atau package terkait dalam satu repository. Keuntungan:

- **Code sharing**: utility, types, dan komponen dapat dipakai bersama.
- **Atomic changes**: satu pull request dapat mengubah banyak package sekaligus.
- **Unified tooling**: lint, test, dan build dikonfigurasi secara konsisten.
- **Visibility**: tim dapat melihat dependensi dan perubahan lintas package.

Tantangan:

- Build time dapat menjadi lama tanpa caching.
- Versioning antar package memerlukan koordinasi.
- Git history bisa tumbuh besar.

## pnpm Workspaces

pnpm workspaces mengelola multiple package dalam satu repo. Setiap package memiliki \`package.json\` sendiri dan workspace root memiliki \`pnpm-workspace.yaml\`.

\`\`\`yaml
packages:
  - 'apps/*'
  - 'packages/*'
\`\`\`

Keunggulan pnpm:

- Content-addressable store menghemat disk space.
- Strict dependency graph mencegah phantom dependencies.
- Workspace protocol untuk dependensi internal.`,
    },
    {
      id: 'sec-08-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-08-js',
        filename: 'pnpm-workspace.yaml',
        language: 'text',
        title: 'Konfigurasi: pnpm Workspaces untuk Monorepo Frontend',
        code: `packages:
  - 'apps/web'
  - 'apps/admin'
  - 'packages/ui'
  - 'packages/utils'
  - 'packages/tsconfig'`,
        explanation:
          'pnpm-workspace.yaml mendefinisikan pola direktori yang menjadi bagian dari workspace. Setiap direktori tersebut dapat memiliki package.json sendiri.',
      },
    },
    {
      id: 'sec-08-intermediate',
      type: 'markdown',
      level: 'intermediate',
      title: 'Turborepo, Changesets, dan CI untuk Frontend',
      content: `## Turborepo

Turborepo adalah build system untuk monorepo JavaScript/TypeScript. Fitur utamanya:

- **Task pipeline**: mendefinisikan urutan task seperti lint → test → build.
- **Local caching**: menghindari menjalankan ulang task yang tidak berubah.
- **Remote caching**: berbagi cache lintas developer dan CI.

Konfigurasi \`turbo.json\`:

\`\`\`json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "test": {
      "dependsOn": ["build"]
    },
    "lint": {}
  }
}
\`\`\`

\`dependsOn: ["^build"]\` berarti package harus menunggu dependensi internal selesai di-build.

## Changesets

Changesets adalah alat untuk mengelola versi dan changelog di monorepo. Workflow:

1. Developer menambahkan changeset saat membuat PR.
2. Changeset bot mengumpulkan perubahan.
3. Saat rilis, maintainers menjalankan \`changeset version\` untuk bump versi dan update changelog.
4. Publish dengan \`changeset publish\`.

## CI untuk Frontend

Pipeline CI yang baik untuk frontend monorepo:

1. **Install dependencies** dengan cache pnpm.
2. **Lint** dengan ESLint/Oxlint.
3. **Type check** dengan TypeScript.
4. **Unit dan integration tests**.
5. **Build affected packages**.
6. **Bundle analysis** dan performance budget check.

Dengan Turborepo, hanya package yang terpengaruh oleh perubahan yang perlu dijalankan.`,
    },
    {
      id: 'sec-08-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-08-ts',
        filename: 'turbo.json',
        language: 'typescript',
        title: 'TypeScript: turbo.json dengan Pipeline dan Remote Cache',
        code: `{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env.*local"],
  "pipeline": {
    "lint": {
      "outputs": []
    },
    "typecheck": {
      "dependsOn": ["^typecheck"],
      "outputs": []
    },
    "test": {
      "dependsOn": ["build"],
      "outputs": ["coverage/**"]
    },
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**"],
      "env": ["NEXT_PUBLIC_API_URL"]
    },
    "deploy": {
      "dependsOn": ["build", "test"],
      "outputs": []
    }
  }
}

// Jalankan dengan:
// turbo run build --filter=@acme/web...
// Hanya package yang berubah dan dependensinya yang akan di-build.`,
        explanation:
          'turbo.json mendefinisikan task pipeline dan output caching. dependsOn memastikan task dijalankan dalam urutan yang benar, sementara filter memungkinkan build parsial.',
      },
    },
    {
      id: 'sec-08-advanced',
      type: 'markdown',
      level: 'advanced',
      title: 'Module Graph Analysis, Bundle Analyzer, dan Performance Budget',
      content: `## Module Graph Analysis

Module graph adalah representasi dependensi antar modul dalam aplikasi. Memahami module graph membantu:

- Mendeteksi import berlebihan atau siklis.
- Mengidentifikasi modul yang menyebabkan bundle besar.
- Merencanakan code splitting yang efektif.

Tools untuk analisis:

- **dependency-cruiser**: visualisasi dan validasi dependensi.
- **madge**: deteksi circular dependencies.
- **TypeScript project references**: membatasi visibility antar package.

## Bundle Analyzer

Bundle analyzer memvisualisasikan isi bundle JavaScript. Tools populer:

- **webpack-bundle-analyzer** untuk webpack.
- **rollup-plugin-visualizer** untuk Vite/Rollup.
- **@next/bundle-analyzer** untuk Next.js.

Dengan analyzer, kita dapat menemukan duplikasi library, modul besar, atau dependency yang tidak sengaja ter-bundle.

## Performance Budget Enforcement

Performance budget adalah batasan ukuran atau metrik performa yang tidak boleh dilanggar. Contoh:

- Bundle JavaScript awal maksimal 200 KB gzipped.
- LCP < 2.5 detik di Lighthouse CI.
- INP < 200 ms di RUM.

Cara menegakkan budget:

- **Lighthouse CI**: gagalkan PR jika metrik melampaui threshold.
- **Bundlesize**: gagalkan build jika bundle melebihi batas.
- **Custom scripts**: hitung ukuran bundle di CI dan bandingkan dengan baseline.

Performance budget harus diputuskan bersama tim produk dan desain, bukan hanya engineer.`,
    },
    {
      id: 'sec-08-advanced-example',
      type: 'code-example',
      codeExample: {
        id: 'code-08-advanced',
        filename: 'vite.config.ts',
        language: 'typescript',
        title: 'Vite: Performance Budget Plugin untuk CI',
        code: `import { defineConfig, type Plugin } from 'vite'

const BUDGET_KB = 200

function bundleBudgetPlugin(): Plugin {
  return {
    name: 'bundle-budget',
    closeBundle(_options, bundle) {
      const totalBytes = Object.values(bundle).reduce(
        (sum, chunk) => sum + ('code' in chunk ? chunk.code.length : 0),
        0,
      )
      const sizeKB = Math.round(totalBytes / 1024)

      if (sizeKB > BUDGET_KB) {
        throw new Error(
          \`Bundle \${sizeKB} KB melebihi budget \${BUDGET_KB} KB\`,
        )
      }
    },
  }
}

export default defineConfig({
  plugins: [bundleBudgetPlugin()],
})`,
        explanation:
          'Plugin Vite ini gagalkan build jika total bundle melebihi budget yang ditetapkan. Integrasikan ke pipeline CI agar regresi ukuran bundle terdeteksi sebelum merge, melengkapi Lighthouse CI untuk metrik runtime seperti LCP dan INP.',
      },
    },
    {
      id: 'sec-08-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Best practice 2026:** Gunakan monorepo hanya jika manfaatnya melebihi overhead. Terapkan Turborepo untuk caching dan pipeline, changesets untuk versioning, serta performance budget di CI. Analisis module graph secara berkala untuk mencegah coupling dan bundle bloat.',
    },
  ],
}
