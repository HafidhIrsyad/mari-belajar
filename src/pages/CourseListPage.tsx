import { BookOpen } from 'lucide-react'
import { PageContainer } from '@/components/layout/page-container'
import { CourseList } from '@/components/course/course-list'
import { courseTracks } from '@/content'

export function CourseListPage() {
  return (
    <div className="py-12 lg:py-20">
      <PageContainer>
        <div className="max-w-[50ch]">
          <h1 className="flex items-center gap-3 text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
            <BookOpen className="h-8 w-8 text-primary" />
            Daftar Course
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Pilih course untuk memulai perjalanan belajar. Progress disimpan
            secara lokal di perangkat ini.
          </p>
        </div>
        <div className="mt-10">
          <CourseList tracks={courseTracks} />
        </div>
      </PageContainer>
    </div>
  )
}
