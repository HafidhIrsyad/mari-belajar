import type { Chapter } from '@/content/types'
import { ch08Lesson } from './lesson'
import { ch08Quiz } from './quiz'
import { ch08References } from './references'

export const ch08DeploymentEnvironmentBasics: Chapter = {
  id: 'ch-08-deployment-environment-basics',
  slug: 'ch-08-deployment-environment-basics',
  order: 8,
  title: 'Deployment & Environment Basics',
  summary:
    'Mempersiapkan aplikasi backend untuk production melalui environment variables, Docker containerization, health check, graceful shutdown, reverse proxy, dan monitoring dasar.',
  estimatedMinutes: 35,
  learningObjectives: [
    'Mengelola konfigurasi melalui environment variables sesuai prinsip twelve-factor.',
    'Membuat Dockerfile untuk containerization aplikasi backend.',
    'Menerapkan health check dan graceful shutdown.',
    'Memahami peran reverse proxy dan SSL/TLS termination.',
    'Menyusun monitoring dasar untuk kesehatan aplikasi.',
  ],
  summaryPoints: [
    'Konfigurasi harus dipisahkan dari kode dan disimpan di environment variables.',
    'Docker memastikan aplikasi berjalan konsisten di berbagai environment.',
    'Health check memberi tahu orchestrator apakah aplikasi siap menerima lalu lintas.',
    'Graceful shutdown mencegah request yang sedang berjalan terputus saat deployment.',
    'Reverse proxy menangani TLS termination, load balancing, dan serving static asset.',
  ],
  references: ch08References,
  lesson: ch08Lesson,
  quiz: ch08Quiz,
}
