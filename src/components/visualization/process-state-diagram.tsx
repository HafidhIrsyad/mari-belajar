import { useState } from 'react'
import { ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const STATES = [
  { id: 'new', label: 'New', description: 'Proses baru dibuat oleh OS.' },
  { id: 'ready', label: 'Ready', description: 'Siap dieksekusi, menunggu CPU.' },
  { id: 'running', label: 'Running', description: 'Sedang dieksekusi di CPU.' },
  { id: 'waiting', label: 'Waiting', description: 'Menunggu I/O atau resource.' },
  { id: 'terminated', label: 'Terminated', description: 'Proses selesai atau dihentikan.' },
] as const

type StateId = (typeof STATES)[number]['id']

const TRANSITIONS: Record<StateId, StateId[]> = {
  new: ['ready'],
  ready: ['running'],
  running: ['waiting', 'ready', 'terminated'],
  waiting: ['ready'],
  terminated: [],
}

interface ProcessStateDiagramProps {
  title?: string
}

export function ProcessStateDiagram({
  title = 'Diagram State Proses',
}: ProcessStateDiagramProps) {
  const [current, setCurrent] = useState<StateId>('new')
  const state = STATES.find((s) => s.id === current)!

  return (
    <div className="my-6 rounded-lg border border-border bg-card p-5">
      <h3 className="mb-4 text-sm font-semibold text-foreground">{title}</h3>

      <div className="flex flex-wrap justify-center gap-2">
        {STATES.map((s) => (
          <div
            key={s.id}
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              s.id === current
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            {s.label}
          </div>
        ))}
      </div>

      <p className="my-4 text-center text-sm text-foreground">{state.description}</p>

      <div className="flex flex-wrap justify-center gap-2">
        {TRANSITIONS[current].map((next) => {
          const nextState = STATES.find((s) => s.id === next)!
          return (
            <Button
              key={next}
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setCurrent(next)}
            >
              {state.label}
              <ChevronRight className="mx-1 h-3 w-3" />
              {nextState.label}
            </Button>
          )
        })}
        {current !== 'new' && (
          <Button type="button" variant="ghost" size="sm" onClick={() => setCurrent('new')}>
            Reset
          </Button>
        )}
      </div>
    </div>
  )
}
