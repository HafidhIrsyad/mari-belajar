import type { Reference } from '@/content/types'

export const ch02References: Reference[] = [
  {
    id: 'ref-02-01',
    title: 'OWASP — Authentication Cheat Sheet',
    url: 'https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html',
    description:
      'Panduan praktis OWASP untuk implementasi autentikasi yang aman, termasuk password storage dan MFA.',
    type: 'documentation',
  },
  {
    id: 'ref-02-02',
    title: 'JWT.io',
    url: 'https://jwt.io/introduction',
    description:
      'Pengantar resmi JSON Web Token beserta debugger untuk memahami struktur header, payload, dan signature.',
    type: 'interactive',
  },
  {
    id: 'ref-02-03',
    title: 'NestJS Docs — Authentication',
    url: 'https://docs.nestjs.com/security/authentication',
    description:
      'Dokumentasi implementasi autentikasi di NestJS menggunakan Passport dan JWT strategy.',
    type: 'documentation',
  },
  {
    id: 'ref-02-04',
    title: 'Passport.js Docs',
    url: 'http://www.passportjs.org/docs/',
    description:
      'Dokumentasi middleware autentikasi untuk Node.js yang mendukung berbagai strategi.',
    type: 'documentation',
  },
  {
    id: 'ref-02-05',
    title: 'Go package — golang-jwt/jwt',
    url: 'https://github.com/golang-jwt/jwt',
    description:
      'Library JWT populer untuk Go dengan dukungan berbagai algoritma signing dan verifikasi.',
    type: 'documentation',
  },
]
