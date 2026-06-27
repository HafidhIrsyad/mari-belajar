/**
 * Content data model for Mari Belajar.
 *
 * This module defines the TypeScript types for courses, chapters, lessons,
 * quizzes, and the persisted user progress. The schema is derived from Jozu's
 * design but pragmatically adapted to fit Thatch's sample chapter authoring
 * structure (markdown prose grouped by basic/intermediate/advanced level with
 * interleaved code examples).
 */

export type SectionLevel = 'basic' | 'intermediate' | 'advanced'
export type CodeLanguage = 'javascript' | 'typescript' | 'go' | 'text'

export type ReferenceType = 'article' | 'video' | 'book' | 'documentation' | 'interactive'

export interface Reference {
  id: string
  title: string
  url: string
  description: string
  type: ReferenceType
}

export interface CodeExample {
  id: string
  filename?: string
  language: CodeLanguage
  title: string
  code: string
  explanation?: string
}

export type LessonSection =
  | {
      id: string
      type: 'markdown'
      level: SectionLevel
      title: string
      content: string
    }
  | {
      id: string
      type: 'code-example'
      codeExample: CodeExample
    }
  | {
      id: string
      type: 'callout'
      content: string
      calloutType: 'info' | 'warning' | 'tip'
    }
  | {
      id: string
      type: 'list'
      items: string[]
    }

export interface Lesson {
  id: string
  sections: LessonSection[]
  estimatedMinutes?: number
}

export interface Question {
  id: string
  order: number
  prompt: string
  options: string[]
  correctOptionIndex: number
  explanation: string
}

export interface Quiz {
  id: string
  title?: string
  questions: Question[]
  passingScore: number
}

export interface Chapter {
  id: string
  slug: string
  order: number
  title: string
  summary: string
  estimatedMinutes?: number
  learningObjectives?: string[]
  summaryPoints?: string[]
  references?: Reference[]
  lesson: Lesson
  quiz: Quiz
}

export interface Course {
  id: string
  slug: string
  title: string
  description: string
  chapters: Chapter[]
  estimatedHours?: number
  tags?: string[]
  createdAt?: string
}

export type CourseMeta = Omit<Course, 'chapters'> & {
  chaptersCount: number
  firstChapterSlug: string
}

export interface QuizAttempt {
  chapterId: string
  submittedAt: string
  answers: number[]
  score: number
  totalQuestions: number
  passed: boolean
}

export interface CourseProgress {
  courseId: string
  completedChapterIds: string[]
  quizAttempts: QuizAttempt[]
}

export interface UserProgress {
  version: number
  courseProgress: CourseProgress[]
  lastUpdatedAt: string
}
