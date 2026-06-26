import { Badge } from '@/components/ui/badge'
import type { Chapter } from '@/content/types'

interface LessonHeaderProps {
  chapter: Chapter
  courseTitle: string
}

export function LessonHeader({ chapter, courseTitle: _courseTitle }: LessonHeaderProps) {
  return (
    <header className="mb-8 border-b border-border pb-8">
      <h1 className="text-3xl font-bold leading-[1.15] tracking-tight text-foreground lg:text-4xl">
        {chapter.title}
      </h1>
      <div className="mt-4 flex flex-wrap items-center gap-3 text-[0.9375rem] text-muted-foreground">
        <Badge variant="basic">Basic</Badge>
        <Badge variant="intermediate">Intermediate</Badge>
        <Badge variant="advanced">Advanced</Badge>
        <span>• {chapter.estimatedMinutes ?? 14} menit baca</span>
      </div>
    </header>
  )
}
