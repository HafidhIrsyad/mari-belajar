import type { Chapter } from '@/content/types'
import { ch03Lesson } from './lesson'
import { ch03Quiz } from './quiz'
import { ch03References } from './references'

export const ch03ControlFlow: Chapter = {
  id: 'ch-03-control-flow',
  slug: 'ch-03-control-flow',
  order: 3,
  title: 'Control Flow',
  summary:
    'Mempelajari percabangan if/else, switch, perulangan for, break, continue, label, defer, panic, dan recover di Go, serta perbandingan dengan JavaScript/TypeScript.',
  estimatedMinutes: 25,
  learningObjectives: [
    'Menggunakan if, else if, dan else di Go.',
    'Menggunakan switch dengan multiple case dan fallthrough.',
    'Menggunakan for sebagai satu-satunya struktur perulangan di Go.',
    'Memahami break, continue, dan labeled statements.',
    'Menggunakan defer untuk menunda eksekusi fungsi.',
    'Memahami panic dan recover sebagai mekanisme exception-like.',
  ],
  summaryPoints: [
    'Go memiliki if, else if, else, dan switch untuk percabangan.',
    'for adalah satu-satunya kata kunci perulangan di Go, tetapi fleksibel untuk C-style, condition-only, dan range.',
    'switch di Go tidak memerlukan break karena setiap case berhenti secara implisit.',
    'defer menunda eksekusi fungsi sampai fungsi induk selesai, berguna untuk cleanup.',
    'panic menghentikan eksekusi normal; recover menangkap panic di dalam deferred function.',
    'Go tidak memiliki while atau do-while; semuanya diwakili oleh for.',
  ],
  references: ch03References,
  lesson: ch03Lesson,
  quiz: ch03Quiz,
}
