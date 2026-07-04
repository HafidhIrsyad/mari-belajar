import type { Lesson } from '@/content/types'

export const ch04Lesson: Lesson = {
  id: 'lesson-ch-04-forms-validation',
  estimatedMinutes: 24,
  sections: [
    {
      id: 'sec-04-basic-forms',
      type: 'markdown',
      level: 'basic',
      title: 'Form HTML, Input Types, dan Validasi Bawaan',
      content: `## Elemen Form Dasar

Form HTML terdiri dari elemen \`<form>\` yang membungkus satu atau lebih kontrol input. Atribut penting pada form meliputi \`action\` (URL tujuan), \`method\` (GET atau POST), dan \`novalidate\` (menonaktifkan validasi bawaan jika kita ingin menanganinya sendiri).

## Input Types

HTML5 menyediakan banyak tipe input yang memengaruhi keyboard virtual, validasi, dan picker di perangkat mobile:

- \`text\`, \`email\`, \`tel\`, \`url\`, \`password\`
- \`number\`, \`range\`, \`date\`, \`time\`, \`datetime-local\`
- \`checkbox\`, \`radio\`, \`file\`, \`color\`, \`search\`

## Atribut Validasi Bawaan

- \`required\`: field wajib diisi.
- \`pattern\`: menerima regex untuk memvalidasi format.
- \`min\` dan \`max\`: untuk tipe number, range, atau date.
- \`minlength\` dan \`maxlength\`: untuk panjang teks.

\`\`\`html
<form action="/daftar" method="POST">
  <label for="email">Email</label>
  <input id="email" type="email" name="email" required />

  <label for="telepon">Telepon</label>
  <input id="telepon" type="tel" name="telepon" pattern="[0-9]{10,13}" required />

  <button type="submit">Kirim</button>
</form>
\`\`\`

Setiap input harus memiliki \`<label>\` yang terhubung melalui atribut \`for\` yang sama dengan \`id\` input. Ini sangat penting bagi pengguna screen reader.`,
    },
    {
      id: 'sec-04-html-example',
      type: 'code-example',
      codeExample: {
        id: 'code-04-html',
        filename: 'registration-form.html',
        language: 'html',
        title: 'HTML: Form dengan Validasi Bawaan Browser',
        code: `<form id="registration-form" action="/api/register" method="POST">
  <div>
    <label for="email">Email</label>
    <input
      id="email"
      name="email"
      type="email"
      required
      autocomplete="email"
    />
  </div>
  <div>
    <label for="phone">Telepon</label>
    <input
      id="phone"
      name="phone"
      type="tel"
      pattern="[0-9]{10,13}"
      title="Masukkan 10–13 digit angka"
      required
    />
  </div>
  <button type="submit">Daftar</button>
</form>`,
        explanation:
          'Atribut required, type, dan pattern memberikan validasi HTML5 tanpa JavaScript. Browser menampilkan pesan error bawaan saat form tidak valid.',
      },
    },
    {
      id: 'sec-04-intermediate-feedback',
      type: 'markdown',
      level: 'intermediate',
      title: 'Custom Error Messages dan Accessible Form Feedback',
      content: `## Pesan Error yang Berguna

Pesan error sebaiknya:

1. Jelas menyebutkan apa yang salah.
2. Menjelaskan cara memperbaikinya.
3. Ditempatkan dekat dengan field yang bermasalah.
4. Diumumkan kepada screen reader melalui \`aria-live\`.

## Aria-Describedby dan Aria-Live

\`aria-describedby\` menghubungkan input dengan elemen yang berisi petunjuk atau pesan error. \`aria-live\` memastikan perubahan status, seperti ringkasan error di atas form, dibacakan oleh screen reader.

\`\`\`html
<div aria-live="polite" id="form-status"></div>
<label for="username">Username</label>
<input id="username" aria-describedby="username-hint username-error" />
<div id="username-hint">Minimal 3 karakter, huruf kecil dan angka.</div>
<div id="username-error"></div>
\`\`\`

## Validasi Real-Time vs On-Submit

Validasi real-time saat pengguna mengetik bisa membantu, tetapi terlalu agresif dapat mengganggu. Pola yang umum adalah:

- Validasi ringan saat \`input\` atau \`blur\`.
- Validasi lengkap saat \`submit\`.
- Fokus kembali ke field pertama yang error setelah submit gagal.

Selalu uji navigasi form hanya dengan keyboard untuk memastikan urutan fokus logis.`,
    },
    {
      id: 'sec-04-html-a11y-example',
      type: 'code-example',
      codeExample: {
        id: 'code-04-html-a11y',
        filename: 'accessible-form.html',
        language: 'html',
        title: 'HTML: Form dengan Feedback Aksesibel',
        code: `<form action="/api/contact" method="POST">
  <div aria-live="polite" id="form-status"></div>

  <div>
    <label for="username">Username</label>
    <input
      id="username"
      name="username"
      type="text"
      required
      minlength="3"
      aria-describedby="username-hint username-error"
    />
    <div id="username-hint">Minimal 3 karakter, huruf kecil dan angka.</div>
    <div id="username-error" role="alert"></div>
  </div>

  <div>
    <label for="message">Pesan</label>
    <textarea
      id="message"
      name="message"
      required
      minlength="10"
      aria-describedby="message-error"
    ></textarea>
    <div id="message-error" role="alert"></div>
  </div>

  <button type="submit">Kirim</button>
</form>`,
        explanation:
          'aria-describedby menghubungkan input dengan petunjuk dan pesan error. aria-live dan role="alert" membantu screen reader mengumumkan perubahan status form.',
      },
    },
    {
      id: 'sec-04-advanced-progressive',
      type: 'markdown',
      level: 'advanced',
      title: 'Progressive Enhancement, Server-Side Validation, dan FormData API',
      content: `## Progressive Enhancement

Form HTML yang baik harus tetap berfungsi meskipun JavaScript gagal dimuat. Validasi bawaan browser dan atribut \`required\` serta \`pattern\` adalah lapisan pertama. JavaScript menambahkan pengalaman yang lebih baik tanpa menggantikan fondasi tersebut.

\`\`\`html
<form action="/api/contact" method="POST">
  <!-- Form tetap bekerja tanpa JavaScript -->
</form>
\`\`\`

## Server-Side Validation Tetap Wajib

Validasi di browser bisa diabaikan, dimatikan, atau dimanipulasi. Oleh karena itu, server harus selalu memvalidasi ulang data sebelum memprosesnya. Server-side validation adalah garis pertahanan utama terhadap data berbahaya.

## FormData API

FormData API membaca semua kontrol dalam form secara otomatis berdasarkan atribut \`name\`.

\`\`\`javascript
const form = document.getElementById('contact-form')
form.addEventListener('submit', async (event) => {
  event.preventDefault()
  const data = new FormData(form)
  const body = Object.fromEntries(data.entries())

  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    console.error('Server menolak data')
  }
})
\`\`\`

FormData juga mendukung file upload melalui metode \`append\` dan dapat dikirim langsung sebagai body fetch tanpa JSON.stringify jika server menerima multipart/form-data.`,
    },
    {
      id: 'sec-04-advanced-example',
      type: 'code-example',
      codeExample: {
        id: 'code-04-advanced',
        filename: 'progressive-form.html',
        language: 'html',
        title: 'HTML: Progressive Enhancement dengan Form Native',
        code: `<form action="/api/contact" method="POST" enctype="multipart/form-data">
  <div>
    <label for="email">Email</label>
    <input
      id="email"
      name="email"
      type="email"
      required
      autocomplete="email"
    />
  </div>
  <div>
    <label for="message">Pesan</label>
    <textarea
      id="message"
      name="message"
      required
      minlength="10"
      rows="4"
    ></textarea>
  </div>
  <div>
    <label for="attachment">Lampiran (opsional)</label>
    <input id="attachment" name="attachment" type="file" accept=".pdf,.png" />
  </div>
  <button type="submit">Kirim</button>
</form>`,
        explanation:
          'Form dengan action dan method native tetap berfungsi tanpa JavaScript. enctype multipart/form-data mendukung upload file — progressive enhancement menambahkan UX JavaScript di atas fondasi HTML ini.',
      },
    },
    {
      id: 'sec-04-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Keamanan:** jangan pernah mengandalkan validasi klien. HTML5 validation dan JavaScript hanya untuk UX; server harus selalu memvalidasi dan membersihkan data. Pastikan setiap input memiliki label, setiap error memiliki deskripsi, dan pesan kesalahan diumumkan ke screen reader.',
    },
  ],
}
