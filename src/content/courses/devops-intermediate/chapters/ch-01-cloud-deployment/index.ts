import type { Chapter } from '@/content/types'
import { ch01CloudDeploymentLesson } from './lesson'
import { ch01CloudDeploymentQuiz } from './quiz'
import { ch01CloudDeploymentReferences } from './references'

export const ch01CloudDeployment: Chapter = {
  id: "ch-01-cloud-deployment",
  slug: "ch-01-cloud-deployment",
  order: 1,
  title: "Cloud Deployment",
  summary: "Memahami model layanan cloud (IaaS/PaaS/SaaS), deployment di VM, container, serverless, dan edge, serta trade-off operational, ekonomi, dan keamanan di cloud public.",
  estimatedMinutes: 45,
  learningObjectives: [
    "Membedakan model layanan cloud dan model deployment (public/private/hybrid/multi).",
    "Menjelaskan shared responsibility model dan komponen utama deployment cloud.",
    "Memilih strategi deployment yang tepat berdasarkan karakteristik aplikasi.",
    "Memahami internalitas serverless dan edge deployment.",
    "Menganalisis trade-off biaya, skalabilitas, dan kontrol di cloud.",
  ],
  summaryPoints: [
    "IaaS memberikan kontrol paling tinggi; SaaS mengabstraksi semua infrastruktur; PaaS berada di tengah.",
    "Public cloud menawarkan skala elastis; private/hybrid memberikan kontrol kepatuhan; multi-cloud mengurangi vendor lock-in.",
    "Serverless mengelola execution environment secara otomatis namun memiliki cold start dan batas runtime.",
    "Edge deployment menempatkan compute dekat pengguna untuk latensi rendah.",
    "Shared responsibility membagi tanggung jawab keamanan antara provider dan customer.",
  ],
  references: ch01CloudDeploymentReferences,
  lesson: ch01CloudDeploymentLesson,
  quiz: ch01CloudDeploymentQuiz,
}
