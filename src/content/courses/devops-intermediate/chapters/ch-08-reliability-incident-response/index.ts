import type { Chapter } from '@/content/types'
import { ch08ReliabilityIncidentResponseLesson } from './lesson'
import { ch08ReliabilityIncidentResponseQuiz } from './quiz'
import { ch08ReliabilityIncidentResponseReferences } from './references'

export const ch08ReliabilityIncidentResponse: Chapter = {
  id: "ch-08-reliability-incident-response",
  slug: "ch-08-reliability-incident-response",
  order: 8,
  title: "Reliability & Incident Response",
  summary: "Mempelajari praktik SRE: on-call, severity, runbooks, postmortem blameless, error budgets, chaos engineering, game days, dan capacity planning untuk sistem yang andal.",
  estimatedMinutes: 45,
  learningObjectives: [
    "Menjelaskan peran on-call dan severity levels.",
    "Membuat runbook dan postmortem blameless.",
    "Memahami SLO, SLI, SLA, dan error budget.",
    "Merancang chaos engineering dan game days.",
    "Menerapkan capacity planning dan resilience patterns.",
  ],
  summaryPoints: [
    "On-call memerlukan rotasi yang adil, runbook yang jelas, dan escalation path.",
    "Blameless postmortem fokus pada sistem, bukan individu.",
    "Error budget menyeimbangkan reliability dengan velocity.",
    "Chaos engineering memvalidasi asumsi ketahanan di production-like environment.",
    "Capacity planning mencegah kehabisan resource saat beban naik.",
  ],
  references: ch08ReliabilityIncidentResponseReferences,
  lesson: ch08ReliabilityIncidentResponseLesson,
  quiz: ch08ReliabilityIncidentResponseQuiz,
}
