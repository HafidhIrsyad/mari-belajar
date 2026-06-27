import type { Lesson } from '@/content/types'

export const ch07Lesson: Lesson = {
  id: 'lesson-ch-07-dom-events-interactivity',
  estimatedMinutes: 22,
  sections: [
    {
      id: 'sec-07-basic-events',
      type: 'markdown',
      level: 'basic',
      title: 'Event Listener dan Event Object',
      content: `## Menangkap Event

Browser memicu **event** ketika sesuatu terjadi: klik, ketikan, scroll, resize, submit, dan banyak lainnya. Kita menangkap event dengan \`addEventListener\`.

\`\`\`javascript
const button = document.getElementById('save')
button.addEventListener('click', handleClick)

function handleClick(event) {
  console.log(event.target)        // elemen yang benar-benar diklik
  console.log(event.currentTarget) // elemen yang memasang listener
  event.preventDefault()           // mencegah perilaku default
}
\`\`\`

## Properti Penting Event Object

- \`target\`: elemen asal event.
- \`currentTarget\`: elemen tempat listener terpasang.
- \`type\`: nama event, misalnya \`"click"\`.
- \`preventDefault()\`: mencegah perilaku default browser.
- \`stopPropagation()\`: menghentikan bubbling event ke induk.

## Event Umum

Beberapa event yang paling sering digunakan:

- **Mouse**: \`click\`, \`dblclick\`, \`mousedown\`, \`mouseup\`, \`mousemove\`.
- **Keyboard**: \`keydown\`, \`keyup\`, \`keypress\`.
- **Form**: \`input\`, \`change\`, \`submit\`, \`focus\`, \`blur\`.
- **Window**: \`DOMContentLoaded\`, \`load\`, \`resize\`, \`scroll\`.

Menggunakan event \`submit\` pada form lebih baik daripada \`click\` pada tombol, karena form dapat disubmit dengan tombol Enter di dalam field.`,
    },
    {
      id: 'sec-07-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-07-js',
        filename: 'accordion.js',
        language: 'javascript',
        title: 'JavaScript: Accordion Vanilla',
        code: `function initAccordion(container) {
  container.addEventListener('click', (event) => {
    const button = event.target.closest('[data-accordion-button]')
    if (!button) return

    const panelId = button.getAttribute('aria-controls')
    const panel = document.getElementById(panelId)
    if (!panel) return

    const isExpanded = button.getAttribute('aria-expanded') === 'true'
    button.setAttribute('aria-expanded', String(!isExpanded))
    panel.hidden = isExpanded

    // Tutup panel lain di grup yang sama
    const group = button.closest('[data-accordion-group]')
    if (group && group.dataset.accordionGroup === 'single') {
      group.querySelectorAll('[data-accordion-button]').forEach((other) => {
        if (other === button) return
        other.setAttribute('aria-expanded', 'false')
        const otherPanel = document.getElementById(other.getAttribute('aria-controls'))
        if (otherPanel) otherPanel.hidden = true
      })
    }
  })
}

const accordion = document.getElementById('accordion')
if (accordion) initAccordion(accordion)`,
        explanation:
          'Accordion ini menggunakan event delegation: satu listener pada container menangani semua tombol. Atribut ARIA seperti aria-expanded dan aria-controls membuatnya accessible.',
      },
    },
    {
      id: 'sec-07-intermediate-delegation',
      type: 'markdown',
      level: 'intermediate',
      title: 'Event Delegation, Passive Listeners, dan Custom Events',
      content: `## Event Delegation

Event delegation memanfaatkan **bubbling**: event dari elemen anak naik ke induk. Dengan memasang listener di induk, kita bisa menangani banyak elemen anak, bahkan yang ditambahkan secara dinamis.

\`\`\`javascript
document.getElementById('todo-list').addEventListener('click', (event) => {
  const deleteButton = event.target.closest('.delete-btn')
  if (deleteButton) {
    deleteButton.closest('li').remove()
  }
})
\`\`\`

Keuntungan:

- Mengurangi jumlah listener dan konsumsi memori.
- Tidak perlu mendaftarkan ulang listener saat elemen baru muncul.
- Memudahkan cleanup.

## Passive Listeners

Listener untuk event \`touchstart\` atau \`wheel\` dapat memblokir thread utama jika memanggil \`preventDefault\`. Dengan opsi \`{ passive: true }\`, kita memberi tahu browser bahwa listener tidak akan memanggil \`preventDefault\`, sehingga browser dapat mengoptimalkan scroll.

\`\`\`javascript
window.addEventListener('scroll', handleScroll, { passive: true })
\`\`\`

## Custom Events

Custom events memungkinkan komponen berkomunikasi tanpa ketergantungan langsung. Event dapat membawa data melalui properti \`detail\`.

\`\`\`javascript
const event = new CustomEvent('cart:updated', {
  detail: { itemCount: 3 },
  bubbles: true,
})
document.dispatchEvent(event)
\`\`\``,
    },
    {
      id: 'sec-07-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-07-ts',
        filename: 'Accordion.tsx',
        language: 'typescript',
        title: 'TypeScript: Komponen Accordion yang Typed',
        code: `import { useState, useCallback } from 'react'

interface AccordionItem {
  id: string
  title: string
  content: string
}

interface AccordionProps {
  items: AccordionItem[]
  allowMultiple?: boolean
}

export function Accordion({ items, allowMultiple = false }: AccordionProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set())

  const toggle = useCallback((id: string) => {
    setOpenIds((prev) => {
      const next = new Set(allowMultiple ? prev : [])
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }, [allowMultiple])

  return (
    <div>
      {items.map((item) => {
        const isOpen = openIds.has(item.id)
        return (
          <div key={item.id}>
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={\`panel-\${item.id}\`}
              id={\`button-\${item.id}\`}
              onClick={() => toggle(item.id)}
            >
              {item.title}
            </button>
            <div
              id={\`panel-\${item.id}\`}
              role="region"
              aria-labelledby={\`button-\${item.id}\`}
              hidden={!isOpen}
            >
              {item.content}
            </div>
          </div>
        )
      })}
    </div>
  )
}`,
        explanation:
          'Komponen ini mengelola state terbuka dengan Set, mendukung mode single atau multiple, dan menyertakan atribut ARIA yang tepat untuk screen reader.',
      },
    },
    {
      id: 'sec-07-advanced-interactions',
      type: 'markdown',
      level: 'advanced',
      title: 'Accessibility-Friendly Interactions dan Reduced Motion',
      content: `## Interaksi yang Ramah Aksesibilitas

Setiap interaksi yang dapat dilakukan dengan mouse harus juga dapat dilakukan dengan keyboard. Periksa:

- Tombol benar-benar menggunakan \`<button>\`, bukan div yang di-style.
- Elemen yang dapat difokus memiliki outline yang terlihat.
- Pesan status diumumkan melalui \`aria-live\`.
- Komponen kompleks mengikuti pola WAI-ARIA Authoring Practices.

## Reduced Motion

Animasi dapat menyebabkan mual atau kejang pada sebagian pengguna. Selalu hormati preferensi sistem:

\`\`\`css
@media (prefers-reduced-motion: reduce) {
  .accordion-panel {
    transition: none;
  }
}
\`\`\`

Di JavaScript, kita bisa membaca preferensi yang sama:

\`\`\`javascript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
if (!prefersReducedMotion) {
  // jalankan animasi
}
\`\`\`

## Input Event Coalescing

Browser dapat menggabungkan beberapa event pointer atau touch menjadi satu untuk menghemat proses. Ini adalah bagian dari optimasi event handling. Untuk kasus yang membutuhkan data setiap frame, gunakan \`requestAnimationFrame\` agar pekerjaan diselaraskan dengan refresh rate layar.

## Throttling dan Debouncing

Untuk event yang sering memicu seperti \`scroll\` atau \`resize\`, gunakan **throttle** (membatasi frekuensi eksekusi) atau **debounce** (menunggu berhenti sebelum eksekusi) untuk mengurangi beban main thread.`,
    },
    {
      id: 'sec-07-conceptual-example',
      type: 'code-example',
      codeExample: {
        id: 'code-07-conceptual',
        filename: 'event-runtime.js',
        language: 'javascript',
        title: 'Perbandingan Runtime: Browser Event Loop vs Pub/Sub',
        code: `const eventBus = {
  listeners: new Map(),
  on(event, callback) {
    if (!this.listeners.has(event)) this.listeners.set(event, new Set())
    this.listeners.get(event).add(callback)
  },
  emit(event, detail) {
    this.listeners.get(event)?.forEach((cb) => cb(detail))
  },
}

// Pub/Sub: komponen tidak perlu kenal satu sama lain
eventBus.on('theme:changed', ({ theme }) => {
  document.documentElement.className = theme
})

// Browser DOM event: dipicu oleh interaksi pengguna
document.addEventListener('click', (event) => {
  if (event.target.matches('[data-theme-toggle]')) {
    const theme = event.target.dataset.themeToggle
    eventBus.emit('theme:changed', { theme })
  }
})

// Perbandingan:
// - DOM events diatur oleh browser event loop dan bubbles/captures.
// - Pub/Sub berjalan di JavaScript land dan tidak memiliki konsep fase event.
// - CustomEvent menggabungkan keduanya: event bawaan browser yang dapat membawa data kustom.`,
        explanation:
          'DOM events dan pub/sub memiliki model distribusi yang berbeda. CustomEvent memungkinkan kita memanfaatkan mekanisme browser sekaligus mengirim data antar komponen secara longgar.',
      },
    },
    {
      id: 'sec-07-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Kesalahan umum:** memasang listener pada setiap elemen anak secara individual dan lupa membersihkannya saat komponen dihancurkan. Gunakan event delegation untuk elemen dinamis, tambahkan passive untuk listener scroll/touch, dan selalu pertimbangkan navigasi keyboard.',
    },
  ],
}
