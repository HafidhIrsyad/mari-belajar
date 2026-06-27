import type { Chapter } from '@/content/types'
import { ch01Lesson } from './lesson'
import { ch01Quiz } from './quiz'
import { ch01References } from './references'

export const ch01DistributedSystemsBasics: Chapter = {
  id: 'ch-01-distributed-systems-basics',
  slug: 'ch-01-distributed-systems-basics',
  order: 1,
  title: 'Distributed Systems Basics',
  summary:
    'Memahami fondasi sistem terdistribusi: perbedaan monolith dan microservices, batasan service, remote call, teorema CAP, fallacies jaringan, konsistensi eventual, service discovery, load balancing, dan teknik estimasi cepat.',
  estimatedMinutes: 50,
  learningObjectives: [
    'Membedakan arsitektur monolith, modular monolith, dan microservices serta konsekuensinya.',
    'Menjelaskan teorema CAP dan trade-off antara konsistensi, ketersediaan, dan toleransi partisi.',
    'Mengenali delapan fallacies of distributed computing dan dampaknya terhadap desain.',
    'Memahami eventual consistency dan teknik reconciliasi data.',
    'Menguraikan peran service discovery, load balancing, dan back-of-the-envelope estimation.',
  ],
  summaryPoints: [
    'Distributed system adalah kumpulan komputer independen yang bekerja sama melalui jaringan untuk mencapai tujuan bersama.',
    'Memecah monolith menjadi microservices meningkatkan autonomy tetapi menambah latency, partial failure, dan kompleksitas operasional.',
    'CAP theorem menyatakan pada saat partisi jaringan, sistem harus memilih antara consistency atau availability.',
    'Network tidak andal: latency bervariasi, bandwidth terbatas, dan partial failure adalah norma.',
    'Service discovery dan load balancer memungkinkan service menemukan dan mendistribusikan beban secara dinamis.',
  ],
  references: ch01References,
  lesson: ch01Lesson,
  quiz: ch01Quiz,
}
