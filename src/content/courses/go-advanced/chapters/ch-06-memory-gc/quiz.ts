import type { Quiz } from '@/content/types'

export const ch06Quiz: Quiz = {
  id: 'quiz-ch-06-memory-gc',
  title: 'Quiz: Memory Management & GC Tuning',
  passingScore: 8,
  questions: [
    {
      id: 'q-06-01',
      order: 1,
      prompt: 'Apa fungsi escape analysis di Go?',
      options: [
        'Mengoptimasi algoritma sorting',
        'Menentukan apakah variabel dialokasikan di stack atau heap',
        'Mengompresi binary',
        'Menghapus variabel yang tidak digunakan',
      ],
      correctOptionIndex: 1,
      explanation:
        'Escape analysis menentukan apakah variabel bisa tetap di stack atau harus dialokasikan di heap.',
    },
    {
      id: 'q-06-02',
      order: 2,
      prompt: 'Bagaimana cara melihat hasil escape analysis?',
      options: [
        'go test -escape',
        'go build -gcflags="-m"',
        'go run -heap',
        'go vet -escape',
      ],
      correctOptionIndex: 1,
      explanation:
        'Flag -gcflags="-m" memberikan informasi escape analysis saat build.',
    },
    {
      id: 'q-06-03',
      order: 3,
      prompt: 'Apa kegunaan sync.Pool?',
      options: [
        'Menyimpan data secara permanen seperti cache',
        'Mengreuse objek untuk mengurangi alokasi berulang',
        'Membatasi jumlah goroutine',
        'Mengunci akses ke shared memory',
      ],
      correctOptionIndex: 1,
      explanation:
        'sync.Pool menyediakan object pooling untuk reuse objek dan mengurangi alokasi memori.',
    },
    {
      id: 'q-06-04',
      order: 4,
      prompt: 'Apa yang terjadi pada objek di sync.Pool saat GC berjalan?',
      options: [
        'Selalu dipertahankan',
        'Bisa dibersihkan oleh GC kapan saja',
        'Otomatis dikembalikan ke pemanggil',
        'Tidak terpengaruh oleh GC',
      ],
      correctOptionIndex: 1,
      explanation:
        'Objek di sync.Pool tidak dijamin persisten; GC bisa membersihkan isi pool kapan saja.',
    },
    {
      id: 'q-06-05',
      order: 5,
      prompt: 'Apa pengaruh menurunkan nilai GOGC?',
      options: [
        'GC berjalan lebih jarang dan penggunaan memori lebih tinggi',
        'GC berjalan lebih sering dengan penggunaan CPU lebih tinggi',
        'GC dinonaktifkan',
        'Heap size tidak terbatas',
      ],
      correctOptionIndex: 1,
      explanation:
        'GOGC yang lebih rendah membuat GC berjalan lebih sering, mengurangi penggunaan memori tetapi meningkatkan penggunaan CPU.',
    },
    {
      id: 'q-06-06',
      order: 6,
      prompt: 'Apa fungsi GOMEMLIMIT?',
      options: [
        'Membatasi jumlah goroutine',
        'Menetapkan batas memori total yang bisa digunakan Go runtime',
        'Mengatur ukuran stack awal',
        'Menonaktifkan GC',
      ],
      correctOptionIndex: 1,
      explanation:
        'GOMEMLIMIT membatasi memori total yang bisa digunakan Go runtime, sangat berguna di environment container.',
    },
    {
      id: 'q-06-07',
      order: 7,
      prompt: 'Metrik mana di heap profile yang menunjukkan objek yang masih ada di heap saat ini?',
      options: [
        'alloc_space',
        'inuse_space',
        'cpu_time',
        'goroutine_count',
      ],
      correctOptionIndex: 1,
      explanation:
        'inuse_space menunjukkan objek yang masih ada (live) di heap pada saat profiling.',
    },
    {
      id: 'q-06-08',
      order: 8,
      prompt: 'Mengapa arena di Go masih dianggap eksperimental?',
      options: [
        'Karena tidak bisa mengalokasikan memori',
        'Karena berisiko memory safety jika tidak digunakan dengan hati-hati',
        'Karena hanya tersedia di Windows',
        'Karena tidak kompatibel dengan GC',
      ],
      correctOptionIndex: 1,
      explanation:
        'Arena memungkinkan alokasi manual sekelompok objek; penggunaan yang salah bisa menyebabkan memory safety issues, sehingga masih eksperimental.',
    },
  ],
}
