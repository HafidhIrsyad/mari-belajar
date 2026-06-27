import type { Chapter } from '@/content/types'
import { ch07Lesson } from './lesson'
import { ch07Quiz } from './quiz'
import { ch07References } from './references'

export const ch07ErrorHandlingAndModules: Chapter = {
  id: 'ch-07-error-handling-and-modules',
  slug: 'ch-07-error-handling-and-modules',
  order: 7,
  title: 'Error Handling & Modules',
  summary:
    'Mempelajari error sebagai nilai, error interface, custom error, error wrapping, modules dan versioning, workspace, serta dependency management di Go.',
  estimatedMinutes: 35,
  learningObjectives: [
    'Memahami error sebagai nilai di Go.',
    'Membuat error dengan errors.New dan fmt.Errorf.',
    'Membuat custom error dengan type yang mengimplementasikan error.',
    'Menggunakan errors.Is dan errors.As untuk error checking.',
    'Mengelola module dengan go.mod dan go.sum.',
    'Memahami semantic versioning dan minimal version selection.',
  ],
  summaryPoints: [
    'Di Go, error adalah interface dengan satu method Error() string.',
    'errors.New dan fmt.Errorf digunakan untuk membuat error sederhana.',
    'Error wrapping dengan fmt.Errorf("...: %w", err) mempertahankan chain error.',
    'errors.Is memeriksa kesamaan error dalam chain; errors.As mengakses tipe error spesifik.',
    'go.mod mendeklarasikan module path dan dependencies dengan versi minimum.',
    'Go menggunakan minimal version selection (MVS) untuk menentukan versi dependency.',
    'go.work digunakan untuk mengelola multiple module dalam satu workspace.',
  ],
  references: ch07References,
  lesson: ch07Lesson,
  quiz: ch07Quiz,
}
