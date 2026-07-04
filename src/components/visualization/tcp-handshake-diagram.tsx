import { useState } from 'react'
import { ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const STEPS = [
  {
    id: 1,
    label: 'SYN',
    description: 'Client mengirim SYN dengan sequence number x ke server.',
    from: 'client',
    to: 'server',
  },
  {
    id: 2,
    label: 'SYN-ACK',
    description: 'Server merespons SYN-ACK dengan seq=y, ack=x+1.',
    from: 'server',
    to: 'client',
  },
  {
    id: 3,
    label: 'ACK',
    description: 'Client mengirim ACK ack=y+1. Koneksi established.',
    from: 'client',
    to: 'server',
  },
] as const

interface TcpHandshakeDiagramProps {
  title?: string
}

export function TcpHandshakeDiagram({
  title = 'TCP Three-Way Handshake',
}: TcpHandshakeDiagramProps) {
  const [step, setStep] = useState(0)
  const current = STEPS[step]

  return (
    <div className="my-6 rounded-lg border border-border bg-card p-5">
      <h3 className="mb-4 text-sm font-semibold text-foreground">{title}</h3>

      <div className="flex items-center justify-between gap-4 px-4">
        <div
          className={`rounded-lg border px-4 py-3 text-center text-sm font-semibold ${
            current.from === 'client' ? 'border-primary bg-primary/10' : 'border-border'
          }`}
        >
          Client
        </div>
        <div className="flex flex-1 flex-col items-center gap-1">
          <span className="rounded bg-muted px-2 py-0.5 text-xs font-mono font-semibold">
            {current.label}
          </span>
          <div className="h-0.5 w-full bg-primary" />
          <span className="text-xs text-muted-foreground">
            {current.from === 'client' ? '→' : '←'}
          </span>
        </div>
        <div
          className={`rounded-lg border px-4 py-3 text-center text-sm font-semibold ${
            current.from === 'server' ? 'border-primary bg-primary/10' : 'border-border'
          }`}
        >
          Server
        </div>
      </div>

      <p className="my-4 text-center text-sm text-muted-foreground">
        {current.description}
      </p>

      <div className="flex justify-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={step >= STEPS.length - 1}
          onClick={() => setStep((s) => Math.min(s + 1, STEPS.length - 1))}
        >
          Langkah berikutnya
          <ChevronRight className="ml-1 h-3 w-3" />
        </Button>
        {step > 0 && (
          <Button type="button" variant="ghost" size="sm" onClick={() => setStep(0)}>
            Reset
          </Button>
        )}
      </div>

      <p className="mt-3 text-center text-xs text-muted-foreground">
        Langkah {step + 1}/{STEPS.length}
      </p>
    </div>
  )
}
