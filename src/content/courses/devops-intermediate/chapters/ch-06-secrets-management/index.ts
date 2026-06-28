import type { Chapter } from '@/content/types'
import { ch06SecretsManagementLesson } from './lesson'
import { ch06SecretsManagementQuiz } from './quiz'
import { ch06SecretsManagementReferences } from './references'

export const ch06SecretsManagement: Chapter = {
  id: "ch-06-secrets-management",
  slug: "ch-06-secrets-management",
  order: 6,
  title: "Secrets Management",
  summary: "Mempelajari praktik pengelolaan secret: tidak hardcode, secret manager, HashiCorp Vault, dynamic secrets, short-lived credentials, rotasi, dan integrasi dengan aplikasi.",
  estimatedMinutes: 45,
  learningObjectives: [
    "Menjelaskan risiko hardcoded secrets dan pentingnya secret scanning.",
    "Menggunakan cloud secret manager dan HashiCorp Vault.",
    "Memahami dynamic secrets dan short-lived credentials.",
    "Menerapkan rotasi secret secara aman.",
    "Mengintegrasikan secret management ke aplikasi dengan aman.",
  ],
  summaryPoints: [
    "Secret tidak boleh disimpan di source code atau repository.",
    "Cloud secret manager dan Vault menyediakan penyimpanan terpusat dengan akses terkontrol.",
    "Dynamic secrets dibuat sesuai permintaan dan memiliki masa hidup singkat.",
    "Rotasi secret secara rutin mengurangi dampak jika credential bocor.",
    "Aplikasi harus memuat secret di runtime, bukan di build time.",
  ],
  references: ch06SecretsManagementReferences,
  lesson: ch06SecretsManagementLesson,
  quiz: ch06SecretsManagementQuiz,
}
