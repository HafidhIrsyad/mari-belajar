import type { Lesson } from '@/content/types'

export const ch02Lesson: Lesson = {
  id: 'lesson-ch-02-rest-api-design',
  estimatedMinutes: 30,
  sections: [
    {
      id: 'sec-02-basic-resources',
      type: 'markdown',
      level: 'basic',
      title: 'Resources, Nouns, dan CRUD Mapping',
      content: `## Resource-First Thinking

REST (Representational State Transfer) memperlakukan data sebagai resource yang diidentifikasi oleh URL. Desain URL yang baik menggunakan kata benda, bukan kata kerja:

- \`GET /users\`: ambil daftar user.
- \`GET /users/42\`: ambil user dengan ID 42.
- \`POST /users\`: buat user baru.
- \`PUT /users/42\`: ganti user 42 secara utuh.
- \`PATCH /users/42\`: perbarui sebagian field user 42.
- \`DELETE /users/42\`: hapus user 42.

Hindari endpoint seperti \`/getUser\` atau \`/createUser\`; metode HTTP sudah menggambarkan aksi.

## CRUD Mapping

| Operasi | Metode HTTP | Status Response |
| --- | --- | --- |
| Create | POST | 201 Created |
| Read (list) | GET | 200 OK |
| Read (single) | GET | 200 OK / 404 Not Found |
| Update full | PUT | 200 OK / 204 No Content |
| Update partial | PATCH | 200 OK / 204 No Content |
| Delete | DELETE | 204 No Content / 200 OK |

## Format JSON Konsisten

Gunakan struktur response yang dapat diprediksi. Contoh untuk koleksi:

\`\`\`json
{
  "data": [
    { "id": 1, "name": "Andi" },
    { "id": 2, "name": "Budi" }
  ],
  "meta": {
    "total": 100,
    "page": 1,
    "limit": 20
  }
}
\`\`\`

Konsistensi memudahkan client membuat model data dan error handling generik.`,
    },
    {
      id: 'sec-02-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-02-js',
        filename: 'user-routes.js',
        language: 'javascript',
        title: 'JavaScript: CRUD REST API dengan Express',
        code: `const express = require('express')
const app = express()
app.use(express.json())

let users = []
let nextId = 1

app.get('/users', (req, res) => {
  res.json({ data: users })
})

app.get('/users/:id', (req, res) => {
  const user = users.find((u) => u.id === Number(req.params.id))
  if (!user) return res.status(404).json({ error: 'User not found' })
  res.json({ data: user })
})

app.post('/users', (req, res) => {
  const user = { id: nextId++, ...req.body }
  users.push(user)
  res.status(201).location(\`/users/\${user.id}\`).json({ data: user })
})

app.put('/users/:id', (req, res) => {
  const index = users.findIndex((u) => u.id === Number(req.params.id))
  if (index === -1) return res.status(404).json({ error: 'User not found' })
  users[index] = { id: Number(req.params.id), ...req.body }
  res.json({ data: users[index] })
})

app.delete('/users/:id', (req, res) => {
  users = users.filter((u) => u.id !== Number(req.params.id))
  res.status(204).send()
})

app.listen(3000, () => console.log('API ready'))`,
        explanation:
          'Express menghubungkan metode HTTP dan path ke handler. Header Location dan status 201 memberi tahu client di mana resource baru dapat diakses.',
      },
    },
    {
      id: 'sec-02-intermediate-patterns',
      type: 'markdown',
      level: 'intermediate',
      title: 'Pagination, Filtering, Sorting, dan Versioning',
      content: `## Pagination

Untuk koleksi besar, batasi jumlah item per response:

- **Offset-based**: \`?page=2&limit=20\` sederhana tetapi tidak stabil jika data sering berubah.
- **Cursor-based**: \`?cursor=eyJpZCI6MjB9\` lebih stabil untuk feed real-time.

Response pagination biasanya mencakup link ke halaman berikutnya:

\`\`\`json
{
  "data": [...],
  "links": {
    "self": "/users?page=2&limit=20",
    "next": "/users?page=3&limit=20",
    "prev": "/users?page=1&limit=20"
  }
}
\`\`\`

## Filtering dan Sorting

Gunakan query parameters yang jelas:

- \`GET /users?role=admin&status=active\`
- \`GET /users?sort=-created_at\` (tanda minus untuk descending)

Pisahkan filter logika dengan operator yang konsisten agar client mudah membangun query.

## Versioning

Tiga strategi umum:

1. **URL path**: \`/v1/users\` dan \`/v2/users\` — paling eksplisit.
2. **Header**: \`Accept: application/vnd.api.v2+json\` — bersih tetapi sulit di-cache.
3. **Query parameter**: \`?version=2\` — jarang dipakai karena mengotori URL.

Pilih satu strategi dan dokumentasikan sejak awal.

## HATEOAS Intro

HATEOAS (Hypermedia as the Engine of Application State) menyertakan link ke aksi yang tersedia:

\`\`\`json
{
  "data": {
    "id": 42,
    "name": "Andi",
    "links": {
      "self": "/users/42",
      "orders": "/users/42/orders",
      "edit": "/users/42",
      "delete": "/users/42"
    }
  }
}
\`\`\`

Meski tidak semua API memerlukan HATEOAS, pola ini mengurangi coupling antara client dan URL.`,
    },
    {
      id: 'sec-02-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-02-ts',
        filename: 'users.controller.ts',
        language: 'typescript',
        title: 'TypeScript: Controller REST Bertipe di NestJS',
        code: `import { Controller, Get, Post, Put, Delete, Body, Param, Query, HttpCode, HttpStatus } from '@nestjs/common'

interface CreateUserDto {
  name: string
  email: string
}

interface User {
  id: number
  name: string
  email: string
}

@Controller('users')
export class UsersController {
  private users: User[] = []
  private nextId = 1

  @Get()
  findAll(@Query('role') role?: string): User[] {
    return role ? this.users.filter((u) => u.email.includes(role)) : this.users
  }

  @Get(':id')
  findOne(@Param('id') id: string): User {
    const user = this.users.find((u) => u.id === Number(id))
    if (!user) throw new Error('User not found')
    return user
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateUserDto): User {
    const user: User = { id: this.nextId++, ...dto }
    this.users.push(user)
    return user
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: Partial<User>): User {
    const index = this.users.findIndex((u) => u.id === Number(id))
    if (index === -1) throw new Error('User not found')
    this.users[index] = { ...this.users[index], ...dto }
    return this.users[index]
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): void {
    this.users = this.users.filter((u) => u.id !== Number(id))
  }
}`,
        explanation:
          'NestJS menggunakan decorator untuk memetakan metode HTTP. Tipe DTO memastikan data masuk sesuai kontrak, meski validasi lengkap dilakukan oleh validation pipe.',
      },
    },
    {
      id: 'sec-02-advanced-openapi',
      type: 'markdown',
      level: 'advanced',
      title: 'Konsistensi API, Idempotency Keys, dan OpenAPI',
      content: `## Konsistensi di Seluruh Endpoint

Konsistensi bukan hanya soal URL. API yang baik memiliki:

- Format error seragam di semua endpoint.
- Penamaan field snake_case atau camelCase yang konsisten.
- Representasi datetime dalam ISO 8601.
- Pagination dan filter yang diterapkan seragam di semua koleksi.
- Versi dokumentasi yang selaras dengan kode.

## Idempotency Keys

Operasi seperti pembayaran atau pemesanan tidak boleh dieksekusi dua kali hanya karena client retry. Cara kerjanya:

1. Client menghasilkan key unik dan menyertakannya di header \`Idempotency-Key\`.
2. Server menyimpan mapping key → response untuk jangka waktu tertentu.
3. Jika key sama diterima lagi, server mengembalikan response yang sama tanpa side effect.

\`\`\`http
POST /payments
Idempotency-Key: 9c8b7a6f-...
Content-Type: application/json

{ "amount": 50000, "order_id": "ORD-123" }
\`\`\`

Server harus memastikan key yang sama dengan payload berbeda ditolak untuk mencegah perilaku tidak terduga.

## OpenAPI Specification

OpenAPI memungkinkan kita mendeskripsikan endpoint, parameter, skema, dan response dalam satu dokumen. Keuntungannya:

- Dokumentasi interaktif otomatis melalui Swagger UI.
- Generasi client SDK.
- Validasi kontrak saat testing.
- Kolaborasi antara backend dan frontend tanpa mengandukan komunikasi manual.

Spesifikasi dapat ditulis manual atau dibuat otomatis dari anotasi kode.

## API Consistency dan JSON:API

JSON:API adalah spesifikasi yang lebih ketat tentang struktur request/response, termasuk cara menyertakan relasi, compound documents, dan error objects. Mengadopsi standar seperti JSON:API mengurangi keputusan desain ad-hoc, meski menambah kompleksitas untuk API sederhana.`,
    },
    {
      id: 'sec-02-go-example',
      type: 'code-example',
      codeExample: {
        id: 'code-02-go',
        filename: 'main.go',
        language: 'go',
        title: 'Go: REST Handler dengan Chi Router',
        code: `package main

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/go-chi/chi/v5"
)

type User struct {
	ID    int    \`json:"id"\`
	Name  string \`json:"name"\`
	Email string \`json:"email"\`
}

var users = []User{}
var nextID = 1

func main() {
	r := chi.NewRouter()

	r.Get("/users", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(users)
	})

	r.Get("/users/{id}", func(w http.ResponseWriter, r *http.Request) {
		id, _ := strconv.Atoi(chi.URLParam(r, "id"))
		for _, u := range users {
			if u.ID == id {
				w.Header().Set("Content-Type", "application/json")
				json.NewEncoder(w).Encode(u)
				return
			}
		}
		http.NotFound(w, r)
	})

	r.Post("/users", func(w http.ResponseWriter, r *http.Request) {
		var dto User
		if err := json.NewDecoder(r.Body).Decode(&dto); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		dto.ID = nextID
		nextID++
		users = append(users, dto)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusCreated)
		json.NewEncoder(w).Encode(dto)
	})

	http.ListenAndServe(":8080", r)
}`,
        explanation:
          'Chi adalah router minimalis untuk Go. Struct tags json mengontrol serialisasi, dan chi.URLParam membaca path parameter. Status 201 dipasang secara eksplisit untuk response create.',
      },
    },
    {
      id: 'sec-02-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Kesimpulan:** REST API yang baik didesain dari perspektif resource, bukan aksi. Gunakan CRUD mapping yang konsisten, pagination untuk koleksi besar, versioning untuk evolusi, idempotency keys untuk operasi kritis, dan OpenAPI untuk mendokumentasikan kontrak secara eksplisit.',
    },
  ],
}
