import type { Lesson } from "@/content/types";

export const ch06Lesson: Lesson = {
  id: "lesson-ch-06-accessibility-dasar",
  estimatedMinutes: 21,
  sections: [
    {
      id: "sec-06-basic-accessibility",
      type: "markdown",
      level: "basic",
      title: "Prinsip WCAG, Semantic HTML, dan Keyboard Navigation",
      content: `## Empat Prinsip WCAG

WCAG menyusun aksesibilitas ke dalam empat prinsip yang sering disingkat **POUR**:

1. **Perceivable**: informasi harus dapat dipersepsikan. Contohnya teks alternatif untuk gambar, kontras warna yang cukup, dan keterangan untuk video.
2. **Operable**: antarmuka harus dapat dioperasikan. Pengguna harus bisa menavigasi dengan keyboard dan tidak terjebak oleh waktu.
3. **Understandable**: konten dan operasi harus mudah dipahami. Bahasa yang jelas dan pesan error yang informatif termasuk di sini.
4. **Robust**: konten harus bekerja dengan berbagai teknologi assistif dan browser.

## Keyboard Navigation

Banyak pengguna tidak menggunakan mouse. Mereka menavigasi dengan tombol Tab, Shift+Tab, Enter, Space, dan panah. Oleh karena itu:

- Semua kontrol interaktif harus dapat difokus.
- Urutan fokus harus mengikuti urutan visual.
- Focus indicator harus terlihat jelas.

\`\`\`css
:focus-visible {
  outline: 2px solid #2563eb;
  outline-offset: 2px;
}
\`\`\`

## Alt Text

Atribut \`alt\` pada gambar memberikan deskripsi teks. Gunakan:

- Alt yang menjelaskan fungsi gambar jika gambar tersebut mengandung informasi.
- \`alt=""\` untuk gambar dekoratif agar screen reader melewatinya.
- Hindari \`alt="gambar"\` atau \`alt="logo"\` yang tidak memberikan konteks.

## Semantic HTML sebagai Fondasi

Tag semantik seperti \`<button>\`, \`<a>\`, \`<nav>\`, dan \`<main>\` sudah memiliki peran bawaan. Menggunakannya dengan benar seringkali lebih baik daripada menambahkan banyak atribut ARIA.`,
    },
    {
      id: "sec-06-html-example",
      type: "code-example",
      codeExample: {
        id: "code-06-html",
        filename: "accessible-content.html",
        language: "html",
        title: "HTML: Konten Aksesibel dengan Semantik dan Alt Text",
        code: `<main>
  <h1>Panduan Aksesibilitas</h1>

  <nav aria-label="Navigasi utama">
    <ul>
      <li><a href="/">Beranda</a></li>
      <li><a href="/kursus">Kursus</a></li>
    </ul>
  </nav>

  <figure>
    <img src="hero.jpg" alt="Tim belajar di depan laptop" />
    <figcaption>Sesi belajar kolaboratif.</figcaption>
  </figure>

  <img src="decoration.svg" alt="" role="presentation" />

  <form>
    <label for="email">Email</label>
    <input id="email" type="email" name="email" required />
    <button type="submit">Kirim</button>
  </form>
</main>`,
        explanation:
          "Label eksplisit, alt text bermakna, dan gambar dekoratif dengan alt kosong adalah fondasi aksesibilitas HTML tanpa JavaScript.",
      },
    },
    {
      id: "sec-06-intermediate-aria",
      type: "markdown",
      level: "intermediate",
      title: "ARIA Labels, Focus Management, dan Color Contrast",
      content: `## ARIA Labels

ARIA dapat memperkaya atau mengubah peran elemen, tetapi sebaiknya digunakan hanya ketika HTML semantik tidak cukup. Atribut umum meliputi:

- \`aria-label\`: memberi nama elemen ketika teks tidak terlihat.
- \`aria-labelledby\`: menghubungkan elemen dengan elemen lain yang berisi label.
- \`aria-describedby\`: menghubungkan elemen dengan deskripsi tambahan.
- \`aria-hidden="true"\`: menyembunyikan elemen dari accessibility tree.

\`\`\`html
<button aria-label="Tutup dialog">×</button>
<input aria-describedby="email-error" id="email" type="email" />
<div id="email-error">Email tidak valid</div>
\`\`\`

## Focus Management

Saat komponen muncul seperti modal atau dropdown, fokus harus dipindahkan ke komponen tersebut. Saat komponen ditutup, fokus harus dikembalikan ke elemen pemicu. Ini mencegah pengguna kehilangan konteks.

## Color Contrast

Konten teks harus memiliki rasio kontras minimum terhadap latar belakang:

- **4.5:1** untuk teks normal (WCAG AA).
- **3:1** untuk teks besar atau komponen UI grafis.

Gunakan alat seperti DevTools contrast checker atau axe DevTools untuk memeriksa. Perhatikan juga bahwa informasi tidak boleh hanya disampaikan melalui warna. Misalnya, link harus memiliki underline atau ikon tambahan selain warna biru.

## Screen Reader Basics

Screen reader membaca accessibility tree, bukan DOM visual. Mereka menggunakan:

- Nama elemen dari label, aria-label, atau konten teks.
- Peran elemen seperti button, link, atau heading.
- Properti dan status seperti checked, expanded, atau disabled.

Menguji dengan screen reader sungguhan seperti NVDA, JAWS, atau VoiceOver memberikan wawasan yang tidak didapat dari audit otomatis semata.`,
    },
    {
      id: "sec-06-html-aria-example",
      type: "code-example",
      codeExample: {
        id: "code-06-html-aria",
        filename: "aria-patterns.html",
        language: "html",
        title: "HTML: ARIA Labels dan Form Feedback",
        code: `<button aria-label="Tutup dialog">&times;</button>

<label for="email">Email</label>
<input
  id="email"
  type="email"
  aria-describedby="email-hint email-error"
  aria-invalid="true"
/>
<div id="email-hint">Gunakan email aktif Anda.</div>
<div id="email-error" role="alert">Email tidak valid.</div>

<section aria-labelledby="news-heading">
  <h2 id="news-heading">Berita Terbaru</h2>
  <p>Konten section dengan landmark yang jelas.</p>
</section>`,
        explanation:
          'aria-label, aria-describedby, dan aria-labelledby melengkapi HTML semantik ketika label visual tidak cukup. role="alert" mengumumkan error ke screen reader.',
      },
    },
    {
      id: "sec-06-advanced-audit",
      type: "markdown",
      level: "advanced",
      title: "Audits dengan Lighthouse, axe, dan Accessible Components",
      content: `## Audit Otomatis

Alat audit otomatis membantu menemukan masalah aksesibilitas umum dengan cepat:

- **Lighthouse**: tersedia di Chrome DevTools, memberikan skor aksesibilitas dan daftar masalah.
- **axe DevTools**: extension berbasis engine axe-core, mendeteksi pelanggaran WCAG.
- **WAVE**: visualisasi masalah aksesibilitas langsung di halaman.

Meski berguna, audit otomatis hanya menangkap sekitar 20-30% masalah aksesibilitas. Pengujian manual tetap penting.

## Accessible Component Patterns

Komponen yang kompleks seperti accordion, tabs, dan combobox memerlukan pola yang jelas. Referensi utama adalah WAI-ARIA Authoring Practices Guide (APG), yang menyediakan pola keyboard dan ARIA yang direkomendasikan.

Pola umum:

- **Accordion**: tombol mengontrol panel, aria-expanded menunjukkan status.
- **Tabs**: daftar tab dengan aria-selected dan panel yang dihubungkan aria-labelledby.
- **Dialog**: role="dialog", aria-modal="true", fokus terjebak di dalam.

## Reduced Motion

Pengguna dengan gangguan vestibular dapat mematikan animasi di sistem operasi. Hormati preferensi tersebut dengan media query:

\`\`\`css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
\`\`\`

Hindari animasi yang berkedip cepat karena dapat memicu kejang fotosensitif.`,
    },
    {
      id: "sec-06-advanced-example",
      type: "code-example",
      codeExample: {
        id: "code-06-advanced",
        filename: "dialog-accordion.html",
        language: "html",
        title: "HTML: Dialog Native dan Accordion Aksesibel",
        code: `<button type="button" popovertarget="info-dialog">
  Buka informasi
</button>

<dialog id="info-dialog" aria-labelledby="dialog-title">
  <h2 id="dialog-title">Informasi Penting</h2>
  <p>Elemen dialog native mendukung fokus dan penutupan dengan Escape.</p>
  <form method="dialog">
    <button type="submit">Tutup</button>
  </form>
</dialog>

<details>
  <summary>Apa itu WCAG?</summary>
  <p>Web Content Accessibility Guidelines — standar aksesibilitas web.</p>
</details>

<details>
  <summary>Bagaimana cara audit?</summary>
  <p>Gunakan Lighthouse, axe DevTools, dan uji manual dengan keyboard.</p>
</details>`,
        explanation:
          "Elemen dialog dan details/summary HTML native sudah memiliki perilaku aksesibel bawaan. Ini lebih baik daripada membangun modal custom jika kebutuhan sederhana.",
      },
    },
    {
      id: "sec-06-summary",
      type: "callout",
      calloutType: "info",
      content:
        "**Ingat:** aksesibilitas bukan fitur tambahan. Mulailah dengan HTML semantik, uji navigasi keyboard, periksa kontras, dan gunakan ARIA hanya jika diperlukan. Audit otomatis membantu, tetapi pengujian manual dengan screen reader adalah standar emas.",
    },
  ],
};
