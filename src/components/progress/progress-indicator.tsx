import { Progress } from '@/components/ui/progress'

interface ProgressIndicatorProps {
  value: number
  total: number
  label?: string
}

export function ProgressIndicator({
  value,
  total,
  label,
}: ProgressIndicatorProps) {
  const percentage = total === 0 ? 0 : Math.round((value / total) * 100)

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">{label || 'Progress'}</span>
        <span className="font-medium">{value} / {total} ({percentage}%)</span>
      </div>
      <Progress value={percentage} />
    </div>
  )
}
