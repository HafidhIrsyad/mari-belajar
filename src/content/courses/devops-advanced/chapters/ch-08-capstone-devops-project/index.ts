import type { Chapter } from '@/content/types'
import { ch08CapstoneDevopsProjectLesson } from './lesson'
import { ch08CapstoneDevopsProjectQuiz } from './quiz'
import { ch08CapstoneDevopsProjectReferences } from './references'

export const ch08CapstoneDevopsProject: Chapter = {
  id: "ch-08-capstone-devops-project",
  slug: "ch-08-capstone-devops-project",
  order: 8,
  title: "Capstone DevOps Project",
  summary: "Proyek end-to-end: pipeline CI/CD dari commit ke deploy K8s via ArgoCD, observability, alerting, rollback, dan security scanning untuk aplikasi full-stack.",
  estimatedMinutes: 60,
  learningObjectives: [
      "Merancang pipeline end-to-end dari commit sampai production.",
      "Mengintegrasikan GitHub Actions, Docker build, dan ArgoCD deploy.",
      "Menambahkan observability stack (Prometheus, Grafana).",
      "Menerapkan rollback strategy dan security scanning.",
      "Menyusun runbook dan incident response plan."
  ],
  summaryPoints: [
      "Capstone menggabungkan semua konsep DevOps dari M18-M20.",
      "Pipeline: lint → test → build → scan → push → deploy via GitOps.",
      "Observability: metrics, logs, traces, dan SLO-based alerting.",
      "Rollback via ArgoCD history atau progressive delivery abort.",
      "Security scanning di CI mencegah vulnerable image masuk production."
  ],
  references: ch08CapstoneDevopsProjectReferences,
  lesson: ch08CapstoneDevopsProjectLesson,
  quiz: ch08CapstoneDevopsProjectQuiz,
}
