import type { Lesson } from '@/content/types'

export const ch07Lesson: Lesson = {
  id: 'lesson-ch-07-documentation-testing-api',
  estimatedMinutes: 35,
  sections: [
    {
      id: 'sec-07-basic-docs',
      type: 'markdown',
      level: 'basic',
      title: 'Swagger/OpenAPI UI dan Manual Testing',
      content: `## Mengapa Mendokumentasikan API?

Dokumentasi API adalah kontrak yang memudahkan developer lain menggunakan layanan kita. Dokumentasi yang baik mencakup:

- URL endpoint dan metode HTTP.
- Parameter path, query, dan body.
- Skema request dan response.
- Status code dan contoh error.
- Informasi autentikasi.

## OpenAPI dan Swagger UI

OpenAPI Specification (OAS) adalah format standar untuk mendeskripsikan REST API. Swagger UI membaca file OpenAPI dan menampilkan antarmuka interaktif di browser. Dengan Swagger UI, developer dapat:

- Melihat daftar endpoint.
- Mengisi parameter dan body request.
- Mengirim request langsung dari browser.
- Melihat response dan status code.

## Manual Testing dengan curl

curl adalah alat command-line untuk mengirim HTTP request. Contoh penggunaan:

\`\`\`bash
curl -X GET https://api.example.com/users \
  -H "Accept: application/json"

curl -X POST https://api.example.com/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Andi","email":"andi@example.com"}'
\`\`\`

curl berguna untuk verifikasi cepat, debugging, dan otomasi sederhana di terminal.

## Postman dan Koleksi

Postman memungkinkan kita menyimpan request dalam koleksi, mengatur environment variable, dan menulis test script. Koleksi dapat dibagikan ke tim atau diintegrasikan ke CI/CD.`,
    },
    {
      id: 'sec-07-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-07-js',
        filename: 'swagger.js',
        language: 'javascript',
        title: 'JavaScript: Dokumentasi Swagger dengan swagger-jsdoc',
        code: `const express = require('express')
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const app = express()

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mari Belajar API',
      version: '1.0.0',
      description: 'API untuk kursus backend basic',
    },
  },
  apis: ['./routes.js'],
}

const specs = swaggerJsdoc(options)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Daftar semua user
 *     responses:
 *       200:
 *         description: Daftar user berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 */
app.get('/users', (req, res) => {
  res.json([{ id: 1, name: 'Andi' }])
})

app.listen(3000)`,
        explanation:
          'swagger-jsdoc mengubah komentar JSDoc menjadi spesifikasi OpenAPI. Swagger UI kemudian menampilkan dokumentasi interaktif di path /api-docs.',
      },
    },
    {
      id: 'sec-07-intermediate-testing',
      type: 'markdown',
      level: 'intermediate',
      title: 'Auto-Generate OpenAPI dan Unit Test Endpoint',
      content: `## Auto-Generate OpenAPI dari Kode

Dibanding menulis OpenAPI secara manual, banyak framework yang dapat menghasilkan dokumentasi otomatis dari anotasi kode:

- **NestJS**: \`@nestjs/swagger\` membaca decorator controller dan DTO.
- **Go**: swaggo membaca komentar di atas handler.
- **Python FastAPI**: menghasilkan OpenAPI langsung dari tipe fungsi.

Dokumentasi otomatis mengurangi risiko ketidakcocokan antara kode dan dokumentasi.

## Unit Test Endpoint

Unit test untuk endpoint sebaiknya tidak memerlukan server berjalan di port jaringan. Gunakan library yang dapat memanggil handler langsung:

- **Node.js**: supertest bekerja dengan Express, Fastify, dan NestJS.
- **Go**: \`httptest\` menyediakan \`ResponseRecorder\` untuk merekam response.

Tes yang baik mencakup:

- Request valid dan response sukses.
- Input tidak valid dan response error.
- Autentikasi yang gagal.
- Edge case seperti resource tidak ditemukan.

## Keuntungan Unit Test Endpoint

- Cepat karena tidak perlu bind ke port.
- Dapat dijalankan di CI/CD.
- Memberikan umpan balik cepat saat refactoring.
- Mendokumentasikan perilaku endpoint melalui kode.`,
    },
    {
      id: 'sec-07-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-07-ts',
        filename: 'users.controller.spec.ts',
        language: 'typescript',
        title: 'TypeScript: Unit Test Endpoint dengan supertest',
        code: `import request from 'supertest'
import express from 'express'

const app = express()
app.use(express.json())

const users: { id: number; name: string }[] = []

app.get('/users', (req, res) => res.json({ data: users }))

app.post('/users', (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({ error: 'name is required' })
  }
  const user = { id: users.length + 1, name: req.body.name }
  users.push(user)
  res.status(201).json({ data: user })
})

describe('POST /users', () => {
  beforeEach(() => {
    users.length = 0
  })

  it('creates a user with valid input', async () => {
    const response = await request(app)
      .post('/users')
      .send({ name: 'Andi' })
      .expect(201)

    expect(response.body.data.name).toBe('Andi')
  })

  it('returns 400 when name is missing', async () => {
    const response = await request(app).post('/users').send({}).expect(400)
    expect(response.body.error).toBe('name is required')
  })
})`,
        explanation:
          'supertest memanggil aplikasi Express tanpa server nyata. Test ini memverifikasi response sukses dan error untuk endpoint POST /users.',
      },
    },
    {
      id: 'sec-07-advanced-contract',
      type: 'markdown',
      level: 'advanced',
      title: 'Contract Testing, Versioning, dan Examples',
      content: `## Contract Testing

Contract testing memverifikasi bahwa API producer dan consumer sepakat terhadap bentuk request dan response. Alat populer seperti Pact menyimpan kontrak di repository dan menjalankan verifikasi saat CI.

Keuntungan contract testing:

- Menemukan perubahan breaking sebelum deploy.
- Mengurangi kebutuhan integration test end-to-end yang berat.
- Mendokumentasikan ekspektasi consumer secara eksplisit.

## API Versioning dalam Dokumentasi

Saat API berevolusi, dokumentasi harus mencerminkan versi yang aktif. Praktik yang baik:

- Pisahkan spesifikasi OpenAPI per versi (\`openapi-v1.yaml\`, \`openapi-v2.yaml\`).
- Tandai endpoint deprecated dengan \`deprecated: true\`.
- Jelaskan migration path dari versi lama ke versi baru.
- Sertakan changelog di dokumentasi.

## Examples dan Schemas

OpenAPI mendukung \`examples\` untuk request dan response. Contoh yang konkret membantu developer memahami kontrak lebih cepat daripada membaca skema abstrak.

\`\`\`yaml
responses:
  '201':
    content:
      application/json:
        schema:
          $ref: '#/components/schemas/User'
        examples:
          default:
            value:
              id: 1
              name: Andi
              email: andi@example.com
\`\`\`

Dokumentasi yang kaya contoh mengurangi kesalahpahaman dan jumlah pertanyaan di channel tim.

## Integrasi ke CI/CD

Dokumentasi dan test dapat digabungkan dalam pipeline:

1. Build aplikasi.
2. Jalankan unit test dan integration test.
3. Generate OpenAPI dari kode.
4. Validasi OpenAPI terhadap spesifikasi.
5. Deploy dokumentasi ke portal developer.`,
    },
    {
      id: 'sec-07-go-example',
      type: 'code-example',
      codeExample: {
        id: 'code-07-go',
        filename: 'handler_test.go',
        language: 'go',
        title: 'Go: Unit Test Handler dengan httptest',
        code: `package main

import (
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
)

func listUsers(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(\`[{"id":1,"name":"Andi"}]\`))
}

func TestListUsers(t *testing.T) {
	req := httptest.NewRequest(http.MethodGet, "/users", nil)
	rr := httptest.NewRecorder()

	listUsers(rr, req)

	if rr.Code != http.StatusOK {
		t.Fatalf("expected status %d, got %d", http.StatusOK, rr.Code)
	}

	if !strings.Contains(rr.Body.String(), "Andi") {
		t.Fatalf("expected body to contain Andi, got %s", rr.Body.String())
	}
}`,
        explanation:
          'httptest.NewRecorder merekam response dari handler sehingga kita dapat menguji status code, header, dan body tanpa menjalankan server.',
      },
    },
    {
      id: 'sec-07-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Kesimpulan:** Dokumentasi dan testing API saling melengkapi. OpenAPI/Swagger memberikan kontrak yang dapat dibaca manusia dan mesin, sementara unit test dan contract testing memastikan kontrak tersebut dipegang sepanjang waktu.',
    },
  ],
}
