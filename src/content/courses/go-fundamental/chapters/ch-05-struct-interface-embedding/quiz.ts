import type { Quiz } from '@/content/types'

export const ch05Quiz: Quiz = {
  id: 'quiz-ch-05-struct-interface-embedding',
  title: 'Quiz: Struct, Interface & Embedding',
  passingScore: 8,
  questions: [
    {
      id: 'q-05-01',
      order: 1,
      prompt: 'Bagaimana tipe di Go memenuhi sebuah interface?',
      options: [
        'Secara implisit dengan mengimplementasikan semua method yang diminta',
        'Dengan keyword implements',
        'Dengan extends seperti class',
        'Dengan deklarasi explicit di file terpisah',
      ],
      correctOptionIndex: 0,
      explanation:
        'Go menggunakan structural typing: tipe memenuhi interface jika memiliki semua method yang diminta tanpa perlu implements.',
    },
    {
      id: 'q-05-02',
      order: 2,
      prompt: 'Apa fungsi struct tags seperti json:"name"?',
      options: [
        'Metadata untuk serialization/deserialization',
        'Menandai field sebagai privat',
        'Mendefinisikan method secara otomatis',
        'Menentukan tipe field saat runtime',
      ],
      correctOptionIndex: 0,
      explanation:
        'Struct tags adalah metadata string yang sering digunakan oleh package seperti encoding/json untuk mapping nama field.',
    },
    {
      id: 'q-05-03',
      order: 3,
      prompt: 'Apa kegunaan type assertion?',
      options: [
        'Mengakses nilai konkret dari nilai interface',
        'Mengecek apakah fungsi memiliki return value',
        'Mengkonversi interface ke struct',
        'Membuat interface baru dari tipe konkret',
      ],
      correctOptionIndex: 0,
      explanation:
        'Type assertion digunakan untuk mengakses nilai dan tipe konkret yang disimpan di dalam nilai interface.',
    },
    {
      id: 'q-05-04',
      order: 4,
      prompt: 'Apa hasil dari type assertion aman berikut jika i adalah int?\ns, ok := i.(string)',
      options: [
        's berisi zero value string dan ok bernilai false',
        'Program panic',
        's berisi nilai int sebagai string',
        'Compile error',
      ],
      correctOptionIndex: 0,
      explanation:
        'Type assertion dua nilai tidak panic. ok bernilai false dan s berisi zero value dari tipe yang dituju.',
    },
    {
      id: 'q-05-05',
      order: 5,
      prompt: 'Apa yang dimaksud dengan promoted method dalam struct embedding?',
      options: [
        'Method dari struct yang disematkan bisa dipanggil langsung dari struct luar',
        'Method yang otomatis dibuat oleh compiler',
        'Method yang hanya bisa diakses melalui pointer',
        'Method yang dipromosikan ke package global',
      ],
      correctOptionIndex: 0,
      explanation:
        'Struct embedding mempromosikan field dan method sehingga bisa diakses langsung dari struct yang menaunginya.',
    },
    {
      id: 'q-05-06',
      order: 6,
      prompt: 'Mengapa interface{} atau any bisa menampung nilai apa pun?',
      options: [
        'Karena tidak ada method yang harus dipenuhi',
        'Karena semua tipe secara otomatis mengimplementasikannya',
        'Karena Go melakukan type coercion',
        'Karena any adalah tipe dasar seperti object di Java',
      ],
      correctOptionIndex: 0,
      explanation:
        'Empty interface tidak memiliki method, sehingga setiap tipe secara trivial memenuhinya.',
    },
    {
      id: 'q-05-07',
      order: 7,
      prompt: 'Apa perbedaan embedding dan inheritance?',
      options: [
        'Embedding adalah composition, inheritance adalah hubungan is-a',
        'Embedding membuat child class, inheritance membuat struct',
        'Embedding hanya berlaku untuk interface',
        'Tidak ada perbedaan di Go',
      ],
      correctOptionIndex: 0,
      explanation:
        'Embedding menyediakan composition: struct luar memiliki struct dalam sebagai field. Inheritance menyatakan hubungan is-a.',
    },
    {
      id: 'q-05-08',
      order: 8,
      prompt: 'Bagaimana cara menangani beberapa kemungkinan tipe dari nilai interface?',
      options: [
        'Type switch',
        'If switch',
        'Interface switch',
        'Generic switch',
      ],
      correctOptionIndex: 0,
      explanation:
        'Type switch memungkinkan pemeriksaan dan penanganan beberapa kemungkinan tipe konkret dari nilai interface.',
    },
  ],
}
