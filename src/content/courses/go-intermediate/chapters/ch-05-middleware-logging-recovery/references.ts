import type { Reference } from '@/content/types'

export const ch05References: Reference[] = [
  {
    id: 'ref-05-01',
    title: 'Go Docs — log/slog',
    url: 'https://pkg.go.dev/log/slog',
    description:
      'Dokumentasi resmi package log/slog untuk structured logging di Go.',
    type: 'documentation',
  },
  {
    id: 'ref-05-02',
    title: 'Go Blog — Structured Logging with slog',
    url: 'https://go.dev/blog/slog',
    description:
      'Artikel resmi pengenalan log/slog dan best practices structured logging.',
    type: 'article',
  },
  {
    id: 'ref-05-03',
    title: 'OpenTelemetry Go',
    url: 'https://opentelemetry.io/docs/languages/go/',
    description:
      'Dokumentasi implementasi tracing dan metrics dengan OpenTelemetry di Go.',
    type: 'documentation',
  },
  {
    id: 'ref-05-04',
    title: '12factor.net — Logs',
    url: 'https://12factor.net/logs',
    description:
      'Panduan twelve-factor app tentang cara menyusun log aplikasi.',
    type: 'article',
  },
  {
    id: 'ref-05-05',
    title: 'Middleware Patterns in Go',
    url: 'https://www.youtube.com/results?search_query=go+middleware+pattern+log+slog',
    description:
      'Video-tutorial menyusun middleware logging dan recovery di Go.',
    type: 'video',
  },
]
