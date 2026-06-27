import type { Reference } from '@/content/types'

export const ch06References: Reference[] = [
  {
    id: 'ref-06-01',
    title: 'MDN — FormData',
    url: 'https://developer.mozilla.org/en-US/docs/Web/API/FormData',
    description:
      'Dokumentasi FormData untuk membangun payload multipart/form-data di browser.',
    type: 'documentation',
  },
  {
    id: 'ref-06-02',
    title: 'multer',
    url: 'https://github.com/expressjs/multer',
    description:
      'Middleware Express untuk menangani upload file multipart/form-data.',
    type: 'documentation',
  },
  {
    id: 'ref-06-03',
    title: 'NestJS Docs — File upload',
    url: 'https://docs.nestjs.com/techniques/file-upload',
    description:
      'Panduan upload file di NestJS menggunakan multer atau penyimpanan custom.',
    type: 'documentation',
  },
  {
    id: 'ref-06-04',
    title: 'AWS S3 Docs',
    url: 'https://docs.aws.amazon.com/s3/',
    description:
      'Dokumentasi resmi Amazon S3 termasuk presigned URL dan multipart upload.',
    type: 'documentation',
  },
  {
    id: 'ref-06-05',
    title: 'MinIO Docs',
    url: 'https://min.io/docs/minio/linux/index.html',
    description:
      'Dokumentasi MinIO, object storage compatible S3 untuk development dan on-premise.',
    type: 'documentation',
  },
]
