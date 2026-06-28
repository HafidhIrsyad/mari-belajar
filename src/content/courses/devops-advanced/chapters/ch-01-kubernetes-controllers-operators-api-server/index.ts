import type { Chapter } from '@/content/types'
import { ch01KubernetesControllersOperatorsApiServerLesson } from './lesson'
import { ch01KubernetesControllersOperatorsApiServerQuiz } from './quiz'
import { ch01KubernetesControllersOperatorsApiServerReferences } from './references'

export const ch01KubernetesControllersOperatorsApiServer: Chapter = {
  id: "ch-01-kubernetes-controllers-operators-api-server",
  slug: "ch-01-kubernetes-controllers-operators-api-server",
  order: 1,
  title: "Kubernetes Controllers, Operators & API Server Internals",
  summary: "Memahami pola controller, informer, workqueue, leader election, CRD, operator, admission webhook, dan alur permintaan di API server Kubernetes.",
  estimatedMinutes: 55,
  learningObjectives: [
      "Menjelaskan perbedaan state desired dan actual di Kubernetes.",
      "Memahami pola controller watch-diff-act dan peran informer.",
      "Menggunakan workqueue dan leader election untuk controller konkuren.",
      "Merancang CRD dan custom controller sederhana.",
      "Menjelaskan admission webhooks dan aggregasi API server."
  ],
  summaryPoints: [
      "Controller terus-menerus merekonsiliasi desired state dengan actual state.",
      "Informer menyediakan cache lokal dan event handler berbasis watch dari API server.",
      "CRD memperluas API Kubernetes tanpa mengubah kode API server.",
      "Operator mengemas custom controller, CRD, dan sumber daya terkait.",
      "Admission webhooks dapat memvalidasi atau memutasikan objek sebelum disimpan etcd."
  ],
  references: ch01KubernetesControllersOperatorsApiServerReferences,
  lesson: ch01KubernetesControllersOperatorsApiServerLesson,
  quiz: ch01KubernetesControllersOperatorsApiServerQuiz,
}
