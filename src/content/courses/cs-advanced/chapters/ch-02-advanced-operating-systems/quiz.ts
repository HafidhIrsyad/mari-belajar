import type { Quiz } from '@/content/types'

export const ch02Quiz: Quiz = {
  id: 'quiz-ch-02-advanced-operating-systems',
  title: 'Quiz: Advanced Operating Systems',
  passingScore: 8,
  questions: [
    {
      id: 'q-02-01',
      order: 1,
      prompt: 'Mengapa aplikasi user space tidak boleh langsung mengakses perangkat keras?',
      options: [
        'Karena RAM terlalu kecil',
        'Kernel menegakkan isolasi dan keamanan melalui system call',
        'Agar compiler lebih cepat',
        'Karena CPU hanya punya satu core',
      ],
      correctOptionIndex: 1,
      explanation:
        'User space berjalan tanpa privilege; akses hardware hanya melalui system call ke kernel yang memvalidasi dan mengatur operasi.',
    },
    {
      id: 'q-02-02',
      order: 2,
      prompt: 'Kelemahan utama scheduling FCFS (First-Come First-Served)?',
      options: [
        'Tidak bisa menangani proses sama sekali',
        'Convoy effect: proses panjang memblokir proses pendek di belakangnya',
        'Membutuhkan hardware khusus',
        'Hanya berjalan di Windows',
      ],
      correctOptionIndex: 1,
      explanation:
        'FCFS non-preemptive: proses yang sudah dapat CPU berjalan sampai selesai. Proses CPU-bound panjang membuat proses interaktif menunggu lama (convoy effect).',
    },
    {
      id: 'q-02-03',
      order: 3,
      prompt: 'Round Robin scheduling menggunakan konsep?',
      options: [
        'Prioritas statis selamanya',
        'Time slice (quantum) — proses di-preempt setelah kuota waktu habis',
        'Random selection setiap detik',
        'Hanya menjalankan satu proses',
      ],
      correctOptionIndex: 1,
      explanation:
        'Round Robin memberikan setiap proses time slice yang sama. Jika belum selesai, proses kembali ke antrean ready — memberikan fairness untuk workload interaktif.',
    },
    {
      id: 'q-02-04',
      order: 4,
      prompt: 'Completely Fair Scheduler (CFS) di Linux menilai "keadilan" berdasarkan?',
      options: [
        'Ukuran file yang dibuka proses',
        'Virtual runtime — proses dengan runtime paling kecil diprioritaskan',
        'Jumlah thread saja',
        'Urutan PID',
      ],
      correctOptionIndex: 1,
      explanation:
        'CFS menggunakan red-black tree berdasarkan vruntime. Proses yang sudah banyak mendapat CPU memiliki vruntime lebih besar dan menunggu lebih lama.',
    },
    {
      id: 'q-02-05',
      order: 5,
      prompt: 'Apa yang terjadi saat context switch?',
      options: [
        'Seluruh disk diformat ulang',
        'OS menyimpan register CPU dan state proses lama, lalu memuat state proses baru',
        'Semua proses dihentikan permanen',
        'RAM digandakan otomatis',
      ],
      correctOptionIndex: 1,
      explanation:
        'Context switch menyimpan PC, register, stack pointer proses lama ke PCB, lalu memuat state proses baru. Overhead termasuk flush TLB dan cache pollution.',
    },
    {
      id: 'q-02-06',
      order: 6,
      prompt: 'Algoritma page replacement LRU mengganti page yang?',
      options: [
        'Paling baru diakses',
        'Paling lama tidak diakses (Least Recently Used)',
        'Ukuran terbesar',
        'Random setiap page fault',
      ],
      correctOptionIndex: 1,
      explanation:
        'LRU mengasumsikan locality: page yang baru-baru ini diakses kemungkinan akan diakses lagi. Page yang paling lama idle menjadi kandidat eviction.',
    },
    {
      id: 'q-02-07',
      order: 7,
      prompt: 'Copy-on-write (COW) paling berguna ketika?',
      options: [
        'fork() — parent dan child berbagi page read-only sampai salah satu menulis',
        'Menghapus semua file temporary',
        'Mengompresi log aplikasi',
        'Mengganti algoritma scheduling',
      ],
      correctOptionIndex: 0,
      explanation:
        'Saat fork(), OS tidak langsung menyalin seluruh memori. Parent dan child share page read-only; duplikasi fisik terjadi hanya saat write (page fault → copy page).',
    },
    {
      id: 'q-02-08',
      order: 8,
      prompt: 'Journaling pada filesystem (mis. ext4) bertujuan?',
      options: [
        'Mempercepat compile time',
        'Mencatat operasi metadata sebelum commit agar recovery konsisten setelah crash',
        'Mengganti inode dengan linked list',
        'Menghapus kebutuhan backup',
      ],
      correctOptionIndex: 1,
      explanation:
        'Journaling menulis log transaksi ke journal sebelum mengubah struktur filesystem. Setelah crash, OS replay journal untuk memulihkan konsistensi metadata.',
    },
  ],
}
