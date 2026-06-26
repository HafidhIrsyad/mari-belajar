import { ArrowRight, BookOpen, Layers, Trophy } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { courses } from '@/content'

export function HomePage() {
  const firstCourse = courses[0]
  const firstChapter = firstCourse?.chapters[0]

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden border-b bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-16 md:py-24">
        <div className="container flex max-w-5xl flex-col items-center text-center">
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Mari Belajar Ilmu Komputer
          </h1>
          <p className="mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Platform pembelajaran fondasi ilmu komputer dalam Bahasa Indonesia.
            Dari bit hingga arsitektur sistem, pelajari konsep penting dengan
            contoh kode JavaScript, TypeScript, dan Go.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg">
              <Link to="/courses">
                Mulai Belajar
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            {firstChapter && (
              <Button asChild size="lg" variant="outline">
                <Link to={`/courses/${firstCourse.slug}/${firstChapter.slug}`}>
                  Langsung ke Bab 1
                </Link>
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="container py-16 md:py-24">
        <div className="mb-12 text-center">
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
      <section className="border-t bg-muted/30 py-16 md:py-24">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Course yang Tersedia
            </h2>
            <p className="mt-4 text-muted-foreground">
              Milestone 1 menyediakan fondasi Computer Science / Informatics.
            </p>
          </div>
          <div className="mx-auto grid max-w-3xl gap-6">
            {courses.map((course) => (
              <Card key={course.id}>
                <CardHeader>
                  <CardTitle>{course.title}</CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {course.chapters.length} bab •{' '}
                      {course.estimatedHours ?? '-'} jam estimasi
                    </span>
                    <Button asChild>
                      <Link to={`/courses/${course.slug}`}>Lihat Course</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
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
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader>
        <Icon className="mb-2 h-8 w-8 text-primary" />
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  )
}
