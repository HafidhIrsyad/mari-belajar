import type { Reference } from '@/content/types'

export const ch04References: Reference[] = [
  {
    id: 'ref-04-01',
    title: 'Martin Fowler — Saga Pattern',
    url: 'https://microservices.io/patterns/data/saga.html',
    description: 'Penjelasan saga pattern untuk distributed transactions.',
    type: 'article',
  },
  {
    id: 'ref-04-02',
    title: 'Martin Fowler — Outbox Pattern',
    url: 'https://microservices.io/patterns/data/transactional-outbox.html',
    description: 'Pola outbox untuk reliable messaging dari database.',
    type: 'article',
  },
  {
    id: 'ref-04-03',
    title: 'AWS — Saga Pattern',
    url: 'https://docs.aws.amazon.com/prescriptive-guidance/latest/modernization-data-persistence/saga-pattern.html',
    description: 'Panduan AWS tentang implementasi saga di cloud.',
    type: 'documentation',
  },
  {
    id: 'ref-04-04',
    title: 'Temporal Documentation',
    url: 'https://docs.temporal.io/',
    description: 'Dokumentasi workflow engine untuk durable saga dan microservices.',
    type: 'documentation',
  },
  {
    id: 'ref-04-05',
    title: 'Go Mongo driver / Temporal Go SDK',
    url: 'https://github.com/temporalio/sdk-go',
    description: 'SDK Go untuk membangun saga workflow yang durable.',
    type: 'documentation',
  },
]
