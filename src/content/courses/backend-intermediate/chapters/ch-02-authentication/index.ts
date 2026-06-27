import type { Chapter } from '@/content/types'
import { ch02Lesson } from './lesson'
import { ch02Quiz } from './quiz'
import { ch02References } from './references'

export const ch02Authentication: Chapter = {
  id: 'ch-02-authentication',
  slug: 'ch-02-authentication',
  order: 2,
  title: 'Authentication',
  summary:
    'Mempelajari mekanisme autentikasi mulai dari session vs token, JWT, bcrypt, refresh token, OAuth2/PKCE, hingga passkeys dan multi-factor authentication.',
  estimatedMinutes: 50,
  learningObjectives: [
    'Membedakan autentikasi berbasis session dan berbasis token.',
    'Memahami struktur JWT dan cara signing serta verification bekerja.',
    'Menerapkan hashing password dengan bcrypt dan memilih cost factor yang tepat.',
    'Menggunakan refresh token dan memahami alur OAuth2/PKCE.',
    'Mengenali opsi modern seperti TOTP dan passkeys/WebAuthn.',
  ],
  summaryPoints: [
    'Session stateful disimpan di server, sedangkan token stateful atau self-contained seperti JWT disimpan di client.',
    'JWT terdiri dari header, payload, dan signature yang dipisahkan titik.',
    'bccrypt menggunakan salt unik dan cost factor untuk melindungi password dari brute-force.',
    'Refresh token memungkinkan pergantian access token tanpa meminta password ulang.',
    'Passkeys menggantikan password dengan kriptografi kunci publik yang tahan terhadap phishing.',
  ],
  references: ch02References,
  lesson: ch02Lesson,
  quiz: ch02Quiz,
}
