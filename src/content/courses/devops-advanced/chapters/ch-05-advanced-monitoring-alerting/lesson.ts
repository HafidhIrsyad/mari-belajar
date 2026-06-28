import type { Lesson } from '@/content/types'

export const ch05AdvancedMonitoringAlertingLesson: Lesson = {
  id: 'lesson-ch-05-advanced-monitoring-alerting',
  estimatedMinutes: 50,
  sections: [
    {
      id: 'sec-05-basic',
      type: 'markdown',
      level: 'basic',
      title: 'Prometheus, Grafana, dan Alert Rules',
      content: '## Prometheus Metrics\nPrometheus mengumpulkan metrik sebagai time series dengan label. Tipe utama: **Counter** (monotonik naik), **Gauge** (naik-turun), **Histogram** (distribusi), **Summary** (quantile).\n\n## PromQL Dasar\n- `rate(http_requests_total[5m])`: rate request per detik.\n- `sum by (service) (rate(...))`: agregasi per label.\n- `histogram_quantile(0.99, ...)`: hitung p99 latency.\n\n## Grafana Dashboards\nGrafana memvisualisasi metrik dari Prometheus, Loki, Tempo, dan sumber lain. Panel umum: time series, stat, gauge, heatmap.\n\n## Alert Rules\nAlert rule mengevaluasi PromQL expression secara periodik. Jika kondisi terpenuhi selama `for` duration, alert firing dikirim ke Alertmanager.',
    },
    {
      id: 'sec-05-js',
      type: 'code-example',
      codeExample: {
        id: 'code-05-js',
        filename: 'console-metric.js',
        language: 'javascript',
        title: 'JavaScript: Simulasi Counter Metric',
        code: 'const metrics = { http_requests_total: 0 }\n\nfunction recordRequest(status) {\n  metrics.http_requests_total++\n  console.log(`[metric] http_requests_total=${metrics.http_requests_total} status=${status}`)\n}\n\nrecordRequest(200)\nrecordRequest(200)\nrecordRequest(500)\nconsole.log(\'Rate (simulated):\', metrics.http_requests_total / 60, \'req/s over 1 min\')',
        explanation: 'Simulasi counter metric yang di-increment setiap request, dasar konsep Prometheus counter.',
      },
    },
    {
      id: 'sec-05-intermediate',
      type: 'markdown',
      level: 'intermediate',
      title: 'Alertmanager Routing dan On-Call',
      content: '## Alertmanager Pipeline\n1. **Grouping**: gabungkan alert serupa (misal per service).\n2. **Inhibition**: tekan alert downstream jika upstream sudah firing.\n3. **Silencing**: tekan alert sementara (maintenance window).\n4. **Routing**: kirim ke receiver yang tepat (PagerDuty, Slack, email).\n\n## Routing Tree\nAlertmanager menggunakan label matcher untuk routing. Contoh: `severity=critical` → PagerDuty; `severity=warning` → Slack.\n\n## On-Call Integration\nIntegrasi dengan PagerDuty/Opsgenie memastikan alert critical memicu page ke engineer on-call dengan escalation policy.',
    },
    {
      id: 'sec-05-ts',
      type: 'code-example',
      codeExample: {
        id: 'code-05-ts',
        filename: 'promql-query.ts',
        language: 'typescript',
        title: 'TypeScript: Model Alert Rule',
        code: 'interface AlertRule {\n  alert: string\n  expr: string\n  for: string\n  labels: Record<string, string>\n  annotations: Record<string, string>\n}\n\nconst highErrorRate: AlertRule = {\n  alert: \'HighErrorRate\',\n  expr: \'sum(rate(http_requests_total{status=~"5.."}[5m])) / sum(rate(http_requests_total[5m])) > 0.01\',\n  for: \'5m\',\n  labels: { severity: \'critical\', team: \'platform\' },\n  annotations: {\n    summary: \'Error rate above 1%\',\n    runbook: \'https://wiki.example.com/runbooks/high-error-rate\',\n  },\n}\nconsole.log(highErrorRate.alert, highErrorRate.expr)',
        explanation: 'Model alert rule Prometheus dengan expression, label, dan annotation runbook.',
      },
    },
    {
      id: 'sec-05-advanced',
      type: 'markdown',
      level: 'advanced',
      title: 'SLO-Based Alerting dan Anomaly Detection',
      content: '## SLO-Based Alerting\nAlih-alih alert saat CPU > 80%, alert berdasarkan burn rate error budget:\n- **Fast burn** (14.4x): page segera, budget habis dalam 1 jam.\n- **Slow burn** (2x): ticket, budget habis dalam 3 hari.\n\n## Multi-Window Multi-Burn-Rate\nKombinasi window pendek dan panjang mengurangi false positive.\n\n## Anomaly Detection\nMachine learning mendeteksi pola abnormal pada metrik tanpa threshold manual. Berguna untuk metrik dengan pola musiman.\n\n## AIOps Intro\nAIOps menggabungkan ML, automation, dan observability untuk root cause analysis, incident correlation, dan auto-remediation.',
    },
    {
      id: 'sec-05-go',
      type: 'code-example',
      codeExample: {
        id: 'code-05-go',
        filename: 'metric-exporter.go',
        language: 'go',
        title: 'Go: Prometheus Metric Exporter',
        code: 'package main\n\nimport (\n\t"net/http"\n\n\t"github.com/prometheus/client_golang/prometheus"\n\t"github.com/prometheus/client_golang/prometheus/promhttp"\n)\n\nvar requestsTotal = prometheus.NewCounterVec(\n\tprometheus.CounterOpts{\n\t\tName: "http_requests_total",\n\t\tHelp: "Total HTTP requests",\n\t},\n\t[]string{"method", "status"},\n)\n\nfunc init() {\n\tprometheus.MustRegister(requestsTotal)\n}\n\nfunc main() {\n\thttp.HandleFunc("/metrics", promhttp.Handler().ServeHTTP)\n\thttp.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {\n\t\trequestsTotal.WithLabelValues(r.Method, "200").Inc()\n\t\tw.WriteHeader(http.StatusOK)\n\t})\n\thttp.ListenAndServe(":8080", nil)\n}',
        explanation: 'Exporter Go standar yang mengekspos counter http_requests_total ke endpoint /metrics.',
      },
    },
    {
      id: 'sec-05-callout',
      type: 'callout',
      calloutType: 'info',
      content: '**Kesimpulan:** Alert harus actionable dan terhubung runbook. Kurangi noise dengan SLO-based alerting dan grouping. Setiap alert perlu owner dan escalation path.',
    },
  ],
}
