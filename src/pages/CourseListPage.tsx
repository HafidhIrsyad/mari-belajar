import { BookOpen } from 'lucide-react'
import { CourseList } from '@/components/course/course-list'
import { courses } from '@/content'
import { useProgressStore } from '@/stores/progressStore'

export function CourseListPage() {
  const progress = useProgressStore((state) => state.progress)

  return (
    <div className="container py-12 md:py-16">
      <div className="mb-8 max-w-2xl">
        <h1 className="flex items-center gap-3 text-3xl font-bold tracking-tight sm:text-4xl">
          <BookOpen className="h-8 w-8 text-primary" />
          Daftar Course
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Pilih course untuk memulai perjalanan belajar Anda. Progress disimpan
          secara lokal di perangkat ini.
        </p>
      </div>
      <CourseList courses={courses} progress={progress} />
    </div>
  )
}
