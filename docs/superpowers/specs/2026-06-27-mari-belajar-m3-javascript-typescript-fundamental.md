# Mari Belajar — Milestone 3: JavaScript/TypeScript Fundamental

## Goal

Menambahkan course kedua pada platform Mari Belajar: **JavaScript/TypeScript Fundamental**. Course ini menjadi fondasi bahasa pemrograman sebelum learner masuk ke frontend, backend, atau Go deep dive.

## Course Metadata

| Field | Value |
|---|---|
| Course ID | `js-ts-fundamental` |
| Slug | `js-ts-fundamental` |
| Title | **JavaScript / TypeScript Fundamental** |
| Description | Fondasi bahasa JavaScript dan TypeScript untuk pemula: dari variabel, tipe data, fungsi, hingga async programming dan type system. |
| Estimated Hours | 18 |
| Tags | `javascript`, `typescript`, `fundamentals`, `indonesian` |

## Chapter Outline

### ch-01: Pengenalan JavaScript dan Lingkungan Development

**Basic**
- Apa itu JavaScript dan mengapa dipelajari
- Cara menjalankan JS: browser console, Node.js, file `.js`
- Statement, expression, comment

**Intermediate**
- `console.log`, `console.error`, debugging dasar
- Strict mode (`'use strict'`)
- REPL dan runner sederhana

**Advanced**
- Ekosistem JS: engine, runtime, package manager
- Perbedaan browser JS vs Node.js

**Code Examples**
- JS: Hello world dan console methods
- TS: TypeScript compiler pertama (`tsc`)
- Go: Perbandingan program hello world di Go

### ch-02: Variabel, Tipe Data, dan Operator

**Basic**
- `let`, `const`, `var`
- Primitive types: string, number, boolean, null, undefined, symbol, bigint
- Type coercion dan truthy/falsy

**Intermediate**
- Operator: aritmatika, perbandingan, logika, assignment
- Template literal
- Type annotation dasar di TypeScript

**Advanced**
- Immutability primitive vs reference
- Type inference TS
- Union types dasar

**Code Examples**
- JS: variabel dan operator
- TS: type annotation dan inference
- Go: deklarasi variabel dengan `var` dan `:=`

### ch-03: Control Flow

**Basic**
- `if`, `else if`, `else`
- `switch`
- Looping: `for`, `while`, `do...while`

**Intermediate**
- Looping array: `for...of`, `forEach`
- Break dan continue
- Truthy/falsy dalam kondisi

**Advanced**
- Early return pattern
- Guard clause

**Code Examples**
- JS: control flow
- TS: typed control flow
- Go: `if`, `switch`, `for`

### ch-04: Fungsi, Scope, dan Closure

**Basic**
- Function declaration, expression, arrow function
- Parameter dan return value
- Default parameter

**Intermediate**
- Scope: global, function, block
- Hoisting
- Closure

**Advanced**
- Higher-order function
- Callback function
- IIFE (pengantar)

**Code Examples**
- JS: arrow function dan closure
- TS: typed functions dan generics dasar
- Go: function, multiple return values

### ch-05: Array dan Object

**Basic**
- Membuat dan mengakses array
- Array methods: push, pop, shift, unshift
- Object literal, property, method

**Intermediate**
- Array methods: map, filter, reduce, find, includes
- Object destructuring
- Spread dan rest operator

**Advanced**
- Array immutability
- Deep vs shallow copy
- Record dan mapped types di TS

**Code Examples**
- JS: manipulasi array dan object
- TS: typed array dan interface
- Go: slice dan struct

### ch-06: Asynchronous JavaScript

**Basic**
- Mengapa async penting
- Callback dan callback hell (pengantar)
- `setTimeout` dan `setInterval`

**Intermediate**
- Promise: create, then, catch, finally
- Promise chaining
- `Promise.all` dan `Promise.race`

**Advanced**
- `async/await`
- Error handling dengan `try/catch`
- Event loop (konsep)

**Code Examples**
- JS: Promise dan fetch
- TS: typed async function
- Go: goroutine dan channel (perbandingan model concurrency)

### ch-07: TypeScript Type System

**Basic**
- Apa itu TypeScript dan manfaatnya
- Type annotation vs type inference
- `any`, `unknown`, `never`

**Intermediate**
- Interface dan type alias
- Optional properties
- Union dan intersection types
- Array dan object types

**Advanced**
- Generics
- Type narrowing
- Type guards

**Code Examples**
- TS: interface, generic, type guard
- JS: runtime equivalent
- Go: interface dan type assertion (perbandingan)

### ch-08: Modules, Tooling, dan Best Practices

**Basic**
- `import` dan `export` (ES Modules)
- `package.json` dan `node_modules`
- npm/pnpm script

**Intermediate**
- TypeScript config (`tsconfig.json`)
- Linting dan formatting
- Environment variables (pengantar, tanpa secret)

**Advanced**
- Error handling best practices
- Coding style dan readable code
- Resource belajar berikutnya

**Code Examples**
- JS/TS: module import/export
- TS: tsconfig dasar
- Go: package dan import

## Structure per Chapter

Sama seperti Phase 1:
- `index.ts`: metadata chapter
- `lesson.ts`: basic → JS → intermediate → TS → advanced → Go → callout
- `quiz.ts`: 8 soal, passingScore 8
- `references.ts`: 5 referensi campuran

## Acceptance Criteria

- Course `js-ts-fundamental` terdaftar di `src/content/index.ts`.
- 8 chapter lengkap dengan lesson, quiz, dan references.
- `pnpm run validate-content` lolos.
- `pnpm run lint -- --max-warnings=0` lolos.
- `pnpm run typecheck` lolos.
- `pnpm run test` lolos (minimal 13 test eksisting + smoke test chapter baru).
- `pnpm run build` lolos dan tidak ada warning chunk >500 kB.
- Direct access `/courses/js-ts-fundamental/ch-01-...` berfungsi.

## Out of Scope

- Framework JS/TS (React, Vue, dsb.) — masuk milestone Frontend Deep Dive.
- Backend/Node.js API — masuk milestone Backend Deep Dive.
- Go concurrency deep dive — masuk milestone Go Fundamental.
- Deployment Cloudflare Pages.
