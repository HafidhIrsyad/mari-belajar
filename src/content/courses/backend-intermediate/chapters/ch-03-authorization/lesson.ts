import type { Lesson } from '@/content/types'

export const ch03Lesson: Lesson = {
  id: 'lesson-ch-03-authorization',
  estimatedMinutes: 45,
  sections: [
    {
      id: 'sec-03-basic-authorization',
      type: 'markdown',
      level: 'basic',
      title: 'Autentikasi vs Authorization dan RBAC',
      content: `## Dua Konsep yang Berbeda

- **Autentikasi** menjawab pertanyaan: siapa pengguna ini?
- **Authorization** menjawab pertanyaan: apa yang boleh dilakukan pengguna?

Sebuah request bisa terautentikasi tetapi tidak berhak mengakses resource tertentu.

## Role-Based Access Control (RBAC)

RBAC memberikan izin berdasarkan role yang dimiliki pengguna. Strukturnya sederhana:

- User memiliki satu atau beberapa role.
- Setiap role memiliki satu atau beberapa permission.
- Middleware/guard memeriksa apakah role pengguna mencakup permission yang dibutuhkan.

Contoh role: \`admin\`, \`editor\`, \`viewer\`. Keuntungan RBAC adalah mudah dipahami dan dikelola. Kelemahannya kurang fleksibel jika aturan bergantung pada atribut spesifik resource.

## Guards dan Middleware

- **Middleware** pada framework seperti Express/Chi berjalan sebelum route handler.
- **Guard** pada NestJS memutuskan apakah request boleh diteruskan ke handler.
- Keduanya membaca identitas dari token/session, lalu memeriksa izin.`,
    },
    {
      id: 'sec-03-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-03-js',
        filename: 'authz-middleware.js',
        language: 'javascript',
        title: 'JavaScript: RBAC Middleware di Express',
        code: `function requireRole(...allowedRoles) {
  return (req, res, next) => {
    const userRole = req.user?.role
    if (!userRole || !allowedRoles.includes(userRole)) {
      return res.status(403).json({ error: 'forbidden' })
    }
    next()
  }
}

function requireOwnership(getResourceOwnerId) {
  return async (req, res, next) => {
    const ownerId = await getResourceOwnerId(req)
    if (ownerId !== req.user.id) {
      return res.status(403).json({ error: 'not the owner' })
    }
    next()
  }
}

// contoh penggunaan
app.get('/admin/users', authenticate, requireRole('admin'), listUsers)
app.patch('/posts/:id', authenticate, requireOwnership(getPostOwnerId), updatePost)

module.exports = { requireRole, requireOwnership }`,
        explanation:
          'requireRole memeriksa role dari token, sedangkan requireOwnership memastikan pengguna hanya dapat mengubah resource miliknya. Kombinasi keduanya menutupi banyak kasus RBAC.',
      },
    },
    {
      id: 'sec-03-intermediate-authz',
      type: 'markdown',
      level: 'intermediate',
      title: 'Policy-Based, Ownership, dan ABAC',
      content: `## Policy-Based Access Control

Policy-based authorization memisahkan aturan akses dari kode aplikasi. Aturan ditulis dalam bentuk kebijakan yang dapat diperbarui tanpa mengubah kode. Library seperti Casbin mendukung berbagai model kebijakan:

- **ACL**: daftar akses sederhana.
- **RBAC dengan domain/tenant**: role bersifat scoped.
- **ABAC**: aturan berbasis atribut.

## Ownership Check

Ownership adalah kebijakan paling umum: pengguna hanya boleh mengubah data miliknya. Implementasinya:

1. Ambil resource dari database.
2. Bandingkan \`resource.ownerId\` dengan \`currentUser.id\`.
3. Admin atau role khusus dapat dikecualikan.

## Attribute-Based Access Control (ABAC)

ABAC mengevaluasi kebijakan berdasarkan atribut:

- **Subject**: role, department, clearance level pengguna.
- **Resource**: owner, status, classification data.
- **Action**: read, write, delete, approve.
- **Environment**: waktu, lokasi, IP address.

Contoh kebijakan ABAC: editor boleh mengedit artikel jika artikel statusnya \`draft\` dan editor berada dalam department yang sama dengan penulis.`,
    },
    {
      id: 'sec-03-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-03-ts',
        filename: 'rbac.guard.ts',
        language: 'typescript',
        title: 'TypeScript: NestJS RBAC Guard dan Ownership Service',
        code: `import { CanActivate, ExecutionContext, Injectable, SetMetadata } from '@nestjs/common'
import { Reflector } from '@nestjs/core'

export const ROLES_KEY = 'roles'
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles)

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ])
    if (!requiredRoles) {
      return true
    }
    const { user } = context.switchToHttp().getRequest()
    return requiredRoles.includes(user.role)
  }
}

interface Ownable {
  ownerId: number
}

@Injectable()
export class OwnershipService {
  canModify<T extends Ownable>(user: { id: number; role: string }, resource: T): boolean {
    return user.role === 'admin' || resource.ownerId === user.id
  }
}

`,
        explanation:
          'RolesGuard membaca metadata decorator @Roles lalu membandingkannya dengan role pengguna. OwnershipService memusatkan logika kepemilikan sehingga dapat digunakan oleh berbagai controller.',
      },
    },
    {
      id: 'sec-03-advanced-authz',
      type: 'markdown',
      level: 'advanced',
      title: 'Permission Matrix, Row-Level Security, dan ReBAC',
      content: `## Permission Matrix

Permission matrix adalah tabel dua dimensi yang memetakan role terhadap resource/action. Matriks membantu tim produk dan engineering menyelaraskan kebijakan:

| Resource/Action | viewer | editor | admin |
|----------------|--------|--------|-------|
| post:read      | yes    | yes    | yes   |
| post:create    | no     | yes    | yes   |
| post:delete    | no     | own    | yes   |
| user:manage    | no     | no     | yes   |

Kolom \`own\` berarti diizinkan hanya untuk resource milik sendiri.

## Row-Level Security (RLS)

PostgreSQL mendukung RLS, yaitu kebijakan akses yang diterapkan di tingkat baris:

- Aktifkan \`ALTER TABLE posts ENABLE ROW LEVEL SECURITY\`.
- Buat policy: \`CREATE POLICY user_posts ON posts FOR SELECT USING (owner_id = current_setting('app.current_user_id')::int)\`.
- Aplikasi mengatur variabel session sebelum query.

RLS berguna untuk multi-tenant atau data yang sensitif karena kebijakan dipaksa oleh database, bukan hanya oleh kode aplikasi.

## Relationship-Based Access Control (ReBAC)

ReBAC memberikan izin berdasarkan relasi antar entitas, bukan hanya role. Contoh: pengguna boleh mengedit dokumen jika pengguna adalah \`owner\` atau \`editor\` dari folder yang memuat dokumen tersebut. Google Zanzibar adalah contoh sistem ReBAC yang mendukung graf relasi berskala besar.`,
    },
    {
      id: 'sec-03-go-example',
      type: 'code-example',
      codeExample: {
        id: 'code-03-go',
        filename: 'main.go',
        language: 'go',
        title: 'Go: Middleware Otorisasi dengan JWT Claims',
        code: `package main

import (
	"context"
	"net/http"
	"strings"

	"github.com/golang-jwt/jwt/v5"
)

type ctxKey string

const userCtxKey ctxKey = "user"

type UserClaims struct {
	ID    uint     \`json:"id"\`
	Role  string   \`json:"role"\`
	Perms []string \`json:"perms"\`
	jwt.RegisteredClaims
}

func requirePermission(perm string) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			claims, ok := r.Context().Value(userCtxKey).(*UserClaims)
			if !ok {
				http.Error(w, "unauthorized", http.StatusUnauthorized)
				return
			}
			for _, p := range claims.Perms {
				if p == perm {
					next.ServeHTTP(w, r)
					return
				}
			}
			http.Error(w, "forbidden", http.StatusForbidden)
		})
	}
}

func authMiddleware(secret []byte) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			tokenString := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
			token, err := jwt.ParseWithClaims(tokenString, &UserClaims{}, func(t *jwt.Token) (interface{}, error) {
				return secret, nil
			})
			if err != nil || !token.Valid {
				http.Error(w, "unauthorized", http.StatusUnauthorized)
				return
			}
			ctx := context.WithValue(r.Context(), userCtxKey, token.Claims.(*UserClaims))
			next.ServeHTTP(w, r.WithContext(ctx))
		})
	}
}`,
        explanation:
          'Middleware Go mengekstrak claims JWT dan menyimpannya di context. requirePermission memeriksa apakah pengguna memiliki permission spesifik sebelum menjalankan handler.',
      },
    },
    {
      id: 'sec-03-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Kesimpulan:** Mulai dari RBAC sederhana, tambahkan ownership check untuk resource pribadi, lalu pertimbangkan ABAC atau ReBAC untuk aturan yang lebih halus. Row-level security di database menambah lapisan pertahanan bahkan jika kode aplikasi memiliki bug.',
    },
  ],
}
