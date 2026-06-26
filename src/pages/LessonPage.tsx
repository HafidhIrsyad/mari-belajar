import { useMemo } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ChapterSidebar } from '@/components/layout/chapter-sidebar'
import { BreadcrumbNav } from '@/components/lesson/breadcrumb-nav'
import { LessonHeader } from '@/components/lesson/lesson-header'
import { MarkdownContent } from '@/components/lesson/markdown-content'
import { CodeBlock } from '@/components/lesson/code-block'
import { PrevNextNav } from '@/components/lesson/prev-next-nav'
import { QuizPanel } from '@/components/quiz/quiz-panel'
import { ReferenceList } from '@/components/lesson/reference-list'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { getChapterBySlug, getCourseBySlug } from '@/content'
import type { LessonSection } from '@/content/types'
import { useProgressStore } from '@/stores/progressStore'

export function LessonPage() {
  const { courseId, chapterId } = useParams<{
    courseId: string
    chapterId: string
  }>()
  const progress = useProgressStore((state) => state.progress)

  const course = useMemo(() => getCourseBySlug(courseId ?? ''), [courseId])
  const chapter = useMemo(
    () => (course ? getChapterBySlug(course.slug, chapterId ?? '') : undefined),
    [course, chapterId]
  )

  if (!course || !chapter) {
    return <Navigate to="/not-found" replace />
  }

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)]">
      <ChapterSidebar course={course} progress={progress} />

      <main className="flex-1 px-6 py-10 lg:px-16 lg:py-14">
        <div className="mx-auto max-w-[65ch]">
          <div className="mb-6 flex items-center justify-between lg:hidden">
            <Button variant="outline" size="sm" asChild>
              <Link to={`/courses/${course.slug}`}>
                <ChevronLeft className="mr-1 h-4 w-4" />
                Course
              </Link>
            </Button>
            <MobileChapterMenu course={course} progress={progress} />
          </div>

          <BreadcrumbNav course={course} chapter={chapter} />
          <LessonHeader chapter={chapter} courseTitle={course.title} />

          <article className="prose-lesson">
            {chapter.lesson.sections.map((section) => (
              <LessonSectionRenderer key={section.id} section={section} />
            ))}
          </article>

          <QuizPanel courseId={course.id} chapter={chapter} />
          <ReferenceList references={chapter.references ?? []} />
          <PrevNextNav
            course={course}
            currentChapter={chapter}
            progress={progress}
          />
        </div>
      </main>
    </div>
  )
}

function LessonSectionRenderer({ section }: { section: LessonSection }) {
  if (section.type === 'markdown') {
    return (
      <div className="mb-8">
        {section.title && (
          <h2 className="mb-4 text-2xl font-bold tracking-tight">
            {section.title}
          </h2>
        )}
        <MarkdownContent content={section.content} />
      </div>
    )
  }

  if (section.type === 'code-example') {
    return (
      <CodeBlock
        code={section.codeExample.code}
        language={section.codeExample.language}
        filename={section.codeExample.filename}
        title={section.codeExample.title}
        explanation={section.codeExample.explanation}
      />
    )
  }

  if (section.type === 'callout') {
    return (
      <div
        className={`my-6 rounded-lg border-l-4 p-4 ${
          section.calloutType === 'info'
            ? 'border-primary bg-primary/5'
            : section.calloutType === 'warning'
            ? 'border-warning bg-warning/5'
            : 'border-secondary bg-secondary/5'
        }`}
      >
        <MarkdownContent content={section.content} />
      </div>
    )
  }

  if (section.type === 'list') {
    return (
      <ul className="my-4 list-disc space-y-2 pl-6">
        {section.items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    )
  }

  return null
}

function MobileChapterMenu({
  course,
  progress,
}: {
  course: import('@/content/types').Course
  progress: import('@/content/types').UserProgress
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm">
          Daftar Bab
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] p-0">
        <ChapterSidebar course={course} progress={progress} className="block border-0" />
      </SheetContent>
    </Sheet>
  )
}
