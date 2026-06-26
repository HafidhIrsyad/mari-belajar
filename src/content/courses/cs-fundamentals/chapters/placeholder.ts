import type { Chapter, Lesson, Quiz } from '@/content/types'

export function createPlaceholderLesson(title: string): Lesson {
  return {
    id: `lesson-${title.toLowerCase().replace(/\s+/g, '-')}`,
    estimatedMinutes: 10,
    sections: [
      {
        id: 'placeholder',
        type: 'markdown',
        level: 'basic',
        title: 'Segera Hadir',
        content: `## Konten Sedang Dalam Pengembangan

Bab ini akan membahas topik yang lebih mendalam. Silakan selesaikan bab-bab sebelumnya untuk membuka akses ke materi selanjutnya.`,
      },
    ],
  }
}

export function createPlaceholderQuiz(): Quiz {
  return {
    id: 'placeholder-quiz',
    title: 'Quiz Placeholder',
    passingScore: 3,
    questions: [
      {
        id: 'q-placeholder-1',
        order: 1,
        prompt: 'Pilihlah jawaban yang benar.',
        options: ['Salah', 'Benar', 'Salah', 'Salah'],
        correctOptionIndex: 1,
        explanation: 'Ini adalah quiz placeholder untuk bab yang sedang dalam pengembangan.',
      },
      {
        id: 'q-placeholder-2',
        order: 2,
        prompt: 'Berapa jumlah bit dalam satu byte?',
        options: ['4', '8', '16', '32'],
        correctOptionIndex: 1,
        explanation: '1 byte = 8 bit.',
      },
      {
        id: 'q-placeholder-3',
        order: 3,
        prompt: 'Komputer menggunakan sistem bilangan apa secara internal?',
        options: ['Desimal', 'Biner', 'Oktal', 'Heksadesimal'],
        correctOptionIndex: 1,
        explanation: 'Komputer bekerja dengan sistem biner (0 dan 1).',
      },
    ],
  }
}

export function createPlaceholderChapter(
  id: string,
  order: number,
  title: string,
  summary: string
): Chapter {
  return {
    id,
    slug: id,
    order,
    title,
    summary,
    estimatedMinutes: 10,
    learningObjectives: ['Memahami topik yang akan dibahas pada bab ini.'],
    summaryPoints: ['Topik ini akan dijelaskan secara lengkap pada rilis berikutnya.'],
    lesson: createPlaceholderLesson(title),
    quiz: createPlaceholderQuiz(),
  }
}
