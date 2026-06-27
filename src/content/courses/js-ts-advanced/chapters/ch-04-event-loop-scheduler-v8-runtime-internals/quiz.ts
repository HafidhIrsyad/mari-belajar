import type { Quiz } from '@/content/types'

export const ch04Quiz: Quiz = {
  id: 'quiz-ch-04-event-loop-scheduler-v8-runtime-internals',
  title: 'Quiz: Event Loop, Scheduler & V8 Runtime Internals',
  passingScore: 8,
  questions: [
    {
      id: 'q-04-01',
      order: 1,
      prompt: 'Komponen V8 mana yang bertugas mengeksekusi bytecode awal?',
      options: ['TurboFan', 'Ignition', 'libuv', 'Blink'],
      correctOptionIndex: 1,
      explanation:
        'Ignition adalah interpreter V8 yang mengeksekusi bytecode sebelum TurboFan melakukan optimasi.',
    },
    {
      id: 'q-04-02',
      order: 2,
      prompt: 'Apa nama struktur data yang V8 gunakan untuk mempercepat property access berdasarkan urutan properti?',
      options: ['Hash table', 'Hidden class', 'Linked list', 'B-tree'],
      correctOptionIndex: 1,
      explanation:
        'Hidden class (atau map) menyimpan metadata offset properti sehingga akses properti dapat dilakukan dengan cepat.',
    },
    {
      id: 'q-04-03',
      order: 3,
      prompt: 'Kondisi inline cache manakah yang paling cepat?',
      options: ['Monomorphic', 'Polymorphic', 'Megamorphic', 'Amorphic'],
      correctOptionIndex: 0,
      explanation:
        'Inline cache monomorphic hanya menangani satu shape, sehingga pencarian properti paling cepat.',
    },
    {
      id: 'q-04-04',
      order: 4,
      prompt: 'Di Node.js, fase manakah yang mengeksekusi callback setImmediate?',
      options: ['Timers', 'Poll', 'Check', 'Close callbacks'],
      correctOptionIndex: 2,
      explanation:
        'Callback setImmediate dieksekusi pada fase check setelah fase poll.',
    },
    {
      id: 'q-04-05',
      order: 5,
      prompt: 'Fungsi mana yang berjalan di luar event loop proper dan dapat menyebabkan starvation jika disalahgunakan?',
      options: ['setTimeout', 'queueMicrotask', 'process.nextTick', 'setImmediate'],
      correctOptionIndex: 2,
      explanation:
        '`process.nextTick` berjalan sebelum fase event loop berikutnya; penggunaan berlebihan bisa membuat fase lain tidak pernah tercapai.',
    },
    {
      id: 'q-04-06',
      order: 6,
      prompt: 'Apa yang terjadi saat TurboFan menyimpulkan tipe yang salah?',
      options: [
        'Program langsung crash',
        'V8 melakukan deoptimization dan kembali ke bytecode',
        'Kode tetap dijalankan dalam machine code tanpa perubahan',
        'Objek dihapus dari heap secara otomatis',
      ],
      correctOptionIndex: 1,
      explanation:
        'Jika asumsi tipe tidak valid, V8 melakukan deoptimization (bailout) ke bytecode agar tetap korek.',
    },
    {
      id: 'q-04-07',
      order: 7,
      prompt: 'Di browser, urutan eksekusi setelah satu macrotask adalah?',
      options: [
        'Langsung ke macrotask berikutnya',
        'Mengosongkan semua microtask, kemudian render jika perlu',
        'Mengeksekusi requestAnimationFrame terlebih dahulu',
        'Menunggu event I/O baru',
      ],
      correctOptionIndex: 1,
      explanation:
        'Setelah satu macrotask selesai, browser mengosongkan microtask queue sebelum melanjutkan ke macrotask atau render berikutnya.',
    },
    {
      id: 'q-04-08',
      order: 8,
      prompt: 'API browser modern apa yang dapat memberi hint prioritas tugas?',
      options: [
        'requestIdleCallback',
        'scheduler.postTask',
        'setInterval',
        'MutationObserver',
      ],
      correctOptionIndex: 1,
      explanation:
        '`scheduler.postTask` memungkinkan pengembang menentukan prioritas seperti user-blocking, user-visible, atau background.',
    },
  ],
}
