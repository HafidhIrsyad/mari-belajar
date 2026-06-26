import { ChevronRight, Home } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Chapter, Course } from '@/content/types'

interface BreadcrumbNavProps {
  course: Course
  chapter: Chapter
}

export function BreadcrumbNav({ course, chapter }: BreadcrumbNavProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        <li>
          <Link to="/" className="flex items-center hover:text-foreground">
            <Home className="mr-1 h-4 w-4" />
            Beranda
          </Link>
        </li>
        <li>
          <ChevronRight className="h-4 w-4" />
        </li>
        <li>
          <Link to="/courses" className="hover:text-foreground">
            Course
          </Link>
        </li>
        <li>
          <ChevronRight className="h-4 w-4" />
        </li>
        <li>
          <Link to={`/courses/${course.slug}`} className="hover:text-foreground">
            {course.title}
          </Link>
        </li>
        <li>
          <ChevronRight className="h-4 w-4" />
        </li>
        <li className="max-w-[200px] truncate font-medium text-foreground sm:max-w-xs">
          {chapter.title}
        </li>
      </ol>
    </nav>
  )
}
