import type { Reference } from '@/content/types'

export const ch05References: Reference[] = [
  {
    id: 'ref-05-01',
    title: 'RFC 7807 — Problem Details',
    url: 'https://datatracker.ietf.org/doc/html/rfc7807',
    description:
      'Spesifikasi format standar untuk menyampaikan detail masalah dalam HTTP response.',
    type: 'documentation',
  },
  {
    id: 'ref-05-02',
    title: 'Express.js — Error handling',
    url: 'https://expressjs.com/en/guide/error-handling.html',
    description:
      'Panduan menulis error-handling middleware di Express dengan empat parameter.',
    type: 'documentation',
  },
  {
    id: 'ref-05-03',
    title: 'NestJS Docs — Exception filters',
    url: 'https://docs.nestjs.com/exception-filters',
    description:
      'Dokumentasi exception filter di NestJS untuk menangani error secara global.',
    type: 'documentation',
  },
  {
    id: 'ref-05-04',
    title: 'Go Blog — Error handling and Go',
    url: 'https://go.dev/blog/error-handling-and-go',
    description:
      'Artikel Go tentang idiom penanganan error dan pemisahan error dari exception.',
    type: 'article',
  },
  {
    id: 'ref-05-05',
    title: '12factor.net — Logs',
    url: 'https://12factor.net/logs',
    description:
      'Prinsip logging pada aplikasi twelve-factor: log sebagai stream event.',
    type: 'article',
  },
]
