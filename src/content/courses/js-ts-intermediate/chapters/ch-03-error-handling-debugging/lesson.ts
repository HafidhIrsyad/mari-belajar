import type { Lesson } from '@/content/types'

export const ch03Lesson: Lesson = {
  id: 'lesson-ch-03-error-handling-debugging',
  estimatedMinutes: 35,
  sections: [
    {
      id: 'sec-03-basic-error',
      type: 'markdown',
      level: 'basic',
      title: 'try/catch/finally, Error Object, dan Stack Trace',
      content: `## Menangani Error dengan try/catch/finally

\`try\` membungkus kode yang berpotensi melempar error. \`catch\` menangkap error tersebut. \`finally\` selalu dijalankan, baik terjadi error maupun tidak, cocok untuk cleanup.

\`\`\`javascript
try {
  riskyOperation();
} catch (error) {
  console.error('Terjadi kesalahan:', error.message);
} finally {
  console.log('Cleanup dijalankan');
}
\`\`\`

## Error Object

Ketika error terjadi, JavaScript membuat objek \`Error\` dengan properti:

- \`message\`: deskripsi error.
- \`name\`: nama kelas error, misalnya \`Error\` atau \`TypeError\`.
- \`stack\`: representasi call stack saat error dibuat.

## Stack Trace

Stack trace menunjukkan urutan pemanggilan fungsi yang menyebabkan error. Membaca stack trace dari bawah ke atas membantu menemukan titik awal masalah.

\`\`\`text
Error: nilai tidak valid
    at validate (app.js:15)
    at processData (app.js:22)
    at main (app.js:30)
\`\`\`

## Console Debugging

DevTools menyediakan \`console.log\`, \`console.table\`, \`console.dir\`, \`debugger\` statement, dan breakpoints untuk menghentikan eksekusi pada baris tertentu.`,
    },
    {
      id: 'sec-03-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-03-js',
        filename: 'errors.js',
        language: 'javascript',
        title: 'JavaScript: Custom Error Class dengan Context',
        code: `class ValidationError extends Error {
  constructor(field, value, options = {}) {
    super(\`Invalid value for \${field}: \${value}\`);
    this.name = 'ValidationError';
    this.field = field;
    this.value = value;
    this.code = options.code || 'VALIDATION_FAILED';
  }
}

class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
    this.code = \`HTTP_\${status}\`;
  }
}

function parseAge(input) {
  const age = Number(input);
  if (Number.isNaN(age) || age < 0) {
    throw new ValidationError('age', input, { code: 'AGE_INVALID' });
  }
  return age;
}

try {
  parseAge('dua puluh');
} catch (error) {
  if (error instanceof ValidationError) {
    console.error(error.code, error.field, error.message);
  } else {
    console.error('Unexpected error:', error);
  }
}`,
        explanation:
          'Custom error class memperluas Error dengan metadata seperti field, code, dan status. instanceof memungkinkan penanganan error yang spesifik tanpa mengandalkan parsing string.',
      },
    },
    {
      id: 'sec-03-intermediate-error',
      type: 'markdown',
      level: 'intermediate',
      title: 'Error Cause Chaining, Logging Strategy, dan Error Boundaries',
      content: `## Error Cause Chaining

\`Error\` modern mendukung opsi \`cause\` untuk menyimpan error asli saat wrapping. Ini mempertahankan stack trace asli sehingga kita bisa melacak root cause.

\`\`\`javascript
try {
  await fetchUser();
} catch (networkError) {
  throw new AppError('Gagal memuat user', { cause: networkError });
}
\`\`\`

## Logging Strategy

Log yang baik memiliki level (debug, info, warn, error) dan struktur (timestamp, correlation id, error code). Structured logging menggunakan format JSON sehingga bisa di-parse oleh tool observability.

\`\`\`javascript
logger.error({
  message: 'Payment failed',
  code: 'PAYMENT_ERROR',
  userId: user.id,
  error: err.message,
});
\`\`\`

## Error Boundaries

Di React, error boundary menangkap error pada subtree komponen. Konsep serupa bisa diterapkan secara framework-agnostic: setiap lapisan aplikasi menangkap error dan memutuskan apakah menampilkan fallback, mengirim ke Sentry, atau menghentikan eksekusi.

## Defensive Programming

- Validasi input di boundary (API, form, file).
- Gunakan \`NaN\` checks dan nullish coalescing.
- Hindari asumsi tentang bentuk data eksternal.
- Fail fast, fail loudly pada development; fail gracefully di production.`,
    },
    {
      id: 'sec-03-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-03-ts',
        filename: 'typedErrors.ts',
        language: 'typescript',
        title: 'TypeScript: Typed Error Classes dan Type Guards',
        code: `type ErrorCode =
  | 'VALIDATION_ERROR'
  | 'NOT_FOUND'
  | 'UNAUTHORIZED'
  | 'INTERNAL_ERROR';

class AppError extends Error {
  constructor(
    message: string,
    public readonly code: ErrorCode,
    public readonly context?: Record<string, unknown>,
    options?: ErrorOptions
  ) {
    super(message, options);
    this.name = 'AppError';
  }
}

function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}

async function loadUser(id: string): Promise<User> {
  const response = await fetch(\`/api/users/\${id}\`);
  if (!response.ok) {
    throw new AppError(
      \`Failed to load user \${id}\`,
      response.status === 404 ? 'NOT_FOUND' : 'INTERNAL_ERROR',
      { status: response.status }
    );
  }
  return response.json();
}

try {
  await loadUser('999');
} catch (error) {
  if (isAppError(error)) {
    console.error(error.code, error.context);
    if (error.cause) console.error('Caused by:', error.cause);
  } else {
    console.error('Unknown error:', error);
  }
}`,
        explanation:
          'Type guard isAppError mempersempit tipe unknown menjadi AppError, memungkinkan akses property code dan context yang aman. ErrorOptions cause menyimpan error asli untuk diagnosis.',
      },
    },
    {
      id: 'sec-03-advanced-error',
      type: 'markdown',
      level: 'advanced',
      title: 'Async Stack Traces, Memory Debugging, dan Error Codes/i18n',
      content: `## Async Stack Traces

Sebelum V8 menyempurnakan async stack trace, error di dalam Promise sering kehilangan context pemanggil awal karena Promise dieksekusi secara asynchronous. Engine modern menyimpan chain frame asinkron sehingga stack trace menunjukkan baris \`await\` yang menyebabkan error.

\`\`\`javascript
async function a() { await b(); }
async function b() { await c(); }
async function c() { throw new Error('deep'); }

a().catch((err) => console.error(err.stack));
// Stack trace sekarang mencakup a, b, dan c.
\`\`\`

Namun async stack trace memiliki batasan biaya memori; V8 hanya menyimpan sejumlah frame tertentu. Hindari chaining async yang sangat panjang dan tidak perlu.

## Debugging Memory dan Performance

Chrome DevTools menyediakan:

- **Performance panel**: merekam aktivitas main thread, layout, paint, dan JavaScript execution.
- **Memory panel**: heap snapshot untuk melihat objek yang bertahan.
- **Application panel**: memeriksa storage, service worker, dan cache.

Memory leak umum:

- Timer atau interval yang tidak di-\`clear\`.
- Event listener yang tidak di-remove saat komponen dihancurkan.
- Closure yang menangkap objek besar.
- Detached DOM tree yang masih direferensi oleh JavaScript.

## Error Codes dan i18n

Di aplikasi internasional, jangan menampilkan \`error.message\` langsung ke pengguna. Gunakan error code stabil, lalu peta ke pesan yang diterjemahkan.

\`\`\`javascript
const messages = {
  AGE_INVALID: { id: 'Usia tidak valid', en: 'Age is invalid' },
};
\`\`\`

Pendekatan ini memudahkan maintenance, testing, dan localisasi tanpa mengubah logika error.`,
    },
    {
      id: 'sec-03-go-example',
      type: 'code-example',
      codeExample: {
        id: 'code-03-go',
        filename: 'errors.go',
        language: 'go',
        title: 'Go: Error Wrapping dan Stack Context',
        code: `package main

import (
	"errors"
	"fmt"
)

var ErrNotFound = errors.New("resource not found")

func loadUser(id string) error {
	return fmt.Errorf("load user %s: %w", id, ErrNotFound)
}

func main() {
	err := loadUser("999")
	if err != nil {
		fmt.Println(err)
	}

	if errors.Is(err, ErrNotFound) {
		fmt.Println("Handled: not found")
	}
}`,
        explanation:
          'Go menggunakan fmt.Errorf dengan verb %w untuk wrapping error. errors.Is memeriksa apakah error chain mengandung sentinel error tertentu, mirip dengan instanceof di JavaScript.',
      },
    },
    {
      id: 'sec-03-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Kesimpulan:** Penanganan error yang baik memisahkan jalur error, memberikan konteks melalui custom class dan cause chaining, serta menggunakan structured logging. Debugging memanfaatkan DevTools untuk async stack traces, memory leak, dan performance. Terapkan error codes stabil untuk fallback dan i18n.',
    },
  ],
}
