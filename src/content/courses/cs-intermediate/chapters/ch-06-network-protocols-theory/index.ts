import type { Chapter } from '@/content/types'
import { ch06Lesson } from './lesson'
import { ch06Quiz } from './quiz'
import { ch06References } from './references'

export const ch06NetworkProtocolsTheory: Chapter = {
  id: 'ch-06-network-protocols-theory',
  slug: 'ch-06-network-protocols-theory',
  order: 6,
  title: 'Teori Protokol Jaringan',
  summary:
    'Memperdalam model OSI dan TCP/IP, three-way handshake TCP, flow control dan congestion control, routing paket, NAT, serta rantai resolusi DNS dari stub resolver hingga authoritative server.',
  estimatedMinutes: 52,
  learningObjectives: [
    'Membandingkan lapisan model OSI dengan stack TCP/IP praktis.',
    'Menjelaskan three-way handshake TCP dan peran sequence/acknowledgment number.',
    'Membedakan flow control (window) dan congestion control (slow start, congestion avoidance).',
    'Menggambarkan bagaimana router meneruskan paket berdasarkan routing table.',
    'Menjelaskan NAT dan alur resolusi DNS dari browser hingga authoritative nameserver.',
  ],
  summaryPoints: [
    'OSI memiliki 7 lapisan teoritis; TCP/IP 4 lapisan praktis yang dipakai internet nyata.',
    'TCP handshake SYN-SYN/ACK-ACK menegosiasikan koneksi reliable sebelum data dikirim.',
    'Flow control mencegah pengirim membanjiri penerima; congestion control melindungi jaringan.',
    'Router mem-forward paket hop-by-hop berdasarkan longest prefix match.',
    'NAT menerjemahkan alamat private ke public; DNS resolver chain menyelesaikan nama domain ke IP.',
  ],
  references: ch06References,
  lesson: ch06Lesson,
  quiz: ch06Quiz,
}
