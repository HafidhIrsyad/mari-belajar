import type { Lesson } from '@/content/types'

export const ch05Lesson: Lesson = {
  id: 'lesson-ch-05-middleware-logging-recovery',
  estimatedMinutes: 40,
  sections: [
    {
      id: 'sec-05-basic-logging-middleware',
      type: 'markdown',
      level: 'basic',
      title: 'Middleware dan Structured Logging',
      content: `## Middleware Signature

Middleware di Go ditulis sebagai fungsi yang menerima "http.Handler" dan mengembalikan "http.Handler". Pattern ini memungkinkan kita menambahkan perilaku di sekitar handler inti.

\`\`\`go
func middleware(next http.Handler) http.Handler {
  return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
    // before
    next.ServeHTTP(w, r)
    // after
  })
}
\`\`\`

## log/slog

Package "log/slog" adalah package logging standar yang mendukung structured logging. Output dapat berupa teks atau JSON, dan setiap log entry memiliki level serta key-value pairs.

\`\`\`go
logger := slog.New(slog.NewJSONHandler(os.Stdout, nil))
logger.Info("request processed", "method", r.Method, "path", r.URL.Path)
\`\`\`

Structured logging memudahkan parsing dan pencarian log di sistem observability seperti ELK, Loki, atau Cloud Logging.

## Request Logging Middleware

Middleware logging sederhana mencatat informasi dasar request:

\`\`\`go
func loggingMiddleware(logger *slog.Logger, next http.Handler) http.Handler {
  return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
    start := time.Now()
    next.ServeHTTP(w, r)
    logger.Info("http request",
      "method", r.Method,
      "path", r.URL.Path,
      "duration", time.Since(start),
    )
  })
}
\`\`\`

Namun, middleware ini belum mencatat status code. Untuk itu kita perlu response writer wrapper.`,
    },
    {
      id: 'sec-05-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-05-js',
        filename: 'express-logger.js',
        language: 'javascript',
        code: `const express = require('express');
const app = express();

app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(\`\${req.method} \${req.path} \${res.statusCode} - \${duration}ms\`);
  });
  next();
});

app.get('/', (req, res) => {
  res.json({ ok: true });
});

app.listen(3000);`,
        title: 'JavaScript: Logging Middleware di Express',
        explanation:
          'Middleware Express mendengarkan event finish pada response untuk mencatat status code dan durasi. Di Go, kita perlu membungkus ResponseWriter untuk menangkap status code.',
      },
    },
    {
      id: 'sec-05-intermediate-recovery',
      type: 'markdown',
      level: 'intermediate',
      title: 'Request ID, Response Wrapper, dan Panic Recovery',
      content: `## Response Writer Wrapper

Untuk menangkap status code, kita membuat struct yang membungkus "http.ResponseWriter":

\`\`\`go
type responseWriter struct {
  http.ResponseWriter
  statusCode int
}

func (rw *responseWriter) WriteHeader(code int) {
  rw.statusCode = code
  rw.ResponseWriter.WriteHeader(code)
}
\`\`\`

## Request ID

Request ID adalah identifier unik untuk setiap request. Biasanya dihasilkan dengan UUID atau random string, lalu dimasukkan ke context agar tersedia di seluruh handler.

\`\`\`go
func requestIDMiddleware(next http.Handler) http.Handler {
  return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
    id := generateRequestID()
    ctx := context.WithValue(r.Context(), requestIDKey, id)
    w.Header().Set("X-Request-ID", id)
    next.ServeHTTP(w, r.WithContext(ctx))
  })
}
\`\`\`

## Panic Recovery Middleware

Panic dapat mematikan seluruh proses jika tidak ditangani. Recovery middleware menggunakan "defer" dan "recover()" untuk menangkap panic, mencatatnya, dan mengembalikan response 500.

\`\`\`go
func recoveryMiddleware(logger *slog.Logger, next http.Handler) http.Handler {
  return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
    defer func() {
      if err := recover(); err != nil {
        logger.Error("panic recovered", "error", err)
        http.Error(w, "Internal Server Error", http.StatusInternalServerError)
      }
    }()
    next.ServeHTTP(w, r)
  })
}
\`\`\``,
    },
    {
      id: 'sec-05-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-05-ts',
        filename: 'middleware-stack.ts',
        language: 'typescript',
        title: 'TypeScript: Middleware Stack Composition',
        code: `type Middleware = (req: Request, res: Response, next: () => void) => void;

type Handler = (req: Request, res: Response) => void;

function compose(...middlewares: Middleware[]): (handler: Handler) => Handler {
  return (handler) => (req, res) => {
    let index = -1;

    function dispatch(i: number): void {
      if (i <= index) throw new Error('next() called multiple times');
      index = i;
      const fn = i === middlewares.length ? handler : middlewares[i];
      fn(req, res, () => dispatch(i + 1));
    }

    dispatch(0);
  };
}

const logging: Middleware = (req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    console.log(\`\${req.method} \${req.url} \${res.statusCode} - \${Date.now() - start}ms\`);
  });
  next();
};

const recovery: Middleware = (req, res, next) => {
  try {
    next();
  } catch (err) {
    console.error('panic recovered', err);
    res.statusCode = 500;
    res.end('Internal Server Error');
  }
};

const app = compose(recovery, logging)((_req, res) => {
  res.end('Hello');
});`,
        explanation:
          'TypeScript composition memungkinkan middleware dirangkai secara dinamis. Di Go, kita sering menggunakan helper chain atau library router yang sudah mendukung middleware stack.',
      },
    },
    {
      id: 'sec-05-advanced-observability',
      type: 'markdown',
      level: 'advanced',
      title: 'Observability: Correlation ID, Metrics, dan Traces',
      content: `## Correlation ID

Correlation ID (atau trace ID) adalah identifier yang dibawa request melintasi banyak service. Berbeda dengan request ID yang lokal, correlation ID tetap sama sepanjang alur distributed system. Middleware harus menerima correlation ID dari header upstream atau membuatnya jika tidak ada.

## Log Sampling

Dengan traffic tinggi, logging setiap request bisa mahal. Log sampling memungkinkan kita mencatat hanya sebagian request berdasarkan hash request ID atau rate limiter. slog dapat dikombinasikan dengan handler kustom untuk implementasi sampling.

## Metrics Hooks

Middleware juga tempat yang ideal untuk mengumpulkan metrics:

- Jumlah request per route dan method.
- Distribusi durasi request (histogram).
- Jumlah response per status code.

Library seperti Prometheus client dapat dipanggil di middleware untuk merekam metrics ini.

## Tracing Intro

Tracing memberikan visibilitas end-to-end dengan span. Middleware dapat membuat span baru untuk setiap request dan menambahkan atribut seperti method, path, dan status code. OpenTelemetry adalah standar umum untuk tracing di Go.

## Best Practices

- Tempatkan recovery middleware paling luar untuk menangkap panic dari middleware lain.
- Tempatkan logging middleware setelah recovery agar panic tetap tercatat.
- Gunakan log level yang sesuai: info untuk request normal, error untuk kegagalan.
- Hindari logging data sensitif seperti password atau token.`,
    },
    {
      id: 'sec-05-go-example',
      type: 'code-example',
      codeExample: {
        id: 'code-05-go',
        filename: 'slog_recovery.go',
        language: 'go',
        title: 'Go: slog + Request ID + Recovery Middleware',
        code: `package main

import (
	"context"
	"fmt"
	"log/slog"
	"math/rand"
	"net/http"
	"os"
	"time"
)

type contextKey string
const requestIDKey contextKey = "requestID"

type responseWriter struct {
	http.ResponseWriter
	statusCode int
}

func (rw *responseWriter) WriteHeader(code int) {
	rw.statusCode = code
	rw.ResponseWriter.WriteHeader(code)
}

func requestIDMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		id := fmt.Sprintf("%08x", rand.Int())
		ctx := context.WithValue(r.Context(), requestIDKey, id)
		w.Header().Set("X-Request-ID", id)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

func loggingMiddleware(logger *slog.Logger, next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()
		wrapped := &responseWriter{ResponseWriter: w, statusCode: http.StatusOK}
		next.ServeHTTP(wrapped, r)

		rid, _ := r.Context().Value(requestIDKey).(string)
		logger.Info("http request",
			"request_id", rid,
			"method", r.Method,
			"path", r.URL.Path,
			"status", wrapped.statusCode,
			"duration", time.Since(start),
		)
	})
}

func recoveryMiddleware(logger *slog.Logger, next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		defer func() {
			if err := recover(); err != nil {
				logger.Error("panic recovered", "error", err)
				http.Error(w, "Internal Server Error", http.StatusInternalServerError)
			}
		}()
		next.ServeHTTP(w, r)
	})
}

func main() {
	logger := slog.New(slog.NewJSONHandler(os.Stdout, nil))

	mux := http.NewServeMux()
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintln(w, "Hello, World!")
	})
	mux.HandleFunc("/panic", func(w http.ResponseWriter, r *http.Request) {
		panic("something went wrong")
	})

	var handler http.Handler = mux
	handler = loggingMiddleware(logger, handler)
	handler = requestIDMiddleware(handler)
	handler = recoveryMiddleware(logger, handler)

	logger.Info("server starting", "addr", ":8080")
	if err := http.ListenAndServe(":8080", handler); err != nil {
		logger.Error("server error", "error", err)
	}
}`,
        explanation:
          'Recovery berada paling luar, diikuti request ID, lalu logging. Structured logging dengan slog mencatat method, path, status, durasi, dan request ID. Endpoint /panic akan ditangkap oleh recovery middleware.',
      },
    },
    {
      id: 'sec-05-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Ringkasan:** Middleware di Go ditulis sebagai higher-order function yang membungkus http.Handler. log/slog menyediakan structured logging modern. Request ID dan correlation ID membantu pelacakan request. Panic recovery menggunakan defer recover() penting untuk menjaga server tetap hidup. Untuk sistem besar, tambahkan metrics dan traces melalui middleware agar observability meningkat.',
    },
  ],
}
