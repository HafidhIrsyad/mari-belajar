import type { Lesson } from '@/content/types'

export const ch04Lesson: Lesson = {
  id: 'lesson-ch-04-routing',
  estimatedMinutes: 40,
  sections: [
    {
      id: 'sec-04-basic-routing',
      type: 'markdown',
      level: 'basic',
      title: 'Deklaratif Routing dengan React Router',
      content: `## BrowserRouter dan Routes

React Router adalah library standar untuk routing di aplikasi React. \`BrowserRouter\` menggunakan History API, sementara \`Routes\` memilih \`Route\` pertama yang cocok dengan URL.

\`\`\`jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
\`\`\`

## Link dan NavLink

Gunakan \`Link\` untuk navigasi tanpa reload halaman. \`NavLink\` menambahkan class aktif saat URL cocok.

\`\`\`jsx
<NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>
  Tentang
</NavLink>
\`\`\`

## Dynamic Route

Segmen URL dapat dibuat dinamis dengan parameter:

\`\`\`jsx
<Route path="/products/:productId" element={<ProductDetail />} />
\`\`\`

Di dalam komponen, \`useParams\` membaca nilai parameter.`,
    },
    {
      id: 'sec-04-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-04-js',
        filename: 'AppRoutes.jsx',
        language: 'javascript',
        title: 'JavaScript: Routes, Outlet, dan Navigasi Programatis',
        code: `import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Link,
  useParams,
  useNavigate,
} from 'react-router-dom'

function Layout() {
  return (
    <div>
      <nav>
        <Link to="/">Beranda</Link>
        <Link to="/products">Produk</Link>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

function ProductDetail() {
  const { productId } = useParams()
  const navigate = useNavigate()

  return (
    <section>
      <h1>Produk {productId}</h1>
      <button onClick={() => navigate('/products')}>
        Kembali ke Daftar
      </button>
    </section>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<ProductList />} />
          <Route path="products/:productId" element={<ProductDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App`,
        explanation:
          'Layout merender Outlet sebagai tempat child routes muncul. ProductDetail membaca productId dari URL dan dapat mengarahkan pengguna secara programatis dengan useNavigate.',
      },
    },
    {
      id: 'sec-04-intermediate-protected',
      type: 'markdown',
      level: 'intermediate',
      title: 'Nested Routes, Protected Routes, dan Search Params',
      content: `## Nested Routes dan Outlet

Nested routes memungkinkan UI yang memiliki layout bersama. Parent route merender \`Outlet\` dan React Router akan meletakkan child route yang cocok di dalamnya.

\`\`\`jsx
<Route path="/dashboard" element={<DashboardLayout />}>
  <Route index element={<DashboardHome />} />
  <Route path="settings" element={<Settings />} />
</Route>
\`\`\`

## Protected Route

Protected route memeriksa kondisi autentikasi sebelum merender konten. Jika tidak lolos, komponen mengarahkan ke halaman login.

\`\`\`jsx
function ProtectedRoute({ children }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  return children
}
\`\`\`

## Search Params

\`useSearchParams\` membaca dan menulis query string URL. Ini berguna untuk filter, pagination, atau tab state.

\`\`\`jsx
const [searchParams, setSearchParams] = useSearchParams()
const page = Number(searchParams.get('page') || '1')
\`\`\``,
    },
    {
      id: 'sec-04-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-04-ts',
        filename: 'ProtectedRoute.tsx',
        language: 'typescript',
        title: 'TypeScript: Protected Route dengan Role',
        code: `import { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

interface AuthUser {
  id: string
  role: 'admin' | 'member'
}

interface ProtectedRouteProps {
  user: AuthUser | null
  requiredRole?: 'admin' | 'member'
  children: ReactNode
}

export function ProtectedRoute({
  user,
  requiredRole,
  children,
}: ProtectedRouteProps) {
  const location = useLocation()

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />
  }

  return <>{children}</>
}

// Penggunaan
<Route
  path="/admin"
  element={
    <ProtectedRoute user={currentUser} requiredRole="admin">
      <AdminPanel />
    </ProtectedRoute>
  }
/>`,
        explanation:
          'ProtectedRoute menerima user dan role yang diperlukan. Jika tidak memenuhi syarat, pengguna dialihkan. state from memungkinkan redirect kembali setelah login.',
      },
    },
    {
      id: 'sec-04-advanced-data-api',
      type: 'markdown',
      level: 'advanced',
      title: 'React Router Data APIs: Loader dan Action',
      content: `## Loader

Di React Router v6.4+, route dapat mendefinisikan \`loader\` untuk mengambil data sebelum komponen dirender. Data diakses melalui \`useLoaderData\`.

\`\`\`jsx
const productLoader = async ({ params }) => {
  const res = await fetch('/api/products/' + params.productId)
  if (!res.ok) throw new Response('Not Found', { status: 404 })
  return res.json()
}

<Route path="products/:productId" element={<ProductDetail />} loader={productLoader} />
\`\`\`

## Action

\`action\` menangani submission form. Saat form disubmit, React Router memanggil action terlebih dahulu, lalu melakukan revalidation.

\`\`\`jsx
const loginAction = async ({ request }) => {
  const formData = await request.formData()
  const email = formData.get('email')
  // proses login
  return redirect('/dashboard')
}
\`\`\`

## Navigation State

\`useNavigation\` memberi tahu apakah aplikasi sedang dalam proses loading atau submitting. Ini memudahkan implementasi loading indicator global.

\`\`\`jsx
const navigation = useNavigation()
const isLoading = navigation.state === 'loading'
\`\`\`

## Revalidation

Setelah action berhasil, React Router secara default akan revalidasi loader yang aktif. Ini memastikan UI menampilkan data terbaru tanpa perlu mengatur state manual.`,
    },
    {
      id: 'sec-04-go-example',
      type: 'code-example',
      codeExample: {
        id: 'code-04-go',
        filename: 'router.go',
        language: 'go',
        title: 'Go: Router Sederhana dengan Middleware Autentikasi',
        code: `package main

import (
	"fmt"
	"net/http"
	"strings"
)

func authMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		cookie, err := r.Cookie("session")
		if err != nil || cookie.Value == "" {
			http.Redirect(w, r, "/login", http.StatusFound)
			return
		}
		next.ServeHTTP(w, r)
	})
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintln(w, "Home")
	})
	mux.HandleFunc("/admin/", func(w http.ResponseWriter, r *http.Request) {
		id := strings.TrimPrefix(r.URL.Path, "/admin/")
		fmt.Fprintf(w, "Admin panel for %s\\n", id)
	})

	http.ListenAndServe(":8080", authMiddleware(mux))
}`,
        explanation:
          'Meskipun routing frontend berbeda dengan backend, konsep protected route dan middleware autentikasi serupa. Go menyaring request sebelum mencapai handler, mirip dengan ProtectedRoute yang mengganti element.',
      },
    },
    {
      id: 'sec-04-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Key insight:** Gunakan loader dan action React Router untuk memisahkan logika data fetching dan mutation dari komponen. Ini mengurangi boilerplate useEffect/useState dan memanfaatkan mekanisme revalidation bawaan router.',
    },
  ],
}
