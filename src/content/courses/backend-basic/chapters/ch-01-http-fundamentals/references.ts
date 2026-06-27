import type { Reference } from '@/content/types'

export const ch01References: Reference[] = [
  {
    id: 'ref-01-01',
    title: 'MDN — HTTP Overview',
    url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview',
    description:
      'Pengantar komprehensif tentang cara kerja HTTP, komponen request/response, dan peran proxy serta cache.',
    type: 'documentation',
  },
  {
    id: 'ref-01-02',
    title: 'Cloudflare — How DNS works',
    url: 'https://www.cloudflare.com/learning/dns/what-is-dns/',
    description:
      'Penjelasan visual alur DNS resolution dari resolver rekursif hingga authoritative nameserver.',
    type: 'article',
  },
  {
    id: 'ref-01-03',
    title: 'Cloudflare — TLS handshake',
    url: 'https://www.cloudflare.com/learning/ssl/transport-layer-security-tls/',
    description:
      'Artikel mendalam tentang TLS handshake, cipher suite, dan perbedaan TLS 1.2 dengan TLS 1.3.',
    type: 'article',
  },
  {
    id: 'ref-01-04',
    title: 'MDN — HTTP Status Codes',
    url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status',
    description:
      'Daftar status code HTTP lengkap dengan kategori 1xx sampai 5xx beserta maknanya.',
    type: 'documentation',
  },
  {
    id: 'ref-01-05',
    title: 'Akamai — HTTP/2 and HTTP/3 explained',
    url: 'https://www.akamai.com/blog/performance/http2-http3-explained',
    description:
      'Perbandingan evolusi HTTP/1.1, HTTP/2 framing, dan HTTP/3 QUIC dari sudut pandang performa.',
    type: 'video',
  },
]
