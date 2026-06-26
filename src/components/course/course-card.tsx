import { ArrowRight, BookOpen, CheckCircle, PlayCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import type { Course } from '@/content/types'
import type { UserProgress } from '@/content/types'
import { courseCompletionPercentage, isChapterUnlocked } from '@/lib/progress'

interface CourseCardProps {
  course: Course
  progress: UserProgress
}

export function CourseCard({ course, progress }: CourseCardProps) {
  const firstChapter = course.chapters[0]
  const completion = courseCompletionPercentage(course, progress)
  const completedCount =
    progress.courseProgress.find((cp) => cp.courseId === course.id)
      ?.completedChapterIds.length ?? 0
  const totalChapters = course.chapters.length

  let ctaHref = `/courses/${course.slug}`
  let ctaLabel = 'Mulai Belajar'
  let ctaIcon = <PlayCircle className="ml-2 h-4 w-4" />

  if (completedCount > 0) {
    const nextUnlockedChapter = course.chapters.find((chapter) =>
      isChapterUnlocked(course, chapter, progress) &&
      !progress.courseProgress
        .find((cp) => cp.courseId === course.id)
        ?.completedChapterIds.includes(chapter.id)
    )
    if (nextUnlockedChapter) {
      ctaHref = `/courses/${course.slug}/${nextUnlockedChapter.slug}`
      ctaLabel = 'Lanjutkan'
      ctaIcon = <ArrowRight className="ml-2 h-4 w-4" />
    } else if (completedCount === totalChapters) {
      ctaHref = `/courses/${course.slug}`
      ctaLabel = 'Selesai'
      ctaIcon = <CheckCircle className="ml-2 h-4 w-4" />
    }
  } else if (firstChapter) {
    ctaHref = `/courses/${course.slug}/${firstChapter.slug}`
  }

  return (
    <Card className="flex flex-col transition-shadow hover:shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <Badge variant="outline">{course.tags?.[0] ?? 'Course'}</Badge>
          <BookOpen className="h-5 w-5 text-muted-foreground" />
        </div>
        <CardTitle className="mt-2 text-xl">{course.title}</CardTitle>
        <CardDescription>{course.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            {completedCount} dari {totalChapters} bab selesai
          </span>
          <span className="font-medium">{completion}%</span>
        </div>
        <Progress value={completion} />
        {course.estimatedHours && (
          <p className="mt-3 text-xs text-muted-foreground">
            Estimasi waktu: {course.estimatedHours} jam
          </p>
        )}
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link to={ctaHref}>
            {ctaLabel}
            {ctaIcon}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
