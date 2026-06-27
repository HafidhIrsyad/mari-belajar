import type { Quiz } from '@/content/types'

export const ch07Quiz: Quiz = {
  id: 'quiz-ch-07-dom-events-interactivity',
  title: 'Quiz: DOM Events & Interactivity',
  passingScore: 8,
  questions: [
    {
      id: 'q-07-01',
      order: 1,
      prompt: 'Event object apa yang menyimpan elemen asal event?',
      options: ['event.currentTarget', 'event.target', 'event.type', 'event.listener'],
      correctOptionIndex: 1,
      explanation:
        'event.target adalah elemen yang memicu event, sedangkan event.currentTarget adalah elemen tempat listener dipasang.',
    },
    {
      id: 'q-07-02',
      order: 2,
      prompt: 'Apa fungsi event.preventDefault()?',
      options: [
        'Menghentikan propagasi event ke induk',
        'Mencegah perilaku default browser',
        'Menghapus event listener',
        'Memicu event secara manual',
      ],
      correctOptionIndex: 1,
      explanation:
        'preventDefault mencegah browser menjalankan perilaku bawaan, seperti submit form atau navigasi link.',
    },
    {
      id: 'q-07-03',
      order: 3,
      prompt: 'Keuntungan utama event delegation adalah?',
      options: [
        'Event tidak perlu bubbling',
        'Lebih sedikit listener yang perlu dikelola, termasuk untuk elemen dinamis',
        'Semua event dijalankan secara sinkron',
        'Mencegah semua default behavior secara otomatis',
      ],
      correctOptionIndex: 1,
      explanation:
        'Dengan event delegation, satu listener pada induk dapat menangani event dari banyak anak, bahkan yang ditambahkan setelah listener dipasang.',
    },
    {
      id: 'q-07-04',
      order: 4,
      prompt: 'Opsi apa yang memberitahu browser bahwa listener scroll tidak akan memanggil preventDefault?',
      options: ['{ capture: true }', '{ once: true }', '{ passive: true }', '{ bubbles: false }'],
      correctOptionIndex: 2,
      explanation:
        'Opsi passive: true memungkinkan browser mengoptimalkan scroll karena listener tidak akan memblokir dengan preventDefault.',
    },
    {
      id: 'q-07-05',
      order: 5,
      prompt: 'Bagaimana cara membuat custom event dengan data tambahan?',
      options: [
        'new Event("name", { data })',
        'new CustomEvent("name", { detail })',
        'document.createEvent("custom")',
        'dispatchEvent("name", data)',
      ],
      correctOptionIndex: 1,
      explanation:
        'CustomEvent menerima opsi detail yang dapat berisi data kustom untuk dibaca oleh listener.',
    },
    {
      id: 'q-07-06',
      order: 6,
      prompt: 'Media query apa yang mendeteksi preferensi pengguna untuk mengurangi animasi?',
      options: [
        '(prefers-color-scheme: dark)',
        '(prefers-reduced-motion: reduce)',
        '(min-width: 768px)',
        '(hover: hover)',
      ],
      correctOptionIndex: 1,
      explanation:
        'prefers-reduced-motion: reduce menandakan bahwa pengguna menginginkan minimal animasi.',
    },
    {
      id: 'q-07-07',
      order: 7,
      prompt: 'Mengapa lebih baik menangani submit form daripada click pada tombol?',
      options: [
        'Karena submit lebih cepat dieksekusi',
        'Karena form juga bisa disubmit dengan tombol Enter di dalam field',
        'Karena event click tidak didukung pada tombol',
        'Karena submit tidak memerlukan preventDefault',
      ],
      correctOptionIndex: 1,
      explanation:
        'Menangani submit form mencakup semua cara pengguna mengirim form, termasuk menekan Enter di input.',
    },
    {
      id: 'q-07-08',
      order: 8,
      prompt: 'Apa perbedaan throttle dan debounce?',
      options: [
        'Throttle menunggu diam, debounce membatasi frekuensi',
        'Throttle membatasi frekuensi eksekusi, debounce menunggu berhenti sebelum eksekusi',
        'Keduanya sama-sama memicu setiap frame',
        'Throttle untuk event click, debounce hanya untuk event submit',
      ],
      correctOptionIndex: 1,
      explanation:
        'Throttle membatasi eksekusi pada interval tertentu, sedangkan debounce menunda eksekusi hingga event berhenti dipicu dalam periode waktu tertentu.',
    },
  ],
}
