import type { Lesson } from '@/content/types'

export const ch02Lesson: Lesson = {
  id: 'lesson-ch-02-fetch-api-http-client',
  estimatedMinutes: 40,
  sections: [
    {
      id: 'sec-02-basic-fetch',
      type: 'markdown',
      level: 'basic',
      title: 'fetch(), Promise, async/await, dan Status Code',
      content: `## Menggunakan fetch

\`fetch\` adalah API bawaan browser (dan Node.js modern) untuk membuat HTTP request. Fungsi ini mengembalikan \`Promise<Response>\`.

\`\`\`javascript
const response = await fetch('https://api.example.com/users');
const users = await response.json();
\`\`\`

## Status Code

Setiap respons HTTP memiliki status code:

- \`2xx\`: sukses, misalnya \`200 OK\` dan \`201 Created\`.
- \`4xx\`: kesalahan client, misalnya \`400 Bad Request\` dan \`404 Not Found\`.
- \`5xx\`: kesalahan server, misalnya \`500 Internal Server Error\`.

## Perbedaan Network Error dan HTTP Error

- **HTTP error**: server merespons dengan status \`4xx\` atau \`5xx\`. \`fetch\` tetap resolve.
- **Network error**: request tidak sampai ke server, misalnya karena offline atau CORS. \`fetch\` reject dengan \`TypeError\`.

## Method dan Body

\`\`\`javascript
await fetch('https://api.example.com/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Budi' }),
});
\`\`\`

## Query Parameters

Gunakan \`URLSearchParams\` untuk membangun query string yang aman:

\`\`\`javascript
const params = new URLSearchParams({ page: '1', limit: '10' });
const url = \`https://api.example.com/users?\${params}\`;
\`\`\``,
    },
    {
      id: 'sec-02-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-02-js',
        filename: 'http-client.js',
        language: 'javascript',
        title: 'JavaScript: HTTP Client dengan Error Handling',
        code: `async function getJson(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
  }

  return response.json();
}

async function postJson(url, body) {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
  }

  return response.json();
}

getJson('https://jsonplaceholder.typicode.com/posts/1')
  .then((data) => console.log(data.title))
  .catch((error) => console.error('Request failed:', error.message));`,
        explanation:
          'Selalu periksa response.ok sebelum memproses body. response.ok bernilai true untuk status 200-299. Tanpa pemeriksaan ini, status 404 atau 500 akan terlewat.',
      },
    },
    {
      id: 'sec-02-intermediate-fetch',
      type: 'markdown',
      level: 'intermediate',
      title: 'Headers, AbortController, Retry/Backoff, dan Connection Lifecycle',
      content: `## Headers

Header request dan respons disimpan dalam objek \`Headers\`. Beberapa header seperti \`Set-Cookie\` tidak bisa dibaca dari JavaScript karena alasan keamanan.

\`\`\`javascript
const headers = new Headers();
headers.append('Accept', 'application/json');
headers.append('Authorization', 'Bearer token123');
\`\`\`

## AbortController dan Signal

\`AbortController\` menghasilkan \`signal\` yang bisa dipass ke \`fetch\`. Ketika \`controller.abort()\` dipanggil, fetch akan reject dengan \`AbortError\`.

\`\`\`javascript
const controller = new AbortController();
fetch('/data', { signal: controller.signal });
setTimeout(() => controller.abort(), 5000);
\`\`\`

Pola ini penting untuk mencegah race condition dan memory leak saat komponen React di-unmount sebelum request selesai.

## Retry dengan Exponential Backoff

Retry membantu menangani kegagalan sementara. Exponential backoff meningkatkan jeda antar percobaan untuk mengurangi beban server.

\`\`\`javascript
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchWithRetry(url, options, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fetch(url, options);
    } catch (error) {
      if (i === retries - 1) throw error;
      await delay(2 ** i * 1000);
    }
  }
}
\`\`\`

## Lifecycle Koneksi

Sebelum data dikirim, browser menjalankan:

1. DNS lookup: domain diubah menjadi alamat IP.
2. TCP handshake: tiga langkah pembukaan koneksi.
3. TLS handshake (HTTPS): negosiasi enkripsi.
4. HTTP request/response.

HTTP/1.1 menggunakan keep-alive untuk menggunakan kembali koneksi TCP. HTTP/2 memungkinkan banyak stream request/respons multiplexed dalam satu koneksi, mengurangi overhead handshake.`,
    },
    {
      id: 'sec-02-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-02-ts',
        filename: 'httpClient.ts',
        language: 'typescript',
        title: 'TypeScript: Typed HTTP Wrapper dengan Generics',
        code: `type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type ApiError = {
  status: number;
  message: string;
};

class HttpClient {
  constructor(private baseURL: string) {}

  async request<T>(
    method: HttpMethod,
    path: string,
    body?: unknown,
    signal?: AbortSignal
  ): Promise<T> {
    const response = await fetch(\`\${this.baseURL}\${path}\`, {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
      signal,
    });

    if (!response.ok) {
      const error: ApiError = {
        status: response.status,
        message: response.statusText,
      };
      throw error;
    }

    return response.json() as Promise<T>;
  }

  get<T>(path: string, signal?: AbortSignal): Promise<T> {
    return this.request<T>('GET', path, undefined, signal);
  }

  post<T>(path: string, body: unknown, signal?: AbortSignal): Promise<T> {
    return this.request<T>('POST', path, body, signal);
  }
}

interface Post {
  id: number;
  title: string;
}

const api = new HttpClient('https://jsonplaceholder.typicode.com');
const controller = new AbortController();

api.get<Post[]>('/posts', controller.signal)
  .then((posts) => console.log(posts.length))
  .catch((err: ApiError) => console.error(err.status, err.message));`,
        explanation:
          'Generic T memastikan response.json() dikembalikan dengan tipe yang sesuai. AbortSignal memungkinkan pembatalan request, sementara class HttpClient mengenkapsulasi header dan base URL.',
      },
    },
    {
      id: 'sec-02-advanced-fetch',
      type: 'markdown',
      level: 'advanced',
      title: 'Interceptor, Token Refresh, Circuit Breaker, dan HTTP/2',
      content: `## Interceptor Pattern

Interceptor adalah fungsi yang dieksekusi sebelum request dikirim atau setelah respons diterima. Pola ini memisahkan concern seperti logging, header auth, dan transformasi data dari business logic.

Contoh sederhana:

\`\`\`javascript
const requestInterceptors = [];
async function http(url, options) {
  let opts = options;
  for (const fn of requestInterceptors) {
    opts = await fn(opts);
  }
  return fetch(url, opts);
}
\`\`\`

## Token Refresh Otomatis

Jika access token expired, interceptor response bisa menangkap \`401\`, melakukan refresh token, lalu mengulang request asli. Penting untuk mencegah race condition pada multiple request dengan menyimpan promise refresh tunggal.

## Circuit Breaker

Circuit breaker melacak kegagalan request. Jika kegagalan melebihi threshold, request langsung gagal tanpa mencoba jaringan untuk sementara. Pola ini melindungi server yang sedang down dan menghemat resource client.

## HTTP/2 dan Connection Pooling

HTTP/2 multiplexing mengirim banyak request dalam satu koneksi TCP. Browser biasanya membuka beberapa koneksi per origin (sekitar 6 untuk HTTP/1.1, satu untuk HTTP/2). Connection pooling memungkinkan reuse koneksi, tetapi fetch di browser tidak mengekspos kontrol pool secara langsung.

## OpenAPI Client Generation

OpenAPI (Swagger) memungkinkan pembuatan client berbasis spesifikasi API. Generator seperti openapi-typescript menghasilkan tipe TypeScript dari schema, mengurangi risiko ketidakcocokan antara client dan server.`,
    },
    {
      id: 'sec-02-go-example',
      type: 'code-example',
      codeExample: {
        id: 'code-02-go',
        filename: 'http_client.go',
        language: 'go',
        title: 'Go: net/http Client dengan Timeout dan Context',
        code: `package main

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"time"
)

type Post struct {
	ID    int    \`json:"id"\`
	Title string \`json:"title"\`
}

func main() {
	client := &http.Client{
		Timeout: 10 * time.Second,
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	req, err := http.NewRequestWithContext(ctx, http.MethodGet, "https://jsonplaceholder.typicode.com/posts/1", nil)
	if err != nil {
		panic(err)
	}

	resp, err := client.Do(req)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		panic(fmt.Sprintf("HTTP %d", resp.StatusCode))
	}

	var post Post
	if err := json.NewDecoder(resp.Body).Decode(&post); err != nil {
		panic(err)
	}

	fmt.Println(post.Title)
}`,
        explanation:
          'Go menggunakan context untuk cancellation dan timeout, mirip AbortController di JavaScript. http.Client memiliki transport bawaan yang mendukung connection pooling dan keep-alive.',
      },
    },
    {
      id: 'sec-02-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Kesimpulan:** fetch adalah fondasi HTTP client modern. Bedakan network error dan HTTP error, gunakan AbortController untuk cancellation, dan bangun wrapper typed dengan generics. Di level lanjut, terapkan interceptor, retry dengan backoff, dan pahami lifecycle koneksi serta HTTP/2 multiplexing.',
    },
  ],
}
