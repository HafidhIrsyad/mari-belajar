import type { Chapter } from '@/content/types'
import { ch08Lesson } from './lesson'
import { ch08Quiz } from './quiz'
import { ch08References } from './references'

export const ch08BenchmarkingProfiling: Chapter = {
  id: 'ch-08-benchmarking-profiling',
  slug: 'ch-08-benchmarking-profiling',
  order: 8,
  title: 'Benchmarking & Profiling',
  summary:
    'Mengukur performa kode Go dengan benchmark, menganalisis CPU dan memori dengan pprof, serta memahami trade-off optimasi dan common pitfalls saat benchmarking.',
  estimatedMinutes: 40,
  learningObjectives: [
    'Menulis benchmark dengan testing.B dan loop b.N.',
    'Menjalankan benchmark dengan go test -bench.',
    'Mengukur alokasi memori dalam benchmark.',
    'Menghasilkan dan membaca profil CPU serta memori dengan pprof.',
    'Membaca flame graph untuk mengidentifikasi hot path.',
    'Menghindari kesalahan umum saat benchmarking.',
  ],
  summaryPoints: [
    'Benchmark di Go ditulis sebagai func BenchmarkXxx(b *testing.B).',
    'Loop benchmark menggunakan b.N yang ditentukan oleh testing package.',
    'go test -bench=. menjalankan semua benchmark.',
    'Alokasi memori dapat diukur dengan b.ReportAllocs().',
    'pprof menghasilkan profil CPU dan memori untuk analisis performa.',
    'Flame graph membantu visualisasi hot path dan waktu yang dihabiskan di setiap fungsi.',
  ],
  references: ch08References,
  lesson: ch08Lesson,
  quiz: ch08Quiz,
}
