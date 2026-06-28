import type { Lesson } from '@/content/types'

export const ch05ObservabilityStackLesson: Lesson = {
  id: "lesson-ch-05-observability-stack",
  estimatedMinutes: 50,
  sections: [
    {
      id: "sec-05-basic-three-pillars",
      type: 'markdown',
      level: "basic",
      title: "Tiga Pilar Observability",
      content: "## Logs\n\nLog adalah catatan ber timestamp dari event di aplikasi atau sistem. Log memberikan detail tinggi untuk debugging error tertentu. Format yang baik adalah structured log dengan key-value, bukan plain text bebas.\n\n## Metrics\n\nMetrics adalah data numerik yang diukur dari waktu ke waktu. Contoh: request rate, latency histogram, error rate, CPU usage. Metrics cocok untuk alert dan dashboard karena ringan dan dapat diagregasi.\n\n## Traces\n\nTrace mengikuti perjalanan sebuah request melalui beberapa service. Trace terdiri dari span yang merepresentasikan satu unit kerja. Traces sangat berguna untuk mendiagnosis latency di distributed system.\n\n## Tiga Pilar Bersama\n\nObservability yang kuat menggabungkan ketiganya: metrics memberi sinyal adanya masalah, traces menunjukkan di mana masalah tersebar, logs memberikan detail root cause.",
    },
    {
      id: "sec-05-js-example",
      type: 'code-example',
      codeExample: {
        id: "code-05-js",
        filename: "structured-log.js",
        language: "javascript",
        title: "JavaScript: Structured Logging dengan Correlation ID",
        code: "const correlationId = process.env.CORRELATION_ID || generateId()\n\nfunction log(level, message, meta = {}) {\n  const entry = {\n    timestamp: new Date().toISOString(),\n    level,\n    message,\n    correlationId,\n    service: 'order-service',\n    ...meta,\n  }\n  console.log(JSON.stringify(entry))\n}\n\nfunction generateId() {\n  return Math.random().toString(36).slice(2)\n}\n\nlog('info', 'Menerima pesanan', { orderId: 'ORD-123', amount: 150000 })\nlog('error', 'Gagal memproses pembayaran', { orderId: 'ORD-123', error: 'timeout' })\n\nfunction processOrder(order) {\n  log('info', 'Memproses order', { orderId: order.id })\n  return { ok: true }\n}\n\nprocessOrder({ id: 'ORD-123' })",
        explanation: "Structured logging dengan correlation ID memudahkan pencarian log lintas service. Setiap log entry memiliki field standar sehingga dapat diindeks oleh Loki atau ELK.",
      },
    },
    {
      id: "sec-05-intermediate-otel",
      type: 'markdown',
      level: "intermediate",
      title: "OpenTelemetry, Collector, dan Stack LGTM",
      content: "## OpenTelemetry\n\nOpenTelemetry (OTel) adalah standar open-source untuk instrumentation, mengumpulkan logs, metrics, dan traces. OpenTelemetry menyediakan SDK untuk banyak bahasa dan protocol OTLP untuk mengirim data ke backend.\n\n## OpenTelemetry Collector\n\nCollector berjalan sebagai agent atau gateway. Fungsinya:\n\n- Menerima telemetry dari banyak sumber (OTLP, Jaeger, Prometheus, Zipkin).\n- Memproses data: batching, filtering, sampling, attribute enrichment.\n- Mengekspor ke backend seperti Grafana, Datadog, Honeycomb, atau vendor lain.\n\n## LGTM Stack\n\n- **Loki**: log aggregation yang terinspirasi Prometheus, mengindeks label bukan full text.\n- **Grafana**: visualisasi dashboard dan alert.\n- **Tempo**: distributed tracing backend yang hemat biaya.\n- **Mimir**: long-term storage untuk metrics Prometheus.\n\n## Context Propagation\n\nTrace context dipropagasikan antar service menggunakan header standar seperti W3C `traceparent`. Header ini memastikan span di service berbeda tergabung dalam satu trace.",
    },
    {
      id: "sec-05-ts-example",
      type: 'code-example',
      codeExample: {
        id: "code-05-ts",
        filename: "otel-tracer.ts",
        language: "typescript",
        title: "TypeScript: Wrapper OpenTelemetry Tracer",
        code: "interface Span {\n  name: string\n  startTime: number\n  endTime?: number\n  attributes: Record<string, unknown>\n}\n\nclass SimpleTracer {\n  private spans: Span[] = []\n\n  startSpan(name: string, attributes: Record<string, unknown> = {}): Span {\n    const span: Span = { name, startTime: Date.now(), attributes }\n    this.spans.push(span)\n    return span\n  }\n\n  endSpan(span: Span) {\n    span.endTime = Date.now()\n    console.log(`Span ${span.name}: ${span.endTime - span.startTime}ms`, span.attributes)\n  }\n}\n\nconst tracer = new SimpleTracer()\n\nasync function fetchUser(userId: string) {\n  const span = tracer.startSpan('fetchUser', { userId })\n  await new Promise((resolve) => setTimeout(resolve, 50))\n  tracer.endSpan(span)\n  return { id: userId }\n}\n\nfetchUser('42')",
        explanation: "Wrapper sederhana ini mengilustrasikan konsep span: start time, end time, dan attributes. OpenTelemetry SDK sungguhan menambahkan propagation, sampling, dan ekspor ke collector.",
      },
    },
    {
      id: "sec-05-advanced-tracing",
      type: 'markdown',
      level: "advanced",
      title: "Distributed Tracing, Sampling, Cardinality, dan eBPF",
      content: "## Distributed Tracing\n\nDi sistem microservices, satu request dapat melewati banyak service. Trace memungkinkan engineer melihat latency di setiap hop, mengidentifikasi bottleneck, dan memahami dependensi.\n\n## Sampling\n\n- **Head-based sampling**: keputusan disimpan/dibuang diambil di awal trace. Sederhana tetapi dapat kehilangan trace error yang jarang.\n- **Tail-based sampling**: semua span dikumpulkan di collector, lalu diputuskan setelah trace selesai berdasarkan kriteria seperti error atau latency tinggi. Lebih efektif tetapi membutuhkan buffer lebih besar.\n\n## Cardinality\n\nCardinality adalah jumlah kombinasi unik dari label pada metrics. Label dengan nilai tak terbatas seperti user ID atau IP address akan membuat jumlah time series meledak, mengurangi query performance dan meningkatkan biaya.\n\n## eBPF-based Observability\n\neBPF memungkinkan observability di kernel level tanpa mengubah aplikasi. Tool seperti Cilium, Pixie, dan Falco menggunakan eBPF untuk tracing jaringan, profiling, dan keamanan runtime.\n\n## Correlation ID dan Log Context\n\nCorrelation ID tetap sama sepanjang request. Dengan menyertakan correlation ID di setiap log dan span, engineer dapat menyaring semua telemetry terkait satu request.\n\n## Alerting yang Baik\n\nGunakan SLO-based alerting daripada alert threshold statis. Alert sebaiknya actionable, memiliki runbook, dan memicu pada gejala bukan hanya penyebab.",
    },
    {
      id: "sec-05-go-example",
      type: 'code-example',
      codeExample: {
        id: "code-05-go",
        filename: "otel-trace.go",
        language: "go",
        title: "Go: Membuat Trace Span Sederhana",
        code: "package main\n\nimport (\n\t\"context\"\n\t\"fmt\"\n\t\"time\"\n)\n\ntype Span struct {\n\tName       string\n\tStartTime  time.Time\n\tEndTime    time.Time\n\tAttributes map[string]string\n}\n\nfunc StartSpan(ctx context.Context, name string) (context.Context, *Span) {\n\tspan := &Span{Name: name, StartTime: time.Now(), Attributes: map[string]string{}}\n\treturn context.WithValue(ctx, \"span\", span), span\n}\n\nfunc EndSpan(span *Span) {\n\tspan.EndTime = time.Now()\n\tfmt.Printf(\"%s took %v\\n\", span.Name, span.EndTime.Sub(span.StartTime))\n}\n\nfunc main() {\n\tctx := context.Background()\n\tctx, span := StartSpan(ctx, \"process-payment\")\n\ttime.Sleep(20 * time.Millisecond)\n\tEndSpan(span)\n}",
        explanation: "Program Go ini mensimulasikan span tracing manual. OpenTelemetry Go SDK menyediakan context propagation otomatis dan ekspor OTLP ke collector.",
      },
    },
    {
      id: "sec-05-summary",
      type: 'callout',
      calloutType: "info",
      content: "**Kesimpulan:** Observability modern menggabungkan logs, metrics, dan traces dengan standar OpenTelemetry. Correlation ID, sampling yang tepat, dan manajemen cardinality memastikan sistem dapat dipantau tanpa biaya yang tidak terkendali.",
    },
  ],
}
