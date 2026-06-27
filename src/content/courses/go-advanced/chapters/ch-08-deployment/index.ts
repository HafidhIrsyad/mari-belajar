import type { Chapter } from '@/content/types'
import { ch08Lesson } from './lesson'
import { ch08Quiz } from './quiz'
import { ch08References } from './references'

export const ch08Deployment: Chapter = {
  id: 'ch-08-deployment',
  slug: 'ch-08-deployment',
  order: 8,
  title: 'Deployment & Production Readiness',
  summary:
    'Strategi deployment Go production: static binary, Docker multi-stage build, distroless/scratch image, health checks, observability, feature flags, dan canary deployment.',
  estimatedMinutes: 45,
  learningObjectives: [
    'Membangun static binary dan Docker multi-stage image untuk Go.',
    'Menggunakan distroless atau scratch untuk meminimalkan attack surface.',
    'Menerapkan health check dan graceful shutdown.',
    'Menambahkan observability dengan OpenTelemetry.',
    'Memahami konsep feature flags dan canary deployment.',
  ],
  summaryPoints: [
    'Go menghasilkan static binary yang mudah didistribusikan.',
    'Docker multi-stage build memisahkan build environment dari runtime image.',
    'Distroless dan scratch image mengurangi ukuran dan attack surface.',
    'Health check endpoint membantu orchestrator memutuskan status container.',
    'Observability meliputi logging, metrics, dan distributed tracing.',
    'Feature flags dan canary deployment mengurangi risiko rilis.',
  ],
  references: ch08References,
  lesson: ch08Lesson,
  quiz: ch08Quiz,
}
