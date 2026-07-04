import type { Chapter } from '@/content/types'
import { ch03Lesson } from './lesson'
import { ch03Quiz } from './quiz'
import { ch03References } from './references'

export const ch03DistributedSystemsTheory: Chapter = {
  id: 'ch-03-distributed-systems-theory',
  slug: 'ch-03-distributed-systems-theory',
  order: 3,
  title: 'Distributed Systems Theory',
  summary:
    'Memahami fallacies of distributed computing, model konsistensi, linearizability, teorema CAP dan PACELC, outline protokol Raft, vector clocks, serta batas FLP impossibility.',
  estimatedMinutes: 60,
  learningObjectives: [
    'Mengidentifikasi delapan fallacies of distributed computing dan dampaknya terhadap desain sistem.',
    'Membedakan consistency models: strong, eventual, dan linearizability.',
    'Menjelaskan trade-off CAP dan perluasan PACELC pada kondisi normal vs partisi.',
    'Menguraikan fase Raft: leader election, log replication, dan safety.',
    'Memahami vector clocks untuk ordering event dan batas FLP impossibility.',
  ],
  summaryPoints: [
    'Jaringan tidak andal — latency, bandwidth, dan partial failure adalah norma, bukan pengecualian.',
    'Linearizability menjamin operasi terlihat atomic dan berurutan meski sistem terdistribusi.',
    'CAP: saat partisi, pilih Consistency atau Availability; PACELC memperluas trade-off ke latency.',
    'Raft menyederhanakan consensus dengan leader election dan log replication yang mudah dipahami.',
    'FLP membuktikan tidak ada deterministic consensus algorithm yang guaranteed terminate di async system.',
  ],
  references: ch03References,
  lesson: ch03Lesson,
  quiz: ch03Quiz,
}
