import type { Quiz } from '@/content/types'

export const ch04Quiz: Quiz = {
  id: 'quiz-ch-04-environment-management',
  title: 'Quiz: Environment Management',
  passingScore: 8,
  questions: [
    {
      id: 'q-04-01',
      order: 1,
      prompt: 'Mengapa konfigurasi harus dipisahkan dari kode sumber?',
      options: [
        'Agar repository lebih kecil',
        'Karena konfigurasi berubah antar environment sedangkan kode harus tetap sama',
        'Agar build lebih cepat',
        'Karena kode tidak boleh berisi variabel',
      ],
      correctOptionIndex: 1,
      explanation:
        'Memisahkan config dari code memungkinkan satu artifact dideploy ke banyak environment dengan konfigurasi berbeda.',
    },
    {
      id: 'q-04-02',
      order: 2,
      prompt: 'Menurut 12-factor app, di mana sebaiknya konfigurasi disimpan?',
      options: ['Di file kode sumber', 'Di environment', 'Di database aplikasi', 'Di log sistem'],
      correctOptionIndex: 1,
      explanation:
        '12-factor app menekankan menyimpan config di environment agar dapat diubah tanpa memodifikasi code.',
    },
    {
      id: 'q-04-03',
      order: 3,
      prompt: 'File .env harus?',
      options: [
        'Di-commit ke version control agar semua developer mendapatkan config yang sama',
        'Tidak di-commit; gunakan .env.example sebagai template',
        'Dihapus setelah setiap build',
        'Dibuat read-only untuk root saja',
      ],
      correctOptionIndex: 1,
      explanation:
        'File .env berisi secret dan config lokal yang sensitif; .env.example memberikan template tanpa nilai sensitif.',
    },
    {
      id: 'q-04-04',
      order: 4,
      prompt: 'Apa itu feature flag?',
      options: [
        'Flag untuk mengkompilasi ulang aplikasi',
        'Mekanisme menyalakan/mematikan fitur tanpa deploy ulang',
        'Penanda environment di log',
        'Indikator status server',
      ],
      correctOptionIndex: 1,
      explanation:
        'Feature flag memungkinkan fitur diaktifkan/dinonaktifkan secara dinamis, mendukung canary dan kill switch.',
    },
    {
      id: 'q-04-05',
      order: 5,
      prompt: 'Configuration drift adalah?',
      options: [
        'Proses mengubah kode untuk menyesuaikan environment',
        'Kondisi ketika konfigurasi environment menyimpang dari source of truth karena perubahan manual',
        'Migrasi database antar environment',
        'Perubahan environment variable saat runtime',
      ],
      correctOptionIndex: 1,
      explanation:
        'Configuration drift terjadi akibat modifikasi manual yang tidak tercatat, menyebabkan environment tidak konsisten.',
    },
    {
      id: 'q-04-06',
      order: 6,
      prompt: 'Dalam Kubernetes, objek apa yang cocok untuk menyimpan data sensitif?',
      options: ['ConfigMap', 'PersistentVolume', 'Secret', 'Deployment'],
      correctOptionIndex: 2,
      explanation:
        'Kubernetes Secret dirancang untuk menyimpan data sensitif seperti token dan password.',
    },
    {
      id: 'q-04-07',
      order: 7,
      prompt: 'Apa keuntungan immutable infrastructure?',
      options: [
        'Server dapat dimodifikasi kapan saja tanpa dokumentasi',
        'Setiap perubahan menghasilkan artifact baru sehingga rollback dan audit lebih mudah',
        'Tidak perlu version control untuk konfigurasi',
        'Semua environment selalu identik tanpa pengecualian',
      ],
      correctOptionIndex: 1,
      explanation:
        'Immutable infrastructure mencegah perubahan manual; setiap deploy menggunakan artifact baru yang dapat dilacak dan di-rollback.',
    },
    {
      id: 'q-04-08',
      order: 8,
      prompt: 'Praktik terbaik untuk secrets management adalah?',
      options: [
        'Menyimpan secrets di file .env yang di-commit',
        'Menggunakan secrets manager dan menginjeksi secrets saat runtime',
        'Menyematkan secrets di Dockerfile sebagai ENV',
        'Mengirim secrets melalui chat tim',
      ],
      correctOptionIndex: 1,
      explanation:
        'Secrets manager menyediakan enkripsi, akses terkontrol, dan audit; secrets diinjeksikan saat runtime.',
    },
  ],
}
