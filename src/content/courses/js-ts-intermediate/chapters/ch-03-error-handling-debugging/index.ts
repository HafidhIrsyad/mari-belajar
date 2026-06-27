import type { Chapter } from '@/content/types'
import { ch03Lesson } from './lesson'
import { ch03Quiz } from './quiz'
import { ch03References } from './references'

export const ch03ErrorHandlingDebugging: Chapter = {
  id: 'ch-03-error-handling-debugging',
  slug: 'ch-03-error-handling-debugging',
  order: 3,
  title: 'Error Handling & Debugging',
  summary:
    'Menguasai teknik penanganan error mulai dari try/catch, custom error class, error cause chaining, structured logging, hingga debugging memory dan async stack traces.',
  estimatedMinutes: 35,
  learningObjectives: [
    'Menggunakan try/catch/finally untuk menangani error secara elegan.',
    'Membuat custom Error class dengan konteks tambahan.',
    'Memanfaatkan error cause chaining untuk diagnosis root cause.',
    'Menerapkan structured logging dan error codes untuk aplikasi produksi.',
    'Mendebug memory leak dan performa dengan DevTools.',
    'Memahami async stack traces dan batasannya.',
  ],
  summaryPoints: [
    'try/catch/finally memisahkan jalur normal dan jalur error.',
    'Custom Error class memungkinkan kita menambahkan metadata seperti code dan status.',
    'Error cause chaining menyimpan error asli saat wrapping, memudahkan diagnosis.',
    'Structured logging menghasilkan log yang bisa diproses mesin, bukan hanya teks bebas.',
    'Memory leak sering berasal dari closure, timer, event listener, atau detached DOM.',
    'Async stack traces membantu melacak error yang melibatkan Promise dan async/await.',
  ],
  references: ch03References,
  lesson: ch03Lesson,
  quiz: ch03Quiz,
}
