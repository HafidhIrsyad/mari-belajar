import type { Reference } from '@/content/types'

export const ch05References: Reference[] = [
  {
    id: 'ref-05-01',
    title: 'Terraform Documentation',
    url: 'https://developer.hashicorp.com/terraform/docs',
    description:
      'Dokumentasi resmi Terraform mencakup HCL, provider, state, modul, dan best practices.',
    type: 'documentation',
  },
  {
    id: 'ref-05-02',
    title: 'AWS CloudFormation User Guide',
    url: 'https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/Welcome.html',
    description:
      'Panduan resmi AWS untuk IaC native AWS dengan template YAML/JSON.',
    type: 'documentation',
  },
  {
    id: 'ref-05-03',
    title: 'Microsoft Azure — What is Infrastructure as Code?',
    url: 'https://learn.microsoft.com/en-us/devops/deliver/what-is-infrastructure-as-code',
    description:
      'Penjelasan konsep IaC, declarative vs imperative, dan idempotency dari Microsoft.',
    type: 'article',
  },
  {
    id: 'ref-05-04',
    title: 'Terraform Best Practices',
    url: 'https://www.terraform-best-practices.com/',
    description:
      'Kumpulan praktik terbaik organisasi Terraform, modul, workspace, dan remote state.',
    type: 'article',
  },
  {
    id: 'ref-05-05',
    title: 'Open Policy Agent — Terraform',
    url: 'https://www.openpolicyagent.org/docs/latest/terraform/',
    description:
      'Panduan menerapkan policy as code pada Terraform menggunakan OPA.',
    type: 'documentation',
  },
]
