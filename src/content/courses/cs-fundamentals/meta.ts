import type { Course } from '@/content/types'

export const csFundamentalsMeta: Omit<Course, 'chapters'> = {
  id: 'cs-fundamentals',
  slug: 'cs-fundamentals',
  title: 'Computer Science / Informatics Fundamentals',
  description:
    'Membangun fondasi ilmu komputer dari nol: bit, sistem bilangan, algoritma, struktur data, sistem operasi, jaringan, basis data, dan keamanan informasi.',
  estimatedHours: 24,
  tags: ['computer-science', 'fundamentals', 'indonesian'],
  createdAt: '2026-06-26T00:00:00.000Z',
}
