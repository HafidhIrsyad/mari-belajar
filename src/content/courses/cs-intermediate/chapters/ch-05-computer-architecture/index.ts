import type { Chapter } from '@/content/types'
import { ch05Lesson } from './lesson'
import { ch05Quiz } from './quiz'
import { ch05References } from './references'

export const ch05ComputerArchitecture: Chapter = {
  id: 'ch-05-computer-architecture',
  slug: 'ch-05-computer-architecture',
  order: 5,
  title: 'Arsitektur Komputer',
  summary:
    'Memahami pipeline CPU, hierarki cache L1/L2/L3, prinsip locality, branch prediction, virtual memory, paging, TLB, dan page fault sebagai fondasi performa program.',
  estimatedMinutes: 50,
  learningObjectives: [
    'Menjelaskan tahapan pipeline CPU dan dampak hazard terhadap throughput instruksi.',
    'Membedakan cache L1, L2, L3 serta mengaitkannya dengan temporal dan spatial locality.',
    'Memahami cara branch predictor mengurangi pipeline stall dan kapan prediksi gagal.',
    'Menjelaskan virtual memory, page table, dan peran TLB dalam translasi alamat.',
    'Mengenali page fault dan implikasinya terhadap latency aplikasi.',
  ],
  summaryPoints: [
    'Pipeline memecah eksekusi instruksi menjadi tahap fetch-decode-execute agar throughput meningkat.',
    'Cache L1 kecil dan cepat; L2/L3 lebih besar tetapi lebih lambat — desain data structure harus memanfaatkan locality.',
    'Branch misprediction mem-flush pipeline dan bisa lebih mahal daripada cache miss kecil.',
    'Virtual memory memberikan isolasi proses dan ilusi memori kontigu melalui paging.',
    'TLB adalah cache untuk translasi page table; page fault terjadi saat halaman belum ada di RAM.',
  ],
  references: ch05References,
  lesson: ch05Lesson,
  quiz: ch05Quiz,
}
