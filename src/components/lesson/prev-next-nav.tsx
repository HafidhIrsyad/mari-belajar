import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import type { Chapter, Course } from '@/content/types'
import type { UserProgress } from '@/content/types'
import { isChapterUnlocked } from '@/lib/progress'

interface PrevNextNavProps {
  course: Course
  currentChapter: Chapter
  progress: UserProgress
}

function getNextChapter(course: Course, currentChapterId: string): Chapter | undefined {
  const current = course.chapters.find((c) => c.id === currentChapterId)
  if (!current) return undefined
  return course.chapters.find((c) => c.order === current.order + 1)
}

function getPreviousChapter(course: Course, currentChapterId: string): Chapter | undefined {
  const current = course.chapters.find((c) => c.id === currentChapterId)
  if (!current) return undefined
  return course.chapters.find((c) => c.order === current.order - 1)
}

export function PrevNextNav({
  course,
  currentChapter,
  progress,
}: PrevNextNavProps) {
  const previousChapter = getPreviousChapter(course, currentChapter.id)
  const nextChapter = getNextChapter(course, currentChapter.id)
  const isNextUnlocked = nextChapter
    ? isChapterUnlocked(course, nextChapter, progress)
    : false

  return (
    <nav
      aria-label="Chapter navigation"
      className="mt-12 flex items-center justify-between border-t border-border pt-8"
    >
      <Button variant="outline" asChild>
        <Link
          to={
            previousChapter
              ? `/courses/${course.slug}/${previousChapter.slug}`
              : `/courses/${course.slug}`
          }
        >
          {previousChapter ? '← Bab Sebelumnya' : '← Kembali ke Course'}
        </Link>
      </Button>

      {nextChapter ? (
        <Button asChild disabled={!isNextUnlocked}>
          <Link
            to={
              isNextUnlocked
                ? `/courses/${course.slug}/${nextChapter.slug}`
                : `#`
            }
            className={!isNextUnlocked ? 'pointer-events-none opacity-50' : ''}
          >
            Bab Selanjutnya →
          </Link>
        </Button>
      ) : (
        <Button variant="secondary" asChild>
          <Link to={`/courses/${course.slug}`}>Selesai →</Link>
        </Button>
      )}
    </nav>
  )
}
