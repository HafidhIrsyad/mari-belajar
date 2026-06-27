import type { Lesson } from '@/content/types'

export const ch06Lesson: Lesson = {
  id: 'lesson-ch-06-json-validation',
  estimatedMinutes: 40,
  sections: [
    {
      id: 'sec-06-basic-json',
      type: 'markdown',
      level: 'basic',
      title: 'encoding/json Dasar',
      content: `## Marshal dan Unmarshal

Package "encoding/json" menyediakan fungsi untuk mengubah struct Go menjadi JSON dan sebaliknya:

\`\`\`go
json.Marshal(v)       // any -> []byte JSON
json.Unmarshal(data, &v) // []byte JSON -> struct
\`\`\`

## Struct Tags

Struct tag mengontrol bagaimana field dipetakan ke JSON:

\`\`\`go
type User struct {
  ID        int       \`json:"id"\`
  Name      string    \`json:"name"\`
  Email     string    \`json:"email"\`
  CreatedAt time.Time \`json:"created_at"\`
}
\`\`\`

## omitempty

Tag "omitempty" menyebabkan field diabaikan saat serialisasi jika nilainya nol:

\`\`\`go
type Product struct {
  Name  string  \`json:"name"\`
  Price float64 \`json:"price,omitempty"\`
}
\`\`\`

## Pointer untuk Optional Field

Jika field bertipe pointer, "nil" berarti tidak di-set, bukan nilai nol. Ini berguna untuk PATCH request atau partial update.

\`\`\`go
type UpdateUser struct {
  Name  *string \`json:"name"\`
  Email *string \`json:"email"\`
}
\`\`\``,
    },
    {
      id: 'sec-06-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-06-js',
        filename: 'json-parse.js',
        language: 'javascript',
        code: `const raw = '{"id":1,"name":"Budi","email":"budi@example.com","roles":["admin","user"]}';

const user = JSON.parse(raw);
console.log(user.name);

user.email = 'budi@work.com';
const updated = JSON.stringify(user, null, 2);
console.log(updated);`,
        title: 'JavaScript: Parsing dan Serialisasi JSON',
        explanation:
          'JavaScript memiliki JSON.parse dan JSON.stringify untuk konversi JSON. Di Go, kita menggunakan encoding/json dengan struct tags.',
      },
    },
    {
      id: 'sec-06-intermediate-custom-marshal',
      type: 'markdown',
      level: 'intermediate',
      title: 'Custom Marshaling dan Parsing Waktu',
      content: `## Custom MarshalJSON / UnmarshalJSON

Kadang kita ingin mengubah representasi JSON tanpa mengubah struct internal. Caranya dengan mengimplementasikan interface json.Marshaler atau json.Unmarshaler.

\`\`\`go
func (u User) MarshalJSON() ([]byte, error) {
  type Alias User
  return json.Marshal(&struct {
    *Alias
    CreatedAt string \`json:"created_at"\`
  }{
    Alias:     (*Alias)(&u),
    CreatedAt: u.CreatedAt.Format("2006-01-02"),
  })
}
\`\`\`

Teknik di atas menggunakan alias untuk menghindari rekursi infinite.

## Parsing Waktu

JSON tidak memiliki tipe waktu, sehingga waktu biasanya direpresentasikan sebagai string. Go dapat parse string tersebut ke time.Time menggunakan layout referensi:

\`\`\`go
t, err := time.Parse(time.RFC3339, "2026-06-27T10:00:00Z")
\`\`\`

## RawMessage

"json.RawMessage" memungkinkan kita menunda parsing bagian JSON. Berguna untuk API yang memiliki field dinamis.

\`\`\`go
type Envelope struct {
  Type string          \`json:"type"\`
  Data json.RawMessage \`json:"data"\`
}
\`\`\``,
    },
    {
      id: 'sec-06-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-06-ts',
        filename: 'zod-validation.ts',
        language: 'typescript',
        title: 'TypeScript: Validasi dengan Zod',
        code: `import { z } from 'zod';

const userSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1),
  email: z.string().email(),
  age: z.number().int().min(0).optional(),
});

type User = z.infer<typeof userSchema>;

const input = {
  id: 1,
  name: 'Budi',
  email: 'budi@example.com',
  age: 25,
};

const parsed = userSchema.safeParse(input);
if (!parsed.success) {
  console.error(parsed.error.format());
} else {
  console.log(parsed.data);
}`,
        explanation:
          'Zod adalah library validasi schema TypeScript populer. Di Go, validasi serupa dapat dilakukan dengan go-playground/validator menggunakan struct tags.',
      },
    },
    {
      id: 'sec-06-advanced-streaming-validation',
      type: 'markdown',
      level: 'advanced',
      title: 'Streaming Decoder, Reflection, dan Validator',
      content: `## Streaming Decoder

Untuk JSON besar, kita bisa menggunakan "json.Decoder" untuk membaca token demi token tanpa memuat seluruh data ke memori.

\`\`\`go
dec := json.NewDecoder(r)
dec.DisallowUnknownFields()

for dec.More() {
  var item Item
  if err := dec.Decode(&item); err != nil {
    return err
  }
  process(item)
}
\`\`\`

"DisallowUnknownFields" membuat decoder mengembalikan error jika JSON mengandung field yang tidak ada di struct. Ini membantu mendeteksi perubahan API.

## Reflection di encoding/json

Saat marshaling/unmarshaling, Go menggunakan reflection untuk membaca struct tags dan tipe field. Refleksi membuat operasi JSON lebih lambat dibandingkan serialisasi manual, tapi memberikan fleksibilitas besar. Untuk performa kritis, pertimbangkan code generation seperti easyjson atau manual encoding.

## go-playground/validator

Library validator/v10 menggunakan struct tags untuk mendefinisikan aturan validasi:

\`\`\`go
type User struct {
  Name  string \`validate:"required,min=3"\`
  Email string \`validate:"required,email"\`
  Age   int    \`validate:"gte=0,lte=120"\`
}
\`\`\`

Validator ini mendukung banyak aturan bawaan dan memungkinkan custom validator.

## Content Negotiation

Server dapat memilih format response berdasarkan header Accept. Meskipun JSON paling umum, beberapa API juga mendukung XML atau MessagePack. Middleware content negotiation membaca Accept header dan memilih encoder yang sesuai.`,
    },
    {
      id: 'sec-06-go-example',
      type: 'code-example',
      codeExample: {
        id: 'code-06-go',
        filename: 'json_validator.go',
        language: 'go',
        title: 'Go: JSON Decode dan Validasi Struct',
        code: `package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strings"

	"github.com/go-playground/validator/v10"
)

type CreateUserRequest struct {
	Name  string \`json:"name" validate:"required,min=3"\`
	Email string \`json:"email" validate:"required,email"\`
	Age   int    \`json:"age" validate:"gte=0,lte=120"\`
}

func createUserHandler(w http.ResponseWriter, r *http.Request) {
	var req CreateUserRequest
	dec := json.NewDecoder(r.Body)
	dec.DisallowUnknownFields()
	if err := dec.Decode(&req); err != nil {
		http.Error(w, "invalid JSON", http.StatusBadRequest)
		return
	}

	validate := validator.New()
	if err := validate.Struct(req); err != nil {
		var errs []string
		for _, e := range err.(validator.ValidationErrors) {
			errs = append(errs, e.Field()+" "+e.Tag())
		}
		http.Error(w, strings.Join(errs, ", "), http.StatusBadRequest)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]any{
		"message": "user created",
		"user":    req,
	})
}

func main() {
	http.HandleFunc("/users", createUserHandler)
	log.Fatal(http.ListenAndServe(":8080", nil))
}`,
        explanation:
          'Program menerima JSON, menolak field tidak dikenal, lalu memvalidasi struct dengan validator/v10. Error validasi dikumpulkan dan dikembalikan ke client.',
      },
    },
    {
      id: 'sec-06-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Ringkasan:** encoding/json adalah package standar untuk bekerja dengan JSON di Go. Struct tags mengontrol mapping dan perilaku serialisasi. Custom marshaling memberikan kontrol penuh atas representasi JSON. Decoder memungkinkan streaming parse untuk data besar. Untuk validasi, go-playground/validator menggunakan struct tags yang ekspresif. Ingat bahwa marshaling/unmarshaling bergantung pada reflection, sehingga untuk jalur kritis performa pertimbangkan optimasi manual.',
    },
  ],
}
