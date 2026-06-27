import type { Chapter } from '@/content/types'
import { ch03Lesson } from './lesson'
import { ch03Quiz } from './quiz'
import { ch03References } from './references'

export const ch03MessageQueuesEventDrivenArchitecture: Chapter = {
  id: 'ch-03-message-queues-event-driven-architecture',
  slug: 'ch-03-message-queues-event-driven-architecture',
  order: 3,
  title: 'Message Queues & Event-Driven Architecture',
  summary:
    'Memahami antrian pesan, producer/consumer, pub/sub, delivery guarantees, idempotency, serta pola advanced seperti event sourcing, CQRS, saga, dan outbox.',
  estimatedMinutes: 55,
  learningObjectives: [
    'Membedakan message queue, publish/subscribe, dan event stream.',
    'Menjelaskan delivery guarantees: at-most-once, at-least-once, exactly-once.',
    'Menerapkan idempotency pada consumer.',
    'Menguraikan pola event sourcing, CQRS, dan saga.',
    'Memahami outbox pattern untuk konsistensi data dan pesan.',
  ],
  summaryPoints: [
    'Message queue mendesakpling producer dan consumer sehingga sistem lebih resilient terhadap lonjakan beban.',
    'At-least-once delivery mengharuskan consumer idempoten agar pesan ganda tidak merusak state.',
    'Event-driven architecture memicu aksi sebagai reaksi terhadap event, bukan panggilan langsung.',
    'CQRS memisahkan model baca dan tulis; event sourcing menyimpan state sebagai urutan event.',
    'Outbox pattern memastikan database update dan publish event berhasil bersamaan.',
  ],
  references: ch03References,
  lesson: ch03Lesson,
  quiz: ch03Quiz,
}
