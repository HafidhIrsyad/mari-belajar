import type { Reference } from '@/content/types'

export const ch06CloudNativeSecurityReferences: Reference[] = [
  {
    id: 'ref-06-01',
    title: 'Kubernetes Docs — Security',
    url: 'https://kubernetes.io/docs/concepts/security/',
    description: 'Dokumentasi resmi keamanan Kubernetes termasuk RBAC, PSP, dan network policy.',
    type: 'documentation',
  },
  {
    id: 'ref-06-02',
    title: 'Falco Docs',
    url: 'https://falco.org/docs/',
    description: 'Runtime security engine untuk mendeteksi perilaku anomali di container dan host.',
    type: 'documentation',
  },
  {
    id: 'ref-06-03',
    title: 'OPA Gatekeeper',
    url: 'https://open-policy-agent.github.io/gatekeeper/website/docs/',
    description: 'Policy engine untuk Kubernetes berbasis Open Policy Agent.',
    type: 'documentation',
  },
  {
    id: 'ref-06-04',
    title: 'SLSA',
    url: 'https://slsa.dev/',
    description: 'Supply-chain Levels for Software Artifacts — framework keamanan supply chain.',
    type: 'documentation',
  },
  {
    id: 'ref-06-05',
    title: 'OWASP — Container Security',
    url: 'https://cheatsheetseries.owasp.org/cheatsheets/Docker_Security_Cheat_Sheet.html',
    description: 'Cheat sheet keamanan container dari OWASP.',
    type: 'article',
  },
]
