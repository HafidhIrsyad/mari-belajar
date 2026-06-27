import type { Lesson } from '@/content/types'

export const ch03Lesson: Lesson = {
  id: 'lesson-ch-03-metaprogramming-reflection',
  estimatedMinutes: 45,
  sections: [
    {
      id: 'sec-03-basic-meta',
      type: 'markdown',
      level: 'basic',
      title: 'Property Descriptors, Getters, dan Setters',
      content: `## Property Descriptors

Setiap properti objek di JavaScript memiliki **descriptor** yang mengontrol perilakunya. Descriptor terdiri dari:

- **value**: nilai properti.
- **writable**: apakah nilai dapat diubah.
- **enumerable**: apakah properti muncul di <code>for...in</code> atau <code>Object.keys</code>.
- **configurable**: apakah descriptor dapat diubah atau properti dihapus.

\`\`\`javascript
const obj = {};
Object.defineProperty(obj, 'secret', {
  value: 42,
  writable: false,
  enumerable: false,
  configurable: false,
});

obj.secret = 100; // gagal dalam mode strict
console.log(obj.secret); // 42
\`\`\`

## Getters dan Setters

Getter membaca nilai, setter menulis nilai. Keduanya memungkinkan komputasi saat akses properti.

\`\`\`javascript
const circle = {
  radius: 5,
  get area() {
    return Math.PI * this.radius ** 2;
  },
  set area(value) {
    this.radius = Math.sqrt(value / Math.PI);
  },
};
\`\`\``,
    },
    {
      id: 'sec-03-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-03-js',
        filename: 'proxy-validator.js',
        language: 'javascript',
        title: 'JavaScript: Validasi Runtime dengan Proxy',
        code: `function createValidator(schema) {
  return new Proxy(schema, {
    set(target, prop, value) {
      const rule = target[prop];
      if (rule && !rule.validate(value)) {
        throw new TypeError(\`Invalid value for \${String(prop)}: \${value}\`);
      }
      target[prop] = value;
      return true;
    },
  });
}

const config = createValidator({
  port: {
    value: 3000,
    validate: (v) => Number.isInteger(v) && v > 0 && v < 65536,
  },
  env: {
    value: 'development',
    validate: (v) => ['development', 'production', 'test'].includes(v),
  },
});

config.port = 8080; // OK
// config.port = 70000; // TypeError: Invalid value for port: 70000

console.log(config.port); // 8080`,
        explanation:
          'Proxy trap </code>set<code> mencegat penulisan properti. Jika nilai tidak lolos validasi, kita lempar error sebelum state berubah.',
      },
    },
    {
      id: 'sec-03-intermediate-meta',
      type: 'markdown',
      level: 'intermediate',
      title: 'Proxy Traps, Reflect API, dan Well-Known Symbols',
      content: `## Proxy Traps

Proxy mendukung banyak trap, antara lain:

- <code>get</code> dan <code>set</code> untuk akses dan penulisan properti.
- <code>has</code> untuk operator <code>in</code>.
- <code>deleteProperty</code> untuk operator <code>delete</code>.
- <code>ownKeys</code> untuk <code>Object.keys</code> dan <code>Reflect.ownKeys</code>.
- <code>apply</code> dan <code>construct</code> untuk fungsi dan kelas.

Setiap trap menerima target sebagai objek asli dan argumen tambahan sesuai operasi.

## Reflect API

Reflect menyediakan fungsi yang mencerminkan operator object:

\`\`\`javascript
Reflect.set(target, prop, value);
Reflect.get(target, prop);
Reflect.has(target, prop);
Reflect.deleteProperty(target, prop);
\`\`\`

Dengan Reflect, kita dapat meneruskan operasi ke target secara default dari dalam Proxy trap.

## Well-Known Symbols

Symbol bawaan seperti <code>Symbol.iterator</code>, <code>Symbol.asyncIterator</code>, <code>Symbol.toPrimitive</code>, dan <code>Symbol.toStringTag</code> mengubah perilaku objek di berbagai konteks.

\`\`\`javascript
const iterable = {
  [Symbol.iterator]() {
    let i = 0;
    return {
      next: () => ({ value: i++, done: i > 3 }),
    };
  },
};
\`\`\``,
    },
    {
      id: 'sec-03-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-03-ts',
        filename: 'decorator-metadata.ts',
        language: 'typescript',
        title: 'TypeScript: Decorator dan Metadata Reflection',
        code: `import 'reflect-metadata';

const REQUIRED = Symbol('required');

function Required(target: object, propertyKey: string) {
  const existing: string[] = Reflect.getMetadata(REQUIRED, target) || [];
  Reflect.defineMetadata(REQUIRED, [...existing, propertyKey], target);
}

class User {
  @Required
  name: string = '';

  @Required
  email: string = '';
}

function validate(instance: object) {
  const required: string[] = Reflect.getMetadata(REQUIRED, Object.getPrototypeOf(instance)) || [];
  for (const key of required) {
    if ((instance as Record<string, unknown>)[key] === undefined) {
      throw new Error(\`\${key} is required\`);
    }
  }
}

const user = new User();
user.name = 'Ani';
// user.email tidak diisi
// validate(user); // Error: email is required

console.log('Metadata stored keys:', Reflect.getMetadata(REQUIRED, User.prototype));`,
        explanation:
          'Decorator menyimpan metadata di prototype class menggunakan Reflect metadata. Runtime kemudian dapat membaca metadata tersebut untuk validasi, serialisasi, atau mapping.',
      },
    },
    {
      id: 'sec-03-advanced-meta',
      type: 'markdown',
      level: 'advanced',
      title: 'Code Generation, Custom Transformers, dan AST Manipulation',
      content: `## Code Generation

Metaprogramming di level build memungkinkan kita menghasilkan kode dari schema, GraphQL, OpenAPI, atau database. Keuntungannya:

- Menghilangkan boilerplate.
- Menjaga konsistensi antara schema dan kode aplikasi.
- Mendeteksi perubahan breaking sejak compile time.

## Custom Transformers TypeScript

TypeScript Compiler API memungkinkan kita membuat transformer yang mengubah AST (Abstract Syntax Tree) saat kompilasi. Transformer dapat mengubah sintaks eksperimental menjadi kode yang dapat dijalankan.

\`\`\`typescript
// Contoh: transformer mengubah import path berdasarkan alias tsconfig
const transformer = (context) => {
  return (sourceFile) => {
    function visit(node) {
      if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier)) {
        const newPath = resolveAlias(node.moduleSpecifier.text);
        return ts.factory.updateImportDeclaration(
          node,
          node.modifiers,
          node.importClause,
          ts.factory.createStringLiteral(newPath),
          undefined
        );
      }
      return ts.visitEachChild(node, visit, context);
    }
    return ts.visitNode(sourceFile, visit);
  };
};
\`\`\`

## Macros dan SWC

SWC dan esbuild menggunakan Rust/Go untuk transformasi kode yang jauh lebih cepat daripada Babel. Plugin SWC memungkinkan transformasi kustom dengan performa tinggi.

## Kapan Menggunakan Metaprogramming?

Gunakan metaprogramming untuk concern cross-cutting seperti logging, validasi, authorization, atau generate code dari schema. Hindari menggunakannya untuk logika bisnis yang mudah dibaca secara eksplisit.`,
    },
    {
      id: 'sec-03-go-example',
      type: 'code-example',
      codeExample: {
        id: 'code-03-go',
        filename: 'reflection.go',
        language: 'go',
        title: 'Go: Reflection Dasar untuk Inspeksi Struct',
        code: `package main

import (
\t"fmt"
\t"reflect"
)

type User struct {
\tName  string \`json:"name" validate:"required"\`
\tEmail string \`json:"email" validate:"required,email"\`
\tAge   int    \`json:"age"\`
}

func inspectStruct(v any) {
\tt := reflect.TypeOf(v)
\tif t.Kind() == reflect.Ptr {
\t\tt = t.Elem()
\t}
\tfor i := 0; i < t.NumField(); i++ {
\t\tfield := t.Field(i)
\t\tfmt.Printf(
\t\t\t"Field: %s, Type: %s, JSON: %s, Validate: %s\\n",
\t\t\tfield.Name,
\t\t\tfield.Type,
\t\t\tfield.Tag.Get("json"),
\t\t\tfield.Tag.Get("validate"),
\t\t)
\t}
}

func main() {
\tinspectStruct(User{})
}`,
        explanation:
          'Go reflection memungkinkan inspeksi tipe, nilai, dan struct tags saat runtime. Banyak library validasi dan serialisasi Go memanfaatkan reflect untuk membaca tag.',
      },
    },
    {
      id: 'sec-03-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Info:** Proxy dan reflection sangat kuat tetapi bisa memperlambat performa dan menyulitkan debugging. Gunakan untuk concern lintas modul, bukan untuk logika bisnis inti. Perhatikan bahwa </code>Reflect.metadata<code> memerlukan package </code>reflect-metadata<code> dan pengaturan </code>experimentalDecorators<code> serta </code>emitDecoratorMetadata<code> di tsconfig.',
    },
  ],
}
