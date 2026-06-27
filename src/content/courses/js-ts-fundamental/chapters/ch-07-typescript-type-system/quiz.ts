import type { Quiz } from '@/content/types'

export const ch07Quiz: Quiz = {
  id: 'quiz-ch-07-typescript-type-system',
  title: 'Quiz: TypeScript Type System',
  passingScore: 8,
  questions: [
    {
      id: 'q-07-01',
      order: 1,
      prompt: 'Manakah pernyataan yang paling tepat mengenai perbedaan type annotation dan type inference di TypeScript?',
      options: [
        'Type annotation menulis tipe secara eksplisit, type inference membiarkan TypeScript menyimpulkan tipe dari nilai.',
        'Type annotation hanya bisa digunakan untuk variabel, type inference hanya untuk fungsi.',
        'Type inference selalu lebih aman daripada type annotation.',
        'Type annotation dan type inference tidak bisa digunakan bersamaan dalam satu file.',
      ],
      correctOptionIndex: 0,
      explanation:
        'Type annotation menuliskan tipe secara eksplisit, sedangkan type inference membiarkan TypeScript menyimpulkan tipe dari nilai yang diberikan. Keduanya valid dan bisa digunakan bersamaan.',
    },
    {
      id: 'q-07-02',
      order: 2,
      prompt: 'Tipe mana di TypeScript yang memaksa programmer melakukan pengecekan sebelum nilai bisa digunakan?',
      options: ['any', 'unknown', 'never', 'void'],
      correctOptionIndex: 1,
      explanation:
        'Tipe unknown bisa menampung nilai apa pun, tetapi kita harus mempersempitnya terlebih dahulu melalui pengecekan tipe sebelum menggunakannya. Tipe any justru melepaskan semua pemeriksaan tipe.',
    },
    {
      id: 'q-07-03',
      order: 3,
      prompt: 'Apa fungsi utama dari tipe never di TypeScript?',
      options: [
        'Menandai nilai yang bisa menjadi tipe apa pun.',
        'Merepresentasikan nilai yang tidak pernah terjadi, seperti fungsi yang selalu melempar error.',
        'Menandai variabel yang belum diinisialisasi.',
        'Menggantikan tipe void pada fungsi tanpa return.',
      ],
      correctOptionIndex: 1,
      explanation:
        'Tipe never merepresentasikan nilai yang tidak mungkin terjadi. Contohnya adalah fungsi yang selalu melempar error atau loop yang tidak pernah berhenti.',
    },
    {
      id: 'q-07-04',
      order: 4,
      prompt: 'Bagaimana cara mendeklarasikan property opsional pada interface di TypeScript?',
      options: [
        'Dengan menambahkan tanda tanya (?) setelah nama property.',
        'Dengan menambahkan tanda seru (!) setelah nama property.',
        'Dengan menambahkan tipe undefined secara manual.',
        'Dengan menggunakan kata kunci optional di depan property.',
      ],
      correctOptionIndex: 0,
      explanation:
        'Property opsional pada interface ditandai dengan tanda tanya (?) setelah nama property, misalnya description?: string.',
    },
    {
      id: 'q-07-05',
      order: 5,
      prompt: 'Manakah yang merupakan contoh union type di TypeScript?',
      options: [
        'type Person = Named & Aged;',
        'type Status = "active" | "inactive" | "pending";',
        'interface Admin extends User { role: string; }',
        'function identity<T>(value: T): T { return value; }',
      ],
      correctOptionIndex: 1,
      explanation:
        'Union type menggunakan tanda pipa (|) untuk menyatakan bahwa nilai bisa salah satu dari beberapa tipe. Contohnya adalah Status yang bisa bernilai active, inactive, atau pending.',
    },
    {
      id: 'q-07-06',
      order: 6,
      prompt: 'Apa kegunaan utama generics di TypeScript?',
      options: [
        'Membuat variabel bisa menyimpan nilai dari tipe berbeda secara bersamaan.',
        'Membuat fungsi, interface, atau kelas yang bekerja untuk berbagai tipe tanpa kehilangan informasi tipe.',
        'Mengubah tipe any menjadi unknown secara otomatis.',
        'Menonaktifkan pemeriksaan tipe pada bagian tertentu dari kode.',
      ],
      correctOptionIndex: 1,
      explanation:
        'Generics memungkinkan kita membuat komponen yang bekerja untuk berbagai tipe dan tetap menjaga type safety, karena informasi tipe tidak hilang.',
    },
    {
      id: 'q-07-07',
      order: 7,
      prompt: 'Teknik apa yang digunakan untuk mempersempit tipe union berdasarkan pengecekan runtime?',
      options: [
        'Type assertion',
        'Type narrowing',
        'Type annotation',
        'Type alias',
      ],
      correctOptionIndex: 1,
      explanation:
        'Type narrowing mempersempit tipe yang lebih luas menjadi lebih spesifik berdasarkan pengecekan runtime, seperti typeof, instanceof, atau custom type guard.',
    },
    {
      id: 'q-07-08',
      order: 8,
      prompt: 'Bagaimana cara menulis custom type guard di TypeScript?',
      options: [
        'function isString(value: unknown): value is string { return typeof value === "string"; }',
        'function isString(value: unknown): boolean { return typeof value === "string"; }',
        'type isString = (value: unknown) => boolean;',
        'const isString = typeof value === "string";',
      ],
      correctOptionIndex: 0,
      explanation:
        'Custom type guard mengembalikan tipe predikat value is Type, sehingga TypeScript bisa mempersempit tipe setelah pengecekan. Return type boolean biasa tidak memberi informasi narrowing kepada TypeScript.',
    },
  ],
}
