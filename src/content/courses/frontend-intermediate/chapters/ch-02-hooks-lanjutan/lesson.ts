import type { Lesson } from '@/content/types'

export const ch02Lesson: Lesson = {
  id: 'lesson-ch-02-hooks-lanjutan',
  estimatedMinutes: 40,
  sections: [
    {
      id: 'sec-02-basic-hooks',
      type: 'markdown',
      level: 'basic',
      title: 'Aturan dan Dasar Hooks',
      content: `## Mengapa Hooks Harus Dipanggil dengan Teratur

React menyimpan state hooks dalam array internal yang diindeks berdasarkan urutan pemanggilan pada setiap render. Itulah sebabnya hooks harus dipanggil di level atas komponen dan tidak boleh di dalam kondisi, loop, atau fungsi bersarang.

Aturan utama:

1. **Panggil hooks hanya di React function** atau custom hooks, bukan di fungsi biasa atau class.
2. **Panggil hooks di level atas**, jangan setelah \`if\` atau \`for\`.
3. **Jangan panggil hooks secara kondisional** karena akan mengacaukan indeks internal React.

## useState

\`useState\` mengembalikan pasangan nilai dan fungsi updater. Saat setter dipanggil, React menjadwalkan re-render dengan nilai state yang baru.

\`\`\`jsx
const [count, setCount] = useState(0)

// Functional update untuk menghindari stale state
setCount((prev) => prev + 1)
\`\`\`

## useEffect

\`useEffect\` menangani efek samping seperti subscribe, fetch, atau manipulasi DOM. Dependency array menentukan kapan efek dijalankan ulang.

\`\`\`jsx
useEffect(() => {
  const controller = new AbortController()
  fetch('/api/data', { signal: controller.signal })
    .then((res) => res.json())
    .then(setData)

  return () => controller.abort()
}, [])
\`\`\``,
    },
    {
      id: 'sec-02-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-02-js',
        filename: 'Counter.jsx',
        language: 'javascript',
        title: 'JavaScript: Counter dengan useState dan useEffect',
        code: `import { useState, useEffect } from 'react'

export function Counter({ step }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    document.title = \`Count: \${count}\`
  }, [count])

  return (
    <div>
      <p>Nilai: {count}</p>
      <button onClick={() => setCount((c) => c + step)}>+{step}</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  )
}`,
        explanation:
          'Functional update setCount((c) => c + step) memastikan kita selalu bekerja dengan nilai terbaru. useEffect memperbarui title setiap kali count berubah.',
      },
    },
    {
      id: 'sec-02-intermediate-closure',
      type: 'markdown',
      level: 'intermediate',
      title: 'Stale Closures, useRef, dan Dependency Array',
      content: `## Stale Closure

Stale closure terjadi ketika fungsi callback menangkap nilai lama dari scope saat ia didefinisikan. Ini sering muncul di \`useEffect\` atau event handler yang tidak menyertakan dependency yang benar.

\`\`\`jsx
useEffect(() => {
  const id = setInterval(() => {
    console.log(count) // bisa jadi stale
  }, 1000)
  return () => clearInterval(id)
}, []) // BUG: count tidak di dependency array
\`\`\`

Solusinya adalah menyertakan \`count\` di dependency array, atau menggunakan functional update / ref untuk membaca nilai terbaru.

## useRef vs useState

\`useRef\` mengembalikan objek mutable \`{ current: ... }\` yang tidak memicu re-render saat diubah. Ref sangat berguna untuk:

- Menyimpan referensi DOM.
- Menyimpan nilai sementara yang tidak perlu ditampilkan.
- Menghindari stale closure tanpa dependency array.

\`\`\`jsx
const latestCount = useRef(count)
useEffect(() => {
  latestCount.current = count
})
\`\`\`

## useMemo dan useCallback

- \`useMemo\`: menyimpan hasil komputasi.
- \`useCallback\`: menyimpan definisi fungsi.

Keduanya berguna untuk mengoptimalkan child components yang menggunakan \`React.memo\`, tetapi tidak selalu diperlukan untuk setiap kasus.

\`\`\`jsx
const memoizedValue = useMemo(() => computeExpensive(a, b), [a, b])
const memoizedHandler = useCallback(() => doSomething(a), [a])
\`\`\``,
    },
    {
      id: 'sec-02-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-02-ts',
        filename: 'useInterval.ts',
        language: 'typescript',
        title: 'TypeScript: Custom Hook useInterval yang Aman dari Stale Closure',
        code: `import { useEffect, useRef } from 'react'

export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef<() => void>(callback)

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    if (delay === null) return

    const id = setInterval(() => {
      savedCallback.current()
    }, delay)

    return () => clearInterval(id)
  }, [delay])
}

// Penggunaan
useInterval(() => {
  console.log('tick', Date.now())
}, 1000)`,
        explanation:
          'Dengan menyimpan callback terbaru di ref, efek interval tidak perlu di-reset setiap kali callback berubah. Hanya delay yang menjadi dependency, sehingga interval tetap membaca closure terbaru.',
      },
    },
    {
      id: 'sec-02-advanced-hook-rules',
      type: 'markdown',
      level: 'advanced',
      title: 'Hook Rules, Array Internals, dan useReducer',
      content: `## Cara React Menyimpan Hooks

React tidak menyimpan hooks sebagai named state seperti \`{ count, name }\`. Sebaliknya, React menggunakan linked list atau array fiber untuk setiap pemanggilan hook. Pada setiap render, React mengambil state dari indeks yang sama. Jika urutan pemanggilan berubah karena kondisi, React akan mengaitkan state yang salah.

\`\`\`jsx
// SALAH
if (condition) {
  const [state, setState] = useState(0)
}
\`\`\`

## useReducer

\`useReducer\` cocok untuk state yang kompleks atau memiliki banyak transisi. Pola ini mirip dengan Redux tetapi tanpa boilerplate store.

\`\`\`jsx
const [state, dispatch] = useReducer(reducer, initialState)
dispatch({ type: 'increment', payload: 5 })
\`\`\`

Keuntungan \`useReducer\`:

- Transisi state terpusat di reducer.
- Lebih mudah diuji karena reducer adalah pure function.
- Cocok untuk state yang bergantung pada state sebelumnya.

## Custom Hooks

Custom hooks adalah konvensi penamaan fungsi yang diawali \`use\` dan dapat memanggil hooks lain. Mereka memungkinkan ekstraksi logika stateful agar reusable antar komponen.

Ketika membuat custom hook:

- Dokumentasikan parameter dan return value.
- Pastikan hook mengikuti aturan hooks.
- Pertimbangkan cleanup pada \`useEffect\` agar tidak bocor.`,
    },
    {
      id: 'sec-02-go-example',
      type: 'code-example',
      codeExample: {
        id: 'code-02-go',
        filename: 'hook_order.go',
        language: 'go',
        title: 'Go: Simulasi Array Penyimpanan Hook State',
        code: `package main

import "fmt"

type HookState struct {
	memos []interface{}
	index int
}

func (h *HookState) useState(initial interface{}) (*interface{}, func(interface{})) {
	idx := h.index
	if idx >= len(h.memos) {
		h.memos = append(h.memos, initial)
	}
	state := &h.memos[idx]
	setter := func(v interface{}) {
		h.memos[idx] = v
	}
	h.index++
	return state, setter
}

func render(h *HookState) {
	h.index = 0
	name, setName := h.useState("React")
	count, setCount := h.useState(0)

	fmt.Printf("render: name=%v count=%v\\n", *name, *count)
	setCount(1)
	setName("Go")
}

func main() {
	h := &HookState{}
	render(h)
	render(h)
}`,
        explanation:
          'Simulasi sederhana ini menunjukkan mengapa urutan pemanggilan hooks penting. React mengambil state berdasarkan indeks, sehingga pemanggilan bersyarat akan menggeser seluruh indeks.',
      },
    },
    {
      id: 'sec-02-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Kesalahan umum:** dependency array kosong pada useEffect yang membaca state atau props. Selalu sertakan semua value reaktif yang digunakan di dalam efek, atau gunakan ref jika memang ingin menghindari re-run tanpa bergantung pada nilai tertentu.',
    },
  ],
}
