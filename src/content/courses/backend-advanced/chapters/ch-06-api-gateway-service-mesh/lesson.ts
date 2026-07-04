import type { Lesson } from '@/content/types'

export const ch06Lesson: Lesson = {
  id: 'lesson-ch-06-api-gateway-service-mesh',
  estimatedMinutes: 45,
  sections: [
    {
      id: 'sec-06-basic-gateway',
      type: 'markdown',
      level: 'basic',
      title: 'API Gateway dan Reverse Proxy',
      content: `## API Gateway sebagai Pintu Masuk

API gateway adalah lapisan di depan satu atau banyak microservice. Client hanya berbicara ke gateway; gateway yang menentukan service mana yang harus melayani request. Tanggung jawab umum:

- **Routing**: memetakan path atau host ke service upstream.
- **Authentication termination**: memvalidasi token sebelum meneruskan request.
- **Rate limiting**: membatasi traffic berdasarkan client atau endpoint.
- **SSL termination**: menangani HTTPS dari client ke gateway; internal dapat menggunakan plain HTTP atau mTLS.
- **Request/response transformation**: mengubah format atau header.
- **Caching**: menyimpan response umum di edge.

## Reverse Proxy

Reverse proxy menerima request dari client dan meneruskannya ke server backend. Client tidak berinteraksi langsung dengan backend. API gateway adalah reverse proxy yang kaya fitur. Reverse proxy sederhana seperti Nginx juga dapat melakukan load balancing dan caching.

## Keuntungan Gateway

- Mengabstraksi kompleksitas internal dari client.
- Mengonsolidasikan cross-cutting concerns (auth, logging, rate limit).
- Memudahkan versioning dan migrasi service.`,
    },
    {
      id: 'sec-06-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-06-js',
        filename: 'gateway.js',
        language: 'javascript',
        title: 'JavaScript: Express Gateway Sederhana',
        code: `const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')

const app = express()

function authMiddleware(req, res, next) {
  const token = req.headers.authorization
  if (!token || !token.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'unauthorized' })
  }
  next()
}

function rateLimit(req, res, next) {
  // Simplified; production uses Redis-backed store
  next()
}

app.use('/api/orders', authMiddleware, rateLimit, createProxyMiddleware({
  target: 'http://orders.local:3001',
  changeOrigin: true,
  pathRewrite: { '^/api/orders': '/orders' },
}))

app.use('/api/payments', authMiddleware, createProxyMiddleware({
  target: 'http://payments.local:3002',
  changeOrigin: true,
  pathRewrite: { '^/api/payments': '/payments' },
}))

app.listen(8080, () => {
  console.log('gateway listening on :8080')
})`,
        explanation:
          'Gateway menangani auth dan routing sebelum meneruskan request ke service upstream yang sesuai.',
      },
    },
    {
      id: 'sec-06-intermediate-gateways',
      type: 'markdown',
      level: 'intermediate',
      title: 'Kong, Nginx, AWS API Gateway, dan Auth Termination',
      content: `## Gateway Populer

- **Kong**: dibangun di atas Nginx/OpenResty dengan plugin ecosystem untuk auth, rate limiting, logging, dan transformasi.
- **Nginx**: reverse proxy dan load balancer yang dapat dikonfigurasi sebagai gateway dengan location blocks.
- **AWS API Gateway**: managed service yang terintegrasi dengan Lambda, auth Cognito, dan throttling.
- **Envoy**: proxy L7/L4 yang sering digunakan sebagai data plane service mesh.

## Auth Termination

Auth termination berarti gateway memvalidasi token (misalnya JWT) dan meneruskan informasi identitas ke upstream melalui header. Upstream tidak perlu memvalidasi ulang token terhadap provider, mengurangi latensi dan kompleksitas.

## Rate Limiting di Gateway

Gateway adalah titik ideal untuk rate limiting karena ia melihat seluruh traffic masuk. Batas dapat diterapkan per:

- IP address.
- API key atau user.
- Endpoint atau resource.

Konfigurasi gateway memungkinkan perubahan batas tanpa deployment ulang aplikasi.

## Routing Berbasis Path dan Header

Gateway dapat routing berdasarkan:

- Path prefix: \`/api/v1/users\` ke users-service-v1.
- Header: \`X-Region: sg\` ke cluster Singapore.
- Canary: mengarahkan 5% traffic ke versi baru untuk pengujian.`,
    },
    {
      id: 'sec-06-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-06-ts',
        filename: 'gateway-route.ts',
        language: 'typescript',
        title: 'TypeScript: Konfigurasi Routing Gateway',
        code: `type Route = {
  path: string
  target: string
  version: string
  authRequired: boolean
  rateLimitPerMinute: number
}

const routes: Route[] = [
  {
    path: '/api/v1/orders',
    target: 'http://orders-v1.local:3001',
    version: 'v1',
    authRequired: true,
    rateLimitPerMinute: 100,
  },
  {
    path: '/api/v2/orders',
    target: 'http://orders-v2.local:3002',
    version: 'v2',
    authRequired: true,
    rateLimitPerMinute: 100,
  },
  {
    path: '/api/public/products',
    target: 'http://products.local:3003',
    version: 'v1',
    authRequired: false,
    rateLimitPerMinute: 1000,
  },
]

function findRoute(path: string): Route | undefined {
  return routes
    .slice()
    .sort((a, b) => b.path.length - a.path.length)
    .find((route) => path.startsWith(route.path))
}

console.log(findRoute('/api/v2/orders/O-1'))`,
        explanation:
          'Daftar route bertipe memisahkan konfigurasi dari implementasi proxy, memudahkan versioning dan pembatasan akses.',
      },
    },
    {
      id: 'sec-06-advanced-service-mesh',
      type: 'markdown',
      level: 'advanced',
      title: 'Service Mesh, mTLS, dan Observability Sidecar',
      content: `## Service Mesh

Service mesh adalah lapangan infrastruktur yang mengelola komunikasi antar service tanpa mengubah kode aplikasi. Ia bekerja sebagai **sidecar proxy** yang berdampingan dengan setiap service instance. Contoh: Istio, Linkerd, Consul Connect.

## Data Plane vs Control Plane

- **Data plane**: kumpulan proxy sidecar yang menangkap dan memproses traffic antar service.
- **Control plane**: mengatur konfigurasi proxy, menyertifikat, routing rules, dan policies.

Pemisahan ini memungkinkan operator mengubah perilaku jaringan tanpa menyentuh kode aplikasi.

## mTLS (Mutual TLS)

mTLS mengenkripsi komunikasi antar service dan memverifikasi identitas kedua belah pihak. Pada service mesh, control plane menerbitkan sertifikat ke setiap sidecar. Setiap service hanya menerima koneksi dari peer yang memiliki sertifikat valid. Ini mendukung model **zero trust**: tidak ada yang dipercaya hanya karena berada di dalam jaringan internal.

## Observability Sidecar

Proxy sidecar dapat menghasilkan metrik, log, dan trace untuk semua traffic yang melewatinya. Aplikasi tidak perlu instrumentasi manual untuk hal-hal berikut:

- Latency per upstream.
- Jumlah request dan error rate.
- Distributed trace antar service.

## Under the Hood: Sidecar Injection

Pada Kubernetes, service mesh mengubah definisi pod untuk menambahkan container proxy. Container aplikasi tetap berbicara ke \`localhost\` pada port yang sama, tetapi traffic sebenarnya melewati proxy. Teknik ini disebut **transparent interception** menggunakan iptables/eBPF. Sidecar memutuskan ke mana meneruskan traffic, menerapkan TLS, dan mengumpulkan telemetry.`,
    },
    {
      id: 'sec-06-advanced-example',
      type: 'code-example',
      codeExample: {
        id: 'code-06-advanced',
        filename: 'gateway.ts',
        language: 'typescript',
        title: 'TypeScript: API Gateway dengan NestJS Proxy',
        code: `@Controller('api')
export class GatewayController {
  constructor(private readonly http: HttpService) {}

  @All('orders/*')
  @UseGuards(AuthGuard)
  async proxyOrders(@Req() req: Request) {
    const path = req.url.replace('/api/orders', '')
    return this.http.axiosRef.request({
      method: req.method,
      url: \`http://orders.local:3001\${path}\`,
      headers: { authorization: req.headers.authorization },
      data: req.body,
    })
  }

  @All('payments/*')
  @UseGuards(AuthGuard)
  async proxyPayments(@Req() req: Request) {
    const path = req.url.replace('/api/payments', '')
    return this.http.axiosRef.request({
      method: req.method,
      url: \`http://payments.local:3002\${path}\`,
      headers: { authorization: req.headers.authorization },
      data: req.body,
    })
  }
}`,
        explanation:
          'Gateway NestJS menerapkan auth termination dan routing path ke upstream berbeda — fokus konsep gateway tanpa implementasi sidecar mesh.',
      },
    },
    {
      id: 'sec-06-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Kesimpulan:** API gateway menyederhanakan interface eksternal, sedangkan service mesh menangani komunikasi internal antar service dengan aman. Kombinasi keduanya memberikan routing, keamanan, dan observability tanpa membebani kode bisnis.',
    },
  ],
}
