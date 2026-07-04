import { Home, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageContainer } from '@/components/layout/page-container'
import { Button } from '@/components/ui/button'

export function NotFoundPage() {
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center py-16 text-center">
      <PageContainer className="flex flex-col items-center">
        <Search className="mb-4 h-16 w-16 text-muted-foreground" />
        <h1 className="mb-2 text-4xl font-bold tracking-tight">
          Halaman Tidak Ditemukan
        </h1>
        <p className="mb-8 max-w-md text-muted-foreground">
          Sepertinya halaman yang Anda cari tidak tersedia. Coba kembali ke
          beranda atau pilih course yang ingin dipelajari.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button asChild>
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Kembali ke Beranda
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/courses">Lihat Daftar Course</Link>
          </Button>
        </div>
      </PageContainer>
    </div>
  )
}
