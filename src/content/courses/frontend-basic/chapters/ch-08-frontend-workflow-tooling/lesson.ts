import type { Lesson } from '@/content/types'

export const ch08Lesson: Lesson = {
  id: 'lesson-ch-08-frontend-workflow-tooling',
  estimatedMinutes: 20,
  sections: [
    {
      id: 'sec-08-basic-tooling',
      type: 'markdown',
      level: 'basic',
      title: 'Editor, DevTools, dan Live Server',
      content: `## VS Code untuk Frontend

Visual Studio Code adalah editor populer untuk frontend. Ekstensi yang direkomendasikan meliputi:

- **ESLint**: menampilkan peringatan lint langsung di editor.
- **Prettier**: memformat kode saat menyimpan.
- **Tailwind CSS IntelliSense**: autocomplete class Tailwind.
- **GitLens**: mempermudah melihat sejarah perubahan.

## Browser DevTools

DevTools modern menyediakan banyak panel:

- **Elements**: menginspeksi dan mengedit DOM serta CSS secara langsung.
- **Console**: menjalankan JavaScript dan melihat log.
- **Network**: memantau request, ukuran resource, dan waktu muat.
- **Performance**: merekam aktivitas main thread dan identifikasi long task.
- **Lighthouse**: audit performa, aksesibilitas, SEO, dan best practices.
- **Accessibility**: melihat accessibility tree dan properti node.

## Live Server

Live server memantau perubahan file dan memuat ulang browser secara otomatis. Dalam proyek modern, fitur serupa disediakan oleh Vite dev server melalui Hot Module Replacement (HMR), yang memperbarui modul tanpa kehilangan state.`,
    },
    {
      id: 'sec-08-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-08-js',
        filename: 'bundle-budget.js',
        language: 'javascript',
        title: 'JavaScript: Memeriksa Ukuran Bundle dari Build Output',
        code: `const fs = require('fs')
const path = require('path')

const BUILD_DIR = './dist/assets'
const BUDGET_KB = 150

function getFileSizeKB(filePath) {
  const bytes = fs.statSync(filePath).size
  return bytes / 1024
}

function checkBudget(dir) {
  const files = fs.readdirSync(dir)
  let totalJS = 0
  let totalCSS = 0

  for (const file of files) {
    const fullPath = path.join(dir, file)
    if (fs.statSync(fullPath).isDirectory()) continue
    const size = getFileSizeKB(fullPath)
    if (file.endsWith('.js')) totalJS += size
    if (file.endsWith('.css')) totalCSS += size
  }

  console.log(\`Total JS: \${totalJS.toFixed(2)} KB\`)
  console.log(\`Total CSS: \${totalCSS.toFixed(2)} KB\`)

  if (totalJS > BUDGET_KB) {
    console.error(\`Bundle JS melebihi anggaran \${BUDGET_KB} KB\`)
    process.exit(1)
  }
}

checkBudget(BUILD_DIR)`,
        explanation:
          'Script sederhana ini menjumlahkan ukuran file JS dan CSS hasil build, lalu membandingkannya dengan performance budget. Ini adalah langkah awal sebelum menggunakan bundle analyzer yang lebih canggih.',
      },
    },
    {
      id: 'sec-08-intermediate-linter',
      type: 'markdown',
      level: 'intermediate',
      title: 'ESLint, Prettier, npm Scripts, dan Git Workflow',
      content: `## ESLint

ESLint adalah static analyzer untuk JavaScript dan TypeScript. ESLint dapat mendeteksi:

- Variabel yang tidak digunakan.
- Akses properti yang mungkin undefined.
- Pola yang berpotensi menyebabkan bug.
- Aturan aksesibilitas melalui plugin seperti eslint-plugin-jsx-a11y.

\`\`\`json
{
  "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  "rules": {
    "no-unused-vars": "error"
  }
}
\`\`\`

## Prettier

Prettier adalah code formatter yang menstandarkan gaya penulisan. Prettier dan ESLint dapat bekerja sama jika diatur dengan benar; umumnya Prettier menangani formatting, ESLint menangani kualitas kode.

## npm Scripts

\`package.json\` memungkinkan kita mendefinisikan script yang sering dijalankan:

\`\`\`json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --max-warnings=0",
    "format": "prettier --write ."
  }
}
\`\`\`

## Git Workflow Dasar

- Buat branch fitur dari main: \`git checkout -b feat/nama-fitur\`.
- Commit perubahan secara atomik dengan pesan yang jelas.
- Push branch dan buat pull request untuk review.
- Pastikan CI lulus sebelum merge.

Pesan commit yang konsisten, seperti Conventional Commits, memudahkan pembuatan changelog otomatis.`,
    },
    {
      id: 'sec-08-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-08-ts',
        filename: 'vite.config.ts',
        language: 'typescript',
        title: 'TypeScript: Konfigurasi Vite untuk Static Site',
        code: `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react-router-dom')) {
            return 'vendor-router'
          }
          if (id.includes('node_modules/react')) {
            return 'vendor-react'
          }
        },
      },
    },
  },
})
`,
        explanation:
          'Vite menyediakan konfigurasi TypeScript yang typed. manualChunks membagi bundle menjadi chunk terpisah, sehingga vendor code tidak perlu diunduh ulang saat kode aplikasi berubah.',
      },
    },
    {
      id: 'sec-08-advanced-vite',
      type: 'markdown',
      level: 'advanced',
      title: 'Vite untuk Static Site, Image Optimization, dan Performance Budget',
      content: `## Vite Dev Server dan Build

Vite menggunakan native ES modules di development, sehingga cold start dan HMR sangat cepat. Saat build, Vite menggunakan Rollup untuk menghasilkan bundle yang dioptimalkan, termasuk:

- Tree shaking untuk menghapus kode yang tidak digunakan.
- Code splitting otomatis berdasarkan dynamic import.
- Minifikasi dengan esbuild atau terser.
- Asset handling untuk gambar, font, dan file statis.

## Image Optimization

Gambar sering menjadi sumber payload terbesar. Strategi optimasi meliputi:

- Menggunakan format modern seperti WebP atau AVIF.
- Menyediakan beberapa ukuran melalui srcset.
- Menunda pemuatan gambar di luar viewport dengan \`loading="lazy"\`.
- Menggunakan sprite atau SVG untuk ikon.

\`\`\`html
<img
  src="photo-800.webp"
  srcset="photo-400.webp 400w, photo-800.webp 800w, photo-1200.webp 1200w"
  sizes="(min-width: 800px) 50vw, 100vw"
  alt="Foto pemandangan"
  loading="lazy"
/>
\`\`\`

## Performance Budget

Performance budget adalah batasan metrik yang disepakati tim. Bisa berupa:

- Ukuran total bundle JS maksimal 200 KB.
- Jumlah request gambar maksimal 20.
- Largest Contentful Paint di bawah 2.5 detik.

Budget ini diintegrasikan ke CI agar pull request yang melebihi batas gagal build. Tools seperti Lighthouse CI dan bundlesize dapat membantu.

## Module Graph Analysis

Bundle analyzer seperti rollup-plugin-visualizer atau webpack-bundle-analyzer menunjukkan komposisi bundle. Dengan visualisasi ini, kita dapat mengidentifikasi dependensi besar yang seharusnya bisa dihapus atau dipisahkan.`,
    },
    {
      id: 'sec-08-conceptual-example',
      type: 'code-example',
      codeExample: {
        id: 'code-08-conceptual',
        filename: 'workflow-comparison.js',
        language: 'javascript',
        title: 'Perbandingan Runtime: Dev Server vs Production Build',
        code: `const workflowStages = {
  development: {
    bundler: 'Vite dev server',
    moduleFormat: 'ES modules native',
    transformations: 'Minimal, on-demand',
    hmr: true,
    optimized: false,
  },
  production: {
    bundler: 'Rollup via Vite build',
    moduleFormat: 'IIFE / ES modules chunk',
    transformations: 'Tree-shake, minify, split chunks',
    hmr: false,
    optimized: true,
  },
  staticServe: {
    server: 'nginx / CDN / host static',
    caching: 'Long-term cache untuk asset hashed',
    gzipBrotli: 'Aktif di server edge',
    optimized: true,
  },
}

function describeStage(stage) {
  const info = workflowStages[stage]
  if (!info) return 'Stage tidak dikenal'
  return \`\${stage}: \${info.bundler || info.server}, optimized=\${info.optimized}\`
}

console.log(describeStage('development'))
console.log(describeStage('production'))
console.log(describeStage('staticServe'))`,
        explanation:
          'Development dan production memiliki tujuan berbeda: dev prioritaskan kecepatan feedback, sementara production prioritaskan ukuran dan performa. Static serving menambahkan caching dan kompresi.',
      },
    },
    {
      id: 'sec-08-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Produktivitas:** investasi awal pada tooling yang baik menghemat waktu jangka panjang. Pastikan ESLint, Prettier, typecheck, dan test berjalan di CI sebelum merge. Pantau ukuran bundle secara berkala dan tetapkan performance budget sejak awal proyek.',
    },
  ],
}
