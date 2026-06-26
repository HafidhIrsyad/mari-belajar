import { TopNavigation } from './top-navigation'
import { Footer } from './footer'

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <TopNavigation />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
