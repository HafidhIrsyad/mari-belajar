import type { Lesson } from '@/content/types'

export const ch02Lesson: Lesson = {
  id: 'lesson-ch-02-css-layout-fundamentals',
  estimatedMinutes: 25,
  sections: [
    {
      id: 'sec-02-basic-box',
      type: 'markdown',
      level: 'basic',
      title: 'Box Model, Display, dan Positioning',
      content: `## Box Model

Setiap elemen HTML di browser direpresentasikan sebagai kotak persegi panjang. Kotak tersebut tersusun dari empat lapisan:

1. **Content**: area tempat teks atau gambar ditampilkan.
2. **Padding**: ruang di dalam border, antara content dan border.
3. **Border**: garis pembatas di luar padding.
4. **Margin**: ruang di luar border yang menjauhkan elemen dari tetangganya.

Secara default, browser menggunakan \`box-sizing: content-box\`, yang berarti \`width\` dan \`height\` hanya berlaku untuk content. Jika kita menambahkan padding atau border, elemen akan membesar. Sebaliknya, \`box-sizing: border-box\` membuat \`width\` dan \`height\` mencakup content, padding, dan border.

\`\`\`css
* {
  box-sizing: border-box;
}
\`\`\`

## Display Types

Properti \`display\` menentukan cara elemen berperilaku dalam layout:

- \`block\`: elemen mengambil lebar penuh dan memulai baris baru.
- \`inline\`: elemen mengalir di dalam teks, tidak memaksa baris baru.
- \`inline-block\`: campuran inline yang bisa diberi width dan height.
- \`flex\`: mengaktifkan flex formatting context untuk anak-anaknya.
- \`grid\`: mengaktifkan grid formatting context untuk anak-anaknya.
- \`none\`: elemen dihilangkan dari render tree.

## Positioning dan Stacking Context

\`position\` mengontrol cara elemen ditempatkan:

- \`static\`: nilai default, mengikuti alur dokumen.
- \`relative\`: diposisikan relatif terhadap posisi normalnya.
- \`absolute\`: diposisikan relatif terhadap ancestor terdekat yang positioned.
- \`fixed\`: diposisikan relatif terhadap viewport.
- \`sticky\`: berperilaku relative hingga mencapai threshold scroll, lalu fixed.

\`z-index\` hanya berlaku pada elemen yang membentuk stacking context, seperti elemen dengan \`position\` selain static atau dengan \`opacity\` kurang dari 1, \`transform\`, dan \`filter\`.`,
    },
    {
      id: 'sec-02-css-example',
      type: 'code-example',
      codeExample: {
        id: 'code-02-css',
        filename: 'card-layout.css',
        language: 'css',
        title: 'CSS: Box Model pada Card Layout',
        code: `* {
  box-sizing: border-box;
}

.card {
  width: 300px;
  padding: 16px;
  border: 2px solid #3b82f6;
  margin: 16px;
  border-radius: 8px;
  background-color: #ffffff;
}

.card h2 {
  margin-top: 0;
  font-size: 1.25rem;
}

.card p {
  margin-bottom: 0;
  color: #475569;
}`,
        explanation:
          'Property width, padding, border, dan margin memperlihatkan box model secara langsung. border-box memastikan lebar total elemen tetap 300px termasuk padding dan border.',
      },
    },
    {
      id: 'sec-02-intermediate-pipeline',
      type: 'markdown',
      level: 'intermediate',
      title: 'CSSOM, Render Tree, dan Layout Engine Pipeline',
      content: `## Dari DOM dan CSSOM ke Render Tree

Browser membaca HTML dan membangun **DOM tree**. Kemudian browser membaca CSS dan membangun **CSSOM tree**. Kedua tree digabungkan menjadi **render tree**, yang hanya berisi node yang benar-benar akan ditampilkan.

Node dengan \`display: none\` tidak masuk render tree. Node dengan \`visibility: hidden\` masuk render tree karena masih mengambil ruang.

## Pipeline Rendering

Setelah render tree terbentuk, browser menjalankan serangkaian langkah:

1. **Style**: menghitung computed style untuk setiap node.
2. **Layout** (reflow): menghitung ukuran dan posisi setiap node.
3. **Paint**: mengisi piksel dengan warna, gambar, teks, dan bayangan.
4. **Composite**: menggabungkan layer yang sudah dipisah menjadi tampilan akhir.

Perubahan pada properti seperti \`width\`, \`height\`, \`top\`, dan \`left\` memicu layout ulang. Perubahan pada \`color\` atau \`background-color\` hanya memicu paint. Perubahan pada \`transform\` dan \`opacity\` biasanya hanya memicu composite, sehingga lebih murah.

## Flexbox dan Grid Formatting Contexts

Flex formatting context memungkinkan distribusi ruang sepanjang satu sumbu utama. Grid formatting context membagi ruang menjadi baris dan kolom yang bisa diatur secara eksplisit.

Keduanya adalah *formatting contexts* yang mengubah cara anak elemen diukur dan diposisikan. Elemen di luar formatting context tidak terpengaruh oleh layout internal flex atau grid container.`,
    },
    {
      id: 'sec-02-flex-grid-example',
      type: 'code-example',
      codeExample: {
        id: 'code-02-flex-grid',
        filename: 'navbar-layout.css',
        language: 'css',
        title: 'CSS: Flexbox untuk Navbar Layout',
        code: `.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background-color: #0f172a;
  color: #f8fafc;
}

.navbar__links {
  display: flex;
  gap: 1rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 2rem;
}`,
        explanation:
          'Flexbox mengatur distribusi ruang sepanjang satu sumbu (navbar), sedangkan Grid membagi area menjadi baris dan kolom (card grid). Keduanya membentuk formatting context yang berbeda.',
      },
    },
    {
      id: 'sec-02-advanced-internals',
      type: 'markdown',
      level: 'advanced',
      title: 'Container Queries, Intrinsic Sizing, dan Compositor Thread',
      content: `## Container Queries

Media queries bereaksi terhadap viewport, sedangkan **container queries** bereaksi terhadap ukuran container induk. Ini memungkinkan komponen merespons ruang yang sebenarnya tersedia, bukan lebar layar perangkat.

\`\`\`css
.card-container {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    display: flex;
    gap: 1rem;
  }
}
\`\`\`

## Intrinsic Sizing

CSS modern menyediakan kata kunci sizing intrinsik:

- \`min-content\`: lebar minimum yang dibutuhkan konten tanpa overflow.
- \`max-content\`: lebar maksimum yang dibutuhkan konten dalam satu baris.
- \`fit-content\`: mengambil ruang yang tersedia tetapi tidak melebihi max-content.

## Layer Promotion dan Compositor Thread

Browser dapat mempromosikan elemen tertentu ke layer terpisah di compositor thread, misalnya dengan \`will-change: transform\` atau \`transform: translateZ(0)\`. Layer terpisah memungkinkan animasi tanpa perlu repaint atau layout ulang pada frame utama.

Namun, layer terlalu banyak meningkatkan konsumsi memori. Gunakan \`will-change\` dengan bijak dan hapus setelah animasi selesai.

## Forced Synchronous Layout

Terjadi ketika JavaScript membaca properti layout seperti \`offsetWidth\` setelah menulis properti style. Browser harus menyelesaikan layout yang tertunda untuk memberikan nilai akurat, yang menghambat main thread.

\`\`\`javascript
// Anti-pattern: write-read-write
for (const box of boxes) {
  box.style.width = '100px'
  const width = box.offsetWidth // forced synchronous layout
  box.style.height = width + 'px'
}
\`\`\`

## Property Contain

\`contain\` memberi tahu browser bahwa perubahan pada elemen tidak akan memengaruhi area di luar elemen tersebut. Nilai seperti \`layout\`, \`paint\`, \`size\`, dan \`strict\` dapat mengurangi area yang perlu di-reflow saat elemen berubah.`,
    },
    {
      id: 'sec-02-advanced-example',
      type: 'code-example',
      codeExample: {
        id: 'code-02-advanced',
        filename: 'layout.css',
        language: 'css',
        title: 'CSS: Grid Layout dengan Container Queries dan Contain',
        code: `.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  container-type: inline-size;
}

.card {
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 0.5rem;
  contain: layout paint;
}

@container (max-width: 600px) {
  .card-grid {
    grid-template-columns: 1fr;
  }
}

.card:hover {
  transform: translateY(-2px);
  opacity: 0.95;
}`,
        explanation:
          'CSS Grid mengatur layout dua dimensi, container queries membuat komponen responsif tanpa media query global, dan property contain membantu browser mengisolasi area reflow untuk performa layout yang lebih baik.',
      },
    },
    {
      id: 'sec-02-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Performance tip:** animasikan transform dan opacity untuk menghindari layout thrashing. Jika harus mengubah layout, batch semua penulisan style lalu baru membaca nilai layout. Gunakan border-box secara global agar ukuran elemen lebih mudah dikalkulasi.',
    },
  ],
}
