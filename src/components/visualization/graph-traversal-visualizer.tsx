import { useCallback, useEffect, useMemo, useState } from 'react'
import { Play, Pause, RotateCcw, StepForward } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { usePrefersReducedMotion } from './use-prefers-reduced-motion'

interface GraphNode {
  id: string
  label: string
  x: number
  y: number
}

interface GraphEdge {
  from: string
  to: string
}

interface GraphTraversalVisualizerProps {
  nodes?: GraphNode[]
  edges?: GraphEdge[]
  algorithm?: 'bfs' | 'dfs'
  startNode?: string
  title?: string
}

function buildAdjacency(edges: GraphEdge[]): Map<string, string[]> {
  const adj = new Map<string, string[]>()
  for (const { from, to } of edges) {
    if (!adj.has(from)) adj.set(from, [])
    adj.get(from)!.push(to)
    if (!adj.has(to)) adj.set(to, [])
    adj.get(to)!.push(from)
  }
  for (const neighbors of adj.values()) {
    neighbors.sort()
  }
  return adj
}

function bfsOrder(start: string, adj: Map<string, string[]>): string[] {
  const visited = new Set<string>()
  const order: string[] = []
  const queue = [start]
  visited.add(start)

  while (queue.length > 0) {
    const node = queue.shift()!
    order.push(node)
    for (const neighbor of adj.get(node) ?? []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor)
        queue.push(neighbor)
      }
    }
  }
  return order
}

function dfsOrder(start: string, adj: Map<string, string[]>): string[] {
  const visited = new Set<string>()
  const order: string[] = []

  function visit(node: string) {
    visited.add(node)
    order.push(node)
    for (const neighbor of adj.get(node) ?? []) {
      if (!visited.has(neighbor)) visit(neighbor)
    }
  }

  visit(start)
  return order
}

export function GraphTraversalVisualizer({
  nodes = [
    { id: 'A', label: 'A', x: 120, y: 40 },
    { id: 'B', label: 'B', x: 40, y: 120 },
    { id: 'C', label: 'C', x: 200, y: 120 },
    { id: 'D', label: 'D', x: 80, y: 200 },
    { id: 'E', label: 'E', x: 160, y: 200 },
  ],
  edges = [
    { from: 'A', to: 'B' },
    { from: 'A', to: 'C' },
    { from: 'B', to: 'D' },
    { from: 'C', to: 'E' },
    { from: 'D', to: 'E' },
  ],
  algorithm = 'bfs',
  startNode = 'A',
  title = 'Visualisasi Traversal Graf',
}: GraphTraversalVisualizerProps) {
  const reducedMotion = usePrefersReducedMotion()
  const adj = useMemo(() => buildAdjacency(edges), [edges])
  const order = useMemo(
    () => (algorithm === 'bfs' ? bfsOrder(startNode, adj) : dfsOrder(startNode, adj)),
    [algorithm, startNode, adj]
  )

  const [stepIndex, setStepIndex] = useState(0)
  const [playing, setPlaying] = useState(false)

  const visited = new Set(order.slice(0, stepIndex + 1))
  const current = order[stepIndex]

  const reset = useCallback(() => {
    setStepIndex(0)
    setPlaying(false)
  }, [])

  const next = useCallback(() => {
    setStepIndex((i) => Math.min(i + 1, order.length - 1))
  }, [order.length])

  useEffect(() => {
    if (!playing || reducedMotion) return
    if (stepIndex >= order.length - 1) {
      setPlaying(false)
      return
    }
    const timer = window.setTimeout(() => setStepIndex((i) => i + 1), 800)
    return () => window.clearTimeout(timer)
  }, [playing, stepIndex, order.length, reducedMotion])

  const nodeMap = Object.fromEntries(nodes.map((n) => [n.id, n]))

  return (
    <div className="my-6 rounded-lg border border-border bg-card p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-sm font-semibold text-foreground">
          {title} ({algorithm.toUpperCase()})
        </h3>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setPlaying((p) => !p)}
            disabled={stepIndex >= order.length - 1}
          >
            {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={next}>
            <StepForward className="h-4 w-4" />
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={reset}>
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <svg viewBox="0 0 240 240" className="mx-auto w-full max-w-sm" role="img">
        {edges.map(({ from, to }) => {
          const a = nodeMap[from]
          const b = nodeMap[to]
          if (!a || !b) return null
          return (
            <line
              key={`${from}-${to}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke="currentColor"
              className="text-border"
              strokeWidth={2}
            />
          )
        })}
        {nodes.map((node) => {
          const isCurrent = node.id === current
          const isVisited = visited.has(node.id)
          return (
            <g key={node.id}>
              <circle
                cx={node.x}
                cy={node.y}
                r={22}
                className={
                  isCurrent
                    ? 'fill-amber-500'
                    : isVisited
                      ? 'fill-emerald-500'
                      : 'fill-muted'
                }
              />
              <text
                x={node.x}
                y={node.y + 5}
                textAnchor="middle"
                className="fill-foreground text-sm font-semibold"
                fontSize={14}
              >
                {node.label}
              </text>
            </g>
          )
        })}
      </svg>

      <p className="mt-3 text-center text-xs text-muted-foreground">
        Urutan kunjungan: {order.slice(0, stepIndex + 1).join(' → ')}
      </p>
    </div>
  )
}
