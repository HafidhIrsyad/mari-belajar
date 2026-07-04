interface MemoryLayoutDiagramProps {
  title?: string
}

export function MemoryLayoutDiagram({
  title = 'Layout Memori Proses',
}: MemoryLayoutDiagramProps) {
  const regions = [
    { name: 'Stack', desc: 'Variabel lokal, frame fungsi — tumbuh ke bawah', color: 'bg-sky-500/20 border-sky-500/40' },
    { name: 'Heap', desc: 'Alokasi dinamis — tumbuh ke atas', color: 'bg-violet-500/20 border-violet-500/40' },
    { name: 'Data (BSS + Initialized)', desc: 'Variabel global & static', color: 'bg-amber-500/20 border-amber-500/40' },
    { name: 'Code / Text', desc: 'Instruksi program (read-only)', color: 'bg-emerald-500/20 border-emerald-500/40' },
  ]

  return (
    <div className="my-6 rounded-lg border border-border bg-card p-5">
      <h3 className="mb-4 text-sm font-semibold text-foreground">{title}</h3>
      <div className="mx-auto max-w-md space-y-2">
        <p className="text-center text-xs text-muted-foreground">Alamat tinggi ↑</p>
        {regions.map((region) => (
          <div
            key={region.name}
            className={`rounded-lg border p-4 ${region.color}`}
          >
            <p className="font-semibold text-foreground">{region.name}</p>
            <p className="text-xs text-muted-foreground">{region.desc}</p>
          </div>
        ))}
        <p className="text-center text-xs text-muted-foreground">Alamat rendah ↓</p>
      </div>
    </div>
  )
}
