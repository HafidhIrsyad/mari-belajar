import { CourseCard } from './course-card'
import type { CourseTrack } from '@/content/course-catalog'

interface CourseListProps {
  tracks: CourseTrack[]
}

const levelPatterns: [RegExp, string][] = [
  [/-fundamental$/, 'Fundamental'],
  [/-basic$/, 'Basic'],
  [/-intermediate$/, 'Intermediate'],
  [/-advanced$/, 'Advanced'],
]

function getLevelLabel(slug: string): string | undefined {
  for (const [pattern, label] of levelPatterns) {
    if (pattern.test(slug)) return label
  }
  return undefined
}

export function CourseList({ tracks }: CourseListProps) {
  return (
    <div className="space-y-12">
      {tracks.map((track) => (
        <section key={track.id}>
          <div className="mb-6 max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              {track.title}
            </h2>
            <p className="mt-2 text-muted-foreground">{track.description}</p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {track.courses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                levelLabel={getLevelLabel(course.slug)}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
