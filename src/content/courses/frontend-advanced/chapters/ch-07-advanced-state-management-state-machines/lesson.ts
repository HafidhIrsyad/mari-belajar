import type { Lesson } from '@/content/types'

export const ch07Lesson: Lesson = {
  id: 'lesson-ch-07-advanced-state-management-state-machines',
  estimatedMinutes: 50,
  sections: [
    {
      id: 'sec-07-basic',
      type: 'markdown',
      level: 'basic',
      title: 'Lifting State, Prop Drilling, dan Context API',
      content: `## Recap State Management

State management di React dimulai dari lokal \`useState\`, lalu naik ke parent (lifting state up). Ketika state dibutuhkan oleh banyak komponen yang jauh dalam tree, prop drilling menjadi tidak praktis.

## Context API

Context API menyediakan cara untuk menyebarkan state tanpa prop drilling. Cocok untuk:

- Tema, locale, autentikasi.
- State yang jarang berubah.

Keterbatasan:

- Setiap perubahan context memicu re-render semua konsumen.
- Tidak cocok untuk state yang sering berubah atau kompleks.

## Composition Pattern

Sebelum mencapai library state management, pertimbangkan composition. Memindahkan state ke komponen induk dan menyebarkan data melalui children dapat mengurangi kebutuhan global store.`,
    },
    {
      id: 'sec-07-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-07-js',
        filename: 'NormalizedStore.js',
        language: 'javascript',
        title: 'JavaScript: Normalized State Shape',
        code: `const store = {
  users: {
    byId: {
      u1: { id: 'u1', name: 'Andi' },
      u2: { id: 'u2', name: 'Budi' },
    },
    allIds: ['u1', 'u2'],
  },
  posts: {
    byId: {
      p1: { id: 'p1', title: 'React State', authorId: 'u1' },
      p2: { id: 'p2', title: 'TypeScript Tips', authorId: 'u2' },
    },
    allIds: ['p1', 'p2'],
  },
}

function selectPostWithAuthor(state, postId) {
  const post = state.posts.byId[postId]
  const author = state.users.byId[post.authorId]
  return { ...post, author }
}

console.log(selectPostWithAuthor(store, 'p1'))`,
        explanation:
          'State yang dinormalisasi menyimpan entitas sebagai map berdasarkan ID. Relasi antar entitas direpresentasikan dengan ID, bukan objek bersarang, sehingga update lebih mudah dan konsisten.',
      },
    },
    {
      id: 'sec-07-intermediate',
      type: 'markdown',
      level: 'intermediate',
      title: 'Optimistic Updates, Selectors, dan Persistence',
      content: `## Optimistic Updates

Optimistic update adalah teknik memperbarui UI sebelum request server berhasil, memberikan respons yang terasa instan. Risikonya adalah jika server gagal, UI harus di-rollback.

Alur yang aman:

1. Simpan state sebelumnya.
2. Terapkan perubahan optimistik.
3. Kirim request ke server.
4. Jika sukses, konfirmasi perubahan (atau sync ulang).
5. Jika gagal, kembalikan state sebelumnya dan tampilkan error.

## Selectors dan Memoization

Selectors adalah fungsi yang mengekstrak atau menghitung derived state. Tanpa memoization, selector dijalankan ulang setiap render.

Dengan Zustand, selector dapat diteruskan langsung ke hook store. Dengan Redux, \`reselect\` menyediakan \`createSelector\` untuk memoization.

## Persistence dan Hydration

Menyimpan state ke storage dapat meningkatkan UX, tetapi perlu diperhatikan:

- Jangan menyimpan data sensitif seperti token di localStorage.
- Validasi state yang di-hydrate karena bisa saja usang atau corrupt.
- Pertimbangkan versioned storage untuk migrasi schema.`,
    },
    {
      id: 'sec-07-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-07-ts',
        filename: 'ZustandSlice.ts',
        language: 'typescript',
        title: 'TypeScript: Zustand Slice dengan Undoable State',
        code: `import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface Task {
  id: string
  title: string
  done: boolean
}

interface TaskState {
  present: Task[]
  past: Task[][]
  future: Task[][]
  addTask: (title: string) => void
  toggleTask: (id: string) => void
  undo: () => void
  redo: () => void
}

export const useTaskStore = create<TaskState>()(
  devtools((set) => ({
    present: [],
    past: [],
    future: [],
    addTask: (title) =>
      set((state) => {
        const next = [...state.present, { id: crypto.randomUUID(), title, done: false }]
        return { present: next, past: [...state.past, state.present], future: [] }
      }),
    toggleTask: (id) =>
      set((state) => {
        const next = state.present.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
        return { present: next, past: [...state.past, state.present], future: [] }
      }),
    undo: () =>
      set((state) => {
        if (state.past.length === 0) return state
        const previous = state.past[state.past.length - 1]
        const newPast = state.past.slice(0, -1)
        return {
          present: previous,
          past: newPast,
          future: [state.present, ...state.future],
        }
      }),
    redo: () =>
      set((state) => {
        if (state.future.length === 0) return state
        const next = state.future[0]
        const newFuture = state.future.slice(1)
        return {
          present: next,
          past: [...state.past, state.present],
          future: newFuture,
        }
      }),
  }))
)`,
        explanation:
          'Pola undo/redo menggunakan tiga array: past, present, dan future. Setiap mutasi menyimpan state sebelumnya di past dan mengosongkan future.',
      },
    },
    {
      id: 'sec-07-advanced',
      type: 'markdown',
      level: 'advanced',
      title: 'State Machines, Statecharts, dan Cross-Tab Sync',
      content: `## State Machines

State machine adalah model komputasi di mana sistem berada dalam satu state pada satu waktu dan bertransisi ke state lain berdasarkan event. Keuntungan:

- State transitions eksplisit dan terdokumentasi.
- Mustahil berada di state yang tidak valid.
- Mudah diuji karena logika terpusat.

Contoh state machine untuk form submission:

\`\`\`ts
type State =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: unknown }
  | { status: 'error'; error: Error }
\`\`\`

## Statecharts

Statecharts memperluas state machine dengan:

- **Hierarchical states**: state yang memiliki sub-state.
- **Parallel states**: beberapa state machine berjalan bersamaan.
- **Guards**: kondisi yang menentukan apakah transisi diizinkan.
- **Actions**: efek samping yang dijalankan saat transisi atau masuk/keluar state.

Library seperti XState memudahkan implementasi statecharts di React.

## Atomic State Design

Atomic state adalah pendekatan memecah state menjadi unit kecil yang independen. Keuntungannya:

- Meningkatkan reusability.
- Mengurangi re-render karena komponen hanya subscribe ke atom yang relevan.
- Library: Jotai dan Recoil.

## Cross-Tab dan Worker Sync

- **BroadcastChannel API**: sinkronisasi state antar tab browser.
- **SharedWorker/Web Worker**: menjalankan state machine atau komputasi di thread terpisah untuk menghindari blocking main thread.

Time-travel debugging menjadi lebih mudah dengan state machine karena setiap transisi terekam secara eksplisit.`,
    },
    {
      id: 'sec-07-advanced-example',
      type: 'code-example',
      codeExample: {
        id: 'code-07-advanced',
        filename: 'submitMachine.ts',
        language: 'typescript',
        title: 'XState: State Machine untuk Async Form Submission',
        code: `import { createMachine } from 'xstate'

export const submitMachine = createMachine({
  id: 'submit',
  initial: 'idle',
  states: {
    idle: {
      on: { SUBMIT: 'loading' },
    },
    loading: {
      on: {
        SUCCESS: 'success',
        ERROR: 'error',
      },
    },
    success: {
      on: { RESET: 'idle' },
    },
    error: {
      on: { RESET: 'idle' },
    },
  },
})

// Transisi eksplisit mencegah state invalid seperti
// loading → idle tanpa event RESET yang didefinisikan.`,
        explanation:
          'XState memodelkan alur async sebagai state machine dengan transisi yang eksplisit. Setiap event hanya valid dari state tertentu, sehingga edge case seperti double-submit atau transisi illegal dapat dicegah di level definisi, bukan dengan if-else defensif.',
      },
    },
    {
      id: 'sec-07-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Key insight:** Normalisasi state untuk data relational, gunakan optimistic updates untuk UX yang responsif, dan modelkan alur kompleks dengan state machines. Untuk state yang sangat granular, pertimbangkan atomic state libraries. Selalu pertimbangkan keamanan saat mem-persist state.',
    },
  ],
}
