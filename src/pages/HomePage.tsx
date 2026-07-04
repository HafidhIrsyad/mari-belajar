import { BookOpen, Layers, Trophy } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageContainer } from '@/components/layout/page-container'
import { TrackCard } from '@/components/course/track-card'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { courseMetas, courseTracks } from '@/content'

const totalChapters = courseMetas.reduce(
  (sum, course) => sum + course.chaptersCount,
  0
)

export function HomePage() {
  const firstCourse = courseMetas[0]

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="py-20 lg:py-24">
        <PageContainer>
          <div className="max-w-[55ch]">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              ✦ Belajar software engineering dari nol
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-foreground lg:text-5xl">
              Belajar ilmu komputer dari dasar, secara bertahap.
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Kurikulum lengkap dalam Bahasa Indonesia — dari fondasi computer
              science hingga frontend, backend, database, dan DevOps. Track
              Computer Science memakai contoh Go; track lainnya JavaScript,
              TypeScript, dan Go.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link to="/courses">Mulai Belajar</Link>
              </Button>
              {firstCourse && (
                <Button asChild size="lg" variant="outline">
                  <Link
                    to={`/courses/${firstCourse.slug}/${firstCourse.firstChapterSlug}`}
                  >
                    Langsung ke Bab 1
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </PageContainer>
      </section>

      {/* Value Proposition */}
      <section className="border-t border-border py-16 lg:py-24">
        <PageContainer>
          <div className="mb-12 max-w-[55ch]">
            <h2 className="text-3xl font-bold tracking-tight">
              Belajar Secara Bertahap
            </h2>
            <p className="mt-4 text-muted-foreground">
              Setiap bab di semua course mengikuti pola yang sama: konsep dasar,
              penerapan menengah, lalu deep dive lanjut — disertai contoh kode
              dan quiz 8 soal.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <ValueCard
              icon={BookOpen}
              title="Basic"
              description="Konsep inti dijelaskan dari nol dengan analogi dan contoh JavaScript yang bisa langsung dicoba. Cocok untuk pemula tanpa asumsi latar belakang teknis."
            />
            <ValueCard
              icon={Layers}
              title="Intermediate"
              description="Edge cases, best practices, dan implementasi TypeScript dengan tipe eksplisit. Fokus pada pola yang sering dipakai di proyek nyata."
            />
            <ValueCard
              icon={Trophy}
              title="Advanced"
              description="Internals, performance, trade-offs, dan perbandingan arsitektur dengan Go. Memahami cara kerja di balik layar, bukan hanya sintaks."
            />
          </div>
        </PageContainer>
      </section>

      {/* Course Preview */}
      <section className="border-t border-border py-16 lg:py-24">
        <PageContainer>
          <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-[55ch]">
              <h2 className="text-3xl font-bold tracking-tight">
                Course yang Tersedia
              </h2>
              <p className="mt-4 text-muted-foreground">
                {courseMetas.length} course dalam {courseTracks.length} learning
                track, total {totalChapters} bab — dari Computer Science hingga
                DevOps.
              </p>
            </div>
            <Button asChild variant="outline" className="shrink-0">
              <Link to="/courses">Lihat Semua Course</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {courseTracks.map((track) => (
              <TrackCard key={track.id} track={track} />
            ))}
          </div>
        </PageContainer>
      </section>
    </div>
  )
}

function ValueCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType
  title: string
  description: string
}) {
  return (
    <Card className="flex h-full flex-col transition-colors hover:border-[#D0C8B8]">
      <CardHeader>
        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-[0.9375rem] leading-relaxed text-muted-foreground">
          {description}
        </p>
      </CardContent>
    </Card>
  )
}
