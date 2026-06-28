import type { Quiz } from '@/content/types'

export const ch01Quiz: Quiz = {
  id: 'quiz-ch-01-git-workflow',
  title: 'Quiz: Git Workflow',
  passingScore: 8,
  questions: [
    {
      id: 'q-01-01',
      order: 1,
      prompt: 'Perintah apa yang memindahkan perubahan dari working directory ke staging area?',
      options: ['git commit', 'git push', 'git add', 'git merge'],
      correctOptionIndex: 2,
      explanation:
        'git add menyiapkan perubahan ke staging area (index) sebelum dibuat menjadi commit.',
    },
    {
      id: 'q-01-02',
      order: 2,
      prompt: 'Dalam Git, branch pada dasarnya adalah?',
      options: [
        'Salinan independen seluruh repository',
        'Pointer bergerak yang mereferensi commit tertentu',
        'Folder terpisah di filesystem',
        'Backup otomatis dari working directory',
      ],
      correctOptionIndex: 1,
      explanation:
        'Branch di Git hanyalah ref yang menunjuk ke commit; membuat branch sangat ringan.',
    },
    {
      id: 'q-01-03',
      order: 3,
      prompt: 'Apa keuntungan utama merge dibanding rebase?',
      options: [
        'History selalu linear',
        'History asli dan urutan commit tetap terjaga',
        'Selalu menghasilkan commit yang lebih sedikit',
        'Mengubah hash commit lama agar lebih rapi',
      ],
      correctOptionIndex: 1,
      explanation:
        'Merge mempertahankan history asli; rebase menulis ulang history untuk membuatnya linear.',
    },
    {
      id: 'q-01-04',
      order: 4,
      prompt: 'Tipe object Git manakah yang menyimpan konten file tanpa metadata nama?',
      options: ['Tree', 'Commit', 'Blob', 'Tag'],
      correctOptionIndex: 2,
      explanation:
        'Blob menyimpan konten file murni; metadata nama dan permission disimpan di tree.',
    },
    {
      id: 'q-01-05',
      order: 5,
      prompt: 'File apa yang menunjuk ke branch aktif dalam repository lokal?',
      options: ['.git/config', '.git/HEAD', '.git/index', '.git/logs/HEAD'],
      correctOptionIndex: 1,
      explanation:
        '.git/HEAD adalah ref simbolis yang menunjuk ke ref branch aktif, misalnya refs/heads/main.',
    },
    {
      id: 'q-01-06',
      order: 6,
      prompt: 'Pada Git Flow, branch apa yang menjadi tempat integrasi fitur sebelum release?',
      options: ['main', 'hotfix', 'develop', 'production'],
      correctOptionIndex: 2,
      explanation:
        'Dalam Git Flow, develop adalah branch integrasi untuk fitur-fitur; main digunakan untuk production release.',
    },
    {
      id: 'q-01-07',
      order: 7,
      prompt: 'Apa fungsi utama reflog?',
      options: [
        'Mengompresi object database',
        'Mencatat setiap perubahan ref untuk pemulihan commit',
        'Menandai commit dengan versi semver',
        'Menggabungkan beberapa branch sekaligus',
      ],
      correctOptionIndex: 1,
      explanation:
        'Reflog menyimpan histori perubahan ref sehingga commit yang terhapus atau hilang akibat rebase/reset masih dapat dipulihkan.',
    },
    {
      id: 'q-01-08',
      order: 8,
      prompt: 'Dalam content-addressable storage Git, hash object dihitung dari?',
      options: [
        'Nama file dan timestamp saja',
        'Header tipe dan ukuran serta konten object',
        'Pesan commit dan nama author',
        'Nama branch dan remote URL',
      ],
      correctOptionIndex: 1,
      explanation:
        'Git menghitung SHA-1 dari serialisasi "<tipe> <ukuran>\\0<konten>", bukan hanya dari konten file.',
    },
  ],
}
