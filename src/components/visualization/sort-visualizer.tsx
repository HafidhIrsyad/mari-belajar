import { useCallback, useEffect, useMemo, useState } from 'react'
import { Play, Pause, RotateCcw, StepForward } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { usePrefersReducedMotion } from './use-prefers-reduced-motion'

interface SortVisualizerProps {
  values?: number[]
  algorithm?: 'bubble' | 'merge'
  title?: string
}

interface SortStep {
  array: number[]
  comparing: [number, number] | null
  sorted: number[]
}

function buildBubbleSteps(values: number[]): SortStep[] {
  const arr = [...values]
  const steps: SortStep[] = [{ array: [...arr], comparing: null, sorted: [] }]
  const n = arr.length

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      steps.push({ array: [...arr], comparing: [j, j + 1], sorted: [] })
      if (arr[j] > arr[j + 1]) {
        ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
        steps.push({ array: [...arr], comparing: [j, j + 1], sorted: [] })
      }
    }
    steps.push({
      array: [...arr],
      comparing: null,
      sorted: Array.from({ length: i + 1 }, (_, k) => n - 1 - k),
    })
  }

  steps.push({
    array: [...arr],
    comparing: null,
    sorted: arr.map((_, i) => i),
  })
  return steps
}

export function SortVisualizer({
  values = [38, 27, 43, 3, 9, 82, 10],
  algorithm = 'bubble',
  title = 'Visualisasi Pengurutan',
}: SortVisualizerProps) {
  const reducedMotion = usePrefersReducedMotion()
  const steps = useMemo(
    () => (algorithm === 'bubble' ? buildBubbleSteps(values) : buildBubbleSteps(values)),
    [algorithm, values]
  )
  const [stepIndex, setStepIndex] = useState(0)
  const [playing, setPlaying] = useState(false)

  const step = steps[stepIndex] ?? steps[0]
  const maxVal = Math.max(...values, 1)

  const reset = useCallback(() => {
    setStepIndex(0)
    setPlaying(false)
  }, [])

  const next = useCallback(() => {
    setStepIndex((i) => Math.min(i + 1, steps.length - 1))
  }, [steps.length])

  useEffect(() => {
    if (!playing || reducedMotion) return
    if (stepIndex >= steps.length - 1) {
      setPlaying(false)
      return
    }
    const timer = window.setTimeout(() => setStepIndex((i) => i + 1), 600)
    return () => window.clearTimeout(timer)
  }, [playing, stepIndex, steps.length, reducedMotion])

  return (
    <div className="my-6 rounded-lg border border-border bg-card p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setPlaying((p) => !p)}
            disabled={stepIndex >= steps.length - 1}
            aria-label={playing ? 'Jeda' : 'Putar'}
          >
            {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={next} aria-label="Langkah berikutnya">
            <StepForward className="h-4 w-4" />
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={reset} aria-label="Reset">
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div
        className="flex items-end justify-center gap-2"
        style={{ height: 180 }}
        role="img"
        aria-label={`Langkah ${stepIndex + 1} dari ${steps.length}`}
      >
        {step.array.map((val, i) => {
          const isComparing = step.comparing?.includes(i)
          const isSorted = step.sorted.includes(i)
          const height = (val / maxVal) * 140 + 20

          return (
            <div key={i} className="flex flex-col items-center gap-1">
              <div
                className={`w-8 rounded-t transition-colors ${
                  isComparing
                    ? 'bg-amber-500'
                    : isSorted
                      ? 'bg-emerald-500'
                      : 'bg-primary/70'
                }`}
                style={{ height }}
              />
              <span className="text-xs text-muted-foreground">{val}</span>
            </div>
          )
        })}
      </div>

      <p className="mt-3 text-center text-xs text-muted-foreground">
        Langkah {stepIndex + 1}/{steps.length}
        {step.comparing
          ? ` — membandingkan indeks ${step.comparing[0]} dan ${step.comparing[1]}`
          : ''}
      </p>
    </div>
  )
}
