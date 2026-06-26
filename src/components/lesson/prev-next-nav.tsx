import { Lock } from 'lucide-react'
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
  const isNextUnlocked = nextChapter
    ? isChapterUnlocked(course, nextChapter, progress)
    : false

  const prevPath = previousChapter
    ? `/courses/${course.slug}/${previousChapter.slug}`
    : `/courses/${course.slug}`
  const nextPath = nextChapter
    ? `/courses/${course.slug}/${nextChapter.slug}`
    : `/courses/${course.slug}`

  return (
    <div className="mt-12 flex items-center justify-between border-t border-border pt-8">
      <Button variant="outline" asChild>
        <Link to={prevPath}>← Bab Sebelumnya</Link>
      </Button>
      {isNextUnlocked ? (
        <Button asChild>
          <Link to={nextPath}>Bab Selanjutnya →</Link>
        </Button>
      ) : (
        <Button variant="outline" disabled>
          <Lock className="mr-2 h-4 w-4" />
          Terkunci
        </Button>
      )}
    </div>
  )
}
