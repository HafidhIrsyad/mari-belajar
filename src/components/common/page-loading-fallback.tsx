import { Loader2 } from 'lucide-react'

export function PageLoadingFallback() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary" aria-hidden="true" />
      <p className="text-sm text-muted-foreground">Memuat halaman...</p>
    </div>
  )
}
