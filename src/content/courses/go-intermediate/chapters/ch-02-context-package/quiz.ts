import type { Quiz } from '@/content/types'

export const ch02Quiz: Quiz = {
  id: 'quiz-ch-02-context-package',
  title: 'Quiz: Context Package',
  passingScore: 8,
  questions: [
    {
      id: 'q-02-01',
      order: 1,
      prompt: 'Fungsi apa yang digunakan untuk membuat context root standar?',
      options: [
        'context.New()',
        'context.Background()',
        'context.Root()',
        'context.Empty()',
      ],
      correctOptionIndex: 1,
      explanation:
        'context.Background() menghasilkan context kosong yang biasanya menjadi root untuk aplikasi, test, atau main.',
    },
    {
      id: 'q-02-02',
      order: 2,
      prompt: 'Apa yang terjadi saat fungsi cancel dari WithCancel dipanggil?',
      options: [
        'Program berhenti',
        'Channel Done child context ditutup',
        'Semua goroutine dihapus',
        'Parent context ikut dibatalkan',
      ],
      correctOptionIndex: 1,
      explanation:
        'Memanggil cancel akan menutup channel Done pada context child dan semua turunannya, namun tidak membatalkan parent.',
    },
    {
      id: 'q-02-03',
      order: 3,
      prompt: 'Bagaimana cara memberi batas waktu relatif pada context?',
      options: [
        'context.WithDeadline',
        'context.WithTimeout',
        'context.WithCancel',
        'context.WithValue',
      ],
      correctOptionIndex: 1,
      explanation:
        'context.WithTimeout menerima durasi (time.Duration) dan membatalkan context setelah durasi tersebut berlalu.',
    },
    {
      id: 'q-02-04',
      order: 4,
      prompt: 'Method apa yang mengembalikan error penyebab pembatalan context?',
      options: [
        'ctx.Error()',
        'ctx.Err()',
        'ctx.Done()',
        'ctx.Cancel()',
      ],
      correctOptionIndex: 1,
      explanation:
        'ctx.Err() mengembalikan context.Canceled atau context.DeadlineExceeded jika context sudah dibatalkan, atau nil jika masih aktif.',
    },
    {
      id: 'q-02-05',
      order: 5,
      prompt: 'Mengapa disarankan menggunakan tipe khusus sebagai key untuk WithValue?',
      options: [
        'Agar nilai bisa diubah',
        'Untuk menghindari konflik key antar package',
        'Agar context lebih ringan',
        'Agar channel Done otomatis aktif',
      ],
      correctOptionIndex: 1,
      explanation:
        'Dengan tipe yang tidak diekspor, key tidak akan bentrok dengan key dari package lain yang mungkin menggunakan string yang sama.',
    },
    {
      id: 'q-02-06',
      order: 6,
      prompt: 'Apa yang dimaksud dengan propagasi context tree?',
      options: [
        'Context hanya bisa dipakai satu kali',
        'Pembatalan parent menyebar ke semua child context',
        'Child context bisa membatalkan parent',
        'Context tidak bisa di-pass antar fungsi',
      ],
      correctOptionIndex: 1,
      explanation:
        'Context membentuk tree. Membatalkan parent akan menutup Done channel pada semua child, grandchild, dan seterusnya.',
    },
    {
      id: 'q-02-07',
      order: 7,
      prompt: 'Data apa yang paling cocok disimpan dengan WithValue?',
      options: [
        'Dependency besar seperti database connection',
        'Request-scoped value seperti request ID',
        'Konfigurasi global aplikasi',
        'Semua parameter fungsi',
      ],
      correctOptionIndex: 1,
      explanation:
        'WithValue dirancang untuk data request-scoped kecil seperti request ID, user claims, atau correlation ID.',
    },
    {
      id: 'q-02-08',
      order: 8,
      prompt: 'Mengapa harus selalu memanggil cancel setelah WithTimeout?',
      options: [
        'Agar goroutine timer dan resource dilepas tepat waktu',
        'Agar nilai di context terhapus',
        'Agar parent context ikut timeout',
        'Karena tidak memanggil cancel akan menyebabkan compile error',
      ],
      correctOptionIndex: 0,
      explanation:
        'Memanggil cancel memastikan timer dan goroutine background dilepas, mencegah resource leak meskipun timeout belum tercapai.',
    },
  ],
}
