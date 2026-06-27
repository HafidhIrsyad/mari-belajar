import type { Chapter } from '@/content/types'
import { ch01Lesson } from './lesson'
import { ch01Quiz } from './quiz'
import { ch01References } from './references'

export const ch01DomManipulationEvents: Chapter = {
  id: 'ch-01-dom-manipulation-events',
  slug: 'ch-01-dom-manipulation-events',
  order: 1,
  title: 'DOM Manipulation & Events',
  summary:
    'Memahami DOM tree, seleksi node, event listener, fase event (capture/bubble), event delegation, serta integrasinya dengan browser rendering pipeline.',
  estimatedMinutes: 35,
  learningObjectives: [
    'Menjelaskan struktur DOM tree dan cara browser membangunnya.',
    'Menggunakan querySelector, addEventListener, dan event phases dengan tepat.',
    'Menerapkan event delegation untuk performa pada daftar besar.',
    'Memahami passive listeners, throttling, dan debouncing.',
    'Menganalisis bagaimana manipulasi DOM memicu reflow dan repaint.',
    'Mengenal MutationObserver, custom events, dan Shadow DOM encapsulation.',
  ],
  summaryPoints: [
    'DOM merepresentasikan dokumen HTML sebagai tree node yang bisa diakses dan dimodifikasi via JavaScript.',
    'Event propagation memiliki tiga fase: capture, target, dan bubble.',
    'Event delegation memanfaatkan bubbling untuk menangani banyak elemen lewat satu listener.',
    'Manipulasi DOM yang tidak hati-hati dapat memicu reflow mahal dan jank pada UI.',
    'Passive listeners memberi hint browser agar tidak menunggu listener sebelum scroll.',
    'MutationObserver dan custom events memungkinkan reaksi terhadap perubahan DOM tanpa polling.',
  ],
  references: ch01References,
  lesson: ch01Lesson,
  quiz: ch01Quiz,
}
