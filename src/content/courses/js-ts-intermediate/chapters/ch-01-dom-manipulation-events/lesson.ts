import type { Lesson } from '@/content/types'

export const ch01Lesson: Lesson = {
  id: 'lesson-ch-01-dom-manipulation-events',
  estimatedMinutes: 35,
  sections: [
    {
      id: 'sec-01-basic-dom',
      type: 'markdown',
      level: 'basic',
      title: 'DOM Tree, Seleksi Node, dan Event Listener',
      content: `## Apa itu DOM?

**Document Object Model (DOM)** adalah representasi tree dari dokumen HTML yang dibangun oleh browser setelah parsing HTML. Setiap tag, atribut, dan teks menjadi node yang bisa diakses dan dimanipulasi oleh JavaScript.

Tiga komponen utama:

- **Document**: root object yang merepresentasikan seluruh halaman.
- **Element node**: node yang berasal dari tag HTML, seperti \`<div>\` atau \`<button>\`.
- **Text node**: node yang berisi teks di dalam elemen.

## Seleksi Node

Browser menyediakan API untuk mencari elemen:

- \`getElementById(id)\`: mencari satu elemen berdasarkan atribut \`id\`.
- \`querySelector(selector)\`: mencari elemen pertama yang cocok dengan CSS selector.
- \`querySelectorAll(selector)\`: mengembalikan NodeList semua elemen yang cocok.

## Event Listener

Event adalah kejadian yang terjadi pada elemen, seperti klik, input, atau scroll. Kita menangkapnya dengan \`addEventListener\`.

\`\`\`javascript
const tombol = document.getElementById('tombol');
tombol.addEventListener('click', function handleClick(event) {
  console.log('Tombol diklik!', event.target.textContent);
});
\`\`\`

\`event\` adalah objek yang berisi informasi tentang kejadian, termasuk \`target\` (elemen asal), \`type\`, dan koordinat pointer.

## Fase Event: Capture, Target, Bubble

Ketika event terjadi, browser mengirimkannya melalui tiga fase:

1. **Capture phase**: event bergerak dari root window menuju elemen target.
2. **Target phase**: event sampai di elemen tempat kejadian sesungguhnya.
3. **Bubble phase**: event kembali ke root dari target.

Secara default \`addEventListener\` menangkap event pada fase bubble. Untuk menangkap di fase capture, tambahkan argumen ketiga \`true\`.

\`\`\`javascript
parent.addEventListener('click', handler, true); // capture
child.addEventListener('click', handler, false);  // bubble (default)
\`\`\``,
    },
    {
      id: 'sec-01-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-01-js',
        filename: 'todo-list-vanilla.js',
        language: 'javascript',
        title: 'JavaScript: Todo List dengan Event Delegation',
        code: `// HTML: <ul id="todo-list"><li><button class="delete">Hapus</button> Belajar DOM</li></ul>

const list = document.getElementById('todo-list');
const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');

function createItem(text) {
  const li = document.createElement('li');
  li.innerHTML = \`<span class="text">\${text}</span> <button class="delete">Hapus</button>\`;
  return li;
}

addBtn.addEventListener('click', () => {
  if (!input.value.trim()) return;
  list.appendChild(createItem(input.value));
  input.value = '';
});

// Event delegation: satu listener untuk semua tombol hapus, termasuk yang baru
list.addEventListener('click', (event) => {
  const deleteBtn = event.target.closest('.delete');
  if (!deleteBtn) return;
  const item = deleteBtn.closest('li');
  item.remove();
});

// Passive listener untuk scroll performance
window.addEventListener('scroll', () => {
  console.log('scroll position:', window.scrollY);
}, { passive: true });`,
        explanation:
          'Event delegation menghindari pendaftaran listener pada setiap tombol. Dengan mendengarkan event di ancestor, kita bisa menangani elemen yang ditambahkan secara dinamis tanpa re-bind listener.',
      },
    },
    {
      id: 'sec-01-intermediate-dom',
      type: 'markdown',
      level: 'intermediate',
      title: 'preventDefault, stopPropagation, Passive Listeners, dan Throttling',
      content: `## Mengontrol Perilaku Default dan Propagasi

- \`event.preventDefault()\`: mencegah browser menjalankan aksi bawaan, misalnya submit form atau membuka link.
- \`event.stopPropagation()\`: menghentikan event agar tidak naik ke ancestor (bubble) atau turun ke descendant (capture).

Gunakan keduanya dengan sengaja. Memanggil \`stopPropagation\` secara sembarangan bisa membuat bug karena event tidak sampai ke handler global atau analytics.

## Passive Listeners

Listener touch/wheel bisa memblokir thread utama jika browser harus menunggu hasil \`preventDefault\`. Opsi \`{ passive: true }\` memberitahu browser bahwa listener tidak akan memanggil \`preventDefault\`, sehingga scroll bisa berjalan di compositor thread tanpa menunggu JavaScript.

## Throttling dan Debouncing

- **Throttling**: membatasi eksekusi fungsi menjadi paling banyak sekali dalam periode tertentu. Cocok untuk handler scroll/resize.
- **Debouncing**: menunda eksekusi sampai event berhenti terpicu selama jeda tertentu. Cocok untuk input pencarian.

Keduanya mengurangi beban main thread dan mencegah forced synchronous layout.

## DOM API Internals

\`querySelector\` menggunakan engine CSS selector browser (Blink/WebKit/Gecko) untuk traversal. Selector yang terlalu umum seperti \`*\` atau \`[data-x]\` tanpa class lebih lambat karena harus memeriksa banyak node. Preferensikan class selector dan scope pencarian ke subtree, misalnya \`parent.querySelector('.item')\`.

Membaca properti layout seperti \`offsetHeight\` atau \`getBoundingClientRect()\` setelah menulis style memaksa browser melakukan **reflow** sinkron. Hindari membaca dan menulis properti layout secara bergantian dalam loop.`,
    },
    {
      id: 'sec-01-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-01-ts',
        filename: 'TodoList.tsx',
        language: 'typescript',
        title: 'TypeScript: Komponen Todo List dengan Tipe Eksplisit',
        code: `import { useState, FormEvent, MouseEvent } from 'react';

type Todo = {
  id: number;
  text: string;
};

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!text.trim()) return;
    setTodos((prev) => [...prev, { id: Date.now(), text }]);
    setText('');
  }

  function handleDelete(event: MouseEvent<HTMLButtonElement>) {
    const id = Number(event.currentTarget.dataset.id);
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Tambah todo"
      />
      <button type="submit">Tambah</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}{' '}
            <button type="button" data-id={todo.id} onClick={handleDelete}>
              Hapus
            </button>
          </li>
        ))}
      </ul>
    </form>
  );
}`,
        explanation:
          'Dengan TypeScript, event handler diberi tipe spesifik seperti FormEvent dan MouseEvent. State didefinisikan secara eksplisit, sehingga kesalahan bentuk data bisa tertangkap saat compile time.',
      },
    },
    {
      id: 'sec-01-advanced-dom',
      type: 'markdown',
      level: 'advanced',
      title: 'Rendering Pipeline, Custom Events, MutationObserver, dan Shadow DOM',
      content: `## Browser Rendering Pipeline

Setelah DOM dimanipulasi, browser menjalankan serangkaian langkah untuk memperbarui tampilan:

1. **Style**: menghitung computed style untuk setiap elemen.
2. **Layout (Reflow)**: menghitung geometri dan posisi elemen.
3. **Paint**: mengisi piksel ke layer.
4. **Composite**: menggabungkan layer-layer menjadi gambar akhir di layar.

Perubahan seperti \`transform\` dan \`opacity\` hanya memicu composite dan sangat murah. Perubahan \`width\`, \`height\`, \`top\`, atau \`font-size\` memicu layout ulang yang lebih mahal.

## Custom Events

Custom event memungkinkan kita membuat event sendiri untuk komunikasi antar komponen tanpa ketergantungan framework.

\`\`\`javascript
const event = new CustomEvent('session:expired', { detail: { reason: 'timeout' } });
window.dispatchEvent(event);
\`\`\`

## MutationObserver

\`MutationObserver\` adalah API asynchronous untuk memantau perubahan DOM (penambahan/penghapusan node, perubahan atribut). Berbeda dengan Mutation Events lama yang synchronous dan lambat, observer mengelompokkan perubahan dan memanggil callback via microtask.

## Shadow DOM dan Slot Composition

Shadow DOM membuat subtree terenkapsulasi dengan scope style dan DOM tersendiri. Slot composition memungkinkan light DOM children diproyeksikan ke posisi tertentu di shadow tree. Ini adalah fondasi web components dan memungkinkan isolasi yang kuat.

## Konsep DOM Diffing

Framework seperti React tidak memanipulasi DOM secara langsung. React membuat representasi virtual tree, menghitung diff dengan tree sebelumnya, dan menerapkan perubahan minimal. Hal ini mengurangi reflow dan menjaga konsistensi UI.`,
    },
    {
      id: 'sec-01-go-example',
      type: 'code-example',
      codeExample: {
        id: 'code-01-go',
        filename: 'event_driven.go',
        language: 'go',
        title: 'Go: Perbandingan Arsitektur Event-Driven',
        code: `package main

import (
	"fmt"
	"sync"
)

// Di browser, event loop dispatch event ke listener.
// Di Go, kita bisa memodelkan event-driven dengan channel dan goroutine.

type Event struct {
	Type string
	Data string
}

func main() {
	events := make(chan Event, 10)
	var wg sync.WaitGroup

	// Dispatcher: satu goroutine menangani banyak event seperti event delegation
	wg.Add(1)
	go func() {
		defer wg.Done()
		for e := range events {
			switch e.Type {
			case "click":
				fmt.Println("handled click:", e.Data)
			case "input":
				fmt.Println("handled input:", e.Data)
			}
		}
	}()

	events <- Event{Type: "click", Data: "button-1"}
	events <- Event{Type: "input", Data: "search-box"}
	close(events)
	wg.Wait()
}`,
        explanation:
          'Go tidak memiliki DOM karena tidak berjalan di browser, tetapi pola event-driven bisa diimplementasikan dengan channel. Channel mirip dengan event queue: satu goroutine dispatcher menangani banyak pesan secara concurrent-safe.',
      },
    },
    {
      id: 'sec-01-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Kesimpulan:** DOM adalah jembatan antara HTML dan JavaScript. Pahami fase event untuk menulis listener yang efisien, gunakan event delegation pada daftar dinamis, dan hindari reflow berulang. Di level lanjut, integrasikan pengetahuan rendering pipeline, MutationObserver, dan Shadow DOM untuk membangun UI yang performant dan terenkapsulasi.',
    },
  ],
}
