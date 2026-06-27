import type { Reference } from '@/content/types'

export const ch03References: Reference[] = [
  {
    id: 'ref-03-01',
    title: 'RabbitMQ Tutorials',
    url: 'https://www.rabbitmq.com/tutorials',
    description:
      'Tutorial resmi RabbitMQ untuk queue, exchange, routing, dan pub/sub.',
    type: 'interactive',
  },
  {
    id: 'ref-03-02',
    title: 'Apache Kafka Docs',
    url: 'https://kafka.apache.org/documentation/',
    description:
      'Dokumentasi Kafka tentang log, partisi, consumer group, dan delivery semantics.',
    type: 'documentation',
  },
  {
    id: 'ref-03-03',
    title: 'Martin Fowler — Event Sourcing',
    url: 'https://martinfowler.com/eaaDev/EventSourcing.html',
    description:
      'Penjelasan konsep event sourcing dan manfaat audit trail lengkap.',
    type: 'article',
  },
  {
    id: 'ref-03-04',
    title: 'Martin Fowler — Saga',
    url: 'https://microservices.io/patterns/data/saga.html',
    description:
      'Pola saga untuk mengelola transaksi lintas service dengan compensating action.',
    type: 'article',
  },
  {
    id: 'ref-03-05',
    title: 'Go by Example — Channels',
    url: 'https://gobyexample.com/channels',
    description:
      'Contoh channel di Go untuk komunikasi antar goroutine dan queue sederhana.',
    type: 'interactive',
  },
]
