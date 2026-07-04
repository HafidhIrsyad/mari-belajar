import type { Lesson } from '@/content/types'

export const ch03Lesson: Lesson = {
  id: 'lesson-ch-03-responsive-design',
  estimatedMinutes: 22,
  sections: [
    {
      id: 'sec-03-basic-responsive',
      type: 'markdown',
      level: 'basic',
      title: 'Viewport, Media Queries, dan Mobile-First',
      content: `## Viewport Meta Tag

Tag \`<meta name="viewport" ... />\` memberi tahu browser cara menyesuaikan lebar halaman dengan layar perangkat. Tanpanya, browser mobile akan menskala halaman desktop secara keseluruhan.

\`\`\`html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
\`\`\`

## Media Queries

Media queries memungkinkan kita menerapkan CSS berdasarkan karakteristik device, seperti lebar viewport.

\`\`\`css
/* Mobile-first: default untuk layar kecil */
.card {
  width: 100%;
}

/* Tablet */
@media (min-width: 768px) {
  .card {
    width: 48%;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .card {
    width: 30%;
  }
}
\`\`\`

## Mobile-First vs Desktop-First

**Mobile-first** menulis style dasar untuk layar terkecil, lalu menambahkan breakpoint untuk layar lebih besar menggunakan \`min-width\`. Pendekatan ini umumnya lebih mudah di-maintain karena style dasar lebih sederhana.

**Desktop-first** dimulai dari layout kompleks lalu mengoverride dengan \`max-width\` untuk layar lebih kecil. Pendekatan ini kadang masih digunakan untuk migrasi lama tetapi cenderung menghasilkan lebih banyak override.`,
    },
    {
      id: 'sec-03-css-example',
      type: 'code-example',
      codeExample: {
        id: 'code-03-css',
        filename: 'responsive-cards.css',
        language: 'css',
        title: 'CSS: Media Queries Mobile-First',
        code: `/* Mobile-first: default untuk layar kecil */
.card {
  width: 100%;
  padding: 1rem;
}

.card-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Tablet */
@media (min-width: 768px) {
  .card-grid {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .card {
    width: 48%;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .card {
    width: 30%;
  }
}`,
        explanation:
          'Pendekatan mobile-first menulis style dasar untuk layar kecil, lalu menambahkan min-width breakpoint saat layout perlu berubah.',
      },
    },
    {
      id: 'sec-03-intermediate-fluid',
      type: 'markdown',
      level: 'intermediate',
      title: 'Fluid Typography, Responsive Images, dan Breakpoint Strategy',
      content: `## Fluid Typography dengan clamp()

Fungsi \`clamp(min, preferred, max)\` membatasi nilai antara batas bawah dan atas. Sangat berguna untuk ukuran font yang menyesuaikan viewport tanpa media query yang banyak.

\`\`\`css
:root {
  --font-size-base: clamp(1rem, 0.85rem + 0.5vw, 1.25rem);
  --font-size-heading: clamp(1.75rem, 1.25rem + 2vw, 3rem);
}
\`\`\`

Nilai preferensi biasanya menggunakan unit viewport seperti \`vw\` dikombinasikan dengan nilai relatif, sehingga tetap dapat diskalakan oleh pengguna.

## Responsive Images

Atribut \`srcset\` dan \`sizes\` memungkinkan browser memilih gambar yang paling sesuai berdasarkan lebar slot gambar dan DPR perangkat.

\`\`\`html
<img
  srcset="hero-400.webp 400w, hero-800.webp 800w, hero-1200.webp 1200w"
  sizes="(min-width: 1000px) 50vw, 100vw"
  src="hero-800.webp"
  alt="Ilustrasi responsive design"
/>
\`\`\`

Untuk kasus format atau orientasi berbeda, gunakan elemen \`<picture>\`.

## Strategi Breakpoint

Jangan menargetkan device tertentu seperti "iPhone" atau "iPad". Sebaiknya pilih breakpoint berdasarkan perubahan layout yang sebenarnya dibutuhkan konten. Umumnya dimulai dengan satu breakpoint untuk tablet dan satu untuk desktop, lalu ditambahkan jika konten benar-benar membutuhkan.`,
    },
    {
      id: 'sec-03-fluid-css-example',
      type: 'code-example',
      codeExample: {
        id: 'code-03-fluid-css',
        filename: 'fluid-typography.css',
        language: 'css',
        title: 'CSS: Fluid Typography dan Responsive Images',
        code: `:root {
  --font-size-base: clamp(1rem, 0.85rem + 0.5vw, 1.25rem);
  --font-size-heading: clamp(1.75rem, 1.25rem + 2vw, 3rem);
}

body {
  font-size: var(--font-size-base);
}

h1 {
  font-size: var(--font-size-heading);
}

.hero-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 0.5rem;
}`,
        explanation:
          'Fungsi clamp() membuat tipografi menyesuaikan viewport tanpa banyak media query. Kombinasi width 100% dan height auto membuat gambar responsif di berbagai lebar layar.',
      },
    },
    {
      id: 'sec-03-advanced-container',
      type: 'markdown',
      level: 'advanced',
      title: 'Container Queries dan Fungsi Min / Max / Clamp',
      content: `## Container Queries

Media queries berbasis viewport sering kali tidak cukup untuk komponen yang digunakan di berbagai konteks. Container queries memungkinkan elemen beradaptasi berdasarkan ukuran container induk.

\`\`\`css
.card-wrapper {
  container-type: inline-size;
  container-name: card;
}

@container card (min-width: 400px) {
  .card {
    display: flex;
    flex-direction: row;
  }
}
\`\`\`

\`container-type: inline-size\` memberitahu browser untuk melacak lebar container. Elemen anak dapat menyesuaikan layout tanpa tahu lebar viewport.

## Fungsi Min, Max, dan Clamp

Tiga fungsi ini memungkinkan layout yang lebih fleksibel:

- \`min(50%, 600px)\`: memilih nilai terkecil antara 50% viewport dan 600px.
- \`max(300px, 30vw)\`: memilih nilai terbesar.
- \`clamp(1rem, 2vw, 2rem)\`: membatasi nilai di antara minimum dan maksimum.

Kombinasi ini mengurangi kebutuhan breakpoint manual dan membuat layout lebih responsif terhadap konten.

## Responsive Component Patterns

Pola umum meliputi:

- **Content reflow**: elemen beralih dari kolom tunggal menjadi multi-kolom.
- **Sidebar collapse**: sidebar berpindah ke bawah konten utama di layar kecil.
- **Navigation morphing**: menu horizontal menjadi menu bertumpuk dengan drawer.
- **Image crop**: gambar yang berbeda dipilih melalui picture atau object-fit.`,
    },
    {
      id: 'sec-03-container-example',
      type: 'code-example',
      codeExample: {
        id: 'code-03-container',
        filename: 'container-queries.css',
        language: 'css',
        title: 'CSS: Container Queries dan Min/Max/Clamp',
        code: `.card-wrapper {
  container-type: inline-size;
  container-name: card;
}

.card {
  display: block;
  padding: 1rem;
}

@container card (min-width: 400px) {
  .card {
    display: flex;
    flex-direction: row;
    gap: 1rem;
  }
}

.sidebar {
  width: min(50%, 600px);
  font-size: clamp(0.875rem, 1vw + 0.5rem, 1.125rem);
}`,
        explanation:
          'Container queries membuat komponen beradaptasi terhadap lebar container induk, bukan viewport. Fungsi min() dan clamp() memberi batas fleksibel tanpa breakpoint manual.',
      },
    },
    {
      id: 'sec-03-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Kesalahan umum:** menambahkan terlalu banyak breakpoint berdasarkan device tertentu. Fokuslah pada perubahan konten, bukan merk perangkat. Selalu uji pada ukuran viewport yang berbeda dan periksa unduhan gambar di tab Network DevTools.',
    },
  ],
}
