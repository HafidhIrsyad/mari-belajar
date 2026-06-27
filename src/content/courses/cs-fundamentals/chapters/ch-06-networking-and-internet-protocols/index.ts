import type { Chapter } from '@/content/types'
import { ch06Lesson } from './lesson'
import { ch06Quiz } from './quiz'
import { ch06References } from './references'

export const ch06NetworkingAndInternetProtocols: Chapter = {
  id: 'ch-06-networking-and-internet-protocols',
  slug: 'ch-06-networking-and-internet-protocols',
  order: 6,
  title: 'Jaringan Komputer dan Protokol Internet',
  summary:
    'Memahami model client-server, alamat IP, DNS, HTTP/HTTPS, TCP/UDP, port dan socket, routing, TLS/HTTPS, caching/CDN, serta prinsip REST API.',
  estimatedMinutes: 16,
  learningObjectives: [
    'Menjelaskan model client-server dan peran IP address serta DNS.',
    'Memahami struktur HTTP request/response, method, dan status code.',
    'Membedakan karakteristik TCP dan UDP serta memahami konsep port dan socket.',
    'Mengenal packet, routing, TLS/HTTPS, caching/CDN, dan prinsip desain REST API.',
  ],
  summaryPoints: [
    'Client meminta layanan; server merespons permintaan melalui jaringan.',
    'IP address mengidentifikasi perangkat; DNS menerjemahkan nama domain menjadi IP.',
    'HTTP menggunakan request dengan method dan response dengan status code.',
    'TCP menjamin pengiriman data berurutan; UDP lebih cepat tetapi tidak menjamin.',
    'Port membedakan layanan; socket adalah titik komunikasi antara proses.',
    'TLS/HTTPS mengenkripsi data saat transit untuk menjaga kerahasiaan.',
    'REST API memanfaatkan HTTP method dan URL yang merepresentasikan resource.',
  ],
  references: ch06References,
  lesson: ch06Lesson,
  quiz: ch06Quiz,
}
