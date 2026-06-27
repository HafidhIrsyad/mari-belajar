import type { Quiz } from '@/content/types'

export const ch08Quiz: Quiz = {
  id: 'quiz-ch-08-testing-and-tooling-dasar',
  title: 'Quiz: Testing & Tooling Dasar',
  passingScore: 8,
  questions: [
    {
      id: 'q-08-01',
      order: 1,
      prompt: 'Suffix apa yang menandakan file test di Go?',
      options: [
        '_test.go',
        '.test.go',
        '.spec.go',
        '_spec.go',
      ],
      correctOptionIndex: 0,
      explanation:
        'File dengan suffix _test.go dianggap file test oleh go test dan tidak masuk ke binary produksi.',
    },
    {
      id: 'q-08-02',
      order: 2,
      prompt: 'Tipe apa yang digunakan untuk benchmark di Go?',
      options: [
        '*testing.B',
        '*testing.Benchmark',
        '*testing.Perf',
        '*testing.Timer',
      ],
      correctOptionIndex: 0,
      explanation:
        'Benchmark menggunakan *testing.B, sedangkan unit test menggunakan *testing.T.',
    },
    {
      id: 'q-08-03',
      order: 3,
      prompt: 'Apa keuntungan table-driven test?',
      options: [
        'Menambah kasus uji tanpa membuat fungsi test baru',
        'Test berjalan lebih lambat',
        'Tidak perlu memeriksa hasil',
        'Otomatis menghasilkan mock',
      ],
      correctOptionIndex: 0,
      explanation:
        'Table-driven test mengelompokkan kasus dalam slice struct sehingga penambahan kasus baru sangat mudah.',
    },
    {
      id: 'q-08-04',
      order: 4,
      prompt: 'Apa perbedaan t.Error dan t.Fatal?',
      options: [
        't.Error melanjutkan test, t.Fatal menghentikan test',
        't.Error menghentikan test, t.Fatal melanjutkan test',
        'Keduanya menghentikan test',
        'Keduanya hanya mencatat log',
      ],
      correctOptionIndex: 0,
      explanation:
        't.Error mencatat kegagalan tetapi test tetap berjalan. t.Fatal menghentikan eksekusi test saat itu juga.',
    },
    {
      id: 'q-08-05',
      order: 5,
      prompt: 'Apa fungsi go vet?',
      options: [
        'Static analysis untuk menemukan bug umum',
        'Menjalankan unit test',
        'Memformat kode',
        'Mengunduh dependency',
      ],
      correctOptionIndex: 0,
      explanation:
        'go vet melakukan static analysis untuk menemukan bug seperti format string salah atau goroutine loop variable.',
    },
    {
      id: 'q-08-06',
      order: 6,
      prompt: 'Flag apa yang digunakan untuk mengaktifkan race detector?',
      options: [
        '-race',
        '-trace',
        '-detect',
        '-mutex',
      ],
      correctOptionIndex: 0,
      explanation:
        'go test -race mengaktifkan race detector untuk menemukan data race pada kode konkuren.',
    },
    {
      id: 'q-08-07',
      order: 7,
      prompt: 'Tool apa yang digunakan untuk profiling CPU dan memori di Go?',
      options: [
        'pprof',
        'gdb',
        'valgrind',
        'strace',
      ],
      correctOptionIndex: 0,
      explanation:
        'pprof adalah tool profiling bawaan Go untuk CPU, heap, goroutine, dan lainnya.',
    },
    {
      id: 'q-08-08',
      order: 8,
      prompt: 'Perintah apa yang menampilkan code coverage dalam bentuk HTML?',
      options: [
        'go tool cover -html=coverage.out',
        'go test -html',
        'go coverage -html',
        'go report -html',
      ],
      correctOptionIndex: 0,
      explanation:
        'go test -coverprofile=coverage.out menghasilkan profil coverage, dan go tool cover -html membukanya dalam HTML.',
    },
  ],
}
