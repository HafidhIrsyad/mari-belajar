import type { Chapter } from '@/content/types'
import { ch07Lesson } from './lesson'
import { ch07Quiz } from './quiz'
import { ch07References } from './references'

export const ch07DeploymentStrategies: Chapter = {
  id: 'ch-07-deployment-strategies',
  slug: 'ch-07-deployment-strategies',
  order: 7,
  title: 'Deployment Strategies',
  summary:
    'Memahami strategi deployment: recreate, rolling, blue-green, canary, feature flags, progressive delivery, rollback, serta trade-off masing-masing.',
  estimatedMinutes: 40,
  learningObjectives: [
    'Membedakan recreate, rolling, blue-green, dan canary deployment.',
    'Menjelaskan trade-off downtime, risk, dan resource antar strategi.',
    'Menerapkan feature flags untuk mengontrol exposure fitur.',
    'Memahami progressive delivery dan automated canary analysis.',
    'Merancang rollback yang cepat dan aman.',
  ],
  summaryPoints: [
    'Setiap strategi deployment memiliki trade-off antara downtime, risiko, dan konsumsi resource.',
    'Rolling deployment memperbarui instance secara bertahap.',
    'Blue-green deployment menyediakan dua environment identik untuk switch instan.',
    'Canary deployment mengarahkan sebagian kecil traffic ke versi baru.',
    'Feature flags dan progressive delivery mengurangi risiko rilis tanpa deploy ulang.',
  ],
  references: ch07References,
  lesson: ch07Lesson,
  quiz: ch07Quiz,
}
