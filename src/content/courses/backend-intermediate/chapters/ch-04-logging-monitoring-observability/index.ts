import type { Chapter } from '@/content/types'
import { ch04Lesson } from './lesson'
import { ch04Quiz } from './quiz'
import { ch04References } from './references'

export const ch04LoggingMonitoringObservability: Chapter = {
  id: 'ch-04-logging-monitoring-observability',
  slug: 'ch-04-logging-monitoring-observability',
  order: 4,
  title: 'Logging, Monitoring & Observability',
  summary:
    'Memahami logging terstruktur, metrics dengan Prometheus, health checks, distributed tracing dengan OpenTelemetry, serta konsep SLI/SLO dan alerting.',
  estimatedMinutes: 45,
  learningObjectives: [
    'Menerapkan structured logging dengan log level dan correlation ID.',
    'Menambahkan metrics dasar seperti counter dan histogram.',
    'Membuat health check yang membedakan liveness dan readiness.',
    'Memahami konsep trace, span, dan context propagation di OpenTelemetry.',
    'Menyusun SLI/SLO sederhana dan strategi alerting.',
  ],
  summaryPoints: [
    'Log terstruktur lebih mudah di-query dan dikorelasikan daripada log bebas.',
    'Correlation ID memungkinkan pelacakan request lintas service.',
    'Metrics counter/histogram memberikan gambaran performa dan throughput.',
    'Distributed tracing menunjukkan latensi di setiap hop dalam satu request.',
    'SLI adalah metrik, SLO adalah target, dan error budget menentukan kapan harus melambat.',
  ],
  references: ch04References,
  lesson: ch04Lesson,
  quiz: ch04Quiz,
}
