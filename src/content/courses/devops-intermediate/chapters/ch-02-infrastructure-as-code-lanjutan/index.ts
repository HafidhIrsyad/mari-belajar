import type { Chapter } from '@/content/types'
import { ch02InfrastructureAsCodeLanjutanLesson } from './lesson'
import { ch02InfrastructureAsCodeLanjutanQuiz } from './quiz'
import { ch02InfrastructureAsCodeLanjutanReferences } from './references'

export const ch02InfrastructureAsCodeLanjutan: Chapter = {
  id: "ch-02-infrastructure-as-code-lanjutan",
  slug: "ch-02-infrastructure-as-code-lanjutan",
  order: 2,
  title: "Infrastructure as Code Lanjutan",
  summary: "Mendalami Terraform module, remote state backend, workspace, policy as code, drift detection, dan pengujian Infrastructure as Code untuk tim yang beroperasi pada skala besar.",
  estimatedMinutes: 50,
  learningObjectives: [
    "Merancang dan menggunakan Terraform module yang reusable.",
    "Mengelola state file dengan remote backend dan locking.",
    "Memahami alur kerja plan/apply dan state sensitivity.",
    "Menerapkan policy as code dengan OPA/Sentinel.",
    "Menguji Infrastructure as Code dan mendeteksi drift.",
  ],
  summaryPoints: [
    "Module Terraform mempromosikan DRY dan reusable infrastructure definition.",
    "Remote state backend memungkinkan kolaborasi dan locking mencegah race condition.",
    "State file berisi mapping resource ke ID cloud dan harus diperlakukan sebagai sensitive data.",
    "Policy as code memastikan setiap perubahan infrastruktur memenuhi kebijakan organisasi.",
    "Drift detection mengidentifikasi perubahan manual yang tidak tercatat di kode.",
  ],
  references: ch02InfrastructureAsCodeLanjutanReferences,
  lesson: ch02InfrastructureAsCodeLanjutanLesson,
  quiz: ch02InfrastructureAsCodeLanjutanQuiz,
}
