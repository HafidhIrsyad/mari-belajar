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
  index: _index,
  name,
  selected: isSelected,
  disabled,
  showResult,
  isCorrect,
  onSelect,
}: QuizOptionProps) {
  return (
    <label
      className={cn(
        'flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors',
        isSelected
          ? 'border-primary bg-primary/5'
          : 'border-border bg-card/65 hover:border-primary/50 hover:bg-primary/[0.03]',
        showResult && isCorrect && 'border-success bg-success/10',
        showResult && isSelected && !isCorrect && 'border-destructive bg-destructive/10',
        disabled && !showResult && 'cursor-not-allowed opacity-60'
      )}
    >
      <input
        type="radio"
        name={`question-option-${name}`}
        className="sr-only"
        checked={isSelected}
        onChange={onSelect}
        disabled={disabled}
      />
      <span
        className={cn(
          'mt-0.5 h-5 w-5 flex-shrink-0 rounded-full border-2',
          isSelected
            ? 'border-primary bg-primary shadow-[inset_0_0_0_4px_var(--background)]'
            : 'border-border'
        )}
      />
      <span className="text-[0.9375rem] leading-relaxed text-foreground">{option}</span>
    </label>
  )
}
