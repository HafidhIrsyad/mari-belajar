import type { Lesson } from '@/content/types'

export const ch04Lesson: Lesson = {
  id: 'lesson-ch-04-typescript-utility-types-type-guards',
  estimatedMinutes: 45,
  sections: [
    {
      id: 'sec-04-basic-utility',
      type: 'markdown',
      level: 'basic',
      title: 'Utility Types Dasar',
      content: `## Transformasi Tipe dengan Utility Types

TypeScript menyediakan utility types untuk membuat variasi tipe tanpa menulis ulang interface.

- \`Partial<T>\`: membuat semua property menjadi opsional.
- \`Required<T>\`: membuat semua property menjadi wajib.
- \`Readonly<T>\`: membuat semua property menjadi readonly.
- \`Record<K, T>\`: membuat tipe object dengan key K dan value T.
- \`Pick<T, K>\`: mengambil subset property dari T.
- \`Omit<T, K>\`: menghilangkan subset property dari T.

\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
}

type UserUpdate = Partial<User>;
// { id?: number; name?: string; email?: string }

type UserPublic = Pick<User, 'id' | 'name'>;
// { id: number; name: string }

type UserWithoutEmail = Omit<User, 'email'>;
// { id: number; name: string }
\`\`\`

## Kapan Menggunakan?

Gunakan \`Partial\` untuk payload update, \`Pick\` untuk DTO response, dan \`Record\` untuk mapping key-value seperti cache atau dictionary.`,
    },
    {
      id: 'sec-04-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-04-js',
        filename: 'transform.js',
        language: 'javascript',
        title: 'JavaScript: Transformasi Object Secara Manual',
        code: `const user = {
  id: 1,
  name: 'Budi',
  email: 'budi@example.com',
  password: 'secret',
};

// Manual Pick
function pickPublic(user) {
  return {
    id: user.id,
    name: user.name,
  };
}

// Manual Omit
function omitPassword(user) {
  const { password, ...rest } = user;
  return rest;
}

// Manual Partial untuk update
function updateUser(user, changes) {
  return { ...user, ...changes };
}

console.log(pickPublic(user));
console.log(omitPassword(user));
console.log(updateUser(user, { name: 'Budi Santoso' }));`,
        explanation:
          'Di JavaScript kita melakukan transformasi object secara manual dengan destructuring dan spread. TypeScript utility types memberikan jaminan tipe pada transformasi serupa.',
      },
    },
    {
      id: 'sec-04-intermediate-utility',
      type: 'markdown',
      level: 'intermediate',
      title: 'Type Guards dan Utility Types Lanjutan',
      content: `## Type Guards

Type guard adalah teknik runtime untuk mempersempit tipe. TypeScript mengenali beberapa pola:

- \`typeof x === 'string'\` untuk tipe primitif.
- \`x instanceof Date\` untuk instance class.
- \`'property' in x\` untuk memeriksa keberadaan property pada object.

\`\`\`typescript
function process(input: string | number) {
  if (typeof input === 'string') {
    return input.toUpperCase();
  }
  return input.toFixed(2);
}
\`\`\`

## Utility Types Lanjutan

- \`ReturnType<T>\`: mengekstrak tipe return dari function type.
- \`Parameters<T>\`: mengekstrak tuple parameter dari function type.
- \`Exclude<T, U>\`: menghilangkan tipe U dari T.
- \`Extract<T, U>\`: mengambil hanya tipe yang bisa diassign ke U.
- \`NonNullable<T>\`: menghilangkan \`null\` dan \`undefined\` dari T.

\`\`\`typescript
type ID = string | number | null;
type ValidID = NonNullable<ID>; // string | number

type Status = 'loading' | 'success' | 'error';
type ErrorStatus = Exclude<Status, 'loading' | 'success'>; // 'error'
\`\`\`

Type guards dan utility types sering dipadukan untuk membangun fungsi yang aman dan ekspresif.`,
    },
    {
      id: 'sec-04-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-04-ts',
        filename: 'apiTypes.ts',
        language: 'typescript',
        title: 'TypeScript: Generic CRUD Type Helper',
        code: `interface ApiResponse<T> {
  data: T;
  meta: { page: number; total: number };
}

interface CreateDto<T> {
  payload: Omit<T, 'id'>;
}

interface UpdateDto<T> {
  id: T extends { id: infer I } ? I : never;
  payload: Partial<Omit<T, 'id'>>;
}

type Entity = { id: number; name: string; email: string };

type CreateUser = CreateDto<Entity>;
// { payload: { name: string; email: string } }

type UpdateUser = UpdateDto<Entity>;
// { id: number; payload: Partial<{ name: string; email: string }> }

function isApiError(response: unknown): response is { error: string } {
  return (
    typeof response === 'object' &&
    response !== null &&
    'error' in response &&
    typeof (response as { error: string }).error === 'string'
  );
}

const result: unknown = fetchData();
if (isApiError(result)) {
  console.error(result.error);
}

function fetchData(): unknown {
  return { error: 'Network failed' };
}`,
        explanation:
          'Omit dan Partial membuat DTO yang sesuai dengan operasi CRUD. infer menarik tipe id dari entity. Type guard isApiError mempersempit unknown ke bentuk error yang spesifik.',
      },
    },
    {
      id: 'sec-04-advanced-utility',
      type: 'markdown',
      level: 'advanced',
      title: 'Mapped Types, Conditional Types, infer, dan Template Literal Types',
      content: `## Mapped Types

Mapped types membuat tipe baru dengan mengiterasi key dari tipe lain. Sangat berguna untuk membuat tipe readonly, optional, atau nullable secara otomatis.

\`\`\`typescript
type Nullable<T> = { [K in keyof T]: T[K] | null };
\`\`\`

\`keyof T\` menghasilkan union key, dan \`T[K]\` adalah tipe value untuk key K.

## Conditional Types

Conditional types memilih tipe berdasarkan kondisi:

\`\`\`typescript
type IsString<T> = T extends string ? true : false;
\`\`\`

Ketika diterapkan pada union, conditional type didistribusikan ke setiap anggota union (distributive conditional type).

## infer

\`infer\` digunakan di dalam conditional type untuk menarik tipe dari posisi tertentu, misalnya tipe return Promise.

\`\`\`typescript
type Awaited<T> = T extends Promise<infer U> ? U : T;
\`\`\`

## Template Literal Types

Template literal types membatasan string berdasarkan pola:

\`\`\`typescript
type EventName<T extends string> = \`on\${Capitalize<T>}\`;
type ClickEvent = EventName<'click'>; // 'onClick'
\`\`\`

## Type-Safe API Layer

Dengan kombinasi utility types, kita bisa membuat API client yang menolak parameter atau response yang tidak sesuai schema. Ini mengurangi bug integrasi antara frontend dan backend.`,
    },
    {
      id: 'sec-04-go-example',
      type: 'code-example',
      codeExample: {
        id: 'code-04-go',
        filename: 'generics.go',
        language: 'go',
        title: 'Go: Generics untuk Type Helper Serupa',
        code: `package main

import "fmt"

// Go 1.18+ mendukung generics untuk batasan tipe.

type Identifiable interface {
	GetID() int
}

type Entity[T any] struct {
	ID   int
	Data T
}

func (e Entity[T]) GetID() int { return e.ID }

type WithoutID[T Identifiable] struct {
	Data T
}

func main() {
	user := Entity[string]{ID: 1, Data: "Budi"}
	fmt.Println(user.GetID())
}`,
        explanation:
          'Go generics memungkinkan pembatasan tipe dengan interface, meskipun tidak setara dengan mapped types TypeScript. Konsep type constraint mirip dengan generic constraints di TypeScript.',
      },
    },
    {
      id: 'sec-04-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Kesimpulan:** Utility types, type guards, mapped types, conditional types, infer, dan template literal types adalah fondasi type-level programming TypeScript. Gunakan untuk membangun API layer yang type-safe tanpa duplikasi.',
    },
  ],
}
