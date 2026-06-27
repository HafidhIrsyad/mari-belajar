import type { Chapter } from '@/content/types'
import { ch05Lesson } from './lesson'
import { ch05Quiz } from './quiz'
import { ch05References } from './references'

export const ch05SchemaMigrations: Chapter = {
  id: "ch-05-schema-migrations",
  slug: "ch-05-schema-migrations",
  order: 5,
  title: "Schema Migrations",
  summary: "Mengelola evolusi skema database dengan aman, termasuk versioning, rollback, zero-downtime strategy, dan tools migrasi modern.",
  estimatedMinutes: 50,
  learningObjectives: ["Menjelaskan tujuan dan prinsip schema migration.","Membuat skrip migrasi up/down yang idempoten.","Merancang zero-downtime migration dengan expand-contract.","Memahami risiko DDL locking dan backward compatibility.","Menggunakan tools seperti golang-migrate, Flyway, atau Liquibase."],
  summaryPoints: ["Migrasi menjaga skema tetap konsisten antar environment.","Setiap migrasi harus memiliki skrip up dan rollback/down.","Expand-contract memisahkan perubahan skema dan perubahan aplikasi untuk zero downtime.","DDL locking dapat memblokir aplikasi; gunakan tool online schema change untuk table besar.","Selalu test migration di environment mirip production sebelum deploy."],
  references: ch05References,
  lesson: ch05Lesson,
  quiz: ch05Quiz,
}
