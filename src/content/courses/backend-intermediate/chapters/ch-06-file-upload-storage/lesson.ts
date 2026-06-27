import type { Lesson } from '@/content/types'

export const ch06Lesson: Lesson = {
  id: 'lesson-ch-06-file-upload-storage',
  estimatedMinutes: 40,
  sections: [
    {
      id: 'sec-06-basic-upload',
      type: 'markdown',
      level: 'basic',
      title: 'Multipart Form dan Multer',
      content: `## Cara File Dikirim ke Server

Browser mengirim file melalui HTTP request dengan \`Content-Type: multipart/form-data\`. Body request terdiri dari beberapa bagian (parts):

- Field teks biasa seperti \`name\` atau \`description\`.
- Field file yang berisi header \`Content-Disposition\`, \`Content-Type\`, dan binary data.

Server mem-parsing multipart body dan mengekstrak file. Di Node.js, library populer untuk ini adalah **Multer**.

## Multer

Multer adalah middleware Express untuk menangani \`multipart/form-data\`. Konfigurasi penting:

- \`dest\` atau \`storage\`: lokasi penyimpanan file.
- \`limits\`: batas ukuran file dan jumlah field.
- \`fileFilter\`: fungsi untuk menyaring tipe file yang diizinkan.

## Validasi File

Selalu validasi:

- **Tipe MIME**: jangan hanya percaya extension file.
- **Ukuran**: batasi agar storage dan bandwidth tidak dibanjiri.
- **Nama file**: sanitasi untuk mencegah path traversal.
- **Magic number**: verifikasi signature file biner untuk memastikan tipe sebenarnya.`,
    },
    {
      id: 'sec-06-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-06-js',
        filename: 'upload.js',
        language: 'javascript',
        title: 'JavaScript: Upload File dengan Multer',
        code: `const path = require('path')
const express = require('express')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, unique + path.extname(file.originalname))
  },
})

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
      cb(null, true)
    } else {
      cb(new Error('only png and jpeg are allowed'))
    }
  },
})

const app = express()

app.post('/upload', upload.single('avatar'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'no file uploaded' })
  }
  res.json({
    filename: req.file.filename,
    size: req.file.size,
    mimetype: req.file.mimetype,
  })
})

app.use((err, req, res, next) => {
  res.status(400).json({ error: err.message })
})`,
        explanation:
          'Multer menyimpan file ke disk dengan nama unik, membatasi ukuran, dan menyaring tipe file. Error handler mengembalikan pesan yang aman ke client.',
      },
    },
    {
      id: 'sec-06-intermediate-cloud',
      type: 'markdown',
      level: 'intermediate',
      title: 'Cloud Storage dan Presigned URL',
      content: `## Object Storage

Object storage seperti Amazon S3, MinIO, atau Cloudflare R2 menyimpan file sebagai object di dalam bucket. Keuntungannya:

- Skalabilitas hampir tak terbatas.
- Durability tinggi.
- Dapat diakses melalui HTTP.
- Mendukung lifecycle policy untuk menghapus file lama.

## Presigned URL

Presigned URL memungkinkan client berinteraksi langsung dengan object storage tanpa melewati server aplikasi. Server membuat URL yang sudah ditandatangani dengan secret key dan memberikannya ke client. URL memiliki:

- **Aksi**: GET untuk download, PUT untuk upload.
- **Bucket dan key**: lokasi object.
- **Expiry**: batas waktu berlaku URL.
- **Signature**: hash yang membuktikan URL dibuat oleh pemilik credential.

Keuntungan presigned URL adalah server tidak perlu meneruskan byte file, mengurangi beban bandwidth dan latency.

## Validasi di Sisi Server

Meskipun upload langsung ke S3, server tetap mengontrol:

- Key object yang diizinkan.
- Content-Type dan ukuran maksimum.
- Kebijakan bucket (CORS, ACL).`,
    },
    {
      id: 'sec-06-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-06-ts',
        filename: 'storage.service.ts',
        language: 'typescript',
        title: 'TypeScript: NestJS S3 Presigned URL',
        code: `import { Injectable } from '@nestjs/common'
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

@Injectable()
export class StorageService {
  private readonly s3 = new S3Client({ region: process.env.AWS_REGION })
  private readonly bucket = process.env.S3_BUCKET_NAME

  async getUploadUrl(userId: number, filename: string, contentType: string) {
    const key = 'uploads/' + userId + '/' + Date.now() + '-' + filename
    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      ContentType: contentType,
      // batas ukuran bisa ditambahkan dengan Content-Length
    })
    const url = await getSignedUrl(this.s3, command, { expiresIn: 300 })
    return { url, key }
  }

  async getDownloadUrl(key: string) {
    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: key,
    })
    return getSignedUrl(this.s3, command, { expiresIn: 60 })
  }
}`,
        explanation:
          'NestJS service membuat presigned URL untuk upload dan download. Client mengunggah file langsung ke S3 menggunakan URL tersebut dalam batas waktu 5 menit.',
      },
    },
    {
      id: 'sec-06-advanced-upload',
      type: 'markdown',
      level: 'advanced',
      title: 'Presigned URL Internals, Multipart Upload, dan CDN',
      content: `## Bagaimana Presigned URL Dibuat

Server membangun canonical request dari parameter operasi S3, lalu menghitung signature menggunakan HMAC-SHA256 dengan AWS secret key. URL yang dihasilkan mengandung:

- \`X-Amz-Algorithm\`: algoritma signing.
- \`X-Amz-Credential\`: access key dan scope tanggal.
- \`X-Amz-Date\`: timestamp.
- \`X-Amz-Expires\`: masa berlaku dalam detik.
- \`X-Amz-SignedHeaders\`: header yang ikut disign.
- \`X-Amz-Signature\`: hasil HMAC.

Saat S3 menerima request, ia membangun canonical request yang sama dan membandingkan signature. Jika cocok dan waktu belum expired, aksi diizinkan.

## Multipart Upload

Untuk file besar, gunakan multipart upload:

1. Client meminta uploadId dari server/S3.
2. File dipecah menjadi bagian-bagian, masing-masing diupload secara paralel.
3. Setelah semua bagian selesai, client mengirim complete multipart upload.

Keuntungannya adalah resume yang lebih baik, paralelisme, dan tidak membebani memory server.

## Virus Scan dan CDN

- **Virus scan**: file yang diupload dapat dipindai menggunakan ClamAV atau service cloud sebelum dianggap aman. Lakukan scan secara asynchronous dan tandai file status.
- **CDN**: Content Delivery Network menyalin file ke edge location di seluruh dunia, mengurangi latency download. Gunakan signed URL CDN jika konten bersifat private.

## Keamanan Tambahan

- Jangan pernah menyimpan secret key AWS di client.
- Gunakan IAM role atau scoped credentials di server.
- Enkripsi file at rest dengan SSE-S3 atau SSE-KMS.
- Enkripsi in transit dengan HTTPS.`,
    },
    {
      id: 'sec-06-go-example',
      type: 'code-example',
      codeExample: {
        id: 'code-06-go',
        filename: 'main.go',
        language: 'go',
        title: 'Go: Generate S3 Presigned URL dengan AWS SDK v2',
        code: `package main

import (
	"context"
	"fmt"
	"log"
	"time"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/s3"
)

func main() {
	cfg, err := config.LoadDefaultConfig(context.Background(), config.WithRegion("ap-southeast-1"))
	if err != nil {
		log.Fatal(err)
	}

	client := s3.NewFromConfig(cfg)
	presignClient := s3.NewPresignClient(client)

	bucket := "belajar-uploads"
	key := "uploads/avatar-123.png"

	putReq, err := presignClient.PresignPutObject(context.Background(), &s3.PutObjectInput{
		Bucket:      aws.String(bucket),
		Key:         aws.String(key),
		ContentType: aws.String("image/png"),
	}, s3.WithPresignExpires(5*time.Minute))
	if err != nil {
		log.Fatal(err)
	}

	getReq, err := presignClient.PresignGetObject(context.Background(), &s3.GetObjectInput{
		Bucket: aws.String(bucket),
		Key:    aws.String(key),
	}, s3.WithPresignExpires(15*time.Minute))
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("PUT URL:", putReq.URL)
	fmt.Println("GET URL:", getReq.URL)
}`,
        explanation:
          'AWS SDK for Go v2 menyediakan PresignClient untuk membuat URL sementara. Client dapat langsung PUT file ke S3 tanpa melewati server aplikasi.',
      },
    },
    {
      id: 'sec-06-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Kesimpulan:** Untuk skala production, arahkan upload besar ke object storage melalui presigned URL atau multipart upload. Selalu validasi file, enkripsi data, dan pertimbangkan virus scan serta CDN untuk distribusi aman.',
    },
  ],
}
