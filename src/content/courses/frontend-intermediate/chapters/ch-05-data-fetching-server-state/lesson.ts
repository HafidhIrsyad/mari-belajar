import type { Lesson } from '@/content/types'

export const ch05Lesson: Lesson = {
  id: 'lesson-ch-05-data-fetching-server-state',
  estimatedMinutes: 45,
  sections: [
    {
      id: 'sec-05-basic-fetch',
      type: 'markdown',
      level: 'basic',
      title: 'Data Fetching dengan useEffect',
      content: `## Fetching di Komponen React

Paling dasar, data fetching dilakukan di dalam \`useEffect\`. Namun, ada beberapa hal yang perlu diperhatikan:

1. **Race condition**: jika pengguna berpindah cepat, response lama bisa menimpa response baru.
2. **Cleanup**: batalkan request yang tidak lagi relevan dengan AbortController.
3. **Error handling**: tangani error dan tampilkan UI yang sesuai.
4. **Loading state**: beri tahu pengguna bahwa data sedang dimuat.

\`\`\`jsx
useEffect(() => {
  const controller = new AbortController()
  setLoading(true)

  fetch('/api/users', { signal: controller.signal })
    .then((res) => res.json())
    .then(setUsers)
    .catch((err) => {
      if (err.name !== 'AbortError') setError(err)
    })
    .finally(() => setLoading(false))

  return () => controller.abort()
}, [])
\`\`\`

## Client State vs Server State

- **Client state**: state UI seperti tema, modal terbuka, input form.
- **Server state**: data yang dimiliki backend, seperti daftar pengguna, profil, atau transaksi.

Server state sering berubah di luar kendali client, sehingga perlu strategi caching dan sinkronisasi.`,
    },
    {
      id: 'sec-05-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-05-js',
        filename: 'UserList.jsx',
        language: 'javascript',
        title: 'JavaScript: Fetching dengan Race Condition Handling',
        code: `import { useEffect, useState } from 'react'

export function UserList({ page }) {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    let ignore = false
    const controller = new AbortController()
    setLoading(true)

    fetch(\`/api/users?page=\${page}\`, { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        if (!ignore) setUsers(data)
      })
      .catch((err) => {
        if (!ignore && err.name !== 'AbortError') setError(err)
      })
      .finally(() => {
        if (!ignore) setLoading(false)
      })

    return () => {
      ignore = true
      controller.abort()
    }
  }, [page])

  if (loading) return <p>Memuat...</p>
  if (error) return <p>Terjadi kesalahan.</p>
  return (
    <ul>
      {users.map((u) => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  )
}`,
        explanation:
          'Flag ignore mencegah state update dari response yang terlambat. AbortController membatalkan request yang tidak lagi relevan saat dependency berubah.',
      },
    },
    {
      id: 'sec-05-intermediate-tanstack',
      type: 'markdown',
      level: 'intermediate',
      title: 'TanStack Query dan Query Key',
      content: `## Mengapa TanStack Query

TanStack Query (dulu React Query) adalah library untuk mengelola server state. Keuntungannya:

- Caching otomatis berdasarkan query key.
- Background refetch saat window focus atau interval.
- Retry, polling, dan pagination yang mudah.
- Dedup request yang sama.

## Query Key

Query key adalah array yang mengidentifikasi cache. Semakin spesifik key, semakin akurat cache-nya.

\`\`\`jsx
const { data, isLoading } = useQuery({
  queryKey: ['users', page],
  queryFn: () => fetchUsers(page),
})
\`\`\`

Query key digunakan untuk:

- Menyimpan cache.
- Menentukan kapan query perlu di-fetch ulang.
- Mengidentifikasi query saat invalidasi.

## Mutation

Mutation menangani perubahan data di server seperti POST, PUT, DELETE.

\`\`\`jsx
const mutation = useMutation({
  mutationFn: createUser,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['users'] })
  },
})
\`\`\`

Setelah sukses, kita bisa invalidate cache agar data di-fetch ulang.`,
    },
    {
      id: 'sec-05-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-05-ts',
        filename: 'useUsers.ts',
        language: 'typescript',
        title: 'TypeScript: Query dan Mutation dengan TanStack Query',
        code: `import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

interface User {
  id: string
  name: string
  email: string
}

async function fetchUsers(page: number): Promise<User[]> {
  const res = await fetch(\`/api/users?page=\${page}\`)
  if (!res.ok) throw new Error('Failed to fetch')
  return res.json()
}

async function createUser(user: Omit<User, 'id'>): Promise<User> {
  const res = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  })
  if (!res.ok) throw new Error('Failed to create')
  return res.json()
}

export function useUsers(page: number) {
  return useQuery<User[], Error>({
    queryKey: ['users', page],
    queryFn: () => fetchUsers(page),
  })
}

export function useCreateUser() {
  const queryClient = useQueryClient()
  return useMutation<User, Error, Omit<User, 'id'>>({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}`,
        explanation:
          'useQuery mengelola caching dan refetch untuk data users. useCreateUser melakukan invalidasi cache setelah user baru berhasil dibuat.',
      },
    },
    {
      id: 'sec-05-advanced-cache',
      type: 'markdown',
      level: 'advanced',
      title: 'Cache Internals, Optimistic Update, dan Garbage Collection',
      content: `## Struktur Cache TanStack Query

TanStack Query menyimpan cache dalam bentuk map yang diindeks oleh query key yang telah di-hash. Setiap query memiliki state seperti:

- \`data\`: hasil terakhir.
- \`status\`: pending, error, atau success.
- \`fetchStatus\`: fetching, paused, atau idle.
- \`error\`: error terakhir.
- \`dataUpdatedAt\`: timestamp pembaruan data.

## Stale-While-Revalidate

Default behavior TanStack Query adalah stale-while-revalidate: data lama tetap ditampilkan sementara data baru di-fetch di background. Ini memberikan UX yang cepat dan responsif.

## Optimistic Update

Optimistic update memperbarui cache sebelum server merespons. Jika gagal, cache dikembalikan ke nilai semula.

\`\`\`jsx
useMutation({
  mutationFn: updateTodo,
  onMutate: async (newTodo) => {
    await queryClient.cancelQueries({ queryKey: ['todos', newTodo.id] })
    const previous = queryClient.getQueryData(['todos', newTodo.id])
    queryClient.setQueryData(['todos', newTodo.id], newTodo)
    return { previous }
  },
  onError: (err, newTodo, context) => {
    queryClient.setQueryData(['todos', newTodo.id], context.previous)
  },
})
\`\`\`

## Garbage Collection

Query yang tidak lagi digunakan oleh komponen akan di-cache untuk sementara. Setelah \`gcTime\` berlalu, query dihapus dari cache untuk menghemat memori.`,
    },
    {
      id: 'sec-05-advanced-example',
      type: 'code-example',
      codeExample: {
        id: 'code-05-advanced',
        filename: 'UserProfile.tsx',
        language: 'typescript',
        title: 'TanStack Query: useQuery dengan Cache Key',
        code: `import { useQuery } from '@tanstack/react-query'

type User = { id: string; name: string; email: string }

async function fetchUser(id: string): Promise<User> {
  const response = await fetch(\`/api/users/\${id}\`)
  if (!response.ok) throw new Error('Gagal memuat user')
  return response.json()
}

function UserProfile({ userId }: { userId: string }) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['users', userId],
    queryFn: () => fetchUser(userId),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })

  if (isLoading) return <p>Memuat...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <section>
      <h2>{data.name}</h2>
      <p>{data.email}</p>
      <button type="button" onClick={() => refetch()}>Refresh</button>
    </section>
  )
}`,
        explanation:
          'TanStack Query mengelola server state dengan queryKey sebagai indeks cache. staleTime menentukan kapan data dianggap usang, gcTime mengontrol berapa lama cache disimpan setelah tidak digunakan — menggantikan implementasi cache manual.',
      },
    },
    {
      id: 'sec-05-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Kesalahan umum:** menyimpan server state di useState dan mengabaikan caching. Server state adalah sumber kebenaran di backend; biarkan TanStack Query mengelola cache, refetch, dan invalidasi agar UI selalu sinkron tanpa boilerplate besar.',
    },
  ],
}
