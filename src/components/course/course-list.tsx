import { CourseCard } from './course-card'
import type { Course } from '@/content/types'
import type { UserProgress } from '@/content/types'

interface CourseListProps {
  courses: Course[]
  progress: UserProgress
}

export function CourseList({ courses, progress }: CourseListProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} progress={progress} />
      ))}
    </div>
  )
}
