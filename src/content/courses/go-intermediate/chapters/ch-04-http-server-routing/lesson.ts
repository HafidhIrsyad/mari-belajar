import type { Lesson } from '@/content/types'

export const ch04Lesson: Lesson = {
  id: 'lesson-ch-04-http-server-routing',
  estimatedMinutes: 45,
  sections: [
    {
      id: 'sec-04-basic-http-server',
      type: 'markdown',
      level: 'basic',
      title: 'HTTP Server dengan net/http',
      content: `## Handler dan HandlerFunc

Di Go, semua request HTTP ditangani oleh tipe yang mengimplementasikan interface "http.Handler":

\`\`\`go
type Handler interface {
  ServeHTTP(ResponseWriter, *Request)
}
\`\`\`

"http.HandlerFunc" adalah adapter yang memungkinkan fungsi biasa digunakan sebagai handler:

\`\`\`go
func hello(w http.ResponseWriter, r *http.Request) {
  fmt.Fprintln(w, "Hello, World!")
}

http.HandleFunc("/", hello)
\`\`\`

## ListenAndServe

"http.ListenAndServe" memulai server pada address tertentu. Fungsi ini blok sampai server berhenti.

\`\`\`go
log.Fatal(http.ListenAndServe(":8080", nil))
\`\`\`

Jika parameter handler adalah nil, Go menggunakan default ServeMux yaitu "http.DefaultServeMux". Namun, di production disarankan membuat ServeMux sendiri untuk menghindari registrasi global yang tidak sengaja.

## ServeMux

"http.ServeMux" adalah HTTP request multiplexer. Dia mencocokkan URL path dengan handler yang terdaftar.

\`\`\`go
mux := http.NewServeMux()
mux.HandleFunc("/", homeHandler)
mux.HandleFunc("/api/users", usersHandler)
\`\`\`

ServeMux tidak mendukung parameter path seperti "/users/:id". Untuk itu, umumnya digunakan library seperti chi atau gin.`,
    },
    {
      id: 'sec-04-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-04-js',
        filename: 'express-server.js',
        language: 'javascript',
        code: `const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.json({ message: 'Hello from Express' });
});

app.get('/users/:id', (req, res) => {
  res.json({ id: req.params.id });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});`,
        title: 'JavaScript: Server dengan Express.js',
        explanation:
          'Express menyediakan routing dan middleware bawaan. Di Go, package net/http lebih minimal; routing path parameter memerlukan library tambahan atau parsing manual.',
      },
    },
    {
      id: 'sec-04-intermediate-middleware',
      type: 'markdown',
      level: 'intermediate',
      title: 'Middleware dan Router Library',
      content: `## Middleware Pattern

Middleware di Go umumnya ditulis sebagai higher-order function:

\`\`\`go
func loggingMiddleware(next http.Handler) http.Handler {
  return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
    start := time.Now()
    next.ServeHTTP(w, r)
    log.Printf("%s %s %v", r.Method, r.URL.Path, time.Since(start))
  })
}
\`\`\`

Middleware membungkus handler, menambahkan perilaku sebelum dan/atau setelah handler dieksekusi.

## Chaining Middleware

Kita bisa merangkai beberapa middleware:

\`\`\`go
handler := loggingMiddleware(authMiddleware(finalHandler))
\`\`\`

Atau dengan helper:

\`\`\`go
func chain(h http.Handler, middlewares ...func(http.Handler) http.Handler) http.Handler {
  for i := len(middlewares) - 1; i >= 0; i-- {
    h = middlewares[i](h)
  }
  return h
}
\`\`\`

## Router Library

Library populer seperti chi atau gin menambahkan fitur:

- Path parameter: "/users/{id}".
- Route grouping.
- Method-based routing.
- Middleware per group.

chi dirancang agar kompatibel dengan net/http, sementara gin memiliki framework yang lebih opinionated dengan custom context.`,
    },
    {
      id: 'sec-04-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-04-ts',
        filename: 'hono-server.ts',
        language: 'typescript',
        title: 'TypeScript: Middleware Stack dengan Hono',
        code: `import { Hono } from 'hono';

const app = new Hono();

app.use('*', async (c, next) => {
  const start = Date.now();
  await next();
  const duration = Date.now() - start;
  console.log(\`\${c.req.method} \${c.req.path} - \${duration}ms\`);
});

app.get('/', (c) => c.json({ message: 'Hello from Hono' }));

app.get('/users/:id', (c) => {
  const id = c.req.param('id');
  return c.json({ id });
});

export default app;`,
        explanation:
          'Hono adalah framework TypeScript ringan dengan middleware pattern yang mirip Express. Di Go, pattern ini diterapkan dengan fungsi yang membungkus http.Handler.',
      },
    },
    {
      id: 'sec-04-advanced-server-lifecycle',
      type: 'markdown',
      level: 'advanced',
      title: 'Server Lifecycle dan Graceful Shutdown',
      content: `## http.Server Config

Tipe "http.Server" memungkinkan konfigurasi yang lebih detail:

- **ReadTimeout**: batas waktu membaca seluruh request termasuk body.
- **WriteTimeout**: batas waktu menulis response.
- **IdleTimeout**: batas waktu menunggu request berikutnya pada keep-alive connection.
- **MaxHeaderBytes**: batas ukuran header request.

Konfigurasi ini penting untuk melindungi server dari slowloris atau request yang memakan resource.

## Graceful Shutdown

Graceful shutdown memastikan server tidak langsung mati saat menerima sinyal termination. Request yang sedang berjalan diberi waktu untuk selesai.

Langkahnya:

1. Buat http.Server dengan handler.
2. Jalankan server di goroutine terpisah.
3. Tunggu sinyal OS di channel.
4. Panggil server.Shutdown(ctx) dengan timeout.

\`\`\`go
srv := &http.Server{Addr: ":8080", Handler: mux}

ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
defer cancel()
srv.Shutdown(ctx)
\`\`\`

Shutdown akan menutup listener dan menunggu handler aktif selesai. Setelah itu, server berhenti.

## Timeout Middleware

Selain konfigurasi server, kita juga bisa menerapkan timeout per handler menggunakan context. Jika operasi melebihi batas waktu, request dihentikan dengan status 503 atau response yang sesuai.

## Di Balik Layar

Saat server menerima koneksi, Go membuat goroutine baru untuk menangani setiap connection. Setiap request pada connection keep-alive juga biasanya ditangani dalam goroutine terpisah. Desain ini membuat server Go bisa menangani banyak koneksi konkuren dengan mudah.`,
    },
    {
      id: 'sec-04-go-example',
      type: 'code-example',
      codeExample: {
        id: 'code-04-go',
        filename: 'graceful_server.go',
        language: 'go',
        title: 'Go: HTTP Server dengan Graceful Shutdown',
        code: `package main

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"
)

func hello(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "Hello, Go HTTP!")
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/", hello)

	srv := &http.Server{
		Addr:         ":8080",
		Handler:      mux,
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 10 * time.Second,
		IdleTimeout:  120 * time.Second,
	}

	go func() {
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			fmt.Fprintf(os.Stderr, "listen error: %v\\n", err)
		}
	}()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	fmt.Println("Shutting down server...")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	if err := srv.Shutdown(ctx); err != nil {
		fmt.Fprintf(os.Stderr, "shutdown error: %v\\n", err)
	}
	fmt.Println("Server stopped")
}`,
        explanation:
          'Server berjalan di goroutine terpisah. Saat menerima SIGINT atau SIGTERM, Shutdown dipanggil dengan timeout 5 detik untuk memastikan request aktif selesai sebelum proses berhenti.',
      },
    },
    {
      id: 'sec-04-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Ringkasan:** net/http menyediakan fondasi server HTTP di Go melalui interface Handler dan ServeMux. Middleware ditulis sebagai fungsi yang membungkus handler. Library seperti chi atau gin menambahkan routing path parameter. Untuk production, selalu konfigurasikan timeout dan implementasikan graceful shutdown agar request aktif dapat selesai dengan aman.',
    },
  ],
}
