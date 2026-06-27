import type { Quiz } from '@/content/types'

export const ch01Quiz: Quiz = {
  id: 'quiz-ch-01-performance-optimization',
  title: 'Quiz: Performance Optimization',
  passingScore: 8,
  questions: [
    {
      id: 'q-01-01',
      order: 1,
      prompt: 'Apa manfaat utama route-based code splitting?',
      options: [
        'Mengurangi jumlah rute dalam aplikasi',
        'Browser hanya mengunduh kode untuk rute yang sedang dibuka',
        'Menghapus kebutuhan akan server',
        'Meningkatkan keamanan aplikasi secara otomatis',
      ],
      correctOptionIndex: 1,
      explanation:
        'Route-based code splitting memisahkan bundle per rute sehingga kode untuk rute lain tidak diunduh saat pengguna membuka rute tertentu.',
    },
    {
      id: 'q-01-02',
      order: 2,
      prompt: 'Metrik Core Web Vitals mana yang mengukur responsivitas interaktif?',
      options: ['LCP', 'CLS', 'INP', 'TTFB'],
      correctOptionIndex: 2,
      explanation:
        'INP (Interaction to Next Paint) mengukur latensi keseluruhan interaksi pengguna dan telah menggantikan FID sebagai metrik responsivitas.',
    },
    {
      id: 'q-01-03',
      order: 3,
      prompt: 'Komponen INP mana yang paling berkaitan dengan main thread yang sibuk?',
      options: [
        'Processing time',
        'Input delay',
        'Presentation delay',
        'Layout shift',
      ],
      correctOptionIndex: 1,
      explanation:
        'Input delay adalah waktu event menunggu main thread bebas dari long tasks sebelum handler dapat dieksekusi.',
    },
    {
      id: 'q-01-04',
      order: 4,
      prompt: 'Mengapa critical CSS di-inline di dalam head?',
      options: [
        'Agar stylesheet dapat di-cache lebih lama',
        'Untuk menghindari render blocking request eksternal pada first paint',
        'Agar browser tidak perlu mem-parse HTML',
        'Untuk mengurangi ukuran bundle JavaScript',
      ],
      correctOptionIndex: 1,
      explanation:
        'Inline critical CSS menghilangkan ketergantungan pada request stylesheet eksternal sehingga first paint dapat terjadi lebih cepat.',
    },
    {
      id: 'q-01-05',
      order: 5,
      prompt: 'Apa keuntungan streaming SSR dibandingkan SSR sinkron?',
      options: [
        'Mengurangi jumlah komponen yang dirender',
        'Browser dapat mulai merender HTML sebelum seluruh respons selesai',
        'Tidak memerlukan hydrasi sama sekali',
        'Menghasilkan bundle JavaScript yang lebih kecil',
      ],
      correctOptionIndex: 1,
      explanation:
        'Streaming SSR mengirimkan HTML secara bertahap, memungkinkan browser memproses dan menampilkan bagian UI lebih awal.',
    },
    {
      id: 'q-01-06',
      order: 6,
      prompt: 'Kapan sebaiknya menggunakan <link rel="prefetch">?',
      options: [
        'Untuk resource yang dibutuhkan pada halaman saat ini',
        'Untuk rute atau resource yang kemungkinan besar dibuka berikutnya',
        'Untuk menghubungkan ke domain pihak ketiga secara instan',
        'Untuk menggantikan semua request AJAX',
      ],
      correctOptionIndex: 1,
      explanation:
        'Prefetch berguna untuk navigasi berikutnya yang diprediksi, tetapi penggunaan yang berlebihan dapat memboroskan bandwidth.',
    },
    {
      id: 'q-01-07',
      order: 7,
      prompt: 'Apa perbedaan utama antara lab data dan RUM?',
      options: [
        'Lab data lebih akurat untuk semua perangkat pengguna',
        'RUM diukur dari browser pengguna nyata; lab data di lingkungan terkontrol',
        'RUM hanya mengukur metrik LCP',
        'Lab data tidak dapat direproduksi',
      ],
      correctOptionIndex: 1,
      explanation:
        'RUM mengumpulkan metrik dari sesi pengguna nyata, sedangkan lab data memberikan baseline yang dapat direproduksi di lingkungan terkontrol.',
    },
    {
      id: 'q-01-08',
      order: 8,
      prompt: 'Cache-Control apa yang paling tepat untuk aset statis dengan hash di nama file?',
      options: [
        'no-cache',
        'public, max-age=0',
        'public, max-age=31536000, immutable',
        'private, no-store',
      ],
      correctOptionIndex: 2,
      explanation:
        'Aset dengan hash di nama file tidak akan berubah, sehingga dapat di-cache secara immutable dengan durasi sangat panjang.',
    },
  ],
}
