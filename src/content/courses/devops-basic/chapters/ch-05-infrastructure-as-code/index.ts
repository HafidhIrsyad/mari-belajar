import type { Chapter } from '@/content/types'
import { ch05Lesson } from './lesson'
import { ch05Quiz } from './quiz'
import { ch05References } from './references'

export const ch05InfrastructureAsCode: Chapter = {
  id: 'ch-05-infrastructure-as-code',
  slug: 'ch-05-infrastructure-as-code',
  order: 5,
  title: 'Infrastructure as Code (IaC) Pengantar',
  summary:
    'Memahami konfigurasi infrastruktur sebagai kode, perbedaan deklaratif vs imperatif, idempotensi, Terraform state, provider, modul, drift detection, dan praktik kolaborasi.',
  estimatedMinutes: 45,
  learningObjectives: [
    'Menjelaskan konsep Infrastructure as Code dan manfaatnya.',
    'Membedakan pendekatan deklaratif dan imperatif.',
    'Memahami idempotensi dan desired state.',
    'Menguraikan komponen Terraform: provider, resource, state, plan, apply.',
    'Menerapkan modul, remote state, dan drift detection.',
  ],
  summaryPoints: [
    'IaC mengelola infrastruktur melalui file yang dapat diverifikasi dan diversion.',
    'Deklaratif mendeskripsikan desired state; imperatif mendeskripsikan langkah-langkah.',
    'Idempotensi memastikan apply yang sama menghasilkan state yang konsisten.',
    'Terraform state merekam mapping antara konfigurasi dan resource nyata di cloud.',
    'Modul dan remote state mendukung kolaborasi tim yang lebih besar.',
  ],
  references: ch05References,
  lesson: ch05Lesson,
  quiz: ch05Quiz,
}
