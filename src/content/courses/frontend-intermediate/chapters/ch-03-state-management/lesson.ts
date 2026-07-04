import type { Lesson } from '@/content/types'

export const ch03Lesson: Lesson = {
  id: 'lesson-ch-03-state-management',
  estimatedMinutes: 45,
  sections: [
    {
      id: 'sec-03-basic-state',
      type: 'markdown',
      level: 'basic',
      title: 'State Lokal, Global, dan Server State',
      content: `## Memilah Jenis State

Tidak semua state perlu disimpan secara global. Sebelum memilih solusi, tanyakan:

- **State lokal**: hanya dibutuhkan oleh satu komponen atau subtree kecil. Gunakan \`useState\` atau \`useReducer\`.
- **State global**: dibutuhkan oleh banyak komponen yang tersebar di berbagai cabang tree.
- **Server state**: data dari backend seperti daftar pengguna, status autentikasi, atau cache API. Sebaiknya gunakan library khusus seperti TanStack Query.

## Lifting State Up

Ketika dua komponen perlu berbagi state, angkat state ke parent terdekat yang memiliki keduanya. Pola ini disebut **lifting state up**.

\`\`\`jsx
function Parent() {
  const [value, setValue] = useState('')
  return (
    <>
      <Input value={value} onChange={setValue} />
      <Preview value={value} />
    </>
  )
}
\`\`\`

## Prop Drilling

Prop drilling terjadi saat data harus melewati banyak komponen perantara hanya untuk sampai ke komponen yang membutuhkan. Solusinya adalah Context API atau library state management global.`,
    },
    {
      id: 'sec-03-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-03-js',
        filename: 'ThemeContext.jsx',
        language: 'javascript',
        title: 'JavaScript: Context API untuk Tema Tanpa Prop Drilling',
        code: `import { createContext, useContext, useState } from 'react'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function ThemeToggle() {
  const { theme, setTheme } = useContext(ThemeContext)
  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      Beralih ke {theme === 'light' ? 'dark' : 'light'}
    </button>
  )
}

export function ThemedCard({ children }) {
  const { theme } = useContext(ThemeContext)
  return (
    <div className={theme === 'dark' ? 'card-dark' : 'card-light'}>
      {children}
    </div>
  )
}`,
        explanation:
          'Context API memungkinkan ThemeProvider menyediakan tema ke seluruh subtree tanpa perlu melewatkan props melalui setiap level.',
      },
    },
    {
      id: 'sec-03-intermediate-store',
      type: 'markdown',
      level: 'intermediate',
      title: 'Flux, Redux, dan Store Pattern',
      content: `## Prinsip Flux

Flux adalah arsitektur yang dipopulerkan Facebook dengan alur data searah:

1. **Action**: objek deskriptif yang menyatakan apa yang terjadi.
2. **Dispatcher**: menyalurkan action ke store.
3. **Store**: menyimpan state dan logika bisnis.
4. **View**: komponen UI yang subscribe ke store.

## Redux

Redux memperketat Flux dengan tiga prinsip:

- **Single source of truth**: satu store untuk seluruh state aplikasi.
- **State read-only**: satu-satunya cara mengubah state adalah dengan dispatch action.
- **Pure reducer**: perubahan state dihitung oleh pure function.

\`\`\`jsx
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 }
    default:
      return state
  }
}
\`\`\`

## Selectors

Selector adalah fungsi yang mengekstrak atau menghitung derived state dari store. Selector mencegah komputasi berulang dan mempermudah refactoring struktur state.

\`\`\`jsx
const selectTotalPrice = (state) =>
  state.cart.items.reduce((sum, item) => sum + item.price * item.qty, 0)
\`\`\``,
    },
    {
      id: 'sec-03-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-03-ts',
        filename: 'cartStore.ts',
        language: 'typescript',
        title: 'TypeScript: Typed Store Sederhana dengan Selector',
        code: `interface CartItem {
  id: string
  name: string
  price: number
  qty: number
}

interface CartState {
  items: CartItem[]
}

interface CartAction {
  type: 'add' | 'remove'
  payload: CartItem | string
}

const initialState: CartState = { items: [] }

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'add':
      return { items: [...state.items, action.payload as CartItem] }
    case 'remove':
      return {
        items: state.items.filter((i) => i.id !== (action.payload as string)),
      }
    default:
      return state
  }
}

export const selectTotal = (state: CartState): number =>
  state.items.reduce((sum, item) => sum + item.price * item.qty, 0)

export const selectItemCount = (state: CartState): number =>
  state.items.reduce((count, item) => count + item.qty, 0)`,
        explanation:
          'Reducer murni memudahkan testing karena output hanya bergantung pada state dan action. Selector memisahkan logika derived state sehingga komponen tidak perlu menghitung sendiri.',
      },
    },
    {
      id: 'sec-03-advanced-zustand',
      type: 'markdown',
      level: 'advanced',
      title: 'Zustand Internals dan Atomic Stores',
      content: `## Bagaimana Zustand Bekerja

Zustand adalah library state management minimalis yang menggunakan closure untuk membuat store dan subscription. Di balik layar, Zustand menyimpan state di dalam objek internal dan memungkinkan komponen berlangganan melalui selector.

\`\`\`jsx
import { create } from 'zustand'

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}))
\`\`\`

Fungsi \`create\` menerima callback yang memberikan akses ke \`set\`, \`get\`, dan \`subscribe\`. Store dibuat sekali dan persist di luar siklus render React.

## Subscription yang Selektif

Komponen yang menggunakan Zustand dapat memilih bagian state mana yang mereka pantau:

\`\`\`jsx
const count = useStore((state) => state.count)
\`\`\`

Dengan selector, komponen hanya re-render ketika nilai yang dipilih berubah. Zustand membandingkan hasil selector secara default dengan strict equality.

## Atomic Stores

Atomic stores memecah state menjadi unit-unit kecil yang independen. Pola ini kontras dengan single global store besar. Contoh implementasi atomic store adalah Jotai, di mana setiap atom merepresentasikan satu potong state.

Keuntungan atomic stores:

- Update hanya memengaruhi komponen yang subscribe ke atom tersebut.
- Lebih mudah di-compose dan diuji.
- Mengurangi re-render tidak perlu pada komponen yang tidak terkait.`,
    },
    {
      id: 'sec-03-advanced-example',
      type: 'code-example',
      codeExample: {
        id: 'code-03-advanced',
        filename: 'counterStore.ts',
        language: 'typescript',
        title: 'TypeScript: Zustand Store dengan Type Safety',
        code: `import { create } from 'zustand'

type CounterState = {
  count: number
  increment: () => void
  reset: () => void
}

export const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  reset: () => set({ count: 0 }),
}))

function Counter() {
  const count = useCounterStore((state) => state.count)
  const increment = useCounterStore((state) => state.increment)

  return (
    <button type="button" onClick={increment}>
      Hitung: {count}
    </button>
  )
}`,
        explanation:
          'Zustand menyediakan store tersentralisasi dengan API minimal. Selector di useCounterStore memastikan komponen hanya re-render saat slice state yang dipilih berubah, mirip pola subscription pada store manual.',
      },
    },
    {
      id: 'sec-03-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Kesalahan umum:** memindahkan semua state ke global store sejak awal. Mulailah dengan state lokal, naikkan ke parent bila perlu, baru gunakan Context atau library eksternal ketika prop drilling benar-benar menyulitkan maintenance.',
    },
  ],
}
