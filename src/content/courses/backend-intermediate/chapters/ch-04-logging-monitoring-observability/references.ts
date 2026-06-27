import type { Reference } from '@/content/types'

export const ch04References: Reference[] = [
  {
    id: 'ref-04-01',
    title: 'OpenTelemetry Docs',
    url: 'https://opentelemetry.io/docs/',
    description:
      'Dokumentasi resmi OpenTelemetry untuk tracing, metrics, dan logging di berbagai bahasa.',
    type: 'documentation',
  },
  {
    id: 'ref-04-02',
    title: 'Prometheus Docs',
    url: 'https://prometheus.io/docs/introduction/overview/',
    description:
      'Dokumentasi Prometheus untuk metrics, scraping, querying, dan alerting.',
    type: 'documentation',
  },
  {
    id: 'ref-04-03',
    title: 'Go Blog — slog',
    url: 'https://go.dev/blog/slog',
    description:
      'Artikel pengenalan structured logging di Go dengan package log/slog.',
    type: 'article',
  },
  {
    id: 'ref-04-04',
    title: '12factor.net — Logs',
    url: 'https://12factor.net/logs',
    description:
      'Prinsip Twelve-Factor tentang log sebagai aliran event yang ditangani oleh external aggregator.',
    type: 'article',
  },
  {
    id: 'ref-04-05',
    title: 'Google SRE Book — Monitoring',
    url: 'https://sre.google/sre-book/monitoring-distributed-systems/',
    description:
      'Bab dari Google SRE Book tentang monitoring, SLI, SLO, dan praktik alerting.',
    type: 'book',
  },
]
