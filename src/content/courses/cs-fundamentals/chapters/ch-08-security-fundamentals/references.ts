import type { Reference } from '@/content/types'

export const ch08References: Reference[] = [
  {
    id: 'ref-08-01',
    title: 'OWASP Top 10',
    url: 'https://owasp.org/Top10/',
    description:
      'Dokumentasi resmi OWASP yang memuat daftar 10 risiko keamanan aplikasi web paling umum beserta mitigasinya.',
    type: 'documentation',
  },
  {
    id: 'ref-08-02',
    title: 'Web Security Basics',
    url: 'https://developer.mozilla.org/en-US/Web/Security',
    description:
      'Artikel MDN yang menjelaskan dasar-dasar keamanan web, HTTPS, CSP, dan praktik perlindungan umum.',
    type: 'article',
  },
  {
    id: 'ref-08-03',
    title: 'OWASP WebGoat Project',
    url: 'https://owasp.org/www-project-webgoat/',
    description:
      'Platform interaktif untuk belajar keamanan aplikasi web dengan mencoba serangan dan mitigasi secara langsung.',
    type: 'interactive',
  },
  {
    id: 'ref-08-04',
    title: 'Cryptography Engineering',
    url: 'https://www.schneier.com/books/cryptography-engineering/',
    description:
      'Buku klasik karya Bruce Schneier dkk. yang membahas desain sistem kriptografi untuk praktisi.',
    type: 'book',
  },
  {
    id: 'ref-08-05',
    title: 'How HTTPS Works',
    url: 'https://www.youtube.com/watch?v=w0QbnxKRD0w',
    description:
      'Video penjelasan visual tentang cara kerja HTTPS, TLS, dan sertifikat dalam komunikasi web.',
    type: 'video',
  },
]
