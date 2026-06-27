import type { Chapter, Course, CourseMeta } from './types'
import { csFundamentalsMeta } from './courses/cs-fundamentals/meta'

export type { Chapter, Course, CourseMeta }
export * from './types'

export const courseMetas: CourseMeta[] = [csFundamentalsMeta]

export function getCourseMetaBySlug(slug: string): CourseMeta | undefined {
  return courseMetas.find((course) => course.slug === slug)
}

export function getCourseMetaById(id: string): CourseMeta | undefined {
  return courseMetas.find((course) => course.id === id)
}

const courseLoaders: Record<string, () => Promise<{ csFundamentals: Course }>> = {
  'cs-fundamentals': () => import('./courses/cs-fundamentals'),
}

export async function loadCourseBySlug(slug: string): Promise<Course | undefined> {
  const loader = courseLoaders[slug]
  if (!loader) return undefined
  const module = await loader()
  return module.csFundamentals
}

export async function loadCourseById(id: string): Promise<Course | undefined> {
  const meta = getCourseMetaById(id)
  return meta ? loadCourseBySlug(meta.slug) : undefined
}

export async function loadChapterBySlug(
  courseSlug: string,
  chapterSlug: string
): Promise<Chapter | undefined> {
  const course = await loadCourseBySlug(courseSlug)
  if (!course) return undefined
  return course.chapters.find((chapter) => chapter.slug === chapterSlug)
}

export async function loadChapterById(
  courseId: string,
  chapterId: string
): Promise<Chapter | undefined> {
  const course = await loadCourseById(courseId)
  if (!course) return undefined
  return course.chapters.find((chapter) => chapter.id === chapterId)
}

export function getNextChapter(
  course: Course,
  currentChapterId: string
): Chapter | undefined {
  const current = course.chapters.find((c) => c.id === currentChapterId)
  if (!current) return undefined
  return course.chapters.find((c) => c.order === current.order + 1)
}

export function getPreviousChapter(
  course: Course,
  currentChapterId: string
): Chapter | undefined {
  const current = course.chapters.find((c) => c.id === currentChapterId)
  if (!current) return undefined
  return course.chapters.find((c) => c.order === current.order - 1)
}
