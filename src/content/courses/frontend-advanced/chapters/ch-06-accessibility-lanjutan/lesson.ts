import type { Lesson } from '@/content/types'

export const ch06Lesson: Lesson = {
  id: 'lesson-ch-06-accessibility-lanjutan',
  estimatedMinutes: 40,
  sections: [
    {
      id: 'sec-06-basic',
      type: 'markdown',
      level: 'basic',
      title: 'Focus Management, Skip Links, dan ARIA Live Regions',
      content: `## Focus Management

Focus management adalah cara mengatur pergerakan fokus keyboard di dalam aplikasi. Praktik dasar:

- Pastikan semua elemen interaktif dapat difokus.
- Hindari \`tabindex\` positif yang mengubah urutan tab alami.
- Gunakan \`tabindex="0"\` untuk elemen custom yang perlu difokus, \`tabindex="-1"\` untuk fokus programmatic saja.

## Skip Links

Skip links adalah link tersembunyi yang memungkinkan pengguna keyboard melewati navigasi berulang dan langsung ke konten utama. Implementasi:

\`\`\`html
<a href="#main-content" className="sr-only focus:not-sr-only">
  Lompat ke konten utama
</a>
<main id="main-content" tabIndex={-1}>
  ...
</main>
\`\`\`

## ARIA Live Regions

Live regions memberi tahu screen reader tentang perubahan konten tanpa memindahkan fokus. Tingkat kepentingan:

- \`aria-live="polite"\`: diumumkan setelah pengguna selesai dengan aktivitas saat ini.
- \`aria-live="assertive"\`: diumumkan segera, menginterupsi pengguna.

Gunakan \`aria-live="assertive"\` hanya untuk error kritis atau notifikasi penting. Untuk status umum seperti "Item ditambahkan ke keranjang", gunakan \`polite\`.`,
    },
    {
      id: 'sec-06-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-06-js',
        filename: 'SkipLink.jsx',
        language: 'javascript',
        title: 'JavaScript: Skip Link dan Live Region Sederhana',
        code: `import { useState } from 'react'

function SkipLink() {
  const [message, setMessage] = useState('')

  function handleAddToCart() {
    setMessage('Produk berhasil ditambahkan ke keranjang.')
    setTimeout(() => setMessage(''), 3000)
  }

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:p-2 focus:bg-white"
      >
        Lompat ke konten utama
      </a>

      <main id="main-content" tabIndex={-1}>
        <h1>Produk</h1>
        <button type="button" onClick={handleAddToCart}>
          Tambah ke Keranjang
        </button>
      </main>

      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {message}
      </div>
    </>
  )
}

export default SkipLink`,
        explanation:
          'Skip link membantu pengguna keyboard melewati navigasi. Live region dengan aria-live="polite" mengumumkan perubahan status tanpa memindahkan fokus.',
      },
    },
    {
      id: 'sec-06-intermediate',
      type: 'markdown',
      level: 'intermediate',
      title: 'Komponen Kompleks: Combobox, Dialog, dan Tabs',
      content: `## Pola Komponen Kompleks

Komponen kompleks seperti combobox, dialog, tabs, dan menu memerlukan implementasi aksesibilitas yang cermat. WAI-ARIA Authoring Practices Guide (APG) menyediakan pola standar untuk komponen-komponen ini.

## Combobox

Combobox menggabungkan input teks dengan daftar saran. Aspek aksesibilitas:

- \`role="combobox"\` pada input.
- \`aria-expanded\` menunjukkan apakah daftar terbuka.
- \`aria-controls\` menghubungkan input dengan listbox.
- \`aria-activedescendant\` melacak item yang disorot.
- Keyboard: arrow keys untuk navigasi, Enter untuk memilih, Escape untuk menutup.

## Dialog

Dialog atau modal memerlukan:

- \`role="dialog"\` dan \`aria-modal="true"\`.
- Label dengan \`aria-labelledby\` atau \`aria-label\`.
- Focus trap agar keyboard tidak keluar dari modal.
- Restore focus ke elemen pemicu saat modal ditutup.
- Tombol close yang dapat diakses.

## Tabs

Tabs memerlukan:

- \`role="tablist"\`, \`role="tab"\`, \`role="tabpanel"\`.
- \`aria-selected\` pada tab aktif.
- \`aria-controls\` menghubungkan tab dengan panel.
- Keyboard: arrow keys untuk berpindah tab, Tab untuk masuk ke konten panel.

Menggunakan library headless seperti Radix atau Reach UI sangat disarankan karena behavior kompleks ini sudah diuji lintas browser.`,
    },
    {
      id: 'sec-06-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-06-ts',
        filename: 'AccessibleDialog.tsx',
        language: 'typescript',
        title: 'TypeScript: Dialog dengan Focus Trap dan Restore Focus',
        code: `import { useEffect, useRef, useCallback } from 'react'

interface DialogProps {
  open: boolean
  title: string
  onClose: () => void
  children: React.ReactNode
}

export function AccessibleDialog({ open, title, onClose, children }: DialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const previousFocus = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (open) {
      previousFocus.current = document.activeElement as HTMLElement
      const firstFocusable = dialogRef.current?.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      firstFocusable?.focus()
    } else {
      previousFocus.current?.focus()
    }
  }, [open])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key !== 'Tab' || !dialogRef.current) return

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      )
      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    },
    []
  )

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
      ref={dialogRef}
      onKeyDown={handleKeyDown}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
        <h2 id="dialog-title">{title}</h2>
        {children}
        <button type="button" onClick={onClose} className="mt-4">
          Tutup
        </button>
      </div>
    </div>
  )
}`,
        explanation:
          'Dialog ini menyimpan fokus sebelumnya, memindahkan fokus ke elemen pertama, menjebak fokus dalam modal, dan mengembalikan fokus saat ditutup.',
      },
    },
    {
      id: 'sec-06-advanced',
      type: 'markdown',
      level: 'advanced',
      title: 'Accessibility Testing Automation, WCAG 2.2, dan Inclusive Design',
      content: `## Automated Accessibility Testing

Automated testing dapat menangkap banyak pelanggaran aksesibilitas seperti:

- Kontras warna tidak memenuhi standar.
- Missing labels pada input.
- Heading hierarchy yang salah.
- Missing ARIA roles atau attributes.

Tools populer:

- **axe DevTools**: browser extension dan library untuk testing.
- **Lighthouse**: audit a11y sebagai bagian dari performa.
- **jest-axe**: integrasi axe dengan test runner.
- **eslint-plugin-jsx-a11y**: linting static untuk JSX.

Penting untuk diingat: automated testing hanya menangkap sekitar 30% masalah aksesibilitas. Manual testing dengan keyboard dan screen reader tetap diperlukan.

## WCAG 2.2 Compliance

WCAG 2.2 memperkenalkan kriteria sukses baru seperti:

- **Focus Not Obscured**: elemen yang difokus tidak boleh tersembunyi oleh konten lain.
- **Drag Movements**: menyediakan alternatif untuk gestur drag.
- **Target Size Minimum**: ukuran target minimum 24x24 CSS pixel.
- **Consistent Help**: bantuan yang tersedia harus konsisten di seluruh halaman.

Level conformance: A, AA, AAA. Kebanyakan organisasi menargetkan AA.

## Inclusive Design

Inclusive design adalah pendekatan yang memastikan produk dapat digunakan oleh orang dengan kemampuan, preferensi, dan konteks yang berbeda. Prinsipnya:

- Kenali eksklusi yang tidak disengaja.
- Pelajari dari keragaman pengguna.
- Berikan pilihan kontrol kepada pengguna.
- Pertimbangkan preferensi seperti reduced motion dan color scheme.`,
    },
    {
      id: 'sec-06-go-example',
      type: 'code-example',
      codeExample: {
        id: 'code-06-go',
        filename: 'a11y_report.go',
        language: 'go',
        title: 'Go: Simulasi Report Aksesibilitas dengan Struct',
        code: `package main

import (
	"encoding/json"
	"fmt"
)

type A11yIssue struct {
	Rule       string \`json:"rule"\`
	Severity   string \`json:"severity"\`
	Element    string \`json:"element"\`
	Message    string \`json:"message"\`
	WCAGLevel  string \`json:"wcagLevel"\`
}

func main() {
	issues := []A11yIssue{
		{
			Rule:      "color-contrast",
			Severity:  "serious",
			Element:   "button.primary",
			Message:   "Rasio kontras 2.9:1 di bawah minimum 4.5:1",
			WCAGLevel: "AA",
		},
		{
			Rule:      "label",
			Severity:  "critical",
			Element:   "input#search",
			Message:   "Input tidak memiliki label yang terasosiasi",
			WCAGLevel: "A",
		},
	}

	out, _ := json.MarshalIndent(issues, "", "  ")
	fmt.Println(string(out))
}`,
        explanation:
          'Backend dapat menyimpan dan mengelompokkan hasil audit aksesibilitas berdasarkan severity dan WCAG level untuk pelaporan dan prioritas perbaikan.',
      },
    },
    {
      id: 'sec-06-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Best practice 2026:** Jadikan focus management, ARIA live regions, dan keyboard behavior sebagai bagian dari definisi done komponen. Gunakan automated testing sebagai safety net, tetapi selalu lakukan manual testing dengan keyboard dan screen reader. Targetkan WCAG 2.2 AA dan terapkan prinsip inclusive design.',
    },
  ],
}
