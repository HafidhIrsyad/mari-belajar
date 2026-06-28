import type { Chapter } from '@/content/types'
import { ch04GitopsLesson } from './lesson'
import { ch04GitopsQuiz } from './quiz'
import { ch04GitopsReferences } from './references'

export const ch04Gitops: Chapter = {
  id: "ch-04-gitops",
  slug: "ch-04-gitops",
  order: 4,
  title: "GitOps",
  summary: "Memahami GitOps sebagai paradigma deployment dengan Git sebagai single source of truth, operator seperti ArgoCD dan Flux, sync waves, drift detection, rollback, serta praktik multi-cluster.",
  estimatedMinutes: 45,
  learningObjectives: [
    "Membedakan deployment model push dan pull.",
    "Menjelaskan konsep Git sebagai single source of truth.",
    "Mengoperasikan ArgoCD/Flux untuk sinkronisasi otomatis.",
    "Menggunakan sync waves dan health assessment.",
    "Merancankan rollback dan multi-cluster GitOps.",
  ],
  summaryPoints: [
    "GitOps menggunakan Git sebagai sumber kebenaran untuk state cluster.",
    "Pull model memiliki agen di cluster yang menarik perubahan dari Git.",
    "ArgoCD dan Flux adalah operator GitOps populer untuk Kubernetes.",
    "Sync waves mengatur urutan deployment antar resource.",
    "Rollback GitOps dilakukan dengan merevert commit atau branch.",
  ],
  references: ch04GitopsReferences,
  lesson: ch04GitopsLesson,
  quiz: ch04GitopsQuiz,
}
