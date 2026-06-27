import type { Quiz } from '@/content/types'

export const ch06Quiz: Quiz = {
  id: 'quiz-ch-06-api-gateway-service-mesh',
  title: 'Quiz: API Gateway & Service Mesh',
  passingScore: 8,
  questions: [
    {
      id: 'q-06-01',
      order: 1,
      prompt: 'Apa fungsi utama API gateway?',
      options: [
        'Menyimpan data aplikasi',
        'Menjadi pintu masuk tunggal dengan routing, auth, dan rate limiting',
        'Menggantikan database cache',
        'Menjalankan semua business logic',
      ],
      correctOptionIndex: 1,
      explanation:
        'API gateway mengonsolidasikan cross-cutting concerns dan menyembunyikan kompleksitas internal service dari client.',
    },
    {
      id: 'q-06-02',
      order: 2,
      prompt: 'Apa itu reverse proxy?',
      options: [
        'Client yang mengakses banyak server',
        'Server yang meneruskan request ke upstream tanpa diketahui client',
        'Alat untuk menguji keamanan',
        'Database replika',
      ],
      correctOptionIndex: 1,
      explanation:
        'Reverse proxy menerima request dari client dan meneruskannya ke backend, lalu mengembalikan response ke client.',
    },
    {
      id: 'q-06-03',
      order: 3,
      prompt: 'Auth termination berarti?',
      options: [
        'Menghapus autentikasi sepenuhnya',
        'Gateway memvalidasi token dan meneruskan identitas ke upstream',
        'Upstream memvalidasi ulang token terhadap provider',
        'Client tidak perlu mengirim token',
      ],
      correctOptionIndex: 1,
      explanation:
        'Gateway mengakhiri validasi auth sehingga upstream dapat fokus pada business logic.',
    },
    {
      id: 'q-06-04',
      order: 4,
      prompt: 'Komponen mana yang mengelola konfigurasi proxy di service mesh?',
      options: ['Data plane', 'Control plane', 'Load balancer', 'Message broker'],
      correctOptionIndex: 1,
      explanation:
        'Control plane mengatur sertifikat, routing rules, dan policies untuk data plane proxy.',
    },
    {
      id: 'q-06-05',
      order: 5,
      prompt: 'Apa keuntungan mTLS antar service?',
      options: [
        'Meningkatkan throughput tanpa enkripsi',
        'Mengenkripsi traffic dan memverifikasi identitas kedua belah pihak',
        'Menghilangkan kebutuhan gateway',
        'Membuat service menjadi stateful',
      ],
      correctOptionIndex: 1,
      explanation:
        'mTLS menyediakan enkripsi dan autentikasi mutual, mendukung model zero trust.',
    },
    {
      id: 'q-06-06',
      order: 6,
      prompt: 'Pada Kubernetes, di manakah proxy service mesh biasanya berjalan?',
      options: ['Di node terpisah', 'Sebagai sidecar dalam pod aplikasi', 'Di database', 'Di client browser'],
      correctOptionIndex: 1,
      explanation:
        'Sidecar proxy berjalan dalam pod yang sama dengan aplikasi sehingga dapat menangkap traffic tanpa mengubah kode aplikasi.',
    },
    {
      id: 'q-06-07',
      order: 7,
      prompt: 'Teknik apa yang memungkinkan sidecar menangkap traffic tanpa perubahan aplikasi?',
      options: ['Transparent interception', 'Code injection', 'Database trigger', 'DNS spoofing'],
      correctOptionIndex: 0,
      explanation:
        'Transparent interception menggunakan iptables atau eBPF untuk mengalihkan traffic melalui sidecar.',
    },
    {
      id: 'q-06-08',
      order: 8,
      prompt: 'Gateway mana yang dikelola AWS sebagai managed service?',
      options: ['Kong', 'Nginx', 'AWS API Gateway', 'Envoy'],
      correctOptionIndex: 2,
      explanation:
        'AWS API Gateway adalah layanan terkelola yang terintegrasi dengan IAM, Cognito, Lambda, dan CloudWatch.',
    },
  ],
}
