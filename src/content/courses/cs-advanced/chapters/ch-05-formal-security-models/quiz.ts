import type { Quiz } from '@/content/types'

export const ch05Quiz: Quiz = {
  id: 'quiz-ch-05-formal-security-models',
  title: 'Quiz: Model Keamanan Formal',
  passingScore: 8,
  questions: [
    {
      id: 'q-05-01',
      order: 1,
      prompt: 'Dalam STRIDE, kategori "Tampering" merujuk pada?',
      options: [
        'Menyamar sebagai user lain',
        'Mengubah data atau kode secara tidak sah',
        'Menghalangi layanan berjalan',
        'Mendapatkan hak akses lebih tinggi',
      ],
      correctOptionIndex: 1,
      explanation:
        'Tampering (T) adalah modifikasi data, kode, atau konfigurasi tanpa otorisasi, seperti SQL injection atau manipulasi request.',
    },
    {
      id: 'q-05-02',
      order: 2,
      prompt: 'DREAD digunakan untuk?',
      options: [
        'Mengenkripsi data at rest',
        'Memprioritaskan ancaman berdasarkan damage, reproducibility, exploitability, affected users, dan discoverability',
        'Mendefinisikan role dan permission',
        'Membuktikan identitas tanpa password',
      ],
      correctOptionIndex: 1,
      explanation:
        'DREAD memberikan skor prioritas pada ancaman yang sudah diidentifikasi STRIDE agar mitigasi yang paling kritis ditangani terlebih dahulu.',
    },
    {
      id: 'q-05-03',
      order: 3,
      prompt: 'Perbedaan utama MAC dan DAC adalah?',
      options: [
        'MAC menggunakan blockchain, DAC tidak',
        'Pada MAC, administrator sistem menetapkan label keamanan; pada DAC, pemilik resource menentukan akses',
        'DAC hanya untuk militer, MAC untuk bisnis',
        'MAC tidak membutuhkan autentikasi',
      ],
      correctOptionIndex: 1,
      explanation:
        'MAC (Mandatory Access Control) menegakkan kebijakan berbasis label yang ditetapkan sistem, sedangkan DAC (Discretionary Access Control) memberikan kepemilikan dan kontrol akses kepada pemilik resource.',
    },
    {
      id: 'q-05-04',
      order: 4,
      prompt: 'Properti "no read up" dalam Bell-LaPadula berarti?',
      options: [
        'Subjek tidak boleh menulis ke objek level lebih rendah',
        'Subjek hanya boleh membaca objek dengan level keamanan ≤ level subjek',
        'Semua user boleh membaca semua data',
        'Admin boleh membaca data apapun tanpa batas',
      ],
      correctOptionIndex: 1,
      explanation:
        'Simple Security Property (no read up) mencegah subjek membaca informasi dengan klasifikasi lebih tinggi dari clearance-nya.',
    },
    {
      id: 'q-05-05',
      order: 5,
      prompt: 'Zero-knowledge proof menjamin verifier?',
      options: [
        'Menerima password prover',
        'Yakin pernyataan benar tanpa mempelajari informasi tambahan di balik bukti',
        'Mendapatkan kunci enkripsi penuh',
        'Mengakses database prover',
      ],
      correctOptionIndex: 1,
      explanation:
        'ZKP memenuhi completeness, soundness, dan zero-knowledge: verifier yakin kebenaran pernyataan tanpa informasi selain itu.',
    },
    {
      id: 'q-05-06',
      order: 6,
      prompt: 'Timing attack termasuk kategori side-channel karena?',
      options: [
        'Menyerang algoritma enkripsi secara matematis',
        'Mengeksploitasi perbedaan waktu eksekusi implementasi untuk inferensi secret',
        'Menggunakan SQL injection',
        'Memodifikasi header HTTP',
      ],
      correctOptionIndex: 1,
      explanation:
        'Timing attack mengukur waktu respons operasi (misalnya perbandingan string non-constant-time) untuk merekonstruksi secret tanpa menyerang algoritma langsung.',
    },
    {
      id: 'q-05-07',
      order: 7,
      prompt: 'RBAC mengelola akses melalui?',
      options: [
        'Label keamanan militer',
        'Kepemilikan file oleh user',
        'Peran (role) yang memetakan user ke kumpulan permission',
        'Enkripsi end-to-end saja',
      ],
      correctOptionIndex: 2,
      explanation:
        'Role-Based Access Control menetapkan permission ke role, lalu user diberi satu atau lebih role. Ini skalabel untuk organisasi dan SaaS.',
    },
    {
      id: 'q-05-08',
      order: 8,
      prompt: 'Meltdown dan Spectre adalah contoh?',
      options: [
        'Serangan SQL injection',
        'Side-channel attack berbasis speculative execution dan cache timing',
        'Model kontrol akses MAC',
        'Protokol zero-knowledge',
      ],
      correctOptionIndex: 1,
      explanation:
        'Meltdown dan Spectre (2018) mengeksploitasi speculative execution CPU dan cache side-channel untuk membaca memori yang seharusnya terisolasi.',
    },
  ],
}
