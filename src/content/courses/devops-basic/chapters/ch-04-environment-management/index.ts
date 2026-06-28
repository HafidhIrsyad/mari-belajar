import type { Chapter } from '@/content/types'
import { ch04Lesson } from './lesson'
import { ch04Quiz } from './quiz'
import { ch04References } from './references'

export const ch04EnvironmentManagement: Chapter = {
  id: 'ch-04-environment-management',
  slug: 'ch-04-environment-management',
  order: 4,
  title: 'Environment Management',
  summary:
    'Memahami manajemen environment: dev, staging, production, environment variables, 12-factor config, secrets management, feature flags, dan externalized configuration.',
  estimatedMinutes: 35,
  learningObjectives: [
    'Membedakan environment dev, staging, dan production beserta tujuannya.',
    'Menerapkan prinsip config terpisah dari code.',
    'Mengelola secrets dan environment variables dengan aman.',
    'Memahami 12-factor app terkait konfigurasi.',
    'Menerapkan feature flags dan externalized configuration.',
  ],
  summaryPoints: [
    'Environment adalah deployment target dengan karakteristik resource dan data yang berbeda.',
    'Konfigurasi harus dipisahkan dari kode dan disimpan di environment.',
    'Secrets tidak boleh di-hardcode dan harus diinjeksikan saat runtime.',
    '12-factor app menekankan konfigurasi melalui environment variables.',
    'Feature flags memungkinkan rilis fitur tanpa deploy ulang.',
  ],
  references: ch04References,
  lesson: ch04Lesson,
  quiz: ch04Quiz,
}
