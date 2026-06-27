import type { Quiz } from '@/content/types'

export const ch08Quiz: Quiz = {
  id: 'quiz-ch-08-benchmarking-profiling',
  title: 'Quiz: Benchmarking & Profiling',
  passingScore: 8,
  questions: [
    {
      id: 'q-08-01',
      order: 1,
      prompt: 'Tipe parameter apa yang diterima oleh fungsi benchmark di Go?',
      options: [
        '*testing.T',
        '*testing.B',
        '*testing.M',
        '*benchmark.B',
      ],
      correctOptionIndex: 1,
      explanation:
        'Benchmark menggunakan *testing.B, sedangkan test menggunakan *testing.T.',
    },
    {
      id: 'q-08-02',
      order: 2,
      prompt: 'Apa kegunaan field b.N dalam benchmark?',
      options: [
        'Menentukan jumlah goroutine',
        'Menentukan jumlah iterasi yang harus dijalankan',
        'Menentukan batas waktu benchmark',
        'Menentukan jumlah alokasi memori',
      ],
      correctOptionIndex: 1,
      explanation:
        'b.N adalah jumlah iterasi yang dipilih oleh testing package agar pengukuran cukup stabil.',
    },
    {
      id: 'q-08-03',
      order: 3,
      prompt: 'Flag apa yang menampilkan informasi alokasi memori saat menjalankan benchmark?',
      options: [
        '-benchallocs',
        '-benchmem',
        '-mem',
        '-alloc',
      ],
      correctOptionIndex: 1,
      explanation:
        '-benchmem menampilkan alokasi memori per operasi dalam output benchmark.',
    },
    {
      id: 'q-08-04',
      order: 4,
      prompt: 'Method apa yang digunakan untuk mengabaikan waktu setup dalam benchmark?',
      options: [
        'b.SkipSetup()',
        'b.ResetTimer()',
        'b.RestartTimer()',
        'b.ClearTimer()',
      ],
      correctOptionIndex: 1,
      explanation:
        'b.ResetTimer() mengatur ulang timer sehingga waktu setup sebelumnya tidak ikut diukur.',
    },
    {
      id: 'q-08-05',
      order: 5,
      prompt: 'Perintah apa yang menghasilkan profil CPU saat benchmark?',
      options: [
        'go test -bench=. -cpuprofile=cpu.prof',
        'go test -bench=. -cpuprofile=cpu.prof',
        'go test -bench=. -profile=cpu.prof',
        'go test -bench=. -cpuprof=cpu.prof',
      ],
      correctOptionIndex: 1,
      explanation:
        'Flag -cpuprofile menulis profil CPU ke file yang dapat dianalisis dengan go tool pprof.',
    },
    {
      id: 'q-08-06',
      order: 6,
      prompt: 'Dalam flame graph, apa yang ditunjukkan oleh lebar baris?',
      options: [
        'Kedalaman stack',
        'Jumlah fungsi yang dipanggil',
        'Proporsi waktu yang dihabiskan di fungsi tersebut',
        'Jumlah alokasi memori',
      ],
      correctOptionIndex: 2,
      explanation:
        'Semakin lebar baris, semakin besar proporsi waktu atau sample yang dihabiskan di fungsi tersebut.',
    },
    {
      id: 'q-08-07',
      order: 7,
      prompt: 'Mengapa hasil benchmark mikro tidak selalu mencerminkan performa produksi?',
      options: [
        'Karena compiler selalu salah',
        'Karena workload nyata lebih kompleks dan dipengaruhi I/O, contention, serta data nyata',
        'Karena benchmark tidak pernah benar',
        'Karena pprof tidak akurat',
      ],
      correctOptionIndex: 1,
      explanation:
        'Benchmark mikro mengukur bagian kecil kode. Performa produksi dipengaruhi oleh banyak faktor seperti I/O, network, contention, dan pola data nyata.',
    },
    {
      id: 'q-08-08',
      order: 8,
      prompt: 'Mengapa menyimpan hasil benchmark ke variabel package-level?',
      options: [
        'Agar hasil bisa diakses dari test lain',
        'Untuk mencegah compiler mengoptimalkan loop benchmark',
        'Agar benchmark lebih cepat',
        'Untuk mengurangi alokasi memori',
      ],
      correctOptionIndex: 1,
      explanation:
        'Compiler dapat menghapus kode yang hasilnya tidak digunakan. Menyimpan ke variabel package-level mencegah eliminasi tersebut.',
    },
  ],
}
