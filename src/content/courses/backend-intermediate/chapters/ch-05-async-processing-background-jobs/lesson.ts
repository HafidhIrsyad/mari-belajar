import type { Lesson } from '@/content/types'

export const ch05Lesson: Lesson = {
  id: 'lesson-ch-05-async-processing-background-jobs',
  estimatedMinutes: 45,
  sections: [
    {
      id: 'sec-05-basic-async',
      type: 'markdown',
      level: 'basic',
      title: 'Cron, Background Jobs, dan Job Queue',
      content: `## Kapan Memakai Background Job

Tidak semua pekerjaan perlu diselesaikan sebelum response dikirim. Background job cocok untuk:

- Mengirim email atau notifikasi.
- Memproses gambar, video, atau laporan.
- Membersihkan data lama.
- Menghitung agregasi yang membutuhkan waktu lama.

## Cron Job

Cron job menjalankan tugas secara terjadwal. Node.js memiliki library seperti \`node-cron\` atau "/bin/sh" cron. Di Go, package \`github.com/robfig/cron\` populer. Perhatikan:

- Hindari cron yang tumpang tindih: jika job sebelumnya belum selesai, jangan memulai instance baru.
- Pastikan hanya satu instance yang berjalan di environment terdistribusi dengan leader election atau distributed lock.

## Job Queue

Job queue memisahkan pembuatan pekerjaan dari pemrosesannya:

- **Producer**: membuat job dan menaruhnya di queue.
- **Queue**: penyimpanan sementara, biasanya Redis, RabbitMQ, atau database.
- **Worker**: mengambil job dan mengeksekusinya.

Pemisahan ini memungkinkan worker diskalakan secara independen dan aplikasi tetap responsif.`,
    },
    {
      id: 'sec-05-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-05-js',
        filename: 'cron-worker.js',
        language: 'javascript',
        title: 'JavaScript: Cron Worker dengan Graceful Shutdown',
        code: `let isShuttingDown = false

async function processPendingTasks() {
  const tasks = await fetchPendingTasks()
  for (const task of tasks) {
    if (isShuttingDown) break
    try {
      await processTask(task)
      await markCompleted(task.id)
    } catch (error) {
      await markFailed(task.id, error.message)
    }
  }
}

const interval = setInterval(processPendingTasks, 30_000)

async function shutdown() {
  isShuttingDown = true
  clearInterval(interval)
  console.log('worker shutting down...')
  await drainActiveTasks()
  process.exit(0)
}

process.on('SIGTERM', shutdown)
process.on('SIGINT', shutdown)

// placeholders
async function fetchPendingTasks() { return [] }
async function processTask(task) { /* ... */ }
async function markCompleted(id) { /* ... */ }
async function markFailed(id, reason) { /* ... */ }
async function drainActiveTasks() { /* ... */ }`,
        explanation:
          'Worker membaca tugas setiap 30 detik. Flag isShuttingDown mencegah pekerjaan baru saat SIGTERM, lalu drainActiveTasks menunggu pekerjaan aktif selesai sebelum keluar.',
      },
    },
    {
      id: 'sec-05-intermediate-queue',
      type: 'markdown',
      level: 'intermediate',
      title: 'BullMQ, Retry, Dead Letter, dan Idempotency',
      content: `## BullMQ di Atas Redis

BullMQ adalah library queue untuk Node.js yang menggunakan Redis. Fitur utamanya:

- **Producer** membuat job dengan data payload.
- **Worker** memproses job secara concurrent.
- **Job state**: waiting, active, completed, failed, delayed.
- **Retry**: job yang gagal dapat diulang dengan backoff fixed, exponential, atau custom.
- **Dead letter**: job yang gagal setelah maksimum retry tetap tersimpan sehingga dapat diinspeksi atau diproses ulang.

## Retry dan Backoff

Retry menangani kegagalan sementara seperti timeout jaringan. Backoff exponential memberi jeda yang semakin lama antar percobaan untuk mengurangi beban pada sistem yang sedang bermasalah.

## Idempotency

Sistem message queue umumnya menjamin **at-least-once delivery**: sebuah job mungkin diproses lebih dari sekali. Oleh karena itu, worker harus idempoten. Caranya:

- Gunakan idempotency key unik untuk setiap job.
- Simpan status proses di database sebelum melakukan efek samping.
- Jika job sama diproses lagi, lewati eksekusi jika status sudah completed.`,
    },
    {
      id: 'sec-05-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-05-ts',
        filename: 'queue.ts',
        language: 'typescript',
        title: 'TypeScript: BullMQ Producer dan Worker',
        code: `import { Queue, Worker, Job } from 'bullmq'
import IORedis from 'ioredis'

const connection = new IORedis({ maxRetriesPerRequest: null })

const emailQueue = new Queue('send-email', { connection })

interface EmailPayload {
  to: string
  subject: string
  body: string
  idempotencyKey: string
}

export async function enqueueEmail(payload: EmailPayload) {
  await emailQueue.add('send', payload, {
    jobId: payload.idempotencyKey,
    attempts: 5,
    backoff: { type: 'exponential', delay: 2000 },
  })
}

const emailWorker = new Worker<EmailPayload>(
  'send-email',
  async (job: Job<EmailPayload>) => {
    const alreadySent = await isEmailSent(job.data.idempotencyKey)
    if (alreadySent) {
      return { skipped: true }
    }
    await sendEmail(job.data)
    await markEmailSent(job.data.idempotencyKey)
    return { sent: true }
  },
  { connection, concurrency: 4 }
)

emailWorker.on('failed', (job, err) => {
  console.error('email job failed', job?.id, err.message)
})

// placeholders
async function isEmailSent(key: string) { return false }
async function sendEmail(payload: EmailPayload) { /* ... */ }
async function markEmailSent(key: string) { /* ... */ }`,
        explanation:
          'jobId dari idempotency key mencegah duplikasi job di queue. Worker memeriksa status di database sebelum mengirim email, memastikan operasi idempoten.',
      },
    },
    {
      id: 'sec-05-advanced-async',
      type: 'markdown',
      level: 'advanced',
      title: 'Outbox Pattern, Saga, dan Delivery Semantics',
      content: `## Delivery Semantics

- **At-most-once**: pesan mungkin hilang tetapi tidak pernah diproses dua kali. Cocok untuk telemetri, tidak cocok untuk pembayaran.
- **At-least-once**: pesan pasti sampai tetapi bisa diproses berulang. Worker harus idempoten.
- **Exactly-once**: tampak ideal tetapi sulit dicapai secara global. Pada praktiknya, exactly-once sering diimplementasikan sebagai at-least-once + idempotency di tingkat aplikasi.

## Outbox Pattern

Saat kita perlu menulis ke database dan mengirim event ke broker dalam satu operasi, muncul masalah dual-write. Outbox pattern menyelesaikannya:

1. Simpan perubahan business data dan event yang akan dikirim dalam satu transaksi database ke tabel \`outbox\`.
2. Sebuah relay secara berkala membaca tabel outbox dan mengirim event ke broker.
3. Setelah broker mengkonfirmasi, hapus atau tandai record outbox sebagai terkirim.

Cara ini menjamin event tidak hilang meskipun broker sempat down.

## Saga Pattern

Saga mengelola transaksi lintas service. Jika satu langkah gagal, saga menjalankan kompensasi untuk membatalkan efek langkah sebelumnya. Dua pendekatan:

- **Orchestration**: satu orchestrator mengatur urutan dan kompensasi.
- **Choreography**: setiap service mengirim event setelah selesai, service lain bereaksi.

Saga cocok untuk alur panjang seperti pemesanan: reserve stock, charge payment, ship order, dengan kompensasi masing-masing.`,
    },
    {
      id: 'sec-05-go-example',
      type: 'code-example',
      codeExample: {
        id: 'code-05-go',
        filename: 'main.go',
        language: 'go',
        title: 'Go: Worker Pool dengan Channel dan Redis',
        code: `package main

import (
	"context"
	"fmt"
	"log"
	"sync"
	"time"

	"github.com/redis/go-redis/v9"
)

func worker(ctx context.Context, id int, jobs <-chan string, wg *sync.WaitGroup) {
	defer wg.Done()
	for {
		select {
		case <-ctx.Done():
			fmt.Printf("worker %d stopping\\n", id)
			return
		case job, ok := <-jobs:
			if !ok {
				return
			}
			fmt.Printf("worker %d processing %s\\n", id, job)
			time.Sleep(500 * time.Millisecond)
		}
	}
}

func main() {
	rdb := redis.NewClient(&redis.Options{Addr: "localhost:6379"})
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	jobs := make(chan string, 10)
	var wg sync.WaitGroup
	for i := 1; i <= 3; i++ {
		wg.Add(1)
		go worker(ctx, i, jobs, &wg)
	}

	go func() {
		for {
			result, err := rdb.BRPop(ctx, 5*time.Second, "job-queue").Result()
			if err == redis.Nil {
				continue
			}
			if err != nil {
				log.Println("redis error:", err)
				return
			}
			jobs <- result[1]
		}
	}()

	time.Sleep(30 * time.Second)
	cancel()
	close(jobs)
	wg.Wait()
}`,
        explanation:
          'Worker pool Go membaca job dari Redis dengan BRPop yang memblokir hingga job tersedia. Context cancellation memberi sinyal shutdown, lalu channel ditutup dan worker menunggu selesai.',
      },
    },
    {
      id: 'sec-05-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Kesimpulan:** Background jobs meningkatkan skalabilitas dan responsivitas. Pahami delivery semantics, buat worker idempoten, dan gunakan outbox pattern atau saga untuk menjaga konsistensi saat bekerja dengan multiple system.',
    },
  ],
}
