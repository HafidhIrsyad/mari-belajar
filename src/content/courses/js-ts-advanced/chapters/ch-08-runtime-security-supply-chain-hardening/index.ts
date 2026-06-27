import type { Chapter } from '@/content/types'
import { ch08Lesson } from './lesson'
import { ch08Quiz } from './quiz'
import { ch08References } from './references'

export const ch08RuntimeSecuritySupplyChainHardening: Chapter = {
  id: 'ch-08-runtime-security-supply-chain-hardening',
  slug: 'ch-08-runtime-security-supply-chain-hardening',
  order: 8,
  title: 'Runtime Security & Supply Chain Hardening',
  summary:
    'Memahami ancaman runtime JavaScript: prototype pollution, eval, ReDoS, secure deserialization, serta memperkuat supply chain melalui lockfile integrity, SRI, permission model, dependency scanning, dan SBOM.',
  estimatedMinutes: 45,
  learningObjectives: [
    'Mencegah prototype pollution dengan Object.create(null) dan validasi input.',
    'Mengidentifikasi risiko eval, Function constructor, dan vm module.',
    'Mengenal ReDoS dan secure deserialization.',
    'Mengamankan supply chain dengan lockfile integrity dan dependency scanning.',
    'Memahami SRI, Node.js Permission Model, dan dasar SBOM.',
  ],
  summaryPoints: [
    'Prototype pollution dapat mengubah Object.prototype melalui input yang tidak divalidasi.',
    '`eval`, `Function`, dan `vm` module memperluas attack surface karena mengeksekusi string sebagai kode.',
    'ReDoS terjadi ketika regex eksposensial memproses input jahat.',
    'Lockfile integrity memastikan dependency yang diinstall cocok dengan yang direview.',
    'Dependency scanning dan SBOM membantu mendeteksi kerentanan di supply chain.',
  ],
  references: ch08References,
  lesson: ch08Lesson,
  quiz: ch08Quiz,
}
