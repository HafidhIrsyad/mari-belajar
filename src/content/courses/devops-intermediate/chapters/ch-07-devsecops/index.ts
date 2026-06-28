import type { Chapter } from '@/content/types'
import { ch07DevsecopsLesson } from './lesson'
import { ch07DevsecopsQuiz } from './quiz'
import { ch07DevsecopsReferences } from './references'

export const ch07Devsecops: Chapter = {
  id: "ch-07-devsecops",
  slug: "ch-07-devsecops",
  order: 7,
  title: "DevSecOps",
  summary: "Mengintegrasikan security ke dalam pipeline DevOps melalui dependency scanning, secret scanning, SAST/DAST, container image scanning, SBOM, signing artifacts, dan supply chain security.",
  estimatedMinutes: 45,
  learningObjectives: [
    "Menjelaskan konsep shift-left security.",
    "Menerapkan dependency scanning dan secret scanning di CI.",
    "Memahami perbedaan SAST, DAST, dan container image scanning.",
    "Menghasilkan dan memverifikasi SBOM.",
    "Menandatangani artifact untuk keamanan supply chain.",
  ],
  summaryPoints: [
    "Shift-left security menemukan masalah lebih awal dan lebih murah.",
    "SAST menganalisis source code, DAST menguji aplikasi yang berjalan.",
    "Container image scanning mendeteksi CVE di image.",
    "SBOM mendokumentasikan semua komponen software.",
    "Signing artifact memastikan integritas dan asal usul software.",
  ],
  references: ch07DevsecopsReferences,
  lesson: ch07DevsecopsLesson,
  quiz: ch07DevsecopsQuiz,
}
