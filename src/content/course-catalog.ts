import type { CourseMeta } from './types'
import { backendAdvancedMeta } from './courses/backend-advanced/meta'
import { backendBasicMeta } from './courses/backend-basic/meta'
import { backendIntermediateMeta } from './courses/backend-intermediate/meta'
import { csFundamentalsMeta } from './courses/cs-fundamentals/meta'
import { csIntermediateMeta } from './courses/cs-intermediate/meta'
import { csAdvancedMeta } from './courses/cs-advanced/meta'
import { databaseAdvancedMeta } from './courses/database-advanced/meta'
import { databaseBasicMeta } from './courses/database-basic/meta'
import { databaseIntermediateMeta } from './courses/database-intermediate/meta'
import { devopsAdvancedMeta } from './courses/devops-advanced/meta'
import { devopsBasicMeta } from './courses/devops-basic/meta'
import { devopsIntermediateMeta } from './courses/devops-intermediate/meta'
import { frontendAdvancedMeta } from './courses/frontend-advanced/meta'
import { frontendBasicMeta } from './courses/frontend-basic/meta'
import { frontendIntermediateMeta } from './courses/frontend-intermediate/meta'
import { goAdvancedMeta } from './courses/go-advanced/meta'
import { goFundamentalMeta } from './courses/go-fundamental/meta'
import { goIntermediateMeta } from './courses/go-intermediate/meta'
import { jsTsAdvancedMeta } from './courses/js-ts-advanced/meta'
import { jsTsFundamentalMeta } from './courses/js-ts-fundamental/meta'
import { jsTsIntermediateMeta } from './courses/js-ts-intermediate/meta'

export interface CourseTrack {
  id: string
  title: string
  description: string
  courses: CourseMeta[]
}

const courseBySlug: Record<string, CourseMeta> = {
  'cs-fundamentals': csFundamentalsMeta,
  'cs-intermediate': csIntermediateMeta,
  'cs-advanced': csAdvancedMeta,
  'js-ts-fundamental': jsTsFundamentalMeta,
  'js-ts-intermediate': jsTsIntermediateMeta,
  'js-ts-advanced': jsTsAdvancedMeta,
  'go-fundamental': goFundamentalMeta,
  'go-intermediate': goIntermediateMeta,
  'go-advanced': goAdvancedMeta,
  'frontend-basic': frontendBasicMeta,
  'frontend-intermediate': frontendIntermediateMeta,
  'frontend-advanced': frontendAdvancedMeta,
  'backend-basic': backendBasicMeta,
  'backend-intermediate': backendIntermediateMeta,
  'backend-advanced': backendAdvancedMeta,
  'database-basic': databaseBasicMeta,
  'database-intermediate': databaseIntermediateMeta,
  'database-advanced': databaseAdvancedMeta,
  'devops-basic': devopsBasicMeta,
  'devops-intermediate': devopsIntermediateMeta,
  'devops-advanced': devopsAdvancedMeta,
}

/** Roadmap order: M2 → M20, grouped by learning track. */
const trackDefinitions = [
  {
    id: 'computer-science',
    title: 'Computer Science',
    description: 'Fondasi ilmu komputer sebelum masuk ke bahasa atau stack tertentu.',
    slugs: ['cs-fundamentals', 'cs-intermediate', 'cs-advanced'],
  },
  {
    id: 'javascript-typescript',
    title: 'JavaScript / TypeScript',
    description: 'Dari syntax dasar hingga runtime internals dan type-level programming.',
    slugs: ['js-ts-fundamental', 'js-ts-intermediate', 'js-ts-advanced'],
  },
  {
    id: 'go',
    title: 'Go',
    description: 'Bahasa Go untuk backend, concurrency, dan sistem production-ready.',
    slugs: ['go-fundamental', 'go-intermediate', 'go-advanced'],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    description: 'HTML, CSS, React, performance, dan arsitektur frontend modern.',
    slugs: ['frontend-basic', 'frontend-intermediate', 'frontend-advanced'],
  },
  {
    id: 'backend',
    title: 'Backend',
    description: 'HTTP, REST API, auth, observability, hingga distributed systems.',
    slugs: ['backend-basic', 'backend-intermediate', 'backend-advanced'],
  },
  {
    id: 'database',
    title: 'Database',
    description: 'Model relasional, SQL, optimasi, replication, dan NoSQL.',
    slugs: ['database-basic', 'database-intermediate', 'database-advanced'],
  },
  {
    id: 'devops',
    title: 'DevOps',
    description: 'Git, CI/CD, container, cloud, Kubernetes, dan SRE practices.',
    slugs: ['devops-basic', 'devops-intermediate', 'devops-advanced'],
  },
] as const

export const courseTracks: CourseTrack[] = trackDefinitions.map((track) => ({
  id: track.id,
  title: track.title,
  description: track.description,
  courses: track.slugs.map((slug) => courseBySlug[slug]),
}))

export const courseMetas: CourseMeta[] = courseTracks.flatMap(
  (track) => track.courses
)
