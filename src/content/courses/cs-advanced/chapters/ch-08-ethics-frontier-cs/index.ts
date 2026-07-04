import type { Chapter } from '@/content/types'
import { ch08Lesson } from './lesson'
import { ch08Quiz } from './quiz'
import { ch08References } from './references'

export const ch08EthicsFrontierCs: Chapter = {
  id: 'ch-08-ethics-frontier-cs',
  slug: 'ch-08-ethics-frontier-cs',
  order: 8,
  title: 'Etika dan Frontier CS',
  summary:
    'Mempelajari kode etik ACM/IEEE, privacy by design, GDPR, reliabilitas AI/ML, pengantar komputasi kuantum, dan tata kelola open-source.',
  estimatedMinutes: 48,
  learningObjectives: [
    'Menjelaskan prinsip kode etik ACM dan IEEE Code of Ethics.',
    'Menerapkan privacy by design dalam siklus pengembangan perangkat lunak.',
    'Mengidentifikasi hak dan kewajiban utama GDPR untuk pengembang.',
    'Memahami isu reliabilitas, bias, dan explainability pada sistem AI/ML.',
    'Mengenal dasar komputasi kuantum dan implikasi kriptografi post-quantum.',
    'Memahami model tata kelola open-source dan tanggung jawab maintainer.',
  ],
  summaryPoints: [
    'Kode etik ACM/IEEE menekankan kesejahteraan publik, privasi, kejujuran, dan profesionalisme.',
    'Privacy by design mengintegrasikan privasi sejak desain, bukan sebagai afterthought.',
    'GDPR memberikan hak erasure, portability, dan mewajibkan lawful basis serta data minimization.',
    'AI/ML membutuhkan evaluasi bias, robustness, dan explainability di luar akurasi saja.',
    'Komputasi kuantum mengancam RSA/ECC; migrasi ke algoritma post-quantum sedang berlangsung.',
    'Open-source governance melibatkan lisensi, CLA, security policy, dan sustainability maintainer.',
  ],
  references: ch08References,
  lesson: ch08Lesson,
  quiz: ch08Quiz,
}
