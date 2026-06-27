import type { Quiz } from '@/content/types'

export const ch06Quiz: Quiz = {
  id: 'quiz-ch-06-forms-validation-di-react',
  title: 'Quiz: Forms & Validation di React',
  passingScore: 8,
  questions: [
    {
      id: 'q-06-01',
      order: 1,
      prompt: 'Apa perbedaan utama controlled dan uncontrolled input?',
      options: [
        'Controlled input tidak memiliki event onChange',
        'Controlled input nilainya dikelola oleh state React; uncontrolled oleh DOM',
        'Uncontrolled input tidak bisa digunakan di form',
        'Controlled input selalu lebih lambat',
      ],
      correctOptionIndex: 1,
      explanation:
        'Pada controlled input, React menjadi sumber kebenaran nilai input. Uncontrolled input membiarkan DOM menyimpan nilainya.',
    },
    {
      id: 'q-06-02',
      order: 2,
      prompt: 'Mengapa React Hook Form mengurangi re-render dibanding controlled form biasa?',
      options: [
        'Karena tidak menggunakan state sama sekali',
        'Karena menggunakan uncontrolled inputs dengan ref dan event handler internal',
        'Karena menghilangkan validasi',
        'Karena hanya merender saat submit',
      ],
      correctOptionIndex: 1,
      explanation:
        'RHF menyimpan form state di ref dan internal state, sehingga tidak perlu merender pada setiap perubahan input.',
    },
    {
      id: 'q-06-03',
      order: 3,
      prompt: 'Apa fungsi register di React Hook Form?',
      options: [
        'Mendaftarkan komponen ke React Context',
        'Menghubungkan input ke RHF melalui ref, name, dan event handler',
        'Mengirim data form ke server',
        'Menyimpan nilai input di localStorage',
      ],
      correctOptionIndex: 1,
      explanation:
        'register mengembalikan props ref, name, onChange, onBlur yang menghubungkan input ke form state RHF.',
    },
    {
      id: 'q-06-04',
      order: 4,
      prompt: 'Apa keuntungan menggunakan Zod untuk validasi form?',
      options: [
        'Zod otomatis merender komponen form',
        'Zod menyediakan schema validation dengan TypeScript inference',
        'Zod menggantikan fungsi handleSubmit',
        'Zod hanya bekerja dengan class component',
      ],
      correctOptionIndex: 1,
      explanation:
        'Dengan Zod, schema validasi sekaligus menjadi sumber tipe TypeScript melalui z.infer.',
    },
    {
      id: 'q-06-05',
      order: 5,
      prompt: 'Apa peran resolver dalam React Hook Form?',
      options: [
        'Menghubungkan RHF dengan library validasi eksternal seperti Zod',
        'Mengganti fungsi register',
        'Menyimpan nilai form ke database',
        'Membuat form menjadi controlled',
      ],
      correctOptionIndex: 0,
      explanation:
        'Resolver menerjemahkan hasil validasi library eksternal ke format error yang dipahami RHF.',
    },
    {
      id: 'q-06-06',
      order: 6,
      prompt: 'Hook apa yang digunakan untuk form dengan jumlah field dinamis di RHF?',
      options: ['useWatch', 'useFieldArray', 'useController', 'useFormState'],
      correctOptionIndex: 1,
      explanation:
        'useFieldArray menyediakan fields, append, remove, dan insert untuk mengelola daftar field dinamis.',
    },
    {
      id: 'q-06-07',
      order: 7,
      prompt: 'Mengapa field.id dari useFieldArray penting sebagai key?',
      options: [
        'Agar React dapat melacak identitas setiap item meskipun urutan berubah',
        'Agar form dapat disubmit',
        'Agar register berfungsi',
        'Agar Zod dapat memvalidasi',
      ],
      correctOptionIndex: 0,
      explanation:
        'field.id adalah identifier unik dan stabil yang dihasilkan RHF untuk setiap item field array, mirip konsep key di daftar React.',
    },
    {
      id: 'q-06-08',
      order: 8,
      prompt: 'Kapan sebaiknya menggunakan controlled form daripada RHF?',
      options: [
        'Untuk form kompleks dengan banyak field dan validasi real-time',
        'Untuk form yang memerlukan sinkronisasi nilai input dengan state UI setiap saat',
        'Untuk form dengan field arrays',
        'Untuk form dengan schema validation Zod',
      ],
      correctOptionIndex: 1,
      explanation:
        'Controlled form cocok ketika nilai input harus segera tersedia di state untuk logika UI, seperti autocomplete suggestion atau format currency real-time.',
    },
  ],
}
