import { Badge } from '@/components/ui/badge'
import type { Chapter } from '@/content/types'

interface LessonHeaderProps {
  chapter: Chapter
  courseTitle: string
}

export function LessonHeader({ chapter, courseTitle }: LessonHeaderProps) {
  return (
    <header className="mb-8 space-y-4">
      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        <span>{courseTitle}</span>
        <span aria-hidden="true">•</span>
        <span>Bab {chapter.order}</span>
        {chapter.estimatedMinutes && (
          <>
            <span aria-hidden="true">•</span>
            <span>{chapter.estimatedMinutes} menit baca</span>
          </>
        )}
      </div>
      <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
        {chapter.title}
      </h1>
      <p className="text-lg text-muted-foreground">{chapter.summary}</p>
      <div className="flex flex-wrap gap-2">
        {chapter.learningObjectives?.map((objective, index) => (
          <Badge key={index} variant="secondary" className="font-normal">
            {objective}
          </Badge>
        ))}
      </div>
    </header>
  )
}
