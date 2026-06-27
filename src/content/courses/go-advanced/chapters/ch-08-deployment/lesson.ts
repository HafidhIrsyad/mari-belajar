import type { Lesson } from '@/content/types'

export const ch08Lesson: Lesson = {
  id: 'lesson-ch-08-deployment',
  estimatedMinutes: 45,
  sections: [
    {
      id: 'sec-go-adv-08-basic',
      type: 'markdown',
      level: 'basic',
      title: 'Static Binary dan Docker Multi-stage',
      content: `## Static Binary

Salah satu keunggulan Go adalah kemampuannya menghasilkan **static binary** yang berisi semua dependency, termasuk runtime. Binary ini bisa dijalankan di container minimal bahkan tanpa libc jika menggunakan \`CGO_ENABLED=0\`.

\`\`\`text
CGO_ENABLED=0 GOOS=linux go build -o app .
\`\`\`

## Docker Multi-stage Build

Multi-stage build memisahkan proses build dari runtime image. Stage pertama menggunakan image lengkap dengan toolchain Go, sedangkan stage final hanya menyalin binary hasil build.

Keuntungan:
- Ukuran image jauh lebih kecil.
- Tidak menyertakan source code atau build tools di production image.
- Mengurangi attack surface.

## Health Check

**Health check** adalah endpoint yang digunakan orchestrator (Docker, Kubernetes) untuk menentukan apakah aplikasi sehat. Endpoint umum:
- \`GET /healthz\`: status singkat.
- \`GET /ready\`: readiness probe untuk traffic.
- \`GET /live\`: liveness probe.`,
    },
    {
      id: 'sec-go-adv-08-js',
      type: 'code-example',
      codeExample: {
        id: 'code-go-adv-08-js',
        filename: 'express-health.js',
        language: 'javascript',
        title: 'JavaScript: Health Check Endpoint dengan Express',
        code: `const express = require('express');
const app = express();

app.get('/healthz', (_req, res) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime() });
});

app.get('/ready', (_req, res) => {
  // Periksa koneksi database, cache, dll.
  res.status(200).json({ ready: true });
});

app.listen(3000, () => console.log('listening on :3000'));`,
        explanation:
          'Express menyediakan endpoint /healthz dan /ready untuk health check. Di Go, endpoint serupa bisa dibuat dengan net/http atau framework seperti chi/echo.',
      },
    },
    {
      id: 'sec-go-adv-08-intermediate',
      type: 'markdown',
      level: 'intermediate',
      title: 'Distroless, Scratch, dan Reverse Proxy',
      content: `## Distroless

**Distroless** adalah image container minimal dari Google yang hanya berisi aplikasi dan dependency runtime esensial, tanpa shell, package manager, atau utilitas OS. Cocok untuk aplikasi Go static binary.

\`\`\`dockerfile
FROM gcr.io/distroless/static-debian12
COPY app /app
ENTRYPOINT ["/app"]
\`\`\`

## Scratch

\`scratch\` adalah image kosong dari Docker. Cocok untuk static binary murni, tetapi tidak memiliki timezone database atau sertifikat root CA. Jika aplikasi membutuhkan TLS, kita perlu menyalin CA certificates secara manual.

## Reverse Proxy

Di production, aplikasi Go biasanya ditempatkan di belakang reverse proxy seperti:
- **nginx**: mature dan fleksibel.
- **Caddy**: otomatis TLS dengan Let's Encrypt.
- **traefik**: integrasi baik dengan container orchestrator.

Reverse proxy menangani SSL termination, load balancing, rate limiting, dan static file serving.`,
    },
    {
      id: 'sec-go-adv-08-ts',
      type: 'code-example',
      codeExample: {
        id: 'code-go-adv-08-ts',
        filename: 'docker-multistage.ts',
        language: 'typescript',
        title: 'TypeScript: Dockerfile Multi-stage untuk Node.js',
        code: `// Dockerfile untuk perbandingan dengan Go multi-stage
// Stage build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

// Stage production
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY package*.json ./
RUN npm ci --only=production
EXPOSE 3000
CMD ["node", "dist/main.js"]`,
        explanation:
          'Node.js multi-stage build memisahkan build dan runtime, tetapi masih membutuhkan Node.js runtime. Go bisa menghasilkan static binary sehingga stage final bisa menggunakan distroless atau scratch.',
      },
    },
    {
      id: 'sec-go-adv-08-advanced',
      type: 'markdown',
      level: 'advanced',
      title: 'Observability, Feature Flags, dan Canary Deployment',
      content: `## Observability

Observability terdiri dari tiga pilar:
- **Logging**: catatan event aplikasi. Gunakan structured logging seperti \`log/slog\`.
- **Metrics**: data numerik untuk monitoring. Gunakan Prometheus client atau OpenTelemetry.
- **Tracing**: melacak request lintas service. Gunakan OpenTelemetry atau Jaeger.

## OpenTelemetry

OpenTelemetry menyediakan API dan SDK untuk tracing, metrics, dan logging. Di Go, kita bisa instrumentasi HTTP handler/middleware untuk mengirim trace ke collector.

## Feature Flags

**Feature flags** memungkinkan fitur diaktifkan/nonaktifkan tanpa deploy ulang. Berguna untuk:
- Gradual rollout.
- A/B testing.
- Kill switch saat incident.

Library populer: \`flagd\`, \`Unleash\`, \`LaunchDarkly\`, atau config-based flags sederhana.

## Canary Deployment

**Canary deployment** merilis versi baru ke subset traffic terlebih dahulu, lalu memantau metric sebelum merilis ke seluruh traffic. Keuntungan:
- Risiko kegagalan lebih terbatas.
- Feedback cepat dari production.
- Rollback mudah jika metric buruk.

Tools: Kubernetes rollout strategies, Argo Rollouts, Flagger.`,
    },
    {
      id: 'sec-go-adv-08-go',
      type: 'code-example',
      codeExample: {
        id: 'code-go-adv-08-go',
        filename: 'Dockerfile',
        language: 'text',
        title: 'Go: Distroless Multi-stage Dockerfile',
        code: `# Stage 1: Build
FROM golang:1.24-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -trimpath -ldflags="-s -w" -o app .

# Stage 2: Runtime dengan distroless
FROM gcr.io/distroless/static-debian12
WORKDIR /
COPY --from=builder /app/app /app
EXPOSE 8080
USER nonroot:nonroot
ENTRYPOINT ["/app"]`,
        explanation:
          'Stage builder mengompilasi static binary dengan CGO_ENABLED=0. Stage runtime menggunakan distroless static image yang tidak memiliki shell, mengurangi ukuran dan attack surface. USER nonroot menambah keamanan.',
      },
    },
    {
      id: 'sec-go-adv-08-callout',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Kesalahan umum:** tidak menonaktifkan CGO sehingga binary membutuhkan libc; menggunakan image besar seperti golang atau ubuntu di production; lupa mengekspose health check; atau tidak mengatur graceful shutdown. Selalu build dengan `-ldflags="-s -w"` dan `-trimpath`, gunakan distroless/scratch, pasang readiness/liveness probes, dan instrumentasi dengan OpenTelemetry. Untuk canary, pantau error rate, latency p99, dan throughput sebelum full rollout.',
    },
  ],
}
