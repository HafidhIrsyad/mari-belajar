import type { Chapter } from '@/content/types'
import { ch05Lesson } from './lesson'
import { ch05Quiz } from './quiz'
import { ch05References } from './references'

export const ch05FormalSecurityModels: Chapter = {
  id: 'ch-05-formal-security-models',
  slug: 'ch-05-formal-security-models',
  order: 5,
  title: 'Model Keamanan Formal',
  summary:
    'Mempelajari threat modeling STRIDE/DREAD, model kontrol akses DAC/MAC/RBAC, kerangka Bell-LaPadula, konsep zero-knowledge proof, serta taksonomi side-channel attack.',
  estimatedMinutes: 50,
  learningObjectives: [
    'Menerapkan STRIDE dan DREAD untuk mengidentifikasi dan memprioritaskan ancaman sistem.',
    'Membedakan DAC, MAC, dan RBAC serta kapan masing-masing model cocok digunakan.',
    'Menjelaskan prinsip Bell-LaPadula untuk perlindungan kerahasiaan informasi.',
    'Memahami konsep zero-knowledge proof dan aplikasinya pada autentikasi.',
    'Mengklasifikasikan side-channel attack berdasarkan sumber kebocoran informasi.',
  ],
  summaryPoints: [
    'STRIDE memetakan ancaman ke enam kategori: Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege.',
    'DREAD menilai Damage, Reproducibility, Exploitability, Affected users, dan Discoverability untuk prioritas mitigasi.',
    'DAC fleksibel tetapi rentan; MAC ketat berbasis label; RBAC mengelola izin melalui peran.',
    'Bell-LaPadula menegakkan no read up dan no write down untuk mencegah kebocoran klasifikasi.',
    'Zero-knowledge proof membuktikan pernyataan tanpa mengungkapkan informasi di balik bukti.',
    'Side-channel mengeksploitasi waktu, daya, cache, atau emisi elektromagnetik, bukan kelemahan algoritma langsung.',
  ],
  references: ch05References,
  lesson: ch05Lesson,
  quiz: ch05Quiz,
}
