import type { Chapter } from '@/content/types'
import { ch07PlatformEngineeringLesson } from './lesson'
import { ch07PlatformEngineeringQuiz } from './quiz'
import { ch07PlatformEngineeringReferences } from './references'

export const ch07PlatformEngineering: Chapter = {
  id: "ch-07-platform-engineering",
  slug: "ch-07-platform-engineering",
  order: 7,
  title: "Platform Engineering",
  summary: "Membangun Internal Developer Platform (IDP), golden paths, self-service infrastructure dengan Backstage/Port, dan metrik developer experience.",
  estimatedMinutes: 45,
  learningObjectives: [
      "Memahami konsep Internal Developer Platform (IDP).",
      "Merancang golden paths untuk common use cases.",
      "Mengimplementasikan self-service infrastructure.",
      "Menggunakan Backstage atau Port sebagai platform portal.",
      "Mengukur developer experience dan cognitive load."
  ],
  summaryPoints: [
      "IDP adalah produk internal yang mempercepat delivery tim developer.",
      "Golden path adalah cara standar dan didukung untuk common tasks.",
      "Self-service mengurangi toil dan ticket queue ke platform team.",
      "Backstage menyediakan service catalog, templates, dan plugin ecosystem.",
      "Developer experience metrics: deployment frequency, lead time, satisfaction."
  ],
  references: ch07PlatformEngineeringReferences,
  lesson: ch07PlatformEngineeringLesson,
  quiz: ch07PlatformEngineeringQuiz,
}
