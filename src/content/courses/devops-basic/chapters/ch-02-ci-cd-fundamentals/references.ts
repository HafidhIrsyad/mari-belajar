import type { Reference } from '@/content/types'

export const ch02References: Reference[] = [
  {
    id: 'ref-02-01',
    title: 'GitHub Actions Documentation',
    url: 'https://docs.github.com/en/actions',
    description:
      'Dokumentasi resmi GitHub Actions tentang workflow, jobs, runners, secrets, dan artefak.',
    type: 'documentation',
  },
  {
    id: 'ref-02-02',
    title: 'GitLab CI/CD Documentation',
    url: 'https://docs.gitlab.com/ee/ci/',
    description:
      'Panduan lengkap GitLab CI/CD mencakup pipeline, stages, DAG, cache, dan deployment.',
    type: 'documentation',
  },
  {
    id: 'ref-02-03',
    title: 'Martin Fowler — Continuous Integration',
    url: 'https://martinfowler.com/articles/continuousIntegration.html',
    description:
      'Artikel klasik Martin Fowler tentang praktik CI dan manfaatnya bagi tim pengembangan.',
    type: 'article',
  },
  {
    id: 'ref-02-04',
    title: 'CNCF — CI/CD Best Practices',
    url: 'https://www.cncf.io/blog/2022/04/13/8-cicd-best-practices-for-building-successful-applications/',
    description:
      'Kumpulan praktik terbaik CI/CD modern termasuk pipeline as code dan supply chain security.',
    type: 'article',
  },
  {
    id: 'ref-02-05',
    title: 'OWASP — CI/CD Security',
    url: 'https://owasp.org/www-project-top-10-ci-cd-security-risks/',
    description:
      'Daftar risiko keamanan CI/CD dan cara mengamankan pipeline dari supply chain attack.',
    type: 'documentation',
  },
]
