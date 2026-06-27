import type { Lesson } from '@/content/types'

export const ch01Lesson: Lesson = {
  id: 'lesson-ch-01-performance-optimization',
  estimatedMinutes: 45,
  sections: [
    {
      id: 'sec-01-basic',
      type: 'markdown',
      level: 'basic',
      title: 'Code Splitting, Lazy Loading, dan Image Optimization',
      content: `## Mengapa Performa Frontend Penting

Performa tidak hanya tentang kecepatan, tetapi juga retensi pengguna, konversi, dan ranking pencarian. Setiap detik keterlambatan dapat meningkatkan bounce rate secara signifikan.

## Code Splitting

Code splitting adalah teknik membagi bundle JavaScript besar menjadi beberapa chunk kecil sehingga browser hanya mengunduh kode yang diperlukan untuk rute atau interaksi saat itu. Ada dua pendekatan utama:

1. **Route-based splitting**: memisahkan bundle per rute.
2. **Component-based splitting**: memisahkan komponen besar yang tidak selalu ditampilkan.

## Lazy Loading

Lazy loading menunda pengambilan resource sampai dibutuhkan. Contoh umum:

- Gambar di bawah fold dengan atribut \`loading="lazy"\`.
- Komponen React dengan \`React.lazy\` dan \`Suspense\`.
- Modul third-party yang hanya muncul setelah interaksi.

## Image dan Font Optimization

Gambar sering menjadi resource terbesar. Praktik terbaik:

- Gunakan format modern (WebP, AVIF) dengan fallback.
- Sediakan \`srcset\` untuk responsive images.
- Gunakan \`fetchpriority="high"\` untuk hero image LCP.
- Preload font kritis untuk menghindari flash of unstyled text.`,
    },
    {
      id: 'sec-01-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-01-js',
        filename: 'LazyDashboard.jsx',
        language: 'javascript',
        title: 'JavaScript: Lazy Route dan Image Lazy Loading',
        code: `import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

const HeavyDashboard = lazy(() => import('./HeavyDashboard'))
const Reports = lazy(() => import('./Reports'))

function App() {
  return (
    <Suspense fallback={<p>Memuat halaman...</p>}>
      <Routes>
        <Route path="/dashboard" element={<HeavyDashboard />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </Suspense>
  )
}

function ProductGallery({ products }) {
  return (
    <ul className="grid">
      {products.map((product) => (
        <li key={product.id}>
          <img
            src={product.thumbnail}
            alt={product.name}
            loading="lazy"
            width={320}
            height={240}
          />
        </li>
      ))}
    </ul>
  )
}

export default App`,
        explanation:
          'React.lazy memisahkan bundle per rute sehingga kode dashboard dan reports tidak diunduh saat pertama kali membuka aplikasi. Atribut loading="lazy" menunda pengambilan gambar sampai mendekati viewport.',
      },
    },
    {
      id: 'sec-01-intermediate',
      type: 'markdown',
      level: 'intermediate',
      title: 'Web Vitals, INP, dan Prefetching',
      content: `## Core Web Vitals

Core Web Vitals adalah tiga metrik utama dari Google untuk mengukur pengalaman pengguna:

- **LCP (Largest Contentful Paint)**: waktu render elemen konten terbesar. Target \`< 2.5s\`.
- **INP (Interaction to Next Paint)**: metrik responsivitas interaktif yang menggantikan FID. Target \`< 200ms\`.
- **CLS (Cumulative Layout Shift)**: stabilitas visual akumulatif. Target \`< 0.1\`.

## INP secara Detail

INP mengukur latensi dari semua interaksi pengguna selama halaman aktif dan melaporkan nilai persentil ke-75. Komponennya:

1. **Input delay**: waktu menunggu main thread bebas.
2. **Processing time**: waktu eksekusi event handler.
3. **Presentation delay**: waktu hingga frame berikutnya dipresentasikan.

Long tasks di main thread adalah musuh utama INP. Fragmentasi tugas besar dengan \`scheduler.yield()\` atau memindahkan komputasi ke Web Worker dapat membantu.

## Prefetch dan Preload

- \`<link rel="preload">\`: unduh resource kritis segera (font, hero image, critical CSS).
- \`<link rel="prefetch">\`: unduh resource untuk navigasi berikutnya dengan prioritas rendah.
- \`<link rel="preconnect">\`: buat koneksi TCP/TLS lebih awal ke domain pihak ketiga.

Prefetch harus digunakan hanya untuk rute yang kemungkinan besar dibuka berikutnya agar tidak memboroskan bandwidth.`,
    },
    {
      id: 'sec-01-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-01-ts',
        filename: 'PerformanceObserver.tsx',
        language: 'typescript',
        title: 'TypeScript: Mengamati INP dan LCP dengan PerformanceObserver',
        code: `import { useEffect } from 'react'

type WebVitalName = 'LCP' | 'INP' | 'CLS'

interface WebVitalMetric {
  name: WebVitalName
  value: number
  id: string
}

function sendToAnalytics(metric: WebVitalMetric) {
  fetch('/api/vitals', {
    method: 'POST',
    body: JSON.stringify(metric),
    keepalive: true,
  })
}

export function useWebVitals() {
  useEffect(() => {
    if (!('PerformanceObserver' in window)) return

    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'web-vitals') {
          const metric = entry as unknown as WebVitalMetric
          sendToAnalytics(metric)
        }
      }
    })

    try {
      observer.observe({ type: 'web-vitals', buffered: true })
    } catch {
      // Fallback untuk browser lama
    }

    return () => observer.disconnect()
  }, [])
}

// Penggunaan:
// function Layout() {
//   useWebVitals()
//   return <main>...</main>
// }`,
        explanation:
          'PerformanceObserver dengan entryType web-vitals memungkinkan aplikasi mengumpulkan metrik LCP, INP, dan CLS secara real-time untuk analisis RUM.',
      },
    },
    {
      id: 'sec-01-advanced',
      type: 'markdown',
      level: 'advanced',
      title: 'Critical CSS, Streaming SSR, dan Edge Caching',
      content: `## Critical CSS

Critical CSS adalah subset CSS yang dibutuhkan untuk merender konten above-the-fold. Dengan meng-inline critical CSS di \`<head>\`, browser tidak perlu menunggu stylesheet eksternal sebelum first paint. Trade-off:

- Mengurangi request blocking.
- Menambah ukuran HTML jika inline terlalu besar.
- Memerlukan build tool seperti Critters atau Penthouse.

## Streaming SSR

Server-Side Rendering tradisional menunggu seluruh HTML selesai dirender sebelum mengirim respons. Streaming SSR memecah respons menjadi chunk sehingga browser dapat mulai parsing dan merender sebagian UI lebih awal.

Dalam React, \`renderToPipeableStream\` memungkinkan HTML dikirim secara bertahap sambil menunggu data dari server. Suspense boundaries memisahkan bagian yang dapat streaming dari yang memerlukan data.

## Edge Caching

Edge caching menyimpan hasil render di CDN edge location terdekat dengan pengguna. Keuntungannya:

- Mengurangi TTFB (Time to First Byte).
- Mengurangi beban server origin.
- Memungkinkan stale-while-revalidate untuk konten semi-dinamis.

## RUM vs Lab Data

- **Lab data**: diukur di lingkungan terkontrol (Lighthouse, CI). Reproducible tetapi mungkin tidak merepresentasikan perangkat pengguna nyata.
- **RUM (Real User Monitoring)**: diukur dari browser pengguna sebenarnya. Lebih akurat untuk segmentasi perangkat dan jaringan, tetapi bervariasi.`,
    },
    {
      id: 'sec-01-go-example',
      type: 'code-example',
      codeExample: {
        id: 'code-01-go',
        filename: 'cache_headers.go',
        language: 'go',
        title: 'Go: HTTP Cache Headers untuk Aset Statis',
        code: `package main

import (
	"fmt"
	"net/http"
	"time"
)

func staticFileHandler(w http.ResponseWriter, r *http.Request) {
	// Aset dengan hash di nama file dapat di-cache sangat lama
	w.Header().Set("Cache-Control", "public, max-age=31536000, immutable")
	w.Header().Set("Vary", "Accept-Encoding")
	fmt.Fprintln(w, "/* hashed-asset.css */")
}

func htmlHandler(w http.ResponseWriter, r *http.Request) {
	// HTML halaman di-cache singkat dengan stale-while-revalidate
	w.Header().Set("Cache-Control", "public, max-age=60, stale-while-revalidate=300")
	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	w.WriteHeader(http.StatusOK)
	fmt.Fprintf(w, "<html><body>Generated at %s</body></html>", time.Now().Format(time.RFC3339))
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/static/", staticFileHandler)
	mux.HandleFunc("/", htmlHandler)

	fmt.Println("Server listening on :8080")
	http.ListenAndServe(":8080", mux)
}`,
        explanation:
          'Strategi cache yang berbeda untuk aset statis (immutable, long-term) dan HTML halaman (short-term dengan stale-while-revalidate) mengoptimalkan penggunaan CDN dan browser cache.',
      },
    },
    {
      id: 'sec-01-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Best practice 2026:** Gunakan INP sebagai metrik responsivitas utama, fragmentasikan long tasks di main thread, in-line critical CSS, dan terapkan cache policy yang berbeda antara HTML halaman dan aset berhash. Selalu validasi dengan campuran lab data dan RUM.',
    },
  ],
}
