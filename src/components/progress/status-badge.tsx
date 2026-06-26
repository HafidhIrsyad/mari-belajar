import { CheckCircle, Lock, PlayCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

type Status = 'locked' | 'unlocked' | 'completed'

interface StatusBadgeProps {
  status: Status
}

const variants: Record<Status, string> = {
  locked: 'bg-muted text-muted-foreground',
  unlocked: 'bg-primary/10 text-primary',
  completed: 'bg-success/10 text-success',
}

const labels: Record<Status, string> = {
  locked: 'Terkunci',
  unlocked: 'Terbuka',
  completed: 'Selesai',
}

const icons: Record<Status, React.ReactNode> = {
  locked: <Lock className="h-3 w-3" />,
  unlocked: <PlayCircle className="h-3 w-3" />,
  completed: <CheckCircle className="h-3 w-3" />,
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <Badge variant="secondary" className={`gap-1 ${variants[status]}`}>
      {icons[status]}
      {labels[status]}
    </Badge>
  )
}
