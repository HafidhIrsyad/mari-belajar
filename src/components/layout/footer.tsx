import { BookOpen } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="border-t bg-background py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-14 md:flex-row">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Mari Belajar. Belajar fondasi ilmu komputer
            dengan pendekatan bertahap.
          </p>
        </div>
        <nav className="flex gap-4 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">
            Beranda
          </Link>
          <Link to="/courses" className="hover:text-foreground">
            Course
          </Link>
        </nav>
      </div>
    </footer>
  )
}
