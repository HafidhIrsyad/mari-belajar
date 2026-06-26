import type { Chapter, Course } from '@/content/types'
import { csFundamentals } from './courses/cs-fundamentals'

export type { Chapter, Course }
export * from './types'

export const courses: Course[] = [csFundamentals]

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((course) => course.slug === slug)
}

export function getCourseById(id: string): Course | undefined {
  return courses.find((course) => course.id === id)
}

export function getChapterBySlug(
  courseSlug: string,
  chapterSlug: string
): Chapter | undefined {
  const course = getCourseBySlug(courseSlug)
  if (!course) return undefined
  return course.chapters.find((chapter) => chapter.slug === chapterSlug)
}

export function getChapterById(
  courseId: string,
  chapterId: string
): Chapter | undefined {
  const course = getCourseById(courseId)
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
