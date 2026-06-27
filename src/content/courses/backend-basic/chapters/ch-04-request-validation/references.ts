import type { Reference } from '@/content/types'

export const ch04References: Reference[] = [
  {
    id: 'ref-04-01',
    title: 'Zod Docs',
    url: 'https://zod.dev/',
    description:
      'Dokumentasi Zod untuk schema validation dengan inferensi TypeScript.',
    type: 'documentation',
  },
  {
    id: 'ref-04-02',
    title: 'Joi Docs',
    url: 'https://joi.dev/api/',
    description:
      'Referensi lengkap Joi, schema validator populer untuk ekosistem Node.js.',
    type: 'documentation',
  },
  {
    id: 'ref-04-03',
    title: 'class-validator',
    url: 'https://github.com/typestack/class-validator',
    description:
      'Library decorator-based validation yang umum dipakai bersama NestJS.',
    type: 'documentation',
  },
  {
    id: 'ref-04-04',
    title: 'go-playground/validator',
    url: 'https://github.com/go-playground/validator',
    description:
      'Validator untuk Go dengan tag struct dan dukungan custom validation.',
    type: 'documentation',
  },
  {
    id: 'ref-04-05',
    title: 'OWASP — Input Validation Cheat Sheet',
    url: 'https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html',
    description:
      'Panduan keamanan untuk validasi input, whitelist, dan sanitasi data.',
    type: 'article',
  },
]
