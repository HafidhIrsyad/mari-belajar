import type { Lesson } from '@/content/types'

export const ch03Lesson: Lesson = {
  id: 'lesson-ch-03-routing-controllers',
  estimatedMinutes: 30,
  sections: [
    {
      id: 'sec-03-basic-routing',
      type: 'markdown',
      level: 'basic',
      title: 'Route, Path Params, dan Query Params',
      content: `## Definisi Route

Route adalah aturan yang menghubungkan URL dan metode HTTP ke fungsi handler. Pola dasar sebuah route:

\`\`\`
METHOD /path → handler(request, response)
\`\`\`

Framework backend seperti Express, Fastify, NestJS, dan Chi menyediakan DSL untuk mendefinisikan route dengan singkat.

## Path Parameters

Path parameter adalah segmen URL dinamis yang menjadi input handler. Contoh:

- \`GET /users/:id\` → \`id\` dapat bernilai \`42\` saat client mengakses \`/users/42\`.
- \`GET /orders/:orderId/items/:itemId\` → dua parameter sekaligus.

Gunakan path parameter untuk mengidentifikasi resource spesifik, bukan untuk filter atau pencarian.

## Query Parameters

Query parameter muncul setelah tanda tanya dan dipisahkan dengan \`&\`. Contoh:

\`\`\`
GET /users?role=admin&status=active&sort=name
\`\`\`

Query parameter cocok untuk:

- Filtering: \`?status=active\`
- Sorting: \`?sort=-created_at\`
- Pagination: \`?page=2&limit=20\`
- Pencarian: \`?q=keyword\`

## Route Handler

Handler berfungsi menerima request, mengakses parameter, memanggil logika bisnis, lalu mengirim response. Hindari menumpuk logika bisnis di handler; gunakan service atau use case terpisah.`,
    },
    {
      id: 'sec-03-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-03-js',
        filename: 'routes.js',
        language: 'javascript',
        title: 'JavaScript: Route dan Controller di Express',
        code: `const express = require('express')
const router = express.Router()

const users = [
  { id: 1, name: 'Andi', role: 'admin' },
  { id: 2, name: 'Budi', role: 'user' },
]

function getUsers(req, res) {
  const { role, sort } = req.query
  let result = users
  if (role) result = result.filter((u) => u.role === role)
  if (sort === 'name') result = [...result].sort((a, b) => a.name.localeCompare(b.name))
  res.json({ data: result })
}

function getUserById(req, res) {
  const id = Number(req.params.id)
  const user = users.find((u) => u.id === id)
  if (!user) return res.status(404).json({ error: 'User not found' })
  res.json({ data: user })
}

router.get('/users', getUsers)
router.get('/users/:id', getUserById)

module.exports = { userRouter: router }`,
        explanation:
          'Router modular memisahkan definisi endpoint dari file aplikasi utama. Handler membaca req.query untuk filter dan req.params untuk path identifier.',
      },
    },
    {
      id: 'sec-03-intermediate-controller',
      type: 'markdown',
      level: 'intermediate',
      title: 'Controller Pattern dan Middleware Grouping',
      content: `## Controller Pattern

Controller bertanggung jawab untuk:

1. Menerima dan membongkar request HTTP.
2. Memvalidasi input dasar.
3. Memanggil service yang berisi logika bisnis.
4. Membentuk response dengan status code dan format yang konsisten.

Pola ini memisahkan transport concern dari domain concern. Jika suatu hari framework diganti, service tetap dapat digunakan karena tidak bergantung pada \`req\` atau \`res\`.

## Middleware Grouping

Middleware adalah fungsi yang dieksekusi sebelum atau sesudah handler. Dengan grouping, kita dapat menerapkan middleware pada subset route:

\`\`\`javascript
const adminRouter = express.Router()
adminRouter.use(authenticate)
adminRouter.use(requireRole('admin'))
adminRouter.get('/dashboard', getDashboard)
adminRouter.get('/settings', getSettings)
\`\`\`

Semua route di bawah \`adminRouter\` akan melewati \`authenticate\` dan \`requireRole('admin')\`.

## Dependency Injection Dasar

Dependency injection (DI) berarti class atau fungsi menerima dependency dari luar, bukan membuatnya sendiri. Contoh tanpa DI:

\`\`\`javascript
const service = new UserService() // coupling kuat
\`\`\`

Dengan DI:

\`\`\`javascript
class UserController {
  constructor(userService) {
    this.userService = userService
  }
}
\`\`\`

DI memudahkan unit test karena \`userService\` dapat diganti dengan stub.

## Content Negotiation

Server dapat menyesuaikan format response berdasarkan header \`Accept\`:

- \`Accept: application/json\` → response JSON.
- \`Accept: text/html\` → response HTML.
- \`Accept: application/xml\` → response XML jika didukung.

Framework seperti Express menyediakan \`res.format()\` untuk menangani content negotiation.`,
    },
    {
      id: 'sec-03-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-03-ts',
        filename: 'users.controller.ts',
        language: 'typescript',
        title: 'TypeScript: Controller dengan Service Injection',
        code: `import { Controller, Get, Param, Query, Inject } from '@nestjs/common'

interface User {
  id: number
  name: string
  role: string
}

interface UserService {
  findAll(filter: { role?: string; sort?: string }): Promise<User[]>
  findById(id: number): Promise<User | null>
}

@Controller('users')
export class UsersController {
  constructor(@Inject('USER_SERVICE') private readonly userService: UserService) {}

  @Get()
  async findAll(
    @Query('role') role?: string,
    @Query('sort') sort?: string
  ): Promise<{ data: User[] }> {
    const users = await this.userService.findAll({ role, sort })
    return { data: users }
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<{ data: User }> {
    const user = await this.userService.findById(Number(id))
    if (!user) {
      throw new Error('User not found')
    }
    return { data: user }
  }
}`,
        explanation:
          'Controller menerima UserService melalui constructor injection. Logika pencarian user berada di service, sementara controller hanya membentuk response.',
      },
    },
    {
      id: 'sec-03-advanced-cors',
      type: 'markdown',
      level: 'advanced',
      title: 'Route Validation, CORS, dan Content Negotiation Lanjutan',
      content: `## Route Validation

Route validation memastikan parameter dan query sesuai kontrak sebelum masuk ke handler. Validasi dapat dilakukan dengan:

- Schema library seperti Zod, Joi, atau Yup.
- Built-in validator framework seperti NestJS ValidationPipe.
- Middleware khusus yang memeriksa req.params dan req.query.

Validasi di route mengurangi jumlah kondisi error di controller dan service.

## CORS Handling

CORS (Cross-Origin Resource Sharing) adalah mekanisme browser untuk membatasi request lintas origin. Konfigurasi yang penting:

- \`Access-Control-Allow-Origin\`: origin yang diizinkan. Jangan gunakan wildcard \`*\` jika cookie/credentials dikirim.
- \`Access-Control-Allow-Methods\`: metode HTTP yang diperbolehkan, misalnya GET, POST, PUT, DELETE.
- \`Access-Control-Allow-Headers\`: header custom yang boleh dikirim client.
- \`Access-Control-Allow-Credentials\`: harus \`true\` jika client mengirim cookie.

Preflight request menggunakan metode OPTIONS. Server harus merespons OPTIONS dengan header CORS yang benar agar browser melanjutkan request utama.

## Middleware Ordering

Urutan middleware sangat penting. Middleware dieksekusi secara berurutan saat request masuk, dan terbalik saat response keluar. Pola umum:

1. Logger/Request ID.
2. Security headers dan CORS.
3. Body parser.
4. Authentication.
5. Route handlers.
6. Error handler.

Jika middleware autentikasi ditempatkan setelah route terbuka, route tersebut tidak akan dilindungi.

## Controller Composition dan Router Strategy

Pada aplikasi besar, route dapat diorganisir dengan:

- **Versioned routers**: \`/v1/users\` dan \`/v2/users\` menggunakan router terpisah.
- **Feature modules**: setiap fitur memiliki router, controller, dan service sendiri.
- **Mount points**: router fitur dipasang di path tertentu, misalnya \`app.use('/api/v1', apiRouter)\`.

Komposisi ini menjaga skalabilitas dan memudahkan code ownership di tim yang besar.`,
    },
    {
      id: 'sec-03-go-example',
      type: 'code-example',
      codeExample: {
        id: 'code-03-go',
        filename: 'main.go',
        language: 'go',
        title: 'Go: Router Group dan Middleware dengan Chi',
        code: `package main

import (
	"fmt"
	"net/http"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

func main() {
	r := chi.NewRouter()

	// Global middleware
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(middleware.Timeout(60 * time.Second))

	// Public routes
	r.Get("/health", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("ok"))
	})

	// API group
	r.Route("/api/v1", func(api chi.Router) {
		api.Use(jsonMiddleware)

		api.Get("/users", listUsers)
		api.Get("/users/{id}", getUser)

		// Admin sub-group
		api.Route("/admin", func(admin chi.Router) {
			admin.Use(requireAdmin)
			admin.Get("/reports", listReports)
		})
	})

	http.ListenAndServe(":8080", r)
}

func jsonMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		next.ServeHTTP(w, r)
	})
}

func requireAdmin(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Header.Get("X-Role") != "admin" {
			http.Error(w, "forbidden", http.StatusForbidden)
			return
		}
		next.ServeHTTP(w, r)
	})
}

func listUsers(w http.ResponseWriter, r *http.Request) { fmt.Fprintln(w, "[]") }
func getUser(w http.ResponseWriter, r *http.Request)   { fmt.Fprintln(w, "{}") }
func listReports(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, \`[{"report":1}]\`)
}`,
        explanation:
          'Chi mendukung nested route groups. Middleware Logger, Recoverer, dan Timeout dipasang global, sementara jsonMiddleware dan requireAdmin diterapkan pada grup tertentu.',
      },
    },
    {
      id: 'sec-03-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Kesimpulan:** Routing dan controller adalah fondasi arsitektur backend. Pisahkan handler dari logika bisnis, manfaatkan middleware grouping, dan selalu pertimbangkan urutan middleware, validasi route, CORS, serta content negotiation saat merancang API.',
    },
  ],
}
