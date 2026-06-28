import type { Chapter } from '@/content/types'
import { ch06Lesson } from './lesson'
import { ch06Quiz } from './quiz'
import { ch06References } from './references'

export const ch06MonitoringLogging: Chapter = {
  id: 'ch-06-monitoring-logging',
  slug: 'ch-06-monitoring-logging',
  order: 6,
  title: 'Monitoring & Logging Dasar',
  summary:
    'Memahami observability, golden signals, tipe metrik Prometheus, log aggregation, structured logging, SLI/SLO/SLA, alerting, dan praktik menghindari cardinality explosion.',
  estimatedMinutes: 45,
  learningObjectives: [
    'Menjelaskan tiga pilar observability: metrics, logs, dan traces.',
    'Mengidentifikasi empat golden signals: latency, traffic, errors, saturation.',
    'Membedakan tipe metrik Prometheus: counter, gauge, histogram, summary.',
    'Menerapkan structured logging dan log aggregation.',
    'Memahami SLI, SLO, SLA, dan praktik alerting yang efektif.',
  ],
  summaryPoints: [
    'Observability memungkinkan kita memahami keadaan sistem dari outputnya.',
    'Golden signals memberikan fokus pada latency, traffic, errors, dan saturation.',
    'Counter, gauge, histogram, dan summary memiliki karakteristik penggunaan yang berbeda.',
    'Structured logging memudahkan parsing dan korelasi dengan metrics.',
    'Alerting sebaiknya berdasarkan SLO dan gejala, bukan hanya cause.',
  ],
  references: ch06References,
  lesson: ch06Lesson,
  quiz: ch06Quiz,
}
