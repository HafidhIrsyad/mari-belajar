import { PageContainer } from '@/components/layout/page-container'

export function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <PageContainer>
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Mari Belajar. Dibuat untuk pelajar Indonesia.
        </p>
      </PageContainer>
    </footer>
  )
}
