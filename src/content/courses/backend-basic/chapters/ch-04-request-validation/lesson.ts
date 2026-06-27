import type { Lesson } from '@/content/types'

export const ch04Lesson: Lesson = {
  id: 'lesson-ch-04-request-validation',
  estimatedMinutes: 30,
  sections: [
    {
      id: 'sec-04-basic-manual',
      type: 'markdown',
      level: 'basic',
      title: 'Validasi Manual dan Type Coercion',
      content: `## Validasi Manual

Pada tahap awal atau proyek kecil, validasi dapat dilakukan dengan pengecekan manual di dalam handler. Meski sederhana, pendekatan ini cepat menjadi rumit ketika aturan bertambah.

Contoh validasi manual:

- Pastikan field wajib ada.
- Pastikan tipe data sesuai.
- Batasi panjang string atau rentang number.
- Berikan pesan error yang spesifik.

## Type Coercion

Data yang masuk dari HTTP selalu berbentuk string di query dan form, serta JSON di body. Oleh karena itu, kita perlu mengubah string menjadi tipe yang diharapkan:

- \`Number(req.query.page)\` untuk angka.
- \`Boolean(req.query.active === 'true')\` untuk boolean.
- \`new Date(req.body.date)\` untuk datetime.

Tanpa coercion, perbandingan seperti \`age > 18\` bisa menghasilkan hasil yang tidak terduga karena JavaScript akan membandingkan string.

## Kapan Validasi Manual Cukup?

Validasi manual cukup untuk skenario sederhana dengan sedikit field. Jika aplikasi berkembang, sebaiknya beralih ke schema-based validation agar aturan terpusat dan dapat digunakan ulang.`,
    },
    {
      id: 'sec-04-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-04-js',
        filename: 'manual-validation.js',
        language: 'javascript',
        title: 'JavaScript: Validasi Manual pada Express',
        code: `function validateCreateUser(body) {
  const errors = []

  if (!body.name || typeof body.name !== 'string') {
    errors.push({ field: 'name', message: 'name is required and must be a string' })
  } else if (body.name.length < 3 || body.name.length > 100) {
    errors.push({ field: 'name', message: 'name must be between 3 and 100 characters' })
  }

  if (!body.email || typeof body.email !== 'string') {
    errors.push({ field: 'email', message: 'email is required' })
  } else if (!body.email.includes('@')) {
    errors.push({ field: 'email', message: 'email must be a valid email address' })
  }

  if (body.age !== undefined) {
    const age = Number(body.age)
    if (!Number.isFinite(age) || age < 0 || age > 150) {
      errors.push({ field: 'age', message: 'age must be a number between 0 and 150' })
    }
  }

  return errors
}

app.post('/users', (req, res) => {
  const errors = validateCreateUser(req.body)
  if (errors.length > 0) {
    return res.status(400).json({ errors })
  }
  res.status(201).json({ data: req.body })
})`,
        explanation:
          'Validasi manual memberikan kendali penuh, tetapi rentan terhadap duplikasi kode dan mudah terlewat saat field bertambah.',
      },
    },
    {
      id: 'sec-04-intermediate-schema',
      type: 'markdown',
      level: 'intermediate',
      title: 'Schema Validation dan Error Formatting',
      content: `## Schema-Based Validation

Library seperti Zod, Joi, dan Yup memungkinkan kita mendefinisikan aturan validasi secara deklaratif. Keuntungannya:

- **Single source of truth**: aturan validasi berada di satu tempat.
- **Reusable**: schema yang sama dapat dipakai di frontend dan backend.
- **Type inference**: Zod dapat menghasilkan tipe TypeScript dari schema.
- **Error detail**: library menghasilkan daftar error yang terstruktur.

## Error Formatting

Error yang baik tidak hanya mengatakan "Bad Request". Format yang direkomendasikan:

\`\`\`json
{
  "errors": [
    {
      "field": "email",
      "message": "email must be a valid email address",
      "code": "invalid_email"
    },
    {
      "field": "age",
      "message": "age must be greater than or equal to 18",
      "code": "too_small"
    }
  ]
}
\`\`\`

Dengan format ini, frontend dapat memetakan error ke field formulir masing-masing.

## Cross-Field Validation

Aturan yang melibatkan lebih dari satu field, seperti \`password\` harus sama dengan \`confirmPassword\`, tidak dapat diwakili oleh validator single-field. Solusinya adalah custom validation atau schema refinement:

\`\`\`typescript
const schema = z.object({
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})
\`\`\`

Custom validator memastikan aturan bisnis spesifik tetap berada di dalam schema.`,
    },
    {
      id: 'sec-04-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-04-ts',
        filename: 'users.schema.ts',
        language: 'typescript',
        title: 'TypeScript: Zod Schema dengan Type Inference',
        code: `import { z } from 'zod'

export const createUserSchema = z
  .object({
    name: z.string().min(3).max(100),
    email: z.string().email(),
    age: z.coerce.number().int().min(0).max(150).optional(),
    role: z.enum(['admin', 'user']).default('user'),
  })
  .strict()

export type CreateUserDto = z.infer<typeof createUserSchema>

// Usage in controller
function createUserHandler(req: Request, res: Response) {
  const parseResult = createUserSchema.safeParse(req.body)
  if (!parseResult.success) {
    const errors = parseResult.error.issues.map((issue) => ({
      field: issue.path.join('.'),
      message: issue.message,
      code: issue.code,
    }))
    return res.status(400).json({ errors })
  }

  const user: CreateUserDto = parseResult.data
  res.status(201).json({ data: user })
}`,
        explanation:
          'Zod menyediakan type inference melalui z.infer, sehingga DTO otomatis sinkron dengan schema. safeParse menghasilkan hasil tanpa melempar exception.',
      },
    },
    {
      id: 'sec-04-advanced-pipes',
      type: 'markdown',
      level: 'advanced',
      title: 'Validation Pipes dan Custom Validators',
      content: `## Validation Pipes

Framework seperti NestJS menyediakan ValidationPipe yang mengintegrasikan class-validator ke dalam siklus request. Dengan decorator, kita dapat menandai DTO:

\`\`\`typescript
class CreateUserDto {
  @IsString()
  @MinLength(3)
  name: string

  @IsEmail()
  email: string

  @IsOptional()
  @IsInt()
  @Min(0)
  age?: number
}
\`\`\`

ValidationPipe secara otomatis menolak request yang tidak valid dan mengembalikan response 400 dengan daftar error.

## Custom Validators

Ketika library bawaan tidak mencukupi, kita dapat membuat decorator khusus. Contoh validator untuk memastikan password mengandung huruf besar, angka, dan simbol:

\`\`\`typescript
@ValidatorConstraint({ async: false })
class IsStrongPasswordConstraint implements ValidatorConstraintInterface {
  validate(password: string) {
    return /^(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*]).{8,}$/.test(password)
  }

  defaultMessage() {
    return 'Password must contain uppercase, number, and special character'
  }
}
\`\`\`

Decorator ini dapat dipasang pada field DTO seperti \`@IsStrongPassword()\`.

## Validasi di Lapisan Berbeda

Validasi sebaiknya dilakukan di batas terluar sistem:

- **Transport layer**: memastikan format, tipe, dan constraint dasar.
- **Domain layer**: memastikan invariant bisnis.
- **Database layer**: memastikan constraint seperti unique dan foreign key.

Jangan mengandalkan satu lapisan saja. Setiap lapisan memiliki tanggung jawab berbeda.

## Security Consideration

OWASP menekankan validasi dengan **whitelist** (hanya izinkan input yang dikenal) daripada **blacklist** (melarang pola tertentu). Selain validasi input, lakukan sanitasi output saat data ditampilkan atau dimasukkan ke query/template.`,
    },
    {
      id: 'sec-04-go-example',
      type: 'code-example',
      codeExample: {
        id: 'code-04-go',
        filename: 'main.go',
        language: 'go',
        title: 'Go: Validasi dengan go-playground/validator',
        code: `package main

import (
	"fmt"
	"github.com/go-playground/validator/v10"
)

type CreateUserRequest struct {
	Name  string \`json:"name" validate:"required,min=3,max=100"\`
	Email string \`json:"email" validate:"required,email"\`
	Age   int    \`json:"age" validate:"gte=0,lte=150"\`
	Role  string \`json:"role" validate:"oneof=admin user"\`
}

func main() {
	validate := validator.New()

	req := CreateUserRequest{
		Name:  "An",
		Email: "not-an-email",
		Age:   200,
		Role:  "superuser",
	}

	if err := validate.Struct(req); err != nil {
		for _, e := range err.(validator.ValidationErrors) {
			fmt.Printf("Field %s failed %s\\n", e.Field(), e.Tag())
		}
	}
}`,
        explanation:
          'go-playground/validator membaca tag struct untuk validasi. Error menyebutkan field dan tag yang gagal, sehingga mudah dipetakan ke respons API.',
      },
    },
    {
      id: 'sec-04-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Kesimpulan:** Validasi input bukan hanya soal menolak data salah, tetapi melindungi integritas sistem. Mulai dari validasi manual untuk proyek kecil, beralih ke schema-based validation untuk skala, dan tambahkan custom validators serta validation pipes untuk aturan bisnis yang spesifik.',
    },
  ],
}
