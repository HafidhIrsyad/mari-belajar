import type { Reference } from '@/content/types'

export const ch04References: Reference[] = [
  {
    id: 'ref-04-01',
    title: 'Cloudflare — Rate Limiting',
    url: 'https://developers.cloudflare.com/waf/rate-limiting-rules/',
    description:
      'Dokumentasi Cloudflare tentang aturan rate limiting di edge network.',
    type: 'documentation',
  },
  {
    id: 'ref-04-02',
    title: 'NestJS Docs — Throttler',
    url: 'https://docs.nestjs.com/security/rate-limiting',
    description:
      'Panduan rate limiting di NestJS dengan Throttler module dan storage.',
    type: 'documentation',
  },
  {
    id: 'ref-04-03',
    title: 'Go package — tollbooth',
    url: 'https://github.com/didip/tollbooth',
    description:
      'Middleware rate limiter untuk Go dengan dukungan token bucket dan Redis.',
    type: 'documentation',
  },
  {
    id: 'ref-04-04',
    title: 'Redis — Rate limiting',
    url: 'https://redis.io/glossary/rate-limiting/',
    description:
      'Glosarium Redis tentang pola dan algoritma rate limiting dengan Redis.',
    type: 'article',
  },
  {
    id: 'ref-04-05',
    title: 'System Design Primer — Rate Limiting',
    url: 'https://github.com/donnemartin/system-design-primer#rate-limiting',
    description:
      'Ringkasan pola rate limiting untuk desain sistem skala besar.',
    type: 'documentation',
  },
]
