import type { Quiz } from '@/content/types'

export const ch01Quiz: Quiz = {
  id: 'quiz-ch-01-dom-manipulation-events',
  title: 'Quiz: DOM Manipulation & Events',
  passingScore: 8,
  questions: [
    {
      id: 'q-01-01',
      order: 1,
      prompt: 'Apa kepanjangan dari DOM?',
      options: [
        'Document Object Model',
        'Data Object Model',
        'Document Oriented Mode',
        'Dynamic Object Module',
      ],
      correctOptionIndex: 0,
      explanation:
        'DOM adalah Document Object Model, representasi tree dari dokumen HTML yang bisa diakses JavaScript.',
    },
    {
      id: 'q-01-02',
      order: 2,
      prompt: 'Method mana yang mengembalikan elemen pertama yang cocok dengan CSS selector?',
      options: [
        'getElementById',
        'querySelectorAll',
        'querySelector',
        'getElementsByClassName',
      ],
      correctOptionIndex: 2,
      explanation:
        'querySelector mengembalikan elemen pertama yang cocok dengan selector CSS. querySelectorAll mengembalikan semua elemen.',
    },
    {
      id: 'q-01-03',
      order: 3,
      prompt: 'Fase event mana yang bergerak dari elemen target kembali ke root?',
      options: [
        'Capture phase',
        'Target phase',
        'Bubble phase',
        'Default phase',
      ],
      correctOptionIndex: 2,
      explanation:
        'Bubble phase adalah fase event naik dari elemen target menuju ancestor hingga root window.',
    },
    {
      id: 'q-01-04',
      order: 4,
      prompt: 'Apa fungsi utama event.preventDefault()?',
      options: [
        'Menghentikan propagasi event ke ancestor',
        'Mencegah aksi default browser, seperti submit form atau navigasi link',
        'Menghapus listener event',
        'Memaksa browser melakukan reflow',
      ],
      correctOptionIndex: 1,
      explanation:
        'preventDefault mencegah browser menjalankan aksi bawaan yang terkait dengan event, bukan menghentikan propagasi.',
    },
    {
      id: 'q-01-05',
      order: 5,
      prompt: 'Mengapa event delegation direkomendasikan untuk daftar yang besar?',
      options: [
        'Karena menghindari pendaftaran listener di banyak elemen anak',
        'Karena membuat DOM tree lebih kecil',
        'Karena menghilangkan bubble phase',
        'Karena tidak memerlukan CSS selector',
      ],
      correctOptionIndex: 0,
      explanation:
        'Event delegation menggunakan satu listener di ancestor untuk menangani banyak elemen, menghemat memori dan otomatis menangani elemen dinamis.',
    },
    {
      id: 'q-01-06',
      order: 6,
      prompt: 'Opsi listener apa yang memberi hint browser bahwa handler tidak akan memanggil preventDefault saat scroll?',
      options: [
        '{ capture: true }',
        '{ once: true }',
        '{ passive: true }',
        '{ bubbles: false }',
      ],
      correctOptionIndex: 2,
      explanation:
        'Opsi passive: true memberitahu browser bahwa listener tidak akan memanggil preventDefault, sehingga scroll bisa lebih lancar.',
    },
    {
      id: 'q-01-07',
      order: 7,
      prompt: 'Manakah dari properti berikut yang paling mungkin memaksa synchronous layout (reflow)?',
      options: [
        'transform',
        'opacity',
        'offsetHeight',
        'filter',
      ],
      correctOptionIndex: 2,
      explanation:
        'Membaca properti layout seperti offsetHeight setelah menulis style memaksa browser menghitung layout secara sinkron.',
    },
    {
      id: 'q-01-08',
      order: 8,
      prompt: 'API mana yang digunakan untuk memantau perubahan DOM secara asynchronous?',
      options: [
        'addEventListener("mutation")',
        'MutationObserver',
        'document.watch()',
        'DOMChangeEvent',
      ],
      correctOptionIndex: 1,
      explanation:
        'MutationObserver adalah API modern untuk mengamati perubahan DOM secara asynchronous melalui microtask.',
    },
  ],
}
