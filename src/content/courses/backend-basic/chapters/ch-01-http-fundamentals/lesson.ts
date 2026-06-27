import type { Lesson } from '@/content/types'

export const ch01Lesson: Lesson = {
  id: 'lesson-ch-01-http-fundamentals',
  estimatedMinutes: 35,
  sections: [
    {
      id: 'sec-01-basic-http-cycle',
      type: 'markdown',
      level: 'basic',
      title: 'Anatomi Request dan Response',
      content: `## Siklus Request/Response

HTTP (Hypertext Transfer Protocol) bekerja dalam pola request/response. Client (biasanya browser atau aplikasi) mengirimkan request ke server, lalu server membalas dengan response. Setiap request dan response terdiri dari tiga bagian utama:

1. **Start line**: baris pertama yang berisi metode, path, dan versi HTTP untuk request; atau versi HTTP, status code, dan status text untuk response.
2. **Headers**: pasangan key-value yang memberikan metadata seperti format body, autentikasi, caching, dan informasi koneksi.
3. **Body (opsional)**: data aktual yang dikirim, misalnya JSON, HTML, atau file biner.

## Metode HTTP yang Sering Digunakan

- **GET**: mengambil resource. Bersifat safe dan idempotent.
- **POST**: membuat resource baru. Tidak idempotent.
- **PUT**: mengganti resource secara utuh. Idempotent.
- **PATCH**: memperbarui sebagian field resource. Biasanya idempotent jika implementasinya konsisten.
- **DELETE**: menghapus resource. Idempotent.

## Status Code

Status code dikelompokkan berdasarkan digit pertama:

- **1xx**: Informational (contoh: 100 Continue).
- **2xx**: Success (200 OK, 201 Created, 204 No Content).
- **3xx**: Redirect (301 Moved Permanently, 302 Found, 304 Not Modified).
- **4xx**: Client Error (400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found).
- **5xx**: Server Error (500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable).

## Header Umum

- **Host**: wajib ada di HTTP/1.1, menunjukkan domain target.
- **Content-Type**: format body, misalnya \`application/json\`.
- **Accept**: format response yang dapat diterima client.
- **Authorization**: kredensial autentikasi.
- **Cache-Control**: instruksi caching.`,
    },
    {
      id: 'sec-01-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-01-js',
        filename: 'http-client.js',
        language: 'javascript',
        title: 'JavaScript: Client HTTP dengan fetch',
        code: `async function fetchUser(userId) {
  const response = await fetch(\`https://api.example.com/users/\${userId}\`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'X-Request-ID': crypto.randomUUID(),
    },
  })

  if (!response.ok) {
    throw new Error(\`HTTP \${response.status}: \${response.statusText}\`)
  }

  return response.json()
}

fetchUser(42)
  .then((user) => console.log(user))
  .catch((error) => console.error(error.message))`,
        explanation:
          'fetch mengirimkan HTTP request dan mengembalikan Promise yang berisi Response. Properti ok bernilai true untuk status 200–299. Header Accept memberitahu server bahwa client mengharapkan JSON.',
      },
    },
    {
      id: 'sec-01-intermediate-network',
      type: 'markdown',
      level: 'intermediate',
      title: 'TCP/IP, DNS, dan TLS Handshake',
      content: `## TCP/IP Stack

HTTP berjalan di atas stack TCP/IP. Secara berurutan dari bawah ke atas:

1. **Link Layer**: Ethernet/Wi-Fi, MAC address, frame fisik.
2. **Internet Layer (IP)**: pengiriman paket antar host berdasarkan IP address.
3. **Transport Layer (TCP/UDP)**: koneksi andal dengan three-way handshake untuk TCP.
4. **Application Layer (HTTP)**: protokol yang dipahami oleh client dan server.

## DNS Resolution Flow

Sebelum client mengirim HTTP request, hostname seperti \`api.example.com\` harus diubah menjadi IP address:

1. Browser memeriksa cache lokal.
2. Jika tidak ada, permintaan dikirim ke DNS resolver (biasanya dari ISP atau \`8.8.8.8\`).
3. Resolver rekursif menanyakan root server, TLD server, dan authoritative nameserver.
4. Jawaban DNS berupa record A (IPv4) atau AAAA (IPv6) dikembalikan dengan TTL.

## Three-Way Handshake

Koneksi TCP dimulai dengan:

1. **SYN**: client mengirimkan nomor urut awal.
2. **SYN-ACK**: server mengirimkan nomor urut dan acknowledgement.
3. **ACK**: client mengonfirmasi, dan koneksi siap bertukar data.

## TLS Handshake

Setelah TCP terbentuk, TLS handshake membangun channel terenkripsi:

1. Client dan server menyepakati versi TLS dan cipher suite.
2. Server mengirimkan sertifikat dan public key.
3. Client memverifikasi sertifikat melalui rantai trusted CA.
4. Keduanya menghasilkan session key untuk enkripsi simetris.
5. Data HTTP kemudian dienkripsi dan dikirim sebagai application data.

Keep-alive memungkinkan beberapa request menggunakan koneksi TCP yang sama, mengurangi overhead handshake berulang.`,
    },
    {
      id: 'sec-01-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-01-ts',
        filename: 'http-client.ts',
        language: 'typescript',
        title: 'TypeScript: Request Bertipe dengan AbortController',
        code: `type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

interface ApiResponse<T> {
  data: T
  status: number
  headers: Headers
}

async function httpRequest<T>(
  url: string,
  method: HttpMethod = 'GET',
  body?: unknown,
  timeoutMs = 5000
): Promise<ApiResponse<T>> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), timeoutMs)

  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    })

    if (!response.ok) {
      throw new Error(\`Request failed: \${response.status} \${response.statusText}\`)
    }

    const data = (await response.json()) as T
    return { data, status: response.status, headers: response.headers }
  } finally {
    clearTimeout(timeout)
  }
}

interface User {
  id: number
  name: string
}

httpRequest<User>('https://api.example.com/users/1')
  .then((result) => console.log(result.data.name))
  .catch((error) => console.error(error instanceof Error ? error.message : error))`,
        explanation:
          'AbortController memungkinkan pembatalan request jika melebihi batas waktu. Tipe generik ApiResponse<T> menjaga response agar konsisten dengan model data yang diharapkan.',
      },
    },
    {
      id: 'sec-01-advanced-protocols',
      type: 'markdown',
      level: 'advanced',
      title: 'HTTP/2 Framing, Multiplexing, dan HTTP/3 QUIC',
      content: `## HTTP/1.1 dan Keterbatasannya

HTTP/1.1 menggunakan teks biasa dan mengirim request secara berurutan dalam satu koneksi persistent. Jika satu request besar memblokir, request di belakangnya ikut tertunda. Ini disebut head-of-line (HOL) blocking di level aplikasi.

## HTTP/2 Framing

HTTP/2 mengubah semua komunikasi menjadi frame-frame biner. Satu koneksi TCP dapat membawa banyak stream secara paralel. Frame-frame dari stream berbeda diinterleave, sehingga response kecil tidak perlu menunggu response besar.

Beberapa jenis frame:

- **HEADERS**: membawa header stream.
- **DATA**: membawa payload stream.
- **SETTINGS**: negosiasi parameter koneksi.
- **WINDOW_UPDATE**: kontrol aliran untuk mencegah overload.
- **RST_STREAM**: membatalkan satu stream tanpa menutup koneksi.

HTTP/2 juga memperkenalkan:

- **Header compression (HPACK)**: mengurangi redundansi header.
- **Server push**: server dapat mengirim resource pendukung secara proaktif (meski sering dinonaktifkan).

## HOL Blocking di Transport Layer

Meski HTTP/2 mengatasi HOL blocking di level aplikasi, semua stream masih berbagi satu koneksi TCP. Jika satu paket TCP hilang, seluruh koneksi harus menunggu retransmisi.

## HTTP/3 dan QUIC

HTTP/3 memindahkan transport ke QUIC yang berjalan di atas UDP. Keuntungannya:

1. **Connection migration**: connection ID memungkinkan perpindahan jaringan (Wi-Fi ke 4G) tanpa handshake ulang.
2. **Zero or one RTT handshake**: QUIC menggabungkan handshake transport dan TLS 1.3.
3. **No HOL blocking at transport**: setiap stream memiliki delivery control independen.

## Content Negotiation dan Session Internals

Header \`Accept\`, \`Accept-Encoding\`, dan \`Accept-Language\` memungkinkan server memilih representasi terbaik. Cookie dikirim melalui header \`Cookie\` dan diatur server melalui \`Set-Cookie\` dengan atribut \`HttpOnly\`, \`Secure\`, \`SameSite\`, dan \`Max-Age\` untuk mengendalikan perilaku session.`,
    },
    {
      id: 'sec-01-go-example',
      type: 'code-example',
      codeExample: {
        id: 'code-01-go',
        filename: 'main.go',
        language: 'go',
        title: 'Go: HTTP Server dengan Timeout',
        code: `package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"time"
)

func helloHandler(w http.ResponseWriter, r *http.Request) {
	ctx, cancel := context.WithTimeout(r.Context(), 2*time.Second)
	defer cancel()

	select {
	case <-time.After(500 * time.Millisecond):
		w.Header().Set("Content-Type", "application/json")
		fmt.Fprintln(w, \`{"message":"halo dari server"}\`)
	case <-ctx.Done():
		http.Error(w, "timeout", http.StatusGatewayTimeout)
	}
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("GET /hello", helloHandler)

	server := &http.Server{
		Addr:         ":8080",
		Handler:      mux,
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 10 * time.Second,
		IdleTimeout:  120 * time.Second,
	}

	log.Println("Server berjalan di http://localhost:8080")
	log.Fatal(server.ListenAndServe())
}`,
        explanation:
          'Go stdlib net/http menyediakan server HTTP minimalis. ReadTimeout, WriteTimeout, dan IdleTimeout melindungi dari koneksi yang menganggur atau lambat. Context memungkinkan pembatalan operasi jika client memutuskan koneksi.',
      },
    },
    {
      id: 'sec-01-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Kesimpulan:** HTTP tampak sederhana di permukaan, tetapi performa dan keamanannya sangat bergantung pada lapisan di bawahnya. Pahami DNS, TCP handshake, TLS, dan evolusi HTTP/2 serta HTTP/3 agar dapat mendiagnosis latency, memilih konfigurasi server, dan merancang API yang efisien.',
    },
  ],
}
