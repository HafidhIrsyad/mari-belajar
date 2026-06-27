import type { Quiz } from '@/content/types'

export const ch03Quiz: Quiz = {
  id: 'quiz-ch-03-reflection',
  title: 'Quiz: Reflection & Code Generation',
  passingScore: 8,
  questions: [
    {
      id: 'q-03-01',
      order: 1,
      prompt: 'Apa yang dikembalikan oleh reflect.TypeOf(x)?',
      options: [
        'Nilai dari x',
        'Deskripsi tipe dari x',
        'Ukuran memori x',
        'Alamat memori x',
      ],
      correctOptionIndex: 1,
      explanation:
        'reflect.TypeOf mengembalikan reflect.Type yang mendeskripsikan tipe dari nilai x.',
    },
    {
      id: 'q-03-02',
      order: 2,
      prompt: 'Apa perbedaan kind dan type dalam reflection?',
      options: [
        'Kind adalah nama tipe, type adalah kategori tipe',
        'Kind adalah kategori tipe dasar, type bisa bersifat bernama seperti time.Time',
        'Kind hanya untuk struct, type hanya untuk primitive',
        'Tidak ada perbedaan',
      ],
      correctOptionIndex: 1,
      explanation:
        'Kind adalah kategori primitif seperti reflect.Struct atau reflect.Int, sedangkan type bisa bernama seperti time.Time yang kind-nya struct.',
    },
    {
      id: 'q-03-03',
      order: 3,
      prompt: 'Bagaimana cara membaca struct tag `json:"name"` dari sebuah field?',
      options: [
        'field.Tag.Get("json")',
        'field.Tag.Lookup("name")',
        'reflect.ValueOf(field).String()',
        'field.Tag["json"]',
      ],
      correctOptionIndex: 0,
      explanation:
        'Struct tag dibaca dengan field.Tag.Get("json") atau field.Tag.Lookup("json").',
    },
    {
      id: 'q-03-04',
      order: 4,
      prompt: 'Kapan `go generate` dijalankan?',
      options: [
        'Secara otomatis saat `go build`',
        'Ketika developer menjalankan `go generate` secara manual',
        'Saat program di-run',
        'Saat `go test`',
      ],
      correctOptionIndex: 1,
      explanation:
        'go generate adalah perintah terpisah yang dijalankan oleh developer; tidak otomatis berjalan saat build atau test.',
    },
    {
      id: 'q-03-05',
      order: 5,
      prompt: 'Apa keuntungan code generation dibanding reflection?',
      options: [
        'Lebih fleksibel saat runtime',
        'Performa sama dengan kode manual dan type safety penuh',
        'Tidak memerlukan file sumber',
        'Selalu lebih mudah ditulis',
      ],
      correctOptionIndex: 1,
      explanation:
        'Code generation menghasilkan kode statis yang diperiksa compiler, sehingga performanya setara kode manual dan memiliki type safety penuh.',
    },
    {
      id: 'q-03-06',
      order: 6,
      prompt: 'Package apa yang digunakan untuk memparse AST kode Go?',
      options: [
        'reflect',
        'go/ast',
        'go/generate',
        'fmt',
      ],
      correctOptionIndex: 1,
      explanation:
        'Package go/ast bersama go/parser dan go/token digunakan untuk memparse kode Go menjadi abstract syntax tree.',
    },
    {
      id: 'q-03-07',
      order: 7,
      prompt: 'Mengapa reflection sering dihindari di hot path?',
      options: [
        'Karena reflection selalu menyebabkan race condition',
        'Karena reflection memiliki overhead runtime dan mengorbankan type safety',
        'Karena reflection tidak bisa membaca struct',
        'Karena reflection hanya berfungsi di main package',
      ],
      correctOptionIndex: 1,
      explanation:
        'Reflection lebih lambat dari akses langsung dan kesalahan baru terdeteksi saat runtime, sehingga kurang cocok untuk hot path.',
    },
    {
      id: 'q-03-08',
      order: 8,
      prompt: 'Apa yang terjadi jika reflect.ValueOf menerima pointer?',
      options: [
        'Tidak bisa diproses',
        'Kind-nya adalah reflect.Ptr; perlu Elem() untuk mengakses nilai yang ditunjuk',
        'Otomatis dideference',
        'Menghasilkan panic',
      ],
      correctOptionIndex: 1,
      explanation:
        'reflect.ValueOf pada pointer menghasilkan Value dengan kind Ptr. Untuk mengakses nilai yang ditunjuk, gunakan Elem().',
    },
  ],
}
