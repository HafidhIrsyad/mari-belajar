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
      id: 'sec-04-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-04-js',
        filename: 'form-validation.js',
        language: 'javascript',
        title: 'JavaScript: Constraint Validation API',
        code: `const form = document.getElementById('registration-form')
const email = document.getElementById('email')
const phone = document.getElementById('phone')

function showError(input, message) {
  input.setCustomValidity(message)
  const errorId = input.id + '-error'
  let errorEl = document.getElementById(errorId)
  if (!errorEl) {
    errorEl = document.createElement('span')
    errorEl.id = errorId
    input.insertAdjacentElement('afterend', errorEl)
  }
  errorEl.textContent = message
  input.setAttribute('aria-describedby', errorId)
}

function clearError(input) {
  input.setCustomValidity('')
  input.removeAttribute('aria-describedby')
  const errorEl = document.getElementById(input.id + '-error')
  if (errorEl) errorEl.textContent = ''
}

email.addEventListener('input', () => {
  if (email.validity.typeMismatch) {
    showError(email, 'Masukkan alamat email yang valid.')
  } else if (email.validity.valueMissing) {
    showError(email, 'Email wajib diisi.')
  } else {
    clearError(email)
  }
})

form.addEventListener('submit', (event) => {
  if (!form.checkValidity()) {
    event.preventDefault()
    form.reportValidity()
  }
})`,
        explanation:
          'Constraint Validation API menyediakan properti seperti validity, setCustomValidity, dan checkValidity. Menggabungkannya dengan aria-describedby memastikan pesan error terhubung dengan input yang bersangkutan.',
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
      id: 'sec-04-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-04-ts',
        filename: 'ContactForm.tsx',
        language: 'typescript',
        title: 'TypeScript: Formulir Terkontrol dengan Tipe Eksplisit',
        code: `import { useState, type FormEvent, type ChangeEvent } from 'react'

interface FormData {
  email: string
  message: string
}

type FormErrors = Partial<Record<keyof FormData, string>>

export function ContactForm() {
  const [values, setValues] = useState<FormData>({ email: '', message: '' })
  const [errors, setErrors] = useState<FormErrors>({})

  function validate(data: FormData): FormErrors {
    const next: FormErrors = {}
    if (!data.email.includes('@')) next.email = 'Email tidak valid'
    if (data.message.length < 10) next.message = 'Pesan minimal 10 karakter'
    return next
  }

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target
    setValues((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length === 0) {
      console.log('Kirim:', values)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        value={values.email}
        onChange={handleChange}
        aria-describedby="email-error"
      />
      {errors.email && <span id="email-error" role="alert">{errors.email}</span>}

      <label htmlFor="message">Pesan</label>
      <textarea
        id="message"
        name="message"
        value={values.message}
        onChange={handleChange}
        aria-describedby="message-error"
      />
      {errors.message && <span id="message-error" role="alert">{errors.message}</span>}

      <button type="submit">Kirim</button>
    </form>
  )
}`,
        explanation:
          'Dengan TypeScript, state form dan error memiliki tipe yang jelas. Menggunakan role="alert" pada pesan error membantu screen reader mengumumkan error secara otomatis.',
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
      id: 'sec-04-go-example',
      type: 'code-example',
      codeExample: {
        id: 'code-04-go',
        filename: 'form.go',
        language: 'go',
        title: 'Go: Parse dan Validasi Form di Server',
        code: `package main

import (
	"fmt"
	"net/http"
	"strings"
)

func contactHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	if err := r.ParseForm(); err != nil {
		http.Error(w, "Bad request", http.StatusBadRequest)
		return
	}

	email := strings.TrimSpace(r.FormValue("email"))
	message := strings.TrimSpace(r.FormValue("message"))

	if email == "" || !strings.Contains(email, "@") {
		http.Error(w, "Email tidak valid", http.StatusBadRequest)
		return
	}

	if len(message) < 10 {
		http.Error(w, "Pesan terlalu pendek", http.StatusBadRequest)
		return
	}

	fmt.Fprintf(w, "Terima kasih, %s! Pesan telah diterima.", email)
}

func main() {
	http.HandleFunc("/api/contact", contactHandler)
	_ = http.ListenAndServe(":8080", nil)
}`,
        explanation:
          'Go selalu memvalidasi ulang data dari klien. ParseForm membaca form data, lalu server memeriksa keberadaan, format, dan panjang sebelum diproses lebih lanjut.',
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
