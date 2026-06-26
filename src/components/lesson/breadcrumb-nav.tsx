import { Link } from 'react-router-dom'
import type { Chapter, Course } from '@/content/types'

interface BreadcrumbNavProps {
  course: Course
  chapter: Chapter
}

export function BreadcrumbNav({ course, chapter }: BreadcrumbNavProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm font-medium text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link to="/" className="text-primary hover:underline">
            Beranda
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li>
          <Link to="/courses" className="text-primary hover:underline">
            Course
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li>
          <Link to={`/courses/${course.slug}`} className="text-primary hover:underline">
            {course.title}
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li aria-current="page" className="max-w-[200px] truncate text-foreground sm:max-w-xs">
          {chapter.title}
        </li>
      </ol>
    </nav>
  )
}
