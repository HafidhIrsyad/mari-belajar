import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { Course } from '@/content/types'

interface CourseCardProps {
  course: Course
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Card className="flex flex-col transition-colors hover:border-[#D0C8B8] sm:flex-row sm:items-center sm:justify-between">
      <CardHeader className="pb-4 sm:pb-0">
        <CardTitle className="text-xl font-semibold">{course.title}</CardTitle>
        <CardDescription className="mt-2 text-[0.9375rem] leading-relaxed">
          {course.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0 sm:pt-6">
        <Button asChild>
          <Link to={`/courses/${course.slug}`}>Lihat Course</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
