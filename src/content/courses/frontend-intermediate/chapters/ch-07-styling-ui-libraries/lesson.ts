import type { Lesson } from '@/content/types'

export const ch07Lesson: Lesson = {
  id: 'lesson-ch-07-styling-ui-libraries',
  estimatedMinutes: 35,
  sections: [
    {
      id: 'sec-07-basic-styling',
      type: 'markdown',
      level: 'basic',
      title: 'Strategi Styling Modern',
      content: `## CSS Modules

CSS Modules memastikan class name bersifat lokal berdasarkan file. Ini menghindari konflik nama class di proyek besar.

\`\`\`css
/* Button.module.css */
.button {
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
}
\`\`\`

\`\`\`jsx
import styles from './Button.module.css'

<button className={styles.button}>Klik</button>
\`\`\`

## CSS-in-JS

CSS-in-JS menulis style di dalam JavaScript. Keuntungannya:

- Scoped styles otomatis.
- Akses mudah ke props dan tema.
- Dynamic styles berdasarkan state.

Kelemahannya adalah runtime overhead dan bundle size yang lebih besar.

## Utility-First CSS

Tailwind CSS menyediakan class utilitas seperti \`flex\`, \`p-4\`, \`bg-blue-500\`. Pendekatan ini mengurangi kebutuhan menulis CSS custom dan mempercepat prototyping.

\`\`\`jsx
<button className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
  Simpan
</button>
\`\`\``,
    },
    {
      id: 'sec-07-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-07-js',
        filename: 'Button.jsx',
        language: 'javascript',
        title: 'JavaScript: Tailwind Button dengan Variant',
        code: `export function Button({ variant = 'primary', children, ...props }) {
  const base = 'rounded px-4 py-2 font-medium transition-colors'
  const styles = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    danger: 'bg-red-500 text-white hover:bg-red-600',
  }

  return (
    <button className={\`\${base} \${styles[variant]}\`} {...props}>
      {children}
    </button>
  )
}

// Penggunaan
<Button variant="danger" onClick={handleDelete}>
  Hapus
</Button>`,
        explanation:
          'Tailwind memungkinkan kita membangun variant komponen dengan menggabungkan class utilitas. Pola ini cepat tetapi bisa menjadi sulit dikelola jika variant bertambah kompleks.',
      },
    },
    {
      id: 'sec-07-intermediate-tokens',
      type: 'markdown',
      level: 'intermediate',
      title: 'Design Tokens dan Theming',
      content: `## Design Tokens

Design tokens adalah variabel desain yang digunakan secara konsisten di seluruh aplikasi. Contohnya warna, spacing, typography, shadow, dan border radius.

\`\`\`css
:root {
  --color-primary-500: #3b82f6;
  --space-4: 1rem;
  --radius-md: 0.375rem;
}
\`\`\`

Dengan Tailwind, token ini dapat didefinisikan di \`tailwind.config.js\`.

\`\`\`js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#3b82f6',
        },
      },
    },
  },
}
\`\`\`

## Theming dengan CSS Variables

Theming memungkinkan aplikasi memiliki mode terang dan gelap. Dengan CSS variables, tema dapat diubah hanya dengan mengganti nilai variabel.

\`\`\`css
.dark {
  --bg: #0f172a;
  --text: #f8fafc;
}
\`\`\`

Manfaat design tokens:

- Konsistensi visual di seluruh produk.
- Mudah mengubah tema global.
- Kolaborasi designer-developer lebih baik.`,
    },
    {
      id: 'sec-07-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-07-ts',
        filename: 'ButtonCva.tsx',
        language: 'typescript',
        title: 'TypeScript: Komponen Button dengan class-variance-authority',
        code: `import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-12 px-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}`,
        explanation:
          'class-variance-authority (CVA) mengelola kombinasi variant secara terstruktur. VariantProps membuat tipe props variant otomatis terinfer dari definisi CVA.',
      },
    },
    {
      id: 'sec-07-advanced-headless',
      type: 'markdown',
      level: 'advanced',
      title: 'Headless UI, Radix Primitives, dan shadcn/ui',
      content: `## Headless UI

Headless UI menyediakan logika interaksi komponen tanpa styling bawaan. Developer bebas menentukan tampilan visual sesuai kebutuhan desain.

Keuntungan headless UI:

- Aksesibilitas sudah ditangani (keyboard navigation, focus trap, ARIA).
- Styling fleksibel tanpa override yang sulit.
- Logika kompleks seperti dropdown, dialog, dan tabs terpisah dari presentasi.

## Radix Primitives

Radix adalah library headless UI populer. Komponen seperti Dialog, DropdownMenu, dan Tooltip disediakan sebagai primitives yang dapat dikomposisikan.

\`\`\`jsx
<Dialog.Root>
  <Dialog.Trigger>Buka</Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Overlay />
    <Dialog.Content>
      <Dialog.Title>Konfirmasi</Dialog.Title>
      <Dialog.Description>Apakah Anda yakin?</Dialog.Description>
      <Dialog.Close>Tutup</Dialog.Close>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
\`\`\`

## shadcn/ui

shadcn/ui bukan library komponen yang di-install melalui npm. Sebaliknya, kode komponen disalin langsung ke proyek. shadcn/ui menggunakan Tailwind CSS dan Radix Primitives sebagai fondasi.

Keuntungan shadcn/ui:

- Komponen sepenuhnya dimiliki oleh proyek.
- Mudah dikustomisasi tanpa bergantung pada API library eksternal.
- Menggabungkan aksesibilitas Radix dengan fleksibilitas Tailwind.

## Komposisi Komponen

Komposisi berarti membangun komponen kompleks dari komponen kecil yang fokus pada satu tanggung jawab. Pola ini meningkatkan reusability dan testability.`,
    },
    {
      id: 'sec-07-advanced-example',
      type: 'code-example',
      codeExample: {
        id: 'code-07-advanced',
        filename: 'Button.tsx',
        language: 'typescript',
        title: 'Tailwind + CVA: Komponen Button dengan Variant',
        code: `import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent',
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4',
        lg: 'h-11 px-6 text-lg',
      },
    },
    defaultVariants: { variant: 'default', size: 'md' },
  },
)

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>

function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant, size }), className)} {...props} />
  )
}`,
        explanation:
          'CVA mengelola variant styling secara type-safe dengan Tailwind utility classes. Pola ini dipakai shadcn/ui: design tokens didefinisikan sebagai CSS variables di Tailwind config, lalu dikonsumsi melalui variant yang konsisten di seluruh aplikasi.',
      },
    },
    {
      id: 'sec-07-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Key insight:** Pilih strategi styling berdasarkan kebutuhan tim dan produk. Tailwind cepat untuk prototyping, CVA membantu mengelola variant, dan Radix/shadcn/ui memberikan fondasi aksesibel yang dapat dikustomisasi sepenuhnya.',
    },
  ],
}
