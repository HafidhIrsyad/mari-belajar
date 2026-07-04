import type { Lesson } from '@/content/types'

export const ch01Lesson: Lesson = {
  id: 'lesson-ch-01-advanced-type-system',
  estimatedMinutes: 45,
  sections: [
    {
      id: 'sec-01-basic-types',
      type: 'markdown',
      level: 'basic',
      title: 'Generics, Constraints, dan Default Type Parameters',
      content: `## Recap Generics

Generic adalah cara menulis kode yang bekerja untuk berbagai tipe tanpa kehilangan informasi tipe. Fungsi atau tipe generic menerima **type parameter** yang dapat ditentukan saat pemakaian.

\`\`\`typescript
function identity<T>(value: T): T {
  return value;
}

const n = identity<number>(42); // T = number
\`\`\`

## Constraints

Constraint membatasi type parameter agar hanya menerima tipe yang memiliki properti atau shape tertentu. Ini mencegah pemanggilan fungsi dengan tipe yang tidak mendukung operasi di dalamnya.

\`\`\`typescript
function logLength<T extends { length: number }>(value: T): void {
  console.log(value.length);
}

logLength('hello'); // OK
logLength([1, 2, 3]); // OK
logLength(42); // Error: number tidak memiliki length
\`\`\`

## Default Type Parameters

Type parameter bisa diberi nilai default. Jika pemanggil tidak menyediakannya, TypeScript akan menggunakan default tersebut.

\`\`\`typescript
type ApiResponse<T = unknown> = {
  data: T;
  status: number;
};

type StringResponse = ApiResponse<string>; // T = string
type UnknownResponse = ApiResponse;        // T = unknown
\`\`\`

Generics adalah fondasi dari hampir semua teknik type-level lanjutan di TypeScript.`,
    },
    {
      id: 'sec-01-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-01-js',
        filename: 'path-extractor.js',
        language: 'javascript',
        title: 'JavaScript: Ekstraksi Parameter Path di Runtime',
        code: `// Pola path: "/users/:userId/posts/:postId"
// JavaScript tidak punya type system, jadi kita validasi shape secara manual.

function extractParams(pattern, pathname) {
  const paramNames = [];
  const regexPattern = pattern.replace(/:([^/]+)/g, (_, name) => {
    paramNames.push(name);
    return '([^/]+)';
  });
  const regex = new RegExp(\`^\${regexPattern}$\`);
  const match = pathname.match(regex);
  if (!match) return null;

  const params = {};
  for (let i = 0; i < paramNames.length; i++) {
    params[paramNames[i]] = match[i + 1];
  }
  return params;
}

const result = extractParams('/users/:userId/posts/:postId', '/users/42/posts/7');
console.log(result); // { userId: "42", postId: "7" }

// Kelemahan: kesalahan nama parameter baru terdeteksi saat runtime,
// dan tipe nilai yang dikembalikan selalu string.`,
        explanation:
          'Di JavaScript, ekstraksi parameter path dilakukan dengan regex di runtime. Validasi nama parameter dan tipe hasil tidak bisa dilakukan sebelum kode dijalankan.',
      },
    },
    {
      id: 'sec-01-intermediate-types',
      type: 'markdown',
      level: 'intermediate',
      title: 'Recursive Types, Branded Types, dan Template Literal Types',
      content: `## Recursive Types

Recursive type adalah tipe yang merujuk ke dirinya sendiri. Berguna untuk merepresentasikan struktur bersarang seperti tree, JSON, atau nested routes.

\`\`\`typescript
type JSONValue = string | number | boolean | null | JSONValue[] | { [key: string]: JSONValue };
\`\`\`

## Branded Types

TypeScript menggunakan structural typing. Dua tipe dengan properti sama dianggap sama meskipun secara domain berbeda. Branded type menambahkan tag unik agar tipe bersifat nominal.

\`\`\`typescript
type UserId = string & { __brand: 'UserId' };
type PostId = string & { __brand: 'PostId' };

function asUserId(value: string): UserId {
  return value as UserId;
}

const uid: UserId = asUserId('u-1');
const pid: PostId = asUserId('p-1') as PostId;

// uid = pid; // Error: tidak bisa menggabungkan brand yang berbeda
\`\`\`

## Template Literal Types

Template literal types membangun tipe string dari tipe lain, mirip template literal di runtime. Cocok untuk membuat key dinamis atau validasi format string.

\`\`\`typescript
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type Endpoint = \`/api/\${HttpMethod}\`;
// Endpoint = "/api/GET" | "/api/POST" | "/api/PUT" | "/api/DELETE"
\`\`\`

## Key Remapping

Dengan mapped types dan \\"as\\", kita bisa mengubah key dari sebuah object type.

\`\`\`typescript
type Getters<T> = {
  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K];
};

type User = { name: string; age: number };
type UserGetters = Getters<User>;
// { getName: () => string; getAge: () => number }
\`\`\``,
    },
    {
      id: 'sec-01-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-01-ts',
        filename: 'path-parser-type-level.ts',
        language: 'typescript',
        title: 'TypeScript: Parser Path Parameter di Level Tipe',
        code: `// Ekstrak nama parameter dari literal pattern "/users/:userId/posts/:postId"

type ParamNames<P extends string> =
  P extends \`\${infer Head}/:\${infer Param}/\${infer Tail}\`
    ? Param | ParamNames<\`\${Head}/\${Tail}\`>
    : P extends \`\${infer Head}/:\${infer Param}\`
      ? Param
      : never;

type RouteParams<P extends string> = {
  [K in ParamNames<P>]: string;
};

type UserPostParams = RouteParams<'/users/:userId/posts/:postId'>;
// { userId: string; postId: string }

function navigateTo<P extends string>(
  pattern: P,
  params: RouteParams<P>
): string {
  return pattern.replace(/:([^/]+)/g, (_, key) => {
    const value = (params as Record<string, string>)[key];
    if (value === undefined) throw new Error(\`Missing param: \${key}\`);
    return value;
  });
}

const url = navigateTo('/users/:userId/posts/:postId', {
  userId: '42',
  postId: '7',
});

// navigateTo('/users/:userId/posts/:postId', { userId: '42' });
// Error: Property 'postId' is missing

console.log(url); // /users/42/posts/7`,
        explanation:
          'Dengan template literal types dan conditional types, kita bisa membuat RouteParams yang mengekstrak nama parameter secara otomatis dari pattern string literal. Kesalahan parameter hilang akan tertangkap saat compile time.',
      },
    },
    {
      id: 'sec-01-advanced-types',
      type: 'markdown',
      level: 'advanced',
      title: 'Type-Level State Machine, Conditional Type Distribution, dan infer',
      content: `## Conditional Type Distribution

Conditional type \\"T extends U ? X : Y\\" didistribusikan otomatis ketika T adalah union. Ini memungkinkan transformasi setiap anggota union secara terpisah.

\`\`\`typescript
type ToArray<T> = T extends unknown ? T[] : never;

type StringOrNumberArray = ToArray<string | number>;
// string[] | number[], bukan (string | number)[]
\`\`\`

Untuk menonaktifkan distribusi, bungkus T dalam tuple: \`[T] extends [U] ? X : Y\`.

## Ekstraksi dengan infer

\`infer\` memungkinkan kita menangkap tipe dari dalam pattern yang cocok. Pola ini digunakan oleh utility types bawaan seperti ReturnType dan Parameters.

\`\`\`typescript
type MyReturnType<T> = T extends (...args: unknown[]) => infer R ? R : never;
type MyParameters<T> = T extends (...args: infer P) => unknown ? P : never;
\`\`\`

## Type-Level State Machine

Kita bisa memodelkan state machine sederhana di level tipe. Setiap transisi menghasilkan state baru, dan state yang tidak valid tidak bisa dicapai.

\`\`\`typescript
type StateMachine<S, E> =
  S extends 'idle'
    ? E extends 'FETCH' ? 'loading' : 'idle'
    : S extends 'loading'
      ? E extends 'SUCCESS' ? 'success' : E extends 'ERROR' ? 'error' : 'loading'
      : S extends 'success'
        ? E extends 'RESET' ? 'idle' : 'success'
        : S extends 'error'
          ? E extends 'RETRY' ? 'loading' : 'error'
          : never;

type S1 = StateMachine<'idle', 'FETCH'>;     // "loading"
type S2 = StateMachine<'loading', 'SUCCESS'>; // "success"
type S3 = StateMachine<'success', 'FETCH'>;   // "success" (transisi tidak valid dicegah)
\`\`\`

Mesin semacam ini berguna untuk memastikan urutan state di API atau protokol komunikasi konsisten sejak compile time.

## Batasan

Type-level programming tidak menambahkan overhead runtime karena hasilnya dihapus saat kompilasi. Namun, kompleksitas berlebihan bisa memperlambat TypeScript compiler dan membuat error message sulit dibaca.`,
    },
    {
      id: 'sec-01-advanced-example',
      type: 'code-example',
      codeExample: {
        id: 'code-01-advanced',
        filename: 'type-level-validation.ts',
        language: 'typescript',
        title: 'TypeScript: Validasi Form di Level Tipe dengan Conditional Types',
        code: `// Template literal types + conditional types untuk validasi shape form

type FieldRule = 'required' | 'email' | 'minLength:3';

type RuleError<R extends FieldRule, Label extends string> =
  R extends 'required'
    ? \`\${Label} wajib diisi\`
    : R extends 'email'
      ? \`\${Label} harus email valid\`
      : R extends \`minLength:\${infer N extends number}\`
        ? \`\${Label} minimal \${N} karakter\`
        : never;

type FormErrors<T extends Record<string, FieldRule[]>> = {
  [K in keyof T]: RuleError<T[K][number], Capitalize<string & K>>;
}[keyof T][];

type UserFormRules = {
  name: ['required', 'minLength:3'];
  email: ['required', 'email'];
};

type UserFormErrors = FormErrors<UserFormRules>;
// ("Name wajib diisi" | "Name minimal 3 karakter" | "Email wajib diisi" | "Email harus email valid")[]

// Type-level state machine: transisi event yang tidak valid tidak bisa dicapai
type Transition<S extends string, E extends string> =
  S extends 'idle'
    ? E extends 'SUBMIT' ? 'submitting' : 'idle'
    : S extends 'submitting'
      ? E extends 'SUCCESS' ? 'success' : E extends 'FAIL' ? 'error' : 'submitting'
      : S extends 'error'
        ? E extends 'RETRY' ? 'submitting' : 'error'
        : S extends 'success'
          ? E extends 'RESET' ? 'idle' : 'success'
          : never;

type AfterSubmit = Transition<'idle', 'SUBMIT'>;       // "submitting"
type InvalidRetry = Transition<'idle', 'RETRY'>;       // "idle" (transisi tidak valid)

function validateForm(
  values: Record<string, string>,
  rules: Record<string, FieldRule[]>
): string[] {
  const errors: string[] = [];
  for (const [field, fieldRules] of Object.entries(rules)) {
    for (const rule of fieldRules) {
      if (rule === 'required' && !values[field]?.trim()) {
        errors.push(\`\${field} wajib diisi\`);
      }
    }
  }
  return errors;
}`,
        explanation:
          'Conditional types dan template literal types memungkinkan validasi bentuk error message sejak compile time. Pola Transition memodelkan state machine di level tipe sehingga transisi yang tidak valid langsung terlihat tanpa menjalankan kode.',
      },
    },
    {
      id: 'sec-01-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Info:** Type-level programming TypeScript sangat kuat untuk membuat API yang self-documenting dan menangkap bug sejak compile time. Namun, hindari membuat tipe terlalu dalam tanpa tes tipe (type tests) karena error message bisa menjadi sulit dipahami. Gunakan </code>satisfies`, </code>infer`, dan branded types secara bijak.',
    },
  ],
}
