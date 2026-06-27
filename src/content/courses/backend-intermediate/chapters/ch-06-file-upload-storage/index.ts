import type { Chapter } from '@/content/types'
import { ch06Lesson } from './lesson'
import { ch06Quiz } from './quiz'
import { ch06References } from './references'

export const ch06FileUploadStorage: Chapter = {
  id: 'ch-06-file-upload-storage',
  slug: 'ch-06-file-upload-storage',
  order: 6,
  title: 'File Upload & Storage',
  summary:
    'Mempelajari upload file mulai dari multipart form dan multer, cloud storage, S3/MinIO, presigned URL, validasi, streaming, virus scan, hingga CDN integration.',
  estimatedMinutes: 40,
  learningObjectives: [
    'Memahami protokol multipart/form-data dan cara server menerima file.',
    'Mengimplementasikan upload ke local storage dan cloud storage.',
    'Menghasilkan presigned URL untuk upload dan download langsung ke S3.',
    'Melakukan validasi tipe dan ukuran file.',
    'Memahami streaming upload, virus scan hook, dan integrasi CDN.',
  ],
  summaryPoints: [
    'Multipart/form-data memisahkan metadata dan binary file dalam satu request.',
    'Local storage sederhana tetapi tidak skalabel; cloud storage seperti S3 lebih tepat untuk production.',
    'Presigned URL memungkinkan client berinteraksi langsung dengan S3 tanpa melewati server.',
    'Validasi tipe, ukuran, dan nama file penting untuk keamanan.',
    'CDN mendistribusikan file statis ke edge location terdekat dengan pengguna.',
  ],
  references: ch06References,
  lesson: ch06Lesson,
  quiz: ch06Quiz,
}
