import { ExternalLink } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Reference, ReferenceType } from '@/content/types'

const typeLabels: Record<ReferenceType, string> = {
  article: 'Artikel',
  video: 'Video',
  book: 'Buku',
  documentation: 'Dokumentasi',
  interactive: 'Interaktif',
}

export function ReferenceList({ references }: { references: Reference[] }) {
  if (!references || references.length === 0) return null

  return (
    <section className="mt-14 border-t border-border pt-10">
      <h2 className="text-2xl font-semibold tracking-tight text-foreground">
        Referensi Belajar Lebih Lanjut
      </h2>
      <p className="mt-3 text-muted-foreground">
        Bacaan dan sumber tambahan untuk memperdalam pemahamanmu.
      </p>

      <div className="mt-6 grid gap-4">
        {references.map((ref) => (
          <Card key={ref.id} className="transition-colors hover:border-[#D0C8B8]">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-4">
                <CardTitle className="text-lg font-semibold leading-snug">
                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-foreground hover:text-primary"
                  >
                    {ref.title}
                    <ExternalLink className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                  </a>
                </CardTitle>
                <Badge variant="outline" className="flex-shrink-0 text-xs">
                  {typeLabels[ref.type]}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-[0.9375rem] leading-relaxed text-muted-foreground">
                {ref.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
