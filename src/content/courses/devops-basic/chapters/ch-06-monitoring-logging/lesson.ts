import type { Lesson } from '@/content/types'

export const ch06Lesson: Lesson = {
  id: 'lesson-ch-06-monitoring-logging',
  estimatedMinutes: 45,
  sections: [
    {
      id: 'sec-06-basic-observability',
      type: 'markdown',
      level: 'basic',
      title: 'Observability dan Golden Signals',
      content: `## Apa itu Observability?

Observability adalah kemampuan untuk memahami keadaan internal sistem dari outputnya. Tiga pilar observability:

1. **Metrics**: data numerik terkumpul dari waktu ke waktu, seperti request per detik atau penggunaan CPU.
2. **Logs**: catatan peristiwa yang dikeluarkan aplikasi atau sistem.
3. **Traces**: jejak perjalanan request melalui berbagai service.

## Empat Golden Signals

Google SRE mengenalkan empat sinyal utama:

1. **Latency**: waktu yang dibutuhkan untuk melayani request. Bedakan latency sukses dan gagal.
2. **Traffic**: jumlah demand pada sistem, misalnya request per detik atau pengguna aktif.
3. **Errors**: tingkat request yang gagal, baik secara eksplisit (HTTP 5xx) maupun implisit (response salah).
4. **Saturation**: seberapa penuh resource sistem, seperti CPU, memory, disk, atau connection pool.

## Jenis Metrik Dasar

- **Counter**: nilai yang hanya naik, seperti total request atau total error.
- **Gauge**: nilai yang bisa naik dan turun, seperti temperatur atau memory usage.
- **Histogram**: mengelompokkan pengamatan ke dalam bucket, seperti distribusi latency.
- **Summary**: mirip histogram tetapi menghitung quantile di client.

## Logging Dasar

Log adalah output tekstual yang mencatat peristiwa. Log dapat bersifat:

- **Plain text**: mudah dibaca manusia tetapi sulit diparse.
- **Structured**: format seperti JSON dengan field standar, memudahkan query dan agregasi.`,
    },
    {
      id: 'sec-06-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-06-js',
        filename: 'metrics-collector.js',
        language: 'javascript',
        title: 'JavaScript: Kolektor Metrik Sederhana',
        code: `class MetricsCollector {
  constructor() {
    this.counters = new Map()
    this.gauges = new Map()
    this.histograms = new Map()
  }

  incCounter(name, labels = {}, value = 1) {
    const key = this.key(name, labels)
    this.counters.set(key, (this.counters.get(key) || 0) + value)
  }

  setGauge(name, labels = {}, value) {
    const key = this.key(name, labels)
    this.gauges.set(key, value)
  }

  observeHistogram(name, labels = {}, value) {
    const key = this.key(name, labels)
    if (!this.histograms.has(key)) this.histograms.set(key, [])
    this.histograms.get(key).push(value)
  }

  key(name, labels) {
    const labelStr = Object.entries(labels)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => \`\${k}=\${v}\`)
      .join(',')
    return \`\${name}\${labelStr ? '{' + labelStr + '}' : ''}\`
  }

  report() {
    return {
      counters: Object.fromEntries(this.counters),
      gauges: Object.fromEntries(this.gauges),
      histograms: Object.fromEntries(
        new Map([...this.histograms].map(([k, v]) => [k, { count: v.length, sum: v.reduce((a, b) => a + b, 0) }]))
      ),
    }
  }
}

const metrics = new MetricsCollector()
metrics.incCounter('http_requests_total', { method: 'GET', status: '200' })
metrics.observeHistogram('http_request_duration_ms', { method: 'GET' }, 45)
metrics.setGauge('active_connections', {}, 12)

console.log(JSON.stringify(metrics.report(), null, 2))`,
        explanation:
          'Kolektor ini meniru konsep metrik Prometheus: counter monoton naik, gauge bisa berubah, dan histogram menyimpan distribusi nilai.',
      },
    },
    {
      id: 'sec-06-intermediate-prometheus',
      type: 'markdown',
      level: 'intermediate',
      title: 'Prometheus Metrics, Structured Logging, dan Aggregation',
      content: `## Prometheus Metrics Types

Prometheus adalah sistem monitoring open source yang populer. Format metriknya menggunakan teks eksponensial:

\`\`\`
http_requests_total{method="GET",status="200"} 1027
http_request_duration_seconds_bucket{le="0.1"} 900
\`\`\`

Tipe metrik:

- **Counter**: nilai selalu naik. Gunakan \`rate()\` atau \`increase()\` untuk mendapatkan laju.
- **Gauge**: nilai naik turun. Cocok untuk suhu, memory, jumlah koneksi.
- **Histogram**: membagi observasi ke bucket batas atas (\`le\`). Menghasilkan \`_count\`, \`_sum\`, dan \`_bucket\`.
- **Summary**: menghitung quantile di client dengan sliding time window. Kurang fleksibel daripada histogram untuk agregasi.

## Log Aggregation

Aplikasi modern menghasilkan log di banyak container. Log aggregator seperti Fluentd, Fluent Bit, Logstash, atau Vector mengumpulkan log dari sumber, mengubahnya, dan mengirim ke centralized storage seperti Elasticsearch, Loki, atau Splunk.

## Structured Logging

Structured logging menggunakan format seperti JSON dengan field standar:

\`\`\`json
{
  "timestamp": "2026-06-28T08:00:00Z",
  "level": "error",
  "message": "database connection failed",
  "service": "payment",
  "trace_id": "abc123",
  "duration_ms": 120
}
\`\`\`

Keuntungan:

- Mudah diparse oleh mesin.
- Dapat dikorelasikan dengan trace ID.
- Mendukung query kompleks di log storage.

## Cardinality

Cardinality adalah jumlah kombinasi label unik. Cardinality tinggi, misalnya user ID atau request ID sebagai label, dapat membanjiri time-series database. Hindari label dengan nilai yang tidak terbatas.`,
    },
    {
      id: 'sec-06-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-06-ts',
        filename: 'logger.ts',
        language: 'typescript',
        title: 'TypeScript: Structured Logger',
        code: `type LogLevel = 'debug' | 'info' | 'warn' | 'error'

interface LogEntry {
  timestamp: string
  level: LogLevel
  message: string
  service: string
  traceId?: string
  context?: Record<string, unknown>
}

class StructuredLogger {
  constructor(private service: string) {}

  log(level: LogLevel, message: string, context?: Record<string, unknown>) {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      service: this.service,
      traceId: context?.traceId as string | undefined,
      context,
    }
    console.log(JSON.stringify(entry))
  }

  info(message: string, context?: Record<string, unknown>) {
    this.log('info', message, context)
  }

  error(message: string, context?: Record<string, unknown>) {
    this.log('error', message, context)
  }
}

const logger = new StructuredLogger('payment-service')
logger.info('Payment processed', { orderId: 'ORD-123', amount: 150000, traceId: 'abc-789' })
logger.error('Database timeout', { query: 'SELECT * FROM orders', durationMs: 3000 })`,
        explanation:
          'Structured logger menghasilkan log dalam format JSON dengan field standar. Log semacam ini mudah diindeks, dicari, dan dikorelasikan dengan metrik serta trace.',
      },
    },
    {
      id: 'sec-06-advanced-slo-alerting',
      type: 'markdown',
      level: 'advanced',
      title: 'SLI, SLO, SLA, dan Alerting',
      content: `## SLI, SLO, dan SLA

- **SLI (Service Level Indicator)**: metrik kuantitatif yang mengukur aspek layanan, misalnya availability atau latency p99.
- **SLO (Service Level Objective)**: target yang ingin dicapai untuk SLI, misalnya availability 99.9% dalam sebulan.
- **SLA (Service Level Agreement)**: kontrak bisnis yang biasanya mencakup konsekuensi jika SLO tidak tercapai.

## Error Budget

Error budget adalah toleransi kegagalan yang diizinkan berdasarkan SLO. Jika SLO availability 99.9%, error budget dalam sebulan adalah 0.1% dari total waktu. Tim dapat menggunakan error budget untuk memutuskan kapan boleh melakukan rilis berisiko.

## Alerting

Alert yang baik memenuhi kriteria:

- **Actionable**: penerima alert tahu apa yang harus dilakukan.
- **Symptom-based**: didasarkan pada gejala yang dirasakan pengguna, bukan hanya penyebab internal.
- **Prioritized**: severity jelas (critical, warning, info).
- **Konfigurasi threshold**: tidak terlalu sensitif (alert fatigue) dan tidak terlalu lambat.

## Alerting Rules Prometheus

Contoh aturan:

\`\`\`yaml
groups:
  - name: api
    rules:
      - alert: HighErrorRate
        expr: rate(http_requests_total{status=~"5.."}[5m]) / rate(http_requests_total[5m]) > 0.05
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "Error rate tinggi di {{ $labels.service }}"
\`\`\`

## Distributed Tracing

Tracing melacak perjalanan request antar service. Standar seperti OpenTelemetry (OTel) menyediakan SDK untuk instrumentasi. Trace terdiri dari span; setiap span merepresentasikan satu operasi dan memiliki trace ID untuk korelasi.

## Log Sampling

Di sistem besar, log dapat sangat banyak. Sampling mengurangi volume dengan tetap mempertahankan representasi. Level-based sampling menyimpan semua log error tetapi hanya sebagian log info.

## Dashboard dan Runbook

- **Dashboard**: visualisasi metrik untuk memahami tren dan anomaly.
- **Runbook**: dokumentasi langkah-langkah penanganan untuk alert tertentu. Runbook mengurangi waktu resolusi dan ketergantungan pada pengetahuan individu.`,
    },
    {
      id: 'sec-06-go-example',
      type: 'code-example',
      codeExample: {
        id: 'code-06-go',
        filename: 'prometheus-metrics.go',
        language: 'go',
        title: 'Go: Metrik Prometheus dengan client_golang',
        code: `package main

import (
	"fmt"
	"net/http"
	"time"

	"github.com/prometheus/client_golang/prometheus"
	"github.com/prometheus/client_golang/prometheus/promhttp"
)

var (
	requestDuration = prometheus.NewHistogramVec(
		prometheus.HistogramOpts{
			Name:    "http_request_duration_seconds",
			Help:    "Histogram latensi request HTTP",
			Buckets: prometheus.DefBuckets,
		},
		[]string{"method", "status"},
	)

	requestTotal = prometheus.NewCounterVec(
		prometheus.CounterOpts{
			Name: "http_requests_total",
			Help: "Total request HTTP",
		},
		[]string{"method", "status"},
	)
)

func init() {
	prometheus.MustRegister(requestDuration, requestTotal)
}

func handler(w http.ResponseWriter, r *http.Request) {
	start := time.Now()
	w.WriteHeader(http.StatusOK)
	fmt.Fprintln(w, "halo")

	duration := time.Since(start).Seconds()
	requestDuration.WithLabelValues(r.Method, "200").Observe(duration)
	requestTotal.WithLabelValues(r.Method, "200").Inc()
}

func main() {
	http.HandleFunc("/hello", handler)
	http.Handle("/metrics", promhttp.Handler())
	fmt.Println("Server metrics di http://localhost:9090/metrics")
	http.ListenAndServe(":9090", nil)
}`,
        explanation:
          'Contoh ini menggunakan client_golang untuk mengekspos metrik Prometheus. Setiap request mencatat counter dan histogram yang dapat di-scrape oleh Prometheus server.',
      },
    },
    {
      id: 'sec-06-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Kesimpulan:** Monitoring dan logging yang efektif menggabungkan metrics, logs, dan traces. Pahami golden signals, tipe metrik Prometheus, structured logging, cardinality, SLI/SLO/SLA, serta alerting berbasis gejala untuk membangun sistem yang dapat diamati dan diandalkan.',
    },
  ],
}
