import type { Chapter, Course, CourseMeta } from './types'
import { courseMetas, courseTracks } from './course-catalog'

export type { Chapter, Course, CourseMeta }
export type { CourseTrack } from './course-catalog'
export { courseMetas, courseTracks }
export * from './types'

export function getCourseMetaBySlug(slug: string): CourseMeta | undefined {
  return courseMetas.find((course) => course.slug === slug)
}

export function getCourseMetaById(id: string): CourseMeta | undefined {
  return courseMetas.find((course) => course.id === id)
}

function slugToExportKey(slug: string): string {
  return slug.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())
}

const courseLoaders: Record<string, () => Promise<Record<string, Course>>> = {
  'backend-advanced': () => import('./courses/backend-advanced'),
  'backend-basic': () => import('./courses/backend-basic'),
  'backend-intermediate': () => import('./courses/backend-intermediate'),
  'cs-fundamentals': () => import('./courses/cs-fundamentals'),
  'cs-intermediate': () => import('./courses/cs-intermediate'),
  'cs-advanced': () => import('./courses/cs-advanced'),
  'database-advanced': () => import('./courses/database-advanced'),
  'database-basic': () => import('./courses/database-basic'),
  'database-intermediate': () => import('./courses/database-intermediate'),
  'devops-basic': () => import('./courses/devops-basic'),
  'devops-intermediate': () => import('./courses/devops-intermediate'),
  'devops-advanced': () => import('./courses/devops-advanced'),
  'frontend-advanced': () => import('./courses/frontend-advanced'),
  'frontend-basic': () => import('./courses/frontend-basic'),
  'frontend-intermediate': () => import('./courses/frontend-intermediate'),
  'go-advanced': () => import('./courses/go-advanced'),
  'go-fundamental': () => import('./courses/go-fundamental'),
  'go-intermediate': () => import('./courses/go-intermediate'),
  'js-ts-fundamental': () => import('./courses/js-ts-fundamental'),
  'js-ts-intermediate': () => import('./courses/js-ts-intermediate'),
  'js-ts-advanced': () => import('./courses/js-ts-advanced'),
}

export async function loadCourseBySlug(slug: string): Promise<Course | undefined> {
  const loader = courseLoaders[slug]
  if (!loader) return undefined
  const module = await loader()
  const key = slugToExportKey(slug)
  return module[key]
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
