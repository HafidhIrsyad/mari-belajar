import type { Reference } from '@/content/types'

export const ch07References: Reference[] = [
  {
    id: 'ref-07-01',
    title: 'Martin Fowler — BlueGreenDeployment',
    url: 'https://martinfowler.com/bliki/BlueGreenDeployment.html',
    description:
      'Penjelasan singkat dan praktis tentang blue-green deployment beserta trade-off-nya.',
    type: 'article',
  },
  {
    id: 'ref-07-02',
    title: 'Google Cloud — Deployment Strategies',
    url: 'https://cloud.google.com/architecture/application-deployment-and-testing-strategies',
    description:
      'Dokumentasi Google Cloud tentang rolling update, canary, blue-green, dan A/B testing.',
    type: 'documentation',
  },
  {
    id: 'ref-07-03',
    title: 'Flagger — Progressive Delivery Operator',
    url: 'https://flagger.app/',
    description:
      'Dokumentasi Flagger untuk automated canary analysis dan progressive delivery di Kubernetes.',
    type: 'documentation',
  },
  {
    id: 'ref-07-04',
    title: 'Argo Rollouts Documentation',
    url: 'https://argoproj.github.io/rollouts/',
    description:
      'Dokumentasi Argo Rollouts untuk advanced deployment strategies di Kubernetes.',
    type: 'documentation',
  },
  {
    id: 'ref-07-05',
    title: 'LaunchDarkly — Feature Flags',
    url: 'https://launchdarkly.com/blog/what-are-feature-flags/',
    description:
      'Pengantar feature flags dan perannya dalam progressive delivery serta mitigasi risiko.',
    type: 'article',
  },
]
