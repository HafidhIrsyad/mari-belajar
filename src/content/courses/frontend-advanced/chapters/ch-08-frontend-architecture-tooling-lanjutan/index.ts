import type { Chapter } from '@/content/types'
import { ch08Lesson } from './lesson'
import { ch08Quiz } from './quiz'
import { ch08References } from './references'

export const ch08FrontendArchitectureToolingLanjutan: Chapter = {
  id: 'ch-08-frontend-architecture-tooling-lanjutan',
  slug: 'ch-08-frontend-architecture-tooling-lanjutan',
  order: 8,
  title: 'Frontend Architecture & Tooling Lanjutan',
  summary:
    'Mempelajari arsitektur frontend skala besar melalui monorepo, pnpm workspaces, Turborepo, changesets, CI/CD frontend, module graph analysis, bundle analyzer, dan performance budget enforcement.',
  estimatedMinutes: 40,
  learningObjectives: [
    'Menjelaskan konsep monorepo dan pnpm workspaces.',
    'Menggunakan Turborepo untuk caching dan pipeline build.',
    'Mengelola versioning dan changelog dengan changesets.',
    'Merancang CI/CD untuk frontend dengan lint, test, dan build terpisah.',
    'Menganalisis module graph dan bundle size serta menegakkan performance budget.',
  ],
  summaryPoints: [
    'Monorepo menyederhanakan sharing code dan koordinasi antar package dalam satu repository.',
    'pnpm workspaces menghemat disk space dengan content-addressable store.',
    'Turborepo menyediakan remote caching dan task pipeline untuk mempercepat CI.',
    'Changesets membantu mengelola versi dan changelog antar package.',
    'Performance budget mencegah regresi ukuran bundle di CI.',
  ],
  references: ch08References,
  lesson: ch08Lesson,
  quiz: ch08Quiz,
}
