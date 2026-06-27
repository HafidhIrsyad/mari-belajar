import type { Lesson } from '@/content/types'

export const ch05Lesson: Lesson = {
  id: 'lesson-ch-05-advanced-typescript-di-frontend',
  estimatedMinutes: 45,
  sections: [
    {
      id: 'sec-05-basic',
      type: 'markdown',
      level: 'basic',
      title: 'Typed Props, Event Handlers, dan Generic Components',
      content: `## TypeScript di React

TypeScript memberikan keamanan tipe saat membangun komponen React. Tiga area dasar yang sering dikerjakan:

1. **Typed props**: mendefinisikan shape props dengan interface atau type alias.
2. **Event handlers**: menggunakan tipe event yang benar seperti \`React.MouseEvent\` dan \`React.ChangeEvent\`.
3. **Generic components**: komponen yang menerima tipe generik sehingga dapat digunakan kembali dengan berbagai data.

## Generic Components

Generic components memungkinkan kita membuat komponen seperti \`List<T>\` atau \`Table<T>\` yang bekerja dengan tipe data apa pun namun tetap type-safe.

\`\`\`tsx
function List<T>({ items, renderItem }: { items: T[]; renderItem: (item: T) => React.ReactNode }) {
  return <ul>{items.map(renderItem)}</ul>
}
\`\`\`

Dengan generic, TypeScript dapat menyimpulkan tipe item dan memastikan \`renderItem\` menerima argumen yang benar.

## Event Handler Types

- \`React.MouseEvent<HTMLButtonElement>\` untuk klik tombol.
- \`React.ChangeEvent<HTMLInputElement>\` untuk input.
- \`React.FormEvent<HTMLFormElement>\` untuk submit form.

Menggunakan tipe yang spesifik membantu mengakses properti target yang benar.`,
    },
    {
      id: 'sec-05-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-05-js',
        filename: 'GenericList.jsx',
        language: 'javascript',
        title: 'JavaScript: Komponen List Generik Tanpa Tipe',
        code: `function List({ items, renderItem, keyExtractor }) {
  return (
    <ul className="divide-y">
      {items.map((item) => (
        <li key={keyExtractor(item)}>{renderItem(item)}</li>
      ))}
    </ul>
  )
}

function UserList() {
  const users = [
    { id: 'u1', name: 'Andi' },
    { id: 'u2', name: 'Budi' },
  ]

  return (
    <List
      items={users}
      keyExtractor={(user) => user.id}
      renderItem={(user) => <span>{user.name}</span>}
    />
  )
}

export default UserList`,
        explanation:
          'Tanpa TypeScript, komponen List masih berfungsi tetapi tidak ada jaminan bahwa keyExtractor dan renderItem menerima objek dengan properti yang benar.',
      },
    },
    {
      id: 'sec-05-intermediate',
      type: 'markdown',
      level: 'intermediate',
      title: 'Polymorphic Components dan Type-Safe Context',
      content: `## Polymorphic Components

Polymorphic component adalah komponen yang dapat merender sebagai elemen HTML berbeda melalui prop \`as\` atau \`asChild\`. Contoh klasik:

\`\`\`tsx
<Box as="button" onClick={...}>Klik</Box>
<Box as="a" href="/home">Beranda</Box>
\`\`\`

Tantangan TypeScript:

- Prop yang valid bergantung pada elemen target.
- Ref forwarding harus kompatibel dengan elemen target.
- Konflik prop (misalnya \`href\` hanya untuk \`a\`) harus ditangani.

Solusi umum menggunakan conditional types dan \`React.ComponentPropsWithRef\`.

## Type-Safe Context

Context React secara default memiliki nilai awal. Jika kita menggunakan \`createContext<T>(null!)\`, kita kehilangan keamanan tipe. Pola yang lebih aman:

1. Buat context tanpa nilai default.
2. Buat custom hook yang melempar error jika digunakan di luar Provider.
3. Ekspor Provider dan hook, bukan context mentah.

Pola ini memastikan konsumen selalu berada dalam Provider dan mendapatkan tipe yang benar.`,
    },
    {
      id: 'sec-05-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-05-ts',
        filename: 'PolymorphicBox.tsx',
        language: 'typescript',
        title: 'TypeScript: Polymorphic Component dengan as Prop',
        code: `import { type ElementType, type ComponentPropsWithRef, forwardRef } from 'react'

type PolymorphicProps<T extends ElementType> = {
  as?: T
  children?: React.ReactNode
} & Omit<ComponentPropsWithRef<T>, 'as' | 'children'>

const Box = forwardRef<HTMLElement, PolymorphicProps<ElementType>>(
  ({ as: Component = 'div', children, ...props }, ref) => {
    return (
      <Component ref={ref} {...props}>
        {children}
      </Component>
    )
  }
)

Box.displayName = 'Box'

// Penggunaan:
// <Box as="a" href="/home" className="link">Beranda</Box>
// <Box as="button" type="button" onClick={handleClick}>Klik</Box>

export { Box }`,
        explanation:
          'Polymorphic Box menggunakan generic ElementType dan ComponentPropsWithRef untuk menyebarkan prop yang valid ke elemen target. forwardRef memastikan ref forwarding tetap type-safe.',
      },
    },
    {
      id: 'sec-05-advanced',
      type: 'markdown',
      level: 'advanced',
      title: 'Type-Safe Routing, API Contracts, dan Discriminated Unions',
      content: `## Type-Safe Routing

Dengan TypeScript, kita dapat membuat route parameter yang divalidasi di type level. Pola umum:

- Definisikan semua route path sebagai union literal.
- Gunakan generic untuk mengekstrak parameter dari path.
- Integrasikan dengan router library melalui wrapper types.

\`\`\`ts
type RoutePath = '/users' | '/users/:id' | '/posts/:postId/comments'
\`\`\`

Meskipun type-level routing tidak menggantikan runtime validation, ia membantu IDE memberikan autocomplete dan menangkap kesalahan penggunaan parameter.

## API Contracts

Mendefinisikan contract API sebagai tipe bersama antara frontend dan backend (atau mock) mengurangi bug integrasi. Praktiknya:

- Gunakan schema validation seperti Zod untuk runtime safety.
- Derive TypeScript types dari schema Zod.
- Tempatkan contract di package shared agar frontend dan backend konsisten.

## Discriminated Unions untuk UI State

Discriminated union adalah union type dengan properti literal (tag) yang memungkinkan TypeScript men narrow tipe secara otomatis. Sangat cocok untuk state kompleks seperti form submission, async data, atau wizard.

\`\`\`ts
type AsyncState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error }
\`\`\`

Dengan discriminated union, kita tidak perlu lagi memeriksa \`data != null\` secara defensif karena TypeScript tahu \`data\` hanya ada saat \`status === 'success'\`.`,
    },
    {
      id: 'sec-05-go-example',
      type: 'code-example',
      codeExample: {
        id: 'code-05-go',
        filename: 'generic_comparison.go',
        language: 'go',
        title: 'Go: Generic Filter untuk Perbandingan dengan TypeScript',
        code: `package main

import "fmt"

func Filter[T any](items []T, predicate func(T) bool) []T {
	result := make([]T, 0, len(items))
	for _, item := range items {
		if predicate(item) {
			result = append(result, item)
		}
	}
	return result
}

type User struct {
	Name string
	Age  int
}

func main() {
	users := []User{
		{Name: "Andi", Age: 25},
		{Name: "Budi", Age: 17},
	}

	adults := Filter(users, func(u User) bool {
		return u.Age >= 18
	})

	fmt.Printf("Adults: %+v\n", adults)
}`,
        explanation:
          'Go generics (sejak Go 1.18) memungkinkan fungsi filter yang bekerja untuk tipe apa pun, mirip dengan generic components di TypeScript.',
      },
    },
    {
      id: 'sec-05-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Key insight:** Gunakan generic components untuk reuse logic tanpa kehilangan type safety. Polymorphic components kuat tetapi kompleks; pertimbangkan `asChild` pattern untuk menghindari konflik prop. Selalu buat context type-safe dan gunakan discriminated unions untuk state yang memiliki beberapa fase.',
    },
  ],
}
