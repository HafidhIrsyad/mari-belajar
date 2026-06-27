import type { Chapter } from '@/content/types'
import { ch01Lesson } from './lesson'
import { ch01Quiz } from './quiz'
import { ch01References } from './references'

export const ch01HttpFundamentals: Chapter = {
  id: 'ch-01-http-fundamentals',
  slug: 'ch-01-http-fundamentals',
  order: 1,
  title: 'HTTP Fundamentals',
  summary:
    'Memahami siklus request/response HTTP, metode, status code, header, serta fondasi jaringan mulai dari TCP/IP, DNS, TLS handshake, hingga HTTP/2 framing dan multiplexing.',
  estimatedMinutes: 35,
  learningObjectives: [
    'Menjelaskan anatomi HTTP request dan response beserta komponen utamanya.',
    'Membedakan metode HTTP dari sifat safe dan idempotent.',
    'Menginterpretasikan status code dan header yang paling sering dipakai.',
    'Memahami alur DNS resolution, three-way handshake, dan TLS handshake.',
    'Menjelaskan perbedaan HTTP/1.1, HTTP/2 framing, dan HTTP/3 QUIC.',
  ],
  summaryPoints: [
    'HTTP adalah protokol request/response di atas TCP yang menjadi tulang punggung web.',
    'Metode HTTP memiliki karakteristik safe (tidak mengubah state) dan idempotent (hasil sama jika diulang).',
    'Status code dikelompokkan ke dalam 1xx–5xx untuk mengindikasikan hasil request.',
    'TLS handshake membangun channel terenkripsi sebelum data aplikasi dikirim.',
    'HTTP/2 mengirim frame biner melalui satu koneksi TCP untuk mengatasi head-of-line blocking.',
  ],
  references: ch01References,
  lesson: ch01Lesson,
  quiz: ch01Quiz,
}
