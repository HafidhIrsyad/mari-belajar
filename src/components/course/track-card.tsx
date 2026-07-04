import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { CourseTrack } from '@/content/course-catalog'

interface TrackCardProps {
  track: CourseTrack
}

export function TrackCard({ track }: TrackCardProps) {
  const totalChapters = track.courses.reduce(
    (sum, course) => sum + course.chaptersCount,
    0
  )

  return (
    <Card className="flex h-full flex-col transition-colors hover:border-[#D0C8B8]">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
          <span>
            {track.courses.length}{' '}
            {track.courses.length === 1 ? 'course' : 'course'}
          </span>
          <span>{totalChapters} bab</span>
        </div>
        <CardTitle className="text-lg">{track.title}</CardTitle>
      </CardHeader>
      <CardContent className="mt-auto">
        <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
          {track.description}
        </p>
        <Button asChild className="w-full" variant="outline">
          <Link to="/courses">
            Jelajahi Track
            <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
