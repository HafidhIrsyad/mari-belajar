import { CourseCard } from './course-card'
import type { CourseMeta } from '@/content/types'

interface CourseListProps {
  courses: CourseMeta[]
}

export function CourseList({ courses }: CourseListProps) {
  return (
    <div className="space-y-4">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  )
}
