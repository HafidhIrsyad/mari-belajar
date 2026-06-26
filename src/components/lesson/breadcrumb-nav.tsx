import { Link } from 'react-router-dom'
import type { Chapter, Course } from '@/content/types'

interface BreadcrumbNavProps {
  course: Course
  chapter: Chapter
}

export function BreadcrumbNav({ course, chapter }: BreadcrumbNavProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm font-medium text-muted-foreground">
      <Link to="/" className="text-primary hover:underline">
        Beranda
      </Link>
      <span className="mx-2">/</span>
      <Link to="/courses" className="text-primary hover:underline">
        Course
      </Link>
      <span className="mx-2">/</span>
      <Link to={`/courses/${course.slug}`} className="text-primary hover:underline">
        {course.title}
      </Link>
      <span className="mx-2">/</span>
      <span>{chapter.title}</span>
    </nav>
  )
}
