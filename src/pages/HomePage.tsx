import { BookOpen, Layers, Trophy } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { courseMetas } from '@/content'

export function HomePage() {
  const firstCourse = courseMetas[0]

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="px-6 py-20 lg:px-16 lg:py-24">
        <div className="max-w-[55ch]">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            ✦ Belajar software engineering dari nol
          </span>
          <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-foreground lg:text-5xl">
            Belajar ilmu komputer dari dasar, secara bertahap.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Fondasi computer science dalam Bahasa Indonesia. Dari bit hingga
            arsitektur sistem, dengan contoh kode JavaScript, TypeScript, dan
            Go.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link to="/courses">Mulai Belajar</Link>
            </Button>
            {firstCourse && (
              <Button asChild size="lg" variant="outline">
                <Link to={`/courses/${firstCourse.slug}/${firstCourse.firstChapterSlug}`}>
                  Langsung ke Bab 1
                </Link>
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="px-6 py-16 lg:px-16 lg:py-24">
        <div className="mb-12 max-w-[55ch]">
          <h2 className="text-3xl font-bold tracking-tight">
            Belajar Secara Bertahap
          </h2>
          <p className="mt-4 text-muted-foreground">
            Setiap bab disusun dari konsep dasar hingga penerapan lanjut.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ValueCard
            icon={BookOpen}
            title="Basic"
            description="Konsep intuitif tanpa asumsi teknis berat. Cocok untuk pemula yang baru mengenal ilmu komputer."
          />
          <ValueCard
            icon={Layers}
            title="Intermediate"
            description="Penerapan konsep dengan representasi data nyata, endianness, ASCII, Unicode, dan perbedaan compiler."
          />
          <ValueCard
            icon={Trophy}
            title="Advanced"
            description="Siklus CPU, layout memori, pointer, dan assembly untuk memahami cara program benar-benar berjalan."
          />
        </div>
      </section>

      {/* Course Preview */}
      <section className="px-6 py-16 lg:px-16 lg:py-24">
        <div className="mb-12 max-w-[55ch]">
          <h2 className="text-3xl font-bold tracking-tight">
            Course yang Tersedia
          </h2>
          <p className="mt-4 text-muted-foreground">
            Milestone 1 menyediakan fondasi Computer Science / Informatics.
          </p>
        </div>
        {firstCourse && (
          <Card className="max-w-2xl transition-colors hover:border-[#D0C8B8]">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                {firstCourse.title}
              </CardTitle>
              <CardDescription className="text-[0.9375rem] leading-relaxed text-muted-foreground">
                {firstCourse.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {firstCourse.chaptersCount} bab •{' '}
                  {firstCourse.estimatedHours ?? '-'} jam estimasi
                </span>
                <Button asChild>
                  <Link to={`/courses/${firstCourse.slug}`}>Lihat Course</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
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
    <Card className="transition-colors hover:border-[#D0C8B8]">
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
