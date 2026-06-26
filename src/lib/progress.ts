import type { Chapter, Course, Quiz, UserProgress } from '@/content/types'

export function getCourseProgress(
  progress: UserProgress,
  courseId: string
): import('@/content/types').CourseProgress | undefined {
  return progress.courseProgress.find((cp) => cp.courseId === courseId)
}

export function isChapterUnlocked(
  course: Course,
  chapter: Chapter,
  progress: UserProgress
): boolean {
  if (chapter.order === 1) return true

  const previousChapter = course.chapters.find(
    (c) => c.order === chapter.order - 1
  )
  if (!previousChapter) return false

  const courseRecord = getCourseProgress(progress, course.id)
  if (!courseRecord) return false

  return courseRecord.completedChapterIds.includes(previousChapter.id)
}

export function isChapterCompleted(
  courseId: string,
  chapterId: string,
  progress: UserProgress
): boolean {
  const record = getCourseProgress(progress, courseId)
  return record?.completedChapterIds.includes(chapterId) ?? false
}

export function evaluateQuiz(
  quiz: Quiz,
  answers: number[]
): { score: number; passed: boolean } {
  let score = 0
  quiz.questions.forEach((question, index) => {
    if (answers[index] === question.correctOptionIndex) {
      score += 1
    }
  })
  const passed = score >= quiz.passingScore
  return { score, passed }
}

export function courseCompletionPercentage(
  course: Course,
  progress: UserProgress
): number {
  const record = getCourseProgress(progress, course.id)
  const completed = record?.completedChapterIds.length ?? 0
  return Math.round((completed / course.chapters.length) * 100)
}
