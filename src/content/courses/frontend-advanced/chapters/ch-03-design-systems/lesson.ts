import type { Lesson } from '@/content/types'

export const ch03Lesson: Lesson = {
  id: 'lesson-ch-03-design-systems',
  estimatedMinutes: 40,
  sections: [
    {
      id: 'sec-03-basic',
      type: 'markdown',
      level: 'basic',
      title: 'Component Library, Tokens, dan Dokumentasi',
      content: `## Apa itu Design System?

Design system adalah kumpulan komponen yang dapat digunakan kembali, pedoman desain, dan standar yang memungkinkan tim membangun produk secara konsisten dan efisien. Komponen utamanya:

1. **Design tokens**: nilai desain atomik seperti warna, tipografi, spacing, shadow, dan border radius.
2. **Component library**: implementasi komponen UI dalam kode.
3. **Pattern library**: kombinasi komponen untuk alur pengguna tertentu.
4. **Dokumentasi**: cara menggunakan, kontribusi, dan prinsip desain.

## Design Tokens

Design tokens menyimpan nilai desain dalam format yang dapat dikonsumsi oleh berbagai platform (web, iOS, Android). Format umum:

- JSON untuk integrasi tools seperti Style Dictionary.
- CSS custom properties untuk runtime web.
- TypeScript constants untuk type safety.

Contoh token:

\`\`\`json
{
  "color": {
    "primary": {
      "500": { "value": "#3b82f6" }
    }
  },
  "spacing": {
    "md": { "value": "1rem" }
  }
}
\`\`\`

## Dokumentasi

Dokumentasi design system harus mencakup:

- Kapan menggunakan komponen tertentu.
- Props dan contoh penggunaan.
- Aksesibilitas dan keyboard behavior.
- Varian dan state komponen.`,
    },
    {
      id: 'sec-03-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-03-js',
        filename: 'Button.jsx',
        language: 'javascript',
        title: 'JavaScript: Button Component dengan Varian',
        code: `import clsx from 'clsx'

const variants = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700',
  secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
  danger: 'bg-red-600 text-white hover:bg-red-700',
}

const sizes = {
  sm: 'px-2 py-1 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
}

function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  ...props
}) {
  return (
    <button
      className={clsx(
        'rounded font-medium focus:outline-none focus:ring-2 focus:ring-offset-2',
        variants[variant],
        sizes[size],
        disabled && 'opacity-50 cursor-not-allowed'
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button`,
        explanation:
          'Button ini menggunakan peta varian dan ukuran untuk menjaga konsistensi. clsx membantu menggabungkan class secara kondisional.',
      },
    },
    {
      id: 'sec-03-intermediate',
      type: 'markdown',
      level: 'intermediate',
      title: 'Compound Components dan Controlled/Uncontrolled Patterns',
      content: `## Compound Components

Compound components adalah pola di mana beberapa komponen bekerja sama untuk membentuk satu UI yang koheren, tetapi masing-masing dapat dikomposisi secara fleksibel. Contoh klasik:

\`\`\`jsx
<Tabs>
  <Tabs.List>
    <Tabs.Trigger value="account">Akun</Tabs.Trigger>
    <Tabs.Trigger value="security">Keamanan</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="account">...</Tabs.Content>
  <Tabs.Content value="security">...</Tabs.Content>
</Tabs>
\`\`\`

Keuntungan:

- API yang ekspresif dan mudah dibaca.
- Internal state dan komunikasi disembunyikan dari konsumen.
- Fleksibel dalam layout dan styling.

## Controlled vs Uncontrolled

Komponen dapat dirancang untuk mendukung kedua mode:

- **Uncontrolled**: komponen mengelola state sendiri. Cocok untuk kasus sederhana.
- **Controlled**: state dikelola oleh parent melalui props. Cocok untuk integrasi form dan logika bisnis.

Pola yang baik adalah mendukung kedua mode dengan default uncontrolled dan mengizinkan override melalui props seperti \`value\` dan \`onValueChange\`.

## Composition dengan Children

Komponen yang baik menerima \`children\` dan \`className\` agar dapat disesuaikan tanpa memodifikasi library. Ini mencegah proliferasi props untuk setiap edge case.`,
    },
    {
      id: 'sec-03-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-03-ts',
        filename: 'Tabs.tsx',
        language: 'typescript',
        title: 'TypeScript: Compound Tabs dengan Context',
        code: `import {
  createContext,
  useContext,
  useState,
  Children,
  cloneElement,
  isValidElement,
} from 'react'

interface TabsContextValue {
  value: string
  setValue: (value: string) => void
}

const TabsContext = createContext<TabsContextValue | null>(null)

function useTabs() {
  const ctx = useContext(TabsContext)
  if (!ctx) throw new Error('Tabs components must be used inside <Tabs>')
  return ctx
}

interface TabsProps {
  defaultValue: string
  children: React.ReactNode
}

function Tabs({ defaultValue, children }: TabsProps) {
  const [value, setValue] = useState(defaultValue)
  return (
    <TabsContext.Provider value={{ value, setValue }}>
      <div>{children}</div>
    </TabsContext.Provider>
  )
}

interface TriggerProps {
  value: string
  children: React.ReactNode
}

function Trigger({ value, children }: TriggerProps) {
  const { value: active, setValue } = useTabs()
  return (
    <button
      role="tab"
      aria-selected={value === active}
      onClick={() => setValue(value)}
      className={value === active ? 'border-b-2 border-blue-600' : ''}
    >
      {children}
    </button>
  )
}

function Content({ value, children }: TriggerProps) {
  const { value: active } = useTabs()
  if (value !== active) return null
  return <div role="tabpanel">{children}</div>
}

Tabs.List = ({ children }: { children: React.ReactNode }) => (
  <div role="tablist" className="flex gap-4">
    {children}
  </div>
)
Tabs.Trigger = Trigger
Tabs.Content = Content

export { Tabs }`,
        explanation:
          'Tabs compound component menggunakan context untuk berbagi state internal. Konsumen mendapatkan API yang bersih sementara logika tab terenkapsulasi.',
      },
    },
    {
      id: 'sec-03-advanced',
      type: 'markdown',
      level: 'advanced',
      title: 'Headless UI, Accessibility-First, dan Versioning',
      content: `## Headless UI

Headless UI adalah komponen yang menyediakan logika, state, dan aksesibilitas tanpa styling bawaan. Pendekatan ini memisahkan concern:

- **Library headless** (seperti Radix UI, Reach UI, React Aria) menangani behavior kompleks.
- **Tim desain** menentukan visual styling.
- **Tim produk** mengkomposisikan keduanya.

Keuntungan utama adalah kebebasan desain tanpa mengorbankan accessibility dan behavior yang benar.

## Accessibility-First Components

Komponen yang dirancang dengan aksesibilitas sejak awal memperhatikan:

- **Keyboard navigation**: Tab order, arrow keys, Escape, Enter/Space.
- **ARIA roles dan attributes**: \`role="dialog"\`, \`aria-expanded\`, \`aria-describedby\`.
- **Focus management**: focus trap di modal, return focus setelah menutup.
- **Screen reader announcements**: live regions untuk perubahan dinamis.

Menggunakan primitives headless seperti Radix sangat membantu karena banyak behavior aksesibilitas sudah diimplementasikan dan diuji lintas browser.

## Versioning dan Breaking Changes

Design system adalah produk yang berkembang. Praktik terbaik:

- Gunakan semantic versioning (major.minor.patch).
- Hindari breaking changes kecuali benar-benar diperlukan.
- Sediakan codemod untuk migrasi otomatis.
- Dokumentasikan perubahan di changelog dan migration guide.
- Komunikasikan deprecation dengan siklus yang jelas sebelum menghapus API.`,
    },
    {
      id: 'sec-03-advanced-example',
      type: 'code-example',
      codeExample: {
        id: 'code-03-advanced',
        filename: 'tokens.ts',
        language: 'typescript',
        title: 'Design Tokens: Objek Typed + CSS Custom Properties',
        code: `// tokens.ts — single source of truth dengan type safety
export const tokens = {
  color: {
    primary: {
      50: '#eff6ff',
      500: '#3b82f6',
      900: '#1e3a8a',
    },
  },
  spacing: {
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
  },
} as const

export type DesignTokens = typeof tokens

export function applyTokens(root: HTMLElement = document.documentElement) {
  Object.entries(tokens.color.primary).forEach(([shade, value]) => {
    root.style.setProperty(\`--color-primary-\${shade}\`, value)
  })
  Object.entries(tokens.spacing).forEach(([key, value]) => {
    root.style.setProperty(\`--spacing-\${key}\`, value)
  })
}

/* tokens.css — alternatif deklaratif di :root
:root {
  --color-primary-500: #3b82f6;
  --spacing-md: 1rem;
}

.button-primary {
  background: var(--color-primary-500);
  padding: var(--spacing-md) var(--spacing-lg);
}
*/`,
        explanation:
          'Design tokens didefinisikan sebagai objek TypeScript typed sehingga autocomplete dan compile-time check tersedia. Nilai yang sama diekspor ke CSS custom properties untuk konsistensi visual di seluruh komponen tanpa hardcode.',
      },
    },
    {
      id: 'sec-03-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Best practice 2026:** Mulai dengan design tokens sebagai sumber kebenaran, gunakan headless primitives untuk behavior kompleks, dan rancang komponen untuk controlled/uncontrolled mode. Komunikasikan perubahan design system melalui semantic versioning, codemod, dan migration guide.',
    },
  ],
}
