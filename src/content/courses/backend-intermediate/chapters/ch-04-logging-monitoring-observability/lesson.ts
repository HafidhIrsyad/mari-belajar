import type { Lesson } from '@/content/types'

export const ch04Lesson: Lesson = {
  id: 'lesson-ch-04-logging-monitoring-observability',
  estimatedMinutes: 45,
  sections: [
    {
      id: 'sec-04-basic-logging',
      type: 'markdown',
      level: 'basic',
      title: 'Structured Logging dan Correlation ID',
      content: `## Mengapa Log Penting

Log adalah catatan peristiwa yang terjadi di aplikasi. Log yang baik membantu developer mendiagnosis masalah, mengaudit aktivitas, dan memahami perilaku sistem. Log yang buruk hanya berupa \`console.log\` tersebar tanpa konteks.

## Structured Logging

Structured logging menyimpan log dalam format yang dapat diparse, seperti JSON. Setiap log entry memiliki field standar:

- \`level\`: info, warn, error, debug.
- \`message\`: deskripsi peristiwa.
- \`timestamp\`: waktu peristiwa.
- \`correlation_id\`: ID yang sama untuk seluruh request lintas service.
- \`service\`: nama service.
- \`extra fields\`: user id, route, duration, error stack.

## Correlation ID

Correlation ID (atau trace ID) dihasilkan saat request masuk dan dibawa ke setiap downstream service melalui header. Dengan correlation ID, kita dapat mengelompokkan semua log dan span yang berasal dari satu request, meskipun melewati banyak service.`,
    },
    {
      id: 'sec-04-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-04-js',
        filename: 'logger.js',
        language: 'javascript',
        title: 'JavaScript: Winston Logger dengan Correlation ID',
        code: `const winston = require('winston')
const { combine, timestamp, json } = winston.format

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  defaultMeta: { service: 'backend-intermediate' },
  format: combine(timestamp(), json()),
  transports: [new winston.transports.Console()],
})

function correlationMiddleware(req, res, next) {
  req.correlationId = req.get('x-correlation-id') || crypto.randomUUID()
  res.setHeader('x-correlation-id', req.correlationId)
  next()
}

function requestLogger(req, res, next) {
  const start = Date.now()
  res.on('finish', () => {
    logger.info('request handled', {
      correlation_id: req.correlationId,
      method: req.method,
      path: req.path,
      status_code: res.statusCode,
      duration_ms: Date.now() - start,
    })
  })
  next()
}

module.exports = { logger, correlationMiddleware, requestLogger }`,
        explanation:
          'Winston membuat log JSON dengan metadata. Middleware correlation memastikan setiap request memiliki ID unik yang dibawa ke log dan response header.',
      },
    },
    {
      id: 'sec-04-intermediate-metrics',
      type: 'markdown',
      level: 'intermediate',
      title: 'Metrics, Health Checks, dan Prometheus',
      content: `## Metrics Dasar

Metrics adalah data numerik yang dikumpulkan secara berkala. Tiga tipe paling umum:

- **Counter**: hanya naik, digunakan untuk menghitung request total, error total.
- **Histogram**: mengelompokkan observasi ke bucket, berguna untuk latensi dan ukuran response.
- **Gauge**: bisa naik turun, contohnya jumlah koneksi aktif atau ukuran queue.

## Prometheus

Prometheus adalah sistem monitoring yang menarik metrics dari endpoint \`/metrics\`. Aplikasi mengekspos metrics dalam format teks sederhana, lalu Prometheus scrape secara berkala.

## Health Checks

Endpoint \`/health\` memberi tahu orchestrator seperti Kubernetes apakah instance dapat menerima traffic. Dua jenis utama:

- **Liveness**: apakah aplikasi masih berjalan? Jika gagal, pod akan di-restart.
- **Readiness**: apakah aplikasi siap menerima request? Jika gagal, pod dikeluarkan dari load balancer.

Health check yang baik juga memeriksa dependency seperti database, tetapi tidak terlalu agresif sehingga membebani database.`,
    },
    {
      id: 'sec-04-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-04-ts',
        filename: 'metrics.controller.ts',
        language: 'typescript',
        title: 'TypeScript: NestJS Metrics dan Health Check',
        code: `import { Controller, Get, Logger } from '@nestjs/common'
import * as prom from 'prom-client'

const httpRequestsTotal = new prom.Counter({
  name: 'http_requests_total',
  help: 'Total HTTP requests',
  labelNames: ['method', 'route', 'status_code'],
})

const httpRequestDuration = new prom.Histogram({
  name: 'http_request_duration_seconds',
  help: 'HTTP request duration in seconds',
  labelNames: ['method', 'route'],
  buckets: [0.01, 0.05, 0.1, 0.5, 1, 2, 5],
})

@Controller()
export class MetricsController {
  private readonly logger = new Logger(MetricsController.name)

  @Get('metrics')
  async metrics() {
    return prom.register.metrics()
  }

  @Get('health')
  health() {
    return { status: 'ok', timestamp: new Date().toISOString() }
  }

  recordRequest(method: string, route: string, statusCode: number, durationSeconds: number) {
    httpRequestsTotal.inc({ method, route, status_code: statusCode.toString() })
    httpRequestDuration.observe({ method, route }, durationSeconds)
    this.logger.log(
      \`\${method} \${route} \${statusCode} \${durationSeconds.toFixed(3)}s\`
    )
  }
}`,
        explanation:
          'Counter dan histogram dari prom-client mengekspos metrics Prometheus. Endpoint /metrics menyediakan data untuk di-scrape, sementara /health memberi sinyal kesehatan sederhana.',
      },
    },
    {
      id: 'sec-04-advanced-otel',
      type: 'markdown',
      level: 'advanced',
      title: 'Distributed Tracing dan OpenTelemetry',
      content: `## Trace dan Span

Distributed tracing memecah satu request menjadi serangkaian span:

- **Trace**: representasi satu request end-to-end, diidentifikasi oleh trace ID.
- **Span**: satu unit kerja, misalnya query database atau panggilan HTTP, memiliki span ID, parent span ID, start time, dan duration.
- **Context propagation**: trace context dipindahkan antar service melalui header standar W3C \`traceparent\`.

## OpenTelemetry

OpenTelemetry (OTel) menyediakan API, SDK, dan exporter untuk tracing, metrics, dan logging. Alur kerja:

1. Inisialisasi tracer provider dengan sampler dan exporter (misalnya OTLP ke Jaeger/Honeycomb).
2. Middleware HTTP memulai span untuk setiap request.
3. Span context dibawa ke downstream service melalui propagator.
4. Span diakhiri saat response dikirim, lalu di-export.

## Sampling

Tidak semua trace perlu disimpan. Sampler menentukan trace mana yang di-export:

- **AlwaysOn**: semua trace.
- **AlwaysOff**: tidak ada trace.
- **TraceIdRatioBased**: menyimpan proporsi tertentu berdasarkan trace ID.
- **ParentBased**: mengikuti keputusan parent span.

## SLI, SLO, dan Alerting

- **SLI (Service Level Indicator)**: metrik seperti availability, latency, error rate.
- **SLO (Service Level Objective)**: target SLI, misalnya 99.9% availability.
- **Error budget**: selisih antara 100% dan target SLO; menentukan seberapa banyak kegagalan yang masih dapat diterima.
- **Alerting**: beri tahu tim hanya saat error budget terkuras atau tren menunjukkan SLO akan dilanggar.`,
    },
    {
      id: 'sec-04-go-example',
      type: 'code-example',
      codeExample: {
        id: 'code-04-go',
        filename: 'main.go',
        language: 'go',
        title: 'Go: slog dan OpenTelemetry Trace Middleware',
        code: `package main

import (
	"context"
	"log/slog"
	"net/http"
	"os"
	"time"

	"go.opentelemetry.io/otel"
	"go.opentelemetry.io/otel/attribute"
	"go.opentelemetry.io/otel/exporters/otlp/otlptrace/otlptracegrpc"
	"go.opentelemetry.io/otel/sdk/resource"
	sdktrace "go.opentelemetry.io/otel/sdk/trace"
	semconv "go.opentelemetry.io/otel/semconv/v1.24.0"
)

func initTracer() (*sdktrace.TracerProvider, error) {
	exp, err := otlptracegrpc.New(context.Background())
	if err != nil {
		return nil, err
	}
	tp := sdktrace.NewTracerProvider(
		sdktrace.WithBatcher(exp),
		sdktrace.WithResource(resource.NewWithAttributes(
			semconv.SchemaURL,
			semconv.ServiceName("backend-intermediate"),
		)),
	)
	otel.SetTracerProvider(tp)
	return tp, nil
}

func traceMiddleware(next http.Handler) http.Handler {
	tracer := otel.Tracer("http-server")
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ctx, span := tracer.Start(r.Context(), r.Method+" "+r.URL.Path)
		defer span.End()

		start := time.Now()
		next.ServeHTTP(w, r.WithContext(ctx))

		span.SetAttributes(
			attribute.String("http.method", r.Method),
			attribute.String("http.path", r.URL.Path),
			attribute.Int64("http.duration_ms", time.Since(start).Milliseconds()),
		)
	})
}

func main() {
	handler := slog.NewJSONHandler(os.Stdout, &slog.HandlerOptions{Level: slog.LevelInfo})
	slog.SetDefault(slog.New(handler))

	tp, err := initTracer()
	if err != nil {
		slog.Error("failed to init tracer", slog.String("error", err.Error()))
		return
	}
	defer func() { _ = tp.Shutdown(context.Background()) }()

	mux := http.NewServeMux()
	mux.HandleFunc("GET /hello", func(w http.ResponseWriter, r *http.Request) {
		slog.InfoContext(r.Context(), "handling request", slog.String("path", r.URL.Path))
		w.Write([]byte("ok"))
	})

	server := &http.Server{Addr: ":8080", Handler: traceMiddleware(mux)}
	if err := server.ListenAndServe(); err != nil {
		slog.Error("server error", slog.String("error", err.Error()))
	}
}`,
        explanation:
          'slog menghasilkan log JSON standar. OpenTelemetry tracer membuat span per request dan mengirimkannya ke exporter OTLP. Span attribute memberikan konteks latensi dan route.',
      },
    },
    {
      id: 'sec-04-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Kesimpulan:** Observability modern memadukan log terstruktur, metrics, dan distributed tracing. Correlation ID dan trace context memungkinkan diagnosis lintas service, sementara SLI/SLO memberikan bahasa bersama untuk keandalan.',
    },
  ],
}
