import type { Lesson } from '@/content/types'

export const ch05Lesson: Lesson = {
  id: 'lesson-ch-05-css-styling-strategy',
  estimatedMinutes: 23,
  sections: [
    {
      id: 'sec-05-basic-cascade',
      type: 'markdown',
      level: 'basic',
      title: 'Selectors, Specificity, Cascade, dan Inheritance',
      content: `## Cara Kerja Cascade

CSS adalah singkatan dari Cascading Style Sheets. Kata **cascading** mengacu pada mekanisme penentuan gaya akhir ketika beberapa aturan berlaku untuk elemen yang sama.

Urutan pertimbangan browser:

1. **Origin dan importance**: style dari author, user, browser, serta \`!important\`.
2. **Specificity**: seberapa spesifik selector.
3. **Source order**: aturan yang ditulis terakhir menang jika specificity sama.

## Specificity

Specificity dihitung dari komponen selector:

- Inline style: \`1-0-0\`
- ID: \`0-1-0\`
- Class, attribute, pseudo-class: \`0-0-1\`
- Element, pseudo-element: \`0-0-0-1\`

\`\`\`css
#header { color: red; }           /* 0-1-0 */
.header { color: blue; }          /* 0-0-1 */
header .header { color: green; }  /* 0-0-2 */
\`\`\`

## Inheritance

Beberapa properti seperti \`color\`, \`font-family\`, dan \`line-height\` diturunkan dari induk ke anak. Properti seperti \`margin\`, \`padding\`, \`border\`, dan \`background\` tidak diturunkan.

\`\`\`css
body {
  color: #1f2937;
  font-family: system-ui, sans-serif;
}
\`\`\`

## Custom Properties

Custom properties atau CSS variables menyimpan nilai yang dapat digunakan ulang dan diubah secara dinamis.

\`\`\`css
:root {
  --color-primary: #2563eb;
  --space-md: 1rem;
}

.button {
  background-color: var(--color-primary);
  padding: var(--space-md);
}
\`\`\``,
    },
    {
      id: 'sec-05-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-05-js',
        filename: 'bem-builder.js',
        language: 'javascript',
        title: 'JavaScript: Membangun Class BEM Secara Dinamis',
        code: `function bem(block, element, modifiers) {
  let className = block
  if (element) className += \`__\${element}\`
  if (modifiers) {
    for (const [key, active] of Object.entries(modifiers)) {
      if (active) className += \` --\${block}__\${element || ''}--\${key}\`.replace('__--', '--')
    }
  }
  return className
}

function bemClean(block, element, modifiers) {
  const base = element ? \`\${block}__\${element}\` : block
  const mods = Object.entries(modifiers || {})
    .filter(([, active]) => active)
    .map(([key]) => \`\${base}--\${key}\`)
  return [base, ...mods].join(' ')
}

console.log(bemClean('button', 'icon', { primary: true, large: false }))
// button__icon button__icon--primary`,
        explanation:
          'BEM memberikan konvensi nama class yang jelas: Block__Element--Modifier. Helper ini membantu menghindari typo dan memastikan konsistensi namespace.',
      },
    },
    {
      id: 'sec-05-intermediate-methodology',
      type: 'markdown',
      level: 'intermediate',
      title: 'BEM, CSS Modules, dan Utility-First CSS',
      content: `## BEM

BEM adalah metodologi penamaan class dengan tiga bagian:

- **Block**: komponen mandiri, misalnya \`.button\`.
- **Element**: bagian dari block, misalnya \`.button__icon\`.
- **Modifier**: varian block atau element, misalnya \`.button--primary\`.

BEM menghindari konflik specificity karena sebagian besar selector hanya satu class. Ia juga membuat struktur komponen mudah dikenali.

## CSS Modules

CSS Modules secara otomatis menjadikan nama class lokal ke file. Compiler akan mengubah \`.button\` menjadi \`.button__abc123\`, sehingga tidak ada kebocoran nama ke komponen lain.

\`\`\`css
/* Button.module.css */
.primary { background: blue; }
\`\`\`

\`\`\`jsx
import styles from './Button.module.css'
<button className={styles.primary}>Klik</button>
\`\`\`

## Utility-First CSS

Utility-first menyediakan class kecil yang masing-masing bertanggung jawab atas satu properti. Tailwind CSS adalah contoh paling populer.

\`\`\`html
<button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
  Simpan
</button>
\`\`\`

Keuntungannya adalah kecepatan development dan konsistensi desain. Tantangannya adalah markup bisa menjadi panjang dan memerlukan disiplin untuk tidak membuat custom utility sembarangan.

## Kapan Memilih Apa

- **BEM**: tim yang ingin styling tetap berbasis CSS murni dengan namespace jelas.
- **CSS Modules**: proyek komponen-based yang ingin menghindari konflik class global.
- **Utility-first**: proyek yang ingin iterasi cepat dengan sistem desain terbatas.`,
    },
    {
      id: 'sec-05-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-05-ts',
        filename: 'designTokens.ts',
        language: 'typescript',
        title: 'TypeScript: Design Tokens dan Dark Mode Type-Safe',
        code: `const tokens = {
  color: {
    background: 'var(--color-background)',
    surface: 'var(--color-surface)',
    text: 'var(--color-text)',
    primary: 'var(--color-primary)',
  },
  space: {
    sm: '0.5rem',
    md: '1rem',
    lg: '2rem',
  },
  radius: {
    sm: '0.25rem',
    md: '0.5rem',
  },
} as const

type TokenCategory = keyof typeof tokens
type ColorToken = keyof typeof tokens.color

function colorToken(name: ColorToken): string {
  return tokens.color[name]
}

// CSS yang mengikuti preferensi sistem
const darkModeStyles = \`
:root {
  --color-background: #ffffff;
  --color-surface: #f3f4f6;
  --color-text: #111827;
  --color-primary: #2563eb;
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #0f172a;
    --color-surface: #1e293b;
    --color-text: #f8fafc;
    --color-primary: #60a5fa;
  }
}
\`

console.log(colorToken('primary'))
console.log(darkModeStyles)`,
        explanation:
          'Design tokens menjadikan nilai desain dapat diprogram dan divalidasi oleh TypeScript. Dark mode diatur melalui media query prefers-color-scheme sehingga mengikuti preferensi sistem pengguna.',
      },
    },
    {
      id: 'sec-05-advanced-architecture',
      type: 'markdown',
      level: 'advanced',
      title: 'Design Tokens, CSS Architecture at Scale, dan Dark Mode',
      content: `## Design Tokens

Design tokens adalah variabel desain terkecil yang dapat dibagikan antar platform: warna, tipografi, spacing, shadow, radius, dan z-index. Mereka menjadi sumber kebenaran tunggal untuk desain sistem.

Format populer seperti W3C Design Tokens Community Group menggunakan JSON yang dapat dikonversi ke CSS variables, Sass, atau kode platform native.

## CSS Architecture at Scale

Tim besar sering menggunakan kombinasi:

- **Global tokens**: warna dan spacing dasar.
- **Alias tokens**: token yang mereferensi global token untuk konteks tertentu.
- **Component tokens**: token khusus untuk satu komponen, misalnya button-background.

Dengan pemisahan ini, perubahan tema tidak perlu menyentuh setiap komponen secara manual.

## Dark Mode Implementation

Ada tiga pendekatan umum:

1. **OS preference**: \`prefers-color-scheme: dark\`.
2. **Manual toggle**: class \`dark\` pada root dan \`html.dark\` sebagai selector.
3. **Hybrid**: mengikuti OS secara default, tetapi pengguna bisa menimpanya.

\`\`\`css
:root {
  --bg: #ffffff;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg: #0f172a;
  }
}

html.dark {
  --bg: #0f172a;
}
\`\`\`

Pendekatan hybrid memberikan fleksibilitas terbaik, tetapi memerlukan sinkronisasi antara JavaScript, localStorage, dan CSS.

## Mencegah Specificity Wars

Di proyek besar, specificity yang tidak terkontrol bisa membuat perubahan sulit. Strategi pencegahan:

- Hindari selector ID untuk styling.
- Hindari \`!important\` kecuali untuk utility yang sangat kecil.
- Gunakan metodologi penamaan yang konsisten.
- Dokumentasikan layer arsitektur: reset, base, components, utilities, overrides.`,
    },
    {
      id: 'sec-05-conceptual-example',
      type: 'code-example',
      codeExample: {
        id: 'code-05-conceptual',
        filename: 'strategy-comparison.js',
        language: 'javascript',
        title: 'Perbandingan Runtime: BEM vs CSS Modules vs Utility-First',
        code: `const strategies = {
  bem: {
    selector: '.button__icon.button__icon--primary',
    scope: 'global namespace',
    runtimeCost: 'rendah, CSS murni',
    tradeOff: 'Markup lebih panjang, konvensi harus disiplin',
  },
  cssModules: {
    selector: '.button_primary__a3f1',
    scope: 'local to file via build tool',
    runtimeCost: 'rendah, class dihash saat build',
    tradeOff: 'Memerlukan bundler, nama class tidak human-readable',
  },
  utilityFirst: {
    selector: '.bg-blue-600.text-white.px-4.py-2.rounded',
    scope: 'global utility classes',
    runtimeCost: 'rendah setelah purge unused styles',
    tradeOff: 'HTML bisa bloat, ketergantungan pada toolchain',
  },
}

function recommend(strategy, teamSize, speedPriority) {
  if (teamSize > 10 && !speedPriority) return strategies.cssModules
  if (speedPriority) return strategies.utilityFirst
  return strategies.bem
}

console.log(recommend('any', 12, false))`,
        explanation:
          'Setiap strategi styling memiliki scope, runtime cost, dan trade-off yang berbeda. Pemilihan bergantung pada ukuran tim, kecepatan iterasi, dan ketersediaan tooling.',
      },
    },
    {
      id: 'sec-05-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Kesalahan umum:** menaikkan specificity dengan !important untuk menangkal styling. Sebaiknya turunkan specificity lawan atau refactoring struktur selector. Mulailah dengan design tokens agar theming dan scaling menjadi lebih mudah.',
    },
  ],
}
