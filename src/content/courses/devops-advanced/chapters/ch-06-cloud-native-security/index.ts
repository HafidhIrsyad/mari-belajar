import type { Chapter } from '@/content/types'
import { ch06CloudNativeSecurityLesson } from './lesson'
import { ch06CloudNativeSecurityQuiz } from './quiz'
import { ch06CloudNativeSecurityReferences } from './references'

export const ch06CloudNativeSecurity: Chapter = {
  id: "ch-06-cloud-native-security",
  slug: "ch-06-cloud-native-security",
  order: 6,
  title: "Cloud Native Security",
  summary: "Menguasai container security, image scanning, Kubernetes RBAC, network policies, pod security standards, supply chain security, dan runtime security dengan Falco.",
  estimatedMinutes: 50,
  learningObjectives: [
      "Menerapkan best practice keamanan container dan Dockerfile.",
      "Mengkonfigurasi Kubernetes RBAC dan network policies.",
      "Memahami pod security standards dan admission controllers.",
      "Menerapkan supply chain security dengan SLSA.",
      "Menggunakan runtime security tools seperti Falco."
  ],
  summaryPoints: [
      "Container security dimulai dari Dockerfile: non-root user, minimal base image, no secrets.",
      "RBAC mengontrol siapa dapat melakukan apa di cluster Kubernetes.",
      "NetworkPolicy membatasi lalu lintas antar Pod.",
      "Supply chain security melindungi pipeline build dari tampering.",
      "Runtime security mendeteksi perilaku anomali saat container berjalan."
  ],
  references: ch06CloudNativeSecurityReferences,
  lesson: ch06CloudNativeSecurityLesson,
  quiz: ch06CloudNativeSecurityQuiz,
}
