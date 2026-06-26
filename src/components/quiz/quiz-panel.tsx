import { useEffect, useState } from 'react'
import { RotateCcw, Trophy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { QuizOption } from './quiz-option'
import type { Chapter } from '@/content/types'
import { useProgressStore } from '@/stores/progressStore'

interface QuizPanelProps {
  courseId: string
  chapter: Chapter
}

export function QuizPanel({ courseId, chapter }: QuizPanelProps) {
  const { startQuiz, selectAnswer, submitQuiz, resetQuiz, activeQuiz } =
    useProgressStore()

  const [result, setResult] = useState<{
    score: number
    totalQuestions: number
    passed: boolean
  } | null>(null)

  useEffect(() => {
    if (!activeQuiz || activeQuiz.chapterId !== chapter.id) {
      startQuiz(courseId, chapter.id)
    }
  }, [chapter.id, courseId, activeQuiz, startQuiz])

  if (!activeQuiz || activeQuiz.chapterId !== chapter.id) {
    return <div className="py-8 text-center text-muted-foreground">Memuat quiz...</div>
  }

  const allAnswered = activeQuiz.answers.every((a) => a !== null)
  const isSubmitted = activeQuiz.status === 'submitted'

  const handleSubmit = () => {
    const quizResult = submitQuiz()
    setResult(quizResult)
  }

  const handleRetry = () => {
    resetQuiz()
    startQuiz(courseId, chapter.id)
    setResult(null)
  }

  return (
    <Card className="mt-12" id="quiz">
      <CardHeader>
        <CardTitle>{chapter.quiz.title || 'Quiz'}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        <p className="text-sm text-muted-foreground">
          Jawab semua soal dengan benar untuk membuka bab berikutnya. Skor minimum:{' '}
          {chapter.quiz.passingScore} dari {chapter.quiz.questions.length}.
        </p>

        {chapter.quiz.questions.map((question, questionIndex) => {
          const selectedAnswer = activeQuiz.answers[questionIndex]

          return (
            <fieldset key={question.id} className="space-y-4">
              <legend className="mb-2 text-base font-medium leading-7">
                {questionIndex + 1}. {question.prompt}
              </legend>
              <div className="space-y-2">
                {question.options.map((option, optionIndex) => (
                  <QuizOption
                    key={`${question.id}-${optionIndex}`}
                    option={option}
                    index={optionIndex}
                    name={question.id}
                    selected={selectedAnswer === optionIndex}
                    disabled={isSubmitted}
                    showResult={isSubmitted}
                    isCorrect={question.correctOptionIndex === optionIndex}
                    onSelect={() => selectAnswer(questionIndex, optionIndex)}
                  />
                ))}
              </div>
              {isSubmitted && (
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium">Penjelasan:</span>{' '}
                  {question.explanation}
                </p>
              )}
              {questionIndex < chapter.quiz.questions.length - 1 && (
                <Separator className="mt-6" />
              )}
            </fieldset>
          )
        })}

        {result && (
          <Alert variant={result.passed ? 'success' : 'destructive'}>
            {result.passed ? (
              <Trophy className="h-4 w-4" />
            ) : (
              <RotateCcw className="h-4 w-4" />
            )}
            <AlertTitle>
              {result.passed ? 'Selamat, semua benar!' : 'Belum sempurna'}
            </AlertTitle>
            <AlertDescription>
              Skor Anda: {result.score} / {result.totalQuestions}.{' '}
              {result.passed
                ? 'Bab berikutnya telah terbuka.'
                : 'Pelajari penjelasan di atas dan coba lagi.'}
            </AlertDescription>
          </Alert>
        )}

        <div className="flex items-center justify-end gap-4">
          {isSubmitted ? (
            <Button onClick={handleRetry} variant="outline">
              <RotateCcw className="mr-2 h-4 w-4" />
              Ulangi Quiz
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={!allAnswered}>
              Periksa Jawaban
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
