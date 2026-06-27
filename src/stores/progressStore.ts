import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { produce } from 'immer'
import type { Quiz, UserProgress } from '@/content/types'
import { evaluateQuiz } from '@/lib/progress'

export interface ActiveQuiz {
  courseId: string
  chapterId: string
  answers: (number | null)[]
  status: 'idle' | 'in-progress' | 'submitted'
  submittedAt: string | null
}

export interface SubmitQuizResult {
  score: number
  totalQuestions: number
  passed: boolean
  nextChapterUnlocked: boolean
}

export const initialProgress: UserProgress = {
  version: 1,
  courseProgress: [],
  lastUpdatedAt: new Date().toISOString(),
}

interface ProgressState {
  progress: UserProgress
  activeQuiz: ActiveQuiz | null
  hydrate: () => void
  startQuiz: (courseId: string, chapterId: string, questionCount: number) => void
  selectAnswer: (questionIndex: number, optionIndex: number) => void
  submitQuiz: (quiz: Quiz, hasNextChapter: boolean) => SubmitQuizResult
  resetQuiz: () => void
  markChapterCompleted: (courseId: string, chapterId: string) => void
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      progress: initialProgress,
      activeQuiz: null,

      hydrate: () => {
        // Zustand persist rehydrates automatically after mount.
        // This action is exposed for explicit rehydration in tests or future tooling.
      },

      startQuiz: (courseId: string, chapterId: string, questionCount: number) => {
        if (questionCount <= 0) return

        set({
          activeQuiz: {
            courseId,
            chapterId,
            answers: Array.from({ length: questionCount }, () => null),
            status: 'in-progress',
            submittedAt: null,
          },
        })
      },

      selectAnswer: (questionIndex: number, optionIndex: number) => {
        const { activeQuiz } = get()
        if (!activeQuiz || activeQuiz.status !== 'in-progress') return

        const nextAnswers = [...activeQuiz.answers]
        nextAnswers[questionIndex] = optionIndex

        set({ activeQuiz: { ...activeQuiz, answers: nextAnswers } })
      },

      submitQuiz: (quiz: Quiz, hasNextChapter: boolean) => {
        const { activeQuiz, progress } = get()
        if (!activeQuiz || activeQuiz.status !== 'in-progress') {
          return { score: 0, totalQuestions: 0, passed: false, nextChapterUnlocked: false }
        }

        const answers = activeQuiz.answers.map((a) => a ?? -1)
        const { score, passed } = evaluateQuiz(quiz, answers)
        const totalQuestions = quiz.questions.length

        const nextProgress = produce(progress, (draft) => {
          let courseRecord = draft.courseProgress.find(
            (cp) => cp.courseId === activeQuiz.courseId
          )
          if (!courseRecord) {
            courseRecord = {
              courseId: activeQuiz.courseId,
              completedChapterIds: [],
              quizAttempts: [],
            }
            draft.courseProgress.push(courseRecord)
          }

          courseRecord.quizAttempts.push({
            chapterId: activeQuiz.chapterId,
            submittedAt: new Date().toISOString(),
            answers,
            score,
            totalQuestions,
            passed,
          })

          if (
            passed &&
            !courseRecord.completedChapterIds.includes(activeQuiz.chapterId)
          ) {
            courseRecord.completedChapterIds.push(activeQuiz.chapterId)
          }

          draft.lastUpdatedAt = new Date().toISOString()
        })

        const nextChapterUnlocked = passed && hasNextChapter

        set({
          progress: nextProgress,
          activeQuiz: {
            ...activeQuiz,
            status: 'submitted',
            submittedAt: new Date().toISOString(),
          },
        })

        return { score, totalQuestions, passed, nextChapterUnlocked }
      },

      resetQuiz: () => {
        set({ activeQuiz: null })
      },

      markChapterCompleted: (courseId: string, chapterId: string) => {
        const nextProgress = produce(get().progress, (draft) => {
          let record = draft.courseProgress.find((cp) => cp.courseId === courseId)
          if (!record) {
            record = { courseId, completedChapterIds: [], quizAttempts: [] }
            draft.courseProgress.push(record)
          }
          if (!record.completedChapterIds.includes(chapterId)) {
            record.completedChapterIds.push(chapterId)
          }
          draft.lastUpdatedAt = new Date().toISOString()
        })
        set({ progress: nextProgress })
      },
    }),
    {
      name: 'mari-belajar-progress',
      partialize: (state) => ({ progress: state.progress }),
      version: 1,
      migrate: (persistedState, version) => {
        if (version < 1) {
          return { progress: initialProgress }
        }
        return persistedState as { progress: UserProgress }
      },
    }
  )
)
