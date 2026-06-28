import type { Reference } from '@/content/types'

export const ch01CloudDeploymentReferences: Reference[] = [
  {
    id: 'ref-01-01',
    title: "AWS Well-Architected Framework",
    url: "https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html",
    description: "Pilar desain cloud: operational excellence, security, reliability, performance, cost optimization, sustainability.",
    type: "documentation",
  },
  {
    id: 'ref-01-02',
    title: "Google Cloud Architecture Center",
    url: "https://cloud.google.com/architecture",
    description: "Pola, praktik, dan blueprint arsitektur untuk deployment di Google Cloud.",
    type: "documentation",
  },
  {
    id: 'ref-01-03',
    title: "Microsoft Azure Well-Architected Framework",
    url: "https://learn.microsoft.com/en-us/azure/well-architected/",
    description: "Panduan merancang workload yang andal, aman, dan efisien di Azure.",
    type: "documentation",
  },
  {
    id: 'ref-01-04',
    title: "12factor.net",
    url: "https://12factor.net/",
    description: "Metodologi membangun aplikasi cloud-native yang portabel dan scalable.",
    type: "book",
  },
  {
    id: 'ref-01-05',
    title: "Cloudflare — What is edge computing?",
    url: "https://www.cloudflare.com/learning/serverless/glossary/what-is-edge-computing/",
    description: "Penjelasan edge computing, CDN, dan deployment di dekat pengguna.",
    type: "article",
  },
]
