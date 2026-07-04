import type { Reference } from '@/content/types'

export const ch06References: Reference[] = [
  {
    id: 'ref-06-01',
    title: 'RFC 793 — Transmission Control Protocol',
    url: 'https://www.rfc-editor.org/rfc/rfc793',
    description:
      'Spesifikasi resmi TCP termasuk handshake, sequence number, window, dan state machine.',
    type: 'documentation',
  },
  {
    id: 'ref-06-02',
    title: 'Cloudflare Learning — How DNS Works',
    url: 'https://www.cloudflare.com/learning/dns/what-is-dns/',
    description:
      'Penjelasan visual tentang resolver chain, root server, TLD, dan authoritative nameserver.',
    type: 'article',
  },
  {
    id: 'ref-06-03',
    title: 'MDN — Introduction to HTTP',
    url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview',
    description:
      'Overview HTTP sebagai protokol application layer di atas TCP, termasuk request/response model.',
    type: 'documentation',
  },
  {
    id: 'ref-06-04',
    title: 'Computer Networking: A Top-Down Approach (Kurose & Ross)',
    url: 'https://gaia.cs.umass.edu/kurose_ross/online_lectures.htm',
    description:
      'Buku dan lecture online standar untuk model lapisan, TCP, routing, dan DNS.',
    type: 'book',
  },
  {
    id: 'ref-06-05',
    title: 'Google — BBR Congestion Control',
    url: 'https://github.com/google/bbr/blob/master/Documentation/technical-bbr-quick-start.md',
    description:
      'Dokumentasi algoritma BBR yang mengukur bandwidth dan RTT alih-alih mengandalkan packet loss sebagai sinyal congestion.',
    type: 'documentation',
  },
]
