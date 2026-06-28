import type { Chapter } from '@/content/types'
import { ch05ObservabilityStackLesson } from './lesson'
import { ch05ObservabilityStackQuiz } from './quiz'
import { ch05ObservabilityStackReferences } from './references'

export const ch05ObservabilityStack: Chapter = {
  id: "ch-05-observability-stack",
  slug: "ch-05-observability-stack",
  order: 5,
  title: "Observability Stack",
  summary: "Menguasai tiga pilar observability (logs, metrics, traces), OpenTelemetry, stack LGTM/Prometheus/Grafana, distributed tracing, correlation ID, dan tail-based sampling.",
  estimatedMinutes: 50,
  learningObjectives: [
    "Membedakan logs, metrics, dan traces serta kapan menggunakannya.",
    "Menginstrumentasi aplikasi dengan OpenTelemetry.",
    "Memahami arsitektur collector, exporter, dan backend observability.",
    "Menerapkan correlation ID untuk debugging distributed system.",
    "Mengelola cardinality dan sampling pada traces.",
  ],
  summaryPoints: [
    "Logs merekam event detail, metrics memberikan agregat numerik, traces mengikuti alur request antar service.",
    "OpenTelemetry menyediakan standar instrumentation dan collector untuk logs, metrics, traces.",
    "Correlation ID memungkinkan penelusuran request di seluruh distributed system.",
    "Tail-based sampling menyimpan trace menarik setelah selesai, head-based sampling memutuskan di awal.",
    "High cardinality dapat membuat metrics tidak efisien dan mahal.",
  ],
  references: ch05ObservabilityStackReferences,
  lesson: ch05ObservabilityStackLesson,
  quiz: ch05ObservabilityStackQuiz,
}
