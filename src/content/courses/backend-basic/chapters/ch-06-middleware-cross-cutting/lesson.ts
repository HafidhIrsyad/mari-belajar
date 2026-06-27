import type { Lesson } from '@/content/types'

export const ch06Lesson: Lesson = {
  id: 'lesson-ch-06-middleware-cross-cutting',
  estimatedMinutes: 30,
  sections: [
    {
      id: 'sec-06-basic-middleware',
      type: 'markdown',
      level: 'basic',
      title: 'Middleware Signature, Logging, dan Security Headers',
      content: `## Apa Itu Middleware?

Middleware adalah fungsi yang berada di antara request masuk dan handler akhir. Middleware dapat:

- Memodifikasi request atau response.
- Menghentikan request dan mengembalikan response lebih awal.
- Melanjutkan eksekusi ke middleware berikutnya.

Signature middleware di Express:

\`\`\`javascript
function middleware(req, res, next) {
  // lakukan sesuatu sebelum handler
  next()
  // lakukan sesuatu setelah handler jika diperlukan
}
\`\`\`

## Request Logging

Logging setiap request membantu kita memantau lalu lintas dan mendeteksi anomali. Informasi yang umum dicatat:

- HTTP method dan path.
- Status code response.
- Waktu responsi (response time).
- Request ID.
- IP client atau user agent.

## Security Headers

Middleware seperti Helmet membantu mengatur header keamanan:

- \`Content-Security-Policy\`: membatasi sumber script dan style.
- \`X-Frame-Options\`: mencegah halaman dimuat dalam frame (clickjacking).
- \`X-Content-Type-Options: nosniff\`: mencegah browser menebak content type.
- \`Referrer-Policy\`: mengontrol informasi referrer yang dikirim.

Header ini mengurangi permukaan serangan tanpa mengubah logika bisnis.

## CORS Middleware

CORS middleware menangani preflight request dan mengatur header \`Access-Control-Allow-Origin\`. Hindari wildcard saat credentials diaktifkan; sebutkan origin secara eksplisit.`,
    },
    {
      id: 'sec-06-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-06-js',
        filename: 'middleware.js',
        language: 'javascript',
        title: 'JavaScript: Logger dan Security Middleware di Express',
        code: `const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const { v4: uuidv4 } = require('uuid')

const app = express()

app.use(helmet())
app.use(cors({ origin: 'https://app.example.com', credentials: true }))

app.use((req, res, next) => {
  req.requestId = req.get('X-Request-ID') || uuidv4()
  res.setHeader('X-Request-ID', req.requestId)
  const start = Date.now()

  res.on('finish', () => {
    const duration = Date.now() - start
    console.log(
      JSON.stringify({
        requestId: req.requestId,
        method: req.method,
        path: req.path,
        status: res.statusCode,
        durationMs: duration,
        userAgent: req.get('User-Agent'),
      })
    )
  })

  next()
})

app.get('/health', (req, res) => {
  res.json({ status: 'ok', requestId: req.requestId })
})`,
        explanation:
          'Middleware ini menambahkan request ID, mengatur header keamanan, mengkonfigurasi CORS, dan mencatat log terstruktur saat response selesai melalui event finish.',
      },
    },
    {
      id: 'sec-06-intermediate-auth',
      type: 'markdown',
      level: 'intermediate',
      title: 'Auth Middleware, Rate Limiting, dan Request ID',
      content: `## Authentication Middleware Dasar

Middleware autentikasi memeriksa token atau session sebelum request mencapai handler. Pola umum:

1. Baca header \`Authorization\`.
2. Validasi token (misalnya JWT).
3. Tempatkan informasi user di object request.
4. Jika tidak valid, kembalikan 401.

Jangan menggabungkan autentikasi dengan otorisasi. Autentikasi menjawab "siapa?", otorisasi menjawab "boleh apa?".

## Rate Limiting Intro

Rate limiting membatasi jumlah request dari satu client dalam jangka waktu tertentu. Strategi umum:

- **Fixed window**: hitung request per jendela waktu tetap.
- **Sliding window**: hitung berdasarkan jendela yang bergeser.
- **Token bucket**: client memiliki token yang diisi ulang secara berkala.

Penyimpanan counter dapat menggunakan memory, Redis, atau database.

## Request ID dan Tracing

Request ID adalah identifier unik yang disertakan pada setiap request. Manfaatnya:

- Melacak satu request melalui berbagai log entry.
- Memudahkan debugging di sistem terdistribusi.
- Dapat dipropagasikan ke layanan downstream melalui header.

Dengan request ID, kita dapat mengkorelasikan log dari load balancer, aplikasi, dan database.

## Middleware Composition

Middleware dapat dirangkai. Pola umum:

\`\`\`javascript
app.use(logger)
app.use(securityHeaders)
app.use(bodyParser)
app.use(requestId)
app.use(rateLimiter)
app.use(auth)
app.use(routes)
app.use(errorHandler)
\`\`\`

Urutan sangat penting. Autentikasi harus berada setelah body parser agar dapat membaca token, tetapi sebelum route yang dilindungi.`,
    },
    {
      id: 'sec-06-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-06-ts',
        filename: 'auth.guard.ts',
        language: 'typescript',
        title: 'TypeScript: Guard dan Interceptor di NestJS',
        code: `import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  CallHandler,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { Request } from 'express'

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>()
    const token = request.headers.authorization?.replace('Bearer ', '')
    if (!token || token !== 'valid-token') {
      return false
    }
    request.user = { id: 1, role: 'admin' }
    return true
  }
}

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<Request>()
    const start = Date.now()
    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - start
        console.log(\`\${request.method} \${request.path} - \${duration}ms\`)
      })
    )
  }
}`,
        explanation:
          'Guard memutuskan apakah request boleh dieksekusi. Interceptor membungkus eksekusi handler untuk logging, transformasi response, atau caching.',
      },
    },
    {
      id: 'sec-06-advanced-observability',
      type: 'markdown',
      level: 'advanced',
      title: 'Middleware Ordering, Composition, dan Observability',
      content: `## Middleware Ordering dalam Detail

Middleware stack bekerja seperti onion. Request masuk dari luar ke dalam, lalu response keluar dari dalam ke luar. Jika middleware A dipasang sebelum middleware B:

1. A: pre-processing.
2. B: pre-processing.
3. Handler dieksekusi.
4. B: post-processing.
5. A: post-processing.

Urutan yang salah dapat menyebabkan header keamanan tidak ditambahkan, autentikasi dilewati, atau error tidak tertangkap.

## Composition dan Reusability

Middleware dapat dikomposisikan menjadi fungsi yang lebih besar. Contoh di Go:

\`\`\`go
func compose(middleware ...func(http.Handler) http.Handler) func(http.Handler) http.Handler {
  return func(final http.Handler) http.Handler {
    for i := len(middleware) - 1; i >= 0; i-- {
      final = middleware[i](final)
    }
    return final
  }
}
\`\`\`

Dengan komposisi, kita dapat membangun stack middleware yang fleksibel dan mudah diuji secara terpisah.

## Observability Middleware

Observability terdiri dari tiga pilar:

1. **Logging**: catatan event dengan timestamp dan konteks.
2. **Metrics**: angka agregat seperti request rate, error rate, latency.
3. **Tracing**: jejak satu request melintasi beberapa layanan.

Middleware dapat mengumpulkan ketiganya:

- Logger middleware mencatat setiap request.
- Metrics middleware menghitung jumlah request per status code.
- Tracing middleware menambahkan span ID dan trace ID.

Data ini diekspos ke sistem observability seperti Prometheus, Grafana, Jaeger, atau OpenTelemetry collector.

## Graceful Error Handling di Middleware

Jika middleware melempar error, error handler global harus menangkapnya. Pastikan middleware tidak mengirim response ganda setelah memanggil \`next()\`. Setelah response dikirim, jangan lagi memodifikasi header atau body.`,
    },
    {
      id: 'sec-06-go-example',
      type: 'code-example',
      codeExample: {
        id: 'code-06-go',
        filename: 'main.go',
        language: 'go',
        title: 'Go: Middleware Chain untuk Logging dan Rate Limiting',
        code: `package main

import (
	"fmt"
	"net/http"
	"sync"
	"time"
)

type Middleware func(http.Handler) http.Handler

func compose(middlewares ...Middleware) Middleware {
	return func(final http.Handler) http.Handler {
		for i := len(middlewares) - 1; i >= 0; i-- {
			final = middlewares[i](final)
		}
		return final
	}
}

func logger(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()
		next.ServeHTTP(w, r)
		fmt.Printf("%s %s %s\\n", r.Method, r.URL.Path, time.Since(start))
	})
}

type rateLimiter struct {
	mu      sync.Mutex
	clients map[string]int
	last    time.Time
}

func newRateLimiter() *rateLimiter {
	return &rateLimiter{clients: make(map[string]int), last: time.Now()}
}

func (rl *rateLimiter) middleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		rl.mu.Lock()
		defer rl.mu.Unlock()

		if time.Since(rl.last) > time.Minute {
			rl.clients = make(map[string]int)
			rl.last = time.Now()
		}

		client := r.RemoteAddr
		rl.clients[client]++
		if rl.clients[client] > 10 {
			http.Error(w, "rate limit exceeded", http.StatusTooManyRequests)
			return
		}
		next.ServeHTTP(w, r)
	})
}

func main() {
	rl := newRateLimiter()
	final := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("hello"))
	})

	chain := compose(logger, rl.middleware)(final)
	http.ListenAndServe(":8080", chain)
}`,
        explanation:
          'Fungsi compose menyusun middleware dari luar ke dalam. Logger berjalan di luar, rate limiter di dalam, sehingga request yang terlalu sering ditolak sebelum mencapai handler.',
      },
    },
    {
      id: 'sec-06-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Kesimpulan:** Middleware adalah cara elegan menangani cross-cutting concerns. Mulai dari logging, keamanan, CORS, autentikasi, rate limiting, hingga observability. Perhatikan urutan dan komposisi middleware agar perilaku aplikasi sesuai harapan.',
    },
  ],
}
