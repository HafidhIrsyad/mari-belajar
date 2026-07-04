import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { CourseMeta } from '@/content/types'

interface CourseCardProps {
  course: CourseMeta
  levelLabel?: string
}

export function CourseCard({ course, levelLabel }: CourseCardProps) {
  return (
    <Card className="flex h-full flex-col transition-colors hover:border-[#D0C8B8]">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          {levelLabel ? (
            <span className="text-xs font-medium text-muted-foreground">
              {levelLabel}
            </span>
          ) : (
            <span className="text-xs font-medium text-muted-foreground">
              {course.chaptersCount} bab
            </span>
          )}
          <span className="text-xs text-muted-foreground">
            ~{course.estimatedHours ?? '-'} jam
          </span>
        </div>
        <CardTitle className="text-lg">{course.title}</CardTitle>
      </CardHeader>
      <CardContent className="mt-auto">
        <p className="mb-4 text-sm text-muted-foreground line-clamp-3">
          {course.description}
        </p>
        <Button asChild className="w-full">
          <Link to={`/courses/${course.slug}`}>
            Lihat Course
            <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
