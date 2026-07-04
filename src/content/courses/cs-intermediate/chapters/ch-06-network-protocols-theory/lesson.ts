import type { Lesson } from '@/content/types'

export const ch06Lesson: Lesson = {
  id: 'lesson-ch-06-network-protocols-theory',
  estimatedMinutes: 52,
  sections: [
    {
      id: 'sec-06-basic-osi-tcpip',
      type: 'markdown',
      level: 'basic',
      title: 'Model OSI dan TCP/IP',
      content: `## Mengapa Model Lapisan?

Jaringan komputer terlalu kompleks untuk diimplementasikan sebagai satu blok monolitik. Model **lapisan (layered model)** memecah tanggung jawab sehingga setiap lapisan hanya berkomunikasi dengan lapisan di atas dan di bawahnya.

## Model OSI (7 Lapisan)

| Lapisan | Nama | Fungsi |
|---------|------|--------|
| 7 | Application | HTTP, DNS, SMTP — protokol yang dilihat aplikasi |
| 6 | Presentation | Encoding, enkripsi, kompresi (TLS sering dianggap di sini) |
| 5 | Session | Manajemen sesi, checkpoint |
| 4 | Transport | TCP, UDP — end-to-end reliability/port |
| 3 | Network | IP — routing antar jaringan |
| 2 | Data Link | Ethernet, Wi-Fi — frame antar node langsung |
| 1 | Physical | Bit di kabel/fiber/udara |

OSI adalah **model referensi** — implementasi nyata internet tidak selalu memisahkan lapisan 5–7 secara ketat.

## Model TCP/IP (4 Lapisan Praktis)

| TCP/IP | Setara OSI | Protokol |
|--------|------------|----------|
| Application | 5–7 | HTTP, DNS, TLS |
| Transport | 4 | TCP, UDP |
| Internet | 3 | IPv4, IPv6 |
| Link | 1–2 | Ethernet, Wi-Fi |

Ketika browser mengakses \`https://example.com\`:

1. **DNS** (Application) menyelesaikan nama ke IP.
2. **TCP** (Transport) membangun koneksi reliable ke port 443.
3. **IP** (Internet) mengirim paket hop-by-hop ke server.
4. **Ethernet/Wi-Fi** (Link) mengirim frame ke router/gateway terdekat.
5. **TLS + HTTP** (Application) berjalan di atas TCP setelah handshake selesai.

## TCP vs UDP

- **TCP**: connection-oriented, reliable, ordered, flow-controlled. Cocok untuk HTTP, database, file transfer.
- **UDP**: connectionless, tidak guaranteed delivery. Cocok untuk DNS query, video streaming, gaming real-time.`,
    },
    {
      id: 'sec-06-go-basic',
      type: 'code-example',
      codeExample: {
        id: 'code-06-go-basic',
        filename: 'dns_lookup.go',
        language: 'go',
        title: 'Go: DNS Lookup dengan net Package',
        code: `package main

import (
	"fmt"
	"net"
)

func traceDnsResolution(hostname string) {
	fmt.Println("Resolving:", hostname)

	addrs, err := net.LookupHost(hostname)
	if err != nil {
		fmt.Println("Error:", err)
		return
	}
	fmt.Println("A/AAAA records:", addrs)

	mx, err := net.LookupMX(hostname)
	if err == nil && len(mx) > 0 {
		fmt.Println("MX records:", mx)
	}

	ns, err := net.LookupNS(hostname)
	if err == nil && len(ns) > 0 {
		fmt.Println("NS records (authoritative):", ns)
	}
}

func main() {
	traceDnsResolution("example.com")

	// Alur nyata: resolver stub → recursive resolver ISP
	// → root server → TLD (.com) → authoritative NS → A record
}`,
        explanation:
          'Package net Go memanggil resolver sistem. Di balik layar, stub resolver meneruskan ke recursive resolver yang menelusuri rantai DNS dari root hingga authoritative nameserver.',
      },
    },
    {
      id: 'sec-06-intermediate-tcp',
      type: 'markdown',
      level: 'intermediate',
      title: 'TCP Handshake, Flow Control, dan Congestion Control',
      content: `## Three-Way Handshake

Sebelum data dikirim, TCP menegosiasikan koneksi dengan **three-way handshake**:

1. **Client → Server: SYN** — client mengirim sequence number awal (mis. \`seq=x\`).
2. **Server → Client: SYN-ACK** — server merespons dengan \`seq=y, ack=x+1\`.
3. **Client → Server: ACK** — client mengirim \`ack=y+1\`. Koneksi **ESTABLISHED**.

Setiap sisi menyimpan **send window**, **receive window**, dan **congestion window** setelah handshake.

## Flow Control (Sliding Window)

**Flow control** mencegah pengirim cepat membanjiri penerima lambat. Penerima mengiklankan **receive window (rwnd)** — ruang buffer yang tersedia. Pengirim tidak boleh mengirim data melebihi rwnd.

Sliding window protocol memungkinkan beberapa segment in-flight tanpa menunggu ACK setiap paket — throughput meningkat drastis dibanding stop-and-wait.

## Congestion Control

**Congestion control** melindungi **jaringan** (bukan hanya penerima). Algoritma TCP modern (Cubic, BBR) menyesuaikan **congestion window (cwnd)** berdasarkan indikasi congestion:

- **Slow start**: cwnd dimulai kecil, digandakan setiap RTT hingga threshold.
- **Congestion avoidance**: setelah threshold, cwnd naik linear.
- **Packet loss / ECN**: cwnd dikurangi drastis (multiplicative decrease).

Perbedaan kunci: **rwnd** = kapasitas penerima; **cwnd** = estimasi kapasitas jaringan.

## Packet Routing

Router di lapisan 3 mem-forward paket IP berdasarkan **routing table**. Setiap entri berisi:

- **Prefix** (mis. \`192.168.0.0/16\`)
- **Next hop** — IP router berikutnya
- **Interface** — port keluar

Router menerapkan **longest prefix match**: dari semua entri yang cocok, pilih prefix terpanjang. Paket dialihkan hop-by-hop hingga mencapai jaringan tujuan.

## NAT (Network Address Translation)

IPv4 private (10.x, 172.16.x, 192.168.x) tidak routable di internet publik. **NAT** di router/gateway menerjemahkan:

\`\`\`text
LAN: 192.168.1.50:54321 → Internet: 203.0.113.5:40001
\`\`\`

NAT table menyimpan mapping (private IP, port) ↔ (public IP, port). Respon dari server di-map kembali ke perangkat LAN. **NAT traversal** (STUN, TURN, ICE) diperlukan untuk P2P dan WebRTC.`,
    },
    {
      id: 'sec-06-viz-tcp-handshake',
      type: 'visualization',
      visualization: {
        id: 'viz-06-tcp-handshake',
        component: 'tcp-handshake',
        title: 'TCP Three-Way Handshake',
      },
    },
    {
      id: 'sec-06-go-intermediate',
      type: 'code-example',
      codeExample: {
        id: 'code-06-go-intermediate',
        filename: 'tcp_client.go',
        language: 'go',
        title: 'Go: TCP Client dan Observasi Handshake',
        code: `package main

import (
	"fmt"
	"net"
	"time"
)

func connectTCP(host, port string, timeout time.Duration) (net.Conn, error) {
	dialer := net.Dialer{Timeout: timeout}
	return dialer.Dial("tcp", net.JoinHostPort(host, port))
}

func main() {
	start := time.Now()
	conn, err := connectTCP("1.1.1.1", "443", 5*time.Second)
	if err != nil {
		fmt.Println("Error:", err)
		return
	}
	defer conn.Close()

	fmt.Println("Connected:", conn.LocalAddr(), "->", conn.RemoteAddr())
	fmt.Println("Approx RTT (incl. handshake):", time.Since(start))
}`,
        explanation:
          'net.Dial memicu three-way handshake TCP di balik layar. Waktu hingga koneksi terbentuk mencakup SYN, SYN-ACK, ACK — plus latency jaringan (RTT).',
      },
    },
    {
      id: 'sec-06-advanced-dns-routing',
      type: 'markdown',
      level: 'advanced',
      title: 'DNS Resolution Chain dan Routing Lanjutan',
      content: `## Rantai Resolusi DNS

Ketika aplikasi memanggil \`getaddrinfo("api.example.com")\`:

1. **Stub resolver** (di OS/library) cek cache lokal.
2. Jika miss, query ke **recursive resolver** (ISP, 1.1.1.1, 8.8.8.8).
3. Recursive resolver, jika belum cache:
   - Query **root nameserver** (.) → dapat referensi ke TLD.
   - Query **TLD nameserver** (.com) → dapat referensi ke authoritative.
   - Query **authoritative NS** example.com → dapat A/AAAA record.
4. Jawaban di-cache sesuai **TTL** (Time To Live).

Record penting:

- **A/AAAA**: IP address
- **CNAME**: alias ke hostname lain
- **NS**: authoritative nameserver
- **MX**: mail server

**DNSSEC** menambahkan signature kriptografis untuk mencegah spoofing — belum universal tetapi semakin diadopsi.

## BGP dan Routing Internet

Antar **Autonomous System (AS)**, routing menggunakan **BGP (Border Gateway Protocol)**. Setiap AS mengiklankan prefix IP yang dapat dijangkau. BGP memilih path berdasarkan policy (bukan hanya hop count) — ini menjelaskan mengapa traffic Jakarta–Singapura kadang melalui AS di benua lain.

## TCP Connection Teardown

Koneksi ditutup dengan **four-way handshake** (FIN-ACK-FIN-ACK) atau RST jika abort. **TIME_WAIT** state (2×MSL) mencegah segment lama mengacaukan koneksi baru.

## HTTP/2 dan Multiplexing

HTTP/2 multiplexing banyak stream di **satu koneksi TCP**. Head-of-line blocking TCP masih ada — jika satu paket hilang, semua stream menunggu retransmission. HTTP/3 (QUIC over UDP) mengatasi ini dengan stream-level recovery.

## Security di Lapisan Transport

- **TLS** berjalan di atas TCP, menambahkan enkripsi dan autentikasi server.
- **mTLS** menambahkan autentikasi client.
- Firewall stateful melacak koneksi TCP (SYN → ESTABLISHED) untuk memfilter paket yang tidak belong.`,
    },
    {
      id: 'sec-06-go-advanced',
      type: 'code-example',
      codeExample: {
        id: 'code-06-go-advanced',
        filename: 'main.go',
        language: 'go',
        title: 'Go: HTTP Client dengan Connection Reuse dan Timeout',
        code: `package main

import (
	"context"
	"fmt"
	"io"
	"net"
	"net/http"
	"time"
)

func main() {
	transport := &http.Transport{
		DialContext: (&net.Dialer{
			Timeout:   5 * time.Second,
			KeepAlive: 30 * time.Second,
		}).DialContext,
		MaxIdleConns:        100,
		MaxIdleConnsPerHost: 10,
		IdleConnTimeout:     90 * time.Second,
		TLSHandshakeTimeout: 10 * time.Second,
	}

	client := &http.Client{
		Transport: transport,
		Timeout:   15 * time.Second,
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	req, _ := http.NewRequestWithContext(ctx, http.MethodGet, "https://example.com", nil)
	resp, err := client.Do(req)
	if err != nil {
		fmt.Println("Error:", err)
		return
	}
	defer resp.Body.Close()

	body, _ := io.ReadAll(io.LimitReader(resp.Body, 256))
	fmt.Printf("Status: %s\\nBody preview: %s\\n", resp.Status, string(body))
}`,
        explanation:
          'http.Transport mengelola pool koneksi TCP/TLS. Keep-alive memungkinkan reuse koneksi setelah handshake pertama — mengurangi latency request berikutnya. Timeout mencegah hang saat routing atau DNS gagal.',
      },
    },
    {
      id: 'sec-06-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Kesimpulan:** Memahami stack protokol dari DNS hingga TCP membantu mendiagnosis latency, connection reset, dan timeout di production. Untuk implementasi praktis HTTP di backend, lanjut ke [HTTP Fundamentals](/courses/backend-basic/ch-01-http-fundamentals). Untuk TLS, HTTP/2, dan connection pooling di Go, pelajari [Advanced HTTP/2, TLS & Network Internals](/courses/go-advanced/ch-05-http2-tls).',
    },
  ],
}
