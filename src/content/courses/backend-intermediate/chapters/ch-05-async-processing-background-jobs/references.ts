import type { Reference } from '@/content/types'

export const ch05References: Reference[] = [
  {
    id: 'ref-05-01',
    title: 'BullMQ Docs',
    url: 'https://docs.bullmq.io/',
    description:
      'Dokumentasi resmi BullMQ untuk queue, workers, delayed jobs, retries, dan scheduling di Redis.',
    type: 'documentation',
  },
  {
    id: 'ref-05-02',
    title: 'Redis — Job queue patterns',
    url: 'https://redis.io/glossary/redis-queue/',
    description:
      'Penjelasan pola job queue dengan Redis termasuk blocking pop dan reliability.',
    type: 'article',
  },
  {
    id: 'ref-05-03',
    title: 'Martin Fowler — Outbox',
    url: 'https://microservices.io/patterns/data/transactional-outbox.html',
    description:
      'Pola outbox untuk menjamin reliable publishing event saat menulis ke database.',
    type: 'article',
  },
  {
    id: 'ref-05-04',
    title: 'Go by Example — Worker Pools',
    url: 'https://gobyexample.com/worker-pools',
    description:
      'Contoh implementasi worker pool di Go menggunakan goroutine dan channel.',
    type: 'interactive',
  },
  {
    id: 'ref-05-05',
    title: 'RabbitMQ Tutorials',
    url: 'https://www.rabbitmq.com/tutorials',
    description:
      'Tutorial resmi RabbitMQ untuk memahami queue, exchange, routing, dan reliability.',
    type: 'documentation',
  },
]
