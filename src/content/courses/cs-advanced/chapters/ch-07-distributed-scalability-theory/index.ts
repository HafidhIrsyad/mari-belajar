import type { Chapter } from '@/content/types'
import { ch07Lesson } from './lesson'
import { ch07Quiz } from './quiz'
import { ch07References } from './references'

export const ch07DistributedScalabilityTheory: Chapter = {
  id: 'ch-07-distributed-scalability-theory',
  slug: 'ch-07-distributed-scalability-theory',
  order: 7,
  title: 'Teori Skalabilitas Terdistribusi',
  summary:
    'Mempelajari Little\'s Law, teori antrian, trade-off konsistensi-latency, quorum reads/writes, Byzantine fault tolerance, dan teorema PACELC untuk sistem terdistribusi skala besar.',
  estimatedMinutes: 52,
  learningObjectives: [
    'Menerapkan Little\'s Law untuk menganalisis throughput dan latency sistem.',
    'Memahami model antrian M/M/1 dan implikasinya pada kapasitas sistem.',
    'Menjelaskan trade-off konsistensi dan latency dalam sistem terdistribusi.',
    'Menganalisis quorum reads/writes untuk replikasi dan toleransi kegagalan.',
    'Memahami Byzantine fault tolerance dan teorema PACELC sebagai perluasan CAP.',
  ],
  summaryPoints: [
    'Little\'s Law: L = λW — jumlah item dalam sistem = arrival rate × waktu tinggal rata-rata.',
    'Antrian dengan utilization mendekati 100% menyebabkan latency meningkat drastis (non-linear).',
    'Konsistensi kuat menambah latency koordinasi; eventual consistency memungkinkan respons lebih cepat.',
    'Quorum: R + W > N menjamin read-your-writes; R + W ≤ N memungkinkan operasi paralel dengan trade-off.',
    'BFT toleransi f node Byzantine membutuhkan minimal 3f+1 replika (PBFT).',
    'PACELC: jika Partisi → Availability vs Consistency; Else → Latency vs Consistency.',
  ],
  references: ch07References,
  lesson: ch07Lesson,
  quiz: ch07Quiz,
}
