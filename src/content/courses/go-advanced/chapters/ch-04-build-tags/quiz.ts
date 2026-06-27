import type { Quiz } from '@/content/types'

export const ch04Quiz: Quiz = {
  id: 'quiz-ch-04-build-tags',
  title: 'Quiz: Build Tags & Cross Compilation',
  passingScore: 8,
  questions: [
    {
      id: 'q-04-01',
      order: 1,
      prompt: 'Bagaimana cara menulis build constraint di awal file Go?',
      options: [
        '/* go:build linux */',
        '//go:build linux',
        '#go:build linux',
        '// build linux',
      ],
      correctOptionIndex: 1,
      explanation:
        'Build constraint di Go ditulis sebagai komentar tanpa spasi: //go:build linux.',
    },
    {
      id: 'q-04-02',
      order: 2,
      prompt: 'Apa fungsi file suffix seperti `foo_linux.go`?',
      options: [
        'Menandakan file utama',
        'Hanya dikompilasi untuk platform Linux',
        'Menandakan file test',
        'Meningkatkan performa runtime',
      ],
      correctOptionIndex: 1,
      explanation:
        'File dengan suffix _linux.go hanya dikompilasi ketika target platform adalah Linux.',
    },
    {
      id: 'q-04-03',
      order: 3,
      prompt: 'Perintah apa yang digunakan untuk cross compile ke Windows AMD64?',
      options: [
        'go build -windows',
        'GOOS=windows GOARCH=amd64 go build',
        'go build --target windows',
        'GOOS=win GOARCH=x86 go build',
      ],
      correctOptionIndex: 1,
      explanation:
        'Cross compilation di Go menggunakan environment variables GOOS dan GOARCH, contohnya GOOS=windows GOARCH=amd64 go build.',
    },
    {
      id: 'q-04-04',
      order: 4,
      prompt: 'Apa kegunaan directive `//go:embed`?',
      options: [
        'Mengompilasi ulang file secara otomatis',
        'Menyematkan file statis ke dalam binary',
        'Menandatangani binary',
        'Menghapus path sumber dari binary',
      ],
      correctOptionIndex: 1,
      explanation:
        '//go:embed menyematkan file statis seperti template, konfigurasi, atau aset ke dalam binary Go.',
    },
    {
      id: 'q-04-05',
      order: 5,
      prompt: 'Apa tujuan reproducible builds?',
      options: [
        'Mempercepat kompilasi',
        'Menghasilkan binary identik dari sumber yang sama',
        'Mengurangi ukuran binary',
        'Menghilangkan dependency',
      ],
      correctOptionIndex: 1,
      explanation:
        'Reproducible builds memastikan binary yang dihasilkan bit-for-bit identik jika sumber dan toolchain sama.',
    },
    {
      id: 'q-04-06',
      order: 6,
      prompt: 'Flag apa yang menghapus path sumber dari binary Go?',
      options: [
        '-o',
        '-trimpath',
        '-ldflags',
        '-tags',
      ],
      correctOptionIndex: 1,
      explanation:
        'Flag -trimpath menghapus informasi path sumber dari binary, membantu reproducible builds dan keamanan.',
    },
    {
      id: 'q-04-07',
      order: 7,
      prompt: 'Bagaimana cara mengaktifkan build tag kustom `premium`?',
      options: [
        'go build -tag premium',
        'go build -tags premium',
        'go build --premium',
        'go build GOFLAGS=premium',
      ],
      correctOptionIndex: 1,
      explanation:
        'Build tag kustom diaktifkan dengan flag -tags, contohnya go build -tags premium.',
    },
    {
      id: 'q-04-08',
      order: 8,
      prompt: 'Mengapa supply chain signing penting untuk binary production?',
      options: [
        'Agar binary lebih kecil',
        'Untuk memverifikasi integritas dan asal-usul binary',
        'Agar kompilasi lebih cepat',
        'Untuk menghilangkan build tags',
      ],
      correctOptionIndex: 1,
      explanation:
        'Supply chain signing memastikan binary tidak dimodifikasi dan berasal dari sumber yang tepercaya.',
    },
  ],
}
