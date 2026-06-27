import type { Quiz } from '@/content/types'

export const ch07Quiz: Quiz = {
  id: 'quiz-ch-07-advanced-state-management-state-machines',
  title: 'Quiz: Advanced State Management & State Machines',
  passingScore: 8,
  questions: [
    {
      id: 'q-07-01',
      order: 1,
      prompt: 'Mengapa state normalization direkomendasikan untuk data relational?',
      options: [
        'Agar state lebih mudah dibaca sebagai nested arrays',
        'Untuk menghindari duplikasi data dan mempermudah update konsisten',
        'Agar setiap komponen memiliki salinan data sendiri',
        'Untuk menghapus kebutuhan akan selectors',
      ],
      correctOptionIndex: 1,
      explanation:
        'State normalization menyimpan entitas sebagai map berdasarkan ID sehingga tidak ada duplikasi dan update satu entitas tidak memerlukan perubahan di banyak tempat.',
    },
    {
      id: 'q-07-02',
      order: 2,
      prompt: 'Apa risiko utama optimistic updates?',
      options: [
        'UI selalu menunjukkan error',
        'Jika server gagal, UI harus di-rollback ke state sebelumnya',
        'Request ke server menjadi lebih lambat',
        'Tidak dapat digunakan dengan React hooks',
      ],
      correctOptionIndex: 1,
      explanation:
        'Optimistic updates memperbarui UI sebelum konfirmasi server, sehingga strategi rollback diperlukan untuk menangani kegagalan.',
    },
    {
      id: 'q-07-03',
      order: 3,
      prompt: 'Apa keuntungan selectors yang memoized?',
      options: [
        'Mengurangi jumlah actions yang perlu ditulis',
        'Mencegah perhitungan ulang dan re-render yang tidak perlu',
        'Menghapus kebutuhan untuk global state',
        'Membuat state menjadi mutable',
      ],
      correctOptionIndex: 1,
      explanation:
        'Selectors memoized hanya menghitung ulang jika input berubah, sehingga komponen yang mengonsumsi derived state tidak re-render tanpa alasan.',
    },
    {
      id: 'q-07-04',
      order: 4,
      prompt: 'Dalam pola undo/redo dengan tiga array, apa fungsi array past?',
      options: [
        'Menyimpan state masa depan untuk redo',
        'Menyimpan riwayat state sebelumnya untuk undo',
        'Menyimpan state yang sedang ditampilkan',
        'Menyimpan daftar error',
      ],
      correctOptionIndex: 1,
      explanation:
        'Array past menyimpan snapshot state sebelumnya sehingga undo dapat mengembalikan ke state sebelumnya.',
    },
    {
      id: 'q-07-05',
      order: 5,
      prompt: 'Keuntungan utama menggunakan state machine adalah?',
      options: [
        'Mengurangi jumlah komponen React',
        'State transitions eksplisit dan mustahil berada di state yang tidak valid',
        'Tidak memerlukan event handler',
        'Otomatis mengoptimalkan performa rendering',
      ],
      correctOptionIndex: 1,
      explanation:
        'State machine membuat transisi state eksplisit sehingga sistem selalu dalam state yang valid dan logika mudah diuji.',
    },
    {
      id: 'q-07-06',
      order: 6,
      prompt: 'Apa yang ditambahkan statecharts dibandingkan state machine sederhana?',
      options: [
        'Hanya satu state pada satu waktu',
        'Hierarchical states, parallel states, guards, dan actions',
        'Tidak ada event yang diizinkan',
        'Hanya transisi linear',
      ],
      correctOptionIndex: 1,
      explanation:
        'Statecharts memperluas state machine dengan fitur seperti hierarchical states, parallel states, guards, dan actions.',
    },
    {
      id: 'q-07-07',
      order: 7,
      prompt: 'API browser apa yang cocok untuk sinkronisasi state antar tab?',
      options: ['Fetch API', 'BroadcastChannel API', 'IntersectionObserver', 'ResizeObserver'],
      correctOptionIndex: 1,
      explanation:
        'BroadcastChannel API memungkinkan komunikasi antar browsing context seperti tab dan window dari origin yang sama.',
    },
    {
      id: 'q-07-08',
      order: 8,
      prompt: 'Apa keuntungan atomic state design?',
      options: [
        'Semua state disimpan dalam satu objek besar',
        'Unit state kecil yang independen mengurangi re-render dan meningkatkan reusability',
        'Tidak memerlukan hooks untuk mengakses state',
        'State selalu tersimpan di server',
      ],
      correctOptionIndex: 1,
      explanation:
        'Atomic state memecah state menjadi unit kecil yang dapat di-subscribe secara independen, mengurangi re-render yang tidak perlu.',
    },
  ],
}
