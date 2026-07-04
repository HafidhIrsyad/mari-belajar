import type { Quiz } from '@/content/types'

export const ch05Quiz: Quiz = {
  id: 'quiz-ch-05-computer-architecture',
  title: 'Quiz: Arsitektur Komputer',
  passingScore: 8,
  questions: [
    {
      id: 'q-05-01',
      order: 1,
      prompt: 'Apa tujuan utama pipeline CPU?',
      options: [
        'Menyimpan instruksi di cache L3',
        'Meningkatkan throughput dengan mengeksekusi tahap berbeda instruksi secara paralel',
        'Mengganti kebutuhan akan branch predictor',
        'Menghilangkan page fault',
      ],
      correctOptionIndex: 1,
      explanation:
        'Pipeline memecah eksekusi instruksi menjadi tahap-tahap yang dapat overlap sehingga throughput mendekati satu instruksi per siklus clock.',
    },
    {
      id: 'q-05-02',
      order: 2,
      prompt: 'Spatial locality berarti?',
      options: [
        'Data yang diakses kemungkinan tidak pernah diakses lagi',
        'Akses ke satu lokasi memori cenderung diikuti akses ke lokasi berdekatan',
        'Setiap core memiliki cache L3 sendiri',
        'Page table disimpan di register CPU',
      ],
      correctOptionIndex: 1,
      explanation:
        'Spatial locality: jika program mengakses elemen array[i], kemungkinan besar elemen array[i+1], array[i+2] ikut diakses — cache line dimuat sekaligus.',
    },
    {
      id: 'q-05-03',
      order: 3,
      prompt: 'Urutan cache dari tercepat ke terlambat (tipikal) adalah?',
      options: ['L3 → L2 → L1 → RAM', 'L1 → L2 → L3 → RAM', 'RAM → L3 → L2 → L1', 'L1 → RAM → L2 → L3'],
      correctOptionIndex: 1,
      explanation:
        'L1 paling kecil dan tercepat (per core), L2 sedikit lebih besar, L3 shared antar core, RAM jauh lebih lambat.',
    },
    {
      id: 'q-05-04',
      order: 4,
      prompt: 'Apa konsekuensi branch misprediction?',
      options: [
        'Page table dihapus',
        'Pipeline di-flush dan instruksi spekulatif dibuang',
        'TLB otomatis diperbesar',
        'Cache L1 dinonaktifkan',
      ],
      correctOptionIndex: 1,
      explanation:
        'Ketika prediksi cabang salah, CPU membuang instruksi yang sudah di-fetch/decode secara spekulatif dan memulai ulang dari cabang yang benar — penalty beberapa siklus.',
    },
    {
      id: 'q-05-05',
      order: 5,
      prompt: 'Fungsi utama virtual memory adalah?',
      options: [
        'Mengganti kebutuhan akan CPU cache',
        'Memberikan isolasi proses dan ilusi ruang alamat besar/kontigu',
        'Menghapus kebutuhan page table',
        'Mempercepat branch prediction',
      ],
      correctOptionIndex: 1,
      explanation:
        'Virtual memory memungkinkan setiap proses memiliki ruang alamat terisolasi dan lebih besar dari RAM fisik, dengan OS yang mengelola mapping ke frame fisik.',
    },
    {
      id: 'q-05-06',
      order: 6,
      prompt: 'TLB (Translation Lookaside Buffer) adalah?',
      options: [
        'Cache hardware untuk translasi VPN → PFN',
        'Buffer untuk menyimpan instruksi branch',
        'Register khusus di ALU',
        'File swap di disk',
      ],
      correctOptionIndex: 0,
      explanation:
        'TLB meng-cache entri page table yang baru-baru ini dipakai sehingga translasi alamat virtual ke fisik tidak selalu memerlukan page table walk di RAM.',
    },
    {
      id: 'q-05-07',
      order: 7,
      prompt: 'Major page fault terjadi ketika?',
      options: [
        'TLB hit',
        'Page harus dibaca dari disk (swap) karena tidak ada di RAM',
        'Branch prediction benar',
        'Cache L1 penuh',
      ],
      correctOptionIndex: 1,
      explanation:
        'Major page fault melibatkan I/O disk untuk membawa page ke RAM — latency jauh lebih besar daripada minor page fault yang hanya mengalokasikan frame kosong.',
    },
    {
      id: 'q-05-08',
      order: 8,
      prompt: 'Ukuran page tipikal di sistem x86-64 modern adalah?',
      options: ['64 byte', '512 byte', '4 KB', '1 MB'],
      correctOptionIndex: 2,
      explanation:
        'Page size default 4 KB (4096 byte) adalah standar de facto. Huge pages (2 MB, 1 GB) tersedia untuk mengurangi TLB pressure pada working set besar.',
    },
  ],
}
