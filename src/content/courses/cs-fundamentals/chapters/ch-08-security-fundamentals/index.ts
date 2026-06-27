import type { Chapter } from '@/content/types'
import { ch08Lesson } from './lesson'
import { ch08Quiz } from './quiz'
import { ch08References } from './references'

export const ch08SecurityFundamentals: Chapter = {
  id: 'ch-08-security-fundamentals',
  slug: 'ch-08-security-fundamentals',
  order: 8,
  title: 'Keamanan Informasi dan Praktik Terbaik',
  summary:
    'Memahami CIA Triad, hashing vs encryption, HTTPS, input validation, OWASP Top 10, dan secure coding practices.',
  estimatedMinutes: 16,
  learningObjectives: [
    'Memahami prinsip CIA Triad: Confidentiality, Integrity, Availability.',
    'Membedakan autentikasi dan otorisasi serta mengenali social engineering.',
    'Memahami perbedaan hashing dan encryption dan kapan menggunakannya.',
    'Menjelaskan cara kerja HTTPS dan peran sertifikat TLS.',
    'Menerapkan input validation dan sanitization untuk mencegah serangan umum.',
    'Mengenal OWASP Top 10 dan praktik secure coding.',
  ],
  summaryPoints: [
    'CIA Triad adalah fondasi keamanan informasi.',
    'Autentikasi membuktikan identitas; otorisasi menentukan akses.',
    'Hashing adalah one-way function; encryption adalah reversible.',
    'HTTPS mengamankan data di jaringan dengan TLS.',
    'Input validation dan sanitization mencegah injection dan XSS.',
    'OWASP Top 10 mencakup risiko keamanan aplikasi web yang paling umum.',
    'Secret management penting untuk melindungi kunci API dan password.',
  ],
  references: ch08References,
  lesson: ch08Lesson,
  quiz: ch08Quiz,
}
