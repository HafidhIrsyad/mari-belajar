import { CheckCircle, CircleCheck, Lock, PlayCircle } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import type { Chapter, Course } from '@/content/types'
import type { UserProgress } from '@/content/types'
import { isChapterCompleted, isChapterUnlocked } from '@/lib/progress'

interface ChapterSidebarProps {
  course: Course
  progress: UserProgress
  className?: string
}

export function ChapterSidebar({ course, progress, className }: ChapterSidebarProps) {
  const { chapterId } = useParams<{ chapterId: string }>()

  return (
    <aside
      className={cn(
        'w-[280px] shrink-0 border-r bg-background',
        !className && 'hidden lg:block',
        className
      )}
    >
      <div className="sticky top-14 h-[calc(100vh-3.5rem)]">
        <ScrollArea className="h-full px-4 py-6">
          <h2 className="mb-2 px-2 text-sm font-semibold tracking-tight">
            {course.title}
          </h2>
          <p className="mb-4 px-2 text-xs text-muted-foreground">
            {course.chapters.length} bab
          </p>
          <Separator className="mb-4" />
          <nav aria-label="Chapter navigation" className="space-y-1">
            {course.chapters.map((chapter) => {
              const unlocked = isChapterUnlocked(course, chapter, progress)
              const completed = isChapterCompleted(course.id, chapter.id, progress)
              const isCurrent = chapter.id === chapterId

              return (
                <ChapterSidebarItem
                  key={chapter.id}
                  course={course}
                  chapter={chapter}
                  unlocked={unlocked}
                  completed={completed}
                  isCurrent={isCurrent}
                />
              )
            })}
          </nav>
        </ScrollArea>
      </div>
    </aside>
  )
}

interface ChapterSidebarItemProps {
  course: Course
  chapter: Chapter
  unlocked: boolean
  completed: boolean
  isCurrent: boolean
}

function ChapterSidebarItem({
  course,
  chapter,
  unlocked,
  completed,
  isCurrent,
}: ChapterSidebarItemProps) {
  const baseClasses =
    'group flex min-h-[44px] items-center gap-3 rounded-md border-l-[3px] px-3 py-2 text-sm transition-colors'

  if (!unlocked) {
    return (
      <div
        className={cn(
          baseClasses,
          'border-transparent text-muted-foreground',
          isCurrent && 'bg-muted/50'
        )}
        title="Bab terkunci. Selesaikan bab sebelumnya dengan skor 100%."
      >
        <Lock className="h-[18px] w-[18px] shrink-0" />
        <span className="line-clamp-2">{chapter.order}. {chapter.title}</span>
      </div>
    )
  }

  return (
    <Link
      to={`/courses/${course.slug}/${chapter.slug}`}
      className={cn(
        baseClasses,
        isCurrent
          ? 'border-primary bg-primary/5 font-medium text-foreground'
          : 'border-transparent text-muted-foreground hover:bg-muted hover:text-foreground',
        completed && !isCurrent && 'text-success'
      )}
    >
      {completed ? (
        <CircleCheck className="h-[18px] w-[18px] shrink-0 text-success" />
      ) : isCurrent ? (
        <PlayCircle className="h-[18px] w-[18px] shrink-0 text-primary" />
      ) : (
        <CheckCircle className="h-[18px] w-[18px] shrink-0 opacity-0 group-hover:opacity-50" />
      )}
      <span className="line-clamp-2">{chapter.order}. {chapter.title}</span>
    </Link>
  )
}
