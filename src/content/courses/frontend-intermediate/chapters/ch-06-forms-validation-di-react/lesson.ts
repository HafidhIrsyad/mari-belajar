import type { Lesson } from '@/content/types'

export const ch06Lesson: Lesson = {
  id: 'lesson-ch-06-forms-validation-di-react',
  estimatedMinutes: 40,
  sections: [
    {
      id: 'sec-06-basic-forms',
      type: 'markdown',
      level: 'basic',
      title: 'Controlled vs Uncontrolled Inputs',
      content: `## Controlled Input

Pada controlled input, nilai input disimpan di state React dan diperbarui melalui \`onChange\`. Ini memberikan kendali penuh atas data form.

\`\`\`jsx
const [email, setEmail] = useState('')

<input
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
\`\`\`

## Uncontrolled Input

Uncontrolled input membiarkan DOM mengelola nilainya. React membaca nilai melalui ref saat dibutuhkan, misalnya saat submit.

\`\`\`jsx
const inputRef = useRef(null)

<input ref={inputRef} />

function handleSubmit() {
  console.log(inputRef.current.value)
}
\`\`\`

## Perbandingan

| Aspek | Controlled | Uncontrolled |
|-------|-----------|--------------|
| Nilai | State React | DOM |
| Validasi real-time | Mudah | Perlu event listener |
| Re-render | Setiap perubahan input | Minimal |
| Kasus cocok | Form kompleks, validasi langsung | Form sederhana, performa kritis |`,
    },
    {
      id: 'sec-06-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-06-js',
        filename: 'SimpleForm.jsx',
        language: 'javascript',
        title: 'JavaScript: Controlled Form dengan Validasi Manual',
        code: `import { useState } from 'react'

export function SimpleForm() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!email.includes('@')) {
      setError('Email tidak valid')
      return
    }
    setError('')
    console.log('Submit:', email)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Kirim</button>
    </form>
  )
}`,
        explanation:
          'Setiap perubahan input memicu setEmail dan re-render. Untuk form besar, pola ini bisa menyebabkan banyak re-render yang tidak perlu.',
      },
    },
    {
      id: 'sec-06-intermediate-rhf',
      type: 'markdown',
      level: 'intermediate',
      title: 'React Hook Form dan Zod',
      content: `## React Hook Form (RHF)

RHF meminimalkan re-render dengan menggunakan uncontrolled inputs dan ref. Form state tetap dikelola oleh RHF, tetapi perubahan input tidak memicu render kecuali diperlukan.

\`\`\`jsx
import { useForm } from 'react-hook-form'

const { register, handleSubmit, formState: { errors } } = useForm()

function onSubmit(data) {
  console.log(data)
}

<input {...register('email')} />
\`\`\`

Fungsi \`register\` menghubungkan input ke RHF melalui ref dan event handler.

## Zod

Zod adalah library schema validation yang memiliki TypeScript inference. Schema Zod dapat langsung digunakan untuk memvalidasi objek JavaScript.

\`\`\`jsx
import { z } from 'zod'

const schema = z.object({
  email: z.string().email(),
  age: z.number().min(18),
})
\`\`\`

## Resolver

Resolver adalah jembatan antara RHF dan library validasi seperti Zod. Resolver menerima data form, menjalankan validasi, dan mengembalikan hasil dalam format yang dipahami RHF.`,
    },
    {
      id: 'sec-06-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-06-ts',
        filename: 'SignupForm.tsx',
        language: 'typescript',
        title: 'TypeScript: RHF dengan Zod Resolver',
        code: `import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const signupSchema = z.object({
  name: z.string().min(2, 'Nama minimal 2 karakter'),
  email: z.string().email('Email tidak valid'),
  password: z.string().min(8, 'Password minimal 8 karakter'),
})

type SignupInput = z.infer<typeof signupSchema>

export function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
  })

  const onSubmit = (data: SignupInput) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} placeholder="Nama" />
      {errors.name && <span>{errors.name.message}</span>}

      <input {...register('email')} placeholder="Email" />
      {errors.email && <span>{errors.email.message}</span>}

      <input type="password" {...register('password')} placeholder="Password" />
      {errors.password && <span>{errors.password.message}</span>}

      <button type="submit" disabled={isSubmitting}>
        Daftar
      </button>
    </form>
  )
}`,
        explanation:
          'zodResolver menerjemahkan schema Zod ke format RHF. Type inference dari z.infer memastikan tipe data form sinkron dengan schema validasi.',
      },
    },
    {
      id: 'sec-06-advanced-resolver',
      type: 'markdown',
      level: 'advanced',
      title: 'Resolver Internals dan Field Arrays',
      content: `## Bagaimana Resolver Bekerja

Resolver adalah fungsi dengan signature:

\`\`\`ts
(values: T, context: object, options: ResolverOptions) => Promise<ResolverResult<T>>
\`\`\`

Resolver menerima nilai form, menjalankan validasi schema, lalu mengembalikan:

- \`values\`: data yang sudah tervalidasi jika berhasil.
- \`errors\`: objek error yang cocok dengan struktur field form.

\`@hookform/resolvers/zod\` mengubah error Zod menjadi format RHF dengan path ke field yang bermasalah.

## Field Arrays

Field arrays memungkinkan form memiliki jumlah field yang dinamis, seperti daftar alamat atau item pesanan.

\`\`\`jsx
const { control, register } = useForm()
const { fields, append, remove } = useFieldArray({
  control,
  name: 'items',
})

fields.map((field, index) => (
  <input key={field.id} {...register(\`items.\${index}.name\`)} />
))
\`\`\`

Setiap field array memiliki \`id\` unik yang digunakan sebagai key agar React dapat melacak perubahan urutan.

## Performa RHF

RHF mengelola form state di dalam ref dan hanya merender saat:

- Field di-mount atau unmount.
- Validasi error berubah.
- Form disubmit.
- State form yang dipantau berubah.

Ini berbeda dengan controlled form yang merender pada setiap keystroke.`,
    },
    {
      id: 'sec-06-go-example',
      type: 'code-example',
      codeExample: {
        id: 'code-06-go',
        filename: 'resolver.go',
        language: 'go',
        title: 'Go: Konsep Resolver Validasi dengan Struct Tag',
        code: `package main

import (
	"fmt"
	"reflect"
	"strings"
)

type SignupInput struct {
	Name     string \`validate:"min=2"\`
	Email    string \`validate:"email"\`
	Password string \`validate:"min=8"\`
}

func validate(input interface{}) map[string]string {
	errors := make(map[string]string)
	t := reflect.TypeOf(input)
	v := reflect.ValueOf(input)

	for i := 0; i < t.NumField(); i++ {
		field := t.Field(i)
		value := v.Field(i).String()
		tag := field.Tag.Get("validate")

		if strings.HasPrefix(tag, "min=") {
			var min int
			fmt.Sscanf(tag, "min=%d", &min)
			if len(value) < min {
				errors[field.Name] = fmt.Sprintf("%s minimal %d karakter", field.Name, min)
			}
		}
		if tag == "email" && !strings.Contains(value, "@") {
			errors[field.Name] = "Email tidak valid"
		}
	}
	return errors
}

func main() {
	input := SignupInput{Name: "A", Email: "bademail", Password: "123"}
	errs := validate(input)
	for k, v := range errs {
		fmt.Printf("%s: %s\\n", k, v)
	}
}`,
        explanation:
          'Go ini mensimulasikan resolver validasi: membaca struct tag, memeriksa nilai, dan mengembalikan map error berdasarkan nama field. Konsep ini mirip dengan cara RHF resolver menghubungkan error ke field.',
      },
    },
    {
      id: 'sec-06-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Kesalahan umum:** membuat seluruh form controlled tanpa pertimbangan performa. Gunakan React Hook Form untuk form kompleks agar re-render minimal, dan validasi dengan Zod agar type safety dan aturan bisnis tetap konsisten.',
    },
  ],
}
