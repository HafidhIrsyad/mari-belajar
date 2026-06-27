import type { Quiz } from '@/content/types'

export const ch06Quiz: Quiz = {
  id: 'quiz-ch-06-memory-model-garbage-collection-js',
  title: 'Quiz: Memory Model & Garbage Collection',
  passingScore: 8,
  questions: [
    {
      id: 'q-06-01',
      order: 1,
      prompt: 'Di mana objek JavaScript biasanya dialokasikan?',
      options: ['Stack', 'Heap', 'Register CPU', 'Cache L1'],
      correctOptionIndex: 1,
      explanation:
        'Objek JavaScript dialokasikan di heap karena lifetime-nya tidak terikat pada frame fungsi.',
    },
    {
      id: 'q-06-02',
      order: 2,
      prompt: 'Apa nama hipotesis yang menyatakan sebagian besar objek mati muda?',
      options: [
        'Generational Hypothesis',
        'Reference Hypothesis',
        'Mark-and-Sweep Hypothesis',
        'WeakRef Hypothesis',
      ],
      correctOptionIndex: 0,
      explanation:
        'Generational Hypothesis menjadi dasar pembagian heap menjadi New Space dan Old Space.',
    },
    {
      id: 'q-06-03',
      order: 3,
      prompt: 'Algoritma apa yang digunakan V8 untuk mengumpulkan objek di New Space?',
      options: ['Mark-and-Sweep', 'Scavenge', 'Reference Counting', 'Compaction'],
      correctOptionIndex: 1,
      explanation:
        'Scavenge adalah algoritma copy-collection yang cepat untuk objek muda di New Space.',
    },
    {
      id: 'q-06-04',
      order: 4,
      prompt: 'Struktur data manakah yang key-nya tidak mencegah garbage collection?',
      options: ['Map', 'Set', 'WeakMap', 'Array'],
      correctOptionIndex: 2,
      explanation:
        'Key di WeakMap harus berupa objek dan tidak membuat objek tersebut tetap hidup bagi GC.',
    },
    {
      id: 'q-06-05',
      order: 5,
      prompt: 'Apa fungsi FinalizationRegistry?',
      options: [
        'Menyimpan referensi kuat ke objek',
        'Menjalankan callback saat objek dikoleksi GC',
        'Memaksa GC berjalan segera',
        'Mengembalikan objek yang sudah dikoleksi',
      ],
      correctOptionIndex: 1,
      explanation:
        'FinalizationRegistry memungkinkan kita mendaftarkan callback yang dijalankan ketika target objek dikoleksi GC.',
    },
    {
      id: 'q-06-06',
      order: 6,
      prompt: 'Pola manakah yang sering menyebabkan memory leak di aplikasi browser?',
      options: [
        'Menggunakan WeakRef untuk cache',
        'Detached DOM nodes yang masih direferensi JavaScript',
        'Menggunakan const untuk variabel lokal',
        'Menghapus event listener saat unmount',
      ],
      correctOptionIndex: 1,
      explanation:
        'Detached DOM nodes tetap hidup di heap jika masih ada referensi JavaScript ke elemen tersebut.',
    },
    {
      id: 'q-06-07',
      order: 7,
      prompt: 'Apa keunggulan utama Orinoco dibandingkan GC V8 lama?',
      options: [
        'Menghapus kebutuhan akan heap',
        'Mendukung parallel dan concurrent marking untuk mengurangi jank',
        'Menggunakan reference counting sepenuhnya',
        'Memindahkan semua objek ke stack',
      ],
      correctOptionIndex: 1,
      explanation:
        'Orinoco memperkenalkan parallel marking dan concurrent GC agar aplikasi tetap responsif.',
    },
    {
      id: 'q-06-08',
      order: 8,
      prompt: 'Tool browser apa yang digunakan untuk menganalisis heap snapshot?',
      options: [
        'Elements panel',
        'Network panel',
        'Memory panel di Chrome DevTools',
        'Console panel',
      ],
      correctOptionIndex: 2,
      explanation:
        'Chrome DevTools Memory panel menyediakan heap snapshot, allocation timeline, dan deteksi detached nodes.',
    },
  ],
}
