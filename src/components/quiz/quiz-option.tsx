import { Check, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface QuizOptionProps {
  option: string
  index: number
  name: string
  selected: boolean
  disabled: boolean
  showResult: boolean
  isCorrect: boolean
  onSelect: () => void
}

export function QuizOption({
  option,
  index,
  name,
  selected,
  disabled,
  showResult,
  isCorrect,
  onSelect,
}: QuizOptionProps) {
  const optionLetter = String.fromCharCode(65 + index)

  const stateClasses = () => {
    if (showResult) {
      if (isCorrect) {
        return 'border-success bg-success/10 text-success'
      }
      if (selected && !isCorrect) {
        return 'border-destructive bg-destructive/10 text-destructive'
      }
      return 'border-border opacity-60'
    }

    if (selected) {
      return 'border-primary bg-primary/10 text-foreground'
    }

    return 'border-border bg-transparent hover:border-primary hover:ring-1 hover:ring-primary'
  }

  return (
    <label
      className={cn(
        'relative flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-all focus-within:ring-2 focus-within:ring-ring',
        disabled && !showResult && 'cursor-not-allowed opacity-60',
        stateClasses()
      )}
    >
      <input
        type="radio"
        name={`question-option-${name}`}
        className="sr-only"
        checked={selected}
        onChange={onSelect}
        disabled={disabled}
      />
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-medium">
        {optionLetter}
      </span>
      <span className="flex-1 text-sm leading-6">{option}</span>
      {showResult && isCorrect && (
        <Check className="h-5 w-5 shrink-0 text-success" />
      )}
      {showResult && selected && !isCorrect && (
        <X className="h-5 w-5 shrink-0 text-destructive" />
      )}
    </label>
  )
}
