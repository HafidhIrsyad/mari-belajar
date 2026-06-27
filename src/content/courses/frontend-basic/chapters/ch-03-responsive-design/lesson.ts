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
      id: 'sec-03-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-03-js',
        filename: 'responsive-nav.js',
        language: 'javascript',
        title: 'JavaScript: Responsive Navigation dengan matchMedia',
        code: `function initResponsiveNav(toggleId, navId) {
  const toggle = document.getElementById(toggleId)
  const nav = document.getElementById(navId)
  if (!toggle || !nav) return

  // Tutup menu secara default di layar kecil
  nav.hidden = true

  toggle.addEventListener('click', () => {
    const isHidden = nav.hidden
    nav.hidden = !isHidden
    toggle.setAttribute('aria-expanded', String(isHidden))
  })

  // Buka menu otomatis saat layar cukup lebar
  const media = window.matchMedia('(min-width: 768px)')
  function handleMediaChange(event) {
    if (event.matches) {
      nav.hidden = false
      toggle.setAttribute('aria-expanded', 'true')
    } else {
      nav.hidden = true
      toggle.setAttribute('aria-expanded', 'false')
    }
  }
  media.addEventListener('change', handleMediaChange)
  handleMediaChange(media)
}

initResponsiveNav('menu-toggle', 'main-nav')`,
        explanation:
          'matchMedia memungkinkan JavaScript bereaksi terhadap breakpoint yang sama dengan CSS. Dengan menyetel aria-expanded, screen reader dapat memberitahu pengguna apakah menu terbuka.',
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
      id: 'sec-03-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-03-ts',
        filename: 'useMediaQuery.ts',
        language: 'typescript',
        title: 'TypeScript: React Hook untuk Media Query',
        code: `import { useState, useEffect, useSyncExternalStore } from 'react'

function subscribe(callback: () => void, query: string) {
  const media = window.matchMedia(query)
  media.addEventListener('change', callback)
  return () => media.removeEventListener('change', callback)
}

function getSnapshot(query: string) {
  return window.matchMedia(query).matches
}

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' ? getSnapshot(query) : false
  )

  useEffect(() => {
    if (typeof window === 'undefined') return
    return subscribe(() => setMatches(getSnapshot(query)), query)
  }, [query])

  return matches
}

// Penggunaan
function App() {
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  return <p>{isDesktop ? 'Layout desktop' : 'Layout mobile'}</p>
}`,
        explanation:
          'Hook ini membungkus matchMedia agar komponen React dapat bereaksi terhadap perubahan viewport. Versi produksi bisa menggunakan useSyncExternalStore untuk integrasi yang lebih baik dengan concurrent rendering.',
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
      id: 'sec-03-conceptual-example',
      type: 'code-example',
      codeExample: {
        id: 'code-03-conceptual',
        filename: 'responsive-strategies.js',
        language: 'javascript',
        title: 'Perbandingan Runtime: Media Query vs Container Query vs ResizeObserver',
        code: `const strategies = {
  mediaQuery: {
    scope: 'viewport',
    api: 'window.matchMedia',
    bestFor: 'Layout global seperti nav, sidebar, grid halaman',
    performance: 'Tinggi, didukung native CSS',
  },
  containerQuery: {
    scope: 'container element',
    api: '@container (CSS)',
    bestFor: 'Komponen reusable seperti card, table, chart',
    performance: 'Tinggi, didukung modern browser',
  },
  resizeObserver: {
    scope: 'element',
    api: 'ResizeObserver',
    bestFor: 'Integrasi dengan canvas, map, atau library pihak ketiga',
    performance: 'Baik, tetapi menjalankan callback di JavaScript',
  },
}

function chooseStrategy(componentContext) {
  if (componentContext.isSelfContained) return strategies.containerQuery
  if (componentContext.needsPixelExactSize) return strategies.resizeObserver
  return strategies.mediaQuery
}

console.log(chooseStrategy({ isSelfContained: true }))`,
        explanation:
          'Setiap mekanisme responsif memiliki scope dan trade-off berbeda. Media query berbasis viewport tetap relevan untuk layout halaman, sementara container query lebih tepat untuk komponen yang tidak tahu di mana akan dipakai.',
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
