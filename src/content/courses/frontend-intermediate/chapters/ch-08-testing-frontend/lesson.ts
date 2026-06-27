import type { Lesson } from '@/content/types'

export const ch08Lesson: Lesson = {
  id: 'lesson-ch-08-testing-frontend',
  estimatedMinutes: 45,
  sections: [
    {
      id: 'sec-08-basic-pyramid',
      type: 'markdown',
      level: 'basic',
      title: 'Testing Pyramid di Frontend',
      content: `## Testing Pyramid

Testing pyramid menggambarkan distribusi ideal test di aplikasi:

1. **Unit test**: banyak, cepat, menguji fungsi atau komponen terisolasi.
2. **Integration test**: beberapa, menguji interaksi antar modul.
3. **End-to-end (E2E) test**: sedikit, menguji alur pengguna lengkap.

## Unit Test

Unit test menguji bagian kode terkecil seperti fungsi utilitas, helper, atau hook sederhana. Unit test harus cepat dan tidak bergantung pada jaringan atau browser.

## Component Test

Component test menguji komponen React dalam isolasi. React Testing Library (RTL) direkomendasikan karena mendorong kita untuk menguji perilaku seperti pengguna, bukan struktur internal.

## E2E Test

E2E test mensimulasikan pengguna sungguhan dari awal hingga akhir. Alat seperti Playwright atau Cypress digunakan untuk menguji alur kritis seperti checkout atau login.`,
    },
    {
      id: 'sec-08-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-08-js',
        filename: 'formatPrice.test.js',
        language: 'javascript',
        title: 'JavaScript: Unit Test dengan Vitest',
        code: `import { describe, it, expect } from 'vitest'
import { formatPrice } from './formatPrice'

describe('formatPrice', () => {
  it('formats number as Indonesian Rupiah', () => {
    expect(formatPrice(150000)).toBe('Rp 150.000')
  })

  it('returns zero for invalid input', () => {
    expect(formatPrice(null)).toBe('Rp 0')
    expect(formatPrice(undefined)).toBe('Rp 0')
  })

  it('rounds down decimal values', () => {
    expect(formatPrice(1000.9)).toBe('Rp 1.000')
  })
})`,
        explanation:
          'Unit test fungsi utilitas sederhana ini cepat dan fokus pada input-output. Vitest menyediakan API describe, it, dan expect yang mirip Jest.',
      },
    },
    {
      id: 'sec-08-intermediate-rtl',
      type: 'markdown',
      level: 'intermediate',
      title: 'React Testing Library dan Query Aksesibel',
      content: `## Filosofi React Testing Library

RTL berprinsip: **"Semakin mirip cara pengguna menggunakan aplikasi, semakin baik test tersebut."** Oleh karena itu, hindari menguji state internal atau struktur DOM.

## Query Priority

Urutan prioritas query di RTL:

1. **getByRole**: elemen berdasarkan peran ARIA dan nama aksesibel.
2. **getByLabelText**: input yang terkait dengan label.
3. **getByPlaceholderText**: input dengan placeholder.
4. **getByText**: teks yang terlihat.
5. **getByDisplayValue**: nilai input.
6. **getByTestId**: fallback jika query lain tidak memungkinkan.

\`\`\`jsx
screen.getByRole('button', { name: /simpan/i })
screen.getByLabelText(/email/i)
\`\`\`

## User Event

\`@testing-library/user-event\` mensimulasikan interaksi pengguna secara lebih realistis dibanding \`fireEvent\`. Misalnya, \`user.click\` memicu rangkaian event mouse dan keyboard.

\`\`\`jsx
const user = userEvent.setup()
await user.click(screen.getByRole('button', { name: /tambah/i }))
\`\`\``,
    },
    {
      id: 'sec-08-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-08-ts',
        filename: 'Counter.test.tsx',
        language: 'typescript',
        title: 'TypeScript: Component Test dengan RTL dan user-event',
        code: `import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Counter } from './Counter'

describe('Counter', () => {
  it('increments count when button is clicked', async () => {
    const user = userEvent.setup()
    render(<Counter initial={0} />)

    const button = screen.getByRole('button', { name: /tambah/i })
    expect(screen.getByText('0')).toBeInTheDocument()

    await user.click(button)
    await user.click(button)

    expect(screen.getByText('2')).toBeInTheDocument()
  })

  it('resets count when reset button is clicked', async () => {
    const user = userEvent.setup()
    render(<Counter initial={5} />)

    await user.click(screen.getByRole('button', { name: /reset/i }))

    expect(screen.getByText('0')).toBeInTheDocument()
  })
})`,
        explanation:
          'Test ini berfokus pada perilaku yang terlihat pengguna. getByRole memastikan button dapat diakses, dan userEvent mensimulasikan klik seperti pengguna sungguhan.',
      },
    },
    {
      id: 'sec-08-advanced-mock',
      type: 'markdown',
      level: 'advanced',
      title: 'Mock, Stub, dan Integration Test',
      content: `## Mock dan Stub

Mock adalah objek tiruan yang menggantikan dependency nyata. Mock memungkinkan kita mengontrol output dan memverifikasi interaksi.

Dalam Vitest:

\`\`\`ts
vi.mock('./api', () => ({
  fetchUser: vi.fn().mockResolvedValue({ id: '1', name: 'Rina' }),
}))
\`\`\`

## Mengapa Hindari Mock Berlebihan

Mock yang terlalu banyak dapat membuat test tidak merepresentasikan perilaku nyata aplikasi. Integration test dengan mock minimal seringkali lebih bernilai daripada unit test dengan banyak stub.

## Integration Test di Frontend

Integration test menguji beberapa komponen atau modul bersama-sama. Contohnya form yang menggunakan RHF, Zod resolver, dan submit handler.

\`\`\`jsx
render(
  <QueryClientProvider client={queryClient}>
    <UserList />
  </QueryClientProvider>
)
\`\`\`

## Tes yang Baik

- **Deterministik**: hasil sama setiap dijalankan.
- **Cepat**: jangan bergantung pada jaringan.
- **Terisolasi**: satu test tidak boleh memengaruhi test lain.
- **Dapat diandalkan**: gagal hanya saat ada bug, bukan karena timing.

## Accessibility Testing

Gunakan \`jest-axe\` atau \`vitest-axe\` untuk memeriksa pelanggaran aksesibilitas secara otomatis.`,
    },
    {
      id: 'sec-08-go-example',
      type: 'code-example',
      codeExample: {
        id: 'code-08-go',
        filename: 'calculator_test.go',
        language: 'go',
        title: 'Go: Unit Test dengan Table-Driven Pattern',
        code: `package main

import "testing"

func Add(a, b int) int {
	return a + b
}

func TestAdd(t *testing.T) {
	tests := []struct {
		name string
		a, b int
		want int
	}{
		{"positive", 2, 3, 5},
		{"zero", 0, 5, 5},
		{"negative", -2, 3, 1},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := Add(tt.a, tt.b)
			if got != tt.want {
				t.Errorf("Add(%d, %d) = %d, want %d", tt.a, tt.b, got, tt.want)
			}
		})
	}
}`,
        explanation:
          'Table-driven test adalah pola populer untuk unit test. Satu test function dapat menjalankan banyak case, mirip dengan parameterized test di Vitest.',
      },
    },
    {
      id: 'sec-08-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Kesalahan umum:** menguji struktur DOM atau state internal. Fokuskan test pada apa yang dilihat dan dilakukan pengguna. Query aksesibel tidak hanya membuat test lebih robust, tetapi juga memastikan komponen dapat digunakan oleh teknologi assistif.',
    },
  ],
}
