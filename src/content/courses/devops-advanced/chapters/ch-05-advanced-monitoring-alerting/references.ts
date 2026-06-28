import type { Reference } from '@/content/types'

export const ch05AdvancedMonitoringAlertingReferences: Reference[] = [
  {
    id: 'ref-05-01',
    title: 'Prometheus Docs — Alerting',
    url: 'https://prometheus.io/docs/alerting/latest/overview/',
    description: 'Dokumentasi resmi Alertmanager dan integrasi alerting Prometheus.',
    type: 'documentation',
  },
  {
    id: 'ref-05-02',
    title: 'Grafana Docs — Alerting',
    url: 'https://grafana.com/docs/grafana/latest/alerting/',
    description: 'Panduan alert rules, contact points, dan notification policies di Grafana.',
    type: 'documentation',
  },
  {
    id: 'ref-05-03',
    title: 'Google SRE — Alerting on SLOs',
    url: 'https://sre.google/workbook/alerting-on-slos/',
    description: 'Panduan alerting berbasis SLO dan burn rate dari Google SRE Workbook.',
    type: 'documentation',
  },
  {
    id: 'ref-05-04',
    title: 'Datadog — Monitoring',
    url: 'https://docs.datadoghq.com/monitors/',
    description: 'Dokumentasi monitor dan alerting di platform observability Datadog.',
    type: 'documentation',
  },
  {
    id: 'ref-05-05',
    title: 'prometheus/client_golang',
    url: 'https://github.com/prometheus/client_golang',
    description: 'Library Go resmi untuk mengekspos metrik ke Prometheus.',
    type: 'documentation',
  },
]
