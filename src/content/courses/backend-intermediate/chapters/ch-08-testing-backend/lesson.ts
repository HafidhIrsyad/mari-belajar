import type { Lesson } from '@/content/types'

export const ch08Lesson: Lesson = {
  id: 'lesson-ch-08-testing-backend',
  estimatedMinutes: 50,
  sections: [
    {
      id: 'sec-08-basic-testing',
      type: 'markdown',
      level: 'basic',
      title: 'Unit Test, Mock Repository, dan HTTP Test',
      content: `## Piramide Testing

Piramide testing menunjukkan proporsi ideal test:

- **Unit test**: banyak, cepat, mengisolasi fungsi atau class.
- **Integration test**: sedikit, menguji interaksi antar komponen.
- **E2E test**: paling sedikit, menguji alur lengkap aplikasi.

## Unit Test dengan Mock

Saat menguji service, kita tidak ingin benar-benar mengakses database. Mock repository menggantikan dependency nyata dengan object yang perilakunya dapat dikontrol. Keuntungannya:

- Test cepat dan deterministik.
- Kegagalan database tidak membuat test gagal.
- Mudah mensimulasikan edge case seperti error atau data kosong.

## HTTP Test

Untuk menguji endpoint, gunakan:

- **supertest** untuk Node.js/Express/NestJS.
- **httptest** untuk Go.

Test ini mengirim request HTTP ke aplikasi tanpa harus membuka port sungguhan.`,
    },
    {
      id: 'sec-08-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-08-js',
        filename: 'user.service.test.js',
        language: 'javascript',
        title: 'JavaScript: Jest Unit Test dan Supertest',
        code: `const request = require('supertest')
const express = require('express')

function createUserService(repository) {
  return {
    async register(email, password) {
      if (await repository.findByEmail(email)) {
        throw new Error('email already exists')
      }
      const user = await repository.create({ email, password })
      return user
    },
  }
}

describe('UserService', () => {
  it('throws when email already exists', async () => {
    const repo = {
      findByEmail: jest.fn().mockResolvedValue({ id: 1, email: 'a@example.com' }),
      create: jest.fn(),
    }
    const service = createUserService(repo)
    await expect(service.register('a@example.com', 'secret')).rejects.toThrow('email already exists')
  })
})

describe('POST /users', () => {
  it('returns 201 for valid payload', async () => {
    const app = express()
    app.use(express.json())
    app.post('/users', (req, res) => {
      res.status(201).json({ id: 1, email: req.body.email })
    })

    const response = await request(app)
      .post('/users')
      .send({ email: 'a@example.com', password: 'secret' })
      .expect(201)

    expect(response.body.email).toBe('a@example.com')
  })
})`,
        explanation:
          'Jest mock mengisolasi service dari database. Supertest mengirim request ke Express app secara langsung tanpa server yang berjalan.',
      },
    },
    {
      id: 'sec-08-intermediate-integration',
      type: 'markdown',
      level: 'intermediate',
      title: 'Integration Test dengan Test Database',
      content: `## Mengapa Integration Test Penting

Integration test memastikan kode berfungsi dengan dependency nyata: database, cache, atau message broker. Test ini menangkap bug yang tidak muncul di unit test, seperti:

- Query yang salah karena perbedaan SQL dialect.
- Transaction isolation yang tidak sesuai harapan.
- Constraint database yang tidak di-handle.

## Test Database

Cara umum:

1. Buat database terpisah untuk test.
2. Jalankan migration sebelum test.
3. Seed data minimal yang diperlukan.
4. Bersihkan data di \`beforeEach\` atau \`afterAll\`.

## Seeding dan Teardown

- Gunakan factory function untuk membuat data uji.
- Hapus tabel atau rollback transaction setelah setiap test.
- Hindari test yang bergantung pada urutan eksekusi; setiap test harus dimulai dari state bersih.`,
    },
    {
      id: 'sec-08-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-08-ts',
        filename: 'users.e2e-spec.ts',
        language: 'typescript',
        title: 'TypeScript: NestJS E2E Test dengan Database',
        code: `import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import request from 'supertest'
import { AppModule } from '../src/app.module'
import { PrismaService } from '../src/prisma.service'

describe('UsersController (e2e)', () => {
  let app: INestApplication
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    prisma = app.get(PrismaService)
    await app.init()
  })

  beforeEach(async () => {
    await prisma.user.deleteMany()
  })

  afterAll(async () => {
    await prisma.$disconnect()
    await app.close()
  })

  it('creates a user and returns 201', async () => {
    const response = await request(app.getHttpServer())
      .post('/users')
      .send({ email: 'test@example.com', password: 'StrongPass1!' })
      .expect(201)

    expect(response.body.email).toBe('test@example.com')

    const user = await prisma.user.findUnique({ where: { email: 'test@example.com' } })
    expect(user).not.toBeNull()
  })
})`,
        explanation:
          'E2E test di NestJS membuat aplikasi sungguhan, membersihkan data sebelum setiap test, dan memverifikasi baik response HTTP maupun state database.',
      },
    },
    {
      id: 'sec-08-advanced-testing',
      type: 'markdown',
      level: 'advanced',
      title: 'Contract Testing, Load Testing, Mutation Testing, dan Testcontainers',
      content: `## Contract Testing

Contract testing memastikan konsumen dan provider API sepakat tentang request/response. **Pact** adalah tools populer untuk ini:

- Konsumen menulis ekspektasi dan menghasilkan contract file.
- Provider menjalankan verifikasi terhadap contract tersebut.
- Jika salah satu pihak mengubah API tanpa memperbarui contract, test gagal.

## Load Testing

Load testing mengukur performa aplikasi di bawah beban. **k6** adalah tools yang populer:

- Definisikan virtual users, duration, dan scenario.
- Pantau response time, error rate, dan throughput.
- Identifikasi bottleneck seperti query lambat atau kekurangan connection pool.

## Mutation Testing

Mutation testing mengukur kualitas test suite dengan mengubah kode sedikit demi sedikit (mutant) dan memeriksa apakah test gagal. Jika test tetap lulus meski kode berubah, berarti test kurang ketat.

## Testcontainers

Testcontainers menyediakan container sungguhan untuk dependency seperti PostgreSQL, Redis, atau Kafka selama test:

- Setiap test mendapat instance bersih.
- Tidak perlu mengelola database test manual.
- Test lebih mendekati production environment.`,
    },
    {
      id: 'sec-08-go-example',
      type: 'code-example',
      codeExample: {
        id: 'code-08-go',
        filename: 'handler_test.go',
        language: 'go',
        title: 'Go: Table-Driven Test dengan httptest',
        code: `package main

import (
	"fmt"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
)

func greetHandler(w http.ResponseWriter, r *http.Request) {
	name := r.URL.Query().Get("name")
	if name == "" {
		name = "world"
	}
	w.Header().Set("Content-Type", "application/json")
	fmt.Fprintf(w, \`{"message":"hello %s"}\`, name)
}

func TestGreetHandler(t *testing.T) {
	tests := []struct {
		name       string
		query      string
		wantStatus int
		wantBody   string
	}{
		{"default", "", http.StatusOK, \`{"message":"hello world"}\`},
		{"with name", "?name=ari", http.StatusOK, \`{"message":"hello ari"}\`},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			req := httptest.NewRequest(http.MethodGet, "/greet"+tt.query, nil)
			rec := httptest.NewRecorder()
			greetHandler(rec, req)

			if rec.Code != tt.wantStatus {
				t.Errorf("status got %d want %d", rec.Code, tt.wantStatus)
			}
			if strings.TrimSpace(rec.Body.String()) != tt.wantBody {
				t.Errorf("body got %s want %s", rec.Body.String(), tt.wantBody)
			}
		})
	}
}`,
        explanation:
          'Table-driven test memudahkan penambahan kasus uji. httptest membuat request dan response palsu sehingga handler dapat diuji tanpa membuka port.',
      },
    },
    {
      id: 'sec-08-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Kesimpulan:** Kombinasikan unit test cepat, integration test dengan database nyata, e2e test untuk alur kritis, contract test untuk integrasi antar service, load test untuk performa, dan mutation test untuk mengukur kekuatan test suite.',
    },
  ],
}
