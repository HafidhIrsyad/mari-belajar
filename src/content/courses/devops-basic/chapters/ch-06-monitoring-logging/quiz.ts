import type { Quiz } from '@/content/types'

export const ch06Quiz: Quiz = {
  id: 'quiz-ch-06-monitoring-logging',
  title: 'Quiz: Monitoring & Logging Dasar',
  passingScore: 8,
  questions: [
    {
      id: 'q-06-01',
      order: 1,
      prompt: 'Apa tiga pilar observability?',
      options: [
        'Metrics, logs, traces',
        'CPU, memory, disk',
        'Build, test, deploy',
        'Plan, code, monitor',
      ],
      correctOptionIndex: 0,
      explanation:
        'Tiga pilar observability adalah metrics, logs, dan traces; ketiganya saling melengkapi.',
    },
    {
      id: 'q-06-02',
      order: 2,
      prompt: 'Manakah yang termasuk golden signals?',
      options: [
        'Latency, traffic, errors, saturation',
        'CPU, RAM, disk, network',
        'Commit, build, test, release',
        'Plan, do, check, act',
      ],
      correctOptionIndex: 0,
      explanation:
        'Empat golden signals adalah latency, traffic, errors, dan saturation.',
    },
    {
      id: 'q-06-03',
      order: 3,
      prompt: 'Tipe metrik Prometheus apa yang hanya naik dan cocok untuk total request?',
      options: ['Gauge', 'Histogram', 'Counter', 'Summary'],
      correctOptionIndex: 2,
      explanation:
        'Counter adalah metrik yang nilainya selalu naik, seperti total request atau total error.',
    },
    {
      id: 'q-06-04',
      order: 4,
      prompt: 'Apa keuntungan structured logging dibanding plain text logging?',
      options: [
        'Lebih mudah dibaca manusia tanpa parsing',
        'Lebih mudah diparse, diindeks, dan dikorelasikan dengan metrik/trace',
        'Tidak memerlukan timestamp',
        'Otomatis menghapus log lama',
      ],
      correctOptionIndex: 1,
      explanation:
        'Structured logging menggunakan format seperti JSON yang mudah diproses mesin dan mendukung query kompleks.',
    },
    {
      id: 'q-06-05',
      order: 5,
      prompt: 'Apa yang dimaksud dengan cardinality dalam konteks metrik?',
      options: [
        'Jumlah total data point dalam time series',
        'Jumlah kombinasi label unik dalam metrik',
        'Waktu retensi data di storage',
        'Jumlah replica dari aplikasi',
      ],
      correctOptionIndex: 1,
      explanation:
        'Cardinality adalah jumlah kombinasi label unik; cardinality tinggi dapat membebani time-series database.',
    },
    {
      id: 'q-06-06',
      order: 6,
      prompt: 'SLI adalah?',
      options: [
        'Kontrak bisnis dengan konsekuensi jika target tidak tercapai',
        'Target yang ingin dicapai untuk suatu metrik layanan',
        'Metrik kuantitatif yang mengukur aspek layanan',
        'Dokumen prosedur penanganan insiden',
      ],
      correctOptionIndex: 2,
      explanation:
        'Service Level Indicator (SLI) adalah metrik kuantitatif; SLO adalah targetnya; SLA adalah kontrak bisnis.',
    },
    {
      id: 'q-06-07',
      order: 7,
      prompt: 'Alert yang baik sebaiknya?',
      options: [
        'Dipicu oleh setiap anomaly internal tanpa memperhatikan dampak pengguna',
        'Actionable, berbasis gejala, dan memiliki severity yang jelas',
        'Dikirim ke semua anggota tim secara bersamaan',
        'Menggunakan threshold tetap untuk semua layanan',
      ],
      correctOptionIndex: 1,
      explanation:
        'Alert yang baik memberikan tindakan yang jelas, didasarkan pada gejala yang dirasakan pengguna, dan memiliki severity yang sesuai.',
    },
    {
      id: 'q-06-08',
      order: 8,
      prompt: 'Apa fungsi utama distributed tracing?',
      options: [
        'Mengurangi ukuran log aplikasi',
        'Melacak perjalanan request antar service untuk diagnosis latency',
        'Menggantikan kebutuhan monitoring metrik',
        'Menyimpan konfigurasi aplikasi secara terpusat',
      ],
      correctOptionIndex: 1,
      explanation:
        'Distributed tracing melacak request lintas service sehingga membantu mendiagnosis bottleneck dan kegagalan.',
    },
  ],
}
