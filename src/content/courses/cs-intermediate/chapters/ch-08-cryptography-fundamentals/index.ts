import type { Chapter } from '@/content/types'
import { ch08Lesson } from './lesson'
import { ch08Quiz } from './quiz'
import { ch08References } from './references'

export const ch08CryptographyFundamentals: Chapter = {
  id: 'ch-08-cryptography-fundamentals',
  slug: 'ch-08-cryptography-fundamentals',
  order: 8,
  title: 'Fundamental Kriptografi',
  summary:
    'Memahami symmetric vs asymmetric cryptography, AES, matematika RSA, digital signature, PKI, dan konsep ECDH sebagai fondasi keamanan sistem modern.',
  estimatedMinutes: 55,
  learningObjectives: [
    'Membedakan enkripsi simetris dan asimetris serta use case masing-masing.',
    'Menjelaskan mode operasi AES dan mengapa key management simetris menjadi tantangan.',
    'Memahami matematika RSA: pemilihan prima, φ(n), dan operasi encrypt/decrypt.',
    'Menggambarkan digital signature, hash function, dan rantai kepercayaan PKI.',
    'Mengenali ECDH sebagai pertukaran kunci efisien di kurva eliptik.',
  ],
  summaryPoints: [
    'AES simetris cepat untuk bulk encryption; RSA/ECC asimetris untuk key exchange dan signature.',
    'RSA bergantung pada kesulitan faktorisasi n = p × q; ukuran kunci minimal 2048 bit di production.',
    'Digital signature = encrypt hash dengan private key; verifikasi dengan public key.',
    'PKI menghubungkan public key ke identitas melalui CA dan sertifikat X.509.',
    'ECDH memungkinkan shared secret tanpa mengirim private key melalui jaringan.',
  ],
  references: ch08References,
  lesson: ch08Lesson,
  quiz: ch08Quiz,
}
