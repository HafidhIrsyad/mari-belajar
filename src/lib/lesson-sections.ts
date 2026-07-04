import type { LessonSection } from '@/content/types'

type CodeExampleSection = Extract<LessonSection, { type: 'code-example' }>
type MarkdownSection = Extract<LessonSection, { type: 'markdown' }>

function withComparisonTitle(section: CodeExampleSection): CodeExampleSection {
  const { title } = section.codeExample
  if (title.startsWith('Perbandingan')) return section

  return {
    ...section,
    codeExample: {
      ...section.codeExample,
      title: `Perbandingan — ${title}`,
    },
  }
}

/**
 * Go courses store examples in the shared JS → TS → Go template order.
 * Learners expect Go first, with JS/TS as cross-language comparisons.
 */
export function reorderLessonSectionsForCourse(
  sections: LessonSection[],
  courseSlug: string
): LessonSection[] {
  if (!courseSlug.startsWith('go-') && !courseSlug.startsWith('cs-')) return sections

  const markdowns = sections.filter(
    (section): section is MarkdownSection => section.type === 'markdown'
  )
  const codeExamples = sections.filter(
    (section): section is CodeExampleSection => section.type === 'code-example'
  )
  const trailing = sections.filter(
    (section) => section.type === 'callout' || section.type === 'list'
  )

  if (markdowns.length < 3 || codeExamples.length < 3) return sections

  const goExamples = codeExamples.filter(
    (section) => section.codeExample.language === 'go'
  )
  const jsExample = codeExamples.find(
    (section) => section.codeExample.language === 'javascript'
  )
  const tsExample = codeExamples.find(
    (section) => section.codeExample.language === 'typescript'
  )

  const isCsCourse = courseSlug.startsWith('cs-')

  if (isCsCourse) {
    if (markdowns.length < 3 || goExamples.length < 3) return sections

    const basic =
      markdowns.find((section) => section.level === 'basic') ?? markdowns[0]
    const intermediate =
      markdowns.find((section) => section.level === 'intermediate') ??
      markdowns[1]
    const advanced =
      markdowns.find((section) => section.level === 'advanced') ?? markdowns[2]

    return [
      basic,
      goExamples[0],
      intermediate,
      goExamples[1],
      advanced,
      goExamples[2],
      ...trailing,
    ]
  }

  const goExample = goExamples[0]
  if (!goExample || !jsExample || !tsExample) return sections

  const basic =
    markdowns.find((section) => section.level === 'basic') ?? markdowns[0]
  const intermediate =
    markdowns.find((section) => section.level === 'intermediate') ??
    markdowns[1]
  const advanced =
    markdowns.find((section) => section.level === 'advanced') ?? markdowns[2]

  return [
    basic,
    goExample,
    intermediate,
    withComparisonTitle(jsExample),
    advanced,
    withComparisonTitle(tsExample),
    ...trailing,
  ]
}

/**
 * JS/TS and frontend courses lead with JS, then TS, then a Go comparison.
 */
export function labelGoComparisonInLessonSections(
  sections: LessonSection[],
  courseSlug: string
): LessonSection[] {
  const usesGoComparison =
    courseSlug.startsWith('js-ts-') ||
    courseSlug.startsWith('frontend-') ||
    courseSlug.startsWith('backend-') ||
    courseSlug.startsWith('database-') ||
    courseSlug.startsWith('devops-')

  if (!usesGoComparison) return sections

  return sections.map((section) => {
    if (
      section.type !== 'code-example' ||
      section.codeExample.language !== 'go'
    ) {
      return section
    }

    return withComparisonTitle(section)
  })
}

export function prepareLessonSections(
  sections: LessonSection[],
  courseSlug: string
): LessonSection[] {
  return labelGoComparisonInLessonSections(
    reorderLessonSectionsForCourse(sections, courseSlug),
    courseSlug
  )
}
