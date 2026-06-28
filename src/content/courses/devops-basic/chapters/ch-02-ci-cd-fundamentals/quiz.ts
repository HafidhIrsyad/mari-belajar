import type { Quiz } from '@/content/types'

export const ch02Quiz: Quiz = {
  id: 'quiz-ch-02-ci-cd-fundamentals',
  title: 'Quiz: CI/CD Fundamentals',
  passingScore: 8,
  questions: [
    {
      id: 'q-02-01',
      order: 1,
      prompt: 'Praktik apa yang mengintegrasikan perubahan kode ke main secara rutin dengan automated test?',
      options: ['Continuous Deployment', 'Continuous Integration', 'Continuous Delivery', 'Infrastructure as Code'],
      correctOptionIndex: 1,
      explanation:
        'Continuous Integration (CI) mendorong developer mengintegrasikan kode berulang kali setiap hari dengan automated build dan test.',
    },
    {
      id: 'q-02-02',
      order: 2,
      prompt: 'Apa perbedaan utama Continuous Delivery dan Continuous Deployment?',
      options: [
        'Delivery tanpa test; Deployment selalu dengan test',
        'Delivery membutuhkan approval manual untuk production; Deployment melepaskan otomatis',
        'Delivery hanya untuk backend; Deployment hanya untuk frontend',
        'Tidak ada perbedaan; keduanya sinonim',
      ],
      correctOptionIndex: 1,
      explanation:
        'Continuous Delivery memastikan kode siap deploy kapan saja namun bisa memerlukan approval; Continuous Deployment melepaskan ke production secara otomatis.',
    },
    {
      id: 'q-02-03',
      order: 3,
      prompt: 'Dalam pipeline, apa fungsi utama caching?',
      options: [
        'Menyimpan hasil build akhir untuk deploy',
        'Mengurangi waktu build dengan menyimpan dependencies atau intermediate hasil',
        'Menggantikan kebutuhan automated test',
        'Menyimpan secrets secara permanen',
      ],
      correctOptionIndex: 1,
      explanation:
        'Caching adalah optimasi performa; artefak adalah hasil build yang harus dipertahankan untuk deploy.',
    },
    {
      id: 'q-02-04',
      order: 4,
      prompt: 'Mengapa secrets tidak boleh di-hardcode di kode sumber?',
      options: [
        'Karena secrets akan membuat repository terlalu besar',
        'Karena kode sumber dapat diakses banyak pihak dan terekspos di version control',
        'Karena secrets hanya boleh disimpan di cache',
        'Karena hardcode membuat build lebih lambat',
      ],
      correctOptionIndex: 1,
      explanation:
        'Secrets di kode sumber dapat bocor melalui version control, log, atau distribusi aplikasi.',
    },
    {
      id: 'q-02-05',
      order: 5,
      prompt: 'Apa manfaat menggunakan artefak yang sama untuk semua environment?',
      options: [
        'Memudahkan modifikasi kode di setiap environment',
        'Menjamin apa yang diuji persis sama dengan yang dirilis',
        'Mengurangi kebutuhan akan automated test',
        'Memungkinkan setiap environment menggunakan dependency berbeda',
      ],
      correctOptionIndex: 1,
      explanation:
        'Environment promotion menggunakan artefak yang sama mengurangi perbedaan antara staging dan production.',
    },
    {
      id: 'q-02-06',
      order: 6,
      prompt: 'Dalam pipeline modern, job yang independen sebaiknya?',
      options: [
        'Selalu dijalankan secara berurutan untuk keamanan',
        'Dijalankan paralel menggunakan directed acyclic graph (DAG)',
        'Dihapus untuk menyederhanakan pipeline',
        'Digabungkan menjadi satu job besar',
      ],
      correctOptionIndex: 1,
      explanation:
        'DAG memungkinkan job independen berjalan paralel sehingga total waktu pipeline lebih pendek.',
    },
    {
      id: 'q-02-07',
      order: 7,
      prompt: 'Apa kegunaan matrix build?',
      options: [
        'Membangun banyak aplikasi dalam satu repository',
        'Menjalankan job dengan variasi parameter seperti versi runtime atau OS',
        'Menggabungkan semua pipeline menjadi satu file',
        'Menyembunyikan secrets dari log',
      ],
      correctOptionIndex: 1,
      explanation:
        'Matrix build meningkatkan coverage dengan menjalankan job yang sama di berbagai kombinasi environment.',
    },
    {
      id: 'q-02-08',
      order: 8,
      prompt: 'Prinsip apa yang mengharuskan artefak tidak diubah setelah dibuat?',
      options: ['Mutable artifact', 'Immutable artifact', 'Dynamic artifact', 'Shared artifact'],
      correctOptionIndex: 1,
      explanation:
        'Immutable artifact memastikan traceability dan memudahkan rollback karena setiap versi commit menghasilkan artefak unik.',
    },
  ],
}
