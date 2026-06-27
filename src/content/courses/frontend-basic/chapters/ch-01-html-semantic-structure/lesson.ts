import type { Lesson } from '@/content/types'

export const ch01Lesson: Lesson = {
  id: 'lesson-ch-01-html-semantic-structure',
  estimatedMinutes: 20,
  sections: [
    {
      id: 'sec-01-basic-semantic',
      type: 'markdown',
      level: 'basic',
      title: 'Anatomi Dokumen HTML Semantik',
      content: `## Struktur Dasar Dokumen HTML

Setiap dokumen HTML dimulai dengan deklarasi \`<!DOCTYPE html>\`. Deklarasi ini memberi tahu browser bahwa dokumen menggunakan HTML5. Setelahnya, elemen \`<html>\` menjadi akar dari seluruh dokumen, yang terdiri dari \`<head>\` dan \`<body>\`.

- \`<head>\`: berisi metadata seperti charset, viewport, title, dan link stylesheet.
- \`<body>\`: berisi konten yang benar-benar ditampilkan kepada pengguna.

\`\`\`html
<!DOCTYPE html>
<html lang="id">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Landing Page</title>
  </head>
  <body>
    <!-- konten halaman -->
  </body>
</html>
\`\`\`

## Tag Semantik Utama

Tag semantik menggambarkan makna kontennya, bukan hanya cara menampilkannya. Berikut tag yang paling sering digunakan:

- \`<header>\`: pengenal halaman atau bagian, biasanya berisi logo dan navigasi.
- \`<nav>\`: blok tautan navigasi utama.
- \`<main>\`: konten utama halaman, hanya boleh ada satu per dokumen.
- \`<article>\`: konten mandiri seperti artikel berita atau posting blog.
- \`<section>\`: pengelompokan konten tematik yang memiliki heading.
- \`<aside>\`: konten sampingan yang berhubungan secara lateral.
- \`<footer>\`: informasi penutup seperti hak cipta atau tautan terkait.

## Hierarki Heading

Heading \`<h1>\` sampai \`<h6>\` membentuk outline dokumen. Aturan praktisnya:

1. Gunakan satu \`<h1>\` untuk judul utama halaman.
2. Jangan melompati level heading, misalnya dari \`<h2>\` langsung ke \`<h4>\`.
3. Heading dalam \`<section>\` atau \`<article>\` dapat memulai ulang hierarki secara logis.

Hierarki yang rapi membantu screen reader dan mesin pencari memahami struktur informasi.`,
    },
    {
      id: 'sec-01-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-01-js',
        filename: 'semantic-builder.js',
        language: 'javascript',
        title: 'JavaScript: Membangun Struktur Semantik dengan DOM',
        code: `function buildSemanticPage(container) {
  const header = document.createElement('header')
  const nav = document.createElement('nav')
  nav.innerHTML = '<a href="/">Beranda</a> <a href="/tentang">Tentang</a>'
  header.appendChild(nav)

  const main = document.createElement('main')

  const article = document.createElement('article')
  const h1 = document.createElement('h1')
  h1.textContent = 'Panduan HTML Semantik'
  article.appendChild(h1)

  const section = document.createElement('section')
  const h2 = document.createElement('h2')
  h2.textContent = 'Mengapa Semantik Penting'
  section.appendChild(h2)
  section.appendChild(document.createTextNode('Tag yang tepat membantu aksesibilitas dan SEO.'))
  article.appendChild(section)

  main.appendChild(article)

  const footer = document.createElement('footer')
  footer.textContent = '© 2026 Mari Belajar'

  container.appendChild(header)
  container.appendChild(main)
  container.appendChild(footer)
}

const app = document.getElementById('app')
if (app) buildSemanticPage(app)`,
        explanation:
          'Kode ini membangun struktur semantik murni melalui DOM API. Browser akan menghasilkan accessibility tree yang mencerminkan landmark header, nav, main, article, dan footer.',
      },
    },
    {
      id: 'sec-01-intermediate-seo',
      type: 'markdown',
      level: 'intermediate',
      title: 'SEO Basics, Rich Media, dan Meta Tags',
      content: `## Meta Tags yang Penting

Di luar \`<title>\`, terdapat beberapa meta tag yang memengaruhi tampilan hasil pencarian dan pratinjau media sosial:

- \`<meta name="description" content="..." />\`: ringkasan halaman di SERP.
- \`<meta property="og:title" content="..." />\`: judul Open Graph.
- \`<meta property="og:description" content="..." />\`: deskripsi Open Graph.
- \`<meta property="og:image" content="..." />\`: gambar pratinjau saat dibagikan.
- \`<meta name="twitter:card" content="summary_large_image" />\`: format kartu Twitter.

## Elemen Gambar dan Waktu

Elemen \`<figure>\` dan \`<figcaption>\` mengaitkan gambar dengan keterangan secara semantik. Elemen \`<picture>\` memungkinkan penyediaan sumber gambar berbeda berdasarkan kondisi viewport atau dukungan format.

\`\`\`html
<figure>
  <picture>
    <source srcset="hero-large.webp" media="(min-width: 800px)" />
    <img src="hero-small.webp" alt="Tim developer sedang berdiskusi" />
  </picture>
  <figcaption>Tim Frontend saat sesi review kode.</figcaption>
</figure>
\`\`\`

Elemen \`<time datetime="2026-06-27">27 Juni 2026</time>\` memberikan makna mesin pada tanggal. Elemen \`<address>\` digunakan untuk informasi kontak terkait artikel atau halaman, bukan untuk alamat geografis sembarang.

## Label yang Bermakna

Atribut \`alt\` pada gambar harus menjelaskan fungsi gambar, bukan sekadar \`"gambar"\`. Jika gambar hanya dekoratif, gunakan \`alt=""\` agar screen reader melewatinya.`,
    },
    {
      id: 'sec-01-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-01-ts',
        filename: 'SemanticPage.tsx',
        language: 'typescript',
        title: 'TypeScript: Komponen Halaman Semantik dengan TSX',
        code: `import type { ReactNode } from 'react'

interface SemanticPageProps {
  title: string
  publishDate: string
  children: ReactNode
}

export function SemanticPage({ title, publishDate, children }: SemanticPageProps) {
  return (
    <>
      <header>
        <nav aria-label="Navigasi utama">
          <a href="/">Beranda</a>
          <a href="/kursus">Kursus</a>
        </nav>
      </header>
      <main>
        <article>
          <h1>{title}</h1>
          <p>
            Dipublikasikan pada{' '}
            <time dateTime={publishDate}>
              {new Date(publishDate).toLocaleDateString('id-ID')}
            </time>
          </p>
          {children}
        </article>
      </main>
      <footer>
        <address>
          Hubungi kami di{' '}
          <a href="mailto:halo@maribelajar.id">halo@maribelajar.id</a>
        </address>
      </footer>
    </>
  )
}`,
        explanation:
          'TSX memungkinkan kita menulis struktur semantik dengan tipe yang eksplisit. aria-label pada nav membantu screen reader membedakan beberapa blok navigasi.',
      },
    },
    {
      id: 'sec-01-advanced-outline',
      type: 'markdown',
      level: 'advanced',
      title: 'Document Outline, Accessibility Tree, dan Landmark Regions',
      content: `## Document Outline Algorithm

Browser membentuk outline dokumen berdasarkan elemen sectioning seperti \`<section>\`, \`<article>\`, \`<nav>\`, \`<aside>\`, dan heading di dalamnya. Outline yang baik membuat konten lebih mudah dipindai oleh mesin pencari dan teknologi assistif.

Meskipun algoritma HTML5 outline tidak lagi digunakan oleh browser untuk membuat heading level visual, elemen semantik tetap diekspos sebagai landmark regions di accessibility tree.

## Accessibility Tree

Accessibility tree adalah representasi halaman yang dibaca oleh screen reader. Tree ini dibangun dari:

1. **Nama dan peran elemen**: \`<button>\` memiliki peran button, \`<nav>\` memiliki peran navigation.
2. **Properti**: \`aria-expanded\`, \`aria-hidden\`, \`disabled\`.
3. **Status**: apakah elemen sedang aktif atau terpilih.

Tag semantik yang tepat mengurangi kebutuhan atribut ARIA. Prinsipnya: **"jangan gunakan ARIA jika HTML semantik sudah cukup"**.

## Landmark Regions

Landmark adalah area besar halaman yang dapat dijelajahi oleh screen reader. Landmark bawaan meliputi:

- \`<main>\` → main landmark
- \`<nav>\` → navigation landmark
- \`<aside>\` → complementary landmark
- \`<header>\` → banner landmark jika anak langsung body
- \`<footer>\` → contentinfo landmark jika anak langsung body
- \`<section aria-labelledby="...">\` → region landmark

Tanpa landmark, pengguna screen reader harus membaca seluruh dokumen dari atas ke bawah untuk menemukan bagian yang relevan.`,
    },
    {
      id: 'sec-01-go-example',
      type: 'code-example',
      codeExample: {
        id: 'code-01-go',
        filename: 'main.go',
        language: 'go',
        title: 'Go: Generator HTML Statis dengan html/template',
        code: `package main

import (
	"html/template"
	"os"
)

type Page struct {
	Title   string
	Content string
}

const tmpl = \`<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>{{.Title}}</title>
</head>
<body>
  <header><nav><a href="/">Beranda</a></nav></header>
  <main>
    <article>
      <h1>{{.Title}}</h1>
      <p>{{.Content}}</p>
    </article>
  </main>
  <footer>&copy; 2026 Mari Belajar</footer>
</body>
</html>\`

func main() {
	t := template.Must(template.New("page").Parse(tmpl))
	page := Page{Title: "HTML Semantik", Content: "Mari belajar struktur dokumen."}
	_ = t.Execute(os.Stdout, page)
}`,
        explanation:
          'Go menyediakan package html/template yang secara otomatis meng-escape output untuk mencegah XSS, sekaligus menghasilkan HTML semantik yang valid.',
      },
    },
    {
      id: 'sec-01-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Kesalahan umum:** menggunakan div untuk segalanya dan baru menambahkan ARIA di kemudian hari. Mulailah dengan tag semantik yang benar agar accessibility tree dan document outline terbentuk secara alami. Periksa outline dengan DevTools Accessibility pane dan Lighthouse.',
    },
  ],
}
