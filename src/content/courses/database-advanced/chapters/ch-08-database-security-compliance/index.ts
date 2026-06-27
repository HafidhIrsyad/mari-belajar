import type { Chapter } from '@/content/types'
import { ch08Lesson } from './lesson'
import { ch08Quiz } from './quiz'
import { ch08References } from './references'

export const ch08DatabaseSecurityCompliance: Chapter = {
  id: "ch-08-database-security-compliance",
  slug: "ch-08-database-security-compliance",
  order: 8,
  title: "Database Security & Compliance",
  summary: "Mempelajari prinsip least privilege, enkripsi, row-level security, audit logging, data masking, anonymization, serta kepatuhan privasi seperti GDPR.",
  estimatedMinutes: 60,
  learningObjectives: [
    "Menerapkan prinsip least privilege pada user dan role database.",
    "Menggunakan enkripsi at rest dan in transit.",
    "Mengkonfigurasi row-level security (RLS) untuk pembatasan akses per row.",
    "Merancang audit logging untuk compliance.",
    "Memahami data masking, anonymization, dan regulasi GDPR.",
  ],
  summaryPoints: [
    "Least privilege membatasi akses user hanya pada data dan operasi yang diperlukan.",
    "Enkripsi at rest melindungi data di penyimpanan; in transit melindungi data saat bergerak di jaringan.",
    "RLS secara transparan membatasi row yang dapat diakses user berdasarkan policy.",
    "Audit logging mencatat siapa yang mengakses atau mengubah data sensitif.",
    "Data masking dan anonymization mengurangi risiko expose data PII saat testing dan reporting.",
  ],
  references: ch08References,
  lesson: ch08Lesson,
  quiz: ch08Quiz,
}
