import type { Reference } from '@/content/types'

export const ch05References: Reference[] = [
  {
    id: 'ref-05-01',
    title: 'Microsoft — STRIDE Threat Modeling',
    url: 'https://learn.microsoft.com/en-us/azure/security/develop/threat-modeling-tool',
    description:
      'Panduan resmi Microsoft tentang STRIDE dan alat threat modeling untuk mengidentifikasi ancaman arsitektur.',
    type: 'documentation',
  },
  {
    id: 'ref-05-02',
    title: 'NIST SP 800-53 — Access Control',
    url: 'https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final',
    description:
      'Standar NIST yang membahas kontrol akses termasuk DAC, MAC, dan RBAC dalam konteks keamanan federal.',
    type: 'documentation',
  },
  {
    id: 'ref-05-03',
    title: 'Bell-LaPadula Model — Wikipedia',
    url: 'https://en.wikipedia.org/wiki/Bell%E2%80%93LaPadula_model',
    description:
      'Ringkasan model Bell-LaPadula, properti simple security, dan star property untuk sistem multilevel security.',
    type: 'article',
  },
  {
    id: 'ref-05-04',
    title: 'Goldreich, Micali & Wigderson — Zero-Knowledge Proofs',
    url: 'https://people.csail.mit.edu/silvio/Selected%20Scientific%20Papers/Proof%20Systems/The_Knowledge_Complexity_Of_Interactive_Proof_Systems.pdf',
    description:
      'Paper klasik yang memperkenalkan konsep zero-knowledge dan kompleksitas pengetahuan dalam proof interaktif.',
    type: 'article',
  },
  {
    id: 'ref-05-05',
    title: 'Side-Channel Attack — OWASP',
    url: 'https://owasp.org/www-community/vulnerabilities/Use_of_a_Broken_or_Risky_Cryptographic_Algorithm',
    description:
      'Referensi OWASP terkait kerentanan kriptografi dan implikasi side-channel pada implementasi keamanan.',
    type: 'documentation',
  },
]
