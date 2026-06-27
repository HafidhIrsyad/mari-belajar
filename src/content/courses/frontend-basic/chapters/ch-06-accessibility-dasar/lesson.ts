import type { Lesson } from '@/content/types'

export const ch06Lesson: Lesson = {
  id: 'lesson-ch-06-accessibility-dasar',
  estimatedMinutes: 21,
  sections: [
    {
      id: 'sec-06-basic-accessibility',
      type: 'markdown',
      level: 'basic',
      title: 'Prinsip WCAG, Semantic HTML, dan Keyboard Navigation',
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
      id: 'sec-06-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-06-js',
        filename: 'focus-trap.js',
        language: 'javascript',
        title: 'JavaScript: Focus Trap untuk Modal',
        code: `function trapFocus(container) {
  const focusable = container.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  )
  const first = focusable[0]
  const last = focusable[focusable.length - 1]

  function handleKeyDown(event) {
    if (event.key !== 'Tab') return

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  container.addEventListener('keydown', handleKeyDown)
  return () => container.removeEventListener('keydown', handleKeyDown)
}

const modal = document.getElementById('modal')
const release = trapFocus(modal)
// Panggil release() saat modal ditutup untuk membersihkan listener`,
        explanation:
          'Focus trap memastikan keyboard tidak keluar dari modal yang sedang terbuka. Ini penting untuk pengalaman screen reader dan navigasi keyboard yang aman.',
      },
    },
    {
      id: 'sec-06-intermediate-aria',
      type: 'markdown',
      level: 'intermediate',
      title: 'ARIA Labels, Focus Management, dan Color Contrast',
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
      id: 'sec-06-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-06-ts',
        filename: 'AccessibleModal.tsx',
        language: 'typescript',
        title: 'TypeScript: Modal yang Accessible',
        code: `import { useEffect, useRef, useCallback, useState } from 'react'

interface AccessibleModalProps {
  isOpen: boolean
  title: string
  onClose: () => void
  children: React.ReactNode
}

export function AccessibleModal({ isOpen, title, onClose, children }: AccessibleModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const previousFocus = useRef<HTMLElement | null>(null)
  const [active, setActive] = useState(isOpen)

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose()
    }
  }, [onClose])

  useEffect(() => {
    if (isOpen) {
      previousFocus.current = document.activeElement as HTMLElement
      setActive(true)
      overlayRef.current?.focus()
      document.addEventListener('keydown', handleKeyDown)
    } else {
      document.removeEventListener('keydown', handleKeyDown)
      if (previousFocus.current) {
        previousFocus.current.focus()
      }
    }
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, handleKeyDown])

  if (!active && !isOpen) return null

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      tabIndex={-1}
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose()
      }}
    >
      <h2 id="modal-title">{title}</h2>
      {children}
      <button onClick={onClose} aria-label="Tutup modal">
        Tutup
      </button>
    </div>
  )
}`,
        explanation:
          'Modal ini memindahkan fokus saat dibuka, menangani tombol Escape, mengembalikan fokus saat ditutup, dan menggunakan aria-modal serta aria-labelledby agar screen reader mengenalinya sebagai dialog.',
      },
    },
    {
      id: 'sec-06-advanced-audit',
      type: 'markdown',
      level: 'advanced',
      title: 'Audits dengan Lighthouse, axe, dan Accessible Components',
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
      id: 'sec-06-go-example',
      type: 'code-example',
      codeExample: {
        id: 'code-06-go',
        filename: 'a11y_scanner.go',
        language: 'go',
        title: 'Go: Scanner HTML Aksesibilitas Sederhana',
        code: `package main

import (
	"fmt"
	"regexp"
	"strings"
)

const sampleHTML = \`<html>
<body>
  <img src="hero.jpg" alt="Hero banner">
  <img src="decoration.svg">
  <input type="email" id="email">
  <label for="email">Email</label>
</body>
</html>\`

func main() {
	// Cek gambar tanpa alt
	imgRe := regexp.MustCompile(\`<img\\b[^>]*>\`)
	for _, img := range imgRe.FindAllString(sampleHTML, -1) {
		if !strings.Contains(img, \`alt=\`) {
			fmt.Println("Gambar tanpa alt:", img)
		}
	}

	// Cek input tanpa label yang terhubung
	inputRe := regexp.MustCompile(\`<input\\b[^>]*id="([^"]+)"[^>]*>\`)
	for _, match := range inputRe.FindAllStringSubmatch(sampleHTML, -1) {
		id := match[1]
		if !strings.Contains(sampleHTML, \`for="\`+id+\`"\`) {
			fmt.Println("Input tanpa label terhubung:", id)
		}
	}
}
`,
        explanation:
          'Meskipun tidak menggantikan audit yang lengkap, program Go ini menunjukkan bagaimana kita bisa memindai markup secara otomatis untuk menemukan gambar tanpa alt dan input tanpa label.',
      },
    },
    {
      id: 'sec-06-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Ingat:** aksesibilitas bukan fitur tambahan. Mulailah dengan HTML semantik, uji navigasi keyboard, periksa kontras, dan gunakan ARIA hanya jika diperlukan. Audit otomatis membantu, tetapi pengujian manual dengan screen reader adalah standar emas.',
    },
  ],
}
