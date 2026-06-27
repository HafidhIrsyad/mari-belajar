import type { Lesson } from '@/content/types'

export const ch05Lesson: Lesson = {
  id: 'lesson-ch-05-http2-tls',
  estimatedMinutes: 50,
  sections: [
    {
      id: 'sec-go-adv-05-basic',
      type: 'markdown',
      level: 'basic',
      title: 'TCP/IP, DNS, dan TLS Handshake',
      content: `## TCP/IP Stack Recap

Sebelum HTTP bekerja, koneksi memerlukan:
1. **DNS resolution**: mengubah hostname menjadi IP address.
2. **TCP three-way handshake**: SYN, SYN-ACK, ACK.
3. **TLS handshake**: negosiasi cipher suite dan pertukaran key.

## TLS 1.2 vs TLS 1.3

- **TLS 1.2**: handshake membutuhkan 2-RTT.
- **TLS 1.3**: handshake hanya 1-RTT dan mendukung 0-RTT resumption untuk koneksi berulang.

TLS 1.3 juga menghapus algoritma yang dianggap lemah dan memperkenalkan encrypted extensions untuk meningkatkan privasi.

## Certificate Chain dan SNI

- **Certificate chain**: server menyertakan intermediate certificate agar client bisa memvalidasi ke root CA.
- **SNI (Server Name Indication)**: client menyertakan hostname yang diminta dalam ClientHello, memungkinkan satu IP melayani banyak domain dengan sertifikat berbeda.`,
    },
    {
      id: 'sec-go-adv-05-js',
      type: 'code-example',
      codeExample: {
        id: 'code-go-adv-05-js',
        filename: 'fetch-timeout.mjs',
        language: 'javascript',
        title: 'JavaScript: Fetch dengan Timeout',
        code: `async function fetchWithTimeout(url, ms) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), ms);

  try {
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);
    return res;
  } catch (err) {
    clearTimeout(timeout);
    throw err;
  }
}

fetchWithTimeout('https://api.example.com/data', 3000)
  .then((res) => res.json())
  .then(console.log)
  .catch(console.error);`,
        explanation:
          'AbortController memberikan cara membatalkan fetch setelah timeout. Di Go, timeout dikelola melalui context.Timeout dan http.Client.Timeout.',
      },
    },
    {
      id: 'sec-go-adv-05-intermediate',
      type: 'markdown',
      level: 'intermediate',
      title: 'HTTP/2 Framing, Multiplexing, dan HPACK',
      content: `## HTTP/2 Framing

HTTP/2 memecah komunikasi menjadi frame-frame biner:
- **HEADERS frame**: membawa header request/response.
- **DATA frame**: membawa payload.
- **SETTINGS frame**: negosiasi parameter koneksi.
- **RST_STREAM/GOAWAY**: sinyal error atau penutupan koneksi.

## Multiplexing

Dalam satu koneksi TCP, HTTP/2 bisa mengirim banyak request/response secara parallel melalui stream yang berbeda. Ini mengatasi head-of-line blocking di HTTP/1.1.

## HPACK

**HPACK** adalah mekanisme kompresi header di HTTP/2. HPACK menggunakan:
- **Static table**: daftar header umum yang sudah ditentukan.
- **Dynamic table**: tabel yang diperbarui secara dinamis berdasarkan header sebelumnya.
- **Huffman encoding**: kompresi string tambahan.

HPACK dirancang untuk mencegah serangan kompresi seperti CRIME.

## HTTP/3 dan QUIC

HTTP/3 berjalan di atas QUIC, yang dibangun di atas UDP. QUIC mengatasi head-of-line blocking di level transport dan mendukung migrasi koneksi antar jaringan.`,
    },
    {
      id: 'sec-go-adv-05-ts',
      type: 'code-example',
      codeExample: {
        id: 'code-go-adv-05-ts',
        filename: 'typed-fetch-wrapper.ts',
        language: 'typescript',
        title: 'TypeScript: Typed Fetch Wrapper dengan Generics',
        code: `async function apiFetch<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(\`https://api.example.com\${path}\`, {
    ...options,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });
  if (!res.ok) {
    throw new Error(\`HTTP \${res.status}: \${res.statusText}\`);
  }
  return res.json() as Promise<T>;
}

interface User {
  id: number;
  name: string;
}

apiFetch<User>('/users/1').then((user) => console.log(user.name));`,
        explanation:
          'Wrapper typed fetch menyediakan type safety dan header default. Di Go, kita bisa membuat http.Client dengan transport custom untuk mengontrol timeout dan connection reuse.',
      },
    },
    {
      id: 'sec-go-adv-05-advanced',
      type: 'markdown',
      level: 'advanced',
      title: 'TLS Session Resumption, ALPN, dan Custom RoundTripper',
      content: `## TLS Session Resumption

**Session resumption** memungkinkan client dan server menggunakan informasi sesi sebelumnya untuk menghindari full handshake:
- **Session IDs/Tickets**: server mengirim ticket yang bisa digunakan kembali.
- **0-RTT**: client mengirim data bersamaan dengan handshake resume, mengurangi latency tetapi dengan risiko replay attack.

## ALPN

**ALPN (Application-Layer Protocol Negotiation)** memungkinkan client dan server memilih protokol aplikasi selama TLS handshake, misalnya \`h2\` untuk HTTP/2 atau \`h3\` untuk HTTP/3.

## Custom RoundTripper

\`http.RoundTripper\` adalah interface yang bertanggung jawab mengeksekusi HTTP request. Dengan mengcustomize RoundTripper, kita bisa mengatur:
- Jumlah idle connections.
- Idle connection timeout.
- TLS config.
- DNS resolver custom.
- HTTP/2 transport secara manual.

## Reverse Proxy Connection Pooling

\`httputil.ReverseProxy\` di Go secara default menggunakan http.Transport yang sudah memiliki connection pooling. Kita bisa mengganti transport untuk tuning:
- Meningkatkan \`MaxIdleConns\` dan \`MaxIdleConnsPerHost\`.
- Mengatur \`IdleConnTimeout\`.
- Menonaktifkan keep-alive jika tidak diperlukan.
- Menambahkan metrics atau logging pada transport custom.`,
    },
    {
      id: 'sec-go-adv-05-go',
      type: 'code-example',
      codeExample: {
        id: 'code-go-adv-05-go',
        filename: 'reverse_proxy.go',
        language: 'go',
        title: 'Go: Reverse Proxy dengan Custom Transport',
        code: `package main

import (
\t"crypto/tls"
\t"log"
\t"net/http"
\t"net/http/httputil"
\t"net/url"
\t"time"
)

func newProxy(target string) (*httputil.ReverseProxy, error) {
\tu, err := url.Parse(target)
\tif err != nil {
\t\treturn nil, err
\t}

\ttransport := &http.Transport{
\t\tMaxIdleConns:        200,
\t\tMaxIdleConnsPerHost: 100,
\t\tIdleConnTimeout:     90 * time.Second,
\t\tTLSHandshakeTimeout: 10 * time.Second,
\t\tTLSClientConfig: &tls.Config{
\t\t\tMinVersion: tls.VersionTLS12,
\t\t\tNextProtos: []string{"h2", "http/1.1"},
\t\t},
\t}

\tproxy := httputil.NewSingleHostReverseProxy(u)
\tproxy.Transport = transport
\tproxy.ErrorLog = log.Default()
\treturn proxy, nil
}

func main() {
\tproxy, err := newProxy("https://backend.internal")
\tif err != nil {
\t\tlog.Fatal(err)
\t}

\tserver := &http.Server{
\t\tAddr:         ":8080",
\t\tHandler:      proxy,
\t\tReadTimeout:  5 * time.Second,
\t\tWriteTimeout: 10 * time.Second,
\t\tIdleTimeout:  120 * time.Second,
\t}
\tlog.Fatal(server.ListenAndServeTLS("cert.pem", "key.pem"))
}`,
        explanation:
          'Custom transport mengatur connection pooling, TLS version, dan ALPN protocols. ReverseProxy meneruskan request ke backend sambil memanfaatkan idle connection reuse untuk performa tinggi.',
      },
    },
    {
      id: 'sec-go-adv-05-callout',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Kesalahan umum:** mengabaikan TLS MinVersion, tidak mengatur timeout pada http.Client, atau membuat http.Client baru untuk setiap request sehingga kehilangan connection pooling. Gunakan satu http.Client/Transport yang dikonfigurasi dengan baik, aktifkan HTTP/2 melalui ForceAttemptHTTP2 atau TLSConfig.NextProtos, dan pertimbangkan risiko replay attack saat mengaktifkan TLS 1.3 0-RTT. Tools: `openssl s_client -connect`, `curl --http2`, dan Go `httptest` untuk testing transport.',
    },
  ],
}
