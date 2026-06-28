import type { Chapter } from '@/content/types'
import { ch04SrePracticesLesson } from './lesson'
import { ch04SrePracticesQuiz } from './quiz'
import { ch04SrePracticesReferences } from './references'

export const ch04SrePractices: Chapter = {
  id: "ch-04-sre-practices",
  slug: "ch-04-sre-practices",
  order: 4,
  title: "SRE Practices",
  summary: "Menerapkan SLO, SLI, SLA, error budget, toil reduction, dan kebijakan error budget untuk sistem yang andal.",
  estimatedMinutes: 45,
  learningObjectives: [
      "Membedakan SLI, SLO, SLA, dan error budget.",
      "Menghitung error budget dan burn rate.",
      "Mengidentifikasi toil dan strategi reduksinya.",
      "Merancang error budget policy.",
      "Menyusun reliability roadmap."
  ],
  summaryPoints: [
      "SLI mengukur performa service; SLO adalah target SLI; SLA adalah komitmen bisnis.",
      "Error budget = 1 - SLO dalam periode waktu tertentu.",
      "Toil adalah pekerjaan manual, berulang, dan otomatisabel yang harus dikurangi.",
      "Error budget policy menentukan aksi saat budget habis.",
      "Reliability roadmap memprioritaskan investasi berdasarkan risiko."
  ],
  references: ch04SrePracticesReferences,
  lesson: ch04SrePracticesLesson,
  quiz: ch04SrePracticesQuiz,
}
