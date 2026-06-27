import type { Reference } from '@/content/types'

export const ch07References: Reference[] = [
  {
    id: 'ref-07-01',
    title: 'OWASP API Security Top 10',
    url: 'https://owasp.org/www-project-api-security/',
    description:
      'Daftar 10 risiko keamanan API teratas dari OWASP beserta penjelasan dan mitigasi.',
    type: 'documentation',
  },
  {
    id: 'ref-07-02',
    title: 'OWASP — CSRF Prevention',
    url: 'https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html',
    description:
      'Panduan mencegah CSRF dengan SameSite cookie, token, dan pola arsitektur.',
    type: 'documentation',
  },
  {
    id: 'ref-07-03',
    title: 'OWASP — SQL Injection Prevention',
    url: 'https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html',
    description:
      'Cheat sheet OWASP untuk mencegah SQL injection melalui parameterized query dan defense in depth.',
    type: 'documentation',
  },
  {
    id: 'ref-07-04',
    title: 'helmet.js',
    url: 'https://helmetjs.github.io/',
    description:
      'Middleware Express yang mengatur security header seperti CSP, HSTS, dan X-Frame-Options.',
    type: 'documentation',
  },
  {
    id: 'ref-07-05',
    title: 'NestJS Docs — Security',
    url: 'https://docs.nestjs.com/security/',
    description:
      'Panduan keamanan NestJS mencakup CORS, CSRF, rate limiting, dan helmet.',
    type: 'documentation',
  },
]
