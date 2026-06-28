import type { Chapter } from '@/content/types'
import { ch02Lesson } from './lesson'
import { ch02Quiz } from './quiz'
import { ch02References } from './references'

export const ch02CiCdFundamentals: Chapter = {
  id: 'ch-02-ci-cd-fundamentals',
  slug: 'ch-02-ci-cd-fundamentals',
  order: 2,
  title: 'CI/CD Fundamentals',
  summary:
    'Memahami prinsip Continuous Integration dan Continuous Delivery/Deployment, arsitektur pipeline, artefak, caching, runner, serta praktik pipeline as code.',
  estimatedMinutes: 40,
  learningObjectives: [
    'Menjelaskan perbedaan CI, CD (Delivery), dan CD (Deployment).',
    'Mengidentifikasi tahapan umum pipeline: build, test, package, deploy.',
    'Memahami peran runner/agent dan artefak dalam pipeline.',
    'Menerapkan caching dan secrets management yang aman.',
    'Merancang pipeline as code dengan konsep DAG dan matrix build.',
  ],
  summaryPoints: [
    'CI mengintegrasikan kode ke main secara rutin dengan automated test.',
    'CD Delivery memastikan kode siap deploy; CD Deployment melepaskan ke production secara otomatis.',
    'Pipeline terdiri dari stage yang berjalan di runner/agent.',
    'Artefak adalah hasil build yang dapat dipromosikan antar environment.',
    'Pipeline as code membuat alur kerja dapat direview dan dirunut bersama kode aplikasi.',
  ],
  references: ch02References,
  lesson: ch02Lesson,
  quiz: ch02Quiz,
}
