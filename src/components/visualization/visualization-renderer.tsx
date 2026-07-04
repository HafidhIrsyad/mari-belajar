import type { VisualizationConfig } from '@/content/types'
import { SortVisualizer } from './sort-visualizer'
import { GraphTraversalVisualizer } from './graph-traversal-visualizer'
import { ProcessStateDiagram } from './process-state-diagram'
import { MemoryLayoutDiagram } from './memory-layout-diagram'
import { TcpHandshakeDiagram } from './tcp-handshake-diagram'

interface VisualizationRendererProps {
  config: VisualizationConfig
}

export function VisualizationRenderer({ config }: VisualizationRendererProps) {
  const { component, title, props = {} } = config

  switch (component) {
    case 'sort':
      return (
        <SortVisualizer
          title={title}
          values={props.values as number[] | undefined}
          algorithm={props.algorithm as 'bubble' | 'merge' | undefined}
        />
      )
    case 'graph-bfs':
      return (
        <GraphTraversalVisualizer
          title={title}
          algorithm="bfs"
          nodes={props.nodes as Parameters<typeof GraphTraversalVisualizer>[0]['nodes']}
          edges={props.edges as Parameters<typeof GraphTraversalVisualizer>[0]['edges']}
          startNode={props.startNode as string | undefined}
        />
      )
    case 'graph-dfs':
      return (
        <GraphTraversalVisualizer
          title={title}
          algorithm="dfs"
          nodes={props.nodes as Parameters<typeof GraphTraversalVisualizer>[0]['nodes']}
          edges={props.edges as Parameters<typeof GraphTraversalVisualizer>[0]['edges']}
          startNode={props.startNode as string | undefined}
        />
      )
    case 'process-state':
      return <ProcessStateDiagram title={title} />
    case 'memory-layout':
      return <MemoryLayoutDiagram title={title} />
    case 'tcp-handshake':
      return <TcpHandshakeDiagram title={title} />
    default:
      return (
        <div className="my-6 rounded-lg border border-dashed border-border p-4 text-sm text-muted-foreground">
          Visualisasi &quot;{component}&quot; belum tersedia.
        </div>
      )
  }
}
