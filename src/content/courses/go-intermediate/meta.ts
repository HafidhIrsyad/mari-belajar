import type { CourseMeta } from '@/content/types'

export const goIntermediateMeta: CourseMeta = {
  id: 'go-intermediate',
  slug: 'go-intermediate',
  title: 'Go Intermediate',
  description:
    'Lanjutan pemrograman Go: concurrency dengan goroutine dan channel, context, sync primitives, HTTP server, middleware, JSON validation, database access, serta benchmarking dan profiling.',
  estimatedHours: 24,
  tags: ['go', 'golang', 'concurrency', 'backend', 'indonesian'],
  createdAt: '2026-06-27T00:00:00.000Z',
  chaptersCount: 8,
  firstChapterSlug: 'ch-01-goroutines-channels',
}
