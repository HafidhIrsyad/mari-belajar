import type { Lesson } from '@/content/types'

export const ch04Lesson: Lesson = {
  id: "lesson-ch-04-distributed-transactions",
  estimatedMinutes: 60,
  sections: [
    {
      id: "sec-04-01",
      type: 'markdown',
      level: 'basic',
      title: "Two-Phase Commit (2PC)",
      content: `## Masalah Distributed Transaction

Dalam sistem monolitik, ACID transaction menjamin konsistensi. Namun di distributed system, satu operasi bisnis bisa menyentuh beberapa database, message broker, atau layanan.

## Two-Phase Commit

2PC adalah protokol untuk mencapai atomic commit di banyak node. Terdiri dari:

1. **Phase 1: Prepare**
   - Coordinator mengirimkan \`prepare\` ke semua participant.
   - Setiap participant mengeksekusi operasi lokal dan menahan lock, lalu membalas \`yes\` atau \`no\`.

2. **Phase 2: Commit/Rollback**
   - Jika semua participant menjawab \`yes\`, coordinator mengirim \`commit\`.
   - Jika ada satu saja \`no\`, coordinator mengirim \`rollback\`.

## Kelemahan 2PC

- **Blocking**: jika coordinator gagal setelah prepare, participant harus menunggu coordinator pulih untuk mengetahui hasil akhir.
- **Lock lama**: resource terkunci selama protocol berjalan, menurunkan throughput.
- **Single point of failure**: coordinator menjadi kritis.

## Saga Pattern

Untuk transaksi panjang yang tidak memerlukan isolasi ketat, **saga** memecah transaksi menjadi urutan langkah lokal. Jika salah satu langkah gagal, saga menjalankan **compensating transactions** untuk mengurungkan efek langkah sebelumnya.

Contoh: order service -> payment service -> inventory service -> shipping service.

Jika inventory gagal:
- Compensasi payment: refund.
- Compensasi order: batalkan order.`,
    },
    {
      id: "sec-04-02",
      type: 'code-example',
      codeExample: {
        id: "code-04-js",
        filename: "two-phase-commit.js",
        language: 'javascript',
        title: "JavaScript: Simulasi Two-Phase Commit",
        code: "class Participant {\n  constructor(name, canCommit) {\n    this.name = name\n    this.canCommit = canCommit\n    this.prepared = false\n  }\n\n  prepare() {\n    this.prepared = this.canCommit\n    return this.prepared ? 'yes' : 'no'\n  }\n\n  commit() {\n    return this.prepared ? `${this.name}: committed` : `${this.name}: not prepared`\n  }\n\n  rollback() {\n    this.prepared = false\n    return `${this.name}: rolled back`\n  }\n}\n\nfunction twoPhaseCommit(participants) {\n  const votes = participants.map((p) => p.prepare())\n  const allYes = votes.every((v) => v === 'yes')\n\n  if (allYes) {\n    return participants.map((p) => p.commit())\n  }\n  return participants.map((p) => p.rollback())\n}\n\nconst participants = [\n  new Participant('account-service', true),\n  new Participant('inventory-service', true),\n  new Participant('payment-service', false),\n]\n\nconsole.log(twoPhaseCommit(participants))",
        explanation: "Simulasi ini menunjukkan fase prepare dan commit/rollback pada 2PC. Jika salah satu participant menolak, seluruh transaksi dibatalkan.",
      },
    },
    {
      id: "sec-04-03",
      type: 'markdown',
      level: 'intermediate',
      title: "Choreography vs Orchestration & Outbox Pattern",
      content: `## Choreography

Dalam **choreography**, setiap service bertanggung jawab mempublish dan subscribe event. Tidak ada pengelola pusat.

Keuntungan:
- Loose coupling antar service.
- Mudah menambahkan service baru.

Kerugian:
- Alur bisnis tersebar, sulit di-trace.
- Risiko cyclic dependency event.
- Sulit menentukan kapan saga selesai.

## Orchestration

Dalam **orchestration**, satu service khusus (orchestrator) mengelola urutan langkah dan kompensasi.

Keuntungan:
- Alur transaksi jelas dan terpusat.
- Lebih mudah debug dan monitor.

Kerugian:
- Orchestrator bisa menjadi single point of failure.
- Coupling sedikit lebih tinggi karena orchestrator harus tahu semua participant.

## Outbox Pattern

Masalah klasik: bagaimana menjamin bahwa perubahan database dan pengiriman event keduanya terjadi?

Jika kita menulis ke DB lalu publish event, bisa gagal di publish.

**Outbox pattern** menyelesaikannya dengan:

1. Menyimpan event dalam tabel outbox dalam transaction yang sama dengan business write.
2. Proses terpisah (relay/poller) membaca outbox dan mengirim event ke message broker.
3. Setelah event terkirim, outbox entry ditandai sebagai terkirim atau dihapus.

Ini menjamin **at-least-once delivery** dan memudahkan recovery.

## Idempotency Key

Saat client mengirim request penting, ia menyertakan **idempotency key**. Server menyimpan hasil berdasarkan key tersebut. Jika request sama dikirim ulang, server mengembalikan hasil yang sama tanpa mengeksekusi ulang.

Contoh: pembayaran dengan idempotency key mencegah double charge.`,
    },
    {
      id: "sec-04-04",
      type: 'code-example',
      codeExample: {
        id: "code-04-ts",
        filename: "saga-orchestrator.ts",
        language: 'typescript',
        title: "TypeScript: Saga Orchestrator Sederhana",
        code: "type Step = {\n  name: string\n  execute: () => Promise<void>\n  compensate: () => Promise<void>\n}\n\nclass SagaOrchestrator {\n  private completed: string[] = []\n\n  constructor(private steps: Step[]) {}\n\n  async run(): Promise<{ ok: boolean; failedAt?: string }> {\n    for (const step of this.steps) {\n      try {\n        await step.execute()\n        this.completed.push(step.name)\n      } catch (error) {\n        await this.compensate()\n        return { ok: false, failedAt: step.name }\n      }\n    }\n    return { ok: true }\n  }\n\n  private async compensate(): Promise<void> {\n    for (let i = this.completed.length - 1; i >= 0; i--) {\n      const name = this.completed[i]\n      const step = this.steps.find((s) => s.name === name)!\n      await step.compensate()\n    }\n  }\n}\n\nconst orderSaga = new SagaOrchestrator([\n  {\n    name: 'reserve-payment',\n    execute: async () => { console.log('payment reserved') },\n    compensate: async () => { console.log('payment refunded') },\n  },\n  {\n    name: 'reserve-inventory',\n    execute: async () => { throw new Error('out of stock') },\n    compensate: async () => { console.log('inventory released') },\n  },\n])\n\norderSaga.run().then(console.log)",
        explanation: "Orchestrator menjalankan langkah demi langkah. Jika gagal, ia menjalankan compensating transaction secara terbalik untuk mengembalikan sistem ke keadaan konsisten.",
      },
    },
    {
      id: "sec-04-05",
      type: 'markdown',
      level: 'advanced',
      title: "Event Sourcing, Compensating Transactions & Temporal",
      content: `## Event Sourcing

**Event sourcing** menyimpan setiap perubahan state sebagai event immutable. State saat ini adalah hasil replay semua event.

Dalam saga, event sourcing memberikan:
- Audit trail lengkap.
- Kemudahan replay dan recovery.
- Model alami untuk publish event.

Tantangan:
- Schema evolution event.
- Snapshot untuk menghindari replay panjang.
- Proyeksi read model.

## Compensating Transactions

Compensating transaction tidak selalu sama dengan rollback database. Karena langkah saga sudah commit, compensasi adalah operasi bisnis yang mengembalikan keadaan semula:

- Reservasi -> batalkan reservasi.
- Pembayaran -> refund.
- Pengiriman -> retur atau cancel shipment.

Compensasi bisa gagal juga, sehingga diperlukan retry, monitoring, dan human intervention.

## Temporal dan Workflow Engine

Workflow engine seperti Temporal, Cadence, atau Camunda mengelola saga secara durable:

- State saga disimpan persisten.
- Retry otomatis untuk kegagalan sementara.
- Compensation dijalankan sesuai definisi workflow.
- Worker dapat crash dan dilanjutkan tanpa kehilangan state.

Temporal menggunakan **event-loop deterministik** untuk replay state saat worker restart.

## Distributed Transaction Trade-offs

- Gunakan 2PC hanya untuk transaksi pendek dengan sedikit participant dan toleransi blocking rendah.
- Gunakan saga untuk transaksi panjang, terutama di microservices.
- Gunakan outbox pattern untuk reliable event publication.
- Selaporkan idempotency key untuk semua operasi yang tidak idempoten secara alami.`,
    },
    {
      id: "sec-04-06",
      type: 'code-example',
      codeExample: {
        id: "code-04-go",
        filename: "outbox_relay.go",
        language: 'go',
        title: "Go: Outbox Relay Sederhana",
        code: "package main\n\nimport (\n\t\"context\"\n\t\"database/sql\"\n\t\"fmt\"\n\t\"time\"\n\n\t_ \"github.com/lib/pq\"\n)\n\ntype OutboxEvent struct {\n\tID        int64\n\tTopic     string\n\tPayload   string\n\tCreatedAt time.Time\n}\n\nfunc pollOutbox(db *sql.DB, batchSize int) ([]OutboxEvent, error) {\n\tquery := `\n\t\tSELECT id, topic, payload, created_at\n\t\tFROM outbox\n\t\tORDER BY id\n\t\tLIMIT $1\n\t\tFOR UPDATE SKIP LOCKED\n\t`\n\trows, err := db.QueryContext(context.Background(), query, batchSize)\n\tif err != nil {\n\t\treturn nil, err\n\t}\n\tdefer rows.Close()\n\n\tvar events []OutboxEvent\n\tfor rows.Next() {\n\t\tvar e OutboxEvent\n\t\tif err := rows.Scan(&e.ID, &e.Topic, &e.Payload, &e.CreatedAt); err != nil {\n\t\t\treturn nil, err\n\t\t}\n\t\tevents = append(events, e)\n\t}\n\treturn events, rows.Err()\n}\n\nfunc publishEvent(event OutboxEvent) error {\n\tfmt.Printf(\"Publishing to %s: %s\\n\", event.Topic, event.Payload)\n\treturn nil\n}\n\nfunc deleteOutboxEntry(tx *sql.Tx, id int64) error {\n\t_, err := tx.Exec(\"DELETE FROM outbox WHERE id = $1\", id)\n\treturn err\n}\n\n// Relay process: poll -> publish -> delete dalam transaction",
        explanation: "Relay membaca outbox secara berkala, mengirim event ke broker, lalu menghapus entry yang berhasil. FOR UPDATE SKIP LOCKED mencegah race antar worker.",
      },
    },
    {
      id: "sec-04-07",
      type: 'callout',
      calloutType: 'info',
      content: `Kesimpulan: Hindari 2PC di jalur panas karena blocking. Gunakan saga, outbox, dan idempotency key untuk membangun distributed transactions yang resilient. Pilih choreography untuk loose coupling atau orchestration untuk visibilitas dan kontrol.

Tools 2026: Temporal untuk durable workflow, Debezium untuk CDC/outbox relay, dan saga pattern di NestJS/Go untuk microservices.`,
    },
  ],
}
