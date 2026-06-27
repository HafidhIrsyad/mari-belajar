import type { Lesson } from '@/content/types'

export const ch02Lesson: Lesson = {
  id: 'lesson-ch-02-context-package',
  estimatedMinutes: 40,
  sections: [
    {
      id: 'sec-02-basic-context',
      type: 'markdown',
      level: 'basic',
      title: 'Pengenalan Context',
      content: `## Apa itu Context?

Package "context" di Go menyediakan cara untuk membawa deadline, sinyal pembatalan, dan nilai request-scoped melintasi batas API dan antar goroutine. Context biasanya menjadi parameter pertama dalam fungsi yang melakukan I/O atau operasi jaringan.

\`\`\`go
func DoSomething(ctx context.Context, arg string) error {
  // ...
}
\`\`\`

## Context Root

Dua cara umum membuat context root:

- "context.Background()": context kosong yang biasanya digunakan di main, inisialisasi, atau test.
- "context.TODO()": placeholder yang menandakan bahwa kita belum memutuskan context yang tepat.

## WithCancel

"context.WithCancel" menghasilkan child context dan fungsi cancel. Memanggil cancel akan menutup channel Done pada child dan semua turunannya.

\`\`\`go
ctx, cancel := context.WithCancel(context.Background())
defer cancel()
\`\`\`

## Deadline dan Timeout

- "WithTimeout" menerima durasi.
- "WithDeadline" menerima waktu absolut.

Ketika batas waktu tercapai, channel Done akan ditutup otomatis.

\`\`\`go
ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)
defer cancel()
\`\`\`

Pemeriksaan pembatalan dilakukan dengan "select" pada "ctx.Done()" atau membaca "ctx.Err()".`,
    },
    {
      id: 'sec-02-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-02-js',
        filename: 'abort-controller.js',
        language: 'javascript',
        code: `async function fetchWithAbort(url, signal) {
  const res = await fetch(url, { signal });
  return res.json();
}

const controller = new AbortController();
const signal = controller.signal;

fetchWithAbort('https://api.example.com/data', signal)
  .then((data) => console.log(data))
  .catch((err) => {
    if (err.name === 'AbortError') {
      console.log('Request dibatalkan');
    } else {
      console.error(err);
    }
  });

setTimeout(() => controller.abort(), 1000);`,
        title: 'JavaScript: AbortController untuk Pembatalan',
        explanation:
          'AbortController di JavaScript mirip dengan context.WithCancel di Go. Signal-nya dapat dipass ke fetch untuk membatalkan request.',
      },
    },
    {
      id: 'sec-02-intermediate-context-patterns',
      type: 'markdown',
      level: 'intermediate',
      title: 'Timeout, Deadline, dan Request-Scoped Value',
      content: `## Propagasi Timeout

Context timeout sangat berguna untuk membatasi operasi jaringan atau database. Jika operasi melebihi batas waktu, ctx.Done() tertutup dan fungsi dapat kembali lebih awal.

\`\`\`go
ctx, cancel := context.WithTimeout(parentCtx, 3*time.Second)
defer cancel()

select {
case <-ctx.Done():
  return ctx.Err()
case result := <-work:
  return result
}
\`\`\`

## WithValue

"context.WithValue" menyisipkan pasangan key-value ke dalam context. Namun, penggunaannya perlu hati-hati:

- Gunakan untuk data yang spesifik request, seperti request ID, user claims, atau correlation ID.
- Hindari menyimpan dependency besar atau konfigurasi global di context.
- Key sebaiknya adalah tipe yang tidak diekspor untuk menghindari konflik antar package.

\`\`\`go
type contextKey string
const requestIDKey contextKey = "requestID"

ctx := context.WithValue(parentCtx, requestIDKey, "abc-123")
\`\`\`

## Membaca Nilai

\`\`\`go
if rid, ok := ctx.Value(requestIDKey).(string); ok {
  fmt.Println("request ID:", rid)
}
\`\`\`

Context value bersifat immutable: WithValue selalu menghasilkan context baru.`,
    },
    {
      id: 'sec-02-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-02-ts',
        filename: 'cancellation-token.ts',
        language: 'typescript',
        title: 'TypeScript: Cancellation Token Pattern',
        code: `type CancelToken = {
  cancelled: boolean;
  onCancel: (fn: () => void) => void;
  cancel: () => void;
};

function createCancelToken(): CancelToken {
  const handlers: Array<() => void> = [];
  return {
    cancelled: false,
    onCancel(fn) {
      if (this.cancelled) fn();
      else handlers.push(fn);
    },
    cancel() {
      if (this.cancelled) return;
      this.cancelled = true;
      handlers.forEach((fn) => fn());
    },
  };
}

async function longRunning(token: CancelToken) {
  return new Promise<string>((resolve, reject) => {
    const timeout = setTimeout(() => resolve('selesai'), 5000);
    token.onCancel(() => {
      clearTimeout(timeout);
      reject(new Error('dibatalkan'));
    });
  });
}

const token = createCancelToken();
longRunning(token).catch(console.error);
setTimeout(() => token.cancel(), 1000);`,
        explanation:
          'Cancellation token di TypeScript mensimulasikan perilaku context.WithCancel. Token dapat di-pass dan didaftarkan callback saat pembatalan terjadi.',
      },
    },
    {
      id: 'sec-02-advanced-context-internals',
      type: 'markdown',
      level: 'advanced',
      title: 'Context Tree dan Best Practices',
      content: `## Struktur Tree Context

Setiap kali kita memanggil WithCancel, WithTimeout, WithDeadline, atau WithValue, Go membuat node child yang mereferensi parent-nya. Struktur ini membentuk tree. Ketika parent dibatalkan, sinyal pembatalan menyebar ke semua subtree melalui channel Done yang saling terhubung.

Jika child memiliki deadline yang lebih ketat dari parent, deadline child yang berlaku. Jika parent dibatalkan lebih dulu, child juga ikut dibatalkan.

## Leaking Goroutine

Salah satu bug umum adalah lupa memanggil cancel dari WithCancel/WithTimeout/WithDeadline. Hal ini dapat menyebabkan goroutine dan resource tetap hidup lebih lama dari yang diperlukan. Selalu gunakan "defer cancel()" setelah membuat context derivatif.

## Best Practices

- Jangan menyimpan context di struct; pass sebagai parameter pertama.
- Jangan mengubah context yang diterima; selalu buat child jika perlu.
- Gunakan tipe key khusus untuk WithValue, bukan string biasa.
- Jangan mengabaikan ctx.Err(); gunakan untuk memberikan informasi error yang tepat.
- Gunakan ctx.Done() di select bersama dengan operasi lain agar pembatalan terdeteksi.

## Di Balik Layar

Implementasi context di Go menggunakan interface kecil dengan method Done(), Err(), Deadline(), dan Value(). Setiap variasi (cancelCtx, timerCtx, valueCtx) mengimplementasikan interface ini dengan cara yang efisien. Channel Done dibuat secara lazy, artinya hanya dialokasikan ketika pertama kali dibutuhkan.`,
    },
    {
      id: 'sec-02-go-example',
      type: 'code-example',
      codeExample: {
        id: 'code-02-go',
        filename: 'context-timeout.go',
        language: 'go',
        title: 'Go: Context dengan Timeout dan Value',
        code: `package main

import (
	"context"
	"fmt"
	"time"
)

type contextKey string

const requestIDKey contextKey = "requestID"

func fetchData(ctx context.Context) (string, error) {
	select {
	case <-time.After(2 * time.Second):
		return "data", nil
	case <-ctx.Done():
		return "", fmt.Errorf("fetch cancelled: %w", ctx.Err())
	}
}

func handler(ctx context.Context) {
	ctx = context.WithValue(ctx, requestIDKey, "req-789")

	ctx, cancel := context.WithTimeout(ctx, 1*time.Second)
	defer cancel()

	if rid, ok := ctx.Value(requestIDKey).(string); ok {
		fmt.Println("handling request:", rid)
	}

	data, err := fetchData(ctx)
	if err != nil {
		fmt.Println("error:", err)
		return
	}
	fmt.Println("received:", data)
}

func main() {
	handler(context.Background())
}`,
        explanation:
          'Context dibawa dari handler ke fetchData. WithValue menyisipkan request ID, dan WithTimeout memberikan batas waktu. Jika operasi memakan waktu lebih dari 1 detik, ctx.Done() tertutup dan fetchData mengembalikan error.',
      },
    },
    {
      id: 'sec-02-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Ringkasan:** Context adalah cara idiomatic di Go untuk membawa deadline, sinyal pembatalan, dan nilai request-scoped. Selalu pass context sebagai parameter pertama dan panggil cancel untuk context derivatif. Context membentuk tree: membatalkan parent membatalkan semua child. Gunakan WithValue secara hemat dan selalu gunakan tipe key khusus untuk menghindari konflik.',
    },
  ],
}
