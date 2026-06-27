import type { Lesson } from '@/content/types'

export const ch05Lesson: Lesson = {
  id: 'lesson-ch-05-response-error-handling',
  estimatedMinutes: 30,
  sections: [
    {
      id: 'sec-05-basic-response',
      type: 'markdown',
      level: 'basic',
      title: 'JSON Response, Status Code, dan Error Message',
      content: `## Membentuk Response JSON

Response API sebaiknya memiliki struktur yang dapat diprediksi. Pola paling umum adalah membungkus payload dalam properti \`data\`:

\`\`\`json
{
  "data": {
    "id": 1,
    "name": "Andi"
  }
}
\`\`\`

Untuk error, gunakan struktur terpisah agar client dapat membedakan dengan jelas:

\`\`\`json
{
  "error": {
    "message": "User not found",
    "code": "USER_NOT_FOUND"
  }
}
\`\`\`

## Memilih Status Code

Status code adalah bagian integral dari response. Beberapa panduan:

- \`200 OK\`: request berhasil.
- \`201 Created\`: resource berhasil dibuat.
- \`204 No Content\`: berhasil tanpa body response.
- \`400 Bad Request\`: input tidak valid.
- \`401 Unauthorized\`: autentikasi diperlukan.
- \`403 Forbidden\`: autentikasi berhasil tetapi akses ditolak.
- \`404 Not Found\`: resource tidak ditemukan.
- \`500 Internal Server Error\`: kesalahan server yang tidak terduga.

## Error Message yang Aman

Pesan error untuk client harus cukup informatif tanpa membocorkan detail internal seperti stack trace, query SQL, atau struktur database. Informasi detail disimpan di log server.`,
    },
    {
      id: 'sec-05-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-05-js',
        filename: 'error-handler.js',
        language: 'javascript',
        title: 'JavaScript: Global Error Handler di Express',
        code: `class AppError extends Error {
  constructor(message, statusCode, code) {
    super(message)
    this.statusCode = statusCode
    this.code = code
    this.isOperational = true
  }
}

function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500
  const response = {
    error: {
      message: err.isOperational ? err.message : 'Internal server error',
      code: err.code || 'INTERNAL_ERROR',
    },
  }

  console.error({
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
  })

  res.status(statusCode).json(response)
}

app.get('/users/:id', (req, res, next) => {
  const user = users.find((u) => u.id === Number(req.params.id))
  if (!user) {
    return next(new AppError('User not found', 404, 'USER_NOT_FOUND'))
  }
  res.json({ data: user })
})

app.use(errorHandler)`,
        explanation:
          'Error handler global di Express memiliki empat parameter. Operational error ditampilkan ke client, sementara unexpected error disamarkan menjadi generic message dan detailnya masuk log.',
      },
    },
    {
      id: 'sec-05-intermediate-format',
      type: 'markdown',
      level: 'intermediate',
      title: 'Consistent Error Format, Exception Filter, dan Logging',
      content: `## Consistent Error Format

Seluruh endpoint sebaiknya mengembalikan error dengan struktur yang sama. Format yang baik mencakup:

- \`message\`: deskripsi singkat untuk manusia.
- \`code\`: identifier machine-readable untuk branching logic client.
- \`field\`: field terkait jika error berasal dari validasi.
- \`details\`: array informasi tambahan jika diperlukan.

## Global Exception Filter

Di framework seperti NestJS, exception filter menangkap semua exception dan mengubahnya menjadi response standar. Keuntungannya:

- Satu tempat untuk transformasi error.
- Mudah menambahkan logging dan metrics.
- Mencegah detail internal bocor ke client.

## Logging

Logging adalah aspek penting dari observability. Praktik yang baik:

- Gunakan level log: debug, info, warn, error.
- Sertakan correlation/request ID agar log dapat ditelusuri.
- Hindari logging data sensitif seperti password atau token.
- Tulis log ke \`stdout\` atau \`stderr\`; jangan mengelola rotasi file di dalam aplikasi.

Log yang terstruktur memudahkan agregasi dengan tools seperti ELK, Loki, atau CloudWatch.`,
    },
    {
      id: 'sec-05-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-05-ts',
        filename: 'http-exception.filter.ts',
        language: 'typescript',
        title: 'TypeScript: Exception Filter di NestJS',
        code: `import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { Request, Response } from 'express'

interface ProblemDetail {
  type: string
  title: string
  status: number
  detail: string
  instance: string
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR

    const detail =
      exception instanceof HttpException
        ? exception.message
        : 'Internal server error'

    const problem: ProblemDetail = {
      type: 'https://api.example.com/errors/server-error',
      title: status < 500 ? 'Request Error' : 'Server Error',
      status,
      detail,
      instance: request.url,
    }

    console.error({
      status,
      path: request.url,
      method: request.method,
      exception: exception instanceof Error ? exception.stack : String(exception),
    })

    response.status(status).json(problem)
  }
}`,
        explanation:
          'Exception filter menangkap semua exception dan mengubahnya menjadi Problem Details. Log internal menyertakan stack trace, sementara response ke client tetap aman.',
      },
    },
    {
      id: 'sec-05-advanced-rfc7807',
      type: 'markdown',
      level: 'advanced',
      title: 'RFC 7807 Problem Details dan Retry Hints',
      content: `## RFC 7807 Problem Details

RFC 7807 mendefinisikan format standar untuk error response dengan media type \`application/problem+json\`. Field yang direkomendasikan:

- \`type\`: URI yang mengidentifikasi jenis masalah.
- \`title\`: ringkasan singkat jenis masalah.
- \`status\`: status code HTTP.
- \`detail\`: penjelasan spesifik untuk kejadian ini.
- \`instance\`: URI yang mengidentifikasi kejadian spesifik.

Contoh:

\`\`\`json
{
  "type": "https://api.example.com/errors/insufficient-balance",
  "title": "Insufficient Balance",
  "status": 402,
  "detail": "Account 12345 does not have enough balance for this transaction.",
  "instance": "/transactions/txn-98765"
}
\`\`\`

Dengan format standar, client dapat membuat error handling generik dan bahkan menavigasi ke dokumentasi masalah melalui \`type\`.

## Internationalization

Untuk aplikasi multi-bahasa, error response dapat menyertakan kode yang dipetakan ke katalog terjemahan di client. Hindari mengirimkan teks lengkap dalam banyak bahasa dari server kecuali jika diperlukan.

\`\`\`json
{
  "type": "...",
  "status": 400,
  "code": "INVALID_EMAIL_FORMAT",
  "field": "email"
}
\`\`\`

## Retry Hints

Untuk error sementara seperti \`503 Service Unavailable\` atau \`429 Too Many Requests\`, server dapat menyertakan header \`Retry-After\`:

\`\`\`http
HTTP/1.1 429 Too Many Requests
Retry-After: 60
Content-Type: application/problem+json
\`\`\`

Retry hints membantu client memutuskan kapan mencoba ulang tanpa membebani server.

## Error Classification

Tidak semua error layak di-retry. Klasifikasikan menjadi:

- **Retryable**: timeout sementara, 502/503, rate limit.
- **Non-retryable**: 400 Bad Request, 401 Unauthorized, 403 Forbidden.

Klasifikasi ini dapat disertakan dalam response melalui field \`retryable\` atau \`code\`.`,
    },
    {
      id: 'sec-05-go-example',
      type: 'code-example',
      codeExample: {
        id: 'code-05-go',
        filename: 'main.go',
        language: 'go',
        title: 'Go: Problem Details Middleware',
        code: `package main

import (
	"encoding/json"
	"net/http"
)

type ProblemDetail struct {
	Type     string \`json:"type"\`
	Title    string \`json:"title"\`
	Status   int    \`json:"status"\`
	Detail   string \`json:"detail"\`
	Instance string \`json:"instance"\`
}

func writeProblem(w http.ResponseWriter, status int, detail string) {
	problem := ProblemDetail{
		Type:     "https://api.example.com/errors/server-error",
		Title:    http.StatusText(status),
		Status:   status,
		Detail:   detail,
		Instance: "unknown",
	}
	w.Header().Set("Content-Type", "application/problem+json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(problem)
}

func recoverMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		defer func() {
			if rec := recover(); rec != nil {
				writeProblem(w, http.StatusInternalServerError, "unexpected server error")
			}
		}()
		next.ServeHTTP(w, r)
	})
}

func helloHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		writeProblem(w, http.StatusMethodNotAllowed, "method not allowed")
		return
	}
	w.Write([]byte("hello"))
}`,
        explanation:
          'Middleware recover menangkap panic dan mengembalikan Problem Details. Format application/problem+json memberitahu client bahwa response adalah error standar RFC 7807.',
      },
    },
    {
      id: 'sec-05-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Kesimpulan:** Penanganan error yang baik memisahkan informasi untuk client dari informasi untuk developer. Gunakan global handler, format konsisten, RFC 7807 untuk standarisasi, retry hints untuk error sementara, dan logging terstruktur untuk observabilitas.',
    },
  ],
}
