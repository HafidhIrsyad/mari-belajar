import type { Lesson } from '@/content/types'

export const ch03Lesson: Lesson = {
  id: 'lesson-ch-03-message-queues-event-driven-architecture',
  estimatedMinutes: 55,
  sections: [
    {
      id: 'sec-03-basic-messaging',
      type: 'markdown',
      level: 'basic',
      title: 'Queue, Producer, Consumer, dan Pub/Sub',
      content: `## Peran Message Queue

Message queue bertindak sebagai perantara asinkron antara komponen yang memproduksi pekerjaan dan komponen yang mengerjakannya. Queue membantu:

- Meluruskan lonjakan traffic (peak shaving).
- Mendesakpling service sehingga failure satu service tidak langsung menghentikan yang lain.
- Mendukung retry dan dead-letter untuk pesan yang gagal.

## Producer dan Consumer

- **Producer**: membuat pesan dan mengirimkannya ke queue.
- **Consumer**: mengambil pesan dari queue, memprosesnya, lalu mengakui (acknowledge) bahwa pesan telah selesai.

Jika consumer gagal sebelum mengakui, pesan dapat dikembalikan ke queue untuk diproses ulang.

## Publish/Subscribe

Dalam model pub/sub, publisher mengirim pesan ke topik. Beberapa subscriber dapat menerima salinan pesan yang sama. Ini berguna untuk event broadcasting, misalnya notifikasi order diterima ke layanan inventory, shipping, dan analitik.

## Message Broker Populer

- **RabbitMQ**: broker AMQP dengan dukungan queue, exchange, routing key, dan dead letter.
- **Apache Kafka**: distributed event stream dengan retention tinggi dan partisi untuk throughput tinggi.
- **Redis Streams**: ringan untuk pub/sub dan stream dengan consumer group.`,
    },
    {
      id: 'sec-03-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-03-js',
        filename: 'event-bus.js',
        language: 'javascript',
        title: 'JavaScript: Event Bus Sederhana dengan In-Memory Queue',
        code: `class EventBus {
  constructor() {
    this.topics = new Map()
  }

  subscribe(topic, handler) {
    if (!this.topics.has(topic)) {
      this.topics.set(topic, [])
    }
    this.topics.get(topic).push(handler)
  }

  publish(topic, payload) {
    const handlers = this.topics.get(topic) || []
    handlers.forEach((handler) => {
      setTimeout(() => handler(payload), 0)
    })
  }
}

const bus = new EventBus()

bus.subscribe('order.created', (order) => {
  console.log('inventory:', order.id)
})

bus.subscribe('order.created', (order) => {
  console.log('shipping:', order.id)
})

bus.publish('order.created', { id: 'O-99', amount: 150000 })`,
        explanation:
          'Event bus in-memory mendemonstrasikan pub/sub: satu event dapat diproses oleh banyak subscriber secara asinkron.',
      },
    },
    {
      id: 'sec-03-intermediate-delivery',
      type: 'markdown',
      level: 'intermediate',
      title: 'Delivery Guarantees dan Idempotency',
      content: `## Delivery Guarantees

Tingkat jaminan pengiriman pesan menentukan bagaimana sistem menangani kehilangan atau duplikasi:

- **At-most-once**: pesan dikirim maksimal satu kali. Risiko: pesan bisa hilang jika gagal sebelum ack.
- **At-least-once**: pesan dijamin sampai, tetapi bisa duplikat. Consumer harus idempoten.
- **Exactly-once**: pesan diproses tepat satu kali. Di dunia distributed, exactly-once biasanya tercapai melalui kombinasi idempotency dan deduplication, bukan jaminan transport murni.

## Idempotency

Idempoten berarti memproses pesan yang sama berulang kali menghasilkan hasil yang sama. Cara umum:

- Menyimpan ID pesan yang sudah diproses.
- Menggunakan operasi upsert atau conditional update.
- Mendesain aksi sebagai set state ke nilai tertentu, bukan increment mentah.

## Retry dan Dead Letter

Consumer dapat gagal karena bug sementara atau dependency down. Strategi:

- **Retry dengan backoff**: coba ulang beberapa kali dengan jeda meningkat.
- **Dead-letter queue (DLQ)**: jika semua retry gagal, pesan dipindahkan ke DLQ untuk inspeksi manual.

Acknowledge hanya boleh dilakukan setelah proses bisnis dan penyimpanan state berhasil.`,
    },
    {
      id: 'sec-03-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-03-ts',
        filename: 'bullmq-worker.ts',
        language: 'typescript',
        title: 'TypeScript: BullMQ Worker dengan Idempotency',
        code: `interface OrderEvent {
  orderId: string
  amount: number
}

interface Job<T> {
  id: string
  data: T
}

class OrderProcessor {
  private processed = new Set<string>()

  async process(job: Job<OrderEvent>): Promise<void> {
    if (this.processed.has(job.id)) {
      console.log('already processed', job.id)
      return
    }

    // Simulate business logic
    await this.updateInventory(job.data.orderId)

    this.processed.add(job.id)
    console.log('processed', job.data.orderId)
  }

  private async updateInventory(orderId: string): Promise<void> {
    // database update
  }
}

const processor = new OrderProcessor()

async function worker(job: Job<OrderEvent>) {
  try {
    await processor.process(job)
  } catch (error) {
    console.error('job failed', job.id, error)
    throw error // trigger retry
  }
}

worker({ id: 'job-1', data: { orderId: 'O-99', amount: 150000 } })`,
        explanation:
          'Worker menyimpan ID pekerjaan yang sudah diproses untuk mencegah efek ganda saat at-least-once delivery terjadi.',
      },
    },
    {
      id: 'sec-03-advanced-patterns',
      type: 'markdown',
      level: 'advanced',
      title: 'Event Sourcing, CQRS, Saga, dan Outbox Pattern',
      content: `## Event Sourcing

Event sourcing menyimpan state aplikasi sebagai urutan event yang tidak bisa diubah, bukan snapshot terakhir. Keuntungan:

- Audit trail lengkap setiap perubahan.
- Replay event untuk debugging atau rebuild state.
- Model baca dapat diproyeksikan ke berbagai view.

Tantangan: versioning event, handling sensitive data, dan kompleksitas query.

## CQRS (Command Query Responsibility Segregation)

CQRS memisahkan model untuk menulis (command) dan membaca (query). Model tulis dioptimalkan untuk konsistensi dan aturan bisnis; model baca dioptimalkan untuk kecepatan dan bentuk yang sesuai UI. Sering dipasangkan dengan event sourcing: event dari command side diproyeksikan ke read model.

## Saga Pattern

Saga mengelola transaksi panjang yang melibatkan beberapa service. Jika satu langkah gagal, saga mengeksekusi compensating transaction untuk membatalkan efek langkah sebelumnya.

- **Choreography**: setiap service mempublish event setelah menyelesaikan tugasnya; service lain bereaksi.
- **Orchestration**: satu coordinator mengatur urutan langkah dan compensasi.

## Outbox Pattern

Saat service perlu mengubah database dan mengirim pesan, keduanya harus atomik. Outbox pattern:

1. Simpan perubahan data dan pesan outbox dalam satu database transaction.
2. Proses relay membaca tabel outbox dan mengirim ke message broker.
3. Setelah berhasil publish, tandai atau hapus record outbox.

Pola ini menjamin konsistensi akhir antara database dan event broker tanpa distributed transaction.

## Under the Hood: Kafka Log dan Offset

Kafka menyimpan pesan dalam log yang terurut dan immutable. Setiap partisi adalah log terpisah; consumer group membagi partisi di antara anggotanya. Offset adalah posisi baca consumer. Commit offset setelah memproses pesan memberikan at-least-once semantics; commit sebelum proses memberikan at-most-once tetapi berisiko kehilangan data.`,
    },
    {
      id: 'sec-03-go-example',
      type: 'code-example',
      codeExample: {
        id: 'code-03-go',
        filename: 'main.go',
        language: 'go',
        title: 'Go: Channel-Based Event Bus',
        code: `package main

import (
	"fmt"
	"sync"
	"time"
)

type Event struct {
	Topic   string
	Payload map[string]any
}

type EventBus struct {
	mu        sync.RWMutex
	subscribers map[string][]chan Event
}

func NewEventBus() *EventBus {
	return &EventBus{subscribers: make(map[string][]chan Event)}
}

func (b *EventBus) Subscribe(topic string) chan Event {
	ch := make(chan Event, 10)
	b.mu.Lock()
	b.subscribers[topic] = append(b.subscribers[topic], ch)
	b.mu.Unlock()
	return ch
}

func (b *EventBus) Publish(topic string, payload map[string]any) {
	b.mu.RLock()
	defer b.mu.RUnlock()
	for _, ch := range b.subscribers[topic] {
		ch <- Event{Topic: topic, Payload: payload}
	}
}

func main() {
	bus := NewEventBus()
	ch := bus.Subscribe("order.created")

	go func() {
		for event := range ch {
			fmt.Printf("handled: %+v\\n", event)
		}
	}()

	bus.Publish("order.created", map[string]any{"id": "O-99", "amount": 150000})
	time.Sleep(100 * time.Millisecond)
}`,
        explanation:
          'Channel Go digunakan sebagai antrian in-memory. Setiap subscriber memiliki channel sendiri, mendemonstrasikan pub/asinkron tanpa blocking publisher.',
      },
    },
    {
      id: 'sec-03-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Kesimpulan:** Message queue dan event-driven architecture membuat sistem lebih resilient dan scalable. Selalu pertimbangkan delivery guarantee, idempotency, retry, dan outbox pattern agar state dan event tetap konsisten.',
    },
  ],
}
