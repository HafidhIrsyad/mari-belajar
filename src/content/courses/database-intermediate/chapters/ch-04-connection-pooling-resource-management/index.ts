import type { Chapter } from '@/content/types'
import { ch04Lesson } from './lesson'
import { ch04Quiz } from './quiz'
import { ch04References } from './references'

export const ch04ConnectionPoolingResourceManagement: Chapter = {
  id: "ch-04-connection-pooling-resource-management",
  slug: "ch-04-connection-pooling-resource-management",
  order: 4,
  title: "Connection Pooling & Resource Management",
  summary: "Memahami connection lifecycle, client-side dan server-side pooling, sizing pool, serta pengelolaan resource seperti memory, timeout, dan concurrency.",
  estimatedMinutes: 50,
  learningObjectives: ["Menjelaskan lifecycle koneksi dan overheadnya.","Membedakan client-side pool dan server-side pool.","Menghitung ukuran pool berdasarkan Little's Law.","Mengkonfigurasi PgBouncer dan parameter resource PostgreSQL.","Mengelola timeout dan idle transaction."],
  summaryPoints: ["Setiap koneksi database mengonsumsi memori dan proses/thread.","Client-side pool (HikariCP, sql.DB) mengurangi pembukaan koneksi di aplikasi.","Server-side pool (PgBouncer) mengurangi jumlah koneksi aktual ke database.","Little's Law membantu menentukan jumlah koneksi optimal.","Timeout dan idle-in-transaction management mencegah resource exhaustion."],
  references: ch04References,
  lesson: ch04Lesson,
  quiz: ch04Quiz,
}
