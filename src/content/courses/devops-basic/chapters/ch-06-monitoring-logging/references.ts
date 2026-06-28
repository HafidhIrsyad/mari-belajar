import type { Reference } from '@/content/types'

export const ch06References: Reference[] = [
  {
    id: 'ref-06-01',
    title: 'Google SRE Book — Monitoring',
    url: 'https://sre.google/sre-book/monitoring-distributed-systems/',
    description:
      'Bab klasik Site Reliability Engineering tentang monitoring, golden signals, dan alerting.',
    type: 'book',
  },
  {
    id: 'ref-06-02',
    title: 'Prometheus Documentation',
    url: 'https://prometheus.io/docs/introduction/overview/',
    description:
      'Dokumentasi resmi Prometheus mencakup metric types, query language, dan alerting.',
    type: 'documentation',
  },
  {
    id: 'ref-06-03',
    title: 'OpenTelemetry Documentation',
    url: 'https://opentelemetry.io/docs/',
    description:
      'Dokumentasi resmi OpenTelemetry untuk instrumentasi metrics, logs, dan traces.',
    type: 'documentation',
  },
  {
    id: 'ref-06-04',
    title: 'Grafana Labs — Loki',
    url: 'https://grafana.com/docs/loki/latest/',
    description:
      'Dokumentasi Loki, log aggregation system yang terintegrasi dengan Grafana.',
    type: 'documentation',
  },
  {
    id: 'ref-06-05',
    title: 'Google SRE — SLI, SLO, SLA',
    url: 'https://sre.google/workbook/slo-document/',
    description:
      'Panduan praktis mendokumentasikan dan mengelola SLI, SLO, serta error budget.',
    type: 'book',
  },
]
