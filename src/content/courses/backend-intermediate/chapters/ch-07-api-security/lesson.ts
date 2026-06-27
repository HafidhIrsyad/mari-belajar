import type { Lesson } from '@/content/types'

export const ch07Lesson: Lesson = {
  id: 'lesson-ch-07-api-security',
  estimatedMinutes: 45,
  sections: [
    {
      id: 'sec-07-basic-api-security',
      type: 'markdown',
      level: 'basic',
      title: 'HTTPS, CORS, dan Security Headers',
      content: `## Lapisan Pertama Keamanan API

Keamanan API dimulai dari lapisan transport dan konfigurasi server. Beberapa langkah dasar:

- **HTTPS**: enkripsi semua komunikasi dengan TLS. Jangan pernah mengirim token atau data sensitif melalui HTTP.
- **CORS (Cross-Origin Resource Sharing)**: mengontrol domain mana yang boleh mengakses API dari browser. Konfigurasi yang terlalu longgar seperti \`*\` dapat membuka celah.
- **Security headers**: header seperti HSTS, X-Content-Type-Options, X-Frame-Options, dan Content-Security-Policy mengurangi risiko client-side.

## Input Sanitization

Semua input dari client harus dianggap tidak aman. Validasi tipe, panjang, format, dan rentang nilai sebelum diproses. Jangan pernah menyuntikkan input langsung ke query, command, atau HTML tanpa sanitasi.`,
    },
    {
      id: 'sec-07-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-07-js',
        filename: 'secure-app.js',
        language: 'javascript',
        title: 'JavaScript: Express dengan Helmet, CORS, dan Rate Limit',
        code: `const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const rateLimit = require('express-rate-limit')

const app = express()

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
    },
  },
  hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
}))

app.use(cors({
  origin: process.env.ALLOWED_ORIGIN,
  credentials: true,
}))

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 menit
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
})
app.use(limiter)

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  skipSuccessfulRequests: true,
})
app.use('/auth/', authLimiter)

app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})`,
        explanation:
          'Helmet mengatur security header, CORS membatasi origin, dan rate limit mencegah brute-force serta abuse. Endpoint auth memiliki batas lebih ketat.',
      },
    },
    {
      id: 'sec-07-intermediate-threats',
      type: 'markdown',
      level: 'intermediate',
      title: 'SQL Injection, XSS, CSRF, dan Rate Limiting',
      content: `## SQL Injection

SQL injection terjadi saat input pengguna disisipkan ke query SQL tanpa parameterized query. Serangan ini dapat membaca, mengubah, atau menghapus data.

Solusi: gunakan parameterized query atau ORM yang aman. Hindari string concatenation untuk query.

## XSS (Cross-Site Scripting)

XSS memungkinkan attacker menyisipkan script berbahaya ke halaman yang dilihat user. Untuk API yang mengembalikan HTML, selalu escape output. Untuk API JSON, XSS lebih jarang tetapi tetap perlu sanitasi input.

## CSRF (Cross-Site Request Forgery)

CSRF memaksa user yang sudah login melakukan aksi tidak diinginkan. Mitigasi:

- Gunakan cookie dengan atribut \`SameSite\`.
- Validasi CSRF token untuk state-changing request.
- Gunakan header \`X-Requested-With\` atau custom header.

## Rate Limiting

Rate limiting membatasi jumlah request per client dalam periode tertentu. Implementasi dapat berbasis:

- In-memory: sederhana tetapi tidak berbagi state antar instance.
- Redis: berbagi counter antar instance.
- Token bucket: memungkinkan burst singkat tetapi membatasi rata-rata.`,
    },
    {
      id: 'sec-07-ts-example',
      type: 'code-example',
        codeExample: {
        id: 'code-07-ts',
        filename: 'main.ts',
        language: 'typescript',
        title: 'TypeScript: NestJS Helmet, Throttler, dan Validation Pipe',
        code: `import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import helmet from 'helmet'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.use(helmet())
  app.enableCors({
    origin: process.env.ALLOWED_ORIGIN,
    credentials: true,
  })

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  )

  await app.listen(3000)
}
bootstrap()`,
        explanation:
          'Helmet mengamankan header, CORS membatasi origin, dan ValidationPipe memastikan hanya field yang diizinkan masuk ke handler, membantu mencegah mass assignment.',
      },
    },
    {
      id: 'sec-07-advanced-owasp',
      type: 'markdown',
      level: 'advanced',
      title: 'OWASP API Security Top 10 dan Secrets Management',
      content: `## OWASP API Security Top 10

OWASP menyoroti risiko spesifik API modern:

1. **Broken Object Level Authorization (BOLA)**: user dapat mengakses object milik user lain karena tidak ada ownership check. Periksa izin pada setiap object.
2. **Broken Authentication**: kelemahan login, token, atau session seperti JWT yang tidak expired atau secret yang lemah.
3. **Broken Object Property Level Authorization**: exposure field yang seharusnya private atau mass assignment yang mengubah field terlarang.
4. **Unrestricted Resource Consumption**: tidak ada batasan query, file size, atau pagination sehingga server dapat dihabiskan.
5. **Broken Function Level Authorization**: user biasa dapat memanggil endpoint admin karena kurangnya role check.
6. **Unrestricted Access to Sensitive Business Flows**: alur bisnis seperti pembelian tiket dapat diotomatisasi tanpa batas.
7. **Server Side Request Forgery (SSRF)**: server dipaksa mengirim request ke internal network atau layanan pihak ketiga.
8. **Security Misconfiguration**: default credential, header yang salah, atau informasi berlebih di error message.
9. **Improper Inventory Management**: versi API lama atau dokumentasi tidak terawasi masih terpapar.
10. **Unsafe Consumption of APIs**: tidak memvalidasi response dari API eksternal sebelum diproses lebih lanjut.

## Secrets Management

Secret seperti API key, database password, dan JWT secret tidak boleh hardcoded. Gunakan:

- Environment variables atau secret manager (AWS Secrets Manager, HashiCorp Vault).
- Rotasi secret secara berkala.
- Least privilege IAM role.

## Dependency Scanning dan SAST/DAST

- **Dependency scanning**: deteksi library yang memiliki CVE (Snyk, Trivy, npm audit).
- **SAST**: analisis source code secara statis untuk menemukan pola rentan.
- **DAST**: menguji aplikasi yang berjalan dengan teknik black-box.`,
    },
    {
      id: 'sec-07-go-example',
      type: 'code-example',
      codeExample: {
        id: 'code-07-go',
        filename: 'main.go',
        language: 'go',
        title: 'Go: Secure Headers, CORS, dan Token Bucket Rate Limiter',
        code: `package main

import (
	"net/http"
	"sync"
	"time"
)

type tokenBucket struct {
	tokens    int
	capacity  int
	refill    time.Duration
	lastRefill time.Time
	mu        sync.Mutex
}

func newTokenBucket(capacity int, refill time.Duration) *tokenBucket {
	return &tokenBucket{tokens: capacity, capacity: capacity, refill: refill, lastRefill: time.Now()}
}

func (b *tokenBucket) allow() bool {
	b.mu.Lock()
	defer b.mu.Unlock()

	now := time.Now()
	elapsed := now.Sub(b.lastRefill)
	refillCount := int(elapsed / b.refill)
	if refillCount > 0 {
		b.tokens = min(b.capacity, b.tokens+refillCount)
		b.lastRefill = now
	}

	if b.tokens > 0 {
		b.tokens--
		return true
	}
	return false
}

func secureMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("X-Content-Type-Options", "nosniff")
		w.Header().Set("X-Frame-Options", "DENY")
		w.Header().Set("Content-Security-Policy", "default-src 'self'")
		w.Header().Set("Strict-Transport-Security", "max-age=63072000; includeSubDomains")
		next.ServeHTTP(w, r)
	})
}

func rateLimitMiddleware(bucket *tokenBucket) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			if !bucket.allow() {
				http.Error(w, "rate limit exceeded", http.StatusTooManyRequests)
				return
			}
			next.ServeHTTP(w, r)
		})
	}
}`,
        explanation:
          'Middleware secure headers mengurangi serangan client-side. Token bucket membatasi request dengan memungkinkan burst terbatas dan refill berkala.',
      },
    },
    {
      id: 'sec-07-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Kesimpulan:** Keamanan API adalah lapisan-lapisan pertahanan. Mulai dari HTTPS dan security header, parameterized query, rate limiting, validasi input, hingga awareness terhadap OWASP API Security Top 10. Jangan lupa kelola secret dan pantau dependensi secara berkala.',
    },
  ],
}
