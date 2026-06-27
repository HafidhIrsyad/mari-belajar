import type { Chapter } from '@/content/types'
import { ch06Lesson } from './lesson'
import { ch06Quiz } from './quiz'
import { ch06References } from './references'

export const ch06AsynchronousJavascript: Chapter = {
  id: 'ch-06-asynchronous-javascript',
  slug: 'ch-06-asynchronous-javascript',
  order: 6,
  title: 'Asynchronous JavaScript',
  summary:
    'Memahami pemrograman asynchronous di JavaScript: callback, Promise, chaining, Promise.all/race, async/await, error handling, serta konsep event loop.',
  estimatedMinutes: 16,
  learningObjectives: [
    'Memahami alasan di balik pemrograman asynchronous di JavaScript.',
    'Menjelaskan callback, callback hell, serta penggunaan setTimeout dan setInterval.',
    'Membuat dan merantai Promise dengan then, catch, dan finally.',
    'Menggunakan Promise.all dan Promise.race untuk menjalankan banyak operasi asynchronous.',
    'Menulis kode asynchronous yang rapi dengan async/await dan try/catch.',
    'Mengenal konsep event loop sebagai fondasi eksekusi asynchronous di JavaScript.',
  ],
  summaryPoints: [
    'Asynchronous memungkinkan program menunggu operasi lambat tanpa memblokir thread utama.',
    'Callback adalah fungsi yang diteruskan sebagai argumen untuk dieksekusi nanti; callback hell muncul saat callback bersarang terlalu dalam.',
    'setTimeout dan setInterval menunda atau mengulang eksekusi fungsi secara asynchronous.',
    'Promise merepresentasikan nilai yang mungkin tersedia di masa depan, dengan then, catch, dan finally.',
    'Promise.all menunggu semua Promise selesai, sedangkan Promise.race mengambil hasil pertama yang selesai.',
    'async/await membuat kode asynchronous terlihat seperti kode synchronous dan lebih mudah dibaca.',
    'Event loop mengatur eksekusi call stack, task queue, dan microtask queue agar kode asynchronous berjalan teratur.',
  ],
  references: ch06References,
  lesson: ch06Lesson,
  quiz: ch06Quiz,
}
