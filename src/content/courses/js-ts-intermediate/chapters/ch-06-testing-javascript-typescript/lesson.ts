import type { Lesson } from '@/content/types'

export const ch06Lesson: Lesson = {
  id: 'lesson-ch-06-testing-javascript-typescript',
  estimatedMinutes: 40,
  sections: [
    {
      id: 'sec-06-basic-testing',
      type: 'markdown',
      level: 'basic',
      title: 'Unit Test, Assertion, dan Test Runner',
      content: `## Apa itu Unit Test?

Unit test adalah pengujian pada unit kode terkecil, biasanya sebuah fungsi atau class. Tujuannya adalah memverifikasi bahwa unit tersebut menghasilkan output yang benar untuk berbagai input.

## Arrange-Act-Assert

Pola AAA membantu menulis test yang terstruktur:

1. **Arrange**: siapkan data dan dependency.
2. **Act**: panggil fungsi yang diuji.
3. **Assert**: periksa hasilnya.

## Assertion

Assertion adalah pernyataan yang memeriksa kondisi. Jika kondisi salah, test gagal.

\`\`\`javascript
expect(add(2, 3)).toBe(5);
expect(user.name).toBe('Budi');
\`\`\`

## Test Runner

Test runner seperti Vitest dan Jest menyediakan:

- Fungsi \`test\` atau \`it\` untuk mendefinisikan test case.
- Fungsi \`describe\` untuk mengelompokkan test.
- Watch mode untuk menjalankan test secara otomatis saat file berubah.
- Coverage report untuk melihat seberapa banyak kode yang teruji.`,
    },
    {
      id: 'sec-06-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-06-js',
        filename: 'math.test.js',
        language: 'javascript',
        title: 'JavaScript: Unit Test dengan Vitest',
        code: `import { describe, it, expect } from 'vitest';
import { add, divide } from './math';

describe('math', () => {
  it('adds two numbers', () => {
    // Arrange
    const a = 2;
    const b = 3;

    // Act
    const result = add(a, b);

    // Assert
    expect(result).toBe(5);
  });

  it('throws when dividing by zero', () => {
    expect(() => divide(10, 0)).toThrow('Cannot divide by zero');
  });
});`,
        explanation:
          'Test dibagi menjadi describe dan it. expect(...).toThrow memastikan fungsi melempar error untuk input invalid.',
      },
    },
    {
      id: 'sec-06-intermediate-testing',
      type: 'markdown',
      level: 'intermediate',
      title: 'Mocking, Spies, Testing Async, dan Testing Library',
      content: `## Mocking

Mock mengganti real implementation dengan versi tiruan. Kita menggunakannya untuk:

- Mengisolasi unit dari dependency eksternal seperti API atau database.
- Mensimulasikan skenario sulit seperti error network.
- Mempercepat test yang lambat.

\`\`\`javascript
vi.mock('./api', () => ({
  fetchUser: vi.fn(() => Promise.resolve({ id: 1, name: 'Budi' })),
}));
\`\`\`

## Spies

Spy mengamati pemanggilan fungsi tanpa mengubah implementasinya. Kita bisa memeriksa berapa kali fungsi dipanggil dan dengan argumen apa.

\`\`\`javascript
const handler = vi.fn();
button.addEventListener('click', handler);
button.click();
expect(handler).toHaveBeenCalledTimes(1);
\`\`\`

## Testing Async

Untuk kode asynchronous, gunakan \`async/await\` di dalam test.

\`\`\`javascript
it('fetches user', async () => {
  const user = await fetchUser(1);
  expect(user.name).toBe('Budi');
});
\`\`\`

## Testing Library

React Testing Library mendorong pengujian seperti pengguna: mencari elemen berdasarkan teks atau role, bukan berdasarkan selector CSS.

\`\`\`javascript
render(<Counter />);
fireEvent.click(screen.getByRole('button', { name: /increment/i }));
expect(screen.getByText('1')).toBeInTheDocument();
\`\`\``,
    },
    {
      id: 'sec-06-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-06-ts',
        filename: 'Counter.test.tsx',
        language: 'typescript',
        title: 'TypeScript: Component Test dengan Testing Library',
        code: `import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Counter } from './Counter';

describe('Counter', () => {
  it('increments count when button is clicked', () => {
    render(<Counter initial={0} />);

    const button = screen.getByRole('button', { name: /tambah/i });
    fireEvent.click(button);
    fireEvent.click(button);

    expect(screen.getByText('Count: 2')).toBeInTheDocument();
  });

  it('calls onMax callback when limit reached', () => {
    const onMax = vi.fn();
    render(<Counter initial={9} limit={10} onMax={onMax} />);

    fireEvent.click(screen.getByRole('button', { name: /tambah/i }));

    expect(onMax).toHaveBeenCalledTimes(1);
  });
});`,
        explanation:
          'Testing Library mengutamakan query berbasis role dan teks. vi.fn() adalah spy yang merekam pemanggilan callback onMax.',
      },
    },
    {
      id: 'sec-06-advanced-testing',
      type: 'markdown',
      level: 'advanced',
      title: 'TDD Cycle, Property-Based Testing, dan Test Pyramid',
      content: `## TDD Cycle

Test-Driven Development mengikuti siklus pendek:

1. **Red**: tulis test yang gagal.
2. **Green**: tulis implementasi paling sederhana agar test lulus.
3. **Refactor**: bersihkan kode tanpa mengubah perilaku.

TDD memaksa kita memikirkan perilaku terlebih dahulu dan menghasilkan desain yang lebih testable.

## Property-Based Testing

Alih-alih menulis contoh spesifik, property-based testing menghasilkan banyak input acak dan memeriksa invariant. Library seperti fast-check membantu menemukan edge case yang tidak terpikir.

\`\`\`javascript
// invariant: reverse(reverse(list)) === list
fc.assert(fc.property(fc.array(fc.integer()), (list) => {
  return JSON.stringify(list) === JSON.stringify(reverse(reverse(list)));
}));
\`\`\`

## Coverage Thresholds

Coverage mengukur persentase kode yang dieksekusi oleh test. Thresholds memastikan coverage tidak turun saat PR baru masuk. Namun, coverage tinggi tidak menjamin tidak ada bug; kualitas assertion lebih penting.

## Test Pyramid

Test pyramid menggambarkan proporsian ideal:

- Banyak **unit tests** (cepat, murah, spesifik).
- Lebih sedikit **integration tests** (menguji interaksi antar unit).
- Sangat sedikit **E2E tests** (mahal, lambat, tapi paling mendekati pengguna).

Memilih jenis test yang tepat mengurangi waktu CI dan meningkatkan kepercayaan.`,
    },
    {
      id: 'sec-06-go-example',
      type: 'code-example',
      codeExample: {
        id: 'code-06-go',
        filename: 'math_test.go',
        language: 'go',
        title: 'Go: Table-Driven Test',
        code: `package math

import "testing"

func Add(a, b int) int {
	return a + b
}

func TestAdd(t *testing.T) {
	cases := []struct {
		a, b, want int
	}{
		{1, 2, 3},
		{0, 0, 0},
		{-1, 1, 0},
		{100, 200, 300},
	}

	for _, c := range cases {
		got := Add(c.a, c.b)
		if got != c.want {
			t.Errorf("Add(%d,%d) = %d; want %d", c.a, c.b, got, c.want)
		}
	}
}`,
        explanation:
          'Table-driven test di Go memungkinkan satu fungsi test menjalankan banyak kasus dengan data yang terstruktur. Pola ini setara dengan parameterized test di JavaScript.',
      },
    },
    {
      id: 'sec-06-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Kesimpulan:** Testing memastikan perilaku kode tetap benar saat berkembang. Tulis unit test dengan arrange-act-assert, gunakan mock/spy untuk isolasi, uji komponen React dari sudut pandang pengguna, dan sesuaikan strategi test dengan test pyramid.',
    },
  ],
}
