import type { Quiz } from '@/content/types'

export const ch06Quiz: Quiz = {
  id: 'quiz-ch-06-algorithmic-performance-analysis',
  title: 'Quiz: Analisis Performa Algoritmik',
  passingScore: 8,
  questions: [
    {
      id: 'q-06-01',
      order: 1,
      prompt: 'Analisis amortized pada dynamic array push menunjukkan?',
      options: [
        'Setiap push selalu O(n)',
        'Amortized O(1) karena biaya resize diratakan ke banyak push murah',
        'Amortized O(log n)',
        'Push tidak dapat dianalisis',
      ],
      correctOptionIndex: 1,
      explanation:
        'Resize O(n) jarang terjadi; aggregate analysis menunjukkan total copy < 2n untuk n push, sehingga amortized O(1) per operasi.',
    },
    {
      id: 'q-06-02',
      order: 2,
      prompt: 'Hukum Amdahl menyatakan speedup paralel terbatas oleh?',
      options: [
        'Jumlah baris kode',
        'Fraksi sequential yang tidak dapat diparalelkan',
        'Kecepatan disk',
        'Ukuran cache L1',
      ],
      correctOptionIndex: 1,
      explanation:
        'Speedup = 1 / ((1-P) + P/S). Bagian sequential (1-P) menjadi bottleneck meskipun P/S besar.',
    },
    {
      id: 'q-06-03',
      order: 3,
      prompt: 'Untuk T(n) = 2T(n/2) + O(n), master theorem memberikan?',
      options: ['Θ(n)', 'Θ(n log n)', 'Θ(n²)', 'Θ(log n)'],
      correctOptionIndex: 1,
      explanation:
        'a=2, b=2, log_b(a)=1, f(n)=O(n)=Θ(n^1). Kasus 2 → T(n)=Θ(n log n), seperti merge sort.',
    },
    {
      id: 'q-06-04',
      order: 4,
      prompt: 'Cache-oblivious algorithm berarti?',
      options: [
        'Algoritma yang tidak menggunakan cache sama sekali',
        'Algoritma optimal di semua level cache tanpa mengetahui parameter cache',
        'Algoritma yang hanya berjalan di GPU',
        'Algoritma dengan kompleksitas O(1)',
      ],
      correctOptionIndex: 1,
      explanation:
        'Cache-oblivious algorithms dirancang agar locality optimal tanpa parameter B (block size) atau L (cache line) eksplisit.',
    },
    {
      id: 'q-06-05',
      order: 5,
      prompt: 'Dalam external memory model, biaya utama diukur dengan?',
      options: [
        'Jumlah perbandingan elemen',
        'Jumlah I/O block transfer antara disk dan RAM',
        'Jumlah instruksi CPU',
        'Jumlah thread paralel',
      ],
      correctOptionIndex: 1,
      explanation:
        'External memory model (Aggarwal-Vitter) menghitung kompleksitas dalam jumlah transfer block B elemen, karena I/O jauh lebih lambat dari operasi CPU.',
    },
    {
      id: 'q-06-06',
      order: 6,
      prompt: 'Program 95% paralel (P=0.95) dengan 1000 prosesor, speedup Amdahl ≈?',
      options: ['950×', '≈20×', '1000×', '1×'],
      correctOptionIndex: 1,
      explanation:
        'Speedup = 1 / (0.05 + 0.95/1000) = 1 / 0.05095 ≈ 19.6×. Fraksi sequential 5% membatasi speedup meskipun prosesor banyak.',
    },
    {
      id: 'q-06-07',
      order: 7,
      prompt: 'Temporal locality merujuk pada?',
      options: [
        'Akses data berdekatan dalam memori',
        'Akses ulang data yang baru saja digunakan',
        'Sorting data berdasarkan waktu',
        'Paralelisasi berdasarkan waktu',
      ],
      correctOptionIndex: 1,
      explanation:
        'Temporal locality: data yang baru diakses cenderung diakses lagi. Spatial locality: data berdekatan cenderung diakses bersamaan.',
    },
    {
      id: 'q-06-08',
      order: 8,
      prompt: 'Lower bound sorting dalam external memory model adalah?',
      options: [
        'O(n log n) comparisons',
        'Ω((N/B) log_{M/B}(N/B)) I/O operations',
        'O(n) I/O operations',
        'O(1) block transfers',
      ],
      correctOptionIndex: 1,
      explanation:
        'Aggarwal-Vitter membuktikan sorting N elemen membutuhkan minimal Ω((N/B) log_{M/B}(N/B)) I/O; external merge sort mencapai batas ini.',
    },
  ],
}
