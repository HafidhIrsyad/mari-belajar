import type { Reference } from '@/content/types'

export const ch03References: Reference[] = [
  {
    id: 'ref-03-01',
    title: 'OWASP — Authorization Cheat Sheet',
    url: 'https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html',
    description:
      'Panduan OWASP untuk merancang dan mengimplementasikan kontrol akses yang aman.',
    type: 'documentation',
  },
  {
    id: 'ref-03-02',
    title: 'NestJS Docs — Authorization',
    url: 'https://docs.nestjs.com/security/authorization',
    description:
      'Dokumentasi resmi NestJS tentang RBAC, guards, dan role-based access control.',
    type: 'documentation',
  },
  {
    id: 'ref-03-03',
    title: 'Casbin Docs',
    url: 'https://casbin.org/docs/overview',
    description:
      'Library authorization yang mendukung ACL, RBAC, ABAC, dan berbagai model kebijakan.',
    type: 'documentation',
  },
  {
    id: 'ref-03-04',
    title: 'PostgreSQL — Row Level Security',
    url: 'https://www.postgresql.org/docs/current/ddl-rowsecurity.html',
    description:
      'Dokumentasi Row-Level Security di PostgreSQL untuk pembatasan akses per baris.',
    type: 'documentation',
  },
  {
    id: 'ref-03-05',
    title: 'Auth0 — RBAC',
    url: 'https://auth0.com/docs/manage-users/access-control/rbac',
    description:
      'Penjelasan konsep RBAC dan cara mengelola role serta permission di sistem identity.',
    type: 'article',
  },
]
