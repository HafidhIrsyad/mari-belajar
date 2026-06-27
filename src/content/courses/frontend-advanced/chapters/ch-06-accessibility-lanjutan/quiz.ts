import type { Quiz } from '@/content/types'

export const ch06Quiz: Quiz = {
  id: 'quiz-ch-06-accessibility-lanjutan',
  title: 'Quiz: Accessibility Lanjutan',
  passingScore: 8,
  questions: [
    {
      id: 'q-06-01',
      order: 1,
      prompt: 'Apa fungsi utama skip link?',
      options: [
        'Mengganti semua navigasi dengan satu link',
        'Membantu pengguna keyboard melewati navigasi berulang ke konten utama',
        'Menambahkan animasi pada halaman',
        'Menyembunyikan konten dari screen reader',
      ],
      correctOptionIndex: 1,
      explanation:
        'Skip link memungkinkan pengguna keyboard langsung menuju konten utama tanpa harus menavigasi semua link navigasi.',
    },
    {
      id: 'q-06-02',
      order: 2,
      prompt: 'Kapan sebaiknya menggunakan aria-live="assertive"?',
      options: [
        'Untuk semua status update',
        'Hanya untuk error kritis atau notifikasi yang benar-benar memerlukan perhatian segera',
        'Untuk mengumumkan perubahan konten statis',
        'Untuk menonaktifkan screen reader',
      ],
      correctOptionIndex: 1,
      explanation:
        'Assertive menginterupsi pengguna, sehingga harus digunakan dengan hemat untuk situasi yang benar-benar penting.',
    },
    {
      id: 'q-06-03',
      order: 3,
      prompt: 'Komponen dialog/modal yang aksesibel memerlukan apa saja?',
      options: [
        'Hanya styling yang bagus',
        'Focus trap, label, role dialog, dan restore focus saat ditutup',
        'Tombol close yang tersembunyi',
        'Tidak memerlukan ARIA attributes',
      ],
      correctOptionIndex: 1,
      explanation:
        'Dialog aksesibel memerlukan peran, label, fokus yang dikelola dengan baik, dan pengembalian fokus ke elemen pemicu.',
    },
    {
      id: 'q-06-04',
      order: 4,
      prompt: 'Apa peran aria-activedescendant pada combobox?',
      options: [
        'Menyembunyikan daftar saran',
        'Melacak item yang sedang disorot dalam listbox',
        'Memberi label pada input',
        'Menutup combobox saat blur',
      ],
      correctOptionIndex: 1,
      explanation:
        'aria-activedescendant menghubungkan input combobox dengan ID item yang sedang disorot sehingga screen reader dapat mengumumkannya.',
    },
    {
      id: 'q-06-05',
      order: 5,
      prompt: 'Mengapa automated accessibility testing tidak cukup sendiri?',
      options: [
        'Karena tidak dapat berjalan di CI',
        'Karena hanya menangkap sebagian masalah; manual testing tetap diperlukan',
        'Karena terlalu mahal',
        'Karena hanya berfungsi untuk komponen React',
      ],
      correctOptionIndex: 1,
      explanation:
        'Automated tools seperti axe menangkap sekitar 30% masalah aksesibilitas; banyak aspek memerlukan evaluasi manual.',
    },
    {
      id: 'q-06-06',
      order: 6,
      prompt: 'Kriteria sukses baru di WCAG 2.2 adalah?',
      options: [
        'Semantic HTML harus valid',
        'Focus Not Obscured dan Target Size Minimum',
        'Semua gambar harus memiliki alt text',
        'Tombol harus berwarna biru',
      ],
      correctOptionIndex: 1,
      explanation:
        'WCAG 2.2 menambahkan kriteria seperti Focus Not Obscured, Drag Movements, dan Target Size Minimum.',
    },
    {
      id: 'q-06-07',
      order: 7,
      prompt: 'Apa yang dimaksud dengan restore focus pada modal?',
      options: [
        'Memindahkan fokus ke elemen pertama di halaman',
        'Mengembalikan fokus ke elemen yang membuka modal setelah modal ditutup',
        'Menghapus fokus dari semua elemen',
        'Memfokuskan modal tanpa batas waktu',
      ],
      correctOptionIndex: 1,
      explanation:
        'Restore focus memastikan pengguna kembali ke posisi semula setelah menutup modal, menjaga orientasi navigasi.',
    },
    {
      id: 'q-06-08',
      order: 8,
      prompt: 'Prinsip inclusive design menekankan apa?',
      options: [
        'Mendesain hanya untuk pengguna rata-rata',
        'Memastikan produk dapat digunakan oleh beragam kemampuan, preferensi, dan konteks',
        'Mengabaikan preferensi pengguna demi konsistensi',
        'Fokus hanya pada screen reader',
      ],
      correctOptionIndex: 1,
      explanation:
        'Inclusive design bertujuan menghilangkan eksklusi yang tidak disengaja dengan mempertimbangkan keragaman pengguna.',
    },
  ],
}
