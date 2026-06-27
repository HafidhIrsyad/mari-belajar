import type { Quiz } from '@/content/types'

export const ch05Quiz: Quiz = {
  id: 'quiz-ch-05-advanced-typescript-di-frontend',
  title: 'Quiz: Advanced TypeScript di Frontend',
  passingScore: 8,
  questions: [
    {
      id: 'q-05-01',
      order: 1,
      prompt: 'Apa keuntungan utama generic components di React?',
      options: [
        'Mengurangi jumlah file komponen',
        'Reuse logic dengan tetap menjaga type safety untuk berbagai tipe data',
        'Menghilangkan kebutuhan untuk props',
        'Membuat komponen selalu lebih cepat dirender',
      ],
      correctOptionIndex: 1,
      explanation:
        'Generic components memungkinkan satu implementasi bekerja untuk banyak tipe data dengan inferensi tipe yang benar.',
    },
    {
      id: 'q-05-02',
      order: 2,
      prompt: 'Tantangan utama saat membangun polymorphic component adalah?',
      options: [
        'Komponen tidak dapat menerima children',
        'Prop yang valid dan ref forwarding bergantung pada elemen target',
        'TypeScript tidak mendukung prop as',
        'Polymorphic component selalu menghasilkan error runtime',
      ],
      correctOptionIndex: 1,
      explanation:
        'Polymorphic component harus menangani prop yang berbeda-beda dan ref forwarding sesuai elemen yang ditentukan oleh prop as.',
    },
    {
      id: 'q-05-03',
      order: 3,
      prompt: 'Mengapa createContext<T>(null!) dianggap kurang aman?',
      options: [
        'Karena null bukan nilai yang valid untuk context',
        'Karena menghilangkan type safety saat context digunakan di luar Provider',
        'Karena context tidak dapat digunakan dengan hooks',
        'Karena menyebabkan memory leak',
      ],
      correctOptionIndex: 1,
      explanation:
        'Non-null assertion memberitahu TypeScript bahwa nilai tidak akan null, padahal jika konsumen berada di luar Provider, nilai tersebut null.',
    },
    {
      id: 'q-05-04',
      order: 4,
      prompt: 'Apa tujuan discriminated union untuk UI state?',
      options: [
        'Menggabungkan semua state menjadi satu objek besar',
        'Membuat state lebih eksplisit dan memungkinkan TypeScript men narrow tipe otomatis',
        'Menghapus kebutuhan untuk useState',
        'Meningkatkan performa rendering secara drastis',
      ],
      correctOptionIndex: 1,
      explanation:
        'Discriminated union menggunakan tag literal sehingga TypeScript tahu properti mana yang tersedia di setiap state.',
    },
    {
      id: 'q-05-05',
      order: 5,
      prompt: 'Mengapa API contracts perlu didefinisikan sebagai tipe bersama?',
      options: [
        'Agar frontend tidak perlu melakukan fetch',
        'Untuk mengurangi ukuran bundle',
        'Untuk menjaga konsistensi antara frontend dan backend serta membantu menangkap bug integrasi',
        'Agar backend dapat mengganti database tanpa perubahan',
      ],
      correctOptionIndex: 2,
      explanation:
        'Contract yang dibagikan memastikan kedua sisi memiliki pemahaman yang sama tentang shape data dan endpoint.',
    },
    {
      id: 'q-05-06',
      order: 6,
      prompt: 'Type event yang tepat untuk handler onClick pada tombol adalah?',
      options: [
        'React.ChangeEvent<HTMLButtonElement>',
        'React.MouseEvent<HTMLButtonElement>',
        'React.FormEvent<HTMLButtonElement>',
        'React.KeyboardEvent<HTMLButtonElement>',
      ],
      correctOptionIndex: 1,
      explanation:
        'MouseEvent adalah tipe yang benar untuk event klik pada elemen button.',
    },
    {
      id: 'q-05-07',
      order: 7,
      prompt: 'Apa keuntungan menggunakan schema validation seperti Zod bersama TypeScript?',
      options: [
        'Menghapus kebutuhan untuk runtime checks',
        'Dapat menurunkan TypeScript types dari schema sehingga type safety dan runtime validation selaras',
        'Membuat aplikasi tidak memerlukan backend',
        'Menggantikan seluruh unit test',
      ],
      correctOptionIndex: 1,
      explanation:
        'Zod dan library sejenisnya memungkinkan derive tipe TypeScript dari schema, sehingga satu sumber kebenaran untuk validasi runtime dan compile-time.',
    },
    {
      id: 'q-05-08',
      order: 8,
      prompt: 'Dalam polymorphic component, utility type React.ComponentPropsWithRef digunakan untuk?',
      options: [
        'Menghapus semua props dari elemen target',
        'Mendapatkan props yang valid termasuk ref untuk elemen target',
        'Menambahkan prop as secara otomatis',
        'Membuat komponen tidak perlu forwardRef',
      ],
      correctOptionIndex: 1,
      explanation:
        'ComponentPropsWithRef menyediakan semua props termasuk ref yang valid untuk elemen atau komponen target.',
    },
  ],
}
