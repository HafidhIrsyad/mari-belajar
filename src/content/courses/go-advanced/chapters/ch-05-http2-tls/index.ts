import type { Chapter } from '@/content/types'
import { ch05Lesson } from './lesson'
import { ch05Quiz } from './quiz'
import { ch05References } from './references'

export const ch05Http2Tls: Chapter = {
  id: 'ch-05-http2-tls',
  slug: 'ch-05-http2-tls',
  order: 5,
  title: 'Advanced HTTP/2, TLS & Network Internals',
  summary:
    'Deep dive ke HTTP/2 framing, multiplexing, HPACK, TLS 1.3 handshake, session resumption, ALPN, custom RoundTripper, dan reverse proxy connection pooling di Go.',
  estimatedMinutes: 50,
  learningObjectives: [
    'Menjelaskan perbedaan HTTP/1.1, HTTP/2, dan HTTP/3/QUIC.',
    'Memahami framing, stream, dan HPACK di HTTP/2.',
    'Menjelaskan TLS 1.3 handshake dan 0-RTT session resumption.',
    'Mengkonfigurasi custom http.RoundTripper untuk tuning koneksi.',
    'Membangun reverse proxy dengan connection pooling di Go.',
  ],
  summaryPoints: [
    'HTTP/2 memperkenalkan framing, multiplexing, dan HPACK untuk kompresi header.',
    'TLS 1.3 mempersingkat handshake menjadi 1-RTT dan mendukung 0-RTT resumption.',
    'ALPN digunakan untuk negosiasi protokol aplikasi seperti h2 atau h3.',
    'Custom RoundTripper memungkinkan tuning idle connection, timeouts, dan dialer.',
    'ReverseProxy di Go mendukung connection pooling dan rewriting request/response.',
    'HTTP/3 berbasis QUIC dan berjalan di atas UDP.',
  ],
  references: ch05References,
  lesson: ch05Lesson,
  quiz: ch05Quiz,
}
