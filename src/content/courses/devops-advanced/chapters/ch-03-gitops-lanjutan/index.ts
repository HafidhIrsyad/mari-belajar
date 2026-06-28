import type { Chapter } from '@/content/types'
import { ch03GitopsLanjutanLesson } from './lesson'
import { ch03GitopsLanjutanQuiz } from './quiz'
import { ch03GitopsLanjutanReferences } from './references'

export const ch03GitopsLanjutan: Chapter = {
  id: "ch-03-gitops-lanjutan",
  slug: "ch-03-gitops-lanjutan",
  order: 3,
  title: "GitOps Lanjutan",
  summary: "Menguasai ArgoCD ApplicationSet, penyimpanan secret aman, progressive delivery, multi-cluster GitOps, dan kebijakan.",
  estimatedMinutes: 50,
  learningObjectives: [
      "Memahami ArgoCD Application dan ApplicationSet.",
      "Mengelola secret di Git dengan SOPS/Sealed Secrets.",
      "Menerapkan progressive delivery dengan Argo Rollouts.",
      "Merancang multi-cluster GitOps.",
      "Mengintegrasikan policy enforcement."
  ],
  summaryPoints: [
      "Git adalah single source of truth untuk desired state cluster.",
      "ApplicationSet membuat banyak Application dari generator.",
      "Secret di Git harus dienkripsi atau diambil dari vault.",
      "Progressive delivery mengurangi risiko deployment.",
      "Policy enforcement memastikan manifest memenuhi standar."
  ],
  references: ch03GitopsLanjutanReferences,
  lesson: ch03GitopsLanjutanLesson,
  quiz: ch03GitopsLanjutanQuiz,
}
