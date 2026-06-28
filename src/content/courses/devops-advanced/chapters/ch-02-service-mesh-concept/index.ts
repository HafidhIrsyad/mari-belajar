import type { Chapter } from '@/content/types'
import { ch02ServiceMeshConceptLesson } from './lesson'
import { ch02ServiceMeshConceptQuiz } from './quiz'
import { ch02ServiceMeshConceptReferences } from './references'

export const ch02ServiceMeshConcept: Chapter = {
  id: "ch-02-service-mesh-concept",
  slug: "ch-02-service-mesh-concept",
  order: 2,
  title: "Service Mesh (Konsep)",
  summary: "Memahami arsitektur service mesh, sidecar proxy, mTLS, traffic management, observability, dan zero-trust networking.",
  estimatedMinutes: 50,
  learningObjectives: [
      "Menjelaskan peran data plane dan control plane.",
      "Memahami sidecar pattern dan injeksi proses.",
      "Mengkonfigurasi traffic split, retries, dan mTLS.",
      "Mengidentifikasi keuntungan dan biaya service mesh.",
      "Memahami zero-trust networking di mesh."
  ],
  summaryPoints: [
      "Service mesh menyediakan komunikasi service-to-service yang aman dan terobservasi.",
      "Sidecar proxy mengintersep lalu lintas keluar-masuk Pod.",
      "mTLS otomatis memastikan autentikasi dan enkripsi antar service.",
      "Traffic management: split, retries, timeouts, circuit breaker.",
      "Zero-trust: tidak ada trust implisit berdasarkan network location."
  ],
  references: ch02ServiceMeshConceptReferences,
  lesson: ch02ServiceMeshConceptLesson,
  quiz: ch02ServiceMeshConceptQuiz,
}
