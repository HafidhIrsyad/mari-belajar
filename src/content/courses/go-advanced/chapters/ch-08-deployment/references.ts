import type { Reference } from '@/content/types'

export const ch08References: Reference[] = [
  {
    id: 'ref-08-01',
    title: 'Go Docs — Deploying Go with Docker',
    url: 'https://go.dev/doc/tutorial/docker',
    description:
      'Tutorial resmi Go untuk containerize aplikasi Go dengan Docker.',
    type: 'documentation',
  },
  {
    id: 'ref-08-02',
    title: 'Google Distroless',
    url: 'https://github.com/GoogleContainerTools/distroless',
    description:
      'Image container minimal dari Google yang cocok untuk binary static.',
    type: 'documentation',
  },
  {
    id: 'ref-08-03',
    title: 'OpenTelemetry Go',
    url: 'https://opentelemetry.io/docs/languages/go/',
    description:
      'Dokumentasi instrumentasi Go dengan OpenTelemetry untuk tracing dan metrics.',
    type: 'documentation',
  },
  {
    id: 'ref-08-04',
    title: '12factor.net — Disposability',
    url: 'https://12factor.net/disposability',
    description:
      'Prinsip 12-factor tentang proses yang disposable dan graceful shutdown.',
    type: 'article',
  },
  {
    id: 'ref-08-05',
    title: 'Docker Docs — Multi-stage builds',
    url: 'https://docs.docker.com/build/building/multi-stage/',
    description:
      'Panduan Docker untuk multi-stage build yang menghasilkan image lebih kecil.',
    type: 'article',
  },
]
