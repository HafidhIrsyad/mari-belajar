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
      id: 'sec-05-css-example',
      type: 'code-example',
      codeExample: {
        id: 'code-05-css',
        filename: 'specificity-tokens.css',
        language: 'css',
        title: 'CSS: Specificity, Inheritance, dan Custom Properties',
        code: `:root {
  --color-primary: #2563eb;
  --space-md: 1rem;
}

body {
  color: #1f2937;
  font-family: system-ui, sans-serif;
}

#header {
  color: red;
}

.header {
  color: blue;
}

header .header {
  color: green;
}

.button {
  background-color: var(--color-primary);
  padding: var(--space-md);
  border: none;
  border-radius: 0.375rem;
  color: white;
}`,
        explanation:
          'Contoh specificity: #header (0-1-0) mengalahkan .header (0-0-1). Custom properties di :root membuat nilai desain dapat digunakan ulang di seluruh stylesheet.',
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
      id: 'sec-05-bem-example',
      type: 'code-example',
      codeExample: {
        id: 'code-05-bem',
        filename: 'button-bem.css',
        language: 'css',
        title: 'CSS: Metodologi BEM',
        code: `.button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
}

.button__icon {
  width: 1rem;
  height: 1rem;
}

.button--primary {
  background-color: #2563eb;
  color: #ffffff;
}

.button--primary:hover {
  background-color: #1d4ed8;
}

.button--large {
  padding: 0.75rem 1.5rem;
  font-size: 1.125rem;
}`,
        explanation:
          'BEM menggunakan konvensi Block__Element--Modifier. Setiap class hanya satu tingkat specificity sehingga konflik cascade lebih mudah dikontrol.',
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
      id: 'sec-05-tokens-example',
      type: 'code-example',
      codeExample: {
        id: 'code-05-tokens',
        filename: 'design-tokens.css',
        language: 'css',
        title: 'CSS: Design Tokens dan Dark Mode',
        code: `:root {
  --color-background: #ffffff;
  --color-surface: #f3f4f6;
  --color-text: #111827;
  --color-primary: #2563eb;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --radius-md: 0.5rem;
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #0f172a;
    --color-surface: #1e293b;
    --color-text: #f8fafc;
    --color-primary: #60a5fa;
  }
}

html.dark {
  --color-background: #0f172a;
  --color-surface: #1e293b;
  --color-text: #f8fafc;
}

.card {
  background: var(--color-surface);
  color: var(--color-text);
  padding: var(--space-md);
  border-radius: var(--radius-md);
}`,
        explanation:
          'Design tokens sebagai CSS custom properties menjadi sumber kebenaran tunggal. Dark mode dapat mengikuti prefers-color-scheme atau class manual pada html.',
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
