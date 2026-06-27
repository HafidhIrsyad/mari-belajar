import type { Chapter } from '@/content/types'
import { ch08Lesson } from './lesson'
import { ch08Quiz } from './quiz'
import { ch08References } from './references'

export const ch08TestingAndToolingDasar: Chapter = {
  id: 'ch-08-testing-and-tooling-dasar',
  slug: 'ch-08-testing-and-tooling-dasar',
  order: 8,
  title: 'Testing & Tooling Dasar',
  summary:
    'Mempelajari testing bawaan Go, table-driven tests, benchmarking, race detector, go vet, go fmt, profiling, dan tooling penting lainnya untuk memastikan kualitas kode Go.',
  estimatedMinutes: 35,
  learningObjectives: [
    'Menulis unit test dengan package testing.',
    'Membuat table-driven test.',
    'Menulis benchmark dan membaca hasilnya.',
    'Menggunakan go vet untuk menemukan bug statis.',
    'Memahami race detector dan cara menggunakannya.',
    'Memahami profiling dasar dengan pprof.',
  ],
  summaryPoints: [
    'File test di Go memiliki suffix _test.go.',
    'testing.T digunakan untuk unit test, testing.B untuk benchmark.',
    'Table-driven test adalah idiom Go untuk menguji banyak kasus dalam satu fungsi.',
    'Benchmark mengukur operasi per detik dan alokasi memori.',
    'go vet melakukan static analysis untuk menemukan bug umum.',
    'Race detector (-race) membantu menemukan data race pada kode konkuren.',
    'pprof menyediakan CPU dan memory profiling untuk menganalisis performa.',
  ],
  references: ch08References,
  lesson: ch08Lesson,
  quiz: ch08Quiz,
}
