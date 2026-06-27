import type { Quiz } from '@/content/types'

export const ch04Quiz: Quiz = {
  id: 'quiz-ch-04-request-validation',
  title: 'Quiz: Request Validation',
  passingScore: 8,
  questions: [
    {
      id: 'q-04-01',
      order: 1,
      prompt: 'Mengapa validasi input penting di sisi server meskipun sudah divalidasi di frontend?',
      options: [
        'Frontend selalu benar sehingga validasi server tidak perlu',
        'Client dapat mem-bypass frontend, sehingga server harus memastikan keabsahan data',
        'Validasi server hanya untuk mempercantik error message',
        'Karena backend lebih lambat dan perlu bekerja',
      ],
      correctOptionIndex: 1,
      explanation:
        'Server adalah otoritas akhir. Request dapat datang dari client mana saja, termasuk yang tidak melalui UI resmi.',
    },
    {
      id: 'q-04-02',
      order: 2,
      prompt: 'Apa keunggulan schema-based validation dibanding validasi manual murni?',
      options: [
        'Lebih sulit dibaca oleh developer',
        'Deklaratif, reusable, dan dapat menghasilkan tipe TypeScript otomatis',
        'Selalu lebih cepat saat runtime',
        'Tidak memerlukan library tambahan',
      ],
      correctOptionIndex: 1,
      explanation:
        'Schema seperti Zod bersifat deklaratif, dapat digunakan lintas layer, dan dapat diteruskan ke TypeScript untuk inferensi tipe.',
    },
    {
      id: 'q-04-03',
      order: 3,
      prompt: 'Manakah contoh error formatting yang actionable?',
      options: [
        '"Bad Request"',
        '"Invalid input"',
        '{ "field": "email", "message": "email must be a valid email address" }',
        '"Server error"',
      ],
      correctOptionIndex: 2,
      explanation:
        'Error yang menyebutkan field dan constraint yang gagal memudahkan client menampilkan pesan yang tepat kepada pengguna.',
    },
    {
      id: 'q-04-04',
      order: 4,
      prompt: 'Validasi lintas field (cross-field) paling tepat diimplementasikan sebagai?',
      options: [
        'Validasi bawaan library seperti .string()',
        'Custom validator yang membandingkan dua field',
        'Hanya di database',
        'Tidak perlu divalidasi',
      ],
      correctOptionIndex: 1,
      explanation:
        'Aturan seperti password dan confirmPassword harus sama tidak dapat diwakili oleh validasi single-field, sehingga perlu custom validator.',
    },
    {
      id: 'q-04-05',
      order: 5,
      prompt: 'Di NestJS, decorator @IsEmail() berasal dari?',
      options: ['class-validator', 'Zod', 'Joi', 'Yup'],
      correctOptionIndex: 0,
      explanation:
        'NestJS umumnya mengintegrasikan class-validator dan class-transformer melalui ValidationPipe.',
    },
    {
      id: 'q-04-06',
      order: 6,
      prompt: 'Apa fungsi transform: true pada ValidationPipe NestJS?',
      options: [
        'Mengabaikan semua error validasi',
        'Mengubah plain object menjadi instance class DTO',
        'Menghapus field yang tidak diinginkan',
        'Menonaktifkan validasi',
      ],
      correctOptionIndex: 1,
      explanation:
        'class-transformer akan mengonversi payload menjadi instance class DTO sehingga decorator class-validator dapat bekerja.',
    },
    {
      id: 'q-04-07',
      order: 7,
      prompt: 'Validasi tipe data numerik dari query parameter sering memerlukan?',
      options: [
        'Tidak perlu validasi karena query selalu number',
        'Coercion dari string ke number karena query adalah string',
        'Mengubah method GET menjadi POST',
        'Menghapus query parameter',
      ],
      correctOptionIndex: 1,
      explanation:
        'Query parameters selalu berupa string, sehingga perlu parsing/coercion ke number atau boolean sebelum validasi.',
    },
    {
      id: 'q-04-08',
      order: 8,
      prompt: 'OWASP Input Validation Cheat Sheet merekomendasikan?',
      options: [
        'Mempercayai semua input dari client',
        'Validasi whitelist, sanitize output, dan fail securely',
        'Hanya menyimpan input tanpa validasi',
        'Mengandalkan frontend untuk keamanan',
      ],
      correctOptionIndex: 1,
      explanation:
        'Pendekatan whitelist hanya menerima input yang dikenal, sementara sanitasi output melindungi dari injeksi saat data ditampilkan.',
    },
  ],
}
