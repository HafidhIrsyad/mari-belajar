import type { Lesson } from '@/content/types'

export const ch04Lesson: Lesson = {
  id: 'lesson-ch-04-micro-frontends-pengantar',
  estimatedMinutes: 40,
  sections: [
    {
      id: 'sec-04-basic',
      type: 'markdown',
      level: 'basic',
      title: 'Definisi, Motivasi, dan Trade-offs',
      content: `## Apa itu Micro-Frontends?

Micro-frontends adalah arsitektur di mana aplikasi frontend besar dipecah menjadi bagian-bagian kecil yang dapat dikembangkan, diuji, dan di-deploy secara independen oleh tim yang berbeda. Setiap bagian bertanggung jawab atas fitur bisnis tertentu.

## Motivasi

- **Independent deployability**: tim dapat merilis fitur tanpa harus menunggu seluruh aplikasi dideploy.
- **Autonomous teams**: setiap tim memilih teknologi dan arsitektur yang sesuai dengan domainnya.
- **Scalability organisasi**: memungkinkan banyak tim bekerja paralel pada satu produk besar.
- **Incremental migration**: migrasi dari legacy ke teknologi baru dapat dilakukan secara bertahap.

## Trade-offs

- **Kompleksitas operasional**: lebih banyak build, deployment, dan monitoring.
- **Ukuran bundle**: risiko duplikasi library jika tidak dikelola.
- **Konsistensi UX**: sulit menjaga konsistensi desain antar tim.
- **Performance**: overhead runtime dan komunikasi antar micro-frontend.

## Kapan Menggunakannya?

Pertimbangkan micro-frontends jika:

- Ada banyak tim frontend yang berkontribusi pada satu produk.
- Aplikasi sudah sangat besar dan build time mulai menghambat produktivitas.
- Diperlukan migrasi bertahap dari stack lama.

Hindari jika aplikasi masih kecil atau tim masih sedikit.`,
    },
    {
      id: 'sec-04-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-04-js',
        filename: 'MonolithApp.jsx',
        language: 'javascript',
        title: 'JavaScript: Monolith dengan Fitur yang Akan Dipisah',
        code: `import { useState } from 'react'
import Catalog from './features/Catalog'
import Cart from './features/Cart'
import Checkout from './features/Checkout'

function MonolithApp() {
  const [activeFeature, setActiveFeature] = useState('catalog')

  return (
    <div>
      <nav>
        <button onClick={() => setActiveFeature('catalog')}>Katalog</button>
        <button onClick={() => setActiveFeature('cart')}>Keranjang</button>
        <button onClick={() => setActiveFeature('checkout')}>Checkout</button>
      </nav>
      <main>
        {activeFeature === 'catalog' && <Catalog />}
        {activeFeature === 'cart' && <Cart />}
        {activeFeature === 'checkout' && <Checkout />}
      </main>
    </div>
  )
}

export default MonolithApp`,
        explanation:
          'Pada monolith, semua fitur ada dalam satu codebase dan satu bundle. Saat aplikasi tumbuh, build dan deploy menjadi lambat dan riskan.',
      },
    },
    {
      id: 'sec-04-intermediate',
      type: 'markdown',
      level: 'intermediate',
      title: 'Module Federation, Build-Time Integration, dan Shared Dependencies',
      content: `## Integrasi Runtime dengan Module Federation

Module Federation adalah fitur Webpack (dan sekarang didukung olehRspack/Module Federation plugin) yang memungkinkan aplikasi host memuat modul dari remote aplikasi saat runtime. Konsep kunci:

- **Host**: aplikasi utama yang mengonsumsi remote modules.
- **Remote**: aplikasi yang mengekspos modul untuk digunakan host.
- **Shared dependencies**: dependensi umum seperti React yang sebaiknya dimuat hanya sekali.

Keuntungan runtime integration:

- Remote dapat di-deploy tanpa merebuild host.
- Setiap tim dapat merilis fitur secara independen.

Kekurangan:

- Kompleksitas konfigurasi build dan runtime.
- Kesepakatan versi shared dependencies harus ketat.

## Build-Time Integration

Alternatifnya adalah mengintegrasikan micro-frontends saat build, misalnya dengan npm package publishing. Keuntungannya:

- Lebih sederhana dan dapat dilint secara statis.
- Bundle dapat dioptimalkan bersama.

Kekurangannya:

- Deploy remote memerlukan redeploy host.
- Versi dependency terkunci saat build.

## Shared Dependencies

Saat beberapa micro-frontend menggunakan library yang sama (React, React DOM), duplikasi dapat membesarkan bundle. Module Federation memungkinkan menyatakan library sebagai shared dengan rentang versi. Jika versi tidak kompatibel, fallback dapat memuat salinan lokal.`,
    },
    {
      id: 'sec-04-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-04-ts',
        filename: 'module-federation.config.ts',
        language: 'typescript',
        title: 'TypeScript: Konfigurasi Module Federation Sederhana',
        code: `import { ModuleFederationPlugin } from '@module-federation/enhanced/webpack'
import type { Configuration } from 'webpack'

const hostConfig: Configuration = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'shell',
      remotes: {
        catalog: 'catalog@https://catalog.example.com/mf-manifest.json',
        checkout: 'checkout@https://checkout.example.com/mf-manifest.json',
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: '^18.2.0',
          eager: false,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: '^18.2.0',
          eager: false,
        },
      },
    }),
  ],
}

// Remote catalog config
const remoteConfig: Configuration = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'catalog',
      exposes: {
        './ProductGrid': './src/ProductGrid',
        './ProductDetail': './src/ProductDetail',
      },
      shared: {
        react: { singleton: true, requiredVersion: '^18.2.0' },
        'react-dom': { singleton: true, requiredVersion: '^18.2.0' },
      },
    }),
  ],
}

export { hostConfig, remoteConfig }`,
        explanation:
          'Host mendeklarasikan remote dan shared dependencies. Remote mengekspos modul tertentu. Singleton: true memastikan hanya satu instance React yang berjalan di seluruh aplikasi.',
      },
    },
    {
      id: 'sec-04-advanced',
      type: 'markdown',
      level: 'advanced',
      title: 'Routing, State Isolation, dan Deployment Independence',
      content: `## Routing di Micro-Frontends

Routing menjadi tantangan karena beberapa aplikasi mungkin memiliki router sendiri. Pola umum:

- **App shell routing**: shell menangani top-level route dan memuat micro-frontend yang sesuai.
- **Sub-routing**: setelah micro-frontend dimuat, router internalnya menangani path di bawah prefix-nya.
- **Event-based routing**: micro-frontend mengirim event ke shell untuk navigasi lintas domain.

Penting untuk menjaga URL sebagai single source of truth agar back button, bookmark, dan deep linking berfungsi.

## State Isolation

Setiap micro-frontend sebaiknya memiliki state sendiri. Hindari sharing state global melalui window object kecuali melalui contract yang jelas seperti event bus atau shared context. Praktik terbaik:

- Gunakan event contract yang strongly typed.
- Hindari coupling melalui DOM global atau shared mutable object.
- Pertimbangkan micro-frontend sebagai boundary layanan yang berkomunikasi melalui API atau event.

## Deployment Independence

Independent deployment memerlukan:

- CI/CD pipeline per tim.
- Contract test antara host dan remote.
- Monitoring dan error tracking yang terpisah namun terintegrasi.
- Rollback strategy yang tidak mempengaruhi micro-frontend lain.

## Analogi Service Boundary

Mirip dengan microservices di backend, micro-frontends memiliki bounded context. Komunikasi antar boundary harus melalui interface yang stabil, bukan langsung memanipulasi internal satu sama lain.`,
    },
    {
      id: 'sec-04-go-example',
      type: 'code-example',
      codeExample: {
        id: 'code-04-go',
        filename: 'service_boundary.go',
        language: 'go',
        title: 'Go: Service Boundary dan Contract antara Domain',
        code: `package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

// Catalog service contract
type Product struct {
	ID    string  \`json:"id"\`
	Name  string  \`json:"name"\`
	Price float64 \`json:"price"\`
}

func catalogHandler(w http.ResponseWriter, r *http.Request) {
	products := []Product{
		{ID: "p1", Name: "Kaos", Price: 150000},
		{ID: "p2", Name: "Tas", Price: 250000},
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(products)
}

// Checkout service consumes catalog contract
func checkoutHandler(w http.ResponseWriter, r *http.Request) {
	res, err := http.Get("http://catalog.service/products")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer res.Body.Close()

	var products []Product
	if err := json.NewDecoder(res.Body).Decode(&products); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	fmt.Fprintf(w, "Checkout %d products", len(products))
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/products", catalogHandler)
	mux.HandleFunc("/checkout", checkoutHandler)
	http.ListenAndServe(":8080", mux)
}`,
        explanation:
          'Micro-frontends dapat dianalogikan dengan microservices: setiap domain memiliki contract dan tidak boleh langsung memanipulasi internal domain lain.',
      },
    },
    {
      id: 'sec-04-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Key insight:** Gunakan micro-frontends untuk masalah organisasi dan skala, bukan karena tren. Mulailah dengan monolith yang baik, lalu pisah saat bounded context dan tim sudah jelas. Perhatikan shared dependencies, routing, dan contract antar boundary.',
    },
  ],
}
