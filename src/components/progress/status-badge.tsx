import { CheckCircle, Lock, PlayCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

type Status = 'locked' | 'unlocked' | 'completed'

interface StatusBadgeProps {
  status: Status
}

export function StatusBadge({ status }: StatusBadgeProps) {
  if (status === 'completed') {
    return (
      <Badge variant="success" className="gap-1">
        <CheckCircle className="h-3 w-3" />
        Selesai
      </Badge>
    )
  }

  if (status === 'unlocked') {
    return (
      <Badge variant="default" className="gap-1">
        <PlayCircle className="h-3 w-3" />
        Terbuka
      </Badge>
    )
  }

  return (
    <Badge variant="secondary" className="gap-1">
      <Lock className="h-3 w-3" />
      Terkunci
    </Badge>
  )
}
