import type { Reference } from '@/content/types'

export const ch02References: Reference[] = [
  {
    id: 'ref-02-01',
    title: 'REST API Tutorial',
    url: 'https://restfulapi.net/',
    description:
      'Panduan praktis mendesain REST API yang mencakup resource, HTTP verbs, dan status code.',
    type: 'documentation',
  },
  {
    id: 'ref-02-02',
    title: 'Microsoft — REST API design',
    url: 'https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design',
    description:
      'Kumpulan best practice dari Microsoft untuk merancang API yang skalabel dan konsisten.',
    type: 'article',
  },
  {
    id: 'ref-02-03',
    title: 'OpenAPI Specification',
    url: 'https://spec.openapis.org/oas/latest.html',
    description:
      'Spesifikasi resmi OpenAPI untuk mendeskripsikan REST API secara machine-readable.',
    type: 'documentation',
  },
  {
    id: 'ref-02-04',
    title: 'JSON:API',
    url: 'https://jsonapi.org/',
    description:
      'Spesifikasi konvensi JSON untuk request dan response API dengan relasi dan pagination.',
    type: 'documentation',
  },
  {
    id: 'ref-02-05',
    title: 'Go by Example — HTTP Server',
    url: 'https://gobyexample.com/http-servers',
    description:
      'Contoh singkat membuat HTTP server di Go yang dapat dikembangkan menjadi REST API.',
    type: 'interactive',
  },
]
