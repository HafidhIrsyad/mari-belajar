import type { Chapter } from '@/content/types'
import { ch08Lesson } from './lesson'
import { ch08Quiz } from './quiz'
import { ch08References } from './references'

export const ch08SecurityLanjutanCompliance: Chapter = {
  id: 'ch-08-security-lanjutan-compliance',
  slug: 'ch-08-security-lanjutan-compliance',
  order: 8,
  title: 'Security Lanjutan & Compliance',
  summary:
    'Mempelajari OWASP API Security, OAuth2 scopes, audit logging, zero trust, mTLS, enkripsi at rest/transit, serta pengantar GDPR dan privacy compliance.',
  estimatedMinutes: 50,
  learningObjectives: [
    'Mengenali OWASP API Security Top 10 dan mitigasinya.',
    'Menerapkan OAuth2 scopes dan authorization berbasis klaim.',
    'Menyusun audit logging untuk kepatuhan dan forensik.',
    'Memahami zero trust dan mTLS antar service.',
    'Mengenali GDPR serta prinsip enkripsi at rest dan in transit.',
  ],
  summaryPoints: [
    'OWASP API Security Top 10 mencakup broken object level authorization, excessive data exposure, dan security misconfiguration.',
    'OAuth2 scopes membatasi apa yang dapat dilakukan token.',
    'Audit logging mencatat siapa yang mengakses apa, kapan, dan hasilnya.',
    'Zero trust mengasumsikan tidak ada zona aman; setiap akses harus diautentikasi dan diautorisasi.',
    'Enkripsi at rest dan in transit melindungi data dari akses tidak sah.',
  ],
  references: ch08References,
  lesson: ch08Lesson,
  quiz: ch08Quiz,
}
