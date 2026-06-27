import type { Lesson } from '@/content/types'

export const ch08Lesson: Lesson = {
  id: 'lesson-ch-08-runtime-security-supply-chain-hardening',
  estimatedMinutes: 45,
  sections: [
    {
      id: 'sec-08-basic-security',
      type: 'markdown',
      level: 'basic',
      title: 'Prototype Pollution dan Input Sanitization',
      content: `## Prototype Pollution

Prototype pollution terjadi ketika attacker dapat mengubah \`Object.prototype\` melalui manipulasi properti seperti \`__proto__\`, \`constructor\`, atau \`prototype\`. Karena hampir semua objek JavaScript mewarisi dari \`Object.prototype\`, perubahan tersebut dapat memengaruhi seluruh aplikasi.

\`\`\`javascript
const malicious = JSON.parse('{"__proto__": {"isAdmin": true}}');
const target = {};
Object.assign(target, malicious);
console.log({}.isAdmin); // true (polluted)
\`\`\`

## Object.create(null)

Salah satu mitigasi sederhana adalah membuat objek tanpa prototype. Objek semacam ini tidak mewarisi \`Object.prototype\`, sehingga tidak rentan terhadap prototype pollution.

\`\`\`javascript
const safe = Object.create(null);
safe['__proto__'] = 'ignored'; // hanya properti biasa
console.log(safe.__proto__);   // 'ignored'
\`\`\`

## Input Sanitization

Selalu validasi dan sanitasi input, terutama sebelum menggabungkannya ke objek, query, atau perintah eksternal. Gunakan schema validation seperti Zod, Joi, atau library validasi tipe.`,
    },
    {
      id: 'sec-08-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-08-js',
        filename: 'pollution-guard.js',
        language: 'javascript',
        title: 'JavaScript: Guard terhadap Prototype Pollution',
        code: `const FORBIDDEN_KEYS = ['__proto__', 'constructor', 'prototype'];

function isForbiddenKey(key) {
  return FORBIDDEN_KEYS.includes(key);
}

function safeMerge(target, source) {
  for (const key of Object.keys(source)) {
    if (isForbiddenKey(key)) {
      continue; // abaikan key berbahaya
    }
    const value = source[key];
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      target[key] = safeMerge(target[key] || Object.create(null), value);
    } else {
      target[key] = value;
    }
  }
  return target;
}

const malicious = JSON.parse('{"__proto__": {"isAdmin": true}, "name": "Ani"}');
const safe = Object.create(null);
safeMerge(safe, malicious);

console.log(safe.name);        // Ani
console.log({}.isAdmin);       // undefined (tidak terpolusi)
console.log(safe.isAdmin);     // undefined`,
        explanation:
          'Dengan menggunakan Object.create(null) sebagai target dan mengabaikan key sensitif seperti __proto__, kita mencegah attacker mengubah Object.prototype.',
      },
    },
    {
      id: 'sec-08-intermediate-security',
      type: 'markdown',
      level: 'intermediate',
      title: 'eval, Function, vm, JSON Parsing, dan ReDoS',
      content: `## eval dan Function Constructor

\`eval\` serta \`new Function(...)\` mengeksekusi string sebagai kode JavaScript. Penggunaannya sangat berisiko karena string dapat disuntikkan kode arbitrer. Hindari jika memungkinkan.

\`\`\`javascript
const userInput = "console.log('pwned')";
eval(userInput); // berbahaya
\`\`\`

## vm Module di Node.js

\`vm\` module Node.js memungkinkan eksekusi kode dalam konteks terpisah, tetapi tidak memberikan sandbox keamanan yang kuat. Kode dalam vm masih dapat melakukan denial of service atau escape melalui prototype chain.

## JSON Parsing Security

\`JSON.parse\` sendiri tidak mengeksekusi kode, tetapi hasilnya dapat digunakan untuk prototype pollution jika tidak divalidasi. Gunakan parser yang aman atau validasi schema setelah parse.

## ReDoS (Regular Expression Denial of Service)

Regex dengan nested quantifier yang ambigu dapat menyebabkan backtracking eksponensial. Attacker dapat mengirim input khusus yang membuat CPU sibuk dalam waktu lama.

\`\`\`javascript
const evil = /^([a-z]+)+$/.test('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa!');
// Waktu eksekusi bisa sangat lama.
\`\`\`

Gunakan regex yang tidak memiliki ambiguity, batasi panjang input, atau gunakan parser non-regex.`,
    },
    {
      id: 'sec-08-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-08-ts',
        filename: 'safe-parse.ts',
        language: 'typescript',
        title: 'TypeScript: Safe Parse dengan Branded Type',
        code: `import { z } from 'zod';

type Email = string & { __brand: 'Email' };

const emailSchema = z.string().email().transform((value) => value as Email);

const userSchema = z.object({
  name: z.string().min(1),
  email: emailSchema,
  role: z.enum(['admin', 'user']),
}).strict();

function parseUser(input: unknown) {
  const parsed = userSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error(\`Invalid input: \${parsed.error.message}\`);
  }
  return parsed.data;
}

const data = {
  name: 'Budi',
  email: 'budi@example.com',
  role: 'user',
  '__proto__': { isAdmin: true }, // key tambahan
};

const user = parseUser(data);
console.log(user);

// parseUser({ name: 'Eve', email: 'not-an-email', role: 'user' });
// Error: Invalid input`,
        explanation:
          'Zod memvalidasi input secara runtime dan menolak properti tambahan berkat </code>.strict()<code>. Branded type </code>Email<code> memastikan nilai email hanya berasal dari jalur validasi.',
      },
    },
    {
      id: 'sec-08-advanced-supplychain',
      type: 'markdown',
      level: 'advanced',
      title: 'Supply Chain Security, SRI, Permission Model, dan SBOM',
      content: `## npm Supply Chain Attacks

Supply chain attack terjadi ketika attacker menyusupkan kode jahat ke dalam package publik. Cara masuknya bisa melalui compromised maintainer account, dependency confusion, atau typosquatting.

## Lockfile Integrity

File \`package-lock.json\` atau \`pnpm-lock.yaml\` mencatat hash integrity setiap package. Selalu commit lockfile dan review perubahannya. Hindari \`npm install\` yang bisa mengubah versi minor secara otomatis; gunakan \`npm ci\` di CI/CD.

## Subresource Integrity (SRI)

SRI memungkinkan browser memverifikasi bahwa resource eksternal (script, stylesheet) tidak dimodifikasi. Atribut \`integrity\` berisi hash kriptografis dari file.

\`\`\`html
<script src="https://cdn.example.com/lib.js"
  integrity="sha384-abc123..."
  crossorigin="anonymous"></script>
\`\`\`

## Node.js Permission Model

Node.js menyediakan Permission Model eksperimental untuk membatasi akses file system, child process, dan worker threads. Dengan permission model, aplikasi dapat dijalankan dengan kemampuan minimal.

\`\`\`bash
node --experimental-permission --allow-fs-read=* ./app.js
\`\`\`

## Dependency Scanning dan SBOM

Tools seperti Snyk, Trivy, dan OSV dapat memindai dependency yang dikenal kerentanan. **SBOM (Software Bill of Materials)** adalah daftar komponen perangkat lunak yang digunakan, berguna untuk audit, compliance, dan respons insiden.

## Praktik Terbaik

- Minimalisasi dependency; pertimbangkan cost setiap package baru.
- Gunakan private registry dan audit setiap perubahan lockfile.
- Aktifkan two-factor authentication untuk akun npm/registry.
- Pantau advisory kerentanan secara berkala.
- Jalankan aplikasi dengan permission model atau container minimal.`,
    },
    {
      id: 'sec-08-go-example',
      type: 'code-example',
      codeExample: {
        id: 'code-08-go',
        filename: 'sandbox_input.go',
        language: 'go',
        title: 'Go: Validasi Input Tidak Tepercaya',
        code: `package main

import (
\t"encoding/json"
\t"fmt"
\t"strings"
)

type UserInput struct {
\tName  string \`json:"name"\`
\tEmail string \`json:"email"\`
}

func sanitizeJSON(raw []byte) ([]byte, error) {
\t// Tolak input yang mengandung pola prototype pollution.
\tif strings.Contains(string(raw), "__proto__") ||
\t\tstrings.Contains(string(raw), "constructor") {
\t\treturn nil, fmt.Errorf("forbidden key detected")
\t}
\treturn raw, nil
}

func parseUser(raw []byte) (*UserInput, error) {
\tsafe, err := sanitizeJSON(raw)
\tif err != nil {
\t\treturn nil, err
\t}
\tvar u UserInput
\tif err := json.Unmarshal(safe, &u); err != nil {
\t\treturn nil, err
\t}
\tif u.Name == "" || !strings.Contains(u.Email, "@") {
\t\treturn nil, fmt.Errorf("invalid user data")
\t}
\treturn &u, nil
}

func main() {
\tinput := []byte(\`{"name":"Ani","email":"ani@example.com"}\`)
\tuser, err := parseUser(input)
\tif err != nil {
\t\tpanic(err)
\t}
\tfmt.Println(user.Name, user.Email)
}`,
        explanation:
          'Go tidak memiliki prototype pollution, tetapi input JSON tetap harus divalidasi sebelum digunakan. Pola sandbox memeriksa karakteristik berbahaya dan memvalidasi field wajib.',
      },
    },
    {
      id: 'sec-08-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Info:** Keamanan runtime dimulai dari asumsi bahwa semua input tidak tepercaya. Hindari eval/Function, sanitasi input, gunakan Object.create(null), dan validasi dengan schema. Di level supply chain, commit lockfile, pantau advisory, pertimbangkan Node.js Permission Model, dan bangun SBOM untuk visibility dependency.',
    },
  ],
}
