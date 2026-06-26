import { useMemo } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import {
  ChevronRight,
  CircleCheck,
  Lock,
  PlayCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { getCourseBySlug } from '@/content'
import type { Chapter, Course, UserProgress } from '@/content/types'
import {
  courseCompletionPercentage,
  isChapterCompleted,
  isChapterUnlocked,
} from '@/lib/progress'
import { useProgressStore } from '@/stores/progressStore'

export function CourseDetailPage() {
  const { courseId } = useParams<{ courseId: string }>()
  const progress = useProgressStore((state) => state.progress)
  const course = useMemo(() => getCourseBySlug(courseId ?? ''), [courseId])

  if (!course) {
    return <Navigate to="/not-found" replace />
  }

  const completion = courseCompletionPercentage(course, progress)
  const completedCount =
    progress.courseProgress.find((cp) => cp.courseId === course.id)
      ?.completedChapterIds.length ?? 0

  return (
    <div className="container py-12 md:py-16">
        <div className="mb-8 max-w-3xl">
          <div className="mb-2 text-sm text-muted-foreground">
            <Link to="/courses" className="hover:text-foreground">
              Course
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{course.title}</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {course.title}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {course.description}
          </p>
          <div className="mt-6 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {completedCount} dari {course.chapters.length} bab selesai
              </span>
              <span className="font-medium">{completion}%</span>
            </div>
            <Progress value={completion} />
          </div>
        </div>

        <Separator className="mb-8" />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {course.chapters.map((chapter) => (
            <ChapterListItem
              key={chapter.id}
              course={course}
              chapter={chapter}
              progress={progress}
            />
          ))}
        </div>
    </div>
  )
}

interface ChapterListItemProps {
  course: Course
  chapter: Chapter
  progress: UserProgress
}

function ChapterListItem({ course, chapter, progress }: ChapterListItemProps) {
  const unlocked = isChapterUnlocked(course, chapter, progress)
  const completed = isChapterCompleted(course.id, chapter.id, progress)

  return (
    <Card
      className={`transition-all ${
        unlocked ? 'hover:shadow-md' : 'opacity-70'
      }`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground">
            Bab {chapter.order}
          </span>
          {completed ? (
            <CircleCheck className="h-5 w-5 text-success" />
          ) : unlocked ? (
            <PlayCircle className="h-5 w-5 text-primary" />
          ) : (
            <Lock className="h-5 w-5 text-muted-foreground" />
          )}
        </div>
        <CardTitle className="text-lg">{chapter.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
          {chapter.summary}
        </p>
        {unlocked ? (
          <Button asChild className="w-full" variant={completed ? 'outline' : 'default'}>
            <Link to={`/courses/${course.slug}/${chapter.slug}`}>
              {completed ? 'Ulas Kembali' : 'Buka Bab'}
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        ) : (
          <Button disabled className="w-full">
            <Lock className="mr-2 h-4 w-4" />
            Terkunci
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
