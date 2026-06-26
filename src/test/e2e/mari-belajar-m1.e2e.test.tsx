import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { describe, it, expect, beforeEach } from 'vitest'

import { ThemeProvider } from '@/components/theme-provider'
import { AppShell } from '@/components/layout/app-shell'
import { HomePage } from '@/pages/HomePage'
import { CourseListPage } from '@/pages/CourseListPage'
import { CourseDetailPage } from '@/pages/CourseDetailPage'
import { LessonPage } from '@/pages/LessonPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { useProgressStore, initialProgress } from '@/stores/progressStore'

function TestApp({ initialEntries = ['/'] }: { initialEntries?: string[] }) {
  return (
    <ThemeProvider defaultTheme="system" storageKey="mari-belajar-theme">
      <MemoryRouter initialEntries={initialEntries}>
        <Routes>
          <Route path="/" element={<AppShell><HomePage /></AppShell>} />
          <Route path="/courses" element={<AppShell><CourseListPage /></AppShell>} />
          <Route path="/courses/:courseId" element={<CourseDetailPage />} />
          <Route path="/courses/:courseId/:chapterId" element={<LessonPage />} />
          <Route path="/not-found" element={<AppShell><NotFoundPage /></AppShell>} />
          <Route path="*" element={<AppShell><NotFoundPage /></AppShell>} />
        </Routes>
      </MemoryRouter>
    </ThemeProvider>
  )
}

describe('Mari Belajar Milestone 1 — E2E happy paths', () => {
  beforeEach(() => {
    window.localStorage.clear()
    useProgressStore.setState({
      progress: initialProgress,
      activeQuiz: null,
    })
  })

  it('Scenario 1: lands on homepage, navigates to courses, opens chapter 1, sees content', async () => {
    const user = userEvent.setup()
    render(<TestApp />)

    // Homepage renders
    expect(screen.getByRole('heading', { name: /Mari Belajar Ilmu Komputer/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Mulai Belajar/i })).toBeInTheDocument()

    // Navigate to course list
    await user.click(screen.getByRole('link', { name: /Mulai Belajar/i }))
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /Daftar Course/i })).toBeInTheDocument()
    })
    expect(screen.getByText(/Computer Science \/ Informatics Fundamentals/i)).toBeInTheDocument()

    // Open chapter 1 from course card
    await user.click(screen.getByRole('link', { name: /Mulai Belajar/i }))
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /Cara Kerja Komputer — Dari Bit sampai Program Berjalan/i })).toBeInTheDocument()
    })
    expect(screen.getByRole('heading', { name: /Dari Listrik ke Bit/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Bit dan Byte/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Periksa Jawaban/i })).toBeInTheDocument()
  })

  it('Scenario 2: answers all quiz questions correctly and unlocks next chapter', async () => {
    const user = userEvent.setup()
    render(<TestApp initialEntries={['/courses/cs-fundamentals/ch-01-how-computers-work']} />)

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /Cara Kerja Komputer — Dari Bit sampai Program Berjalan/i })).toBeInTheDocument()
    })

    // Correct answers for chapter 1 quiz (indices): [1, 2, 1, 1, 0, 2, 0, 1]
    const correctAnswers = [1, 2, 1, 1, 0, 2, 0, 1]
    const questions = screen.getAllByRole('group')
    expect(questions).toHaveLength(8)

    for (let i = 0; i < questions.length; i++) {
      const option = within(questions[i]).getAllByRole('radio')[correctAnswers[i]]
      await user.click(option)
    }

    await user.click(screen.getByRole('button', { name: /Periksa Jawaban/i }))

    await waitFor(() => {
      expect(screen.getByText(/Selamat, semua benar!/i)).toBeInTheDocument()
    })
    expect(screen.getByText(/Bab berikutnya telah terbuka./i)).toBeInTheDocument()

    // Go back to course detail and verify chapter 2 is unlocked
    await user.click(screen.getByRole('link', { name: /Kembali ke Course/i }))
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /Computer Science \/ Informatics Fundamentals/i })).toBeInTheDocument()
    })

    const chapterTwoTitle = screen.getByText(/Sistem Bilangan dan Operasi Bit/i)
    expect(chapterTwoTitle).toBeInTheDocument()
    const chapterTwoCard = chapterTwoTitle.closest('div[class*="card"]') ?? chapterTwoTitle.closest('div')
    expect(chapterTwoCard).toBeTruthy()
    expect(within(chapterTwoCard as HTMLElement).queryByRole('button', { name: /Terkunci/i })).not.toBeInTheDocument()
    expect(within(chapterTwoCard as HTMLElement).getByRole('link', { name: /Buka Bab/i })).toBeInTheDocument()
  })

  it('Scenario 3: answers some quiz questions incorrectly and sees retry option; next chapter stays locked', async () => {
    const user = userEvent.setup()
    render(<TestApp initialEntries={['/courses/cs-fundamentals/ch-01-how-computers-work']} />)

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /Cara Kerja Komputer — Dari Bit sampai Program Berjalan/i })).toBeInTheDocument()
    })

    // Mostly correct, but Q1 answered wrong (index 0 instead of 1)
    const answers = [0, 2, 1, 1, 0, 2, 0, 1]
    const questions = screen.getAllByRole('group')
    expect(questions).toHaveLength(8)

    for (let i = 0; i < questions.length; i++) {
      const option = within(questions[i]).getAllByRole('radio')[answers[i]]
      await user.click(option)
    }

    await user.click(screen.getByRole('button', { name: /Periksa Jawaban/i }))

    await waitFor(() => {
      expect(screen.getByText(/Belum sempurna/i)).toBeInTheDocument()
    })
    expect(screen.getByText(/Pelajari penjelasan di atas dan coba lagi./i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Ulangi Quiz/i })).toBeInTheDocument()

    // Navigate back to course detail and verify chapter 2 is still locked
    await user.click(screen.getByRole('link', { name: /Kembali ke Course/i }))
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /Computer Science \/ Informatics Fundamentals/i })).toBeInTheDocument()
    })

    const chapterTwoTitle = screen.getByText(/Sistem Bilangan dan Operasi Bit/i)
    const chapterTwoCard = chapterTwoTitle.closest('div[class*="card"]') ?? chapterTwoTitle.closest('div')
    expect(chapterTwoCard).toBeTruthy()
    expect(within(chapterTwoCard as HTMLElement).getByRole('button', { name: /Terkunci/i })).toBeInTheDocument()
  })

  it('Scenario 4: direct navigation to a deep lesson route renders the lesson', async () => {
    render(<TestApp initialEntries={['/courses/cs-fundamentals/ch-01-how-computers-work']} />)

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /Cara Kerja Komputer — Dari Bit sampai Program Berjalan/i })).toBeInTheDocument()
    })

    expect(screen.getByRole('heading', { name: /Dari Listrik ke Bit/i })).toBeInTheDocument()
    expect(screen.getByText(/JavaScript: Mengonversi Desimal ke Biner/i)).toBeInTheDocument()
    expect(screen.getByText(/TypeScript: Konverter Basis Bilangan Type-Safe/i)).toBeInTheDocument()
    expect(screen.getByText(/Go: Bit Manipulation dan Representasi Data/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Periksa Jawaban/i })).toBeInTheDocument()
  })
})
