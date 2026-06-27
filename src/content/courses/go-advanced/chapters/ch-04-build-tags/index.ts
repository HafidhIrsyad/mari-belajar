import type { Chapter } from '@/content/types'
import { ch04Lesson } from './lesson'
import { ch04Quiz } from './quiz'
import { ch04References } from './references'

export const ch04BuildTags: Chapter = {
  id: 'ch-04-build-tags',
  slug: 'ch-04-build-tags',
  order: 4,
  title: 'Build Tags & Cross Compilation',
  summary:
    'Menguasai build constraints, file suffix, cross compilation dengan GOOS/GOARCH, embedding static files, serta konsep reproducible builds dan supply chain signing.',
  estimatedMinutes: 40,
  learningObjectives: [
    'Menggunakan //go:build untuk conditional compilation.',
    'Memanfaatkan file suffix seperti _unix.go dan _windows.go.',
    'Melakukan cross compilation dengan GOOS dan GOARCH.',
    'Menggunakan //go:embed untuk menyematkan file statis ke binary.',
    'Memahami reproducible builds dan pentingnya supply chain signing.',
  ],
  summaryPoints: [
    'Build constraints mengontrol file mana yang dikompilasi berdasarkan tag.',
    '//go:build mendukung ekspresi boolean seperti linux AND amd64.',
    'File suffix seperti _unix.go adalah cara lama yang masih didukung.',
    'GOOS dan GOARCH mengontrol target platform saat cross compile.',
    '//go:embed menyematkan file statis ke binary tanpa membaca disk saat runtime.',
    'Reproducible builds memastikan binary identik untuk sumber yang sama.',
  ],
  references: ch04References,
  lesson: ch04Lesson,
  quiz: ch04Quiz,
}
