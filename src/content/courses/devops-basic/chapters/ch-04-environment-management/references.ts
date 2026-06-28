import type { Reference } from '@/content/types'

export const ch04References: Reference[] = [
  {
    id: 'ref-04-01',
    title: '12factor.net — The Twelve-Factor App',
    url: 'https://12factor.net/',
    description:
      'Dokumentasi resmi 12-factor app termasuk bab config yang menyatakan config harus disimpan di environment.',
    type: 'documentation',
  },
  {
    id: 'ref-04-02',
    title: 'OWASP — Secrets Management Cheat Sheet',
    url: 'https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html',
    description:
      'Panduan praktis mengelola secrets: storage, injection, rotation, dan audit.',
    type: 'documentation',
  },
  {
    id: 'ref-04-03',
    title: 'Kubernetes — ConfigMaps and Secrets',
    url: 'https://kubernetes.io/docs/concepts/configuration/',
    description:
      'Dokumentasi resmi Kubernetes tentang ConfigMap dan Secret untuk konfigurasi workload.',
    type: 'documentation',
  },
  {
    id: 'ref-04-04',
    title: 'Martin Fowler — Feature Toggles',
    url: 'https://martinfowler.com/articles/feature-toggles.html',
    description:
      'Artikel mendalam tentang pola feature flags, use case, dan praktik pengelolaannya.',
    type: 'article',
  },
  {
    id: 'ref-04-05',
    title: 'HashiCorp Vault Documentation',
    url: 'https://developer.hashicorp.com/vault/docs',
    description:
      'Dokumentasi resmi Vault untuk secrets management, dynamic credentials, dan encryption as a service.',
    type: 'documentation',
  },
]
