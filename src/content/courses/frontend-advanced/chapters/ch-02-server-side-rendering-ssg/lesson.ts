import type { Lesson } from '@/content/types'

export const ch02Lesson: Lesson = {
  id: 'lesson-ch-02-server-side-rendering-ssg',
  estimatedMinutes: 45,
  sections: [
    {
      id: 'sec-02-basic',
      type: 'markdown',
      level: 'basic',
      title: 'CSR vs SSR vs SSG',
      content: `## Rendering di Frontend Modern

Ada beberapa strategi rendering konten web. Masing-masing memiliki trade-off yang berbeda antara waktu muat, interaktivitas, kompleksitas, dan freshness konten.

### Client-Side Rendering (CSR)

Browser mengunduh HTML kosong atau minimal, kemudian mengunduh dan mengeksekusi JavaScript untuk membangun DOM. Keunggulan:

- Transisi halaman cepat setelah bundle siap.
- Cocok untuk aplikasi yang sangat interaktif.

Kekurangan:

- First paint lambat jika bundle besar.
- SEO dapat terganggu jika crawler tidak menunggu JavaScript.

### Server-Side Rendering (SSR)

Server merender HTML lengkap untuk setiap request. Browser menerima HTML yang dapat segera ditampilkan, lalu JavaScript melakukan hydrasi.

### Static Site Generation (SSG)

HTML dibuat saat build time untuk semua halaman. Hasilnya dapat disajikan dari CDN dengan performa tertinggi, tetapi konten dinamis memerlukan rebuild atau ISR.

### Incremental Static Regeneration (ISR)

SSR/SSG hybrid yang memungkinkan halaman statis diperbarui di latar belakang tanpa rebuild seluruh situs.`,
    },
    {
      id: 'sec-02-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-02-js',
        filename: 'CsrDashboard.jsx',
        language: 'javascript',
        title: 'JavaScript: Dashboard CSR dengan Fetch di useEffect',
        code: `import { useEffect, useState } from 'react'

function CsrDashboard() {
  const [metrics, setMetrics] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/metrics')
      .then((res) => res.json())
      .then((data) => {
        setMetrics(data)
        setLoading(false)
      })
  }, [])

  if (loading) return <p>Memuat metrik...</p>

  return (
    <section>
      <h1>Dashboard Performa</h1>
      <dl>
        <dt>LCP</dt>
        <dd>{metrics.lcp}ms</dd>
        <dt>INP</dt>
        <dd>{metrics.inp}ms</dd>
      </dl>
    </section>
  )
}

export default CsrDashboard`,
        explanation:
          'Pendekatan CSR menunggu JavaScript dieksekusi sebelum mengambil data dan merender konten. Ini dapat menyebabkan layout shift dan keterlambatan first contentful paint.',
      },
    },
    {
      id: 'sec-02-intermediate',
      type: 'markdown',
      level: 'intermediate',
      title: 'Hydrasi, Server Components, dan Data Fetching',
      content: `## Proses Hydrasi

Hydrasi adalah proses di mana React (atau framework lain) membaca HTML yang sudah dirender server, lalu menyusun ulang virtual DOM, menambahkan event listener, dan menghubungkan state. Proses ini dapat mahal karena:

- Seluruh komponen di kompilasi ke bundle client.
- Hydrasi memerlukan JavaScript parsing dan eksekusi besar.
- Terjadi duplikasi pekerjaan: server sudah render, client harus render ulang.

## React Server Components (RSC)

RSC adalah komponen React yang dieksekusi hanya di server. Mereka:

- Dapat mengakses resource server secara langsung (database, file system, API internal).
- Tidak memerlukan hydrasi karena tidak menghasilkan bundle JavaScript client.
- Tidak memiliki state, efek, atau akses ke browser API.

RSC memisahkan komponen menjadi dua kategori:

1. **Server Components**: default di App Router Next.js, tidak dihydrasi.
2. **Client Components**: ditandai dengan \`"use client"\`, dapat menggunakan hooks dan DOM API.

## Data Fetching Pattern

Di App Router Next.js, data fetching dapat dilakukan langsung di Server Component dengan async/await. Pola ini menghilangkan prop drilling data dari page ke komponen.`,
    },
    {
      id: 'sec-02-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-02-ts',
        filename: 'ServerDashboard.tsx',
        language: 'typescript',
        title: 'TypeScript: Server Component dengan Async Data Fetching',
        code: `interface Metric {
  name: string
  value: number
  unit: string
}

async function getMetrics(): Promise<Metric[]> {
  const res = await fetch('https://api.example.com/metrics', {
    next: { revalidate: 60 },
  })
  if (!res.ok) throw new Error('Gagal memuat metrik')
  return res.json()
}

export default async function ServerDashboard() {
  const metrics = await getMetrics()

  return (
    <section>
      <h1>Dashboard Performa</h1>
      <dl>
        {metrics.map((metric) => (
          <div key={metric.name}>
            <dt>{metric.name}</dt>
            <dd>
              {metric.value}
              {metric.unit}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

// Komponen ini berjalan di server, tidak menambah bundle client,
// dan dapat langsung mengakses data tanpa useEffect.`,
        explanation:
          'Server Component dapat berupa fungsi async yang mengambil data di server. Hasilnya adalah HTML statis yang dikirim ke client tanpa perlu hydrasi komponen ini.',
      },
    },
    {
      id: 'sec-02-advanced',
      type: 'markdown',
      level: 'advanced',
      title: 'Streaming SSR, Partial Prerendering, dan Edge Runtime',
      content: `## Streaming SSR

Streaming SSR memungkinkan server mengirimkan HTML secara bertahap. Daripada menunggu seluruh halaman selesai dirender, server mengirim shell statis terlebih dahulu, lalu mengirim placeholder untuk bagian yang memuat data, dan akhirnya mengirim data tersebut ketika siap.

Di React, \`renderToPipeableStream\` dan \`Suspense\` boundaries adalah fondasi streaming. Framework seperti Next.js App Router menangani detail ini secara otomatis.

## Partial Prerendering (PPR)

PPR adalah strategi rendering yang menggabungkan:

- **Static shell**: bagian halaman yang dapat diprerender saat build time.
- **Dynamic holes**: bagian yang memerlukan data real-time dan distream saat runtime.

Keuntungan PPR:

- Mengirimkan konten statis segera dari edge cache.
- Mengurangi beban server karena hanya bagian dinamis yang diproses per request.
- Memberikan pengalaman seperti SSG dengan kemampuan personalisasi SSR.

## Edge Runtime

Edge runtime adalah environment JavaScript yang berjalan di CDN edge nodes. Karakteristiknya:

- Latensi rendah karena dekat dengan pengguna.
- Cold start sangat cepat.
- Memiliki keterbatasan API dan durasi eksekusi.
- Cocok untuk A/B testing, geolocation, personalization ringan, dan middleware.

Edge runtime berbeda dengan Node.js runtime tradisional karena didesain untuk startup cepat dan isolasi request.`,
    },
    {
      id: 'sec-02-advanced-example',
      type: 'code-example',
      codeExample: {
        id: 'code-02-advanced',
        filename: 'app/dashboard/page.tsx',
        language: 'typescript',
        title: 'Next.js App Router: Server Component Async Page',
        code: `// app/dashboard/page.tsx
type Metrics = { LCP: number; INP: number; CLS: number }

async function getMetrics(): Promise<Metrics> {
  const res = await fetch('https://api.example.com/metrics', {
    next: { revalidate: 60 }, // ISR: revalidate setiap 60 detik
  })
  if (!res.ok) throw new Error('Gagal memuat metrik')
  return res.json()
}

export default async function DashboardPage() {
  const metrics = await getMetrics()

  return (
    <main>
      <h1>Dashboard Performa</h1>
      <ul>
        {Object.entries(metrics).map(([key, value]) => (
          <li key={key}>
            {key}: {value}ms
          </li>
        ))}
      </ul>
    </main>
  )
}`,
        explanation:
          'App Router Next.js merender halaman di server sebagai React Server Component. Data di-fetch di server sebelum HTML dikirim ke browser, sehingga pengguna melihat konten lebih cepat tanpa menunggu hydrasi client-side.',
      },
    },
    {
      id: 'sec-02-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Key insight:** Gunakan Server Components untuk mengurangi bundle client dan menghindari hydrasi yang tidak perlu. Gunakan streaming dan partial prerendering untuk mengirim konten secepat mungkin tanpa menunggu data lambat. Pilih runtime (Node vs edge) berdasarkan latensi, durasi, dan kebutuhan API.',
    },
  ],
}
