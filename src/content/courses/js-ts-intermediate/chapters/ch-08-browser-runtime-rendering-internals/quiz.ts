import type { Quiz } from '@/content/types'

export const ch08Quiz: Quiz = {
  id: 'quiz-ch-08-browser-runtime-rendering-internals',
  title: 'Quiz: Browser Runtime & Rendering Internals',
  passingScore: 8,
  questions: [
    {
      id: 'q-08-01',
      order: 1,
      prompt: 'Struktur data apa yang digunakan JavaScript untuk melacak fungsi yang sedang berjalan?',
      options: [
        'Heap',
        'Call stack',
        'Event queue',
        'Task list',
      ],
      correctOptionIndex: 1,
      explanation:
        'Call stack adalah struktur LIFO yang melacak fungsi yang sedang dieksekusi.',
    },
    {
      id: 'q-08-02',
      order: 2,
      prompt: 'Manakah yang termasuk microtask?',
      options: [
        'setTimeout callback',
        'Promise.then callback',
        'I/O event',
        'setInterval callback',
      ],
      correctOptionIndex: 1,
      explanation:
        'Promise.then, queueMicrotask, dan MutationObserver masuk ke microtask queue.',
    },
    {
      id: 'q-08-03',
      order: 3,
      prompt: 'Apa yang terjadi pada microtask sebelum macrotask berikutnya diproses?',
      options: [
        'Semua microtask dijalankan',
        'Microtask diabaikan',
        'Hanya satu microtask dijalankan',
        'Microtask dijadwalkan setelah render',
      ],
      correctOptionIndex: 0,
      explanation:
        'Event loop mengosongkan microtask queue sepenuhnya sebelum mengambil task berikutnya dari task queue.',
    },
    {
      id: 'q-08-04',
      order: 4,
      prompt: 'Urutan langkah rendering pipeline yang benar adalah?',
      options: [
        'Layout, Style, Paint, Composite',
        'Style, Layout, Paint, Composite',
        'Paint, Style, Layout, Composite',
        'Composite, Paint, Layout, Style',
      ],
      correctOptionIndex: 1,
      explanation:
        'Browser menghitung style, lalu layout, lalu paint, dan terakhir composite layer.',
    },
    {
      id: 'q-08-05',
      order: 5,
      prompt: 'Apa itu forced synchronous layout?',
      options: [
        'Menggunakan requestAnimationFrame untuk animasi',
        'Membaca properti layout setelah menulis style sehingga browser harus reflow segera',
        'Menggambar layer di compositor thread',
        'Menunda microtask sampai render selesai',
      ],
      correctOptionIndex: 1,
      explanation:
        'Forced synchronous layout terjadi saat read layout setelah write style, memaksa browser menghitung layout di luar jadwal.',
    },
    {
      id: 'q-08-06',
      order: 6,
      prompt: 'Thread atau proses mana yang menangani scrolling tanpa memblokir main thread?',
      options: [
        'Browser process',
        'Renderer process',
        'Compositor thread',
        'GPU process',
      ],
      correctOptionIndex: 2,
      explanation:
        'Compositor thread menangani scrolling dan compositing layer, seringkali tanpa melibatkan main thread.',
    },
    {
      id: 'q-08-07',
      order: 7,
      prompt: 'API mana yang cocok untuk menjadwalkan pekerjaan sebelum paint berikutnya?',
      options: [
        'setTimeout',
        'requestAnimationFrame',
        'queueMicrotask',
        'fetch',
      ],
      correctOptionIndex: 1,
      explanation:
        'requestAnimationFrame dipanggil sebelum render frame berikutnya, ideal untuk animasi dan update visual.',
    },
    {
      id: 'q-08-08',
      order: 8,
      prompt: 'Apa peran V8 dalam browser runtime?',
      options: [
        'Menggambar piksel ke layar',
        'Menjalankan kode JavaScript dan berkomunikasi dengan Blink',
        'Mengelola tab dan address bar',
        'Menangani event scroll secara langsung',
      ],
      correctOptionIndex: 1,
      explanation:
        'V8 adalah engine JavaScript yang mengeksekusi kode dan berinteraksi dengan Blink melalui bindings untuk mengakses DOM.',
    },
  ],
}
