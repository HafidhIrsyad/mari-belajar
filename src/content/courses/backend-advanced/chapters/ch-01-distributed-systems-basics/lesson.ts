import type { Lesson } from '@/content/types'

export const ch01Lesson: Lesson = {
  id: 'lesson-ch-01-distributed-systems-basics',
  estimatedMinutes: 50,
  sections: [
    {
      id: 'sec-01-basic-distributed-systems',
      type: 'markdown',
      level: 'basic',
      title: 'Arsitektur Terdistribusi dari Monolith hingga Microservices',
      content: `## Apa itu Distributed System?

Distributed system adalah sekumpulan komputer otonom yang berkomunikasi melalui jaringan untuk menyelesaikan tugas bersama. Pengguna merasakannya sebagai satu sistem utuh, padahal di baliknya ada banyak proses yang berjalan di mesin berbeda.

## Monolith vs Microservices

- **Monolith**: seluruh fitur—UI, logika bisnis, akses data—dikemas dalam satu basis kode dan satu proses. Mudah di-deploy awalnya, tetapi skala tim dan fitur bisa membuatnya kaku.
- **Modular Monolith**: kode tetap satu proses, tetapi dipisah menjadi modul yang jelas. Transisi ke microservices menjadi lebih mudah.
- **Microservices**: aplikasi dipecah menjadi service kecil yang independen, masing-masing memiliki data dan tanggung jawab sendiri. Keuntungan: skala tim, deployment independen, teknologi heterogen. Biaya: latency jaringan, partial failure, konsistensi data, dan operasional yang lebih kompleks.

## Service Boundaries

Membatasi service berarti menentukan apa yang menjadi tanggung jawab eksklusif setiap service. Boundary yang baik:

- Memiliki kohesi tinggi dan coupling rendah antar service.
- Memiliki data sendiri; service lain mengaksesnya melalui API publik, bukan query langsung ke database.
- Berbicara dalam bahasa domain yang stabil sehingga perubahan internal tidak mudah merembet.

## Remote Call

Ketika satu service memanggil service lain, kita tidak lagi memanggil fungsi dalam satu proses. Remote call melibatkan:

1. Serialisasi request menjadi bytes.
2. Pengiriman melalui socket TCP/UDP, biasanya di atas HTTP/gRPC.
3. Deserialisasi di sisi penerima, eksekusi, dan pengembalian response.
4. Network round-trip menambah latency dan kemungkinan kegagalan di setiap tahap.

Karena itu, desain distributed system harus mengasumsikan bahwa panggilan bisa gagal, lambat, atau hilang.`,
    },
    {
      id: 'sec-01-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-01-js',
        filename: 'service-call.js',
        language: 'javascript',
        title: 'JavaScript: Simulasi Remote Call dengan Timeout',
        code: `const http = require('http')

function callRemoteService(path, timeoutMs = 2000) {
  return new Promise((resolve, reject) => {
    const req = http.get(
      { hostname: 'inventory.local', port: 3001, path, timeout: timeoutMs },
      (res) => {
        let data = ''
        res.on('data', (chunk) => { data += chunk })
        res.on('end', () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(JSON.parse(data))
          } else {
            reject(new Error('remote service returned ' + res.statusCode))
          }
        })
      }
    )

    req.on('error', reject)
    req.on('timeout', () => {
      req.destroy()
      reject(new Error('remote call timed out'))
    })
  })
}

async function getStock(productId) {
  try {
    const result = await callRemoteService('/stock/' + productId)
    return result.quantity
  } catch (error) {
    console.error('fallback to cached stock due to', error.message)
    return null
  }
}

getStock('P-1001').then(console.log)`,
        explanation:
          'Remote call membutuhkan timeout eksplisit agar kegagalan jaringan tidak membuat caller menunggu selamanya. Fallback atau cache digunakan untuk menangani partial failure secara anggun.',
      },
    },
    {
      id: 'sec-01-intermediate-cap',
      type: 'markdown',
      level: 'intermediate',
      title: 'CAP Theorem, Fallacies, dan Eventual Consistency',
      content: `## Teorema CAP

Pada tahun 2000, Eric Brewer mengemukakan bahwa distributed data store tidak bisa secara bersamaan menjamin ketiga hal berikut:

- **Consistency**: setiap read menerima data tertulis terakhir atau error.
- **Availability**: setiap request menerima response non-error, tanpa jaminan data terbaru.
- **Partition Tolerance**: sistem tetap beroperasi meski jaringan antar node terputus.

Pada saat terjadi partisi jaringan, sistem harus memilih antara **CP** (consistency + partition tolerance) atau **AP** (availability + partition tolerance). Tanpa partisi, sistem dapat memberikan C dan A.

## PACELC

PACELC memperluas CAP: jika ada partisi (P), pilih antara availability (A) atau consistency (C); else (E), pilih antara latency (L) atau consistency (C). Banyak sistem distributed storage seperti Cassandra memilih AP dengan tuneable consistency.

## Delapan Fallacies of Distributed Computing

1. Network is reliable.
2. Latency is zero.
3. Bandwidth is infinite.
4. Network is secure.
5. Topology does not change.
6. There is one administrator.
7. Transport cost is zero.
8. Network is homogeneous.

Setiap fallacy ini mendistorsi desain. Misalnya, menganggap latency nol akan mendorong chatty API yang membuat aplikasi menjadi lambat di production.

## Eventual Consistency

Eventual consistency menjamin bahwa jika tidak ada update baru, semua replika akan konvergen ke nilai yang sama setelah waktu tertentu. Model ini umum di sistem distributed storage, CDN, dan cache. Tantangannya adalah menangani read-your-writes, monotonic reads, dan conflict resolution saat replika belum sinkron.`,
    },
    {
      id: 'sec-01-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-01-ts',
        filename: 'service-client.ts',
        language: 'typescript',
        title: 'TypeScript: Typed Service Client dengan Retry Sederhana',
        code: `type StockResponse = { productId: string; quantity: number }
type ServiceError = { code: string; message: string }

class InventoryClient {
  constructor(private baseUrl: string, private timeoutMs: number = 2000) {}

  async getStock(productId: string, retries: number = 2): Promise<StockResponse> {
    let lastError: Error | undefined

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const controller = new AbortController()
        const timer = setTimeout(() => controller.abort(), this.timeoutMs)

        const res = await fetch(this.baseUrl + '/stock/' + productId, {
          signal: controller.signal,
        })
        clearTimeout(timer)

        if (!res.ok) {
          throw new Error('service error ' + res.status)
        }
        return (await res.json()) as StockResponse
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error))
        if (attempt < retries) {
          await delay(100 * Math.pow(2, attempt))
        }
      }
    }

    throw lastError
  }
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const client = new InventoryClient('http://inventory.local:3001')
client.getStock('P-1001').then(console.log).catch(console.error)`,
        explanation:
          'Client bertipe memisahkan kontrak data dari implementasi HTTP. Retry dengan exponential backoff memberi kesempatan pada transient failure, sementara AbortController mencegah hang karena timeout.',
      },
    },
    {
      id: 'sec-01-advanced-distributed-internals',
      type: 'markdown',
      level: 'advanced',
      title: 'Service Discovery, Load Balancing, dan Estimasi Cepat',
      content: `## Service Discovery

Service discovery memungkinkan service menemukan alamat instance lain secara dinamis. Ada dua pendekatan:

- **Client-side discovery**: client meminta daftar instance ke registry (misalnya Consul, Eureka) lalu memilih sendiri.
- **Server-side discovery**: lalu lintas melewati load balancer atau proxy yang mengetahui lokasi instance.

Registry harus menjaga konsistensi antara keadaan aktual dan daftar yang di-publish. Health check berkala memastikan instance yang down tidak lagi menerima traffic.

## Load Balancing

Load balancer mendistribusikan request ke beberapa instance. Algoritma umum:

- **Round-robin**: bergiliran, sederhana tetapi tidak memperhatikan beban.
- **Least connections**: mengirim ke instance dengan koneksi aktif paling sedikit.
- **Consistent hashing**: request dengan key sama selalu menuju instance sama, berguna untuk cache locality.

Di layer L4, load balancer bekerja pada TCP/UDP; di layer L7, ia memahami HTTP sehingga bisa routing berdasarkan path, header, atau cookie.

## Back-of-the-Envelope Estimation

Sebelum merancang sistem, lakukan estimasi cepat:

- Hitung jumlah request per hari, puncak per detik, dan ukuran payload.
- Perkirakan read/write ratio untuk memilih cache dan replika.
- Perhitungkan storage growth dan retensi data.
- Estimasi membantu memilih arsitektur yang cukup, tanpa over-engineering.

## Under the Hood: RPC dan Serialisasi

Remote Procedure Call (RPC) menyembunyikan detail jaringan sehingga pemanggilan tampak seperti fungsi lokal. Namun, serialisasi (JSON, Protobuf, Avro) dan deserialisasi membutuhkan CPU dan memory. Protobuf lebih efisien karena binary format dan schema evolution. RPC framework seperti gRPC memanfaatkan HTTP/2 multiplexing untuk mengurangi overhead koneksi, tetapi tetap tidak menghilangkan network latency dan failure.`,
    },
    {
      id: 'sec-01-go-example',
      type: 'code-example',
      codeExample: {
        id: 'code-01-go',
        filename: 'main.go',
        language: 'go',
        title: 'Go: Reverse Proxy untuk Service Routing',
        code: `package main

import (
	"log"
	"net/http"
	"net/http/httputil"
	"net/url"
	"time"
)

func main() {
	target, err := url.Parse("http://inventory.local:3001")
	if err != nil {
		log.Fatal(err)
	}

	proxy := httputil.NewSingleHostReverseProxy(target)
	proxy.Transport = &http.Transport{
		MaxIdleConns:        100,
		MaxIdleConnsPerHost: 10,
		IdleConnTimeout:     90 * time.Second,
	}

	proxy.ErrorHandler = func(w http.ResponseWriter, r *http.Request, err error) {
		log.Printf("proxy error: %v", err)
		http.Error(w, "service unavailable", http.StatusServiceUnavailable)
	}

	mux := http.NewServeMux()
	mux.Handle("/api/inventory/", http.StripPrefix("/api/inventory", proxy))

	log.Println("gateway listening on :8080")
	if err := http.ListenAndServe(":8080", mux); err != nil {
		log.Fatal(err)
	}
}`,
        explanation:
          'Reverse proxy memisahkan caller dari lokasi service sebenarnya. Konfigurasi connection pool dan error handler menjaga agar partial failure satu service tidak merembet ke seluruh gateway.',
      },
    },
    {
      id: 'sec-01-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Kesimpulan:** Distributed system memberikan skala dan fleksibilitas, tetapi memperkenalkan partial failure, latency, dan trade-off CAP. Desain yang baik selalu mengasumsikan jaringan tidak sempurna, memberi timeout, retry, fallback, dan memisahkan batas service dengan jelas.',
    },
  ],
}
