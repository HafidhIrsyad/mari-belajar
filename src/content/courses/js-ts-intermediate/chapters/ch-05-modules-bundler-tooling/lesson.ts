import type { Lesson } from '@/content/types'

export const ch05Lesson: Lesson = {
  id: 'lesson-ch-05-modules-bundler-tooling',
  estimatedMinutes: 35,
  sections: [
    {
      id: 'sec-05-basic-modules',
      type: 'markdown',
      level: 'basic',
      title: 'ES Modules, package.json, dan type="module"',
      content: `## ES Modules

ES modules (ESM) adalah sistem module standar JavaScript modern. Modul mengekspos fitur melalui \`export\` dan mengimpor melalui \`import\`.

\`\`\`javascript
// math.js
export function add(a, b) {
  return a + b;
}

export const PI = 3.14;
\`\`\`

\`\`\`javascript
// main.js
import { add, PI } from './math.js';
console.log(add(2, 3), PI);
\`\`\`

## type="module"

Di browser, tambahkan \`type="module"\` pada tag script untuk mengaktifkan ESM:

\`\`\`html
<script type="module" src="./main.js"></script>
\`\`\`

Dengan module, setiap file memiliki scope tersendiri dan \`this\` di top-level bernilai \`undefined\`.

## package.json

File \`package.json\` mengelola metadata proyek dan dependensi. Field \`"type": "module"\` menginstruksikan Node.js untuk memperlakukan file \`.js\` sebagai ESM.

\`\`\`json
{
  "name": "my-app",
  "type": "module",
  "dependencies": {}
}
\`\`\``,
    },
    {
      id: 'sec-05-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-05-js',
        filename: 'modules.js',
        language: 'javascript',
        title: 'JavaScript: Split Module dengan Named dan Default Export',
        code: `// utils/logger.js
export function logInfo(message) {
  console.log('[INFO]', message);
}

export function logError(message) {
  console.error('[ERROR]', message);
}

// utils/index.js (barrel file)
export { logInfo, logError } from './logger.js';

// main.js
import { logInfo, logError } from './utils/index.js';

logInfo('Aplikasi dimulai');
logError('Terjadi kesalahan');`,
        explanation:
          'Named export memungkinkan banyak ekspor per file. Barrel file mengumpulkan ekspor dari beberapa file untuk impor yang lebih bersih.',
      },
    },
    {
      id: 'sec-05-intermediate-modules',
      type: 'markdown',
      level: 'intermediate',
      title: 'Tree Shaking, Dynamic Import, dan Bundler',
      content: `## Tree Shaking

Tree shaking adalah proses menghapus kode yang tidak digunakan saat bundling. Bundler seperti Rollup dan Vite mengandalkan static import untuk menentukan kode mana yang dead code.

Agar tree shaking bekerja optimal:

- Hindari side-effect di top-level module.
- Gunakan named export daripada single object export.
- Pastikan package.json memiliki \`sideEffects\` yang benar.

## Dynamic Import

Dynamic import memuat module secara lazy saat dibutuhkan. Hasilnya adalah \`Promise\` yang resolve ke module.

\`\`\`javascript
const { heavyFunction } = await import('./heavy.js');
heavyFunction();
\`\`\`

Pola ini mendukung code splitting: bundler memisahkan \`heavy.js\` menjadi chunk terpisah yang diunduh on-demand.

## Vite dan Webpack

- **Vite**: menggunakan native ESM saat development dan Rollup untuk production build. Cold start lebih cepat karena tidak perlu membundel seluruh dependency di awal.
- **Webpack**: membundel semuanya di development dan production, lebih konfigurabel tetapi biasanya lebih lambat saat startup.

## tsconfig Paths

Path alias memungkinkan import absolut dari folder tertentu:

\`\`\`json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
\`\`\`

Dengan alias \`@/components/Button\`, refactoring folder menjadi lebih mudah dan import path lebih stabil.`,
    },
    {
      id: 'sec-05-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-05-ts',
        filename: 'shop.ts',
        language: 'typescript',
        title: 'TypeScript: Barrel File dan Dynamic Import dengan Type',
        code: `// shop/types.ts
export interface Product {
  id: number;
  name: string;
  price: number;
}

// shop/api.ts
export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch('/api/products');
  return response.json();
}

// shop/index.ts
export type { Product } from './types';
export { fetchProducts } from './api';

// pages/Catalog.tsx
import { Product, fetchProducts } from '@/shop';

export async function loadCatalog(): Promise<Product[]> {
  const products = await fetchProducts();
  return products.filter((p) => p.price > 0);
}

// Lazy load komponen berat
export async function openCartModal() {
  const { CartModal } = await import('./CartModal');
  CartModal.show();
}`,
        explanation:
          'Barrel file dengan re-export memusatkan public API dari sebuah folder. Dynamic import memuat CartModal hanya saat user membuka modal, mengurangi bundle halaman utama.',
      },
    },
    {
      id: 'sec-05-advanced-modules',
      type: 'markdown',
      level: 'advanced',
      title: 'Module Resolution, Circular Dependencies, ESM vs CJS',
      content: `## Module Resolution Algorithm

Ketika TypeScript atau Node.js menemukan \`import './utils'\`, resolver mencoba:

1. File \`./utils.ts\`, \`./utils.tsx\`, \`./utils.js\`, \`./utils.json\`.
2. Folder \`./utils\` dengan \`package.json\` atau \`index.ts/js\`.
3. \`node_modules\` jika path bukan relative.

\`tsconfig.json\` mengontrol perilaku ini lewat \`moduleResolution\` (classic, node, node16, bundler).

## ESM vs CJS Interoperability

- ESM: top-level \`import\` dan \`export\`, static, tree-shakeable.
- CJS: \`require()\` synchronous, \`module.exports\`, dynamic.

Node.js mengizinkan CJS mem-\`require\` ESM hanya secara asinkron. ESM bisa meng-\`import\` CJS sebagai default import, tetapi named export CJS mungkin tidak terdeteksi dengan baik.

## Circular Dependencies

Circular dependency terjadi ketika module A mengimpor B, dan B (langsung atau tidak langsung) mengimpor A. Hasilnya bisa berupa partial export, undefined, atau error runtime. Solusi:

- Refactor ke shared module.
- Gunakan dependency inversion.
- Tunda import dengan dynamic import.

## Performance Budget

Performance budget membatasi ukuran bundle agar aplikasi tetap cepat dimuat. Tool seperti bundlesize atau vite-plugin-bundle-analyzer membantu memantau chunk size dan mendeteksi bloat.`,
    },
    {
      id: 'sec-05-go-example',
      type: 'code-example',
      codeExample: {
        id: 'code-05-go',
        filename: 'goshop.go',
        language: 'go',
        title: 'Go: Package dan Module Path',
        code: `// file: shop/product.go
package shop

type Product struct {
	ID    int
	Name  string
	Price float64
}

func FilterPositive(products []Product) []Product {
	var result []Product
	for _, p := range products {
		if p.Price > 0 {
			result = append(result, p)
		}
	}
	return result
}

// file: main.go
package main

import (
	"fmt"
	"myapp/shop"
)

func main() {
	products := []shop.Product{
		{ID: 1, Name: "Buku", Price: 50000},
		{ID: 2, Name: "Gratis", Price: 0},
	}
	fmt.Println(shop.FilterPositive(products))
}`,
        explanation:
          'Go menggunakan package sebagai unit modularitas dan go.mod untuk module path. Setiap folder adalah satu package; visibility ditentukan oleh huruf kapital pada nama identifier.',
      },
    },
    {
      id: 'sec-05-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Kesimpulan:** ES modules menyediakan fondasi modular JavaScript modern. Manfaatkan tree shaking, dynamic import, dan path alias untuk build yang efisien. Pahami module resolution dan hindari circular dependencies untuk menjaga kesehatan codebase.',
    },
  ],
}
