import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@/components/theme-provider'
import { AppShell } from '@/components/layout/app-shell'
import { HomePage } from '@/pages/HomePage'
import { CourseListPage } from '@/pages/CourseListPage'
import { CourseDetailPage } from '@/pages/CourseDetailPage'
import { LessonPage } from '@/pages/LessonPage'
import { NotFoundPage } from '@/pages/NotFoundPage'

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="mari-belajar-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppShell><HomePage /></AppShell>} />
          <Route path="/courses" element={<AppShell><CourseListPage /></AppShell>} />
          <Route path="/courses/:courseId" element={<CourseDetailPage />} />
          <Route path="/courses/:courseId/:chapterId" element={<LessonPage />} />
          <Route path="/not-found" element={<AppShell><NotFoundPage /></AppShell>} />
          <Route path="*" element={<AppShell><NotFoundPage /></AppShell>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
