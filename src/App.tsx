import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@/components/theme-provider'
import { AppShell } from '@/components/layout/app-shell'
import { HomePage } from '@/pages/HomePage'
import { CourseListPage } from '@/pages/CourseListPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { PageLoadingFallback } from '@/components/common/page-loading-fallback'

const CourseDetailPage = lazy(() => import('@/pages/CourseDetailPage'))
const LessonPage = lazy(() => import('@/pages/LessonPage'))

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="mari-belajar-theme">
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <Suspense fallback={<PageLoadingFallback />}>
          <Routes>
            <Route path="/" element={<AppShell><HomePage /></AppShell>} />
            <Route path="/courses" element={<AppShell><CourseListPage /></AppShell>} />
            <Route path="/courses/:courseId" element={<CourseDetailPage />} />
            <Route path="/courses/:courseId/:chapterId" element={<LessonPage />} />
            <Route path="/not-found" element={<AppShell><NotFoundPage /></AppShell>} />
            <Route path="*" element={<AppShell><NotFoundPage /></AppShell>} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
