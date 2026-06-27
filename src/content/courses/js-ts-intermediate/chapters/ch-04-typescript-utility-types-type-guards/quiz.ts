import type { Quiz } from '@/content/types'

export const ch04Quiz: Quiz = {
  id: 'quiz-ch-04-typescript-utility-types-type-guards',
  title: 'Quiz: TypeScript Utility Types & Type Guards',
  passingScore: 8,
  questions: [
    {
      id: 'q-04-01',
      order: 1,
      prompt: 'Utility type apa yang membuat semua property menjadi opsional?',
      options: [
        'Required<T>',
        'Partial<T>',
        'Readonly<T>',
        'Record<K, T>',
      ],
      correctOptionIndex: 1,
      explanation:
        'Partial<T> membuat setiap property pada T menjadi opsional.',
    },
    {
      id: 'q-04-02',
      order: 2,
      prompt: 'Utility type mana yang menghilangkan property tertentu dari tipe?',
      options: [
        'Pick<T, K>',
        'Omit<T, K>',
        'Exclude<T, U>',
        'Extract<T, U>',
      ],
      correctOptionIndex: 1,
      explanation:
        'Omit<T, K> menghilangkan property K dari tipe T, sedangkan Pick mengambil property K.',
    },
    {
      id: 'q-04-03',
      order: 3,
      prompt: 'Type guard seperti typeof x === "string" berguna untuk?',
      options: [
        'Membuat property readonly',
        'Mempersempit union type ke tipe spesifik saat runtime',
        'Mengekstrak parameter fungsi',
        'Menghapus null dari tipe',
      ],
      correctOptionIndex: 1,
      explanation:
        'Type guard memberi informasi runtime kepada TypeScript sehingga tipe bisa dipersempit.',
    },
    {
      id: 'q-04-04',
      order: 4,
      prompt: 'Utility type mana yang mengekstrak tipe return dari function type?',
      options: [
        'Parameters<T>',
        'ReturnType<T>',
        'InstanceType<T>',
        'ThisParameterType<T>',
      ],
      correctOptionIndex: 1,
      explanation:
        'ReturnType<T> mengekstrak tipe nilai kembalian dari sebuah function type.',
    },
    {
      id: 'q-04-05',
      order: 5,
      prompt: 'Apa hasil dari Exclude<"a" | "b" | "c", "a">?',
      options: [
        '"a"',
        '"b" | "c"',
        '"a" | "b" | "c"',
        'never',
      ],
      correctOptionIndex: 1,
      explanation:
        'Exclude menghilangkan tipe yang bisa diassign ke tipe kedua, sehingga "a" dihapus.',
    },
    {
      id: 'q-04-06',
      order: 6,
      prompt: 'Dalam conditional type, keyword apa yang digunakan untuk menarik tipe dari generic?',
      options: [
        'extract',
        'infer',
        'derive',
        'pick',
      ],
      correctOptionIndex: 1,
      explanation:
        'infer digunakan di dalam extends clause untuk menarik tipe dari posisi tertentu, seperti Promise<infer U>.',
    },
    {
      id: 'q-04-07',
      order: 7,
      prompt: 'Template literal types di TypeScript berguna untuk?',
      options: [
        'Membuat string HTML secara otomatis',
        'Membatasan pola string di level tipe',
        'Mengganti runtime regex',
        'Mengompilasi template engine',
      ],
      correctOptionIndex: 1,
      explanation:
        'Template literal types memungkinkan kita membentuk union string berdasarkan pola, misalnya onClick dari event click.',
    },
    {
      id: 'q-04-08',
      order: 8,
      prompt: 'Manakah yang merupakan mapped type?',
      options: [
        'type A = T extends string ? true : false;',
        'type Nullable<T> = { [K in keyof T]: T[K] | null };',
        'type B = ReturnType<typeof fn>;',
        'type C = Parameters<typeof fn>[0];',
      ],
      correctOptionIndex: 1,
      explanation:
        'Mapped type mengiterasi key dari tipe lain dengan sintaks [K in keyof T].',
    },
  ],
}
