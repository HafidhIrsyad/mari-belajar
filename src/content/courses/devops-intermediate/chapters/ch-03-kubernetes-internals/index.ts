import type { Chapter } from '@/content/types'
import { ch03KubernetesInternalsLesson } from './lesson'
import { ch03KubernetesInternalsQuiz } from './quiz'
import { ch03KubernetesInternalsReferences } from './references'

export const ch03KubernetesInternals: Chapter = {
  id: "ch-03-kubernetes-internals",
  slug: "ch-03-kubernetes-internals",
  order: 3,
  title: "Kubernetes Internals: Control Plane, etcd, Scheduler & Networking",
  summary: "Memahami internalitas Kubernetes mulai dari control plane, etcd dan konsensus RAFT, scheduler, controller pattern, hingga networking dan antarmuka CRI/CNI/CSI.",
  estimatedMinutes: 55,
  learningObjectives: [
    "Menjelaskan komponen control plane dan node Kubernetes.",
    "Memahami etcd data model dan algoritma RAFT consensus.",
    "Menguraikan alur scheduling pod berdasarkan predicates dan priorities.",
    "Menjelaskan controller pattern, informers, dan admission webhooks.",
    "Memahami CNI networking dan antarmuka CRI/CNI/CSI.",
  ],
  summaryPoints: [
    "API server adalah gateway ke etcd; semua komponen berkomunikasi melaluinya.",
    "etcd menyimpan seluruh state cluster menggunakan konsensus RAFT.",
    "Scheduler memilih node untuk pod berdasarkan predicates (filter) dan priorities (skor).",
    "Controller pattern menggunakan loop watch-diff-act untuk menjaga desired state.",
    "CNI menghubungkan pod ke jaringan; CRI mengabstraksi runtime container; CSI mengabstraksi storage.",
  ],
  references: ch03KubernetesInternalsReferences,
  lesson: ch03KubernetesInternalsLesson,
  quiz: ch03KubernetesInternalsQuiz,
}
