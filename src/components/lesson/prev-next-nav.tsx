import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import type { Chapter, Course } from '@/content/types'
import type { UserProgress } from '@/content/types'
import { getNextChapter, getPreviousChapter } from '@/content'
import { isChapterUnlocked } from '@/lib/progress'

interface PrevNextNavProps {
  course: Course
  currentChapter: Chapter
  progress: UserProgress
}

export function PrevNextNav({
  course,
  currentChapter,
  progress,
}: PrevNextNavProps) {
  const previousChapter = getPreviousChapter(course, currentChapter.id)
  const nextChapter = getNextChapter(course, currentChapter.id)
  const nextUnlocked = nextChapter
    ? isChapterUnlocked(course, nextChapter, progress)
    : false

  return (
    <nav
      aria-label="Chapter navigation"
      className="mt-12 flex items-center justify-between border-t pt-8"
    >
      {previousChapter ? (
        <Button variant="outline" asChild>
          <Link to={`/courses/${course.slug}/${previousChapter.slug}`}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Sebelumnya
          </Link>
        </Button>
      ) : (
        <div />
      )}

      <Button variant="outline" asChild>
        <Link to={`/courses/${course.slug}`}>Kembali ke Course</Link>
      </Button>

      {nextChapter ? (
        <Button asChild disabled={!nextUnlocked}>
          <Link
            to={
              nextUnlocked
                ? `/courses/${course.slug}/${nextChapter.slug}`
                : `#`
            }
            className={!nextUnlocked ? 'pointer-events-none opacity-50' : ''}
          >
            Selanjutnya
            <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      ) : (
        <Button variant="secondary" asChild>
          <Link to={`/courses/${course.slug}`}>Selesai</Link>
        </Button>
      )}
    </nav>
  )
}
