import type { Quiz } from '@/content/types'

export const ch06Quiz: Quiz = {
  id: 'quiz-ch-06-file-upload-storage',
  title: 'Quiz: File Upload & Storage',
  passingScore: 8,
  questions: [
    {
      id: 'q-06-01',
      order: 1,
      prompt: 'Content-Type apa yang digunakan saat mengirim file melalui form?',
      options: ['application/json', 'multipart/form-data', 'text/plain', 'application/xml'],
      correctOptionIndex: 1,
      explanation:
        'multipart/form-data memungkinkan satu request mengandung beberapa bagian, termasuk field teks dan binary file.',
    },
    {
      id: 'q-06-02',
      order: 2,
      prompt: 'Mengapa validasi MIME type saja tidak cukup aman?',
      options: [
        'Karena MIME type selalu salah',
        'Karena client dapat mengirim MIME type palsu; perlu verifikasi magic number',
        'Karena MIME type tidak diizinkan oleh HTTP',
        'Karena server tidak membaca MIME type',
      ],
      correctOptionIndex: 1,
      explanation:
        'MIME type dikirim client dan dapat dipalsukan. Verifikasi magic number memberikan jaminan tambahan tentang tipe file sebenarnya.',
    },
    {
      id: 'q-06-03',
      order: 3,
      prompt: 'Apa keuntungan utama presigned URL?',
      options: [
        'Server tidak perlu menangani byte file, mengurangi beban bandwidth',
        'File dienkripsi secara otomatis oleh browser',
        'Tidak memerlukan kredensial AWS',
        'URL berlaku selamanya',
      ],
      correctOptionIndex: 0,
      explanation:
        'Presigned URL memungkinkan client berinteraksi langsung dengan S3 dalam batas waktu tertentu, sehingga server tidak menjadi bottleneck.',
    },
    {
      id: 'q-06-04',
      order: 4,
      prompt: 'Parameter presigned URL mana yang menentukan masa berlaku URL?',
      options: ['X-Amz-Algorithm', 'X-Amz-Expires', 'X-Amz-Signature', 'X-Amz-Credential'],
      correctOptionIndex: 1,
      explanation:
        'X-Amz-Expires menyatakan berapa detik URL masih valid sejak X-Amz-Date.',
    },
    {
      id: 'q-06-05',
      order: 5,
      prompt: 'Multipart upload berguna untuk?',
      options: [
        'File kecil saja',
        'File besar agar dapat diupload paralel dan dilanjutkan jika gagal',
        'Menggantikan validasi tipe file',
        'Menghindari penggunaan HTTPS',
      ],
      correctOptionIndex: 1,
      explanation:
        'Multipart upload memecah file besar menjadi bagian-bagian yang dapat diupload paralel dan di-resume, meningkatkan keandalan.',
    },
    {
      id: 'q-06-06',
      order: 6,
      prompt: 'Apa peran CDN dalam penyimpanan file?',
      options: [
        'Menggantikan database',
        'Menyalin file ke edge location untuk mengurangi latency download',
        'Menyaring file berbahaya secara otomatis',
        'Membuat presigned URL',
      ],
      correctOptionIndex: 1,
      explanation:
        'CDN mendistribusikan file statis ke server edge di seluruh dunia sehingga pengguna mengunduh dari lokasi terdekat.',
    },
    {
      id: 'q-06-07',
      order: 7,
      prompt: 'Mengapa virus scan dilakukan secara asynchronous setelah upload?',
      options: [
        'Agar file langsung tersedia tanpa verifikasi',
        'Karena proses scan bisa lambat dan tidak boleh memblokir response upload',
        'Karena virus scan tidak penting',
        'Agar tidak memerlukan object storage',
      ],
      correctOptionIndex: 1,
      explanation:
        'Scanning file dapat memakan waktu. Proses asynchronous menjaga response upload tetap cepat sambil menandai file aman setelah scan selesai.',
    },
    {
      id: 'q-06-08',
      order: 8,
      prompt: 'Praktik terbaik untuk menyimpan credential S3 adalah?',
      options: [
        'Menyertakan access key di source code client',
        'Menggunakan IAM role atau scoped credentials di server dan menjaga secret key tetap rahasia',
        'Membagikan secret key kepada semua developer',
        'Menyimpan secret key di nama file',
      ],
      correctOptionIndex: 1,
      explanation:
        'Secret key harus tetap di server dengan hak akses minimal. Client hanya menerima presigned URL yang terbatas waktu dan aksi.',
    },
  ],
}
