import { Link } from 'react-router-dom'
import { BookOpen, Menu, Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/components/theme-provider'

export function TopNavigation() {
  const { theme, setTheme } = useTheme()

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-6 lg:px-16">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary tracking-tight">
          Mari Belajar
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            to="/courses"
            className="flex items-center gap-2 text-[0.9375rem] font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <BookOpen className="h-4 w-4" />
            Course
          </Link>
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </nav>

        <button className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground md:hidden">
          <Menu className="h-4 w-4" />
        </button>
      </div>
    </header>
  )
}
