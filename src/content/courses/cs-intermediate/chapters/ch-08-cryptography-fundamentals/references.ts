import type { Reference } from '@/content/types'

export const ch08References: Reference[] = [
  {
    id: 'ref-08-01',
    title: 'Cryptography Engineering (Ferguson, Schneier, Kohno)',
    url: 'https://www.schneier.com/books/cryptography-engineering/',
    description:
      'Buku praktis tentang desain sistem kriptografi, common mistakes, dan best practices engineering.',
    type: 'book',
  },
  {
    id: 'ref-08-02',
    title: 'NIST — AES Specification (FIPS 197)',
    url: 'https://csrc.nist.gov/publications/detail/fips/197/final',
    description:
      'Spesifikasi resmi Advanced Encryption Standard dari NIST.',
    type: 'documentation',
  },
  {
    id: 'ref-08-03',
    title: 'RFC 8446 — TLS 1.3',
    url: 'https://www.rfc-editor.org/rfc/rfc8446',
    description:
      'Spesifikasi TLS 1.3 yang mendefinisikan handshake modern, cipher suites, dan forward secrecy.',
    type: 'documentation',
  },
  {
    id: 'ref-08-04',
    title: "Let's Encrypt — How It Works",
    url: 'https://letsencrypt.org/how-it-works/',
    description:
      'Penjelasan PKI praktis: ACME protocol, domain validation, dan penerbitan sertifikat gratis.',
    type: 'article',
  },
  {
    id: 'ref-08-05',
    title: 'OWASP Cryptographic Storage Cheat Sheet',
    url: 'https://cheatsheetseries.owasp.org/cheatsheets/Cryptographic_Storage_Cheat_Sheet.html',
    description:
      'Panduan OWASP untuk penyimpanan data terenkripsi, key management, dan algorithm selection.',
    type: 'documentation',
  },
]
